"use client";

import Link from "next/link";
import { useState } from "react";
import { ChevronRight, Check } from "lucide-react";
import { TOP_PRIORITIES } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

export function PrioritiesStrip() {
  const [priorities, setPriorities] = useState(TOP_PRIORITIES);
  const top3 = priorities.slice(0, 3);
  const done = priorities.filter((p) => p.done).length;

  const toggle = (id: string) => {
    setPriorities((prev) =>
      prev.map((p) => (p.id === id ? { ...p, done: !p.done } : p))
    );
  };

  return (
    <div>
      <Link
        href="/work"
        className="flex items-center justify-between mb-3 group"
      >
        <span className="text-xs text-tertiary tracking-wide">Today&apos;s priorities</span>
        <span className="flex items-center gap-1 text-xs text-tertiary tabular-nums">
          {done} of {priorities.length}
          <ChevronRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
        </span>
      </Link>
      <ul className="space-y-0.5">
        {top3.map((p) => (
          <li key={p.id}>
            <button
              type="button"
              onClick={() => toggle(p.id)}
              className="w-full flex items-center gap-3 py-2 -mx-2 px-2 rounded-button hover:bg-surface transition-colors text-left"
            >
              <span
                className={cn(
                  "w-4 h-4 rounded border flex-shrink-0 flex items-center justify-center transition-colors",
                  p.done
                    ? "bg-primary border-primary"
                    : "border-tertiary"
                )}
              >
                {p.done && <Check className="w-3 h-3 text-bg" strokeWidth={3} />}
              </span>
              <span
                className={cn(
                  "text-sm flex-1",
                  p.done ? "text-tertiary line-through" : "text-primary"
                )}
              >
                {p.title}
              </span>
              <span className="text-xs text-tertiary">{p.business}</span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
