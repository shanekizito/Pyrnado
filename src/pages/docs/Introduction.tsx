import { Badge } from "@/components/ui/badge";
import { DocCallout } from "@/components/docs/DocCallout";
import { ArrowRight, Globe, ShieldCheck, Zap, Building2, Layers } from "lucide-react";
import { Link } from "react-router-dom";

export default function Introduction() {
    return (
        <div className="space-y-20 pb-20 max-w-6xl">
            {/* Hero Section */}
            <section className="space-y-8">
                <div className="space-y-4">
                    <Badge variant="outline" className="text-emerald-400 border-emerald-500/20 bg-emerald-500/5 px-4 py-1 animate-pulse">
                        Now in Public Beta
                    </Badge>
                    <h1 className="text-6xl md:text-7xl font-bold text-white tracking-tight leading-[1.1]">
                        Build the future of <br />
                        <span className="text-zinc-50">
                            Global Money Flow.
                        </span>
                    </h1>
                </div>
                <p className="text-xl text-zinc-400 leading-relaxed max-w-3xl">
                    Pyrnado is a unified API for global payments, treasury, and compliance.
                    Integrating with local bank rails in 180+ countries through a single,
                    world-class developer experience.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                    <Link to="/docs/quickstart" className="h-12 px-8 rounded-full bg-white text-black font-bold flex items-center justify-center hover:bg-zinc-200 transition-all group">
                        Start Integrating
                        <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                    <Link to="/docs/api" className="h-12 px-8 rounded-full bg-white/5 text-white font-bold border border-white/10 flex items-center justify-center hover:bg-white/10 transition-all">
                        Explore API Reference
                    </Link>
                </div>
            </section>

            {/* Core Pillars */}
            <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <PillarCard
                    icon={<Globe className="w-6 h-6 text-emerald-400" />}
                    title="180+ Countries"
                    desc="Access local clearing systems (SEPA, Faster Payments, ACH) through a single endpoint."
                />
                <PillarCard
                    icon={<ShieldCheck className="w-6 h-6 text-blue-400" />}
                    title="Built-in Compliance"
                    desc="Automated KYC, KYB, and AML screening on every transaction, out of the box."
                />
                <PillarCard
                    icon={<Zap className="w-6 h-6 text-amber-400" />}
                    title="Instant Settlement"
                    desc="Move funds between currencies and nodes in your network in sub-seconds."
                />
            </section>

            <DocCallout type="info" title="Professional Standard">
                This documentation is designed to be battle-tested and fail-safe. If you encounter any
                unclear instructions, please reach out via our
                <a href="#" className="text-emerald-400 ml-1">Developer Support Portal</a>.
            </DocCallout>

            {/* Integration Flow */}
            <section className="space-y-12">
                <div className="text-center space-y-4">
                    <h2 className="text-3xl font-bold text-white">The Pyrnado Ecosystem</h2>
                    <p className="text-zinc-500">How our different modules work together to power your platform.</p>
                </div>

                <div className="relative p-12 rounded-[2rem] bg-zinc-900/50 border border-white/5 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-transparent to-blue-500/5" />
                    <div className="relative grid grid-cols-1 md:grid-cols-4 gap-8">
                        <FlowItem step="1" title="Onboard" desc="Compliance & KYC Verification" icon={<ShieldCheck className="w-6 h-6" />} />
                        <FlowItem step="2" title="Fund" desc="Treasury & Asset Management" icon={<Building2 className="w-6 h-6" />} />
                        <FlowItem step="3" title="Execute" desc="Remittance & Payroll Actions" icon={<Layers className="w-6 h-6" />} />
                        <FlowItem step="4" title="Scale" desc="Real-time Analytics & Insights" icon={<Zap className="w-6 h-6" />} />
                    </div>
                </div>
            </section>

            <section className="bg-white/[0.02] border border-white/5 rounded-3xl p-12 text-center space-y-6">
                <h3 className="text-2xl font-bold text-white">Ready to move money?</h3>
                <p className="text-zinc-500 max-w-2xl mx-auto">
                    Our SDKs support Node.js, Python, and React. Jump into our quickstart guide
                    to send your first $1.00 in less than 5 minutes.
                </p>
                <Link to="/docs/quickstart">
                    <button className="h-10 px-6 rounded-full bg-emerald-500 text-black font-bold text-sm hover:bg-emerald-400 transition-all">
                        Get Your Test Keys
                    </button>
                </Link>
            </section>
        </div>
    );
}

function PillarCard({ icon, title, desc }: { icon: any; title: string; desc: string }) {
    return (
        <div className="p-8 rounded-3xl bg-white/[0.02] border border-white/5 space-y-4 hover:border-white/10 transition-colors">
            <div className="w-12 h-12 rounded-2xl bg-white/[0.05] flex items-center justify-center border border-white/5">
                {icon}
            </div>
            <h3 className="text-xl font-bold text-white">{title}</h3>
            <p className="text-sm text-zinc-500 leading-relaxed">{desc}</p>
        </div>
    );
}

function FlowItem({ step, title, desc, icon }: { step: string; title: string; desc: string; icon: any }) {
    return (
        <div className="text-center space-y-4">
            <div className="relative inline-block">
                <div className="w-16 h-16 rounded-2xl bg-zinc-800 border border-white/10 flex items-center justify-center text-zinc-400 mb-2 mx-auto">
                    {icon}
                </div>
                <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-emerald-500 text-black text-[10px] font-bold flex items-center justify-center border-2 border-zinc-950">
                    {step}
                </div>
            </div>
            <div className="space-y-1">
                <h4 className="font-bold text-white">{title}</h4>
                <p className="text-[10px] text-zinc-600 leading-relaxed uppercase tracking-widest">{desc}</p>
            </div>
        </div>
    );
}
