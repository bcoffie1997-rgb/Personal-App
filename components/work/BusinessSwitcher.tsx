"use client";

import { cn } from "@/lib/utils";

type Props = {
  businesses: { slug: string; name: string }[];
  active: string;
  onChange: (slug: string) => void;
};

export function BusinessSwitcher({ businesses, active, onChange }: Props) {
  const items = [{ slug: "all", name: "All" }, ...businesses];
  return (
    <div className="inline-flex items-center bg-surface rounded-button p-0.5">
      {items.map((b) => (
        <button
          key={b.slug}
          type="button"
          onClick={() => onChange(b.slug)}
          className={cn(
            "px-4 py-1.5 rounded text-sm font-medium transition-colors",
            active === b.slug
              ? "bg-bg text-primary shadow-sm"
              : "text-tertiary hover:text-secondary"
          )}
        >
          {b.name}
        </button>
      ))}
    </div>
  );
}
