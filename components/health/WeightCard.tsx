import { Sparkline } from "@/components/charts/Sparkline";
import { Delta } from "@/components/shared/Delta";
import { WEIGHT } from "@/lib/mock-data";

export function WeightCard() {
  const toGoal = WEIGHT.current - WEIGHT.goal;
  return (
    <div className="bg-surface rounded-card p-5">
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs text-tertiary tracking-wide">Weight</span>
        <span className="text-xs text-tertiary tabular-nums">
          Goal {WEIGHT.goal} {WEIGHT.unit}
        </span>
      </div>
      <div className="flex items-end justify-between gap-4">
        <div>
          <div className="tabular-nums text-3xl font-semibold text-primary">
            {WEIGHT.current} <span className="text-base text-tertiary font-normal">{WEIGHT.unit}</span>
          </div>
          <div className="mt-1.5 flex items-center gap-2 text-xs">
            <Delta value={WEIGHT.delta30d} prefix="" />
            <span className="text-tertiary">· 30 days</span>
          </div>
          <div className="mt-1 text-xs text-tertiary tabular-nums">
            {toGoal > 0 ? `${toGoal.toFixed(1)} ${WEIGHT.unit} to goal` : `Goal reached`}
          </div>
        </div>
        <div className="flex-1 max-w-[180px] opacity-70">
          <Sparkline data={WEIGHT.series30d} color="rgb(var(--fitness))" height={36} />
        </div>
      </div>
      <div className="mt-4 pt-3 border-t border-border flex items-center justify-between">
        <span className="text-xs text-tertiary">Body fat</span>
        <div className="flex items-center gap-3 text-xs">
          <span className="tabular-nums text-secondary font-medium">{WEIGHT.bodyFatPct}%</span>
          <Delta value={WEIGHT.bodyFatDelta30d} prefix="" />
        </div>
      </div>
    </div>
  );
}
