import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import apiClient from '@/lib/api-client';
import { toast } from 'sonner';

// Get Agents
export function useAgents(params?: { status?: string; search?: string }) {
    return useQuery({
        queryKey: ['agents', params],
        queryFn: () => apiClient.getAgents(params),
    });
}

// Get Single Agent
export function useAgent(id: string) {
    return useQuery({
        queryKey: ['agents', id],
        queryFn: () => apiClient.getAgent(id),
        enabled: !!id,
    });
}

// Register Agent
export function useRegisterAgent() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: any) => apiClient.registerAgent(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['agents'] });
            toast.success('Agent registered successfully');
        },
        onError: (error: any) => {
            toast.error(error.response?.data?.error || 'Failed to register agent');
        },
    });
}

// Activate Agent
export function useActivateAgent() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: string) => apiClient.activateAgent(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['agents'] });
            toast.success('Agent activated successfully');
        },
        onError: (error: any) => {
            toast.error(error.response?.data?.error || 'Failed to activate agent');
        },
    });
}

// Deactivate Agent
export function useDeactivateAgent() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: string) => apiClient.deactivateAgent(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['agents'] });
            toast.success('Agent deactivated successfully');
        },
        onError: (error: any) => {
            toast.error(error.response?.data?.error || 'Failed to deactivate agent');
        },
    });
}
