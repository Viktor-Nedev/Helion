import { Activity, Calendar, HeartPulse, LayoutDashboard, MessageSquareMore, Settings, Shield, Users } from "lucide-react";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

import type { NavItem, Role } from "@helio/shared";

import { getAppointmentCalendar, getChatThreads } from "@/lib/api";
import { getMonthKey } from "@/lib/calendar";
import { getLocalAppointments } from "@/lib/user-data";
import { cn } from "@/lib/utils";
import { useAppStore } from "@/store/useAppStore";

const patientNav: NavItem[] = [
  { label: "Dashboard", path: "/dashboard", icon: "dashboard" },
  { label: "AI Diagnosis", path: "/ai-diagnosis", icon: "activity" },
  { label: "Doctors", path: "/doctors", icon: "users" },
  { label: "Community", path: "/community", icon: "community" },
  { label: "Messages", path: "/messages", icon: "messages" },
  { label: "Appointments", path: "/appointments", icon: "calendar" },
  { label: "Blog", path: "/blog", icon: "community" },
  { label: "Health Records", path: "/health-records", icon: "records" },
  { label: "Settings", path: "/settings", icon: "settings" }
];

const doctorNav: NavItem[] = [
  { label: "Dashboard", path: "/doctor-dashboard", icon: "dashboard" },
  { label: "Patients", path: "/doctors", icon: "users" },
  { label: "Requests", path: "/appointments", icon: "calendar" },
  { label: "Messages", path: "/messages", icon: "messages" },
  { label: "Blog", path: "/blog", icon: "community" },
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
    case "records":
      return Shield;
    case "settings":
      return Settings;
    default:
      return LayoutDashboard;
  }
}

export function Sidebar({ role }: { role: Role }) {
  const { isDemoAccount, sessionProfile } = useAppStore();
  const [messageBadge, setMessageBadge] = useState("");
  const [appointmentBadge, setAppointmentBadge] = useState("");
  const items = role === "doctor" ? doctorNav : patientNav;

  useEffect(() => {
    let mounted = true;

    async function loadBadges() {
      const demo = isDemoAccount();
      const chatThreads = demo ? await getChatThreads(true) : [];
      const unreadCount = chatThreads.reduce((sum, thread) => sum + (thread.unreadCount ?? 0), 0);

      const monthKey = getMonthKey(new Date());
      const apiCalendar = await getAppointmentCalendar(monthKey, demo);
      const localAppointments = getLocalAppointments(sessionProfile?.email);
      const totalAppointments = apiCalendar.appointments.length + localAppointments.length;

      if (!mounted) {
        return;
      }

      setMessageBadge(unreadCount > 0 ? String(unreadCount) : "");
      setAppointmentBadge(totalAppointments > 0 ? String(totalAppointments) : "");
    }

    loadBadges();

    return () => {
      mounted = false;
    };
  }, [isDemoAccount, sessionProfile?.email]);

  return (
    <aside className="glass-panel hidden h-[calc(100vh-2rem)] w-[290px] flex-col rounded-[32px] border border-white/10 p-5 lg:flex">
      <div className="flex items-center gap-3 border-b border-white/10 pb-5">
        <div className="flex h-14 w-36 items-center justify-center overflow-hidden rounded-xl">
          <img 
            src="/logo.png" 
            alt="Helio Logo" 
            className="h-full w-full object-cover scale-[1.1]" 
          />
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
              {(item.label === "Messages" ? messageBadge : item.label === "Appointments" || item.label === "Requests" ? appointmentBadge : item.badge) ? (
                <span className="rounded-full bg-cyan-400/10 px-2.5 py-1 text-xs text-cyan-200">
                  {item.label === "Messages" ? messageBadge : item.label === "Appointments" || item.label === "Requests" ? appointmentBadge : item.badge}
                </span>
              ) : null}
            </NavLink>
          );
        })}
      </nav>
    </aside>
  );
}
