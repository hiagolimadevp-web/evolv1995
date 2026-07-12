import { createFileRoute } from "@tanstack/react-router";
import { Droplets, Minus, Plus } from "lucide-react";
import { useAppStore, waterGoalMl } from "@/lib/store";
import { useT } from "@/lib/i18n";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/_app/water")({
  head: () => ({ meta: [{ title: "Water — EVOLV" }] }),
  component: Water,
});

const QUICK = [250, 500, 750, 1000];

function Water() {
  const t = useT();
  const profile = useAppStore((s) => s.profile);
  const daily = useAppStore((s) => s.daily);
  const addWater = useAppStore((s) => s.addWater);
  const goal = waterGoalMl(profile?.weightKg ?? 70);
  const pct = Math.min(1, daily.waterMl / goal);

  return (
    <div className="flex flex-col gap-6 px-5 pt-12">
      <header>
        <div className="text-xs font-medium text-muted-foreground">{t("water")}</div>
        <h1 className="mt-1 font-display text-3xl font-semibold tracking-tight">{t("waterGoal")}</h1>
      </header>

      <div className="card-surface relative flex flex-col items-center justify-end overflow-hidden p-6" style={{ height: 320 }}>
        <div
          className="absolute inset-x-0 bottom-0 transition-all duration-700 ease-out"
          style={{
            height: `${pct * 100}%`,
            background: "linear-gradient(180deg, color-mix(in oklab, var(--color-water) 40%, transparent), var(--color-water))",
          }}
        />
        <div className="relative z-10 flex flex-col items-center gap-1 text-center">
          <Droplets className="h-7 w-7 text-water" />
          <div className="font-display text-5xl font-semibold tracking-tight">{(daily.waterMl / 1000).toFixed(2)}L</div>
          <div className="text-xs text-muted-foreground">
            {Math.max(0, goal - daily.waterMl)} ml {t("remaining")} · {(goal / 1000).toFixed(1)}L {t("ofGoal")}
          </div>
        </div>
      </div>

      <div>
        <div className="mb-3 text-xs font-medium text-muted-foreground">{t("addWater")}</div>
        <div className="grid grid-cols-4 gap-2">
          {QUICK.map((ml) => (
            <button
              key={ml}
              onClick={() => addWater(ml)}
              className="card-surface flex flex-col items-center gap-1 p-4 transition-all hover:brightness-110 active:scale-[0.98]"
            >
              <span className="text-lg">💧</span>
              <span className="text-xs font-semibold">+{ml < 1000 ? `${ml}ml` : `${ml / 1000}L`}</span>
            </button>
          ))}
        </div>
        <div className="mt-4 flex items-center justify-center gap-3">
          <Button variant="ghost" size="icon" className="h-11 w-11 rounded-full bg-surface" onClick={() => addWater(-100)}>
            <Minus className="h-4 w-4" />
          </Button>
          <span className="text-xs text-muted-foreground">100 ml</span>
          <Button variant="ghost" size="icon" className="h-11 w-11 rounded-full bg-surface" onClick={() => addWater(100)}>
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <p className="rounded-2xl bg-primary/10 p-4 text-xs leading-relaxed text-primary">
        {t("greatJob")} {t("keepGoing")}
      </p>
    </div>
  );
}