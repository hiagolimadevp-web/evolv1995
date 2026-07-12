import { createFileRoute } from "@tanstack/react-router";
import { Check } from "lucide-react";
import { useAppStore } from "@/lib/store";
import { useT } from "@/lib/i18n";

export const Route = createFileRoute("/_app/today")({
  head: () => ({ meta: [{ title: "Today — EVOLV" }] }),
  component: Today,
});

const ITEMS = [
  { key: "water", label: "drinkWater", emoji: "💧" },
  { key: "breakfast", label: "breakfast", emoji: "🥣" },
  { key: "lunch", label: "lunch", emoji: "🥗" },
  { key: "dinner", label: "dinner", emoji: "🍲" },
  { key: "workout", label: "workout", emoji: "🏋️" },
  { key: "walk", label: "walk", emoji: "🚶" },
  { key: "sleep", label: "sleep", emoji: "😴" },
  { key: "goals", label: "completeGoals", emoji: "🎯" },
];

function Today() {
  const t = useT();
  const checklist = useAppStore((s) => s.daily.checklist);
  const toggle = useAppStore((s) => s.toggleCheck);
  const done = ITEMS.filter((i) => checklist[i.key]).length;
  return (
    <div className="flex flex-col gap-6 px-5 pt-12">
      <header>
        <div className="text-xs font-medium text-muted-foreground">{t("today")}</div>
        <h1 className="mt-1 font-display text-3xl font-semibold tracking-tight">{t("todaysFocus")}</h1>
        <p className="mt-1 text-sm text-muted-foreground">{done} / {ITEMS.length} · {t("todayEncourage")}</p>
      </header>
      <div className="flex flex-col gap-2">
        {ITEMS.map((i) => {
          const active = !!checklist[i.key];
          return (
            <button
              key={i.key}
              onClick={() => toggle(i.key)}
              className={`card-surface flex items-center gap-4 p-4 text-left transition-all ${active ? "ring-1 ring-primary/40" : ""}`}
            >
              <span className="text-2xl">{i.emoji}</span>
              <span className={`min-w-0 flex-1 text-sm font-medium transition-all ${active ? "text-muted-foreground line-through" : ""}`}>
                {t(i.label)}
              </span>
              <span
                className={`grid h-8 w-8 shrink-0 place-items-center rounded-full transition-all ${active ? "bg-primary text-primary-foreground scale-100" : "bg-secondary text-transparent scale-95"}`}
              >
                <Check className="h-4 w-4" />
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}