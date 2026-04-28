import { Activity, Siren } from "lucide-react";
import { useEffect, useState } from "react";

import type { EmergencyStatus } from "@helio/shared";

import { emergencyStatusFallback } from "@/data/mock";
import { getEmergencyStatus } from "@/lib/api";

interface EmergencyStatusCardProps {
  onOpen: () => void;
}

export function EmergencyStatusCard({ onOpen }: EmergencyStatusCardProps) {
  const [status, setStatus] = useState<EmergencyStatus>(emergencyStatusFallback);

  useEffect(() => {
    let mounted = true;

    getEmergencyStatus().then((result) => {
      if (mounted) {
        setStatus(result);
      }
    });

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <button
      type="button"
      onClick={onOpen}
      className="w-full rounded-[28px] border border-rose-400/20 bg-rose-400/10 p-4 text-left transition hover:border-rose-300/30 hover:bg-rose-400/15"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.28em] text-rose-200">Emergency Mode</p>
          <p className="mt-2 text-sm leading-6 text-rose-100">{status.recommendedAction}</p>
        </div>
        <div className="rounded-2xl bg-rose-500/15 p-3 text-rose-100">
          <Siren className="h-5 w-5" />
        </div>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-3 text-xs text-rose-100/90">
        <span className="rounded-full bg-white/10 px-3 py-1">{status.activeDoctors} doctors live</span>
        <span className="rounded-full bg-white/10 px-3 py-1">Response {status.averageResponse}</span>
      </div>

      <div className="mt-4 space-y-2">
        {status.doctors.slice(0, 2).map((doctor) => (
          <div key={doctor.id} className="flex items-center justify-between rounded-2xl border border-white/10 px-3 py-3 text-sm">
            <div>
              <p className="text-white">{doctor.name}</p>
              <p className="text-rose-100/70">{doctor.specialty}</p>
            </div>
            <div className="flex items-center gap-2 text-rose-100">
              <Activity className="h-4 w-4" />
              {doctor.status}
            </div>
          </div>
        ))}
      </div>
    </button>
  );
}
