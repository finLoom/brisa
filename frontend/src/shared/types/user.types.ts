// src/shared/types/user.types.ts
export interface UserRole {
    id: string;
name: string;
companyId: string;
permissions: string[];
}

export interface User {
id: string;
name: string;
email: string;
photoUrl?: string;
status?: 'available' | 'busy' | 'away' | 'offline';
roles: UserRole[];
preferences: {
language: string;
theme: 'light' | 'dark';
notifications: boolean;
};
createdAt: string;
updatedAt: string;
}