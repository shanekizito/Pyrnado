import { useState } from "react";
import { AreaChart, Area, ResponsiveContainer, XAxis, Tooltip, CartesianGrid } from 'recharts';
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Activity, BarChart2, CandlestickChart } from "lucide-react";

const dailyData = [
    { name: 'Jan', value: 2400 }, { name: 'Feb', value: 1398 }, { name: 'Mar', value: 9800 },
    { name: 'Apr', value: 3908 }, { name: 'May', value: 4800 }, { name: 'Jun', value: 3800 },
    { name: 'Jul', value: 4300 },
];

const monthlyData = [
    { name: 'W1', value: 400 }, { name: 'W2', value: 300 }, { name: 'W3', value: 500 },
    { name: 'W4', value: 450 }, { name: 'W5', value: 600 },
];

const yearlyData = [
    { name: '2020', value: 10000 }, { name: '2021', value: 25000 }, { name: '2022', value: 18000 },
    { name: '2023', value: 35000 }, { name: '2024', value: 47590 },
];

export function IndicatorsChart() {
    const [activeTab, setActiveTab] = useState<'Daily' | 'Monthly' | 'Yearly'>('Daily');

    const data = activeTab === 'Daily' ? dailyData : activeTab === 'Monthly' ? monthlyData : yearlyData;

    return (
        <div className="p-6 rounded-[2rem] bg-[#121212] border border-white/5 relative overflow-hidden h-full flex flex-col">
            <div className="flex justify-between items-start mb-6 relative z-10">
                <div>
                    <h3 className="text-xl font-bold text-white mb-1">Indicators</h3>
                    <p className="text-zinc-500 text-xs">Growth Earning +5.7% from Last Month</p>
                </div>
                <div className="w-10 h-10 rounded-full border border-white/5 flex items-center justify-center">
                    <Activity className="w-4 h-4 text-zinc-500" />
                </div>
            </div>

            <div className="flex justify-between items-center mb-4 relative z-10">
                <div className="flex bg-[#0A0A0A] rounded-lg p-1 border border-white/5">
                    {(['Daily', 'Monthly', 'Yearly'] as const).map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={cn(
                                "px-3 py-1 text-xs font-medium rounded-md transition-all",
                                activeTab === tab ? "bg-emerald-500/10 text-emerald-500" : "text-zinc-500 hover:text-white"
                            )}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                <div className="flex gap-2 text-zinc-500">
                    <BarChart2 className="w-4 h-4 cursor-pointer hover:text-white" />
                    <CandlestickChart className="w-4 h-4 cursor-pointer hover:text-white" />
                </div>
            </div>

            <div className="flex-1 w-full min-h-0 relative z-10">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data}>
                        <defs>
                            <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                                <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid vertical={false} stroke="#ffffff05" />
                        <XAxis
                            dataKey="name"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#52525b', fontSize: 10 }}
                            dy={10}
                        />
                        <Tooltip
                            contentStyle={{ backgroundColor: '#18181b', border: '1px solid #27272a', borderRadius: '12px', color: '#fff' }}
                            itemStyle={{ color: '#10b981' }}
                        />
                        <Area
                            type="monotone"
                            dataKey="value"
                            stroke="#10b981"
                            strokeWidth={2}
                            fillOpacity={1}
                            fill="url(#colorValue)"
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>

            {/* Background Glow */}
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-emerald-500/5 blur-[60px] rounded-full pointer-events-none" />
        </div>
    );
}
