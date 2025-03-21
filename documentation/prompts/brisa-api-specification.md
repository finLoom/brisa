# Brisa API Specification Guide

This document outlines the API design patterns and specifications for the Brisa platform. Use this guide when implementing or requesting backend services.

## API Design Principles

1. **RESTful Resource Design**: APIs are organized around resources with proper HTTP methods
2. **Consistent Response Structure**: Standard format for all API responses
3. **Proper Error Handling**: Detailed error responses with appropriate status codes
4. **Pagination for Collections**: Consistent pagination for all collection endpoints
5. **Versioning**: API versioning through URL path
6. **Authentication**: JWT-based authentication for all endpoints

## Base URL Structure

```
https://api.brisa.com/v1/{resource}
```

## Common HTTP Status Codes

- **200 OK**: Successful operation
- **201 Created**: Resource successfully created
- **204 No Content**: Successful operation with no content to return
- **400 Bad Request**: Invalid request parameters
- **401 Unauthorized**: Missing or invalid authentication
- **403 Forbidden**: Authenticated but insufficient permissions
- **404 Not Found**: Resource not found
- **409 Conflict**: Request conflicts with current state
- **422 Unprocessable Entity**: Validation errors
- **500 Internal Server Error**: Server-side error

## Standard Response Format

### Success Response

```json
{
  "data": {
    // Resource data
  },
  "meta": {
    // Metadata (pagination, etc.)
  }
}
```

### Collection Response

```json
{
  "data": [
    // Array of resources
  ],
  "meta": {
    "pagination": {
      "page": 1,
      "pageSize": 10,
      "totalItems": 100,
      "totalPages": 10
    }
  }
}
```

### Error Response

```json
{
  "error": {
    "code": "ERROR_CODE",
    "message": "Human-readable error message",
    "details": [
      {
        "field": "fieldName",
        "message": "Field-specific error message"
      }
    ]
  }
}
```

## Authentication

All API requests (except authentication endpoints) require a valid JWT token in the Authorization header:

```
Authorization: Bearer {token}
```

### Authentication Endpoints

#### Login

```
POST /auth/login

Request:
{
  "email": "user@example.com",
  "password": "password123"
}

Response:
{
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": "user123",
      "email": "user@example.com",
      "name": "John Doe",
      "roles": ["ADMIN"]
    }
  }
}
```

#### Refresh Token

```
POST /auth/refresh

Request:
{
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}

Response:
{
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

## Resource API Patterns

### Standard CRUD Operations

#### List Resources

```
GET /{resource}?page=1&pageSize=10&sort=createdAt:desc&filter=status:ACTIVE

Response:
{
  "data": [
    {
      "id": "resource1",
      "attribute1": "value1",
      ...
    },
    ...
  ],
  "meta": {
    "pagination": {
      "page": 1,
      "pageSize": 10,
      "totalItems": 100,
      "totalPages": 10
    }
  }
}
```

#### Get Single Resource

```
GET /{resource}/{id}

Response:
{
  "data": {
    "id": "resource1",
    "attribute1": "value1",
    ...
  }
}
```

#### Create Resource

```
POST /{resource}

Request:
{
  "attribute1": "value1",
  ...
}

Response:
{
  "data": {
    "id": "resource1",
    "attribute1": "value1",
    ...
  }
}
```

#### Update Resource

```
PUT /{resource}/{id}

Request:
{
  "attribute1": "updatedValue",
  ...
}

Response:
{
  "data": {
    "id": "resource1",
    "attribute1": "updatedValue",
    ...
  }
}
```

#### Partial Update Resource

```
PATCH /{resource}/{id}

Request:
{
  "attribute1": "updatedValue"
}

Response:
{
  "data": {
    "id": "resource1",
    "attribute1": "updatedValue",
    ...
  }
}
```

#### Delete Resource

```
DELETE /{resource}/{id}

Response:
Status: 204 No Content
```

### Filtering, Sorting and Pagination

#### Filtering

```
GET /{resource}?filter=status:ACTIVE,type:CLIENT

