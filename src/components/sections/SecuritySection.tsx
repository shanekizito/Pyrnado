import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Shield, Lock, Eye, FileCheck, Fingerprint, Globe } from "lucide-react";

const securityFeatures = [
  {
    icon: Shield,
    title: "Non-Custodial Architecture",
    description: "We never hold your funds. Smart contracts handle the flow directly from your wallet to the recipient.",
  },
  {
    icon: Lock,
    title: "Audited Smart Contracts",
    description: "Our payment logic is audited by top firms, ensuring 100% security for all automated flows.",
  },
  {
    icon: FileCheck,
    title: "KYC/AML Compliance",
    description: "Built-in identity verification and risk scoring to meet global regulatory standards.",
  },
  {
    icon: Eye,
    title: "On-Chain Audit Trails",
    description: "Every transaction is permanently recorded on the blockchain for complete transparency.",
  },
  {
    icon: Fingerprint,
    title: "Multi-Sig Security",
    description: "Require multiple approvals for high-volume transactions or sensitive configuration changes.",
  },
  {
    icon: Globe,
    title: "Country-Specific Compliance",
    description: "Tailored off-ramps ensuring local regulatory adherence in 40+ countries.",
  },
];

const partners = [
  { name: "Polygon", desc: "Network" },
  { name: "Circle", desc: "USDC Issuer" },
  { name: "Chainalysis", desc: "Compliance" },
  { name: "Fireblocks", desc: "Custody" },
];

export function SecuritySection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-32 lg:py-40 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-0 w-[600px] h-[600px] bg-emerald-500/5 rounded-full blur-[150px]" />

      <div className="container mx-auto relative z-10 px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          {/* Left - Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="tag tag-accent mb-6 inline-block">Security First</span>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-8 leading-tight">
              Enterprise-grade
              <br />
              <span className="text-emerald-400">compliance</span>
            </h2>
            <p className="text-xl sm:text-2xl text-muted-foreground mb-12 leading-relaxed">
              Built for regulated institutions. Audited smart contracts, KYC/AML checks,
              and non-custodial architecture ensure your funds are always safe.
            </p>

            {/* Security partners */}
            <div className="grid grid-cols-2 gap-4">
              {partners.map((partner) => (
                <div
                  key={partner.name}
                  className="feature-card p-5 flex items-center gap-4"
                >
                  <div className="w-12 h-12 rounded-xl bg-accent/15 flex items-center justify-center">
                    <span className="text-lg font-bold text-accent">{partner.name[0]}</span>
                  </div>
                  <div>
                    <p className="text-base font-bold text-foreground">{partner.name}</p>
                    <p className="text-sm text-muted-foreground">{partner.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right - Features grid */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4"
          >
            {securityFeatures.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.3 + index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="feature-card p-6 group"
              >
                <feature.icon className="w-7 h-7 text-accent mb-4 group-hover:scale-110 transition-transform" />
                <h4 className="font-bold text-foreground text-base mb-2">
                  {feature.title}
                </h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}