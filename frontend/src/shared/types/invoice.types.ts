// src/shared/types/invoice.types.ts
export interface InvoiceItem {
    id: string;
description: string;
quantity: number;
unitPrice: number;
taxRate: number;
total: number;
}

export interface Invoice {
id: string;
companyId: string;
contractId?: string;
reference: string;
client: {
id: string;
name: string;
email: string;
address: string;
};
issueDate: string;
dueDate: string;
items: InvoiceItem[];
subtotal: number;
taxTotal: number;
total: number;
paidAmount: number;
balance: number;
currency: string;
notes?: string;
status: 'draft' | 'sent' | 'partial' | 'paid' | 'overdue' | 'cancelled';
createdAt: string;
updatedAt: string;
}