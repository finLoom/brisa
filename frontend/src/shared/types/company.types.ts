// src/shared/types/company.types.ts
export interface Company {
    id: string;
name: string;
legalName: string;
taxId: string;
address: {
street: string;
city: string;
state: string;
zip: string;
country: string;
};
phone: string;
email: string;
website?: string;
logo?: string;
industry: string;
status: 'active' | 'inactive';
createdAt: string;
updatedAt: string;
}