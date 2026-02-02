import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    ArrowRight,
    AlertTriangle,
    CheckCircle2,
    Calendar,
    Briefcase,
    Building2,
    ArrowUpRight,
    TrendingDown,
    Filter,
    Download,
    Plus,
    ArrowRightLeft,
    Send,
    Shield,
    Wallet,
    MoreHorizontal,
    FileText,
    Users,
    Clock,
    Activity
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import LiquidityBar from "@/components/dashboard/LiquidityBar";
import {
    useDashboardStats,
    useBalance
} from "@/hooks/use-dashboard";

export default function Overview() {
    const navigate = useNavigate();

    // 1. LIQUIDITY STATE (Docs 5.A.3: Capital Allocation)
    const totalLiquidity = 12450200.00;

    // Real Finance Breakdown (No Crypto)
    const liquidityBreakdown = [
        { label: "Operating Account", value: 6225100, color: "text-emerald-400", bgColor: "bg-emerald-500" }, // General Treasury
        { label: "Payroll Liability", value: 3112550, color: "text-blue-400", bgColor: "bg-blue-500" },     // Reserved for Batches
        { label: "Escrow", value: 2490040, color: "text-amber-400", bgColor: "bg-amber-500" }, // Locked
        { label: "Reserve", value: 622510, color: "text-zinc-400", bgColor: "bg-zinc-600" },               // Safety Buffer
    ];

    // 2. OPERATIONS FEED (Docs 5.B, 5.C, 5.D)
    // Mixing Payroll Batches, Escrow Milestones, and Remittances
    const operationsFeed = [
        {
            id: "PAY-BATCH-2024-001",
            type: "Payroll",
            description: "Global Eng • Batch A",
            amount: 425000.00,
            status: "Processing",
            date: "Today, 10:00 AM",
            action: "Track"
        },
        {
            id: "CTR-8892-MS-2",
            type: "Escrow",
            description: "Release: Dev Milestone 2",
            amount: 15300.00,
            status: "Pending Approval",
            date: "Today, 09:45 AM",
            action: "Approve" // Dual Auth Required
        },
        {
            id: "RMT-TX-9921",
            type: "Remittance",
            description: "Vendor Payout (EUR)",
            amount: 12200.50,
            status: "Delivered",
            date: "Yesterday",
            action: "Receipt"
        },
        {
            id: "KYC-INC-442",
            type: "Compliance",
            description: "Worker Verification Alert",
            amount: 0,
            status: "Action Required",
            date: "Yesterday",
            action: "Review"
        }
    ];

    // 3. CASH FLOW METRICS (Docs 5.A.4)
    const cashFlow = {
        inflow: 850000,
        outflow: 482000,
        net: 368000
    };

    // 4. RISK CONTROLS (Docs 5.A.5: Compliance & Approvals)
    const complianceQueue = [
        { id: "KYC-882", type: "KYC Review", entity: "Alex J.", risk: "Low", time: "2h ago" },
        { id: "AML-991", type: "AML Flag", entity: "Tx #9912", risk: "High", time: "5h ago" },
    ];

    const approvalQueue = [
        { id: "BAT-002", type: "Payroll Batch", amount: 150000, requestor: "Sarah M.", time: "1h ago" },
    ];

    return (
        <div className="min-h-screen text-white font-sans selection:bg-zinc-800 p-4 lg:p-6 max-w-[1600px] mx-auto animate-fade-in relative">



            {/* HEADER: Contextual & Functional */}
            <header className="flex items-center justify-end pb-3 relative z-10">
                <div className="flex gap-2">
                    <Button
                        variant="outline"
                        onClick={() => navigate('/dashboard/analytics')}
                        className="h-8 text-[10px] font-semibold border-zinc-800 bg-[#111] text-zinc-400 hover:text-white hover:bg-[#222] transition-all"
                    >
                        <FileText className="w-3 h-3 mr-2" /> Reports
                    </Button>
                    <Button
                        onClick={() => navigate('/dashboard/treasury')}
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
                                            onClick={() => {
                                                const routes = {
                                                    'Payroll': '/dashboard/payroll',
                                                    'Escrow': '/dashboard/escrow',
                                                    'Remittance': '/dashboard/remittance',
                                                    'Compliance': '/dashboard/compliance'
                                                };
                                                navigate(routes[item.type as keyof typeof routes]);
                                            }}
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
                                                        onClick={(e) => { e.stopPropagation(); navigate('/dashboard/escrow'); }}
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
                        onClick={() => navigate('/dashboard/analytics')}
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
                                    onClick={() => navigate('/dashboard/payroll')}
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
                                        onClick={(e) => { e.stopPropagation(); navigate('/dashboard/payroll'); }}
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
                                    onClick={() => navigate('/dashboard/compliance')}
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
    );
}
