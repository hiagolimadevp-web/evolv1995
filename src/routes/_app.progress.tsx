import { createFileRoute } from "@tanstack/react-router";
import { Scale, TrendingDown, Sparkles, Camera } from "lucide-react";
import { useAppStore } from "@/lib/store";
import { useT } from "@/lib/i18n";
import { EmptyState } from "@/components/empty-state";

export const Route = createFileRoute("/_app/progress")({
  head: () => ({ meta: [{ title: "Progress — EVOLV" }] }),
  component: Progress,
});

function Progress() {
  const t = useT();
  const profile = useAppStore((s) => s.profile);
  const streak = useAppStore((s) => s.streak);
  const bmi = profile ? (profile.weightKg / Math.pow(profile.heightCm / 100, 2)).toFixed(1) : "—";
  const hasWeightHistory = false; // Phase 2: real weight log

  return (
    <div className="flex flex-col gap-6 px-5 pt-12 animate-fade-in">
      <header>
        <div className="text-xs font-medium text-muted-foreground">{t("progress")}</div>
        <h1 className="mt-1 font-display text-3xl font-semibold tracking-tight">Your journey</h1>
      </header>
      <div className="grid grid-cols-2 gap-3">
        <div className="card-surface p-4">
          <div className="mb-2 flex items-center gap-2 text-xs text-muted-foreground"><Scale className="h-4 w-4" /> {t("weight")}</div>
          <div className="font-display text-2xl font-semibold">{profile?.weightKg ?? "—"} kg</div>
          <div className="mt-1 text-xs text-muted-foreground">→ {profile?.goalWeightKg ?? "—"} kg</div>
        </div>
        <div className="card-surface p-4">
          <div className="mb-2 flex items-center gap-2 text-xs text-muted-foreground"><TrendingDown className="h-4 w-4" /> BMI</div>
          <div className="font-display text-2xl font-semibold">{bmi}</div>
          <div className="mt-1 text-xs text-muted-foreground">{t("keepGoingGentle")}</div>
        </div>
        <div className="card-surface col-span-2 flex items-center gap-4 p-4">
          <span className="grid h-11 w-11 place-items-center rounded-2xl bg-warm/20 text-warm"><Sparkles className="h-5 w-5" /></span>
          <div>
            <div className="text-sm font-semibold">{streak} {t("streak")}</div>
            <div className="text-xs text-muted-foreground">{t("keepGoingGentle")}</div>
          </div>
        </div>
      </div>
      {hasWeightHistory ? null : (
        <EmptyState icon={Camera} title={t("progress")} message={t("emptyWeights")} />
      )}
    </div>
  );
}