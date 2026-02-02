import { useState } from "react";
import { Activity, CheckCircle2, AlertTriangle, Zap } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface ChainStatus {
    name: string;
    status: "healthy" | "degraded" | "down";
    gasPrice?: number;
    latency?: number;
}

interface LiquidityPool {
    name: string;
    tvl: number;
    status: "healthy" | "low";
}

const mockChains: ChainStatus[] = [
    { name: "Ethereum", status: "healthy", gasPrice: 45, latency: 12 },
    { name: "Polygon", status: "healthy", gasPrice: 120, latency: 2 },
    { name: "Arbitrum", status: "degraded", gasPrice: 0.5, latency: 1 },
    { name: "Optimism", status: "healthy", gasPrice: 0.8, latency: 1 },
];

const mockPools: LiquidityPool[] = [
    { name: "USDC/USDT", tvl: 2400000, status: "healthy" },
    { name: "ETH/USDC", tvl: 1200000, status: "healthy" },
    { name: "MATIC/USDC", tvl: 450000, status: "low" },
];

export default function NetworkHealthIndicator() {
    const [isOpen, setIsOpen] = useState(false);

    const overallStatus = mockChains.some(c => c.status === "down")
        ? "down"
        : mockChains.some(c => c.status === "degraded")
            ? "degraded"
            : "healthy";

    const statusColors = {
        healthy: "text-emerald-500 bg-emerald-500/10",
        degraded: "text-amber-500 bg-amber-500/10",
        down: "text-red-500 bg-red-500/10",
    };

    const statusIcons = {
        healthy: CheckCircle2,
        degraded: AlertTriangle,
        down: AlertTriangle,
    };

    const StatusIcon = statusIcons[overallStatus];

    return (
        <Popover open={isOpen} onOpenChange={setIsOpen}>
            <PopoverTrigger asChild>
                <button className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-white/5 hover:bg-white/10 transition-colors border border-white/10">
                    <motion.div
                        animate={overallStatus === "healthy" ? { scale: [1, 1.2, 1] } : {}}
                        transition={{ duration: 2, repeat: Infinity }}
                    >
                        <StatusIcon className={cn("w-3.5 h-3.5", statusColors[overallStatus].split(" ")[0])} />
                    </motion.div>
                    <span className="text-xs font-medium text-zinc-300 hidden sm:inline">
                        {overallStatus === "healthy" ? "All Systems Operational" : overallStatus === "degraded" ? "Network Optimization" : "System Down"}
                    </span>
                </button>
            </PopoverTrigger>
            <PopoverContent
                align="end"
                className="w-80 p-0 bg-[#121212] border-white/10"
            >
                {/* Header */}
                <div className="px-4 py-3 border-b border-white/10">
                    <h3 className="font-semibold text-white flex items-center gap-2">
                        <Activity className="w-4 h-4 text-emerald-500" />
                        Network Health
                    </h3>
                </div>

                {/* Chain Status */}
                <div className="p-4 border-b border-white/10">
                    <p className="text-xs font-medium text-zinc-500 uppercase tracking-wider mb-3">
                        Blockchain Networks
                    </p>
                    <div className="space-y-2">
                        {mockChains.map((chain) => {
                            const ChainIcon = statusIcons[chain.status];
                            return (
                                <div key={chain.name} className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <ChainIcon className={cn("w-3.5 h-3.5", statusColors[chain.status].split(" ")[0])} />
                                        <span className="text-sm text-white">{chain.name}</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-xs text-zinc-500">
                                        {chain.gasPrice !== undefined && (
                                            <span className="flex items-center gap-1">
                                                <Zap className="w-3 h-3" />
                                                {chain.gasPrice} gwei
                                            </span>
                                        )}
                                        {chain.latency !== undefined && (
                                            <span>{chain.latency}ms</span>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Liquidity Pools */}
                <div className="p-4">
                    <p className="text-xs font-medium text-zinc-500 uppercase tracking-wider mb-3">
                        Liquidity Pools
                    </p>
                    <div className="space-y-2">
                        {mockPools.map((pool) => (
                            <div key={pool.name} className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <div className={cn(
                                        "w-1.5 h-1.5 rounded-full",
                                        pool.status === "healthy" ? "bg-emerald-500" : "bg-amber-500"
                                    )} />
                                    <span className="text-sm text-white">{pool.name}</span>
                                </div>
                                <span className="text-xs text-zinc-500">
                                    ${(pool.tvl / 1000000).toFixed(2)}M TVL
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Footer */}
                <div className="px-4 py-2 bg-white/[0.02] border-t border-white/10">
                    <p className="text-xs text-zinc-600">
                        Last updated: Just now
                    </p>
                </div>
            </PopoverContent>
        </Popover>
    );
}
