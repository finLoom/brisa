// C:\Apps\Anto\brisa\frontend\src\modules\dashboard\pages\Dashboard.tsx
import React from 'react';
import { Stack } from '@fluentui/react/lib/Stack';
import { Text } from '@fluentui/react/lib/Text';
import { Card } from '@fluentui/react-components';
import { useCompanyContext } from '../../../shared/hooks/useCompanyContext';
import { DashboardMetrics } from '../components/DashboardMetrics';
import { FinancialChart } from '../components/FinancialChart';
import { RecentInvoices } from '../components/RecentInvoices';
import { UpcomingPayments } from '../components/UpcomingPayments';

const Dashboard: React.FC = () => {
  const { activeCompany } = useCompanyContext();

  if (!activeCompany) {
    return (
      <Stack className="dashboard-container">
        <Text variant="large">Please select a company to view the dashboard</Text>
      </Stack>
    );
  }

  return (
    <Stack className="dashboard-container">
      <Stack horizontal horizontalAlign="space-between" verticalAlign="center">
        <Text variant="xxLarge">{activeCompany.name} Dashboard</Text>
        <Text variant="large">{new Date().toLocaleDateString()}</Text>
      </Stack>

      <DashboardMetrics />

      <Stack horizontal tokens={{ childrenGap: 20 }} className="dashboard-charts">
        <Card className="dashboard-card financial-chart">
          <Text variant="large">Financial Overview</Text>
          <FinancialChart />
        </Card>
      </Stack>

      <Stack horizontal tokens={{ childrenGap: 20 }} className="dashboard-tables">
        <Card className="dashboard-card">
          <Text variant="large">Recent Invoices</Text>
          <RecentInvoices />
        </Card>

        <Card className="dashboard-card">
          <Text variant="large">Upcoming Payments</Text>
          <UpcomingPayments />
        </Card>
      </Stack>
    </Stack>
  );
};

export default Dashboard;