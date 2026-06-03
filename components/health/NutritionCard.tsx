import { NUTRITION_TODAY } from "@/lib/mock-data";

function ProgressBar({ value, goal, color = "bg-finance" }: { value: number; goal: number; color?: string }) {
  const pct = Math.min(100, (value / goal) * 100);
  return (
    <div className="h-1 rounded-full bg-elevated overflow-hidden">
      <div className={`h-full ${color} rounded-full transition-all`} style={{ width: `${pct}%` }} />
    </div>
  );
}

export function NutritionCard() {
  const { calories, protein, carbs, fat, meals } = NUTRITION_TODAY;
  return (
    <div className="bg-surface rounded-card p-5">
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs text-tertiary tracking-wide">Nutrition today</span>
        <span className="text-xs text-tertiary tabular-nums">
          {calories.consumed} / {calories.goal} cal
        </span>
      </div>

      {/* Calorie ring/bar */}
      <div className="mb-4">
        <ProgressBar value={calories.consumed} goal={calories.goal} color="bg-finance" />
      </div>

      {/* Macros */}
      <div className="grid grid-cols-3 gap-3 mb-4">
        <Macro name="Protein" value={protein.consumed} goal={protein.goal} unit={protein.unit} color="bg-finance" />
        <Macro name="Carbs" value={carbs.consumed} goal={carbs.goal} unit={carbs.unit} color="bg-warning" />
        <Macro name="Fat" value={fat.consumed} goal={fat.goal} unit={fat.unit} color="bg-fitness" />
      </div>

      {/* Meals */}
      <div className="border-t border-border pt-3">
        <div className="text-[10px] text-tertiary tracking-wide mb-2">Today&apos;s meals</div>
        <ul className="space-y-1">
          {meals.map((m) => (
            <li key={m.id} className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-2 min-w-0">
                <span className="text-secondary w-16 flex-shrink-0">{m.name}</span>
                <span className="text-primary truncate">{m.items}</span>
              </div>
              <span className="tabular-nums text-tertiary ml-2">
                {m.calories > 0 ? `${m.calories} cal` : "—"}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function Macro({ name, value, goal, unit, color }: { name: string; value: number; goal: number; unit: string; color: string }) {
  return (
    <div>
      <div className="flex items-baseline justify-between mb-1">
        <span className="text-[10px] text-tertiary tracking-wide">{name}</span>
        <span className="tabular-nums text-xs text-secondary">
          {value}<span className="text-tertiary">/{goal}{unit}</span>
        </span>
      </div>
      <ProgressBar value={value} goal={goal} color={color} />
    </div>
  );
}
