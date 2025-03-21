// frontend/src/shared/components/data/TableFilters.tsx
import React, { useState } from 'react';
import {
  TabList,
  Tab,
  Card,
  Button,
  Input,
  Select,
  Option,
  Checkbox,
  useId,
  tokens,
  makeStyles
} from '@fluentui/react-components';
import {
  Search24Regular,
  FilterDismiss24Regular,
  FilterSync24Regular,
  ChevronDown20Regular,
  ChevronUp20Regular
} from '@fluentui/react-icons';

// Styles
const useStyles = makeStyles({
  filtersContainer: {
    marginBottom: tokens.spacingVerticalM,
  },
  tabList: {
    marginBottom: tokens.spacingVerticalS,
  },
  filterCard: {
    padding: tokens.spacingHorizontalM,
    marginBottom: tokens.spacingVerticalM,
  },
  filterHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: tokens.spacingVerticalS,
    cursor: 'pointer',
  },
  filterContent: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
    gap: tokens.spacingHorizontalM,
    marginTop: tokens.spacingVerticalM,
  },
  filterActions: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: tokens.spacingHorizontalS,
    marginTop: tokens.spacingVerticalM,
  },
  searchContainer: {
    marginBottom: tokens.spacingVerticalM,
  }
});

// Types
export interface FilterTab {
  key: string;
  name: string;
  count?: number;
}

export interface FilterField<T = any> {
  key: string;
  label: string;
  type: 'text' | 'select' | 'date' | 'dateRange' | 'checkbox' | 'custom';
  options?: { value: string; label: string }[];
  defaultValue?: T;
  render?: (value: T, onChange: (value: T) => void) => React.ReactNode;
}

export interface TableFiltersProps<T extends Record<string, any>> {
  tabs?: FilterTab[];
  selectedTab?: string;
  onTabChange?: (tabKey: string) => void;
  filters: FilterField[];
  filterValues: T;
  onFilterChange: <K extends keyof T>(key: K, value: T[K]) => void;
  onApplyFilters: () => void;
  onResetFilters: () => void;
  searchText?: string;
  onSearchChange?: (value: string) => void;
  className?: string;
}

export function TableFilters<T extends Record<string, any>>({
  tabs,
  selectedTab,
  onTabChange,
  filters,
  filterValues,
  onFilterChange,
  onApplyFilters,
  onResetFilters,
  searchText = '',
  onSearchChange,
  className,
}: TableFiltersProps<T>): React.ReactElement {
  const styles = useStyles();
  const [showFilters, setShowFilters] = useState(false);
  const baseId = useId('filter');

  const toggleFilters = () => setShowFilters(!showFilters);

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onSearchChange) {
      onSearchChange(e.target.value);
    }
  };

  // Render filter based on its type
  const renderFilterField = (filter: FilterField) => {
    const { key, label, type, options, render } = filter;
    const value = filterValues[key] || filter.defaultValue;

    // If custom render function is provided
    if (render) {
      return render(value, (newValue) => onFilterChange(key as keyof T, newValue));
    }

    switch (type) {
      case 'text':
        return (
          <div>
            <label htmlFor={`${baseId}-${key}`}>{label}</label>
            <Input
              id={`${baseId}-${key}`}
              value={value || ''}
              onChange={(e) => onFilterChange(key as keyof T, e.target.value as T[keyof T])}
            />
          </div>
        );

      case 'select':
        return (
          <div>
            <label htmlFor={`${baseId}-${key}`}>{label}</label>
            <Select
              id={`${baseId}-${key}`}
              value={value}
              onChange={(_, data) => onFilterChange(key as keyof T, data.value as T[keyof T])}
            >
              <Option key="all" value="">All</Option>
              {options?.map(option => (
                <Option key={option.value} value={option.value}>
                  {option.label}
                </Option>
              ))}
            </Select>
          </div>
        );

      case 'checkbox':
        return (
          <div>
            <Checkbox
              id={`${baseId}-${key}`}
              label={label}
              checked={value || false}
              onChange={(_, data) => onFilterChange(key as keyof T, data.checked as T[keyof T])}
            />
          </div>
        );

      case 'date':
        return (
          <div>
            <label htmlFor={`${baseId}-${key}`}>{label}</label>
            <Input
              id={`${baseId}-${key}`}
              type="date"
              value={value ? new Date(value).toISOString().split('T')[0] : ''}
              onChange={(e) => onFilterChange(key as keyof T, e.target.value ? new Date(e.target.value).toISOString() as unknown as T[keyof T] : undefined as unknown as T[keyof T])}
            />
          </div>
        );

      // For dateRange, this is simplified - a real implementation would use a date range picker
      case 'dateRange':
        return (
          <div>
            <div>
              <label htmlFor={`${baseId}-${key}-from`}>{`${label} (From)`}</label>
              <Input
                id={`${baseId}-${key}-from`}
                type="date"
                value={value?.from ? new Date(value.from).toISOString().split('T')[0] : ''}
                onChange={(e) => onFilterChange(key as keyof T, { ...value, from: e.target.value } as T[keyof T])}
              />
            </div>
            <div>
              <label htmlFor={`${baseId}-${key}-to`}>{`${label} (To)`}</label>
              <Input
                id={`${baseId}-${key}-to`}
                type="date"
                value={value?.to ? new Date(value.to).toISOString().split('T')[0] : ''}
                onChange={(e) => onFilterChange(key as keyof T, { ...value, to: e.target.value } as T[keyof T])}
              />
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className={className}>
      {/* Tab filters (Salesforce-like) */}
      {tabs && tabs.length > 0 && (
        <TabList
          className={styles.tabList}
          selectedValue={selectedTab}
          onTabSelect={(_, data) => onTabChange?.(data.value as string)}
        >
          {tabs.map((tab: FilterTab) => (
            <Tab key={tab.key} value={tab.key}>
              {tab.name} {tab.count !== undefined && `(${tab.count})`}
            </Tab>
          ))}
        </TabList>
      )}

      {/* Search box */}
      {onSearchChange && (
        <div className={styles.searchContainer}>
          <Input
            placeholder="Search..."
            contentBefore={<Search24Regular />}
            value={searchText}
            onChange={handleSearchChange}
          />
        </div>
      )}

      {/* Advanced filters */}
      <Card className={styles.filterCard}>
        <div
          className={styles.filterHeader}
          onClick={toggleFilters}
        >
          <div>Advanced Filters</div>
          <div>
            {showFilters ? <ChevronUp20Regular /> : <ChevronDown20Regular />}
          </div>
        </div>

        {showFilters && (
          <>
            <div className={styles.filterContent}>
              {filters.map((filter: FilterField) => (
                <div key={filter.key}>
                  {renderFilterField(filter)}
                </div>
              ))}
            </div>

            <div className={styles.filterActions}>
              <Button
                appearance="secondary"
                icon={<FilterDismiss24Regular />}
                onClick={onResetFilters}
              >
                Reset
              </Button>
              <Button
                appearance="primary"
                icon={<FilterSync24Regular />}
                onClick={onApplyFilters}
              >
                Apply Filters
              </Button>
            </div>
          </>
        )}
      </Card>
    </div>
  );
}

export default TableFilters;