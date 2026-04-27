import { useState } from "react";
import { BrainCircuit, Sparkles } from "lucide-react";

import { AnalysisCard } from "@/components/ai/AnalysisCard";
import { Button } from "@/components/ui/Button";
import { GlassCard } from "@/components/ui/GlassCard";
import { PageHeader } from "@/components/ui/PageHeader";
import { SkeletonBlock } from "@/components/ui/SkeletonBlock";
import { fallbackSymptomAnalysis } from "@/data/mock";
import { analyzeSymptoms } from "@/lib/api";

const examples = ["headache", "fever", "stomach pain", "nausea", "chest pain"];

export function AIDiagnosisPage() {
  const [input, setInput] = useState("Pressure in my chest when climbing stairs, slight nausea, fatigue since this morning.");
  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState(fallbackSymptomAnalysis);
  const [messages, setMessages] = useState([
    { sender: "Helio AI", content: "Describe your symptoms in your own words and I will help you triage the next step." },
    { sender: "Patient", content: "Pressure in my chest when climbing stairs and a little nausea." }
  ]);

  async function handleAnalyze() {
    setLoading(true);
    const result = await analyzeSymptoms(input);
    setAnalysis(result);
    setMessages((current) => [
      ...current,
      { sender: "Helio AI", content: "I've refreshed the risk model and updated the suggested specialist and actions below." }
    ]);
    setLoading(false);
  }

  return (
    <div className="space-y-6">
      <PageHeader
        badge="Core AI Layer"
        title="Premium AI symptom checker"
        description="Describe symptoms naturally, get cinematic medical insight, and continue the conversation before escalating to a doctor."
      />

      <div className="grid gap-5 xl:grid-cols-[1.15fr_0.85fr]">
        <GlassCard className="p-6">
          <div className="flex items-center gap-3">
            <BrainCircuit className="h-5 w-5 text-cyan-200" />
            <h3 className="text-xl font-semibold text-white">Describe your symptoms</h3>
          </div>

          <textarea
            value={input}
            onChange={(event) => setInput(event.target.value)}
            className="mt-5 min-h-[220px] w-full rounded-[28px] border border-white/10 bg-white/[0.04] px-5 py-4 text-base text-white outline-none transition focus:border-cyan-300/40"
            placeholder="Describe your symptoms..."
          />

          <div className="mt-5 flex flex-wrap gap-2">
            {examples.map((example) => (
              <button
                key={example}
                onClick={() => setInput((current) => `${current}${current ? ", " : ""}${example}`)}
                className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-2 text-sm text-slate-300 transition hover:border-cyan-300/30 hover:bg-white/[0.06]"
              >
                {example}
              </button>
            ))}
          </div>

          <Button className="mt-6" onClick={handleAnalyze} disabled={loading}>
            {loading ? "Analyzing..." : "Analyze Symptoms"}
          </Button>
        </GlassCard>

        <GlassCard className="p-6">
          <div className="flex items-center gap-3">
            <Sparkles className="h-5 w-5 text-violet-200" />
            <h3 className="text-xl font-semibold text-white">AI chat mode</h3>
          </div>
          <div className="mt-5 space-y-3">
            {messages.map((message, index) => (
              <div
                key={`${message.sender}-${index}`}
                className={`rounded-[24px] px-4 py-4 text-sm leading-7 ${
                  message.sender === "Helio AI"
                    ? "bg-white/[0.05] text-slate-200"
                    : "bg-gradient-to-r from-cyan-400 to-violet-500 text-slate-950"
                }`}
              >
                <p className="mb-2 text-xs uppercase tracking-[0.26em] opacity-70">{message.sender}</p>
                {message.content}
              </div>
            ))}
          </div>
        </GlassCard>
      </div>

      {loading ? (
        <div className="grid gap-5 xl:grid-cols-2">
          <SkeletonBlock className="h-72" />
          <SkeletonBlock className="h-72" />
          <SkeletonBlock className="h-72" />
          <SkeletonBlock className="h-72" />
        </div>
      ) : (
        <AnalysisCard analysis={analysis} />
      )}
    </div>
  );
}
