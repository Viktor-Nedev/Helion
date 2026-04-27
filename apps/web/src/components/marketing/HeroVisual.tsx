import { Activity, HeartPulse, ShieldPlus, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

import { GlassCard } from "@/components/ui/GlassCard";
import { StatusPill } from "@/components/ui/StatusPill";

export function HeroVisual() {
  return (
    <div className="relative mx-auto w-full max-w-[520px]">
      <motion.div
        animate={{ y: [0, -16, 0], rotate: [-2, 2, -2] }}
        transition={{ repeat: Number.POSITIVE_INFINITY, duration: 8, ease: "easeInOut" }}
        className="absolute left-1/2 top-4 h-36 w-36 -translate-x-1/2 rounded-full bg-cyan-400/20 blur-[80px]"
      />

      <GlassCard className="relative overflow-hidden p-6 md:p-8">
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
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="rounded-[20px] border border-white/10 bg-black/20 p-4"
              >
                <div className="text-xs text-slate-400">{label}</div>
                <div className="mt-2 text-lg font-semibold text-white">{index === 0 ? "24/7" : index === 1 ? "4K" : "Live"}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </GlassCard>
    </div>
  );
}
