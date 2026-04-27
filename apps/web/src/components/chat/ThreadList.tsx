import { Search } from "lucide-react";

import type { MessageThread } from "@helio/shared";

import { GlassCard } from "@/components/ui/GlassCard";
import { cn } from "@/lib/utils";

export function ThreadList({
  threads,
  activeThreadId,
  onSelect
}: {
  threads: MessageThread[];
  activeThreadId: string;
  onSelect: (threadId: string) => void;
}) {
  return (
    <GlassCard className="h-full p-4">
      <div className="glass-panel flex items-center gap-3 rounded-[20px] px-4 py-3">
        <Search className="h-4 w-4 text-slate-400" />
        <input
          placeholder="Search conversations"
          className="w-full bg-transparent text-sm text-white outline-none placeholder:text-slate-500"
        />
      </div>

      <div className="mt-4 flex max-h-[620px] flex-col gap-2 overflow-y-auto pr-1 scrollbar-none">
        {threads.map((thread) => (
          <button
            key={thread.id}
            onClick={() => onSelect(thread.id)}
            className={cn(
              "rounded-[22px] border border-transparent px-4 py-4 text-left transition",
              activeThreadId === thread.id ? "bg-white/10" : "hover:border-white/10 hover:bg-white/[0.03]"
            )}
          >
            <div className="flex items-start gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-400 to-violet-500 font-bold text-slate-950">
                {thread.avatar}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-3">
                  <span className="truncate font-medium text-white">{thread.name}</span>
                  <span className="text-xs text-slate-500">{thread.lastSeen}</span>
                </div>
                <p className="mt-1 truncate text-sm text-slate-400">{thread.lastMessage}</p>
              </div>
            </div>
          </button>
        ))}
      </div>
    </GlassCard>
  );
}
