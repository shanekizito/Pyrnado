import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import apiClient from '@/lib/api-client';
import { toast } from 'sonner';

// Dashboard Stats
export function useDashboardStats() {
    return useQuery({
        queryKey: ['dashboard', 'stats'],
        queryFn: () => apiClient.getDashboardStats(),
        staleTime: 30000, // 30 seconds
    });
}

// Balance
export function useBalance() {
    return useQuery({
        queryKey: ['dashboard', 'balance'],
        queryFn: () => apiClient.getBalance(),
        staleTime: 30000,
    });
}

// Transactions
export function useTransactions(params?: { limit?: number; type?: string; status?: string }) {
    return useQuery({
        queryKey: ['dashboard', 'transactions', params],
        queryFn: () => apiClient.getTransactions(params),
        staleTime: 10000, // 10 seconds
    });
}

// Activity Feed
export function useActivity(params?: { limit?: number }) {
    return useQuery({
        queryKey: ['dashboard', 'activity', params],
        queryFn: () => apiClient.getActivity(params),
        staleTime: 10000,
    });
}
