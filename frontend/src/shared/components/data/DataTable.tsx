// frontend/src/shared/components/data/DataTable.tsx
import React, { useState, useEffect } from 'react';
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
  TableCellLayout,
  TableHeaderCell,
  TableProps,
  TableRowProps,
  createTableColumn,
  TableColumnDefinition,
  Button,
  Checkbox,
  Badge,
  useArrowNavigationGroup,
  useFocusableGroup,
  mergeClasses
} from '@fluentui/react-components';
import {
  ChevronDown20Regular,
  ChevronUp20Regular,
  Filter20Regular
} from '@fluentui/react-icons';

// Types
export interface ColumnDefinition<T> {
  key: string;
  name: string;
  render?: (item: T) => React.ReactNode;
  sortable?: boolean;
  minWidth?: number;
  maxWidth?: number;
  className?: string;
}

export interface DataTableProps<T> {
  data: T[];
  columns: ColumnDefinition<T>[];
  keyField: keyof T;
  onRowClick?: (item: T) => void;
  onSelectionChange?: (selectedItems: T[]) => void;
  selectable?: boolean;
  sortable?: boolean;
  initialSortColumn?: string;
  initialSortDirection?: 'asc' | 'desc';
  className?: string;
  emptyMessage?: string;
  loading?: boolean;
  onFilterClick?: () => void;
}

