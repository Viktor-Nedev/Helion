import { Bell, BrainCircuit, MoonStar, Search, Sparkles, SunMedium } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import type { EmergencyStatus, Role } from "@helio/shared";

import { Button } from "@/components/ui/Button";
import { emergencyStatusFallback } from "@/data/mock";
import { getEmergencyStatus } from "@/lib/api";
import { useAppStore } from "@/store/useAppStore";

export function Topbar({ role }: { role: Role }) {
  const navigate = useNavigate();
  const { theme, toggleTheme, setRole, sessionProfile, openEmergency, isDemoAccount } = useAppStore();
  const [status, setStatus] = useState<EmergencyStatus>(emergencyStatusFallback);
  const demoAccount = isDemoAccount();
  const avatar = useMemo(
    () =>
      (sessionProfile?.name ?? "")
        .split(" ")
        .filter(Boolean)
        .slice(0, 2)
        .map((part: string) => part.charAt(0).toUpperCase())
        .join("") || (role === "doctor" ? "DR" : "HU"),
    [role, sessionProfile?.name]
  );

  useEffect(() => {
    let mounted = true;

    getEmergencyStatus(demoAccount).then((result) => {
      if (mounted) {
        setStatus(result);
      }
    });

    return () => {
      mounted = false;
    };
  }, [demoAccount]);

  return (
    <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
      <div className="glass-panel flex items-center gap-3 rounded-[24px] px-4 py-3">
        <Search className="h-4 w-4 text-slate-400" />
        <input
          placeholder="Search doctors, records, symptoms..."
          className="w-full bg-transparent text-sm text-white outline-none placeholder:text-slate-500"
        />
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <Button variant="secondary" className="px-4" onClick={() => navigate("/ai-diagnosis")}>
          <BrainCircuit className="h-4 w-4" />
          AI Page
        </Button>
        <Button variant="secondary" className="px-4" onClick={openEmergency}>
          Emergency
          <span className="rounded-full bg-rose-500/15 px-2 py-0.5 text-xs text-rose-100">{status.activeDoctors} online</span>
        </Button>
        <Button variant="secondary" className="px-4" onClick={() => setRole(role === "doctor" ? "patient" : "doctor")}>
          <Sparkles className="h-4 w-4" />
          Switch Role
        </Button>
        <button
          onClick={toggleTheme}
          className="glass-panel flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 transition hover:bg-white/10"
        >
          {theme === "aurora" ? <MoonStar className="h-4 w-4 text-cyan-200" /> : <SunMedium className="h-4 w-4 text-amber-200" />}
        </button>
        <button className="glass-panel flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 transition hover:bg-white/10">
          <Bell className="h-4 w-4 text-white" />
        </button>
        <Link to={role === "doctor" ? "/doctor-dashboard" : "/dashboard"} className="glass-panel flex items-center gap-3 rounded-[22px] px-3 py-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-400 to-violet-500 text-sm font-bold text-slate-950">
            {avatar}
          </div>
          <div className="text-left">
            <div className="text-sm font-semibold text-white">{sessionProfile?.name ?? (role === "doctor" ? "Doctor" : "Patient")}</div>
            <div className="text-xs text-slate-400">{sessionProfile?.title ?? (role === "doctor" ? "Specialist" : "Member")}</div>
          </div>
        </Link>
      </div>
    </div>
  );
}
