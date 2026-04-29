import { create } from "zustand";
import { persist } from "zustand/middleware";

import type { Role, ThemeMode } from "@helio/shared";

const DEMO_ACCOUNT_EMAIL = "mila@helio.health";

interface SessionProfile {
  id: string;
  name: string;
  email: string;
  title: string;
}

interface AppState {
  role: Role;
  theme: ThemeMode;
  sessionProfile: SessionProfile | null;
  isAssistantOpen: boolean;
  isBootSequenceVisible: boolean;
  isEmergencyOpen: boolean;
  setRole: (role: Role) => void;
  setSession: (input: { role: Role; profile: SessionProfile }) => void;
  clearSession: () => void;
  isDemoAccount: () => boolean;
  toggleTheme: () => void;
  toggleAssistant: () => void;
  openEmergency: () => void;
  closeEmergency: () => void;
  finishBootSequence: () => void;
}

export const useAppStore = create<AppState>()(
  persist<AppState>(
    (set, get) => ({
      role: "patient",
      theme: "aurora",
      sessionProfile: null,
      isAssistantOpen: false,
      isBootSequenceVisible: true,
      isEmergencyOpen: false,
      setRole: (role) => set({ role }),
      setSession: ({ role, profile }) =>
        set({
          role,
          sessionProfile: profile
        }),
      clearSession: () => set({ sessionProfile: null }),
      isDemoAccount: (): boolean => {
        const profile = get().sessionProfile;
        return profile?.email?.trim().toLowerCase() === DEMO_ACCOUNT_EMAIL;
      },
      toggleTheme: () =>
        set((state) => ({
          theme: state.theme === "aurora" ? "midnight" : "aurora"
        })),
      toggleAssistant: () => set((state) => ({ isAssistantOpen: !state.isAssistantOpen })),
      openEmergency: () => set({ isEmergencyOpen: true }),
      closeEmergency: () => set({ isEmergencyOpen: false }),
      finishBootSequence: () => set({ isBootSequenceVisible: false })
    }),
    { name: "helio-app-store" }
  )
);
