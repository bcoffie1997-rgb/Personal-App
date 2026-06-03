import { CONTENT_TODAY } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

const platformColor: Record<string, string> = {
  LinkedIn: "bg-info",
  X: "bg-primary",
  Instagram: "bg-social",
  TikTok: "bg-fitness",
};

const statusConfig: Record<string, { label: string; color: string }> = {
  drafted: { label: "Drafted", color: "text-accent" },
  idea: { label: "Idea", color: "text-tertiary" },
  "needs-asset": { label: "Needs asset", color: "text-warning" },
  scheduled: { label: "Scheduled", color: "text-info" },
};

export function ContentQueue() {
  return (
    <div className="bg-surface rounded-card p-5">
      <div className="flex items-center justify-between mb-4">
        <span className="text-xs text-tertiary tracking-wide">To make today</span>
        <span className="text-xs text-tertiary tabular-nums">
          {CONTENT_TODAY.filter((c) => c.status !== "scheduled").length} pending ·{" "}
          {CONTENT_TODAY.filter((c) => c.status === "scheduled").length} ready
        </span>
      </div>
      <ul className="space-y-3">
        {CONTENT_TODAY.map((c) => {
          const status = statusConfig[c.status];
          return (
            <li key={c.id} className="flex items-start gap-3 p-3 -mx-2 rounded-button hover:bg-bg transition-colors">
              <span
                className={cn(
                  "w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0",
                  platformColor[c.platform] || "bg-tertiary"
                )}
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  <span className="text-xs text-primary font-medium">{c.platform}</span>
                  <span className="text-xs text-tertiary">·</span>
                  <span className="text-xs text-tertiary tabular-nums">{c.timeSlot}</span>
                  <span className="text-xs text-tertiary">·</span>
                  <span className={cn("text-xs", status.color)}>{status.label}</span>
                  {c.estimatedMinutes > 0 && (
                    <>
                      <span className="text-xs text-tertiary">·</span>
                      <span className="text-xs text-tertiary tabular-nums">~{c.estimatedMinutes}m</span>
                    </>
                  )}
                </div>
                <div className="text-sm text-primary leading-snug">{c.prompt}</div>
                <div className="mt-1 text-xs text-tertiary">{c.angle}</div>
              </div>
              <button
                type="button"
                className="text-xs text-secondary hover:text-primary px-2 py-1 rounded border border-border hover:bg-bg"
              >
                {c.status === "scheduled" ? "View" : c.status === "idea" ? "Draft" : "Open"}
              </button>
            </li>
          );
        })}
      </ul>
      <div className="mt-4 pt-3 border-t border-border flex items-center justify-between">
        <span className="text-xs text-tertiary">Hit your daily content quota</span>
        <button className="text-xs text-secondary hover:text-primary font-medium">
          Add another →
        </button>
      </div>
    </div>
  );
}
