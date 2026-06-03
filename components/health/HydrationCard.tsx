import { HYDRATION } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

export function HydrationCard() {
  const pct = (HYDRATION.current / HYDRATION.goal) * 100;
  return (
    <div className="bg-surface rounded-card p-5">
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs text-tertiary tracking-wide">Hydration</span>
        <span className="text-xs text-tertiary tabular-nums">
          {HYDRATION.current} / {HYDRATION.goal} {HYDRATION.unit}
        </span>
      </div>
      <div className="tabular-nums text-2xl font-semibold text-primary">
        {Math.round(pct)}<span className="text-base text-tertiary font-normal">%</span>
      </div>
      <div className="mt-3 flex items-center gap-1">
        {Array.from({ length: HYDRATION.glassesGoal }).map((_, i) => (
          <span
            key={i}
            className={cn(
              "flex-1 h-6 rounded-sm",
              i < HYDRATION.glasses ? "bg-info" : "bg-elevated"
            )}
          />
        ))}
      </div>
      <div className="mt-2 text-xs text-tertiary tabular-nums">
        {HYDRATION.glasses} of {HYDRATION.glassesGoal} glasses
      </div>
    </div>
  );
}
