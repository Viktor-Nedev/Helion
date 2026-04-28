export type Role = "patient" | "doctor" | "admin";
export type RiskLevel = "low" | "moderate" | "high";
export type ThemeMode = "aurora" | "midnight";

export interface NavItem {
  label: string;
  path: string;
  icon: string;
  badge?: string;
}

export interface UserProfile {
  id: string;
  role: Role;
  name: string;
  email: string;
  avatar: string;
  title?: string;
  specialization?: string;
  experience?: string;
  location: string;
  status: "online" | "busy" | "offline";
}

export interface DashboardMetric {
  label: string;
  value: string;
  delta: string;
  trend: "up" | "down" | "stable";
  tone: "cyan" | "violet" | "emerald" | "rose";
}

export interface ChartPoint {
  label: string;
  value: number;
  secondary?: number;
}

export interface HealthRecordItem {
  id: string;
  title: string;
  subtitle: string;
  date: string;
  tag: string;
  notes: string;
}

export interface Appointment {
  id: string;
  doctorName: string;
  specialty: string;
  date: string;
  status: "confirmed" | "pending" | "rescheduled" | "completed";
  mode: "video" | "chat" | "clinic";
}

export interface CalendarAppointment extends Appointment {
  startAt: string;
  endAt: string;
  location?: string;
  threadId?: string;
  roomId?: string;
  notes?: string;
}

export interface CalendarNote {
  id: string;
  date: string;
  title: string;
  content: string;
  createdAt: string;
  pinned?: boolean;
}

export interface CalendarSlot {
  id: string;
  doctorName: string;
  specialty: string;
  startAt: string;
  endAt: string;
  mode: "video" | "chat" | "clinic";
}

export interface AppointmentCalendarPayload {
  month: string;
  appointments: CalendarAppointment[];
  notes: CalendarNote[];
  openSlots: CalendarSlot[];
}

export interface DoctorCardModel {
  id: string;
  name: string;
  specialty: string;
  experience: string;
  rating: number;
  languages: string[];
  price: number;
  availability: string;
  avatar: string;
  bio: string;
  tags: string[];
}

export interface CommunityPost {
  id: string;
  author: string;
  role: "patient" | "doctor";
  handle: string;
  avatar: string;
  category: string;
  content: string;
  image?: string;
  hashtags: string[];
  likes: number;
  comments: number;
  shares: number;
  saved: number;
  timeAgo: string;
}

export interface MessageThread {
  id: string;
  name: string;
  role: "patient" | "doctor";
  avatar: string;
  status: "online" | "typing" | "offline";
  lastMessage: string;
  lastSeen: string;
  specialty?: string;
  unreadCount?: number;
  responseEta?: string;
  videoReady?: boolean;
  riskTag?: string;
  roomId?: string;
}

export interface ChatMessage {
  id: string;
  sender: "me" | "them";
  type: "text" | "voice" | "file";
  content: string;
  time: string;
  seen?: boolean;
  authorName?: string;
}

export interface EmergencyDoctorAvailability {
  id: string;
  name: string;
  specialty: string;
  status: "online" | "busy" | "offline";
  responseEta: string;
  nextOpenSlot: string;
  roomReady?: boolean;
}

export interface EmergencyStatus {
  activeDoctors: number;
  queueLoad: "low" | "medium" | "high";
  averageResponse: string;
  recommendedAction: string;
  doctors: EmergencyDoctorAvailability[];
}

export interface SymptomAnalysis {
  summary: string;
  possibleCauses: string[];
  riskLevel: RiskLevel;
  suggestedActions: string[];
  recommendedSpecialist: string;
  followUp: string[];
}

export interface FeedStat {
  label: string;
  value: string;
}

export interface WellnessMetric {
  label: string;
  value: string;
  goal: string;
  progress: number;
}

export interface Testimonial {
  quote: string;
  name: string;
  role: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  generatedAt: string;
}
