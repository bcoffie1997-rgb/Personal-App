import Link from "next/link";
import { Wallet, Activity, Megaphone, Briefcase, ArrowUpRight, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type Domain = "finance" | "fitness" | "social" | "professional";

const config: Record<Domain, { icon: LucideIcon; label: string; href: string; dot: string }> = {
  finance: { icon: Wallet, label: "Finance", href: "/finance", dot: "bg-finance" },
  fitness: { icon: Activity, label: "Health", href: "/health", dot: "bg-fitness" },
  social: { icon: Megaphone, label: "Social", href: "/social", dot: "bg-social" },
  professional: { icon: Briefcase, label: "Work", href: "/work", dot: "bg-professional" },
};

type Props = {
  domain: Domain;
  headline: string;
  details: string[];
  stale?: boolean;
};

export function DomainGlanceCard({ domain, headline, details, stale }: Props) {
  const c = config[domain];
  const Icon = c.icon;

  return (
    <Link
      href={c.href}
      className="group block bg-surface rounded-card p-5 hover:bg-elevated transition-colors min-h-[148px] flex flex-col"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Icon className="w-4 h-4 text-tertiary" strokeWidth={1.75} />
          <span className="text-xs text-tertiary tracking-wide">{c.label}</span>
        </div>
        <ArrowUpRight className="w-3.5 h-3.5 text-tertiary opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>
      <div className="text-base text-primary font-medium leading-snug">{headline}</div>
      <div className="mt-2 space-y-1 flex-1">
        {details.map((d, i) => (
          <div key={i} className="text-sm text-secondary tabular-nums">
            {d}
          </div>
        ))}
      </div>
      <div className="mt-3 flex items-center gap-1.5">
        <span className={cn("w-1 h-1 rounded-full", c.dot)} />
        {stale && <span className="text-[10px] text-warning">stale 2d</span>}
      </div>
    </Link>
  );
}
