import { Filter, Search, Sparkles } from "lucide-react";

import { DoctorCard } from "@/components/doctors/DoctorCard";
import { Button } from "@/components/ui/Button";
import { GlassCard } from "@/components/ui/GlassCard";
import { PageHeader } from "@/components/ui/PageHeader";
import { doctorMarketplace } from "@/data/mock";

const filters = ["Specialty", "Rating", "Availability", "Price", "Language"];

export function DoctorsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        badge="Doctor Marketplace"
        title="Find the right specialist in seconds"
        description="Search a premium network of certified doctors, filter by specialty, rating, language, price, and instantly move into booking, messaging, or video care."
      />

      <GlassCard className="p-5">
        <div className="grid gap-4 xl:grid-cols-[1fr_auto_auto]">
          <div className="glass-panel flex items-center gap-3 rounded-[22px] px-4 py-3">
            <Search className="h-4 w-4 text-slate-400" />
            <input
              placeholder="Search by doctor, specialty, or symptom..."
              className="w-full bg-transparent text-sm text-white outline-none placeholder:text-slate-500"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            {filters.map((filter) => (
              <button key={filter} className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-sm text-slate-300 transition hover:bg-white/[0.06]">
                {filter}
              </button>
            ))}
          </div>

          <Button variant="secondary">
            <Filter className="h-4 w-4" />
            Smart Filters
          </Button>
        </div>
      </GlassCard>

      <div className="grid gap-5">
        {doctorMarketplace.map((doctor) => (
          <DoctorCard key={doctor.id} doctor={doctor} />
        ))}
      </div>

      <GlassCard className="p-6">
        <div className="flex items-center gap-3">
          <Sparkles className="h-5 w-5 text-cyan-200" />
          <h3 className="text-xl font-semibold text-white">Premium matching</h3>
        </div>
        <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-300">
          Helio ranks doctors using specialty fit, availability, response speed, ratings, language match, and AI triage context to reduce the time between concern and care.
        </p>
      </GlassCard>
    </div>
  );
}
