// src/modules/dashboard/components/UpcomingPayments.tsx
import React from 'react';
import { Stack } from '@fluentui/react/lib/Stack';
import { DetailsList, IColumn, SelectionMode } from '@fluentui/react/lib/DetailsList';
import { Link } from '@fluentui/react/lib/Link';
import { Text } from '@fluentui/react/lib/Text';
import { useQuery } from 'react-query';
import { dashboardService } from '../services/dashboardService';
import { useCompanyContext } from '../../../shared/hooks/useCompanyContext';
import { LoadingSpinner } from '../../../shared/components/loaders/LoadingSpinner';
import { useNavigate } from 'react-router-dom';

export const UpcomingPayments: React.FC = () => {
  const navigate = useNavigate();
  const { activeCompany } = useCompanyContext();

  const { data: payments, isLoading } = useQuery(
    ['upcomingPayments', activeCompany?.id],
    () => dashboardService.getUpcomingPayments(activeCompany!.id),
    {
      enabled: !!activeCompany
    }
  );

  const columns: IColumn[] = [
    {
      key: 'payee',
      name: 'Payee',
      fieldName: 'payee',
      minWidth: 150,
      maxWidth: 200,
      onRender: (item) => <span>{item.payee}</span>
    },
    {
      key: 'type',
      name: 'Type',
      fieldName: 'type',
      minWidth: 80,
      maxWidth: 100,
      onRender: (item) => (
        <span className={`payment-type payment-${item.type}`}>
          {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
        </span>
      )
    },
    {
      key: 'dueDate',
      name: 'Due Date',
      fieldName: 'dueDate',
      minWidth: 80,
      maxWidth: 100,
      onRender: (item) => <span>{new Date(item.dueDate).toLocaleDateString()}</span>
    },
    {
      key: 'amount',
      name: 'Amount',
      fieldName: 'amount',
      minWidth: 80,
      maxWidth: 100,
      onRender: (item) => <span>{item.currency} {item.amount.toLocaleString()}</span>
    },
    {
      key: 'status',
      name: 'Status',
      fieldName: 'status',
      minWidth: 80,
      maxWidth: 100,
      onRender: (item) => (
        <span className={`status-badge status-${item.status}`}>
          {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
        </span>
      )
    }
  ];

  if (isLoading) {
    return <LoadingSpinner label="Loading payments..." />;
  }

  if (!payments || payments.length === 0) {
    return <Text>No upcoming payments found.</Text>;
  }

  return (
    <Stack tokens={{ childrenGap: 10 }} className="upcoming-payments-container">
      <DetailsList
        items={payments}
        columns={columns}
        selectionMode={SelectionMode.none}
        setKey="upcoming-payments"
        isHeaderVisible={true}
      />
      <Link onClick={() => navigate('/finance/payments')}>
        View all payments
      </Link>
    </Stack>
  );
};