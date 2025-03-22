// frontend/src/shared/components/data/compactTable/TableAction.tsx
import React from 'react';
import { Button } from '@fluentui/react-components';
import { ActionDefinition } from './tableTypes';

interface TableActionProps<T> {
  actions: ActionDefinition<T>[];
  item: T;
}

function TableAction<T>({ 
  actions, 
  item 
}: TableActionProps<T>) {
  return (
    <div style={{ display: 'flex', gap: '8px' }}>
      {actions.map(action => (
        <Button
          key={action.key}
          appearance="subtle"
          onClick={() => action.handler([item])}
          disabled={action.disabled}
        >
          {action.label}
        </Button>
      ))}
    </div>
  );
}

export default TableAction;