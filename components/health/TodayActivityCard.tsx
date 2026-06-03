import { TODAY_ACTIVITY } from "@/lib/mock-data";

export function TodayActivityCard() {
  return (
    <div className="bg-surface rounded-card p-5">
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs text-tertiary tracking-wide">Workouts today</span>
      </div>
      <div className="tabular-nums text-2xl font-semibold text-primary">
        {TODAY_ACTIVITY.workouts}
      </div>
      <div className="mt-3 pt-3 border-t border-border">
        <div className="text-sm text-secondary">
          <span className="text-tertiary">Last:</span>{" "}
          <span className="text-primary">{TODAY_ACTIVITY.lastWorkout.type}</span>
          <span className="text-tertiary"> · {TODAY_ACTIVITY.lastWorkout.duration}</span>
        </div>
        <div className="text-xs text-tertiary mt-0.5 tabular-nums">
          {TODAY_ACTIVITY.lastWorkout.time}
        </div>
      </div>
    </div>
  );
}
