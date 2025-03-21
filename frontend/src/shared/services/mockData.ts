// C:\Apps\Anto\brisa\frontend\src\shared\services\mockData.ts
import { Company } from '../types/company.types';

export const mockCompanies: Company[] = [
{
id: '1',
name: 'Brisa Technologies',
legalName: 'Brisa Technologies Inc.',
taxId: '123456789',
address: {
street: '123 Main St',
city: 'San Francisco',
state: 'CA',
zip: '94105',
country: 'USA'
},
phone: '(555) 123-4567',
    email: 'info@brisa-tech.com',
    website: 'https://brisa-tech.com',
    industry: 'Information Technology',
    status: 'active',
    createdAt: '2023-01-01T00:00:00Z',
    updatedAt: '2023-01-01T00:00:00Z'
  },
  {
    id: '2',
    name: 'Brisa Solutions',
    legalName: 'Brisa Solutions LLC',
    taxId: '987654321',
    address: {
      street: '456 Market St',
      city: 'San Francisco',
      state: 'CA',
      zip: '94105',
      country: 'USA'
    },
    phone: '(555) 987-6543',
    email: 'info@brisa-solutions.com',
    website: 'https://brisa-solutions.com',
    industry: 'Consulting',
    status: 'active',
    createdAt: '2023-01-01T00:00:00Z',
    updatedAt: '2023-01-01T00:00:00Z'
  }
];