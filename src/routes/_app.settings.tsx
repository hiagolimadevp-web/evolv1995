import { createFileRoute } from "@tanstack/react-router";
import { useAppStore } from "@/lib/store";
import { useT } from "@/lib/i18n";
import { LANGUAGES, COUNTRIES, type LanguageCode } from "@/lib/countries";
import { Moon, Sun, Bell, Globe2, MapPin, Ruler, Coins, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";

export const Route = createFileRoute("/_app/settings")({
  head: () => ({ meta: [{ title: "Settings — EVOLV" }] }),
  component: Settings,
});

function Settings() {
  const t = useT();
  const settings = useAppStore((s) => s.settings);
  const setSettings = useAppStore((s) => s.setSettings);
  const reset = useAppStore((s) => s.resetOnboarding);

  return (
    <div className="flex flex-col gap-6 px-5 pt-12">
      <header>
        <div className="text-xs font-medium text-muted-foreground">EVOLV</div>
        <h1 className="mt-1 font-display text-3xl font-semibold tracking-tight">{t("settings")}</h1>
      </header>

      <Section>
        <Row icon={<Globe2 className="h-4 w-4" />} label={t("language")}>
          <select
            value={settings.language}
            onChange={(e) => setSettings({ language: e.target.value as LanguageCode })}
            className="rounded-lg bg-surface-elevated px-3 py-1.5 text-sm outline-none"
          >
            {LANGUAGES.map((l) => (
              <option key={l.code} value={l.code}>{l.flag} {l.native}</option>
            ))}
          </select>
        </Row>
        <Row icon={<MapPin className="h-4 w-4" />} label={t("country")}>
          <select
            value={settings.country}
            onChange={(e) => {
              const c = COUNTRIES.find((x) => x.code === e.target.value)!;
              setSettings({ country: c.code, currency: c.currency, units: c.units });
            }}
            className="rounded-lg bg-surface-elevated px-3 py-1.5 text-sm outline-none"
          >
            {COUNTRIES.map((c) => (
              <option key={c.code} value={c.code}>{c.flag} {c.name}</option>
            ))}
          </select>
        </Row>
        <Row icon={<Ruler className="h-4 w-4" />} label={t("units")}>
          <select
            value={settings.units}
            onChange={(e) => setSettings({ units: e.target.value as "metric" | "imperial" })}
            className="rounded-lg bg-surface-elevated px-3 py-1.5 text-sm outline-none"
          >
            <option value="metric">{t("metric")}</option>
            <option value="imperial">{t("imperial")}</option>
          </select>
        </Row>
        <Row icon={<Coins className="h-4 w-4" />} label={t("currency")}>
          <span className="text-sm font-semibold">{settings.currency}</span>
        </Row>
      </Section>

      <Section>
        <Row icon={settings.theme === "dark" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />} label={t("theme")}>
          <div className="flex rounded-full bg-surface-elevated p-1">
            <button
              onClick={() => setSettings({ theme: "dark" })}
              className={`rounded-full px-3 py-1 text-xs ${settings.theme === "dark" ? "bg-primary text-primary-foreground" : "text-muted-foreground"}`}
            >{t("dark")}</button>
            <button
              onClick={() => setSettings({ theme: "light" })}
              className={`rounded-full px-3 py-1 text-xs ${settings.theme === "light" ? "bg-primary text-primary-foreground" : "text-muted-foreground"}`}
            >{t("lightMode")}</button>
          </div>
        </Row>
        <Row icon={<Bell className="h-4 w-4" />} label={t("notifications")}>
          <Switch checked={settings.notifications} onCheckedChange={(v) => setSettings({ notifications: v })} />
        </Row>
      </Section>

      <Button
        variant="ghost"
        className="h-11 gap-2 rounded-2xl text-muted-foreground"
        onClick={() => { reset(); window.location.href = "/"; }}
      >
        <RotateCcw className="h-4 w-4" /> {t("resetOnboarding")}
      </Button>

      <p className="pt-4 text-center text-[11px] text-muted-foreground">EVOLV · {t("tagline")}</p>
    </div>
  );
}

function Section({ children }: { children: React.ReactNode }) {
  return <div className="card-surface flex flex-col divide-y divide-border/50 p-1">{children}</div>;
}

function Row({ icon, label, children }: { icon: React.ReactNode; label: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 px-3 py-3">
      <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary">{icon}</span>
      <span className="min-w-0 flex-1 truncate text-sm font-medium">{label}</span>
      <div className="shrink-0">{children}</div>
    </div>
  );
}