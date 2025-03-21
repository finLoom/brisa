// tableStyles.ts
import { makeStyles, shorthands, tokens } from '@fluentui/react-components';

export const useTableStyles = makeStyles({
table: {
width: '100%',
borderCollapse: 'separate',
borderSpacing: 0,
...shorthands.border('1px', 'solid', tokens.colorNeutralStroke1),
    ...shorthands.borderRadius(tokens.borderRadiusMedium),
    boxShadow: tokens.shadow4,
  },
  headerRow: {
    backgroundColor: tokens.colorNeutralBackground1,
    height: '36px',
    fontWeight: 600,
  },
  headerCell: {
    paddingLeft: tokens.spacingHorizontalM,
    paddingRight: tokens.spacingHorizontalM,
    textAlign: 'left',
    position: 'relative',
    borderBottom: `1px solid ${tokens.colorNeutralStroke1}`,
    '&:hover': {
      backgroundColor: tokens.colorNeutralBackground1Hover,
    },
  },
  sortableHeaderCell: {
    cursor: 'pointer',
  },
  dataRow: {
    height: '42px',
    '&:nth-child(even)': {
      backgroundColor: tokens.colorNeutralBackground2,
    },
    '&:hover': {
      backgroundColor: tokens.colorNeutralBackground1Hover,
    },
    '&:focus': {
      outlineWidth: '2px',
      outlineStyle: 'solid',
      outlineColor: tokens.colorBrandStroke1,
      outlineOffset: '-1px',
    },
  },
  selectedRow: {
    backgroundColor: `${tokens.colorBrandBackground2} !important`,
  },
  dataCell: {
    paddingLeft: tokens.spacingHorizontalM,
    paddingRight: tokens.spacingHorizontalM,
    borderBottom: `1px solid ${tokens.colorNeutralStroke1}`,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  checkbox: {
    margin: 0,
  },
  statusCell: {
    display: 'flex',
    alignItems: 'center',
  }
});