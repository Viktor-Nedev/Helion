import { useRef, useState } from "react";
import { ArrowUp, BrainCircuit, Loader2, Sparkles } from "lucide-react";

import type { SymptomAnalysis } from "@helio/shared";

import { AnalysisCard } from "@/components/ai/AnalysisCard";
import { GlassCard } from "@/components/ui/GlassCard";
import { PageHeader } from "@/components/ui/PageHeader";
import { SkeletonBlock } from "@/components/ui/SkeletonBlock";
import { fallbackSymptomAnalysis } from "@/data/mock";
import { analyzeSymptoms } from "@/lib/api";

interface ChatEntry {
  sender: "user" | "ai";
  content: string;
}

const EXAMPLES = [
  "Chest pressure when climbing stairs",
  "Fever and sore throat since yesterday",
  "Severe headache with light sensitivity",
  "Nausea and stomach cramps after eating",
  "Fatigue, dizziness, shortness of breath",
];

const GREETING: ChatEntry = {
  sender: "ai",
  content:
    "Hello! I'm Helio AI, your personal medical triage assistant. Describe your symptoms in detail and I will assess possible causes, risk level, and the next steps you should take.",
};

export function AIDiagnosisPage() {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState<SymptomAnalysis | null>(null);
  const [chatHistory, setChatHistory] = useState<ChatEntry[]>([GREETING]);
  const bottomRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  function scrollToBottom() {
    setTimeout(() => {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 80);
  }

  async function handleSubmit() {
    const trimmed = input.trim();
    if (!trimmed || loading) return;
    if (trimmed.length < 5) {
      setChatHistory((prev) => [
        ...prev,
        {
          sender: "ai",
          content: "Please provide at least a short symptom description (minimum 5 characters) so I can analyze it."
        }
      ]);
      return;
    }

    const userEntry: ChatEntry = { sender: "user", content: trimmed };
    setChatHistory((prev) => [...prev, userEntry]);
    setInput("");
    setLoading(true);
    scrollToBottom();

    const result = await analyzeSymptoms(trimmed);
    setAnalysis(result);

    const aiFollowUp: ChatEntry = {
      sender: "ai",
      content: `I've finished analysing your symptoms. Based on what you described, the risk level is **${result.riskLevel.toUpperCase()}**. The most likely cause is **${result.possibleCauses[0] ?? "under review"}**. I recommend: ${result.suggestedActions.slice(0, 2).join("; ")}. Scroll down to see the full breakdown.`,
    };

    setChatHistory((prev) => [...prev, aiFollowUp]);
    setLoading(false);
    scrollToBottom();
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleSubmit();
    }
  }

  function appendExample(example: string) {
    setInput((current) => (current ? `${current}, ${example.toLowerCase()}` : example));
    textareaRef.current?.focus();
  }

  return (
    <div className="space-y-6">
      <PageHeader
        badge="Core AI Layer"
        title="Premium AI symptom checker"
        description="Describe your symptoms naturally. Helio AI analyses them in real time and guides you to the right care path."
      />

      <div className="grid gap-5 xl:grid-cols-[1.1fr_0.9fr]">
        {/* ── Chat interface ── */}
        <GlassCard className="flex flex-col p-0 overflow-hidden">
          {/* Header */}
          <div className="flex items-center gap-3 border-b border-white/10 px-6 py-5">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-400 to-violet-500">
              <BrainCircuit className="h-5 w-5 text-slate-950" />
            </div>
            <div>
              <h3 className="text-base font-semibold text-white">Helio AI Chat</h3>
              <p className="text-xs text-slate-400">Medical triage assistant • Always available</p>
            </div>
            <span className="ml-auto flex h-2.5 w-2.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.7)]" />
          </div>

          {/* Messages */}
          <div className="flex-1 space-y-4 overflow-y-auto px-6 py-5 scrollbar-none" style={{ minHeight: "340px", maxHeight: "460px" }}>
            {chatHistory.map((entry, index) => (
              <div
                key={index}
                className={`flex gap-3 ${entry.sender === "user" ? "flex-row-reverse" : "flex-row"}`}
              >
                {entry.sender === "ai" && (
                  <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-400/20 to-violet-500/20 ring-1 ring-white/10">
                    <Sparkles className="h-3.5 w-3.5 text-cyan-200" />
                  </div>
                )}
                <div
                  className={`max-w-[82%] rounded-[22px] px-4 py-3 text-sm leading-7 ${
                    entry.sender === "ai"
                      ? "bg-white/[0.05] text-slate-200"
                      : "bg-gradient-to-br from-cyan-400 to-violet-500 text-slate-950 font-medium"
                  }`}
                >
                  <p className="mb-1 text-[10px] uppercase tracking-[0.22em] opacity-60">
                    {entry.sender === "ai" ? "Helio AI" : "You"}
                  </p>
                  {entry.content}
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex gap-3">
                <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-400/20 to-violet-500/20 ring-1 ring-white/10">
                  <Loader2 className="h-3.5 w-3.5 animate-spin text-cyan-200" />
                </div>
                <div className="flex items-center gap-1.5 rounded-[22px] bg-white/[0.05] px-4 py-4">
                  <span className="h-2 w-2 animate-bounce rounded-full bg-cyan-300/60 [animation-delay:0ms]" />
                  <span className="h-2 w-2 animate-bounce rounded-full bg-violet-300/60 [animation-delay:150ms]" />
                  <span className="h-2 w-2 animate-bounce rounded-full bg-cyan-300/60 [animation-delay:300ms]" />
                </div>
              </div>
            )}

            <div ref={bottomRef} />
          </div>

          {/* Example chips */}
          <div className="flex flex-wrap gap-2 border-t border-white/10 px-6 pt-4 pb-3">
            {EXAMPLES.map((example) => (
              <button
                key={example}
                onClick={() => appendExample(example)}
                className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs text-slate-300 transition hover:border-cyan-300/30 hover:bg-white/[0.06]"
              >
                {example}
              </button>
            ))}
          </div>

          {/* Input */}
          <div className="relative border-t border-white/10 px-4 pb-4 pt-3">
            <textarea
              ref={textareaRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              rows={2}
              placeholder="Describe your symptoms… (Enter to send)"
              className="w-full resize-none rounded-[20px] border border-white/10 bg-white/[0.04] px-4 py-3 pr-12 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-300/40"
            />
            <button
              onClick={handleSubmit}
              disabled={loading || !input.trim()}
              className="absolute bottom-7 right-7 flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-cyan-400 to-violet-500 text-slate-950 transition hover:scale-110 disabled:opacity-40 disabled:hover:scale-100"
            >
              <ArrowUp className="h-4 w-4" />
            </button>
          </div>
        </GlassCard>

        {/* ── Analysis results ── */}
        <div className="space-y-5">
          {loading ? (
            <>
              <SkeletonBlock className="h-52" />
              <SkeletonBlock className="h-52" />
            </>
          ) : analysis ? (
            <AnalysisCard analysis={analysis} />
          ) : (
            <GlassCard className="flex flex-col items-center justify-center gap-5 p-10 text-center">
              <div className="flex h-20 w-20 items-center justify-center rounded-[28px] bg-gradient-to-br from-cyan-400/15 to-violet-500/15 ring-1 ring-white/10">
                <BrainCircuit className="h-10 w-10 text-cyan-200" />
              </div>
              <div>
                <p className="text-lg font-semibold text-white">Your analysis will appear here</p>
                <p className="mt-2 text-sm leading-7 text-slate-400">
                  Describe your symptoms in the chat and Helio AI will provide a full risk assessment, possible causes, and recommended next steps.
                </p>
              </div>
            </GlassCard>
          )}
        </div>
      </div>

      {/* Full breakdown below when available */}
      {!loading && analysis && (
        <div>
          <p className="mb-4 text-xs uppercase tracking-[0.28em] text-slate-500">Full AI Breakdown</p>
          <AnalysisCard analysis={analysis} />
        </div>
      )}
    </div>
  );
}
