import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import apiClient from '@/lib/api-client';
import { toast } from 'sonner';

// Get Workers
export function useWorkers(params?: { search?: string; kycStatus?: string }) {
    return useQuery({
        queryKey: ['workers', params],
        queryFn: () => apiClient.getWorkers(params),
    });
}

// Add Worker
export function useAddWorker() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: any) => apiClient.addWorker(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['workers'] });
            toast.success('Worker added successfully');
        },
        onError: (error: any) => {
            toast.error(error.response?.data?.error || 'Failed to add worker');
        },
    });
}

// Update Worker
export function useUpdateWorker() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, data }: { id: string; data: any }) => apiClient.updateWorker(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['workers'] });
            toast.success('Worker updated successfully');
        },
        onError: (error: any) => {
            toast.error(error.response?.data?.error || 'Failed to update worker');
        },
    });
}

// Delete Worker
export function useDeleteWorker() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: string) => apiClient.deleteWorker(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['workers'] });
            toast.success('Worker removed successfully');
        },
        onError: (error: any) => {
            toast.error(error.response?.data?.error || 'Failed to remove worker');
        },
    });
}

// Get Payroll Batches
export function usePayrollBatches(params?: { status?: string }) {
    return useQuery({
        queryKey: ['payroll', 'batches', params],
        queryFn: () => apiClient.getPayrollBatches(params),
    });
}

// Create Payroll Batch
export function useCreatePayrollBatch() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: any) => apiClient.createPayrollBatch(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['payroll', 'batches'] });
            toast.success('Payroll batch created successfully');
        },
        onError: (error: any) => {
            toast.error(error.response?.data?.error || 'Failed to create batch');
        },
    });
}

// Update Payroll Batch
export function useUpdateBatch() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, data }: { id: string; data: any }) => apiClient.updatePayrollBatch(id, data),
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ['payroll', 'batches'] });
            queryClient.invalidateQueries({ queryKey: ['payroll', 'batch', data.id] });
            toast.success('Batch updated successfully');
        },
        onError: (error: any) => {
            toast.error(error.response?.data?.error || 'Failed to update batch');
        },
    });
}

// Approve Batch
export function useApproveBatch() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: string) => apiClient.approveBatch(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['payroll', 'batches'] });
            toast.success('Batch approved successfully');
        },
        onError: (error: any) => {
            toast.error(error.response?.data?.error || 'Failed to approve batch');
        },
    });
}

// Execute Batch
export function useExecuteBatch() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: string) => apiClient.executeBatch(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['payroll', 'batches'] });
            queryClient.invalidateQueries({ queryKey: ['dashboard'] });
            toast.success('Batch execution started');
        },
        onError: (error: any) => {
            toast.error(error.response?.data?.error || 'Failed to execute batch');
        },
    });
}
