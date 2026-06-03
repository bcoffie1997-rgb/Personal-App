import { ArcGauge } from "@/components/charts/ArcGauge";

const ranges = [
  { min: 300, max: 580, label: "Poor", color: "rgb(var(--fitness))" },
  { min: 580, max: 670, label: "Fair", color: "rgb(var(--warning))" },
  { min: 670, max: 740, label: "Good", color: "rgb(var(--info))" },
  { min: 740, max: 850, label: "Excellent", color: "rgb(var(--accent))" },
];

function getRange(score: number) {
  return ranges.find((r) => score >= r.min && score < r.max) ?? ranges[ranges.length - 1];
}

export function CreditScoreRing({ score, size = 130 }: { score: number; size?: number }) {
  const range = getRange(score);
  return (
    <ArcGauge
      value={score}
      min={300}
      max={850}
      size={size}
      strokeWidth={10}
      color={range.color}
      trackColor="rgb(var(--bg-elevated))"
      label={
        <span className="tabular-nums text-[36px] leading-none font-semibold text-primary tracking-tight">
          {score}
        </span>
      }
      sublabel={<span className="text-[10px] text-tertiary mt-1.5">/ 850</span>}
    />
  );
}
