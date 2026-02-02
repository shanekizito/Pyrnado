import { CodeWindow } from "@/components/docs/CodeWindow";
import { DocCallout } from "@/components/docs/DocCallout";
import { Badge } from "@/components/ui/badge";
import { Zap, FlaskConical, ShieldCheck, Microscope, AlertTriangle } from "lucide-react";
import { Link } from "react-router-dom";

export default function Testing() {
    return (
        <div className="space-y-16 max-w-5xl pb-20">
            <section className="space-y-6">
                <h1 className="text-5xl font-bold text-white tracking-tight">Testing & Sandbox</h1>
                <p className="text-xl text-zinc-400 leading-relaxed max-w-3xl">
                    Our dedicated Sandbox environment allows you to simulate every part of the
                    Pyrnado lifecycle—from bank settlement to KYC rejection—without any
                    financial risk or regulatory overhead.
                </p>
            </section>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <DocCallout type="info" title="Environment URL">
                    To target the sandbox, use the base URL <code className="text-white">https://api.sandbox.pyrnado.com</code>
                    or simply use your `sk_test_...` key with our SDKs.
                </DocCallout>
                <DocCallout type="warning" title="No Real Money">
                    Transactions in the Sandbox are purely illustrative. No real funds will
                    ever move, regardless of the bank account or card details provided.
                </DocCallout>
            </div>

            {/* Test Scenarios */}
            <section className="space-y-10">
                <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                    <Microscope className="w-6 h-6 text-purple-400" /> Simulating Events
                </h2>
                <p className="text-zinc-400 leading-relaxed">
                    Trigger specific system behaviors by providing "magic amounts" or special strings.
                    This allows you to test how your application handles edge cases like
                    insufficient funds or compliance blocks.
                </p>

                <div className="border border-white/5 rounded-2xl overflow-hidden bg-white/[0.01]">
                    <table className="w-full text-sm text-left">
                        <thead className="bg-white/5 text-zinc-300 font-bold">
                            <tr>
                                <th className="px-6 py-4">Scenario</th>
                                <th className="px-6 py-4">Trigger</th>
                                <th className="px-6 py-4">Resulting API Response</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            <TestRow scenario="Success" trigger="Amount < $1000.00" result="200 OK / payout.paid" color="text-emerald-400" />
                            <TestRow scenario="Insufficient Funds" trigger="Amount = $99.01" result="402 Error" color="text-amber-400" />
                            <TestRow scenario="Compliance Reject" trigger="Amount = $99.02" result="403 Error / kyc.rejected" color="text-red-400" />
                            <TestRow scenario="Bank Timeout" trigger="Amount = $99.03" result="504 Timeout simulation" color="text-zinc-400" />
                        </tbody>
                    </table>
                </div>
            </section>

            <DocCallout type="mistake" title="Live Data in Sandbox">
                Never import real user data (Passport scans, SSNs) into the Sandbox.
                Even though it's restricted, we recommend using dummy data like
                "John Doe" and "123 Test St" for all sandbox registrations.
            </DocCallout>

            {/* Integration Test code */}
            <section className="space-y-8 border-t border-white/5 pt-16">
                <h2 className="text-2xl font-bold text-white">Example Integration Test</h2>
                <p className="text-zinc-500 text-sm">Use Jest or Mocha to verify your webhook handlers using test events.</p>
                <CodeWindow
                    language="typescript"
                    title="webhook.test.ts"
                    code={`it('should handle successful payout events', async () => {\n  const res = await request(app)\n    .post('/webhooks')\n    .send(testPayoutPaidEvent)\n    .set('Pyrnado-Signature', 'mock_sig');\n\n  expect(res.status).toBe(200);\n  expect(updateDatabase).toHaveBeenCalled();\n});`}
                />
            </section>

            <section className="bg-emerald-500/5 border border-emerald-500/20 rounded-3xl p-12 text-center space-y-4">
                <FlaskConical className="w-12 h-12 text-emerald-400 mx-auto" />
                <h3 className="text-2xl font-bold text-white">Finished Testing?</h3>
                <p className="text-zinc-400 max-w-xl mx-auto text-sm">
                    Move your integration to production by swapping keys and following our
                    graduation checklist.
                </p>
                <Link to="/docs/go-live">
                    <button className="h-10 px-6 rounded-full bg-emerald-500 text-black font-bold text-xs hover:bg-emerald-400 transition-all">
                        Move to Production
                    </button>
                </Link>
            </section>

        </div>
    );
}

function TestRow({ scenario, trigger, result, color }: { scenario: string; trigger: string; result: string; color: string }) {
    return (
        <tr className="hover:bg-white/[0.02] transition-colors">
            <td className="px-6 py-4 font-bold text-white">{scenario}</td>
            <td className="px-6 py-4 text-zinc-400 font-mono text-xs">{trigger}</td>
            <td className={`px-6 py-4 font-mono text-xs ${color}`}>{result}</td>
        </tr>
    );
}
