import { Activity, FileUp, Pill, ShieldPlus, Syringe } from "lucide-react";

import { GlassCard } from "@/components/ui/GlassCard";
import { PageHeader } from "@/components/ui/PageHeader";
import { StatusPill } from "@/components/ui/StatusPill";
import { recordTimeline } from "@/data/mock";

export function HealthRecordsPage() {
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
            { icon: ShieldPlus, title: "Allergies", value: "Pollen, Penicillin" },
            { icon: Pill, title: "Medications", value: "Vitamin D, Antihistamine" },
            { icon: Syringe, title: "Vaccinations", value: "Influenza, COVID booster" },
            { icon: FileUp, title: "Uploaded reports", value: "12 secure files" }
          ].map((item) => (
            <GlassCard key={item.title} className="p-6">
              <item.icon className="h-5 w-5 text-cyan-200" />
              <p className="mt-4 text-sm text-slate-400">{item.title}</p>
              <p className="mt-2 text-xl font-semibold text-white">{item.value}</p>
            </GlassCard>
          ))}
        </div>

        <GlassCard className="p-6">
          <div className="flex items-center gap-3">
            <Activity className="h-5 w-5 text-violet-200" />
            <h3 className="text-xl font-semibold text-white">Timeline</h3>
          </div>

          <div className="mt-6 space-y-5">
            {recordTimeline.map((record) => (
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
