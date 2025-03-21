// frontend/src/modules/people/hooks/usePeopleList.ts
import { useState, useEffect, useCallback } from 'react';
import { FilterTab } from '../../../shared/components/data/TableFilters';
import { PersonType, PersonStatus } from '../types/Person';
import { PeopleFilters } from '../types/PeopleFilters';
import { Person } from '../types';

// Mock data for this example
const MOCK_PEOPLE: Person[] = [
{
id: '1',
fullLegalName: 'John Smith',
email: 'john.smith@example.com',
type: PersonType.Employee,
status: PersonStatus.Active,
department: 'Engineering',
jobTitle: 'Senior Software Engineer',
manager: {
id: '5',
name: 'Jane Manager',
department: 'Engineering',
},
createdAt: '2023-01-15T08:30:00Z',
updatedAt: '2023-01-15T08:30:00Z',
companyId: 'company-1'
},
{
id: '2',
fullLegalName: 'Sarah Johnson',
email: 'sarah.j@example.com',
type: PersonType.Employee,
status: PersonStatus.Active,
department: 'Marketing',
jobTitle: 'Marketing Manager',
manager: {
id: '6',
name: 'Michael Director',
department: 'Marketing',
},
createdAt: '2023-02-10T10:15:00Z',
updatedAt: '2023-02-10T10:15:00Z',
companyId: 'company-1'
},
{
id: '3',
fullLegalName: 'Robert Williams',
email: 'r.williams@vendor.com',
type: PersonType.Vendor,
status: PersonStatus.Active,
createdAt: '2023-03-05T14:45:00Z',
updatedAt: '2023-03-05T14:45:00Z',
companyId: 'company-1'
},
{
id: '4',
fullLegalName: 'Emily Davis',
email: 'e.davis@client.com',
type: PersonType.Client,
status: PersonStatus.Inactive,
createdAt: '2023-01-20T09:00:00Z',
updatedAt: '2023-03-15T11:30:00Z',
companyId: 'company-1'
}
];

// Define types for hook return value
interface UsePeopleListReturn {
people: Person[];
loading: boolean;
error: Error | null;
filters: PeopleFilters;
updateFilter: <K extends keyof PeopleFilters>(key: K, value: PeopleFilters[K]) => void;
resetFilters: () => void;
  applyFilters: () => void;
  selectedPeople: Person[];
  setSelectedPeople: (people: Person[]) => void;
  refreshData: () => void;
  filterTabs: FilterTab[];
  activeTab: string;
  setActiveTab: (tabKey: string) => void;
  searchText: string;
  setSearchText: (text: string) => void;
}

export const usePeopleList = (): UsePeopleListReturn => {
  // State for people data
  const [people, setPeople] = useState<Person[]>([]);
  const [filteredPeople, setFilteredPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  // State for filters
  const [filters, setFilters] = useState<PeopleFilters>({});
  const [activeFilters, setActiveFilters] = useState<PeopleFilters>({});

  // State for selection
  const [selectedPeople, setSelectedPeople] = useState<Person[]>([]);

  // State for tabs
  const [activeTab, setActiveTab] = useState<string>('all');

  // State for search
  const [searchText, setSearchText] = useState<string>('');

  // Define tabs
  const filterTabs: FilterTab[] = [
    { key: 'all', name: 'All' },
    { key: 'employee', name: 'Employees' },
    { key: 'vendor', name: 'Vendors' },
    { key: 'client', name: 'Clients' },
    { key: 'active', name: 'Active' },
    { key: 'inactive', name: 'Inactive' }
  ];

  // Fetch people data (mock)
  const fetchPeople = useCallback(async () => {
    try {
      setLoading(true);

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));

      // Set mock data
      setPeople(MOCK_PEOPLE);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch people'));
    } finally {
      setLoading(false);
    }
  }, []);

  // Load data on initial mount
  useEffect(() => {
    fetchPeople();
  }, [fetchPeople]);

  // Apply filters to people data
  useEffect(() => {
    if (!people.length) return;

    let result = [...people];

    // Apply tab filter
    if (activeTab !== 'all') {
      switch (activeTab) {
        case 'employee':
          result = result.filter(p => p.type === PersonType.Employee);
          break;
        case 'vendor':
          result = result.filter(p => p.type === PersonType.Vendor);
          break;
        case 'client':
          result = result.filter(p => p.type === PersonType.Client);
          break;
        case 'active':
          result = result.filter(p => p.status === PersonStatus.Active);
          break;
        case 'inactive':
          result = result.filter(p => p.status === PersonStatus.Inactive);
          break;
      }
    }

    // Apply advanced filters
    if (activeFilters.type) {
      result = result.filter(p => activeFilters.type?.includes(p.type));
    }

    if (activeFilters.status) {
      result = result.filter(p => activeFilters.status?.includes(p.status));
    }

    if (activeFilters.department) {
      result = result.filter(p => p.department === activeFilters.department);
    }

    if (activeFilters.createdAfter) {
      const createdAfterDate = new Date(activeFilters.createdAfter);
      result = result.filter(p => new Date(p.createdAt) >= createdAfterDate);
    }

    if (activeFilters.createdBefore) {
      const createdBeforeDate = new Date(activeFilters.createdBefore);
      result = result.filter(p => new Date(p.createdAt) <= createdBeforeDate);
    }

    // Apply search text
    if (searchText) {
      const searchLower = searchText.toLowerCase();
      result = result.filter(
        p => p.fullLegalName.toLowerCase().includes(searchLower) ||
             p.email.toLowerCase().includes(searchLower) ||
             (p.department && p.department.toLowerCase().includes(searchLower)) ||
             (p.jobTitle && p.jobTitle.toLowerCase().includes(searchLower))
      );
    }

    setFilteredPeople(result);
  }, [people, activeTab, activeFilters, searchText]);

  // Update a single filter
  const updateFilter = useCallback(<K extends keyof PeopleFilters>(key: K, value: PeopleFilters[K]) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  }, []);

  // Reset all filters
  const resetFilters = useCallback(() => {
    setFilters({});
    setActiveFilters({});
  }, []);

  // Apply all filters
  const applyFilters = useCallback(() => {
    setActiveFilters(filters);
  }, [filters]);

  // Refresh data
  const refreshData = useCallback(() => {
    fetchPeople();
  }, [fetchPeople]);

  return {
    people: filteredPeople,
    loading,
    error,
    filters,
    updateFilter,
    resetFilters,
    applyFilters,
    selectedPeople,
    setSelectedPeople,
    refreshData,
    filterTabs,
    activeTab,
    setActiveTab,
    searchText,
    setSearchText
  };
};

export default usePeopleList;