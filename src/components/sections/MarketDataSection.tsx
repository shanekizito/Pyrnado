import { cn } from "@/lib/utils";

export function MarketDataSection() {
    const costBars = [
        { label: "Bank Swift", price: "$45", width: "100%", color: "bg-zinc-800/50" },
        { label: "PayPal", price: "$35", width: "78%", color: "bg-zinc-800/50" },
        { label: "Wise", price: "$15", width: "33%", color: "bg-zinc-800/50" },
        { label: "Pyrnado", price: "$2", width: "8%", color: "bg-emerald-500", highlight: true },
    ];

    const years = ["2021", "2022", "2023", "2024", "2025"];

    return (
        <section className="py-24 relative overflow-hidden bg-[#050505]">
            <div className="container mx-auto px-6 lg:px-8 max-w-5xl relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24 items-start">

                    {/* Left Panel: The Inevitable Flip */}
                    <div className="flex flex-col justify-center h-full space-y-8">
                        <div className="space-y-4">
                            <h2 className="text-4xl lg:text-5xl font-bold tracking-tight text-white font-display leading-[1.1]">
                                The Inevitable <br />
                                <span className="text-emerald-400 italic">Flip</span>
                            </h2>
                            <p className="text-base text-zinc-400 leading-relaxed font-light">
                                Traditional banking volume is stagnant. Stablecoin settlement is growing
                                <span className="text-white font-medium"> exponentially</span>, doubling year over year.
                            </p>
                        </div>

                        {/* Chart Card */}
                        <div className="relative w-full aspect-[4/3] rounded-3xl bg-[#0A0A0A] border border-white/5 overflow-hidden shadow-2xl">
                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[length:20px_20px] pointer-events-none" />

                            {/* Line Chart Area */}
                            <div className="relative h-full w-full flex items-end pb-8 px-2">
                                <svg className="w-full h-[70%]" viewBox="0 0 400 150" preserveAspectRatio="none">
                                    <defs>
                                        <linearGradient id="staticGrowthGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                                            <stop offset="0%" stopColor="#34d399" stopOpacity="0.15" /> {/* emerald-400 */}
                                            <stop offset="100%" stopColor="#34d399" stopOpacity="0" />
                                        </linearGradient>
                                    </defs>

                                    {/* Path */}
                                    <path
                                        d="M 0 150 Q 80 140, 150 120 Q 250 80, 400 10"
                                        fill="none"
                                        stroke="#34d399"
                                        strokeWidth="3"
                                        strokeLinecap="round"
                                    />

                                    {/* Fill */}
                                    <path
                                        d="M 0 150 Q 80 140, 150 120 Q 250 80, 400 10 L 400 150 L 0 150 Z"
                                        fill="url(#staticGrowthGradient)"
                                    />

                                    {/* Baseline dotted line */}
                                    <line x1="0" y1="120" x2="400" y2="120" stroke="white" strokeOpacity="0.1" strokeDasharray="4 4" />
                                </svg>

                                {/* Badge */}
                                <div className="absolute top-4 right-4 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full">
                                    <span className="text-[10px] font-bold text-emerald-400 font-mono uppercase tracking-widest">+230% YoY</span>
                                </div>
                            </div>

                            {/* X-Axis Labels */}
                            <div className="absolute bottom-4 inset-x-6 flex justify-between">
                                {years.map((year) => (
                                    <span key={year} className="text-[10px] font-mono font-medium text-zinc-600">
                                        {year}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right Panel: Cost Per $1k Sent */}
                    <div className="bg-[#0A0A0A] rounded-3xl p-8 border border-white/5 shadow-2xl relative overflow-hidden h-full flex flex-col justify-center">
                        <div className="text-center space-y-2 mb-10">
                            <h3 className="text-3xl font-bold text-white font-display">Cost Per $1k Sent</h3>
                            <p className="text-zinc-500 font-medium text-[10px] tracking-[0.2em] uppercase">Comparison of average fees</p>
                        </div>

                        <div className="space-y-5 mb-10">
                            {costBars.map((bar, i) => (
                                <div key={i} className="flex items-center gap-4">
                                    <span className={cn(
                                        "w-20 text-[11px] font-bold transition-colors uppercase tracking-wider text-right",
                                        bar.highlight ? "text-emerald-400" : "text-zinc-500"
                                    )}>
                                        {bar.label}
                                    </span>
                                    <div className="flex-1 h-10 bg-zinc-900/50 rounded-lg overflow-hidden relative border border-white/[0.03]">
                                        <div
                                            style={{ width: bar.width }}
                                            className={cn(
                                                "h-full rounded-lg flex items-center px-3 relative",
                                                bar.highlight ? "bg-emerald-500" : bar.color
                                            )}
                                        >
                                            <span className="text-[11px] font-bold text-white font-mono">
                                                {bar.price}
                                            </span>
                                            {bar.highlight && (
                                                <div className="absolute inset-0 bg-white/10 mix-blend-overlay" />
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="pt-8 border-t border-white/5 text-center">
                            <div className="flex flex-col items-center justify-center">
                                <span className="text-4xl font-black text-white font-display tracking-tight">Save <span className="text-emerald-400">$43</span></span>
                                <span className="text-zinc-500 font-bold text-[10px] tracking-[0.2em] uppercase mt-1">per transaction</span>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
