import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Check } from "lucide-react";
import { LANGUAGES, type LanguageCode } from "@/lib/countries";
import { useAppStore } from "@/lib/store";
import { useT } from "@/lib/i18n";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/onboarding/language")({
  component: LanguageStep,
});

function LanguageStep() {
  const t = useT();
  const nav = useNavigate();
  const lang = useAppStore((s) => s.settings.language);
  const setSettings = useAppStore((s) => s.setSettings);
  return (
    <div className="flex flex-1 flex-col">
      <h1 className="font-display text-3xl font-semibold tracking-tight">{t("chooseLanguage")}</h1>
      <p className="mt-2 text-sm text-muted-foreground">{t("chooseLanguageSub")}</p>
      <div className="mt-8 flex flex-col gap-2">
        {LANGUAGES.map((l) => {
          const active = l.code === lang;
          return (
            <button
              key={l.code}
              onClick={() => setSettings({ language: l.code as LanguageCode })}
              className={`card-surface flex items-center gap-3 p-4 text-left transition-all ${active ? "ring-2 ring-primary" : "hover:brightness-110"}`}
            >
              <span className="text-2xl">{l.flag}</span>
              <span className="min-w-0 flex-1">
                <span className="block text-sm font-medium">{l.native}</span>
                <span className="block text-xs text-muted-foreground">{l.name}</span>
              </span>
              {active ? <Check className="h-5 w-5 text-primary" /> : null}
            </button>
          );
        })}
      </div>
      <div className="mt-auto pt-8">
        <Button className="h-12 w-full rounded-2xl text-base" onClick={() => nav({ to: "/onboarding/country" })}>
          {t("continue")}
        </Button>
      </div>
    </div>
  );
}