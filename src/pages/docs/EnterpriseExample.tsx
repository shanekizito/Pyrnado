import { DocCallout } from "@/components/docs/DocCallout";
import { CodeWindow } from "@/components/docs/CodeWindow";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Code, ShieldCheck, Zap, Globe, Rocket, Layers, CheckCircle,
    ArrowRight, MessageSquare, TrendingUp, Lock, Users, Laptop, Server,
    Coins, Scale, Workflow, Terminal, Network, Shield
} from "lucide-react";

export default function EnterpriseExample() {
    return (
        <div className="max-w-5xl mx-auto space-y-16 animate-in fade-in duration-700 pb-32 pt-10 px-4 sm:px-0">
            {/* Massive Hero Section */}
            <div className="relative space-y-6 text-center py-20 bg-gradient-to-b from-white/[0.03] to-transparent rounded-[3rem] border border-white/5 overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_0%,rgba(16,185,129,0.1)_0%,transparent_50%)]" />
                <Badge className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20 px-4 py-1.5 text-xs font-bold uppercase tracking-widest relative z-10">
                    Billion-Dollar Scale Case Study
                </Badge>
                <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-white relative z-10">
                    The <span className="text-emerald-500">Gigalith</span> Architecture
                </h1>
                <p className="text-xl text-zinc-400 max-w-2xl mx-auto leading-relaxed relative z-10">
                    How the world's fastest-growing delivery marketplace uses Pyrnado to onboard 50,000+ workers and manage $500M+ in monthly liquidity across 22 countries.
                </p>
            </div>

            {/* Context Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <div className="space-y-6">
                    <h2 className="text-3xl font-bold text-white tracking-tight">The Challenge</h2>
                    <p className="text-zinc-400 leading-relaxed text-lg">
                        In 2024, <strong>Gigalith</strong> faced a massive scaling bottleneck. As they expanded into Southeast Asia and Latin America, they were hit with three critical issues:
                    </p>
                    <ul className="space-y-4">
                        {[
                            { t: "Compliance Friction", d: "KYC onboarding was taking 48-72 hours per courier, stalling growth.", icon: Shield },
                            { t: "Currency Volatility", d: "Payouts in local currencies were losing up to 4% value due to poor FX rates.", icon: TrendingUp },
                            { t: "Trust Gaps", d: "Merchants were hesitant to ship goods without guaranteed payout protection.", icon: Lock }
                        ].map((item, i) => (
                            <li key={i} className="flex gap-4 p-4 bg-zinc-900/50 border border-white/5 rounded-2xl group transition-colors hover:bg-zinc-900/80">
                                <item.icon className="w-5 h-5 text-emerald-500 shrink-0 mt-1" />
                                <div>
                                    <h4 className="font-bold text-white">{item.t}</h4>
                                    <p className="text-sm text-zinc-500">{item.d}</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="relative aspect-square">
                    <div className="absolute inset-0 bg-emerald-500/10 blur-[100px] rounded-full" />
                    <div className="relative bg-zinc-900 border border-white/10 rounded-3xl p-8 h-full flex flex-col justify-center gap-8 shadow-2xl">
                        <div className="p-6 bg-black/40 border border-white/5 rounded-2xl space-y-4 transform hover:-translate-y-2 transition-transform cursor-pointer">
                            <div className="flex justify-between items-center text-xs text-zinc-600 font-mono uppercase">
                                <span>Real-time Stats</span>
                                <Badge className="bg-emerald-500/20 text-emerald-400 text-[8px] h-4">LIVE</Badge>
                            </div>
                            <div className="text-4xl font-bold text-white">$512,402,110.00</div>
                            <div className="text-xs text-zinc-500 font-medium">Total Monthly Volume processed via Pyrnado</div>
                        </div>
                        <div className="flex gap-4">
                            <div className="flex-1 p-6 bg-emerald-500/5 border border-emerald-500/10 rounded-2xl text-center">
                                <div className="text-3xl font-bold text-emerald-400">99.9%</div>
                                <div className="text-[10px] text-zinc-600 uppercase font-bold tracking-widest mt-1">Uptime</div>
                            </div>
                            <div className="flex-1 p-6 bg-blue-500/5 border border-blue-500/10 rounded-2xl text-center">
                                <div className="text-3xl font-bold text-blue-400">&lt; 3s</div>
                                <div className="text-[10px] text-zinc-600 uppercase font-bold tracking-widest mt-1">Settlement</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Stage 1: Mass Onboarding */}
            <div className="space-y-8 pt-12 border-t border-white/5">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-400 font-bold border border-emerald-500/20">1</div>
                    <div>
                        <h3 className="text-2xl font-bold text-white">Automated Workforce Onboarding</h3>
                        <p className="text-zinc-500">How Gigalith scaled to 5,000 new couriers per week.</p>
                    </div>
                </div>
                <p className="text-zinc-400 leading-relaxed max-w-3xl">
                    Instead of a manual back-office, Gigalith integrated the <a href="/docs/api/payroll/worker-onboarding" className="text-emerald-500 hover:underline">Worker Onboarding API</a>. They used a "Compliance-First" logic where the app automatically generates a non-custodial wallet ONLY after the liveness check (Facial Match) is verified.
                </p>

                <DocCallout icon={ShieldCheck} title="Identity Gating Logic">
                    Gigalith uses <code>strictMode: true</code>. This ensures that no funds can ever even be <em>quoted</em> for a specific recipient if their compliance status has moved from <code>verified</code> to <code>flagged</code>.
                </DocCallout>

                <CodeWindow
                    title="onboarding-flow.ts"
                    code={`// Integrated into Gigalith Driver App (Background Process)
async function setupCourierProfile(driverData) {
  // 1. Submit for Global KYC
  const worker = await pyrnado.workers.create({
    ...driverData,
    compliance_tier: 'logistics_plus',
    auto_generate_wallet: true 
  });

  // 2. Poll for Status (or wait for webhook)
  if (worker.status === 'verified') {
     console.log(\`Courier account active: \${worker.wallet_address}\`);
     await sendWelcomeEmail(worker.id);
  }
}`}
                />
            </div>

            {/* Stage 2: Merchant Payout Protection */}
            <div className="space-y-8 pt-12 border-t border-white/5">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-purple-500/10 flex items-center justify-center text-purple-400 font-bold border border-purple-500/20">2</div>
                    <div>
                        <h3 className="text-2xl font-bold text-white tracking-tight">Securing the Merchant Layer</h3>
                        <p className="text-zinc-500">Building trust between 1,200 local restaurants and a global platform.</p>
                    </div>
                </div>
                <p className="text-zinc-400 leading-relaxed max-w-3xl">
                    Gigalith implemented <a href="/docs/api/escrow/milestones" className="text-purple-400 hover:underline">Escrow Milestones</a> for merchant orders. When a customer places a $100 order, funds are instantly deposited into a Pyrnado Escrow Contract.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                        <div className="flex items-center gap-3 text-zinc-300 font-bold">
                            <Workflow className="w-5 h-5 text-purple-400" />
                            Milestone 1: Order Ready
                        </div>
                        <p className="text-sm text-zinc-500">20% of the funds are unlocked for the restaurant to cover raw material costs.</p>

                        <div className="flex items-center gap-3 text-zinc-300 font-bold">
                            <CheckCircle className="w-5 h-5 text-emerald-400" />
                            Milestone 2: Delivery Completed
                        </div>
                        <p className="text-sm text-zinc-500">The remaining 80% is released automatically when the courier's GPS location matches the customer's delivery address.</p>
                    </div>
                    <CodeWindow
                        title="merchant-escrow.js"
                        code={`const orderContract = await pyrnado.escrow.create({
  amount: order.total,
  milestones: [
    { amount: order.total * 0.2, trigger: 'status.prep' },
    { amount: order.total * 0.8, trigger: 'status.delivered' }
  ],
  arbitration: 'gigalith_internal_ops'
});`}
                    />
                </div>
            </div>

            {/* Stage 3: Currency Hedging & Swaps */}
            <div className="space-y-8 pt-12 border-t border-white/5 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/5 blur-3xl rounded-full" />
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-orange-500/10 flex items-center justify-center text-orange-400 font-bold border border-orange-500/20">3</div>
                    <div>
                        <h3 className="text-2xl font-bold text-white tracking-tight">Massive Liquidity Management</h3>
                        <p className="text-zinc-500">Hedged treasury operations across 12 base currencies.</p>
                    </div>
                </div>
                <p className="text-zinc-400 leading-relaxed max-w-3xl">
                    To prevent loss during currency conversion, Gigalith uses the <a href="/docs/api/treasury/fx-swaps" className="text-orange-400 hover:underline">Treasury API</a> to execute internal swaps. They hold 80% of their operational capital in stablecoins (USDC/EURC) and only swap to local fiat (PHP, MXN, NGN) at the exact millisecond of the weekly payout run.
                </p>
                <DocCallout icon={TrendingUp} title="Slippage Protection at Scale">
                    For a $50,000,000 payout run, even a 0.5% slippage is a $250,000 loss. Gigalith uses <code>max_slippage_bps: 5</code> (0.05% tolerance) to ensure precise execution.
                </DocCallout>
            </div>

            {/* The Outcome Section */}
            <div className="bg-gradient-to-br from-zinc-900 via-black to-zinc-900 border border-white/10 rounded-[3rem] p-12 text-center space-y-8 shadow-3xl">
                <h2 className="text-4xl font-bold text-white tracking-tighter">Integration Results</h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
                    <div className="space-y-2">
                        <div className="text-5xl font-bold text-emerald-500">-85%</div>
                        <div className="text-xs text-zinc-600 font-bold uppercase tracking-widest">Onboarding Time</div>
                    </div>
                    <div className="space-y-2">
                        <div className="text-5xl font-bold text-blue-500">$12M</div>
                        <div className="text-xs text-zinc-600 font-bold uppercase tracking-widest">Annual FX Savings</div>
                    </div>
                    <div className="space-y-2">
                        <div className="text-5xl font-bold text-white">0</div>
                        <div className="text-xs text-zinc-600 font-bold uppercase tracking-widest">Compliance Violations</div>
                    </div>
                </div>
                <div className="h-px bg-white/10 w-24 mx-auto" />
                <p className="text-lg text-zinc-500 italic max-w-2xl mx-auto">
                    "Pyrnado didn't just provide an API; they provided the financial operating system for our global expansion. We went from 5 countries to 22 in twelve months without hiring a single additional compliance officer."
                </p>
                <div className="flex flex-col items-center gap-2">
                    <div className="font-bold text-white">Chen Wei</div>
                    <div className="text-xs text-zinc-600 font-mono">CTO, Gigalith Marketplace</div>
                </div>
            </div>

            {/* Call to Action */}
            <div className="flex flex-col items-center justify-center space-y-6">
                <h3 className="text-2xl font-bold text-white">Ready to build your ecosystem?</h3>
                <div className="flex flex-wrap justify-center gap-4">
                    <Button asChild size="lg" className="bg-emerald-500 hover:bg-emerald-600 text-black font-bold h-14 px-8 rounded-2xl">
                        <a href="/docs/api" className="flex items-center gap-2">
                            Explore API Reference <ArrowRight className="w-5 h-5" />
                        </a>
                    </Button>
                    <Button asChild variant="outline" size="lg" className="border-white/10 bg-white/5 hover:bg-white/10 text-white font-bold h-14 px-8 rounded-2xl">
                        <a href="/contact">Speak to an Architect</a>
                    </Button>
                </div>
            </div>
        </div>
    );
}
