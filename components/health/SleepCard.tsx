import { Hypnogram } from "@/components/charts/Hypnogram";
import { SLEEP_LAST_NIGHT } from "@/lib/mock-data";

export function SleepCard() {
  return (
    <div className="bg-surface rounded-card p-5">
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs text-tertiary tracking-wide">Last night</span>
        <span className="tabular-nums text-xs text-secondary">Score {SLEEP_LAST_NIGHT.score}</span>
      </div>
      <div className="tabular-nums text-2xl font-semibold text-primary">{SLEEP_LAST_NIGHT.total}</div>
      <div className="mt-4 grid grid-cols-4 gap-2 text-center">
        <StageStat label="Deep" value={SLEEP_LAST_NIGHT.deep} />
        <StageStat label="REM" value={SLEEP_LAST_NIGHT.rem} />
        <StageStat label="Light" value={SLEEP_LAST_NIGHT.light} />
        <StageStat label="Awake" value={SLEEP_LAST_NIGHT.awake} />
      </div>
      <div className="mt-4 px-1">
        <Hypnogram stages={SLEEP_LAST_NIGHT.hypnogram} height={36} />
        <div className="mt-1 flex justify-between text-[10px] text-tertiary tabular-nums">
          <span>11:42 PM</span>
          <span>6:54 AM</span>
        </div>
      </div>
    </div>
  );
}

function StageStat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-[10px] tracking-wide text-tertiary">{label}</div>
      <div className="tabular-nums mt-1 text-xs text-secondary font-medium">{value}</div>
    </div>
  );
}
