import { AlertCircle, ArrowRight, ShieldCheck, Sparkles, Stethoscope } from "lucide-react";

import type { SymptomAnalysis } from "@helio/shared";

import { Button } from "@/components/ui/Button";
import { GlassCard } from "@/components/ui/GlassCard";
import { riskTone } from "@/lib/utils";

export function AnalysisCard({ analysis }: { analysis: SymptomAnalysis }) {
  return (
    <div className="grid gap-5">
      <div className="grid gap-5 lg:grid-cols-2">
        <GlassCard className="p-8">
          <div className="flex items-center gap-3">
            <Sparkles className="h-6 w-6 text-cyan-200" />
            <h3 className="text-2xl font-semibold text-white">Possible Causes</h3>
          </div>
          <ul className="mt-6 space-y-4 text-sm leading-8 text-slate-300">
            {analysis.possibleCauses.map((cause) => (
              <li key={cause} className="rounded-3xl border border-white/10 bg-white/[0.04] px-5 py-4">
                {cause}
              </li>
            ))}
          </ul>
        </GlassCard>

        <GlassCard className="p-8">
          <div className="flex items-center gap-3">
            <AlertCircle className="h-6 w-6 text-amber-200" />
            <h3 className="text-2xl font-semibold text-white">Risk Level</h3>
          </div>
          <div className={`mt-6 inline-flex rounded-full px-6 py-2.5 text-base font-bold ring-2 ${riskTone(analysis.riskLevel)}`}>
            {analysis.riskLevel.toUpperCase()}
          </div>
          <p className="mt-6 text-base leading-9 text-slate-300">{analysis.summary}</p>
        </GlassCard>
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        <GlassCard className="p-8">
          <div className="flex items-center gap-3">
            <ShieldCheck className="h-6 w-6 text-emerald-200" />
            <h3 className="text-2xl font-semibold text-white">Suggested Actions</h3>
          </div>
          <ul className="mt-6 space-y-4 text-sm leading-8 text-slate-300">
            {analysis.suggestedActions.map((action) => (
              <li key={action} className="rounded-3xl border border-white/10 bg-white/[0.04] px-5 py-4">
                {action}
              </li>
            ))}
          </ul>
        </GlassCard>

        <GlassCard className="p-8">
          <div className="flex items-center gap-3">
            <Stethoscope className="h-6 w-6 text-violet-200" />
            <h3 className="text-2xl font-semibold text-white">Recommended Specialist</h3>
          </div>
          <p className="mt-6 text-3xl font-bold text-white">{analysis.recommendedSpecialist}</p>
          <div className="mt-6 space-y-3">
            {analysis.followUp.map((question) => (
              <div key={question} className="rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-4 text-sm text-slate-300">
                {question}
              </div>
            ))}
          </div>
        </GlassCard>
      </div>

      <GlassCard className="mt-2 p-8 bg-gradient-to-br from-cyan-400/10 to-violet-500/10 border-cyan-400/20">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h4 className="text-xl font-bold text-white">Need immediate care?</h4>
            <p className="mt-2 text-sm text-slate-400">Escalate this analysis to a live specialist or start an emergency protocol.</p>
          </div>
          <div className="flex flex-wrap gap-4">
            <Button size="lg" className="min-w-[180px]">
              Talk to Doctor Now
              <ArrowRight className="h-4 w-4" />
            </Button>
            <Button variant="secondary" size="lg" className="min-w-[180px] border-red-500/20 text-red-200 hover:bg-red-500/10">
              Emergency Mode
            </Button>
          </div>
        </div>
      </GlassCard>
    </div>
  );
}
