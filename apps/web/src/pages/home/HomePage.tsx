import { useRef } from "react";
import {
  Activity,
  ArrowRight,
  BrainCircuit,
  HeartHandshake,
  HeartPulse,
  MessagesSquare,
  ShieldPlus,
  Sparkles,
  Stethoscope,
  Users,
  Video
} from "lucide-react";
import { Link } from "react-router-dom";

import { HeroVisual } from "@/components/marketing/HeroVisual";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { Button } from "@/components/ui/Button";
import { GlassCard } from "@/components/ui/GlassCard";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { StatCounter } from "@/components/ui/StatCounter";
import { animatedCounters, heroStats, landingFeatures, testimonials } from "@/data/mock";
import { gsap, prefersReducedMotion, useGSAP } from "@/lib/gsap";

const iconMap = [BrainCircuit, Stethoscope, MessagesSquare, Video, Users, Activity];

const steps = [
  {
    title: "Describe symptoms",
    description: "Speak naturally. Helio's AI understands medical context, severity patterns, and timeline clues."
  },
  {
    title: "Get AI insight",
    description: "Receive possible causes, risk color-coding, suggested actions, and follow-up triage prompts."
  },
  {
    title: "Connect doctor instantly",
    description: "Escalate to chat, video, or urgent care in a single premium flow without losing context."
  }
];

