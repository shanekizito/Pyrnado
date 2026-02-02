import { CodeWindow } from "@/components/docs/CodeWindow";
import { Badge } from "@/components/ui/badge";
import { Layers, Zap, Code2, Terminal } from "lucide-react";

export default function ReactSDK() {
    return (
        <div className="space-y-16 max-w-5xl">
            <div>
                <div className="flex items-center gap-3 mb-6">
                    <h1 className="text-4xl font-bold text-white">React SDK</h1>
                    <Badge variant="outline" className="border-blue-400/20 text-blue-400">Frontend</Badge>
                </div>
                <p className="text-lg text-zinc-400 leading-relaxed max-w-3xl">
                    Build beautiful, PCI-compliant payment experiences in your React application.
                    Includes components for secure card entry and custom hooks for account management.
                </p>
            </div>

            {/* Installation */}
            <section className="space-y-6">
                <div className="flex items-center gap-3">
                    <Terminal className="w-5 h-5 text-blue-400" />
                    <h2 className="text-2xl font-bold text-white">Installation</h2>
                </div>
                <CodeWindow code="npm install @pyrnado/react" language="bash" title="Terminal" />
            </section>

            {/* Provider Setup */}
            <section className="space-y-8">
                <div className="flex items-center gap-3">
                    <Layers className="w-5 h-5 text-purple-400" />
                    <h2 className="text-2xl font-bold text-white">Provider Setup</h2>
                </div>
                <p className="text-zinc-500">Wrap your application in the `PyrnadoProvider` with your Publishable Key.</p>
                <CodeWindow
                    language="tsx"
                    title="App.tsx"
                    code={`import { PyrnadoProvider } from '@pyrnado/react';

function App() {
  return (
    <PyrnadoProvider publishableKey="pk_test_...">
      <MyCommerceApp />
    </PyrnadoProvider>
  );
}`}
                />
            </section>

            {/* Custom Hooks */}
            <section className="space-y-8">
                <div className="flex items-center gap-3">
                    <Zap className="w-5 h-5 text-amber-400" />
                    <h2 className="text-2xl font-bold text-white">The usePyrnado Hook</h2>
                </div>
                <p className="text-zinc-400">Access the Pyrnado instance anywhere in your component tree.</p>
                <CodeWindow
                    language="tsx"
                    title="BalanceSummary.tsx"
                    code={`import { usePyrnado } from '@pyrnado/react';

export function BalanceSummary() {
  const { balance, loading, error } = usePyrnado();

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      Total Balance: $\{balance.available\} $\{balance.currency\}
    </div>
  );
}`}
                />
            </section>
        </div>
    );
}
