import { cn } from "@/lib/utils";

type Props = {
  value: number;
  percent?: number;
  prefix?: string;
  className?: string;
  showFlat?: boolean;
};

export function Delta({ value, percent, prefix = "$", className, showFlat }: Props) {
  const isFlat = showFlat && Math.abs(value) < 0.5;
  const isPositive = value >= 0;
  // Softer indicators — small carets, no big arrows
  const indicator = isFlat ? "—" : isPositive ? "▲" : "▼";
  const color = isFlat
    ? "text-tertiary"
    : isPositive
    ? "text-accent"
    : "text-negative";
  const sign = isPositive ? "+" : "-";
  const abs = Math.abs(value);

  return (
    <span className={cn("tabular-nums text-sm inline-flex items-center gap-1.5", color, className)}>
      <span className="text-[9px]">{indicator}</span>
      <span>
        {!isFlat && sign}
        {prefix}
        {abs.toLocaleString("en-US", { maximumFractionDigits: prefix ? 0 : 2 })}
        {percent !== undefined && !isFlat && (
          <span className="ml-1 text-tertiary">
            {percent > 0 ? "+" : ""}
            {percent.toFixed(1)}%
          </span>
        )}
      </span>
    </span>
  );
}