export function HomePage() {
  const rootRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!rootRef.current || prefersReducedMotion()) {
        return;
      }

      const timeline = gsap.timeline();

      timeline
        .fromTo("[data-home-hero-badge]", { autoAlpha: 0, y: 18 }, { autoAlpha: 1, y: 0, duration: 0.65, ease: "power3.out" })
        .fromTo("[data-home-hero-title]", { autoAlpha: 0, y: 24 }, { autoAlpha: 1, y: 0, duration: 0.85, ease: "power3.out" }, 0.08)
        .fromTo("[data-home-hero-copy]", { autoAlpha: 0, y: 24 }, { autoAlpha: 1, y: 0, duration: 0.8, ease: "power3.out" }, 0.16)
        .fromTo("[data-home-hero-actions]", { autoAlpha: 0, y: 20 }, { autoAlpha: 1, y: 0, duration: 0.75, ease: "power3.out" }, 0.24)
        .fromTo(
          "[data-home-hero-stat]",
          { autoAlpha: 0, y: 18, scale: 0.96 },
          { autoAlpha: 1, y: 0, scale: 1, duration: 0.7, stagger: 0.08, ease: "power3.out" },
          0.34
        );
    },
    { scope: rootRef }
  );

  return (
    <div ref={rootRef} className="mx-auto max-w-7xl px-4 pb-12 pt-8 md:px-8">
      <section className="grid min-h-[calc(100vh-140px)] items-center gap-14 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <div
            data-home-hero-badge
            className="inline-flex rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.32em] text-cyan-200"
          >
            Next generation digital healthcare platform
          </div>

          <h1
            data-home-hero-title
            className="mt-8 max-w-4xl text-5xl font-bold leading-[0.95] text-white sm:text-6xl lg:text-7xl"
          >
            <span className="text-gradient">Smarter Healthcare</span> Starts Here
          </h1>

          <p
            data-home-hero-copy
            className="mt-6 max-w-2xl text-base leading-8 text-slate-300 md:text-lg"
          >
            Helio unifies AI symptom intelligence, doctor consultations, community care, real-time messaging, analytics,
            and premium telemedicine into one cinematic healthcare ecosystem.
          </p>

          <div
            data-home-hero-actions
            className="mt-10 flex flex-wrap gap-4"
          >
            <MagneticButton>
              <Link to="/register">
                <Button className="min-w-[170px]">
                  Get Started
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </MagneticButton>
            <MagneticButton>
              <a href="#features">
                <Button variant="secondary" className="min-w-[170px]">
                  Explore Features
                </Button>
              </a>
            </MagneticButton>
          </div>

          <div className="mt-12 grid gap-4 md:grid-cols-3">
            {heroStats.map((stat, index) => (
              <div
                key={stat.label}
                data-home-hero-stat
                className="rounded-[26px] border border-white/10 bg-white/[0.03] p-5"
              >
                <p className="text-2xl font-bold text-white">{stat.value}</p>
                <p className="mt-2 text-sm text-slate-400">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        <HeroVisual />
      </section>

      <AnimatedSection id="features" className="mt-20">
        <SectionHeading
          eyebrow="Platform Superpowers"
          title="Premium care flows designed for speed, clarity, and trust"
          description="Every feature is designed to reduce friction in high-stakes moments while still feeling calm, premium, and beautifully modern."
        />

        <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {landingFeatures.map((feature, index) => {
            const Icon = iconMap[index];

            return (
              <GlassCard key={feature.title} className="p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-400/20 to-violet-500/20">
                  <Icon className="h-5 w-5 text-white" />
                </div>
                <h3 className="mt-5 text-xl font-semibold text-white">{feature.title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-300">{feature.description}</p>
              </GlassCard>
            );
          })}
        </div>
      </AnimatedSection>

      <AnimatedSection className="mt-24">
        <SectionHeading
          eyebrow="How It Works"
          title="Three elegant steps from uncertainty to care"
          description="Helio is designed for people who need answers fast without sacrificing medical context or user experience."
        />

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {steps.map((step, index) => (
            <GlassCard key={step.title} className="p-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-400 to-violet-500 text-lg font-bold text-slate-950">
                0{index + 1}
              </div>
              <h3 className="mt-6 text-2xl font-semibold text-white">{step.title}</h3>
              <p className="mt-4 text-sm leading-7 text-slate-300">{step.description}</p>
            </GlassCard>
          ))}
        </div>
      </AnimatedSection>

      <AnimatedSection className="mt-24">
        <SectionHeading
          eyebrow="Social Proof"
          title="Loved by patients, trusted by doctors"
          description="Premium experience matters most when someone's health and peace of mind are on the line."
        />

        <div className="mt-10 grid gap-5 xl:grid-cols-3">
          {testimonials.map((item) => (
            <GlassCard key={item.name} className="p-6">
              <Sparkles className="h-5 w-5 text-cyan-200" />
              <p className="mt-5 text-lg leading-8 text-slate-100">"{item.quote}"</p>
              <div className="mt-8">
                <p className="font-semibold text-white">{item.name}</p>
                <p className="text-sm text-slate-400">{item.role}</p>
              </div>
            </GlassCard>
          ))}
        </div>
      </AnimatedSection>

      <AnimatedSection className="mt-24">
        <GlassCard className="overflow-hidden p-8 md:p-10">
          <div className="grid gap-10 lg:grid-cols-[0.6fr_1fr] lg:items-center">
            <div>
              <div className="inline-flex rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-emerald-200">
                Live Platform Momentum
              </div>
              <h2 className="mt-5 text-4xl font-bold text-white">Cinematic product, real healthcare outcomes</h2>
              <p className="mt-4 text-sm leading-7 text-slate-300">
                Premium design is only meaningful when it supports measurable trust, faster action, and better health decisions.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {animatedCounters.map((counter) => (
                <StatCounter key={counter.label} value={counter.value} label={counter.label} />
              ))}
            </div>
          </div>
        </GlassCard>
      </AnimatedSection>

      <AnimatedSection className="mt-24">
        <GlassCard className="overflow-hidden p-8 md:p-10">
          <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <div className="flex items-center gap-3">
                <ShieldPlus className="h-5 w-5 text-cyan-200" />
                <span className="text-sm uppercase tracking-[0.28em] text-cyan-200">Helio Premium Care</span>
              </div>
              <h2 className="mt-4 max-w-2xl text-4xl font-bold text-white">
                AI insight, instant doctor access, community support, and personal analytics in one place.
              </h2>
            </div>
            <div className="flex flex-wrap gap-4">
              <Link to="/register">
                <Button>
                  Start Your Journey
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link to="/login">
                <Button variant="secondary">Open Demo Portal</Button>
              </Link>
            </div>
          </div>
        </GlassCard>
      </AnimatedSection>
    </div>
  );
}
