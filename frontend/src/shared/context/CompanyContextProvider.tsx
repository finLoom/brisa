// src/shared/context/CompanyContextProvider.tsx
import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { useQuery } from 'react-query';
import { companyService } from '../services/companyService';
import { Company } from '../types/company.types';

interface CompanyContextType {
  activeCompany: Company | null;
  setActiveCompany: (company: Company) => void;
  userCompanies: Company[];
  isLoading: boolean;
}

export const CompanyContext = createContext<CompanyContextType>({
  activeCompany: null,
  setActiveCompany: () => {},
  userCompanies: [],
  isLoading: true
});

interface CompanyContextProviderProps {
  children: ReactNode;
}

export const CompanyContextProvider: React.FC<CompanyContextProviderProps> = ({ children }) => {
  const [activeCompany, setActiveCompany] = useState<Company | null>(null);

  const { data: userCompanies = [], isLoading } = useQuery(
    'userCompanies',
    companyService.getUserCompanies
  );

  useEffect(() => {
    // Set first company as active if none is selected and data is loaded
    if (!activeCompany && userCompanies.length > 0) {
      setActiveCompany(userCompanies[0]);
    }
  }, [userCompanies, activeCompany]);

  return (
    <CompanyContext.Provider
      value={{
        activeCompany,
        setActiveCompany,
        userCompanies,
        isLoading
      }}
    >
      {children}
    </CompanyContext.Provider>
  );
};