import type {
  Appointment,
  CalendarAppointment,
  CalendarNote,
  CalendarSlot,
  ChatMessage,
  CommunityPost,
  DoctorCardModel,
  EmergencyStatus,
  MessageThread,
  SymptomAnalysis,
  UserProfile
} from "@helio/shared";
import { FieldValue } from "firebase-admin/firestore";

import {
  appointments,
  calendarAppointments,
  calendarNotes,
  communityPosts,
  doctorDashboard,
  doctors,
  emergencyStatus,
  featuredDoctor,
  featuredPatient,
  messagesByThread,
  openCalendarSlots,
  patientDashboard,
  symptomAnalysis,
  threads
} from "../data/mockDatabase.js";
import { env } from "../config/env.js";

import { getFirebaseDb, isFirebaseEnabled } from "./firebase.js";
import { analyzeSymptomsWithGemini } from "./gemini.js";

const db = getFirebaseDb();

type StoredMessage = ChatMessage & {
  threadId: string;
  sortOrder: number;
};

type DashboardBundle = {
  profile: UserProfile;
  overview: typeof patientDashboard | typeof doctorDashboard;
};

const DEMO_PATIENT_EMAIL = "mila@helio.health";

function formatNameFromEmail(email: string) {
  const localPart = email.split("@")[0] ?? "";

  const cleaned = localPart
    .replace(/[._-]+/g, " ")
    .trim()
    .split(" ")
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");

  return cleaned || "Helio User";
}

const seededMessages: StoredMessage[] = Object.entries(messagesByThread).flatMap(([threadId, items]) =>
  items.map((message, index) => ({
    ...message,
    threadId,
    sortOrder: index
  }))
);

function withDocumentId<T>(documentId: string, data: T): T {
  if (!data || typeof data !== "object" || Array.isArray(data) || "id" in (data as Record<string, unknown>)) {
    return data;
  }

  return {
    id: documentId,
    ...(data as Record<string, unknown>)
  } as T;
}

async function readCollection<T>(collectionName: string, fallback: T[]): Promise<T[]> {
  if (!db) {
    return fallback;
  }

  try {
    const snapshot = await db.collection(collectionName).get();

    if (snapshot.empty) {
      return fallback;
    }

    return snapshot.docs.map((document) => withDocumentId(document.id, document.data() as T));
  } catch (error) {
    console.warn(`Failed to read Firestore collection "${collectionName}". Falling back to seeded data.`, error);
    return fallback;
  }
}

async function readDocument<T>(collectionName: string, documentId: string, fallback: T): Promise<T> {
  if (!db) {
    return fallback;
  }

  try {
    const snapshot = await db.collection(collectionName).doc(documentId).get();

    if (!snapshot.exists) {
      return fallback;
    }

    return snapshot.data() as T;
  } catch (error) {
    console.warn(`Failed to read Firestore document "${collectionName}/${documentId}". Falling back to seeded data.`, error);
    return fallback;
  }
}

async function ensureCollectionSeed<T extends { id: string }>(collectionName: string, values: T[]) {
  if (!db || !env.firebaseBootstrap) {
    return;
  }

  const collectionReference = db.collection(collectionName);
  const existing = await collectionReference.limit(1).get();

  if (!existing.empty) {
    return;
  }

  const batch = db.batch();

  values.forEach((entry) => {
    batch.set(collectionReference.doc(entry.id), entry);
  });

  await batch.commit();
}

async function ensureDocumentSeed<T>(collectionName: string, documentId: string, value: T) {
  if (!db || !env.firebaseBootstrap) {
    return;
  }

  const documentReference = db.collection(collectionName).doc(documentId);
  const snapshot = await documentReference.get();

  if (snapshot.exists) {
    return;
  }

  await documentReference.set(value as Record<string, unknown>);
}

