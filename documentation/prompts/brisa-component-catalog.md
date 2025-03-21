# Brisa Component Catalog

This document serves as a reference guide for the reusable UI components available in the Brisa platform. Use this catalog when requesting implementations to ensure consistency across the application.

## Layout Components

### AppLayout

```
PATH: frontend/src/shared/components/layout/AppLayout.tsx

PURPOSE:
Main application layout with navigation, company context switcher, and content area.

PROPS:
- children: ReactNode - Main content
- showSidebar?: boolean - Whether to show the sidebar (default: true)

USAGE:
<AppLayout>
  <YourPageContent />
</AppLayout>
```

### PageHeader

```
PATH: frontend/src/shared/components/layout/PageHeader.tsx

PURPOSE:
Consistent page header with title, breadcrumbs, and actions.

PROPS:
- title: string - Page title
- breadcrumbs?: BreadcrumbItem[] - Optional breadcrumb items
- actions?: ReactNode - Action buttons/controls
- description?: string - Optional page description

USAGE:
<PageHeader 
  title="Invoices" 
  breadcrumbs={[{text: 'Finance', href: '/finance'}, {text: 'Invoices'}]} 
  actions={<Button>Create Invoice</Button>}
/>
```

### ContentCard

```
PATH: frontend/src/shared/components/layout/ContentCard.tsx

PURPOSE:
Wrapper for content sections with consistent styling.

PROPS:
- children: ReactNode - Card content
- title?: string - Optional card title
- actions?: ReactNode - Optional action buttons
- variant?: 'default' | 'bordered' | 'elevated' - Card style variant

USAGE:
<ContentCard title="Recent Activity">
  <ActivityList items={activities} />
</ContentCard>
```

## Data Display Components

### DataTable

```
PATH: frontend/src/shared/components/data/DataTable.tsx

PURPOSE:
Reusable data table with sorting, selection, and pagination.

PROPS:
- columns: TableColumn[] - Column definitions
- data: any[] - Data array
- onSort?: (sortKey: string, direction: 'asc' | 'desc') => void - Sort handler
- onRowClick?: (item: any) => void - Row click handler
- selection?: 'none' | 'single' | 'multiple' - Selection mode
- onSelectionChange?: (selectedItems: any[]) => void - Selection handler
- pagination?: PaginationProps - Pagination configuration

USAGE:
<DataTable
  columns={columns}
  data={invoices}
  onSort={handleSort}
  selection="multiple"
  onSelectionChange={handleSelectionChange}
  pagination={{
    page: 1,
    pageSize: 10,
    totalItems: 100,
    onPageChange: handlePageChange
  }}
/>
```

### StatusBadge

```
PATH: frontend/src/shared/components/data/StatusBadge.tsx

PURPOSE:
Displays status with appropriate color and icon.

PROPS:
- status: string - Status value
- variant?: 'default' | 'small' - Size variant
- colorMap?: Record<string, string> - Custom color mapping

USAGE:
<StatusBadge status="ACTIVE" />
<StatusBadge status="PAID" variant="small" />
```

### DetailView

```
PATH: frontend/src/shared/components/data/DetailView.tsx

PURPOSE:
Displays entity details in a structured layout.

PROPS:
- fields: DetailField[] - Field definitions with labels and values
- columns?: 1 | 2 | 3 - Number of columns (default: 2)
- actions?: ReactNode - Action buttons
- topContent?: ReactNode - Optional content above fields
- bottomContent?: ReactNode - Optional content below fields

USAGE:
<DetailView
  fields={[
    { label: 'Name', value: person.name },
    { label: 'Email', value: person.email },
    { label: 'Status', value: <StatusBadge status={person.status} /> }
  ]}
  columns={2}
  actions={<Button>Edit</Button>}
/>
```

## Form Components

### FilterPanel

```
PATH: frontend/src/shared/components/forms/FilterPanel.tsx

PURPOSE:
Standard filter panel with expandable sections and apply/reset buttons.

PROPS:
- children: ReactNode - Filter controls
- onApply: () => void - Apply filters handler
- onReset: () => void - Reset filters handler
- initialExpanded?: boolean - Whether panel is initially expanded
- title?: string - Panel title

USAGE:
<FilterPanel onApply={handleApply} onReset={handleReset}>
  <DateRangePicker label="Date Range" onChange={handleDateChange} />
  <Dropdown label="Status" options={statusOptions} onChange={handleStatusChange} />
</FilterPanel>
```

### FormSection

```
PATH: frontend/src/shared/components/forms/FormSection.tsx

PURPOSE:
Groups related form fields with consistent styling.

PROPS:
- children: ReactNode - Form fields
- title: string - Section title
- description?: string - Optional section description
- collapsible?: boolean - Whether section is collapsible

USAGE:
<FormSection title="Contact Information" description="Primary contact details">
  <TextField label="Name" />
  <TextField label="Email" />
  <TextField label="Phone" />
</FormSection>
```

### MultiStepForm

