// frontend/src/modules/people/components/PersonDetail.tsx
import React from 'react';
import {
  makeStyles,
  tokens,
  Avatar,
  Badge,
  Button,
  Card,
  CardHeader,
  Divider,
  Text,
  Title2,
  Subtitle1
} from '@fluentui/react-components';
import {
  Person24Regular,
  Building24Regular,
  Edit24Regular,
  Delete24Regular,
  Mail24Regular,
  Phone24Regular,
  CheckmarkCircle16Filled,
  DismissCircle16Filled
} from '@fluentui/react-icons';
import { Person, PersonType, PersonStatus } from '../types';

// Styles
const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: tokens.spacingVerticalL,
  },
  card: {
    padding: tokens.spacingHorizontalL,
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: tokens.spacingVerticalL,
  },
  personInfo: {
    display: 'flex',
    gap: tokens.spacingHorizontalL,
  },
  avatar: {
    fontSize: '24px',
    width: '64px',
    height: '64px',
  },
  statusBadge: {
    display: 'flex',
    alignItems: 'center',
    gap: tokens.spacingHorizontalS,
  },
  statusActive: {
    backgroundColor: tokens.colorPaletteGreenBackground2,
    color: tokens.colorPaletteGreenForeground2,
  },
  statusInactive: {
    backgroundColor: tokens.colorPaletteRedBackground2,
    color: tokens.colorPaletteRedForeground2,
  },
  actions: {
    display: 'flex',
    gap: tokens.spacingHorizontalS,
  },
  contactDetails: {
    display: 'flex',
    alignItems: 'center',
    gap: tokens.spacingHorizontalL,
    marginTop: tokens.spacingVerticalM,
  },
  contactItem: {
    display: 'flex',
    alignItems: 'center',
    gap: tokens.spacingHorizontalS,
  },
  detailGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
    gap: tokens.spacingHorizontalL + ' ' + tokens.spacingVerticalL,
    marginTop: tokens.spacingVerticalL,
  },
  detailItem: {
    display: 'flex',
    flexDirection: 'column',
    gap: tokens.spacingVerticalXS,
  },
  detailLabel: {
    fontWeight: 'bold',
    color: tokens.colorNeutralForeground2,
  },
  detailValue: {
    color: tokens.colorNeutralForeground1,
  },
  section: {
    marginTop: tokens.spacingVerticalL,
  },
  sectionTitle: {
    marginBottom: tokens.spacingVerticalM,
  },
});

interface PersonDetailProps {
  person: Person;
  onEdit: () => void;
  onDelete: () => void;
}

