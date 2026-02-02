import { CodeWindow } from "@/components/docs/CodeWindow";
import { DocCallout } from "@/components/docs/DocCallout";
import { Badge } from "@/components/ui/badge";
import { Users, CreditCard, Building2, ShieldCheck, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

export default function PayrollAPI() {
    return (
        <div className="space-y-16 max-w-5xl">
            <div>
                <div className="flex items-center gap-3 mb-6">
                    <h1 className="text-4xl font-bold text-white tracking-tight">Payroll API</h1>
                    <Badge variant="outline" className="border-blue-500/20 text-blue-400">Human Resources</Badge>
                </div>
                <p className="text-xl text-zinc-400 leading-relaxed max-w-3xl">
                    Automate your global workforce payments. From monthly salaries to one-off bonuses,
                    our Payroll API handles tax calculations, local benefits, and instant disbursements.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <DocCallout type="info" title="Worker Onboarding">
                    Workers must complete a one-time KYC/KYB check before they can receive payments.
                    Use the <a href="/docs/api/compliance" className="text-emerald-400">Compliance API</a> to manage this flow.
                </DocCallout>
                <DocCallout type="tip" title="Batch Processing">
                    Processing 50+ workers? Use our <code>Batch API</code> to reduce network overhead and ensure all
                    team members are paid at the exact same millisecond.
                </DocCallout>
            </div>

            {/* --- ENDPOINT: ADD WORKER --- */}
            <section className="space-y-8">
                <div className="flex items-center gap-3">
                    <Badge className="bg-emerald-500/10 text-emerald-400 py-1 px-3 border border-emerald-500/20 font-mono">POST</Badge>
                    <code className="text-xl font-mono text-white">/v1/payroll/workers</code>
                </div>

                <div className="grid grid-cols-1 xl:grid-cols-2 gap-10">
                    <div className="space-y-6">
                        <h2 className="text-2xl font-bold text-zinc-100">Add a worker</h2>
                        <p className="text-zinc-400 leading-relaxed">
                            Registers a new employee or contractor in your organization.
                        </p>

                        <div className="space-y-4">
                            <h3 className="text-sm font-bold text-zinc-500 uppercase tracking-wider">Parameters</h3>
                            <div className="border border-white/5 rounded-2xl overflow-hidden shadow-inner bg-white/[0.01]">
                                <table className="w-full text-sm text-left">
                                    <thead className="bg-white/5 text-zinc-300 font-bold">
                                        <tr>
                                            <th className="px-6 py-4">Parameter</th>
                                            <th className="px-6 py-4">Type</th>
                                            <th className="px-6 py-4">Description</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-white/5">
                                        <ParamRow name="full_name" type="string" desc="Legal name matching identity docs" />
                                        <ParamRow name="email" type="string" desc="Work or personal email address" />
                                        <ParamRow name="worker_type" type="enum" desc="'contractor' | 'employee'" />
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <h3 className="text-sm font-bold text-zinc-500 uppercase tracking-wider">Response Codes</h3>
                            <ResponseCode code="201 Created" desc="Worker successfully registered." color="emerald" />
                            <ResponseCode code="400 Bad Request" desc="Invalid email or missing fields." color="zinc" />
                        </div>
                    </div>

                    <div className="space-y-4">
                        <CodeWindow
                            language="bash"
                            title="cURL"
                            code={`curl https://api.pyrnado.com/v1/payroll/workers \\
  -u sk_test_...: \\
  -d full_name="John Doe" \\
  -d email="john@example.com"`}
                        />
                        <CodeWindow
                            language="json"
                            title="Response"
                            code={`{
  "id": "wrk_123456789",
  "object": "payroll.worker",
  "status": "active"
}`}
                        />
                    </div>
                </div>
            </section>

            {/* --- ENDPOINT: LIST WORKERS --- */}
            <section className="space-y-8 py-16 border-t border-white/5">
                <div className="flex items-center gap-3">
                    <Badge className="bg-blue-500/10 text-blue-400 py-1 px-3 border border-blue-500/20 font-mono">GET</Badge>
                    <code className="text-xl font-mono text-white">/v1/payroll/workers</code>
                </div>

                <div className="grid grid-cols-1 xl:grid-cols-2 gap-10">
                    <div className="space-y-6">
                        <h2 className="text-2xl font-bold text-zinc-100">List all workers</h2>
                        <p className="text-zinc-400">
                            Returns a paginated list of all workers in your organization.
                        </p>
                        <ResponseCode code="200 OK" desc="List of workers returned." color="blue" />
                    </div>
                </div>
            </section>

            {/* --- ENDPOINT: TERMINATE WORKER --- */}
            <section className="space-y-8 py-16 border-t border-white/5">
                <div className="flex items-center gap-3">
                    <Badge className="bg-red-500/10 text-red-400 py-1 px-3 border border-red-500/20 font-mono">DELETE</Badge>
                    <code className="text-xl font-mono text-white">/v1/payroll/workers/:id</code>
                </div>

                <div className="grid grid-cols-1 xl:grid-cols-2 gap-10">
                    <div className="space-y-6">
                        <h2 className="text-2xl font-bold text-zinc-100">Terminate worker</h2>
                        <p className="text-zinc-400">
                            Updates the worker status to `terminated` and cancels any pending off-cycle payments.
                        </p>
                        <ResponseCode code="200 OK" desc="Worker terminated successfully." color="red" />
                    </div>
                </div>
            </section>

            <DocCallout type="mistake" title="Bank Details Security">
                Never collect bank details directly on your frontend. Use our
                <a href="/docs/libraries/react" className="text-emerald-400"> Secure Fields</a> to remain
                PCI-compliant and reduce your security liability.
            </DocCallout>

            {/* Features Highlight */}
            <section className="bg-white/[0.02] border border-white/5 rounded-3xl p-10">
                <h2 className="text-2xl font-bold text-white mb-10">Why use Pyrnado Payroll?</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    <FeatureItem icon={<Building2 className="w-5 h-5 text-blue-400" />} title="Global Tax" desc="Automated withholding for 50+ jurisdictions." />
                    <FeatureItem icon={<CreditCard className="w-5 h-5 text-emerald-400" />} title="Direct Deposit" desc="Instant transfers to bank accounts." />
                    <FeatureItem icon={<Zap className="w-5 h-5 text-amber-400" />} title="Off-cycle" desc="Run emergency pay cycles in seconds." />
                    <FeatureItem icon={<ShieldCheck className="w-5 h-5 text-purple-400" />} title="Compliance" desc="Automated W-8/W-9 collection." />
                </div>
            </section>

        </div>
    );
}

function ParamRow({ name, type, desc }: { name: string; type: string; desc: string }) {
    return (
        <tr className="hover:bg-white/[0.02] transition-colors">
            <td className="px-6 py-4 font-mono text-blue-400">{name}</td>
            <td className="px-6 py-4 text-xs font-mono text-zinc-500 uppercase">{type}</td>
            <td className="px-6 py-4 text-zinc-400">{desc}</td>
        </tr>
    );
}

function ResponseCode({ code, desc, color }: { code: string; desc: string; color: "emerald" | "blue" | "red" | "zinc" }) {
    const colorClasses = {
        emerald: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
        blue: "bg-blue-500/10 text-blue-400 border-blue-500/20",
        red: "bg-red-500/10 text-red-400 border-red-500/20",
        zinc: "bg-white/5 text-zinc-400 border-white/10"
    };

    return (
        <div className={cn("flex items-center gap-4 p-4 rounded-xl border", colorClasses[color])}>
            <span className="font-mono font-bold text-sm min-w-[100px]">{code}</span>
            <span className="text-xs opacity-80">{desc}</span>
        </div>
    );
}

function FeatureItem({ icon, title, desc }: { icon: any; title: string; desc: string }) {
    return (
        <div className="space-y-3">
            <div className="w-10 h-10 rounded-xl bg-white/[0.05] flex items-center justify-center">{icon}</div>
            <h3 className="font-bold text-white text-sm">{title}</h3>
            <p className="text-xs text-zinc-500 leading-relaxed">{desc}</p>
        </div>
    );
}
