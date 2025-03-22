// C:\Apps\Anto\brisa\frontend\src\app\layouts\components\Sidebar.tsx
import React from 'react';
import { Nav, INavLink, INavLinkGroup, INavStyles } from '@fluentui/react/lib/Nav';
import { useNavigate, useLocation } from 'react-router-dom';
import { mergeStyles } from '@fluentui/react/lib/Styling';
import { initializeIcons } from '@fluentui/font-icons-mdl2';

// Initialize icons
initializeIcons();

interface SidebarProps {
  collapsed: boolean;
}

const sidebarStyles = (collapsed: boolean) => mergeStyles({
  height: '100%',
  width: collapsed ? '48px' : '250px',
  backgroundColor: '#f3f2f1',
  borderRight: '1px solid #edebe9',
  transition: 'width 0.2s ease-in-out',
  overflow: collapsed ? 'visible' : 'auto',
  position: 'fixed',
  left: 0,
  top: '48px', // Adjusted to match Topbar height
  bottom: 0,
  zIndex: 100
});

const navStyles: Partial<INavStyles> = {
  root: {
    width: '100%',
    height: '100%',
    boxSizing: 'border-box',
    overflowY: 'auto'
  },
  link: {
    padding: '8px 20px',
    height: '44px'
  },
  chevronButton: {
    right: '8px',
    height: '44px',
    lineHeight: '44px',
  },
  chevronIcon: {
    height: '44px',
    lineHeight: '44px',
  }
};

const collapsedNavStyles: Partial<INavStyles> = {
  root: {
    width: '48px',
    height: '100%',
    boxSizing: 'border-box',
    overflowY: 'auto'
  },
  linkText: {
    display: 'none'
  },
  chevronButton: {
    display: 'none'
  },
  chevronIcon: {
    display: 'none'
  },
  compositeLink: {
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    overflow: 'hidden'
  },
  link: {
    padding: '12px 0',
    height: '44px',
    textAlign: 'center'
  },
  group: {
    marginBottom: 0
  }
};

