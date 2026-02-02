import { Badge } from "@/components/ui/badge";
import { DocCallout } from "@/components/docs/DocCallout";
import { CheckCircle2, ShieldCheck, Key, Globe, LayoutList } from "lucide-react";

export default function GoLive() {
    return (
        <div className="space-y-16 max-w-5xl">
            <section className="space-y-6">
                <h1 className="text-5xl font-bold text-white tracking-tight">Going Live</h1>
                <p className="text-xl text-zinc-400 leading-relaxed max-w-3xl">
                    Follow this comprehensive checklist to move your integration from the Sandbox
                    to Production. Ensure your environment is secure and compliant before moving real funds.
                </p>
            </section>

            {/* Step 1: Verification */}
            <section className="space-y-8">
                <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 font-bold shrink-0">1</div>
                    <h2 className="text-2xl font-bold text-white">Business Verification</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                        <p className="text-zinc-400 leading-relaxed">
                            Before you can process live payments, Pyrnado is required by law to verify your business identity.
                            This process typically takes 1-2 business days.
                        </p>
                        <ul className="space-y-3">
                            <CheckItem text="Verify company registration documents" />
                            <CheckItem text="Provide UBO (Ultimate Beneficial Owner) details" />
                            <CheckItem text="Complete Treasury risk assessment" />
                        </ul>
                    </div>
                    <DocCallout type="info" title="Requirements">
                        Verification requirements vary by region. Common documents include Certificates of Incorporation
                        and Government-issued Photo IDs for directors.
                    </DocCallout>
                </div>
            </section>

            {/* Step 2: Keys */}
            <section className="space-y-8">
                <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 font-bold shrink-0">2</div>
                    <h2 className="text-2xl font-bold text-white">Switch to Live Keys</h2>
                </div>
                <p className="text-zinc-400">
                    Replace your <code className="text-emerald-400">sk_test_...</code> keys with production <code className="text-blue-400">sk_live_...</code> keys.
                </p>

                <DocCallout type="mistake" title="Common Pitfall">
                    Never hardcode live keys in your source control. Use environment variables and secret management tools
                    like AWS Secrets Manager or HashiCorp Vault.
                </DocCallout>

                <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-8 flex flex-col md:flex-row gap-8 items-center">
                    <div className="p-4 rounded-xl bg-zinc-900 border border-zinc-800">
                        <Key className="w-8 h-8 text-blue-400" />
                    </div>
                    <div className="space-y-2">
                        <h3 className="font-bold text-white text-lg">Key Rotation</h3>
                        <p className="text-sm text-zinc-500">
                            We recommend rotating your secret keys every 90 days. You can perform this zero-downtime
                            using the <a href="/docs/api/settings" className="text-emerald-400">Settings API</a>.
                        </p>
                    </div>
                </div>
            </section>

            {/* Step 3: Webhooks */}
            <section className="space-y-8">
                <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 font-bold shrink-0">3</div>
                    <h2 className="text-2xl font-bold text-white">Secure your Webhooks</h2>
                </div>
                <DocCallout type="warning" title="Security First">
                    In production, webhook verification is mandatory. Unverified webhooks are a major security vector
                    for balance manipulation.
                </DocCallout>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <TaskBox icon={<ShieldCheck className="w-4 h-4" />} title="Verify HMAC Signatures" />
                    <TaskBox icon={<Globe className="w-4 h-4" />} title="Allow Pyrnado IP Ranges" />
                    <TaskBox icon={<LayoutList className="w-4 h-4" />} title="Implement Idempotency" />
                    <TaskBox icon={<CheckCircle2 className="w-4 h-4" />} title="Test Failover Endpoints" />
                </div>
            </section>

            {/* Final Launch */}
            <section className="bg-emerald-500/10 border border-emerald-500/20 rounded-3xl p-12 text-center space-y-6">
                <Badge className="bg-emerald-500 text-black px-4 py-1">Ready to Launch</Badge>
                <h2 className="text-3xl font-bold text-white">Full Platform Audit Complete</h2>
                <p className="text-zinc-400 max-w-2xl mx-auto leading-relaxed">
                    Once you have checked all items above, run a single payment in Live mode with a small amount
                    ($1.00) to confirm your bank rails and webhooks are firing correctly.
                </p>
                <button className="h-12 px-8 rounded-full bg-emerald-500 text-black font-bold hover:bg-emerald-400 transition-all shadow-lg shadow-emerald-500/20">
                    Launch to Production
                </button>
            </section>
        </div>
    );
}

function CheckItem({ text }: { text: string }) {
    return (
        <li className="flex items-center gap-3 text-sm text-zinc-300">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            {text}
        </li>
    );
}

function TaskBox({ icon, title }: { icon: any; title: string }) {
    return (
        <div className="p-4 rounded-xl bg-white/[0.03] border border-white/5 flex items-center gap-3 hover:bg-white/[0.05] transition-colors">
            <div className="text-zinc-500">{icon}</div>
            <span className="text-sm font-medium text-zinc-300">{title}</span>
        </div>
    );
}
