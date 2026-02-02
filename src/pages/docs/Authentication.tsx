import { CodeWindow } from "@/components/docs/CodeWindow";
import { DocCallout } from "@/components/docs/DocCallout";
import { Badge } from "@/components/ui/badge";
import { Shield, Lock, Key, AlertOctagon } from "lucide-react";

export default function Authentication() {
    const authCode = `// Authenticate with your secret API key
const client = new Pyrnado({
  apiKey: 'sk_test_51Mz...',
  apiVersion: '2024-03-20'
});`;

    const errorResponse = `{
  "error": {
    "type": "authentication_error",
    "message": "Invalid API Key provided",
    "status": 401
  }
}`;

    return (
        <div className="space-y-16 max-w-5xl">
            <section className="space-y-6">
                <h1 className="text-5xl font-bold text-white tracking-tight">Authentication</h1>
                <p className="text-xl text-zinc-400 leading-relaxed max-w-3xl">
                    The Pyrnado API uses API keys to authenticate requests. We follow the industry-standard
                    Basic Authentication scheme where your secret key is the username.
                </p>
            </section>

            {/* Key Types Section */}
            <section className="space-y-8">
                <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                    <Key className="w-6 h-6 text-emerald-400" /> API Keys
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="p-8 rounded-3xl bg-white/[0.02] border border-white/5 space-y-4">
                        <div className="flex items-center justify-between">
                            <h3 className="text-lg font-bold text-white">Publishable Keys</h3>
                            <Badge variant="outline" className="text-[10px] border-emerald-500/20 text-emerald-400 uppercase">Frontend</Badge>
                        </div>
                        <p className="text-sm text-zinc-500 leading-relaxed">
                            Use these in your client-side code (Web, iOS, Android) to tokenize sensitive data.
                            If leaked, these keys cannot perform financial actions.
                        </p>
                        <code className="block p-3 rounded-lg bg-black/40 border border-white/5 text-emerald-300 font-mono text-xs">pk_test_...</code>
                    </div>

                    <div className="p-8 rounded-3xl bg-white/[0.02] border border-white/5 space-y-4">
                        <div className="flex items-center justify-between">
                            <h3 className="text-lg font-bold text-white">Secret Keys</h3>
                            <Badge variant="outline" className="text-[10px] border-amber-500/20 text-amber-400 uppercase">Backend</Badge>
                        </div>
                        <p className="text-sm text-zinc-500 leading-relaxed">
                            Use these on your secure server to perform sensitive operations like creating payments or refunds.
                            <strong>Never expose these keys.</strong>
                        </p>
                        <code className="block p-3 rounded-lg bg-black/40 border border-white/5 text-amber-300 font-mono text-xs">sk_test_...</code>
                    </div>
                </div>

                <DocCallout type="mistake" title="Mistakes to Avoid">
                    <ul className="list-disc list-inside space-y-2">
                        <li>Never commit secret keys to GitHub or any source control.</li>
                        <li>Do not use `sk_live_...` keys during development.</li>
                        <li>Avoid sharing keys over Slack, Discord, or email.</li>
                    </ul>
                </DocCallout>
            </section>

            {/* Using the Key */}
            <section className="space-y-8">
                <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                    <Lock className="w-6 h-6 text-blue-400" /> Request Headers
                </h2>
                <p className="text-zinc-400 leading-relaxed max-w-3xl">
                    All API requests must be made over <span className="text-white font-medium">HTTPS</span>.
                    Requests made over HTTP will fail. Provide your API key as the Basic Auth username.
                </p>

                <div className="grid grid-cols-1 xl:grid-cols-2 gap-10">
                    <div className="space-y-6">
                        <h3 className="text-sm font-bold text-zinc-500 uppercase tracking-widest">Server-side Example</h3>
                        <CodeWindow code={authCode} language="typescript" title="index.ts" />
                    </div>
                    <div className="space-y-6">
                        <h3 className="text-sm font-bold text-zinc-500 uppercase tracking-widest">Plain HTTP Request</h3>
                        <code className="block p-4 rounded-xl bg-[#111] border border-white/10 text-zinc-400 font-mono text-[13px] leading-relaxed">
                            POST /v1/transfers HTTP/1.1<br />
                            Host: api.pyrnado.com<br />
                            <span className="text-emerald-400">Authorization: Basic c2tfdGVzdF81MU16...</span><br />
                            Content-Type: application/json
                        </code>
                        <CodeWindow
                            language="json"
                            title="Authenticated Response"
                            code={`{
  "authenticated": true,
  "organization": "Acme Corp",
  "mode": "test"
}`}
                        />
                    </div>
                </div>
            </section>

            {/* Security Highlights */}
            <section className="space-y-8 border-t border-white/5 pt-16">
                <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                    <Shield className="w-6 h-6 text-purple-400" /> Security Best Practices
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <HighlightBox
                        icon={<AlertOctagon className="w-5 h-5 text-red-400" />}
                        title="Key Rotation"
                        desc="If a key is compromised, roll it immediately in the dashboard to invalidate old ones."
                    />
                    <HighlightBox
                        icon={<Lock className="w-5 h-5 text-blue-400" />}
                        title="IP Whitelisting"
                        desc="Restrict live secret keys to specific server IP addresses for an extra layer of defense."
                    />
                </div>
            </section>

            {/* Error States */}
            <section className="space-y-8">
                <h2 className="text-2xl font-bold text-white">Handling Errors</h2>
                <p className="text-zinc-400">
                    If authentication fails, the API responds with a 401 status code and a JSON error object.
                </p>
                <CodeWindow code={errorResponse} language="json" title="Response (401)" />
            </section>
        </div>
    );
}

function HighlightBox({ icon, title, desc }: { icon: any; title: string; desc: string }) {
    return (
        <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 space-y-4 hover:bg-white/[0.04] transition-colors">
            <div className="w-10 h-10 rounded-xl bg-white/[0.05] border border-white/10 flex items-center justify-center">
                {icon}
            </div>
            <h3 className="font-bold text-white">{title}</h3>
            <p className="text-sm text-zinc-500 leading-relaxed">{desc}</p>
        </div>
    );
}
