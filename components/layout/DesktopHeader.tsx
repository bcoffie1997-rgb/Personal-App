import { READINESS } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

function readinessColor(score: number) {
  if (score >= 75) return "bg-accent";
  if (score >= 50) return "bg-warning";
  return "bg-fitness";
}

type Props = {
  title: string;
  subtitle?: string;
  right?: React.ReactNode;
};

export function DesktopHeader({ title, subtitle, right }: Props) {
  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  return (
    <header className="hidden md:flex items-end justify-between mb-8 pt-2">
      <div>
        <div className="text-xs text-tertiary mb-2 tracking-wide">{today}</div>
        <h1 className="text-2xl font-semibold text-primary tracking-tight">{title}</h1>
        {subtitle && <p className="mt-1.5 text-sm text-secondary">{subtitle}</p>}
      </div>
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-button text-xs">
          <span className={cn("w-1.5 h-1.5 rounded-full", readinessColor(READINESS.score))} />
          <span className="text-tertiary">Readiness</span>
          <span className="tabular-nums font-medium text-primary">{READINESS.score}</span>
        </div>
        {right}
      </div>
    </header>
  );
}
