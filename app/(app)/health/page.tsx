import { TopBar } from "@/components/layout/TopBar";
import { DesktopHeader } from "@/components/layout/DesktopHeader";
import { ReadinessRing } from "@/components/health/ReadinessRing";
import { SleepCard } from "@/components/health/SleepCard";
import { BiometricCard } from "@/components/health/BiometricCard";
import { WorkoutRow } from "@/components/health/WorkoutRow";
import { WeightCard } from "@/components/health/WeightCard";
import { NutritionCard } from "@/components/health/NutritionCard";
import { HydrationCard } from "@/components/health/HydrationCard";
import { StepsCard } from "@/components/health/StepsCard";
import { MoodCard } from "@/components/health/MoodCard";
import { TodayActivityCard } from "@/components/health/TodayActivityCard";
import { BIOMETRICS, RECENT_WORKOUTS } from "@/lib/mock-data";

function SectionHeader({ label }: { label: string }) {
  return (
    <h2 className="text-xs text-tertiary tracking-wide mb-3 mt-2 md:mt-0">{label}</h2>
  );
}

export default function HealthPage() {
  return (
    <div>
      <div className="md:hidden">
        <TopBar title="Health" />
      </div>
      <DesktopHeader title="Health" subtitle="Readiness, body, fuel, recovery, mind — everything." />

      <div className="px-5 md:px-0 pt-2 md:pt-0 space-y-10 md:space-y-12">
        {/* Today: at-a-glance */}
        <section>
          <SectionHeader label="Today" />
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-4 md:gap-6">
            <div className="bg-surface rounded-card p-5">
              <div className="text-xs text-tertiary tracking-wide mb-1">Readiness</div>
              <ReadinessRing />
            </div>
            <div className="space-y-4 md:space-y-6">
              <TodayActivityCard />
              <StepsCard />
              <HydrationCard />
            </div>
          </div>
        </section>

        {/* Fuel: Nutrition */}
        <section>
          <SectionHeader label="Fuel" />
          <NutritionCard />
        </section>

        {/* Body: Weight + Body composition */}
        <section>
          <SectionHeader label="Body" />
          <WeightCard />
        </section>

        {/* Vitals: Biometrics */}
        <section>
          <SectionHeader label="Vitals" />
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
            {BIOMETRICS.map((b) => (
              <BiometricCard key={b.name} {...b} />
            ))}
          </div>
        </section>

        {/* Recovery: Sleep */}
        <section>
          <SectionHeader label="Recovery" />
          <SleepCard />
        </section>

        {/* Mind: Mood */}
        <section>
          <SectionHeader label="Mind" />
          <MoodCard />
        </section>

        {/* Movement: Recent workouts */}
        <section>
          <SectionHeader label="Movement" />
          <div className="bg-surface rounded-card p-5">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-tertiary tracking-wide">Recent workouts</span>
            </div>
            <div>
              {RECENT_WORKOUTS.map((w) => (
                <WorkoutRow key={w.id} {...w} />
              ))}
            </div>
            <button className="mt-3 w-full py-2 text-sm text-secondary hover:text-primary text-center">
              View all workouts
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
