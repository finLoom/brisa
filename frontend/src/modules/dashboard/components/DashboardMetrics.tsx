// src/modules/dashboard/components/DashboardMetrics.tsx
import React from 'react';
import { Stack } from '@fluentui/react/lib/Stack';
import { Text } from '@fluentui/react/lib/Text';
import { Card } from '@fluentui/react-components';
import { useQuery } from 'react-query';
import { dashboardService } from '../services/dashboardService';
import { useCompanyContext } from '../../../shared/hooks/useCompanyContext';
import { LoadingSpinner } from '../../../shared/components/loaders/LoadingSpinner';

export const DashboardMetrics: React.FC = () => {
  const { activeCompany } = useCompanyContext();

  const { data: metrics, isLoading } = useQuery(
    ['dashboardMetrics', activeCompany?.id],
    () => dashboardService.getMetrics(activeCompany!.id),
    {
      enabled: !!activeCompany,
      refetchInterval: 5 * 60 * 1000 // 5 minutes
    }
  );

  if (isLoading) {
    return <LoadingSpinner label="Loading metrics..." />;
  }

  if (!metrics) {
    return null;
  }

  return (
    <Stack horizontal tokens={{ childrenGap: 20 }} className="metrics-container">
      <Card className="metric-card">
        <Stack tokens={{ childrenGap: 5 }} className="metric-content">
          <Text variant="large">Total Revenue</Text>
          <Text variant="xxLarge">{metrics.currency} {metrics.totalRevenue.toLocaleString()}</Text>
          <Text variant="small" className={metrics.revenueGrowth >= 0 ? 'positive' : 'negative'}>
            {metrics.revenueGrowth >= 0 ? '▲' : '▼'} {Math.abs(metrics.revenueGrowth)}% from last month
          </Text>
        </Stack>
      </Card>

      <Card className="metric-card">
        <Stack tokens={{ childrenGap: 5 }} className="metric-content">
          <Text variant="large">Total Expenses</Text>
          <Text variant="xxLarge">{metrics.currency} {metrics.totalExpenses.toLocaleString()}</Text>
          <Text variant="small" className={metrics.expensesGrowth <= 0 ? 'positive' : 'negative'}>
            {metrics.expensesGrowth <= 0 ? '▼' : '▲'} {Math.abs(metrics.expensesGrowth)}% from last month
          </Text>
        </Stack>
      </Card>

      <Card className="metric-card">
        <Stack tokens={{ childrenGap: 5 }} className="metric-content">
          <Text variant="large">Net Profit</Text>
          <Text variant="xxLarge">{metrics.currency} {metrics.netProfit.toLocaleString()}</Text>
          <Text variant="small" className={metrics.profitGrowth >= 0 ? 'positive' : 'negative'}>
            {metrics.profitGrowth >= 0 ? '▲' : '▼'} {Math.abs(metrics.profitGrowth)}% from last month
          </Text>
        </Stack>
      </Card>

      <Card className="metric-card">
        <Stack tokens={{ childrenGap: 5 }} className="metric-content">
          <Text variant="large">Active Contracts</Text>
          <Text variant="xxLarge">{metrics.activeContracts}</Text>
          <Text variant="small">
            {metrics.pendingContracts} pending approval
          </Text>
        </Stack>
      </Card>
    </Stack>
  );
};