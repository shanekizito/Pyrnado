import { Badge } from "@/components/ui/badge";
import { ArrowRight, DollarSign, Globe2, Repeat } from "lucide-react";

export default function PaymentsConcept() {
    return (
        <div className="space-y-16 max-w-5xl">
            <section className="space-y-6">
                <h1 className="text-4xl font-bold text-white tracking-tight">Understanding Payments</h1>
                <p className="text-xl text-zinc-400 leading-relaxed max-w-3xl">
                    Pyrnado breaks down international boundaries by transforming a complex sequence of local clearing events
                    into a simple, unified API request.
                </p>
            </section>

            {/* Lifecycle */}
            <section className="space-y-10">
                <h2 className="text-2xl font-bold text-white">Payment Lifecycle</h2>
                <div className="relative">
                    {/* Visual Line */}
                    <div className="absolute left-8 top-0 bottom-0 w-px bg-zinc-800 hidden md:block" />

                    <div className="space-y-12">
                        <LifecycleStep
                            title="Source Authorization"
                            status="Authorized"
                            desc="Funds are verified and locked in the sender's account. This happens instantly for Stablecoin sources."
                        />
                        <LifecycleStep
                            title="Liquidity Provisioning"
                            status="Exchanging"
                            desc="Pyrnado sources liquidity for the destination currency. We use a hybrid of local fiat reserves and on-chain liquidity."
                        />
                        <LifecycleStep
                            title="Local Settlement"
                            status="Settled"
                            desc="Funds are disbursed via local rails (e.g., SEPA in Europe, PIX in Brazil, NIP in Nigeria)."
                        />
                    </div>
                </div>
            </section>

            {/* CORRIDORS */}
            <section className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-20">
                <div className="p-8 rounded-2xl bg-white/[0.02] border border-white/5 space-y-4">
                    <Globe2 className="w-6 h-6 text-emerald-400" />
                    <h3 className="text-lg font-bold text-white">Global Corridors</h3>
                    <p className="text-sm text-zinc-500 leading-relaxed">
                        We support 180+ countries. For major corridors (USD-NGN, EUR-USD, GBP-PHP),
                        settlement is near-instant (under 5 minutes).
                    </p>
                </div>
                <div className="p-8 rounded-2xl bg-white/[0.02] border border-white/5 space-y-4">
                    <Repeat className="w-6 h-6 text-blue-400" />
                    <h3 className="text-lg font-bold text-white">Idempotency-First</h3>
                    <p className="text-sm text-zinc-500 leading-relaxed">
                        Every payment on our platform requires an Idempotency-Key. If your network fails,
                        you can safely retry without double-paying.
                    </p>
                </div>
            </section>
        </div>
    );
}

function LifecycleStep({ title, status, desc }: { title: string; status: string; desc: string }) {
    return (
        <div className="flex flex-col md:flex-row gap-6 md:gap-16 items-start">
            <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0 z-10 relative">
                <DollarSign className="w-6 h-6" />
            </div>
            <div className="space-y-2">
                <div className="flex items-center gap-3">
                    <h3 className="text-xl font-bold text-white">{title}</h3>
                    <Badge variant="outline" className="text-[10px] uppercase border-white/10 text-zinc-500">{status}</Badge>
                </div>
                <p className="text-zinc-400 max-w-2xl text-sm leading-relaxed">{desc}</p>
            </div>
        </div>
    );
}
