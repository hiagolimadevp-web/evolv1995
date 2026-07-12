import { createFileRoute, Outlet, useRouterState } from "@tanstack/react-router";

export const Route = createFileRoute("/onboarding")({
  component: OnboardingLayout,
});

const STEPS = [
  "/onboarding/language",
  "/onboarding/country",
  "/onboarding/profile",
  "/onboarding/goal",
];

function OnboardingLayout() {
  const path = useRouterState({ select: (s) => s.location.pathname });
  const idx = Math.max(0, STEPS.indexOf(path));
  const pct = ((idx + 1) / STEPS.length) * 100;
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="mx-auto flex min-h-screen w-full max-w-md flex-col px-6 pt-12 pb-8">
        <div className="mb-8 flex items-center gap-3">
          <div className="font-display text-lg font-semibold tracking-tight">EVOLV</div>
          <div className="ml-auto text-xs text-muted-foreground">{idx + 1} / {STEPS.length}</div>
        </div>
        <div className="mb-10 h-1 w-full overflow-hidden rounded-full bg-secondary">
          <div className="h-full rounded-full bg-primary transition-all duration-500" style={{ width: `${pct}%` }} />
        </div>
        <Outlet />
      </div>
    </div>
  );
}