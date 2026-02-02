import { Copy, RefreshCw, ChevronDown, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";

export function BalanceDisplay() {
    return (
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
            <div>
                <div className="flex items-center gap-2 text-zinc-400 text-xs font-medium mb-1">
                    <div className="w-4 h-4 rounded-full bg-zinc-800 flex items-center justify-center">
                        <span className="w-1.5 h-1.5 rounded-full border border-white" />
                    </div>
                    <span>Main Wallet</span>
                    <span className="text-zinc-600">/</span>
                    <span>Total Balance</span>
                </div>

                <div className="flex items-baseline gap-3">
                    <h1 className="text-4xl font-bold text-white tracking-tight">
                        $47,590.00
                    </h1>
                    <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-xs font-bold">
                        <TrendingUp className="w-3 h-3" />
                        +$1,240 (Yield)
                    </div>
                </div>
            </div>

            <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#121212] border border-white/5 text-xs font-medium text-zinc-300 hover:bg-white/5 cursor-pointer transition-colors">
                    <span className="w-3.5 h-3.5 rounded-full bg-orange-500 flex items-center justify-center text-[6px] font-bold text-black">₿</span>
                    Bitcoin (BTC)
                    <ChevronDown className="w-3 h-3 ml-1 text-zinc-500" />
                </div>
                <div className="text-right mr-2 hidden md:block">
                    <div className="text-[10px] text-zinc-500 uppercase tracking-wider">Wallet Address</div>
                    <div className="flex items-center gap-1 text-xs font-mono text-zinc-300">
                        0x760...892
                        <Copy className="w-3 h-3 text-zinc-500 hover:text-white cursor-pointer" />
                    </div>
                </div>
                <Button size="icon" className="rounded-full bg-emerald-500 hover:bg-emerald-400 text-black h-9 w-9">
                    <RefreshCw className="w-4 h-4" />
                </Button>
            </div>
        </div>
    );
}
