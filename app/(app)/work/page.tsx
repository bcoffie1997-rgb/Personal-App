"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { TopBar } from "@/components/layout/TopBar";
import { DesktopHeader } from "@/components/layout/DesktopHeader";
import { BusinessSwitcher } from "@/components/work/BusinessSwitcher";
import { BusinessRollupRow } from "@/components/work/BusinessRollupRow";
import { KpiTile } from "@/components/work/KpiTile";
import { PriorityRow } from "@/components/work/PriorityRow";
import { BUSINESSES } from "@/lib/mock-data";

function SectionHeader({ label }: { label: string }) {
  return (
    <h2 className="text-xs text-tertiary tracking-wide mb-3 mt-2 md:mt-0">{label}</h2>
  );
}

export default function WorkPage() {
  const [active, setActive] = useState<string>("all");
  const [notesOpen, setNotesOpen] = useState(false);
  const business = BUSINESSES.find((b) => b.slug === active);

  return (
    <div>
      <div className="md:hidden">
        <TopBar title="Work" />
      </div>
      <DesktopHeader title="Work" subtitle="GCG · EVC · Serving — one view across all three." />

      <div className="px-5 md:px-0 pt-2 md:pt-0 space-y-8 md:space-y-10">
        <BusinessSwitcher
          businesses={BUSINESSES.map((b) => ({ slug: b.slug, name: b.name }))}
          active={active}
          onChange={setActive}
        />

        {active === "all" ? (
          <section>
            <SectionHeader label="Roll-up" />
            <div className="bg-surface rounded-card p-2">
              {BUSINESSES.map((b) => (
                <BusinessRollupRow
                  key={b.slug}
                  name={b.name}
                  status={b.status}
                  trend={b.trend}
                  summary={b.summary}
                  detail={b.pipelineLabel}
                  pipelineFilled={"pipelineFilled" in b ? b.pipelineFilled : undefined}
                  onClick={() => setActive(b.slug)}
                />
              ))}
            </div>
          </section>
        ) : business ? (
          <>
            {/* KPI Tiles — 2x2 mobile, 4-up desktop */}
            <section>
              <SectionHeader label="KPIs" />
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
                {business.kpis.map((k) => (
                  <KpiTile key={k.name} {...k} />
                ))}
              </div>
            </section>

            {/* Priorities + Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-10">
              <section>
                <SectionHeader label="Priorities" />
                <div className="bg-surface rounded-card p-4">
                  {business.priorities.map((p) => (
                    <PriorityRow
                      key={p.id}
                      title={p.title}
                      due={p.due}
                      initiallyDone={p.done}
                    />
                  ))}
                  <button className="mt-3 w-full py-2 text-sm text-tertiary hover:text-secondary text-center border-t border-border pt-3">
                    + Add priority
                  </button>
                </div>
              </section>

              <section>
                <SectionHeader label="Recent activity" />
                <div className="bg-surface rounded-card p-4">
                  <ul className="space-y-0">
                    {business.activity.map((a, i) => (
                      <li
                        key={a.id}
                        className={`py-3 flex items-start gap-3 ${i < business.activity.length - 1 ? "border-b border-border" : ""}`}
                      >
                        <span className="text-base flex-shrink-0">{a.icon}</span>
                        <div className="flex-1 min-w-0">
                          <div className="text-sm text-primary leading-snug">{a.title}</div>
                          <div className="text-xs text-tertiary mt-0.5">{a.subtitle}</div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </section>
            </div>

            {/* Notes & Decisions */}
            <section>
              <button
                type="button"
                onClick={() => setNotesOpen((v) => !v)}
                className="w-full bg-surface rounded-card p-4 flex items-center justify-between hover:bg-elevated transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className="text-xs text-tertiary tracking-wide">Notes &amp; decisions</span>
                  <span className="text-xs text-tertiary tabular-nums">5</span>
                </div>
                <ChevronDown className={`w-4 h-4 text-tertiary transition-transform ${notesOpen ? "rotate-180" : ""}`} />
              </button>

              {notesOpen && (
                <div className="bg-surface rounded-card p-4 mt-2">
                  <div className="text-sm text-tertiary italic">
                    No notes yet. Add one via the quick action menu.
                  </div>
                </div>
              )}
            </section>
          </>
        ) : null}
      </div>
    </div>
  );
}
