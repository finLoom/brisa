// frontend/src/modules/people/types/Person.ts

// Person type enum
export enum PersonType {
    INDIVIDUAL = 'INDIVIDUAL',
    BUSINESS = 'BUSINESS',
    Employee = 'Employee',
    Vendor = 'Vendor',
    Client = 'Client',
    Partner = 'Partner'
}

// Entity type enum
export enum PersonEntityType {
    CORPORATION = 'CORPORATION',
    LLC = 'LLC',
    PARTNERSHIP = 'PARTNERSHIP',
    SOLE_PROPRIETOR = 'SOLE_PROPRIETOR',
    OTHER = 'OTHER',
    EMPLOYEE = 'EMPLOYEE',
    CLIENT = 'CLIENT',
    VENDOR = 'VENDOR',
    PARTNER = 'PARTNER'
}

// Status enum
export enum PersonStatus {
    ACTIVE = 'ACTIVE',
    INACTIVE = 'INACTIVE',
    Active = 'Active',
    Inactive = 'Inactive',
    Pending = 'Pending',
    Suspended = 'Suspended'
}

// Person interface
export interface Person {
    id: string;
fullLegalName: string;
preferredName?: string;
email: string;
phone?: string;
type: PersonType;
status: PersonStatus;
entityType?: PersonEntityType;
department?: string;
jobTitle?: string;
manager?: {
id: string;
name: string;
department?: string;
avatarUrl?: string;
};
createdAt: string;
updatedAt: string;
companyId: string;

// Additional fields for different person types
firstName?: string;
lastName?: string;
fullPayrollName?: string;
businessName?: string;
primaryContact?: string;

// Additional date fields
onboardDate?: string;
terminationDate?: string;
}

// Form data interface for creating/editing a person
export interface PersonFormData {
id?: string;
fullLegalName?: string;
type: PersonType;
entityType?: PersonEntityType;
status: PersonStatus;
firstName?: string;
lastName?: string;
businessName?: string;
primaryContact?: string;
email: string;
phone?: string;
department?: string;
jobTitle?: string;
managerId?: string;
companyId: string;
onboardDate?: string;
terminationDate?: string;
preferredName?: string;
}