import type {
  Appointment,
  ChatMessage,
  CommunityPost,
  DoctorCardModel,
  HealthRecordItem,
  MessageThread,
  SymptomAnalysis,
  UserProfile
} from "@helio/shared";

export const featuredPatient: UserProfile = {
  id: "patient-01",
  role: "patient",
  name: "Mila Petrova",
  email: "mila@helio.health",
  avatar: "MP",
  location: "Sofia, Bulgaria",
  status: "online",
  title: "Premium Care Member"
};

export const featuredDoctor: UserProfile = {
  id: "doctor-01",
  role: "doctor",
  name: "Dr. Alex Morgan",
  email: "alex@helio.health",
  avatar: "AM",
  location: "Remote Care Hub",
  status: "busy",
  specialization: "Internal Medicine",
  experience: "12 years",
  title: "Lead Telehealth Specialist"
};

export const doctors: DoctorCardModel[] = [
  {
    id: "doc-1",
    name: "Dr. Emma Chen",
    specialty: "Cardiology",
    experience: "11 years",
    rating: 4.9,
    languages: ["English", "Bulgarian"],
    price: 89,
    availability: "Today, 18:30",
    avatar: "EC",
    bio: "Specialist in preventive cardiology and wearable-driven monitoring.",
    tags: ["Video Consult", "Fast Response", "AI Reviewed"]
  },
  {
    id: "doc-2",
    name: "Dr. Lucas Rivera",
    specialty: "Neurology",
    experience: "9 years",
    rating: 4.8,
    languages: ["English", "Spanish"],
    price: 74,
    availability: "Tomorrow, 09:15",
    avatar: "LR",
    bio: "Focused on migraine care, neuro recovery plans, and clinical analytics.",
    tags: ["Top Rated", "Community Mentor", "Sleep Expert"]
  },
  {
    id: "doc-3",
    name: "Dr. Sara Ivanova",
    specialty: "Dermatology",
    experience: "7 years",
    rating: 4.7,
    languages: ["Bulgarian", "English"],
    price: 65,
    availability: "Today, 21:00",
    avatar: "SI",
    bio: "Digital-first dermatologist with strong telemedicine follow-up flow.",
    tags: ["Evening Slots", "Fast Booking", "Skin Reports"]
  },
  {
    id: "doc-4",
    name: "Dr. Nina Patel",
    specialty: "Psychiatry",
    experience: "14 years",
    rating: 5,
    languages: ["English", "Hindi"],
    price: 98,
    availability: "Today, 20:15",
    avatar: "NP",
    bio: "Mental health physician bridging therapy support and medication care.",
    tags: ["Mental Health", "Urgent Access", "Wellness Plans"]
  }
];

export const communityPosts: CommunityPost[] = [
  {
    id: "post-1",
    author: "Nina K.",
    role: "patient",
    handle: "@ninarecovers",
    avatar: "NK",
    category: "Recovery Stories",
    content: "Three weeks after surgery and Helio's recovery timeline finally made my daily progress feel visible. The motion score and hydration reminders were surprisingly motivating.",
    hashtags: ["#Recovery", "#Hydration", "#Wellness"],
    likes: 128,
    comments: 34,
    shares: 12,
    saved: 48,
    timeAgo: "12m ago"
  },
  {
    id: "post-2",
    author: "Dr. Emma Chen",
    role: "doctor",
    handle: "@drchenheart",
    avatar: "EC",
    category: "Mental Health",
    content: "Quick reminder: chest tightness is not always cardiac, but it should always be evaluated if paired with dizziness, shortness of breath, or unusual fatigue.",
    hashtags: ["#Symptoms", "#Cardiology", "#Prevention"],
    likes: 241,
    comments: 52,
    shares: 31,
    saved: 122,
    timeAgo: "28m ago"
  },
  {
    id: "post-3",
    author: "Maya Fit",
    role: "patient",
    handle: "@maja.fit",
    avatar: "MF",
    category: "Nutrition",
    content: "Anyone else using Helio's sleep score together with meal timing? My energy graph leveled out after switching heavy dinners for lighter protein meals.",
    hashtags: ["#Nutrition", "#SleepScore", "#Fitness"],
    likes: 91,
    comments: 26,
    shares: 6,
    saved: 39,
    timeAgo: "1h ago"
  }
];

