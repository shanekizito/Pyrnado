import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    Users,
    DollarSign,
    Clock,
    TrendingUp,
    Plus,
    Upload,
    Search,
    Filter,
    Download,
    Play,
    CheckCircle2,
    AlertCircle,
    MapPin,
    Wallet,
    Building2,
    Mail,
    Phone,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import MetricCard from "@/components/dashboard/MetricCard";
import InfoTooltip from "@/components/dashboard/InfoTooltip";
import StatusBadge from "@/components/dashboard/StatusBadge";
import DetailPanel from "@/components/dashboard/DetailPanel";
import { motion } from "framer-motion";

interface Worker {
    id: string;
    name: string;
    role: string;
    email: string;
    phone: string;
    country: string;
    wallet: string;
    bankAccount?: string;
    kycStatus: "verified" | "pending" | "failed";
    lastPayment: string;
    totalPaid: number;
    avatar: string;
}

interface PayrollBatch {
    id: string;
    name: string;
    workerCount: number;
    totalAmount: number;
    status: "draft" | "pending" | "approved" | "processing" | "completed";
    createdDate: string;
    scheduledDate?: string;
}

import { useWorkers, usePayrollBatches } from "@/hooks/use-payroll";
import { AddWorkerModal } from "@/components/dashboard/modals/AddWorkerModal";
import { ImportCSVModal } from "@/components/dashboard/modals/ImportCSVModal";
import { NewBatchWizard } from "@/components/dashboard/modals/NewBatchWizard";

// ... existing interfaces ...

