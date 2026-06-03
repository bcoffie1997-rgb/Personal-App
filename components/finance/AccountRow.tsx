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
          <span className="text-sm text-primary truncate">{name}</span>
          <span className={cn(
            "text-[10px] tracking-wide",
            classification === "personal" ? "text-tertiary" : "text-info"
          )}>
            · {classification}
          </span>
        </div>
      </div>
      <div className="text-right">
        <div className={cn(
          "tabular-nums text-sm font-medium",
          isNegative ? "text-fitness" : "text-primary"
        )}>
          {isNegative ? "-" : ""}${Math.abs(balance).toLocaleString()}
        </div>
        {limit && (
          <div className="text-xs text-tertiary tabular-nums">
            of ${limit.toLocaleString()}
          </div>
        )}
      </div>
    </div>
  );
}
