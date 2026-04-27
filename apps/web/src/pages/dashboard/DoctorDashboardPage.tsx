import { Clock3, DollarSign, HeartHandshake, ShieldCheck, UserRoundPlus, Video } from "lucide-react";

import { AnalyticsChart } from "@/components/dashboard/AnalyticsChart";
import { MetricCard } from "@/components/dashboard/MetricCard";
import { GlassCard } from "@/components/ui/GlassCard";
import { PageHeader } from "@/components/ui/PageHeader";
import { StatusPill } from "@/components/ui/StatusPill";
import { doctorOverview } from "@/data/mock";

export function DoctorDashboardPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        badge="Doctor Intelligence Layer"
        title="Clinical workflow, patient requests, and telemedicine analytics"
        description="A premium command center for managing appointments, fast responses, AI-assisted triage, and care quality at scale."
      />

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {doctorOverview.metrics.map((metric) => (
          <MetricCard key={metric.label} metric={metric} />
        ))}
      </div>

      <div className="grid gap-5 xl:grid-cols-[1.1fr_0.9fr]">
        <AnalyticsChart
          data={doctorOverview.analytics}
          title="Consultation analytics"
          description="Track consultation throughput, follow-up intensity, and AI support volume across the week."
        />

        <GlassCard className="p-6">
          <h3 className="text-xl font-semibold text-white">Clinical signals</h3>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {[
              { icon: Clock3, label: "Response Time", value: "4m 12s", tone: "cyan" as const },
              { icon: ShieldCheck, label: "Rating Score", value: "4.96 / 5", tone: "emerald" as const },
              { icon: DollarSign, label: "Revenue Run Rate", value: "$18.4k", tone: "violet" as const },
              { icon: HeartHandshake, label: "Completion Rate", value: "97.2%", tone: "rose" as const }
            ].map((card) => (
              <div key={card.label} className="rounded-[24px] border border-white/10 bg-white/[0.03] p-5">
                <card.icon className="h-5 w-5 text-cyan-200" />
                <p className="mt-4 text-sm text-slate-400">{card.label}</p>
                <p className="mt-2 text-2xl font-bold text-white">{card.value}</p>
                <div className="mt-3">
                  <StatusPill label="Strong" tone={card.tone} />
                </div>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>

      <div className="grid gap-5 xl:grid-cols-3">
        <GlassCard className="p-6">
          <div className="flex items-center gap-3">
            <Video className="h-5 w-5 text-cyan-200" />
            <h3 className="text-xl font-semibold text-white">Today Appointments</h3>
          </div>
          <div className="mt-5 space-y-3">
            {doctorOverview.appointmentsToday.map((item) => (
              <div key={item.patient} className="rounded-[22px] border border-white/10 bg-white/[0.03] p-4">
                <div className="flex items-center justify-between gap-3">
                  <p className="font-medium text-white">{item.patient}</p>
                  <span className="text-sm text-cyan-200">{item.time}</span>
                </div>
                <p className="mt-2 text-sm text-slate-300">{item.reason}</p>
              </div>
            ))}
          </div>
        </GlassCard>

        <GlassCard className="p-6">
          <div className="flex items-center gap-3">
            <UserRoundPlus className="h-5 w-5 text-violet-200" />
            <h3 className="text-xl font-semibold text-white">Pending Requests</h3>
          </div>
          <div className="mt-5 space-y-3">
            {doctorOverview.pendingRequests.map((request) => (
              <div key={request} className="rounded-[22px] border border-white/10 bg-white/[0.03] p-4 text-sm text-slate-300">
                {request}
              </div>
            ))}
          </div>
        </GlassCard>

        <GlassCard className="p-6">
          <div className="flex items-center gap-3">
            <HeartHandshake className="h-5 w-5 text-emerald-200" />
            <h3 className="text-xl font-semibold text-white">Care Quality</h3>
          </div>
          <div className="mt-5 space-y-4">
            {[
              ["AI assist adoption", "88%"],
              ["Follow-up rate", "63%"],
              ["Patient delight", "94%"],
              ["Escalation accuracy", "91%"]
            ].map(([label, value]) => (
              <div key={label} className="flex items-center justify-between rounded-2xl border border-white/10 px-4 py-3 text-sm">
                <span className="text-slate-300">{label}</span>
                <span className="font-semibold text-white">{value}</span>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>
    </div>
  );
}
