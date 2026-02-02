import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Search, FileText, Users, Wallet, ShieldCheck, BarChart3, Shield, MapPin, Settings, ArrowRight } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

interface CommandPaletteProps {
    isOpen: boolean;
    onClose: () => void;
}

const commands = [
    { id: "overview", label: "Overview Dashboard", icon: BarChart3, href: "/dashboard", category: "Navigation" },
    { id: "payroll", label: "Payroll", icon: Users, href: "/dashboard/payroll", category: "Navigation" },
    { id: "escrow", label: "Escrow", icon: ShieldCheck, href: "/dashboard/escrow", category: "Navigation" },
    { id: "remittance", label: "Remittance", icon: ArrowRight, href: "/dashboard/remittance", category: "Navigation" },
    { id: "treasury", label: "Treasury", icon: Wallet, href: "/dashboard/treasury", category: "Navigation" },
    { id: "analytics", label: "Analytics", icon: BarChart3, href: "/dashboard/analytics", category: "Navigation" },
    { id: "compliance", label: "Compliance", icon: Shield, href: "/dashboard/compliance", category: "Navigation" },
    { id: "agents", label: "Agents", icon: MapPin, href: "/dashboard/agents", category: "Navigation" },
    { id: "settings", label: "Settings", icon: Settings, href: "/dashboard/settings", category: "Navigation" },
    { id: "run-payroll", label: "Run Payroll", icon: Users, href: "/dashboard/payroll", category: "Actions" },
    { id: "new-contract", label: "New Escrow Contract", icon: ShieldCheck, href: "/dashboard/escrow/new", category: "Actions" },
    { id: "send-money", label: "Send Money", icon: ArrowRight, href: "/dashboard/remittance/send", category: "Actions" },
    { id: "swap-assets", label: "Swap Assets", icon: Wallet, href: "/dashboard/treasury/swap", category: "Actions" },
    { id: "reports", label: "Generate Reports", icon: FileText, href: "/dashboard/analytics", category: "Actions" },
];

export default function CommandPalette({ isOpen, onClose }: CommandPaletteProps) {
    const [search, setSearch] = useState("");
    const navigate = useNavigate();

    const filteredCommands = commands.filter(cmd =>
        cmd.label.toLowerCase().includes(search.toLowerCase()) ||
        cmd.category.toLowerCase().includes(search.toLowerCase())
    );

    const groupedCommands = filteredCommands.reduce((acc, cmd) => {
        if (!acc[cmd.category]) acc[cmd.category] = [];
        acc[cmd.category].push(cmd);
        return acc;
    }, {} as Record<string, typeof commands>);

    const handleSelect = (href: string) => {
        navigate(href);
        onClose();
        setSearch("");
    };

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if ((e.metaKey || e.ctrlKey) && e.key === "k") {
                e.preventDefault();
                if (isOpen) {
                    onClose();
                }
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [isOpen, onClose]);

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="p-0 gap-0 max-w-2xl bg-popover border-border outline-none">
                {/* Search Input */}
                <div className="flex items-center gap-3 px-4 py-3 border-b border-border">
                    <Search className="w-4 h-4 text-muted-foreground" />
                    <input
                        type="text"
                        placeholder="Search commands..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="flex-1 bg-transparent text-foreground placeholder:text-muted-foreground outline-none text-sm"
                        autoFocus
                    />
                    <kbd className="px-2 py-1 text-xs text-muted-foreground bg-muted rounded border border-border">
                        ESC
                    </kbd>
                </div>

                {/* Results */}
                <div className="max-h-96 overflow-y-auto p-2">
                    {Object.entries(groupedCommands).map(([category, cmds]) => (
                        <div key={category} className="mb-4 last:mb-0">
                            <p className="px-2 py-1 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                                {category}
                            </p>
                            <div className="space-y-1">
                                {cmds.map((cmd) => {
                                    const Icon = cmd.icon;
                                    return (
                                        <motion.button
                                            key={cmd.id}
                                            whileHover={{ x: 4 }}
                                            onClick={() => handleSelect(cmd.href)}
                                            className="w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors text-left"
                                        >
                                            <Icon className="w-4 h-4 text-emerald-500" />
                                            {cmd.label}
                                        </motion.button>
                                    );
                                })}
                            </div>
                        </div>
                    ))}

                    {filteredCommands.length === 0 && (
                        <div className="py-8 text-center text-sm text-muted-foreground">
                            No commands found
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between px-4 py-2 border-t border-border text-xs text-muted-foreground">
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1">
                            <kbd className="px-1.5 py-0.5 bg-muted rounded border border-border">↑</kbd>
                            <kbd className="px-1.5 py-0.5 bg-muted rounded border border-border">↓</kbd>
                            <span className="ml-1">Navigate</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <kbd className="px-1.5 py-0.5 bg-muted rounded border border-border">↵</kbd>
                            <span className="ml-1">Select</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-1">
                        <kbd className="px-1.5 py-0.5 bg-muted rounded border border-border">⌘</kbd>
                        <kbd className="px-1.5 py-0.5 bg-muted rounded border border-border">K</kbd>
                        <span className="ml-1">Toggle</span>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
