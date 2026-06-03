import Link from "next/link";
import { Bell } from "lucide-react";
import { UNREAD_NOTIFICATIONS, READINESS } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

function readinessColor(score: number) {
  if (score >= 75) return "bg-accent";
  if (score >= 50) return "bg-warning";
  return "bg-fitness";
}

export function StatusStrip() {
  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "short",
    day: "numeric",
  });
  return (
    <div className="sticky top-0 z-20 bg-bg/95 backdrop-blur-md">
      <div className="h-14 px-5 flex items-center justify-between">
        <span className="text-sm text-secondary">{today}</span>
        <div className="flex items-center gap-2">
          <span className={cn("w-1.5 h-1.5 rounded-full", readinessColor(READINESS.score))} />
          <span className="tabular-nums text-sm text-primary">{READINESS.score}</span>
        </div>
        <Link href="/notifications" className="relative flex items-center gap-1 text-secondary">
          <Bell className="w-5 h-5" strokeWidth={1.75} />
          {UNREAD_NOTIFICATIONS > 0 && (
            <span className="absolute -top-0.5 -right-1.5 min-w-[15px] h-4 rounded-full bg-fitness text-bg text-[10px] font-medium flex items-center justify-center px-1">
              {UNREAD_NOTIFICATIONS}
            </span>
          )}
        </Link>
      </div>
    </div>
  );
}
