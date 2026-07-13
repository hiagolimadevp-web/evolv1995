import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Check, Ruler } from "lucide-react";
import { useAppStore } from "@/lib/store";
import { useT } from "@/lib/i18n";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/onboarding/units")({
  component: UnitsStep,
});

function UnitsStep() {
  const t = useT();
  const nav = useNavigate();
  const units = useAppStore((s) => s.settings.units);
  const setSettings = useAppStore((s) => s.setSettings);

  const options = [
    { value: "metric" as const, label: t("metric"), hint: "kg · cm · ml" },
    { value: "imperial" as const, label: t("imperial"), hint: "lb · ft · oz" },
  ];

  return (
    <div className="flex flex-1 flex-col animate-fade-in">
      <div className="grid h-12 w-12 place-items-center rounded-2xl bg-primary/15 text-primary">
        <Ruler className="h-5 w-5" />
      </div>
      <h1 className="mt-4 font-display text-3xl font-semibold tracking-tight">{t("measurementSystem")}</h1>
      <p className="mt-2 text-sm text-muted-foreground">{t("measurementSystemSub")}</p>

      <div className="mt-8 flex flex-col gap-2">
        {options.map((o) => {
          const active = units === o.value;
          return (
            <button
              key={o.value}
              onClick={() => setSettings({ units: o.value })}
              className={`card-surface flex items-center gap-4 p-4 text-left transition-all ${active ? "ring-2 ring-primary" : "hover:brightness-110"}`}
            >
              <span className="min-w-0 flex-1">
                <span className="block text-sm font-medium">{o.label}</span>
                <span className="mt-0.5 block text-xs text-muted-foreground">{o.hint}</span>
              </span>
              {active ? <Check className="h-5 w-5 text-primary" /> : null}
            </button>
          );
        })}
      </div>

      <div className="mt-auto flex gap-2 pt-8">
        <Button variant="ghost" className="h-12 flex-1 rounded-2xl" onClick={() => nav({ to: "/onboarding/country" })}>
          {t("back")}
        </Button>
        <Button className="h-12 flex-[2] rounded-2xl text-base" onClick={() => nav({ to: "/onboarding/profile" })}>
          {t("continue")}
        </Button>
      </div>
    </div>
  );
}