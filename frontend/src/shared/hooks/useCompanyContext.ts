// src/shared/hooks/useCompanyContext.ts
import { useContext } from 'react';
import { CompanyContext } from '../context/CompanyContextProvider';

export const useCompanyContext = () => {
  const context = useContext(CompanyContext);

  if (!context) {
    throw new Error('useCompanyContext must be used within a CompanyContextProvider');
  }

  return context;
};