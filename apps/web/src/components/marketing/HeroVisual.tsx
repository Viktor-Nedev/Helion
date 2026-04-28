import { useRef } from "react";
import { Activity, HeartPulse, ShieldPlus, Sparkles } from "lucide-react";

import { gsap, prefersReducedMotion, useGSAP } from "@/lib/gsap";
import { GlassCard } from "@/components/ui/GlassCard";
import { StatusPill } from "@/components/ui/StatusPill";

export function HeroVisual() {
  const rootRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!rootRef.current || prefersReducedMotion()) {
        return;
      }

      const timeline = gsap.timeline();

      timeline
        .fromTo("[data-hero-orb]", { autoAlpha: 0, scale: 0.72 }, { autoAlpha: 1, scale: 1, duration: 0.7, ease: "power3.out" })
        .fromTo(
          "[data-hero-visual-card]",
          { autoAlpha: 0, y: 28, scale: 0.96 },
          { autoAlpha: 1, y: 0, scale: 1, duration: 0.85, ease: "power3.out" },
          0.08
        )
        .fromTo(
          "[data-hero-visual-chip]",
          { autoAlpha: 0, y: 14 },
          { autoAlpha: 1, y: 0, duration: 0.45, stagger: 0.08, ease: "power2.out" },
          0.22
        );

      gsap.to("[data-hero-orb]", {
        y: -16,
        rotate: 2,
        duration: 4.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });
    },
    { scope: rootRef }
  );

  return (
    <div ref={rootRef} className="relative mx-auto w-full max-w-[520px]">
      <div
        data-hero-orb
        className="absolute left-1/2 top-4 h-36 w-36 -translate-x-1/2 rounded-full bg-cyan-400/20 blur-[80px]"
      />

      <GlassCard data-hero-visual-card className="relative overflow-hidden p-6 md:p-8">
        <div className="absolute right-6 top-6">
          <StatusPill label="AI Synced" tone="cyan" />
        </div>

        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.32em] text-slate-400">Helio Pulse Deck</p>
            <h3 className="mt-2 text-2xl font-bold text-white">Holographic care console</h3>
          </div>
          <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-gradient-to-br from-cyan-400 to-violet-500 text-slate-950 shadow-glow">
            <HeartPulse className="h-6 w-6" />
          </div>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          <div className="rounded-[24px] border border-white/10 bg-white/[0.04] p-5">
            <div className="flex items-center gap-3">
              <Activity className="h-5 w-5 text-cyan-200" />
              <span className="text-sm text-slate-300">Health Score</span>
            </div>
            <div className="mt-4 text-5xl font-bold text-white">86</div>
            <p className="mt-2 text-sm text-emerald-300">Recovery trend improving</p>
          </div>

          <div className="rounded-[24px] border border-white/10 bg-white/[0.04] p-5">
            <div className="flex items-center gap-3">
              <ShieldPlus className="h-5 w-5 text-violet-200" />
              <span className="text-sm text-slate-300">Risk Scan</span>
            </div>
            <div className="mt-4 text-5xl font-bold text-white">Low</div>
            <p className="mt-2 text-sm text-cyan-300">Live monitored by AI</p>
          </div>
        </div>

        <div className="mt-6 rounded-[28px] border border-white/10 bg-gradient-to-r from-cyan-400/10 to-violet-500/10 p-5">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm text-slate-300">Next doctor availability</p>
              <p className="mt-2 text-xl font-semibold text-white">Today, 19:00 with Dr. Emma Chen</p>
            </div>
            <Sparkles className="h-5 w-5 text-cyan-200" />
          </div>

          <div className="mt-5 grid grid-cols-3 gap-3">
            {["AI Checks", "Video Calls", "Wellness Sync"].map((label, index) => (
              <div
                key={label}
                data-hero-visual-chip
                className="rounded-[20px] border border-white/10 bg-black/20 p-4"
              >
                <div className="text-xs text-slate-400">{label}</div>
                <div className="mt-2 text-lg font-semibold text-white">{index === 0 ? "24/7" : index === 1 ? "4K" : "Live"}</div>
              </div>
            ))}
          </div>
        </div>
      </GlassCard>
    </div>
  );
}
