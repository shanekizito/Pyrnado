import { CodeWindow } from "@/components/docs/CodeWindow";
import { DocCallout } from "@/components/docs/DocCallout";
import { Badge } from "@/components/ui/badge";
import { BarChart3, PieChart, TrendingUp, Download, Search, Table } from "lucide-react";
import { cn } from "@/lib/utils";

export default function AnalyticsAPI() {
    return (
        <div className="space-y-16 max-w-5xl">
            <div>
                <div className="flex items-center gap-3 mb-6">
                    <h1 className="text-4xl font-bold text-white tracking-tight">Analytics API</h1>
                    <Badge variant="outline" className="border-purple-500/20 text-purple-400">Insights V2</Badge>
                </div>
                <p className="text-xl text-zinc-400 leading-relaxed max-w-3xl">
                    Turn your payment data into actionable intelligence.
                    The Analytics API provides aggregate metrics, custom reporting,
                    and real-time volume tracking across all your corridors.
                </p>
            </div>

            {/* --- ENDPOINT: GET METRICS --- */}
            <section className="space-y-8">
                <div className="flex items-center gap-3">
                    <Badge className="bg-blue-500/10 text-blue-400 py-1 px-3 border border-blue-500/20 font-mono">GET</Badge>
                    <code className="text-xl font-mono text-white">/v1/analytics/metrics</code>
                </div>

                <div className="grid grid-cols-1 xl:grid-cols-2 gap-10">
                    <div className="space-y-6">
                        <h2 className="text-2xl font-bold text-zinc-100">Get Global Stats</h2>
                        <p className="text-zinc-400 text-sm">
                            Retrieve high-level metrics including total volume, success rates, and average settlement times.
                        </p>

                        <div className="space-y-4">
                            <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Response Codes</h3>
                            <ResponseCode code="200 OK" desc="Metrics aggregated successfully." color="blue" />
                        </div>
                    </div>

                    <div className="space-y-4">
                        <CodeWindow
                            language="bash"
                            title="cURL"
                            code={`curl https://api.pyrnado.com/v1/analytics/metrics?period=30d`}
                        />
                        <CodeWindow
                            language="json"
                            title="Response"
                            code={`{
  "total_volume_usd": 12500000,
  "success_rate": 0.998,
  "avg_settlement_mins": 14.5
}`}
                        />
                    </div>
                </div>
            </section>

            <DocCallout icon={Search} title="Data Residency">
                Analytics data is stored in the region where the transaction originated by default to comply with local data protection laws.
            </DocCallout>

            {/* highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 py-12">
                <AnalyticsCard icon={<TrendingUp className="w-5 h-5" />} title="Anomaly Detection" desc="ML-driven alerts for unusual volume shifts." />
                <AnalyticsCard icon={<PieChart className="w-5 h-5" />} title="Corridor Health" desc="Performance breakdown by country and rail." />
                <AnalyticsCard icon={<Download className="w-5 h-5" />} title="Auto-Exports" desc="Scheduled CSV/PDF delivery to S3 buckets." />
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

function AnalyticsCard({ icon, title, desc }: { icon: any, title: string, desc: string }) {
    return (
        <div className="p-6 rounded-3xl bg-zinc-900/40 border border-white/5 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-purple-400">{icon}</div>
            <h4 className="font-bold text-white text-sm">{title}</h4>
            <p className="text-xs text-zinc-500 leading-relaxed">{desc}</p>
        </div>
    );
}
