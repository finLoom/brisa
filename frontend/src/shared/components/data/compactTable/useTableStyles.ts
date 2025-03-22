// frontend/src/shared/components/data/compactTable/useTableStyles.ts
import { makeStyles, shorthands, tokens } from '@fluentui/react-components';

export const useTableStyles = makeStyles({
container: {
width: '100%',
...shorthands.padding('10px'),
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
  },
  tableRow: {
    ':hover': {
      backgroundColor: tokens.colorNeutralBackground2,
    },
  },
  selectedRow: {
    backgroundColor: tokens.colorNeutralBackground3,
  },
  selectCell: {
    width: '50px',
    textAlign: 'center',
  },
  tableCell: {
    ...shorthands.padding('8px'),
    ...shorthands.border('1px', 'solid', tokens.colorNeutralStroke2),
  },
  actionCell: {
    width: '100px',
    textAlign: 'center',
  },
  loadingContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '200px',
  },
  errorContainer: {
    backgroundColor: tokens.colorStatusDangerBackground1,
    color: tokens.colorStatusDangerForeground1,
    ...shorthands.padding('10px'),
    textAlign: 'center',
  },
  emptyContainer: {
    textAlign: 'center',
    color: tokens.colorNeutralForeground3,
    ...shorthands.padding('20px'),
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '10px',
  },
  pagination: {
    display: 'flex',
    justifyContent: 'center',
    ...shorthands.padding('10px'),
  },
  tools: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '10px',
  },
  actionButton: {
    margin: '0 5px',
  },
});

export default useTableStyles;