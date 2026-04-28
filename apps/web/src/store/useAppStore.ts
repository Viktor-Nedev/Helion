import { create } from "zustand";
import { persist } from "zustand/middleware";

import type { Role, ThemeMode } from "@helio/shared";

interface AppState {
  role: Role;
  theme: ThemeMode;
  isAssistantOpen: boolean;
  isBootSequenceVisible: boolean;
  isEmergencyOpen: boolean;
  setRole: (role: Role) => void;
  toggleTheme: () => void;
  toggleAssistant: () => void;
  openEmergency: () => void;
  closeEmergency: () => void;
  finishBootSequence: () => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      role: "patient",
      theme: "aurora",
      isAssistantOpen: false,
      isBootSequenceVisible: true,
      isEmergencyOpen: false,
      setRole: (role) => set({ role }),
      toggleTheme: () =>
        set((state) => ({
          theme: state.theme === "aurora" ? "midnight" : "aurora"
        })),
      toggleAssistant: () => set((state) => ({ isAssistantOpen: !state.isAssistantOpen })),
      openEmergency: () => set({ isEmergencyOpen: true }),
      closeEmergency: () => set({ isEmergencyOpen: false }),
      finishBootSequence: () => set({ isBootSequenceVisible: false })
    }),
    {
      name: "helio-app-store",
      partialize: (state) => ({
        role: state.role,
        theme: state.theme
      })
    }
  )
);
