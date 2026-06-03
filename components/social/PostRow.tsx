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
        <span className="text-sm tabular-nums text-primary font-medium">{time}</span>
        <StatusPill status={status} />
      </div>
      <div className="text-xs text-tertiary mb-1">
        {platforms.map((p) => platformAbbrev[p] || p).join(" · ")}
      </div>
      <div className="text-sm text-primary leading-snug">{excerpt}</div>
    </div>
  );
}

function StatusPill({ status }: { status: Status }) {
  const config = {
    posted: { label: "Posted", color: "text-accent" },
    scheduled: { label: "Scheduled", color: "text-info" },
    failed: { label: "Failed", color: "text-fitness" },
  } as const;
  const c = config[status];
  return (
    <span className={cn("text-xs", c.color)}>· {c.label}</span>
  );
}
