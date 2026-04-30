import { Filter, Search, Sparkles } from "lucide-react";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import type { DoctorCardModel } from "@helio/shared";

import { DoctorCard } from "@/components/doctors/DoctorCard";
import { Button } from "@/components/ui/Button";
import { GlassCard } from "@/components/ui/GlassCard";
import { PageHeader } from "@/components/ui/PageHeader";
import { doctorMarketplace } from "@/data/mock";
import { saveLocalAppointment } from "@/lib/user-data";
import { useAppStore } from "@/store/useAppStore";

export function DoctorsPageV2() {
  const navigate = useNavigate();
  const { sessionProfile } = useAppStore();
  const [query, setQuery] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState("All");
  const [bookingDoctorId, setBookingDoctorId] = useState<string | null>(null);
  const [bookingForm, setBookingForm] = useState({
    date: "",
    time: "",
    duration: 30,
    mode: "chat" as "chat" | "video" | "clinic"
  });

  const specialties = useMemo(
    () => ["All", ...Array.from(new Set(doctorMarketplace.map((doctor) => doctor.specialty)))],
    []
  );

  const filteredDoctors = useMemo(() => {
    return doctorMarketplace.filter((doctor) => {
      const matchQuery =
        query.trim().length === 0 ||
        doctor.name.toLowerCase().includes(query.toLowerCase()) ||
        doctor.specialty.toLowerCase().includes(query.toLowerCase()) ||
        doctor.tags.some((tag) => tag.toLowerCase().includes(query.toLowerCase()));

      const matchSpecialty = selectedSpecialty === "All" || doctor.specialty === selectedSpecialty;
      return matchQuery && matchSpecialty;
    });
  }, [query, selectedSpecialty]);

  const bookingDoctor = doctorMarketplace.find((doctor) => doctor.id === bookingDoctorId) ?? null;

  function handleBookDoctor(doctor: DoctorCardModel) {
    setBookingDoctorId(doctor.id);
  }

  function handleSaveAppointment() {
    if (!bookingDoctor || !bookingForm.date || !bookingForm.time) {
      return;
    }

    const [hours, minutes] = bookingForm.time.split(":").map((value) => Number(value));
    const startDate = new Date(`${bookingForm.date}T00:00:00`);
    startDate.setHours(hours, minutes, 0, 0);
    const endDate = new Date(startDate.getTime() + bookingForm.duration * 60 * 1000);

    saveLocalAppointment(sessionProfile?.email, {
      id: `local-appointment-${Date.now()}`,
      doctorName: bookingDoctor.name,
      specialty: bookingDoctor.specialty,
      date: bookingForm.date,
      status: "confirmed",
      mode: bookingForm.mode,
      startAt: startDate.toISOString(),
      endAt: endDate.toISOString(),
      location: bookingForm.mode === "clinic" ? "Clinic visit" : "Helio secure room",
      threadId: "thread-welcome",
      roomId: bookingForm.mode === "video" ? "room-care-concierge" : undefined
    });

    setBookingForm({ date: "", time: "", duration: 30, mode: "chat" });
    setBookingDoctorId(null);
    navigate("/appointments");
  }

  return (
    <div className="space-y-6">
      <PageHeader
        badge="Doctor Marketplace"
        title="Find the right specialist in seconds"
        description="Search doctors, filter by specialty, and save a real appointment directly in your calendar."
      />

      <GlassCard className="p-5">
        <div className="grid gap-4 xl:grid-cols-[1fr_auto_auto]">
          <div className="glass-panel flex items-center gap-3 rounded-[22px] px-4 py-3">
            <Search className="h-4 w-4 text-slate-400" />
            <input
              placeholder="Search by doctor, specialty, or symptom..."
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              className="w-full bg-transparent text-sm text-white outline-none placeholder:text-slate-500"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            {specialties.map((specialty) => (
              <button
                key={specialty}
                onClick={() => setSelectedSpecialty(specialty)}
                className={`rounded-full border px-4 py-2 text-sm transition ${
                  selectedSpecialty === specialty
                    ? "border-cyan-300/30 bg-cyan-400/10 text-cyan-100"
                    : "border-white/10 bg-white/[0.03] text-slate-300 hover:bg-white/[0.06]"
                }`}
              >
                {specialty}
              </button>
            ))}
          </div>

          <Button variant="secondary">
            <Filter className="h-4 w-4" />
            Smart Filters
          </Button>
        </div>
      </GlassCard>

      {bookingDoctor ? (
        <GlassCard className="p-6">
          <h3 className="text-xl font-semibold text-white">Book with {bookingDoctor.name}</h3>
          <div className="mt-5 grid gap-3 md:grid-cols-4">
            <input
              type="date"
              value={bookingForm.date}
              onChange={(event) => setBookingForm((current) => ({ ...current, date: event.target.value }))}
              className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-white"
            />
            <input
              type="time"
              value={bookingForm.time}
              onChange={(event) => setBookingForm((current) => ({ ...current, time: event.target.value }))}
              className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-white"
            />
            <select
              value={bookingForm.duration}
              onChange={(event) => setBookingForm((current) => ({ ...current, duration: Number(event.target.value) }))}
              className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-white"
            >
              <option value={30}>30 min</option>
              <option value={45}>45 min</option>
              <option value={60}>60 min</option>
            </select>
            <select
              value={bookingForm.mode}
              onChange={(event) => setBookingForm((current) => ({ ...current, mode: event.target.value as "chat" | "video" | "clinic" }))}
              className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-white"
            >
              <option value="chat">Chat</option>
              <option value="video">Video</option>
              <option value="clinic">Clinic</option>
            </select>
          </div>
          <div className="mt-4 flex gap-3">
            <Button onClick={handleSaveAppointment}>Save in calendar</Button>
            <Button variant="secondary" onClick={() => setBookingDoctorId(null)}>
              Cancel
            </Button>
          </div>
        </GlassCard>
      ) : null}

      <div className="grid gap-5">
        {filteredDoctors.map((doctor) => (
          <DoctorCard key={doctor.id} doctor={doctor} onBook={handleBookDoctor} onMessage={() => navigate("/messages")} />
        ))}
        {filteredDoctors.length === 0 ? (
          <GlassCard className="p-6 text-sm text-slate-300">No doctors matched your current filters.</GlassCard>
        ) : null}
      </div>

      <GlassCard className="p-6">
        <div className="flex items-center gap-3">
          <Sparkles className="h-5 w-5 text-cyan-200" />
          <h3 className="text-xl font-semibold text-white">Premium matching</h3>
        </div>
        <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-300">
          Helio ranks doctors using specialty fit, availability, response speed, ratings, language match, and AI triage context.
        </p>
      </GlassCard>
    </div>
  );
}
