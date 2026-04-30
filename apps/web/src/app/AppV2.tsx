import { useEffect, useRef } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import { FloatingAssistantV2 } from "@/components/ui/FloatingAssistantV2";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { AnimatedBackground } from "@/components/layout/AnimatedBackground";
import { CursorAura } from "@/components/layout/CursorAura";
import { PublicLayout } from "@/components/layout/PublicLayout";
import { EmergencyDrawer } from "@/components/emergency/EmergencyDrawer";
import { RouteTransitionOverlay } from "@/components/transitions/RouteTransitionOverlay";
import { gsap, prefersReducedMotion, useGSAP } from "@/lib/gsap";
import { AIDiagnosisPage } from "@/pages/ai/AIDiagnosisPage";
import { LoginPage } from "@/pages/auth/LoginPage";
import { RegisterPage } from "@/pages/auth/RegisterPage";
import { AppointmentsPage } from "@/pages/appointments/AppointmentsPage";
import { BlogPage } from "@/pages/blog/BlogPage";
import { CommunityPage } from "@/pages/community/CommunityPage";
import { DoctorDashboardPage } from "@/pages/dashboard/DoctorDashboardPage";
import { PatientDashboardPage } from "@/pages/dashboard/PatientDashboardPage";
import { DoctorsPageV2 } from "@/pages/doctors/DoctorsPageV2";
import { HomePage } from "@/pages/home/HomePage";
import { HealthRecordsPage } from "@/pages/records/HealthRecordsPage";
import { SettingsPage } from "@/pages/settings/SettingsPage";
import { VideoCallPage } from "@/pages/video/VideoCallPage";
import { ChatPage } from "@/pages/chat/ChatPage";
import { AdminPage } from "@/pages/admin/AdminPage";
import { useAppStore } from "@/store/useAppStore";

function BootSequence({ onComplete }: { onComplete: () => void }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const hasCompletedRef = useRef(false);

  useGSAP(
    () => {
      if (prefersReducedMotion()) {
        if (!hasCompletedRef.current) {
          hasCompletedRef.current = true;
          onComplete();
        }

        return;
      }

      const timeline = gsap.timeline({
        onComplete: () => {
          if (!hasCompletedRef.current) {
            hasCompletedRef.current = true;
            onComplete();
          }
        }
      });

      timeline
        .fromTo("[data-boot-mark]", { autoAlpha: 0, scale: 0.72, rotate: -12 }, { autoAlpha: 1, scale: 1, rotate: 0, duration: 0.6, ease: "back.out(1.6)" })
        .fromTo("[data-boot-title]", { autoAlpha: 0, y: 18 }, { autoAlpha: 1, y: 0, duration: 0.45, ease: "power3.out" }, 0.16)
        .fromTo("[data-boot-copy]", { autoAlpha: 0, y: 14 }, { autoAlpha: 1, y: 0, duration: 0.35, ease: "power2.out" }, 0.24)
        .to("[data-boot-mark]", { scale: 1.06, duration: 0.26, repeat: 1, yoyo: true, ease: "power2.inOut" }, 0.6)
        .to(rootRef.current, { autoAlpha: 0, duration: 0.42, ease: "power2.inOut" }, 1.1);
    },
    { scope: rootRef }
  );

  return (
    <div
      ref={rootRef}
      className="fixed inset-0 z-[60] flex flex-col items-center justify-center bg-[#040713]"
    >
      <div data-boot-mark className="h-20 w-20 rounded-[28px] bg-gradient-to-br from-cyan-400 to-violet-500 shadow-glow" />
      <h1 data-boot-title className="mt-6 text-4xl font-bold text-gradient">
        Helio
      </h1>
      <p data-boot-copy className="mt-3 text-sm uppercase tracking-[0.32em] text-slate-400">
        Initializing premium care systems
      </p>
    </div>
  );
}

function AppShell() {
  const { theme, isBootSequenceVisible, finishBootSequence } = useAppStore();

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  return (
    <>
      <AnimatedBackground />
      <CursorAura />
      <RouteTransitionOverlay />
      <EmergencyDrawer />
      {isBootSequenceVisible ? <BootSequence onComplete={finishBootSequence} /> : null}

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
          <Route path="/doctors" element={<DoctorsPageV2 />} />
          <Route path="/blog" element={<BlogPage />} />
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

      <FloatingAssistantV2 />
    </>
  );
}

export function AppV2() {
  return (
    <BrowserRouter>
      <AppShell />
    </BrowserRouter>
  );
}
