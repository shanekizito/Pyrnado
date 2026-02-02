import { ArrowRight, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";

interface InfoCardProps {
    title: string;
    description: string;
    children?: React.ReactNode;
    actionScript?: string;
    actionLabel?: string;
}

export function InfoCard({ title, description, children, actionLabel = "Change" }: InfoCardProps) {
    return (
        <div className="p-6 md:p-8 rounded-[2rem] bg-[#121212] border border-white/5 flex flex-col justify-between h-full group relative overflow-hidden">
            {/* Grid Pattern Background */}
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5 pointer-events-none" />

            <div className="relative z-10 w-full">
                <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold text-white">{title}</h3>
                    <button className="text-zinc-500 hover:text-white transition-colors">
                        <MoreHorizontal className="w-5 h-5" />
                    </button>
                </div>
                <p className="text-zinc-500 text-xs mb-8">{description}</p>

                <div className="mb-8">
                    {children}
                </div>
            </div>

            <div className="relative z-10 flex items-center justify-between mt-auto">
                <button className="flex items-center gap-2 text-xs font-bold text-zinc-400 hover:text-white transition-colors group/btn">
                    Learn more
                    <span className="w-4 h-4 rounded-full bg-white/5 flex items-center justify-center group-hover/btn:bg-white/10 group-hover/btn:translate-x-1 transition-all">
                        <ArrowRight className="w-2 h-2" />
                    </span>
                </button>

                <Button variant="outline" className="rounded-xl border-white/10 bg-transparent hover:bg-white/5 text-white h-9 text-xs font-bold px-4">
                    {actionLabel}
                </Button>
            </div>
        </div>
    );
}