export const threads: MessageThread[] = [
  {
    id: "thread-1",
    name: "Dr. Emma Chen",
    role: "doctor",
    avatar: "EC",
    status: "typing",
    lastMessage: "Reviewing your latest heart-rate trend now.",
    lastSeen: "typing..."
  },
  {
    id: "thread-2",
    name: "Care Concierge",
    role: "doctor",
    avatar: "CC",
    status: "online",
    lastMessage: "Your video room is ready for check-in.",
    lastSeen: "2m ago"
  },
  {
    id: "thread-3",
    name: "Dr. Nina Patel",
    role: "doctor",
    avatar: "NP",
    status: "offline",
    lastMessage: "Let's follow up in 48 hours.",
    lastSeen: "1h ago"
  }
];

export const messagesByThread: Record<string, ChatMessage[]> = {
  "thread-1": [
    {
      id: "msg-1",
      sender: "them",
      type: "text",
      content: "Hi Mila, I saw the symptom check summary. Can you tell me whether the chest pressure gets worse during activity?",
      time: "09:12"
    },
    {
      id: "msg-2",
      sender: "me",
      type: "text",
      content: "Mostly when climbing stairs. Resting helps after a few minutes.",
      time: "09:15",
      seen: true
    },
    {
      id: "msg-3",
      sender: "them",
      type: "voice",
      content: "Voice note: reassuring explanation and next-step guidance.",
      time: "09:18"
    }
  ],
  "thread-2": [
    {
      id: "msg-4",
      sender: "them",
      type: "text",
      content: "Your room will open 10 minutes before the appointment. Tap join when ready.",
      time: "08:30"
    }
  ],
  "thread-3": [
    {
      id: "msg-5",
      sender: "them",
      type: "file",
      content: "Shared mindfulness routine.pdf",
      time: "Yesterday"
    }
  ]
};

export const appointments: Appointment[] = [
  {
    id: "appt-1",
    doctorName: "Dr. Emma Chen",
    specialty: "Cardiology",
    date: "Today, 19:00",
    status: "confirmed",
    mode: "video"
  },
  {
    id: "appt-2",
    doctorName: "Dr. Nina Patel",
    specialty: "Psychiatry",
    date: "Wed, 14:30",
    status: "pending",
    mode: "chat"
  },
  {
    id: "appt-3",
    doctorName: "Dr. Lucas Rivera",
    specialty: "Neurology",
    date: "Fri, 10:00",
    status: "rescheduled",
    mode: "clinic"
  }
];

export const healthRecords: HealthRecordItem[] = [
  {
    id: "record-1",
    title: "Seasonal Allergy Alert",
    subtitle: "Allergy",
    date: "2026-04-19",
    tag: "Moderate",
    notes: "Pollen sensitivity elevated. Antihistamine plan updated."
  },
  {
    id: "record-2",
    title: "Routine Blood Panel",
    subtitle: "Lab Result",
    date: "2026-04-14",
    tag: "Stable",
    notes: "Vitamin D slightly low. Continue supplements for 6 weeks."
  },
  {
    id: "record-3",
    title: "Migraine Follow-up",
    subtitle: "Diagnosis",
    date: "2026-04-07",
    tag: "Monitored",
    notes: "No alarming changes. Continue sleep hygiene protocol."
  }
];

export const symptomAnalysis: SymptomAnalysis = {
  summary: "Current symptom cluster suggests a low-to-moderate urgency pattern that still benefits from clinician review if chest pain continues or intensifies.",
  possibleCauses: [
    "Stress-related chest tension",
    "Mild acid reflux or gastritis flare",
    "Musculoskeletal irritation",
    "Early viral fatigue pattern"
  ],
  riskLevel: "moderate",
  suggestedActions: [
    "Monitor symptom duration and intensity for the next 4-6 hours.",
    "Avoid strenuous activity until a doctor reviews the symptoms.",
    "Hydrate, rest, and track any shortness of breath or radiating pain.",
    "Escalate immediately if symptoms worsen, spread, or include fainting."
  ],
  recommendedSpecialist: "Cardiologist or Internal Medicine Doctor",
  followUp: [
    "Is the pain sharp, burning, or pressure-like?",
    "Does movement or breathing change the intensity?",
    "Any dizziness, sweating, or numbness?",
    "How long have the symptoms been present?"
  ]
};

