import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { ReactNode } from "react";

interface DetailPanelProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: ReactNode;
    width?: "sm" | "md" | "lg" | "xl";
}

const widthClasses = {
    sm: "max-w-md",
    md: "max-w-lg",
    lg: "max-w-2xl",
    xl: "max-w-4xl",
};

export default function DetailPanel({
    isOpen,
    onClose,
    title,
    children,
    width = "lg",
}: DetailPanelProps) {
    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
                    />

                    {/* Panel */}
                    <motion.div
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ type: "spring", damping: 30, stiffness: 300 }}
                        className={`fixed right-0 top-0 bottom-0 ${widthClasses[width]} w-full bg-[#0d0d0f] border-l border-white/[0.06] z-50 flex flex-col shadow-2xl`}
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between px-6 py-4 border-b border-white/[0.06] bg-[#09090b]/50 backdrop-blur-xl">
                            <h2 className="text-lg font-semibold text-white tracking-tight">
                                {title}
                            </h2>
                            <button
                                onClick={onClose}
                                className="w-8 h-8 rounded-lg flex items-center justify-center text-zinc-500 hover:text-white hover:bg-white/[0.08] transition-all duration-200"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Scrollable Content */}
                        <div className="flex-1 overflow-y-auto p-6 space-y-6">
                            {children}
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
