// src/modules/dashboard/components/RecentInvoices.tsx
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

export const RecentInvoices: React.FC = () => {
  const navigate = useNavigate();
  const { activeCompany } = useCompanyContext();

  const { data: invoices, isLoading } = useQuery(
    ['recentInvoices', activeCompany?.id],
    () => dashboardService.getRecentInvoices(activeCompany!.id),
    {
      enabled: !!activeCompany
    }
  );

  const columns: IColumn[] = [
    {
      key: 'reference',
      name: 'Invoice #',
      fieldName: 'reference',
      minWidth: 80,
      maxWidth: 100,
      onRender: (item) => (
        <Link onClick={() => navigate(`/finance/invoices/${item.id}`)}>
          {item.reference}
        </Link>
      )
    },
    {
      key: 'client',
      name: 'Client',
      fieldName: 'client',
      minWidth: 150,
      maxWidth: 200,
      onRender: (item) => <span>{item.client.name}</span>
    },
    {
      key: 'issueDate',
      name: 'Issue Date',
      fieldName: 'issueDate',
      minWidth: 80,
      maxWidth: 100,
      onRender: (item) => <span>{new Date(item.issueDate).toLocaleDateString()}</span>
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
      key: 'total',
      name: 'Total',
      fieldName: 'total',
      minWidth: 80,
      maxWidth: 100,
      onRender: (item) => <span>{item.currency} {item.total.toLocaleString()}</span>
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
    return <LoadingSpinner label="Loading invoices..." />;
  }

  if (!invoices || invoices.length === 0) {
    return <Text>No recent invoices found.</Text>;
  }

  return (
    <Stack tokens={{ childrenGap: 10 }} className="recent-invoices-container">
      <DetailsList
        items={invoices}
        columns={columns}
        selectionMode={SelectionMode.none}
        setKey="recent-invoices"
        isHeaderVisible={true}
      />
      <Link onClick={() => navigate('/finance/invoices')}>
        View all invoices
      </Link>
    </Stack>
  );
};