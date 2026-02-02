import { Info } from "lucide-react";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";

interface InfoTooltipProps {
    content: string;
    className?: string;
}

export default function InfoTooltip({ content, className }: InfoTooltipProps) {
    return (
        <TooltipProvider delayDuration={200}>
            <Tooltip>
                <TooltipTrigger asChild>
                    <button
                        className={`inline-flex items-center justify-center w-4 h-4 rounded-full bg-white/[0.06] hover:bg-white/[0.12] text-zinc-500 hover:text-zinc-300 transition-all duration-200 ${className}`}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <Info className="w-3 h-3" />
                    </button>
                </TooltipTrigger>
                <TooltipContent
                    side="top"
                    className="max-w-xs bg-zinc-900 border-white/[0.12] text-zinc-200 text-xs px-3 py-2"
                >
                    <p>{content}</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
}
