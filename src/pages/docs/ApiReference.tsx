import { CodeWindow } from "@/components/docs/CodeWindow";
import { DocCallout } from "@/components/docs/DocCallout";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Globe, Shield, Terminal, Zap, Layers, Cpu } from "lucide-react";
import { Link } from "react-router-dom";

export default function ApiReference() {
    const authCode = `curl https://api.pyrnado.com/v1/transfers \\
  -u sk_test_...: \\
  -d amount=5000 \\
  -d currency="usd" \\
  -d recipient="rcpt_123"`;

    return (
        <div className="space-y-20 max-w-6xl pb-20">
            {/* Hero Section */}
            <div className="space-y-6">
                <Badge variant="outline" className="text-blue-400 border-blue-500/20 bg-blue-500/5 px-4 py-1">
                    v2.4.0 (Latest)
                </Badge>
                <h1 className="text-5xl md:text-6xl font-bold text-white tracking-tight leading-[1.1]">
                    API Reference
                </h1>
                <p className="text-xl text-zinc-400 leading-relaxed max-w-3xl">
                    Build with granular control. Use our RESTful API to manage the entire lifecycle
                    of global money flow—from identity verification to cross-border settlement.
                </p>
            </div>

            {/* Integration Roadmap */}
            <section className="space-y-10">
                <div className="flex items-center gap-3">
                    <Layers className="w-6 h-6 text-emerald-400" />
                    <h2 className="text-3xl font-bold text-white tracking-tight">Integration Roadmap</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <IntegrationStep number="1" title="Auth" desc="Setup Basic Auth with your sk_test key." link="/docs/authentication" />
                    <IntegrationStep number="2" title="Onboard" desc="Register workers, agents or users." link="/docs/api/compliance" />
                    <IntegrationStep number="3" title="Pay" desc="Execute remittance or payroll runs." link="/docs/api/remittance" />
                </div>
            </section>

            <DocCallout type="tip" title="API Versions">
                We release versioned updates to the API. You can lock your integration to a
                specific version date in your <a href="#" className="text-emerald-400">Account Settings</a>.
            </DocCallout>

            {/* Design Principles */}
            <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="p-10 rounded-3xl bg-white/[0.02] border border-white/5 space-y-4">
                    <div className="w-12 h-12 rounded-2xl bg-zinc-900 border border-white/10 flex items-center justify-center text-emerald-400">
                        <Cpu className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-bold text-white">Resource Oriented</h3>
                    <p className="text-zinc-500 text-sm leading-relaxed">
                        Our API has predictable URLs, returns JSON-encoded responses, and uses standard
                        HTTP verbs and response codes.
                    </p>
                </div>
                <div className="p-10 rounded-3xl bg-white/[0.02] border border-white/5 space-y-4">
                    <div className="w-12 h-12 rounded-2xl bg-zinc-900 border border-white/10 flex items-center justify-center text-blue-400">
                        <Shield className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-bold text-white">Atomic Transfers</h3>
                    <p className="text-zinc-500 text-sm leading-relaxed">
                        Every payment operation is atomic. Either the entire transaction succeeds
                        across global rails, or it fails with a clear roll-back state.
                    </p>
                </div>
            </section>

            {/* Your First Request */}
            <section className="space-y-8">
                <div className="flex items-center justify-between">
                    <h2 className="text-3xl font-bold text-white">First Request</h2>
                    <Link to="/docs/quickstart" className="text-xs text-zinc-500 hover:text-emerald-400 flex items-center gap-1">
                        View Quickstart <ArrowRight className="w-3 h-3" />
                    </Link>
                </div>
                <CodeWindow code={authCode} language="bash" title="Terminal" />
            </section>

            {/* Module Explorer */}
            <section className="space-y-10">
                <h2 className="text-2xl font-bold text-white text-center">Core Modules</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    <ModuleBox title="Remittance" href="/docs/api/remittance" icon={<Globe className="w-4 h-4 text-emerald-400" />} />
                    <ModuleBox title="Payroll" href="/docs/api/payroll" icon={<Zap className="w-4 h-4 text-blue-400" />} />
                    <ModuleBox title="Treasury" href="/docs/api/treasury" icon={<Shield className="w-4 h-4 text-amber-400" />} />
                    <ModuleBox title="Escrow" href="/docs/api/escrow" icon={<Layers className="w-4 h-4 text-purple-400" />} />
                    <ModuleBox title="Compliance" href="/docs/api/compliance" icon={<Shield className="w-4 h-4 text-red-400" />} />
                    <ModuleBox title="Agents" href="/docs/api/agents" icon={<Cpu className="w-4 h-4 text-zinc-400" />} />
                </div>
            </section>
        </div>
    );
}

function IntegrationStep({ number, title, desc, link }: { number: string; title: string; desc: string; link: string }) {
    return (
        <Link to={link} className="block p-8 rounded-3xl bg-white/[0.01] border border-white/5 hover:border-white/10 transition-all space-y-4 group">
            <div className="text-xs font-bold text-zinc-600 uppercase tracking-widest">Step {number}</div>
            <h3 className="text-xl font-bold text-white group-hover:text-emerald-400 transition-colors">{title}</h3>
            <p className="text-xs text-zinc-500 leading-relaxed">{desc}</p>
        </Link>
    );
}

function ModuleBox({ title, href, icon }: { title: string; href: string; icon: any }) {
    return (
        <Link to={href} className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.05] flex items-center justify-between group transition-all">
            <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-zinc-900 flex items-center justify-center border border-white/5">
                    {icon}
                </div>
                <span className="font-bold text-zinc-300 group-hover:text-white">{title}</span>
            </div>
            <ArrowRight className="w-4 h-4 text-zinc-700 group-hover:text-emerald-400 group-hover:translate-x-1 transition-all" />
        </Link>
    );
}
