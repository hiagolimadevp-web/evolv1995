import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { useAppStore } from "@/lib/store";
import { useT } from "@/lib/i18n";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/onboarding/welcome")({
  component: WelcomeStep,
});

function WelcomeStep() {
  const t = useT();
  const nav = useNavigate();
  const complete = useAppStore((s) => s.completeOnboarding);

  // Mark onboarding as complete when they reach welcome — the app is ready.
  useEffect(() => {
    complete();
  }, [complete]);

  return (
    <div className="flex min-h-screen flex-col bg-background px-6 pt-16 pb-8 animate-fade-in">
      <div className="mx-auto flex w-full max-w-md flex-1 flex-col">
        <div className="relative mx-auto grid h-28 w-28 place-items-center">
          <div className="absolute inset-0 rounded-full bg-primary/20 blur-2xl" />
          <div className="relative grid h-24 w-24 place-items-center rounded-full bg-primary/15 text-5xl">
            🌱
          </div>
        </div>

        <h1 className="mt-10 text-center font-display text-4xl font-semibold tracking-tight">
          {t("welcomeTitle")}
        </h1>
        <p className="mx-auto mt-5 max-w-sm text-center text-[15px] leading-relaxed text-muted-foreground">
          {t("welcomeBody")}
        </p>

        <p className="mx-auto mt-8 max-w-xs text-center font-display text-base italic text-primary">
          {t("tagline")}
        </p>

        <div className="mt-auto pt-10">
          <Button
            className="h-14 w-full rounded-2xl text-base font-medium shadow-elevated"
            onClick={() => nav({ to: "/home" })}
          >
            {t("startJourney")} →
          </Button>
        </div>
      </div>
    </div>
  );
}