export const PersonDetail: React.FC<PersonDetailProps> = ({ person, onEdit, onDelete }) => {
  const styles = useStyles();

  // Format date helper
  const formatDate = (dateString?: string) => {
    if (!dateString) return '-';
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  // Get initials for Avatar
  const getInitials = () => {
    if (person.type === PersonType.INDIVIDUAL || person.firstName) {
      return `${person.firstName?.charAt(0) || ''}${person.lastName?.charAt(0) || ''}`;
    } else {
      return person.businessName?.charAt(0) || 'B';
    }
  };

  return (
    <div className={styles.container}>
      <Card className={styles.card}>
        <div className={styles.header}>
          <div className={styles.personInfo}>
            <Badge
              className={`${styles.statusBadge} ${
                person.status === PersonStatus.ACTIVE || person.status === 'Active' ? styles.statusActive : styles.statusInactive
              }`}
              appearance="filled"
            >
              {person.status === PersonStatus.ACTIVE || person.status === 'Active' ? (
                <CheckmarkCircle16Filled />
              ) : (
                <DismissCircle16Filled />
              )}
              {person.status}
            </Badge>

            <div style={{ display: 'flex', alignItems: 'center' }}>
              <Avatar
                className={styles.avatar}
                name={person.fullLegalName}
                icon={person.type === PersonType.INDIVIDUAL || person.firstName ? <Person24Regular /> : <Building24Regular />}
              >
                {getInitials()}
              </Avatar>

              <div style={{ marginLeft: tokens.spacingHorizontalL }}>
                <Title2 style={{ margin: 0 }}>
                  {person.fullLegalName}
                </Title2>
                <Text>
                  {person.type === PersonType.INDIVIDUAL || person.firstName ? 'Individual' : 'Business'} • {person.entityType || 'N/A'}
                </Text>
              </div>
            </div>
          </div>

          <div className={styles.actions}>
            <Button
              appearance="subtle"
              icon={<Edit24Regular />}
              onClick={onEdit}
            >
              Edit
            </Button>
            <Button
              appearance="subtle"
              icon={<Delete24Regular />}
              onClick={onDelete}
            >
              Delete
            </Button>
          </div>
        </div>

        <div className={styles.contactDetails}>
          <div className={styles.contactItem}>
            <Mail24Regular />
            <Text>{person.email}</Text>
          </div>
          {person.phone && (
            <div className={styles.contactItem}>
              <Phone24Regular />
              <Text>{person.phone}</Text>
            </div>
          )}
        </div>

        <Card className={styles.section}>
          <CardHeader>
            <Subtitle1 className={styles.sectionTitle}>Personal Details</Subtitle1>
          </CardHeader>
          <Divider />
          <div className={styles.detailGrid}>
            {person.type === PersonType.INDIVIDUAL || person.firstName ? (
              <>
                <div className={styles.detailItem}>
                  <Text className={styles.detailLabel}>First Name</Text>
                  <Text className={styles.detailValue}>{person.firstName || '-'}</Text>
                </div>
                <div className={styles.detailItem}>
                  <Text className={styles.detailLabel}>Last Name</Text>
                  <Text className={styles.detailValue}>{person.lastName || '-'}</Text>
                </div>
                <div className={styles.detailItem}>
                  <Text className={styles.detailLabel}>Full Legal Name</Text>
                  <Text className={styles.detailValue}>{person.fullLegalName}</Text>
                </div>
                <div className={styles.detailItem}>
                  <Text className={styles.detailLabel}>Full Payroll Name</Text>
                  <Text className={styles.detailValue}>{person.fullPayrollName || '-'}</Text>
                </div>
              </>
            ) : (
              <>
                <div className={styles.detailItem}>
                  <Text className={styles.detailLabel}>Business Name</Text>
                  <Text className={styles.detailValue}>{person.businessName || '-'}</Text>
                </div>
                <div className={styles.detailItem}>
                  <Text className={styles.detailLabel}>Primary Contact</Text>
                  <Text className={styles.detailValue}>{person.primaryContact || '-'}</Text>
                </div>
                <div className={styles.detailItem}>
                  <Text className={styles.detailLabel}>Legal Name</Text>
                  <Text className={styles.detailValue}>{person.fullLegalName}</Text>
                </div>
              </>
            )}

            <div className={styles.detailItem}>
              <Text className={styles.detailLabel}>Type</Text>
              <Text className={styles.detailValue}>{person.type === PersonType.INDIVIDUAL || person.firstName ? 'Individual' : 'Business'}</Text>
            </div>
            <div className={styles.detailItem}>
              <Text className={styles.detailLabel}>Entity Type</Text>
              <Text className={styles.detailValue}>{person.entityType || 'N/A'}</Text>
            </div>
            <div className={styles.detailItem}>
              <Text className={styles.detailLabel}>Status</Text>
              <Text className={styles.detailValue}>{person.status}</Text>
            </div>
          </div>
        </Card>

        <Card className={styles.section}>
          <CardHeader>
            <Subtitle1 className={styles.sectionTitle}>Additional Information</Subtitle1>
          </CardHeader>
          <Divider />
          <div className={styles.detailGrid}>
            <div className={styles.detailItem}>
              <Text className={styles.detailLabel}>Department</Text>
              <Text className={styles.detailValue}>{person.department || '-'}</Text>
            </div>
            <div className={styles.detailItem}>
              <Text className={styles.detailLabel}>Job Title</Text>
              <Text className={styles.detailValue}>{person.jobTitle || '-'}</Text>
            </div>
            <div className={styles.detailItem}>
              <Text className={styles.detailLabel}>Onboard Date</Text>
              <Text className={styles.detailValue}>{formatDate(person.onboardDate)}</Text>
            </div>
            <div className={styles.detailItem}>
              <Text className={styles.detailLabel}>Termination Date</Text>
              <Text className={styles.detailValue}>{formatDate(person.terminationDate)}</Text>
            </div>
            <div className={styles.detailItem}>
              <Text className={styles.detailLabel}>Created</Text>
              <Text className={styles.detailValue}>{formatDate(person.createdAt)}</Text>
            </div>
            <div className={styles.detailItem}>
              <Text className={styles.detailLabel}>Last Updated</Text>
              <Text className={styles.detailValue}>{formatDate(person.updatedAt)}</Text>
            </div>
          </div>
        </Card>
      </Card>
    </div>
  );
};

export default PersonDetail;