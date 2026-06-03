import { TopBar } from "@/components/layout/TopBar";
import { DesktopHeader } from "@/components/layout/DesktopHeader";
import { ContentQueue } from "@/components/social/ContentQueue";
import { CalendarStrip } from "@/components/social/CalendarStrip";
import { PostRow } from "@/components/social/PostRow";
import { EngagementTable } from "@/components/social/EngagementTable";
import { IdeasBacklog } from "@/components/social/IdeasBacklog";
import { SOCIAL_WEEK, TODAY_POSTS } from "@/lib/mock-data";

function SectionHeader({ label }: { label: string }) {
  return (
    <h2 className="text-xs text-tertiary tracking-wide mb-3 mt-2 md:mt-0">{label}</h2>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-[10px] tracking-wide text-tertiary">{label}</div>
      <div className="tabular-nums mt-1 text-2xl text-primary font-semibold">{value}</div>
    </div>
  );
}

export default function SocialPage() {
  return (
    <div>
      <div className="md:hidden">
        <TopBar title="Social" />
      </div>
      <DesktopHeader title="Social" subtitle="Plan, post, measure — across every platform." />

      <div className="px-5 md:px-0 pt-2 md:pt-0 space-y-10 md:space-y-12">
        {/* Content to make today — hero */}
        <section>
          <SectionHeader label="Today's content queue" />
          <ContentQueue />
        </section>

        {/* This week glance */}
        <section>
          <SectionHeader label="This week" />
          <div className="bg-surface rounded-card p-5">
            <div className="grid grid-cols-3 gap-2 text-center mb-4">
              <Stat label="Scheduled" value={String(SOCIAL_WEEK.scheduled)} />
              <Stat label="Posted" value={String(SOCIAL_WEEK.posted)} />
              <Stat label="Engaged" value={SOCIAL_WEEK.engaged.toLocaleString()} />
            </div>
            <CalendarStrip
              days={SOCIAL_WEEK.daySchedule.map((d) => ({
                day: d.day,
                platforms: [...d.platforms],
              }))}
            />
          </div>
        </section>

        {/* Today's posts + Engagement side-by-side on desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-8 md:gap-10">
          <section>
            <SectionHeader label="Today's posts" />
            <div className="bg-surface rounded-card p-4">
              {TODAY_POSTS.map((p) => (
                <PostRow key={p.id} {...p} status={p.status as "posted" | "scheduled" | "failed"} />
              ))}
            </div>
          </section>

          <section>
            <SectionHeader label="Engagement · past 7 days" />
            <div className="bg-surface rounded-card p-4">
              <EngagementTable />
              <button className="mt-3 w-full py-2 text-sm text-secondary hover:text-primary text-center border-t border-border pt-3">
                View detailed engagement
              </button>
            </div>
          </section>
        </div>

        {/* Ideas backlog */}
        <section>
          <IdeasBacklog />
        </section>
      </div>
    </div>
  );
}
