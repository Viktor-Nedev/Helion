import { useRef } from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";

import { PageTransition } from "@/components/transitions/PageTransition";
import { gsap, prefersReducedMotion, useGSAP } from "@/lib/gsap";
import { useAppStore } from "@/store/useAppStore";

import { Sidebar } from "./Sidebar";
import { Topbar } from "./Topbar";

export function DashboardLayout() {
  const { role } = useAppStore();
  const location = useLocation();
  const rootRef = useRef<HTMLDivElement>(null);
  const mobileNav =
    role === "doctor"
      ? [
          { label: "Dashboard", path: "/doctor-dashboard" },
          { label: "Messages", path: "/messages" },
          { label: "Appointments", path: "/appointments" },
          { label: "Calendar", path: "/appointments" }
        ]
      : [
          { label: "Dashboard", path: "/dashboard" },
          { label: "AI", path: "/ai-diagnosis" },
          { label: "Doctors", path: "/doctors" },
          { label: "Messages", path: "/messages" }
        ];

  useGSAP(
    () => {
      if (!rootRef.current || prefersReducedMotion()) {
        return;
      }

      const chrome = rootRef.current.querySelectorAll("[data-dashboard-chrome]");
      gsap.fromTo(chrome, { autoAlpha: 0, y: 22 }, { autoAlpha: 1, y: 0, duration: 0.8, stagger: 0.08, ease: "power3.out" });
    },
    { scope: rootRef, dependencies: [] }
  );

  return (
    <div ref={rootRef} className="mx-auto flex min-h-screen max-w-[1600px] gap-6 px-4 py-4 md:px-6">
      <div data-dashboard-chrome>
        <Sidebar role={role} />
      </div>
      <main className="flex-1 pb-10">
        <div data-dashboard-chrome>
          <Topbar role={role} />
        </div>
        <div data-dashboard-chrome className="scrollbar-none mt-4 flex gap-3 overflow-x-auto lg:hidden">
          {mobileNav.map((item) => (
            <NavLink
              key={`${item.path}-${item.label}`}
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
        <PageTransition key={location.pathname} className="mt-6">
          <Outlet />
        </PageTransition>
      </main>
    </div>
  );
}
