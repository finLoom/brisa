// C:\Apps\Anto\brisa\frontend\src\app\layouts\components\Topbar.tsx
import React from 'react';
import {
  Stack,
  Text,
  SearchBox,
  IconButton,
  IContextualMenuProps,
  Link,
  DirectionalHint,
  IIconProps
} from '@fluentui/react';
import { Image } from '@fluentui/react/lib/Image';
import { useTheme } from '@fluentui/react/lib/Theme';
import { mergeStyles } from '@fluentui/react/lib/Styling';
// Import SVG as a regular file path instead of a React component
import LogoPath from './brisa.svg';

// Props for Topbar component
interface TopbarProps {
  isSidebarCollapsed: boolean;
  onToggleSidebar: () => void;
}

const Topbar: React.FC<TopbarProps> = ({ isSidebarCollapsed, onToggleSidebar }) => {
  const theme = useTheme();

  // User profile menu
  const userMenuProps: IContextualMenuProps = {
    items: [
      {
        key: 'profile',
        text: 'Profile',
        iconProps: { iconName: 'Contact' },
        onClick: () => console.log('Profile clicked'),
      },
      {
        key: 'settings',
        text: 'Settings',
        iconProps: { iconName: 'Settings' },
        onClick: () => console.log('Settings clicked'),
      },
      {
        key: 'signOut',
        text: 'Sign Out',
        iconProps: { iconName: 'SignOut' },
        onClick: () => console.log('Sign Out clicked'),
      },
    ],
    directionalHint: DirectionalHint.bottomRightEdge,
  };

  // Explore dropdown items
  const exploreMenuProps: IContextualMenuProps = {
    items: [
      {
        key: 'quickStart',
        text: 'Quick Start',
        onClick: () => console.log('Quick Start clicked'),
      },
      {
        key: 'tutorials',
        text: 'Tutorials',
        onClick: () => console.log('Tutorials clicked'),
      },
      {
        key: 'documentation',
        text: 'Documentation',
        onClick: () => console.log('Documentation clicked'),
      },
    ],
    directionalHint: DirectionalHint.bottomLeftEdge,
  };

  // Products dropdown items
  const productsMenuProps: IContextualMenuProps = {
    items: [
      {
        key: 'hrManagement',
        text: 'HR Management',
        onClick: () => console.log('HR Management clicked'),
      },
      {
        key: 'financialTracking',
        text: 'Financial Tracking',
        onClick: () => console.log('Financial Tracking clicked'),
      },
      {
        key: 'invoicing',
        text: 'Invoicing',
        onClick: () => console.log('Invoicing clicked'),
      },
      {
        key: 'contracts',
        text: 'Contracts',
        onClick: () => console.log('Contracts clicked'),
      },
    ],
    directionalHint: DirectionalHint.bottomLeftEdge,
  };

  // Solutions dropdown items
  const solutionsMenuProps: IContextualMenuProps = {
    items: [
      {
        key: 'itConsulting',
        text: 'IT Consulting',
        onClick: () => console.log('IT Consulting clicked'),
      },
      {
        key: 'staffingAgencies',
        text: 'Staffing Agencies',
        onClick: () => console.log('Staffing Agencies clicked'),
      },
      {
        key: 'professionalServices',
        text: 'Professional Services',
        onClick: () => console.log('Professional Services clicked'),
      },
    ],
    directionalHint: DirectionalHint.bottomLeftEdge,
  };

  // Pricing dropdown items
  const pricingMenuProps: IContextualMenuProps = {
    items: [
      {
        key: 'plans',
        text: 'Plans & Pricing',
        onClick: () => console.log('Plans & Pricing clicked'),
      },
      {
        key: 'enterprise',
        text: 'Enterprise Solutions',
        onClick: () => console.log('Enterprise Solutions clicked'),
      },
      {
        key: 'calculator',
        text: 'Cost Calculator',
        onClick: () => console.log('Cost Calculator clicked'),
      },
    ],
    directionalHint: DirectionalHint.bottomLeftEdge,
  };

  // Partners dropdown items
  const partnersMenuProps: IContextualMenuProps = {
    items: [
      {
        key: 'findPartner',
        text: 'Find a Partner',
        onClick: () => console.log('Find a Partner clicked'),
      },
      {
        key: 'becomePartner',
        text: 'Become a Partner',
        onClick: () => console.log('Become a Partner clicked'),
      },
      {
        key: 'partnerPortal',
        text: 'Partner Portal',
        onClick: () => console.log('Partner Portal clicked'),
      },
    ],
    directionalHint: DirectionalHint.bottomLeftEdge,
  };

  // Style for navigation links
  const navLinkStyle = mergeStyles({
    fontSize: '13px',
    padding: '0 8px',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    color: theme.palette.neutralPrimary,
    textDecoration: 'none',
    position: 'relative',
    ':hover': {
      textDecoration: 'none',
      color: theme.palette.themePrimary,
    },
    ':after': {
      content: '""',
      position: 'absolute',
      left: '8px',
      right: '8px',
      bottom: '0',
      height: '2px',
      background: 'transparent',
    },
  });

  // Style for dropdown links
  const dropdownLinkStyle = mergeStyles(navLinkStyle, {
    ':after': {
      content: '""',
      position: 'absolute',
      left: '8px',
      right: '8px',
      bottom: '0',
      height: '2px',
      background: 'transparent',
    },
  });

  // Menu button icon props
  const chevronDownIcon: IIconProps = {
    iconName: 'ChevronDown',
    styles: {
      root: {
        fontSize: '10px',
        marginLeft: '4px',
      }
    }
  };

  return (
    <Stack
      horizontal
      horizontalAlign="space-between"
      verticalAlign="center"
      styles={{
        root: {
          height: '48px',
          backgroundColor: 'white',
          padding: '0 10px',
          boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.1)',
          borderBottom: '1px solid #edebe9',
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 200
        }
      }}
    >
      <Stack horizontal tokens={{ childrenGap: 10 }} verticalAlign="center">
        {/* Sidebar collapse toggle button */}
        <IconButton
          iconProps={{
            iconName: isSidebarCollapsed ? 'GlobalNavButton' : 'TripleColumn',
            styles: { root: { fontSize: '16px' } }
          }}
          onClick={onToggleSidebar}
          styles={{
            root: {
              width: '32px',
              height: '32px',
              marginRight: '5px'
            },
            icon: {
              color: '#333', // Ensure icon color is visible
              fontSize: '16px'
            }
          }}
          ariaLabel={isSidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        />

        <Image src={LogoPath} alt="Brisa Logo" height={24} />

        {/* Microsoft-style flat navigation */}
        <Stack horizontal tokens={{ childrenGap: 0 }} verticalAlign="center" styles={{ root: { height: '100%', paddingLeft: '10px' } }}>
          {/* Explore dropdown */}
          <Link
            className={dropdownLinkStyle}
            onClick={(e) => e.preventDefault()}
            menuProps={exploreMenuProps}
          >
            Explore
            <IconButton
              iconProps={chevronDownIcon}
              styles={{
                root: {
                  width: 'auto',
                  height: 'auto',
                  padding: 0,
                  margin: 0,
                  marginLeft: '4px',
                  background: 'transparent'
                },
                rootHovered: { background: 'transparent' },
                rootPressed: { background: 'transparent' },
                icon: { fontSize: '8px' }
              }}
            />
          </Link>

          {/* Products dropdown */}
          <Link
            className={dropdownLinkStyle}
            onClick={(e) => e.preventDefault()}
            menuProps={productsMenuProps}
          >
            Products
            <IconButton
              iconProps={chevronDownIcon}
              styles={{
                root: {
                  width: 'auto',
                  height: 'auto',
                  padding: 0,
                  margin: 0,
                  marginLeft: '4px',
                  background: 'transparent'
                },
                rootHovered: { background: 'transparent' },
                rootPressed: { background: 'transparent' },
                icon: { fontSize: '8px' }
              }}
            />
          </Link>

          {/* Solutions dropdown */}
          <Link
            className={dropdownLinkStyle}
            onClick={(e) => e.preventDefault()}
            menuProps={solutionsMenuProps}
          >
            Solutions
            <IconButton
              iconProps={chevronDownIcon}
              styles={{
                root: {
                  width: 'auto',
                  height: 'auto',
                  padding: 0,
                  margin: 0,
                  marginLeft: '4px',
                  background: 'transparent'
                },
                rootHovered: { background: 'transparent' },
                rootPressed: { background: 'transparent' },
                icon: { fontSize: '8px' }
              }}
            />
          </Link>

          {/* Pricing dropdown */}
          <Link
            className={dropdownLinkStyle}
            onClick={(e) => e.preventDefault()}
            menuProps={pricingMenuProps}
          >
            Pricing
            <IconButton
              iconProps={chevronDownIcon}
              styles={{
                root: {
                  width: 'auto',
                  height: 'auto',
                  padding: 0,
                  margin: 0,
                  marginLeft: '4px',
                  background: 'transparent'
                },
                rootHovered: { background: 'transparent' },
                rootPressed: { background: 'transparent' },
                icon: { fontSize: '8px' }
              }}
            />
          </Link>

          {/* Partners dropdown */}
          <Link
            className={dropdownLinkStyle}
            onClick={(e) => e.preventDefault()}
            menuProps={partnersMenuProps}
          >
            Partners
            <IconButton
              iconProps={chevronDownIcon}
              styles={{
                root: {
                  width: 'auto',
                  height: 'auto',
                  padding: 0,
                  margin: 0,
                  marginLeft: '4px',
                  background: 'transparent'
                },
                rootHovered: { background: 'transparent' },
                rootPressed: { background: 'transparent' },
                icon: { fontSize: '8px' }
              }}
            />
          </Link>

          {/* Resources link (no dropdown) */}
          <Link
            className={navLinkStyle}
            href="/resources"
            onClick={(e) => {
              e.preventDefault();
              console.log('Resources clicked');
            }}
          >
            Resources
          </Link>
        </Stack>
      </Stack>

      <Stack horizontal tokens={{ childrenGap: 15 }} verticalAlign="center">
        <SearchBox
          placeholder="Search"
          styles={{
            root: {
              width: 180,
              height: 32,
              fontSize: '13px'
            }
          }}
          iconProps={{ iconName: 'Search', styles: { root: { fontSize: '14px' } } }}
        />
        <Link className={navLinkStyle} href="/support">Support</Link>
        <Link className={navLinkStyle} href="/contact-sales">Contact Sales</Link>
        <IconButton
          iconProps={{ iconName: 'Contact' }}
          title="User Profile"
          menuProps={userMenuProps}
          styles={{
            root: {
              width: '32px',
              height: '32px'
            }
          }}
        />
      </Stack>
    </Stack>
  );
};

export default Topbar;