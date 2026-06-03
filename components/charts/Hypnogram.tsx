type Props = {
  stages: number[]; // 0=awake, 1=light, 2=deep, 3=rem
  height?: number;
};

// Map stage values to row positions (rendered top-to-bottom).
// Visual order from top to bottom: Awake, REM, Light, Deep
const stageY = (stage: number) => {
  switch (stage) {
    case 0: return 0; // awake — top
    case 3: return 1; // rem
    case 1: return 2; // light
    case 2: return 3; // deep — bottom
    default: return 2;
  }
};

const stageColor = (stage: number) => {
  switch (stage) {
    case 0: return "rgb(var(--warning))";
    case 3: return "rgb(var(--social))";
    case 1: return "rgb(var(--text-secondary))";
    case 2: return "rgb(var(--info))";
    default: return "rgb(var(--text-tertiary))";
  }
};

export function Hypnogram({ stages, height = 50 }: Props) {
  const width = 100;
  const segWidth = width / stages.length;
  const rowHeight = height / 4;

  return (
    <svg
      width="100%"
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      preserveAspectRatio="none"
      className="block"
    >
      {stages.map((stage, i) => {
        const y = stageY(stage) * rowHeight;
        return (
          <rect
            key={i}
            x={i * segWidth}
            y={y}
            width={segWidth * 1.02}
            height={rowHeight * 0.85}
            fill={stageColor(stage)}
            opacity={0.85}
            rx={0.5}
          />
        );
      })}
    </svg>
  );
}
