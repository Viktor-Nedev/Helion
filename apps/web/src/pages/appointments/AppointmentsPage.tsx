import { CalendarClock, CalendarDays, Clock3, Video } from "lucide-react";

import { Button } from "@/components/ui/Button";
import { GlassCard } from "@/components/ui/GlassCard";
import { PageHeader } from "@/components/ui/PageHeader";
import { StatusPill } from "@/components/ui/StatusPill";
import { appointmentList } from "@/data/mock";

const slots = [
  ["Mon", "08:30", "09:15", "12:00", "18:30"],
  ["Tue", "09:00", "11:45", "14:15", "19:00"],
  ["Wed", "10:20", "13:00", "16:45", "20:15"],
  ["Thu", "08:00", "10:40", "15:30", "21:00"]
];

export function AppointmentsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        badge="Scheduling Layer"
        title="Appointments, rescheduling, and live care slots"
        description="Book appointments, cancel or reschedule, join calls instantly, and keep schedule visibility clean for both patients and doctors."
      />

      <div className="grid gap-5 xl:grid-cols-[1fr_0.34fr]">
        <GlassCard className="p-6">
          <div className="flex items-center gap-3">
            <CalendarDays className="h-5 w-5 text-cyan-200" />
            <h3 className="text-xl font-semibold text-white">Calendar system</h3>
          </div>
          <div className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {slots.map(([day, ...daySlots]) => (
              <div key={day} className="rounded-[24px] border border-white/10 bg-white/[0.03] p-4">
                <p className="text-sm font-semibold text-white">{day}</p>
                <div className="mt-4 space-y-2">
                  {daySlots.map((slot) => (
                    <button key={slot} className="w-full rounded-2xl border border-white/10 px-3 py-2 text-sm text-slate-300 transition hover:border-cyan-300/30 hover:bg-white/[0.06]">
                      {slot}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </GlassCard>

        <GlassCard className="p-6">
          <div className="flex items-center gap-3">
            <CalendarClock className="h-5 w-5 text-violet-200" />
            <h3 className="text-xl font-semibold text-white">Doctor controls</h3>
          </div>
          <div className="mt-5 space-y-3">
            {["Open new slots", "Block unavailable time", "Auto-confirm video visits", "Sync external calendar"].map((action) => (
              <div key={action} className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-slate-300">
                {action}
              </div>
            ))}
          </div>
        </GlassCard>
      </div>

      <div className="grid gap-5 xl:grid-cols-[1fr_0.34fr]">
        <GlassCard className="p-6">
          <h3 className="text-xl font-semibold text-white">Upcoming appointments</h3>
          <div className="mt-5 space-y-4">
            {appointmentList.map((appointment) => (
              <div key={appointment.id} className="rounded-[24px] border border-white/10 bg-white/[0.03] p-5">
                <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                  <div>
                    <div className="flex items-center gap-3">
                      <p className="text-lg font-semibold text-white">{appointment.doctorName}</p>
                      <StatusPill label={appointment.status} tone="cyan" />
                    </div>
                    <p className="mt-2 text-sm text-slate-400">{appointment.specialty}</p>
                    <p className="mt-2 text-sm text-slate-300">{appointment.date}</p>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    <Button variant="secondary">Reschedule</Button>
                    <Button variant="ghost">Cancel</Button>
                    <Button>
                      <Video className="h-4 w-4" />
                      Join Call
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </GlassCard>

        <GlassCard className="p-6">
          <div className="flex items-center gap-3">
            <Clock3 className="h-5 w-5 text-emerald-200" />
            <h3 className="text-xl font-semibold text-white">Open slots</h3>
          </div>
          <div className="mt-5 space-y-3">
            {["Tomorrow • Dr. Emma Chen • 08:30", "Tomorrow • Dr. Sara Ivanova • 13:15", "Friday • Dr. Nina Patel • 17:45"].map((slot) => (
              <button key={slot} className="w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-left text-sm text-slate-300 transition hover:bg-white/[0.06]">
                {slot}
              </button>
            ))}
          </div>
        </GlassCard>
      </div>
    </div>
  );
}
