import { ArcGauge } from "@/components/charts/ArcGauge";
import { MonoNumber } from "@/components/shared/MonoNumber";

const ranges = [
  { min: 300, max: 580, label: "Poor", color: "rgb(var(--negative))" },
  { min: 580, max: 670, label: "Fair", color: "rgb(var(--warning))" },
  { min: 670, max: 740, label: "Good", color: "rgb(var(--info))" },
  { min: 740, max: 850, label: "Excellent", color: "rgb(var(--accent))" },
];

function getRange(score: number) {
  return ranges.find((r) => score >= r.min && score < r.max) ?? ranges[ranges.length - 1];
}

export function CreditScoreRing({ score, size = 140 }: { score: number; size?: number }) {
  const range = getRange(score);
  return (
    <ArcGauge
      value={score}
      min={300}
      max={850}
      size={size}
      strokeWidth={12}
      color={range.color}
      label={
        <MonoNumber className="text-[40px] leading-none font-bold text-primary">
          {score}
        </MonoNumber>
      }
      sublabel={<span className="text-[10px] text-tertiary uppercase tracking-wider">/ 850</span>}
    />
  );
}
