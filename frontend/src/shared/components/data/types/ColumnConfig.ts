// frontend/src/shared/components/data/types/ColumnConfig.ts
export interface ColumnConfig<T> {
key: string;
name: string;
width?: string | number;
minWidth?: string | number;
maxWidth?: string | number;
isSortable?: boolean;
renderCell: (item: T) => React.ReactNode;
  renderHeader?: () => React.ReactNode;
}

export default ColumnConfig;