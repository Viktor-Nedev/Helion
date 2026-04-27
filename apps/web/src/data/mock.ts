import type {
  Appointment,
  CommunityPost,
  DoctorCardModel,
  HealthRecordItem,
  MessageThread,
  SymptomAnalysis,
  Testimonial
} from "@helio/shared";

export const heroStats = [
  { label: "AI checks this month", value: "1.2M+" },
  { label: "Doctors on platform", value: "8,400+" },
  { label: "Avg. response time", value: "< 4 min" }
];

export const landingFeatures = [
  {
    title: "AI Symptom Analysis",
    description: "Context-aware triage that surfaces risk levels, potential causes, and smart next actions."
  },
  {
    title: "Connect with Certified Doctors",
    description: "Book premium care sessions with specialists across cardiology, dermatology, neurology, and mental health."
  },
  {
    title: "Real-time Chat",
    description: "Clinical messaging designed for reassurance, clarity, and rapid medical follow-up."
  },
  {
    title: "Video Consultations",
    description: "Cinematic telemedicine rooms with notes, prescriptions, and collaborative call controls."
  },
  {
    title: "Community Support",
    description: "A moderated health community where patients and doctors share trusted insights."
  },
  {
    title: "Health Analytics",
    description: "Wearable sync, trend intelligence, and premium dashboards that make progress measurable."
  }
];

export const testimonials: Testimonial[] = [
  {
    quote: "Helio feels less like an app and more like a calm digital clinic that actually thinks with me.",
    name: "Sara M.",
    role: "Premium Patient"
  },
  {
    quote: "The AI triage saves me time, while the design makes difficult moments feel surprisingly humane.",
    name: "Dr. Emma Chen",
    role: "Cardiologist"
  },
  {
    quote: "Messaging, video consults, and records in one flow is exactly what modern care should feel like.",
    name: "Leo K.",
    role: "Startup Founder"
  }
];

export const animatedCounters = [
  { label: "Users helped", value: 182000 },
  { label: "Doctors registered", value: 8400 },
  { label: "AI checks completed", value: 1260000 },
  { label: "Appointments booked", value: 324000 }
];

export const doctorMarketplace: DoctorCardModel[] = [
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
    bio: "Preventive cardiology, wearable-guided care, and post-visit continuity.",
    tags: ["AI Reviewed", "Video Consult", "Fast Response"]
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
    bio: "Migraine, neuro fatigue, and evidence-based tele-neurology support.",
    tags: ["Sleep Expert", "Top Rated", "Community Mentor"]
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
    bio: "Skin health, digital reports, and long-term treatment adherence.",
    tags: ["Evening Slots", "Image Review", "Fast Booking"]
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
    bio: "Mental health care with strong wellness monitoring and crisis escalation flow.",
    tags: ["Urgent Access", "Mental Health", "Wellness Plans"]
  }
];

export const communityFeed: CommunityPost[] = [
  {
    id: "post-1",
    author: "Nina K.",
    role: "patient",
    handle: "@ninarecovers",
    avatar: "NK",
    category: "Recovery Stories",
    content: "Three weeks after surgery and the recovery timeline finally made my progress feel visible instead of abstract.",
    hashtags: ["#RecoveryStories", "#Hydration", "#Wellness"],
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
    category: "Symptoms",
    content: "Chest tightness is not always cardiac, but it deserves attention if it appears with dizziness, sweating, or shortness of breath.",
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
    content: "Pairing sleep score insights with lighter dinners completely changed my morning energy curve.",
    hashtags: ["#Nutrition", "#SleepScore", "#Fitness"],
    likes: 91,
    comments: 26,
    shares: 6,
    saved: 39,
    timeAgo: "1h ago"
  }
];

export const chatThreads: MessageThread[] = [
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

export const conversation = [
  {
    id: "m-1",
    sender: "them" as const,
    type: "text" as const,
    content: "Hi Mila, I saw the symptom summary. Does the chest pressure worsen during activity?",
    time: "09:12"
  },
  {
    id: "m-2",
    sender: "me" as const,
    type: "text" as const,
    content: "Mostly when climbing stairs. It eases after a few minutes of rest.",
    time: "09:15",
    seen: true
  },
  {
    id: "m-3",
    sender: "them" as const,
    type: "voice" as const,
    content: "Voice note: reassuring explanation and next-step guidance.",
    time: "09:18"
  }
];

export const appointmentList: Appointment[] = [
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

export const recordTimeline: HealthRecordItem[] = [
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

export const fallbackSymptomAnalysis: SymptomAnalysis = {
  summary: "Your symptom pattern looks low-to-moderate urgency, but it still benefits from clinician review if chest pain persists or intensifies.",
  possibleCauses: [
    "Stress-related chest tension",
    "Acid reflux flare",
    "Musculoskeletal irritation",
    "Early viral fatigue pattern"
  ],
  riskLevel: "moderate",
  suggestedActions: [
    "Monitor duration and intensity over the next 4-6 hours.",
    "Avoid strenuous activity until a doctor reviews the symptoms.",
    "Hydrate and note any shortness of breath or radiating pain."
  ],
  recommendedSpecialist: "Cardiologist or Internal Medicine Doctor",
  followUp: [
    "Is the pain sharp, burning, or pressure-like?",
    "Any dizziness, sweating, or numbness?",
    "Does movement change the intensity?"
  ]
};

export const patientOverview = {
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
  upcomingAppointments: appointmentList,
  recommendedDoctors: doctorMarketplace.slice(0, 3),
  wearables: [
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

export const doctorOverview = {
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
  appointmentsToday: [
    { patient: "Mila Petrova", time: "19:00", reason: "Chest pressure follow-up" },
    { patient: "Victor Ray", time: "20:10", reason: "ECG result review" },
    { patient: "Daria Cole", time: "21:00", reason: "Wellness plan optimization" }
  ],
  pendingRequests: [
    "Urgent symptom review from triage queue",
    "Medication clarification request",
    "Video consult reschedule approval"
  ]
};

export const navBadges = {
  messages: "3",
  appointments: "2"
};
