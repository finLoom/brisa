// frontend/src/modules/people/components/PeopleTable.tsx
import React, { useMemo } from 'react';
import { Button } from '@fluentui/react-components';
import { Delete24Regular, Edit24Regular } from '@fluentui/react-icons';
import { EnhancedDataTable } from '../../../shared/components/data/EnhancedDataTable';
import { Person } from '../types';
import { StatusCell } from '../../../shared/components/data/TableCell/StatusCell';
import { TitleCell } from '../../../shared/components/data/TableCell/TitleCell';
import { AssigneeCell } from '../../../shared/components/data/TableCell/AssigneeCell';
import { DateCell } from '../../../shared/components/data/TableCell/DateCell';
import { ColumnConfig } from '../../../shared/components/data/types/ColumnConfig';
import { useNavigate } from 'react-router-dom';

export interface PeopleTableProps {
  people: Person[];
  loading: boolean;
  selectedPeople: Person[];
  onSelectionChange: (people: Person[]) => void;
  onDelete: (person: Person) => void;
}

export const PeopleTable: React.FC<PeopleTableProps> = ({
  people,
  loading,
  selectedPeople,
  onSelectionChange,
  onDelete
}) => {
  const navigate = useNavigate();

  // Define columns for the table
  const columns = useMemo<ColumnConfig<Person>[]>(() => [
    {
      key: 'fullLegalName',
      name: 'Name',
      minWidth: 250,
      isSortable: true,
      renderCell: (person) => (
        <TitleCell
          title={person.fullLegalName}
          subtitle={person.email}
        />
      )
    },
    {
      key: 'type',
      name: 'Type',
      width: 150,
      isSortable: true,
      renderCell: (person) => (
        <StatusCell status={person.type} showBadge={true} />
      )
    },
    {
      key: 'status',
      name: 'Status',
      width: 150,
      isSortable: true,
      renderCell: (person) => (
        <StatusCell status={person.status} showBadge={true} />
      )
    },
    {
      key: 'manager',
      name: 'Manager',
      width: 200,
      renderCell: (person) =>
        person.manager ? (
          <AssigneeCell
            name={person.manager.name}
            department={person.manager.department || ''}
            avatarUrl={person.manager.avatarUrl || ''}
          />
        ) : null
    },
    {
      key: 'createdAt',
      name: 'Created At',
      width: 150,
      isSortable: true,
      renderCell: (person) => (
        <DateCell date={person.createdAt} showTime={false} format="short" />
      )
    },
    {
      key: 'actions',
      name: 'Actions',
      width: 120,
      renderCell: (person) => (
        <div style={{ display: 'flex', gap: '8px' }}>
          <Button
            icon={<Edit24Regular />}
            appearance="subtle"
            size="small"
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/people/${person.id}/edit`);
            }}
            aria-label="Edit person"
          />
          <Button
            icon={<Delete24Regular />}
            appearance="subtle"
            size="small"
            onClick={(e) => {
              e.stopPropagation();
              onDelete(person);
            }}
            aria-label="Delete person"
          />
        </div>
      )
    }
  ], [navigate, onDelete]);

  // Handle row click to navigate to detail page
  const handleRowClick = (person: Person) => {
    navigate(`/people/${person.id}`);
  };

  return (
    <EnhancedDataTable
      items={people}
      columns={columns}
      keyField="id"
      selectable={true}
      onSelectionChange={onSelectionChange}
      onRowClick={handleRowClick}
      initialSortColumn="fullLegalName"
      initialSortDirection="asc"
    />
  );
};

export default PeopleTable;