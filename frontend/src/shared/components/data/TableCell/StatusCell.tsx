// frontend/src/shared/components/data/TableCell/StatusCell.tsx
import React from 'react';
import { makeStyles } from '@fluentui/react-components';
import { StatusIndicator } from '../StatusIndicator';

// Create styles with direct color values to avoid token issues
const useStyles = makeStyles({
  statusContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  statusLabel: {
    padding: '4px 8px',
    borderRadius: '3px',
    fontSize: '12px',
    fontWeight: '500',
    display: 'inline-block',
  },
  statusActive: {
    backgroundColor: '#dff6dd', // Light green
    color: '#107c10',          // Dark green
  },
  statusInactive: {
    backgroundColor: '#fde7e9', // Light red
    color: '#d13438',          // Dark red
  },
  statusPending: {
    backgroundColor: '#fff4ce', // Light yellow
    color: '#797775',          // Dark yellow/brown
  },
  statusSuspended: {
    backgroundColor: '#f3f2f1', // Light gray
    color: '#605e5c',          // Dark gray
  },
  statusEmployee: {
    backgroundColor: '#e5e5f1', // Light purple
    color: '#5c2e91',          // Dark purple
  },
  statusVendor: {
    backgroundColor: '#fcf0e2', // Light orange
    color: '#ca5010',          // Dark orange
  },
  statusClient: {
    backgroundColor: '#e0f5f9', // Light teal
    color: '#038387',          // Dark teal
  },
  statusPartner: {
    backgroundColor: '#f5effa', // Light lilac
    color: '#8764b8',          // Dark lilac
  }
});

interface StatusCellProps {
  status: string;
  showBadge?: boolean;
  badgeColor?: 'brand' | 'danger' | 'important' | 'informative' | 'severe' | 'subtle' | 'success' | 'warning';
}

export const StatusCell: React.FC<StatusCellProps> = ({
  status,
  showBadge = true,
  badgeColor
}) => {
  const styles = useStyles();

  // Get the appropriate style class based on status
  const getStatusClass = (): string => {
    const statusLower = status.toLowerCase();

    if (statusLower === 'active') return styles.statusActive;
    if (statusLower === 'inactive') return styles.statusInactive;
    if (statusLower === 'pending') return styles.statusPending;
    if (statusLower === 'suspended') return styles.statusSuspended;
    if (statusLower === 'employee') return styles.statusEmployee;
    if (statusLower === 'vendor') return styles.statusVendor;
    if (statusLower === 'client') return styles.statusClient;
    if (statusLower === 'partner') return styles.statusPartner;

    return styles.statusActive; // Default
  };

  return (
    <div className={styles.statusContainer}>
      {showBadge ? (
        <span className={`${styles.statusLabel} ${getStatusClass()}`}>
          {status}
        </span>
      ) : (
        <StatusIndicator status={status.toLowerCase() as any} label={status} />
      )}
    </div>
  );
};

export default StatusCell;