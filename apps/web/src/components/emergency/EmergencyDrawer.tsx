import { Activity, PhoneCall, ShieldAlert, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import type { EmergencyStatus } from "@helio/shared";

import { emergencyStatusFallback } from "@/data/mock";
import { getEmergencyStatus } from "@/lib/api";
import { useAppStore } from "@/store/useAppStore";

import { Button } from "../ui/Button";

export function EmergencyDrawer() {
  const { isEmergencyOpen, closeEmergency, isDemoAccount } = useAppStore();
  const [status, setStatus] = useState<EmergencyStatus>(emergencyStatusFallback);

  useEffect(() => {
    if (!isEmergencyOpen) {
      return;
    }

    let mounted = true;

    getEmergencyStatus(isDemoAccount()).then((result) => {
      if (mounted) {
        setStatus(result);
      }
    });

    return () => {
      mounted = false;
    };
  }, [isEmergencyOpen, isDemoAccount]);

  if (!isEmergencyOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[58] flex justify-end bg-slate-950/55 backdrop-blur-sm">
      <button type="button" aria-label="Close emergency panel" className="flex-1" onClick={closeEmergency} />
      <div className="scrollbar-none glass-panel h-full w-full max-w-md overflow-y-auto border-l border-white/10 p-6 shadow-2xl">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.28em] text-rose-200">Emergency Response</p>
            <h2 className="mt-3 text-2xl font-bold text-white">Live doctor availability</h2>
            <p className="mt-3 text-sm leading-7 text-slate-300">{status.recommendedAction}</p>
          </div>
          <button
            type="button"
            onClick={closeEmergency}
            className="rounded-2xl border border-white/10 bg-white/[0.04] p-3 text-slate-200 transition hover:bg-white/[0.08]"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          <div className="rounded-[24px] border border-white/10 bg-white/[0.04] p-4">
            <p className="text-sm text-slate-400">Doctors online</p>
            <p className="mt-2 text-3xl font-bold text-white">{status.activeDoctors}</p>
          </div>
          <div className="rounded-[24px] border border-white/10 bg-white/[0.04] p-4">
            <p className="text-sm text-slate-400">Average response</p>
            <p className="mt-2 text-3xl font-bold text-white">{status.averageResponse}</p>
          </div>
        </div>

        <div className="mt-6 rounded-[28px] border border-rose-400/20 bg-rose-500/10 p-5">
          <div className="flex items-center gap-3 text-rose-100">
            <ShieldAlert className="h-5 w-5" />
            <span className="font-medium">Queue load: {status.queueLoad}</span>
          </div>
          <p className="mt-3 text-sm leading-6 text-rose-100/80">
            If symptoms escalate rapidly, start a chat immediately and move to video when the room is marked ready.
          </p>
        </div>

        <div className="mt-6 space-y-3">
          {status.doctors.map((doctor) => (
            <div key={doctor.id} className="rounded-[26px] border border-white/10 bg-white/[0.04] p-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-semibold text-white">{doctor.name}</p>
                  <p className="text-sm text-cyan-200">{doctor.specialty}</p>
                </div>
                <span className="rounded-full bg-white/10 px-3 py-1 text-xs uppercase tracking-[0.18em] text-slate-200">
                  {doctor.status}
                </span>
              </div>
              <div className="mt-4 flex items-center justify-between text-sm text-slate-300">
                <span>ETA {doctor.responseEta}</span>
                <span>{doctor.nextOpenSlot}</span>
              </div>
              <div className="mt-4 flex items-center gap-2 text-sm text-slate-300">
                <Activity className="h-4 w-4 text-emerald-300" />
                {doctor.roomReady ? "Video room ready to join" : "Chat first, room opens when doctor is free"}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <Link to="/messages" onClick={closeEmergency}>
            <Button>
              <PhoneCall className="h-4 w-4" />
              Open urgent chat
            </Button>
          </Link>
          <Link to="/messages?tab=video" onClick={closeEmergency}>
            <Button variant="secondary">Go to video room</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
