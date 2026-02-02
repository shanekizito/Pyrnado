import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowRight, Banknote, Shield, Globe, Code, CheckCircle2, Zap, Activity } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

// Fake UI Components for "Demo" feel
const PayrollDemo = () => {
  const transactions = [
    { name: "Sarah Chen", role: "Product Designer", amount: "$4,500.00", initials: "SC", color: "bg-purple-500" },
    { name: "Alex Morgan", role: "Frontend Dev", amount: "$3,800.00", initials: "AM", color: "bg-blue-500" },
    { name: "James Wilson", role: "Contractor", amount: "$2,200.00", initials: "JW", color: "bg-amber-500" }
  ];

  return (
    <div className="w-full bg-[#0A0A0B] rounded-xl border border-white/10 overflow-hidden shadow-2xl transition-colors duration-500">
      <div className="h-8 bg-white/5 border-b border-white/5 flex items-center px-3 gap-1.5">
        <div className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
        <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50" />
        <div className="w-2.5 h-2.5 rounded-full bg-green-500/50" />
      </div>
      <div className="p-4 space-y-3">
        {transactions.map((tx, i) => (
          <div key={i} className="flex items-center justify-between p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors cursor-default group/item">
            <div className="flex items-center gap-3">
              <div className={`w-8 h-8 rounded-full ${tx.color} flex items-center justify-center text-[10px] font-bold text-white shadow-sm ring-2 ring-white/5`}>
                {tx.initials}
              </div>
              <div>
                <div className="text-xs font-bold text-zinc-200">{tx.name}</div>
                <div className="text-[10px] text-zinc-500 font-medium">{tx.role}</div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-xs font-mono text-emerald-400 font-bold mb-0.5">{tx.amount}</div>
              <div className="text-[10px] text-emerald-500 flex items-center justify-end gap-1 font-medium bg-emerald-500/10 px-1.5 py-0.5 rounded ml-auto w-fit">
                <CheckCircle2 className="w-3 h-3" /> Paid
              </div>
            </div>
          </div>
        ))}
        <div className="mt-3 flex items-center justify-between border-t border-white/5 pt-3">
          <div className="text-[10px] text-zinc-500 font-mono uppercase tracking-widest flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Batch #2920 Confirmed
          </div>
          <div className="text-[10px] text-zinc-600 font-medium">
            Polygon Network
          </div>
        </div>
      </div>
    </div>
  );
};

