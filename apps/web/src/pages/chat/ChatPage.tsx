import { Clock3, FileText, ShieldCheck, Sparkles, Video } from "lucide-react";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import type { ChatMessage, MessageThread } from "@helio/shared";

import { ConversationPanel } from "@/components/chat/ConversationPanel";
import { ThreadList } from "@/components/chat/ThreadList";
import { VideoConsultWorkspace } from "@/components/chat/VideoConsultWorkspace";
import { GlassCard } from "@/components/ui/GlassCard";
import { PageHeader } from "@/components/ui/PageHeader";
import { chatThreads, conversation, conversationByThread } from "@/data/mock";
import { getChatMessages, getChatThreads } from "@/lib/api";

export function ChatPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [threads, setThreads] = useState<MessageThread[]>(chatThreads);
  const [activeThreadId, setActiveThreadId] = useState(searchParams.get("thread") ?? chatThreads[0].id);
  const [messages, setMessages] = useState<ChatMessage[]>(conversation);

  const tab = searchParams.get("tab") === "video" ? "video" : "chat";
  const activeThread = threads.find((thread) => thread.id === activeThreadId) ?? threads[0];

  useEffect(() => {
    let mounted = true;

    getChatThreads().then((result) => {
      if (!mounted) {
        return;
      }

      setThreads(result);
      setActiveThreadId((current) => (result.some((thread) => thread.id === current) ? current : (result[0]?.id ?? current)));
    });

    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    if (!activeThreadId) {
      return;
    }

    let mounted = true;

    getChatMessages(activeThreadId).then((result) => {
      if (mounted) {
        setMessages(result);
      }
    });

    return () => {
      mounted = false;
    };
  }, [activeThreadId]);

  function updateSearch(next: { tab?: "chat" | "video"; thread?: string }) {
    const params = new URLSearchParams(searchParams);

    if (next.tab) {
      params.set("tab", next.tab);
    }

    if (next.thread) {
      params.set("thread", next.thread);
    }

    setSearchParams(params, { replace: true });
  }

  function handleSelectThread(threadId: string, nextTab: "chat" | "video" = tab) {
    setActiveThreadId(threadId);
    setMessages(conversationByThread[threadId as keyof typeof conversationByThread] ?? []);
    updateSearch({ tab: nextTab, thread: threadId });
  }

  function openVideo(threadId = activeThread?.id ?? activeThreadId) {
    handleSelectThread(threadId, "video");
  }

  function openChat(threadId = activeThread?.id ?? activeThreadId) {
    handleSelectThread(threadId, "chat");
  }

  return (
    <div className="space-y-6">
      <PageHeader
        badge="Messaging Layer"
        title="Care conversations and video rooms"
        description="One workspace for patient-doctor messaging, urgent escalation, consult context, and video sessions without losing the thread."
        actions={
          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => openChat()}
              className={`rounded-full border px-4 py-2 text-sm transition ${
                tab === "chat" ? "border-cyan-300/30 bg-cyan-400/10 text-cyan-100" : "border-white/10 bg-white/[0.03] text-slate-300"
              }`}
            >
              Conversation mode
            </button>
            <button
              type="button"
              onClick={() => openVideo()}
              className={`rounded-full border px-4 py-2 text-sm transition ${
                tab === "video" ? "border-violet-300/30 bg-violet-500/10 text-violet-100" : "border-white/10 bg-white/[0.03] text-slate-300"
              }`}
            >
              Video workspace
            </button>
          </div>
        }
      />

      <div className="grid gap-5 xl:grid-cols-[0.34fr_0.66fr_0.34fr]">
        <div className="min-h-[720px]">
          <ThreadList threads={threads} activeThreadId={activeThreadId} onSelect={handleSelectThread} onOpenVideo={openVideo} />
        </div>

        <div className="min-h-[720px]">
          {tab === "video" ? (
            <VideoConsultWorkspace thread={activeThread} messages={messages} onBackToChat={() => openChat()} />
          ) : (
            <ConversationPanel thread={activeThread} messages={messages} onOpenVideo={() => openVideo()} />
          )}
        </div>

        <div className="space-y-5">
          <GlassCard className="p-6">
            <h3 className="text-xl font-semibold text-white">Consult context</h3>
            <div className="mt-5 space-y-3 text-sm text-slate-300">
              <div className="flex items-center justify-between rounded-2xl border border-white/10 px-4 py-3">
                <span>Current doctor</span>
                <span className="text-cyan-200">{activeThread?.name ?? "No thread"}</span>
              </div>
              <div className="flex items-center justify-between rounded-2xl border border-white/10 px-4 py-3">
                <span>Care lane</span>
                <span className="text-emerald-200">{activeThread?.specialty ?? "General"}</span>
              </div>
              <div className="flex items-center justify-between rounded-2xl border border-white/10 px-4 py-3">
                <span>Video room</span>
                <Video className={`h-4 w-4 ${activeThread?.videoReady ? "text-violet-200" : "text-slate-500"}`} />
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
              <h3 className="text-xl font-semibold text-white">Action rail</h3>
            </div>
            <div className="mt-5 space-y-3">
              {[
                "Send lab report",
                "Request urgent callback",
                "Create consult summary",
                "Pin clinical note"
              ].map((action) => (
                <button
                  key={action}
                  type="button"
                  className="flex w-full items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-left text-sm text-slate-300 transition hover:bg-white/[0.06]"
                >
                  <FileText className="h-4 w-4 text-cyan-200" />
                  {action}
                </button>
              ))}
            </div>
          </GlassCard>

          <GlassCard className="p-6">
            <div className="flex items-center gap-3">
              <Clock3 className="h-5 w-5 text-cyan-200" />
              <h3 className="text-xl font-semibold text-white">Next escalation path</h3>
            </div>
            <p className="mt-4 text-sm leading-7 text-slate-300">
              {activeThread?.videoReady
                ? "The doctor room is already ready, so you can jump into video without leaving this workspace."
                : "Keep the conversation in chat mode. If symptoms change, the room will appear here automatically once the doctor is available."}
            </p>
            <div className="mt-4 rounded-[24px] border border-white/10 bg-white/[0.03] p-4 text-sm text-slate-300">
              {activeThread?.riskTag ?? "Standard follow-up"} • {activeThread?.responseEta ?? "Awaiting response"}
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
}
