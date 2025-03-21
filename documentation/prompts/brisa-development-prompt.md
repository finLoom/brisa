# Brisa Developer Prompt Guide

## System Overview

Brisa is a multi-company HR and financial management platform integrating:
- Employee tracking
- Job placements
- Contracts management
- Invoicing
- Bank transactions
- Payroll data import
- Financial reconciliation

## Technology Stack

**Frontend:**
- React 18+ with Microsoft Fluent UI v9+
- TypeScript
- React Query
- React Hook Form

**Backend:**
- Java Spring Boot microservices
- PostgreSQL

**Infrastructure:**
- Docker
- Terraform
- Kubernetes

## Token-Efficient Communication Strategies

### 1. Module-Specific Development Requests

```
MODULE: [Module Name (people/finance/contracts)]
COMPONENT: [Component Name]
PATH: [Full file path]

REQUIREMENTS:
- [Key requirement 1]
- [Key requirement 2]

DEPENDENCIES:
- [Required components/services]

DATA MODEL:
[JSON structure or TypeScript interface]
```

### 2. Component Update Requests

```
UPDATE: [Full file path]
PURPOSE: [Brief description of what needs changing]

CHANGE:
- [Specific function/element to modify]
- [Description of required change]

RELATED COMPONENTS:
- [List of components affected by this change]
```

### 3. Architecture Questions

```
ARCHITECTURE: [Brief description of question]
CONTEXT: [Related module or feature]
CONSIDERATIONS:
- [Technical consideration 1]
- [Technical consideration 2]
```

## Development Guidelines

1. **Code Organization:**
   - Maximum 200 lines per file
   - Use modular, reusable approach
   - Follow established folder structure

2. **Naming Conventions:**
   - PascalCase for components and classes
   - camelCase for variables and functions
   - kebab-case for file names

3. **UI Components:**
   - Use Fluent UI v9 components exclusively
   - Create composable, reusable components
   - Implement responsive design

4. **API Integration:**
   - Use React Query for data fetching
   - Implement robust error handling
   - Add response type validation

## Module Structure Reference

### Frontend Module Structure

```
modules/[module-name]/
├── components/
│   ├── index.ts
│   ├── [ComponentName].tsx
│   └── [ComponentName].test.tsx
├── hooks/
│   ├── index.ts
│   └── use[HookName].ts
├── pages/
│   ├── index.ts
│   └── [PageName].tsx
├── services/
│   ├── index.ts
│   └── [serviceName].ts
├── store/
│   ├── index.ts
│   └── [storeName].ts
├── types/
│   ├── index.ts
│   └── [typeName].ts
└── utils/
    ├── index.ts
    └── [utilName].ts
```

### Backend Module Structure

```
com/enterprise/[module-name]/
├── controllers/
│   └── [EntityName]Controller.java
├── models/
│   └── [EntityName].java
├── repositories/
│   └── [EntityName]Repository.java
├── services/
│   ├── [EntityName]Service.java
│   └── [EntityName]ServiceImpl.java
├── dto/
│   ├── [EntityName]Request.java
│   └── [EntityName]Response.java
└── config/
    └── [ModuleName]Config.java
```

## Example Requests

### New Component Request

```
MODULE: people
COMPONENT: PersonFilter
PATH: frontend/src/modules/people/components/PersonFilter.tsx

REQUIREMENTS:
- Filter people by type (Employee, Vendor, Client)
- Filter by status (Active, Inactive)
- Search by name or email
- Filter by company association

DEPENDENCIES:
- PeopleService
- usePeopleFilters hook
- PersonType enum

DATA MODEL:
{
  "filterCriteria": {
    "personType": ["EMPLOYEE", "VENDOR"],
    "status": "ACTIVE",
    "searchTerm": "",
    "companyId": null
  }
}
```

### Service Implementation Request

```
MODULE: finance
COMPONENT: InvoiceService
PATH: backend/src/main/java/com/enterprise/finance/services/InvoiceServiceImpl.java

REQUIREMENTS:
- Create invoice from contract
- Match invoices with bank transactions
- Calculate pending payments
- Support partial payments

DEPENDENCIES:
- InvoiceRepository
- ContractService
- BankTransactionService

API ENDPOINTS:
- POST /api/invoices (create invoice)
- PUT /api/invoices/{id} (update status)
- GET /api/invoices?status={status} (filter invoices)
```

## Artifact Management

When working on complex components or multiple related files, request delivery as artifacts:

```
Please deliver the following as artifacts:

1. PersonFilter component (frontend/src/modules/people/components/PersonFilter.tsx)
2. PersonFilterProps interface (frontend/src/modules/people/types/PersonFilter.ts)
3. usePeopleFilters hook (frontend/src/modules/people/hooks/usePeopleFilters.ts)
```

For updates to existing artifacts:

```
Please update artifact ID: [artifact-id]

CHANGES:
- Add validation to email field
- Update styling for error states
- Implement loading indicator
```

## Multi-Session Development

1. End each session with a summary of completed work
2. List pending tasks for next session
3. Reference artifact IDs for continuation
4. Maintain a component/artifact mapping document

By following these guidelines, we can efficiently develop the Brisa enterprise system while maintaining high code quality and architectural consistency.
