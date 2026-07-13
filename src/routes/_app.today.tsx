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
  const message = done === 0
    ? t("todayEncourage")
    : done < ITEMS.length
    ? t("progressToday")
    : t("greatJob");
  return (
    <div className="flex flex-col gap-6 px-5 pt-12 animate-fade-in">
      <header>
        <div className="text-xs font-medium text-muted-foreground">{t("today")}</div>
        <h1 className="mt-1 font-display text-3xl font-semibold tracking-tight">{t("todaysFocus")}</h1>
        <p className="mt-1 text-sm text-muted-foreground">{done} / {ITEMS.length} · {message}</p>
        <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-secondary">
          <div
            className="h-full rounded-full bg-primary transition-all duration-700"
            style={{ width: `${(done / ITEMS.length) * 100}%` }}
          />
        </div>
      </header>
      <div className="flex flex-col gap-2">
        {ITEMS.map((i) => {
          const active = !!checklist[i.key];
          return (
            <button
              key={i.key}
              onClick={() => toggle(i.key)}
              className={`card-surface flex items-center gap-4 p-4 text-left transition-all active:scale-[0.99] ${active ? "ring-1 ring-primary/40" : "hover:brightness-110"}`}
            >
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-surface-elevated text-xl">{i.emoji}</span>
              <span className={`min-w-0 flex-1 text-sm font-medium transition-all ${active ? "text-muted-foreground line-through" : ""}`}>
                {t(i.label)}
              </span>
              <span
                className={`grid h-9 w-9 shrink-0 place-items-center rounded-full transition-all duration-300 ${active ? "bg-primary text-primary-foreground scale-100" : "bg-secondary text-transparent scale-90"}`}
              >
                <Check className="h-4 w-4" strokeWidth={3} />
              </span>
            </button>
          );
        })}
      </div>
      {done > 0 ? (
        <p className="rounded-2xl bg-primary/10 p-4 text-center text-xs leading-relaxed text-primary animate-fade-in">
          {done === ITEMS.length ? t("greatJob") + " " + t("keepGoingGentle") : t("keepGoingGentle")}
        </p>
      ) : null}
    </div>
  );
}