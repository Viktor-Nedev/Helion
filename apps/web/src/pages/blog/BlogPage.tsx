import { Heart, MessageSquare, Send } from "lucide-react";
import { useMemo, useState } from "react";

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
  const [commentByPost, setCommentByPost] = useState<Record<string, string>>({});
  const currentUser = sessionProfile?.name ?? "Helio User";
  const sortedPosts = useMemo(
    () => [...posts].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()),
    [posts]
  );

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

      <div className="space-y-5">
        {sortedPosts.map((post) => (
          <GlassCard key={post.id} className="p-6">
            <h3 className="text-2xl font-semibold text-white">{post.title}</h3>
            <p className="mt-2 text-sm text-slate-400">
              {post.author} • {new Date(post.createdAt).toLocaleDateString()}
            </p>
            <p className="mt-4 text-sm leading-7 text-slate-300">{post.content}</p>

            <div className="mt-5 flex items-center gap-4 text-sm">
              <button onClick={() => toggleLike(post.id)} className="inline-flex items-center gap-2 text-slate-300">
                <Heart className="h-4 w-4" />
                {post.likes}
              </button>
              <span className="inline-flex items-center gap-2 text-slate-400">
                <MessageSquare className="h-4 w-4" />
                {post.comments.length}
              </span>
            </div>

            <div className="mt-4 space-y-2">
              {post.comments.map((comment) => (
                <div key={comment.id} className="rounded-2xl border border-white/10 bg-white/[0.03] p-3 text-sm">
                  <p className="text-white">{comment.author}</p>
                  <p className="mt-1 text-slate-300">{comment.content}</p>
                </div>
              ))}
            </div>

            <div className="mt-4 flex gap-2">
              <input
                value={commentByPost[post.id] ?? ""}
                onChange={(event) => setCommentByPost((current) => ({ ...current, [post.id]: event.target.value }))}
                placeholder="Write a comment..."
                className="w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-white"
              />
              <Button variant="secondary" onClick={() => addComment(post.id)}>
                Comment
              </Button>
            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  );
}
