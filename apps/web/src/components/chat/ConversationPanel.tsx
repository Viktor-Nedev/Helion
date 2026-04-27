import { Mic, Paperclip, SmilePlus } from "lucide-react";

import type { ChatMessage } from "@helio/shared";

import { Button } from "@/components/ui/Button";
import { GlassCard } from "@/components/ui/GlassCard";
import { cn } from "@/lib/utils";

export function ConversationPanel({ messages }: { messages: ChatMessage[] }) {
  return (
    <GlassCard className="flex h-full flex-col p-5">
      <div className="flex flex-1 flex-col gap-4 overflow-y-auto pr-1 scrollbar-none">
        {messages.map((message) => (
          <div key={message.id} className={cn("flex", message.sender === "me" ? "justify-end" : "justify-start")}>
            <div
              className={cn(
                "max-w-[80%] rounded-[24px] px-4 py-3 text-sm leading-7",
                message.sender === "me"
                  ? "bg-gradient-to-r from-cyan-400 to-violet-500 text-slate-950"
                  : "bg-white/[0.05] text-slate-100"
              )}
            >
              <p>{message.content}</p>
              <div className={cn("mt-2 text-xs", message.sender === "me" ? "text-slate-800/80" : "text-slate-500")}>
                {message.time} {message.seen ? "• seen" : ""}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-5 flex items-center gap-3">
        <button className="glass-panel flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10">
          <Paperclip className="h-4 w-4 text-slate-300" />
        </button>
        <button className="glass-panel flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10">
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
