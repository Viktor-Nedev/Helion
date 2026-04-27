import { Bell, Globe2, LockKeyhole, Palette, Shield, Star, UserCircle2 } from "lucide-react";

import { GlassCard } from "@/components/ui/GlassCard";
import { PageHeader } from "@/components/ui/PageHeader";
import { useAppStore } from "@/store/useAppStore";

export function SettingsPage() {
  const { theme, toggleTheme } = useAppStore();

  return (
    <div className="space-y-6">
      <PageHeader
        badge="Profile + Privacy"
        title="Customize your Helio experience"
        description="Manage avatar, theme, notifications, privacy, language, password, and subscription settings from one premium control surface."
      />

      <div className="grid gap-5 xl:grid-cols-2">
        <GlassCard className="p-6">
          <div className="flex items-center gap-3">
            <UserCircle2 className="h-5 w-5 text-cyan-200" />
            <h3 className="text-xl font-semibold text-white">Profile customization</h3>
          </div>
          <div className="mt-5 flex items-center gap-4 rounded-[24px] border border-white/10 bg-white/[0.03] p-5">
            <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-gradient-to-br from-cyan-400 to-violet-500 text-lg font-bold text-slate-950">
              MP
            </div>
            <div>
              <p className="text-lg font-semibold text-white">Mila Petrova</p>
              <p className="text-sm text-slate-400">Premium Care Member</p>
            </div>
          </div>
        </GlassCard>

        <GlassCard className="p-6">
          <div className="flex items-center gap-3">
            <Palette className="h-5 w-5 text-violet-200" />
            <h3 className="text-xl font-semibold text-white">Theme toggle</h3>
          </div>
          <div className="mt-5 flex items-center justify-between rounded-[24px] border border-white/10 bg-white/[0.03] px-5 py-4">
            <div>
              <p className="font-medium text-white">Current mode</p>
              <p className="text-sm text-slate-400">{theme === "aurora" ? "Aurora premium" : "Midnight premium"}</p>
            </div>
            <button onClick={toggleTheme} className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white transition hover:bg-white/[0.08]">
              Switch theme
            </button>
          </div>
        </GlassCard>

        {[
          { icon: Bell, title: "Notifications", description: "Smart reminders, urgent alerts, appointment nudges, and doctor responses." },
          { icon: Shield, title: "Privacy", description: "Data controls, account visibility, and secure sharing permissions." },
          { icon: Globe2, title: "Language", description: "Switch app language, community locale, and communication preferences." },
          { icon: LockKeyhole, title: "Password", description: "Update credentials, multi-factor settings, and login protection." },
          { icon: Star, title: "Subscription", description: "Manage premium plan, billing status, and concierge care benefits." }
        ].map((section) => (
          <GlassCard key={section.title} className="p-6">
            <section.icon className="h-5 w-5 text-cyan-200" />
            <h3 className="mt-4 text-xl font-semibold text-white">{section.title}</h3>
            <p className="mt-3 text-sm leading-7 text-slate-300">{section.description}</p>
          </GlassCard>
        ))}
      </div>
    </div>
  );
}
