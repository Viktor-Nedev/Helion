import { Camera, ChevronLeft, FileText, MessageSquareMore, Mic, MonitorUp, PhoneOff, Pill } from "lucide-react";

import type { ChatMessage, MessageThread } from "@helio/shared";

import { formatTimeRange } from "@/lib/calendar";
import { useAppStore } from "@/store/useAppStore";

import { Button } from "../ui/Button";
import { GlassCard } from "../ui/GlassCard";

interface VideoConsultWorkspaceProps {
  thread?: MessageThread;
  messages: ChatMessage[];
  onBackToChat: () => void;
}

export function VideoConsultWorkspace({ thread, messages, onBackToChat }: VideoConsultWorkspaceProps) {
  const { sessionProfile } = useAppStore();
  const latestMessage = messages[messages.length - 1];
  const patientName = sessionProfile?.name ?? "Patient";

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between gap-3 rounded-[28px] border border-white/10 bg-[linear-gradient(135deg,rgba(78,233,255,0.14),rgba(139,92,246,0.12),rgba(255,255,255,0.03))] px-5 py-4">
        <div>
          <p className="text-xs uppercase tracking-[0.28em] text-cyan-200">Video consult workspace</p>
          <h3 className="mt-2 text-2xl font-semibold text-white">{thread?.name ?? "Live room"}</h3>
          <p className="mt-2 text-sm text-slate-300">
            Room ready {thread?.videoReady ? "now" : "soon"} • {thread?.specialty ?? "Telehealth"}
          </p>
        </div>
        <Button variant="secondary" onClick={onBackToChat}>
          <ChevronLeft className="h-4 w-4" />
          Back to chat
        </Button>
      </div>

      <div className="grid gap-5 xl:grid-cols-[1fr_0.34fr]">
        <GlassCard className="overflow-hidden p-5">
          <div className="grid gap-5 lg:grid-cols-[1fr_240px]">
            <div className="rounded-[30px] border border-white/10 bg-[radial-gradient(circle_at_20%_20%,rgba(78,233,255,0.12),transparent_24%),linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.02))] p-5">
              <div className="flex h-[500px] items-end justify-between rounded-[26px] border border-white/10 bg-black/25 p-6">
                <div>
                  <p className="text-sm text-slate-400">Patient</p>
                  <h3 className="text-2xl font-semibold text-white">{patientName}</h3>
                  <p className="mt-2 text-sm text-slate-400">Current thread: {thread?.riskTag ?? "Live consultation"}</p>
                </div>
                <div className="rounded-full bg-emerald-400/10 px-4 py-2 text-sm text-emerald-200">Live</div>
              </div>
            </div>

            <div className="space-y-5">
              <div className="rounded-[26px] border border-white/10 bg-white/[0.04] p-4">
                <div className="h-[160px] rounded-[22px] border border-white/10 bg-gradient-to-br from-cyan-400/10 to-violet-500/10 p-4">
                  <p className="text-sm text-slate-400">Doctor</p>
                  <h3 className="mt-2 text-xl font-semibold text-white">{thread?.name ?? "Care team"}</h3>
                  <p className="mt-2 text-sm text-cyan-200">{thread?.specialty ?? "Telemedicine"}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {[Camera, Mic, MonitorUp, PhoneOff].map((Icon, index) => (
                  <button
                    key={index}
                    type="button"
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
              <h3 className="text-xl font-semibold text-white">Live context</h3>
            </div>
            <div className="mt-5 space-y-3 text-sm text-slate-300">
              {messages.slice(-2).map((message) => (
                <div key={message.id} className="rounded-2xl bg-white/[0.04] px-4 py-3">
                  <p className="text-xs uppercase tracking-[0.22em] text-slate-500">{message.authorName ?? (message.sender === "me" ? "Patient" : "Doctor")}</p>
                  <p className="mt-2">{message.content}</p>
                </div>
              ))}
              {latestMessage ? <p className="text-xs text-slate-500">Last update at {latestMessage.time}</p> : null}
            </div>
          </GlassCard>

          <GlassCard className="p-6">
            <div className="flex items-center gap-3">
              <FileText className="h-5 w-5 text-violet-200" />
              <h3 className="text-xl font-semibold text-white">Call notes</h3>
            </div>
            <textarea
              defaultValue="Patient reports chest pressure on stairs, mild nausea, fatigue. No fainting. Recommend follow-up ECG if symptoms persist."
              className="mt-5 min-h-[180px] w-full rounded-[24px] border border-white/10 bg-white/[0.04] px-4 py-4 text-sm text-white outline-none"
            />
            <div className="mt-4 rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-slate-300">
              Suggested duration: {thread?.videoReady ? formatTimeRange("2026-04-28T19:00:00.000Z", "2026-04-28T19:45:00.000Z") : "30 minutes"}
            </div>
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
