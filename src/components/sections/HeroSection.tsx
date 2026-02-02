import { motion } from "framer-motion";
import { PyrnadoLogo } from "@/components/ui/PyrnadoLogo";
import { ArrowRight, Shield, Home, Users, DollarSign, Bell, BarChart2, Zap, LayoutDashboard, Wallet, ShieldCheck, Send, MapPin, Settings, HelpCircle, ChevronDown, Search, ArrowUpRight, Plus, RefreshCw, TrendingUp, AlertCircle, TrendingDown, Clock, Repeat, FileText, ArrowRightLeft, Activity, AlertTriangle, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import LiquidityBar from "@/components/dashboard/LiquidityBar";

// Mock Data from Overview.tsx
const totalLiquidity = 12450200.00;

const liquidityBreakdown = [
    { label: "Operating Account", value: 6225100, color: "bg-emerald-500", bgColor: "bg-emerald-500" },
    { label: "Payroll Liability", value: 3112550, color: "bg-blue-500", bgColor: "bg-blue-500" },
    { label: "Escrow", value: 2490040, color: "bg-amber-500", bgColor: "bg-amber-500" },
    { label: "Reserve", value: 622510, color: "bg-zinc-600", bgColor: "bg-zinc-600" },
];

const operationsFeed = [
    { type: 'Payroll', description: 'Global Eng - Batch A', amount: 425000.00, status: 'Processing', id: 'PAY-BATCH-2024-001', action: 'Track' },
    { type: 'Escrow', description: 'Release: Dev Milestone 2', amount: 15500.00, status: 'Pending Approval', id: 'CTR-8892-MS-2', action: 'Approve' },
    { type: 'Remittance', description: 'Vendor Payout (EUR)', amount: 12200.50, status: 'Completed', id: 'RMT-EU-9921', action: 'Receipt' },
    { type: 'Compliance', description: 'Worker Verification Alert', amount: 0, status: 'Action Required', id: 'KYC-INC-442', action: 'Review' },
];

const cashFlow = {
    inflow: 850000,
    outflow: 482000,
    net: 368000
};

const approvalQueue = [
    { id: "BAT-002", type: "Payroll Batch", amount: 150000, requestor: "Sarah M.", time: "1h ago" },
];

const complianceQueue = [
    { type: "KYC Review", entity: "Flex J.", risk: "Low", status: "Pending" },
    { type: "AML Flag", entity: "Tx-9932", risk: "High", status: "Urgent" },
];

export function HeroSection() {
    const navigate = (path: string) => {
        console.log("Navigating to:", path);
    };

    return (
        <section className="relative min-h-screen flex flex-col items-center pt-32 pb-20 overflow-hidden bg-[#020202] dark">
            {/* Background Atmosphere - Refined */}
            <div className="absolute top-[-20%] left-[50%] -translate-x-1/2 w-[1200px] h-[1200px] bg-emerald-500/5 rounded-full blur-[200px]" />
            <div className="absolute bottom-[-20%] right-[-10%] w-[800px] h-[800px] bg-blue-500/5 rounded-full blur-[150px]" />

            <div className="container mx-auto relative z-10 px-6 lg:px-8 flex flex-col items-center">

                {/* Text Content */}
                <div className="max-w-5xl text-center mb-20 animate-fade-in">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/5 border border-emerald-500/10 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-8 backdrop-blur-sm">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(16,185,129,0.5)]" /> Network Live
                    </div>

                    <h1 className="text-5xl sm:text-7xl lg:text-[5.5rem] font-bold text-white leading-[0.9] tracking-tight mb-8">
                        The financial OS for <br />
                        boundary-less teams.
                    </h1>

                    <p className="text-xl sm:text-2xl text-zinc-300 mb-10 leading-relaxed max-w-2xl mx-auto font-light tracking-wide">
                        Run payroll, automated escrow, and stablecoin treasury from one dashboard.
                        <span className="text-white font-medium block mt-2">No hidden FX fees. Instant settlement.</span>
                    </p>

                    <div className="flex flex-wrap items-center justify-center gap-6">
                        <Link to="/signup">
                            <Button className="h-14 px-10 rounded-full bg-emerald-500 text-black text-lg font-bold hover:bg-emerald-400 hover:shadow-[0_0_30px_-5px_rgba(16,185,129,0.4)] transition-all duration-300">
                                Get Started <ArrowRight className="w-5 h-5 ml-2" />
                            </Button>
                        </Link>
                        <Link to="/contact">
                            <Button variant="outline" className="h-14 px-10 rounded-full border-white/10 bg-white/5 text-white hover:bg-white/10 hover:border-white/20 hover:text-white font-medium backdrop-blur-md transition-all duration-300">
                                Book Demo
                            </Button>
                        </Link>
                    </div>

                    {/* Stats Row - High Contrast */}
                    <div className="mt-20 flex flex-wrap items-center justify-center gap-10 lg:gap-20 border-t border-white/10 pt-10">
                        <div className="text-center group transition-transform duration-300">
                            <p className="text-4xl font-bold text-white mb-1 drop-shadow-lg">$2.5B+</p>
                            <p className="text-xs text-zinc-400 uppercase tracking-[0.2em] font-semibold transition-colors">Volume</p>
                        </div>
                        <div className="w-px h-12 bg-white/10 hidden sm:block" />
                        <div className="text-center group transition-transform duration-300">
                            <p className="text-4xl font-bold text-white mb-1 drop-shadow-lg">120k+</p>
                            <p className="text-xs text-zinc-400 uppercase tracking-[0.2em] font-semibold transition-colors">Merchants</p>
                        </div>
                        <div className="w-px h-12 bg-white/10 hidden sm:block" />
                        <div className="text-center group transition-transform duration-300">
                            <p className="text-4xl font-bold text-white mb-1 drop-shadow-lg">99.9%</p>
                            <p className="text-xs text-zinc-400 uppercase tracking-[0.2em] font-semibold transition-colors">Uptime</p>
                        </div>
                    </div>
                </div>

                {/* Main Dashboard UI - Premium Glow (Scaled Down) */}
                <div className="w-full max-w-7xl perspective-1000 relative z-20 dark text-foreground">
                    <div className="w-full bg-[#0A0A0A] rounded-xl border border-zinc-800 shadow-2xl relative overflow-hidden font-sans scale-90 origin-top flex h-[800px]">

                        {/* SIDEBAR - Matches DashboardLayout.tsx */}
                        <div className="w-64 bg-[#0F0F0F] border-r border-[#262626] flex flex-col shrink-0">
                            {/* Sidebar Header */}
                            <div className="h-16 flex items-center px-6 border-b border-[#262626]">
                                <PyrnadoLogo size="sm" />
                            </div>

                            {/* Sidebar Content */}
                            <div className="flex-1 overflow-y-auto py-6 px-4 no-scrollbar">
                                {/* Organization Switcher */}
                                <button className="w-full flex items-center gap-3 px-3 py-2.5 text-sm mb-8 rounded-lg border border-[#262626] bg-[#171717] hover:bg-[#262626] transition-all group outline-none cursor-default">
                                    <div className="w-8 h-8 rounded bg-[#262626] flex items-center justify-center text-zinc-400 font-bold text-xs">
                                        GP
                                    </div>
                                    <div className="flex-1 text-left overflow-hidden">
                                        <span className="block text-sm font-semibold text-zinc-300 truncate">GlobalPay Demo</span>
                                        <div className="flex items-center gap-1.5 mt-0.5">
                                            <div className="w-1.5 h-1.5 rounded-full bg-zinc-500" />
                                            <span className="text-[10px] text-zinc-600 uppercase tracking-wider font-medium">
                                                Test Mode
                                            </span>
                                        </div>
                                    </div>
                                    <ChevronDown className="w-4 h-4 text-zinc-600" />
                                </button>

                                {/* Navigation Groups */}
                                <div className="space-y-8">
                                    {[
                                        {
                                            title: "Dashboard",
                                            items: [
                                                { icon: LayoutDashboard, label: "Overview", active: true },
                                                { icon: BarChart2, label: "Analytics" },
                                            ]
                                        },
                                        {
                                            title: "Operations",
                                            items: [
                                                { icon: Users, label: "Payroll Engine" },
                                                { icon: ShieldCheck, label: "Escrow" },
                                                { icon: Send, label: "Remittance" },
                                            ]
                                        },
                                        {
                                            title: "Finance",
                                            items: [
                                                { icon: Wallet, label: "Treasury" },
                                            ]
                                        },
                                        {
                                            title: "Compliance & Risk",
                                            items: [
                                                { icon: Shield, label: "Compliance" },
                                                { icon: MapPin, label: "Agents" },
                                            ]
                                        }
                                    ].map((group, groupIndex) => (
                                        <div key={groupIndex}>
                                            <h4 className="px-3 mb-3 text-[11px] font-semibold text-zinc-600 uppercase tracking-widest">
                                                {group.title}
                                            </h4>
                                            <div className="space-y-0.5">
                                                {group.items.map((item, i) => (
                                                    <div
                                                        key={i}
                                                        className={cn(
                                                            "flex items-center gap-3 px-3 py-2 rounded-md text-[13px] font-medium transition-all duration-200 group relative cursor-pointer",
                                                            item.active
                                                                ? "text-zinc-100 bg-[#171717]"
                                                                : "text-zinc-500 hover:text-zinc-300 hover:bg-[#171717]/50"
                                                        )}
                                                        onClick={() => navigate(item.label)}
                                                    >
                                                        {item.active && (
                                                            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 bg-[#50949d] rounded-r-full" />
                                                        )}
                                                        <item.icon className={cn(
                                                            "w-4 h-4 transition-colors",
                                                            item.active ? "text-zinc-100" : "text-zinc-500 group-hover:text-zinc-300"
                                                        )} />
                                                        <span>{item.label}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Sidebar Footer */}
                            <div className="p-4 border-t border-zinc-800">
                                <div className="space-y-1 mb-4">
                                    <div className="flex items-center gap-3 px-3 py-2.5 rounded-md text-[13px] font-medium transition-colors text-zinc-500 hover:text-zinc-300 hover:bg-zinc-900/50 cursor-pointer">
                                        <Settings className="w-4 h-4" />
                                        Settings
                                    </div>
                                    <div className="flex items-center gap-3 px-3 py-2.5 rounded-md text-[13px] font-medium transition-colors text-zinc-500 hover:text-zinc-300 hover:bg-zinc-900/50 cursor-pointer">
                                        <LogOut className="w-4 h-4" />
                                        Logout
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* RIGHT CONTENT COLUMN */}
                        <div className="flex-1 flex flex-col min-w-0 bg-[#0A0A0A]">

                            {/* TOP HEADER (Search, User, Test Mode) */}
                            <header className="h-16 border-b border-[#262626] bg-[#0A0A0A]/50 px-6 sm:px-8 flex items-center justify-between sticky top-0 z-40 backdrop-blur-md">
                                <h1 className="text-xl font-bold text-white tracking-tight">Overview</h1>

                                <div className="flex items-center gap-4">
                                    <div className="hidden md:flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20">
                                        <div className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                                        <span className="text-[11px] font-bold text-amber-500 uppercase tracking-wider">Test Mode</span>
                                    </div>
                                    <div className="h-6 w-px bg-[#262626] hidden sm:block" />

                                    <div className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-xl bg-[#171717] text-zinc-500 border border-[#262626] text-xs font-semibold shadow-sm">
                                        <Search className="w-3.5 h-3.5" />
                                        <span>Search...</span>
                                        <kbd className="hidden md:inline-flex h-4 items-center gap-1 rounded border border-[#333] bg-[#222] px-1.5 font-mono text-[10px] font-medium text-zinc-500">
                                            <span className="text-xs">⌘</span>K
                                        </kbd>
                                    </div>

                                    <div className="w-8 h-8 rounded-lg bg-zinc-800 border border-white/10 overflow-hidden shadow-sm">
                                        <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Alex" alt="User" />
                                    </div>
                                </div>
                            </header>

                            {/* MAIN DASHBOARD CONTENT (Synced) */}
                            <div className="flex-1 bg-black/40 p-5 overflow-hidden relative">
                                {/* Only Buttons Header here since Title is in Top Bar now? 
                                    Actually, Overview.tsx has 'Dashboard' in TopBar and 'Treasury Overview' + Buttons in Page.
                                    So we keep the 'Treasury Overview' header block.
                                */}

                                {/* Functional Actions Header */}
                                <header className="flex items-center justify-end pb-3 relative z-10">
                                    <div className="flex gap-2">
                                        <Button
                                            variant="outline"
                                            className="h-8 text-[10px] font-semibold border-zinc-800 bg-[#111] text-zinc-400 hover:text-white hover:bg-[#222] transition-all"
                                        >
                                            <FileText className="w-3 h-3 mr-2" /> Reports
                                        </Button>
                                        <Button
                                            className="h-8 text-[10px] font-bold bg-white text-black hover:bg-zinc-200 transition-all"
                                        >
                                            <Plus className="w-3 h-3 mr-2" /> New Transfer
                                        </Button>
                                    </div>
                                </header>

                                {/* Page Title Section */}
                                <div className="mb-4">
                                    <h1 className="text-3xl font-bold tracking-tight text-white mb-2">Treasury Overview</h1>
                                    <p className="text-sm text-zinc-500">Real-time financial position across all accounts and operations</p>
                                </div>

                                {/* BENTO GRID: 12-Column Layout */}
                                <div className="grid grid-cols-1 xl:grid-cols-12 gap-4 relative z-10">

                                    {/* --- MAIN COLUMN (8 Span) --- */}
                                    <div className="xl:col-span-8 flex flex-col gap-4">

                                        {/* 1. LIQUIDITY CONSOLE (Allocations) */}
                                        <div className="bg-[#111] border border-[#222] rounded-2xl p-5 relative overflow-hidden group hover:border-[#333] transition-colors">
                                            <div className="flex flex-col lg:flex-row justify-between lg:items-end gap-6">

                                                {/* Left: Balance & Controls */}
                                                <div className="flex-1 space-y-5">
                                                    <div>
                                                        <div className="flex items-center gap-2 mb-1">
                                                            <h2 className="text-[10px] font-bold text-zinc-500 uppercase tracking-[0.2em]">Cash & Cash Equivalents</h2>
                                                            <span className="text-[10px] font-bold text-emerald-400 flex items-center gap-1">
                                                                <ArrowUpRight className="w-3 h-3" /> 2.4% (24h)
                                                            </span>
                                                        </div>
                                                        <span className="text-3xl lg:text-4xl font-medium tracking-tighter text-white tabular-nums">
                                                            ${totalLiquidity.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                                                        </span>
                                                    </div>
                                                    <div className="flex gap-2">
                                                        <Button className="h-8 px-4 rounded-lg bg-white text-black hover:bg-zinc-200 font-bold text-[10px]">
                                                            <ArrowRightLeft className="w-3 h-3 mr-2" /> Convert
                                                        </Button>
                                                        <Button variant="outline" className="h-8 px-4 rounded-lg border-zinc-700 bg-transparent text-white hover:bg-zinc-800 font-bold text-[10px]">
                                                            <Wallet className="w-3 h-3 mr-2" /> Deposit
                                                        </Button>
                                                    </div>
                                                </div>

                                                {/* Right: Allocation Visual (Real Finance) */}
                                                <div className="flex-1 w-full max-w-md pb-1">
                                                    <LiquidityBar segments={liquidityBreakdown} total={totalLiquidity} />
                                                </div>
                                            </div>
                                        </div>

                                        {/* 2. OPERATIONS FEED (Batches & Milestones) */}
                                        <div className="bg-[#111] border border-[#222] rounded-2xl overflow-hidden flex-1 min-h-[300px]">
                                            <div className="flex items-center justify-between px-5 py-4 border-b border-[#222]">
                                                <h2 className="text-[10px] font-bold text-zinc-500 uppercase tracking-[0.2em]">Live Operations</h2>
                                                <div className="flex gap-2">
                                                    <span className="text-[10px] text-zinc-500 font-medium">Processing: <span className="text-white">1</span></span>
                                                    <span className="text-[10px] text-zinc-500 font-medium">Pending: <span className="text-white">1</span></span>
                                                </div>
                                            </div>
                                            <div className="overflow-x-auto">
                                                <table className="w-full text-left text-xs">
                                                    <thead className="bg-[#161616] text-zinc-500 font-medium uppercase tracking-wider">
                                                        <tr>
                                                            <th className="px-5 py-3 font-medium">Type</th>
                                                            <th className="px-5 py-3 font-medium">Description</th>
                                                            <th className="px-5 py-3 font-medium text-right">Amount</th>
                                                            <th className="px-5 py-3 font-medium text-right">Action</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody className="divide-y divide-[#222]">
                                                        {operationsFeed.map((item, i) => (
                                                            <tr
                                                                key={i}
                                                                className="group hover:bg-[#161616] transition-colors cursor-pointer"
                                                            >
                                                                <td className="px-5 py-3">
                                                                    <div className="flex items-center gap-2">
                                                                        {item.type === 'Payroll' && <Users className="w-3.5 h-3.5 text-blue-400" />}
                                                                        {item.type === 'Escrow' && <Shield className="w-3.5 h-3.5 text-amber-400" />}
                                                                        {item.type === 'Remittance' && <Send className="w-3.5 h-3.5 text-emerald-400" />}
                                                                        {item.type === 'Compliance' && <AlertTriangle className="w-3.5 h-3.5 text-red-400" />}
                                                                        <span className="font-medium text-zinc-300">{item.type}</span>
                                                                    </div>
                                                                </td>
                                                                <td className="px-5 py-3">
                                                                    <div className="flex flex-col">
                                                                        <span className="font-medium text-white">{item.description}</span>
                                                                        <span className="text-[9px] text-zinc-500 font-mono">{item.id}</span>
                                                                    </div>
                                                                </td>
                                                                <td className="px-5 py-3 font-mono font-medium text-white text-right">
                                                                    {item.amount > 0 ? `$${item.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}` : '-'}
                                                                </td>
                                                                <td className="px-5 py-2 text-right">
                                                                    {item.action === 'Approve' ? (
                                                                        <Button
                                                                            size="sm"
                                                                            className="h-6 bg-white text-black hover:bg-zinc-200 text-[9px] font-bold px-3 rounded"
                                                                        >
                                                                            Approve
                                                                        </Button>
                                                                    ) : (
                                                                        <Button size="sm" variant="ghost" className="h-6 text-[10px] text-zinc-500 hover:text-white">
                                                                            {item.action} &rarr;
                                                                        </Button>
                                                                    )}
                                                                </td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>

                                    {/* --- SIDE COLUMN (4 Span) --- */}
                                    <div className="xl:col-span-4 flex flex-col gap-4">

                                        {/* 3. CASH FLOW METRICS (Inflow/Outflow) */}
                                        <div
                                            className="p-5 bg-[#111] border border-[#222] rounded-2xl group hover:border-[#333] transition-colors cursor-pointer"
                                        >
                                            <div className="flex justify-between items-start mb-4">
                                                <h2 className="text-[10px] font-bold text-zinc-500 uppercase tracking-[0.2em]">Cash Flow (7d)</h2>
                                                <Activity className="w-3.5 h-3.5 text-zinc-600" />
                                            </div>
                                            <div className="grid grid-cols-2 gap-4">
                                                <div>
                                                    <span className="text-[10px] text-zinc-500 uppercase block mb-1">Inflow</span>
                                                    <span className="text-xl font-medium tracking-tight text-emerald-400 tabular-nums block">
                                                        +${(cashFlow.inflow / 1000).toFixed(1)}k
                                                    </span>
                                                </div>
                                                <div>
                                                    <span className="text-[10px] text-zinc-500 uppercase block mb-1">Outflow</span>
                                                    <span className="text-xl font-medium tracking-tight text-zinc-300 tabular-nums block">
                                                        -${(cashFlow.outflow / 1000).toFixed(1)}k
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="mt-4 pt-3 border-t border-[#222] flex justify-between items-center">
                                                <span className="text-[10px] text-zinc-500">Net Change</span>
                                                <span className="text-sm font-mono font-bold text-emerald-400">
                                                    +${(cashFlow.net / 1000).toFixed(1)}k
                                                </span>
                                            </div>
                                        </div>

                                        {/* 4. APPROVAL QUEUE (Dual Auth) */}
                                        <div className="bg-[#111] border border-[#222] rounded-2xl p-5 flex-1">
                                            <div className="flex items-center justify-between mb-4">
                                                <h2 className="text-[10px] font-bold text-zinc-500 uppercase tracking-[0.2em]">Approvals</h2>
                                                <span className="text-[10px] bg-blue-500/10 text-blue-400 px-1.5 py-0.5 rounded font-mono">{approvalQueue.length}</span>
                                            </div>
                                            <div className="space-y-3">
                                                {approvalQueue.map((item, i) => (
                                                    <div
                                                        key={i}
                                                        className="p-3 rounded-xl bg-[#161616] border border-[#222] hover:border-zinc-700 transition-colors group cursor-pointer"
                                                    >
                                                        <div className="flex justify-between mb-1">
                                                            <span className="text-[9px] font-bold uppercase text-blue-400 tracking-wider">Dual-Auth Required</span>
                                                            <Clock className="w-3 h-3 text-zinc-600" />
                                                        </div>
                                                        <div className="mb-2">
                                                            <p className="text-sm font-medium text-white">{item.type}</p>
                                                            <p className="text-[10px] text-zinc-500">Req: {item.requestor} • {item.amount > 0 ? `$${item.amount.toLocaleString()}` : ''}</p>
                                                        </div>
                                                        <Button
                                                            size="sm"
                                                            className="w-full h-6 bg-blue-600 hover:bg-blue-500 text-white text-[9px] font-bold"
                                                        >
                                                            Review & Sign
                                                        </Button>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        {/* 5. COMPLIANCE QUEUE (Review) */}
                                        <div className="bg-[#111] border border-[#222] rounded-2xl p-5">
                                            <div className="flex items-center justify-between mb-3">
                                                <h2 className="text-[10px] font-bold text-zinc-500 uppercase tracking-[0.2em]">Compliance</h2>
                                                <span className="text-[10px] bg-amber-500/10 text-amber-500 px-1.5 py-0.5 rounded font-mono">{complianceQueue.length}</span>
                                            </div>
                                            <div className="space-y-2">
                                                {complianceQueue.map((item, i) => (
                                                    <div
                                                        key={i}
                                                        className="flex items-center justify-between p-2 pl-3 bg-[#161616] rounded-lg border border-[#222] hover:border-zinc-700 transition-colors cursor-pointer group"
                                                    >
                                                        <div>
                                                            <p className="text-[11px] font-medium text-zinc-200 group-hover:text-white transition-colors">{item.type}</p>
                                                            <p className="text-[9px] text-zinc-500">{item.entity} • {item.risk} Risk</p>
                                                        </div>
                                                        <Button size="sm" variant="ghost" className="h-6 w-6 p-0 text-zinc-500 hover:text-white">
                                                            <ArrowRight className="w-3 h-3" />
                                                        </Button>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/80 to-transparent z-40 pointer-events-none" />
            </div>
        </section>
    );
}
