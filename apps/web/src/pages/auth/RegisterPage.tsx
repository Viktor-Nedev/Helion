import { useState, type FormEvent } from "react";
import { ArrowRight, BriefcaseMedical, ShieldCheck, UserRound } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/Button";
import { GlassCard } from "@/components/ui/GlassCard";
import { registerWithEmail } from "@/lib/api";
import { cn } from "@/lib/utils";
import { useAppStore } from "@/store/useAppStore";

export function RegisterPage() {
  const navigate = useNavigate();
  const { setSession } = useAppStore();
  const [role, setSelectedRole] = useState<"patient" | "doctor">("patient");
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    specialization: "",
    experience: "",
    licenseId: "",
    availability: ""
  });

  function updateField(key: keyof typeof form, value: string) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const result = await registerWithEmail({
      fullName: form.fullName.trim(),
      email: form.email.trim(),
      password: form.password,
      role,
      specialization: form.specialization.trim() || undefined,
      experience: form.experience.trim() || undefined,
      licenseId: form.licenseId.trim() || undefined,
      availability: form.availability.trim() || undefined
    });

    setSession({
      role: result.role,
      profile: result.profile
    });
    navigate(result.role === "doctor" ? "/doctor-dashboard" : "/dashboard");
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 md:px-8">
      <GlassCard className="overflow-hidden p-8 md:p-10">
        <div className="grid gap-10 lg:grid-cols-[0.7fr_1fr]">
          <div>
            <div className="inline-flex rounded-full border border-violet-400/20 bg-violet-400/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-violet-200">
              Premium Onboarding
            </div>
            <h1 className="mt-6 text-5xl font-bold text-white">Create your Helio account</h1>
            <p className="mt-4 text-base leading-8 text-slate-300">
              Join as a patient for AI-first care or onboard as a doctor for premium telemedicine workflow, analytics, and patient communication.
            </p>

            <div className="mt-10 space-y-4">
              <button
                type="button"
                onClick={() => setSelectedRole("patient")}
                className={cn(
                  "w-full rounded-[28px] border p-5 text-left transition",
                  role === "patient" ? "border-cyan-300/40 bg-cyan-400/10" : "border-white/10 bg-white/[0.03]"
                )}
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10">
                    <UserRound className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">Patient</h3>
                    <p className="text-sm text-slate-400">Personal dashboard, AI triage, community, chat, and records.</p>
                  </div>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setSelectedRole("doctor")}
                className={cn(
                  "w-full rounded-[28px] border p-5 text-left transition",
                  role === "doctor" ? "border-violet-300/40 bg-violet-400/10" : "border-white/10 bg-white/[0.03]"
                )}
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10">
                    <BriefcaseMedical className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">Doctor</h3>
                    <p className="text-sm text-slate-400">Consultations, patient analytics, requests, calendar, and earnings.</p>
                  </div>
                </div>
              </button>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="grid gap-5 md:grid-cols-2">
            {[
              { label: "Full Name", key: "fullName" },
              { label: "Email", key: "email" },
              { label: "Password", key: "password", type: "password" },
              { label: "Confirm Password", key: "confirmPassword", type: "password" }
            ].map((field) => (
              <label key={field.key} className="block">
                <span className="text-sm text-slate-300">{field.label}</span>
                <input
                  type={field.type ?? "text"}
                  value={form[field.key as keyof typeof form]}
                  onChange={(event) => updateField(field.key as keyof typeof form, event.target.value)}
                  className="mt-2 w-full rounded-[22px] border border-white/10 bg-white/[0.04] px-4 py-3 text-white outline-none transition focus:border-cyan-300/40"
                />
              </label>
            ))}

            {role === "doctor" ? (
              <>
                {[
                  { label: "Specialization", key: "specialization" },
                  { label: "Experience", key: "experience" },
                  { label: "License ID", key: "licenseId" },
                  { label: "Availability", key: "availability" }
                ].map((field) => (
                  <label key={field.key} className="block">
                    <span className="text-sm text-slate-300">{field.label}</span>
                    <input
                      value={form[field.key as keyof typeof form]}
                      onChange={(event) => updateField(field.key as keyof typeof form, event.target.value)}
                      className="mt-2 w-full rounded-[22px] border border-white/10 bg-white/[0.04] px-4 py-3 text-white outline-none transition focus:border-cyan-300/40"
                    />
                  </label>
                ))}
              </>
            ) : null}

            <div className="md:col-span-2">
              <div className="mb-5 rounded-[24px] border border-white/10 bg-white/[0.03] p-5">
                <div className="flex items-center gap-3">
                  <ShieldCheck className="h-5 w-5 text-cyan-200" />
                  <p className="text-sm text-slate-300">
                    Doctor accounts enter a verification flow before going fully live. Patient accounts are ready immediately.
                  </p>
                </div>
              </div>

              <Button type="submit" className="w-full">
                Create Account
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </form>
        </div>
      </GlassCard>
    </div>
  );
}
