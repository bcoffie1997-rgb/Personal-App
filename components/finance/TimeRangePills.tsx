"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

const ranges = ["1W", "1M", "3M", "1Y", "ALL"] as const;

export function TimeRangePills({ accent: _accent = "finance" }: { accent?: "finance" | "fitness" }) {
  void _accent;
  const [active, setActive] = useState<(typeof ranges)[number]>("1M");

  return (
    <div className="inline-flex items-center bg-bg rounded-button p-0.5">
      {ranges.map((r) => (
        <button
          key={r}
          type="button"
          onClick={() => setActive(r)}
          className={cn(
            "px-3 py-1 rounded text-xs font-medium transition-colors",
            active === r ? "bg-surface text-primary" : "text-tertiary hover:text-secondary"
          )}
        >
          {r}
        </button>
      ))}
    </div>
  );
}
