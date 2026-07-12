import { createFileRoute, Link, Outlet, useRouterState, Navigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Home, CheckCircle2, Droplets, LineChart, Settings as SettingsIcon } from "lucide-react";
import { useAppStore } from "@/lib/store";
import { useT } from "@/lib/i18n";

export const Route = createFileRoute("/_app")({
  component: AppLayout,
});

function AppLayout() {
  const [ready, setReady] = useState(false);
  useEffect(() => setReady(true), []);
  const done = useAppStore((s) => s.onboardingComplete);
  const ensureToday = useAppStore((s) => s.ensureToday);
  useEffect(() => { if (ready) ensureToday(); }, [ready, ensureToday]);

  if (!ready) {
    return <div className="flex min-h-screen items-center justify-center bg-background"><div className="font-display text-2xl">EVOLV</div></div>;
  }
  if (!done) return <Navigate to="/onboarding/language" />;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="mx-auto w-full max-w-md pb-28">
        <Outlet />
      </div>
      <TabBar />
    </div>
  );
}

function TabBar() {
  const t = useT();
  const path = useRouterState({ select: (s) => s.location.pathname });
  const tabs = [
    { to: "/home", label: t("home"), icon: Home },
    { to: "/today", label: t("today"), icon: CheckCircle2 },
    { to: "/water", label: t("water"), icon: Droplets },
    { to: "/progress", label: t("progress"), icon: LineChart },
    { to: "/settings", label: t("settings"), icon: SettingsIcon },
  ] as const;
  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 flex justify-center px-3 pb-4">
      <div className="mx-auto flex w-full max-w-md items-center justify-around rounded-3xl bg-surface-elevated/90 px-2 py-2 shadow-elevated backdrop-blur-xl">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const active = path === tab.to;
          return (
            <Link
              key={tab.to}
              to={tab.to}
              className={`flex min-w-0 flex-1 flex-col items-center gap-1 rounded-2xl px-2 py-2 text-[10px] font-medium transition-all ${active ? "text-primary" : "text-muted-foreground hover:text-foreground"}`}
            >
              <Icon className={`h-5 w-5 transition-transform ${active ? "scale-110" : ""}`} strokeWidth={active ? 2.5 : 2} />
              <span className="truncate">{tab.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}