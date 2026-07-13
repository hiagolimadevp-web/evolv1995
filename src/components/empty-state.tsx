import type { LucideIcon } from "lucide-react";

type Props = {
  icon?: LucideIcon;
  emoji?: string;
  title: string;
  message: string;
};

export function EmptyState({ icon: Icon, emoji, title, message }: Props) {
  return (
    <div className="card-surface flex flex-col items-center gap-3 p-8 text-center animate-fade-in">
      <div className="grid h-14 w-14 place-items-center rounded-2xl bg-primary/10 text-primary">
        {Icon ? <Icon className="h-6 w-6" /> : <span className="text-2xl">{emoji ?? "🌱"}</span>}
      </div>
      <div className="font-display text-lg font-semibold tracking-tight">{title}</div>
      <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">{message}</p>
    </div>
  );
}