// src/app/layouts/components/CompanySelector.tsx
import React, { useMemo } from 'react';
import {
  Dropdown,
  IDropdownOption
} from '@fluentui/react/lib/Dropdown';
import { Stack } from '@fluentui/react/lib/Stack';
import { Text } from '@fluentui/react/lib/Text';
import { useCompanyContext } from '../../../shared/hooks/useCompanyContext';
import { useCompanies } from '../../../shared/hooks/useCompanies';

export const CompanySelector: React.FC = () => {
  const { data: companies, isLoading } = useCompanies();
  const { activeCompany, setActiveCompany } = useCompanyContext();

  const companyOptions: IDropdownOption[] = useMemo(() => {
    if (!companies) return [];

    return companies.map(company => ({
      key: company.id,
      text: company.name,
      data: company
    }));
  }, [companies]);

  const handleCompanyChange = (_: any, option?: IDropdownOption) => {
    if (option) {
      setActiveCompany(option.data);
    }
  };

  return (
    <Stack horizontal verticalAlign="center" className="company-selector">
      <Text variant="medium">Active Company:</Text>
      <Dropdown
        selectedKey={activeCompany?.id}
        options={companyOptions}
        onChange={handleCompanyChange}
        placeholder="Select a company"
        disabled={isLoading}
        styles={{
          dropdown: {
            width: 200
          }
        }}
      />
    </Stack>
  );
};