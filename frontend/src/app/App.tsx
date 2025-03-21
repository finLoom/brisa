// C:\Apps\Anto\brisa\frontend\src\app\App.tsx
import React from 'react';
import { Stack } from '@fluentui/react/lib/Stack';
import { AppRoutes } from './routes/AppRoutes';
import { AuthProvider } from '../shared/auth/AuthProvider';
import { CompanyContextProvider } from '../shared/context/CompanyContextProvider';
import { ThemeProvider } from '../shared/theme/ThemeProvider';
import { QueryClient, QueryClientProvider } from 'react-query';

// Create a client for React Query
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <AuthProvider>
          <CompanyContextProvider>
            <Stack className="app-container">
              <AppRoutes />
            </Stack>
          </CompanyContextProvider>
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;