type Props = {
  value: number;
  min?: number;
  max?: number;
  size?: number;
  strokeWidth?: number;
  color?: string;
  trackColor?: string;
  label?: React.ReactNode;
  sublabel?: React.ReactNode;
};

export function ArcGauge({
  value,
  min = 0,
  max = 100,
  size = 200,
  strokeWidth = 14,
  color = "rgb(var(--accent))",
  trackColor = "rgb(var(--bg-elevated))",
  label,
  sublabel,
}: Props) {
  const radius = (size - strokeWidth) / 2;
  const center = size / 2;
  // Arc spans 270 degrees (135° to 405°). Start at bottom-left, end at bottom-right.
  const arcSpan = 270;
  const startAngle = 135;
  const pct = Math.max(0, Math.min(1, (value - min) / (max - min)));

  const polar = (angle: number) => {
    const rad = (angle * Math.PI) / 180;
    return {
      x: center + radius * Math.cos(rad),
      y: center + radius * Math.sin(rad),
    };
  };

  const start = polar(startAngle);
  const fullEnd = polar(startAngle + arcSpan);
  const valueEnd = polar(startAngle + arcSpan * pct);
  const largeArc = arcSpan * pct > 180 ? 1 : 0;
  const fullLargeArc = arcSpan > 180 ? 1 : 0;

  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <path
          d={`M ${start.x} ${start.y} A ${radius} ${radius} 0 ${fullLargeArc} 1 ${fullEnd.x} ${fullEnd.y}`}
          fill="none"
          stroke={trackColor}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
        />
        {pct > 0 && (
          <path
            d={`M ${start.x} ${start.y} A ${radius} ${radius} 0 ${largeArc} 1 ${valueEnd.x} ${valueEnd.y}`}
            fill="none"
            stroke={color}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
          />
        )}
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        {label}
        {sublabel && <div className="mt-1">{sublabel}</div>}
      </div>
    </div>
  );
}
