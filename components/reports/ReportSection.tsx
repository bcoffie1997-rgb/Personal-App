import Link from "next/link";
import { ArrowUpRight, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = {
  icon: LucideIcon;
  domain: "finance" | "fitness" | "social" | "professional";
  title: string;
  href: string;
  children: React.ReactNode;
};

const dotClass = {
  finance: "bg-finance",
  fitness: "bg-fitness",
  social: "bg-social",
  professional: "bg-professional",
} as const;

export function ReportSection({ icon: Icon, domain, title, href, children }: Props) {
  return (
    <section className="bg-surface rounded-card p-5 md:p-6">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2.5">
          <span className={cn("w-1.5 h-1.5 rounded-full", dotClass[domain])} />
          <Icon className="w-4 h-4 text-tertiary" strokeWidth={1.75} />
          <h2 className="text-sm font-semibold text-primary">{title}</h2>
        </div>
        <Link
          href={href}
          className="group flex items-center gap-1 text-xs text-tertiary hover:text-primary transition-colors"
        >
          <span>View daily detail</span>
          <ArrowUpRight className="w-3 h-3 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
        </Link>
      </div>
      {children}
    </section>
  );
}

export function ReportStat({
  label,
  value,
  delta,
  deltaSuffix,
  invertedColor,
}: {
  label: string;
  value: React.ReactNode;
  delta?: string;
  deltaSuffix?: string;
  invertedColor?: boolean;
}) {
  // delta starts with "+", "-", or "—"
  const isPositive = delta?.startsWith("+");
  const isNegative = delta?.startsWith("-");
  // For inverted metrics (e.g., spending — lower is better), flip the color logic
  const isGood = invertedColor ? isNegative : isPositive;
  const deltaColor = !delta || delta.startsWith("—")
    ? "text-tertiary"
    : isGood
    ? "text-accent"
    : "text-fitness";

  return (
    <div>
      <div className="text-[10px] text-tertiary tracking-wide">{label}</div>
      <div className="tabular-nums mt-1 text-lg text-primary font-semibold">{value}</div>
      {delta && (
        <div className={cn("tabular-nums mt-0.5 text-xs", deltaColor)}>
          {delta} {deltaSuffix}
        </div>
      )}
    </div>
  );
}

export function HighlightBlock({ label, text, tone = "good" }: { label: string; text: string; tone?: "good" | "watch" }) {
  return (
    <div>
      <div className="text-[10px] text-tertiary tracking-wide mb-1.5">{label}</div>
      <div className={cn("text-sm leading-relaxed", tone === "good" ? "text-primary" : "text-secondary")}>
        {tone === "good" ? "✓ " : "△ "}{text}
      </div>
    </div>
  );
}
