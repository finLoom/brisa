// C:\Apps\Anto\brisa\frontend\src\app\layouts\MainLayout.tsx
import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Topbar from './components/Topbar';
import Sidebar from './components/Sidebar';
import { mergeStyles } from '@fluentui/react/lib/Styling';

// Define the props interface if it's not already defined in Topbar.tsx
interface TopbarProps {
  isSidebarCollapsed: boolean;
  onToggleSidebar: () => void;
}

const mainContentStyles = (collapsed: boolean) => mergeStyles({
  marginLeft: collapsed ? '48px' : '250px',
  marginTop: '48px',
  padding: '20px',
  transition: 'margin-left 0.2s ease-in-out',
  height: 'calc(100vh - 48px)',
  overflow: 'auto'
});

export const MainLayout: React.FC = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const handleToggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <Topbar
        isSidebarCollapsed={isSidebarCollapsed}
        onToggleSidebar={handleToggleSidebar}
      />
      <Sidebar collapsed={isSidebarCollapsed} />
      <main className={mainContentStyles(isSidebarCollapsed)}>
        <Outlet />
      </main>
    </div>
  );
};