const Sidebar: React.FC<SidebarProps> = ({ collapsed }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const navLinkGroups: INavLinkGroup[] = [
    {
      links: [
        {
          name: 'Dashboard',
          url: '/dashboard',
          key: 'dashboard',
          iconProps: {
            iconName: 'ViewDashboard',
            styles: { root: { color: '#333', fontSize: '16px' } }
          }
        },
        {
          name: 'People',
          url: '/people',
          key: 'people',
          iconProps: {
            iconName: 'People',
            styles: { root: { color: '#333', fontSize: '16px' } }
          },
          isExpanded: location.pathname.startsWith('/people'),
          links: [
            {
              name: 'Employees',
              url: '/people/employees',
              key: 'employees',
              iconProps: {
                iconName: 'Contact',
                styles: { root: { color: '#333', fontSize: '16px' } }
              }
            },
            {
              name: 'Candidates',
              url: '/people/candidates',
              key: 'candidates',
              iconProps: {
                iconName: 'UserFollowed',
                styles: { root: { color: '#333', fontSize: '16px' } }
              }
            },
            {
              name: 'Clients',
              url: '/people/clients',
              key: 'clients',
              iconProps: {
                iconName: 'AccountManagement',
                styles: { root: { color: '#333', fontSize: '16px' } }
              }
            },
            {
              name: 'Vendors',
              url: '/people/vendors',
              key: 'vendors',
              iconProps: {
                iconName: 'Relationship',
                styles: { root: { color: '#333', fontSize: '16px' } }
              }
            }
          ]
        },
        {
          name: 'Contracts',
          url: '/contracts',
          key: 'contracts',
          iconProps: {
            iconName: 'DocumentApproval',
            styles: { root: { color: '#333', fontSize: '16px' } }
          }
        },
        {
          name: 'Finance',
          url: '/finance',
          key: 'finance',
          iconProps: {
            iconName: 'Money',
            styles: { root: { color: '#333', fontSize: '16px' } }
          },
          isExpanded: location.pathname.startsWith('/finance'),
          links: [
            {
              name: 'Invoices',
              url: '/finance/invoices',
              key: 'invoices',
              iconProps: {
                iconName: 'Receipt',
                styles: { root: { color: '#333', fontSize: '16px' } }
              }
            },
            {
              name: 'Transactions',
              url: '/finance/transactions',
              key: 'transactions',
              iconProps: {
                iconName: 'PaymentCard',
                styles: { root: { color: '#333', fontSize: '16px' } }
              }
            },
            {
              name: 'Payroll',
              url: '/finance/payroll',
              key: 'payroll',
              iconProps: {
                iconName: 'Money',
                styles: { root: { color: '#333', fontSize: '16px' } }
              }
            }
          ]
        },

        {
          name: 'Demo',
          url: '/demo',
          key: 'demo',
          iconProps: {
            iconName: 'Money',
            styles: { root: { color: '#333', fontSize: '16px' } }
          },
          isExpanded: location.pathname.startsWith('/demo'),
          links: [
            {
              name: 'Data Grid',
              url: '/data-grid',
              key: 'dataGrid',
              iconProps: {
                iconName: 'Table',
                styles: { root: { color: '#333', fontSize: '16px' } }
              }
            }
          ]
        },


        {
          name: 'Reports',
          url: '/reports',
          key: 'reports',
          iconProps: {
            iconName: 'BarChart4',
            styles: { root: { color: '#333', fontSize: '16px' } }
          }
        },
        {
          name: 'Settings',
          url: '/settings',
          key: 'settings',
          iconProps: {
            iconName: 'Settings',
            styles: { root: { color: '#333', fontSize: '16px' } }
          },
          isExpanded: location.pathname.startsWith('/settings'),
          links: [
            {
              name: 'Profile',
              url: '/settings/profile',
              key: 'profile',
              iconProps: {
                iconName: 'Contact',
                styles: { root: { color: '#333', fontSize: '16px' } }
              }
            },
            {
              name: 'Company',
              url: '/settings/company',
              key: 'company',
              iconProps: {
                iconName: 'Building',
                styles: { root: { color: '#333', fontSize: '16px' } }
              }
            },
            {
              name: 'Users',
              url: '/settings/users',
              key: 'users',
              iconProps: {
                iconName: 'Group',
                styles: { root: { color: '#333', fontSize: '16px' } }
              }
            },
            {
              name: 'Preferences',
              url: '/settings/preferences',
              key: 'preferences',
              iconProps: {
                iconName: 'Settings',
                styles: { root: { color: '#333', fontSize: '16px' } }
              }
            }
          ]
        }
      ]
    }
  ];

  // Fixed onLinkClick function with correct types
  const onLinkClick = (ev?: React.MouseEvent<HTMLElement>, item?: INavLink) => {
    if (ev) {
      ev.preventDefault();
    }
    if (item && item.url) {
      navigate(item.url);
    }
  };

  // Determine the selected key based on current location
  const currentPath = location.pathname;

  // Find the exact matching path or the closest parent path
  const findSelectedKey = (): string => {
    // First try to find exact match
    const exactMatch = findLinkByExactPath(navLinkGroups[0].links, currentPath);
    if (exactMatch && exactMatch.key) return exactMatch.key;

    // Then look for parent match
    for (const link of navLinkGroups[0].links) {
      if (currentPath.startsWith(link.url || '') && link.key) {
        return link.key;
      }

      // Check nested links
      if (link.links) {
        for (const subLink of link.links) {
          if (currentPath.startsWith(subLink.url || '') && subLink.key) {
            return subLink.key;
          }
        }
      }
    }

    // Default to dashboard if no match found
    return 'dashboard';
  };

  // Helper function to find link by exact path
  const findLinkByExactPath = (links: INavLink[], path: string): INavLink | undefined => {
    for (const link of links) {
      if (link.url === path) return link;

      if (link.links) {
        const nestedMatch = findLinkByExactPath(link.links, path);
        if (nestedMatch) return nestedMatch;
      }
    }
    return undefined;
  };

  const selectedKey = findSelectedKey();

  return (
    <div className={sidebarStyles(collapsed)}>
      <Nav
        selectedKey={selectedKey}
        groups={navLinkGroups}
        onLinkClick={onLinkClick}
        styles={collapsed ? collapsedNavStyles : navStyles}
      />
    </div>
  );
};

export default Sidebar;