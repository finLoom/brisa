# Token Optimization Guide for Brisa Development

## Overview

This guide outlines strategies for optimizing token usage during AI-assisted development of the Brisa platform. Following these patterns will help you get more comprehensive responses while staying within token limits.

## Token-Efficient Communication Patterns

### 1. Use Specific References

- **File Paths**: Always specify full paths (`frontend/src/modules/finance/components/InvoiceList.tsx`)
- **Component Names**: Use consistent naming (`InvoiceList` not "the invoice listing component")
- **Function Names**: Reference exact function names (`handleInvoiceSubmit` not "the submit handler")

### 2. Contextual Development

- Focus on one module at a time
- Complete related components in sequence rather than jumping between unrelated features
- Reference existing patterns when requesting similar implementations

### 3. Use Artifact Mapping

Keep a reference document tracking artifact IDs:

```
| Component | Artifact ID | File Path | Description |
|-----------|-------------|-----------|-------------|
| InvoiceList | invoice-list-123 | frontend/src/modules/finance/components/InvoiceList.tsx | List invoices with filtering |
```

## Request Templates

### Component Request

```
COMPONENT: [ComponentName]
PATH: [frontend/src/path/to/Component.tsx]

PURPOSE:
Brief description of component purpose (1-2 sentences)

PROPS:
- propName: PropType - Description
- propName2: PropType2 - Description

BEHAVIOR:
- Key behavior 1
- Key behavior 2

DEPENDENCIES:
- Import 1
- Import 2
```

### Service Request

```
SERVICE: [ServiceName]
PATH: [backend/src/path/to/Service.java]

PURPOSE:
Brief description of service purpose (1-2 sentences)

METHODS:
- methodName(params): ReturnType - Description
- methodName2(params): ReturnType2 - Description

DEPENDENCIES:
- Dependency 1
- Dependency 2
```

### Update Request

```
UPDATE: [artifact-id-123]
PATH: [path/to/file]

CHANGES:
- Change 1: [Brief description]
- Change 2: [Brief description]

REASON:
These changes will improve filtering capabilities and streamline the export workflow.
```

## Multi-Session Development Strategy

### 1. Session Planning

Before starting development sessions:

- Define clear, focused goals for each session
- Prioritize related components and features
- Create a component dependency map for reference

### 2. Session Documentation

End each session with:

```
SESSION SUMMARY:
- COMPLETED: [List of completed components/features]
- ARTIFACTS: [List of artifact IDs created]
- NEXT STEPS: [Priority tasks for next session]
```

### 3. Context Preservation

Start follow-up sessions with:

```
CONTINUATION: [Previous session reference]
FOCUS: [Current session goals]
ARTIFACTS: [Previous artifact IDs to reference]
```

## Code Reuse Strategy

### 1. Component Libraries

Create artifact requests for shared components:

```
SHARED COMPONENT: [ComponentName]
PATH: [frontend/src/shared/components/ComponentName.tsx]
PURPOSE: Reusable component for [purpose]
VARIANTS: [List of component variants]
```

### 2. Hook Libraries

Create artifact requests for shared hooks:

```
SHARED HOOK: [HookName]
PATH: [frontend/src/shared/hooks/useHookName.ts]
PURPOSE: Reusable hook for [purpose]
PARAMETERS: [List of parameters]
RETURN VALUE: [Description of return value]
```

## Artifact Strategy

### 1. Group Related Files

Request multiple related files in a single message:

```
Please create the following related components:

1. COMPONENT: PersonList
   PATH: frontend/src/modules/people/components/PersonList.tsx
   
2. COMPONENT: PersonListItem
   PATH: frontend/src/modules/people/components/PersonListItem.tsx
   
3. COMPONENT: PersonFilter
   PATH: frontend/src/modules/people/components/PersonFilter.tsx
```

### 2. Prioritize Complex Components

Use artifacts for complex, standalone components first:

```
Please create the InvoiceCreation component as an artifact.
Once that's complete, we'll work on the smaller supporting components.
```

## System Design Discussions

For high-level architecture discussions, use this format:

```
ARCHITECTURE DISCUSSION: [Topic]

CURRENT APPROACH:
[Brief description of current implementation]

CONSIDERATIONS:
- [Consideration 1]
- [Consideration 2]

PROPOSED CHANGES:
[Description of proposed changes]
```

By following these token optimization strategies, you'll maximize the effectiveness of AI-assisted development for the Brisa platform while maintaining high-quality, consistent code across the entire system.:
Brief explanation of why the update is needed
```

## Examples

### Good Request (Efficient)

```
COMPONENT: InvoiceFilter
PATH: frontend/src/modules/finance/components/InvoiceFilter.tsx

PURPOSE:
Filter component for invoices by status, date range, and customer.

PROPS:
- filters: InvoiceFilters - Current filter state
- onFilterChange: (filters: InvoiceFilters) => void - Handler for filter changes
- customers: Customer[] - Array of customers for dropdown

BEHAVIOR:
- Show date range picker for filtering by issue date
- Allow multiple status selection (Draft, Sent, Paid, etc.)
- Customer dropdown should support search by name/email
- Clear filters button resets all filters

DEPENDENCIES:
- import { DateRangePicker, Dropdown, Checkbox } from '@fluentui/react-components'
- import { InvoiceFilters, Customer } from '../types'
- import { useInvoiceFilters } from '../hooks/useInvoiceFilters'
```

### Bad Request (Inefficient)

```
Can you create a component for filtering invoices? It should have options for different statuses and date ranges. Also, add a dropdown for customers.
```

## Token-Efficient Follow-ups

### Good Follow-up (Efficient)

```
UPDATE: invoice-filter-123
PATH: frontend/src/modules/finance/components/InvoiceFilter.tsx

CHANGES:
- Add company filter dropdown
- Make date picker use fixed ranges (This Week, Last Week, This Month, etc.)
- Add export button that triggers onExport callback prop

REASON