export async function bootstrapFirebaseData() {
  if (!isFirebaseEnabled() || !db) {
    return;
  }

  try {
    await ensureCollectionSeed("doctors", doctors);
    await ensureCollectionSeed("communityPosts", communityPosts);
    await ensureCollectionSeed("chatThreads", threads.map((thread) => ({ ...thread, id: thread.id })));
    await ensureCollectionSeed("chatMessages", seededMessages.map((message) => ({ ...message, id: message.id })));
    await ensureCollectionSeed("appointments", appointments);
    await ensureCollectionSeed("calendarAppointments", calendarAppointments);
    await ensureCollectionSeed("appointmentNotes", calendarNotes);
    await ensureCollectionSeed("calendarSlots", openCalendarSlots);
    await ensureDocumentSeed("profiles", featuredPatient.id, featuredPatient);
    await ensureDocumentSeed("profiles", featuredDoctor.id, featuredDoctor);
    await ensureDocumentSeed("dashboards", "patient", patientDashboard);
    await ensureDocumentSeed("dashboards", "doctor", doctorDashboard);
    await ensureDocumentSeed("admin", "overview", {
      revenue: "$284k",
      users: 12480,
      verifiedDoctors: 428,
      communityFlags: 11,
      verificationQueue: 9,
      incidentStatus: "All systems stable"
    });
    await ensureDocumentSeed("emergency", "status", emergencyStatus);
  } catch (error) {
    console.warn("Firestore bootstrap failed. The app will continue with seeded fallbacks.", error);
  }
}

export async function getDoctors() {
  return readCollection<DoctorCardModel>("doctors", doctors);
}

export async function getCommunityFeed() {
  const posts = await readCollection<CommunityPost>("communityPosts", communityPosts);

  return {
    trendingHashtags: ["#MentalHealth", "#Fitness", "#Symptoms", "#Nutrition", "#RecoveryStories"],
    posts
  };
}

export async function getChatThreads() {
  return readCollection<MessageThread>("chatThreads", threads);
}

export async function getChatMessages(threadId: string) {
  if (!db) {
    return messagesByThread[threadId] ?? [];
  }

  try {
    const snapshot = await db.collection("chatMessages").where("threadId", "==", threadId).orderBy("sortOrder", "asc").get();

    if (snapshot.empty) {
      return messagesByThread[threadId] ?? [];
    }

    return snapshot.docs.map((document) => {
      const { threadId: _threadId, sortOrder: _sortOrder, ...message } = document.data() as StoredMessage;
      return {
        ...message,
        id: document.id
      } satisfies ChatMessage;
    });
  } catch (error) {
    console.warn(`Failed to read messages for thread "${threadId}". Falling back to seeded data.`, error);
    return messagesByThread[threadId] ?? [];
  }
}

export async function getAppointmentCalendar(month: string) {
  const storedAppointments = await readCollection<CalendarAppointment>("calendarAppointments", calendarAppointments);
  const storedNotes = await readCollection<CalendarNote>("appointmentNotes", calendarNotes);
  const storedSlots = await readCollection<CalendarSlot>("calendarSlots", openCalendarSlots);

  return {
    month,
    appointments: storedAppointments,
    notes: storedNotes,
    openSlots: storedSlots
  };
}

export async function createAppointmentNote(input: Pick<CalendarNote, "date" | "title" | "content" | "pinned">) {
  const note: CalendarNote = {
    id: `note-${Date.now()}`,
    createdAt: new Date().toISOString(),
    ...input
  };

  if (!db) {
    return note;
  }

  await db.collection("appointmentNotes").doc(note.id).set(note);
  return note;
}

export async function getEmergencyStatus() {
  return readDocument<EmergencyStatus>("emergency", "status", emergencyStatus);
}

export async function getDashboard(role: "patient" | "doctor"): Promise<DashboardBundle> {
  const fallbackProfile = role === "doctor" ? featuredDoctor : featuredPatient;
  const fallbackOverview = role === "doctor" ? doctorDashboard : patientDashboard;

  const profile = await readDocument<UserProfile>("profiles", fallbackProfile.id, fallbackProfile);
  const overview = await readDocument<typeof fallbackOverview>("dashboards", role, fallbackOverview);

  return {
    profile,
    overview
  };
}

