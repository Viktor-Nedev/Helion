import { Bell, MoonStar, Search, Sparkles, SunMedium } from "lucide-react";
import { Link } from "react-router-dom";

import type { Role } from "@helio/shared";

import { Button } from "@/components/ui/Button";
import { useAppStore } from "@/store/useAppStore";

export function Topbar({ role }: { role: Role }) {
  const { theme, toggleTheme, setRole } = useAppStore();

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
            {role === "doctor" ? "AM" : "MP"}
          </div>
          <div className="text-left">
            <div className="text-sm font-semibold text-white">{role === "doctor" ? "Dr. Alex Morgan" : "Mila Petrova"}</div>
            <div className="text-xs text-slate-400">{role === "doctor" ? "Lead Specialist" : "Premium Member"}</div>
          </div>
        </Link>
      </div>
    </div>
  );
}
