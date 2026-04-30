import { Bell, Globe2, LockKeyhole, Palette, Shield, Star, UserCircle2 } from "lucide-react";
import { useState } from "react";

import { GlassCard } from "@/components/ui/GlassCard";
import { PageHeader } from "@/components/ui/PageHeader";
import { getUserSettings, saveUserSettings } from "@/lib/user-data";
import { useAppStore } from "@/store/useAppStore";

export function SettingsPage() {
  const { theme, toggleTheme, sessionProfile, updateSessionProfile } = useAppStore();
  const [displayName, setDisplayName] = useState(sessionProfile?.name ?? "");
  const [settings, setSettings] = useState(() => getUserSettings(sessionProfile?.email));
  const profileName = sessionProfile?.name ?? "Helio User";
  const profileTitle = sessionProfile?.title ?? "Member";
  const initials =
    profileName
      .split(" ")
      .filter(Boolean)
      .slice(0, 2)
      .map((part: string) => part.charAt(0).toUpperCase())
      .join("") || "HU";

  function updateSettings(next: Partial<typeof settings>) {
    const merged = { ...settings, ...next };
    setSettings(merged);
    saveUserSettings(sessionProfile?.email, merged);
  }

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
              {initials}
            </div>
            <div>
              <p className="text-lg font-semibold text-white">{profileName}</p>
              <p className="text-sm text-slate-400">{profileTitle}</p>
            </div>
          </div>
          <div className="mt-4 flex gap-3">
            <input
              value={displayName}
              onChange={(event) => setDisplayName(event.target.value)}
              placeholder="Display name"
              className="w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-2 text-white"
            />
            <button
              onClick={() => updateSessionProfile({ name: displayName.trim() || profileName })}
              className="rounded-2xl border border-white/10 px-4 py-2 text-sm text-white"
            >
              Save
            </button>
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

        <GlassCard className="p-6">
          <Bell className="h-5 w-5 text-cyan-200" />
          <h3 className="mt-4 text-xl font-semibold text-white">Notifications</h3>
          <label className="mt-4 flex items-center justify-between rounded-2xl border border-white/10 px-4 py-3">
            <span className="text-sm text-slate-300">Enable reminders and alerts</span>
            <input
              type="checkbox"
              checked={settings.notifications}
              onChange={(event) => updateSettings({ notifications: event.target.checked })}
            />
          </label>
        </GlassCard>

        <GlassCard className="p-6">
          <Shield className="h-5 w-5 text-cyan-200" />
          <h3 className="mt-4 text-xl font-semibold text-white">Privacy</h3>
          <label className="mt-4 flex items-center justify-between rounded-2xl border border-white/10 px-4 py-3">
            <span className="text-sm text-slate-300">Show profile in community</span>
            <input
              type="checkbox"
              checked={settings.profileVisible}
              onChange={(event) => updateSettings({ profileVisible: event.target.checked })}
            />
          </label>
        </GlassCard>

        <GlassCard className="p-6">
          <Globe2 className="h-5 w-5 text-cyan-200" />
          <h3 className="mt-4 text-xl font-semibold text-white">Language</h3>
          <select
            value={settings.language}
            onChange={(event) => updateSettings({ language: event.target.value })}
            className="mt-4 w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-white"
          >
            <option value="en">English</option>
            <option value="bg">Bulgarian</option>
          </select>
        </GlassCard>

        <GlassCard className="p-6">
          <Star className="h-5 w-5 text-cyan-200" />
          <h3 className="mt-4 text-xl font-semibold text-white">Email updates</h3>
          <label className="mt-4 flex items-center justify-between rounded-2xl border border-white/10 px-4 py-3">
            <span className="text-sm text-slate-300">Receive product and health tips</span>
            <input
              type="checkbox"
              checked={settings.marketingEmails}
              onChange={(event) => updateSettings({ marketingEmails: event.target.checked })}
            />
          </label>
        </GlassCard>

        <GlassCard className="p-6">
          <LockKeyhole className="h-5 w-5 text-cyan-200" />
          <h3 className="mt-4 text-xl font-semibold text-white">Password</h3>
          <p className="mt-3 text-sm leading-7 text-slate-300">Password reset and MFA are available through your authentication provider.</p>
        </GlassCard>
      </div>
    </div>
  );
}
