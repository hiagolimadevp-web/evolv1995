import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Droplets, Flame, Beef, Target, Sparkles } from "lucide-react";
import { useAppStore, waterGoalMl, calorieGoal, proteinGoal } from "@/lib/store";
import { useT } from "@/lib/i18n";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/onboarding/summary")({
  component: SummaryStep,
});

function buildMilestones(current: number, goal: number): number[] {
  if (current === goal) return [current];
  const step = current > goal ? -5 : 5;
  const list: number[] = [current];
  let v = Math.round(current / 5) * 5;
  if (v === current) v += step;
  while ((step < 0 && v > goal) || (step > 0 && v < goal)) {
    list.push(v);
    v += step;
  }
  list.push(goal);
  // dedupe & keep monotonic
  return Array.from(new Set(list));
}

function SummaryStep() {
  const t = useT();
  const nav = useNavigate();
  const profile = useAppStore((s) => s.profile);

  if (!profile) {
    return (
      <div className="flex flex-1 flex-col">
        <p className="text-sm text-muted-foreground">…</p>
      </div>
    );
  }

  const water = waterGoalMl(profile.weightKg);
  const kcal = calorieGoal(profile);
  const prot = proteinGoal(profile);
  const isWeight = profile.mainGoal === "lose" || profile.mainGoal === "muscle" || profile.mainGoal === "maintain";
  const milestones = isWeight ? buildMilestones(profile.weightKg, profile.goalWeightKg) : [];

  return (
    <div className="flex flex-1 flex-col animate-fade-in">
      <div className="grid h-12 w-12 place-items-center rounded-2xl bg-primary/15 text-primary">
        <Sparkles className="h-5 w-5" />
      </div>
      <h1 className="mt-4 font-display text-3xl font-semibold tracking-tight">{t("yourPlan")}</h1>
      <p className="mt-2 text-sm text-muted-foreground">{t("yourPlanSub")}</p>

      <div className="mt-6 grid grid-cols-3 gap-2">
        <MiniStat icon={<Droplets className="h-4 w-4" />} label={t("dailyWaterTarget")} value={`${(water / 1000).toFixed(1)}L`} />
        <MiniStat icon={<Flame className="h-4 w-4" />} label={t("dailyEnergyTarget")} value={`${kcal}`} sub="kcal" />
        <MiniStat icon={<Beef className="h-4 w-4" />} label={t("dailyProteinTarget")} value={`${prot}g`} />
      </div>

      {isWeight && milestones.length > 1 ? (
        <div className="card-surface mt-6 p-5">
          <div className="flex items-center gap-2">
            <Target className="h-4 w-4 text-primary" />
            <div className="text-sm font-semibold">{t("yourMilestones")}</div>
          </div>
          <p className="mt-1 text-xs text-muted-foreground">{t("milestonesSub")}</p>
          <ol className="mt-4 flex flex-col gap-3">
            {milestones.map((m, i) => {
              const first = i === 0;
              const last = i === milestones.length - 1;
              return (
                <li key={`${m}-${i}`} className="flex items-center gap-3">
                  <span
                    className={`grid h-8 w-8 shrink-0 place-items-center rounded-full text-[11px] font-semibold ${
                      last ? "bg-primary text-primary-foreground" : "bg-primary/15 text-primary"
                    }`}
                  >
                    {last ? "★" : i}
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="text-sm font-medium">{m} kg</div>
                    <div className="text-[11px] text-muted-foreground">
                      {first ? t("today_word") : last ? t("final") : `Step ${i}`}
                    </div>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      ) : null}

      {profile.why ? (
        <div className="mt-6 rounded-2xl bg-primary/10 p-4 text-sm leading-relaxed text-primary">
          <span className="text-xs uppercase tracking-wider opacity-70">{t("whyImportant")}</span>
          <div className="mt-1 font-medium text-foreground">{profile.why}</div>
        </div>
      ) : null}

      <div className="mt-auto flex gap-2 pt-8">
        <Button variant="ghost" className="h-12 flex-1 rounded-2xl" onClick={() => nav({ to: "/onboarding/goal" })}>
          {t("back")}
        </Button>
        <Button className="h-12 flex-[2] rounded-2xl text-base" onClick={() => nav({ to: "/onboarding/welcome" })}>
          {t("continue")}
        </Button>
      </div>
    </div>
  );
}

function MiniStat({ icon, label, value, sub }: { icon: React.ReactNode; label: string; value: string; sub?: string }) {
  return (
    <div className="card-surface flex flex-col gap-1.5 p-3">
      <span className="grid h-7 w-7 place-items-center rounded-lg bg-primary/10 text-primary">{icon}</span>
      <div className="font-display text-lg font-semibold leading-none">{value}{sub ? <span className="ml-1 text-[10px] font-normal text-muted-foreground">{sub}</span> : null}</div>
      <div className="text-[10px] leading-tight text-muted-foreground">{label}</div>
    </div>
  );
}