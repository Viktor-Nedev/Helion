import { ChevronLeft, ChevronRight, StickyNote, Video } from "lucide-react";

import type { CalendarAppointment, CalendarNote } from "@helio/shared";

import { buildCalendarGrid, formatMonthTitle, formatTimeRange, isSameMonth, toDateKey } from "@/lib/calendar";
import { cn } from "@/lib/utils";

interface MonthlyCalendarProps {
  month: Date;
  appointments: CalendarAppointment[];
  notes: CalendarNote[];
  selectedDate: string;
  onChangeMonth: (offset: number) => void;
  onSelectDate: (date: string) => void;
}

const weekdays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export function MonthlyCalendar({
  month,
  appointments,
  notes,
  selectedDate,
  onChangeMonth,
  onSelectDate
}: MonthlyCalendarProps) {
  const grid = buildCalendarGrid(month);

  return (
    <div>
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.24em] text-cyan-200">Monthly view</p>
          <h3 className="mt-2 text-2xl font-semibold text-white">{formatMonthTitle(month)}</h3>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => onChangeMonth(-1)}
            className="rounded-2xl border border-white/10 bg-white/[0.04] p-3 text-slate-200 transition hover:bg-white/[0.08]"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => onChangeMonth(1)}
            className="rounded-2xl border border-white/10 bg-white/[0.04] p-3 text-slate-200 transition hover:bg-white/[0.08]"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-7 gap-2">
        {weekdays.map((day) => (
          <div key={day} className="px-2 py-3 text-center text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
            {day}
          </div>
        ))}

        {grid.map((date) => {
          const dateKey = toDateKey(date);
          const dayAppointments = appointments.filter((item) => item.date === dateKey);
          const dayNotes = notes.filter((item) => item.date === dateKey);
          const selected = selectedDate === dateKey;

          return (
            <button
              key={dateKey}
              type="button"
              onClick={() => onSelectDate(dateKey)}
              className={cn(
                "min-h-[150px] rounded-[26px] border p-3 text-left transition",
                selected ? "border-cyan-300/40 bg-cyan-400/10" : "border-white/10 bg-white/[0.03] hover:bg-white/[0.05]",
                !isSameMonth(date, month) && "opacity-35"
              )}
            >
              <div className="flex items-center justify-between gap-2">
                <span className={cn("text-sm font-semibold", selected ? "text-white" : "text-slate-200")}>{date.getDate()}</span>
                <div className="flex items-center gap-2 text-[11px] text-slate-400">
                  {dayNotes.length > 0 ? <StickyNote className="h-3.5 w-3.5 text-violet-200" /> : null}
                  {dayAppointments.some((item) => item.mode === "video") ? <Video className="h-3.5 w-3.5 text-cyan-200" /> : null}
                </div>
              </div>

              <div className="mt-3 space-y-2">
                {dayAppointments.slice(0, 2).map((appointment) => (
                  <div key={appointment.id} className="rounded-2xl bg-white/[0.06] px-3 py-2 text-xs text-slate-100">
                    <p className="truncate font-medium">{appointment.doctorName}</p>
                    <p className="mt-1 text-slate-400">{formatTimeRange(appointment.startAt, appointment.endAt)}</p>
                  </div>
                ))}
                {dayNotes.slice(0, 1).map((note) => (
                  <div key={note.id} className="rounded-2xl border border-violet-400/20 bg-violet-500/10 px-3 py-2 text-xs text-violet-100">
                    {note.title}
                  </div>
                ))}
                {dayAppointments.length + dayNotes.length > 3 ? (
                  <p className="text-xs text-slate-500">+{dayAppointments.length + dayNotes.length - 3} more</p>
                ) : null}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
