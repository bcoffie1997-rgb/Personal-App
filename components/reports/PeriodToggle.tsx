"use client";

import { cn } from "@/lib/utils";

type Period = "week" | "month";

type Props = {
  active: Period;
  onChange: (period: Period) => void;
};

export function PeriodToggle({ active, onChange }: Props) {
  return (
    <div className="inline-flex items-center bg-surface rounded-button p-0.5">
      {(["week", "month"] as const).map((p) => (
        <button
          key={p}
          type="button"
          onClick={() => onChange(p)}
          className={cn(
            "px-4 py-1.5 rounded text-sm font-medium transition-colors capitalize",
            active === p ? "bg-bg text-primary shadow-sm" : "text-tertiary hover:text-secondary"
          )}
        >
          This {p}
        </button>
      ))}
    </div>
  );
}
