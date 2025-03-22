// frontend/src/modules/people/hooks/usePeopleList.ts
import { useState, useCallback } from 'react';
import { Person } from '../types/Person';
import { peopleService } from '../services/peopleService';

export interface UsePeopleListResult {
people: Person[];
loading: boolean;
error: Error | null;
getPeople: () => Promise<void>;
}

export const usePeopleList = (): UsePeopleListResult => {
  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const getPeople = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await peopleService.getPeople(); // Changed from fetchPeople to getPeople
      setPeople(data);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch people'));
      setPeople([]);
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    people,
    loading,
    error,
    getPeople,
  };
};

export default usePeopleList;