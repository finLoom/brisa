# Brisa Data Model Reference Guide

This document serves as a reference for discussing and implementing data models across the Brisa platform. Use this guide when requesting implementations that involve data entities.

## Core Data Entities

### People Entity

```typescript
// File: frontend/src/modules/people/types/Person.ts
export enum PersonType {
  EMPLOYEE = 'EMPLOYEE',
  CANDIDATE = 'CANDIDATE',
  VENDOR = 'VENDOR',
  CLIENT = 'CLIENT',
  PARTNER = 'PARTNER'
}

export enum PersonStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  PENDING = 'PENDING'
}

export interface Person {
  id: string;
  type: PersonType[];
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  status: PersonStatus;
  companyAssociations: CompanyAssociation[];
  createdAt: Date;
  updatedAt: Date;
}

export interface CompanyAssociation {
  companyId: string;
  role: string;
  department?: string;
  startDate: Date;
  endDate?: Date;
}
```

### Contract Entity

```typescript
// File: frontend/src/modules/contracts/types/Contract.ts
export enum ContractType {
  TIME_BASED = 'TIME_BASED',
  FIXED_PRICE = 'FIXED_PRICE',
  RECURRING = 'RECURRING'
}

export enum BillingFrequency {
  HOURLY = 'HOURLY',
  WEEKLY = 'WEEKLY',
  MONTHLY = 'MONTHLY',
  QUARTERLY = 'QUARTERLY',
  MILESTONE = 'MILESTONE',
  ONE_TIME = 'ONE_TIME'
}

export interface Contract {
  id: string;
  customerId: string;  // References Person with type CLIENT
  companyId: string;   // Company issuing the contract
  title: string;
  description: string;
  type: ContractType;
  billingFrequency: BillingFrequency;
  rate: number;
  currency: string;
  startDate: Date;
  endDate?: Date;
  autoRenew: boolean;
  terms: string;
  status: 'DRAFT' | 'ACTIVE' | 'COMPLETED' | 'TERMINATED';
  attachments: Attachment[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Attachment {
  id: string;
  name: string;
  url: string;
  type: string;
  uploadedAt: Date;
}
```

### Invoice Entity

```typescript
// File: frontend/src/modules/finance/types/Invoice.ts
export enum InvoiceStatus {
  DRAFT = 'DRAFT',
  SENT = 'SENT',
  PARTIALLY_PAID = 'PARTIALLY_PAID',
  PAID = 'PAID',
  OVERDUE = 'OVERDUE',
  CANCELLED = 'CANCELLED'
}

export interface Invoice {
  id: string;
  number: string;
  contractId: string;
  customerId: string;
  companyId: string;
  items: InvoiceItem[];
  subtotal: number;
  taxAmount: number;
  totalAmount: number;
  paidAmount: number;
  dueAmount: number;
  currency: string;
  issueDate: Date;
  dueDate: Date;
  status: InvoiceStatus;
  notes?: string;
  transactions: Transaction[];
  createdAt: Date;
  updatedAt: Date;
}

export interface InvoiceItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
  taxRate: number;
  amount: number;
}
```

### Bank Transaction Entity

```typescript
// File: frontend/src/modules/finance/types/BankTransaction.ts
export enum TransactionType {
  DEPOSIT = 'DEPOSIT',
  WITHDRAWAL = 'WITHDRAWAL',
  PAYMENT = 'PAYMENT',
  FEE = 'FEE',
  TRANSFER = 'TRANSFER'
}

export interface BankTransaction {
  id: string;
  accountId: string;
  companyId: string;
  date: Date;
  amount: number;
  currency: string;
  description: string;
  reference: string;
  type: TransactionType;
  category?: string;
  reconciled: boolean;
  invoiceIds: string[];  // Associated invoices
  notes?: string;
  importBatch?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface BankAccount {
  id: string;
  companyId: string;
  name: string;
  accountNumber: string;
  routingNumber?: string;
  bankName: string;
  currency: string;
  balance: number;
  type: 'CHECKING' | 'SAVINGS' | 'CREDIT';
  active: boolean;
}
```

### Payroll Entity

