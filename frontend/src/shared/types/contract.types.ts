// src/shared/types/contract.types.ts
export type ContractType = 'hourly' | 'fixed-price' | 'recurring';

export interface ContractParty {
    id: string;
type: 'company' | 'person';
name: string;
email: string;
phone?: string;
address?: string;
}

export interface Contract {
id: string;
companyId: string;
reference: string;
title: string;
description: string;
type: ContractType;
client: ContractParty;
vendor?: ContractParty;
startDate: string;
endDate?: string;
value: number;
currency: string;
billingCycle?: 'weekly' | 'bi-weekly' | 'monthly' | 'quarterly' | 'yearly';
billingDay?: number;
status: 'draft' | 'active' | 'paused' | 'completed' | 'terminated';
documents: {
id: string;
name: string;
url: string;
type: string;
uploadedAt: string;
}[];
createdAt: string;
updatedAt: string;
}