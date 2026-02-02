import { CodeWindow } from "@/components/docs/CodeWindow";
import { DocCallout } from "@/components/docs/DocCallout";
import { Badge } from "@/components/ui/badge";
import { Shield, Lock, Unlock, Gavel, Scale, AlertOctagon } from "lucide-react";
import { cn } from "@/lib/utils";

export default function EscrowAPI() {
    return (
        <div className="space-y-16 max-w-5xl">
            <div>
                <div className="flex items-center gap-3 mb-6">
                    <h1 className="text-4xl font-bold text-white tracking-tight">Escrow API</h1>
                    <Badge variant="outline" className="border-indigo-500/20 text-indigo-400">Trustless V2</Badge>
                </div>
                <p className="text-xl text-zinc-400 leading-relaxed max-w-3xl">
                    Secure large-scale payments with programmable escrow.
                    Funds are held in smart contracts and only released when specific
                    off-chain milestones or multi-sig conditions are met.
                </p>
            </div>

            {/* --- ENDPOINT: CREATE ESCROW --- */}
            <section className="space-y-8">
                <div className="flex items-center gap-3">
                    <Badge className="bg-emerald-500/10 text-emerald-400 py-1 px-3 border border-emerald-500/20 font-mono">POST</Badge>
                    <code className="text-xl font-mono text-white">/v1/escrow/contracts</code>
                </div>

                <div className="grid grid-cols-1 xl:grid-cols-2 gap-10">
                    <div className="space-y-6">
                        <h2 className="text-2xl font-bold text-zinc-100">Deploy Escrow</h2>
                        <p className="text-zinc-400 text-sm">
                            Deploys a new escrow contract with specified participants and release logic.
                        </p>

                        <div className="space-y-4">
                            <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Response Codes</h3>
                            <ResponseCode code="201 Created" desc="Contract deployed on-chain." color="emerald" />
                            <ResponseCode code="400 Bad Request" desc="Invalid milestone structure." color="zinc" />
                        </div>
                    </div>

                    <div className="space-y-4">
                        <CodeWindow
                            language="bash"
                            title="cURL"
                            code={`curl https://api.pyrnado.com/v1/escrow/contracts \\
  -d client_id="cli_123" \\
  -d contractor_id="wkr_456" \\
  -d total_amount=1500000`}
                        />
                    </div>
                </div>
            </section>

            {/* --- ENDPOINT: RELEASE FUNDS --- */}
            <section className="space-y-8 py-16 border-t border-white/5">
                <div className="flex items-center gap-3">
                    <Badge className="bg-purple-500/10 text-purple-400 py-1 px-3 border border-purple-500/20 font-mono">POST</Badge>
                    <code className="text-xl font-mono text-white">/v1/escrow/contracts/:id/release</code>
                </div>

                <div className="grid grid-cols-1 xl:grid-cols-2 gap-10">
                    <div className="space-y-6">
                        <h2 className="text-2xl font-bold text-zinc-100">Release Funds</h2>
                        <p className="text-zinc-400 text-sm">
                            Triggers the release of funds from the escrow vault to the designated recipient.
                        </p>
                        <ResponseCode code="200 OK" desc="Funds moved to settlement rail." color="emerald" />
                        <ResponseCode code="403 Forbidden" desc="Sender lacks release permission." color="zinc" />
                    </div>
                </div>
            </section>

            <DocCallout icon={Lock} title="Immutable Terms">
                Once an escrow is deployed, the financial terms cannot be changed without the explicit signature of all parties involved.
            </DocCallout>
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
