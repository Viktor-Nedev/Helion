import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

import { gsap, prefersReducedMotion, useGSAP } from "@/lib/gsap";

/**
 * Elegant route transition overlay.
 *
 * On every navigation a thin luminous bar sweeps horizontally across the
 * viewport (left → right) while a soft bloom briefly fills the background.
 * The whole sequence completes in ≈ 650 ms — fast enough to feel snappy,
 * slow enough to be perceptibly cinematic.
 */
export function RouteTransitionOverlay() {
  const location = useLocation();
  const overlayRef = useRef<HTMLDivElement>(null);
  const bloomRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const shineRef = useRef<HTMLDivElement>(null);
  const lastPathRef = useRef<string | null>(null);

  useGSAP(
    () => {
      gsap.set(overlayRef.current, { autoAlpha: 0 });
      gsap.set([bloomRef.current, barRef.current, shineRef.current], { autoAlpha: 0 });
      gsap.set(barRef.current, { scaleX: 0, transformOrigin: "left center" });
      gsap.set(shineRef.current, { scaleX: 0, transformOrigin: "left center" });
    },
    { scope: overlayRef }
  );

  useEffect(() => {
    if (lastPathRef.current === null) {
      lastPathRef.current = location.pathname;
      return;
    }

    if (lastPathRef.current === location.pathname) return;
    lastPathRef.current = location.pathname;

    if (prefersReducedMotion()) {
      window.scrollTo({ top: 0, behavior: "auto" });
      return;
    }

    const tl = gsap.timeline();

    tl
      // Fade in a very subtle full-screen bloom
      .set(overlayRef.current, { autoAlpha: 1 })
      .fromTo(bloomRef.current, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.18, ease: "power1.out" })
      // Sweep the luminous bar across
      .fromTo(
        barRef.current,
        { autoAlpha: 1, scaleX: 0, transformOrigin: "left center" },
        { autoAlpha: 1, scaleX: 1, duration: 0.38, ease: "power3.inOut" },
        0.04
      )
      // Trailing shine slightly delayed
      .fromTo(
        shineRef.current,
        { autoAlpha: 0.7, scaleX: 0, transformOrigin: "left center" },
        { autoAlpha: 0, scaleX: 1, duration: 0.44, ease: "power4.out" },
        0.08
      )
      // Fade out bloom + bar together
      .to(bloomRef.current, { autoAlpha: 0, duration: 0.22, ease: "power2.inOut" }, 0.34)
      .to(barRef.current, { autoAlpha: 0, duration: 0.16, ease: "power1.inOut" }, 0.4)
      .set(overlayRef.current, { autoAlpha: 0 });

    gsap.to(window, { duration: 0.55, ease: "power2.out", scrollTo: 0, overwrite: "auto" });

    return () => { tl.kill(); };
  }, [location.pathname]);

  return (
    <div
      ref={overlayRef}
      className="pointer-events-none fixed inset-0 z-[55] overflow-hidden opacity-0"
    >
      {/* Soft full-screen luminance bloom */}
      <div
        ref={bloomRef}
        className="absolute inset-0 bg-[radial-gradient(ellipse_120%_80%_at_50%_0%,rgba(78,233,255,0.06),transparent_60%)]"
      />

      {/* Primary sweep bar */}
      <div
        ref={barRef}
        className="absolute left-0 top-1/2 h-[2px] w-full -translate-y-1/2 bg-[linear-gradient(90deg,rgba(78,233,255,0.0),rgba(78,233,255,0.9)_18%,rgba(255,255,255,1)_50%,rgba(139,92,246,0.9)_82%,rgba(139,92,246,0.0))]"
        style={{ filter: "blur(0.5px)" }}
      />

      {/* Broader diffuse shine trailing behind */}
      <div
        ref={shineRef}
        className="absolute left-0 top-1/2 h-[18px] w-full -translate-y-1/2 bg-[linear-gradient(90deg,transparent,rgba(78,233,255,0.18)_30%,rgba(255,255,255,0.28)_50%,rgba(139,92,246,0.18)_70%,transparent)]"
        style={{ filter: "blur(6px)" }}
      />
    </div>
  );
}
