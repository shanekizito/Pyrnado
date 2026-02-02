import { motion } from "framer-motion";
import { Check, X, CreditCard, Zap, Globe, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Link } from "react-router-dom";

const plans = [
    {
        name: "Starter",
        price: "Free",
        desc: "For freelancers and solopreneurs",
        features: [
            "Up to $10,000/month volume",
            "3 team members",
            "Basic payroll (single payments)",
            "Standard KYC verification",
            "Email support",
            "0.8% transaction fee",
        ],
        cta: "Start free",
        highlight: false,
    },
    {
        name: "Growth",
        price: "$99",
        period: "/month",
        desc: "For scaling remote teams",
        features: [
            "Up to $100,000/month volume",
            "Unlimited team members",
            "Batch payroll with CSV upload",
            "Smart escrow (milestone-based)",
            "Auto-conversion to local currencies",
            "Tax-compliant invoice exports",
            "Priority Slack support",
            "0.5% transaction fee",
        ],
        cta: "Start 14-day trial",
        highlight: true,
    },
    {
        name: "Enterprise",
        price: "Custom",
        desc: "For global organizations",
        features: [
            "Unlimited volume",
            "Custom contract & SLA",
            "Dedicated account manager",
            "Multi-sig wallet security",
            "Custom API integration",
            "White-label options",
            "Volume-based discounts",
        ],
        cta: "Contact sales",
        highlight: false,
    },
];

const features = [
    { icon: CreditCard, title: "Pay-as-you-go", desc: "No locked in contracts" },
    { icon: Zap, title: "Instant Access", desc: "Start sending in minutes" },
    { icon: Globe, title: "Global Reach", desc: "100+ countries supported" },
    { icon: Building2, title: "Bank Grade", desc: "SOC2 Compliance" },
];

export default function Pricing() {
    return (
        <div className="min-h-screen bg-background">
            <Navbar />

            <main className="pt-40 pb-20 px-6">
                <div className="container mx-auto">
                    {/* Header */}
                    <div className="text-center max-w-3xl mx-auto mb-20">
                        <h1 className="text-5xl lg:text-7xl font-bold mb-6">
                            Simple, transparent <br />
                            <span className="text-gradient">pricing</span>
                        </h1>
                        <p className="text-xl text-muted-foreground">
                            Pay only for what you use. No hidden banking fees.
                        </p>
                    </div>

                    {/* Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto mb-32">
                        {plans.map((plan, i) => (
                            <motion.div
                                key={plan.name}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                className={`relative p-8 rounded-[2.5rem] flex flex-col ${plan.highlight
                                        ? "bg-[#111] border-2 border-accent shadow-2xl shadow-accent/20 scale-105 z-10"
                                        : "bg-white/5 border border-white/5 hover:bg-white/10 transition-colors"
                                    }`}
                            >
                                {plan.highlight && (
                                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-accent text-black font-bold px-4 py-1 rounded-full text-sm shadow-xl shadow-accent/20">
                                        MOST POPULAR
                                    </div>
                                )}

                                <div className="mb-8">
                                    <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                                    <p className="text-sm text-muted-foreground mb-6">{plan.desc}</p>
                                    <div className="flex items-baseline gap-1">
                                        <span className="text-4xl font-bold text-white">{plan.price}</span>
                                        {plan.period && <span className="text-muted-foreground">{plan.period}</span>}
                                    </div>
                                </div>

                                <ul className="space-y-4 mb-8 flex-1">
                                    {plan.features.map(f => (
                                        <li key={f} className="flex items-start gap-3 text-sm text-muted-foreground">
                                            <Check className={`w-5 h-5 shrink-0 ${plan.highlight ? "text-accent" : "text-white/20"}`} />
                                            {f}
                                        </li>
                                    ))}
                                </ul>

                                <Button
                                    className={`w-full py-6 rounded-xl text-lg font-bold ${plan.highlight
                                            ? "btn-accent"
                                            : "bg-white/10 hover:bg-white/20 text-white"
                                        }`}
                                >
                                    {plan.cta}
                                </Button>
                            </motion.div>
                        ))}
                    </div>

                    {/* Trust Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto text-center">
                        {features.map(f => (
                            <div key={f.title} className="p-6 rounded-2xl bg-white/5 border border-white/5">
                                <f.icon className="w-8 h-8 text-accent mx-auto mb-4" />
                                <h4 className="font-bold mb-1">{f.title}</h4>
                                <p className="text-sm text-muted-foreground">{f.desc}</p>
                            </div>
                        ))}
                    </div>

                </div>
            </main>

            <Footer />
        </div>
    );
}
