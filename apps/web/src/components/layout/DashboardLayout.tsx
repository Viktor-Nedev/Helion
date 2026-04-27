import { NavLink } from "react-router-dom";
import { Outlet } from "react-router-dom";

import { useAppStore } from "@/store/useAppStore";

import { Sidebar } from "./Sidebar";
import { Topbar } from "./Topbar";

export function DashboardLayout() {
  const { role } = useAppStore();
  const mobileNav =
    role === "doctor"
      ? [
          { label: "Dashboard", path: "/doctor-dashboard" },
          { label: "Messages", path: "/messages" },
          { label: "Appointments", path: "/appointments" },
          { label: "Calls", path: "/video-calls" }
        ]
      : [
          { label: "Dashboard", path: "/dashboard" },
          { label: "AI", path: "/ai-diagnosis" },
          { label: "Doctors", path: "/doctors" },
          { label: "Messages", path: "/messages" }
        ];

  return (
    <div className="mx-auto flex min-h-screen max-w-[1600px] gap-6 px-4 py-4 md:px-6">
      <Sidebar role={role} />
      <main className="flex-1 pb-10">
        <Topbar role={role} />
        <div className="scrollbar-none mt-4 flex gap-3 overflow-x-auto lg:hidden">
          {mobileNav.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `whitespace-nowrap rounded-full border px-4 py-2 text-sm transition ${
                  isActive
                    ? "border-cyan-300/30 bg-cyan-400/10 text-cyan-200"
                    : "border-white/10 bg-white/[0.03] text-slate-300"
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </div>
        <div className="mt-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
