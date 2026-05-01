import { Mic, Paperclip, PhoneCall, SmilePlus, Video } from "lucide-react";

import type { ChatMessage, MessageThread } from "@helio/shared";

import { Button } from "@/components/ui/Button";
import { GlassCard } from "@/components/ui/GlassCard";
import { cn } from "@/lib/utils";

export function ConversationPanel({
  thread,
  messages,
  onOpenVideo
}: {
  thread?: MessageThread;
  messages: ChatMessage[];
  onOpenVideo: () => void;
}) {
  return (
    <GlassCard className="flex h-full flex-col p-5">
      <div className="flex flex-col gap-4 border-b border-white/10 pb-5 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.24em] text-cyan-200">Active conversation</p>
          <h3 className="mt-2 text-2xl font-semibold text-white">{thread?.name ?? "Select a thread"}</h3>
          <p className="mt-2 text-sm text-slate-300">
            {thread?.specialty ?? "Telehealth"} {thread?.responseEta ? `• Response ${thread.responseEta}` : ""}
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Button variant="secondary">
            <PhoneCall className="h-4 w-4" />
            Request callback
          </Button>
          <Button onClick={onOpenVideo}>
            <Video className="h-4 w-4" />
            Open video room
          </Button>
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-4 overflow-y-auto pr-1 scrollbar-none">
        {messages.map((message) => (
          <div key={message.id} className={cn("flex mb-4", message.sender === "me" ? "justify-end" : "justify-start")}>
            <div
              className={cn(
                "max-w-[85%] rounded-[28px] px-6 py-4 text-[15px] leading-relaxed",
                message.sender === "me"
                  ? "bg-gradient-to-r from-cyan-400 to-violet-500 text-slate-950 shadow-[0_4px_12px_rgba(34,211,238,0.2)]"
                  : "bg-white/[0.05] text-slate-100 border border-white/5"
              )}
            >
              <p className={cn("mb-2 text-[10px] uppercase tracking-[0.24em]", message.sender === "me" ? "text-slate-900/60" : "text-slate-500")}>
                {message.authorName ?? (message.sender === "me" ? "You" : thread?.name ?? "Doctor")}
              </p>
              <p className="whitespace-pre-wrap">{message.content}</p>
              <div className={cn("mt-3 flex items-center gap-2 text-[10px]", message.sender === "me" ? "text-slate-900/60" : "text-slate-500")}>
                {message.time} {message.seen ? "• seen" : ""}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-5 flex items-center gap-3">
        <button type="button" className="glass-panel flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10">
          <Paperclip className="h-4 w-4 text-slate-300" />
        </button>
        <button type="button" className="glass-panel flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10">
          <Mic className="h-4 w-4 text-slate-300" />
        </button>
        <div className="glass-panel flex flex-1 items-center gap-3 rounded-[20px] px-4 py-3">
          <SmilePlus className="h-4 w-4 text-slate-400" />
          <input
            placeholder="Write a message..."
            className="w-full bg-transparent text-sm text-white outline-none placeholder:text-slate-500"
          />
        </div>
        <Button>Send</Button>
      </div>
    </GlassCard>
  );
}
