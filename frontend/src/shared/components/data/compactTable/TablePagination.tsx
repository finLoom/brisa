// frontend/src/shared/components/data/compactTable/TablePagination.tsx
import React, { useMemo } from 'react';
import { Text, Button } from '@fluentui/react-components';
import { useTableStyles } from './useTableStyles';
import { ChevronLeft24Regular, ChevronRight24Regular } from '@fluentui/react-icons';

interface TablePaginationProps {
  currentPage: number;
  totalPages: number;
  pageSize: number;
  totalItems: number;
  onPageChange: (page: number) => void;
}

function TablePagination({
  currentPage,
  totalPages,
  pageSize,
  totalItems,
  onPageChange
}: TablePaginationProps): JSX.Element {
  const styles = useTableStyles();

  const pageNumbers = useMemo(() => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
    return pages;
  }, [totalPages]);

  return (
    <div className={styles.pagination}>
      <Button
        appearance="subtle"
        icon={<ChevronLeft24Regular />}
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      />

      {pageNumbers.map(page => (
        <Button
          key={page}
          appearance={page === currentPage ? 'primary' : 'subtle'}
          onClick={() => onPageChange(page)}
        >
          {page}
        </Button>
      ))}

      <Button
        appearance="subtle"
        icon={<ChevronRight24Regular />}
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      />

      <Text>
        Page {currentPage} of {totalPages} (Total Items: {totalItems})
      </Text>
    </div>
  );
}

export default TablePagination;