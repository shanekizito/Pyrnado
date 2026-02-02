import { CodeWindow } from "@/components/docs/CodeWindow";
import { Badge } from "@/components/ui/badge";
import { Terminal, ShieldCheck, Zap, Info } from "lucide-react";

export default function PythonSDK() {
    return (
        <div className="space-y-16 max-w-5xl">
            <div>
                <div className="flex items-center gap-3 mb-6">
                    <h1 className="text-4xl font-bold text-white">Python SDK</h1>
                    <Badge variant="outline" className="border-blue-500/20 text-blue-400">Official</Badge>
                </div>
                <p className="text-lg text-zinc-400 leading-relaxed max-w-3xl">
                    The Pyrnado Python library provides convenient access to the Pyrnado REST API
                    from applications written in the Python language. Suitable for Django, Flask, and FastAPI.
                </p>
            </div>

            {/* Installation */}
            <section className="space-y-6">
                <div className="flex items-center gap-3">
                    <Terminal className="w-5 h-5 text-blue-400" />
                    <h2 className="text-2xl font-bold text-white">Installation</h2>
                </div>
                <CodeWindow code="pip install pyrnado" language="bash" title="Terminal" />
            </section>

            {/* Auth */}
            <section className="space-y-6">
                <div className="flex items-center gap-3">
                    <ShieldCheck className="w-5 h-5 text-emerald-400" />
                    <h2 className="text-2xl font-bold text-white">Authentication</h2>
                </div>
                <CodeWindow
                    language="python"
                    title="main.py"
                    code={`import pyrnado

pyrnado.api_key = "sk_test_..."
# Optional: Set a specific API version
pyrnado.api_version = "2024-03-20"`}
                />
            </section>

            {/* Advanced Usage */}
            <section className="space-y-8">
                <h2 className="text-2xl font-bold text-white">Asynchronous Support</h2>
                <p className="text-zinc-400">
                    For high-performance applications, use the `async_` methods which return coroutines.
                </p>
                <CodeWindow
                    language="python"
                    title="async_app.py"
                    code={`import asyncio
import pyrnado

async def create_transfer():
    transfer = await pyrnado.Transfer.create_async(
        amount=1000,
        currency="usd",
        recipient="rcpt_1"
    )
    print(f"Created transfer {transfer.id}")

asyncio.run(create_transfer())`}
                />
            </section>

            {/* Warning */}
            <section className="p-8 rounded-2xl bg-blue-500/5 border border-blue-500/20 flex items-start gap-6">
                <Info className="w-6 h-6 text-blue-400 shrink-0 mt-1" />
                <div className="space-y-2">
                    <h3 className="text-lg font-bold text-white">Thread Safety</h3>
                    <p className="text-sm text-zinc-400 leading-relaxed">
                        The library is thread-safe and can be used in multi-threaded environments such as gunicorn or uWSGI workers.
                        Network connections are pooled automatically.
                    </p>
                </div>
            </section>
        </div>
    );
}
