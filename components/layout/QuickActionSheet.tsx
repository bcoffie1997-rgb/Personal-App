"use client";

import { X } from "lucide-react";

type Props = {
  open: boolean;
  onClose: () => void;
  actions: string[];
  accentBg?: string;
};

export function QuickActionSheet({ open, onClose, actions }: Props) {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col justify-end md:items-center md:justify-center"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/40" />
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative bg-bg border-t border-border rounded-t-[20px] pb-safe md:rounded-[12px] md:border md:max-w-sm md:w-full md:mx-4"
      >
        <div className="flex items-center justify-between px-5 pt-4 pb-3">
          <span className="text-tertiary text-xs tracking-wide">Quick actions</span>
          <button
            type="button"
            onClick={onClose}
            className="text-tertiary p-1 hover:text-secondary"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
        <div className="px-2 pb-3 space-y-0.5">
          {actions.map((action) => (
            <button
              key={action}
              type="button"
              onClick={() => {
                console.log("FAB action:", action);
                onClose();
              }}
              className="w-full text-left px-3 py-2.5 rounded-button text-primary hover:bg-elevated transition-colors text-sm"
            >
              {action}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
