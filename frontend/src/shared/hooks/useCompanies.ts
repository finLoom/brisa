// src/shared/hooks/useCompanies.ts
import { useQuery } from 'react-query';
import { companyService } from '../services/companyService';

export const useCompanies = () => {
  return useQuery('companies', companyService.getUserCompanies, {
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};