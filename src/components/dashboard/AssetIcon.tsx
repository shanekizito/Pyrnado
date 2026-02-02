import React from "react";
import { cn } from "@/lib/utils";

interface AssetIconProps {
    src?: string;
    symbol: string;
    className?: string;
    size?: "sm" | "md" | "lg" | "xl";
    forceWhite?: boolean;
}

const LOCAL_ICONS: Record<string, string> = {
    ETH: "/icons/ethereum.png",
    USDC: "/icons/usdc.png",
    MATIC: "/icons/polygon.png",
    USDT: "/icons/tether.png",
};

const ASSET_COLORS: Record<string, { bg: string; border: string; shadow: string }> = {
    USDC: {
        bg: "bg-[#2775CA]", // Brand Blue
        border: "border-blue-400/30",
        shadow: "shadow-[0_4px_12px_-2px_rgba(39,117,202,0.3),inset_0_1px_1px_rgba(255,255,255,0.4)]"
    },
    USDT: {
        bg: "bg-[#26A17B]", // Brand Teal
        border: "border-emerald-400/30",
        shadow: "shadow-[0_4px_12px_-2px_rgba(38,161,123,0.3),inset_0_1px_1px_rgba(255,255,255,0.4)]"
    },
    ETH: {
        bg: "bg-[#627EEA]", // Brand Ethereum Blue
        border: "border-indigo-400/30",
        shadow: "shadow-[0_4px_12px_-2px_rgba(98,126,234,0.3),inset_0_1px_1px_rgba(255,255,255,0.4)]"
    },
    MATIC: {
        bg: "bg-[#8247E5]", // Brand Polygon Purple
        border: "border-purple-400/30",
        shadow: "shadow-[0_4px_12px_-2px_rgba(130,71,229,0.3),inset_0_1px_1px_rgba(255,255,255,0.4)]"
    },
};

export default function AssetIcon({ src, symbol, className, size = "md", forceWhite }: AssetIconProps) {
    const [error, setError] = React.useState(false);

    const localSrc = LOCAL_ICONS[symbol.toUpperCase()];
    const finalSrc = localSrc || src;

    const isEmoji = finalSrc && /\p{Extended_Pictographic}/u.test(finalSrc);
    const assetStyle = forceWhite
        ? { bg: "bg-white", border: "border-white", shadow: "shadow-none" }
        : (ASSET_COLORS[symbol.toUpperCase()] || {
            bg: "bg-zinc-700",
            border: "border-zinc-600",
            shadow: "shadow-[inset_0_2px_4px_rgba(255,255,255,0.2),inset_0_-2px_4px_rgba(0,0,0,0.2),0_4px_8px_rgba(0,0,0,0.3)]"
        });

    const sizeClasses = {
        sm: "w-10 h-10 text-[14px]",
        md: "w-16 h-16 text-base",
        lg: "size-24 text-xl",
        xl: "size-36 text-4xl",
    };

    const containerBase = "flex items-center justify-center rounded-full relative overflow-hidden transition-all duration-300 group-hover:scale-105";

    if (isEmoji) {
        return (
            <div className={cn(containerBase, assetStyle.bg, assetStyle.border, assetStyle.shadow, sizeClasses[size], className, "border-2")}>
                <span className="relative z-10 filter drop-shadow-md">{finalSrc}</span>
            </div>
        );
    }

    if (!finalSrc || error) {
        return (
            <div className={cn(containerBase, "bg-zinc-800 border-2 border-zinc-700 text-zinc-400 font-bold", assetStyle.shadow, sizeClasses[size], className)}>
                {symbol.slice(0, 2).toUpperCase()}
            </div>
        );
    }

    return (
        <div className={cn(containerBase, assetStyle.bg, assetStyle.border, assetStyle.shadow, sizeClasses[size], className, "border-2")}>
            {/* Premium Highlight */}
            {!forceWhite && (
                <div className="absolute inset-0 bg-gradient-to-b from-white/30 to-transparent opacity-50" />
            )}

            <img
                src={finalSrc}
                alt={symbol}
                className={cn(
                    "w-full h-full object-contain relative z-10 filter drop-shadow-[0_1px_2px_rgba(0,0,0,0.2)]",
                    "w-full h-full object-contain relative z-10 filter drop-shadow-[0_1px_2px_rgba(0,0,0,0.2)] p-0.5"
                )}
                onError={() => setError(true)}
            />
        </div>
    );
}
