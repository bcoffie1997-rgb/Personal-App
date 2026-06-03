import Link from "next/link";
import { Sparkline } from "@/components/charts/Sparkline";
import { Delta } from "@/components/shared/Delta";
import { NET_WORTH, netWorthSeries } from "@/lib/mock-data";

export function HeroNumberCard() {
  return (
    <Link
      href="/finance/net-worth"
      className="block py-6 md:py-8 hover:bg-surface rounded-card -mx-2 px-2 transition-colors"
    >
      <div className="md:flex md:items-end md:justify-between md:gap-8">
        <div className="flex-1 min-w-0">
          <div className="text-xs text-tertiary tracking-wide mb-2">Net worth</div>
          <div className="tabular-nums text-[40px] md:text-[52px] leading-none font-semibold text-primary tracking-tight">
            ${NET_WORTH.current.toLocaleString()}
          </div>
          <div className="mt-3 flex items-center gap-2 text-sm">
            <Delta value={NET_WORTH.delta7d} percent={NET_WORTH.deltaPct7d} />
            <span className="text-tertiary">· past 7 days</span>
          </div>
        </div>
        <div className="mt-4 md:mt-0 md:flex-1 md:max-w-[360px] opacity-80">
          <Sparkline data={netWorthSeries.map((p) => p.value)} height={56} color="rgb(var(--finance))" />
        </div>
      </div>
    </Link>
  );
}
