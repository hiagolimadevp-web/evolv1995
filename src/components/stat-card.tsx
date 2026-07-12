import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

type Props = {
  icon: LucideIcon;
  label: string;
  value: string;
  sub?: string;
  progress?: number; // 0..1
  tint?: string; // css color
  className?: string;
};

export function StatCard({ icon: Icon, label, value, sub, progress, tint = "var(--color-primary)", className }: Props) {
  return (
    <div className={cn("card-surface p-4 flex flex-col gap-3", className)}>
      <div className="flex items-center justify-between">
        <span
          className="grid h-9 w-9 shrink-0 place-items-center rounded-xl"
          style={{ backgroundColor: `color-mix(in oklab, ${tint} 18%, transparent)`, color: tint }}
        >
          <Icon className="h-4.5 w-4.5" strokeWidth={2.25} />
        </span>
        <span className="text-xs font-medium text-muted-foreground">{label}</span>
      </div>
      <div className="min-w-0">
        <div className="font-display text-2xl font-semibold tracking-tight">{value}</div>
        {sub ? <div className="text-xs text-muted-foreground mt-0.5">{sub}</div> : null}
      </div>
      {typeof progress === "number" ? (
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-secondary">
          <div
            className="h-full rounded-full transition-all duration-700"
            style={{ width: `${Math.round(Math.max(0, Math.min(1, progress)) * 100)}%`, backgroundColor: tint }}
          />
        </div>
      ) : null}
    </div>
  );
}