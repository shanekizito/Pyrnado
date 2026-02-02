import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Check, Copy, ArrowRight, Terminal } from "lucide-react";
import { Button } from "@/components/ui/button";

const codeExamples = {
  curl: `curl -X POST https://api.pyrnado.network/v1/payouts \\
  -H "Authorization: Bearer sk_live_..." \\
  -d '{
    "amount": 1000,
    "currency": "USDC",
    "recipient": {
      "name": "Jane Doe",
      "wallet": "0x742d35Cc6634C0532925a3b844Bc454e4438f44e"
    },
    "metadata": {
      "type": "payroll",
      "month": "january"
    }
  }'`,
  python: `import pyrnado

client = pyrnado.Client("sk_live_...")

payout = client.payouts.create(
    amount=1000,
    currency="USDC",
    recipient={
        "name": "Jane Doe",
        "wallet": "0x742d...",
    },
    metadata={"type": "payroll"}
)

print(f"Payout {payout.id} sent on Polygon")`,
  node: `import Pyrnado from 'pyrnado';

const client = new Pyrnado('sk_live_...');

const payout = await client.payouts.create({
  amount: 1000,
  currency: 'USDC',
  recipient: {
    name: 'Jane Doe',
    wallet: '0x742d...',
  },
  metadata: { type: 'payroll' }
});

console.log(\`Payout \${payout.id} sent on Polygon\`);`,
};

type Lang = keyof typeof codeExamples;

const features = [
  "Single API for Payroll, Escrow & Remittances",
  "Programmatic wallet generation",
  "Real-time webhooks for blockchain events",
  "Automatic gas management",
  "Safe retry with idempotency keys",
  "Instant finality on L2s",
];

export function CodeSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeLang, setActiveLang] = useState<Lang>("node");
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(codeExamples[activeLang]);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section ref={ref} className="py-32 lg:py-40 relative bg-[#020202] overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-20 pointer-events-none" />
      {/* Glow effect */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-500/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="container mx-auto relative z-10 px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left - Text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-bold uppercase tracking-wider mb-8">
              <Terminal className="w-4 h-4 mr-1" />
              Developer API
            </span>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-8 leading-[1.1] tracking-tight">
              Programmable
              <br />
              <span className="text-emerald-400">money infrastructure</span>
            </h2>
            <p className="text-xl sm:text-2xl text-zinc-400 mb-10 leading-relaxed font-light">
              Integrate stablecoin payouts, smart escrows, and wallet creation with a few lines of code.
            </p>

            {/* Feature list */}
            <ul className="space-y-4 mb-12">
              {features.map((feature) => (
                <li key={feature} className="flex items-start gap-4 text-base text-zinc-300">
                  <div className="mt-1 w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center shrink-0">
                    <Check className="w-3 h-3 text-emerald-400" />
                  </div>
                  {feature}
                </li>
              ))}
            </ul>

            <div className="flex flex-wrap gap-4">
              <Button className="h-12 px-8 rounded-full bg-indigo-600 text-white font-bold hover:bg-indigo-500 transition-all shadow-[0_0_20px_-5px_rgba(99,102,241,0.4)] hover:shadow-[0_0_30px_-5px_rgba(99,102,241,0.6)] group">
                Get API Keys
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button variant="outline" className="h-12 px-8 rounded-full border-white/10 bg-white/5 text-white hover:bg-white/10 hover:border-white/20 font-medium">
                View Docs
              </Button>
            </div>
          </motion.div>

          {/* Right - Code block */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="bg-[#0A0A0B]/80 backdrop-blur-xl rounded-3xl overflow-hidden border border-white/10 shadow-2xl shadow-indigo-500/10 hover:shadow-indigo-500/20 transition-all duration-500 group">
              {/* Tabs */}
              <div className="flex items-center justify-between border-b border-white/5 px-6 py-4 bg-white/5">
                <div className="flex gap-2">
                  {(["curl", "python", "node"] as Lang[]).map((lang) => (
                    <button
                      key={lang}
                      onClick={() => setActiveLang(lang)}
                      className={`px-4 py-2 text-xs font-mono rounded-lg transition-all font-bold uppercase tracking-wide ${activeLang === lang
                        ? "bg-indigo-500/20 text-indigo-300 border border-indigo-500/30"
                        : "text-zinc-500 hover:text-zinc-300 hover:bg-white/5"
                        }`}
                    >
                      {lang}
                    </button>
                  ))}
                </div>
                <button
                  onClick={handleCopy}
                  className="p-2 text-zinc-500 hover:text-white transition-colors hover:bg-white/10 rounded-lg"
                >
                  {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              {/* Code */}
              <div className="p-8 overflow-x-auto relative">
                <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-indigo-500/30 to-transparent" />
                <pre className="text-sm leading-relaxed font-mono">
                  <code className="text-zinc-400">
                    {codeExamples[activeLang].split('\n').map((line, i) => (
                      <div key={i} className="hover:bg-white/5 -mx-8 px-8 transition-colors">
                        {line}
                      </div>
                    ))}
                  </code>
                </pre>
              </div>

              {/* Response preview */}
              <div className="border-t border-white/5 px-8 py-5 bg-black/40">
                <p className="text-[10px] font-mono font-bold text-zinc-500 mb-2 uppercase tracking-widest flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  Live Response
                </p>
                <code className="text-xs font-mono text-emerald-400 font-medium opacity-90 block">
                  {`{ "id": "po_1234", "status": "processing", "tx_hash": "0x8a7f..." }`}
                </code>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}