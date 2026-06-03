"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

type Props = {
  title: string;
  due?: string;
  initiallyDone?: boolean;
};

export function PriorityRow({ title, due, initiallyDone }: Props) {
  const [done, setDone] = useState(initiallyDone ?? false);
  return (
    <button
      type="button"
      onClick={() => setDone((v) => !v)}
      className="w-full flex items-start gap-3 py-2.5 -mx-2 px-2 rounded-button active:bg-elevated transition-colors text-left"
    >
      <span
        className={cn(
          "w-4 h-4 rounded-full border flex-shrink-0 mt-0.5",
          done ? "bg-accent border-accent" : "border-tertiary"
        )}
      />
      <div className="flex-1 min-w-0">
        <div className={cn("text-sm", done ? "text-tertiary line-through" : "text-primary")}>
          {title}
        </div>
        {due && <div className="text-xs text-tertiary mt-0.5">{due}</div>}
      </div>
    </button>
  );
}
