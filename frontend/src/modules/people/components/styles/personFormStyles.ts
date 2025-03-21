// frontend/src/modules/people/components/styles/personFormStyles.ts
import { tokens, makeStyles } from '@fluentui/react-components';

// Fix: Use makeStyles directly without the type casting
export const usePersonFormStyles = makeStyles({
container: {
display: 'flex',
flexDirection: 'column',
gap: tokens.spacingVerticalL,
},
formCard: {
padding: tokens.spacingHorizontalL,
},
header: {
display: 'flex',
justifyContent: 'space-between',
alignItems: 'center',
marginBottom: tokens.spacingVerticalL,
},
actions: {
display: 'flex',
gap: tokens.spacingHorizontalS,
},
formSection: {
marginBottom: tokens.spacingVerticalL,
},
sectionTitle: {
marginBottom: tokens.spacingVerticalM,
},
formGrid: {
display: 'grid',
gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: tokens.spacingHorizontalL + ' ' + tokens.spacingVerticalL,
  },
  fieldGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: tokens.spacingVerticalS,
  },
  buttonGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: tokens.spacingHorizontalL,
  },
  typeSelector: {
    display: 'flex',
    gap: tokens.spacingHorizontalL,
    marginBottom: tokens.spacingVerticalL,
  },
  typeOption: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: tokens.spacingVerticalL + ' ' + tokens.spacingHorizontalL,
    border: `1px solid ${tokens.colorNeutralStroke1}`,
    borderRadius: tokens.borderRadiusMedium,
    cursor: 'pointer',
    width: '150px',
    transition: 'all 0.2s ease',
    '&:hover': {
      // Fix: Use string for border
      border: '1px solid #0078d4' as string,
      // Fix: Use string for backgroundColor
      backgroundColor: '#f0f8ff' as string,
    },
  },
  typeOptionSelected: {
    // Fix: Use string for border
    border: '2px solid #0078d4' as string,
    // Fix: Use string for backgroundColor
    backgroundColor: '#f0f8ff' as string,
  },
  typeIcon: {
    fontSize: '36px',
    marginBottom: tokens.spacingVerticalS,
  },
  footer: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: tokens.spacingHorizontalM,
    marginTop: tokens.spacingVerticalL,
  },
});