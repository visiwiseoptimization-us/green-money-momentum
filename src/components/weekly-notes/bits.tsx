import type { Bias, Direction } from "@/lib/weekly-notes";

export const BIAS_STYLES: Record<Bias, string> = {
  Bullish: "bg-brand-green/15 text-brand-green-bright border-brand-green/40",
  Bearish: "bg-brand-red/15 text-brand-red border-brand-red/40",
  Neutral: "bg-brand-silver/10 text-brand-silver border-brand-silver/30",
};

export function BiasPill({ bias, size = "md" }: { bias: Bias; size?: "sm" | "md" }) {
  const sizeClass = size === "sm" ? "px-2.5 py-0.5 text-[11px]" : "px-3 py-1 text-xs";
  return (
    <span className={`rounded-full border font-semibold ${sizeClass} ${BIAS_STYLES[bias]}`}>
      {bias}
    </span>
  );
}

export function ConfidenceMeter({ value }: { value: number }) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-[11px] font-medium uppercase tracking-wide text-muted">Conviction</span>
      <div className="flex items-center gap-1">
        {Array.from({ length: 5 }).map((_, i) => (
          <span
            key={i}
            className={`h-1.5 w-4 rounded-full ${
              i < value ? "bg-brand-green-bright" : "bg-border"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

const DIRECTION_STYLES: Record<Direction, { icon: string; className: string }> = {
  up: { icon: "▲", className: "text-brand-green-bright" },
  down: { icon: "▼", className: "text-brand-red" },
  watch: { icon: "●", className: "text-brand-silver" },
};

export function DirectionTag({ direction }: { direction: Direction }) {
  const style = DIRECTION_STYLES[direction];
  return <span className={`text-xs ${style.className}`}>{style.icon}</span>;
}

export function formatNoteDate(iso: string) {
  return new Date(`${iso}T00:00:00`).toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}
