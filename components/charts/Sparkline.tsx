"use client";

import { Area, AreaChart, ResponsiveContainer } from "recharts";
import { useMemo } from "react";

type Props = {
  data: number[];
  color?: string;
  height?: number;
  className?: string;
};

export function Sparkline({ data, color = "rgb(var(--accent))", height = 40, className }: Props) {
  const chartData = useMemo(() => data.map((v, i) => ({ i, v })), [data]);
  const id = useMemo(() => `spark-${Math.random().toString(36).slice(2, 9)}`, []);

  return (
    <div className={className} style={{ width: "100%", height }}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={chartData} margin={{ top: 2, right: 0, left: 0, bottom: 2 }}>
          <defs>
            <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={color} stopOpacity={0.3} />
              <stop offset="100%" stopColor={color} stopOpacity={0} />
            </linearGradient>
          </defs>
          <Area
            type="monotone"
            dataKey="v"
            stroke={color}
            strokeWidth={1.5}
            fill={`url(#${id})`}
            dot={false}
            isAnimationActive={false}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
