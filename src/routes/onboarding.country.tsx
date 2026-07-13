import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Check } from "lucide-react";
import { COUNTRIES } from "@/lib/countries";
import { useAppStore } from "@/lib/store";
import { useT } from "@/lib/i18n";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/onboarding/country")({
  component: CountryStep,
});

function CountryStep() {
  const t = useT();
  const nav = useNavigate();
  const country = useAppStore((s) => s.settings.country);
  const setSettings = useAppStore((s) => s.setSettings);
  const pick = (code: string) => {
    const c = COUNTRIES.find((x) => x.code === code)!;
    setSettings({ country: c.code, currency: c.currency, units: c.units });
  };
  return (
    <div className="flex flex-1 flex-col">
      <h1 className="font-display text-3xl font-semibold tracking-tight">{t("chooseCountry")}</h1>
      <p className="mt-2 text-sm text-muted-foreground">{t("chooseCountrySub")}</p>
      <div className="mt-8 grid grid-cols-2 gap-2">
        {COUNTRIES.map((c) => {
          const active = c.code === country;
          return (
            <button
              key={c.code}
              onClick={() => pick(c.code)}
              className={`card-surface flex flex-col items-start gap-2 p-4 text-left transition-all ${active ? "ring-2 ring-primary" : "hover:brightness-110"}`}
            >
              <div className="flex w-full items-center justify-between">
                <span className="text-2xl">{c.flag}</span>
                {active ? <Check className="h-4 w-4 text-primary" /> : null}
              </div>
              <span className="min-w-0">
                <span className="block truncate text-sm font-medium">{c.name}</span>
                <span className="block text-xs text-muted-foreground">{c.currencySymbol} · {c.units === "metric" ? "kg / cm" : "lb / ft"}</span>
              </span>
            </button>
          );
        })}
      </div>
      <div className="mt-auto flex gap-2 pt-8">
        <Button variant="ghost" className="h-12 flex-1 rounded-2xl" onClick={() => nav({ to: "/onboarding/language" })}>
          {t("back")}
        </Button>
        <Button className="h-12 flex-[2] rounded-2xl text-base" onClick={() => nav({ to: "/onboarding/units" })}>
          {t("continue")}
        </Button>
      </div>
    </div>
  );
}