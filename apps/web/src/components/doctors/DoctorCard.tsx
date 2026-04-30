import { CalendarPlus2, Languages, MessageCircleMore, Star } from "lucide-react";

import type { DoctorCardModel } from "@helio/shared";

import { Button } from "@/components/ui/Button";
import { GlassCard } from "@/components/ui/GlassCard";
import { StatusPill } from "@/components/ui/StatusPill";

export function DoctorCard({
  doctor,
  onBook,
  onMessage
}: {
  doctor: DoctorCardModel;
  onBook?: (doctor: DoctorCardModel) => void;
  onMessage?: (doctor: DoctorCardModel) => void;
}) {
  return (
    <GlassCard className="p-6">
      <div className="flex flex-col gap-5">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-gradient-to-br from-cyan-400 to-violet-500 text-lg font-bold text-slate-950">
              {doctor.avatar}
            </div>
            <div>
              <h3 className="text-xl font-semibold text-white">{doctor.name}</h3>
              <p className="text-sm text-cyan-200">{doctor.specialty}</p>
            </div>
          </div>
          <StatusPill label={`${doctor.rating} rating`} tone="amber" />
        </div>

        <p className="text-sm leading-7 text-slate-300">{doctor.bio}</p>

        <div className="grid gap-3 text-sm text-slate-300 sm:grid-cols-2">
          <div className="flex items-center gap-2">
            <Star className="h-4 w-4 text-amber-200" />
            {doctor.experience}
          </div>
          <div className="flex items-center gap-2">
            <Languages className="h-4 w-4 text-cyan-200" />
            {doctor.languages.join(", ")}
          </div>
          <div className="flex items-center gap-2">
            <CalendarPlus2 className="h-4 w-4 text-violet-200" />
            {doctor.availability}
          </div>
          <div className="text-white">${doctor.price} / consult</div>
        </div>

        <div className="flex flex-wrap gap-2">
          {doctor.tags.map((tag) => (
            <StatusPill key={tag} label={tag} tone="cyan" />
          ))}
        </div>

        <div className="flex flex-wrap gap-3">
          <Button className="flex-1 min-w-[160px]" onClick={() => onBook?.(doctor)}>
            Book Appointment
          </Button>
          <Button variant="secondary" className="flex-1 min-w-[160px]" onClick={() => onMessage?.(doctor)}>
            <MessageCircleMore className="h-4 w-4" />
            Message Doctor
          </Button>
        </div>
      </div>
    </GlassCard>
  );
}
