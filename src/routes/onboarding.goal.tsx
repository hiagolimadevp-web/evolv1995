import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { useAppStore, type MainGoal } from "@/lib/store";
import { useT } from "@/lib/i18n";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/onboarding/goal")({
  component: GoalStep,
});

const GOALS: { value: MainGoal; key: string; emoji: string }[] = [
  { value: "lose", key: "goalLose", emoji: "🌿" },
  { value: "muscle", key: "goalMuscle", emoji: "💪" },
  { value: "maintain", key: "goalMaintain", emoji: "⚖️" },
  { value: "health", key: "goalHealth", emoji: "❤️" },
  { value: "smoke", key: "goalSmoke", emoji: "🚭" },
  { value: "money", key: "goalMoney", emoji: "💰" },
  { value: "sleep", key: "goalSleep", emoji: "🌙" },
  { value: "trip", key: "goalTrip", emoji: "✈️" },
  { value: "habits", key: "goalHabits", emoji: "✨" },
];

const WHYS = ["whyHealth", "whyWedding", "whyTravel", "whyAustralia", "whyFamily", "whySelf", "whySports", "whyAchievement"];

function GoalStep() {
  const t = useT();
  const nav = useNavigate();
  const profile = useAppStore((s) => s.profile);
  const setProfile = useAppStore((s) => s.setProfile);
  const [goal, setGoal] = useState<MainGoal>(profile?.mainGoal ?? "health");
  const [why, setWhy] = useState(profile?.why ?? "");

  const next = () => {
    setProfile({ mainGoal: goal, why });
    nav({ to: "/onboarding/summary" });
  };

  return (
    <div className="flex flex-1 flex-col">
      <h1 className="font-display text-3xl font-semibold tracking-tight">{t("yourGoal")}</h1>
      <p className="mt-2 text-sm text-muted-foreground">{t("yourGoalSub")}</p>

      <div className="mt-6 grid grid-cols-2 gap-2">
        {GOALS.map((g) => {
          const active = g.value === goal;
          return (
            <button
              key={g.value}
              onClick={() => setGoal(g.value)}
              className={`card-surface flex flex-col items-start gap-2 p-3.5 text-left transition-all ${active ? "ring-2 ring-primary" : "hover:brightness-110"}`}
            >
              <span className="text-xl">{g.emoji}</span>
              <span className="text-sm font-medium leading-tight">{t(g.key)}</span>
            </button>
          );
        })}
      </div>

      <div className="mt-8">
        <div className="font-display text-lg font-semibold tracking-tight">{t("whyImportant")}</div>
        <p className="mt-1 text-xs text-muted-foreground">{t("whyImportantSub")}</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {WHYS.map((w) => {
            const label = t(w);
            const active = why === label;
            return (
              <button
                key={w}
                onClick={() => setWhy(label)}
                className={`rounded-full px-3.5 py-2 text-xs transition-colors ${active ? "bg-primary text-primary-foreground" : "bg-surface text-foreground hover:brightness-110"}`}
              >
                {label}
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-auto flex gap-2 pt-8">
        <Button variant="ghost" className="h-12 flex-1 rounded-2xl" onClick={() => nav({ to: "/onboarding/profile" })}>
          {t("back")}
        </Button>
        <Button className="h-12 flex-[2] rounded-2xl text-base" onClick={next}>
          {t("continue")}
        </Button>
      </div>
    </div>
  );
}