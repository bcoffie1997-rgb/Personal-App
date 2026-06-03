import { SUBSCRIPTIONS } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

export function SubscriptionsCard() {
  const monthlyTotal = SUBSCRIPTIONS.reduce((sum, s) => sum + s.amount, 0);
  const annual = monthlyTotal * 12;

  // Group by category
  const byCategory = SUBSCRIPTIONS.reduce((acc, s) => {
    acc[s.category] = (acc[s.category] || 0) + s.amount;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="bg-surface rounded-card p-5">
      <div className="flex items-baseline justify-between mb-4">
        <div className="flex items-center gap-3">
          <span className="text-xs text-tertiary tracking-wide">Subscriptions</span>
          <span className="text-xs text-tertiary tabular-nums">{SUBSCRIPTIONS.length} active</span>
        </div>
        <div className="text-right">
          <div className="tabular-nums text-lg text-primary font-semibold">
            ${monthlyTotal.toLocaleString()}<span className="text-xs text-tertiary font-normal">/mo</span>
          </div>
          <div className="text-xs text-tertiary tabular-nums">
            ${annual.toLocaleString()} /yr
          </div>
        </div>
      </div>

      {/* Category breakdown */}
      <div className="mb-4 space-y-1.5">
        {Object.entries(byCategory)
          .sort((a, b) => b[1] - a[1])
          .map(([cat, total]) => {
            const pct = (total / monthlyTotal) * 100;
            return (
              <div key={cat} className="flex items-center gap-3">
                <span className="text-xs text-secondary w-28 flex-shrink-0">{cat}</span>
                <div className="flex-1 h-1 rounded-full bg-elevated overflow-hidden">
                  <div className="h-full bg-finance rounded-full" style={{ width: `${pct}%` }} />
                </div>
                <span className="text-xs tabular-nums text-secondary w-16 text-right">
                  ${total.toLocaleString()}
                </span>
              </div>
            );
          })}
      </div>

      <div className="border-t border-border pt-3">
        <div className="text-[10px] text-tertiary tracking-wide mb-2">Upcoming charges</div>
        <ul className="space-y-2">
          {SUBSCRIPTIONS.slice(0, 5).map((s) => (
            <li key={s.id} className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-2 min-w-0 flex-1">
                <span className="text-primary truncate">{s.name}</span>
                <span className="text-tertiary flex-shrink-0">
                  · last used {s.lastUsed}
                </span>
              </div>
              <div className="flex items-center gap-3 flex-shrink-0">
                <span className="text-tertiary tabular-nums">{s.nextDue}</span>
                <span className={cn(
                  "tabular-nums font-medium min-w-[50px] text-right",
                  s.lastUsed.includes("d ago") && !s.lastUsed.startsWith("1") && !s.lastUsed.startsWith("2") && !s.lastUsed.startsWith("3")
                    ? "text-warning"
                    : "text-secondary"
                )}>
                  ${s.amount}
                </span>
              </div>
            </li>
          ))}
        </ul>
        <button className="mt-3 w-full text-xs text-secondary hover:text-primary font-medium">
          View all {SUBSCRIPTIONS.length} subscriptions →
        </button>
      </div>
    </div>
  );
}
