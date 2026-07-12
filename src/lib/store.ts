import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { LanguageCode } from "./countries";

export type Gender = "female" | "male" | "other";
export type Activity = "sedentary" | "light" | "moderate" | "active" | "athlete";
export type MainGoal =
  | "lose" | "muscle" | "maintain" | "health" | "smoke" | "money" | "sleep" | "trip" | "habits";

export type Profile = {
  name: string;
  birthDate: string; // YYYY-MM-DD
  gender: Gender;
  heightCm: number;
  weightKg: number;
  goalWeightKg: number;
  activity: Activity;
  mainGoal: MainGoal;
  why: string;
};

export type Settings = {
  language: LanguageCode;
  country: string; // ISO code
  units: "metric" | "imperial";
  currency: string;
  theme: "dark" | "light";
  notifications: boolean;
};

type DailyLog = {
  date: string; // YYYY-MM-DD
  waterMl: number;
  checklist: Record<string, boolean>;
};

type State = {
  onboardingComplete: boolean;
  settings: Settings;
  profile: Profile | null;
  daily: DailyLog;
  streak: number;
  lastStreakDate: string | null;
  setSettings: (patch: Partial<Settings>) => void;
  setProfile: (patch: Partial<Profile>) => void;
  completeOnboarding: () => void;
  resetOnboarding: () => void;
  addWater: (ml: number) => void;
  setWater: (ml: number) => void;
  toggleCheck: (key: string) => void;
  ensureToday: () => void;
};

function today() {
  return new Date().toISOString().slice(0, 10);
}

const defaultSettings: Settings = {
  language: "en",
  country: "PT",
  units: "metric",
  currency: "EUR",
  theme: "dark",
  notifications: true,
};

const emptyDaily: DailyLog = { date: today(), waterMl: 0, checklist: {} };

export const useAppStore = create<State>()(
  persist(
    (set, get) => ({
      onboardingComplete: false,
      settings: defaultSettings,
      profile: null,
      daily: emptyDaily,
      streak: 0,
      lastStreakDate: null,
      setSettings: (patch) => set({ settings: { ...get().settings, ...patch } }),
      setProfile: (patch) =>
        set({
          profile: {
            ...(get().profile ?? {
              name: "",
              birthDate: "",
              gender: "other",
              heightCm: 170,
              weightKg: 70,
              goalWeightKg: 70,
              activity: "moderate",
              mainGoal: "health",
              why: "",
            }),
            ...patch,
          },
        }),
      completeOnboarding: () => set({ onboardingComplete: true }),
      resetOnboarding: () =>
        set({
          onboardingComplete: false,
          profile: null,
          daily: { date: today(), waterMl: 0, checklist: {} },
          streak: 0,
          lastStreakDate: null,
        }),
      addWater: (ml) => {
        get().ensureToday();
        set({ daily: { ...get().daily, waterMl: Math.max(0, get().daily.waterMl + ml) } });
      },
      setWater: (ml) => {
        get().ensureToday();
        set({ daily: { ...get().daily, waterMl: Math.max(0, ml) } });
      },
      toggleCheck: (key) => {
        get().ensureToday();
        const cl = { ...get().daily.checklist, [key]: !get().daily.checklist[key] };
        set({ daily: { ...get().daily, checklist: cl } });
        // streak: if all core keys checked today, bump streak once
        const core = ["water", "breakfast", "lunch", "dinner"];
        const done = core.every((k) => cl[k]);
        const t = today();
        if (done && get().lastStreakDate !== t) {
          const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
          const s = get().lastStreakDate === yesterday ? get().streak + 1 : 1;
          set({ streak: s, lastStreakDate: t });
        }
      },
      ensureToday: () => {
        const t = today();
        if (get().daily.date !== t) {
          set({ daily: { date: t, waterMl: 0, checklist: {} } });
        }
      },
    }),
    { name: "evolv-store-v1" },
  ),
);

export function waterGoalMl(weightKg: number): number {
  return Math.round(weightKg * 35);
}

export function calorieGoal(p: Profile): number {
  // Mifflin-St Jeor
  const age = p.birthDate ? Math.max(15, new Date().getFullYear() - new Date(p.birthDate).getFullYear()) : 30;
  const s = p.gender === "male" ? 5 : p.gender === "female" ? -161 : -78;
  const bmr = 10 * p.weightKg + 6.25 * p.heightCm - 5 * age + s;
  const mult = { sedentary: 1.2, light: 1.375, moderate: 1.55, active: 1.725, athlete: 1.9 }[p.activity];
  const tdee = bmr * mult;
  const adj = p.mainGoal === "lose" ? -400 : p.mainGoal === "muscle" ? 250 : 0;
  return Math.round(tdee + adj);
}

export function proteinGoal(p: Profile): number {
  const perKg = p.mainGoal === "muscle" ? 2 : p.mainGoal === "lose" ? 1.8 : 1.4;
  return Math.round(p.weightKg * perKg);
}