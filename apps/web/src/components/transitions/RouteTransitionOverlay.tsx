import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

import { gsap, prefersReducedMotion, useGSAP } from "@/lib/gsap";

export function RouteTransitionOverlay() {
  const location = useLocation();
  const overlayRef = useRef<HTMLDivElement>(null);
  const veilRef = useRef<HTMLDivElement>(null);
  const coreRef = useRef<HTMLDivElement>(null);
  const ringOneRef = useRef<HTMLDivElement>(null);
  const ringTwoRef = useRef<HTMLDivElement>(null);
  const flareRef = useRef<HTMLDivElement>(null);
  const lastPathRef = useRef<string | null>(null);

  useGSAP(
    () => {
      gsap.set(overlayRef.current, { autoAlpha: 0 });
      gsap.set([veilRef.current, coreRef.current, ringOneRef.current, ringTwoRef.current, flareRef.current], { autoAlpha: 0 });
      gsap.set([coreRef.current, ringOneRef.current, ringTwoRef.current], { scale: 0.24 });
      gsap.set(flareRef.current, { scaleX: 0.2 });
    },
    { scope: overlayRef }
  );

  useEffect(() => {
    if (lastPathRef.current === null) {
      lastPathRef.current = location.pathname;
      return;
    }

    if (lastPathRef.current === location.pathname) {
      return;
    }

    lastPathRef.current = location.pathname;

    if (prefersReducedMotion()) {
      window.scrollTo({ top: 0, behavior: "auto" });
      return;
    }

    const timeline = gsap.timeline();

    timeline
      .set(overlayRef.current, { autoAlpha: 1 })
      .fromTo(veilRef.current, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.14, ease: "power1.out" })
      .fromTo(coreRef.current, { autoAlpha: 0, scale: 0.18, rotate: -24 }, { autoAlpha: 0.95, scale: 1.1, rotate: 0, duration: 0.34, ease: "back.out(1.5)" }, 0)
      .fromTo(ringOneRef.current, { autoAlpha: 0, scale: 0.18 }, { autoAlpha: 0.7, scale: 2.4, duration: 0.42, ease: "power3.out" }, 0.05)
      .fromTo(ringTwoRef.current, { autoAlpha: 0, scale: 0.12 }, { autoAlpha: 0.45, scale: 3.6, duration: 0.5, ease: "power4.out" }, 0.08)
      .fromTo(flareRef.current, { autoAlpha: 0, scaleX: 0.3 }, { autoAlpha: 0.9, scaleX: 1, duration: 0.18, ease: "power2.out" }, 0.08)
      .to(coreRef.current, { scale: 14, autoAlpha: 0, duration: 0.58, ease: "power4.out" }, 0.2)
      .to(ringOneRef.current, { scale: 18, autoAlpha: 0, duration: 0.6, ease: "power4.out" }, 0.22)
      .to(ringTwoRef.current, { scale: 22, autoAlpha: 0, duration: 0.66, ease: "power4.out" }, 0.22)
      .to(flareRef.current, { autoAlpha: 0, duration: 0.18, ease: "power2.inOut" }, 0.24)
      .to(veilRef.current, { autoAlpha: 0, duration: 0.24, ease: "power2.inOut" }, 0.42)
      .set(overlayRef.current, { autoAlpha: 0 });

    gsap.to(window, {
      duration: 0.65,
      ease: "power2.out",
      scrollTo: 0,
      overwrite: "auto"
    });

    return () => {
      timeline.kill();
    };
  }, [location.pathname]);

  return (
    <div ref={overlayRef} className="pointer-events-none fixed inset-0 z-[55] overflow-hidden opacity-0">
      <div ref={veilRef} className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(78,233,255,0.12),rgba(7,10,22,0.72)_38%,rgba(4,7,19,0.96)_72%)]" />
      <div ref={flareRef} className="absolute left-1/2 top-1/2 h-[2px] w-[58vw] -translate-x-1/2 -translate-y-1/2 bg-[linear-gradient(90deg,transparent,rgba(78,233,255,0.95),rgba(255,255,255,0.95),rgba(139,92,246,0.85),transparent)] blur-md" />
      <div ref={ringTwoRef} className="absolute left-1/2 top-1/2 h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full border border-violet-300/40" />
      <div ref={ringOneRef} className="absolute left-1/2 top-1/2 h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-200/60" />
      <div ref={coreRef} className="absolute left-1/2 top-1/2 h-28 w-28 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle_at_35%_35%,rgba(255,255,255,0.98),rgba(78,233,255,0.92),rgba(139,92,246,0.65),rgba(4,7,19,0.02))] blur-sm" />
    </div>
  );
}
