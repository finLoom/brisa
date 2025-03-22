// frontend/src/shared/components/data/compactTable/TableHeader.tsx
import React from 'react';
import { Checkbox } from '@fluentui/react-components';
import useTableStyles from './useTableStyles';
import { ColumnDefinition } from './tableTypes';
import { ArrowUp24Regular, ArrowDown24Regular } from '@fluentui/react-icons';

interface TableHeaderProps<T> {
  columns: ColumnDefinition<T>[];
  selectable: boolean;
  onSelectAll: () => void;
  allSelected: boolean;
  sortColumn: string | null;
  sortDirection: 'asc' | 'desc';
  onSort: (column: string) => void;
  hasRowActions: boolean;
}

function TableHeader<T>({
  columns,
  selectable,
  onSelectAll,
  allSelected,
  sortColumn,
  sortDirection,
  onSort,
  hasRowActions
}: TableHeaderProps<T>): JSX.Element {
  const styles = useTableStyles();

  return (
    <thead>
      <tr>
        {/* Checkbox column for selection */}
        {selectable && (
          <th className={styles.selectCell}>
            <Checkbox
              checked={allSelected}
              onChange={onSelectAll}
            />
          </th>
        )}

        {/* Data columns */}
        {columns.map((column) => (
          <th
            key={column.key}
            className={styles.tableCell}
            style={{ cursor: column.sortable ? 'pointer' : 'default' }}
            onClick={() => column.sortable && onSort(column.key)}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              {column.name}
              {column.sortable && sortColumn === column.key && (
                sortDirection === 'asc'
                  ? <ArrowUp24Regular />
                  : <ArrowDown24Regular />
              )}
            </div>
          </th>
        ))}

        {/* Actions column */}
        {hasRowActions && <th className={styles.actionCell}>Actions</th>}
      </tr>
    </thead>
  );
}

export default TableHeader;