Alternative format for complex filters:
GET /{resource}?status=ACTIVE&type=CLIENT
```

#### Sorting

```
GET /{resource}?sort=createdAt:desc,name:asc
```

#### Pagination

```
GET /{resource}?page=2&pageSize=25
```

## Core API Resources

### People API

#### List People

```
GET /people?type=EMPLOYEE&status=ACTIVE&companyId=company123

Response:
{
  "data": [
    {
      "id": "person1",
      "type": ["EMPLOYEE"],
      "firstName": "John",
      "lastName": "Doe",
      "email": "john.doe@example.com",
      "status": "ACTIVE",
      "companyAssociations": [
        {
          "companyId": "company123",
          "role": "Developer",
          "department": "Engineering",
          "startDate": "2022-01-15T00:00:00Z"
        }
      ],
      "createdAt": "2022-01-10T12:00:00Z",
      "updatedAt": "2022-01-10T12:00:00Z"
    },
    ...
  ],
  "meta": {
    "pagination": {
      "page": 1,
      "pageSize": 10,
      "totalItems": 45,
      "totalPages": 5
    }
  }
}
```

#### Create Person

```
POST /people

Request:
{
  "type": ["EMPLOYEE", "VENDOR"],
  "firstName": "Jane",
  "lastName": "Smith",
  "email": "jane.smith@example.com",
  "phone": "+1234567890",
  "status": "ACTIVE",
  "companyAssociations": [
    {
      "companyId": "company123",
      "role": "Designer",
      "department": "Product",
      "startDate": "2022-02-01T00:00:00Z"
    }
  ]
}

Response:
{
  "data": {
    "id": "person2",
    "type": ["EMPLOYEE", "VENDOR"],
    "firstName": "Jane",
    "lastName": "Smith",
    "email": "jane.smith@example.com",
    "phone": "+1234567890",
    "status": "ACTIVE",
    "companyAssociations": [
      {
        "companyId": "company123",
        "role": "Designer",
        "department": "Product",
        "startDate": "2022-02-01T00:00:00Z"
      }
    ],
    "createdAt": "2022-02-01T10:15:30Z",
    "updatedAt": "2022-02-01T10:15:30Z"
  }
}
```

### Contracts API

#### List Contracts

```
GET /contracts?customerId=customer123&status=ACTIVE

Response:
{
  "data": [
    {
      "id": "contract1",
      "customerId": "customer123",
      "companyId": "company123",
      "title": "Software Development Services",
      "description": "Ongoing software development and maintenance",
      "type": "TIME_BASED",
      "billingFrequency": "MONTHLY",
      "rate": 150.00,
      "currency": "USD",
      "startDate": "2022-03-01T00:00:00Z",
      "endDate": "2023-02-28T00:00:00Z",
      "autoRenew": true,
      "status": "ACTIVE",
      "createdAt": "2022-02-15T09:30:00Z",
      "updatedAt": "2022-02-15T09:30:00Z"
    },
    ...
  ],
  "meta": {
    "pagination": {
      "page": 1,
      "pageSize": 10,
      "totalItems": 3,
      "totalPages": 1
    }
  }
}
```

#### Generate Invoice from Contract

```
POST /contracts/{contractId}/invoices

Request:
{
  "periodStart": "2022-04-01T00:00:00Z",
  "periodEnd": "2022-04-30T00:00:00Z",
  "items": [
    {
      "description": "Software Development - April 2022",
      "quantity": 160,
      "unitPrice": 150.00,
      "taxRate": 0
    }
  ],
  "dueDate": "2022-05-15T00:00:00Z"
}

Response:
{
  "data": {
    "id": "invoice1",
    "number": "INV-2022-0001",
    "contractId": "contract1",
    "customerId": "customer123",
    "companyId": "company123",
    "items": [
      {
        "id": "item1",
        "description": "Software Development - April 2022",
        "quantity": 160,
        "unitPrice": 150.00,
        "taxRate": 0,
        "amount": 24000.00
      }
    ],
    "subtotal": 24000.00,
    "taxAmount": 0,
    "totalAmount": 24000.00,
    "paidAmount": 0,
    "dueAmount": 24000.00,
    "currency": "USD",
    "issueDate": "2022-05-01T00:00:00Z",
    "dueDate": "2022-05-15T00:00:00Z",
    "status": "DRAFT",
    "createdAt": "2022-05-01T09:00:00Z",
    "updatedAt": "2022-05-01T09:00:00Z"
  }
}
```

### Bank Transactions API

#### Import Transactions

```
POST /bank-accounts/{accountId}/transactions/import

