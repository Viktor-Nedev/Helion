import { Search, Video } from "lucide-react";

import type { MessageThread } from "@helio/shared";

import { GlassCard } from "@/components/ui/GlassCard";
import { cn } from "@/lib/utils";

export function ThreadList({
  threads,
  activeThreadId,
  onSelect,
  onOpenVideo
}: {
  threads: MessageThread[];
  activeThreadId: string;
  onSelect: (threadId: string) => void;
  onOpenVideo?: (threadId: string) => void;
}) {
  return (
    <GlassCard className="h-full p-4">
      <div className="rounded-[24px] border border-white/10 bg-[linear-gradient(135deg,rgba(78,233,255,0.12),rgba(139,92,246,0.12),rgba(255,255,255,0.03))] p-4">
        <p className="text-xs uppercase tracking-[0.24em] text-cyan-200">Inbox</p>
        <h3 className="mt-2 text-xl font-semibold text-white">Care conversations</h3>
        <p className="mt-2 text-sm text-slate-300">Search threads, jump to video-ready rooms, and keep urgent follow-ups visible.</p>
      </div>

      <div className="glass-panel mt-4 flex items-center gap-3 rounded-[20px] px-4 py-3">
        <Search className="h-4 w-4 text-slate-400" />
        <input placeholder="Search conversations" className="w-full bg-transparent text-sm text-white outline-none placeholder:text-slate-500" />
      </div>

      <div className="mt-4 flex max-h-[620px] flex-col gap-2 overflow-y-auto pr-1 scrollbar-none">
        {threads.map((thread) => (
          <button
            key={thread.id}
            onClick={() => onSelect(thread.id)}
            className={cn(
              "rounded-[24px] border px-4 py-4 text-left transition",
              activeThreadId === thread.id
                ? "border-cyan-300/30 bg-cyan-400/10"
                : "border-transparent hover:border-white/10 hover:bg-white/[0.03]"
            )}
          >
            <div className="flex items-start gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-400 to-violet-500 font-bold text-slate-950">
                {thread.avatar}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <span className="truncate font-medium text-white">{thread.name}</span>
                    {thread.specialty ? <p className="truncate text-xs text-cyan-200">{thread.specialty}</p> : null}
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-slate-500">{thread.lastSeen}</span>
                    {thread.unreadCount ? <p className="text-xs text-white">{thread.unreadCount} new</p> : null}
                  </div>
                </div>
                <p className="mt-1 truncate text-sm text-slate-400">{thread.lastMessage}</p>
                <div className="mt-3 flex flex-wrap items-center gap-2">
                  {thread.riskTag ? <span className="rounded-full bg-white/10 px-2.5 py-1 text-[11px] text-slate-300">{thread.riskTag}</span> : null}
                  {thread.responseEta ? <span className="rounded-full bg-white/10 px-2.5 py-1 text-[11px] text-slate-300">ETA {thread.responseEta}</span> : null}
                  {thread.videoReady ? (
                    <button
                      type="button"
                      onClick={(event) => {
                        event.stopPropagation();
                        onOpenVideo?.(thread.id);
                      }}
                      className="inline-flex items-center gap-1 rounded-full bg-cyan-400/15 px-2.5 py-1 text-[11px] text-cyan-100"
                    >
                      <Video className="h-3 w-3" />
                      Join room
                    </button>
                  ) : null}
                </div>
              </div>
            </div>
          </button>
        ))}
      </div>
    </GlassCard>
  );
}
