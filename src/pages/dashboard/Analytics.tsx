import { useState } from "react";
import {
    BarChart3,
    TrendingUp,
    Download,
    Calendar,
    Filter,
    DollarSign,
    Users,
    Globe,
    ArrowUpRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import MetricCard from "@/components/dashboard/MetricCard";
import InfoTooltip from "@/components/dashboard/InfoTooltip";
import { Area, AreaChart, Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import { useAnalyticsOverview, useRevenueAnalytics, useTransactionAnalytics } from "@/hooks/use-analytics";

// Mocks removed

export default function Analytics() {
    const [timeRange, setTimeRange] = useState("6m");
    const { data: overview, isLoading: overviewLoading } = useAnalyticsOverview();
    const { data: revenueData = [], isLoading: revenueLoading } = useRevenueAnalytics();
    const { data: transactionVolumeData = [], isLoading: transactionLoading } = useTransactionAnalytics({ period: timeRange });

    return (
        <div className="p-4 lg:p-6 max-w-[1600px] mx-auto space-y-6 animate-fade-in">
            {/* Header */}
            <div className="flex items-center justify-end gap-3">
                <Button variant="outline" className="h-8 px-4 text-[10px] font-semibold border-zinc-800 bg-[#111] text-zinc-400 hover:text-white hover:bg-[#222]">
                    <Calendar className="w-3 h-3 mr-2" />
                    Date Range
                </Button>
                <Button className="h-8 px-4 text-[10px] font-bold bg-white text-black hover:bg-zinc-200">
                    <Download className="w-3 h-3 mr-2" />
                    Export Report
                </Button>
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-[#111] border border-[#222] rounded-2xl p-5">
                    <div className="flex items-start justify-between mb-3">
                        <h3 className="text-[10px] font-bold text-zinc-500 uppercase tracking-[0.2em]">Total Revenue</h3>
                    </div>
                    <h3 className="text-2xl font-medium tracking-tight text-white mb-1 font-mono tabular-nums">
                        {overviewLoading ? "..." : `$${(overview?.totalRevenue || 0).toLocaleString()}`}
                    </h3>
                    <p className="text-xs text-emerald-400 font-medium">+18.2% vs last period</p>
                </div>

                <div className="bg-[#111] border border-[#222] rounded-2xl p-5">
                    <div className="flex items-start justify-between mb-3">
                        <h3 className="text-[10px] font-bold text-zinc-500 uppercase tracking-[0.2em]">Transactions</h3>
                    </div>
                    <h3 className="text-2xl font-medium tracking-tight text-white mb-1 tabular-nums">
                        {overviewLoading ? "..." : (overview?.totalTransactions || 0).toLocaleString()}
                    </h3>
                    <p className="text-xs text-emerald-400 font-medium">+12.5% vs last period</p>
                </div>

                <div className="bg-[#111] border border-[#222] rounded-2xl p-5">
                    <div className="flex items-start justify-between mb-3">
                        <h3 className="text-[10px] font-bold text-zinc-500 uppercase tracking-[0.2em]">Avg Transaction</h3>
                    </div>
                    <h3 className="text-2xl font-medium tracking-tight text-white mb-1 font-mono tabular-nums">
                        {overviewLoading ? "..." : `$${(overview?.avgTransaction || 0).toFixed(2)}`}
                    </h3>
                    <p className="text-xs text-zinc-500">Per transaction</p>
                </div>

                <div className="bg-[#111] border border-[#222] rounded-2xl p-5">
                    <div className="flex items-start justify-between mb-3">
                        <h3 className="text-[10px] font-bold text-zinc-500 uppercase tracking-[0.2em]">Active Users</h3>
                    </div>
                    <h3 className="text-2xl font-medium tracking-tight text-white mb-1 tabular-nums">
                        {overviewLoading ? "..." : (overview?.activeUsers || 0).toLocaleString()}
                    </h3>
                    <p className="text-xs text-emerald-400 font-medium">+8.3% growth</p>
                </div>
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Revenue Chart */}
                <div className="premium-card p-6">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h3 className="font-semibold text-foreground text-[15px] mb-1">Revenue vs Expenses</h3>
                            <p className="text-xs text-muted-foreground">Last 6 months</p>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="flex items-center gap-1.5">
                                <div className="w-2 h-2 rounded-full bg-emerald-500" />
                                <span className="text-xs text-muted-foreground">Revenue</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                                <div className="w-2 h-2 rounded-full bg-red-500" />
                                <span className="text-xs text-muted-foreground">Expenses</span>
                            </div>
                        </div>
                    </div>
                    {revenueLoading ? (
                        <div className="h-[250px] flex items-center justify-center text-muted-foreground">Loading revenue data...</div>
                    ) : (
                        <ResponsiveContainer width="100%" height={250}>
                            <BarChart data={revenueData}>
                                <CartesianGrid strokeDasharray="3 3" stroke="currentColor" className="text-border dark:text-border/50" />
                                <XAxis dataKey="month" stroke="currentColor" className="text-muted-foreground" style={{ fontSize: 10, fontWeight: 600 }} />
                                <YAxis stroke="currentColor" className="text-muted-foreground" style={{ fontSize: 10, fontWeight: 600 }} />
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: "hsl(var(--card))",
                                        border: "1px solid hsl(var(--border))",
                                        borderRadius: "12px",
                                        boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
                                    }}
                                    labelStyle={{ color: "hsl(var(--foreground))", fontWeight: "bold" }}
                                />
                                <Bar dataKey="revenue" fill="#10b981" radius={[4, 4, 0, 0]} />
                                <Bar dataKey="expenses" fill="#ef4444" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    )}
                </div>

                {/* Transaction Volume */}
                <div className="premium-card p-6">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h3 className="font-semibold text-foreground text-[15px] mb-1">Transaction Volume</h3>
                            <p className="text-xs text-muted-foreground">Monthly trend</p>
                        </div>
                    </div>
                    {transactionLoading ? (
                        <div className="h-[250px] flex items-center justify-center text-muted-foreground">Loading transaction data...</div>
                    ) : (
                        <ResponsiveContainer width="100%" height={250}>
                            <AreaChart data={transactionVolumeData}>
                                <defs>
                                    <linearGradient id="volumeGradient" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="currentColor" className="text-border dark:text-white/5" />
                                <XAxis dataKey="month" stroke="currentColor" className="text-muted-foreground" style={{ fontSize: 10, fontWeight: 600 }} />
                                <YAxis stroke="currentColor" className="text-muted-foreground" style={{ fontSize: 10, fontWeight: 600 }} />
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: "hsl(var(--card))",
                                        border: "1px solid hsl(var(--border))",
                                        borderRadius: "12px",
                                        boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
                                    }}
                                    labelStyle={{ color: "hsl(var(--foreground))", fontWeight: "bold" }}
                                />
                                <Area
                                    type="monotone"
                                    dataKey="volume"
                                    stroke="#6366f1"
                                    strokeWidth={2}
                                    fillOpacity={1}
                                    fill="url(#volumeGradient)"
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    )}
                </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="premium-card p-5">
                    <div className="flex items-start justify-between mb-3">
                        <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
                            <DollarSign className="w-5 h-5 text-blue-500" />
                        </div>
                        <ArrowUpRight className="w-4 h-4 text-emerald-500" />
                    </div>
                    <h4 className="text-sm font-semibold text-foreground mb-1">Payroll Volume</h4>
                    <p className="text-2xl font-semibold text-foreground tabular-nums mb-1">
                        {overviewLoading ? "..." : `$${(overview?.payrollVolume || 0).toLocaleString()}`}
                    </p>
                    <p className="text-xs text-muted-foreground">Across {overview?.payrollCount || 0} batches</p>
                </div>

                <div className="premium-card p-5">
                    <div className="flex items-start justify-between mb-3">
                        <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center">
                            <Users className="w-5 h-5 text-purple-500" />
                        </div>
                        <ArrowUpRight className="w-4 h-4 text-emerald-500" />
                    </div>
                    <h4 className="text-sm font-semibold text-foreground mb-1">Escrow Locked</h4>
                    <p className="text-2xl font-semibold text-foreground tabular-nums mb-1">
                        {overviewLoading ? "..." : `$${(overview?.escrowLocked || 0).toLocaleString()}`}
                    </p>
                    <p className="text-xs text-muted-foreground">{overview?.activeContracts || 0} active contracts</p>
                </div>

                <div className="premium-card p-5">
                    <div className="flex items-start justify-between mb-3">
                        <div className="w-10 h-10 rounded-lg bg-amber-500/10 flex items-center justify-center">
                            <Globe className="w-5 h-5 text-amber-500" />
                        </div>
                        <ArrowUpRight className="w-4 h-4 text-emerald-500" />
                    </div>
                    <h4 className="text-sm font-semibold text-foreground mb-1">Remittances</h4>
                    <p className="text-2xl font-semibold text-foreground tabular-nums mb-1">
                        {overviewLoading ? "..." : `$${(overview?.remittanceVolume || 3200).toLocaleString()}`}
                    </p>
                    <p className="text-xs text-muted-foreground">{overview?.remittanceCount || 5} transactions</p>
                </div>
            </div>
        </div>
    );
}
