// frontend/src/shared/components/data/EnhancedDataTable.tsx
import React, { useState, useEffect } from 'react';
import { useTableStyles } from './tableStyles';
import { Checkbox } from '@fluentui/react-components';
import { ChevronUp20Regular, ChevronDown20Regular } from '@fluentui/react-icons';
import { ColumnConfig } from './types/ColumnConfig';
import TableHeader from './TableHeader';
import TableRow from './TableRow';

export interface EnhancedDataTableProps<T> {
  items: T[];
  columns: ColumnConfig<T>[];
  keyField: keyof T;
  selectable?: boolean;
  onSelectionChange?: (selectedItems: T[]) => void;
  onRowClick?: (item: T) => void;
  initialSortColumn?: string;
  initialSortDirection?: 'asc' | 'desc';
}

export function EnhancedDataTable<T extends Record<string, any>>({
  items,
  columns,
  keyField,
  selectable = false,
  onSelectionChange,
  onRowClick,
  initialSortColumn,
  initialSortDirection = 'asc',
}: EnhancedDataTableProps<T>): React.ReactElement {
  const styles = useTableStyles();
  const [selectedKeys, setSelectedKeys] = useState<Set<string>>(new Set());
  const [sortColumn, setSortColumn] = useState<string | undefined>(initialSortColumn);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>(initialSortDirection);
  const [displayItems, setDisplayItems] = useState<T[]>(items);

  // Effect to handle sorting
  useEffect(() => {
    if (!sortColumn) {
      setDisplayItems([...items]);
      return;
    }

    const sorted = [...items].sort((a, b) => {
      const aValue = a[sortColumn];
      const bValue = b[sortColumn];

      if (aValue === bValue) return 0;
      if (aValue == null) return sortDirection === 'asc' ? -1 : 1;
      if (bValue == null) return sortDirection === 'asc' ? 1 : -1;

      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return sortDirection === 'asc'
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }

      return sortDirection === 'asc'
        ? (aValue > bValue ? 1 : -1)
        : (aValue > bValue ? -1 : 1);
    });

    setDisplayItems(sorted);
  }, [items, sortColumn, sortDirection]);

  // Effect to update selected items
  useEffect(() => {
    if (onSelectionChange) {
      const selectedItems = items.filter(item => selectedKeys.has(String(item[keyField])));
      onSelectionChange(selectedItems);
    }
  }, [selectedKeys, items, keyField, onSelectionChange]);

  // Handle header click for sorting
  const handleSortChange = (columnKey: string) => {
    if (sortColumn === columnKey) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(columnKey);
      setSortDirection('asc');
    }
  };

  // Handle selection changes
  const handleSelectionChange = (checked: boolean, item: T) => {
    const newSelectedKeys = new Set(selectedKeys);
    const itemKey = String(item[keyField]);

    if (checked) {
      newSelectedKeys.add(itemKey);
    } else {
      newSelectedKeys.delete(itemKey);
    }

    setSelectedKeys(newSelectedKeys);
  };

  // Handle select all
  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      const allKeys = new Set(items.map(item => String(item[keyField])));
      setSelectedKeys(allKeys);
    } else {
      setSelectedKeys(new Set());
    }
  };

  // Check if all items are selected
  const allSelected = items.length > 0 && selectedKeys.size === items.length;

  // Check if some but not all items are selected
  const someSelected = selectedKeys.size > 0 && selectedKeys.size < items.length;

  // Make all columns sortable by default if not explicitly set
  const enhancedColumns = columns.map(column => ({
    ...column,
    isSortable: column.isSortable !== undefined ? column.isSortable : true
  }));

  return (
    <table className={styles.table}>
      <thead>
        <TableHeader
          columns={enhancedColumns}
          selectable={selectable}
          selectedAll={allSelected}
          partiallySelected={someSelected}
          onSelectAll={handleSelectAll}
          sortColumn={sortColumn}
          sortDirection={sortDirection}
          onSortChange={handleSortChange}
        />
      </thead>
      <tbody>
        {displayItems.map(item => (
          <TableRow
            key={String(item[keyField])}
            item={item}
            columns={enhancedColumns}
            keyField={keyField}
            selectable={selectable}
            selected={selectedKeys.has(String(item[keyField]))}
            onSelect={(checked) => handleSelectionChange(checked, item)}
            onClick={onRowClick}
          />
        ))}
      </tbody>
    </table>
  );
}

export default EnhancedDataTable;