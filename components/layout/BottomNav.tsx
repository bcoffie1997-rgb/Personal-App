"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Wallet,
  Activity,
  Megaphone,
  Briefcase,
} from "lucide-react";
import { cn } from "@/lib/utils";

const tabs = [
  { href: "/", label: "Home", icon: LayoutDashboard },
  { href: "/finance", label: "Finance", icon: Wallet },
  { href: "/health", label: "Health", icon: Activity },
  { href: "/social", label: "Social", icon: Megaphone },
  { href: "/work", label: "Work", icon: Briefcase },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-bg/95 backdrop-blur-md border-t border-border pb-safe md:hidden">
      <div className="max-w-md mx-auto flex items-stretch justify-around px-2 pt-2 pb-1">
        {tabs.map((tab) => {
          const isActive =
            tab.href === "/" ? pathname === "/" : pathname.startsWith(tab.href);
          const Icon = tab.icon;
          return (
            <Link
              key={tab.href}
              href={tab.href}
              className={cn(
                "flex flex-col items-center justify-center gap-1 px-3 py-2 rounded-button min-w-[56px] transition-colors",
                isActive ? "text-primary" : "text-tertiary"
              )}
            >
              <Icon className="w-5 h-5" strokeWidth={isActive ? 2 : 1.75} />
              <span className="text-[10px] font-medium tracking-wide">{tab.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
