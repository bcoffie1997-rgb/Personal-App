import { Clock, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

type Status = "posted" | "scheduled" | "failed";

const platformAbbrev: Record<string, string> = {
  LinkedIn: "LI",
  X: "X",
  Instagram: "IG",
  TikTok: "TT",
};

type Props = {
  time: string;
  status: Status;
  platforms: string[];
  excerpt: string;
};

export function PostRow({ time, status, platforms, excerpt }: Props) {
  return (
    <div className="py-3 border-b border-border last:border-b-0">
      <div className="flex items-center gap-2 mb-1.5">
        <span className="text-sm font-mono tabular-nums text-primary">{time}</span>
        <StatusPill status={status} />
      </div>
      <div className="text-xs text-tertiary mb-1">in {platforms.map((p) => platformAbbrev[p] || p).join(" · ")}</div>
      <div className="text-sm text-primary leading-snug">{excerpt}</div>
    </div>
  );
}

function StatusPill({ status }: { status: Status }) {
  const config = {
    posted: { label: "POSTED", icon: CheckCircle2, color: "text-accent" },
    scheduled: { label: "SCHEDULED", icon: Clock, color: "text-warning" },
    failed: { label: "FAILED", icon: Clock, color: "text-negative" },
  } as const;
  const c = config[status];
  const Icon = c.icon;
  return (
    <span className={cn("inline-flex items-center gap-1 text-[10px] font-bold tracking-wider", c.color)}>
      <Icon className="w-3 h-3" />
      {c.label}
    </span>
  );
}
