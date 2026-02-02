import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Book, Code2, Box, Webhook, Terminal, FileJson, Shield, Zap, ChevronRight, AlertCircle, Users, Settings, ShieldCheck, BookOpen, Key, Globe, FlaskConical, Code } from "lucide-react";

export function DocsSidebar() {
    const location = useLocation();

    const navigation = [
        {
            title: "Introduction",
            items: [
                { title: "Introduction", href: "/docs", icon: BookOpen },
                { title: "Quickstart", href: "/docs/quickstart", icon: Zap },
                { title: "Authentication", href: "/docs/authentication", icon: Key },
                { title: "Webhooks", href: "/docs/webhooks", icon: Globe },
                { title: "Errors", href: "/docs/errors", icon: AlertCircle },
                { title: "Testing", href: "/docs/testing", icon: FlaskConical },
                { title: "Go Live Checklist", href: "/docs/go-live", icon: ShieldCheck },
            ],
        },
        {
            title: "Solutions",
            items: [
                { title: "Enterprise Implementation", href: "/docs/solutions/enterprise", icon: Code },
            ],
        },
        {
            title: "API Reference",
            items: [
                { title: "Overview", href: "/docs/api", icon: FileJson },
                {
                    title: "Remittance",
                    href: "/docs/api/remittance",
                    icon: Code2,
                    subItems: [
                        { title: "Payout Methods", href: "/docs/api/remittance/payout-methods", method: "GET" },
                        { title: "Transaction Tracking", href: "/docs/api/remittance/tracking", method: "GET" },
                    ]
                },
                {
                    title: "Payroll",
                    href: "/docs/api/payroll",
                    icon: Code2,
                    subItems: [
                        { title: "Batch Processing", href: "/docs/api/payroll/batch-processing", method: "POST" },
                        { title: "Worker Onboarding", href: "/docs/api/payroll/worker-onboarding", method: "POST" },
                    ]
                },
                {
                    title: "Treasury",
                    href: "/docs/api/treasury",
                    icon: Code2,
                    subItems: [
                        { title: "FX Swaps", href: "/docs/api/treasury/fx-swaps", method: "POST" },
                        { title: "Gas Management", href: "/docs/api/treasury/gas-management", method: "GET" },
                    ]
                },
                {
                    title: "Escrow",
                    href: "/docs/api/escrow",
                    icon: Code2,
                    subItems: [
                        { title: "Milestone Logic", href: "/docs/api/escrow/milestones", method: "POST" },
                        { title: "Dispute Arbitration", href: "/docs/api/escrow/disputes", method: "POST" },
                    ]
                },
                {
                    title: "Analytics",
                    href: "/docs/api/analytics",
                    icon: Code2,
                    subItems: [
                        { title: "Custom Reporting", href: "/docs/api/analytics/reporting", method: "POST" },
                    ]
                },
                {
                    title: "Compliance",
                    href: "/docs/api/compliance",
                    icon: Shield,
                    subItems: [
                        { title: "Verification Flows", href: "/docs/api/compliance/verification-flows", method: "POST" },
                        { title: "Risk Scoring", href: "/docs/api/compliance/risk-scoring", method: "GET" },
                    ]
                },
                { title: "Agents", href: "/docs/api/agents", icon: Users },
                {
                    title: "Settings",
                    href: "/docs/api/settings",
                    icon: Settings,
                    subItems: [
                        { title: "Webhook Events", href: "/docs/api/settings/webhooks", method: "POST" },
                        { title: "Team Permissions", href: "/docs/api/settings/team-access", method: "POST" },
                    ]
                },
            ],
        },
        {
            title: "Libraries",
            items: [
                { title: "Node.js SDK", href: "/docs/sdks/node", icon: Terminal },
                { title: "Python SDK", href: "/docs/sdks/python", icon: Terminal },
                { title: "React Hooks", href: "/docs/sdks/react", icon: Code2 },
            ],
        },
    ];

    const getMethodColor = (method: string) => {
        switch (method) {
            case "GET": return "text-blue-400 bg-blue-500/10";
            case "POST": return "text-emerald-400 bg-emerald-500/10";
            case "PUT": return "text-amber-400 bg-amber-500/10";
            case "PATCH": return "text-purple-400 bg-purple-500/10";
            case "DELETE": return "text-red-400 bg-red-500/10";
            default: return "text-zinc-500 bg-zinc-500/10";
        }
    };

    return (
        <div className="w-72 h-full bg-[#020202] flex flex-col p-6 overflow-y-auto custom-scrollbar border-r border-white/5">
            {navigation.map((section, idx) => (
                <div key={idx} className="mb-10">
                    <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-600 mb-6 px-3">
                        {section.title}
                    </h3>
                    <div className="space-y-1">
                        {section.items.map((item) => {
                            const isParentActive = location.pathname.startsWith(item.href);
                            const isExactActive = location.pathname === item.href;
                            const Icon = item.icon;
                            // @ts-ignore
                            const hasSubItems = item.subItems && item.subItems.length > 0;

                            return (
                                <div key={item.href} className="space-y-1">
                                    <Link
                                        to={item.href}
                                        className={cn(
                                            "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all duration-200 group relative",
                                            isExactActive
                                                ? "bg-white/[0.03] text-white font-bold"
                                                : isParentActive
                                                    ? "text-zinc-200 font-medium"
                                                    : "text-zinc-500 hover:text-zinc-300 hover:bg-white/[0.02]"
                                        )}
                                    >
                                        <div className={cn(
                                            "w-8 h-8 rounded-lg flex items-center justify-center border transition-all duration-200",
                                            isParentActive
                                                ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400"
                                                : "bg-zinc-950 border-white/5 text-zinc-600 group-hover:border-white/10 group-hover:text-zinc-400"
                                        )}>
                                            <Icon className="w-4 h-4" />
                                        </div>
                                        <span className="flex-1">{item.title}</span>
                                        {hasSubItems && (
                                            <ChevronRight className={cn(
                                                "w-3.5 h-3.5 text-zinc-600 transition-transform duration-200",
                                                isParentActive && "rotate-90 text-emerald-500"
                                            )} />
                                        )}
                                        {isExactActive && (
                                            <div className="absolute left-0 w-1 h-4 bg-emerald-500 rounded-full shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                                        )}
                                    </Link>

                                    {/* Sub Items */}
                                    {hasSubItems && isParentActive && (
                                        <div className="ml-11 border-l border-white/5 pl-4 py-1 space-y-1 animate-in fade-in slide-in-from-left-2 duration-300">
                                            {/* @ts-ignore */}
                                            {item.subItems.map((subItem) => {
                                                const isSubActive = location.pathname === subItem.href;
                                                return (
                                                    <Link
                                                        key={subItem.href}
                                                        to={subItem.href}
                                                        className={cn(
                                                            "flex items-center justify-between py-1.5 text-xs transition-colors pr-2",
                                                            isSubActive
                                                                ? "text-emerald-400 font-semibold"
                                                                : "text-zinc-500 hover:text-zinc-300"
                                                        )}
                                                    >
                                                        <span>{subItem.title}</span>
                                                        {subItem.method && (
                                                            <span className={cn(
                                                                "text-[8px] font-bold px-1.5 py-0.5 rounded-sm tracking-wider",
                                                                getMethodColor(subItem.method)
                                                            )}>
                                                                {subItem.method}
                                                            </span>
                                                        )}
                                                    </Link>
                                                );
                                            })}
                                        </div>
                                    )}
                                </div>
                            )
                        })}
                    </div>
                </div>
            ))}

            <div className="mt-auto px-2 pt-8 pb-4">
                <div className="bg-gradient-to-br from-zinc-900 to-black border border-white/10 rounded-xl p-4 shadow-sm">
                    <p className="text-xs text-zinc-400 mb-3">Need help integrating?</p>
                    <Link to="/contact" className="text-xs font-bold text-emerald-400 hover:underline">
                        Contact Support →
                    </Link>
                </div>
            </div>
        </div>
    );
}