export const patientDashboard = {
  healthScore: 86,
  metrics: [
    { label: "Recovery Index", value: "92%", delta: "+6.4%", trend: "up", tone: "emerald" },
    { label: "Sleep Consistency", value: "7.8h", delta: "+42m", trend: "up", tone: "cyan" },
    { label: "Stress Signal", value: "Low", delta: "-18%", trend: "up", tone: "violet" },
    { label: "Urgent Flags", value: "02", delta: "Stable", trend: "stable", tone: "rose" }
  ],
  activity: [
    { label: "Mon", value: 64, secondary: 48 },
    { label: "Tue", value: 72, secondary: 52 },
    { label: "Wed", value: 78, secondary: 58 },
    { label: "Thu", value: 83, secondary: 62 },
    { label: "Fri", value: 80, secondary: 61 },
    { label: "Sat", value: 88, secondary: 68 },
    { label: "Sun", value: 90, secondary: 74 }
  ],
  recentChecks: [
    { symptom: "Chest pressure", outcome: "Moderate risk", time: "16m ago" },
    { symptom: "Nausea", outcome: "Low risk", time: "Yesterday" },
    { symptom: "Migraine aura", outcome: "Monitor closely", time: "2 days ago" }
  ],
  trendingDiseasesNearby: [
    { name: "Seasonal Allergy Spikes", intensity: 88 },
    { name: "Stomach Virus", intensity: 61 },
    { name: "Spring Flu", intensity: 49 }
  ],
  wellnessTips: [
    "Shift caffeine intake earlier to improve sleep score stability.",
    "A 15-minute walk after lunch is reducing your glucose volatility trend.",
    "Hydration is below target today. One more 450ml closes your goal."
  ],
  communityTrends: ["#SleepReset", "#PostOpRecovery", "#HeartHealth", "#MindfulMornings"],
  wearableSync: [
    { label: "Heart Rate Variability", value: "74 ms", goal: "Balanced range", progress: 84 },
    { label: "Water Intake", value: "1.8L", goal: "2.4L target", progress: 75 },
    { label: "Steps", value: "8,420", goal: "10,000 goal", progress: 84 },
    { label: "Sleep Score", value: "89 / 100", goal: "Elite recovery", progress: 89 }
  ],
  nearbyClinics: [
    { name: "Helio Care Central", distance: "1.8 km", eta: "8 min" },
    { name: "Nova Diagnostic Lab", distance: "3.4 km", eta: "12 min" },
    { name: "Vital Emergency Hub", distance: "5.2 km", eta: "15 min" }
  ]
};

export const doctorDashboard = {
  metrics: [
    { label: "Today Appointments", value: "14", delta: "+3 vs avg", trend: "up", tone: "cyan" },
    { label: "Pending Requests", value: "08", delta: "-2", trend: "up", tone: "violet" },
    { label: "New Patients", value: "24", delta: "+12%", trend: "up", tone: "emerald" },
    { label: "Monthly Revenue", value: "$18.4k", delta: "+9.7%", trend: "up", tone: "rose" }
  ],
  analytics: [
    { label: "Mon", value: 6, secondary: 4 },
    { label: "Tue", value: 8, secondary: 5 },
    { label: "Wed", value: 9, secondary: 7 },
    { label: "Thu", value: 11, secondary: 8 },
    { label: "Fri", value: 13, secondary: 9 },
    { label: "Sat", value: 10, secondary: 7 },
    { label: "Sun", value: 7, secondary: 5 }
  ],
  todayAppointments: [
    { patient: "Mila Petrova", time: "19:00", reason: "Chest pressure follow-up" },
    { patient: "Victor Ray", time: "20:10", reason: "ECG result review" },
    { patient: "Daria Cole", time: "21:00", reason: "Wellness plan optimization" }
  ],
  pendingRequests: [
    "Urgent symptom review from triage queue",
    "Medication clarification request",
    "Video consult reschedule approval"
  ],
  responseTime: "4m 12s",
  ratingScore: "4.96 / 5",
  consultationAnalytics: {
    completionRate: "97.2%",
    followUpRate: "63%",
    aiAssistAdoption: "88%"
  }
};
