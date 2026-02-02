import axios, { AxiosInstance, AxiosError } from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

class ApiClient {
    private client: AxiosInstance;

    constructor() {
        this.client = axios.create({
            baseURL: `${API_BASE_URL}/api`,
            headers: {
                'Content-Type': 'application/json',
            },
            timeout: 30000,
        });

        // Request interceptor
        this.client.interceptors.request.use(
            (config) => {
                // Add auth token if available
                const token = localStorage.getItem('auth_token');
                if (token) {
                    config.headers.Authorization = `Bearer ${token}`;
                }
                return config;
            },
            (error) => Promise.reject(error)
        );

        // Response interceptor
        this.client.interceptors.response.use(
            (response) => response,
            (error: AxiosError) => {
                if (error.response?.status === 401) {
                    // Handle unauthorized
                    localStorage.removeItem('auth_token');
                    window.location.href = '/login';
                }
                return Promise.reject(error);
            }
        );
    }

    // Dashboard
    async getDashboardStats() {
        const { data } = await this.client.get('/dashboard/stats');
        return data;
    }

    async getBalance() {
        const { data } = await this.client.get('/dashboard/balance');
        return data;
    }

    async getTransactions(params?: { limit?: number; type?: string; status?: string }) {
        const { data } = await this.client.get('/dashboard/transactions', { params });
        return data;
    }

    async getActivity(params?: { limit?: number }) {
        const { data } = await this.client.get('/dashboard/activity', { params });
        return data;
    }

    // Remittance
    async getRemittances(params?: { status?: string; search?: string }) {
        const { data } = await this.client.get('/remittance', { params });
        return data;
    }

    async createRemittance(remittanceData: any) {
        const { data } = await this.client.post('/remittance', remittanceData);
        return data;
    }

    async getRemittance(id: string) {
        const { data } = await this.client.get(`/remittance/${id}`);
        return data;
    }

    async cancelRemittance(id: string) {
        const { data } = await this.client.post(`/remittance/${id}/cancel`);
        return data;
    }

    async getRecipients() {
        const { data } = await this.client.get('/remittance/recipients/list');
        return data;
    }

    async addRecipient(recipientData: any) {
        const { data } = await this.client.post('/remittance/recipients/add', recipientData);
        return data;
    }

    // Payroll
    async getPayrollBatches(params?: { status?: string }) {
        const { data } = await this.client.get('/payroll/batches', { params });
        return data;
    }

    async createPayrollBatch(batchData: any) {
        const { data } = await this.client.post('/payroll/batches', batchData);
        return data;
    }

    async updatePayrollBatch(id: string, batchData: any) {
        const { data } = await this.client.put(`/payroll/batches/${id}`, batchData);
        return data;
    }

    async approveBatch(id: string) {
        const { data } = await this.client.post(`/payroll/batches/${id}/approve`);
        return data;
    }

    async executeBatch(id: string) {
        const { data } = await this.client.post(`/payroll/batches/${id}/execute`);
        return data;
    }

    async getWorkers(params?: { search?: string; kycStatus?: string }) {
        const { data } = await this.client.get('/payroll/workers', { params });
        return data;
    }

    async addWorker(workerData: any) {
        const { data } = await this.client.post('/payroll/workers', workerData);
        return data;
    }

    async updateWorker(id: string, workerData: any) {
        const { data } = await this.client.put(`/payroll/workers/${id}`, workerData);
        return data;
    }

    async deleteWorker(id: string) {
        const { data } = await this.client.delete(`/payroll/workers/${id}`);
        return data;
    }

    // Treasury
    async getAssets() {
        const { data } = await this.client.get('/treasury/assets');
        return data;
    }

    async getPortfolio() {
        const { data } = await this.client.get('/treasury/portfolio');
        return data;
    }

    async executeSwap(swapData: any) {
        const { data } = await this.client.post('/treasury/swap', swapData);
        return data;
    }

    async deposit(depositData: any) {
        const { data } = await this.client.post('/treasury/deposit', depositData);
        return data;
    }

