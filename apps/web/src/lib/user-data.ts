import type {
  CalendarAppointment,
  CalendarNote,
  ChatMessage,
  MessageThread,
  Role,
  SymptomAnalysis
} from "@helio/shared";

type StoredSettings = {
  notifications: boolean;
  profileVisible: boolean;
  language: string;
  marketingEmails: boolean;
};

export type AiHistoryEntry = {
  id: string;
  symptoms: string;
  analysis: SymptomAnalysis;
  createdAt: string;
};

export type BlogComment = {
  id: string;
  author: string;
  content: string;
  createdAt: string;
};

export type BlogPostEntry = {
  id: string;
  title: string;
  content: string;
  author: string;
  authorRole: Role;
  createdAt: string;
  likes: number;
  likedBy: string[];
  comments: BlogComment[];
};

const KEY_PREFIX = "helio:user";
const BLOG_KEY = "helio:blog:posts";

const DEFAULT_SETTINGS: StoredSettings = {
  notifications: true,
  profileVisible: false,
  language: "en",
  marketingEmails: false
};

const BLOG_SEED: BlogPostEntry[] = [
  {
    id: "blog-seed-1",
    title: "When chest pressure needs urgent attention",
    content:
      "If chest pressure appears together with sweating, dizziness, or shortness of breath, do not wait. Start urgent chat immediately and escalate to a live doctor.",
    author: "Dr. Emma Chen",
    authorRole: "doctor",
    createdAt: "2026-04-28T10:00:00.000Z",
    likes: 8,
    likedBy: [],
    comments: [
      {
        id: "blog-seed-1-c1",
        author: "Nina K.",
        content: "Very helpful checklist, thank you doctor.",
        createdAt: "2026-04-28T11:45:00.000Z"
      }
    ]
  },
  {
    id: "blog-seed-2",
    title: "Sleep quality and anxiety: a practical evening protocol",
    content:
      "Patients with elevated anxiety often improve when sleep consistency is restored first. Keep fixed bedtime, reduce caffeine after lunch, and track stress before sleep.",
    author: "Dr. Nina Patel",
    authorRole: "doctor",
    createdAt: "2026-04-27T14:20:00.000Z",
    likes: 6,
    likedBy: [],
    comments: []
  }
];

export function getStarterThread(): MessageThread {
  return {
    id: "thread-welcome",
    name: "Care Concierge",
    role: "doctor",
    avatar: "CC",
    status: "online",
    lastMessage: "Welcome to Helio. Share symptoms here when you are ready.",
    lastSeen: "just now",
    specialty: "General triage",
    unreadCount: 0,
    responseEta: "Live now",
    videoReady: false,
    riskTag: "Starter chat",
    roomId: "room-care-concierge"
  };
}

export function getStarterMessages(): ChatMessage[] {
  return [
    {
      id: "msg-welcome-1",
      sender: "them",
      type: "text",
      content: "Welcome to Helio. This is your starter chat. Describe symptoms and we will guide you.",
      time: "now",
      authorName: "Care Concierge"
    }
  ];
}

export function safeRead<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") {
    return fallback;
  }

  try {
    const raw = localStorage.getItem(key);

    if (!raw) {
      return fallback;
    }

    return JSON.parse(raw) as T;
  } catch (_error) {
    return fallback;
  }
}

export function safeWrite(key: string, value: unknown) {
  if (typeof window === "undefined") {
    return;
  }

  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (_error) {
    // Ignore localStorage write errors in constrained environments.
  }
}

export function userKey(email: string | undefined, section: string) {
  const normalized = (email ?? "guest").trim().toLowerCase() || "guest";
  return `${KEY_PREFIX}:${normalized}:${section}`;
}

export function getAiHistory(email: string | undefined): AiHistoryEntry[] {
  return safeRead<AiHistoryEntry[]>(userKey(email, "ai-history"), []);
}

export function saveAiHistoryEntry(email: string | undefined, symptoms: string, analysis: SymptomAnalysis) {
  const current = getAiHistory(email);
  const next: AiHistoryEntry = {
    id: `ai-${Date.now()}`,
    symptoms,
    analysis,
    createdAt: new Date().toISOString()
  };

  const updated = [next, ...current].slice(0, 100);
  safeWrite(userKey(email, "ai-history"), updated);
  return next;
}

export function getLocalAppointments(email: string | undefined): CalendarAppointment[] {
  return safeRead<CalendarAppointment[]>(userKey(email, "appointments"), []);
}

export function saveLocalAppointment(email: string | undefined, appointment: CalendarAppointment) {
  const current = getLocalAppointments(email);
  safeWrite(userKey(email, "appointments"), [...current, appointment]);
}

export function getLocalNotes(email: string | undefined): CalendarNote[] {
  return safeRead<CalendarNote[]>(userKey(email, "calendar-notes"), []);
}

export function saveLocalNote(email: string | undefined, note: CalendarNote) {
  const current = getLocalNotes(email);
  safeWrite(userKey(email, "calendar-notes"), [...current, note]);
}

export function getUserSettings(email: string | undefined): StoredSettings {
  return safeRead<StoredSettings>(userKey(email, "settings"), DEFAULT_SETTINGS);
}

export function saveUserSettings(email: string | undefined, settings: StoredSettings) {
  safeWrite(userKey(email, "settings"), settings);
}

export function getBlogPosts(): BlogPostEntry[] {
  const posts = safeRead<BlogPostEntry[]>(BLOG_KEY, BLOG_SEED);
  if (posts.length === 0) {
    safeWrite(BLOG_KEY, BLOG_SEED);
    return BLOG_SEED;
  }

  return posts;
}

export function saveBlogPosts(posts: BlogPostEntry[]) {
  safeWrite(BLOG_KEY, posts);
}
