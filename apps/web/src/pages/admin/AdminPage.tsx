import { Flag, ShieldCheck, Stethoscope, Users } from "lucide-react";

import { AnalyticsChart } from "@/components/dashboard/AnalyticsChart";
import { GlassCard } from "@/components/ui/GlassCard";
import { PageHeader } from "@/components/ui/PageHeader";

const adminTrend = [
  { label: "Mon", value: 180, secondary: 32 },
  { label: "Tue", value: 220, secondary: 28 },
  { label: "Wed", value: 260, secondary: 34 },
  { label: "Thu", value: 290, secondary: 29 },
  { label: "Fri", value: 330, secondary: 31 },
  { label: "Sat", value: 350, secondary: 26 },
  { label: "Sun", value: 370, secondary: 21 }
];

export function AdminPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        badge="Hidden Control Surface"
        title="Admin observatory"
        description="Manage users, verify doctors, review reports, monitor revenue, and moderate community activity from a premium back-office dashboard."
      />

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {[
          { icon: Users, label: "Total users", value: "12,480" },
          { icon: Stethoscope, label: "Verified doctors", value: "428" },
          { icon: Flag, label: "Reports", value: "11" },
          { icon: ShieldCheck, label: "Verification queue", value: "9" }
        ].map((metric) => (
          <GlassCard key={metric.label} className="p-6">
            <metric.icon className="h-5 w-5 text-cyan-200" />
            <p className="mt-4 text-sm text-slate-400">{metric.label}</p>
            <p className="mt-2 text-3xl font-bold text-white">{metric.value}</p>
          </GlassCard>
        ))}
      </div>

      <AnalyticsChart
        data={adminTrend}
        title="Platform analytics"
        description="Revenue and moderation signal overview across the current week."
      />

      <div className="grid gap-5 xl:grid-cols-3">
        {[
          "Review pending doctor verifications",
          "Moderate flagged community posts",
          "Inspect platform revenue anomalies"
        ].map((task) => (
          <GlassCard key={task} className="p-6">
            <h3 className="text-xl font-semibold text-white">{task}</h3>
            <p className="mt-3 text-sm leading-7 text-slate-300">
              This hidden admin view is scaffolded for moderation, trust and safety, and platform operations workflows.
            </p>
          </GlassCard>
        ))}
      </div>
    </div>
  );
}
