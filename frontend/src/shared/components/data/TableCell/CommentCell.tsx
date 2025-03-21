// frontend/src/shared/components/data/TableCell/CommentCell.tsx
import React from 'react';
import { Chat24Regular } from '@fluentui/react-icons';

interface CommentCellProps {
  count: number;
}

export const CommentCell: React.FC<CommentCellProps> = ({ count }) => {
  if (count === 0) return null;

  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <Chat24Regular style={{ marginRight: 4, fontSize: 16 }} />
      <span>{count}</span>
    </div>
  );
};

export default CommentCell;