```typescript
// File: frontend/src/modules/payroll/types/Payroll.ts
export interface PayrollRecord {
  id: string;
  employeeId: string;
  companyId: string;
  payPeriodStart: Date;
  payPeriodEnd: Date;
  paymentDate: Date;
  grossPay: number;
  deductions: PayrollDeduction[];
  taxes: PayrollTax[];
  netPay: number;
  currency: string;
  status: 'PENDING' | 'PROCESSED' | 'PAID';
  importSource: string;
  importBatch: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface PayrollDeduction {
  id: string;
  name: string;
  amount: number;
  type: string;
}

export interface PayrollTax {
  id: string;
  name: string;
  amount: number;
  type: string;
}
```

## Java Backend Entity Examples

### Person Entity (Java)

```java
// File: backend/src/main/java/com/enterprise/people/models/Person.java
package com.enterprise.people.models;

import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "people")
@Data
public class Person {
    
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;
    
    @ElementCollection(targetClass = PersonType.class)
    @CollectionTable(name = "person_types", joinColumns = @JoinColumn(name = "person_id"))
    @Enumerated(EnumType.STRING)
    private Set<PersonType> types = new HashSet<>();
    
    @Column(nullable = false)
    private String firstName;
    
    @Column(nullable = false)
    private String lastName;
    
    @Column(nullable = false, unique = true)
    private String email;
    
    private String phone;
    
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private PersonStatus status;
    
    @OneToMany(mappedBy = "person", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<CompanyAssociation> companyAssociations = new HashSet<>();
    
    @CreationTimestamp
    private LocalDateTime createdAt;
    
    @UpdateTimestamp
    private LocalDateTime updatedAt;
}
```

### Contract Entity (Java)

```java
// File: backend/src/main/java/com/enterprise/contracts/models/Contract.java
package com.enterprise.contracts.models;

import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "contracts")
@Data
public class Contract {
    
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;
    
    @Column(nullable = false)
    private String customerId;
    
    @Column(nullable = false)
    private String companyId;
    
    @Column(nullable = false)
    private String title;
    
    @Column(columnDefinition = "TEXT")
    private String description;
    
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private ContractType type;
    
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private BillingFrequency billingFrequency;
    
    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal rate;
    
    @Column(nullable = false, length = 3)
    private String currency;
    
    @Column(nullable = false)
    private LocalDate startDate;
    
    private LocalDate endDate;
    
    private boolean autoRenew;
    
    @Column(columnDefinition = "TEXT")
    private String terms;
    
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private ContractStatus status;
    
    @OneToMany(mappedBy = "contract", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<Attachment> attachments = new HashSet<>();
    
    @CreationTimestamp
    private LocalDateTime createdAt;
    
    @UpdateTimestamp
    private LocalDateTime updatedAt;
}
```

## Data Model Request Format

When requesting implementations that involve these data models, use the following format:

```
DATA MODEL REQUEST: [Entity name]
PATH: [Full file path]

ENTITY DETAILS:
- Primary Entity: [Entity name]
- Related Entities: [List of related entities]

REQUIRED FIELDS:
- [field name]: [type] - [description/validation]

RELATIONSHIPS:
- [entity] to [entity]: [relationship type (One-to-Many, Many-to-Many, etc.)]

DATABASE CONSIDERATIONS:
- [Special indexing needs]
- [Performance considerations]
- [Data migration notes]
```

## Example Data Model Request

```
DATA MODEL REQUEST: InvoiceRepository 
PATH: backend/src/main/java/com/enterprise/finance/repositories/InvoiceRepository.java

ENTITY DETAILS:
- Primary Entity: Invoice
- Related Entities: InvoiceItem, BankTransaction

REQUIRED FUNCTIONS:
- findByCompanyIdAndStatus(String companyId, InvoiceStatus status)
- findByCustomerIdAndDueDateBefore(String customerId, LocalDate date)
- findUnpaidInvoicesByCompanyId(String companyId)
- calculateTotalOutstandingByCompanyId(String companyId)

DATABASE CONSIDERATIONS:
- Add index on (companyId, status) for performance
- Add index on dueDate for overdue invoice queries
```

Use this data model reference guide to ensure consistency across the entire Brisa platform while implementing new features or modifying existing ones.
