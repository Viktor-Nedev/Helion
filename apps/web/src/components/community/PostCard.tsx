import { Bookmark, Heart, MessageCircle, Repeat2, ShieldCheck } from "lucide-react";

import type { CommunityPost } from "@helio/shared";

import { GlassCard } from "@/components/ui/GlassCard";
import { StatusPill } from "@/components/ui/StatusPill";

export function PostCard({ post }: { post: CommunityPost }) {
  return (
    <GlassCard className="p-6">
      <div className="flex items-start gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-400 to-violet-500 font-bold text-slate-950">
          {post.avatar}
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-3">
            <h3 className="text-base font-semibold text-white">{post.author}</h3>
            <span className="text-sm text-slate-500">{post.handle}</span>
            {post.role === "doctor" ? <ShieldCheck className="h-4 w-4 text-cyan-200" /> : null}
            <StatusPill label={post.category} tone="violet" />
          </div>

          <p className="mt-4 text-sm leading-7 text-slate-300">{post.content}</p>

          <div className="mt-4 flex flex-wrap gap-2">
            {post.hashtags.map((hashtag) => (
              <span key={hashtag} className="rounded-full bg-white/5 px-3 py-1 text-xs text-slate-300">
                {hashtag}
              </span>
            ))}
          </div>

          <div className="mt-5 flex flex-wrap items-center gap-5 text-sm text-slate-400">
            <span className="flex items-center gap-2">
              <Heart className="h-4 w-4" />
              {post.likes}
            </span>
            <span className="flex items-center gap-2">
              <MessageCircle className="h-4 w-4" />
              {post.comments}
            </span>
            <span className="flex items-center gap-2">
              <Repeat2 className="h-4 w-4" />
              {post.shares}
            </span>
            <span className="flex items-center gap-2">
              <Bookmark className="h-4 w-4" />
              {post.saved}
            </span>
            <span className="ml-auto">{post.timeAgo}</span>
          </div>
        </div>
      </div>
    </GlassCard>
  );
}
