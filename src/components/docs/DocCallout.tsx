import React from "react";
import { Info, AlertTriangle, AlertCircle, CheckCircle2, Lightbulb } from "lucide-react";
import { cn } from "@/lib/utils";

type CalloutType = "info" | "warning" | "error" | "success" | "tip" | "mistake";

interface DocCalloutProps {
    type?: CalloutType;
    icon?: any;
    title?: string;
    children: React.ReactNode;
    className?: string;
}

const config: Record<CalloutType, { icon: any; color: string; bg: string; border: string }> = {
    info: {
        icon: Info,
        color: "text-blue-400",
        bg: "bg-blue-500/5",
        border: "border-blue-500/20",
    },
    warning: {
        icon: AlertTriangle,
        color: "text-amber-400",
        bg: "bg-amber-500/5",
        border: "border-amber-500/20",
    },
    error: {
        icon: AlertCircle,
        color: "text-red-400",
        bg: "bg-red-500/5",
        border: "border-red-500/20",
    },
    mistake: {
        icon: AlertCircle,
        color: "text-red-400",
        bg: "bg-red-500/5",
        border: "border-red-500/20",
    },
    success: {
        icon: CheckCircle2,
        color: "text-emerald-400",
        bg: "bg-emerald-500/5",
        border: "border-emerald-500/20",
    },
    tip: {
        icon: Lightbulb,
        color: "text-purple-400",
        bg: "bg-purple-500/5",
        border: "border-purple-500/20",
    },
};

export function DocCallout({ type = "info", icon, title, children, className }: DocCalloutProps) {
    const { icon: ConfigIcon, color, bg, border } = config[type];
    const Icon = icon || ConfigIcon;

    return (
        <div className={cn("p-6 rounded-2xl border flex gap-4 my-8", bg, border, className)}>
            <div className={cn("mt-1 shrink-0", color)}>
                <Icon className="w-5 h-5" />
            </div>
            <div className="space-y-2">
                {title && <h4 className={cn("font-bold text-sm uppercase tracking-wider", color)}>{title}</h4>}
                <div className="text-zinc-400 text-sm leading-relaxed">
                    {children}
                </div>
            </div>
        </div>
    );
}
