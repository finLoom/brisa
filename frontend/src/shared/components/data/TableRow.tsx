// frontend/src/shared/components/data/TableRow.tsx
import React from 'react';
import { Checkbox } from '@fluentui/react-components';
import { useTableStyles } from './tableStyles';
import { ColumnConfig } from './types/ColumnConfig';

interface TableRowProps<T> {
  item: T;
  columns: ColumnConfig<T>[];
  keyField: keyof T;
  selectable?: boolean;
  selected?: boolean;
  onSelect?: (checked: boolean, item: T) => void;
  onClick?: (item: T) => void;
}

export function TableRow<T>({
  item,
  columns,
  keyField,
  selectable = false,
  selected = false,
  onSelect,
  onClick
}: TableRowProps<T>): React.ReactElement {
  const styles = useTableStyles();

  const handleRowClick = () => {
    if (onClick) onClick(item);
  };

  const handleCheckboxClick = (e: React.MouseEvent, checked: boolean) => {
    e.stopPropagation();
    if (onSelect) onSelect(checked, item);
  };

  return (
    <tr
      className={`${styles.dataRow} ${selected ? styles.selectedRow : ''}`}
      onClick={handleRowClick}
      style={{ cursor: onClick ? 'pointer' : 'default' }}
      tabIndex={0}
    >
      {selectable && (
        <td
          className={styles.dataCell}
          style={{ width: 40 }}
          onClick={(e) => e.stopPropagation()}
        >
          <Checkbox
            checked={selected}
            onChange={(e, data) => handleCheckboxClick(e as unknown as React.MouseEvent, !!data.checked)}
            className={styles.checkbox}
          />
        </td>
      )}

      {columns.map(column => (
        <td
          key={column.key}
          className={styles.dataCell}
          style={{
            width: column.width,
            minWidth: column.minWidth,
            maxWidth: column.maxWidth
          }}
        >
          {column.renderCell(item)}
        </td>
      ))}
    </tr>
  );
}

export default TableRow;