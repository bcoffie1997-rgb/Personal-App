import { ENGAGEMENT } from "@/lib/mock-data";

export function EngagementTable() {
  return (
    <div>
      <div className="grid grid-cols-[1fr_auto_auto_auto] gap-3 px-1 py-2 text-[10px] tracking-wide text-tertiary">
        <span>Platform</span>
        <span className="text-right">Posts</span>
        <span className="text-right">Impressions</span>
        <span className="text-right">Engaged</span>
      </div>
      <div className="divide-y divide-border">
        {ENGAGEMENT.map((e) => (
          <div key={e.platform} className="grid grid-cols-[1fr_auto_auto_auto] gap-3 px-1 py-2.5 text-sm">
            <span className="text-primary">{e.platform}</span>
            <span className="tabular-nums text-secondary text-right min-w-[40px]">{e.posts}</span>
            <span className="tabular-nums text-secondary text-right min-w-[60px]">
              {e.impressions >= 1000 ? `${(e.impressions / 1000).toFixed(1)}k` : e.impressions}
            </span>
            <span className="tabular-nums text-primary text-right min-w-[60px]">
              {e.engagement.toLocaleString()}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
