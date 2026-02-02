import { useQuery } from '@tanstack/react-query';
import apiClient from '@/lib/api-client';

export function useAnalyticsOverview() {
    return useQuery({
        queryKey: ['analytics', 'overview'],
        queryFn: () => apiClient.getAnalyticsOverview(),
    });
}

export function useRevenueAnalytics() {
    return useQuery({
        queryKey: ['analytics', 'revenue'],
        queryFn: () => apiClient.getRevenueAnalytics(),
    });
}

export function useTransactionAnalytics(params?: { period?: string }) {
    return useQuery({
        queryKey: ['analytics', 'transactions', params],
        queryFn: () => apiClient.getTransactionAnalytics(params),
    });
}

export function useGeographyAnalytics() {
    return useQuery({
        queryKey: ['analytics', 'geography'],
        queryFn: () => apiClient.getGeographyAnalytics(),
    });
}
