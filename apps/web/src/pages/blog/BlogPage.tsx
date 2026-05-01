import { Heart, MessageSquare, Send } from "lucide-react";
import { useMemo, useState } from "react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { GlassCard } from "@/components/ui/GlassCard";
import { PageHeader } from "@/components/ui/PageHeader";
import { getBlogPosts, saveBlogPosts, type BlogPostEntry } from "@/lib/user-data";
import { useAppStore } from "@/store/useAppStore";

export function BlogPage() {
  const { role, sessionProfile } = useAppStore();
  const [posts, setPosts] = useState<BlogPostEntry[]>(() => getBlogPosts());
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [expandedPosts, setExpandedPosts] = useState<string[]>([]);
  const [commentByPost, setCommentByPost] = useState<Record<string, string>>({});
  const currentUser = sessionProfile?.name ?? "Helio User";
  
  const sortedPosts = useMemo(
    () => [...posts].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()),
    [posts]
  );

  function toggleExpand(postId: string) {
    setExpandedPosts(prev => 
      prev.includes(postId) ? prev.filter(id => id !== postId) : [...prev, postId]
    );
  }

  function persist(nextPosts: BlogPostEntry[]) {
    setPosts(nextPosts);
    saveBlogPosts(nextPosts);
  }

  function handlePublish() {
    if (role !== "doctor" || !title.trim() || !content.trim()) {
      return;
    }

    const post: BlogPostEntry = {
      id: `blog-${Date.now()}`,
      title: title.trim(),
      content: content.trim(),
      author: currentUser,
      authorRole: role,
      createdAt: new Date().toISOString(),
      likes: 0,
      likedBy: [],
      comments: []
    };

    persist([post, ...posts]);
    setTitle("");
    setContent("");
  }

  function toggleLike(postId: string) {
    const emailKey = sessionProfile?.email?.toLowerCase() || currentUser.toLowerCase();
    const next = posts.map((post) => {
      if (post.id !== postId) {
        return post;
      }

      const alreadyLiked = post.likedBy.includes(emailKey);
      return {
        ...post,
        likes: alreadyLiked ? Math.max(0, post.likes - 1) : post.likes + 1,
        likedBy: alreadyLiked ? post.likedBy.filter((item) => item !== emailKey) : [...post.likedBy, emailKey]
      };
    });

    persist(next);
  }

  function addComment(postId: string) {
    const text = (commentByPost[postId] ?? "").trim();
    if (!text) {
      return;
    }

    const next = posts.map((post) =>
      post.id === postId
        ? {
            ...post,
            comments: [
              ...post.comments,
              {
                id: `comment-${Date.now()}`,
                author: currentUser,
                content: text,
                createdAt: new Date().toISOString()
              }
            ]
          }
        : post
    );

    setCommentByPost((current) => ({ ...current, [postId]: "" }));
    persist(next);
  }

  return (
    <div className="space-y-6">
      <PageHeader
        badge="Medical Blog"
        title="Doctor articles and community feedback"
        description="Doctors can publish educational posts. Every user can read, like, and comment."
      />

      {role === "doctor" ? (
        <GlassCard className="p-6">
          <h3 className="text-xl font-semibold text-white">Write a medical article</h3>
          <input
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="Article title"
            className="mt-4 w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-white"
          />
          <textarea
            value={content}
            onChange={(event) => setContent(event.target.value)}
            placeholder="Share insights, recommendations, or prevention tips..."
            className="mt-3 min-h-[140px] w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-white"
          />
          <Button className="mt-4" onClick={handlePublish}>
            <Send className="h-4 w-4" />
            Publish post
          </Button>
        </GlassCard>
      ) : null}

      <div className="space-y-6">
        {sortedPosts.map((post) => {
          const isExpanded = expandedPosts.includes(post.id);
          
          return (
            <GlassCard 
              key={post.id} 
              className={cn(
                "overflow-hidden transition-all duration-500",
                isExpanded ? "p-8" : "p-6 cursor-pointer hover:bg-white/[0.04]"
              )}
              onClick={() => !isExpanded && toggleExpand(post.id)}
            >
              <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                <div>
                  <div className="flex items-center gap-3">
                    <h3 className={cn("font-bold text-white transition-all", isExpanded ? "text-3xl" : "text-xl")}>
                      {post.title}
                    </h3>
                    {!isExpanded && (
                      <span className="rounded-full bg-cyan-400/10 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-cyan-200">
                        Read More
                      </span>
                    )}
                  </div>
                  <p className="mt-2 text-sm text-slate-500 font-medium uppercase tracking-widest">
                    {post.author} • {new Date(post.createdAt).toLocaleDateString()}
                  </p>
                </div>
                {isExpanded && (
                  <Button variant="secondary" size="sm" onClick={(e) => { e.stopPropagation(); toggleExpand(post.id); }}>
                    Collapse
                  </Button>
                )}
              </div>

              <div className={cn("mt-6 transition-all", isExpanded ? "opacity-100" : "opacity-70 line-clamp-2 text-sm")}>
                <p className={cn("leading-8 text-slate-300", isExpanded ? "text-lg" : "text-sm")}>
                  {post.content}
                </p>
              </div>

              {isExpanded && (
                <div className="mt-8 border-t border-white/10 pt-8 animate-in fade-in slide-in-from-top-4 duration-500">
                  <div className="flex items-center gap-6">
                    <button 
                      onClick={(e) => { e.stopPropagation(); toggleLike(post.id); }} 
                      className={cn(
                        "inline-flex items-center gap-2 px-4 py-2 rounded-full transition-all",
                        post.likedBy.includes(sessionProfile?.email || "") 
                          ? "bg-red-500/10 text-red-400 border border-red-500/20" 
                          : "bg-white/5 text-slate-300 border border-white/5 hover:bg-white/10"
                      )}
                    >
                      <Heart className={cn("h-4 w-4", post.likedBy.includes(sessionProfile?.email || "") && "fill-current")} />
                      <span className="font-bold">{post.likes}</span>
                    </button>
                    <div className="inline-flex items-center gap-2 text-slate-400 font-medium">
                      <MessageSquare className="h-4 w-4" />
                      <span>{post.comments.length} Comments</span>
                    </div>
                  </div>

                  <div className="mt-8 space-y-4">
                    {post.comments.map((comment) => (
                      <div key={comment.id} className="rounded-[24px] border border-white/5 bg-white/[0.02] p-5">
                        <div className="flex items-center justify-between mb-2">
                          <p className="text-sm font-bold text-white">{comment.author}</p>
                          <span className="text-[10px] text-slate-500">{new Date(comment.createdAt).toLocaleDateString()}</span>
                        </div>
                        <p className="text-sm leading-7 text-slate-400">{comment.content}</p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 flex gap-3">
                    <div className="relative flex-1">
                      <input
                        value={commentByPost[post.id] ?? ""}
                        onChange={(event) => setCommentByPost((current) => ({ ...current, [post.id]: event.target.value }))}
                        onClick={(e) => e.stopPropagation()}
                        placeholder="Share your thoughts..."
                        className="w-full rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-3 text-sm text-white outline-none focus:border-cyan-400/30"
                      />
                    </div>
                    <Button onClick={(e) => { e.stopPropagation(); addComment(post.id); }}>
                      Post
                    </Button>
                  </div>
                </div>
              )}
            </GlassCard>
          );
        })}
      </div>
    </div>
  );
}
