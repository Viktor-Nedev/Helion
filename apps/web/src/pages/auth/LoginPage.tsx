import { useState, type FormEvent } from "react";
import { ArrowRight, HeartPulse, ShieldCheck, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/Button";
import { GlassCard } from "@/components/ui/GlassCard";
import { loginWithEmail } from "@/lib/api";
import { useAppStore } from "@/store/useAppStore";

export function LoginPage() {
  const navigate = useNavigate();
  const { setRole } = useAppStore();
  const [email, setEmail] = useState("mila@helio.health");
  const [password, setPassword] = useState("PremiumDemo123");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);

    const result = await loginWithEmail(email, password);
    setRole(result.role);
    navigate(result.role === "doctor" ? "/doctor-dashboard" : "/dashboard");
    setLoading(false);
  }

  return (
    <div className="mx-auto grid min-h-[calc(100vh-220px)] max-w-7xl gap-8 px-4 py-8 md:px-8 lg:grid-cols-[0.92fr_1.08fr]">
      <GlassCard className="relative overflow-hidden p-8 md:p-10">
        <div className="absolute right-10 top-10 h-40 w-40 rounded-full bg-cyan-400/20 blur-[90px]" />
        <div className="relative">
          <div className="inline-flex rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-cyan-200">
            Secure Premium Access
          </div>
          <h1 className="mt-6 text-5xl font-bold text-white">Welcome back to Helio</h1>
          <p className="mt-4 max-w-xl text-base leading-8 text-slate-300">
            Continue your care journey with AI diagnostics, doctor messaging, video consultations, and your personal health command center.
          </p>

          <div className="mt-10 grid gap-4">
            {[
              "Real-time messaging with doctors",
              "Telemedicine rooms with notes and prescriptions",
              "Always-on AI assistant and symptom triage"
            ].map((item) => (
              <div key={item} className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-4">
                <ShieldCheck className="h-5 w-5 text-cyan-200" />
                <span className="text-sm text-slate-200">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </GlassCard>

      <GlassCard className="p-8 md:p-10">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-400 to-violet-500 text-slate-950">
            <HeartPulse className="h-5 w-5" />
          </div>
          <div>
            <p className="text-sm font-semibold text-white">Sign in</p>
            <p className="text-sm text-slate-400">Access your premium healthcare workspace</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          <label className="block">
            <span className="text-sm text-slate-300">Email</span>
            <input
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="mt-2 w-full rounded-[22px] border border-white/10 bg-white/[0.04] px-4 py-3 text-white outline-none transition focus:border-cyan-300/40"
            />
          </label>

          <label className="block">
            <span className="text-sm text-slate-300">Password</span>
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="mt-2 w-full rounded-[22px] border border-white/10 bg-white/[0.04] px-4 py-3 text-white outline-none transition focus:border-cyan-300/40"
            />
          </label>

          <motion.div whileHover={{ y: -2 }} className="pt-2">
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Opening workspace..." : "Login"}
              <ArrowRight className="h-4 w-4" />
            </Button>
          </motion.div>
        </form>

        <div className="mt-8 rounded-[24px] border border-white/10 bg-white/[0.03] p-5">
          <div className="flex items-center gap-2 text-cyan-200">
            <Sparkles className="h-4 w-4" />
            <span className="text-sm font-medium">Demo hint</span>
          </div>
          <p className="mt-2 text-sm leading-7 text-slate-300">
            Use an email containing <span className="text-white">doctor</span> to land in the doctor dashboard. Any other email opens the patient experience.
          </p>
        </div>
      </GlassCard>
    </div>
  );
}
