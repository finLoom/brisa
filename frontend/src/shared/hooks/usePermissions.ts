// src/shared/hooks/usePermissions.ts
import { useAuth } from './useAuth';
import { useCompanyContext } from './useCompanyContext';

export const usePermissions = () => {
  const { user } = useAuth();
  const { activeCompany } = useCompanyContext();

  const hasAccess = (permission: string): boolean => {
    if (!user || !activeCompany) return false;

    // Find user role for the active company
    const userRole = user.roles.find(role =>
      role.companyId === activeCompany.id
    );

    if (!userRole) return false;

    // Check if the role has the required permission
    return userRole.permissions.includes(permission);
  };

  return { hasAccess };
};