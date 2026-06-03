"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Wallet,
  Activity,
  Megaphone,
  Briefcase,
  Bell,
  Settings,
  Plus,
  FileText,
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { UNREAD_NOTIFICATIONS } from "@/lib/mock-data";
import { QuickActionSheet } from "./QuickActionSheet";

const tabs = [
  { href: "/", label: "Home", icon: LayoutDashboard },
  { href: "/finance", label: "Finance", icon: Wallet },
  { href: "/health", label: "Health", icon: Activity },
  { href: "/social", label: "Social", icon: Megaphone },
  { href: "/work", label: "Work", icon: Briefcase },
];

const quickActions: Record<string, string[]> = {
  "/": ["Quick add", "Log expense", "Add priority", "Capture idea"],
  "/finance": ["Note transaction", "Add bill", "Mark bill paid", "Add manual account"],
  "/health": ["Log workout", "Log weight", "Log meal", "Log water", "Log mood", "Log sleep"],
  "/social": ["Compose post", "Add to ideas backlog", "Schedule from idea"],
  "/work": ["Add priority", "Log KPI value", "Add note", "Quick check-in"],
};

function getRouteKey(pathname: string): keyof typeof quickActions {
  if (pathname === "/") return "/";
  if (pathname.startsWith("/finance")) return "/finance";
  if (pathname.startsWith("/health")) return "/health";
  if (pathname.startsWith("/social")) return "/social";
  if (pathname.startsWith("/work")) return "/work";
  return "/";
}

export function SideNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const actions = quickActions[getRouteKey(pathname)];

  return (
    <aside className="fixed left-0 top-0 bottom-0 z-40 w-60 bg-bg border-r border-border hidden md:flex flex-col">
      {/* Logo */}
      <div className="px-6 pt-7 pb-8">
        <Link href="/" className="flex items-center gap-2.5">
          <span className="w-6 h-6 rounded-md bg-primary flex items-center justify-center">
            <span className="text-bg font-semibold text-[11px]">L</span>
          </span>
          <span className="font-medium text-primary tracking-tight">Life OS</span>
        </Link>
      </div>

      {/* Quick action */}
      <div className="px-3 mb-6">
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="w-full flex items-center gap-2 px-3 py-2 rounded-button bg-elevated hover:bg-border/40 text-secondary hover:text-primary transition-colors text-sm"
        >
          <Plus className="w-4 h-4" strokeWidth={2} />
          <span>Quick action</span>
        </button>
      </div>

      {/* Nav items */}
      <nav className="flex-1 px-3 space-y-0.5">
        {tabs.map((tab) => {
          const isActive =
            tab.href === "/" ? pathname === "/" : pathname.startsWith(tab.href);
          const Icon = tab.icon;
          return (
            <Link
              key={tab.href}
              href={tab.href}
              className={cn(
                "flex items-center gap-2.5 px-3 py-1.5 rounded-button transition-colors text-sm",
                isActive
                  ? "bg-elevated text-primary"
                  : "text-secondary hover:bg-elevated/60 hover:text-primary"
              )}
            >
              <Icon className="w-4 h-4 flex-shrink-0" strokeWidth={1.75} />
              <span className="font-medium">{tab.label}</span>
            </Link>
          );
        })}

        <div className="h-3" />

        <Link
          href="/reports"
          className={cn(
            "flex items-center gap-2.5 px-3 py-1.5 rounded-button transition-colors text-sm",
            pathname.startsWith("/reports")
              ? "bg-elevated text-primary"
              : "text-secondary hover:bg-elevated/60 hover:text-primary"
          )}
        >
          <FileText className="w-4 h-4 flex-shrink-0" strokeWidth={1.75} />
          <span className="font-medium">Reports</span>
        </Link>
        <Link
          href="/notifications"
          className="flex items-center gap-2.5 px-3 py-1.5 rounded-button text-secondary hover:bg-elevated/60 hover:text-primary transition-colors text-sm"
        >
          <Bell className="w-4 h-4 flex-shrink-0" strokeWidth={1.75} />
          <span className="font-medium">Notifications</span>
          {UNREAD_NOTIFICATIONS > 0 && (
            <span className="ml-auto text-tertiary text-xs tabular-nums">{UNREAD_NOTIFICATIONS}</span>
          )}
        </Link>
        <Link
          href="/settings"
          className="flex items-center gap-2.5 px-3 py-1.5 rounded-button text-secondary hover:bg-elevated/60 hover:text-primary transition-colors text-sm"
        >
          <Settings className="w-4 h-4 flex-shrink-0" strokeWidth={1.75} />
          <span className="font-medium">Settings</span>
        </Link>
      </nav>

      {/* Footer */}
      <div className="px-4 py-4 border-t border-border">
        <div className="flex items-center gap-2.5">
          <span className="w-7 h-7 rounded-full bg-elevated flex items-center justify-center text-xs font-medium text-secondary">
            B
          </span>
          <div className="flex-1 min-w-0">
            <div className="text-sm text-primary truncate">Branden</div>
          </div>
        </div>
      </div>

      <QuickActionSheet
        open={open}
        onClose={() => setOpen(false)}
        actions={actions}
        accentBg="bg-elevated"
      />
    </aside>
  );
}
