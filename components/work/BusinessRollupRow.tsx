import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";

type Props = {
  name: string;
  status: string;
  trend: string;
  summary: string;
  detail?: string;
  pipelineFilled?: number;
  onClick?: () => void;
};

const statusColor: Record<string, string> = {
  HEALTHY: "text-accent",
  GROWING: "text-accent",
  STEADY: "text-info",
  "NEEDS ATTENTION": "text-warning",
  DECLINING: "text-negative",
};

const trendArrow: Record<string, string> = {
  up: "↑",
  flat: "→",
  down: "↓",
};

export function BusinessRollupRow({ name, status, trend, summary, detail, pipelineFilled, onClick }: Props) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full text-left py-3 border-b border-border last:border-b-0 active:bg-elevated -mx-2 px-2 rounded-button"
    >
      <div className="flex items-center justify-between">
        <span className="text-base font-semibold text-primary">{name}</span>
        <div className="flex items-center gap-2">
          <span className={cn("text-xs font-bold tracking-wider", statusColor[status] ?? "text-secondary")}>
            {trendArrow[trend] ?? "·"} {status}
          </span>
          <ChevronRight className="w-4 h-4 text-tertiary" />
        </div>
      </div>
      <div className="mt-1 text-sm text-secondary">{summary}</div>
      {pipelineFilled !== undefined ? (
        <div className="mt-2">
          <div className="h-1 rounded-full bg-elevated overflow-hidden">
            <div
              className="h-full bg-professional rounded-full"
              style={{ width: `${pipelineFilled * 100}%` }}
            />
          </div>
          {detail && <div className="mt-1 text-xs text-tertiary">{detail}</div>}
        </div>
      ) : (
        detail && <div className="mt-1 text-xs text-tertiary">{detail}</div>
      )}
    </button>
  );
}
