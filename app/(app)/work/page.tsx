"use client";

import { useState } from "react";
import { TopBar } from "@/components/layout/TopBar";
import { DesktopHeader } from "@/components/layout/DesktopHeader";
import { CardLabel } from "@/components/shared/Card";
import { BusinessSwitcher } from "@/components/work/BusinessSwitcher";
import { BusinessRollupRow } from "@/components/work/BusinessRollupRow";
import { KpiTile } from "@/components/work/KpiTile";
import { PriorityRow } from "@/components/work/PriorityRow";
import { BUSINESSES } from "@/lib/mock-data";
import { ChevronDown } from "lucide-react";

type Tab = string;

export default function WorkPage() {
  const [active, setActive] = useState<Tab>("all");
  const [notesOpen, setNotesOpen] = useState(false);
  const business = BUSINESSES.find((b) => b.slug === active);

  return (
    <div>
      <div className="md:hidden">
        <TopBar title="Work" />
      </div>
      <DesktopHeader title="Work" subtitle="GCG · EVC · Quadratic — KPIs, priorities, and activity." />

      <div className="px-5 md:px-0 pt-5 md:pt-2 space-y-4 md:space-y-6">
        <div className="md:max-w-xl">
          <BusinessSwitcher
            businesses={BUSINESSES.map((b) => ({ slug: b.slug, name: b.name.toUpperCase() }))}
            active={active}
            onChange={setActive}
          />
        </div>

        {active === "all" ? (
          <div className="bg-surface border border-border border-t-2 border-t-professional rounded-card p-4 md:p-6">
            <CardLabel className="mb-2">Roll-up</CardLabel>
            <div className="lg:grid lg:grid-cols-3 lg:gap-4 lg:divide-x lg:divide-border">
              {BUSINESSES.map((b, i) => (
                <div key={b.slug} className={i > 0 ? "lg:pl-4" : ""}>
                  <BusinessRollupRow
                    name={b.name}
                    status={b.status}
                    trend={b.trend}
                    summary={b.summary}
                    detail={b.pipelineLabel}
                    pipelineFilled={"pipelineFilled" in b ? b.pipelineFilled : undefined}
                    onClick={() => setActive(b.slug)}
                  />
                </div>
              ))}
            </div>
          </div>
        ) : business ? (
          <>
            {/* KPI Tiles — 2x2 mobile, 4-up desktop */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
              {business.kpis.map((k) => (
                <KpiTile key={k.name} {...k} />
              ))}
            </div>

            {/* Priorities + Activity side-by-side on desktop */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
              <div className="bg-surface border border-border rounded-card p-4 md:p-6">
                <CardLabel className="mb-2">Priorities</CardLabel>
                <div>
                  {business.priorities.map((p) => (
                    <PriorityRow
                      key={p.id}
                      title={p.title}
                      due={p.due}
                      initiallyDone={p.done}
                    />
                  ))}
                </div>
                <button className="mt-2 w-full py-2 text-sm text-secondary border border-border rounded-button active:bg-elevated hover:bg-elevated">
                  + Add priority
                </button>
              </div>

              <div className="bg-surface border border-border rounded-card p-4 md:p-6">
                <CardLabel className="mb-2">Recent</CardLabel>
                <ul className="divide-y divide-border">
                  {business.activity.map((a) => (
                    <li key={a.id} className="py-3 flex items-start gap-3">
                      <span className="text-base flex-shrink-0">{a.icon}</span>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm text-primary">{a.title}</div>
                        <div className="text-xs text-tertiary mt-0.5">{a.subtitle}</div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Notes & Decisions */}
            <button
              type="button"
              onClick={() => setNotesOpen((v) => !v)}
              className="w-full bg-surface border border-border rounded-card p-4 md:p-6 flex items-center justify-between active:bg-elevated hover:bg-elevated/40"
            >
              <div className="flex items-center gap-3">
                <CardLabel>Notes &amp; Decisions</CardLabel>
                <span className="text-xs text-tertiary font-mono">5</span>
              </div>
              <ChevronDown className={`w-4 h-4 text-tertiary transition-transform ${notesOpen ? "rotate-180" : ""}`} />
            </button>

            {notesOpen && (
              <div className="bg-surface border border-border rounded-card p-4 md:p-6 -mt-2">
                <div className="text-sm text-tertiary italic">
                  No notes yet. Add one via the FAB.
                </div>
              </div>
            )}
          </>
        ) : null}
      </div>
    </div>
  );
}
