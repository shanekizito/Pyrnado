import { motion } from "framer-motion";
import { ArrowRight, Banknote, Shield, Globe, Wallet, Building, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Link } from "react-router-dom";

const useCases = [
    {
        icon: Banknote,
        title: "Cross-Border B2B",
        description: "Simplify international vendor payments.",
        items: ["Instant Settlement", "0.5% Fees", "Invoice Management"],
        link: "/use-cases/b2b",
    },
    {
        icon: Users,
        title: "Global Payroll",
        description: "Pay distributed teams in seconds.",
        items: ["Batch Payments", "Local Currency", "Auto Compliance"],
        link: "/use-cases/payroll",
    },
    {
        icon: Shield,
        title: "Smart Escrow",
        description: "Trustless milestone payments.",
        items: ["On-Chain Logic", "Dispute Resolution", "Milestone Gates"],
        link: "/use-cases/escrow",
    },
    {
        icon: Globe,
        title: "Remittances",
        description: "P2P transfers home.",
        items: ["M-Pesa Integration", "No FX Spreads", "Instant Cashout"],
        link: "/use-cases/remittances",
    },
    {
        icon: Wallet,
        title: "On/Off Ramps",
        description: "Fiat to Crypto conversion.",
        items: ["Global Banks", "Local APMs", "KYC Integrated"],
        link: "/use-cases/ramps",
    },
    {
        icon: Building,
        title: "Treasury",
        description: "Corporate idle fund management.",
        items: ["Yield Generation", "Multi-Sig", "Audit Trail"],
        link: "/use-cases/treasury",
    },
];

export default function UseCases() {
    return (
        <div className="min-h-screen bg-background">
            <Navbar />

            <main className="pt-40 pb-20">
                <div className="container mx-auto px-6 lg:px-8">
                    <div className="text-center max-w-4xl mx-auto mb-20">
                        <h1 className="text-5xl lg:text-7xl font-bold mb-8">
                            Built for every <br />
                            <span className="text-gradient">flow</span>
                        </h1>
                        <p className="text-xl text-muted-foreground">
                            From freelancers to enterprise treasuries, Pyrnado handles it all.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
                        {useCases.map((uc, i) => (
                            <motion.div
                                key={uc.title}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                className="p-8 rounded-[2rem] bg-white/5 border border-zinc-800/50 hover:bg-white/10 transition-all group duration-300"
                            >
                                {/* Static Icon Container */}
                                <div className="mb-8 relative">
                                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-zinc-800 to-black border border-zinc-800 flex items-center justify-center relative z-10">
                                        <uc.icon className="w-8 h-8 text-white" />
                                    </div>
                                </div>

                                <h3 className="text-2xl font-bold mb-2">{uc.title}</h3>
                                <p className="text-muted-foreground mb-6">{uc.description}</p>

                                <div className="space-y-2 mb-8 border-t border-white/5 pt-6">
                                    {uc.items.map(item => (
                                        <div key={item} className="flex items-center gap-2 text-sm font-semibold text-white/80">
                                            <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                                            {item}
                                        </div>
                                    ))}
                                </div>

                                <div className="flex items-center text-accent font-bold text-sm">
                                    Learn more <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    <div className="rounded-[3rem] bg-accent/10 border border-accent/20 p-12 text-center">
                        <h2 className="text-3xl font-bold mb-6">Ready to modernize your payments?</h2>
                        <Link to="/contact">
                            <Button className="btn-accent px-8 py-6 text-lg rounded-xl">
                                Start building
                            </Button>
                        </Link>
                    </div>

                </div>
            </main>
            <Footer />
        </div>
    );
}
