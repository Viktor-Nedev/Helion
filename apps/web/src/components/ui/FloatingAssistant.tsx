import { useEffect, useRef, useState } from "react";
import { Bot, HeartPulse, Sparkles, Stethoscope } from "lucide-react";

import { gsap, prefersReducedMotion } from "@/lib/gsap";
import { useAppStore } from "@/store/useAppStore";

import { Button } from "./Button";

const quickActions = [
  "Run AI symptom triage",
  "Book urgent doctor",
  "Generate wellness plan",
  "Open mental health bot"
];

export function FloatingAssistant() {
  const { isAssistantOpen, toggleAssistant } = useAppStore();
  const panelRef = useRef<HTMLDivElement>(null);
  const [isRendered, setIsRendered] = useState(isAssistantOpen);

  useEffect(() => {
    if (isAssistantOpen) {
      setIsRendered(true);
    }
  }, [isAssistantOpen]);

  useEffect(() => {
    const panel = panelRef.current;

    if (!panel) {
      return;
    }

    if (prefersReducedMotion()) {
      if (!isAssistantOpen) {
        setIsRendered(false);
      }

      return;
    }

    if (isAssistantOpen) {
      const actions = panel.querySelectorAll("[data-assistant-action]");
      const timeline = gsap.timeline();

      timeline
        .fromTo(panel, { autoAlpha: 0, y: 20, scale: 0.94 }, { autoAlpha: 1, y: 0, scale: 1, duration: 0.38, ease: "power3.out" })
        .fromTo(actions, { autoAlpha: 0, x: 10 }, { autoAlpha: 1, x: 0, duration: 0.28, stagger: 0.05, ease: "power2.out" }, 0.08);

      return () => {
        timeline.kill();
      };
    }

    const tween = gsap.to(panel, {
      autoAlpha: 0,
      y: 20,
      scale: 0.94,
      duration: 0.22,
      ease: "power2.in",
      onComplete: () => setIsRendered(false)
    });

    return () => {
      tween.kill();
    };
  }, [isAssistantOpen, isRendered]);

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-3">
      {isRendered ? (
        <div ref={panelRef} className="glass-panel w-[320px] rounded-[28px] border border-white/10 p-5 shadow-glow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.28em] text-cyan-200">Helio AI</p>
                <h3 className="mt-1 text-lg font-semibold text-white">Your care co-pilot</h3>
              </div>
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-400/30 to-violet-500/30">
                <Bot className="h-5 w-5 text-white" />
              </div>
            </div>

            <div className="mt-5 space-y-3">
              {quickActions.map((action, index) => (
                <button
                  key={action}
                  data-assistant-action
                  className="flex w-full items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-left text-sm text-slate-200 transition hover:border-cyan-400/30 hover:bg-white/[0.06]"
                >
                  {index === 0 ? (
                    <Sparkles className="h-4 w-4 text-cyan-200" />
                  ) : index === 1 ? (
                    <HeartPulse className="h-4 w-4 text-rose-200" />
                  ) : index === 2 ? (
                    <Stethoscope className="h-4 w-4 text-violet-200" />
                  ) : (
                    <Bot className="h-4 w-4 text-emerald-200" />
                  )}
                  {action}
                </button>
              ))}
            </div>

            <p className="mt-5 text-xs leading-6 text-slate-400">
              Helio AI can guide triage, surface records, and suggest the next best healthcare action.
            </p>
          </div>
      ) : null}

      <Button onClick={toggleAssistant} className="h-14 w-14 rounded-full p-0">
        <Bot className="h-5 w-5" />
      </Button>
    </div>
  );
}
