import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { useAppStore, type Activity, type Gender } from "@/lib/store";
import { useT } from "@/lib/i18n";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const Route = createFileRoute("/onboarding/profile")({
  component: ProfileStep,
});

const GENDERS: { value: Gender; key: string }[] = [
  { value: "female", key: "female" },
  { value: "male", key: "male" },
  { value: "other", key: "other" },
];
const ACTIVITIES: { value: Activity; key: string }[] = [
  { value: "sedentary", key: "sedentary" },
  { value: "light", key: "light" },
  { value: "moderate", key: "moderate" },
  { value: "active", key: "active" },
  { value: "athlete", key: "athlete" },
];

function ProfileStep() {
  const t = useT();
  const nav = useNavigate();
  const profile = useAppStore((s) => s.profile);
  const setProfile = useAppStore((s) => s.setProfile);

  const [name, setName] = useState(profile?.name ?? "");
  const [birthDate, setBirthDate] = useState(profile?.birthDate ?? "1995-01-01");
  const [gender, setGender] = useState<Gender>(profile?.gender ?? "other");
  const [heightCm, setHeightCm] = useState(profile?.heightCm ?? 170);
  const [weightKg, setWeightKg] = useState(profile?.weightKg ?? 70);
  const [goalWeightKg, setGoalWeightKg] = useState(profile?.goalWeightKg ?? 68);
  const [activity, setActivity] = useState<Activity>(profile?.activity ?? "moderate");

  const canContinue = name.trim().length >= 1 && heightCm > 0 && weightKg > 0;

  const submit = () => {
    setProfile({ name: name.trim(), birthDate, gender, heightCm, weightKg, goalWeightKg, activity });
    nav({ to: "/onboarding/goal" });
  };

  return (
    <div className="flex flex-1 flex-col">
      <h1 className="font-display text-3xl font-semibold tracking-tight">{t("aboutYou")}</h1>
      <p className="mt-2 text-sm text-muted-foreground">{t("aboutYouSub")}</p>

      <div className="mt-6 flex flex-col gap-4">
        <Field label={t("name")}>
          <Input value={name} onChange={(e) => setName(e.target.value)} maxLength={40} className="h-12 rounded-xl border-0 bg-surface" />
        </Field>
        <Field label={t("birthDate")}>
          <Input type="date" value={birthDate} onChange={(e) => setBirthDate(e.target.value)} className="h-12 rounded-xl border-0 bg-surface" />
        </Field>
        <Field label={t("gender")}>
          <div className="grid grid-cols-3 gap-2">
            {GENDERS.map((g) => (
              <button
                key={g.value}
                onClick={() => setGender(g.value)}
                className={`h-11 rounded-xl text-sm transition-colors ${gender === g.value ? "bg-primary text-primary-foreground" : "bg-surface text-foreground hover:brightness-110"}`}
              >
                {t(g.key)}
              </button>
            ))}
          </div>
        </Field>
        <div className="grid grid-cols-3 gap-3">
          <Field label={`${t("height")} (cm)`}>
            <Input type="number" value={heightCm} onChange={(e) => setHeightCm(Number(e.target.value))} className="h-12 rounded-xl border-0 bg-surface" />
          </Field>
          <Field label={`${t("currentWeight")} (kg)`}>
            <Input type="number" value={weightKg} onChange={(e) => setWeightKg(Number(e.target.value))} className="h-12 rounded-xl border-0 bg-surface" />
          </Field>
          <Field label={`${t("goalWeight")} (kg)`}>
            <Input type="number" value={goalWeightKg} onChange={(e) => setGoalWeightKg(Number(e.target.value))} className="h-12 rounded-xl border-0 bg-surface" />
          </Field>
        </div>
        <Field label={t("activityLevel")}>
          <div className="grid grid-cols-5 gap-1.5">
            {ACTIVITIES.map((a) => (
              <button
                key={a.value}
                onClick={() => setActivity(a.value)}
                className={`h-11 rounded-xl px-1 text-[11px] leading-tight transition-colors ${activity === a.value ? "bg-primary text-primary-foreground" : "bg-surface text-foreground hover:brightness-110"}`}
              >
                {t(a.key)}
              </button>
            ))}
          </div>
        </Field>
      </div>

      <div className="mt-auto flex gap-2 pt-8">
        <Button variant="ghost" className="h-12 flex-1 rounded-2xl" onClick={() => nav({ to: "/onboarding/units" })}>
          {t("back")}
        </Button>
        <Button disabled={!canContinue} className="h-12 flex-[2] rounded-2xl text-base" onClick={submit}>
          {t("continue")}
        </Button>
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5">
      <Label className="text-xs font-medium text-muted-foreground">{label}</Label>
      {children}
    </div>
  );
}