const EscrowDemo = () => (
  <div className="w-full bg-[#0A0A0B] rounded-xl border border-white/10 p-5 shadow-2xl relative overflow-hidden transition-colors duration-500">
    <div className="absolute bottom-[-10px] right-[-10px] p-3 opacity-10 rotate-12 pointer-events-none">
      <Shield className="w-24 h-24 text-white" />
    </div>
    <div className="flex justify-between items-center mb-6">
      <span className="text-xs font-bold uppercase tracking-wider text-zinc-500">Smart Contract</span>
      <div className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 text-[10px] font-bold border border-emerald-500/20 shadow-[0_0_10px_rgba(16,185,129,0.2)]">ACTIVE</div>
    </div>
    <div className="space-y-5 relative z-10">
      <div className="flex items-center gap-4">
        <div className="w-0.5 h-full absolute left-[11px] top-3 bottom-3 bg-white/10 -z-10" />
        <div className="w-6 h-6 rounded-full bg-emerald-500 text-black flex items-center justify-center text-xs font-bold ring-4 ring-[#0A0A0B] shadow-[0_0_15px_rgba(16,185,129,0.4)]">1</div>
        <div className="text-sm font-bold text-white">Deposit Funds</div>
      </div>
      <div className="flex items-center gap-4 opacity-40">
        <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-xs font-bold ring-4 ring-[#0A0A0B]">2</div>
        <div className="text-sm font-medium text-white">Review Work</div>
      </div>
      <div className="flex items-center gap-4 opacity-40">
        <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-xs font-bold ring-4 ring-[#0A0A0B]">3</div>
        <div className="text-sm font-medium text-white">Release Payment</div>
      </div>
    </div>
  </div>
);

const RemittanceDemo = () => (
  <div className="w-full bg-[#0A0A0B] rounded-xl border border-white/10 p-5 shadow-2xl relative overflow-hidden transition-colors duration-500">
    {/* Header */}
    <div className="flex items-center justify-between mb-6">
      <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Transfer Funds</h4>
      <div className="flex items-center gap-1.5 px-2 py-1 rounded bg-emerald-500/10 border border-emerald-500/20">
        <Zap className="w-3 h-3 text-emerald-400" />
        <span className="text-[10px] font-bold text-emerald-400 uppercase">Instant</span>
      </div>
    </div>

    {/* Send Card */}
    <div className="bg-white/5 rounded-lg p-3 mb-2 border border-white/5">
      <label className="text-[10px] text-zinc-500 font-bold uppercase block mb-1">You Send</label>
      <div className="flex items-center justify-between">
        <span className="text-xl font-mono font-bold text-white">1,000.00</span>
        <div className="flex items-center gap-2 bg-black/40 px-2 py-1 rounded border border-white/10">
          <div className="w-4 h-4 rounded-full bg-blue-500 flex items-center justify-center text-[8px] font-bold text-white">US</div>
          <span className="text-xs font-bold text-white">USD</span>
        </div>
      </div>
    </div>

    {/* Exchange Rate Connector */}
    <div className="flex items-center justify-between pl-3 pr-1 my-[-4px] relative z-10">
      <div className="h-8 w-0.5 bg-white/10 mx-4"></div>
      <div className="flex items-center gap-2 text-[10px] text-zinc-500 font-mono bg-[#0A0A0B] px-2 py-0.5 rounded-full border border-white/10">
        <Activity className="w-3 h-3 text-zinc-600" />
        1 USD = 151.50 KES
      </div>
    </div>

    {/* Receive Card */}
    <div className="bg-white/5 rounded-lg p-3 mt-1 border border-white/5 relative">
      <label className="text-[10px] text-zinc-500 font-bold uppercase block mb-1">Recipient Gets</label>
      <div className="flex items-center justify-between">
        <span className="text-xl font-mono font-bold text-emerald-400">151,500.00</span>
        <div className="flex items-center gap-2 bg-black/40 px-2 py-1 rounded border border-white/10">
          <div className="w-4 h-4 rounded-full bg-black flex items-center justify-center text-[8px] font-bold text-white border border-white/20">🇰🇪</div>
          <span className="text-xs font-bold text-white">KES</span>
        </div>
      </div>
      {/* Success Check */}
      <div className="absolute -right-1 -bottom-1">
        <div className="bg-emerald-500 text-black rounded-full p-0.5 shadow-lg shadow-emerald-500/20">
          <CheckCircle2 className="w-3 h-3" />
        </div>
      </div>
    </div>

    <div className="mt-4 pt-3 border-t border-white/5 flex justify-between items-center">
      <div className="text-[10px] text-zinc-500">Fee: <span className="text-white font-bold">$0.00</span></div>
      <div className="text-[10px] text-zinc-500">Arrives: <span className="text-emerald-400 font-bold">In 2 secs</span></div>
    </div>
  </div>
);

const ApiDemo = () => (
  <div className="w-full bg-[#0A0A0B] rounded-xl border border-white/10 overflow-hidden shadow-2xl transition-colors duration-500 flex flex-col h-full min-h-[220px]">
    {/* Editor Header */}
    <div className="h-8 bg-white/5 border-b border-white/5 flex items-center px-4 justify-between">
      <div className="flex items-center gap-2">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-500/50" />
        </div>
      </div>
      <div className="text-[10px] font-mono text-zinc-500">payment_flow.ts</div>
    </div>

    {/* Editor Content */}
    <div className="p-5 font-mono text-[10px] leading-relaxed text-zinc-400 flex-1">
      <div className="flex gap-2">
        <span className="text-zinc-600 select-none">1</span>
        <span><span className="text-purple-400">import</span> {"{"} Kash {"}"} <span className="text-purple-400">from</span> <span className="text-green-400">'@kash/sdk'</span>;</span>
      </div>
      <div className="flex gap-2">
        <span className="text-zinc-600 select-none">2</span>
        <span></span>
      </div>
      <div className="flex gap-2">
        <span className="text-zinc-600 select-none">3</span>
        <span><span className="text-zinc-500">// Initialize SDK</span></span>
      </div>
      <div className="flex gap-2">
        <span className="text-zinc-600 select-none">4</span>
        <span><span className="text-purple-400">const</span> client = <span className="text-purple-400">new</span> <span className="text-yellow-400">Kash</span>({"{"}</span>
      </div>
      <div className="flex gap-2">
        <span className="text-zinc-600 select-none">5</span>
        <span>&nbsp;&nbsp;apiKey: <span className="text-blue-400">process.env.KASH_KEY</span></span>
      </div>
      <div className="flex gap-2">
        <span className="text-zinc-600 select-none">6</span>
        <span>{"}"});</span>
      </div>
      <div className="flex gap-2">
        <span className="text-zinc-600 select-none">7</span>
        <span></span>
      </div>
      <div className="flex gap-2">
        <span className="text-zinc-600 select-none">8</span>
        <span><span className="text-purple-400">await</span> client.transfers.<span className="text-blue-400">create</span>({"{"}</span>
      </div>
      <div className="flex gap-2">
        <span className="text-zinc-600 select-none">9</span>
        <span>&nbsp;&nbsp;amount: <span className="text-emerald-400">1000</span>,</span>
      </div>
      <div className="flex gap-2">
        <span className="text-zinc-600 select-none">10</span>
        <span>&nbsp;&nbsp;currency: <span className="text-emerald-400">"USDC"</span>,</span>
      </div>
      <div className="flex gap-2">
        <span className="text-zinc-600 select-none">11</span>
        <span>&nbsp;&nbsp;network: <span className="text-emerald-400">"POLYGON"</span></span>
      </div>
      <div className="flex gap-2">
        <span className="text-zinc-600 select-none">12</span>
        <span>{"}"});</span>
      </div>
    </div>
  </div>
);

const features = [
  {
    title: "Global Payroll Engine",
    description: "Run instant batch payments to 100+ countries. One click, zero hidden fees, instant settlement on-chain.",
    colSpan: "lg:col-span-2",
    demo: <PayrollDemo />,
    href: "/features#payroll"
  },
  {
    title: "Smart Escrow",
    description: "Milestone-based protection for freelancers and agencies.",
    colSpan: "lg:col-span-1",
    demo: <EscrowDemo />,
    href: "/features#escrow"
  },
  {
    title: "Developer API",
    description: "Integrate specialized stablecoin flows into your app.",
    colSpan: "lg:col-span-1",
    demo: <ApiDemo />,
    href: "/features#api"
  },
  {
    title: "Instant Remittances",
    description: "Send money home to mobile wallets like M-Pesa instantly.",
    colSpan: "lg:col-span-2",
    demo: <RemittanceDemo />,
    href: "/features#remit"
  }
];

export function ValuePropsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-32 relative bg-[#020202]">
      <div className="container mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center max-w-3xl mx-auto"
        >
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 text-white tracking-tight">
            Everything you need to <span className="text-emerald-400">scale globally</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={cn("group", feature.colSpan)}
            >
              <Link to={feature.href} className="block h-full">
                <div className="glass-card h-full flex flex-col hover:bg-zinc-900/50 transition-all duration-500 relative overflow-hidden rounded-3xl border border-white/5 hover:border-white/10">
                  {/* Background Gradient on Hover - Removed */}

                  <div className="p-8 pb-0 relative z-10">
                    <h3 className="text-2xl font-bold mb-3 text-zinc-100 transition-colors tracking-tight">{feature.title}</h3>
                    <p className="text-zinc-400 text-lg mb-8 leading-relaxed max-w-md font-light">{feature.description}</p>
                  </div>

                  {/* Demo Area - Pushed to bottom */}
                  <div className="mt-auto px-8 pb-8 relative z-10 flex items-center justify-center transition-transform duration-500 ease-out">
                    {feature.demo}
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}