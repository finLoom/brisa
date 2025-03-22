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
  actions: ActionDefinition<T>[];
  selectedItems: T[];
}

function TableToolbar<T>({
  searchText,
  onSearchChange,
  hideSearch,
  actions,
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
        {actions.map(action => {
          // Determine if the action should be disabled
          const isDisabled =
            (action.requireSelection && selectedItems.length === 0) ||
            (action.disabled);

          return (
            <Button
              key={action.key}
              appearance={action.primary ? 'primary' : 'subtle'}
              onClick={() => action.handler(selectedItems)}
              disabled={isDisabled}
              className={styles.actionButton}
              // Spread icon as a prop only if it exists
              {...(React.isValidElement(action.icon)
                ? { icon: action.icon }
                : {})}
            >
              {action.label}
            </Button>
          );
        })}
      </div>
    </div>
  );
}

export default TableToolbar;