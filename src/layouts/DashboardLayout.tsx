import { useState, useEffect } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import {
    LayoutDashboard,
    Wallet,
    ShieldCheck,
    Users,
    Search,
    Menu,
    X,
    ChevronDown,
    Zap,
    Settings,
    HelpCircle,
    Send,
    BarChart3,
    Shield,
    MapPin,
    ChevronLeft,
    ChevronRight,
    LogOut,
    Bell,
    Plus
} from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import CommandPalette from "@/components/layout/CommandPalette";
import NotificationsCenter from "@/components/layout/NotificationsCenter";
import NetworkHealthIndicator from "@/components/layout/NetworkHealthIndicator";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { PyrnadoLogo } from "@/components/ui/PyrnadoLogo";
import { Button } from "@/components/ui/button";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/contexts/AuthContext";
import { useLogout } from "@/hooks/use-auth";
import { PageHeaderProvider, usePageHeader } from "@/contexts/PageHeaderContext";
import { Building, PlusCircle } from "lucide-react";

function DashboardHeader() {
    const location = useLocation();
    const { title } = usePageHeader();

    return (
        <div className="hidden lg:flex flex-col">
            <h1 className="text-xl font-bold text-foreground tracking-tight capitalize">
                {title || location.pathname.split('/').pop()?.replace(/-/g, ' ') || 'Overview'}
            </h1>
        </div>
    );
}

// Grouped Navigation Structure
const navigationGroups = [
    {
        title: "Dashboard",
        items: [
            { icon: LayoutDashboard, href: "/dashboard", label: "Overview" },
            { icon: BarChart3, href: "/dashboard/analytics", label: "Analytics" },
        ]
    },
    {
        title: "Operations",
        items: [
            { icon: Users, href: "/dashboard/payroll", label: "Payroll Engine" },
            { icon: ShieldCheck, href: "/dashboard/escrow", label: "Escrow" },
            { icon: Send, href: "/dashboard/remittance", label: "Remittance" },
        ]
    },
    {
        title: "Finance",
        items: [
            { icon: Wallet, href: "/dashboard/treasury", label: "Treasury" },
        ]
    },
    {
        title: "Compliance & Risk",
        items: [
            { icon: Shield, href: "/dashboard/compliance", label: "Compliance" },
            { icon: MapPin, href: "/dashboard/agents", label: "Agents" },
        ]
    }
];

