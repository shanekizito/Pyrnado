import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Navbar } from "@/components/layout/Navbar";
import { DocsSidebar } from "@/components/docs/DocsSidebar";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

export default function DocsLayout() {
    const { pathname } = useLocation();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);
        setIsSidebarOpen(false); // Close sidebar on route change
    }, [pathname]);

    return (
        <div className="min-h-screen bg-[#020202] text-zinc-100 antialiased selection:bg-emerald-500/30">
            {/* Top Navbar */}
            <Navbar />

            {/* Mobile Sidebar Toggle */}
            <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="lg:hidden fixed bottom-6 right-6 z-50 w-12 h-12 rounded-2xl bg-emerald-500 text-black shadow-lg shadow-emerald-500/20 flex items-center justify-center hover:scale-110 active:scale-95 transition-all"
            >
                {isSidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            {/* Mobile Backdrop */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}

            <div className="pt-24 container mx-auto flex max-w-[1400px]">
                {/* Sidebar Navigation */}
                <aside className={cn(
                    "w-72 shrink-0 fixed top-24 bottom-0 z-40 transition-transform duration-300 lg:translate-x-0 lg:z-30",
                    isSidebarOpen ? "translate-x-0 bg-zinc-950 border-r border-white/5" : "-translate-x-full"
                )}>
                    <DocsSidebar />
                </aside>

                {/* Main Content Area */}
                <div className="flex-1 lg:pl-80 w-full min-h-[calc(100vh-6rem)]">
                    <main className="py-8 px-6 lg:px-12 max-w-5xl mx-auto overflow-x-hidden">
                        <Outlet />
                    </main>

                    {/* Footer for Docs */}
                    <footer className="border-t border-white/5 py-10 mt-20 text-center text-xs text-zinc-600">
                        <p>© {new Date().getFullYear()} Pyrnado Inc. • Developer Documentation</p>
                    </footer>
                </div>
            </div>
        </div>
    );
}
