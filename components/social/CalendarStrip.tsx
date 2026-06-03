import { cn } from "@/lib/utils";

type DaySchedule = {
  day: string;
  platforms: string[];
};

const platformColor: Record<string, string> = {
  L: "bg-info",
  X: "bg-primary",
  I: "bg-social",
  T: "bg-fitness",
};

export function CalendarStrip({ days }: { days: readonly DaySchedule[] }) {
  return (
    <div className="grid grid-cols-7 gap-2 mt-3">
      {days.map((d) => (
        <div key={d.day} className="flex flex-col items-center">
          <span className="text-[10px] text-tertiary tracking-wide">{d.day}</span>
          <div className="mt-2 flex flex-col items-center gap-1 min-h-[24px]">
            <div className="flex gap-0.5">
              {d.platforms.length > 0 ? (
                d.platforms.map((p, i) => (
                  <span key={i} className={cn("w-1.5 h-1.5 rounded-full", platformColor[p] || "bg-tertiary")} />
                ))
              ) : (
                <span className="text-[10px] text-tertiary">—</span>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
