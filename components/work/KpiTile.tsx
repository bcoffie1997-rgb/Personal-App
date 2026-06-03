import { Sparkline } from "@/components/charts/Sparkline";
import { MonoNumber } from "@/components/shared/MonoNumber";
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
  const arrow = flat ? "→" : delta > 0 ? "↑" : "↓";
  const color = flat
    ? "text-tertiary"
    : effectivePositive
    ? "text-accent"
    : "text-negative";

  return (
    <div className="bg-surface border border-border rounded-card p-3">
      <div className="text-[10px] uppercase tracking-wider text-tertiary font-semibold">{name}</div>
      <MonoNumber className="block mt-1 text-xl text-primary font-bold">
        {formatValue(value, prefix, suffix)}
      </MonoNumber>
      <div className={cn("mt-0.5 text-xs font-mono tabular-nums", color)}>
        {arrow}{" "}
        {!flat && (
          <>
            {delta > 0 ? "+" : ""}
            {prefix ?? ""}
            {Math.abs(delta).toLocaleString()}
            {suffix ?? ""}
            {" "}({deltaPct > 0 ? "+" : ""}{deltaPct.toFixed(0)}%)
          </>
        )}
        {flat && <span>flat</span>}
      </div>
      <div className="mt-2 -mx-1">
        <Sparkline data={[...series]} color="rgb(var(--professional))" height={28} />
      </div>
    </div>
  );
}
