import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Wallet, Users, Zap, Smartphone } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: Wallet,
    title: "Fund Your Wallet",
    description: "Deposit USDC or USDT via bank transfer or crypto. Funds are held in non-custodial smart contracts.",
    highlight: "Non-custodial fund",
  },
  {
    number: "02",
    icon: Users,
    title: "Add Recipients",
    description: "Upload CSV for batch payroll or add individuals. We support local banks and mobile money wallets.",
    highlight: "Batch processing",
  },
  {
    number: "03",
    icon: Zap,
    title: "Execute Payment",
    description: "Click send. Payments settle on Polygon or Base in < 3 seconds with full on-chain transparency.",
    highlight: "Instant settlement",
  },
  {
    number: "04",
    icon: Smartphone,
    title: "Local Withdrawal",
    description: "Recipients receive funds instantly and cash out to M-Pesa, MTN, or local bank accounts.",
    highlight: "Real-world cash",
  },
];

export function HowItWorksSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-32 lg:py-40 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-muted/20" />
      <div className="absolute inset-0 bg-grid opacity-30" />

      <div className="container mx-auto relative z-10 px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-3xl mx-auto mb-24"
        >
          <span className="tag tag-accent mb-6 inline-block">How It Works</span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-8 leading-tight">
            From stablecoin to
            <br />
            <span className="text-emerald-400">local cash</span>
          </h2>
          <p className="text-xl sm:text-2xl text-muted-foreground leading-relaxed">
            Four simple steps to pay your global team.
            No more waiting days for SWIFT transfers.
          </p>
        </motion.div>

        {/* Steps grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="feature-card p-8 text-center relative border border-white/5 hover:border-white/10 transition-colors bg-white/5 rounded-3xl"
            >
              {/* Step number */}
              <div className="absolute top-6 right-6 text-5xl font-bold text-white/10 select-none">
                {step.number}
              </div>

              {/* Icon */}
              <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mx-auto mb-6 border border-white/10">
                <step.icon className="w-8 h-8 text-white" />
              </div>

              <h3 className="text-xl font-bold text-white mb-4">
                {step.title}
              </h3>
              <p className="text-base text-zinc-400 leading-relaxed mb-6 font-light">
                {step.description}
              </p>

              {/* Highlight tag */}
              <span className="inline-block text-sm font-medium px-4 py-2 rounded-full bg-white/5 text-zinc-300 border border-white/10">
                {step.highlight}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}