// frontend/src/modules/people/pages/PeopleListPage.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
  Title1
} from '@fluentui/react-components';
import { Add24Regular } from '@fluentui/react-icons';

import PeopleTable from '../components/PeopleTable';
import PeopleFiltersComponent from '../components/PeopleFilters';
import { usePeopleList } from '../hooks/usePeopleList';
import { Person } from '../types';

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
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  filtersContainer: {
    marginBottom: tokens.spacingVerticalM,
  },
  tableContainer: {
    marginTop: tokens.spacingVerticalM,
  },
  dialogContent: {
    display: 'flex',
    flexDirection: 'column',
    gap: tokens.spacingVerticalM,
  },
});

export const PeopleListPage: React.FC = () => {
  const styles = useStyles();
  const navigate = useNavigate();

  // Person to delete (for confirmation dialog)
  const [personToDelete, setPersonToDelete] = useState<Person | null>(null);

  // Use the custom hook for people data and state
  const {
    people,
    loading,
    filters,
    updateFilter,
    resetFilters,
    applyFilters,
    selectedPeople,
    setSelectedPeople,
    filterTabs,
    activeTab,
    setActiveTab,
    refreshData
  } = usePeopleList();

  // Handle create new person
  const handleCreatePerson = () => {
    navigate('/people/new');
  };

  // Handle delete person confirmation
  const handleDeleteClick = (person: Person) => {
    setPersonToDelete(person);
  };

  // Handle confirmed delete
  const handleConfirmDelete = async () => {
    if (!personToDelete) return;

    try {
      // This would be a call to the API in a real app
      await fetch(`/api/people/${personToDelete.id}`, { method: 'DELETE' });
      // Refresh the data
      refreshData();
      // Close the dialog
      setPersonToDelete(null);
    } catch (error) {
      console.error('Error deleting person:', error);
    }
  };

  // Handle cancel delete
  const handleCancelDelete = () => {
    setPersonToDelete(null);
  };

  return (
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.header}>
        <Title1>People</Title1>
        <Button appearance="primary" icon={<Add24Regular />} onClick={handleCreatePerson}>
          Add Person
        </Button>
      </div>

      {/* Filters */}
      <div className={styles.filtersContainer}>
        <PeopleFiltersComponent
          filters={filters}
          onFilterChange={updateFilter}
          onApplyFilters={applyFilters}
          onResetFilters={resetFilters}
          tabs={filterTabs}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />
      </div>

      {/* Table */}
      <div className={styles.tableContainer}>
        <PeopleTable
          people={people}
          loading={loading}
          selectedPeople={selectedPeople}
          onSelectionChange={setSelectedPeople}
          onDelete={handleDeleteClick}
        />
      </div>

      {/* Delete Confirmation Dialog */}
      <Dialog open={!!personToDelete} onOpenChange={() => setPersonToDelete(null)}>
        <DialogSurface>
          <DialogBody>
            <DialogTitle>Confirm Delete</DialogTitle>
            <DialogContent className={styles.dialogContent}>
              <div>
                Are you sure you want to delete{' '}
                <strong>{personToDelete?.fullLegalName}</strong>?
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

export default PeopleListPage;