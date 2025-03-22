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
      {/* ... (rendering logic remains the same) */}
    </thead>
  );
}

export default TableHeader;