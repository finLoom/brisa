// frontend/src/modules/people/pages/PersonFormPage.tsx
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  makeStyles,
  tokens,
  Title2,
  Spinner,
  MessageBar,
  MessageBarBody
} from '@fluentui/react-components';

import PersonForm from '../components/PersonForm';
import { usePersonDetails } from '../hooks/usePersonDetails';
import { Person, PersonFormData } from '../types';

// Styles
const useStyles = makeStyles({
  container: {
    padding: tokens.spacingHorizontalL,
    maxWidth: '1200px',
    margin: '0 auto',
  },
  header: {
    marginBottom: tokens.spacingVerticalL,
  },
  loadingContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '300px',
  },
  errorContainer: {
    marginBottom: tokens.spacingVerticalL,
  },
});

export const PersonFormPage: React.FC = () => {
  const styles = useStyles();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const isEdit = !!id;

  // Local state
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Use person details hook
  const {
    person,
    loading,
    error,
    createPerson,
    updatePerson
  } = usePersonDetails(isEdit ? id : undefined);

  // Convert Person to PersonFormData
  const personToFormData = (personData: Person | null): PersonFormData | undefined => {
    if (!personData) return undefined;

    return {
      id: personData.id,
      type: personData.type,
      status: personData.status,
      entityType: personData.entityType,
      firstName: personData.firstName,
      lastName: personData.lastName,
      businessName: personData.businessName,
      primaryContact: personData.primaryContact,
      email: personData.email,
      phone: personData.phone,
      department: personData.department,
      jobTitle: personData.jobTitle,
      companyId: personData.companyId,
      onboardDate: personData.onboardDate,
      terminationDate: personData.terminationDate,
      preferredName: personData.preferredName,
    };
  };

  // Handle form submission
  const handleSubmit = async (formData: PersonFormData) => {
    setIsSubmitting(true);
    try {
      if (isEdit && id) {
        await updatePerson(id, formData);
        navigate(`/people/${id}`);
      } else {
        const newPerson = await createPerson(formData);
        if (newPerson) {
          navigate(`/people/${newPerson.id}`);
        }
      }
    } catch (err) {
      console.error('Error saving person:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle cancel
  const handleCancel = () => {
    if (isEdit && id) {
      navigate(`/people/${id}`);
    } else {
      navigate('/people');
    }
  };

  // Show loading indicator while fetching person data
  if (isEdit && loading) {
    return (
      <div className={styles.container}>
        <div className={styles.loadingContainer}>
          <Spinner size="large" label="Loading person data..." />
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Title2>{isEdit ? 'Edit Person' : 'Add New Person'}</Title2>
      </div>

      {error && (
        <div className={styles.errorContainer}>
          <MessageBar intent="error">
            <MessageBarBody>
              {error.message || 'An error occurred while loading person data.'}
            </MessageBarBody>
          </MessageBar>
        </div>
      )}

      <PersonForm
        initialData={personToFormData(person)}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        isEdit={isEdit}
        isLoading={isSubmitting}
      />
    </div>
  );
};

export default PersonFormPage;