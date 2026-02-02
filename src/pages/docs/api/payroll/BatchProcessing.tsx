import { DocCallout } from "@/components/docs/DocCallout";
import { CodeWindow } from "@/components/docs/CodeWindow";
import { Badge } from "@/components/ui/badge";
import { Layers, Zap, Clock, CheckCircle2, AlertCircle, FileText } from "lucide-react";
import { cn } from "@/lib/utils";

export default function BatchProcessing() {
    return (
        <div className="max-w-4xl mx-auto space-y-12 animate-in fade-in duration-500 pb-20">
            {/* Hero Section */}
            <div className="space-y-4">
                <div className="flex items-center gap-3 mb-2">
                    <Badge variant="outline" className="bg-blue-500/5 text-blue-400 border-blue-400/20 px-3 py-1">
                        High-Throughput
                    </Badge>
                    <div className="h-px flex-1 bg-gradient-to-r from-blue-500/20 to-transparent" />
                </div>
                <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
                    Batch <span className="text-blue-400">Processing</span>
                </h1>
                <p className="text-lg text-zinc-400 leading-relaxed max-w-2xl">
                    Execute thousands of payments with a single API call. Perfect for monthly payroll runs and mass disbursements.
                </p>
            </div>

            <DocCallout icon={Layers} title="Atomic Batches">
                Payroll batches are processed atomically. If a single high-priority validation fails, the entire batch is held for review, preventing partial payroll errors.
            </DocCallout>

            {/* --- ENDPOINT: CREATE BATCH --- */}
            <section className="space-y-6 pt-12 border-t border-white/5">
                <div className="flex items-center gap-3 mb-4">
                    <Badge className="bg-emerald-500/10 text-emerald-400 py-1 px-3 border border-emerald-500/20 font-mono text-[10px]">POST</Badge>
                    <code className="text-lg font-mono text-white">/v1/payroll/batches</code>
                </div>

                <div className="grid grid-cols-1 xl:grid-cols-2 gap-10">
                    <div className="space-y-6">
                        <h2 className="text-2xl font-bold text-white">Initiate Batch</h2>
                        <p className="text-zinc-400 text-sm">
                            Submit a list of payments to be processed. Each item must reference a valid `worker_id`.
                        </p>

                        <div className="space-y-4">
                            <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Response Codes</h3>
                            <div className="space-y-2">
                                <ResponseCode code="201 Created" desc="Batch accepted for processing." color="emerald" />
                                <ResponseCode code="422 Unprocessable" desc="Validation error in batch items." color="zinc" />
                            </div>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <CodeWindow
                            title="create-batch.bash"
                            code={`curl https://api.pyrnado.com/v1/payroll/batches \\
  -d payments[0][worker_id]="wkr_123" \\
  -d payments[0][amount]=250000 \\
  -d payments[1][worker_id]="wkr_456" \\
  -d payments[1][amount]=180000`}
                        />
                    </div>
                </div>
            </section>

            {/* --- ENDPOINT: GET BATCH --- */}
            <section className="space-y-6 pt-12 border-t border-white/5">
                <div className="flex items-center gap-3 mb-4">
                    <Badge className="bg-blue-500/10 text-blue-400 py-1 px-3 border border-blue-500/20 font-mono text-[10px]">GET</Badge>
                    <code className="text-lg font-mono text-white">/v1/payroll/batches/:id</code>
                </div>

                <div className="grid grid-cols-1 xl:grid-cols-2 gap-10">
                    <div className="space-y-6">
                        <h2 className="text-2xl font-bold text-white">Batch Status</h2>
                        <p className="text-zinc-400 text-sm">
                            Retrieve the real-time processing status of a batch, including success/failure counts.
                        </p>

                        <div className="space-y-4">
                            <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Response Codes</h3>
                            <div className="space-y-2">
                                <ResponseCode code="200 OK" desc="Batch details returned." color="blue" />
                            </div>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <CodeWindow
                            title="get-batch.bash"
                            code={`curl https://api.pyrnado.com/v1/payroll/batches/bat_772`}
                        />
                    </div>
                </div>
            </section>

            {/* Batch Workflow Recap */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-12">
                {[
                    { title: "Validation", desc: "Balance check & KYC verification of all recipients.", icon: Zap },
                    { title: "Execution", desc: "Parallel processing across local clearing houses.", icon: Clock },
                    { title: "Reporting", desc: "Automated ledger generation and tax receipts.", icon: FileText }
                ].map((item, i) => (
                    <div key={i} className="p-6 rounded-3xl bg-white/[0.02] border border-white/5 space-y-3">
                        <item.icon className="w-5 h-5 text-blue-400" />
                        <h4 className="font-bold text-white text-sm">{item.title}</h4>
                        <p className="text-xs text-zinc-500 leading-relaxed">{item.desc}</p>
                    </div>
                ))}
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