export default function Payroll() {
    const navigate = useNavigate();
    const [selectedWorker, setSelectedWorker] = useState<Worker | null>(null);
    const [selectedBatch, setSelectedBatch] = useState<PayrollBatch | null>(null);
    const [activeTab, setActiveTab] = useState<"workers" | "batches" | "history">("workers");
    const [searchQuery, setSearchQuery] = useState("");

    // Modal states
    const [isAddWorkerOpen, setIsAddWorkerOpen] = useState(false);
    const [isImportCSVOpen, setIsImportCSVOpen] = useState(false);
    const [isNewBatchOpen, setIsNewBatchOpen] = useState(false);

    // Fetch real data
    const { data: workersData, isLoading: workersLoading } = useWorkers({ search: searchQuery });
    const { data: batchesData, isLoading: batchesLoading } = usePayrollBatches();

    const workers = workersData || [];
    const batches = batchesData || [];

    // Filter local for extra fluidity on small lists
    const filteredWorkers = workers.filter((w: Worker) =>
        w.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        w.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        w.role.toLowerCase().includes(searchQuery.toLowerCase())
    );
    // Metrics Calculations
    const activeWorkersCount = workers.length;
    const uniqueCountries = new Set(workers.map((w: Worker) => w.country)).size;

    const nextBatch = batches
        .filter((b: PayrollBatch) => b.status === 'pending' || (b.scheduledDate && new Date(b.scheduledDate) > new Date()))
        .sort((a: PayrollBatch, b: PayrollBatch) => new Date(a.scheduledDate || 0).getTime() - new Date(b.scheduledDate || 0).getTime())[0];

    const monthlyTotal = batches.reduce((sum: number, b: PayrollBatch) => sum + (b.totalAmount || 0), 0);
    const costSavings = monthlyTotal * 0.045; // Est. 4.5% savings


    return (
        <div className="p-4 lg:p-6 max-w-[1600px] mx-auto space-y-6 animate-fade-in">
            {/* Header */}
            <div className="flex items-center justify-end gap-3">
                <Button
                    variant="outline"
                    className="h-8 px-4 text-[10px] font-semibold border-zinc-800 bg-[#111] text-zinc-400 hover:text-white hover:bg-[#222]"
                    onClick={() => setIsImportCSVOpen(true)}
                >
                    <Upload className="w-3 h-3 mr-2" />
                    Import CSV
                </Button>
                <Button
                    className="h-8 px-4 text-[10px] font-bold bg-white text-black hover:bg-zinc-200"
                    onClick={() => setIsAddWorkerOpen(true)}
                >
                    <Plus className="w-3 h-3 mr-2" />
                    Add Worker
                </Button>
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-[#111] border border-[#222] rounded-2xl p-5">
                    <div className="flex items-start justify-between mb-3">
                        <h3 className="text-[10px] font-bold text-zinc-500 uppercase tracking-[0.2em]">Next Payroll</h3>
                    </div>
                    {batchesLoading ? (
                        <div className="h-10 animate-pulse bg-zinc-800 rounded" />
                    ) : (
                        <>
                            <h3 className="text-2xl font-medium tracking-tight text-white mb-1 tabular-nums">
                                {nextBatch ? new Date(nextBatch.scheduledDate || Date.now()).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : "None"}
                            </h3>
                            <p className="text-xs text-zinc-500">
                                {nextBatch ? `$${(nextBatch.totalAmount || 0).toLocaleString()}` : "No upcoming batches"}
                            </p>
                        </>
                    )}
                </div>

                <div className="bg-[#111] border border-[#222] rounded-2xl p-5">
                    <div className="flex items-start justify-between mb-3">
                        <h3 className="text-[10px] font-bold text-zinc-500 uppercase tracking-[0.2em]">Active Workers</h3>
                    </div>
                    {workersLoading ? (
                        <div className="h-10 animate-pulse bg-zinc-800 rounded" />
                    ) : (
                        <>
                            <h3 className="text-2xl font-medium tracking-tight text-white mb-1 tabular-nums">{activeWorkersCount}</h3>
                            <p className="text-xs text-zinc-500">{uniqueCountries} countries</p>
                        </>
                    )}
                </div>

                <div className="bg-[#111] border border-[#222] rounded-2xl p-5">
                    <div className="flex items-start justify-between mb-3">
                        <h3 className="text-[10px] font-bold text-zinc-500 uppercase tracking-[0.2em]">Monthly Total</h3>
                    </div>
                    {batchesLoading ? (
                        <div className="h-10 animate-pulse bg-zinc-800 rounded" />
                    ) : (
                        <>
                            <h3 className="text-2xl font-medium tracking-tight text-white mb-1 font-mono tabular-nums">${(monthlyTotal || 0).toLocaleString()}</h3>
                            <p className="text-xs text-emerald-400 font-medium">+8.5% vs last month</p>
                        </>
                    )}
                </div>

                <div className="bg-[#111] border border-[#222] rounded-2xl p-5">
                    <div className="flex items-start justify-between mb-3">
                        <h3 className="text-[10px] font-bold text-zinc-500 uppercase tracking-[0.2em]">Cost Savings</h3>
                    </div>
                    {batchesLoading ? (
                        <div className="h-10 animate-pulse bg-zinc-800 rounded" />
                    ) : (
                        <>
                            <h3 className="text-2xl font-medium tracking-tight text-white mb-1 font-mono tabular-nums">${(costSavings || 0).toLocaleString(undefined, { maximumFractionDigits: 0 })}</h3>
                            <p className="text-xs text-zinc-500">vs traditional</p>
                        </>
                    )}
                </div>
            </div>

            {/* Tabs */}
            <div className="flex items-center gap-2 border-b border-[#222]">
                {[
                    { id: "workers", label: "Workers", icon: Users },
                    { id: "batches", label: "Payroll Batches", icon: DollarSign },
                    { id: "history", label: "History", icon: Clock },
                ].map((tab) => {
                    const Icon = tab.icon;
                    return (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id as "workers" | "batches" | "history")}
                            className={`flex items-center gap-2 px-4 py-3 text-xs font-semibold transition-all duration-200 border-b-2 ${activeTab === tab.id
                                ? "text-white border-white"
                                : "text-zinc-500 hover:text-zinc-300 border-transparent hover:bg-[#111]"
                                }`}
                        >
                            <Icon className="w-3.5 h-3.5" />
                            {tab.label}
                        </button>
                    );
                })}
            </div>

            {/* Workers Tab */}
            {activeTab === "workers" && (
                <div className="space-y-4">
                    {/* Search */}
                    <div className="flex items-center gap-3">
                        <div className="flex-1 relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                            <input
                                type="text"
                                placeholder="Search workers by name, email, or role..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full h-10 pl-10 pr-4 bg-[#111] border border-[#222] rounded-lg text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:ring-1 focus:ring-zinc-700 transition-all"
                            />
                        </div>
                        <Button variant="outline" className="h-10 px-4 rounded-lg border-zinc-800 bg-[#111] text-zinc-400 hover:text-white hover:bg-[#222]">
                            <Filter className="w-4 h-4 mr-2" />
                            Filter
                        </Button>
                    </div>

                    {/* Workers Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {filteredWorkers.map((worker) => (
                            <motion.div
                                key={worker.id}
                                whileHover={{ y: -2 }}
                                onClick={() => setSelectedWorker(worker)}
                                className="premium-card p-5 cursor-pointer hover:border-primary/20 transition-all duration-200"
                            >
                                <div className="flex items-start gap-4 mb-4">
                                    <img
                                        src={worker.avatar}
                                        alt={worker.name}
                                        className="w-12 h-12 rounded-lg bg-muted ring-1 ring-border"
                                    />
                                    <div className="flex-1 min-w-0">
                                        <h4 className="font-semibold text-foreground text-sm mb-0.5 truncate">
                                            {worker.name}
                                        </h4>
                                        <p className="text-xs text-muted-foreground truncate">{worker.role}</p>
                                    </div>
                                    <StatusBadge
                                        status={worker.kycStatus === "verified" ? "completed" : worker.kycStatus}
                                        label={worker.kycStatus === "verified" ? "KYC" : "Pending"}
                                    />
                                </div>

                                <div className="space-y-2 text-xs">
                                    <div className="flex items-center gap-2 text-muted-foreground">
                                        <MapPin className="w-3.5 h-3.5" />
                                        <span>{worker.country}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-muted-foreground">
                                        <Wallet className="w-3.5 h-3.5" />
                                        <span className="font-mono truncate">{worker.wallet.slice(0, 12)}...</span>
                                    </div>
                                </div>

                                <div className="mt-4 pt-4 border-t border-border flex items-center justify-between">
                                    <div>
                                        <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-0.5">
                                            Total Paid
                                        </p>
                                        <p className="text-sm font-semibold text-foreground tabular-nums">
                                            ${(worker.totalPaid || 0).toLocaleString()}
                                        </p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-0.5">
                                            Last Payment
                                        </p>
                                        <p className="text-xs text-muted-foreground">{worker.lastPayment}</p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            )}

            {/* Batches Tab */}
            {activeTab === "batches" && (
                <div className="space-y-4">
                    <div className="premium-card overflow-hidden">
                        <div className="card-header flex items-center justify-between">
                            <h3 className="font-semibold text-foreground text-[15px]">Payroll Batches</h3>
                            <Button
                                variant="institutional"
                                size="sm"
                                className="h-8 px-4 text-[11px]"
                                onClick={() => setIsNewBatchOpen(true)}
                            >
                                <Plus className="w-3.5 h-3.5 mr-1.5" />
                                New Batch
                            </Button>
                        </div>

                        {batchesLoading ? (
                            <div className="p-8 text-center text-muted-foreground">Loading specific batches...</div>
                        ) : (
                            <div className="divide-y divide-border">
                                {batches.length === 0 ? (
                                    <div className="p-8 text-center text-muted-foreground">No batches found</div>
                                ) : (
                                    batches.map((batch: PayrollBatch) => (
                                        <div
                                            key={batch.id}
                                            onClick={() => setSelectedBatch(batch)}
                                            className="p-5 hover:bg-zinc-50 dark:hover:bg-muted/50 cursor-pointer transition-colors"
                                        >
                                            <div className="flex items-start justify-between mb-3">
                                                <div className="flex-1">
                                                    <h4 className="font-semibold text-foreground text-sm mb-1">{batch.name}</h4>
                                                    <p className="text-xs text-muted-foreground">Created {batch.createdDate}</p>
                                                </div>
                                                <StatusBadge status={batch.status} />
                                            </div>

                                            <div className="grid grid-cols-3 gap-4 text-xs">
                                                <div>
                                                    <p className="text-muted-foreground mb-1">Workers</p>
                                                    <p className="text-foreground font-semibold">{batch.workerCount}</p>
                                                </div>
                                                <div>
                                                    <p className="text-muted-foreground mb-1">Total Amount</p>
                                                    <p className="text-foreground font-semibold tabular-nums">
                                                        ${(batch.totalAmount || 0).toLocaleString()}
                                                    </p>
                                                </div>
                                                <div>
                                                    <p className="text-muted-foreground mb-1">Scheduled</p>
                                                    <p className="text-foreground font-semibold">
                                                        {batch.scheduledDate || "Not scheduled"}
                                                    </p>
                                                </div>
                                            </div>

                                            {batch.status === "approved" && (
                                                <div className="mt-4 pt-4 border-t border-border">
                                                    <Button className="h-8 px-4 rounded-lg text-xs w-full shadow-sm">
                                                        <Play className="w-3.5 h-3.5 mr-1.5" />
                                                        Execute Payroll
                                                    </Button>
                                                </div>
                                            )}
                                        </div>
                                    ))
                                )}
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* History Tab */}
            {activeTab === "history" && (
                <div className="premium-card p-6 text-center">
                    <Clock className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
                    <p className="text-muted-foreground">Payroll history coming soon</p>
                </div>
            )}

            {/* Worker Detail Panel */}
            <DetailPanel
                isOpen={!!selectedWorker}
                onClose={() => setSelectedWorker(null)}
                title="Worker Details"
                width="md"
            >
                {selectedWorker && (
                    <div className="space-y-6">
                        {/* Profile */}
                        <div className="flex items-start gap-4">
                            <img
                                src={selectedWorker.avatar}
                                alt={selectedWorker.name}
                                className="w-16 h-16 rounded-xl bg-muted ring-1 ring-border"
                            />
                            <div className="flex-1">
                                <h3 className="text-lg font-semibold text-foreground mb-1">
                                    {selectedWorker.name}
                                </h3>
                                <p className="text-sm text-muted-foreground mb-2">{selectedWorker.role}</p>
                                <StatusBadge
                                    status={selectedWorker.kycStatus === "verified" ? "completed" : selectedWorker.kycStatus}
                                    label={selectedWorker.kycStatus === "verified" ? "KYC Verified" : "KYC Pending"}
                                />
                            </div>
                        </div>

                        {/* Contact Info */}
                        <div className="premium-card p-4">
                            <h4 className="text-sm font-semibold text-foreground mb-3">Contact Information</h4>
                            <div className="space-y-3 text-sm">
                                <div className="flex items-center gap-3">
                                    <Mail className="w-4 h-4 text-muted-foreground" />
                                    <span className="text-muted-foreground">{selectedWorker.email}</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Phone className="w-4 h-4 text-muted-foreground" />
                                    <span className="text-muted-foreground">{selectedWorker.phone}</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <MapPin className="w-4 h-4 text-muted-foreground" />
                                    <span className="text-muted-foreground">{selectedWorker.country}</span>
                                </div>
                            </div>
                        </div>

                        {/* Payment Details */}
                        <div className="premium-card p-4">
                            <h4 className="text-sm font-semibold text-foreground mb-3">Payment Details</h4>
                            <div className="space-y-3">
                                <div>
                                    <p className="text-xs text-muted-foreground mb-1">Wallet Address</p>
                                    <p className="text-sm font-mono text-muted-foreground break-all">
                                        {selectedWorker.wallet}
                                    </p>
                                </div>
                                {selectedWorker.bankAccount && (
                                    <div>
                                        <p className="text-xs text-muted-foreground mb-1">Bank Account</p>
                                        <p className="text-sm text-muted-foreground">{selectedWorker.bankAccount}</p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Payment History */}
                        <div className="premium-card p-4">
                            <h4 className="text-sm font-semibold text-foreground mb-3">Payment Summary</h4>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <p className="text-xs text-muted-foreground mb-1">Total Paid</p>
                                    <p className="text-lg font-semibold text-foreground tabular-nums">
                                        ${(selectedWorker.totalPaid || 0).toLocaleString()}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-xs text-muted-foreground mb-1">Last Payment</p>
                                    <p className="text-sm text-muted-foreground">{selectedWorker.lastPayment}</p>
                                </div>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="flex gap-3">
                            <Button variant="secondary" className="flex-1 h-10 rounded-lg border border-border">Edit Worker</Button>
                            <Button className="flex-1 h-10 rounded-lg shadow-sm">Pay Now</Button>
                        </div>
                    </div>
                )}
            </DetailPanel>

            {/* Batch Detail Panel */}
            <DetailPanel
                isOpen={!!selectedBatch}
                onClose={() => setSelectedBatch(null)}
                title="Payroll Batch Details"
                width="lg"
            >
                {selectedBatch && (
                    <div className="space-y-6">
                        {/* Batch Info */}
                        <div>
                            <div className="flex items-start justify-between mb-4">
                                <div>
                                    <h3 className="text-lg font-semibold text-foreground mb-1">{selectedBatch.name}</h3>
                                    <p className="text-sm text-muted-foreground">Created {selectedBatch.createdDate}</p>
                                </div>
                                <StatusBadge status={selectedBatch.status} />
                            </div>

                            <div className="grid grid-cols-3 gap-4">
                                <div className="premium-card p-4">
                                    <p className="text-xs text-muted-foreground mb-1">Workers</p>
                                    <p className="text-2xl font-semibold text-foreground">{selectedBatch.workerCount}</p>
                                </div>
                                <div className="premium-card p-4">
                                    <p className="text-xs text-muted-foreground mb-1">Total Amount</p>
                                    <p className="text-2xl font-semibold text-foreground tabular-nums">
                                        ${(selectedBatch.totalAmount || 0).toLocaleString()}
                                    </p>
                                </div>
                                <div className="premium-card p-4">
                                    <p className="text-xs text-muted-foreground mb-1">Scheduled</p>
                                    <p className="text-sm font-semibold text-foreground">
                                        {selectedBatch.scheduledDate || "Not set"}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Worker List */}
                        <div className="premium-card p-4">
                            <h4 className="text-sm font-semibold text-foreground mb-3">Workers in Batch</h4>
                            <div className="space-y-2">
                                {workers.slice(0, selectedBatch.workerCount > 10 ? 10 : selectedBatch.workerCount).map((worker) => (
                                    <div
                                        key={worker.id}
                                        className="flex items-center justify-between p-3 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors"
                                    >
                                        <div className="flex items-center gap-3">
                                            <img
                                                src={worker.avatar}
                                                alt={worker.name}
                                                className="w-8 h-8 rounded-lg"
                                            />
                                            <div>
                                                <p className="text-sm font-medium text-foreground">{worker.name}</p>
                                                <p className="text-xs text-muted-foreground">{worker.role}</p>
                                            </div>
                                        </div>
                                        <p className="text-sm font-semibold text-foreground tabular-nums">
                                            ${(selectedBatch.totalAmount / selectedBatch.workerCount).toFixed(2)}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="flex gap-3 pt-4 border-t border-border">
                            <Button
                                variant="outline"
                                className="flex-1 h-10 rounded-lg border-zinc-800 hover:bg-zinc-800 text-zinc-300"
                                onClick={() => navigate(`/dashboard/payroll/batches/${selectedBatch.id}`)}
                            >
                                View Details
                            </Button>

                            {selectedBatch.status === "draft" || selectedBatch.status === "pending" ? (
                                <Button className="flex-1 h-10 rounded-lg shadow-sm bg-emerald-500 hover:bg-emerald-400 text-black font-bold">
                                    <CheckCircle2 className="w-4 h-4 mr-2" />
                                    Approve Batch
                                </Button>
                            ) : selectedBatch.status === "approved" ? (
                                <Button className="flex-1 h-10 rounded-lg shadow-sm">
                                    <Play className="w-4 h-4 mr-2" />
                                    Execute Payroll
                                </Button>
                            ) : null}
                        </div>
                    </div>
                )}
            </DetailPanel>
            {/* Modals */}
            <AddWorkerModal
                isOpen={isAddWorkerOpen}
                onClose={() => setIsAddWorkerOpen(false)}
            />
            <ImportCSVModal
                isOpen={isImportCSVOpen}
                onClose={() => setIsImportCSVOpen(false)}
            />
            <NewBatchWizard
                isOpen={isNewBatchOpen}
                onClose={() => setIsNewBatchOpen(false)}
            />
        </div>
    );
}
