type Props = {
  date: string;
  type: string;
  duration: string;
  calories: number;
  avgHr: number;
};

export function WorkoutRow({ date, type, duration, calories, avgHr }: Props) {
  return (
    <div className="py-3 border-b border-border last:border-b-0">
      <div className="text-sm">
        <span className="text-tertiary">{date}</span>
        <span className="text-tertiary"> · </span>
        <span className="text-primary font-medium">{type}</span>
      </div>
      <div className="mt-1 flex items-center gap-2 text-xs text-tertiary tabular-nums">
        <span>{duration}</span>
        <span>·</span>
        <span>{calories} cal</span>
        <span>·</span>
        <span>{avgHr} avg HR</span>
      </div>
    </div>
  );
}