    async withdraw(withdrawData: any) {
        const { data } = await this.client.post('/treasury/withdraw', withdrawData);
        return data;
    }

    // Escrow
    async getContracts(params?: { status?: string }) {
        const { data } = await this.client.get('/escrow/contracts', { params });
        return data;
    }

    async createContract(contractData: any) {
        const { data } = await this.client.post('/escrow/contracts', contractData);
        return data;
    }

    async getContract(id: string) {
        const { data } = await this.client.get(`/escrow/contracts/${id}`);
        return data;
    }

    async releaseFunds(contractId: string, releaseData: any) {
        const { data } = await this.client.post(`/escrow/contracts/${contractId}/release`, releaseData);
        return data;
    }

    async raiseDispute(contractId: string, disputeData: any) {
        const { data } = await this.client.post(`/escrow/contracts/${contractId}/dispute`, disputeData);
        return data;
    }

    // Analytics
    async getAnalyticsOverview() {
        const { data } = await this.client.get('/analytics/overview');
        return data;
    }

    async getTransactionAnalytics(params?: { period?: string }) {
        const { data } = await this.client.get('/analytics/transactions', { params });
        return data;
    }

    async getRevenueAnalytics() {
        const { data } = await this.client.get('/analytics/revenue');
        return data;
    }

    async getGeographyAnalytics() {
        const { data } = await this.client.get('/analytics/geography');
        return data;
    }

    async exportAnalytics(params?: { format?: string; type?: string }) {
        const { data } = await this.client.get('/analytics/export', { params });
        return data;
    }

    // Compliance
    async getComplianceItems(params?: { type?: string; status?: string; riskLevel?: string }) {
        const { data } = await this.client.get('/compliance/items', { params });
        return data;
    }

    async submitKYC(kycData: any) {
        const { data } = await this.client.post('/compliance/kyc', kycData);
        return data;
    }

    async runAML(amlData: any) {
        const { data } = await this.client.post('/compliance/aml', amlData);
        return data;
    }

    async getComplianceReports(params?: { startDate?: string; endDate?: string }) {
        const { data } = await this.client.get('/compliance/reports', { params });
        return data;
    }

    // Agents
    async getAgents(params?: { status?: string; search?: string }) {
        const { data } = await this.client.get('/agents', { params });
        return data;
    }

    async registerAgent(agentData: any) {
        const { data } = await this.client.post('/agents', agentData);
        return data;
    }

    async getAgent(id: string) {
        const { data } = await this.client.get(`/agents/${id}`);
        return data;
    }

    async activateAgent(id: string) {
        const { data } = await this.client.post(`/agents/${id}/activate`);
        return data;
    }

    async deactivateAgent(id: string) {
        const { data } = await this.client.post(`/agents/${id}/deactivate`);
        return data;
    }

    // Settings
    async getProfile() {
        const { data } = await this.client.get('/settings/profile');
        return data;
    }

    async updateProfile(profileData: any) {
        const { data } = await this.client.put('/settings/profile', profileData);
        return data;
    }

    async getApiKeys() {
        const { data } = await this.client.get('/settings/api-keys');
        return data;
    }

    async generateApiKey(keyData: any) {
        const { data } = await this.client.post('/settings/api-keys', keyData);
        return data;
    }

    async revokeApiKey(id: string) {
        const { data } = await this.client.delete(`/settings/api-keys/${id}`);
        return data;
    }

    async getWebhooks() {
        const { data } = await this.client.get('/settings/webhooks');
        return data;
    }

    async createWebhook(webhookData: any) {
        const { data } = await this.client.post('/settings/webhooks', webhookData);
        return data;
    }

    async updateWebhook(id: string, webhookData: any) {
        const { data } = await this.client.put(`/settings/webhooks/${id}`, webhookData);
        return data;
    }

    async deleteWebhook(id: string) {
        const { data } = await this.client.delete(`/settings/webhooks/${id}`);
        return data;
    }

    async getUsageMetrics() {
        const { data } = await this.client.get('/settings/metrics');
        return data;
    }
}


export const apiClient = new ApiClient();
export default apiClient;
