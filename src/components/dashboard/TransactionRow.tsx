import { useState } from "react";
import { LucideIcon, ChevronDown, ChevronUp, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";
import StatusBadge, { StatusType } from "./StatusBadge";
import { motion, AnimatePresence } from "framer-motion";

export interface Transaction {
    id: string;
    type: "payroll" | "escrow" | "remittance" | "treasury" | "deposit";
    description: string;
    amount: number;
    isIncoming: boolean;
    status: StatusType;
    timestamp: string;
    icon: LucideIcon;
    iconColor: string;
    fees?: number;
    chain?: string;
    fxRate?: number;
    fxImpact?: number;
    txHash?: string;
    details?: Record<string, string | number>;
}

interface TransactionRowProps {
    transaction: Transaction;
    expandable?: boolean;
}

export default function TransactionRow({ transaction, expandable = true }: TransactionRowProps) {
    const [isExpanded, setIsExpanded] = useState(false);
    const Icon = transaction.icon;

    return (
        <div className="border-b border-border last:border-0">
            <div
                className={cn(
                    "px-6 py-4 flex items-center justify-between transition-colors",
                    expandable && "cursor-pointer hover:bg-muted/50"
                )}
                onClick={() => expandable && setIsExpanded(!isExpanded)}
            >
                <div className="flex items-center gap-4 flex-1 min-w-0">
                    {/* Icon */}
                    <div className={cn("w-9 h-9 flex-shrink-0 rounded-full flex items-center justify-center", transaction.iconColor)}>
                        <Icon className="w-4 h-4" />
                    </div>

                    {/* Description & Timestamp */}
                    <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                            <p className="text-sm font-medium text-foreground truncate">
                                {transaction.description}
                            </p>
                            <StatusBadge status={transaction.status} showPulse />
                        </div>
                        <div className="flex items-center gap-3 text-xs text-muted-foreground">
                            <span>{transaction.timestamp}</span>
                            {transaction.chain && (
                                <>
                                    <span>•</span>
                                    <span className="text-muted-foreground">{transaction.chain}</span>
                                </>
                            )}
                            {transaction.fees !== undefined && (
                                <>
                                    <span>•</span>
                                    <span>Fee: ${transaction.fees.toFixed(2)}</span>
                                </>
                            )}
                        </div>
                    </div>

                    {/* Amount */}
                    <div className="text-right flex-shrink-0">
                        <p className={cn(
                            "text-sm font-semibold",
                            transaction.isIncoming ? "text-emerald-500" : "text-foreground"
                        )}>
                            {transaction.isIncoming ? "+" : "-"}${Math.abs(transaction.amount).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </p>
                        {transaction.fxImpact !== undefined && (
                            <p className="text-xs text-muted-foreground">
                                FX: {transaction.fxImpact > 0 ? "+" : ""}{transaction.fxImpact.toFixed(2)}%
                            </p>
                        )}
                    </div>

                    {/* Expand Icon */}
                    {expandable && (
                        <div className="flex-shrink-0 ml-2">
                            {isExpanded ? (
                                <ChevronUp className="w-4 h-4 text-muted-foreground" />
                            ) : (
                                <ChevronDown className="w-4 h-4 text-muted-foreground" />
                            )}
                        </div>
                    )}
                </div>
            </div>

            {/* Expanded Details */}
            <AnimatePresence>
                {isExpanded && expandable && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                    >
                        <div className="px-6 pb-4 pt-2 bg-muted/30 border-t border-border">
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                                <div>
                                    <p className="text-muted-foreground text-xs mb-1">Transaction ID</p>
                                    <p className="text-foreground font-mono text-xs">{transaction.id}</p>
                                </div>

                                {transaction.txHash && (
                                    <div>
                                        <p className="text-muted-foreground text-xs mb-1">Blockchain TX</p>
                                        <a
                                            href={`#`}
                                            className="text-emerald-500 hover:text-emerald-400 font-mono text-xs flex items-center gap-1"
                                            onClick={(e) => e.stopPropagation()}
                                        >
                                            {transaction.txHash.slice(0, 10)}...
                                            <ExternalLink className="w-3 h-3" />
                                        </a>
                                    </div>
                                )}

                                {transaction.fxRate && (
                                    <div>
                                        <p className="text-muted-foreground text-xs mb-1">FX Rate</p>
                                        <p className="text-foreground">{transaction.fxRate.toFixed(4)}</p>
                                    </div>
                                )}

                                {transaction.details && Object.entries(transaction.details).map(([key, value]) => (
                                    <div key={key}>
                                        <p className="text-muted-foreground text-xs mb-1">{key}</p>
                                        <p className="text-foreground">{value}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
