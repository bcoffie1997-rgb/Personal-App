import { ArcGauge } from "@/components/charts/ArcGauge";
import { READINESS } from "@/lib/mock-data";

function ringColor(score: number) {
  if (score >= 75) return "rgb(var(--accent))";
  if (score >= 50) return "rgb(var(--warning))";
  return "rgb(var(--fitness))";
}

export function ReadinessRing() {
  return (
    <div className="flex flex-col items-center py-2">
      <ArcGauge
        value={READINESS.score}
        size={200}
        strokeWidth={10}
        color={ringColor(READINESS.score)}
        trackColor="rgb(var(--bg-elevated))"
        label={
          <span className="tabular-nums text-[56px] leading-none font-semibold text-primary tracking-tight">
            {READINESS.score}
          </span>
        }
        sublabel={<span className="text-xs text-tertiary mt-1.5">{READINESS.interpretation}</span>}
      />
      <div className="mt-5 w-full grid grid-cols-4 gap-2 text-center">
        <SubMetric label="Sleep" value={READINESS.sleep} />
        <SubMetric label="HRV" value={`${READINESS.hrv}ms`} />
        <SubMetric label="Strain" value={READINESS.strain.toFixed(1)} />
        <SubMetric label="Recovery" value={`${READINESS.recovery}%`} />
      </div>
    </div>
  );
}

function SubMetric({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-[10px] tracking-wide text-tertiary">{label}</div>
      <div className="tabular-nums mt-1 text-sm text-primary font-medium">{value}</div>
    </div>
  );
}
