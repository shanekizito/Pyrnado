import { CodeWindow } from "@/components/docs/CodeWindow";
import { DocCallout } from "@/components/docs/DocCallout";
import { Badge } from "@/components/ui/badge";
import { Globe, ArrowRightLeft, ShieldCheck, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

export default function RemittanceAPI() {
    return (
        <div className="space-y-16 max-w-5xl">
            <div>
                <div className="flex items-center gap-3 mb-6">
                    <h1 className="text-4xl font-bold text-white tracking-tight">Remittance API</h1>
                    <Badge variant="outline" className="border-emerald-500/20 text-emerald-400">Core V2</Badge>
                </div>
                <p className="text-xl text-zinc-400 leading-relaxed max-w-3xl">
                    Our Remittance API allows you to send funds across borders with institutional-grade reliability.
                    We leverage local clearing systems to ensure funds arrive in minutes, not days.
                </p>
            </div>

            <DocCallout type="info" title="Global Coverage">
                Currently supporting 180+ countries including major corridors across Africa, Asia, and Latin America.
                Check our <a href="#" className="text-emerald-400">Availability Map</a> for real-time status.
            </DocCallout>

            {/* --- ENDPOINT: CREATE REMITTANCE --- */}
            <section className="space-y-8">
                <div className="flex items-center gap-3">
                    <Badge className="bg-emerald-500/10 text-emerald-400 py-1 px-3 border border-emerald-500/20 font-mono">POST</Badge>
                    <code className="text-xl font-mono text-white">/v1/remittance</code>
                </div>

                <div className="grid grid-cols-1 xl:grid-cols-2 gap-10">
                    <div className="space-y-6">
                        <h2 className="text-2xl font-bold text-zinc-100">Create a remittance</h2>
                        <p className="text-zinc-400 leading-relaxed">
                            Initiates a cross-border transfer. This is an asynchronous operation.
                            You should listen for `payout.paid` or `payout.failed` webhooks to confirm final settlement.
                        </p>

                        <div className="space-y-4">
                            <h3 className="text-sm font-bold text-zinc-500 uppercase tracking-wider">Parameters</h3>
                            <div className="border border-white/5 rounded-2xl overflow-hidden shadow-inner bg-white/[0.01]">
                                <table className="w-full text-sm text-left">
                                    <thead className="bg-white/5 text-zinc-300 font-bold">
                                        <tr>
                                            <th className="px-6 py-4">Parameter</th>
                                            <th className="px-6 py-4">Required</th>
                                            <th className="px-6 py-4">Description</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-white/5">
                                        <ParamRow name="recipient_id" required desc="Verified recipient ID (rcpt_...)" />
                                        <ParamRow name="amount" required desc="Smallest currency unit (e.g. cents)" />
                                        <ParamRow name="currency" required desc="3-letter ISO code (USD, NGN, etc)" />
                                        <ParamRow name="idempotency_key" required={false} desc="Header-based unique string" />
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <h3 className="text-sm font-bold text-zinc-500 uppercase tracking-wider">Response Codes</h3>
                            <div className="grid grid-cols-1 gap-3">
                                <ResponseCode code="201 Created" desc="Transfer initiated successfully." color="emerald" />
                                <ResponseCode code="400 Bad Request" desc="Invalid parameters or missing required fields." color="zinc" />
                                <ResponseCode code="402 Payment Required" desc="Insufficient balance in the source account." color="zinc" />
                                <ResponseCode code="403 Forbidden" desc="Recipient blocked by compliance engine." color="zinc" />
                            </div>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <CodeWindow
                            language="bash"
                            title="cURL"
                            code={`curl https://api.pyrnado.com/v1/remittance \\
  -u sk_test_...: \\
  -d recipient_id="rcpt_123" \\
  -d amount=5000 \\
  -d currency="USD"`}
                        />
                        <CodeWindow
                            language="typescript"
                            title="Node.js"
                            code={`await client.remittance.create({\n  amount: 5000,\n  currency: "USD",\n  destination: "rcpt_123"\n}, { \n  idempotency_key: 'tx_unique_998',\n  verify_kyc: true // Compliance pre-flight check\n});`}
                        />
                        <CodeWindow
                            language="json"
                            title="Response"
                            code={`{
  "id": "tr_1Hh2YZ2eZvKYlo2C",
  "object": "transfer",
  "amount": 5000,
  "currency": "usd",
  "status": "pending",
  "recipient": "rcpt_123",
  "created": 1672531200
}`}
                        />
                    </div>
                </div>
            </section>

            {/* --- ENDPOINT: LIST REMITTANCES --- */}
            <section className="space-y-8 py-16 border-t border-white/5">
                <div className="flex items-center gap-3">
                    <Badge className="bg-blue-500/10 text-blue-400 py-1 px-3 border border-blue-500/20 font-mono">GET</Badge>
                    <code className="text-xl font-mono text-white">/v1/remittance</code>
                </div>

                <div className="grid grid-cols-1 xl:grid-cols-2 gap-10">
                    <div className="space-y-6">
                        <h2 className="text-2xl font-bold text-zinc-100">List all remittances</h2>
                        <p className="text-zinc-400">
                            Returns a paginated list of all transfers associated with your account.
                        </p>
                        <ResponseCode code="200 OK" desc="List of transfers returned." color="blue" />
                    </div>
                    <CodeWindow
                        language="bash"
                        title="cURL"
                        code={`curl https://api.pyrnado.com/v1/remittance?limit=10 \\
  -u sk_test_...:`}
                    />
                </div>
            </section>

            {/* --- ENDPOINT: RETRIEVE REMITTANCE --- */}
            <section className="space-y-8 py-16 border-t border-white/5">
                <div className="flex items-center gap-3">
                    <Badge className="bg-blue-500/10 text-blue-400 py-1 px-3 border border-blue-500/20 font-mono">GET</Badge>
                    <code className="text-xl font-mono text-white">/v1/remittance/:id</code>
                </div>

                <div className="grid grid-cols-1 xl:grid-cols-2 gap-10">
                    <div className="space-y-6">
                        <h2 className="text-2xl font-bold text-zinc-100">Retrieve a remittance</h2>
                        <p className="text-zinc-400">
                            Retrieves the details of an existing transfer.
                        </p>
                        <ResponseCode code="200 OK" desc="Transfer object returned." color="blue" />
                        <ResponseCode code="404 Not Found" desc="No transfer matches the provided ID." color="zinc" />
                    </div>
                    <CodeWindow
                        language="bash"
                        title="cURL"
                        code={`curl https://api.pyrnado.com/v1/remittance/tr_123 \\
  -u sk_test_...:`}
                    />
                </div>
            </section>

            {/* --- ENDPOINT: CANCEL REMITTANCE --- */}
            <section className="space-y-8 py-16 border-t border-white/5">
                <div className="flex items-center gap-3">
                    <Badge className="bg-red-500/10 text-red-400 py-1 px-3 border border-red-500/20 font-mono">DELETE</Badge>
                    <code className="text-xl font-mono text-white">/v1/remittance/:id</code>
                </div>

                <div className="grid grid-cols-1 xl:grid-cols-2 gap-10">
                    <div className="space-y-6">
                        <h2 className="text-2xl font-bold text-zinc-100">Cancel a remittance</h2>
                        <p className="text-zinc-400">
                            Attempts to cancel a transfer. This is only possible if the transfer status is still `pending`.
                        </p>
                        <ResponseCode code="200 OK" desc="Transfer successfully cancelled." color="red" />
                        <ResponseCode code="403 Forbidden" desc="Transfer is too far along to cancel." color="zinc" />
                    </div>
                    <CodeWindow
                        language="bash"
                        title="cURL"
                        code={`curl -X DELETE https://api.pyrnado.com/v1/remittance/tr_123 \\
  -u sk_test_...:`}
                    />
                </div>
            </section>

            <DocCallout type="mistake" title="Double-Payments Danger">
                Always pass an <code className="text-red-400">Idempotency-Key</code> in your header.
                If your network times out and you retry without a key, you may accidentally send money twice.
            </DocCallout>

            {/* Features Highlight */}
            <section className="grid grid-cols-1 md:grid-cols-3 gap-8 py-16 border-t border-white/5">
                <APIHighlight
                    icon={<Zap className="w-5 h-5 text-emerald-400" />}
                    title="Real-time Rates"
                    desc="We fetch live mid-market rates every 30 seconds."
                />
                <APIHighlight
                    icon={<ShieldCheck className="w-5 h-5 text-blue-400" />}
                    title="Sanctions Screening"
                    desc="Automatic AML/CFT screening on every transaction."
                />
                <APIHighlight
                    icon={<Globe className="w-5 h-5 text-purple-400" />}
                    title="Local Rails"
                    desc="Direct integration with local SEPA and Faster Payments."
                />
            </section>

        </div>
    );
}

function ParamRow({ name, required, desc }: { name: string; required: boolean; desc: string }) {
    return (
        <tr className="hover:bg-white/[0.02] transition-colors">
            <td className="px-6 py-4 font-mono text-emerald-400">{name}</td>
            <td className="px-6 py-4">
                {required ? <Badge className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20 text-[10px]">Required</Badge> : <span className="text-zinc-600 text-[10px]">Optional</span>}
            </td>
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

function APIHighlight({ icon, title, desc }: { icon: any; title: string; desc: string }) {
    return (
        <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 space-y-4">
            <div className="w-10 h-10 rounded-xl bg-white/[0.04] flex items-center justify-center">{icon}</div>
            <h3 className="font-bold text-white">{title}</h3>
            <p className="text-xs text-zinc-500 leading-relaxed">{desc}</p>
        </div>
    );
}
