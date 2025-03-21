// src/modules/dashboard/services/dashboardService.ts
import { api } from '../../../shared/services/api';

export interface DashboardMetrics {
totalRevenue: number;
totalExpenses: number;
netProfit: number;
revenueGrowth: number;
expensesGrowth: number;
profitGrowth: number;
activeContracts: number;
pendingContracts: number;
currency: string;
}

export interface ChartData {
labels: string[];
revenue: number[];
expenses: number[];
profit: number[];
}

export const dashboardService = {
async getMetrics(companyId: string): Promise<DashboardMetrics> {
    const response = await api.get(`/dashboard/metrics/${companyId}`);
    return response.data;
  },

  async getChartData(companyId: string, period: 'month' | 'quarter' | 'year'): Promise<ChartData> {
    const response = await api.get(`/dashboard/chart/${companyId}`, {
      params: { period }
    });
    return response.data;
  },

  async getRecentInvoices(companyId: string, limit = 5): Promise<any[]> {
    const response = await api.get(`/dashboard/recent-invoices/${companyId}`, {
      params: { limit }
    });
    return response.data;
  },

  async getUpcomingPayments(companyId: string, limit = 5): Promise<any[]> {
    const response = await api.get(`/dashboard/upcoming-payments/${companyId}`, {
      params: { limit }
    });
    return response.data;
  }
};