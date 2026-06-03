"use client";

import { useState } from "react";
import { Check } from "lucide-react";
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
      className="w-full flex items-start gap-3 py-2 -mx-2 px-2 rounded-button hover:bg-bg transition-colors text-left"
    >
      <span
        className={cn(
          "w-4 h-4 rounded border flex-shrink-0 flex items-center justify-center mt-0.5 transition-colors",
          done ? "bg-primary border-primary" : "border-tertiary"
        )}
      >
        {done && <Check className="w-3 h-3 text-bg" strokeWidth={3} />}
      </span>
      <div className="flex-1 min-w-0">
        <div className={cn("text-sm", done ? "text-tertiary line-through" : "text-primary")}>
          {title}
        </div>
        {due && <div className="text-xs text-tertiary mt-0.5">{due}</div>}
      </div>
    </button>
  );
}
