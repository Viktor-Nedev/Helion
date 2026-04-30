import { Activity, BrainCircuit, Droplets, MapPinned, MoonStar, Pill, TrendingUp, Waves, Zap } from "lucide-react";

import { AnalyticsChart } from "@/components/dashboard/AnalyticsChart";
import { MetricCard } from "@/components/dashboard/MetricCard";
import { DoctorCard } from "@/components/doctors/DoctorCard";
import { GlassCard } from "@/components/ui/GlassCard";
import { PageHeader } from "@/components/ui/PageHeader";
import { ProgressRing } from "@/components/ui/ProgressRing";
import { StatusPill } from "@/components/ui/StatusPill";
import { patientOverview } from "@/data/mock";
import { getAiHistory } from "@/lib/user-data";
import { useAppStore } from "@/store/useAppStore";

export function PatientDashboardPage() {
  const { isDemoAccount, sessionProfile } = useAppStore();
  const aiHistory = getAiHistory(sessionProfile?.email);

  if (!isDemoAccount()) {
    return (
      <div className="space-y-6">
        <PageHeader
          badge="Live Care Layer"
          title="Your personal health command center"
          description="Your account is ready. Dashboard widgets will populate after your first AI check, appointment, or doctor conversation."
        />

        <GlassCard className="p-6">
          <h3 className="text-xl font-semibold text-white">No health activity yet</h3>
          <p className="mt-3 text-sm leading-7 text-slate-300">
            Start with the AI page, book an appointment, or open a doctor chat to generate your personalized dashboard data.
          </p>
          <div className="mt-5 space-y-3">
            <p className="text-sm text-cyan-200">Saved AI analyses: {aiHistory.length}</p>
            {aiHistory.slice(0, 3).map((entry) => (
              <div key={entry.id} className="rounded-2xl border border-white/10 bg-white/[0.03] p-3 text-sm">
                <p className="text-white">{entry.symptoms}</p>
                <p className="mt-1 text-slate-400">{entry.analysis.riskLevel.toUpperCase()} risk</p>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <PageHeader
        badge="Live Care Layer"
        title="Your personal health command center"
        description="Track symptoms, follow recovery trends, manage appointments, and keep every health decision in one premium dashboard."
      />

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {patientOverview.metrics.map((metric) => (
          <MetricCard key={metric.label} metric={metric} />
        ))}
      </div>

      <div className="grid gap-5 xl:grid-cols-[0.9fr_1.1fr]">
        <GlassCard className="p-6">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm text-slate-400">Health Score</p>
              <h3 className="mt-2 text-2xl font-semibold text-white">Daily wellness tracker</h3>
            </div>
            <StatusPill label="Premium synced" />
          </div>

          <div className="mt-8 grid gap-6 lg:grid-cols-[auto_1fr] lg:items-center">
            <ProgressRing value={patientOverview.healthScore} label="score" />
            <div className="grid gap-4 sm:grid-cols-2">
              {patientOverview.wearables.map((metric) => (
                <div key={metric.label} className="rounded-[24px] border border-white/10 bg-white/[0.03] p-4">
                  <p className="text-sm text-slate-400">{metric.label}</p>
                  <p className="mt-2 text-xl font-semibold text-white">{metric.value}</p>
                  <p className="mt-2 text-xs uppercase tracking-[0.22em] text-slate-500">{metric.goal}</p>
                  <div className="mt-4 h-2 rounded-full bg-white/10">
                    <div className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-violet-500" style={{ width: `${metric.progress}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </GlassCard>

        <AnalyticsChart
          data={patientOverview.activity}
          title="Activity and resilience graph"
          description="A cinematic snapshot of movement quality, recovery rhythm, and wellness stability across the last week."
        />
      </div>

      <div className="grid gap-5 xl:grid-cols-[1fr_1fr_0.9fr]">
        <GlassCard className="p-6">
          <div className="flex items-center gap-3">
            <BrainCircuit className="h-5 w-5 text-cyan-200" />
            <h3 className="text-xl font-semibold text-white">Recent AI Checks</h3>
          </div>
          <div className="mt-5 space-y-3">
            {patientOverview.recentChecks.map((check) => (
              <div key={check.symptom} className="rounded-[22px] border border-white/10 bg-white/[0.03] p-4">
                <div className="flex items-center justify-between gap-3">
                  <span className="font-medium text-white">{check.symptom}</span>
                  <span className="text-xs text-slate-500">{check.time}</span>
                </div>
                <p className="mt-2 text-sm text-cyan-200">{check.outcome}</p>
              </div>
            ))}
          </div>
        </GlassCard>

        <GlassCard className="p-6">
          <div className="flex items-center gap-3">
            <TrendingUp className="h-5 w-5 text-violet-200" />
            <h3 className="text-xl font-semibold text-white">Trending Diseases Nearby</h3>
          </div>
          <div className="mt-5 space-y-4">
            {patientOverview.trendingDiseasesNearby.map((item) => (
              <div key={item.name}>
                <div className="flex items-center justify-between gap-3 text-sm">
                  <span className="text-slate-200">{item.name}</span>
                  <span className="text-slate-500">{item.intensity}%</span>
                </div>
                <div className="mt-2 h-2 rounded-full bg-white/10">
                  <div className="h-full rounded-full bg-gradient-to-r from-violet-500 to-cyan-400" style={{ width: `${item.intensity}%` }} />
                </div>
              </div>
            ))}
          </div>
        </GlassCard>

        <GlassCard className="p-6">
          <div className="flex items-center gap-3">
            <Pill className="h-5 w-5 text-emerald-200" />
            <h3 className="text-xl font-semibold text-white">Medication Reminder</h3>
          </div>
          <div className="mt-5 rounded-[24px] border border-emerald-400/20 bg-emerald-400/10 p-5">
            <p className="text-sm text-emerald-100">Vitamin D supplement due in 42 minutes.</p>
          </div>
          <div className="mt-4 space-y-3 text-sm text-slate-300">
            <div className="flex items-center justify-between rounded-2xl border border-white/10 px-4 py-3">
              <span>Morning antihistamine</span>
              <span className="text-emerald-300">Completed</span>
            </div>
            <div className="flex items-center justify-between rounded-2xl border border-white/10 px-4 py-3">
              <span>Hydration reminder</span>
              <span className="text-cyan-300">Next now</span>
            </div>
          </div>
        </GlassCard>
      </div>

      <div className="grid gap-5 xl:grid-cols-[1.1fr_0.9fr]">
        <GlassCard className="p-6">
          <div className="flex items-center gap-3">
            <Zap className="h-5 w-5 text-cyan-200" />
            <h3 className="text-xl font-semibold text-white">Recommended Doctors</h3>
          </div>
          <div className="mt-5 grid gap-5">
            {patientOverview.recommendedDoctors.map((doctor) => (
              <DoctorCard key={doctor.id} doctor={doctor} />
            ))}
          </div>
        </GlassCard>

        <div className="grid gap-5">
          <GlassCard className="p-6">
            <div className="flex items-center gap-3">
              <Activity className="h-5 w-5 text-violet-200" />
              <h3 className="text-xl font-semibold text-white">Upcoming Appointments</h3>
            </div>
            <div className="mt-5 space-y-3">
              {patientOverview.upcomingAppointments.map((appointment) => (
                <div key={appointment.id} className="rounded-[22px] border border-white/10 bg-white/[0.03] p-4">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="font-medium text-white">{appointment.doctorName}</p>
                      <p className="text-sm text-slate-400">{appointment.specialty}</p>
                    </div>
                    <StatusPill label={appointment.status} tone="cyan" />
                  </div>
                  <p className="mt-3 text-sm text-slate-300">{appointment.date}</p>
                </div>
              ))}
            </div>
          </GlassCard>

          <GlassCard className="p-6">
            <div className="flex items-center gap-3">
              <MoonStar className="h-5 w-5 text-cyan-200" />
              <h3 className="text-xl font-semibold text-white">Sleep Score + Mental Health Bot</h3>
            </div>
            <div className="mt-5 grid gap-3 md:grid-cols-2">
              <div className="rounded-[24px] border border-white/10 bg-white/[0.03] p-5">
                <p className="text-sm text-slate-400">Sleep quality</p>
                <p className="mt-3 text-4xl font-bold text-white">89</p>
                <p className="mt-2 text-sm text-emerald-300">Deep recovery pattern detected</p>
              </div>
              <div className="rounded-[24px] border border-white/10 bg-white/[0.03] p-5">
                <p className="text-sm text-slate-400">Mental health bot</p>
                <p className="mt-3 text-lg font-semibold text-white">Daily check-in ready</p>
                <p className="mt-2 text-sm text-slate-300">Suggested prompt: "I feel tense before sleep."</p>
              </div>
            </div>
          </GlassCard>
        </div>
      </div>

      <div className="grid gap-5 xl:grid-cols-3">
        <GlassCard className="p-6">
          <div className="flex items-center gap-3">
            <Droplets className="h-5 w-5 text-cyan-200" />
            <h3 className="text-xl font-semibold text-white">Water Intake Tracker</h3>
          </div>
          <p className="mt-5 text-4xl font-bold text-white">1.8L</p>
          <p className="mt-2 text-sm text-slate-300">600ml left to hit today's goal.</p>
          <div className="mt-5 h-3 rounded-full bg-white/10">
            <div className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-blue-500" style={{ width: "75%" }} />
          </div>
        </GlassCard>

        <GlassCard className="p-6">
          <div className="flex items-center gap-3">
            <Waves className="h-5 w-5 text-violet-200" />
            <h3 className="text-xl font-semibold text-white">Community Trends</h3>
          </div>
          <div className="mt-5 flex flex-wrap gap-2">
            {patientOverview.communityTrends.map((tag) => (
              <StatusPill key={tag} label={tag} tone="violet" />
            ))}
          </div>
          <ul className="mt-5 space-y-3 text-sm text-slate-300">
            {patientOverview.wellnessTips.map((tip) => (
              <li key={tip} className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3">
                {tip}
              </li>
            ))}
          </ul>
        </GlassCard>

        <GlassCard className="p-6">
          <div className="flex items-center gap-3">
            <MapPinned className="h-5 w-5 text-rose-200" />
            <h3 className="text-xl font-semibold text-white">Nearby Clinics Map</h3>
          </div>
          <div className="mt-5 rounded-[26px] border border-white/10 bg-[radial-gradient(circle_at_30%_30%,rgba(78,233,255,0.2),transparent_30%),linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.01))] p-5">
            <div className="grid grid-cols-2 gap-3">
              <div className="h-24 rounded-[20px] border border-cyan-400/20 bg-cyan-400/10" />
              <div className="h-24 rounded-[20px] border border-violet-400/20 bg-violet-400/10" />
              <div className="col-span-2 h-28 rounded-[20px] border border-white/10 bg-white/[0.03]" />
            </div>
          </div>
          <div className="mt-5 space-y-3">
            {patientOverview.nearbyClinics.map((clinic) => (
              <div key={clinic.name} className="flex items-center justify-between rounded-2xl border border-white/10 px-4 py-3 text-sm">
                <span className="text-white">{clinic.name}</span>
                <span className="text-slate-400">
                  {clinic.distance} • {clinic.eta}
                </span>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>
    </div>
  );
}
