import { MonoNumber } from "@/components/shared/MonoNumber";
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
        <div className="text-base text-primary truncate">{merchant}</div>
        <div className="mt-0.5 flex items-center gap-2 text-xs text-tertiary">
          <span className={uncategorized ? "text-warning" : ""}>{category}</span>
          {time && (
            <>
              <span>·</span>
              <span>{time}</span>
            </>
          )}
          {business && (
            <span className="ml-1 px-1.5 py-0.5 rounded bg-professional/15 text-professional text-[10px] font-bold tracking-wider">
              BUSINESS
            </span>
          )}
        </div>
      </div>
      <div className="flex items-center gap-3">
        {uncategorized && (
          <button
            type="button"
            className="text-finance text-xs font-semibold px-2 py-1 rounded border border-finance/40 active:bg-finance/10"
          >
            Tag
          </button>
        )}
        <MonoNumber className={cn("text-base font-medium tabular-nums", isIncome ? "text-accent" : "text-primary")}>
          {isIncome ? "+" : "-"}${Math.abs(amount).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </MonoNumber>
      </div>
    </div>
  );
}
