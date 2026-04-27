import { useEffect } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { motion } from "framer-motion";

import { FloatingAssistant } from "@/components/ui/FloatingAssistant";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { AnimatedBackground } from "@/components/layout/AnimatedBackground";
import { CursorAura } from "@/components/layout/CursorAura";
import { PublicLayout } from "@/components/layout/PublicLayout";
import { AIDiagnosisPage } from "@/pages/ai/AIDiagnosisPage";
import { LoginPage } from "@/pages/auth/LoginPage";
import { RegisterPage } from "@/pages/auth/RegisterPage";
import { AppointmentsPage } from "@/pages/appointments/AppointmentsPage";
import { CommunityPage } from "@/pages/community/CommunityPage";
import { DoctorDashboardPage } from "@/pages/dashboard/DoctorDashboardPage";
import { PatientDashboardPage } from "@/pages/dashboard/PatientDashboardPage";
import { DoctorsPage } from "@/pages/doctors/DoctorsPage";
import { HomePage } from "@/pages/home/HomePage";
import { HealthRecordsPage } from "@/pages/records/HealthRecordsPage";
import { SettingsPage } from "@/pages/settings/SettingsPage";
import { VideoCallPage } from "@/pages/video/VideoCallPage";
import { ChatPage } from "@/pages/chat/ChatPage";
import { AdminPage } from "@/pages/admin/AdminPage";
import { useAppStore } from "@/store/useAppStore";

function BootSequence() {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[60] flex flex-col items-center justify-center bg-[#040713]"
    >
      <div className="h-20 w-20 animate-pulse rounded-[28px] bg-gradient-to-br from-cyan-400 to-violet-500 shadow-glow" />
      <h1 className="mt-6 text-4xl font-bold text-gradient">Helio</h1>
      <p className="mt-3 text-sm uppercase tracking-[0.32em] text-slate-400">Initializing premium care systems</p>
    </motion.div>
  );
}

export function App() {
  const { theme, isBootSequenceVisible, finishBootSequence } = useAppStore();

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  useEffect(() => {
    const timer = window.setTimeout(() => finishBootSequence(), 1400);
    return () => window.clearTimeout(timer);
  }, [finishBootSequence]);

  return (
    <BrowserRouter>
      <AnimatedBackground />
      <CursorAura />
      {isBootSequenceVisible ? <BootSequence /> : null}

      <Routes>
        <Route element={<PublicLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Route>

        <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<PatientDashboardPage />} />
          <Route path="/doctor-dashboard" element={<DoctorDashboardPage />} />
          <Route path="/ai-diagnosis" element={<AIDiagnosisPage />} />
          <Route path="/doctors" element={<DoctorsPage />} />
          <Route path="/community" element={<CommunityPage />} />
          <Route path="/messages" element={<ChatPage />} />
          <Route path="/appointments" element={<AppointmentsPage />} />
          <Route path="/video-calls" element={<VideoCallPage />} />
          <Route path="/health-records" element={<HealthRecordsPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/admin/observatory-7" element={<AdminPage />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      <FloatingAssistant />
    </BrowserRouter>
  );
}
