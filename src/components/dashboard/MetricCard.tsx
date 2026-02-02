import { LucideIcon, TrendingUp, TrendingDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import InfoTooltip from "./InfoTooltip";

interface MetricCardProps {
    title: string;
    value: string | number;
    icon?: LucideIcon;
    trend?: {
        value: number;
        label?: string;
    };
    subtitle?: string;
    onClick?: () => void;
    className?: string;
    info?: string;
    customIconUrl?: string; // Support for PNG icons
}

export default function MetricCard({
    title,
    value,
    icon: Icon,
    trend,
    subtitle,
    onClick,
    className,
    info,
    customIconUrl
}: MetricCardProps) {
    const isPositiveTrend = trend && trend.value > 0;
    const isNegativeTrend = trend && trend.value < 0;

    return (
        <motion.div
            whileHover={onClick ? { y: -2 } : {}}
            className={cn(
                "premium-card p-4 transition-all",
                onClick && "cursor-pointer hover:border-primary/20",
                className
            )}
            onClick={onClick}
        >
            <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                        <p className="metric-label">
                            {title}
                        </p>
                        {info && <InfoTooltip content={info} />}
                    </div>
                    <h3 className="metric-value text-2xl text-foreground">
                        {value}
                    </h3>
                </div>
                {customIconUrl ? (
                    <div className="icon-3d w-11 h-11 !bg-neutral-950 dark:bg-muted/30 flex items-center justify-center !border-white/10 border dark:border-border">
                        <img src={customIconUrl} alt={title} className="w-6 h-6 object-contain" />
                    </div>
                ) : (
                    Icon && (
                        <div className="icon-3d w-11 h-11 bg-muted/80 dark:bg-muted/30">
                            <Icon className="w-6 h-6" />
                        </div>
                    )
                )}
            </div>

            {(trend || subtitle) && (
                <div className="flex items-center gap-2 flex-wrap mt-1">
                    {trend && (
                        <div className={cn(
                            "flex items-center gap-1 text-xs font-medium",
                            "text-zinc-500 dark:text-zinc-400"
                        )}>
                            {isPositiveTrend && <TrendingUp className="w-3 h-3" />}
                            {isNegativeTrend && <TrendingDown className="w-3 h-3" />}
                            {isPositiveTrend && "+"}
                            {trend.value}%
                            {trend.label && <span className="text-muted-foreground ml-1">{trend.label}</span>}
                        </div>
                    )}
                    {subtitle && (
                        <p className="text-xs text-muted-foreground">
                            {subtitle}
                        </p>
                    )}
                </div>
            )}
        </motion.div>
    );
}
