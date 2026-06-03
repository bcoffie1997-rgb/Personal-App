import { Sparkline } from "@/components/charts/Sparkline";
import { cn } from "@/lib/utils";

type Props = {
  name: string;
  value: string;
  delta: number;
  deltaLabel: string;
  series: number[];
};

export function BiometricCard({ name, value, delta, deltaLabel, series }: Props) {
  const isPositive = delta >= 0;
  const isFlat = Math.abs(delta) < 0.05;
  return (
    <div className="bg-surface rounded-card p-4">
      <div className="text-xs text-tertiary tracking-wide">{name}</div>
      <div className="tabular-nums mt-1.5 text-lg text-primary font-medium">{value}</div>
      <div className={cn(
        "mt-0.5 text-xs tabular-nums",
        isFlat ? "text-tertiary" : isPositive ? "text-accent" : "text-fitness"
      )}>
        {isFlat ? "—" : isPositive ? "+" : ""}{Math.abs(delta).toFixed(1)} {deltaLabel}
      </div>
      <div className="mt-3 -mx-1 opacity-70">
        <Sparkline data={series} color="rgb(var(--fitness))" height={24} />
      </div>
    </div>
  );
}
