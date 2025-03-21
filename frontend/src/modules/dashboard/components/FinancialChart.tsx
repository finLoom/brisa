// src/modules/dashboard/components/FinancialChart.tsx
import React, { useState } from 'react';
import { Stack } from '@fluentui/react/lib/Stack';
import { ChoiceGroup, IChoiceGroupOption } from '@fluentui/react/lib/ChoiceGroup';
import { useQuery } from 'react-query';
import { dashboardService } from '../services/dashboardService';
import { useCompanyContext } from '../../../shared/hooks/useCompanyContext';
import { LoadingSpinner } from '../../../shared/components/loaders/LoadingSpinner';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

type ChartPeriod = 'month' | 'quarter' | 'year';

export const FinancialChart: React.FC = () => {
  const [period, setPeriod] = useState<ChartPeriod>('month');
  const { activeCompany } = useCompanyContext();

  const { data: chartData, isLoading } = useQuery(
    ['dashboardChart', activeCompany?.id, period],
    () => dashboardService.getChartData(activeCompany!.id, period),
    {
      enabled: !!activeCompany
    }
  );

  const periodOptions: IChoiceGroupOption[] = [
    { key: 'month', text: 'Monthly' },
    { key: 'quarter', text: 'Quarterly' },
    { key: 'year', text: 'Yearly' }
  ];

  const handlePeriodChange = (_: any, option?: IChoiceGroupOption) => {
    if (option) {
      setPeriod(option.key as ChartPeriod);
    }
  };

  if (isLoading) {
    return <LoadingSpinner label="Loading chart data..." />;
  }

  if (!chartData) {
    return null;
  }

  const formattedData = chartData.labels.map((label, index) => ({
    name: label,
    revenue: chartData.revenue[index],
    expenses: chartData.expenses[index],
    profit: chartData.profit[index]
  }));

  return (
    <Stack tokens={{ childrenGap: 10 }} className="financial-chart-container">
      <ChoiceGroup
        selectedKey={period}
        options={periodOptions}
        onChange={handlePeriodChange}
        styles={{ flexContainer: { display: 'flex' } }}
      />

      <div style={{ width: '100%', height: 300 }}>
        <ResponsiveContainer>
          <LineChart
            data={formattedData}
            margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="revenue" stroke="#0078d4" name="Revenue" />
            <Line type="monotone" dataKey="expenses" stroke="#d13438" name="Expenses" />
            <Line type="monotone" dataKey="profit" stroke="#107c10" name="Profit" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Stack>
  );
};