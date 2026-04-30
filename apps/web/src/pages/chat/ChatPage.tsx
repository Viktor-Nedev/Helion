import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import type { ChatMessage, MessageThread } from "@helio/shared";

import { ConversationPanel } from "@/components/chat/ConversationPanel";
import { ThreadList } from "@/components/chat/ThreadList";
import { VideoConsultWorkspace } from "@/components/chat/VideoConsultWorkspace";
import { PageHeader } from "@/components/ui/PageHeader";
import { chatThreads, conversation, conversationByThread } from "@/data/mock";
import { getChatMessages, getChatThreads } from "@/lib/api";
import { getStarterMessages, getStarterThread } from "@/lib/user-data";
import { useAppStore } from "@/store/useAppStore";

export function ChatPage() {
  const { isDemoAccount } = useAppStore();
  const demoAccount = isDemoAccount();
  const demoSeedThreads = demoAccount ? chatThreads : [getStarterThread()];
  const [searchParams, setSearchParams] = useSearchParams();
  const initialThreadId = searchParams.get("thread") ?? demoSeedThreads[0]?.id ?? "";
  const [threads, setThreads] = useState<MessageThread[]>(demoSeedThreads);
  const [activeThreadId, setActiveThreadId] = useState(initialThreadId);
  const [messages, setMessages] = useState<ChatMessage[]>(demoAccount ? conversation : getStarterMessages());

  const tab = searchParams.get("tab") === "video" ? "video" : "chat";
  const activeThread = threads.find((thread) => thread.id === activeThreadId) ?? threads[0];

  useEffect(() => {
    let mounted = true;

    if (!demoAccount) {
      setThreads([getStarterThread()]);
      setActiveThreadId("thread-welcome");
      setMessages(getStarterMessages());
      return () => {
        mounted = false;
      };
    }

    getChatThreads(demoAccount).then((result) => {
      if (!mounted) {
        return;
      }

      setThreads(result);
      setActiveThreadId((current) => (result.some((thread) => thread.id === current) ? current : (result[0]?.id ?? "")));
    });

    return () => {
      mounted = false;
    };
  }, [demoAccount]);

  useEffect(() => {
    if (!activeThreadId) {
      return;
    }

    let mounted = true;

    getChatMessages(activeThreadId, demoAccount).then((result) => {
      if (mounted) {
        setMessages(result.length === 0 && !demoAccount ? getStarterMessages() : result);
      }
    });

    return () => {
      mounted = false;
    };
  }, [activeThreadId, demoAccount]);

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
    setMessages(demoAccount ? conversationByThread[threadId as keyof typeof conversationByThread] ?? [] : getStarterMessages());
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
        description="One workspace for patient-doctor messaging, urgent escalation, and video sessions without losing the thread."
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

      <div className="grid gap-5 xl:grid-cols-[0.38fr_0.62fr]">
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
      </div>
    </div>
  );
}
