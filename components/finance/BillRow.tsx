type Props = {
  name: string;
  date: string;
  amount: number;
};

export function BillRow({ name, date, amount }: Props) {
  return (
    <div className="flex items-center justify-between py-2.5">
      <div className="flex-1 min-w-0">
        <div className="text-sm text-primary">{name}</div>
      </div>
      <div className="flex items-center gap-4">
        <span className="text-xs text-tertiary tabular-nums">{date}</span>
        <span className="tabular-nums text-sm text-primary font-medium min-w-[70px] text-right">
          ${amount.toLocaleString()}
        </span>
      </div>
    </div>
  );
}
