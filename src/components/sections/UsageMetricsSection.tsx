import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Zap, TrendingUp, DollarSign, Activity } from "lucide-react";

// Rolling Counter Component
const RollingCounter = ({ value, prefix = "", suffix = "" }: { value: number, prefix?: string, suffix?: string }) => {
    const [displayValue, setDisplayValue] = useState(value);

    useEffect(() => {
        // Simulate live updates
        const interval = setInterval(() => {
            setDisplayValue(prev => prev + Math.random() * 10);
        }, 2000);
        return () => clearInterval(interval);
    }, []);

    return (
        <span className="font-mono font-bold text-3xl sm:text-4xl text-foreground">
            {prefix}{displayValue.toLocaleString(undefined, { maximumFractionDigits: 0 })}{suffix}
        </span>
    );
};

// Activity Feed Item
const FeedItem = ({ type, amount, from, to }: { type: string, amount: string, from: string, to: string }) => (
    <motion.div
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5 mb-3"
    >
        <div className="flex items-center gap-3">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${type === 'pay' ? 'bg-accent/20 text-accent' : 'bg-blue-500/20 text-blue-500'}`}>
                {type === 'pay' ? <DollarSign className="w-4 h-4" /> : <Zap className="w-4 h-4" />}
            </div>
            <div>
                <p className="text-xs font-semibold text-foreground">{type === 'pay' ? 'Payroll Payout' : 'Instant Swap'}</p>
                <p className="text-[10px] text-muted-foreground">{from} → {to}</p>
            </div>
        </div>
        <p className="text-sm font-mono font-bold text-foreground">{amount}</p>
    </motion.div>
);

export function UsageMetricsSection() {
    const [feed, setFeed] = useState([
        { id: 1, type: 'pay', amount: '$4,200.00', from: 'USDC', to: 'NGN' },
        { id: 2, type: 'swap', amount: '$150.00', from: 'USDT', to: 'M-Pesa' },
        { id: 3, type: 'pay', amount: '$1,850.50', from: 'USDC', to: 'KES' },
    ]);

    useEffect(() => {
        // Simulate incoming transactions
        const interval = setInterval(() => {
            const types = ['pay', 'swap'];
            const currs = ['NGN', 'KES', 'GHS', 'ZAR'];
            const newTx = {
                id: Date.now(),
                type: types[Math.floor(Math.random() * types.length)],
                amount: `$${(Math.random() * 5000).toFixed(2)}`,
                from: 'USDC',
                to: currs[Math.floor(Math.random() * currs.length)],
            };
            setFeed(prev => [newTx, ...prev.slice(0, 3)]);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    return (
        <section className="py-24 relative overflow-hidden bg-black/40 border-y border-white/5">
            <div className="container mx-auto px-6 lg:px-8">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    {/* Left: Metrics */}
                    <div>
                        <span className="flex items-center gap-2 text-accent font-mono text-sm mb-6 tracking-widest uppercase">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
                            </span>
                            Live Network Activity
                        </span>

                        <h2 className="text-4xl font-bold mb-12">
                            Real-time platform <br />
                            <span className="text-emerald-400">performance</span>
                        </h2>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-12">
                            <div>
                                <p className="text-muted-foreground text-sm uppercase tracking-wider mb-2">Total Volume (24h)</p>
                                <RollingCounter value={8920450} prefix="$" />
                            </div>
                            <div>
                                <p className="text-muted-foreground text-sm uppercase tracking-wider mb-2">Tx Processed</p>
                                <RollingCounter value={14582} />
                            </div>
                            <div>
                                <p className="text-muted-foreground text-sm uppercase tracking-wider mb-2">Avg Settlement</p>
                                <div className="flex items-center gap-2">
                                    <span className="font-mono font-bold text-3xl sm:text-4xl text-accent">2.4s</span>
                                    <TrendingUp className="w-5 h-5 text-accent" />
                                </div>
                            </div>
                            <div>
                                <p className="text-muted-foreground text-sm uppercase tracking-wider mb-2">Fees Saved</p>
                                <RollingCounter value={125000} prefix="$" />
                            </div>
                        </div>

                        <div className="p-4 rounded-xl bg-accent/5 border border-accent/10 flex items-start gap-3">
                            <Activity className="w-5 h-5 text-accent mt-0.5" />
                            <p className="text-sm text-foreground">
                                <span className="font-bold text-accent">Network Status:</span> All systems operational.
                                Polygon PoS and Base Mainnet are experiencing normal congestion levels.
                            </p>
                        </div>
                    </div>

                    {/* Right: Live Feed Visualization */}
                    <div className="relative">
                        {/* Abstract World Map / Globe Canvas placeholder or decorative element */}
                        <div className="absolute inset-0 bg-accent/5 rounded-full blur-3xl opacity-20"></div>

                        <div className="glass-card p-6 relative z-10 min-h-[400px]">
                            <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/5">
                                <h3 className="font-bold text-lg">Live Transactions</h3>
                                <div className="flex gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
                                    <span className="w-1.5 h-1.5 rounded-full bg-yellow-500" />
                                    <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                                </div>
                            </div>

                            <div className="space-y-2 max-h-[350px] overflow-hidden relative">
                                {feed.map((tx) => (
                                    <FeedItem key={tx.id} {...tx} />
                                ))}
                                <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[#0A0A0B] to-transparent pointer-events-none" />
                            </div>

                            {/* Decorative floating elements */}
                            <div className="absolute -right-8 top-1/2 p-4 glass rounded-xl border border-white/10 animate-float-slow hidden md:block">
                                <p className="text-xs text-muted-foreground mb-1">Active Corridor</p>
                                <p className="text-sm font-bold text-foreground">🇺🇸 USD → 🇳🇬 NGN</p>
                            </div>
                            <div className="absolute -left-8 bottom-20 p-4 glass rounded-xl border border-white/10 animate-float hidden md:block">
                                <p className="text-xs text-muted-foreground mb-1">Gas Price</p>
                                <p className="text-sm font-bold text-accent">35 Gwei</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
