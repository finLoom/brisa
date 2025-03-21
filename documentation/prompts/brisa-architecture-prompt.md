# Brisa Architecture Reference Guide

## System Architecture Overview

Brisa implements a modern, modular architecture with microservices for scalability and maintainability.

### High-Level Architecture

```
┌───────────────────┐     ┌───────────────────┐     ┌───────────────────┐
│   React Frontend  │     │    API Gateway    │     │  Microservices    │
│   (Fluent UI v9)  │◄────┤  (Spring Cloud)   │◄────┤  (Spring Boot)    │
└───────────────────┘     └───────────────────┘     └───────────────────┘
          ▲                         ▲                         ▲
          │                         │                         │
          ▼                         ▼                         ▼
┌───────────────────┐     ┌───────────────────┐     ┌───────────────────┐
│   Authentication  │     │   Redis Cache     │     │   PostgreSQL DB   │
│   (JWT, OAuth2)   │     │                   │     │                   │
└───────────────────┘     └───────────────────┘     └───────────────────┘
```

## Frontend Architecture

### Component Hierarchy

```
┌─ App
│  ├─ Layout
│  │  ├─ Navbar
│  │  ├─ Sidebar
│  │  └─ Content
│  │     ├─ ModulePages
│  │     │  ├─ ListViews
│  │     │  ├─ DetailViews
│  │     │  └─ Forms
│  │     └─ Shared Components
│  └─ Auth Components
```

### State Management

```
┌─ Global State
│  ├─ Auth Context
│  ├─ Company Context
│  ├─ Theme Context
│  └─ Notification Context
│
├─ Module-Specific State
│  ├─ People State
│  ├─ Contracts State
│  ├─ Finance State
│  └─ Payroll State
│
└─ React Query Cache
   ├─ Query Cache
   └─ Mutation Cache
```

## Backend Architecture

### Microservice Architecture

```
┌─ API Gateway
│  ├─ Routing
│  ├─ Load Balancing
│  ├─ Authentication
│  └─ Request Logging
│
├─ Core Services
│  ├─ People Service
│  ├─ Company Service
│  ├─ Authentication Service
│  └─ Notification Service
│
├─ Business Services
│  ├─ Contract Service
│  ├─ Invoice Service
│  ├─ Bank Transaction Service
│  └─ Payroll Service
│
└─ Utility Services
   ├─ Document Service
   ├─ Export Service
   ├─ Reporting Service
   └─ Integration Service
```

### Database Schema (Simplified)

```
┌─ People
│  └─ CompanyAssociations
│
├─ Companies
│  └─ Departments
│
├─ Contracts
│  └─ Attachments
│
├─ Invoices
│  └─ InvoiceItems
│
├─ BankAccounts
│  └─ BankTransactions
│
└─ PayrollRecords
   ├─ Deductions
   └─ Taxes
```

## Development Patterns

### Frontend Component Pattern

```typescript
// File: frontend/src/modules/MODULE_NAME/components/ComponentName.tsx

import { FC, useState, useEffect } from 'react';
import { 
  Button, 
  Card, 
  Title, 
  Text 
} from '@fluentui/react-components';
import { useModuleService } from '../services';
import { useModuleState } from '../store';
import { EntityType } from '../types';

interface ComponentNameProps {
  id?: string;
  onAction: (data: EntityType) => void;
}

export const ComponentName: FC<ComponentNameProps> = ({ id, onAction }) => {
  // State hooks
  const [localState, setLocalState] = useState<EntityType | null>(null);
  
  // Custom hooks
  const { fetchData, updateData } = useModuleService();
  const { globalState } = useModuleState();
  
  // Effects
  useEffect(() => {
    if (id) {
      fetchData(id).then(setLocalState);
    }
  }, [id, fetchData]);
  
  // Event handlers
  const handleAction = () => {
    if (localState) {
      onAction(localState);
    }
  };
  
  // Render methods
  const renderContent = () => {
    // Component rendering logic
  };
  
  return (
    <Card>
      <Title>Component Title</Title>
      {renderContent()}
      <Button onClick={handleAction}>Action</Button>
    </Card>
  );
};
```

### Backend Controller Pattern

