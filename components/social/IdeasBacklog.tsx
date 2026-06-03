"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { IDEAS_BACKLOG } from "@/lib/mock-data";

export function IdeasBacklog() {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="w-full bg-surface rounded-card p-4 flex items-center justify-between hover:bg-elevated transition-colors"
      >
        <div className="flex items-center gap-3">
          <span className="text-xs text-tertiary tracking-wide">Ideas backlog</span>
          <span className="text-xs text-tertiary tabular-nums">{IDEAS_BACKLOG.length}</span>
        </div>
        <ChevronDown className={`w-4 h-4 text-tertiary transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <div className="mt-2 bg-surface rounded-card p-2">
          {IDEAS_BACKLOG.map((idea) => (
            <button
              key={idea.id}
              type="button"
              className="w-full text-left p-3 rounded-button hover:bg-bg transition-colors"
            >
              <div className="text-sm text-primary leading-snug">{idea.text}</div>
              <div className="mt-1.5 flex items-center gap-2 text-xs">
                <span className="px-1.5 py-0.5 rounded bg-elevated text-tertiary">
                  {idea.tag}
                </span>
                <span className="text-tertiary">{idea.captured}</span>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
