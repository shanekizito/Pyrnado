import { cn } from "@/lib/utils";

interface LiquiditySegment {
    label: string;
    value: number;
    color: string;
    bgColor: string; // Tailwind class
}

interface LiquidityBarProps {
    segments: LiquiditySegment[];
    total: number;
    className?: string;
}

export default function LiquidityBar({ segments, total, className }: LiquidityBarProps) {
    return (
        <div className={cn("w-full", className)}>
            {/* The Bar */}
            <div className="flex h-3 w-full overflow-hidden bg-zinc-900 rounded-full mb-6 ring-1 ring-zinc-800">
                {segments.map((segment, index) => {
                    const percentage = (segment.value / total) * 100;
                    if (percentage === 0) return null;

                    return (
                        <div
                            key={index}
                            style={{ width: `${percentage}%` }}
                            className={cn(
                                "h-full border-r border-black/20 last:border-0",
                                segment.bgColor
                            )}
                        />
                    );
                })}
            </div>

            {/* Grid Data Table (4 Columns: Bullet | Label | % | Value) */}
            <div className="grid grid-cols-[auto_1fr_auto_auto] gap-x-4 gap-y-3 items-center">
                {segments.map((segment, index) => (
                    <div key={`row-${index}`} className="contents group">
                        {/* Col 1: Bullet */}
                        <div className={cn("w-2 h-2 rounded-full ring-1 ring-black/50", segment.bgColor)} />

                        {/* Col 2: Label */}
                        <span className="text-[11px] font-medium text-zinc-400 group-hover:text-zinc-200 transition-colors">
                            {segment.label}
                        </span>

                        {/* Col 3: Percentage */}
                        <span className="text-[10px] font-mono text-zinc-600 text-right">
                            {((segment.value / total) * 100).toFixed(0)}%
                        </span>

                        {/* Col 4: Value */}
                        <span className="text-sm font-mono font-medium text-zinc-200 tabular-nums tracking-tight text-right">
                            ${segment.value.toLocaleString()}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}
