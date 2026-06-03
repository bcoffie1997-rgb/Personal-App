import { TopBar } from "@/components/layout/TopBar";
import { DesktopHeader } from "@/components/layout/DesktopHeader";
import { MonoNumber } from "@/components/shared/MonoNumber";
import { CardLabel } from "@/components/shared/Card";
import { CalendarStrip } from "@/components/social/CalendarStrip";
import { PostRow } from "@/components/social/PostRow";
import { EngagementTable } from "@/components/social/EngagementTable";
import { IdeasBacklog } from "@/components/social/IdeasBacklog";
import { SOCIAL_WEEK, TODAY_POSTS } from "@/lib/mock-data";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function SocialPage() {
  return (
    <div>
      <div className="md:hidden">
        <TopBar title="Social" />
      </div>
      <DesktopHeader title="Social" subtitle="Plan, schedule, and publish across all platforms." />

      <div className="px-5 md:px-0 pt-5 md:pt-2 space-y-4 md:space-y-6">
        {/* This Week + Content Calendar side-by-side */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
          <div className="bg-surface border border-border border-t-2 border-t-social rounded-card p-4 md:p-6">
            <CardLabel className="mb-3">This Week</CardLabel>
            <div className="grid grid-cols-3 gap-2 text-center">
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

          <div className="bg-surface border border-border rounded-card p-4 md:p-6">
            <div className="flex items-center justify-between mb-3">
              <CardLabel>Content Calendar</CardLabel>
              <div className="flex items-center gap-2 text-xs text-secondary font-mono">
                <ChevronLeft className="w-4 h-4" />
                <span>May 27 — Jun 02</span>
                <ChevronRight className="w-4 h-4" />
              </div>
            </div>
            <CalendarStrip
              days={SOCIAL_WEEK.daySchedule.map((d) => ({
                day: d.day,
                platforms: [...d.platforms],
              }))}
            />
            <button className="mt-3 w-full py-2 text-sm text-secondary border border-border rounded-button active:bg-elevated hover:bg-elevated">
              Open full calendar
            </button>
          </div>
        </div>

        {/* Today + Engagement side-by-side */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-4 md:gap-6">
          <div className="bg-surface border border-border rounded-card p-4 md:p-6">
            <CardLabel className="mb-1">Today</CardLabel>
            <div>
              {TODAY_POSTS.map((p) => (
                <PostRow key={p.id} {...p} status={p.status as "posted" | "scheduled" | "failed"} />
              ))}
            </div>
          </div>

          <div className="bg-surface border border-border rounded-card p-4 md:p-6">
            <div className="flex items-center justify-between mb-2">
              <CardLabel>Engagement</CardLabel>
              <span className="text-xs text-tertiary">past 7 days</span>
            </div>
            <EngagementTable />
            <button className="mt-3 w-full py-2 text-sm text-secondary border border-border rounded-button active:bg-elevated hover:bg-elevated">
              View detailed engagement
            </button>
          </div>
        </div>

        {/* Ideas */}
        <IdeasBacklog />
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-[10px] uppercase tracking-wider text-tertiary font-semibold">{label}</div>
      <MonoNumber className="block mt-1 text-2xl text-primary font-bold">{value}</MonoNumber>
    </div>
  );
}
