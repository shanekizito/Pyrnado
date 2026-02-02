import { useState } from "react";
import {
    MapPin,
    Users,
    DollarSign,
    TrendingUp,
    Search,
    Filter,
    CheckCircle2,
    Clock,
    Star,
    Phone,
    Mail,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import MetricCard from "@/components/dashboard/MetricCard";
import InfoTooltip from "@/components/dashboard/InfoTooltip";
import StatusBadge from "@/components/dashboard/StatusBadge";
import DetailPanel from "@/components/dashboard/DetailPanel";
import { motion } from "framer-motion";
import { useAgents } from "@/hooks/use-agents";

interface Agent {
    id: string;
    name: string;
    location: string;
    country: string;
    status: "active" | "inactive" | "pending";
    rating: number;
    totalPayouts: number;
    completedTransactions: number;
    pendingPayouts: number;
    phone: string;
    email: string;
    joinedDate: string;
}

// Mocks removed

export default function Agents() {
    const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [statusFilter, setStatusFilter] = useState<string>("all");

    const { data: allAgents = [], isLoading } = useAgents();

    const filteredAgents = allAgents.filter((agent: Agent) => {
        const matchesSearch =
            agent.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            agent.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
            agent.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
            agent.id.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesStatus = statusFilter === "all" || agent.status === statusFilter;

        return matchesSearch && matchesStatus;
    });

    const activeAgents = allAgents.filter((a: Agent) => a.status === "active").length;
    const totalPayouts = allAgents.reduce((sum: number, a: Agent) => sum + a.totalPayouts, 0);
    const totalTransactions = allAgents.reduce((sum: number, a: Agent) => sum + a.completedTransactions, 0);

    const ratedAgents = allAgents.filter((a: Agent) => a.rating > 0);
    const avgRating = ratedAgents.length > 0
        ? ratedAgents.reduce((sum: number, a: Agent) => sum + a.rating, 0) / ratedAgents.length
        : 0;

    return (
        <div className="relative min-h-[70vh] flex flex-col items-center justify-center overflow-hidden rounded-3xl">
            {/* Background Aesthetics */}
            <div className="absolute inset-0 bg-[#0A0A0A] overflow-hidden rounded-3xl border border-white/10">
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-30 brightness-100 contrast-150 mix-blend-overlay pointer-events-none" />
                <div className="absolute -top-48 -left-48 w-96 h-96 bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none" />
                <div className="absolute -bottom-48 -right-48 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px] pointer-events-none" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-500/5 rounded-full blur-[120px] pointer-events-none" />
            </div>

            {/* Content */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="relative z-10 flex flex-col items-center text-center px-6"
            >
                <div className="mb-6 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/5 border border-emerald-500/10 text-emerald-400 text-[10px] font-bold uppercase tracking-widest">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(16,185,129,0.5)] animate-pulse" />
                    Feature in Development
                </div>

                <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-zinc-800 to-black flex items-center justify-center border border-white/10 shadow-2xl mb-8 group transition-all duration-500 hover:scale-110 hover:border-emerald-500/30">
                    <Users className="w-10 h-10 text-emerald-500 group-hover:scale-110 transition-transform duration-500" />
                </div>

                <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tighter mb-4">
                    Global Agent <span className="text-zinc-500 italic">Network</span>
                </h1>

                <p className="text-zinc-400 text-lg max-w-lg font-light leading-relaxed mb-10">
                    We're building the infrastructure for instant on/off-ramp liquidity. Our global agent network will support cash-out settlements in 180+ countries.
                </p>

                <div className="flex flex-wrap items-center justify-center gap-4">
                    <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 backdrop-blur-md">
                        <MapPin className="w-4 h-4 text-emerald-500" />
                        <span className="text-sm font-medium text-zinc-300">180+ Countries</span>
                    </div>
                    <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 backdrop-blur-md">
                        <DollarSign className="w-4 h-4 text-emerald-500" />
                        <span className="text-sm font-medium text-zinc-300">Instant Settlement</span>
                    </div>
                </div>

                <div className="mt-16 pt-8 border-t border-white/5 w-full max-w-sm">
                    <div className="flex items-center justify-center gap-8 text-zinc-600">
                        <div className="flex flex-col items-center">
                            <span className="text-xs font-bold uppercase tracking-[0.2em] mb-1">Status</span>
                            <span className="text-zinc-500 font-mono text-sm tracking-tight">Institutional Beta</span>
                        </div>
                        <div className="h-8 w-px bg-white/5" />
                        <div className="flex flex-col items-center">
                            <span className="text-xs font-bold uppercase tracking-[0.2em] mb-1">ETA</span>
                            <span className="text-zinc-500 font-mono text-sm tracking-tight">Q1 2026</span>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
