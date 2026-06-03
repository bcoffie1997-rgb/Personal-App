"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { IDEAS_BACKLOG } from "@/lib/mock-data";
import { CardLabel } from "@/components/shared/Card";

export function IdeasBacklog() {
  const [open, setOpen] = useState(false);

  return (
    <div className="bg-surface border border-border rounded-card">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="w-full p-4 flex items-center justify-between active:bg-elevated transition-colors rounded-card"
      >
        <div className="flex items-center gap-3">
          <CardLabel>Ideas Backlog</CardLabel>
          <span className="text-xs text-tertiary font-mono tabular-nums">{IDEAS_BACKLOG.length}</span>
        </div>
        {open ? <ChevronUp className="w-4 h-4 text-tertiary" /> : <ChevronDown className="w-4 h-4 text-tertiary" />}
      </button>
      {open && (
        <div className="px-4 pb-4 space-y-2">
          {IDEAS_BACKLOG.map((idea) => (
            <button
              key={idea.id}
              type="button"
              className="w-full text-left p-3 bg-elevated/60 rounded-button active:bg-elevated"
            >
              <div className="text-sm text-primary">{idea.text}</div>
              <div className="mt-1 flex items-center gap-2 text-[10px] text-tertiary">
                <span className="px-1.5 py-0.5 rounded bg-social/15 text-social font-bold tracking-wider">
                  {idea.tag}
                </span>
                <span>{idea.captured}</span>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
