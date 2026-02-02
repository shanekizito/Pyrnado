
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "@/lib/api-client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Save, Play, CheckCircle2, User, Calendar, Loader2 } from "lucide-react";
import StatusBadge from "@/components/dashboard/StatusBadge";
import { toast } from "sonner";
import { useApproveBatch, useExecuteBatch, useUpdateBatch } from "@/hooks/use-payroll";

export default function PayrollBatchDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [isEditing, setIsEditing] = useState(false);
    const [editName, setEditName] = useState("");
    const [editDate, setEditDate] = useState("");

    const { data: batch, isLoading } = useQuery({
        queryKey: ['payroll', 'batch', id],
        queryFn: () => apiClient.client.get(`/payroll/batches/${id}`).then(res => res.data),
        enabled: !!id
    });

    const updateBatch = useUpdateBatch();
    const approveBatch = useApproveBatch();
    const executeBatch = useExecuteBatch();

    if (isLoading) {
        return <div className="p-10 flex justify-center"><Loader2 className="animate-spin text-zinc-500" /></div>;
    }

    if (!batch) {
        return <div className="p-10 text-center text-zinc-500">Batch not found</div>;
    }

    const handleSave = () => {
        updateBatch.mutate({
            id: batch.id,
            data: {
                name: editName || batch.name,
                scheduledDate: editDate ? new Date(editDate) : batch.scheduledDate
            }
        }, {
            onSuccess: () => setIsEditing(false)
        });
    };

    const handleApprove = () => {
        if (confirm("Are you sure you want to approve this batch?")) {
            approveBatch.mutate(batch.id);
        }
    };

    const handleExecute = () => {
        if (confirm("Are you sure you want to execute this payroll batch? This action cannot be undone.")) {
            executeBatch.mutate(batch.id);
        }
    };

    return (
        <div className="space-y-6 animate-fade-in max-w-5xl mx-auto">
            {/* Header */}
            <div>
                <Button
                    variant="ghost"
                    className="mb-4 pl-0 hover:pl-2 text-zinc-500 hover:text-white transition-all"
                    onClick={() => navigate('/dashboard/payroll')}
                >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Payroll
                </Button>

                <div className="flex items-start justify-between">
                    <div>
                        {isEditing ? (
                            <div className="space-y-2 mb-2">
                                <Input
                                    value={editName || batch.name}
                                    onChange={e => setEditName(e.target.value)}
                                    className="text-2xl font-bold h-auto py-1 px-2 -ml-2 bg-zinc-900 border-zinc-700"
                                />
                            </div>
                        ) : (
                            <h1 className="text-2xl font-bold text-white mb-2">{batch.name}</h1>
                        )}
                        <div className="flex items-center gap-4 text-sm text-zinc-500">
                            <span className="flex items-center">
                                <Calendar className="w-4 h-4 mr-1.5" />
                                Created {new Date(batch.createdDate).toLocaleDateString()}
                            </span>
                            <span className="w-1 h-1 rounded-full bg-zinc-800" />
                            <span>ID: {batch.id.slice(0, 8)}</span>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <StatusBadge status={batch.status} className="h-9 px-4 text-sm" />

                        {batch.status === 'draft' && !isEditing && (
                            <Button variant="outline" onClick={() => setIsEditing(true)}>Edit Batch</Button>
                        )}

                        {isEditing && (
                            <div className="flex gap-2">
                                <Button variant="ghost" onClick={() => setIsEditing(false)}>Cancel</Button>
                                <Button onClick={handleSave} disabled={updateBatch.isPending}>
                                    {updateBatch.isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
                                    Save Changes
                                </Button>
                            </div>
                        )}

                        {(batch.status === 'draft' || batch.status === 'pending') && !isEditing && (
                            <Button onClick={handleApprove} disabled={approveBatch.isPending} className="bg-emerald-500 hover:bg-emerald-400 text-black font-bold">
                                {approveBatch.isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : <CheckCircle2 className="w-4 h-4 mr-2" />}
                                Approve Batch
                            </Button>
                        )}

                        {batch.status === 'approved' && (
                            <Button onClick={handleExecute} disabled={executeBatch.isPending} className="bg-emerald-500 hover:bg-emerald-400 text-black font-bold">
                                {executeBatch.isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Play className="w-4 h-4 mr-2" />}
                                Execute Payroll
                            </Button>
                        )}
                    </div>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-3 gap-4">
                <div className="p-6 rounded-2xl bg-zinc-900/50 border border-zinc-800">
                    <p className="text-zinc-500 text-sm font-medium uppercase tracking-wider mb-1">Total Amount</p>
                    <p className="text-3xl font-bold text-white tabular-nums">${(batch.totalAmount || 0).toLocaleString()}</p>
                </div>
                <div className="p-6 rounded-2xl bg-zinc-900/50 border border-zinc-800">
                    <p className="text-zinc-500 text-sm font-medium uppercase tracking-wider mb-1">Recipients</p>
                    <p className="text-3xl font-bold text-white">{batch.workerCount}</p>
                </div>
                <div className="p-6 rounded-2xl bg-zinc-900/50 border border-zinc-800">
                    <p className="text-zinc-500 text-sm font-medium uppercase tracking-wider mb-1">Scheduled For</p>
                    {isEditing ? (
                        <input
                            type="date"
                            className="bg-zinc-800 border border-zinc-700 rounded px-2 py-1 text-white w-full mt-1"
                            value={editDate ? editDate.split('T')[0] : (batch.scheduledDate ? new Date(batch.scheduledDate).toISOString().split('T')[0] : '')}
                            onChange={(e) => setEditDate(e.target.value)}
                        />
                    ) : (
                        <p className="text-3xl font-bold text-white">
                            {batch.scheduledDate ? new Date(batch.scheduledDate).toLocaleDateString() : "Not scheduled"}
                        </p>
                    )}
                </div>
            </div>

            {/* Workers List */}
            <div className="border border-zinc-800 rounded-2xl overflow-hidden bg-zinc-900/30">
                <div className="px-6 py-4 border-b border-zinc-800 flex items-center justify-between bg-zinc-900/50">
                    <h3 className="font-bold text-white">Recipients</h3>
                </div>
                <div className="divide-y divide-zinc-800/50">
                    {batch.payments?.map((payment: any) => (
                        <div key={payment.id} className="px-6 py-4 flex items-center justify-between hover:bg-white/[0.02] transition-colors">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center">
                                    <User className="w-5 h-5 text-zinc-400" />
                                </div>
                                <div>
                                    <p className="font-bold text-zinc-200">{payment.worker?.name || "Unknown Worker"}</p>
                                    <p className="text-xs text-zinc-500">{payment.worker?.role || "No role"}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-8">
                                <div className="text-right">
                                    <p className="text-sm font-bold text-white tabular-nums">${payment.amount.toLocaleString()}</p>
                                    <p className="text-xs text-zinc-500">{payment.currency}</p>
                                </div>
                                <StatusBadge status={payment.status} />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