export default function DashboardLayout() {
    const { user, company } = useAuth();
    const logout = useLogout();
    const location = useLocation();
    const navigate = useNavigate();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
    const [showKycBanner, setShowKycBanner] = useState(true);

    // Sidebar Collapsed State with Local Storage Persistence
    const [isCollapsed, setIsCollapsed] = useState(() => {
        const saved = localStorage.getItem("sidebarCollapsed");
        return saved ? JSON.parse(saved) : false;
    });

    useEffect(() => {
        localStorage.setItem("sidebarCollapsed", JSON.stringify(isCollapsed));
    }, [isCollapsed]);

    // Global keyboard shortcut for command palette
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if ((e.metaKey || e.ctrlKey) && e.key === "k") {
                e.preventDefault();
                setIsCommandPaletteOpen(true);
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, []);

    return (
        <PageHeaderProvider>
            <TooltipProvider delayDuration={0}>
                <div className="min-h-screen bg-background text-foreground font-sans flex transition-colors duration-300">
                    {/* Desktop Sidebar - Collapsible & Grouped */}
                    <aside
                        className={cn(
                            "hidden lg:flex flex-col h-screen border-r border-[#262626] bg-[#0F0F0F] fixed top-0 left-0 z-50 transition-all duration-300 ease-in-out will-change-[width]",
                            isCollapsed ? "w-20" : "w-72"
                        )}
                    >
                        {/* Sidebar Header */}
                        <div className={cn(
                            "h-16 flex items-center border-b border-[#262626]",
                            isCollapsed ? "justify-center px-0" : "px-6 justify-between"
                        )}>
                            {isCollapsed ? (
                                <PyrnadoLogo size="sm" className="[&_span]:hidden mr-0" />
                            ) : (
                                <PyrnadoLogo size="sm" />
                            )}
                        </div>

                        {/* Sidebar Content */}
                        <div className="flex-1 overflow-y-auto py-6 px-4 no-scrollbar">
                            {/* Organization Switcher */}
                            {!isCollapsed && (
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <button className="w-full flex items-center gap-3 px-3 py-2.5 text-sm mb-8 rounded-lg border border-[#262626] bg-[#171717] hover:bg-[#262626] transition-all group outline-none">
                                            <div className="w-8 h-8 rounded bg-[#262626] flex items-center justify-center text-zinc-400 font-bold text-xs">
                                                {company?.name?.substring(0, 2).toUpperCase() || 'GP'}
                                            </div>
                                            <div className="flex-1 text-left overflow-hidden">
                                                <span className="block text-sm font-semibold text-zinc-300 truncate">{company?.name || 'My Company'}</span>
                                                <div className="flex items-center gap-1.5 mt-0.5">
                                                    <div className={cn("w-1.5 h-1.5 rounded-full", company?.isTestMode ? "bg-zinc-500" : "bg-zinc-600")} />
                                                    <span className="text-[10px] text-zinc-600 uppercase tracking-wider font-medium">
                                                        {company?.isTestMode ? 'Test Mode' : 'Live Mode'}
                                                    </span>
                                                </div>
                                            </div>
                                            <ChevronDown className="w-4 h-4 text-zinc-600 transition-transform group-data-[state=open]:rotate-180" />
                                        </button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="start" className="w-64 bg-[#171717] border-[#262626] shadow-xl rounded-xl p-2">
                                        <DropdownMenuLabel className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest px-2 py-1.5">
                                            Switch Organization
                                        </DropdownMenuLabel>
                                        <DropdownMenuItem className="flex items-center gap-3 p-2 rounded-lg cursor-pointer bg-[#262626] text-white font-medium">
                                            <div className="w-6 h-6 rounded bg-[#333] flex items-center justify-center text-[10px] font-bold">
                                                {company?.name?.substring(0, 2).toUpperCase() || 'GP'}
                                            </div>
                                            <span className="flex-1 truncate">{company?.name || 'My Company'}</span>
                                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                                        </DropdownMenuItem>
                                        <DropdownMenuSeparator className="my-2 bg-[#262626]" />
                                        <DropdownMenuItem className="flex items-center gap-3 p-2 rounded-lg cursor-pointer hover:bg-[#262626] text-zinc-400 hover:text-white transition-colors group">
                                            <PlusCircle className="w-4 h-4" />
                                            <span className="font-medium text-sm">Add Organization</span>
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            )}


                            {/* Navigation Groups */}
                            <div className="space-y-8">
                                {navigationGroups.map((group, groupIndex) => (
                                    <div key={groupIndex}>
                                        {!isCollapsed && (
                                            <h4 className="px-3 mb-3 text-[11px] font-semibold text-zinc-600 uppercase tracking-widest">
                                                {group.title}
                                            </h4>
                                        )}
                                        <div className="space-y-0.5">
                                            {group.items.map((item) => {
                                                const isActive = location.pathname === item.href;
                                                return (
                                                    <Tooltip key={item.href}>
                                                        <TooltipTrigger asChild>
                                                            <Link
                                                                to={item.href}
                                                                className={cn(
                                                                    "flex items-center gap-3 px-3 py-2 rounded-md text-[13px] font-medium transition-all duration-200 group relative",
                                                                    isActive
                                                                        ? "text-zinc-100 bg-[#171717]"
                                                                        : "text-zinc-500 hover:text-zinc-300 hover:bg-[#171717]/50",
                                                                    isCollapsed && "justify-center px-0 py-3"
                                                                )}
                                                            >
                                                                {isActive && !isCollapsed && (
                                                                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 bg-[#50949d] rounded-r-full" />
                                                                )}

                                                                <item.icon className={cn(
                                                                    "transition-colors",
                                                                    isCollapsed ? "w-5 h-5" : "w-4 h-4",
                                                                    isActive ? "text-zinc-100" : "text-zinc-500 group-hover:text-zinc-300"
                                                                )} />
                                                                {!isCollapsed && <span>{item.label}</span>}
                                                            </Link>
                                                        </TooltipTrigger>
                                                        {isCollapsed && (
                                                            <TooltipContent side="right" className="font-medium bg-[#171717] text-zinc-200 border-[#262626] px-3 py-1.5 min-w-[120px] shadow-xl ml-2">
                                                                {item.label}
                                                            </TooltipContent>
                                                        )}
                                                    </Tooltip>
                                                );
                                            })}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Sidebar Footer */}
                        <div className="p-4 border-t border-zinc-800">
                            <div className="space-y-1 mb-4">
                                <Link
                                    to="/dashboard/settings"
                                    className={cn(
                                        "flex items-center gap-3 px-3 py-2.5 rounded-md text-[13px] font-medium transition-colors text-zinc-500 hover:text-zinc-300 hover:bg-zinc-900/50",
                                        isCollapsed && "justify-center"
                                    )}
                                >
                                    <Settings className={cn(isCollapsed ? "w-5 h-5" : "w-4 h-4")} />
                                    {!isCollapsed && "Settings"}
                                </Link>
                                <button
                                    onClick={logout}
                                    className={cn(
                                        "w-full flex items-center gap-3 px-3 py-2.5 rounded-md text-[13px] font-medium transition-colors text-zinc-500 hover:text-zinc-300 hover:bg-zinc-900/50",
                                        isCollapsed && "justify-center"
                                    )}
                                >
                                    <LogOut className={cn(isCollapsed ? "w-5 h-5" : "w-4 h-4")} />
                                    {!isCollapsed && "Logout"}
                                </button>
                            </div>

                            {/* Collapse Toggle */}
                            <div className="flex items-center justify-between pt-4 border-t border-zinc-800">
                                {!isCollapsed && (
                                    <div className="flex items-center gap-3 px-2">
                                        <div className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center text-xs font-semibold text-zinc-400">
                                            {user?.name?.substring(0, 2).toUpperCase() || 'US'}
                                        </div>
                                        <div className="text-xs">
                                            <div className="font-semibold text-zinc-300 truncate max-w-[100px]">{user?.name || 'User'}</div>
                                            <div className="text-zinc-600 text-[10px]">Admin</div>
                                        </div>
                                    </div>
                                )}
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => setIsCollapsed(!isCollapsed)}
                                    className={cn("h-8 w-8 text-zinc-600 hover:text-zinc-400 hover:bg-zinc-900/50", isCollapsed && "w-full")}
                                >
                                    {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
                                </Button>
                            </div>
                        </div>
                    </aside>

                    {/* Main Content Wrapper */}
                    <div className={cn(
                        "flex-1 flex flex-col min-h-screen transition-all duration-300 ease-in-out relative",
                        isCollapsed ? "lg:ml-20" : "lg:ml-72"
                    )}>
                        {/* Header - Webpage Style */}
                        <header className="h-16 border-b border-border bg-card sticky top-0 z-40 px-6 sm:px-8 flex items-center justify-between">
                            <div className="flex items-center gap-4 lg:hidden">
                                <button onClick={() => setIsMobileMenuOpen(true)} className="text-muted-foreground hover:text-foreground transition-colors">
                                    <Menu className="w-5 h-5" />
                                </button>
                                <PyrnadoLogo size="sm" />
                            </div>

                            {/* Header Title */}
                            <DashboardHeader />

                            {/* Header Actions */}
                            <div className="flex items-center gap-4">
                                {company?.isTestMode && (
                                    <div className="hidden md:flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20">
                                        <div className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                                        <span className="text-[11px] font-bold text-amber-500 uppercase tracking-wider">Test Mode</span>
                                    </div>
                                )}
                                <NetworkHealthIndicator />
                                <div className="h-6 w-px bg-border/50 hidden sm:block" />
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={() => setIsCommandPaletteOpen(true)}
                                        className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-xl bg-secondary/80 text-muted-foreground hover:text-foreground transition-all border border-border/50 hover:border-border text-xs font-semibold shadow-sm"
                                    >
                                        <Search className="w-3.5 h-3.5 text-primary" />
                                        <span>Search...</span>
                                        <kbd className="hidden md:inline-flex h-4 items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
                                            <span className="text-xs">⌘</span>K
                                        </kbd>
                                    </button>
                                    <NotificationsCenter />
                                    <ModeToggle />
                                </div>
                            </div>
                        </header>

                        <main className="flex-1 p-6 sm:p-8 overflow-y-auto bg-background/50">
                            {/* Profile Completion Warning */}
                            {showKycBanner && company?.isTestMode && (
                                <div className="max-w-[1600px] mx-auto w-full mb-6">
                                    <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-4 flex items-center justify-between gap-4 backdrop-blur-sm">
                                        <div className="flex items-center gap-3">
                                            <div className="p-2 bg-amber-500/10 rounded-full">
                                                <Zap className="w-5 h-5 text-amber-500" />
                                            </div>
                                            <div>
                                                <h4 className="text-sm font-bold text-amber-600">You are in Test Mode</h4>
                                                <p className="text-xs text-muted-foreground/80 font-medium leading-relaxed">Access all features with test data. Switch to live to start processing real payments.</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                className="text-muted-foreground hover:text-foreground h-8"
                                                onClick={() => setShowKycBanner(false)}
                                            >
                                                Hide
                                            </Button>
                                            <Button
                                                size="sm"
                                                className="bg-amber-500 hover:bg-amber-400 text-black font-medium h-8"
                                                onClick={() => navigate('/dashboard/settings')}
                                            >
                                                Switch to Live
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            )}

                            <div className="max-w-[1600px] mx-auto w-full animate-fade-in relative">
                                <Outlet />
                            </div>
                        </main>
                    </div>

                    {/* Mobile Sidebar Overlay */}
                    <AnimatePresence>
                        {isMobileMenuOpen && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="fixed inset-0 bg-black/80 z-[60] lg:hidden backdrop-blur-sm"
                            />
                        )}
                    </AnimatePresence>

                    {/* Mobile Sidebar */}
                    <AnimatePresence>
                        {isMobileMenuOpen && (
                            <motion.aside
                                initial={{ x: "-100%" }}
                                animate={{ x: 0 }}
                                exit={{ x: "-100%" }}
                                transition={{ type: "tween", duration: 0.2 }}
                                className="fixed inset-y-0 left-0 w-72 bg-background border-r border-border z-[70] lg:hidden flex flex-col shadow-2xl"
                            >
                                <div className="p-6 flex justify-between items-center border-b border-border">
                                    <PyrnadoLogo size="sm" />
                                    <button onClick={() => setIsMobileMenuOpen(false)}>
                                        <X className="w-5 h-5 text-muted-foreground" />
                                    </button>
                                </div>
                                <nav className="flex-1 overflow-y-auto p-4 space-y-6">
                                    {navigationGroups.map((group, i) => (
                                        <div key={i}>
                                            <h4 className="px-2 mb-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">{group.title}</h4>
                                            <div className="space-y-1">
                                                {group.items.map((item) => (
                                                    <Link
                                                        key={item.href}
                                                        to={item.href}
                                                        onClick={() => setIsMobileMenuOpen(false)}
                                                        className={cn(
                                                            "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all",
                                                            location.pathname === item.href
                                                                ? "bg-primary/10 text-primary"
                                                                : "text-muted-foreground hover:text-foreground hover:bg-accent"
                                                        )}
                                                    >
                                                        <item.icon className="w-4 h-4" />
                                                        {item.label}
                                                    </Link>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </nav>
                                <div className="p-4 border-t border-border bg-muted/30">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-500 to-blue-500 flex items-center justify-center text-white font-bold text-sm">
                                            {user?.name?.substring(0, 2).toUpperCase() || 'US'}
                                        </div>
                                        <div>
                                            <div className="font-semibold text-sm text-foreground">{user?.name || 'User'}</div>
                                            <div className="text-xs text-muted-foreground">{user?.email || 'admin@kash.io'}</div>
                                        </div>
                                    </div>
                                </div>
                            </motion.aside>
                        )}
                    </AnimatePresence>

                    {/* Command Palette */}
                    <CommandPalette
                        isOpen={isCommandPaletteOpen}
                        onClose={() => setIsCommandPaletteOpen(false)}
                    />
                </div>
            </TooltipProvider>
        </PageHeaderProvider>
    );
}
