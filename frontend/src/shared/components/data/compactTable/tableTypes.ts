// frontend/src/shared/components/data/compactTable/tableTypes.ts
import { ReactNode } from 'react';

// Column configuration
export interface ColumnDefinition<T = any> {
key: string;
name: string;
fieldName: string;
width?: string;
onRender?: (item: T) => ReactNode;
}

// Action configuration
export interface ActionDefinition {
  key: string;
  label: string;
  icon: JSX.Element;
  position: 'header' | 'toolbar' | 'row';
  primary?: boolean;
  requireSelection?: boolean;
}

// Component props
export interface CompactDataTableProps<T = any> {
  items: T[];
  columns: ColumnDefinition<T>[];
  isLoading?: boolean;
  error?: string;
  onSelect?: (selectedItems: T[]) => void;
  onRowClick?: (item: T) => void;
  onAction?: (actionKey: string, item?: T) => void;
  title?: string; // Add the title prop
  actions?: ActionDefinition[];
  emptyMessage?: string;
  selectable?: boolean;
  hideSearch?: boolean;
  pageSize?: number;
  totalCount?: number;
}