import { TopBar } from "@/components/layout/TopBar";
import { DesktopHeader } from "@/components/layout/DesktopHeader";
import { MonoNumber } from "@/components/shared/MonoNumber";
import { Delta } from "@/components/shared/Delta";
import { CardLabel } from "@/components/shared/Card";
import { LineChart } from "@/components/charts/LineChart";
import { CreditScoreRing } from "@/components/finance/CreditScoreRing";
import { AccountRow } from "@/components/finance/AccountRow";
import { TransactionRow } from "@/components/finance/TransactionRow";
import { BillRow } from "@/components/finance/BillRow";
import { TimeRangePills } from "@/components/finance/TimeRangePills";
import {
  NET_WORTH,
  netWorthSeries,
  CREDIT_SCORE,
  ACCOUNTS,
  UPCOMING_BILLS,
  RECENT_TRANSACTIONS,
} from "@/lib/mock-data";

export default function FinancePage() {
  const billsTotal = UPCOMING_BILLS.reduce((sum, b) => sum + b.amount, 0);
  const todayTx = RECENT_TRANSACTIONS.filter((t) => t.date === "Today");
  const yesterdayTx = RECENT_TRANSACTIONS.filter((t) => t.date === "Yesterday");

  return (
    <div>
      <div className="md:hidden">
        <TopBar title="Finance" />
      </div>
      <DesktopHeader title="Finance" subtitle="Accounts, net worth, credit, bills, transactions." />

      <div className="px-5 md:px-0 pt-5 md:pt-2 space-y-4 md:space-y-6">
        {/* Net Worth + Credit Score row */}
        <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-4 md:gap-6">
          <div className="bg-surface border border-border border-t-2 border-t-finance rounded-card p-5 md:p-6">
            <CardLabel>Net Worth</CardLabel>
            <MonoNumber className="block mt-2 text-[40px] md:text-[52px] leading-none font-bold text-primary">
              ${NET_WORTH.current.toLocaleString()}
            </MonoNumber>
            <div className="mt-2 flex items-center gap-2 text-sm md:text-base">
              <Delta value={NET_WORTH.delta7d} percent={NET_WORTH.deltaPct7d} />
              <span className="text-tertiary">past 7 days</span>
            </div>
            <div className="mt-4 mb-3">
              <TimeRangePills accent="finance" />
            </div>
            <div className="-mx-1">
              <LineChart
                data={netWorthSeries}
                color="rgb(var(--finance))"
                height={180}
                format="currency"
              />
            </div>
          </div>

          {/* Credit Score */}
          <div className="bg-surface border border-border rounded-card p-4 md:p-6">
            <div className="flex items-center justify-between mb-3">
              <CardLabel>Credit Score</CardLabel>
              <span className="text-xs text-tertiary">updated {CREDIT_SCORE.updatedDaysAgo}d ago</span>
            </div>
            <div className="flex items-center gap-6 md:flex-col md:gap-4 md:items-center md:justify-center md:flex-1">
              <CreditScoreRing score={CREDIT_SCORE.score} />
              <div className="flex-1 md:text-center md:flex-none">
                <Delta value={CREDIT_SCORE.delta} prefix="" />
                <div className="text-accent text-sm md:text-base font-semibold mt-1">{CREDIT_SCORE.category}</div>
                <button className="mt-3 text-sm text-secondary active:text-primary hover:text-primary">
                  View history & factors →
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Accounts + Bills side-by-side */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-4 md:gap-6">
          <div className="bg-surface border border-border rounded-card p-4 md:p-6">
            <div className="flex items-center justify-between mb-2">
              <CardLabel>Accounts</CardLabel>
              <span className="text-xs text-tertiary font-mono tabular-nums">{ACCOUNTS.length}</span>
            </div>
            <div>
              {ACCOUNTS.map((a) => (
                <AccountRow
                  key={a.id}
                  name={a.name}
                  classification={a.classification}
                  balance={a.balance}
                  limit={"limit" in a ? a.limit : undefined}
                />
              ))}
            </div>
            <button className="mt-3 w-full py-2 text-sm text-secondary border border-border rounded-button active:bg-elevated hover:bg-elevated">
              View all accounts
            </button>
          </div>

          <div className="bg-surface border border-border rounded-card p-4 md:p-6">
            <div className="flex items-center justify-between mb-2">
              <CardLabel>Upcoming Bills</CardLabel>
              <span className="text-xs text-tertiary">next 7 days</span>
            </div>
            <div className="divide-y divide-border">
              {UPCOMING_BILLS.map((b) => (
                <BillRow key={b.id} {...b} />
              ))}
            </div>
            <div className="mt-3 pt-3 border-t border-border-strong flex items-center justify-between">
              <span className="text-sm text-tertiary">Total</span>
              <MonoNumber className="text-base font-semibold text-primary">
                ${billsTotal.toLocaleString()}
              </MonoNumber>
            </div>
          </div>
        </div>

        {/* Transactions full-width */}
        <div className="bg-surface border border-border rounded-card p-4 md:p-6">
          <CardLabel className="mb-2">Recent Transactions</CardLabel>

          {todayTx.length > 0 && (
            <>
              <div className="mt-3 text-xs font-semibold text-tertiary uppercase tracking-wider">Today</div>
              <div className="divide-y divide-border">
                {todayTx.map((t) => (
                  <TransactionRow key={t.id} {...t} />
                ))}
              </div>
            </>
          )}

          {yesterdayTx.length > 0 && (
            <>
              <div className="mt-3 text-xs font-semibold text-tertiary uppercase tracking-wider">Yesterday</div>
              <div className="divide-y divide-border">
                {yesterdayTx.map((t) => (
                  <TransactionRow key={t.id} {...t} />
                ))}
              </div>
            </>
          )}

          <button className="mt-3 w-full py-2 text-sm text-secondary border border-border rounded-button active:bg-elevated hover:bg-elevated">
            View all transactions
          </button>
        </div>
      </div>
    </div>
  );
}
