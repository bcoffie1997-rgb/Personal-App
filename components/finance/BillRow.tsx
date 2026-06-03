import { MonoNumber } from "@/components/shared/MonoNumber";

type Props = {
  name: string;
  date: string;
  amount: number;
};

export function BillRow({ name, date, amount }: Props) {
  return (
    <div className="flex items-center justify-between py-2.5">
      <span className="text-base text-primary">{name}</span>
      <div className="flex items-center gap-4">
        <span className="text-sm text-tertiary font-mono tabular-nums">{date}</span>
        <MonoNumber className="text-base text-primary font-medium min-w-[70px] text-right">
          ${amount.toLocaleString()}
        </MonoNumber>
      </div>
    </div>
  );
}
