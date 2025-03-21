// C:\Apps\Anto\brisa\frontend\src\app\layouts\components\Layout.tsx
import React, { ReactNode } from 'react';
import { Stack } from '@fluentui/react';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <Stack grow>
      {children}
    </Stack>
  );
};

export default Layout;