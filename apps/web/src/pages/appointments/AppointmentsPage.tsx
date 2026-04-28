import { CalendarClock, Clock3, FileText, Plus, Video } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import type { AppointmentCalendarPayload } from "@helio/shared";

import { MonthlyCalendar } from "@/components/appointments/MonthlyCalendar";
import { Button } from "@/components/ui/Button";
import { GlassCard } from "@/components/ui/GlassCard";
import { PageHeader } from "@/components/ui/PageHeader";
import { StatusPill } from "@/components/ui/StatusPill";
import { getAppointmentCalendar, createAppointmentNote } from "@/lib/api";
import { createMonthAnchor, formatShortDate, formatTimeRange, getMonthKey, shiftMonth, toDateKey } from "@/lib/calendar";

const initialMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 1, 12);
const initialDate = toDateKey(new Date());

export function AppointmentsPage() {
  const navigate = useNavigate();
  const [monthDate, setMonthDate] = useState(initialMonth);
  const [selectedDate, setSelectedDate] = useState(initialDate);
  const [calendar, setCalendar] = useState<AppointmentCalendarPayload>({
    month: getMonthKey(initialMonth),
    appointments: [],
    notes: [],
    openSlots: []
  });
  const [noteForm, setNoteForm] = useState({
    title: "",
    content: "",
    pinned: false
  });

  useEffect(() => {
    let mounted = true;
    const monthKey = getMonthKey(monthDate);

    getAppointmentCalendar(monthKey).then((result) => {
      if (mounted) {
        setCalendar(result);
      }
    });

    return () => {
      mounted = false;
    };
  }, [monthDate]);

  const selectedAppointments = calendar.appointments.filter((appointment) => appointment.date === selectedDate);
  const selectedNotes = calendar.notes.filter((note) => note.date === selectedDate);

  async function handleCreateNote() {
    if (!noteForm.title.trim() || !noteForm.content.trim()) {
      return;
    }

    const nextNote = await createAppointmentNote({
      date: selectedDate,
      title: noteForm.title.trim(),
      content: noteForm.content.trim(),
      pinned: noteForm.pinned
    });

    setCalendar((current) => ({
      ...current,
      notes: [...current.notes, nextNote]
    }));
    setNoteForm({ title: "", content: "", pinned: false });
  }

  function changeMonth(offset: number) {
    const nextMonth = shiftMonth(monthDate, offset);
    setMonthDate(nextMonth);
    setSelectedDate(toDateKey(new Date(nextMonth.getFullYear(), nextMonth.getMonth(), 1, 12)));
  }

  return (
    <div className="space-y-6">
      <PageHeader
        badge="Scheduling Layer"
        title="Real calendar with notes and saved appointments"
        description="Track booked hours, prep notes, open slots, and jump into chat or video care from a proper calendar workspace."
      />

      <div className="grid gap-5 xl:grid-cols-[1fr_0.34fr]">
        <GlassCard className="p-6">
          <MonthlyCalendar
            month={createMonthAnchor(calendar.month)}
            appointments={calendar.appointments}
            notes={calendar.notes}
            selectedDate={selectedDate}
            onChangeMonth={changeMonth}
            onSelectDate={setSelectedDate}
          />
        </GlassCard>

        <div className="space-y-5">
          <GlassCard className="p-6">
            <div className="flex items-center gap-3">
              <CalendarClock className="h-5 w-5 text-violet-200" />
              <h3 className="text-xl font-semibold text-white">Selected day</h3>
            </div>
            <p className="mt-4 text-sm text-slate-400">{formatShortDate(selectedDate)}</p>

            <div className="mt-5 space-y-3">
              {selectedAppointments.length > 0 ? (
                selectedAppointments.map((appointment) => (
                  <div key={appointment.id} className="rounded-[24px] border border-white/10 bg-white/[0.03] p-4">
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <p className="font-semibold text-white">{appointment.doctorName}</p>
                        <p className="text-sm text-cyan-200">{appointment.specialty}</p>
                      </div>
                      <StatusPill label={appointment.status} tone="cyan" />
                    </div>
                    <p className="mt-3 text-sm text-slate-300">{formatTimeRange(appointment.startAt, appointment.endAt)}</p>
                    <p className="mt-2 text-sm text-slate-400">{appointment.location ?? "Helio care lane"}</p>
                    <div className="mt-4 flex flex-wrap gap-3">
                      {appointment.mode === "video" ? (
                        <Button onClick={() => navigate(`/messages?tab=video&thread=${appointment.threadId ?? "thread-1"}`)}>
                          <Video className="h-4 w-4" />
                          Join room
                        </Button>
                      ) : (
                        <Button onClick={() => navigate(`/messages?tab=chat&thread=${appointment.threadId ?? "thread-1"}`)}>
                          Open chat
                        </Button>
                      )}
                      <Button variant="secondary">Reschedule</Button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="rounded-[24px] border border-white/10 bg-white/[0.03] p-4 text-sm text-slate-300">
                  No booked time on this date yet. Use the open slots below or add a note for later.
                </div>
              )}
            </div>
          </GlassCard>

          <GlassCard className="p-6">
            <div className="flex items-center gap-3">
              <Clock3 className="h-5 w-5 text-emerald-200" />
              <h3 className="text-xl font-semibold text-white">Open slots</h3>
            </div>
            <div className="mt-5 space-y-3">
              {calendar.openSlots.map((slot) => (
                <button
                  key={slot.id}
                  type="button"
                  onClick={() => setSelectedDate(slot.startAt.slice(0, 10))}
                  className="w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-left transition hover:bg-white/[0.06]"
                >
                  <p className="text-sm font-medium text-white">{slot.doctorName}</p>
                  <p className="mt-1 text-xs text-slate-400">
                    {slot.specialty} • {formatTimeRange(slot.startAt, slot.endAt)}
                  </p>
                </button>
              ))}
            </div>
          </GlassCard>
        </div>
      </div>

      <div className="grid gap-5 xl:grid-cols-[0.72fr_0.28fr]">
        <GlassCard className="p-6">
          <div className="flex items-center gap-3">
            <FileText className="h-5 w-5 text-cyan-200" />
            <h3 className="text-xl font-semibold text-white">Notes for {formatShortDate(selectedDate)}</h3>
          </div>

          <div className="mt-5 grid gap-5 lg:grid-cols-[1fr_0.92fr]">
            <div className="space-y-3">
              {selectedNotes.length > 0 ? (
                selectedNotes.map((note) => (
                  <div key={note.id} className="rounded-[24px] border border-white/10 bg-white/[0.03] p-4">
                    <div className="flex items-center justify-between gap-3">
                      <p className="font-medium text-white">{note.title}</p>
                      {note.pinned ? <StatusPill label="Pinned" tone="violet" /> : null}
                    </div>
                    <p className="mt-3 text-sm leading-7 text-slate-300">{note.content}</p>
                  </div>
                ))
              ) : (
                <div className="rounded-[24px] border border-dashed border-white/10 bg-white/[0.02] p-4 text-sm text-slate-400">
                  No notes saved for this day yet.
                </div>
              )}
            </div>

            <div className="rounded-[28px] border border-white/10 bg-white/[0.03] p-5">
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-cyan-200">Add note</p>
              <input
                value={noteForm.title}
                onChange={(event) => setNoteForm((current) => ({ ...current, title: event.target.value }))}
                placeholder="Short title"
                className="mt-4 w-full rounded-[20px] border border-white/10 bg-white/[0.04] px-4 py-3 text-white outline-none"
              />
              <textarea
                value={noteForm.content}
                onChange={(event) => setNoteForm((current) => ({ ...current, content: event.target.value }))}
                placeholder="What should you remember for this day?"
                className="mt-3 min-h-[150px] w-full rounded-[24px] border border-white/10 bg-white/[0.04] px-4 py-4 text-white outline-none"
              />
              <label className="mt-3 flex items-center gap-3 text-sm text-slate-300">
                <input
                  type="checkbox"
                  checked={noteForm.pinned}
                  onChange={(event) => setNoteForm((current) => ({ ...current, pinned: event.target.checked }))}
                  className="h-4 w-4 rounded border-white/20 bg-white/10"
                />
                Pin this note for quick access
              </label>
              <Button className="mt-4 w-full" onClick={handleCreateNote}>
                <Plus className="h-4 w-4" />
                Save note
              </Button>
            </div>
          </div>
        </GlassCard>

        <GlassCard className="p-6">
          <h3 className="text-xl font-semibold text-white">Saved hours snapshot</h3>
          <p className="mt-3 text-sm leading-7 text-slate-300">
            {calendar.appointments.length} booked consults and {calendar.notes.length} notes are loaded for this month.
          </p>
          <div className="mt-5 space-y-3">
            {calendar.appointments.slice(0, 3).map((appointment) => (
              <div key={appointment.id} className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-slate-300">
                {appointment.doctorName} • {appointment.date}
              </div>
            ))}
          </div>
        </GlassCard>
      </div>
    </div>
  );
}
