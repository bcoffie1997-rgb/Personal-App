import { cn } from "@/lib/utils";

type Props = {
  children: React.ReactNode;
  className?: string;
};

// Kept the name for compatibility but renders in Inter with tabular nums.
// Numbers still align across rows but no longer feel "terminal-y".
export function MonoNumber({ children, className }: Props) {
  return (
    <span className={cn("tabular-nums", className)}>
      {children}
    </span>
  );
}