export async function getAdminOverview() {
  return readDocument("admin", "overview", {
    revenue: "$284k",
    users: 12480,
    verifiedDoctors: 428,
    communityFlags: 11,
    verificationQueue: 9,
    incidentStatus: "All systems stable"
  });
}

export async function loginWithEmail(email: string) {
  const normalizedEmail = email.trim().toLowerCase();
  const role = normalizedEmail.includes("doctor") ? "doctor" : "patient";
  const fallbackName =
    role === "doctor"
      ? normalizedEmail.includes("doctor")
        ? `Dr. ${formatNameFromEmail(normalizedEmail).replace(/^Dr\.\s*/i, "")}`
        : "Dr. Alex Morgan"
      : normalizedEmail === DEMO_PATIENT_EMAIL
        ? "Mila Petrova"
        : formatNameFromEmail(normalizedEmail);
  const fallbackProfile =
    role === "doctor"
      ? {
          id: "doctor-01",
          name: fallbackName,
          email,
          title: "Lead Telehealth Specialist"
        }
      : {
          id: "patient-01",
          name: fallbackName,
          email,
          title: "Premium Care Member"
        };

  if (!db) {
    return {
      token: "helio-demo-token",
      role,
      profile: fallbackProfile
    };
  }

  const documentReference = db.collection("users").doc(normalizedEmail);
  const snapshot = await documentReference.get();
  const existing = snapshot.data() as { profile?: typeof fallbackProfile } | undefined;

  const profile = {
    ...fallbackProfile,
    ...existing?.profile,
    email
  };

  await documentReference.set(
    {
      email: normalizedEmail,
      role,
      profile,
      lastLoginAt: FieldValue.serverTimestamp()
    },
    { merge: true }
  );

  return {
    token: `firebase-${role}-session`,
    role,
    profile
  };
}

export async function registerUser(submitted: Record<string, unknown>) {
  const role = submitted.role === "doctor" ? "doctor" : "patient";
  const email = String(submitted.email ?? "").trim().toLowerCase();
  const userId = `${role}-${Date.now()}`;
  const submittedName = String(submitted.fullName ?? "").trim();
  const profileName = submittedName || (email ? formatNameFromEmail(email) : "Helio User");
  const title = role === "doctor" ? "Doctor verification pending" : "Care Member";
  const profile = {
    id: userId,
    name: profileName,
    email,
    title
  };

  if (db && email) {
    await db.collection("users").doc(email).set(
      {
        userId,
        email,
        role,
        onboardingState: role === "doctor" ? "verification_pending" : "care_ready",
        profile,
        submitted,
        createdAt: FieldValue.serverTimestamp()
      },
      { merge: true }
    );

    await db
      .collection("profiles")
      .doc(userId)
      .set(
        {
          id: userId,
          role,
          name: profileName,
          email,
          avatar: profileName
            .split(" ")
            .filter(Boolean)
            .slice(0, 2)
            .map((part) => part.charAt(0).toUpperCase())
            .join(""),
          location: "Not set",
          status: "online",
          title
        } satisfies UserProfile,
        { merge: true }
      );
  }

  return {
    userId,
    role,
    onboardingState: role === "doctor" ? "verification_pending" : "care_ready",
    submitted,
    profile
  };
}

export async function analyzeSymptoms(symptoms: string): Promise<SymptomAnalysis> {
  const geminiResult = await analyzeSymptomsWithGemini(symptoms);

  const result =
    geminiResult ?? {
      ...symptomAnalysis,
      summary: `${symptomAnalysis.summary} Input received: "${symptoms.slice(0, 120)}".`
    };

  if (db) {
    await db.collection("symptomAnalyses").add({
      symptoms,
      result,
      createdAt: FieldValue.serverTimestamp()
    });
  }

  return result;
}
