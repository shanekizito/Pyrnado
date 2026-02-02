import { CodeWindow } from "@/components/docs/CodeWindow";
import { DocCallout } from "@/components/docs/DocCallout";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, Terminal, HelpCircle, ShieldAlert } from "lucide-react";

export default function Errors() {
    return (
        <div className="space-y-16 max-w-5xl pb-20">
            <section className="space-y-6">
                <h1 className="text-5xl font-bold text-white tracking-tight">Errors & Status</h1>
                <p className="text-xl text-zinc-400 leading-relaxed max-w-3xl">
                    Pyrnado uses standard HTTP response codes to indicate the success or
                    failure of an API request. Codes in the `4xx` range indicate an error
                    that failed given the information provided.
                </p>
            </section>

            {/* Error Object structure */}
            <section className="space-y-8">
                <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                    <Terminal className="w-6 h-6 text-emerald-400" /> Error Object
                </h2>
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-10">
                    <div className="space-y-6">
                        <p className="text-zinc-400 leading-relaxed">
                            Every error response includes a JSON object detailing the `type` of
                            failure and a human-readable `message`. This allows your code to
                            programmatically react to specific edge cases.
                        </p>
                        <DocCallout type="info" title="Status Attribute">
                            We include the HTTP status code inside the JSON body as well, to
                            simplify parsing in client-side libraries.
                        </DocCallout>
                    </div>
                    <CodeWindow
                        language="json"
                        title="Error Response"
                        code={`{\n  "error": {\n    "type": "invalid_request_error",\n    "code": "parameter_missing",\n    "message": "The 'amount' parameter is required.",\n    "param": "amount",\n    "status": 400\n  }\n}`}
                    />
                </div>
            </section>

            {/* Status Code Table */}
            <section className="space-y-8 border-t border-white/5 pt-16">
                <h2 className="text-2xl font-bold text-white">HTTP Status Codes</h2>
                <div className="border border-white/5 rounded-2xl overflow-hidden bg-white/[0.01]">
                    <table className="w-full text-sm text-left">
                        <thead className="bg-white/5 text-zinc-300 font-bold">
                            <tr>
                                <th className="px-6 py-4">Code</th>
                                <th className="px-6 py-4">Meaning</th>
                                <th className="px-6 py-4">Description</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            <CodeRow code="200" meaning="OK" desc="Everything worked as expected." />
                            <CodeRow code="400" meaning="Bad Request" desc="The request was unacceptable, often due to missing a required parameter." />
                            <CodeRow code="401" meaning="Unauthorized" desc="No valid API key provided." />
                            <CodeRow code="402" meaning="Request Failed" desc="The parameters were valid but the request failed (e.g. insufficient funds)." />
                            <CodeRow code="403" meaning="Forbidden" desc="The API key doesn't have permissions to perform the request." />
                            <CodeRow code="404" meaning="Not Found" desc="The requested resource doesn't exist." />
                            <CodeRow code="409" meaning="Conflict" desc="The request conflicts with another request (e.g. using the same idempotency key)." />
                            <CodeRow code="429" meaning="Too Many Requests" desc="Rate limit exceeded. Slow down your requests." />
                            <CodeRow code="5xx" meaning="Server Errors" desc="Something went wrong on Pyrnado's end. (Extremely rare)." />
                        </tbody>
                    </table>
                </div>
            </section>

            <DocCallout type="mistake" title="Ignoring 429s">
                Never ignore 429 errors. Your application should implement <span className="font-bold text-white">Exponential Backoff</span>
                and Jitter to spread out retries. Our SDKs handle this automatically.
            </DocCallout>

            {/* Help section */}
            <section className="bg-white/[0.02] border border-white/5 rounded-3xl p-10 flex flex-col md:flex-row gap-8 items-center text-center md:text-left">
                <div className="p-4 rounded-2xl bg-zinc-900 border border-zinc-800">
                    <HelpCircle className="w-8 h-8 text-blue-400" />
                </div>
                <div className="space-y-2 flex-1">
                    <h3 className="text-xl font-bold text-white">Still stuck?</h3>
                    <p className="text-sm text-zinc-500">
                        Include the <code className="text-emerald-400">Request-Id</code> (found in response headers)
                        when contacting support to help us trace your specific transaction.
                    </p>
                </div>
                <button className="h-10 px-6 rounded-full bg-white text-black font-bold text-xs hover:bg-zinc-200 transition-all">
                    Contact Engineering
                </button>
            </section>

        </div>
    );
}

function CodeRow({ code, meaning, desc }: { code: string; meaning: string; desc: string }) {
    return (
        <tr className="hover:bg-white/[0.02] transition-colors">
            <td className="px-6 py-4 font-mono font-bold text-emerald-400">{code}</td>
            <td className="px-6 py-4 font-bold text-zinc-300">{meaning}</td>
            <td className="px-6 py-4 text-zinc-500 leading-relaxed text-[13px]">{desc}</td>
        </tr>
    );
}
