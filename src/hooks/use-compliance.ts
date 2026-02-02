import { useQuery } from '@tanstack/react-query';
import apiClient from '@/lib/api-client';

export function useComplianceItems(params?: { type?: string; status?: string; riskLevel?: string }) {
    return useQuery({
        queryKey: ['compliance', 'items', params],
        queryFn: () => apiClient.getComplianceItems(params),
    });
}

export function useComplianceReports(params?: { startDate?: string; endDate?: string }) {
    return useQuery({
        queryKey: ['compliance', 'reports', params],
        queryFn: () => apiClient.getComplianceReports(params),
    });
}
