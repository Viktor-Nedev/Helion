import type {
  AppointmentCalendarPayload,
  CalendarNote,
  ChatMessage,
  EmergencyStatus,
  MessageThread,
  Role,
  SymptomAnalysis
} from "@helio/shared";

import {
  appointmentCalendarFallback,
  chatThreads,
  conversationByThread,
  emergencyStatusFallback,
  fallbackSymptomAnalysis
} from "@/data/mock";

const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:4000/api";

async function requestJson<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${API_URL}${path}`, init);

  if (!response.ok) {
    throw new Error(`Request failed for ${path}`);
  }

  const payload = (await response.json()) as { data: T };
  return payload.data;
}

export async function analyzeSymptoms(symptoms: string): Promise<SymptomAnalysis> {
  try {
    return await requestJson<SymptomAnalysis>("/symptoms/analyze", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ symptoms })
    });
  } catch (_error) {
    return {
      ...fallbackSymptomAnalysis,
      summary: `${fallbackSymptomAnalysis.summary} Local preview mode is active because the API is currently unavailable.`
    };
  }
}

export async function loginWithEmail(
  email: string,
  password: string
): Promise<{
  token: string;
  role: Role;
  profile: { id: string; name: string; email: string; title: string };
}> {
  try {
    return await requestJson<{
      token: string;
      role: Role;
      profile: { id: string; name: string; email: string; title: string };
    }>("/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, password })
    });
  } catch (_error) {
    return {
      token: "demo",
      role: email.toLowerCase().includes("doctor") ? ("doctor" as const) : ("patient" as const),
      profile: {
        id: "demo",
        name: email.toLowerCase().includes("doctor") ? "Dr. Alex Morgan" : "Mila Petrova",
        email,
        title: "Preview Session"
      }
    };
  }
}

export async function getAppointmentCalendar(month: string): Promise<AppointmentCalendarPayload> {
  try {
    return await requestJson<AppointmentCalendarPayload>(`/appointments/calendar?month=${encodeURIComponent(month)}`);
  } catch (_error) {
    return {
      ...appointmentCalendarFallback,
      month
    };
  }
}

export async function createAppointmentNote(input: Pick<CalendarNote, "date" | "title" | "content" | "pinned">): Promise<CalendarNote> {
  try {
    return await requestJson<CalendarNote>("/appointments/notes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(input)
    });
  } catch (_error) {
    return {
      id: `note-${Date.now()}`,
      createdAt: new Date().toISOString(),
      ...input
    };
  }
}

export async function getEmergencyStatus(): Promise<EmergencyStatus> {
  try {
    return await requestJson<EmergencyStatus>("/emergency/status");
  } catch (_error) {
    return emergencyStatusFallback;
  }
}

export async function getChatThreads(): Promise<MessageThread[]> {
  try {
    return await requestJson<MessageThread[]>("/chat/threads");
  } catch (_error) {
    return chatThreads;
  }
}

export async function getChatMessages(threadId: string): Promise<ChatMessage[]> {
  try {
    return await requestJson<ChatMessage[]>(`/chat/threads/${encodeURIComponent(threadId)}/messages`);
  } catch (_error) {
    return conversationByThread[threadId as keyof typeof conversationByThread] ?? [];
  }
}
