import { ArrowDownRight, ArrowRight, ArrowUpRight } from "lucide-react";

import type { DashboardMetric } from "@helio/shared";

import { trendTone } from "@/lib/utils";

import { GlassCard } from "../ui/GlassCard";

export function MetricCard({ metric }: { metric: DashboardMetric }) {
  const TrendIcon = metric.trend === "up" ? ArrowUpRight : metric.trend === "down" ? ArrowDownRight : ArrowRight;

  return (
    <GlassCard className="p-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm text-slate-400">{metric.label}</p>
          <p className="mt-3 text-3xl font-bold text-white">{metric.value}</p>
        </div>
        <div className={`rounded-2xl p-3 ${metric.tone === "emerald" ? "bg-emerald-400/10" : metric.tone === "violet" ? "bg-violet-400/10" : metric.tone === "rose" ? "bg-rose-400/10" : "bg-cyan-400/10"}`}>
          <TrendIcon className={`h-5 w-5 ${trendTone(metric.trend)}`} />
        </div>
      </div>
      <p className={`mt-4 text-sm ${trendTone(metric.trend)}`}>{metric.delta}</p>
    </GlassCard>
  );
}
