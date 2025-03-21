// TitleCell.tsx
interface TitleCellProps {
  title: string;
  icon?: React.ReactNode;
  subtitle?: string;
}

export const TitleCell: React.FC<TitleCellProps> = ({
  title,
  icon,
  subtitle
}) => {
  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      {icon && <div style={{ marginRight: 8 }}>{icon}</div>}
      <div>
        <div style={{
          fontWeight: 600,
          fontSize: '14px',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis'
        }}>
          {title}
        </div>
        {subtitle && (
          <div style={{
            fontSize: '12px',
            color: '#605e5c',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis'
          }}>
            {subtitle}
          </div>
        )}
      </div>
    </div>
  );
};

export default TitleCell;