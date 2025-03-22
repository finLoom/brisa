import React from 'react';
import { Button } from '@fluentui/react-components';
import { Edit24Regular, Delete24Regular } from '@fluentui/react-icons';

interface TableActionProps<T> {
  item: T;
  onAction: (actionKey: string, item: T) => void;
}

function TableAction<T>({ item, onAction }: TableActionProps<T>) {
  return (
    <div style={{ display: 'flex', gap: '8px' }}>
      <Button
        icon={<Edit24Regular />}
        appearance="subtle"
        onClick={() => onAction('edit', item)}
      />
      <Button
        icon={<Delete24Regular />}
        appearance="subtle"
        onClick={() => onAction('delete', item)}
      />
    </div>
  );
}

export default TableAction;
