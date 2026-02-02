import { CodeWindow } from "@/components/docs/CodeWindow";
import { Badge } from "@/components/ui/badge";
import { Terminal, Box, Zap, ShieldCheck } from "lucide-react";

export default function NodeSDK() {
    return (
        <div className="space-y-16 max-w-5xl">
            <div>
                <div className="flex items-center gap-3 mb-6">
                    <h1 className="text-4xl font-bold text-white">Node.js SDK</h1>
                    <Badge variant="outline" className="border-emerald-500/20 text-emerald-400">Official</Badge>
                </div>
                <p className="text-lg text-zinc-400 leading-relaxed max-w-3xl">
                    The official Pyrnado Node.js library for server-side applications.
                    Built with TypeScript for full type safety and async/await support.
                </p>
            </div>

            {/* Installation */}
            <section className="space-y-6">
                <div className="flex items-center gap-3">
                    <Terminal className="w-5 h-5 text-emerald-400" />
                    <h2 className="text-2xl font-bold text-white">Installation</h2>
                </div>
                <CodeWindow code="npm install @pyrnado/client" language="bash" title="Terminal" />
            </section>

            {/* Auth */}
            <section className="space-y-6">
                <div className="flex items-center gap-3">
                    <ShieldCheck className="w-5 h-5 text-blue-400" />
                    <h2 className="text-2xl font-bold text-white">Authentication</h2>
                </div>
                <p className="text-sm text-zinc-500">Initialize the client with your secret key.</p>
                <CodeWindow
                    language="typescript"
                    title="index.ts"
                    code={`import { Pyrnado } from '@pyrnado/client';

const client = new Pyrnado({
  apiKey: process.env.PYRNADO_SECRET_KEY,
  timeout: 10000, // 10s timeout
});`}
                />
            </section>

            {/* Features */}
            <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <SDKFeature
                    title="Typed Responses"
                    desc="Every API response is fully typed using TypeScript interfaces, reducing runtime errors."
                />
                <SDKFeature
                    title="Automatic Retries"
                    desc="The SDK automatically retries requests on network or 5xx errors with exponential backoff."
                />
            </section>

            {/* Usage Example */}
            <section className="space-y-8 border-t border-white/5 pt-16">
                <h2 className="text-2xl font-bold text-white">Advanced Usage: Creating a Batch Payroll</h2>
                <CodeWindow
                    language="typescript"
                    title="payroll.ts"
                    code={`// Batching payments with the SDK
const batch = await client.payroll.batches.create({
  name: "January 2024 Salaries",
  items: [
    { worker_id: "wrk_1", amount: 200000 },
    { worker_id: "wrk_2", amount: 150000 }
  ]
});

// Poll for status or wait for webhook
console.log('Batch created:', batch.status);`}
                />
            </section>
        </div>
    );
}

function SDKFeature({ title, desc }: { title: string; desc: string }) {
    return (
        <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5">
            <h3 className="font-bold text-zinc-200 mb-2">{title}</h3>
            <p className="text-sm text-zinc-500 leading-relaxed">{desc}</p>
        </div>
    );
}
