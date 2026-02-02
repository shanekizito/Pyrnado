import { motion } from "framer-motion";
import { ArrowRight, Globe, TrendingUp, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Link } from "react-router-dom";

export default function About() {
    return (
        <div className="min-h-screen bg-background">
            <Navbar />

            <main className="pt-40 pb-20">
                <div className="container mx-auto px-6 lg:px-8">

                    {/* Hero */}
                    <div className="text-center max-w-4xl mx-auto mb-32">
                        <h1 className="text-5xl lg:text-7xl font-bold mb-8">
                            We are the <span className="text-gradient">infrastructure</span> <br />
                            for the internet GDP
                        </h1>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-32">
                        {[
                            { label: "Founded", value: "2024" },
                            { label: "Team", value: "25+" },
                            { label: "processed", value: "$50M+" },
                            { label: "Uptime", value: "99.99%" },
                        ].map((stat, i) => (
                            <div key={stat.label} className="p-8 rounded-3xl bg-white/5 border border-white/5 text-center">
                                <div className="text-4xl lg:text-5xl font-bold text-white mb-2">{stat.value}</div>
                                <div className="text-sm text-muted-foreground uppercase tracking-wider">{stat.label}</div>
                            </div>
                        ))}
                    </div>

                    {/* Mission */}
                    <div className="grid lg:grid-cols-2 gap-16 items-center mb-32">
                        <div className="space-y-6">
                            <h2 className="text-4xl font-bold">Our Mission</h2>
                            <div className="h-1 w-20 bg-accent rounded-full" />
                            <p className="text-lg text-muted-foreground leading-relaxed">
                                Pyrnado was building on the belief that money should move as fast as data.
                                We are replacing the archaic correspondent banking network with a unified,
                                transparent, and instant layer of settlement built on stablecoins.
                            </p>
                            <p className="text-lg text-muted-foreground leading-relaxed">
                                Focusing on emerging markets, we solve the hardest problems first:
                                liquidity, trust, and last-mile connectivity.
                            </p>
                        </div>
                        <div className="aspect-square rounded-[3rem] bg-[#111] border border-white/10 relative overflow-hidden flex items-center justify-center">
                            <Globe className="w-64 h-64 text-white/5 animate-pulse" />
                            <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
                        </div>
                    </div>

                    {/* Team */}
                    <div className="mb-20">
                        <h2 className="text-3xl font-bold mb-12 text-center">The Team</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {[1, 2, 3].map(i => (
                                <div key={i} className="group p-6 rounded-3xl bg-white/5 border border-white/5 hover:border-accent/30 transition-all text-center">
                                    <div className="w-24 h-24 rounded-full bg-white/10 mx-auto mb-6 overflow-hidden">
                                        <Users className="w-full h-full p-6 text-white/50" />
                                    </div>
                                    <h3 className="font-bold text-lg mb-1">Founder Name</h3>
                                    <p className="text-sm text-muted-foreground mb-4">Position</p>
                                    <div className="flex justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <div className="w-8 h-8 rounded-full bg-white/10" />
                                        <div className="w-8 h-8 rounded-full bg-white/10" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </main>
            <Footer />
        </div>
    );
}
