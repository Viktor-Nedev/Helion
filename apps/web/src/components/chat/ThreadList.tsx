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
        {threads.length === 0 ? (
          <div className="rounded-[24px] border border-white/10 bg-white/[0.03] px-4 py-6 text-sm text-slate-300">
            No conversations yet for this account.
          </div>
        ) : null}
        {threads.map((thread) => (
          <div
            key={thread.id}
            role="button"
            tabIndex={0}
            onClick={() => onSelect(thread.id)}
            onKeyDown={(event) => {
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                onSelect(thread.id);
              }
            }}
            className={cn(
              "rounded-[28px] border px-6 py-5 text-left transition",
              activeThreadId === thread.id
                ? "border-cyan-300/40 bg-cyan-400/15 shadow-[0_8px_20px_rgba(34,211,238,0.1)]"
                : "border-transparent hover:border-white/10 hover:bg-white/[0.04]"
            )}
          >
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-400 to-violet-500 text-lg font-bold text-slate-950">
                {thread.avatar}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <span className="text-[15px] font-bold text-white leading-none">{thread.name}</span>
                    {thread.specialty ? <p className="mt-1 truncate text-xs font-medium text-cyan-200">{thread.specialty}</p> : null}
                  </div>
                  <div className="text-right shrink-0">
                    <span className="text-[10px] uppercase tracking-wider text-slate-500 font-bold">{thread.lastSeen}</span>
                    {thread.unreadCount ? (
                      <p className="mt-1 text-[11px] font-bold text-cyan-400 bg-cyan-400/10 px-2 py-0.5 rounded-full inline-block">
                        {thread.unreadCount} NEW
                      </p>
                    ) : null}
                  </div>
                </div>
                <p className="mt-3 line-clamp-2 text-sm leading-6 text-slate-400">{thread.lastMessage}</p>
                <div className="mt-4 flex flex-wrap items-center gap-3">
                  {thread.riskTag ? (
                    <span className="rounded-full bg-white/5 border border-white/5 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-300">
                      {thread.riskTag}
                    </span>
                  ) : null}
                  {thread.responseEta ? (
                    <span className="rounded-full bg-white/5 border border-white/5 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      ETA {thread.responseEta}
                    </span>
                  ) : null}
                  {thread.videoReady ? (
                    <span
                      role="button"
                      tabIndex={0}
                      onClick={(event) => {
                        event.stopPropagation();
                        onOpenVideo?.(thread.id);
                      }}
                      onKeyDown={(event) => {
                        if (event.key === "Enter" || event.key === " ") {
                          event.preventDefault();
                          event.stopPropagation();
                          onOpenVideo?.(thread.id);
                        }
                      }}
                      className="inline-flex items-center gap-2 rounded-full bg-cyan-400/20 border border-cyan-400/20 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-cyan-100 transition hover:bg-cyan-400/30"
                    >
                      <Video className="h-3 w-3" />
                      Join room
                    </span>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </GlassCard>
  );
}
