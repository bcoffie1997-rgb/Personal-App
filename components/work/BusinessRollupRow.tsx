import { cn } from "@/lib/utils";
import { ArrowUpRight } from "lucide-react";

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
  DECLINING: "text-fitness",
};

const trendIndicator: Record<string, string> = {
  up: "▲",
  flat: "—",
  down: "▼",
};

export function BusinessRollupRow({ name, status, trend, summary, detail, pipelineFilled, onClick }: Props) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group w-full text-left p-4 rounded-button hover:bg-bg transition-colors"
    >
      <div className="flex items-center justify-between mb-1.5">
        <span className="text-base font-semibold text-primary">{name}</span>
        <div className="flex items-center gap-3">
          <span className={cn("text-xs font-medium tracking-wide flex items-center gap-1", statusColor[status] ?? "text-secondary")}>
            <span className="text-[8px]">{trendIndicator[trend] ?? "·"}</span>
            {status}
          </span>
          <ArrowUpRight className="w-3.5 h-3.5 text-tertiary opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
      </div>
      <div className="text-sm text-secondary tabular-nums">{summary}</div>
      {pipelineFilled !== undefined ? (
        <div className="mt-2.5">
          <div className="h-1 rounded-full bg-elevated overflow-hidden">
            <div
              className="h-full bg-professional rounded-full"
              style={{ width: `${pipelineFilled * 100}%` }}
            />
          </div>
          {detail && <div className="mt-1.5 text-xs text-tertiary">{detail}</div>}
        </div>
      ) : (
        detail && <div className="mt-1.5 text-xs text-tertiary">{detail}</div>
      )}
    </button>
  );
}