```
PATH: frontend/src/shared/components/forms/MultiStepForm.tsx

PURPOSE:
Manages multi-step form flows with navigation and state preservation.

PROPS:
- steps: FormStep[] - Array of step definitions
- onComplete: (data: any) => void - Form completion handler
- onCancel?: () => void - Cancel handler
- initialData?: any - Initial form data

USAGE:
<MultiStepForm
  steps={[
    {
      title: 'Basic Information',
      component: BasicInfoStep,
      validation: basicInfoValidation
    },
    {
      title: 'Contract Details',
      component: ContractDetailsStep,
      validation: contractDetailsValidation
    }
  ]}
  onComplete={handleFormSubmit}
  onCancel={handleCancel}
/>
```

## Feedback Components

### EmptyState

```
PATH: frontend/src/shared/components/feedback/EmptyState.tsx

PURPOSE:
Display when no data is available, with optional action.

PROPS:
- title: string - Empty state title
- description?: string - Optional description
- icon?: ReactNode - Optional icon
- action?: ReactNode - Optional action button/link

USAGE:
<EmptyState
  title="No invoices found"
  description="There are no invoices matching your filters."
  icon={<DocumentIcon />}
  action={<Button>Create Invoice</Button>}
/>
```

### LoadingState

```
PATH: frontend/src/shared/components/feedback/LoadingState.tsx

PURPOSE:
Consistent loading indicator with optional text.

PROPS:
- text?: string - Optional loading text
- size?: 'small' | 'medium' | 'large' - Size variant
- overlay?: boolean - Whether to display as overlay

USAGE:
<LoadingState text="Loading invoices..." size="medium" />
```

### ErrorState

```
PATH: frontend/src/shared/components/feedback/ErrorState.tsx

PURPOSE:
Error display with retry option.

PROPS:
- title?: string - Error title
- message?: string - Error message
- onRetry?: () => void - Retry handler

USAGE:
<ErrorState
  title="Failed to load data"
  message="There was an error loading the invoice data. Please try again."
  onRetry={handleRetry}
/>
```

## Specialized Components

### CompanySelector

```
PATH: frontend/src/shared/components/company/CompanySelector.tsx

PURPOSE:
Dropdown for selecting active company context.

PROPS:
- companies: Company[] - Available companies
- selectedId?: string - Currently selected company ID
- onChange: (companyId: string) => void - Selection handler
- variant?: 'navbar' | 'form' | 'compact' - Display variant

USAGE:
<CompanySelector
  companies={userCompanies}
  selectedId={currentCompanyId}
  onChange={handleCompanyChange}
  variant="navbar"
/>
```

### SearchInput

```
PATH: frontend/src/shared/components/inputs/SearchInput.tsx

PURPOSE:
Enhanced search input with clear button and optional typeahead.

PROPS:
- value: string - Current search value
- onChange: (value: string) => void - Change handler
- onSearch: (value: string) => void - Search submission handler
- placeholder?: string - Input placeholder
- suggestions?: string[] - Optional typeahead suggestions

USAGE:
<SearchInput
  value={searchTerm}
  onChange={handleSearchChange}
  onSearch={handleSearch}
  placeholder="Search people..."
  suggestions={recentSearches}
/>
```

### DateRangeSelector

```
PATH: frontend/src/shared/components/inputs/DateRangeSelector.tsx

PURPOSE:
Date range selector with preset options and custom range selection.

PROPS:
- value: DateRange | null - Current selected range
- onChange: (range: DateRange | null) => void - Change handler
- presets?: DateRangePreset[] - Custom preset options
- maxRange?: number - Maximum allowed range in days

USAGE:
<DateRangeSelector
  value={dateRange}
  onChange={handleDateRangeChange}
  presets={[
    { label: 'This Month', value: 'this-month' },
    { label: 'Last Month', value: 'last-month' },
    { label: 'Last 90 Days', value: 'last-90-days' }
  ]}
/>
```

## Component Request Format

When requesting implementations using these components, use the following format:

```
COMPONENT: [Component Name]
PATH: [Component File Path]

EXTENDS:
- [Base component name from catalog]

CUSTOMIZATIONS:
- [Customization detail 1]
- [Customization detail 2]

ADDITIONAL PROPS:
- [New prop name]: [type] - [description]

USAGE CONTEXT:
[Brief description of where and how the component will be used]
```

## Example Component Request

```
COMPONENT: InvoiceFilterPanel
PATH: frontend/src/modules/finance/components/InvoiceFilterPanel.tsx

EXTENDS:
- FilterPanel (shared/components/forms/FilterPanel.tsx)

CUSTOMIZATIONS:
- Add status filter using Dropdown component
- Add date range filter using DateRangeSelector
- Add customer filter with search capability

ADDITIONAL PROPS:
- onStatusChange: (statuses: string[]) => void - Status selection handler
- onCustomerChange: (customerId: string | null) => void - Customer selection handler

USAGE CONTEXT:
This component will be used in the InvoiceList page to filter the invoice table.
```

Use this component catalog to ensure consistency across the Brisa platform while implementing new features or modifying existing ones.
