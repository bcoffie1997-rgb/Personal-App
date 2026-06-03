import { HOME_ACTIVITY } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

const domainDot = {
  finance: "bg-finance",
  fitness: "bg-fitness",
  social: "bg-social",
  professional: "bg-professional",
} as const;

export function ActivityFeed() {
  return (
    <div>
      <div className="mb-3 flex items-center justify-between">
        <span className="text-xs text-tertiary tracking-wide">Recent</span>
      </div>
      <ul className="space-y-0.5">
        {HOME_ACTIVITY.map((item) => (
          <li key={item.id}>
            <div className="flex items-start gap-3 py-2.5 -mx-2 px-2 rounded-button hover:bg-surface transition-colors">
              <span
                className={cn(
                  "w-1 h-1 rounded-full mt-2.5 flex-shrink-0",
                  domainDot[item.domain]
                )}
              />
              <div className="flex-1 min-w-0">
                <div className="text-sm text-primary leading-snug">{item.title}</div>
                <div className="mt-0.5 flex items-center gap-2 text-xs text-tertiary">
                  <span>{item.time}</span>
                  {item.subtitle && (
                    <>
                      <span>·</span>
                      <span>{item.subtitle}</span>
                    </>
                  )}
                </div>
              </div>
              {item.action && (
                <button
                  type="button"
                  className="text-xs text-secondary hover:text-primary font-medium px-2 py-1"
                >
                  {item.action}
                </button>
              )}
            </div>
          </li>
        ))}
      </ul>
      <button
        type="button"
        className="mt-2 text-xs text-tertiary hover:text-secondary"
      >
        Load more
      </button>
    </div>
  );
}