export function DataTable<T extends Record<string, any>>({
  data,
  columns,
  keyField,
  onRowClick,
  onSelectionChange,
  selectable = false,
  sortable = true,
  initialSortColumn,
  initialSortDirection = 'asc',
  className,
  emptyMessage = 'No data available',
  loading = false,
  onFilterClick
}: DataTableProps<T>): React.ReactElement {
  // State for sorting
  const [sortColumn, setSortColumn] = useState<string | undefined>(initialSortColumn);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>(initialSortDirection);

  // State for selection
  const [selectedKeys, setSelectedKeys] = useState<Set<string>>(new Set());
  const [selectedItems, setSelectedItems] = useState<T[]>([]);

  // Sorted/filtered data
  const [displayData, setDisplayData] = useState<T[]>(data);

  // Effect to update displayData when data, sorting changes
  useEffect(() => {
    if (!data) return;

    let sortedData = [...data];

    if (sortColumn) {
      sortedData.sort((a, b) => {
        const aValue = a[sortColumn];
        const bValue = b[sortColumn];

        // Handle undefined/null values
        if (aValue === undefined || aValue === null) return sortDirection === 'asc' ? -1 : 1;
        if (bValue === undefined || bValue === null) return sortDirection === 'asc' ? 1 : -1;

        // Sort strings case-insensitive
        if (typeof aValue === 'string' && typeof bValue === 'string') {
          return sortDirection === 'asc'
            ? aValue.localeCompare(bValue)
            : bValue.localeCompare(aValue);
        }

        // Default sort for numbers, etc.
        return sortDirection === 'asc'
          ? (aValue > bValue ? 1 : -1)
          : (aValue > bValue ? -1 : 1);
      });
    }

    setDisplayData(sortedData);
  }, [data, sortColumn, sortDirection]);

  // Effect to update selectedItems when selection changes
  useEffect(() => {
    if (onSelectionChange) {
      const items = data.filter(item => selectedKeys.has(String(item[keyField])));
      setSelectedItems(items);
      onSelectionChange(items);
    }
  }, [selectedKeys, data, keyField, onSelectionChange]);

  // Handle sort column click
  const handleSortClick = (columnKey: string) => {
    if (!sortable) return;

    if (sortColumn === columnKey) {
      // Toggle direction if same column clicked
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      // Set new sort column and default to ascending
      setSortColumn(columnKey);
      setSortDirection('asc');
    }
  };

  // Handle selection changes
  const handleSelectionChange = (checked: boolean, itemKey: string) => {
    const newSelectedKeys = new Set(selectedKeys);

    if (checked) {
      newSelectedKeys.add(itemKey);
    } else {
      newSelectedKeys.delete(itemKey);
    }

    setSelectedKeys(newSelectedKeys);
  };

  // Handle select all change
  const handleSelectAllChange = (checked: boolean) => {
    if (checked) {
      const allKeys = new Set(data.map(item => String(item[keyField])));
      setSelectedKeys(allKeys);
    } else {
      setSelectedKeys(new Set());
    }
  };

  // Create columns with selection if needed
  const tableColumns: TableColumnDefinition<T>[] = [];

  // Add selection column if selectable
  if (selectable) {
    tableColumns.push(
      createTableColumn<T>({
        columnId: 'selection',
        compare: () => 0,
        renderHeaderCell: () => (
          <TableCell>
            <Checkbox
              checked={selectedKeys.size === data.length && data.length > 0}
              onChange={(e, data) => handleSelectAllChange(!!data.checked)}
            />
          </TableCell>
        ),
        renderCell: (item) => (
          <TableCell>
            <Checkbox
              checked={selectedKeys.has(String(item[keyField]))}
              onChange={(e, data) => handleSelectionChange(!!data.checked, String(item[keyField]))}
            />
          </TableCell>
        ),
      })
    );
  }

  // Add data columns
  columns.forEach(column => {
    tableColumns.push(
      createTableColumn<T>({
        columnId: column.key,
        compare: () => 0,
        renderHeaderCell: () => {
          const isSortColumn = sortColumn === column.key;

          return (
            <TableHeaderCell
              onClick={() => column.sortable && handleSortClick(column.key)}
              style={{
                cursor: column.sortable ? 'pointer' : 'default',
                minWidth: column.minWidth,
                maxWidth: column.maxWidth
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center' }}>
                {column.name}
                {column.sortable && isSortColumn && (
                  sortDirection === 'asc'
                    ? <ChevronUp20Regular />
                    : <ChevronDown20Regular />
                )}
              </div>
            </TableHeaderCell>
          );
        },
        renderCell: (item) => (
          <TableCell className={column.className}>
            <TableCellLayout>
              {column.render ? column.render(item) : item[column.key]}
            </TableCellLayout>
          </TableCell>
        ),
      })
    );
  });

  // Navigation behaviors for accessibility
  const arrowNavigationProps = useArrowNavigationGroup({ axis: 'grid' });
  const focusableGroupProps = useFocusableGroup();

  // Row props to handle click events
  const getRowProps = (item: T): TableRowProps => ({
    onClick: onRowClick ? () => onRowClick(item) : undefined,
    style: { cursor: onRowClick ? 'pointer' : 'default' },
  });

  // Helper function to render header cells
  const renderHeaderCell = (column: TableColumnDefinition<T>) => {
    return column.renderHeaderCell();
  };

  // Helper function to render data cells
  const renderDataCell = (column: TableColumnDefinition<T>, item: T) => {
    return column.renderCell(item);
  };

  return (
    <div className={mergeClasses('data-table-container', className)}>
      {onFilterClick && (
        <div className="data-table-toolbar">
          <Button
            icon={<Filter20Regular />}
            onClick={onFilterClick}
            appearance="subtle"
          >
            Filters
          </Button>
        </div>
      )}

      <Table
        {...arrowNavigationProps}
        role="grid"
        size="medium"
        className="data-table"
      >
        <TableHeader>
          <TableRow>
            {tableColumns.map(column => (
              <React.Fragment key={column.columnId}>
                {renderHeaderCell(column)}
              </React.Fragment>
            ))}
          </TableRow>
        </TableHeader>

        <TableBody>
          {loading ? (
            <TableRow>
              <TableCell colSpan={tableColumns.length}>
                <div className="data-table-loading">Loading...</div>
              </TableCell>
            </TableRow>
          ) : displayData.length === 0 ? (
            <TableRow>
              <TableCell colSpan={tableColumns.length}>
                <div className="data-table-empty">{emptyMessage}</div>
              </TableCell>
            </TableRow>
          ) : (
            displayData.map(item => (
              <TableRow
                key={String(item[keyField])}
                {...getRowProps(item)}
                {...focusableGroupProps}
              >
                {tableColumns.map(column => (
                  <React.Fragment key={column.columnId}>
                    {renderDataCell(column, item)}
                  </React.Fragment>
                ))}
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}

export default DataTable;