import { Camera, FileText, MessageSquareMore, Mic, MonitorUp, PhoneOff, Pill } from "lucide-react";

import { Button } from "@/components/ui/Button";
import { GlassCard } from "@/components/ui/GlassCard";
import { PageHeader } from "@/components/ui/PageHeader";

export function VideoCallPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        badge="Telemedicine Room"
        title="Modern video care with notes, chat, and prescriptions"
        description="A clean and premium telemedicine interface for patient-doctor meetings, screen sharing, notes, and treatment follow-up."
      />

      <div className="grid gap-5 xl:grid-cols-[1fr_0.32fr]">
        <GlassCard className="overflow-hidden p-5">
          <div className="grid gap-5 lg:grid-cols-[1fr_240px]">
            <div className="rounded-[30px] border border-white/10 bg-[radial-gradient(circle_at_20%_20%,rgba(78,233,255,0.12),transparent_24%),linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.02))] p-5">
              <div className="flex h-[500px] items-end justify-between rounded-[26px] border border-white/10 bg-black/20 p-6">
                <div>
                  <p className="text-sm text-slate-400">Patient</p>
                  <h3 className="text-2xl font-semibold text-white">Mila Petrova</h3>
                </div>
                <div className="rounded-full bg-emerald-400/10 px-4 py-2 text-sm text-emerald-200">Live</div>
              </div>
            </div>

            <div className="space-y-5">
              <div className="rounded-[26px] border border-white/10 bg-white/[0.04] p-4">
                <div className="h-[160px] rounded-[22px] border border-white/10 bg-gradient-to-br from-cyan-400/10 to-violet-500/10 p-4">
                  <p className="text-sm text-slate-400">Doctor</p>
                  <h3 className="mt-2 text-xl font-semibold text-white">Dr. Emma Chen</h3>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {[Camera, Mic, MonitorUp, PhoneOff].map((Icon, index) => (
                  <button
                    key={index}
                    className={`flex h-14 items-center justify-center rounded-2xl border border-white/10 ${
                      index === 3 ? "bg-rose-500/15 text-rose-200" : "bg-white/[0.04] text-white"
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </GlassCard>

        <div className="space-y-5">
          <GlassCard className="p-6">
            <div className="flex items-center gap-3">
              <MessageSquareMore className="h-5 w-5 text-cyan-200" />
              <h3 className="text-xl font-semibold text-white">Chat panel</h3>
            </div>
            <div className="mt-5 space-y-3 text-sm text-slate-300">
              <div className="rounded-2xl bg-white/[0.04] px-4 py-3">Patient uploaded heart-rate screenshots before joining.</div>
              <div className="rounded-2xl bg-cyan-400/10 px-4 py-3 text-cyan-100">Doctor: Let's compare today's symptoms with your previous episode.</div>
            </div>
          </GlassCard>

          <GlassCard className="p-6">
            <div className="flex items-center gap-3">
              <FileText className="h-5 w-5 text-violet-200" />
              <h3 className="text-xl font-semibold text-white">Notes panel</h3>
            </div>
            <textarea
              defaultValue="Patient reports chest pressure on stairs, mild nausea, fatigue. No fainting. Recommend follow-up ECG if symptoms persist."
              className="mt-5 min-h-[180px] w-full rounded-[24px] border border-white/10 bg-white/[0.04] px-4 py-4 text-sm text-white outline-none"
            />
            <Button className="mt-4 w-full">
              <Pill className="h-4 w-4" />
              Send Prescription
            </Button>
          </GlassCard>
        </div>
      </div>
    </div>
  );
}
