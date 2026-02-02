import { CodeWindow } from "@/components/docs/CodeWindow";
import { DocCallout } from "@/components/docs/DocCallout";
import { Badge } from "@/components/ui/badge";
import { Landmark, ArrowRightLeft, ShieldCheck, Zap, Coins, Calculator } from "lucide-react";
import { cn } from "@/lib/utils";

export default function TreasuryAPI() {
    return (
        <div className="space-y-16 max-w-5xl">
            <div>
                <div className="flex items-center gap-3 mb-6">
                    <h1 className="text-4xl font-bold text-white tracking-tight">Treasury API</h1>
                    <Badge variant="outline" className="border-amber-500/20 text-amber-400">Inventory V2</Badge>
                </div>
                <p className="text-xl text-zinc-400 leading-relaxed max-w-3xl">
                    Manage your liquidity across 50+ fiat and digital currencies.
                    Our Treasury API provides real-time balance tracking, automated FX swaps,
                    and gas reserve management for on-chain operations.
                </p>
            </div>

            {/* --- ENDPOINT: GET BALANCES --- */}
            <section className="space-y-8">
                <div className="flex items-center gap-3">
                    <Badge className="bg-blue-500/10 text-blue-400 py-1 px-3 border border-blue-500/20 font-mono">GET</Badge>
                    <code className="text-xl font-mono text-white">/v1/treasury/balances</code>
                </div>

                <div className="grid grid-cols-1 xl:grid-cols-2 gap-10">
                    <div className="space-y-6">
                        <h2 className="text-2xl font-bold text-zinc-100">List all balances</h2>
                        <p className="text-zinc-400 text-sm">
                            Returns a breakdown of your current liquidity across all supported currencies and blockchains.
                        </p>

                        <div className="space-y-4">
                            <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Response Codes</h3>
                            <ResponseCode code="200 OK" desc="Returns map of currency sub-balances." color="blue" />
                        </div>
                    </div>

                    <div className="space-y-4">
                        <CodeWindow
                            language="bash"
                            title="cURL"
                            code={`curl https://api.pyrnado.com/v1/treasury/balances \\
  -u sk_test_...:`}
                        />
                        <CodeWindow
                            language="json"
                            title="Response"
                            code={`{
  "object": "balance_list",
  "data": {
    "USD": 5000000,
    "EUR": 120000,
    "USDC": 450000
  }
}`}
                        />
                    </div>
                </div>
            </section>

            {/* --- ENDPOINT: CREATE REFILL --- */}
            <section className="space-y-8 py-16 border-t border-white/5">
                <div className="flex items-center gap-3">
                    <Badge className="bg-emerald-500/10 text-emerald-400 py-1 px-3 border border-emerald-500/20 font-mono">POST</Badge>
                    <code className="text-xl font-mono text-white">/v1/treasury/refills</code>
                </div>

                <div className="grid grid-cols-1 xl:grid-cols-2 gap-10">
                    <div className="space-y-6">
                        <h2 className="text-2xl font-bold text-zinc-100">Manual Refill</h2>
                        <p className="text-zinc-400 text-sm">
                            Request instructions for a bank wire or crypto deposit to top up your treasury.
                        </p>
                        <ResponseCode code="201 Created" desc="Refill request initiated." color="emerald" />
                    </div>
                    <CodeWindow
                        language="bash"
                        title="cURL"
                        code={`curl https://api.pyrnado.com/v1/treasury/refills \\
  -d amount=1000000 \\
  -d currency="USD"`}
                    />
                </div>
            </section>

            <DocCallout type="info" title="Liquidity Alerts">
                Set up <a href="/docs/api/settings/webhooks" className="text-amber-400">low balance webhooks</a> to trigger automatic refills when your treasury drops below a custom threshold.
            </DocCallout>

            {/* Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 py-12">
                <TreasuryCard icon={<Calculator className="w-5 h-5" />} title="Mid-market Rates" desc="Zero spread on major fiat pairs for enterprise clients." />
                <TreasuryCard icon={<Coins className="w-5 h-5" />} title="Stablecoin Yield" desc="Earn up to 4.5% APY on idle USDC/PYUSD balances." />
                <TreasuryCard icon={<Landmark className="w-5 h-5" />} title="Custodial Isolation" desc="Bank-grade security with segregated account structures." />
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

function TreasuryCard({ icon, title, desc }: { icon: any, title: string, desc: string }) {
    return (
        <div className="p-6 rounded-3xl bg-zinc-900/40 border border-white/5 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-amber-400">{icon}</div>
            <h4 className="font-bold text-white text-sm">{title}</h4>
            <p className="text-xs text-zinc-500 leading-relaxed">{desc}</p>
        </div>
    );
}
