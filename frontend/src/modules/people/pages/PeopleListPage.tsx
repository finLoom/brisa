// frontend/src/modules/people/pages/PeopleListPage.tsx
import React, { useEffect, useState } from 'react';
import {
  DocumentAdd24Regular,
  Edit24Regular,
  Delete24Regular
} from '@fluentui/react-icons';
import CompactDataTable from '../../../shared/components/data/compactTable/CompactDataTable';
import { usePeopleList } from '../hooks/usePeopleList';
import { usePersonDetails } from '../hooks/usePersonDetails';
import { Person, PersonType, PersonStatus } from '../types/Person';
import { ColumnDefinition, ActionDefinition } from '../../../shared/components/data/compactTable/tableTypes';

const PeopleListPage: React.FC = () => {
  const { people, loading, error, getPeople } = usePeopleList();
  const { openPersonDetails, deletePerson } = usePersonDetails();

  const [selectedItems, setSelectedItems] = useState<Person[]>([]);

  // Fetch people on component mount
  useEffect(() => {
    getPeople();
  }, [getPeople]);

  // Column definitions
  const columns: ColumnDefinition<Person>[] = [
    {
      key: 'fullLegalName',
      name: 'Name',
      fieldName: 'fullLegalName',
    },
    {
      key: 'type',
      name: 'Type',
      fieldName: 'type',
    },
    {
      key: 'status',
      name: 'Status',
      fieldName: 'status',
    }
  ];

  // Action definitions
  const actions: ActionDefinition[] = [
    {
      key: 'create',
      label: 'Create',
      icon: <DocumentAdd24Regular />,
      position: 'header',
      primary: true
    },
    {
      key: 'edit',
      label: 'Edit',
      icon: <Edit24Regular />,
      position: 'row',
      requireSelection: false
    },
    {
      key: 'delete',
      label: 'Delete',
      icon: <Delete24Regular />,
      position: 'row',
      requireSelection: false
    }
  ];

  // Handle table actions
  const handleAction = (actionKey: string, item?: Person) => {
    switch (actionKey) {
      case 'create':
        // Navigate to create person page
        break;
      case 'edit':
        if (item) {
          openPersonDetails(item.id);
        }
        break;
      case 'delete':
        if (item) {
          deletePerson(item.id);
        }
        break;
    }
  };

  return (
    <CompactDataTable
      items={people}
      columns={columns}
      isLoading={loading}
      error={error?.message}
      onAction={handleAction}
      actions={actions}
      title="People"
      selectable={true}
      onSelect={setSelectedItems}
    />
  );
};

export default PeopleListPage;