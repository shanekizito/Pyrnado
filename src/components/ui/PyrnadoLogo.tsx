import { cn } from "@/lib/utils";

interface PyrnadoLogoProps {
    className?: string;
    size?: "sm" | "md" | "lg";
}

export const PyrnadoLogo = ({ className, size = "md" }: PyrnadoLogoProps) => {
    const fontSizeClass = size === "sm" ? "text-2xl" : size === "lg" ? "text-6xl" : "text-4xl";

    return (
        <div className={cn("flex items-center cursor-pointer", className)}>
            {/* Typography with Triangle and 'y' */}
            <span
                className={cn(
                    "font-medium tracking-tight text-foreground dark:text-white leading-none transition-colors font-display",
                    fontSizeClass
                )}
            >
                py<span className="text-emerald-400">▼</span>nado
            </span>
        </div>
    );
};
