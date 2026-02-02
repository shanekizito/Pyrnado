import { cn } from "@/lib/utils";

interface KashKashLogoProps {
    className?: string;
    size?: "sm" | "md" | "lg";
}

export const KashKashLogo = ({ className, size = "md" }: KashKashLogoProps) => {
    const widthClass = size === "sm" ? "w-8 h-8" : size === "lg" ? "w-16 h-16" : "w-10 h-10";
    const fontSizeClass = size === "sm" ? "text-lg" : size === "lg" ? "text-4xl" : "text-2xl";

    return (
        <div className={cn("flex items-center gap-3 group cursor-pointer", className)}>
            {/* Unique Abstract 'K' Logo - Sharp & Minimal */}
            <div
                className={cn(
                    "relative flex items-center justify-center rounded-lg overflow-hidden",
                    widthClass
                )}
                style={{
                    background: "#000",
                    border: "1px solid rgba(255,255,255,0.15)"
                }}
            >
                <div className="relative w-full h-full p-[20%]">
                    {/* Minimal sharp K symbol */}
                    <div className="absolute left-[35%] top-[20%] bottom-[20%] w-[15%] bg-white rounded-sm" />
                    <div className="absolute left-[35%] top-[50%] w-[50%] h-[15%] bg-emerald-400 origin-left -rotate-45 rounded-sm" />
                    <div className="absolute left-[35%] top-[50%] w-[50%] h-[15%] bg-emerald-500 origin-left rotate-45 rounded-sm" />
                </div>
            </div>

            {/* Typography - IBM Plex Mono */}
            <div className="flex flex-col justify-center">
                <span
                    className={cn(
                        "font-light tracking-tight text-white leading-none group-hover:text-emerald-400 transition-colors",
                        fontSizeClass
                    )}
                    style={{ fontFamily: "'IBM Plex Mono', monospace" }}
                >
                    Kash<span className="text-emerald-400">Kash</span>
                </span>
            </div>
        </div>
    );
};
