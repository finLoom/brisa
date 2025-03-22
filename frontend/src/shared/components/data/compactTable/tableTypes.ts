// frontend/src/shared/components/data/compactTable/tableTypes.ts
import { ReactNode } from 'react';

// Enhanced Column Configuration
export interface ColumnDefinition<T = any> {
key: string;           // Unique identifier for the column
name: string;          // Display name of the column
fieldName: keyof T;    // Field in the data object to display
width?: string;        // Optional column width
sortable?: boolean;    // Whether the column can be sorted
filterable?: boolean;  // Whether the column can be filtered
hidden?: boolean;      // Whether the column is hidden

// Custom render function for complex cell rendering
onRender?: (item: T) => ReactNode;

  // Optional custom sorting function
  sortFn?: (a: T, b: T) => number;

  // Optional custom filter function
  filterFn?: (item: T, filterValue: any) => boolean;
}

// Action Configuration with Generic Type
export interface ActionDefinition<T = any> {
  key: string;           // Unique action identifier
  label: string;         // Display label for the action
  icon?: ReactNode;      // Icon for the action
  position: 'header' | 'toolbar' | 'row';

  // Styling and behavior flags
  primary?: boolean;     // Whether it's a primary action
  requireSelection?: boolean; // Requires items to be selected
  disabled?: boolean;    // Whether the action is disabled

  // Required action handler
  handler: (selectedItems?: T[]) => void;
}

// Comprehensive Table Component Props
export interface CompactDataTableProps<T = any> {
  // Data and columns
  items: T[];
  columns: ColumnDefinition<T>[];

  // State and loading
  isLoading?: boolean;
  error?: string;

  // Selection and interaction
  onSelect?: (selectedItems: T[]) => void;
  onRowClick?: (item: T) => void;

  // Actions
  actions?: ActionDefinition<T>[];

  // Customization
  title?: string;
  emptyMessage?: string;

  // Flags
  selectable?: boolean;
  hideSearch?: boolean;

  // Pagination
  pageSize?: number;
  totalCount?: number;
  serverSidePagination?: boolean;

  // Sorting and filtering
  defaultSortColumn?: string;
  defaultSortDirection?: 'asc' | 'desc';
}

// Optional filter configuration
export interface FilterConfiguration<T = any> {
  key: string;
  label: string;
  type: 'text' | 'select' | 'date' | 'number';
  options?: { value: any; label: string }[];
  filterFn: (item: T, value: any) => boolean;
}