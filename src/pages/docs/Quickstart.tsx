import { CodeWindow } from "@/components/docs/CodeWindow";
import { DocCallout } from "@/components/docs/DocCallout";
import { Badge } from "@/components/ui/badge";
import { ListTodo, Key, Terminal, Send, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";

export default function Quickstart() {
    return (
        <div className="space-y-16 max-w-5xl pb-20">
            <section className="space-y-6">
                <h1 className="text-5xl font-bold text-white tracking-tight">Quickstart</h1>
                <p className="text-xl text-zinc-400 leading-relaxed max-w-3xl">
                    Get up and running with Pyrnado in minutes. This guide will walk you through
                    obtaining your API keys, installing our SDK, and sending your first payment.
                </p>
            </section>

            <div className="flex flex-col space-y-24">
                {/* Step 1 */}
                <ProjectStep number="1" title="Get your API Keys" icon={<Key className="w-5 h-5" />}>
                    <p className="text-zinc-400 mb-6">
                        Before you start, you'll need your Sandbox API keys. These allow you to
                        simulate transactions without moving real money.
                    </p>
                    <div className="p-6 rounded-2xl bg-emerald-500/5 border border-emerald-500/20 flex flex-col md:flex-row items-center gap-6">
                        <div className="space-y-1 flex-1 text-center md:text-left">
                            <h4 className="font-bold text-white text-sm">Dashboard Settings</h4>
                            <p className="text-xs text-zinc-500">View and manage your keys in the dashboard.</p>
                        </div>
                        <Link to="/dashboard/settings">
                            <button className="h-9 px-4 rounded-full bg-emerald-500 text-black font-bold text-xs hover:bg-emerald-400 transition-all">
                                Open Dashboard
                            </button>
                        </Link>
                    </div>
                </ProjectStep>

                {/* Step 2 */}
                <ProjectStep number="2" title="Install the SDK" icon={<Terminal className="w-5 h-5" />}>
                    <p className="text-zinc-400 mb-6">
                        Our official SDKs handle authentication, retries, and type safety out of the box.
                        We recommend using them over raw HTTP requests.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <CodeWindow language="bash" title="Node.js" code="npm install @pyrnado/client" />
                        <CodeWindow language="bash" title="Python" code="pip install pyrnado" />
                    </div>
                </ProjectStep>

                {/* Step 3 */}
                <ProjectStep number="3" title="Initialize the Client" icon={<CheckCircle2 className="w-5 h-5" />}>
                    <p className="text-zinc-400 mb-6">
                        Import the library and pass your secret key. Securely store this key using environment variables.
                    </p>
                    <CodeWindow
                        language="typescript"
                        title="init.ts"
                        code={`import { Pyrnado } from '@pyrnado/client';\n\nconst client = new Pyrnado({\n  apiKey: 'sk_test_...',\n  compliance: {\n    // Mandatory: Enforce KYC check before any financial action\n    strictMode: true,\n    onViolation: (err) => console.error('Compliance Gate!', err)\n  }\n});`}
                    />
                </ProjectStep>

                {/* Step 4 */}
                <ProjectStep number="4" title="Execute Your First Payment" icon={<Send className="w-5 h-5" />}>
                    <p className="text-zinc-400 mb-6">
                        Now, let's send a $50.00 (5000 cents) remittance to a test recipient.
                    </p>
                    <CodeWindow
                        language="typescript"
                        title="remittance.ts"
                        code={`const remittance = await client.remittance.create({\n  recipient_id: 'rcpt_test_123',\n  amount: 5000, // $50.00\n  currency: 'USD',\n});\n\nconsole.log(\`Success! ID: $\{remittance.id\}\`);`}
                    />
                    <CodeWindow
                        language="json"
                        title="Response"
                        code={`{
  "id": "tr_1Hh2YZ2eZvKYlo2C",
  "status": "pending",
  "amount": 5000,
  "currency": "usd"
}`}
                    />
                    <DocCallout type="success" title="Verification">
                        Check your <Link to="/dashboard/transactions" className="text-emerald-400">Transactions Dashboard</Link> to
                        see your test payment reflected in real-time.
                    </DocCallout>
                </ProjectStep>
            </div>

            <section className="bg-white/[0.02] border border-white/5 rounded-3xl p-12 space-y-8 text-center">
                <h3 className="text-3xl font-bold text-white">Next Steps</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <NextStepCard title="Webhooks" desc="Listen for real-time payment updates." href="/docs/webhooks" />
                    <NextStepCard title="Compliance" desc="Learn how to verify your users." href="/docs/api/compliance" />
                    <NextStepCard title="Go Live" desc="Ready for production? Follow the path." href="/docs/go-live" />
                </div>
            </section>
        </div>
    );
}

function ProjectStep({ number, title, icon, children }: { number: string; title: string; icon: any; children: React.ReactNode }) {
    return (
        <div className="relative pl-16">
            <div className="absolute left-0 top-0 w-10 h-10 rounded-xl bg-white/[0.05] border border-white/10 flex items-center justify-center text-zinc-400">
                {icon}
            </div>
            <div className="absolute left-5 top-10 w-px h-full bg-gradient-to-b from-white/10 to-transparent" />
            <div className="space-y-4">
                <div className="flex items-center gap-3">
                    <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest">Step {number}</span>
                    <h2 className="text-2xl font-bold text-white">{title}</h2>
                </div>
                {children}
            </div>
        </div>
    );
}

function NextStepCard({ title, desc, href }: { title: string; desc: string; href: string }) {
    return (
        <Link to={href} className="p-6 rounded-2xl bg-white/[0.03] border border-white/5 hover:bg-white/[0.06] transition-colors text-left space-y-2">
            <h4 className="font-bold text-white">{title}</h4>
            <p className="text-xs text-zinc-500 leading-relaxed">{desc}</p>
        </Link>
    );
}
