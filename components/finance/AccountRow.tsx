import { MonoNumber } from "@/components/shared/MonoNumber";
import { cn } from "@/lib/utils";

type Props = {
  name: string;
  classification: "personal" | "business";
  balance: number;
  limit?: number;
};

export function AccountRow({ name, classification, balance, limit }: Props) {
  const isNegative = balance < 0;
  return (
    <div className="flex items-center justify-between py-3 border-b border-border last:border-b-0">
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <span className="text-base text-primary truncate">{name}</span>
        </div>
        <span className={cn(
          "inline-block mt-1 px-1.5 py-0.5 rounded text-[10px] font-bold tracking-wider uppercase",
          classification === "personal"
            ? "bg-elevated text-secondary"
            : "bg-professional/15 text-professional"
        )}>
          {classification}
        </span>
      </div>
      <div className="text-right">
        <MonoNumber className={cn("text-base font-medium", isNegative ? "text-negative" : "text-primary")}>
          {isNegative ? "-" : ""}${Math.abs(balance).toLocaleString()}
        </MonoNumber>
        {limit && (
          <div className="text-xs text-tertiary font-mono tabular-nums">
            / ${limit.toLocaleString()}
          </div>
        )}
      </div>
    </div>
  );
}
