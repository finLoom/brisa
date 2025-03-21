// frontend/src/modules/work/components/WorkItemsTableExample.tsx
import React, { useState } from 'react';
import { makeStyles } from '@fluentui/react-components';
import { WorkItemsTable } from './WorkItemsTable';

// Create styles
const useStyles = makeStyles({
  container: {
    padding: '16px',
    backgroundColor: '#f9f9f9',
    height: '100vh',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: '4px',
    boxShadow: '0 1px 4px rgba(0, 0, 0, 0.1)',
    overflow: 'hidden',
  },
});

// Mock data for work items
const mockWorkItems = [
  {
    id: '17',
    title: 'Sindhu -OPT (Wailea)',
    assignedTo: {
      name: 'Documents',
      department: 'HR'
    },
    state: 'Doing',
    areaPath: 'Operations',
    tags: ['OPT', 'HR'],
    comments: 3,
    activityDate: '3/21/2025 4:19:52'
  },
  {
    id: '25',
    title: 'Sumit Mishra :- H-1B Transfer',
    assignedTo: {
      name: 'Documents',
      department: 'HR'
    },
    state: 'Doing',
    areaPath: 'Operations',
    tags: ['H-1B', 'Transfer'],
    comments: 1,
    activityDate: '3/19/2025 3:53:29'
  },
  {
    id: '32',
    title: 'Implement authentication service',
    assignedTo: {
      name: 'John Smith',
      department: 'Engineering'
    },
    state: 'In Progress',
    areaPath: 'Development',
    tags: ['Security', 'Backend'],
    comments: 7,
    activityDate: '3/18/2025 10:15:00'
  },
  {
    id: '45',
    title: 'Create dashboard analytics',
    assignedTo: {
      name: 'Sarah Johnson',
      department: 'Engineering'
    },
    state: 'To Do',
    areaPath: 'Development',
    tags: ['Frontend', 'Analytics'],
    comments: 2,
    activityDate: '3/17/2025 14:22:10'
  },
  {
    id: '53',
    title: 'Fix navigation bug in mobile view',
    assignedTo: {
      name: 'Mike Chen',
      department: 'Engineering'
    },
    state: 'Done',
    areaPath: 'Development',
    tags: ['Bug', 'Mobile'],
    comments: 5,
    activityDate: '3/15/2025 09:47:33'
  },
  {
    id: '61',
    title: 'Prepare Q2 marketing strategy',
    assignedTo: {
      name: 'Lisa Wong',
      department: 'Marketing'
    },
    state: 'In Progress',
    areaPath: 'Marketing',
    tags: ['Strategy', 'Planning'],
    comments: 4,
    activityDate: '3/14/2025 16:30:45'
  },
];

export const WorkItemsTableExample: React.FC = () => {
  const styles = useStyles();
  const [selectedItems, setSelectedItems] = useState<any[]>([]);

  // Handle item click
  const handleItemClick = (item: any) => {
    console.log('Item clicked:', item);
    // Here you would navigate to the item detail page
  };

  // Handle selection change
  const handleSelectionChange = (items: any[]) => {
    console.log('Selection changed:', items);
    setSelectedItems(items);
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <WorkItemsTable
          items={mockWorkItems}
          onItemClick={handleItemClick}
          onSelectionChange={handleSelectionChange}
        />
      </div>
    </div>
  );
};

export default WorkItemsTableExample;