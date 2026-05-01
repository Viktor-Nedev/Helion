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

      <GlassCard data-hero-visual-card className="relative overflow-hidden p-0 h-[640px]">
        <div className="absolute right-6 top-6 z-10">
          <StatusPill label="Helio AI Active" tone="cyan" />
        </div>

        <div className="absolute inset-x-0 top-0 h-full">
          <AIAssistantAvatar mode="idle" className="h-full w-full rounded-none border-none" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-60" />
        </div>

        <div className="absolute inset-x-0 bottom-0 p-8 pt-20">
          <p className="text-xs uppercase tracking-[0.32em] text-cyan-200">Interactive Assistant</p>
          <h3 className="mt-2 text-3xl font-bold text-white leading-tight">Your personal cinematic health companion</h3>
          <p className="mt-4 text-sm leading-7 text-slate-300">
            Real-time medical triage, personalized analytics, and instant care escalation through our state-of-the-art AI.
          </p>
        </div>
      </GlassCard>
    </div>
  );
}
