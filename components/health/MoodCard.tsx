import { MOOD } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

function ScoreBar({ value }: { value: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <span
          key={i}
          className={cn(
            "w-4 h-1.5 rounded-sm",
            i < value ? "bg-secondary" : "bg-elevated"
          )}
        />
      ))}
    </div>
  );
}

export function MoodCard() {
  return (
    <div className="bg-surface rounded-card p-5">
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs text-tertiary tracking-wide">Mood today</span>
        <span className="text-xs text-tertiary">{new Date().toLocaleDateString("en-US", { weekday: "long" })}</span>
      </div>

      <div className="space-y-3">
        <Row label="Mood" score={MOOD.todayMood} />
        <Row label="Energy" score={MOOD.todayEnergy} />
        <Row label="Focus" score={MOOD.todayFocus} />
      </div>

      <div className="mt-4 pt-3 border-t border-border">
        <div className="text-[10px] text-tertiary tracking-wide mb-1.5">Notes</div>
        <div className="text-xs text-secondary leading-relaxed">{MOOD.notes}</div>
      </div>

      <div className="mt-4 pt-3 border-t border-border">
        <div className="text-[10px] text-tertiary tracking-wide mb-2">Past 7 days</div>
        <div className="flex items-end justify-between gap-1">
          {MOOD.series7d.map((d) => (
            <div key={d.day} className="flex-1 flex flex-col items-center gap-1">
              <div className="w-full flex flex-col items-center gap-0.5">
                <span
                  className="w-full rounded-sm bg-secondary/70"
                  style={{ height: `${d.mood * 4}px` }}
                />
                <span
                  className="w-full rounded-sm bg-fitness/60"
                  style={{ height: `${d.energy * 4}px` }}
                />
              </div>
              <span className="text-[10px] text-tertiary tabular-nums">{d.day}</span>
            </div>
          ))}
        </div>
        <div className="mt-2 flex items-center gap-3 text-[10px] text-tertiary">
          <div className="flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-sm bg-secondary/70" />
            <span>Mood</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-sm bg-fitness/60" />
            <span>Energy</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function Row({ label, score }: { label: string; score: number }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-sm text-secondary">{label}</span>
      <div className="flex items-center gap-3">
        <ScoreBar value={score} />
        <span className="tabular-nums text-xs text-tertiary w-6 text-right">{score}/5</span>
      </div>
    </div>
  );
}
