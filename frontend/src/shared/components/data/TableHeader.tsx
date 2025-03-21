// frontend/src/shared/components/data/TableHeader.tsx
import React from 'react';
import { ChevronUp20Regular, ChevronDown20Regular } from '@fluentui/react-icons';
import { Checkbox } from '@fluentui/react-components';
import { useTableStyles } from './tableStyles';
import { ColumnConfig } from './types/ColumnConfig';

interface TableHeaderProps<T> {
  columns: ColumnConfig<T>[];
  selectable?: boolean;
  selectedAll?: boolean;
  partiallySelected?: boolean;
  onSelectAll?: (checked: boolean) => void;
  sortColumn?: string;
  sortDirection?: 'asc' | 'desc';
  onSortChange?: (columnKey: string) => void;
}

export function TableHeader<T>({
  columns,
  selectable = false,
  selectedAll = false,
  partiallySelected = false,
  onSelectAll,
  sortColumn,
  sortDirection = 'asc',
  onSortChange
}: TableHeaderProps<T>): React.ReactElement {
  const styles = useTableStyles();

  const handleHeaderClick = (columnKey: string, isSortable?: boolean) => {
    if (!isSortable || !onSortChange) return;
    onSortChange(columnKey);
  };

  return (
    <tr className={styles.headerRow}>
      {selectable && (
        <th className={styles.headerCell} style={{ width: 40 }}>
          <Checkbox
            checked={selectedAll}
            onChange={(e, data) => onSelectAll?.(!!data.checked)}
            className={styles.checkbox}
          />
        </th>
      )}

      {columns.map(column => {
        const isSortColumn = sortColumn === column.key;

        return (
          <th
            key={column.key}
            className={`${styles.headerCell} ${column.isSortable ? styles.sortableHeaderCell : ''}`}
            style={{
              width: column.width,
              minWidth: column.minWidth,
              maxWidth: column.maxWidth
            }}
            onClick={() => handleHeaderClick(column.key, column.isSortable)}
          >
            <div style={{ display: 'flex', alignItems: 'center' }}>
              {column.renderHeader ? column.renderHeader() : column.name}
              {column.isSortable && isSortColumn && (
                sortDirection === 'asc'
                  ? <ChevronUp20Regular />
                  : <ChevronDown20Regular />
              )}
            </div>
          </th>
        );
      })}
    </tr>
  );
}

export default TableHeader;