// frontend/src/shared/components/data/TableCell/AssigneeCell.tsx
import React from 'react';
import { Avatar } from '@fluentui/react-components';

interface AssigneeCellProps {
  name: string;
  email?: string;
  avatarUrl?: string;
  department?: string;
}

export const AssigneeCell: React.FC<AssigneeCellProps> = ({
  name,
  email,
  avatarUrl,
  department
}) => {
  // Use initials if no avatar URL is provided
  const initials = name
    .split(' ')
    .map(part => part[0])
    .join('')
    .toUpperCase()
    .substring(0, 2);

  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <Avatar
        name={name}
        image={{ src: avatarUrl }}
        initials={!avatarUrl ? initials : undefined}
        size={28}
        style={{ marginRight: '8px' }}
      />
      <div>
        <div style={{ fontWeight: 500 }}>{name}</div>
        {department && (
          <div style={{ fontSize: '12px', color: '#605e5c' }}>{department}</div>
        )}
      </div>
    </div>
  );
};

export default AssigneeCell;