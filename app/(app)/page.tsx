import { StatusStrip } from "@/components/home/StatusStrip";
import { HeroNumberCard } from "@/components/home/HeroNumberCard";
import { DomainGlanceCard } from "@/components/home/DomainGlanceCard";
import { PrioritiesStrip } from "@/components/home/PrioritiesStrip";
import { ActivityFeed } from "@/components/home/ActivityFeed";
import { DesktopHeader } from "@/components/layout/DesktopHeader";
import { UPCOMING_BILLS, READINESS, TODAY_POSTS, BUSINESSES } from "@/lib/mock-data";

export default function HomePage() {
  const billsTotal = UPCOMING_BILLS.reduce((sum, b) => sum + b.amount, 0);

  return (
    <div>
      <div className="md:hidden">
        <StatusStrip />
      </div>

      <DesktopHeader title="Dashboard" subtitle="A quiet read on everything that matters." />

      <div className="px-5 md:px-0 pt-2 md:pt-0 space-y-8 md:space-y-10">
        <HeroNumberCard />

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
          <DomainGlanceCard
            domain="finance"
            headline={`${UPCOMING_BILLS.length} bills due`}
            details={[
              "Next 7 days",
              `$${billsTotal.toLocaleString()}`,
            ]}
          />
          <DomainGlanceCard
            domain="fitness"
            headline={`Readiness ${READINESS.score}`}
            details={[
              `Sleep ${READINESS.sleep}`,
              `HRV ${READINESS.hrv} ms`,
            ]}
          />
          <DomainGlanceCard
            domain="social"
            headline={`${TODAY_POSTS.length} posts today`}
            details={[
              "Last 3h ago",
              "+180 engaged",
            ]}
          />
          <DomainGlanceCard
            domain="professional"
            headline="3 businesses active"
            details={BUSINESSES.slice(0, 3).map((b) => {
              const mrr = b.kpis[0];
              const arrow = mrr.flat ? "→" : mrr.delta > 0 ? "↑" : "↓";
              const pct = mrr.deltaPct;
              return `${b.name} ${arrow} ${pct > 0 ? "+" : ""}${pct.toFixed(0)}%`;
            })}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-8 md:gap-12">
          <PrioritiesStrip />
          <ActivityFeed />
        </div>
      </div>
    </div>
  );
}
