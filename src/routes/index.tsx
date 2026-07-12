import { createFileRoute, Navigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useAppStore } from "@/lib/store";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  // Persisted state hydrates client-side; render nothing until then
  const [ready, setReady] = useState(false);
  useEffect(() => setReady(true), []);
  const done = useAppStore((s) => s.onboardingComplete);
  if (!ready) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="font-display text-3xl font-semibold tracking-tight text-foreground/80">EVOLV</div>
      </div>
    );
  }
  return <Navigate to={done ? "/home" : "/onboarding/language"} />;
}
