// frontend/src/shared/components/data/compactTable/CompactDataTable.tsx
import React, { useState, useMemo } from 'react';
import {
  Text,
  Spinner
} from '@fluentui/react-components';
import { useTableStyles } from './useTableStyles';
import TableHeader from './TableHeader';
import TableToolbar from './TableToolbar';
import TableBody from './TableBody';
import TablePagination from './TablePagination';
import {
  ColumnDefinition,
  ActionDefinition,
  CompactDataTableProps
} from './tableTypes';

export function CompactDataTable<T extends Record<string, any>>({
  items = [],
  columns = [],
  isLoading = false,
  error,
  onSelect,
  onRowClick = () => {},
  actions = [],
  title = 'Items',
  emptyMessage = 'No items to display',
  selectable = true,
  hideSearch = false,
  pageSize = 10,
  totalCount
}: CompactDataTableProps<T>): React.ReactElement {
  const [selectedItems, setSelectedItems] = useState<T[]>([]);
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [searchText, setSearchText] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);

  const styles = useTableStyles();

  // Filter and sort items
  const filteredItems = useMemo(() => {
    let result = [...items];

    // Apply search filter
    if (searchText) {
      result = result.filter(item =>
        columns.some(column =>
          String(item[column.fieldName])
            .toLowerCase()
            .includes(searchText.toLowerCase())
        )
      );
    }

    // Apply sorting
    if (sortColumn) {
      const column = columns.find(col => col.key === sortColumn);
      if (column?.sortFn) {
        result.sort(column.sortFn);
      } else {
        result.sort((a, b) => {
          const valA = a[sortColumn];
          const valB = b[sortColumn];
          return sortDirection === 'asc'
            ? valA.localeCompare(valB)
            : valB.localeCompare(valA);
        });
      }
    }

    return result;
  }, [items, searchText, sortColumn, sortDirection, columns]);

  // Pagination
  const paginatedItems = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    return filteredItems.slice(startIndex, startIndex + pageSize);
  }, [filteredItems, currentPage, pageSize]);

  // Handle row selection
  const handleRowSelect = (item: T) => {
    const isSelected = selectedItems.includes(item);
    const newSelectedItems = isSelected
      ? selectedItems.filter(i => i !== item)
      : [...selectedItems, item];

    setSelectedItems(newSelectedItems);
    onSelect?.(newSelectedItems);
  };

  // Handle sort
  const handleSort = (column: string) => {
    if (sortColumn === column) {
      // Toggle sort direction if same column
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      // Set new sort column
      setSortColumn(column);
      setSortDirection('asc');
    }
  };

  // Render
  return (
    <div className={styles.container}>
      {/* Toolbar */}
      <TableToolbar
        searchText={searchText}
        onSearchChange={setSearchText}
        hideSearch={hideSearch}
        actions={actions.filter(a => a.position === 'toolbar' || a.position === 'header')}
        selectedItems={selectedItems}
      />

      {/* Loading State */}
      {isLoading && (
        <div className={styles.loadingContainer}>
          <Spinner label="Loading..." />
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className={styles.errorContainer}>
          <Text>{error}</Text>
        </div>
      )}

      {/* No Items State */}
      {!isLoading && filteredItems.length === 0 && (
        <div className={styles.emptyContainer}>
          <Text>{emptyMessage}</Text>
        </div>
      )}

      {/* Table */}
      {!isLoading && filteredItems.length > 0 && (
        <table className={styles.table}>
          <TableHeader
            columns={columns}
            selectable={selectable}
            onSelectAll={() => {
              setSelectedItems(
                selectedItems.length === items.length ? [] : [...items]
              );
              onSelect?.(selectedItems.length === items.length ? [] : [...items]);
            }}
            allSelected={selectedItems.length === items.length}
            sortColumn={sortColumn}
            sortDirection={sortDirection}
            onSort={handleSort}
            hasRowActions={actions.some(a => a.position === 'row')}
          />
          <TableBody
            columns={columns}
            items={paginatedItems}
            selectedItems={selectedItems}
            onRowClick={onRowClick}
            onRowSelect={handleRowSelect}
            selectable={selectable}
            rowActions={actions.filter(a => a.position === 'row')}
          />
        </table>
      )}

      {/* Pagination */}
      {filteredItems.length > pageSize && (
        <TablePagination
          currentPage={currentPage}
          totalPages={Math.ceil(filteredItems.length / pageSize)}
          pageSize={pageSize}
          totalItems={filteredItems.length}
          onPageChange={setCurrentPage}
        />
      )}
    </div>
  );
}

export default CompactDataTable;