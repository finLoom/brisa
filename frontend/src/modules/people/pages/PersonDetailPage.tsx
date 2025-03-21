// frontend/src/modules/people/pages/PersonDetailPage.tsx
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Button,
  Dialog,
  DialogTrigger,
  DialogSurface,
  DialogTitle,
  DialogBody,
  DialogActions,
  DialogContent,
  makeStyles,
  tokens,
  Spinner
} from '@fluentui/react-components';
import { ArrowLeft24Regular } from '@fluentui/react-icons';

import PersonDetail from '../components/PersonDetail';
import { usePersonDetails } from '../hooks/usePersonDetails';

// Styles
const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: tokens.spacingVerticalL,
    padding: tokens.spacingVerticalM,
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    gap: tokens.spacingHorizontalM,
  },
  loadingContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '200px',
  },
  dialogContent: {
    display: 'flex',
    flexDirection: 'column',
    gap: tokens.spacingVerticalM,
  },
});

export const PersonDetailPage: React.FC = () => {
  const styles = useStyles();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  // Delete confirmation dialog
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  // Use the custom hook for person data and operations
  const { person, loading, error, deletePerson } = usePersonDetails(id);

  // Handle back to list
  const handleBackToList = () => {
    navigate('/people');
  };

  // Handle edit
  const handleEdit = () => {
    navigate(`/people/${id}/edit`);
  };

  // Handle delete click
  const handleDeleteClick = () => {
    setShowDeleteDialog(true);
  };

  // Handle confirmed delete
  const handleConfirmDelete = async () => {
    if (!id) return;

    try {
      const success = await deletePerson(id);
      if (success) {
        navigate('/people');
      }
    } catch (error) {
      console.error('Error deleting person:', error);
    } finally {
      setShowDeleteDialog(false);
    }
  };

  // Handle cancel delete
  const handleCancelDelete = () => {
    setShowDeleteDialog(false);
  };

  // Show loading state
  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.header}>
          <Button
            appearance="subtle"
            icon={<ArrowLeft24Regular />}
            onClick={handleBackToList}
          >
            Back to List
          </Button>
        </div>
        <div className={styles.loadingContainer}>
          <Spinner size="large" label="Loading person details..." />
        </div>
      </div>
    );
  }

  // Show error state
  if (error || !person) {
    return (
      <div className={styles.container}>
        <div className={styles.header}>
          <Button
            appearance="subtle"
            icon={<ArrowLeft24Regular />}
            onClick={handleBackToList}
          >
            Back to List
          </Button>
        </div>
        <div>
          <h2>Error</h2>
          <p>
            {error?.message || 'Person not found'}
          </p>
          <Button appearance="primary" onClick={handleBackToList}>
            Return to People List
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Button
          appearance="subtle"
          icon={<ArrowLeft24Regular />}
          onClick={handleBackToList}
        >
          Back to List
        </Button>
      </div>

      <PersonDetail
        person={person}
        onEdit={handleEdit}
        onDelete={handleDeleteClick}
      />

      {/* Delete Confirmation Dialog */}
      <Dialog open={showDeleteDialog} onOpenChange={(_, data) => setShowDeleteDialog(data.open)}>
        <DialogSurface>
          <DialogBody>
            <DialogTitle>Confirm Delete</DialogTitle>
            <DialogContent className={styles.dialogContent}>
              <div>
                Are you sure you want to delete{' '}
                <strong>{person.fullLegalName}</strong>?
              </div>
              <div>This action cannot be undone.</div>
            </DialogContent>
            <DialogActions>
              <Button appearance="secondary" onClick={handleCancelDelete}>
                Cancel
              </Button>
              <Button appearance="primary" onClick={handleConfirmDelete}>
                Delete
              </Button>
            </DialogActions>
          </DialogBody>
        </DialogSurface>
      </Dialog>
    </div>
  );
};

export default PersonDetailPage;