Request:
{
  "format": "CSV",
  "data": "base64EncodedFileContent",
  "mappings": {
    "date": "Transaction Date",
    "amount": "Amount",
    "description": "Description",
    "reference": "Reference"
  }
}

Response:
{
  "data": {
    "importId": "import123",
    "totalTransactions": 120,
    "newTransactions": 118,
    "duplicates": 2,
    "status": "COMPLETED"
  }
}
```

#### Match Transaction with Invoice

```
POST /bank-transactions/{transactionId}/match

Request:
{
  "invoiceIds": ["invoice1"],
  "matchType": "FULL"
}

Response:
{
  "data": {
    "id": "transaction1",
    "accountId": "account1",
    "companyId": "company1",
    "date": "2022-05-10T00:00:00Z",
    "amount": 24000.00,
    "currency": "USD",
    "description": "Payment from Client Corp",
    "reference": "INV-2022-0001",
    "type": "DEPOSIT",
    "reconciled": true,
    "invoiceIds": ["invoice1"],
    "updatedAt": "2022-05-12T15:30:00Z"
  }
}
```

## API Request Format

When requesting API implementation, use the following format:

```
API REQUEST: [Resource Name]
ENDPOINT: [HTTP Method] [Path]

PURPOSE:
Brief description of the endpoint purpose

REQUEST PARAMETERS:
- pathParam: [type] - [description]
- queryParam?: [type] - [description] (optional)

REQUEST BODY:
{
  // JSON schema with comments
}

RESPONSE BODY:
{
  // JSON schema with comments
}

AUTHORIZATION:
- Required roles: [list of roles]

VALIDATION RULES:
- [Field name]: [validation rule]
```

## Example API Request

```
API REQUEST: Create Contract
ENDPOINT: POST /contracts

PURPOSE:
Creates a new contract between a company and a customer

REQUEST BODY:
{
  "customerId": "string", // ID of the customer (REQUIRED)
  "companyId": "string",  // ID of the company issuing the contract (REQUIRED)
  "title": "string",      // Contract title (REQUIRED)
  "description": "string", // Detailed description
  "type": "TIME_BASED",   // Contract type: TIME_BASED, FIXED_PRICE, RECURRING (REQUIRED)
  "billingFrequency": "MONTHLY", // HOURLY, WEEKLY, MONTHLY, QUARTERLY, MILESTONE, ONE_TIME (REQUIRED)
  "rate": 150.00,         // Rate amount (REQUIRED)
  "currency": "USD",      // 3-letter currency code (REQUIRED)
  "startDate": "2022-03-01T00:00:00Z", // Contract start date (REQUIRED)
  "endDate": "2023-02-28T00:00:00Z",   // Contract end date
  "autoRenew": true,      // Whether contract should auto-renew
  "terms": "string"       // Contract terms and conditions
}

RESPONSE BODY:
{
  "data": {
    "id": "string",       // Generated contract ID
    "customerId": "string",
    "companyId": "string",
    "title": "string",
    "description": "string",
    "type": "TIME_BASED",
    "billingFrequency": "MONTHLY",
    "rate": 150.00,
    "currency": "USD",
    "startDate": "2022-03-01T00:00:00Z",
    "endDate": "2023-02-28T00:00:00Z",
    "autoRenew": true,
    "terms": "string",
    "status": "DRAFT",    // Initial status is always DRAFT
    "createdAt": "2022-02-15T09:30:00Z",
    "updatedAt": "2022-02-15T09:30:00Z"
  }
}

AUTHORIZATION:
- Required roles: CONTRACT_ADMIN, COMPANY_ADMIN

VALIDATION RULES:
- customerId: Must be a valid existing customer ID
- companyId: Must be a valid company ID that the user has access to
- rate: Must be greater than 0
- startDate: Must not be in the past
- endDate: Must be after startDate (if provided)
```

Use this API specification guide to ensure consistency and adherence to best practices when implementing new endpoints or modifying existing ones in the Brisa platform.
