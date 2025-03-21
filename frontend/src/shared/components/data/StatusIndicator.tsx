// frontend/src/shared/components/data/StatusIndicator.tsx
import React from 'react';

interface StatusIndicatorProps {
  status: 'active' | 'completed' | 'blocked' | 'doing';
  label?: string;
  size?: 'small' | 'medium' | 'large';
}

export const StatusIndicator: React.FC<StatusIndicatorProps> = ({
  status,
  label,
  size = 'small'
}) => {
  // Map status to colors and icons
  const getStatusStyles = () => {
    switch (status) {
      case 'active':
        return { color: '#0078d4', backgroundColor: '#deecf9' };
      case 'completed':
        return { color: '#107c10', backgroundColor: '#dff6dd' };
      case 'blocked':
        return { color: '#d13438', backgroundColor: '#fde7e9' };
      case 'doing':
        return { color: '#0078d4', backgroundColor: '#deecf9' };
      default:
        return { color: '#605e5c', backgroundColor: '#f3f2f1' };
    }
  };

  const styles = getStatusStyles();

  return (
    <div className={`status-indicator ${size}`} style={{ display: 'flex', alignItems: 'center' }}>
      <span
        className="indicator-dot"
        style={{
          width: size === 'small' ? 8 : 12,
          height: size === 'small' ? 8 : 12,
          borderRadius: '50%',
          backgroundColor: styles.color,
          marginRight: 8
        }}
      />
      {label && <span style={{ color: styles.color }}>{label}</span>}
    </div>
  );
};

export default StatusIndicator;