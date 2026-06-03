"use client";

import { usePathname } from "next/navigation";
import { Plus } from "lucide-react";
import { useState } from "react";
import { QuickActionSheet } from "./QuickActionSheet";

const fabActions: Record<string, string[]> = {
  "/": ["Quick add", "Log expense", "Add priority", "Capture idea"],
  "/finance": ["Note transaction", "Add bill", "Mark bill paid", "Add manual account"],
  "/health": ["Log workout", "Log weight", "Log meal", "Log water", "Log mood", "Log sleep"],
  "/social": ["Compose post", "Add to ideas backlog", "Schedule from idea"],
  "/work": ["Add priority", "Log KPI value", "Add note", "Quick check-in"],
};

function getRouteKey(pathname: string): keyof typeof fabActions {
  if (pathname === "/") return "/";
  if (pathname.startsWith("/finance")) return "/finance";
  if (pathname.startsWith("/health")) return "/health";
  if (pathname.startsWith("/social")) return "/social";
  if (pathname.startsWith("/work")) return "/work";
  return "/";
}

export function Fab() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const actions = fabActions[getRouteKey(pathname)];

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Quick actions"
        className="fixed z-30 right-5 rounded-full w-14 h-14 flex items-center justify-center bg-primary text-bg shadow-md shadow-black/10 active:scale-95 transition-transform"
        style={{ bottom: "calc(env(safe-area-inset-bottom) + 80px)" }}
      >
        <Plus className="w-6 h-6" strokeWidth={2} />
      </button>
      <QuickActionSheet
        open={open}
        onClose={() => setOpen(false)}
        actions={actions}
        accentBg="bg-elevated"
      />
    </>
  );
}
