import { Sparkline } from "@/components/charts/Sparkline";
import { cn } from "@/lib/utils";

type Props = {
  name: string;
  value: number;
  prefix?: string;
  suffix?: string;
  delta: number;
  deltaPct: number;
  series: readonly number[];
  flat?: boolean;
  inverted?: boolean;
};

function formatValue(v: number, prefix?: string, suffix?: string) {
  if (v >= 1_000_000) return `${prefix ?? ""}${(v / 1_000_000).toFixed(1)}M${suffix ?? ""}`;
  if (v >= 10_000) return `${prefix ?? ""}${(v / 1000).toFixed(0)}k${suffix ?? ""}`;
  if (v >= 1000) return `${prefix ?? ""}${v.toLocaleString()}${suffix ?? ""}`;
  return `${prefix ?? ""}${v.toLocaleString()}${suffix ?? ""}`;
}

export function KpiTile({ name, value, prefix, suffix, delta, deltaPct, series, flat, inverted }: Props) {
  // For inverted metrics (like churn), down is good
  const effectivePositive = inverted ? delta < 0 : delta > 0;
  const indicator = flat ? "—" : delta > 0 ? "▲" : "▼";
  const color = flat
    ? "text-tertiary"
    : effectivePositive
    ? "text-accent"
    : "text-fitness";

  return (
    <div className="bg-surface rounded-card p-4">
      <div className="text-xs text-tertiary tracking-wide">{name}</div>
      <div className="tabular-nums mt-1.5 text-xl text-primary font-semibold">
        {formatValue(value, prefix, suffix)}
      </div>
      <div className={cn("tabular-nums mt-0.5 text-xs flex items-center gap-1", color)}>
        <span className="text-[9px]">{indicator}</span>
        {!flat ? (
          <span>
            {delta > 0 ? "+" : ""}
            {prefix ?? ""}
            {Math.abs(delta).toLocaleString()}
            {suffix ?? ""}
            {" "}<span className="text-tertiary">({deltaPct > 0 ? "+" : ""}{deltaPct.toFixed(0)}%)</span>
          </span>
        ) : (
          <span>flat</span>
        )}
      </div>
      <div className="mt-3 -mx-1 opacity-70">
        <Sparkline data={[...series]} color="rgb(var(--professional))" height={24} />
      </div>
    </div>
  );
}
