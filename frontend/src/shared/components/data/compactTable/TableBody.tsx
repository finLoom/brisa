// frontend/src/shared/components/data/compactTable/TableBody.tsx
import React from 'react';
import { Checkbox } from '@fluentui/react-components';
import { mergeClasses } from '@fluentui/react-components';
import useTableStyles from './useTableStyles';
import { ColumnDefinition, ActionDefinition } from './tableTypes';
import TableAction from './TableAction';

interface TableBodyProps<T extends Record<string, any>> {
  columns: ColumnDefinition<T>[];
  items: T[];
  selectedItems: T[];
  onRowClick: (item: T) => void;
  onRowSelect: (item: T) => void;
  selectable: boolean;
  onAction: (actionKey: string, item: T) => void;
  rowActions: ActionDefinition[];
}

function TableBody<T extends Record<string, any>>({
  columns,
  items,
  selectedItems,
  onRowClick,
  onRowSelect,
  selectable,
  onAction,
  rowActions
}: TableBodyProps<T>): JSX.Element {
  const styles = useTableStyles();

  return (
    <tbody>
      {items.map((item, rowIndex) => (
        <tr
          key={rowIndex}
          className={mergeClasses(
            styles.tableRow,
            selectedItems.includes(item) && styles.selectedRow
          )}
          onClick={() => onRowClick(item)}
        >
          {selectable && (
            <td className={styles.selectCell}>
              <Checkbox
                checked={selectedItems.includes(item)}
                onChange={() => onRowSelect(item)}
              />
            </td>
          )}

          {columns.map((column, colIndex) => (
            <td key={colIndex} className={styles.tableCell}>
              {column.onRender
                ? column.onRender(item)
                : String(item[column.fieldName as keyof T] || '')}
            </td>
          ))}

          {rowActions.length > 0 && (
            <td className={styles.actionCell}>
              <TableAction
                item={item}
                onAction={(actionKey) => onAction(actionKey, item)}
              />
            </td>
          )}
        </tr>
      ))}
    </tbody>
  );
}

export default TableBody;