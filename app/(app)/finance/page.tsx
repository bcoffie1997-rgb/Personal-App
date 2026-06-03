import { TopBar } from "@/components/layout/TopBar";
import { DesktopHeader } from "@/components/layout/DesktopHeader";
import { Delta } from "@/components/shared/Delta";
import { LineChart } from "@/components/charts/LineChart";
import { CreditScoreRing } from "@/components/finance/CreditScoreRing";
import { AccountRow } from "@/components/finance/AccountRow";
import { TransactionRow } from "@/components/finance/TransactionRow";
import { BillRow } from "@/components/finance/BillRow";
import { TimeRangePills } from "@/components/finance/TimeRangePills";
import { SubscriptionsCard } from "@/components/finance/SubscriptionsCard";
import {
  NET_WORTH,
  netWorthSeries,
  CREDIT_SCORE,
  ACCOUNTS,
  UPCOMING_BILLS,
  RECENT_TRANSACTIONS,
} from "@/lib/mock-data";

function SectionHeader({ label }: { label: string }) {
  return (
    <h2 className="text-xs text-tertiary tracking-wide mb-3 mt-2 md:mt-0">{label}</h2>
  );
}

export default function FinancePage() {
  const billsTotal = UPCOMING_BILLS.reduce((sum, b) => sum + b.amount, 0);
  const todayTx = RECENT_TRANSACTIONS.filter((t) => t.date === "Today");
  const yesterdayTx = RECENT_TRANSACTIONS.filter((t) => t.date === "Yesterday");

  return (
    <div>
      <div className="md:hidden">
        <TopBar title="Finance" />
      </div>
      <DesktopHeader title="Finance" subtitle="Accounts, net worth, credit, bills — everything." />

      <div className="px-5 md:px-0 pt-2 md:pt-0 space-y-10 md:space-y-12">
        {/* Net Worth + Credit Score */}
        <section>
          <SectionHeader label="Snapshot" />
          <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-4 md:gap-6">
            <div className="bg-surface rounded-card p-5 md:p-6">
              <div className="flex items-baseline justify-between mb-2">
                <span className="text-xs text-tertiary tracking-wide">Net worth</span>
                <TimeRangePills />
              </div>
              <div className="tabular-nums text-[40px] md:text-[48px] leading-none font-semibold text-primary tracking-tight">
                ${NET_WORTH.current.toLocaleString()}
              </div>
              <div className="mt-2 flex items-center gap-2 text-sm">
                <Delta value={NET_WORTH.delta7d} percent={NET_WORTH.deltaPct7d} />
                <span className="text-tertiary">· past 7 days</span>
              </div>
              <div className="mt-4 -mx-1 opacity-80">
                <LineChart
                  data={netWorthSeries}
                  color="rgb(var(--finance))"
                  height={160}
                  format="currency"
                />
              </div>
            </div>

            {/* Credit Score */}
            <div className="bg-surface rounded-card p-5 md:p-6 flex flex-col">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs text-tertiary tracking-wide">Credit score</span>
                <span className="text-xs text-tertiary">updated {CREDIT_SCORE.updatedDaysAgo}d ago</span>
              </div>
              <div className="flex-1 flex items-center justify-center">
                <CreditScoreRing score={CREDIT_SCORE.score} />
              </div>
              <div className="mt-4 flex items-center justify-between pt-3 border-t border-border">
                <Delta value={CREDIT_SCORE.delta} prefix="" />
                <span className="text-sm text-primary font-medium">{CREDIT_SCORE.category}</span>
              </div>
              <button className="mt-2 text-xs text-tertiary hover:text-secondary text-left">
                View history & factors →
              </button>
            </div>
          </div>
        </section>

        {/* Accounts + Bills side-by-side */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-8 md:gap-10">
          <section>
            <SectionHeader label={`Accounts · ${ACCOUNTS.length}`} />
            <div className="bg-surface rounded-card p-4 md:p-5">
              {ACCOUNTS.map((a) => (
                <AccountRow
                  key={a.id}
                  name={a.name}
                  classification={a.classification}
                  balance={a.balance}
                  limit={"limit" in a ? a.limit : undefined}
                />
              ))}
              <button className="mt-3 w-full py-2 text-sm text-tertiary hover:text-secondary text-center border-t border-border pt-3">
                View all accounts
              </button>
            </div>
          </section>

          <section>
            <SectionHeader label="Upcoming bills · next 7 days" />
            <div className="bg-surface rounded-card p-4 md:p-5">
              <div className="divide-y divide-border">
                {UPCOMING_BILLS.map((b) => (
                  <BillRow key={b.id} {...b} />
                ))}
              </div>
              <div className="mt-3 pt-3 border-t border-border-strong flex items-center justify-between">
                <span className="text-sm text-tertiary">Total</span>
                <span className="tabular-nums text-base font-semibold text-primary">
                  ${billsTotal.toLocaleString()}
                </span>
              </div>
            </div>
          </section>
        </div>

        {/* Subscriptions */}
        <section>
          <SectionHeader label="Recurring · subscriptions" />
          <SubscriptionsCard />
        </section>

        {/* Transactions */}
        <section>
          <SectionHeader label="Recent transactions" />
          <div className="bg-surface rounded-card p-4 md:p-5">
            {todayTx.length > 0 && (
              <>
                <div className="text-[10px] tracking-wide text-tertiary">Today</div>
                <div className="divide-y divide-border">
                  {todayTx.map((t) => (
                    <TransactionRow key={t.id} {...t} />
                  ))}
                </div>
              </>
            )}

            {yesterdayTx.length > 0 && (
              <>
                <div className="mt-3 text-[10px] tracking-wide text-tertiary">Yesterday</div>
                <div className="divide-y divide-border">
                  {yesterdayTx.map((t) => (
                    <TransactionRow key={t.id} {...t} />
                  ))}
                </div>
              </>
            )}

            <button className="mt-3 w-full py-2 text-sm text-tertiary hover:text-secondary text-center border-t border-border pt-3">
              View all transactions
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