```java
// File: backend/src/main/java/com/enterprise/MODULE_NAME/controllers/EntityController.java

package com.enterprise.MODULE_NAME.controllers;

import com.enterprise.MODULE_NAME.dto.EntityRequest;
import com.enterprise.MODULE_NAME.dto.EntityResponse;
import com.enterprise.MODULE_NAME.services.EntityService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/entities")
@RequiredArgsConstructor
public class EntityController {

    private final EntityService entityService;

    @GetMapping
    public ResponseEntity<Page<EntityResponse>> getAllEntities(
            @RequestParam(required = false) String filter,
            Pageable pageable) {
        return ResponseEntity.ok(entityService.findAll(filter, pageable));
    }

    @GetMapping("/{id}")
    public ResponseEntity<EntityResponse> getEntityById(@PathVariable String id) {
        return ResponseEntity.ok(entityService.findById(id));
    }

    @PostMapping
    public ResponseEntity<EntityResponse> createEntity(@Valid @RequestBody EntityRequest request) {
        return new ResponseEntity<>(entityService.create(request), HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<EntityResponse> updateEntity(
            @PathVariable String id,
            @Valid @RequestBody EntityRequest request) {
        return ResponseEntity.ok(entityService.update(id, request));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteEntity(@PathVariable String id) {
        entityService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
```

## Architecture Request Formats

### Frontend Feature Request

```
FEATURE: [Brief description of feature]
MODULE: [Module name]
COMPONENTS:
- Path: [frontend/src/modules/module/components/ComponentName.tsx]
  Purpose: [Component purpose]
  Props: [Component props]
  
- Path: [frontend/src/modules/module/hooks/useHookName.ts]
  Purpose: [Hook purpose]
  Dependencies: [Required services/state]

UI FLOW:
1. [First step in user flow]
2. [Second step in user flow]
3. [Third step in user flow]

STATE MANAGEMENT:
- [State requirements]
- [Data fetching strategy]
```

### Backend Service Request

```
SERVICE: [Service name]
MODULE: [Module name]
PATHS:
- Controller: [backend/src/main/java/com/enterprise/module/controllers/ServiceController.java]
- Service: [backend/src/main/java/com/enterprise/module/services/ServiceImpl.java]
- DTO: [backend/src/main/java/com/enterprise/module/dto/ServiceRequest.java]

ENDPOINTS:
- GET /api/resource - [Purpose]
- POST /api/resource - [Purpose]
- PUT /api/resource/{id} - [Purpose]
- DELETE /api/resource/{id} - [Purpose]

BUSINESS LOGIC:
- [Key business rule 1]
- [Key business rule 2]

DATABASE INTERACTIONS:
- [Required repositories]
- [Query complexity considerations]
```

## Cross-Cutting Concerns

### Security Implementation

```
SECURITY REQUIREMENT: [Authentication, Authorization, Data Protection]
SCOPE: [System-wide, Module-specific]
IMPLEMENTATION:
- [Technical approach]
- [Affected components]
- [Configuration changes]
```

### Performance Optimization

```
PERFORMANCE ISSUE: [Description]
AFFECTED AREA: [Component, Service, Database]
OPTIMIZATION STRATEGY:
- [Technical approach]
- [Expected improvement]
- [Implementation complexity]
```

## Example Architecture Request

```
FEATURE: Contract Creation Workflow
MODULE: contracts
COMPONENTS:
- Path: frontend/src/modules/contracts/pages/ContractCreationPage.tsx
  Purpose: Multi-step form for creating new contracts
  
- Path: frontend/src/modules/contracts/components/ContractForm.tsx
  Purpose: Reusable form component for contract details
  Props: initialData, customers, onSubmit, onCancel
  
- Path: frontend/src/modules/contracts/hooks/useContractForm.ts
  Purpose: Form state management and validation
  Dependencies: ContractService, validation schema

UI FLOW:
1. User selects customer and contract type
2. User fills contract details based on selected type
3. User adds billing terms and schedules
4. User reviews and submits contract

STATE MANAGEMENT:
- Multi-step form state using React Hook Form
- Customer data fetched and cached with React Query
- Contract submission using mutation with optimistic updates
```

Use this architecture reference guide to ensure consistency and adherence to best practices when implementing new features or modifying existing components in the Brisa platform.
