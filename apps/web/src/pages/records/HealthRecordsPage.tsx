import { useState } from "react";
import { Activity, FileUp, Pill, ShieldPlus, Syringe } from "lucide-react";

import { GlassCard } from "@/components/ui/GlassCard";
import { PageHeader } from "@/components/ui/PageHeader";
import { StatusPill } from "@/components/ui/StatusPill";
import { recordTimeline } from "@/data/mock";
import { getAiHistory, safeRead, safeWrite, userKey } from "@/lib/user-data";
import { useAppStore } from "@/store/useAppStore";

export function HealthRecordsPage() {
  const { sessionProfile, isDemoAccount } = useAppStore();
  const aiHistory = getAiHistory(sessionProfile?.email);
  const timeline = isDemoAccount()
    ? recordTimeline
    : aiHistory.map((entry) => ({
        id: entry.id,
        title: entry.symptoms,
        subtitle: "AI Symptom Analysis",
        date: entry.createdAt.slice(0, 10),
        tag: entry.analysis.riskLevel,
        notes: entry.analysis.summary
      }));

  const [records, setRecords] = useState(() => {
    const saved = safeRead<Record<string, string>>(userKey(sessionProfile?.email, "medical-summary"), {
      Allergies: "Pollen, Penicillin",
      Medications: "Vitamin D, Antihistamine",
      Vaccinations: "Influenza, COVID booster",
      "Uploaded reports": "12 secure files"
    });
    return saved;
  });

  function updateRecord(key: string, value: string) {
    const next = { ...records, [key]: value };
    setRecords(next);
    safeWrite(userKey(sessionProfile?.email, "medical-summary"), next);
  }

  return (
    <div className="space-y-6">
      <PageHeader
        badge="Private Records Vault"
        title="Your private health records timeline"
        description="Allergies, medications, past diagnoses, uploaded reports, consultation history, vaccinations, and notes in one elegant and secure timeline."
      />

      <div className="grid gap-5 xl:grid-cols-[0.7fr_1.3fr]">
        <div className="grid gap-5">
          {[
            { icon: ShieldPlus, title: "Allergies" },
            { icon: Pill, title: "Medications" },
            { icon: Syringe, title: "Vaccinations" },
            { icon: FileUp, title: "Uploaded reports" }
          ].map((item) => (
            <GlassCard key={item.title} className="p-6 transition-all focus-within:border-cyan-400/30">
              <item.icon className="h-5 w-5 text-cyan-200" />
              <p className="mt-4 text-xs font-bold uppercase tracking-wider text-slate-500">{item.title}</p>
              <input 
                value={records[item.title] || ""}
                onChange={(e) => updateRecord(item.title, e.target.value)}
                placeholder={`Enter your ${item.title.toLowerCase()}...`}
                className="mt-2 w-full bg-transparent text-xl font-semibold text-white outline-none border-none placeholder:text-slate-700"
              />
            </GlassCard>
          ))}
        </div>

        <GlassCard className="p-6">
          <div className="flex items-center gap-3">
            <Activity className="h-5 w-5 text-violet-200" />
            <h3 className="text-xl font-semibold text-white">Timeline</h3>
          </div>

          <div className="mt-6 space-y-5">
            {timeline.length === 0 ? (
              <div className="rounded-[24px] border border-white/10 bg-white/[0.03] p-4 text-sm text-slate-300">
                No AI-generated records yet. Run an AI symptom analysis to populate your health timeline.
              </div>
            ) : null}
            {timeline.map((record) => (
              <div key={record.id} className="relative rounded-[26px] border border-white/10 bg-white/[0.03] p-5">
                <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                  <div>
                    <div className="flex flex-wrap items-center gap-3">
                      <h3 className="text-lg font-semibold text-white">{record.title}</h3>
                      <StatusPill label={record.tag} tone="cyan" />
                    </div>
                    <p className="mt-2 text-sm text-slate-400">{record.subtitle}</p>
                    <p className="mt-4 text-sm leading-7 text-slate-300">{record.notes}</p>
                  </div>
                  <span className="text-sm text-slate-500">{record.date}</span>
                </div>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>
    </div>
  );
}
