"use client";

import { useState } from "react";
import { Activity, Briefcase, Megaphone, Wallet } from "lucide-react";
import { TopBar } from "@/components/layout/TopBar";
import { DesktopHeader } from "@/components/layout/DesktopHeader";
import { PeriodToggle } from "@/components/reports/PeriodToggle";
import { ReportSection, ReportStat, HighlightBlock } from "@/components/reports/ReportSection";
import {
  HEALTH_REPORT,
  FINANCE_REPORT,
  SOCIAL_REPORT,
  WORK_REPORT,
  REPORT_RANGES,
  type ReportPeriod,
} from "@/lib/mock-data";

function fmtSigned(n: number, opts?: { decimals?: number; prefix?: string }) {
  const sign = n > 0 ? "+" : n < 0 ? "-" : "—";
  if (n === 0) return "—";
  const abs = Math.abs(n);
  const num = abs.toLocaleString("en-US", {
    minimumFractionDigits: opts?.decimals ?? 0,
    maximumFractionDigits: opts?.decimals ?? 0,
  });
  return `${sign}${opts?.prefix ?? ""}${num}`;
}

export default function ReportsPage() {
  const [period, setPeriod] = useState<ReportPeriod>("week");
  const range = REPORT_RANGES[period];
  const health = HEALTH_REPORT[period];
  const finance = FINANCE_REPORT[period];
  const social = SOCIAL_REPORT[period];
  const work = WORK_REPORT[period];

  return (
    <div>
      <div className="md:hidden">
        <TopBar title="Reports" />
      </div>
      <DesktopHeader
        title="Reports"
        subtitle="Weekly + monthly roll-ups across every domain."
      />

      <div className="px-5 md:px-0 pt-2 md:pt-0 space-y-6">
        {/* Period toggle + range */}
        <div className="flex items-end justify-between flex-wrap gap-3">
          <PeriodToggle active={period} onChange={setPeriod} />
          <div className="text-xs text-tertiary tabular-nums">
            <span className="text-primary font-medium">{range.current}</span>
            <span className="mx-2">·</span>
            <span>vs {range.previous}</span>
          </div>
        </div>

        {/* Health */}
        <ReportSection icon={Activity} domain="fitness" title="Health" href="/health">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-5">
            <ReportStat
              label="Avg readiness"
              value={health.avgReadiness}
              delta={fmtSigned(health.avgReadinessDelta)}
            />
            <ReportStat
              label="Workouts"
              value={health.workouts}
              delta={fmtSigned(health.workoutsDelta)}
              deltaSuffix={`(${health.workoutMinutes} min total)`}
            />
            <ReportStat
              label="Avg sleep"
              value={health.avgSleep}
              delta={`${health.avgSleepDelta > 0 ? "+" : ""}${health.avgSleepDelta} min`}
            />
            <ReportStat
              label="Weight change"
              value={`${health.weightChange > 0 ? "+" : ""}${health.weightChange} ${health.weightUnit}`}
              delta={health.weightChange < 0 ? "trending down" : "trending up"}
              invertedColor
            />
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-5">
            <ReportStat
              label="Hydration goal hit"
              value={`${health.hydrationHitDays} of ${health.hydrationGoalDays} days`}
            />
            <ReportStat
              label="Avg mood"
              value={`${health.avgMood.toFixed(1)} / 5`}
              delta={fmtSigned(health.moodDelta, { decimals: 1 })}
            />
            <ReportStat
              label="Avg energy"
              value={`${health.avgEnergy.toFixed(1)} / 5`}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-border">
            <HighlightBlock label="Win" text={health.highlight} tone="good" />
            <HighlightBlock label="Watch" text={health.lowlight} tone="watch" />
          </div>
        </ReportSection>

        {/* Finance */}
        <ReportSection icon={Wallet} domain="finance" title="Finance" href="/finance">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-5">
            <ReportStat
              label="Net worth change"
              value={fmtSigned(finance.netWorthDelta, { prefix: "$" })}
              delta={`${finance.netWorthDeltaPct > 0 ? "+" : ""}${finance.netWorthDeltaPct.toFixed(1)}%`}
            />
            <ReportStat
              label="Total spending"
              value={`$${finance.spendingTotal.toLocaleString()}`}
              delta={fmtSigned(finance.spendingDelta, { prefix: "$" })}
              deltaSuffix="vs prev"
              invertedColor
            />
            <ReportStat
              label="Income"
              value={`$${finance.incomeTotal.toLocaleString()}`}
            />
            <ReportStat
              label="Credit score"
              value={finance.creditScore}
              delta={fmtSigned(finance.creditScoreDelta)}
            />
          </div>
          {/* Spending by category */}
          <div className="mb-5">
            <div className="text-[10px] text-tertiary tracking-wide mb-3">Spending by category</div>
            <div className="space-y-2">
              {finance.categories.map((c) => (
                <div key={c.name} className="flex items-center gap-3">
                  <span className="text-xs text-secondary w-32 flex-shrink-0">{c.name}</span>
                  <div className="flex-1 h-1.5 rounded-full bg-elevated overflow-hidden">
                    <div className="h-full bg-finance rounded-full" style={{ width: `${c.pct}%` }} />
                  </div>
                  <span className="text-xs tabular-nums text-secondary w-16 text-right">
                    ${c.value.toLocaleString()}
                  </span>
                  <span className="text-xs tabular-nums text-tertiary w-10 text-right">
                    {c.pct.toFixed(0)}%
                  </span>
                </div>
              ))}
            </div>
          </div>
          {finance.subscriptionsTotal > 0 && (
            <div className="mb-5 text-xs text-tertiary">
              Subscriptions this period:{" "}
              <span className="text-primary tabular-nums font-medium">
                ${finance.subscriptionsTotal.toLocaleString()}
              </span>
            </div>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-border">
            <HighlightBlock label="Win" text={finance.highlight} tone="good" />
            <HighlightBlock label="Watch" text={finance.lowlight} tone="watch" />
          </div>
        </ReportSection>

        {/* Social */}
        <ReportSection icon={Megaphone} domain="social" title="Social" href="/social">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-5">
            <ReportStat
              label="Posts published"
              value={`${social.postsPublished} of ${social.postsPlanned}`}
            />
            <ReportStat
              label="Impressions"
              value={social.impressions.toLocaleString()}
              delta={fmtSigned(social.impressionsDelta)}
            />
            <ReportStat
              label="Engagement"
              value={social.engagement.toLocaleString()}
            />
            <ReportStat
              label="Engagement rate"
              value={`${social.engagementRate}%`}
              delta={fmtSigned(social.engagementRateDelta, { decimals: 1 })}
            />
          </div>

          {/* Best post */}
          <div className="mb-5 p-3 bg-bg rounded-button">
            <div className="text-[10px] text-tertiary tracking-wide mb-1">
              Top post · {social.bestPost.platform}
            </div>
            <div className="text-sm text-primary leading-snug">{social.bestPost.excerpt}</div>
            <div className="mt-1.5 flex items-center gap-3 text-xs tabular-nums text-tertiary">
              <span>{social.bestPost.impressions.toLocaleString()} impressions</span>
              <span>·</span>
              <span>{social.bestPost.engagement.toLocaleString()} engaged</span>
            </div>
          </div>

          {/* Per-platform table */}
          <div className="mb-5">
            <div className="text-[10px] text-tertiary tracking-wide mb-2">By platform</div>
            <div className="grid grid-cols-[1fr_auto_auto_auto] gap-3 text-[10px] uppercase tracking-wider text-tertiary mb-1">
              <span>Platform</span>
              <span className="text-right">Posts</span>
              <span className="text-right">Impressions</span>
              <span className="text-right">Engaged</span>
            </div>
            <div className="divide-y divide-border">
              {social.perPlatform.map((p) => (
                <div key={p.platform} className="grid grid-cols-[1fr_auto_auto_auto] gap-3 py-2 text-sm">
                  <span className="text-primary">{p.platform}</span>
                  <span className="tabular-nums text-secondary text-right min-w-[40px]">{p.posts}</span>
                  <span className="tabular-nums text-secondary text-right min-w-[64px]">
                    {p.impressions.toLocaleString()}
                  </span>
                  <span className="tabular-nums text-primary text-right min-w-[56px]">
                    {p.engagement.toLocaleString()}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-border">
            <HighlightBlock label="Win" text={social.highlight} tone="good" />
            <HighlightBlock label="Watch" text={social.lowlight} tone="watch" />
          </div>
        </ReportSection>

        {/* Work */}
        <ReportSection icon={Briefcase} domain="professional" title="Work" href="/work">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-5">
            <ReportStat
              label="Total revenue"
              value={`$${work.totalRevenue.toLocaleString()}`}
              delta={fmtSigned(work.totalRevenueDelta, { prefix: "$" })}
            />
            <ReportStat
              label="Priorities done"
              value={`${work.prioritiesCompleted} of ${work.prioritiesTotal}`}
            />
          </div>

          {/* Per-business breakdown */}
          <div className="space-y-3">
            {work.businesses.map((b) => (
              <div key={b.name} className="p-3 bg-bg rounded-button">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-sm font-semibold text-primary">{b.name}</span>
                  <div className="flex items-center gap-3 text-xs tabular-nums">
                    {b.revenue > 0 && (
                      <span className="text-secondary">
                        ${b.revenue.toLocaleString()}{" "}
                        <span className={b.revenueDelta >= 0 ? "text-accent" : "text-fitness"}>
                          {b.revenueDelta >= 0 ? "+" : ""}${b.revenueDelta.toLocaleString()}
                        </span>
                      </span>
                    )}
                    <span className="text-tertiary">{b.priorities} priorities done</span>
                  </div>
                </div>
                {b.priorityWins.length > 0 && (
                  <ul className="ml-1 mb-1.5 space-y-0.5">
                    {b.priorityWins.map((w, i) => (
                      <li key={i} className="text-xs text-secondary">
                        <span className="text-accent">✓</span> {w}
                      </li>
                    ))}
                  </ul>
                )}
                <div className="text-xs text-tertiary italic">{b.note}</div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-5 mt-5 border-t border-border">
            <HighlightBlock label="Win" text={work.highlight} tone="good" />
            <HighlightBlock label="Watch" text={work.lowlight} tone="watch" />
          </div>
        </ReportSection>
      </div>
    </div>
  );
}
