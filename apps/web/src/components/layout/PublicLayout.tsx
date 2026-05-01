import { ActivitySquare, ArrowRight, HeartPulse } from "lucide-react";
import { useRef } from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";

import { PageTransition } from "@/components/transitions/PageTransition";
import { Button } from "@/components/ui/Button";
import { gsap, prefersReducedMotion, useGSAP } from "@/lib/gsap";

const links = [
  { label: "Features", href: "/register" },
  { label: "Doctors", href: "/register" },
  { label: "Community", href: "/register" },
  { label: "AI Checker", href: "/register" }
];

export function PublicLayout() {
  const location = useLocation();
  const rootRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!rootRef.current || prefersReducedMotion()) {
        return;
      }

      const chrome = rootRef.current.querySelectorAll("[data-public-chrome]");
      const footer = rootRef.current.querySelector("[data-public-footer]");

      gsap.fromTo(chrome, { autoAlpha: 0, y: -18 }, { autoAlpha: 1, y: 0, duration: 0.7, stagger: 0.08, ease: "power3.out" });

      if (footer) {
        gsap.fromTo(
          footer,
          { autoAlpha: 0, y: 28 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.85,
            ease: "power3.out",
            scrollTrigger: {
              trigger: footer,
              start: "top bottom",
              once: true
            }
          }
        );
      }
    },
    { scope: rootRef, dependencies: [] }
  );

  return (
    <div ref={rootRef} className="relative min-h-screen">
      <header className="sticky top-0 z-40 mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-4 md:px-8">
        <div data-public-chrome className="flex items-center gap-3">
          <div className="flex h-12 w-32 items-center justify-center overflow-hidden rounded-xl">
            <img 
              src="/logo.png" 
              alt="Helio Logo" 
              className="h-full w-full object-cover scale-[1.1]" 
            />
          </div>
        </div>

        <nav data-public-chrome className="glass-panel hidden items-center gap-2 rounded-full px-3 py-2 lg:flex">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="rounded-full px-4 py-2 text-sm text-slate-300 transition hover:bg-white/10 hover:text-white"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div data-public-chrome className="flex items-center gap-3">
          <NavLink to="/login" className="hidden text-sm text-slate-300 transition hover:text-white md:block">
            Sign in
          </NavLink>
          <NavLink to="/register">
            <Button>
              Get Started
              <ArrowRight className="h-4 w-4" />
            </Button>
          </NavLink>
        </div>
      </header>

      <PageTransition key={location.pathname}>
        <Outlet />
      </PageTransition>

      <footer data-public-footer className="mx-auto mt-20 max-w-7xl px-4 pb-10 md:px-8">
        <div className="glass-panel rounded-[30px] p-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <div className="flex items-center gap-3">
                <HeartPulse className="h-5 w-5 text-cyan-200" />
                <span className="text-lg font-semibold text-white">Helio</span>
              </div>
              <p className="mt-3 max-w-xl text-sm leading-7 text-slate-400">
                Premium digital healthcare for AI triage, doctor access, wellness analytics, and modern human-centered care.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-5 text-sm text-slate-400 sm:grid-cols-4">
              <span>Platform</span>
              <span>Doctors</span>
              <span>Community</span>
              <span>Privacy</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
