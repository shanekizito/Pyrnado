import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

export type StatusType =
    | "settled"
    | "pending"
    | "flagged"
    | "processing"
    | "completed"
    | "failed"
    | "draft"
    | "active"
    | "inactive"
    | "approved"
    | "rejected"
    | "disputed"
    | "cancelled"
    | "verified";

interface StatusBadgeProps {
    status: StatusType;
    label?: string;
    showPulse?: boolean;
    className?: string;
}

const statusConfig: Record<StatusType, { color: string; bgColor: string; label: string }> = {
    settled: {
        color: "text-zinc-700 dark:text-zinc-300",
        bgColor: "bg-zinc-100 dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700",
        label: "Settled"
    },
    completed: {
        color: "text-zinc-700 dark:text-zinc-300",
        bgColor: "bg-zinc-100 dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700",
        label: "Completed"
    },
    approved: {
        color: "text-zinc-700 dark:text-zinc-300",
        bgColor: "bg-zinc-100 dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700",
        label: "Approved"
    },
    active: {
        color: "text-zinc-700 dark:text-zinc-300",
        bgColor: "bg-zinc-100 dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700",
        label: "Active"
    },
    verified: {
        color: "text-zinc-700 dark:text-zinc-300",
        bgColor: "bg-zinc-100 dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700",
        label: "Verified"
    },
    pending: {
        color: "text-zinc-500 dark:text-zinc-400",
        bgColor: "bg-zinc-50 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800",
        label: "Pending"
    },
    processing: {
        color: "text-zinc-500 dark:text-zinc-400",
        bgColor: "bg-zinc-50 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800",
        label: "Processing"
    },
    flagged: {
        color: "text-zinc-900 dark:text-zinc-100",
        bgColor: "bg-zinc-200 dark:bg-zinc-800 border-zinc-300 dark:border-zinc-700",
        label: "Flagged"
    },
    disputed: {
        color: "text-zinc-900 dark:text-zinc-100",
        bgColor: "bg-zinc-200 dark:bg-zinc-800 border-zinc-300 dark:border-zinc-700",
        label: "Disputed"
    },
    failed: {
        color: "text-zinc-900 dark:text-zinc-100",
        bgColor: "bg-zinc-200 dark:bg-zinc-800 border-zinc-300 dark:border-zinc-700",
        label: "Failed"
    },
    rejected: {
        color: "text-zinc-900 dark:text-zinc-100",
        bgColor: "bg-zinc-200 dark:bg-zinc-800 border-zinc-300 dark:border-zinc-700",
        label: "Rejected"
    },
    draft: {
        color: "text-zinc-400 dark:text-zinc-500",
        bgColor: "bg-zinc-50 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 border-dashed",
        label: "Draft"
    },
    cancelled: {
        color: "text-zinc-400 dark:text-zinc-500",
        bgColor: "bg-zinc-50 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800",
        label: "Cancelled"
    },
    inactive: {
        color: "text-zinc-400 dark:text-zinc-500",
        bgColor: "bg-zinc-50 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800",
        label: "Inactive"
    }
};

export default function StatusBadge({ status, label, showPulse = false, className }: StatusBadgeProps) {
    const config = statusConfig[status];
    const displayLabel = label || config.label;

    return (
        <div className={cn("relative inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md border text-xs font-medium", config.bgColor, config.color, className)}>
            {showPulse && (status === "pending" || status === "processing" || status === "active" || status === "settled") && (
                <span
                    className={cn("w-1.5 h-1.5 rounded-full", config.color.replace("text-", "bg-"))}
                />
            )}
            {displayLabel}
        </div>
    );
}
