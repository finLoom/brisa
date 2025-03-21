// C:\Apps\Anto\brisa\frontend\src\app\providers\AppProvider.tsx
import React, { ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';

interface AppProviderProps {
  children: ReactNode;
}

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

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
};