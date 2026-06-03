"use client";

import { cn } from "@/lib/utils";

type Props = {
  businesses: { slug: string; name: string }[];
  active: string;
  onChange: (slug: string) => void;
};

export function BusinessSwitcher({ businesses, active, onChange }: Props) {
  const items = [...businesses, { slug: "all", name: "ALL" }];
  return (
    <div className="flex items-center gap-2 px-1 py-1 bg-elevated rounded-button">
      {items.map((b) => (
        <button
          key={b.slug}
          type="button"
          onClick={() => onChange(b.slug)}
          className={cn(
            "flex-1 px-3 py-2 rounded text-xs font-bold tracking-wider transition-colors uppercase",
            active === b.slug
              ? "bg-professional text-bg"
              : "text-tertiary active:text-secondary"
          )}
        >
          {b.name}
        </button>
      ))}
    </div>
  );
}
