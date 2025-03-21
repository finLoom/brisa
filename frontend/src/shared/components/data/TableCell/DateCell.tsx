// frontend/src/shared/components/data/TableCell/DateCell.tsx
import React from 'react';

interface DateCellProps {
  date: string | Date;
  showTime?: boolean;
  format?: 'relative' | 'full' | 'short';
}

export const DateCell: React.FC<DateCellProps> = ({
  date,
  showTime = false,
  format = 'short'
}) => {
  // Convert string to Date if needed
  const dateObj = typeof date === 'string' ? new Date(date) : date;

  // Check if date is valid
  if (isNaN(dateObj.getTime())) {
    return <span>Invalid date</span>;
  }

  const formatDate = () => {
    const now = new Date();
    const diffMs = now.getTime() - dateObj.getTime();
    const diffSec = Math.floor(diffMs / 1000);
    const diffMin = Math.floor(diffSec / 60);
    const diffHour = Math.floor(diffMin / 60);
    const diffDay = Math.floor(diffHour / 24);

    // Relative time format
    if (format === 'relative') {
      if (diffSec < 60) return 'Just now';
      if (diffMin < 60) return `${diffMin}m ago`;
      if (diffHour < 24) return `${diffHour}h ago`;
      if (diffDay < 7) return `${diffDay}d ago`;
    }

    // Full format
    if (format === 'full') {
      return new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: showTime ? '2-digit' : undefined,
        minute: showTime ? '2-digit' : undefined
      }).format(dateObj);
    }

    // Short format
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: showTime ? '2-digit' : undefined,
      minute: showTime ? '2-digit' : undefined
    }).format(dateObj);
  };

  return <span>{formatDate()}</span>;
};

export default DateCell;