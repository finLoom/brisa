// src/shared/types/transaction.types.ts
export type TransactionType = 'deposit' | 'withdrawal' | 'payment' | 'fee' | 'transfer';

export interface Transaction {
    id: string;
companyId: string;
accountId: string;
reference: string;
type: TransactionType;
amount: number;
currency: string;
date: string;
description: string;
category?: string;
invoiceId?: string;
payrollId?: string;
vendorId?: string;
reconciled: boolean;
createdAt: string;
updatedAt: string;
}

export interface BankAccount {
id: string;
companyId: string;
name: string;
accountNumber: string;
routingNumber: string;
bankName: string;
type: 'checking' | 'savings' | 'credit';
currency: string;
balance: number;
isActive: boolean;
createdAt: string;
updatedAt: string;
}