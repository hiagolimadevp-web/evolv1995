import { createFileRoute, Link } from "@tanstack/react-router";
import { Droplets, Flame, Beef, Footprints, Dumbbell, Moon, Scale, Sparkles, PiggyBank, Utensils, Check } from "lucide-react";
import { useAppStore, waterGoalMl, calorieGoal, proteinGoal } from "@/lib/store";
import { useT } from "@/lib/i18n";
import { ProgressRing } from "@/components/progress-ring";
import { StatCard } from "@/components/stat-card";

export const Route = createFileRoute("/_app/home")({
  head: () => ({ meta: [{ title: "Home — EVOLV" }] }),
  component: Home,
});

function greetKey(): "goodMorning" | "goodAfternoon" | "goodEvening" {
  const h = new Date().getHours();
  if (h < 12) return "goodMorning";
  if (h < 18) return "goodAfternoon";
  return "goodEvening";
}

function Home() {
  const t = useT();
  const profile = useAppStore((s) => s.profile);
  const daily = useAppStore((s) => s.daily);
  const streak = useAppStore((s) => s.streak);
  const toggle = useAppStore((s) => s.toggleCheck);

  const waterGoal = waterGoalMl(profile?.weightKg ?? 70);
  const waterPct = Math.min(1, daily.waterMl / waterGoal);
  const checks = Object.values(daily.checklist).filter(Boolean).length;
  const checkTotal = 8;
  const dayPct = Math.min(1, (checks / checkTotal) * 0.6 + waterPct * 0.4);
  const kcalGoal = profile ? calorieGoal(profile) : 2000;
  const pGoal = profile ? proteinGoal(profile) : 100;

  // Journey % — how far from start toward goal weight.
  let journeyPct: number | null = null;
  if (profile && profile.weightKg !== profile.goalWeightKg) {
    // Assume starting weight = current stored weight at onboarding; fallback shows 0% until data grows.
    const total = Math.abs(profile.weightKg - profile.goalWeightKg);
    journeyPct = total > 0 ? 0 : null;
  }

  const priorityActions: { key: string; label: string; emoji: string }[] = [
    { key: "water", label: t("drinkWater"), emoji: "💧" },
    { key: "breakfast", label: t("meals"), emoji: "🥣" },
    { key: "workout", label: t("workout"), emoji: "🏋️" },
    { key: "walk", label: t("walk"), emoji: "🚶" },
    { key: "sleep", label: t("sleep"), emoji: "😴" },
  ];

  return (
    <div className="flex flex-col gap-7 px-5 pt-12 animate-fade-in">
      <header className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <div className="text-xs font-medium text-muted-foreground">{t(greetKey())}</div>
          <h1 className="mt-1 truncate font-display text-3xl font-semibold tracking-tight">
            {profile?.name || "EVOLV"}
          </h1>
        </div>
        <div className="flex shrink-0 items-center gap-1.5 rounded-full bg-surface px-3 py-1.5 shadow-soft">
          <Sparkles className="h-3.5 w-3.5 text-warm" />
          <span className="text-xs font-semibold">{streak}</span>
          <span className="text-[10px] text-muted-foreground">{t("streak")}</span>
        </div>
      </header>

      {/* HERO — daily progress + gentle intent */}
      <section className="card-surface relative flex items-center gap-5 overflow-hidden p-5">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-16 -top-16 h-52 w-52 rounded-full opacity-30 blur-3xl"
          style={{ background: "var(--color-primary)" }}
        />
        <ProgressRing value={dayPct} size={128} strokeWidth={10}>
          <div className="font-display text-3xl font-semibold">{Math.round(dayPct * 100)}%</div>
          <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{t("dailyProgress")}</div>
        </ProgressRing>
        <div className="min-w-0 flex-1">
          <div className="font-display text-lg font-semibold leading-tight">{t("todayEncourage")}</div>
          <p className="mt-1 text-xs text-muted-foreground">
            {profile?.why ? `${t("whyImportant")} ${profile.why}` : t("tagline")}
          </p>
          <Link
            to="/today"
            className="mt-3 inline-flex items-center gap-1 rounded-full bg-primary/15 px-3 py-1.5 text-xs font-medium text-primary transition-colors hover:bg-primary/25"
          >
            {t("todaysFocus")} →
          </Link>
        </div>
      </section>

      {/* TODAY — actions first, answers "what should I do now?" */}
      <section>
        <div className="mb-3 flex items-end justify-between">
          <h2 className="font-display text-lg font-semibold tracking-tight">{t("todayActions")}</h2>
          <Link to="/today" className="text-xs font-medium text-primary">{t("todaysFocus")} →</Link>
        </div>
        <div className="flex flex-col gap-2">
          {priorityActions.map((a) => {
            const done = !!daily.checklist[a.key];
            return (
              <button
                key={a.key}
                onClick={() => toggle(a.key)}
                className={`card-surface flex items-center gap-4 p-3.5 text-left transition-all active:scale-[0.99] ${done ? "ring-1 ring-primary/40" : "hover:brightness-110"}`}
              >
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-surface-elevated text-lg">{a.emoji}</span>
                <span className={`min-w-0 flex-1 text-sm font-medium transition-all ${done ? "text-muted-foreground line-through" : ""}`}>
                  {a.label}
                </span>
                <span
                  className={`grid h-8 w-8 shrink-0 place-items-center rounded-full transition-all duration-300 ${done ? "bg-primary text-primary-foreground scale-100" : "bg-secondary text-transparent scale-90"}`}
                >
                  <Check className="h-4 w-4" strokeWidth={3} />
                </span>
              </button>
            );
          })}
        </div>
      </section>

      {/* JOURNEY — statistics come after actions */}
      <section>
        <h2 className="mb-3 font-display text-lg font-semibold tracking-tight">{t("yourStats")}</h2>
        <div className="grid grid-cols-2 gap-3">
          <StatCard
          icon={Droplets}
          label={t("water")}
          value={`${(daily.waterMl / 1000).toFixed(1)}L`}
          sub={`${Math.round(waterPct * 100)}% ${t("ofGoal")}`}
          progress={waterPct}
          tint="var(--color-water)"
        />
          <StatCard
          icon={Flame}
          label={t("calories")}
          value={`${kcalGoal}`}
          sub="kcal"
          progress={0.32}
          tint="var(--color-warm)"
        />
          <StatCard icon={Beef} label={t("protein")} value={`${pGoal}g`} progress={0.28} tint="var(--color-primary)" />
          <StatCard icon={Footprints} label={t("steps")} value="—" sub={t("comingSoon")} tint="var(--color-chart-4)" />
          <StatCard icon={Moon} label={t("sleep")} value="—" sub={t("comingSoon")} tint="var(--color-chart-2)" />
          <StatCard icon={Dumbbell} label={t("workout")} value="—" sub={t("comingSoon")} tint="var(--color-primary)" />
          <StatCard
            icon={Scale}
            label={t("weight")}
            value={`${profile?.weightKg ?? "—"} kg`}
            sub={profile ? `→ ${profile.goalWeightKg} kg` : ""}
            tint="var(--color-chart-5)"
            progress={journeyPct ?? undefined}
          />
          <StatCard icon={PiggyBank} label={t("savings")} value="—" sub={t("comingSoon")} tint="var(--color-chart-3)" />
        </div>
      </section>

      <section className="card-surface flex items-center gap-4 p-4">
        <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-primary/15 text-primary">
          <Utensils className="h-5 w-5" />
        </span>
        <div className="min-w-0 flex-1">
          <div className="text-sm font-semibold">{t("nutrition")}</div>
          <div className="text-xs text-muted-foreground">{t("emptyMeals")}</div>
        </div>
      </section>
    </div>
  );
}