// frontend/src/shared/components/data/compactTable/TableToolbar.tsx
import React from 'react';
import { Input, Button } from '@fluentui/react-components';
import { Search24Regular } from '@fluentui/react-icons';
import { useTableStyles } from './useTableStyles';
import { ActionDefinition } from './tableTypes';

interface TableToolbarProps<T> {
  searchText: string;
  onSearchChange: (search: string) => void;
  hideSearch: boolean;
  actions: ActionDefinition[];
  onAction: (actionKey: string, item?: T) => void;
  selectedItems: T[];
}

function TableToolbar<T>({
  searchText,
  onSearchChange,
  hideSearch,
  actions,
  onAction,
  selectedItems
}: TableToolbarProps<T>): JSX.Element {
  const styles = useTableStyles();

  return (
    <div className={styles.tools}>
      {!hideSearch && (
        <Input
          contentBefore={<Search24Regular />}
          placeholder="Search..."
          value={searchText}
          onChange={(_, data) => onSearchChange(data.value)}
        />
      )}

      <div>
        {actions.map(action => (
          <Button
            key={action.key}
            appearance={action.primary ? 'primary' : 'subtle'}
            icon={action.icon}
            onClick={() => onAction(action.key)}
            disabled={action.requireSelection && selectedItems.length === 0}
            className={styles.actionButton}
          >
            {action.label}
          </Button>
        ))}
      </div>
    </div>
  );
}

export default TableToolbar;