// frontend/src/modules/people/components/PeopleFilters.tsx
import React from 'react';
import { FilterTab, FilterField, TableFilters } from '../../../shared/components/data/TableFilters';
import { PeopleFilters as PeopleFiltersType } from '../types/PeopleFilters';

interface PeopleFiltersProps {
  filters: PeopleFiltersType;
  onFilterChange: <K extends keyof PeopleFiltersType>(key: K, value: PeopleFiltersType[K]) => void;
  onApplyFilters: () => void;
  onResetFilters: () => void;
  searchText?: string;
  onSearchChange?: (value: string) => void;
  tabs?: FilterTab[];
  activeTab?: string;
  onTabChange?: (tabKey: string) => void;
}

export const PeopleFilters: React.FC<PeopleFiltersProps> = ({
  filters,
  onFilterChange,
  onApplyFilters,
  onResetFilters,
  searchText,
  onSearchChange,
  tabs,
  activeTab,
  onTabChange
}) => {
  // Define filter fields
  const filterFields: FilterField[] = [
    {
      key: 'type',
      label: 'Person Type',
      type: 'select',
      options: [
        { value: 'Employee', label: 'Employee' },
        { value: 'Vendor', label: 'Vendor' },
        { value: 'Client', label: 'Client' },
        { value: 'Partner', label: 'Partner' }
      ]
    },
    {
      key: 'status',
      label: 'Status',
      type: 'select',
      options: [
        { value: 'Active', label: 'Active' },
        { value: 'Inactive', label: 'Inactive' },
        { value: 'Pending', label: 'Pending' },
        { value: 'Suspended', label: 'Suspended' }
      ]
    },
    {
      key: 'department',
      label: 'Department',
      type: 'select',
      options: [
        { value: 'Engineering', label: 'Engineering' },
        { value: 'Sales', label: 'Sales' },
        { value: 'Marketing', label: 'Marketing' },
        { value: 'Finance', label: 'Finance' },
        { value: 'HR', label: 'HR' },
        { value: 'Operations', label: 'Operations' }
      ]
    },
    {
      key: 'createdAfter',
      label: 'Created After',
      type: 'date'
    },
    {
      key: 'createdBefore',
      label: 'Created Before',
      type: 'date'
    }
  ];

  return (
    <TableFilters<PeopleFiltersType>
      tabs={tabs}
      selectedTab={activeTab}
      onTabChange={onTabChange}
      filters={filterFields}
      filterValues={filters}
      onFilterChange={onFilterChange}
      onApplyFilters={onApplyFilters}
      onResetFilters={onResetFilters}
      searchText={searchText}
      onSearchChange={onSearchChange}
    />
  );
};

export default PeopleFilters;