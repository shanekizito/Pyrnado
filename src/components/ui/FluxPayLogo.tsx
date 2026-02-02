import { cn } from "@/lib/utils";

interface FluxPayLogoProps {
    className?: string;
    size?: "sm" | "md" | "lg";
    showText?: boolean;
}

export function FluxPayLogo({ className, size = "md", showText = true }: FluxPayLogoProps) {
    const sizes = {
        sm: { icon: "w-8 h-8", text: "text-lg", svg: "w-4 h-4" },
        md: { icon: "w-10 h-10", text: "text-2xl", svg: "w-5 h-5" },
        lg: { icon: "w-14 h-14", text: "text-3xl", svg: "w-7 h-7" },
    };

    return (
        <div className={cn("flex items-center gap-3 group", className)}>
            <div className={cn("relative", sizes[size].icon)}>
                {/* Logo glow effect */}
                <div className="absolute inset-0 bg-accent rounded-xl blur-lg opacity-40 group-hover:opacity-60 transition-opacity" />
                {/* Logo container */}
                <div className={cn(
                    "relative bg-gradient-to-br from-accent to-blue-600 rounded-xl flex items-center justify-center",
                    sizes[size].icon
                )}>
                    {/* Custom FluxPay Network Logo - Stylized "F" with flow lines */}
                    <svg
                        viewBox="0 0 32 32"
                        className={cn(sizes[size].svg, "text-white")}
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        {/* Main F shape */}
                        <path
                            d="M8 6h16M8 6v20M8 16h12"
                            stroke="currentColor"
                            strokeWidth="3"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        {/* Flow arrow - indicating payment flow */}
                        <path
                            d="M20 16l4-4m0 0l4 4m-4-4v10"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="opacity-80"
                        />
                    </svg>
                </div>
            </div>
            {showText && (
                <div className="flex flex-col">
                    <span className={cn(
                        "font-bold tracking-tight text-foreground leading-none",
                        sizes[size].text
                    )}>
                        FluxPay
                    </span>
                    <span className="text-xs text-muted-foreground font-medium tracking-wide">
                        NETWORK
                    </span>
                </div>
            )}
        </div>
    );
}

// Alternative compact version for tight spaces
export function FluxPayLogoCompact({ className }: { className?: string }) {
    return (
        <div className={cn("relative w-10 h-10 group", className)}>
            <div className="absolute inset-0 bg-accent rounded-xl blur-lg opacity-40 group-hover:opacity-60 transition-opacity" />
            <div className="relative w-10 h-10 bg-gradient-to-br from-accent to-blue-600 rounded-xl flex items-center justify-center">
                <svg
                    viewBox="0 0 32 32"
                    className="w-5 h-5 text-white"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M8 6h16M8 6v20M8 16h12"
                        stroke="currentColor"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                    <path
                        d="M20 16l4-4m0 0l4 4m-4-4v10"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="opacity-80"
                    />
                </svg>
            </div>
        </div>
    );
}
