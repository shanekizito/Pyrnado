import { CodeWindow } from "@/components/docs/CodeWindow";
import { DocCallout } from "@/components/docs/DocCallout";
import { Badge } from "@/components/ui/badge";
import { ShieldCheck, UserCheck, Search, FileLock, UserX, Info } from "lucide-react";
import { cn } from "@/lib/utils";

export default function ComplianceAPI() {
    return (
        <div className="space-y-16 max-w-5xl">
            <div>
                <div className="flex items-center gap-3 mb-6">
                    <h1 className="text-4xl font-bold text-white tracking-tight">Compliance API</h1>
                    <Badge variant="outline" className="border-emerald-500/20 text-emerald-400">Regulated V2</Badge>
                </div>
                <p className="text-xl text-zinc-400 leading-relaxed max-w-3xl">
                    Automated KYC, KYB, and AML screening. Maintain a global audit trail
                    and verify identities in seconds with our AI-powered verification engine.
                </p>
            </div>

            {/* --- ENDPOINT: CHECK IDENTITY --- */}
            <section className="space-y-8">
                <div className="flex items-center gap-3">
                    <Badge className="bg-emerald-500/10 text-emerald-400 py-1 px-3 border border-emerald-500/20 font-mono">POST</Badge>
                    <code className="text-xl font-mono text-white">/v1/compliance/verify</code>
                </div>

                <div className="grid grid-cols-1 xl:grid-cols-2 gap-10">
                    <div className="space-y-6">
                        <h2 className="text-2xl font-bold text-zinc-100">Verify Identity</h2>
                        <p className="text-zinc-400 text-sm">
                            Submit documents or person data for real-time KYC screening.
                        </p>

                        <div className="space-y-4">
                            <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Response Codes</h3>
                            <ResponseCode code="200 OK" desc="Verification result returned." color="emerald" />
                            <ResponseCode code="400 Bad Request" desc="Invalid document image." color="zinc" />
                        </div>
                    </div>

                    <div className="space-y-4">
                        <CodeWindow
                            language="bash"
                            title="cURL"
                            code={`curl https://api.pyrnado.com/v1/compliance/verify \\
  -d full_name="Jane Doe" \\
  -d dob="1990-01-01" \\
  -d document_type="passport"`}
                        />
                    </div>
                </div>
            </section>

            {/* --- ENDPOINT: GET STATUS --- */}
            <section className="space-y-8 py-16 border-t border-white/5">
                <div className="flex items-center gap-3">
                    <Badge className="bg-blue-500/10 text-blue-400 py-1 px-3 border border-blue-500/20 font-mono">GET</Badge>
                    <code className="text-xl font-mono text-white">/v1/compliance/status/:id</code>
                </div>

                <div className="grid grid-cols-1 xl:grid-cols-2 gap-10">
                    <div className="space-y-6">
                        <h2 className="text-2xl font-bold text-zinc-100">Check Status</h2>
                        <p className="text-zinc-400 text-sm">
                            Retrieve the current verification status for a specific person or business.
                        </p>
                        <ResponseCode code="200 OK" desc="Returns 'verified', 'pending', or 'rejected'." color="blue" />
                    </div>
                </div>
            </section>

            <DocCallout icon={Info} title="Sanctions Screening">
                Every verification request automatically checks against OFAC, EU, and UN sanctions lists. Results are updated every 24 hours.
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
