// frontend/src/modules/people/types/Person.ts

export enum PersonType {
    Employee = 'EMPLOYEE',
    Vendor = 'VENDOR',
    Client = 'CLIENT',
    Partner = 'PARTNER'
}

export enum PersonStatus {
    Active = 'ACTIVE',
    Inactive = 'INACTIVE',
    Pending = 'PENDING'
}

export interface Person {
    id: string;
fullLegalName: string;
type: PersonType;
status: PersonStatus;
email?: string;
phone?: string;
createdAt: Date;
updatedAt: Date;
}