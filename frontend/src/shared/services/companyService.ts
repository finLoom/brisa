// C:\Apps\Anto\brisa\frontend\src\shared\services\companyService.ts
import { Company } from '../types/company.types';
import { api } from './api';
import { mockCompanies } from './mockData';

export const companyService = {
async getUserCompanies(): Promise<Company[]> {
    if (process.env.REACT_APP_MOCK_AUTH === 'true') {
      // Return mock data for development
      return Promise.resolve(mockCompanies);
    }

    const response = await api.get('/companies/user');
    return response.data;
  },

  async getCompany(id: string): Promise<Company> {
    if (process.env.REACT_APP_MOCK_AUTH === 'true') {
      // Return mock data for development
      const company = mockCompanies.find(c => c.id === id);
      if (!company) {
        throw new Error('Company not found');
      }
      return Promise.resolve(company);
    }

    const response = await api.get(`/companies/${id}`);
    return response.data;
  },

  async createCompany(company: Omit<Company, 'id'>): Promise<Company> {
    const response = await api.post('/companies', company);
    return response.data;
  },

  async updateCompany(id: string, company: Partial<Company>): Promise<Company> {
    const response = await api.put(`/companies/${id}`, company);
    return response.data;
  },

  async deleteCompany(id: string): Promise<void> {
    await api.delete(`/companies/${id}`);
  }
};