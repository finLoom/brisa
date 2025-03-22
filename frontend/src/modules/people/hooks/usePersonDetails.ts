// frontend/src/modules/people/hooks/usePersonDetails.ts
import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { peopleService } from '../services/peopleService';
import { Person, PersonFormData } from '../types';

export interface UsePersonDetailsResult {
person: Person | null;
loading: boolean;
error: Error | null;
fetchPerson: (id: string) => Promise<Person | null>;
  createPerson: (data: PersonFormData) => Promise<Person | null>;
  updatePerson: (id: string, data: Partial<PersonFormData>) => Promise<Person | null>;
  deletePerson: (id: string) => Promise<boolean>;
  openPersonDetails: (id: string) => void;
}

export const usePersonDetails = (id?: string): UsePersonDetailsResult => {
  const navigate = useNavigate();
  const [person, setPerson] = useState<Person | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  // Open person details page
  const openPersonDetails = useCallback((personId: string) => {
    navigate(`/people/${personId}`);
  }, [navigate]);

  // Fetch person by ID
  const fetchPerson = useCallback(async (personId: string) => {
    setLoading(true);
    setError(null);
    try {
      const result = await peopleService.getPersonById(personId);
      setPerson(result);
      return result;
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch person'));
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  // Initial fetch on mount if ID is provided
  useEffect(() => {
    if (id) {
      fetchPerson(id);
    }
  }, [id, fetchPerson]);

  // Create new person
  const createPerson = async (data: PersonFormData) => {
    setLoading(true);
    setError(null);
    try {
      // Make sure fullLegalName is calculated if not provided
      let personData = { ...data };
      if (!personData.fullLegalName) {
        if (personData.type === 'INDIVIDUAL' && personData.firstName && personData.lastName) {
          personData.fullLegalName = `${personData.lastName.toUpperCase()}, ${personData.firstName}`;
        } else if (personData.type === 'BUSINESS' && personData.businessName) {
          personData.fullLegalName = personData.businessName;
        }
      }
      const result = await peopleService.createPerson(personData);
      setPerson(result);
      return result;
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to create person'));
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Update existing person
  const updatePerson = async (personId: string, data: Partial<PersonFormData>) => {
    setLoading(true);
    setError(null);
    try {
      // Make sure fullLegalName is calculated if name fields changed but fullLegalName wasn't provided
      let updateData = { ...data };
      if (!updateData.fullLegalName && person) {
        if (
          (updateData.type === 'INDIVIDUAL' || person.type === 'INDIVIDUAL') &&
          (updateData.firstName || person.firstName) &&
          (updateData.lastName || person.lastName)
        ) {
          const firstName = updateData.firstName || person.firstName || '';
          const lastName = updateData.lastName || person.lastName || '';
          updateData.fullLegalName = `${lastName.toUpperCase()}, ${firstName}`;
        } else if (
          (updateData.type === 'BUSINESS' || person.type === 'BUSINESS') &&
          (updateData.businessName || person.businessName)
        ) {
          updateData.fullLegalName = updateData.businessName || person.businessName || '';
        }
      }

      const result = await peopleService.updatePerson(personId, updateData);
      setPerson(result);
      return result;
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to update person'));
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Delete person
  const deletePerson = async (personId: string) => {
    setLoading(true);
    setError(null);
    try {
      await peopleService.deletePerson(personId);
      setPerson(null);
      return true;
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to delete person'));
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    person,
    loading,
    error,
    fetchPerson,
    createPerson,
    updatePerson,
    deletePerson,
    openPersonDetails
  };
};

export default usePersonDetails;