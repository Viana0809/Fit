import { Activity } from "lucide-react";
import { formatDateLabel, formatWeight, type WeightEntry } from "@/lib/fitness-data";
import { cn } from "@/lib/utils";

type WeightChartProps = {
  entries: WeightEntry[];
  compact?: boolean;
  className?: string;
};

export function WeightChart({ entries, compact, className }: WeightChartProps) {
  const sortedEntries = [...entries]
    .sort((a, b) => a.date.localeCompare(b.date))
    .slice(-8);
  const weights = sortedEntries.map((entry) => entry.weight);
  const min = Math.min(...weights);
  const max = Math.max(...weights);
  const range = Math.max(max - min, 1);
  const points = sortedEntries.map((entry, index) => {
    const x =
      sortedEntries.length === 1
        ? 50
        : (index / (sortedEntries.length - 1)) * 100;
    const y = 88 - ((entry.weight - min) / range) * 68;

    return { ...entry, x, y };
  });
  const line = points.map((point) => `${point.x},${point.y}`).join(" ");

  if (!entries.length) {
    return (
      <div
        className={cn(
          "flex h-56 items-center justify-center rounded-lg border border-dashed border-white/15 bg-slate-950/45 text-sm text-slate-400",
          className,
        )}
      >
        <Activity className="mr-2 h-4 w-4 text-fit-cyan" />
        Sem registros
      </div>
    );
  }

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-lg border border-white/10 bg-slate-950/45 p-4",
        compact ? "h-48" : "h-72",
        className,
      )}
    >
      <div className="fitness-stripes pointer-events-none absolute inset-0 opacity-25" />
      <svg
        aria-label="Gráfico de evolução de peso"
        className="relative h-full w-full"
        preserveAspectRatio="none"
        role="img"
        viewBox="0 0 100 100"
      >
        <defs>
          <linearGradient id="weightLine" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0%" stopColor="#3dff91" />
            <stop offset="100%" stopColor="#37d5ff" />
          </linearGradient>
          <linearGradient id="weightFill" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#3dff91" stopOpacity="0.22" />
            <stop offset="100%" stopColor="#37d5ff" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path
          d={`M ${points[0]?.x ?? 0} 96 L ${line} L ${
            points[points.length - 1]?.x ?? 100
          } 96 Z`}
          fill="url(#weightFill)"
        />
        <polyline
          fill="none"
          points={line}
          stroke="url(#weightLine)"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="3"
          vectorEffect="non-scaling-stroke"
        />
        {points.map((point) => (
          <g key={point.id}>
            <circle cx={point.x} cy={point.y} fill="#05070a" r="4.2" />
            <circle cx={point.x} cy={point.y} fill="#3dff91" r="2.4" />
          </g>
        ))}
      </svg>
      <div className="pointer-events-none absolute inset-x-4 bottom-3 flex justify-between gap-2 text-[11px] font-medium text-slate-400">
        {points.map((point) => (
          <span key={point.id}>{formatDateLabel(point.date)}</span>
        ))}
      </div>
      <div className="absolute right-4 top-4 rounded-md border border-white/10 bg-black/35 px-3 py-2 text-right">
        <p className="text-xs text-slate-400">Atual</p>
        <p className="text-sm font-semibold text-white">
          {formatWeight(points[points.length - 1]?.weight ?? 0)}
        </p>
      </div>
    </div>
  );
}
