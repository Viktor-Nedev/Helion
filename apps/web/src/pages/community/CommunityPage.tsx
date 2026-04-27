import { ImagePlus, Send, TrendingUp, UserPlus } from "lucide-react";

import { PostCard } from "@/components/community/PostCard";
import { Button } from "@/components/ui/Button";
import { GlassCard } from "@/components/ui/GlassCard";
import { PageHeader } from "@/components/ui/PageHeader";
import { StatusPill } from "@/components/ui/StatusPill";
import { communityFeed } from "@/data/mock";

const categories = ["Mental Health", "Fitness", "Symptoms", "Nutrition", "Recovery Stories"];

export function CommunityPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        badge="Social Health Layer"
        title="A premium health community for trusted conversations"
        description="Create posts, follow doctors, discover recovery stories, and engage with medically grounded social content that feels modern and supportive."
      />

      <div className="grid gap-5 xl:grid-cols-[1fr_0.34fr]">
        <div className="space-y-5">
          <GlassCard className="p-6">
            <h3 className="text-xl font-semibold text-white">Create post</h3>
            <textarea
              placeholder="Share an update, question, or recovery insight..."
              className="mt-5 min-h-[140px] w-full rounded-[24px] border border-white/10 bg-white/[0.04] px-4 py-4 text-white outline-none placeholder:text-slate-500"
            />
            <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
              <div className="flex gap-2">
                <button className="glass-panel flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10">
                  <ImagePlus className="h-4 w-4 text-slate-300" />
                </button>
                <button className="glass-panel flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10">
                  <UserPlus className="h-4 w-4 text-slate-300" />
                </button>
              </div>
              <Button>
                <Send className="h-4 w-4" />
                Publish
              </Button>
            </div>
          </GlassCard>

          {communityFeed.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>

        <div className="space-y-5">
          <GlassCard className="p-6">
            <div className="flex items-center gap-3">
              <TrendingUp className="h-5 w-5 text-cyan-200" />
              <h3 className="text-xl font-semibold text-white">Trending hashtags</h3>
            </div>
            <div className="mt-5 flex flex-wrap gap-2">
              {categories.map((category) => (
                <StatusPill key={category} label={`#${category.replace(/\s+/g, "")}`} tone="violet" />
              ))}
            </div>
          </GlassCard>

          <GlassCard className="p-6">
            <h3 className="text-xl font-semibold text-white">Followed doctors</h3>
            <div className="mt-5 space-y-3">
              {["Dr. Emma Chen", "Dr. Nina Patel", "Dr. Sara Ivanova"].map((name) => (
                <div key={name} className="flex items-center justify-between rounded-2xl border border-white/10 px-4 py-3">
                  <span className="text-sm text-white">{name}</span>
                  <span className="text-xs text-cyan-200">Following</span>
                </div>
              ))}
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
}
