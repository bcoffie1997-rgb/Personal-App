import { STEPS_TODAY } from "@/lib/mock-data";

export function StepsCard() {
  const pct = Math.min(100, (STEPS_TODAY.steps / STEPS_TODAY.goal) * 100);
  return (
    <div className="bg-surface rounded-card p-5">
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs text-tertiary tracking-wide">Activity today</span>
        <span className="text-xs text-tertiary tabular-nums">
          {STEPS_TODAY.goal.toLocaleString()} goal
        </span>
      </div>
      <div className="tabular-nums text-2xl font-semibold text-primary">
        {STEPS_TODAY.steps.toLocaleString()} <span className="text-base text-tertiary font-normal">steps</span>
      </div>
      <div className="mt-3 h-1 rounded-full bg-elevated overflow-hidden">
        <div className="h-full bg-fitness rounded-full" style={{ width: `${pct}%` }} />
      </div>
      <div className="mt-4 grid grid-cols-3 gap-2 text-center">
        <Stat label="Active min" value={STEPS_TODAY.activeMinutes.toString()} />
        <Stat label="Active cal" value={STEPS_TODAY.activeCalories.toString()} />
        <Stat label="Distance" value={`${STEPS_TODAY.distance} mi`} />
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-[10px] tracking-wide text-tertiary">{label}</div>
      <div className="tabular-nums mt-1 text-sm text-secondary font-medium">{value}</div>
    </div>
  );
}
