import { AlertCircle, ArrowRight, ShieldCheck, Sparkles, Stethoscope } from "lucide-react";

import type { SymptomAnalysis } from "@helio/shared";

import { Button } from "@/components/ui/Button";
import { GlassCard } from "@/components/ui/GlassCard";
import { riskTone } from "@/lib/utils";

export function AnalysisCard({ analysis }: { analysis: SymptomAnalysis }) {
  return (
    <div className="grid gap-5 xl:grid-cols-2">
      <GlassCard className="p-6">
        <div className="flex items-center gap-3">
          <Sparkles className="h-5 w-5 text-cyan-200" />
          <h3 className="text-xl font-semibold text-white">Possible Causes</h3>
        </div>
        <ul className="mt-5 space-y-3 text-sm leading-7 text-slate-300">
          {analysis.possibleCauses.map((cause) => (
            <li key={cause} className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3">
              {cause}
            </li>
          ))}
        </ul>
      </GlassCard>

      <GlassCard className="p-6">
        <div className="flex items-center gap-3">
          <AlertCircle className="h-5 w-5 text-amber-200" />
          <h3 className="text-xl font-semibold text-white">Risk Level</h3>
        </div>
        <div className={`mt-5 inline-flex rounded-full px-4 py-2 text-sm font-semibold ring-1 ${riskTone(analysis.riskLevel)}`}>
          {analysis.riskLevel.toUpperCase()}
        </div>
        <p className="mt-4 text-sm leading-7 text-slate-300">{analysis.summary}</p>
      </GlassCard>

      <GlassCard className="p-6">
        <div className="flex items-center gap-3">
          <ShieldCheck className="h-5 w-5 text-emerald-200" />
          <h3 className="text-xl font-semibold text-white">Suggested Actions</h3>
        </div>
        <ul className="mt-5 space-y-3 text-sm leading-7 text-slate-300">
          {analysis.suggestedActions.map((action) => (
            <li key={action} className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3">
              {action}
            </li>
          ))}
        </ul>
      </GlassCard>

      <GlassCard className="p-6">
        <div className="flex items-center gap-3">
          <Stethoscope className="h-5 w-5 text-violet-200" />
          <h3 className="text-xl font-semibold text-white">Recommended Specialist</h3>
        </div>
        <p className="mt-5 text-2xl font-semibold text-white">{analysis.recommendedSpecialist}</p>
        <div className="mt-5 space-y-3">
          {analysis.followUp.map((question) => (
            <div key={question} className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-slate-300">
              {question}
            </div>
          ))}
        </div>
        <Button className="mt-6 w-full">
          Talk to Doctor Now
          <ArrowRight className="h-4 w-4" />
        </Button>
      </GlassCard>
    </div>
  );
}
