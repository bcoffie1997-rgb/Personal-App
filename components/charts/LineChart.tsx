"use client";

import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useMemo } from "react";

type Props = {
  data: { date: string; value: number }[];
  color?: string;
  height?: number;
  format?: "currency" | "number" | "percent";
};

function formatValue(n: number, format: Props["format"]) {
  switch (format) {
    case "currency":
      return `$${n.toLocaleString("en-US", { maximumFractionDigits: 0 })}`;
    case "percent":
      return `${n.toFixed(1)}%`;
    case "number":
    default:
      return n.toLocaleString();
  }
}

export function LineChart({
  data,
  color = "rgb(var(--accent))",
  height = 140,
  format = "number",
}: Props) {
  const id = useMemo(() => `line-${Math.random().toString(36).slice(2, 9)}`, []);
  const values = data.map((d) => d.value);
  const min = Math.min(...values);
  const max = Math.max(...values);
  const padding = (max - min) * 0.1;

  return (
    <div style={{ width: "100%", height }}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 8, right: 0, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={color} stopOpacity={0.35} />
              <stop offset="100%" stopColor={color} stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="date" hide />
          <YAxis domain={[min - padding, max + padding]} hide />
          <Tooltip
            contentStyle={{
              background: "rgb(var(--bg-elevated))",
              border: "1px solid rgb(var(--border))",
              borderRadius: 8,
              fontSize: 12,
              fontFamily: "var(--font-jetbrains-mono), monospace",
              color: "rgb(var(--text-primary))",
            }}
            labelStyle={{ color: "rgb(var(--text-secondary))", marginBottom: 4 }}
            formatter={(v: number) => [formatValue(v, format), ""]}
            separator=""
          />
          <Area
            type="monotone"
            dataKey="value"
            stroke={color}
            strokeWidth={2}
            fill={`url(#${id})`}
            dot={false}
            activeDot={{ r: 4, fill: color, stroke: "rgb(var(--bg))", strokeWidth: 2 }}
            isAnimationActive={false}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
