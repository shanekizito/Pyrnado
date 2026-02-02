import { motion } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Shield, Zap, Check, Lock, Coins, Activity, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Features() {
    return (
        <div className="bg-[#020202] min-h-screen text-white selection:bg-emerald-500/30">
            <Navbar />

            <main className="pt-32 px-6">
                <div className="container mx-auto max-w-7xl">

                    {/* Header - No Gradients */}
                    <div className="text-center mb-32">
                        <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-6 text-white">
                            Built for <span className="text-emerald-500">speed</span>.
                            <br />
                            Designed for <span className="text-emerald-500">trust</span>.
                        </h1>
                        <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
                            The only platform that combines global payroll, automated escrow, and treasury management into one seamless experience.
                        </p>
                    </div>

                    {/* FEATURE 1: GLOBAL PAYROLL */}
                    <div className="grid lg:grid-cols-2 gap-20 items-center mb-40">
                        <div className="order-2 lg:order-1">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-xs font-bold uppercase tracking-wider mb-6">
                                <Zap className="w-3 h-3" /> Instant Settlement
                            </div>
                            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">Global Payroll in Clicks.</h2>
                            <p className="text-lg text-zinc-400 mb-8 leading-relaxed">
                                Pay your entire international team in stablecoins in seconds. No banks, no waiting, no hidden fees.
                                Real-time settlement to any wallet address.
                            </p>
                            <ul className="space-y-4 mb-8">
                                {["Batch processing for 1000+ employees", "Automated tax compliance", "One-click CSV upload"].map(item => (
                                    <li key={item} className="flex items-center gap-3 text-zinc-300">
                                        <div className="w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-500">
                                            <Check className="w-3 h-3" />
                                        </div>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                            {/* Consistent Button Design */}
                            <Button className="h-14 px-8 rounded-full bg-emerald-500 text-black text-lg font-bold hover:bg-emerald-400 hover:scale-105 transition-all">
                                Start Paying Globally <ArrowRight className="w-5 h-5 ml-2" />
                            </Button>
                        </div>

                        {/* Live Snippet: Payroll with Real Data */}
                        <div className="order-1 lg:order-2 relative group perspective-1000">
                            <div className="absolute inset-0 bg-emerald-500/10 blur-[100px] rounded-full opacity-40" />
                            <div className="relative bg-[#0A0A0A] border border-white/10 rounded-2xl p-6 shadow-2xl transform transition-transform group-hover:rotate-y-2 duration-500">
                                {/* Fake App Header */}
                                <div className="flex items-center justify-between mb-6 border-b border-white/5 pb-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-lg bg-emerald-500/20 flex items-center justify-center">
                                            <Activity className="w-5 h-5 text-emerald-500" />
                                        </div>
                                        <div>
                                            <div className="font-bold">Oct 2025 Payroll</div>
                                            <div className="text-xs text-zinc-500">Batch #9021 • Oct 28, 2025</div>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className="font-bold text-xl">$42,500.00</div>
                                        <div className="text-xs text-emerald-500">Ready to Send</div>
                                    </div>
                                </div>

                                {/* Employee List Animation - Real Data */}
                                <div className="space-y-3 mb-6">
                                    {[
                                        { name: "Sarah Jenkins", role: "Product Design", amount: "$4,200.00", initial: "S" },
                                        { name: "David Chen", role: "Senior Engineer", amount: "$6,500.00", initial: "D" },
                                        { name: "Amara Okeke", role: "Marketing Lead", amount: "$3,800.00", initial: "A" }
                                    ].map((emp, i) => (
                                        <motion.div
                                            key={i}
                                            initial={{ opacity: 0, x: -20 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            transition={{ delay: i * 0.2 }}
                                            className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5 group/item hover:bg-white/10 transition-colors"
                                        >
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center text-xs font-bold text-zinc-400 border border-zinc-700">
                                                    {emp.initial}
                                                </div>
                                                <div>
                                                    <div className="font-bold text-sm text-zinc-200">{emp.name}</div>
                                                    <div className="text-[10px] text-zinc-500">{emp.role}</div>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <div className="font-mono text-sm font-bold text-white">{emp.amount}</div>
                                                <div className="text-[10px] text-emerald-500 font-bold bg-emerald-500/10 px-1.5 rounded inline-block">USDC</div>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>

                                {/* Action Button */}
                                <Button className="w-full bg-emerald-500 hover:bg-emerald-400 text-black font-bold h-12 rounded-xl shadow-lg shadow-emerald-500/20">
                                    Confirm & Send Batch
                                </Button>
                            </div>

                            {/* Floating Success Card */}
                            <motion.div
                                initial={{ scale: 0, opacity: 0 }}
                                whileInView={{ scale: 1, opacity: 1 }}
                                transition={{ delay: 1, type: "spring" }}
                                className="absolute -right-8 -bottom-8 bg-zinc-900 border border-emerald-500/30 p-4 rounded-xl shadow-2xl flex items-center gap-3 z-20"
                            >
                                <div className="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center text-black">
                                    <Check className="w-6 h-6" />
                                </div>
                                <div>
                                    <div className="font-bold text-white">Sent!</div>
                                    <div className="text-xs text-zinc-400">3 txs confirmed</div>
                                </div>
                            </motion.div>
                        </div>
                    </div>

                    {/* FEATURE 2: SMART ESCROW */}
                    <div className="grid lg:grid-cols-2 gap-20 items-center mb-40">
                        {/* Live Snippet: Escrow */}
                        <div className="relative group perspective-1000">
                            <div className="absolute inset-0 bg-blue-500/10 blur-[100px] rounded-full opacity-40" />
                            <div className="relative bg-[#0A0A0A] border border-white/10 rounded-2xl p-6 shadow-2xl transform transition-transform group-hover:-rotate-y-2 duration-500">
                                <div className="flex items-center justify-between mb-8">
                                    <h3 className="font-bold flex items-center gap-2">
                                        <Lock className="w-4 h-4 text-blue-500" /> Smart Contract
                                    </h3>
                                    <div className="text-xs font-mono text-zinc-500">0x8f...3a21</div>
                                </div>

                                <div className="space-y-6 relative">
                                    {/* Connection Line */}
                                    <div className="absolute left-[19px] top-8 bottom-8 w-0.5 bg-zinc-800" />

                                    <motion.div
                                        className="flex items-center gap-4 relative z-10"
                                        initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
                                    >
                                        <div className="w-10 h-10 rounded-full bg-blue-500/20 border-2 border-blue-500 flex items-center justify-center text-blue-500 font-bold text-xs ring-4 ring-[#0A0A0A]">1</div>
                                        <div className="flex-1 p-3 rounded-xl bg-white/5 border border-white/10">
                                            <div className="font-bold text-sm">Funds Locked</div>
                                            <div className="text-xs text-zinc-400">$10,000 USDC deposited</div>
                                        </div>
                                    </motion.div>

                                    <motion.div
                                        className="flex items-center gap-4 relative z-10"
                                        initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.3 }}
                                    >
                                        <div className="w-10 h-10 rounded-full bg-zinc-800 border-2 border-zinc-700 flex items-center justify-center text-zinc-400 font-bold text-xs ring-4 ring-[#0A0A0A]">2</div>
                                        <div className="flex-1 p-3 rounded-xl bg-white/5 border border-white/10 opacity-50">
                                            <div className="font-bold text-sm">Milestone Verified</div>
                                            <div className="text-xs text-zinc-400">Waiting for approval...</div>
                                        </div>
                                    </motion.div>
                                </div>

                                <div className="mt-8 flex gap-3">
                                    <Button variant="outline" className="flex-1 border-red-500/20 text-red-500 hover:bg-red-500/10">Refuse</Button>
                                    <Button className="flex-1 bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-500/20">Approve Release</Button>
                                </div>
                            </div>
                        </div>

                        <div>
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-500 text-xs font-bold uppercase tracking-wider mb-6">
                                <Shield className="w-3 h-3" /> Trustless Security
                            </div>
                            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">Automated Escrow.</h2>
                            <p className="text-lg text-zinc-400 mb-8 leading-relaxed">
                                Protect your funds with programmable smart contracts. Funds are only released when milestones are verified.
                                Perfect for paying freelancers and agencies.
                            </p>
                            <ul className="space-y-4 mb-8">
                                {["Milestone-based release logic", "Dispute resolution mechanisms", "Multi-sig wallet support"].map(item => (
                                    <li key={item} className="flex items-center gap-3 text-zinc-300">
                                        <div className="w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-500">
                                            <Check className="w-3 h-3" />
                                        </div>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                            {/* Consistent Button Design */}
                            <Button className="h-14 px-8 rounded-full bg-blue-500 text-white text-lg font-bold hover:bg-blue-400 hover:scale-105 transition-all">
                                Create Smart Contract <ArrowRight className="w-5 h-5 ml-2" />
                            </Button>
                        </div>
                    </div>

                    {/* FEATURE 3: TREASURY - With Extra Bottom Spacing */}
                    <div className="grid lg:grid-cols-2 gap-20 items-center mb-60"> {/* mb-60 for spacing */}
                        <div className="order-2 lg:order-1">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-500 text-xs font-bold uppercase tracking-wider mb-6">
                                <Coins className="w-3 h-3" /> Yield & Treasury
                            </div>
                            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">Idle Funds Work for You.</h2>
                            <p className="text-lg text-zinc-400 mb-8 leading-relaxed">
                                Don't let capital sit idle. Automatically route unswept funds into safe, low-risk yield protocols.
                                Manage expenses and investments from one dashboard.
                            </p>
                            {/* Consistent Button Design */}
                            <Button className="h-14 px-8 rounded-full bg-amber-500 text-black text-lg font-bold hover:bg-amber-400 hover:scale-105 transition-all">
                                Start Earning Yield <ArrowRight className="w-5 h-5 ml-2" />
                            </Button>
                        </div>

                        {/* Live Snippet: Treasury */}
                        <div className="order-1 lg:order-2 relative group perspective-1000">
                            <div className="absolute inset-0 bg-amber-500/10 blur-[100px] rounded-full opacity-40" />
                            <div className="relative bg-[#0A0A0A] border border-white/10 rounded-2xl p-6 shadow-2xl transform transition-transform group-hover:rotate-y-2 duration-500">
                                <div className="flex gap-4 mb-6">
                                    <div className="flex-1 p-4 rounded-xl bg-gradient-to-br from-zinc-900 to-black border border-zinc-800">
                                        <div className="text-xs text-zinc-500 mb-1">Total Yield</div>
                                        <div className="text-xl font-bold text-amber-500">+4.5% APY</div>
                                    </div>
                                    <div className="flex-1 p-4 rounded-xl bg-gradient-to-br from-zinc-900 to-black border border-zinc-800">
                                        <div className="text-xs text-zinc-500 mb-1">Earnings</div>
                                        <div className="text-xl font-bold text-white">$1,240.50</div>
                                    </div>
                                </div>

                                {/* Fake Graph */}
                                <div className="h-32 w-full flex items-end gap-1">
                                    {[30, 45, 35, 60, 55, 75, 65, 90, 85, 100].map((h, i) => (
                                        <motion.div
                                            key={i}
                                            initial={{ height: 0 }}
                                            whileInView={{ height: `${h}%` }}
                                            transition={{ delay: i * 0.05 }}
                                            className="flex-1 bg-amber-500/20 rounded-t hover:bg-amber-500 transition-colors"
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </main>

            <Footer />
        </div>
    );
}
