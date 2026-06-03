import { cn } from "@/lib/utils";

type Props = {
  merchant: string;
  amount: number;
  category: string;
  uncategorized?: boolean;
  business?: boolean;
  time?: string;
};

export function TransactionRow({ merchant, amount, category, uncategorized, business, time }: Props) {
  const isIncome = amount > 0;
  return (
    <div className="flex items-center justify-between py-3">
      <div className="min-w-0 flex-1 pr-3">
        <div className="text-sm text-primary">{merchant}</div>
        <div className="mt-0.5 flex items-center gap-2 text-xs text-tertiary">
          <span className={uncategorized ? "text-warning" : ""}>{category}</span>
          {time && (
            <>
              <span>·</span>
              <span>{time}</span>
            </>
          )}
          {business && (
            <span className="text-info">· business</span>
          )}
        </div>
      </div>
      <div className="flex items-center gap-3">
        {uncategorized && (
          <button
            type="button"
            className="text-xs text-secondary hover:text-primary px-2 py-1 rounded border border-border hover:bg-bg"
          >
            Tag
          </button>
        )}
        <div className={cn(
          "tabular-nums text-sm font-medium",
          isIncome ? "text-accent" : "text-primary"
        )}>
          {isIncome ? "+" : "-"}${Math.abs(amount).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </div>
      </div>
    </div>
  );
}
