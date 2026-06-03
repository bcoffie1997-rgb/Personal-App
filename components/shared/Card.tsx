import { cn } from "@/lib/utils";

type CardProps = {
  children: React.ReactNode;
  className?: string;
  accent?: "finance" | "fitness" | "social" | "professional";
  as?: "div" | "button" | "a";
  href?: string;
  onClick?: () => void;
};

// In the new design, cards don't use borders. They use:
// - a slight surface bg to demarcate from page bg
// - generous internal padding
// - a small accent dot/bar inside the card (handled in card content) rather than a border-top

export function Card({ children, className, as = "div", href, onClick }: CardProps) {
  const base = cn(
    "bg-surface rounded-card p-5",
    className
  );

  if (as === "a" && href) {
    return (
      <a href={href} className={cn(base, "block hover:bg-elevated transition-colors")}>
        {children}
      </a>
    );
  }
  if (as === "button" || onClick) {
    return (
      <button type="button" onClick={onClick} className={cn(base, "text-left w-full hover:bg-elevated transition-colors")}>
        {children}
      </button>
    );
  }
  return <div className={base}>{children}</div>;
}

export function CardLabel({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("text-tertiary text-xs font-medium tracking-wide", className)}>
      {children}
    </div>
  );
}
