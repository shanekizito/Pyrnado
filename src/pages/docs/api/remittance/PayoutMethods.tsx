import { DocCallout } from "@/components/docs/DocCallout";
import { CodeWindow } from "@/components/docs/CodeWindow";
import { Badge } from "@/components/ui/badge";
import { Globe, Building2, Smartphone, Landmark, ArrowRight, CreditCard, Wallet, Banknote } from "lucide-react";
import { cn } from "@/lib/utils";

export default function PayoutMethods() {
    return (
        <div className="max-w-4xl mx-auto space-y-12 animate-in fade-in duration-500 pb-20">
            {/* Hero Section */}
            <div className="space-y-4">
                <div className="flex items-center gap-3 mb-2">
                    <Badge variant="outline" className="bg-purple-500/5 text-purple-400 border-purple-500/20 px-3 py-1">
                        Global Settlement
                    </Badge>
                    <div className="h-px flex-1 bg-gradient-to-r from-purple-500/20 to-transparent" />
                </div>
                <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
                    Payout <span className="text-purple-400">Methods</span>
                </h1>
                <p className="text-lg text-zinc-400 leading-relaxed max-w-2xl">
                    Bridge the gap between digital assets and local banking infrastructure with 150+ supported payout methods globally.
                </p>
            </div>

            <DocCallout icon={Globe} title="Multi-Rail Architecture">
                Pyrnado intelligently routes transfers through the most cost-effective rail based on the destination country, amount, and speed requirements.
            </DocCallout>

            {/* Methods Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                    { title: "Bank Transfer", desc: "Local rails like SEPA (EU), ACH (US), and PIX (Brazil). Near-instant settlement.", icon: Building2, color: "text-blue-400" },
                    { title: "Mobile Money", desc: "Direct to M-Pesa, GCash, and Orange Money. Vital for emerging markets.", icon: Smartphone, color: "text-emerald-400" },
                    { title: "Cards & Wallets", desc: "Push-to-card via Visa Direct and Mastercard Send. PayPal and Apple Pay.", icon: CreditCard, color: "text-orange-400" },
                    { title: "Cash Pickup", desc: "Available at 500,000+ locations via partner networks.", icon: Banknote, color: "text-zinc-400" }
                ].map((item, i) => (
                    <div key={i} className="bg-zinc-900/40 border border-white/5 p-8 rounded-3xl space-y-4 group hover:bg-zinc-900/60 transition-colors">
                        <div className={`w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center ${item.color}`}>
                            <item.icon className="w-6 h-6" />
                        </div>
                        <h3 className="text-xl font-bold text-white">{item.title}</h3>
                        <p className="text-sm text-zinc-500 leading-relaxed">{item.desc}</p>
                    </div>
                ))}
            </div>

            {/* Implementation Section */}
            <section className="space-y-6 pt-12 border-t border-white/5">
                <div className="flex items-center gap-3 mb-4">
                    <Badge className="bg-blue-500/10 text-blue-400 py-1 px-3 border border-blue-500/20 font-mono text-[10px]">GET</Badge>
                    <code className="text-lg font-mono text-white">/v1/remittance/methods</code>
                </div>

                <div className="grid grid-cols-1 xl:grid-cols-2 gap-10">
                    <div className="space-y-6">
                        <h2 className="text-2xl font-bold text-white">Retrieve Payout Methods</h2>
                        <p className="text-zinc-400 text-sm">
                            Query available payout rails and estimated fees for a specific country and currency pair.
                        </p>

                        <div className="space-y-4">
                            <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Response Codes</h3>
                            <div className="space-y-2">
                                <ResponseCode code="200 OK" desc="Success returns available rails." color="blue" />
                                <ResponseCode code="400 Bad Request" desc="Invalid country or currency." color="zinc" />
                            </div>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <CodeWindow
                            title="get-methods.bash"
                            code={`curl https://api.pyrnado.com/v1/remittance/methods?country=PH&limit=5 \\
  -u sk_test_...:`}
                        />
                        <CodeWindow
                            title="Sample Response"
                            language="json"
                            code={`{
  "object": "list",
  "data": [
    { "type": "mobile_money", "provider": "gcash", "fee_bps": 50 },
    { "type": "bank_transfer", "provider": "bdo", "fee_bps": 75 }
  ]
}`}
                        />
                    </div>
                </div>
            </section>

            {/* Availability Table */}
            <div className="space-y-4">
                <h3 className="text-lg font-bold text-white">Regional Speed & Fees</h3>
                <div className="bg-zinc-900/50 border border-white/5 rounded-2xl overflow-hidden">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-white/5 text-zinc-400 font-medium">
                            <tr>
                                <th className="px-6 py-4">Region</th>
                                <th className="px-6 py-4">Est. Time</th>
                                <th className="px-6 py-4">Rail Type</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5 text-zinc-500">
                            {[
                                { r: "North America", t: "< 30 mins", m: "ACH / FedNow" },
                                { r: "Europe", t: "Real-time", m: "SEPA Instant" },
                                { r: "Southeast Asia", t: "< 5 mins", m: "Local RTGS / Wallets" },
                                { r: "Africa", t: "Instant", m: "Mobile Money" }
                            ].map((row, i) => (
                                <tr key={i} className="hover:bg-white/[0.02] transition-colors">
                                    <td className="px-6 py-4 font-medium text-zinc-300">{row.r}</td>
                                    <td className="px-6 py-4 text-emerald-500/80">{row.t}</td>
                                    <td className="px-6 py-4">{row.m}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
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
