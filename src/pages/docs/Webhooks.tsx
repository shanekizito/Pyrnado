import { CodeWindow } from "@/components/docs/CodeWindow";
import { DocCallout } from "@/components/docs/DocCallout";
import { Badge } from "@/components/ui/badge";
import { Webhook, ShieldCheck, RefreshCcw, Bell, AlertTriangle } from "lucide-react";

export default function Webhooks() {
    return (
        <div className="space-y-16 max-w-5xl pb-20">
            <section className="space-y-6">
                <h1 className="text-5xl font-bold text-white tracking-tight">Webhooks</h1>
                <p className="text-xl text-zinc-400 leading-relaxed max-w-3xl">
                    Pyrnado uses webhooks to notify your application when an event happens
                    in your account. Webhooks are essential for asynchronous updates like
                    payment clearing and KYC verification.
                </p>
            </section>

            <DocCallout type="info" title="Push vs Poll">
                Webhooks allow you to avoid frequent API polling. Instead of asking "is this paid?",
                Pyrnado will proactively "push" the data to your server the moment it happens.
            </DocCallout>

            {/* Architecture Section */}
            <section className="space-y-10">
                <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                    <ShieldCheck className="w-6 h-6 text-emerald-400" /> Signature Verification
                </h2>
                <p className="text-zinc-400 leading-relaxed">
                    To ensure a request actually came from Pyrnado, you must verify the
                    <code className="text-emerald-400 mx-1">Pyrnado-Signature</code> header.
                    This header contains an HMAC hex digest generated using your Webhook Secret.
                </p>

                <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                    <CodeWindow
                        language="typescript"
                        title="Node.js (Express)"
                        code={`const secret = process.env.WEBHOOK_SECRET;\n\napp.post('/webhooks', (req, res) => {\n  const sig = req.headers['pyrnado-signature'];\n  const event = client.webhooks.constructEvent(req.body, sig, secret);\n\n  if (event.type === 'payout.paid') {\n    // Handle success\n  }\n\n  res.json({received: true});\n});`}
                    />
                    <CodeWindow
                        language="python"
                        title="Python (Flask)"
                        code={`@app.route('/webhooks', methods=['POST'])\ndef webhook():\n    sig = request.headers.get('Pyrnado-Signature')\n    try:\n        event = pyrnado.Webhook.construct_event(\n            request.data, sig, secret\n        )\n    except Exception as e:\n        return "Invalid signature", 400\n\n    return "OK"`}
                    />
                </div>
            </section>

            <DocCallout type="mistake" title="Vulnerable Endpoints">
                Never skip signature verification in production. Attackers can spoof
                payment notifications to trick your system into releasing goods without payment.
            </DocCallout>

            {/* Event Catalog */}
            <section className="space-y-8 border-t border-white/5 pt-16">
                <h2 className="text-2xl font-bold text-white">Event Catalog</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    <EventCard type="payout.paid" desc="Sent when funds settle in the recipient bank." />
                    <EventCard type="payout.failed" desc="Sent if a transfer is rejected (e.g. invalid IBAN)." />
                    <EventCard type="kyc.verified" desc="Sent when a user passes identity verification." />
                    <EventCard type="kyc.rejected" desc="Sent if documents require manual resubmission." />
                    <EventCard type="swap.completed" desc="Sent when an FX conversion clears." />
                    <EventCard type="contract.funded" desc="Sent when escrow funds are secured." />
                </div>
            </section>

            {/* Best Practices */}
            <section className="space-y-12">
                <h2 className="text-3xl font-bold text-white text-center">Robustness & Retries</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="p-8 rounded-3xl bg-white/[0.02] border border-white/5 space-y-4">
                        <div className="flex items-center gap-3">
                            <RefreshCcw className="w-5 h-5 text-blue-400" />
                            <h3 className="font-bold text-white">24-Hour Retry Loop</h3>
                        </div>
                        <p className="text-sm text-zinc-500 leading-relaxed">
                            If your server is down, we retry with exponential backoff
                            (1m, 5m, 1h, etc.) for up to 24 hours. Your endpoint <span className="font-bold text-white uppercase italic">must</span> return
                            a 2xx response immediately.
                        </p>
                    </div>

                    <div className="p-8 rounded-3xl bg-white/[0.02] border border-white/5 space-y-4">
                        <div className="flex items-center gap-3">
                            <Bell className="w-5 h-5 text-amber-400" />
                            <h3 className="font-bold text-white">Event Idempotency</h3>
                        </div>
                        <p className="text-sm text-zinc-500 leading-relaxed">
                            Webhooks may occasionally be delivered more than once.
                            Always store the `id` of events you have processed and
                            ignore duplicates to avoid double-processing.
                        </p>
                    </div>
                </div>
            </section>
        </div>
    );
}

function EventCard({ type, desc }: { type: string; desc: string }) {
    return (
        <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition-colors space-y-2">
            <code className="text-xs text-emerald-400 font-mono font-bold tracking-tight">{type}</code>
            <p className="text-[11px] text-zinc-500 leading-relaxed">{desc}</p>
        </div>
    );
}
