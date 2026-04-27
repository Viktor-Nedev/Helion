import { Activity, Calendar, HeartPulse, LayoutDashboard, MessageSquareMore, Settings, Shield, Users, Video } from "lucide-react";
import { NavLink } from "react-router-dom";

import type { NavItem, Role } from "@helio/shared";

import { navBadges } from "@/data/mock";
import { cn } from "@/lib/utils";

const patientNav: NavItem[] = [
  { label: "Dashboard", path: "/dashboard", icon: "dashboard" },
  { label: "AI Diagnosis", path: "/ai-diagnosis", icon: "activity" },
  { label: "Doctors", path: "/doctors", icon: "users" },
  { label: "Community", path: "/community", icon: "community" },
  { label: "Messages", path: "/messages", icon: "messages", badge: navBadges.messages },
  { label: "Appointments", path: "/appointments", icon: "calendar", badge: navBadges.appointments },
  { label: "Video Calls", path: "/video-calls", icon: "video" },
  { label: "Health Records", path: "/health-records", icon: "records" },
  { label: "Settings", path: "/settings", icon: "settings" }
];

const doctorNav: NavItem[] = [
  { label: "Dashboard", path: "/doctor-dashboard", icon: "dashboard" },
  { label: "Patients", path: "/doctors", icon: "users" },
  { label: "Requests", path: "/appointments", icon: "calendar", badge: "8" },
  { label: "Messages", path: "/messages", icon: "messages", badge: "5" },
  { label: "Video Calls", path: "/video-calls", icon: "video" },
  { label: "Calendar", path: "/appointments", icon: "calendar" },
  { label: "Earnings", path: "/doctor-dashboard", icon: "activity" },
  { label: "Analytics", path: "/doctor-dashboard", icon: "dashboard" },
  { label: "Settings", path: "/settings", icon: "settings" }
];

function iconFor(icon: string) {
  switch (icon) {
    case "activity":
      return Activity;
    case "users":
      return Users;
    case "community":
      return HeartPulse;
    case "messages":
      return MessageSquareMore;
    case "calendar":
      return Calendar;
    case "video":
      return Video;
    case "records":
      return Shield;
    case "settings":
      return Settings;
    default:
      return LayoutDashboard;
  }
}

export function Sidebar({ role }: { role: Role }) {
  const items = role === "doctor" ? doctorNav : patientNav;

  return (
    <aside className="glass-panel hidden h-[calc(100vh-2rem)] w-[290px] flex-col rounded-[32px] border border-white/10 p-5 lg:flex">
      <div className="flex items-center gap-3 border-b border-white/10 pb-5">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-400 to-violet-500 text-slate-950">
          <HeartPulse className="h-5 w-5" />
        </div>
        <div>
          <div className="text-lg font-semibold text-white">Helio</div>
          <div className="text-xs uppercase tracking-[0.24em] text-slate-400">
            {role === "doctor" ? "Doctor Console" : "Patient Hub"}
          </div>
        </div>
      </div>

      <nav className="mt-6 flex flex-1 flex-col gap-2">
        {items.map((item) => {
          const Icon = iconFor(item.icon);

          return (
            <NavLink
              key={item.path + item.label}
              to={item.path}
              className={({ isActive }) =>
                cn(
                  "flex items-center justify-between rounded-2xl px-4 py-3 text-sm text-slate-300 transition hover:bg-white/10 hover:text-white",
                  isActive && "bg-white/10 text-white"
                )
              }
            >
              <span className="flex items-center gap-3">
                <Icon className="h-4 w-4" />
                {item.label}
              </span>
              {item.badge ? (
                <span className="rounded-full bg-cyan-400/10 px-2.5 py-1 text-xs text-cyan-200">{item.badge}</span>
              ) : null}
            </NavLink>
          );
        })}
      </nav>

      <div className="rounded-[28px] border border-rose-400/20 bg-rose-400/10 p-4">
        <p className="text-xs uppercase tracking-[0.28em] text-rose-200">Emergency Mode</p>
        <p className="mt-2 text-sm leading-6 text-rose-100">
          One tap instantly opens urgent doctor access, triage routing, and nearby clinic recommendations.
        </p>
      </div>
    </aside>
  );
}
