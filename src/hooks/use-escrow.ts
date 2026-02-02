import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import apiClient from '@/lib/api-client';
import { toast } from 'sonner';

// Get Contracts
export function useContracts(params?: { status?: string }) {
    return useQuery({
        queryKey: ['escrow', 'contracts', params],
        queryFn: () => apiClient.getContracts(params),
    });
}

// Get Single Contract
export function useContract(id: string) {
    return useQuery({
        queryKey: ['escrow', 'contracts', id],
        queryFn: () => apiClient.getContract(id),
        enabled: !!id,
    });
}

// Create Contract
export function useCreateContract() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: any) => apiClient.createContract(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['escrow', 'contracts'] });
            toast.success('Contract created successfully');
        },
        onError: (error: any) => {
            toast.error(error.response?.data?.error || 'Failed to create contract');
        },
    });
}

// Release Funds
export function useReleaseFunds() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ contractId, data }: { contractId: string; data: any }) =>
            apiClient.releaseFunds(contractId, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['escrow', 'contracts'] });
            queryClient.invalidateQueries({ queryKey: ['dashboard'] });
            toast.success('Funds released successfully');
        },
        onError: (error: any) => {
            toast.error(error.response?.data?.error || 'Failed to release funds');
        },
    });
}

// Raise Dispute
export function useRaiseDispute() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ contractId, data }: { contractId: string; data: any }) =>
            apiClient.raiseDispute(contractId, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['escrow', 'contracts'] });
            toast.success('Dispute raised successfully');
        },
        onError: (error: any) => {
            toast.error(error.response?.data?.error || 'Failed to raise dispute');
        },
    });
}
