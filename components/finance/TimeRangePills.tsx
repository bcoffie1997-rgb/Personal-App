"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

const ranges = ["1W", "1M", "3M", "1Y", "ALL"] as const;

export function TimeRangePills({ accent = "finance" }: { accent?: "finance" | "fitness" }) {
  const [active, setActive] = useState<(typeof ranges)[number]>("1M");
  const activeBg = accent === "finance" ? "bg-finance text-bg" : "bg-fitness text-bg";

  return (
    <div className="flex items-center gap-1 bg-elevated p-1 rounded-button">
      {ranges.map((r) => (
        <button
          key={r}
          type="button"
          onClick={() => setActive(r)}
          className={cn(
            "px-3 py-1 rounded text-xs font-semibold tracking-wide transition-colors",
            active === r ? activeBg : "text-tertiary active:text-secondary"
          )}
        >
          {r}
        </button>
      ))}
    </div>
  );
}
