import { Mic, Search, ShieldCheck, Sparkles } from "lucide-react";
import { useState } from "react";

import { ConversationPanel } from "@/components/chat/ConversationPanel";
import { ThreadList } from "@/components/chat/ThreadList";
import { GlassCard } from "@/components/ui/GlassCard";
import { PageHeader } from "@/components/ui/PageHeader";
import { chatThreads, conversation } from "@/data/mock";

export function ChatPage() {
  const [activeThreadId, setActiveThreadId] = useState(chatThreads[0].id);

  return (
    <div className="space-y-6">
      <PageHeader
        badge="Messaging Layer"
        title="Real-time care conversations"
        description="A modern messenger built for patient-doctor communication with seen states, attachments, voice notes, and fast search."
      />

      <div className="grid gap-5 xl:grid-cols-[0.36fr_0.64fr_0.28fr]">
        <div className="min-h-[720px]">
          <ThreadList threads={chatThreads} activeThreadId={activeThreadId} onSelect={setActiveThreadId} />
        </div>

        <div className="min-h-[720px]">
          <ConversationPanel messages={conversation} />
        </div>

        <div className="space-y-5">
          <GlassCard className="p-6">
            <h3 className="text-xl font-semibold text-white">Conversation signals</h3>
            <div className="mt-5 space-y-3 text-sm text-slate-300">
              <div className="flex items-center justify-between rounded-2xl border border-white/10 px-4 py-3">
                <span>Typing indicator</span>
                <span className="text-cyan-200">Active</span>
              </div>
              <div className="flex items-center justify-between rounded-2xl border border-white/10 px-4 py-3">
                <span>Seen status</span>
                <span className="text-emerald-200">Enabled</span>
              </div>
              <div className="flex items-center justify-between rounded-2xl border border-white/10 px-4 py-3">
                <span>Voice messages</span>
                <Mic className="h-4 w-4 text-violet-200" />
              </div>
              <div className="flex items-center justify-between rounded-2xl border border-white/10 px-4 py-3">
                <span>Encrypted delivery</span>
                <ShieldCheck className="h-4 w-4 text-cyan-200" />
              </div>
            </div>
          </GlassCard>

          <GlassCard className="p-6">
            <div className="flex items-center gap-3">
              <Sparkles className="h-5 w-5 text-violet-200" />
              <h3 className="text-xl font-semibold text-white">Quick actions</h3>
            </div>
            <div className="mt-5 space-y-3">
              {["Send lab report", "Request urgent callback", "Create consult summary", "Search conversations"].map((action) => (
                <button
                  key={action}
                  className="flex w-full items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-left text-sm text-slate-300 transition hover:bg-white/[0.06]"
                >
                  <Search className="h-4 w-4 text-cyan-200" />
                  {action}
                </button>
              ))}
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
}
