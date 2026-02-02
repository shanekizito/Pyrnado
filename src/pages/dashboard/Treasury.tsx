import { useState } from "react";
import {
    Wallet,
    TrendingUp,
    Repeat,
    DollarSign,
    ArrowUpDown,
    Plus,
    Download,
    AlertCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import MetricCard from "@/components/dashboard/MetricCard";
import InfoTooltip from "@/components/dashboard/InfoTooltip";
import StatusBadge from "@/components/dashboard/StatusBadge";
import { Area, AreaChart, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import { motion } from "framer-motion";
import { useAssets, usePortfolio } from "@/hooks/use-treasury";
import AssetIcon from "@/components/dashboard/AssetIcon";

interface Asset {
    symbol: string;
    name: string;
    balance: number;
    usdValue: number;
    change24h: number;
    chain: string;
    color: string;
    icon: string;
}

// Fallback Mock Data
const MOCK_ASSETS: Asset[] = [
    {
        symbol: "USDC",
        name: "USD Coin",
        balance: 45230.50,
        usdValue: 45230.50,
        change24h: 0.01,
        chain: "Ethereum",
        color: "#2775CA",
        icon: "https://cryptologos.cc/logos/usd-coin-usdc-logo.svg?v=024"
    },
    {
        symbol: "ETH",
        name: "Ethereum",
        balance: 3.56,
        usdValue: 8727.58,
        change24h: 2.34,
        chain: "Ethereum",
        color: "#627EEA",
        icon: "https://cryptologos.cc/logos/ethereum-eth-logo.svg?v=024"
    },
    {
        symbol: "USDT",
        name: "Tether",
        balance: 12450.00,
        usdValue: 12450.00,
        change24h: -0.02,
        chain: "Ethereum",
        color: "#26A17B",
        icon: "https://cryptologos.cc/logos/tether-usdt-logo.svg?v=024"
    }
];

const MOCK_PORTFOLIO = Array.from({ length: 7 }, (_, i) => ({
    date: new Date(Date.now() - (6 - i) * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    value: 65000 + Math.random() * 2000
}));

export default function Treasury() {
    const [swapFrom, setSwapFrom] = useState("USDC");
    const [swapTo, setSwapTo] = useState("ETH");
    const [swapAmount, setSwapAmount] = useState("");

    const { data: fetchedAssets = [], isLoading: assetsLoading } = useAssets();
    const { data: fetchedPortfolio = [], isLoading: portfolioLoading } = usePortfolio();

    // Use mock data if fetched data is empty (fallback)
    const assets = fetchedAssets.length > 0 ? fetchedAssets : MOCK_ASSETS;
    const portfolio = fetchedPortfolio.length > 0 ? fetchedPortfolio : MOCK_PORTFOLIO;

    const totalValue = assets.reduce((sum: number, asset: Asset) => sum + asset.usdValue, 0);

    // Dynamic calculations
    const stablecoins = assets.filter((a: Asset) => ["USDC", "USDT", "DAI"].includes(a.symbol));
    const cryptos = assets.filter((a: Asset) => !["USDC", "USDT", "DAI"].includes(a.symbol));

    const stablecoinsValue = stablecoins.reduce((sum: number, a: Asset) => sum + a.usdValue, 0);
    const cryptoValue = cryptos.reduce((sum: number, a: Asset) => sum + a.usdValue, 0);

    const gasReserves = assets
        .filter((a: Asset) => ["ETH", "MATIC", "BNB"].includes(a.symbol))
        .reduce((sum: number, a: Asset) => sum + (a.usdValue * 0.1), 0);

    const portfolioChange = portfolio.length > 0
        ? ((totalValue - portfolio[0].value) / portfolio[0].value) * 100
        : 0;

    return (
        <div className="p-4 lg:p-6 max-w-[1600px] mx-auto space-y-6 animate-fade-in">
            {/* Header */}
            <div className="flex items-center justify-end pb-3">
                <div className="flex gap-2">
                    <Button variant="outline" className="h-8 px-4 text-[10px] font-semibold border-zinc-800 bg-[#111] text-zinc-400 hover:text-white hover:bg-[#222]">
                        <Download className="w-3 h-3 mr-2" />
                        Export
                    </Button>
                    <Button className="h-8 px-4 text-[10px] font-bold bg-white text-black hover:bg-zinc-200">
                        <Plus className="w-3 h-3 mr-2" />
                        Add Funds
                    </Button>
                </div>
            </div>

            {/* Page Title Section */}
            <div className="mb-4">
                <h1 className="text-3xl font-bold tracking-tight text-white mb-2">Asset Management</h1>
                <p className="text-sm text-zinc-500">Multi-chain portfolio and liquidity operations</p>
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-[#111] border border-[#222] rounded-2xl p-5">
                    <div className="flex items-start justify-between mb-3">
                        <h3 className="text-[10px] font-bold text-zinc-500 uppercase tracking-[0.2em]">Total Value</h3>
                    </div>
                    <h3 className="text-2xl font-medium tracking-tight text-white mb-1 font-mono tabular-nums">
                        ${(totalValue || 0).toLocaleString()}
                    </h3>
                    <p className={`text-xs font-medium ${portfolioChange >= 0 ? 'text-emerald-400' : 'text-red-500'}`}>
                        {portfolioChange >= 0 ? '+' : ''}{portfolioChange.toFixed(2)}% 24h
                    </p>
                </div>

                <div className="bg-[#111] border border-[#222] rounded-2xl p-5">
                    <div className="flex items-start justify-between mb-3">
                        <h3 className="text-[10px] font-bold text-zinc-500 uppercase tracking-[0.2em]">Stablecoins</h3>
                    </div>
                    <h3 className="text-2xl font-medium tracking-tight text-white mb-1 font-mono tabular-nums">
                        ${(stablecoinsValue || 0).toLocaleString()}
                    </h3>
                    <p className="text-xs text-zinc-500">
                        {totalValue > 0 ? (stablecoinsValue / totalValue * 100).toFixed(1) : '0.0'}% of portfolio
                    </p>
                </div>

                <div className="bg-[#111] border border-[#222] rounded-2xl p-5">
                    <div className="flex items-start justify-between mb-3">
                        <h3 className="text-[10px] font-bold text-zinc-500 uppercase tracking-[0.2em]">Crypto Assets</h3>
                    </div>
                    <h3 className="text-2xl font-medium tracking-tight text-white mb-1 font-mono tabular-nums">
                        ${(cryptoValue || 0).toLocaleString()}
                    </h3>
                    <p className="text-xs text-zinc-500">
                        {totalValue > 0 ? (cryptoValue / totalValue * 100).toFixed(1) : '0.0'}% of portfolio
                    </p>
                </div>

                <div className="bg-[#111] border border-[#222] rounded-2xl p-5">
                    <div className="flex items-start justify-between mb-3">
                        <h3 className="text-[10px] font-bold text-zinc-500 uppercase tracking-[0.2em]">Gas Reserves</h3>
                    </div>
                    <h3 className="text-2xl font-medium tracking-tight text-white mb-1 font-mono tabular-nums">
                        ${gasReserves.toFixed(0)}
                    </h3>
                    <p className="text-xs text-emerald-400 font-medium">{gasReserves > 500 ? 'Sufficient' : 'Low'}</p>
                </div>
            </div>

            {/* Portfolio Chart */}
            <div className="bg-[#111] border border-[#222] rounded-2xl p-6">
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h3 className="text-[10px] font-bold text-zinc-500 uppercase tracking-[0.2em] mb-2">Portfolio Value</h3>
                        <p className="text-xs text-zinc-500">Last 7 days</p>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                        <span className="text-zinc-500 text-xs">Change:</span>
                        <span className={`font-semibold text-sm ${portfolioChange >= 0 ? 'text-emerald-400' : 'text-red-500'}`}>
                            {portfolioChange >= 0 ? '+' : ''}{portfolioChange.toFixed(2)}%
                        </span>
                    </div>
                </div>
                {portfolioLoading ? (
                    <div className="h-[250px] flex items-center justify-center text-zinc-500">Loading chart...</div>
                ) : portfolio.length === 0 ? (
                    <div className="h-[250px] flex flex-col items-center justify-center text-zinc-500">
                        <TrendingUp className="w-12 h-12 mb-3 opacity-20" />
                        <p className="text-sm">No portfolio data available</p>
                    </div>
                ) : (
                    <ResponsiveContainer width="100%" height={250}>
                        <AreaChart data={portfolio}>
                            <defs>
                                <linearGradient id="portfolioGradient" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                                    <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="#333" opacity={0.5} />
                            <XAxis
                                dataKey="date"
                                stroke="#666"
                                tick={{ fill: '#888', fontSize: 11 }}
                                axisLine={{ stroke: '#444' }}
                            />
                            <YAxis
                                stroke="#666"
                                tick={{ fill: '#888', fontSize: 11 }}
                                axisLine={{ stroke: '#444' }}
                            />
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: "#1a1a1a",
                                    border: "1px solid #333",
                                    borderRadius: "8px",
                                }}
                                labelStyle={{ color: "#fff" }}
                            />
                            <Area
                                type="monotone"
                                dataKey="value"
                                stroke="#10b981"
                                strokeWidth={2.5}
                                fillOpacity={1}
                                fill="url(#portfolioGradient)"
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                )}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {/* Asset Balances */}
                <div className="bg-[#111] border border-[#222] rounded-2xl overflow-hidden">
                    <div className="px-6 py-4 border-b border-[#222]">
                        <h3 className="text-sm font-semibold text-white">Asset Balances</h3>
                    </div>

                    {assetsLoading ? (
                        <div className="p-8 text-center text-zinc-500">Loading assets...</div>
                    ) : (
                        <div className="divide-y divide-[#222]">
                            {assets.map((asset: Asset) => (
                                <div key={asset.symbol} className="p-5 hover:bg-[#0f0f0f] transition-colors">
                                    <div className="flex items-center justify-between mb-3">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-zinc-900 border border-[#333] flex items-center justify-center overflow-hidden">
                                                <AssetIcon
                                                    symbol={asset.symbol}
                                                    src={asset.icon}
                                                    forceWhite
                                                    size="sm"
                                                />
                                            </div>
                                            <div>
                                                <h4 className="font-semibold text-white text-sm">{asset.symbol}</h4>
                                                <p className="text-xs text-zinc-500">{asset.name}</p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-sm font-semibold text-white font-mono tabular-nums">
                                                {(asset.balance || 0).toLocaleString()} {asset.symbol}
                                            </p>
                                            <p className="text-xs text-zinc-500 font-mono">
                                                ${(asset.usdValue || 0).toLocaleString()}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between text-xs">
                                        <span className="text-zinc-500">{asset.chain}</span>
                                        <span className={`font-medium ${asset.change24h >= 0 ? 'text-emerald-400' : 'text-red-500'}`}>
                                            {asset.change24h >= 0 ? '+' : ''}{asset.change24h.toFixed(2)}% 24h
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Swap Interface */}
                <div className="bg-[#111] border border-[#222] rounded-2xl p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-sm font-semibold text-white">Swap Assets</h3>
                        <InfoTooltip content="Exchange one asset for another at current market rates." />
                    </div>

                    <div className="space-y-4">
                        {/* From */}
                        <div>
                            <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-[0.2em] mb-2 block">From</label>
                            <div className="bg-[#0A0A0A] border border-[#222] rounded-xl p-4">
                                <div className="flex items-center justify-between mb-3">
                                    <select
                                        value={swapFrom}
                                        onChange={(e) => setSwapFrom(e.target.value)}
                                        className="bg-transparent text-white font-semibold text-sm focus:outline-none cursor-pointer"
                                    >
                                        {assets.map((asset: Asset) => (
                                            <option key={asset.symbol} value={asset.symbol} className="bg-zinc-900">
                                                {asset.symbol}
                                            </option>
                                        ))}
                                    </select>
                                    <span className="text-xs text-zinc-500">
                                        Balance: {(assets.find((a: Asset) => a.symbol === swapFrom)?.balance || 0).toLocaleString()}
                                    </span>
                                </div>
                                <input
                                    type="number"
                                    placeholder="0.00"
                                    value={swapAmount}
                                    onChange={(e) => setSwapAmount(e.target.value)}
                                    className="w-full bg-transparent text-2xl font-semibold text-white focus:outline-none placeholder:text-zinc-600 font-mono"
                                />
                            </div>
                        </div>

                        {/* Swap Button */}
                        <div className="flex justify-center -my-2">
                            <button className="w-10 h-10 rounded-xl bg-[#222] hover:bg-[#333] flex items-center justify-center transition-colors border border-[#333]">
                                <ArrowUpDown className="w-4 h-4 text-zinc-400" />
                            </button>
                        </div>

                        {/* To */}
                        <div>
                            <label className="text-xs text-zinc-500 mb-2 block">To</label>
                            <div className="premium-card p-4">
                                <div className="flex items-center justify-between mb-3">
                                    <select
                                        value={swapTo}
                                        onChange={(e) => setSwapTo(e.target.value)}
                                        className="bg-transparent text-foreground font-semibold text-sm focus:outline-none cursor-pointer"
                                    >
                                        {assets.map((asset: Asset) => (
                                            <option key={asset.symbol} value={asset.symbol} className="bg-zinc-900">
                                                {asset.symbol}
                                            </option>
                                        ))}
                                    </select>
                                    <span className="text-xs text-zinc-500">
                                        Balance: {(assets.find((a: Asset) => a.symbol === swapTo)?.balance || 0).toLocaleString()}
                                    </span>
                                </div>
                                <div className="text-2xl font-semibold text-zinc-700">
                                    {swapAmount ? (parseFloat(swapAmount) * 1.02).toFixed(4) : '0.00'}
                                </div>
                            </div>
                        </div>

                        {/* Rate Info */}
                        {swapAmount && (
                            <div className="premium-card p-3 bg-blue-500/5 border-blue-500/20">
                                <div className="flex items-start gap-2">
                                    <AlertCircle className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                                    <div className="text-xs text-blue-400">
                                        <p className="font-medium mb-1">Rate: 1 {swapFrom} = 1.02 {swapTo}</p>
                                        <p className="text-blue-500/70">Estimated gas fee: $2.50</p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Swap Button */}
                        <Button className="btn-primary w-full h-11 rounded-lg">
                            <Repeat className="w-4 h-4 mr-2" />
                            Swap Assets
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
