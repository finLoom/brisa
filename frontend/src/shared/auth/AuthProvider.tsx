// C:\Apps\Anto\brisa\frontend\src\shared\auth\AuthProvider.tsx
import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { User } from '../types/user.types';
import { authService } from '../services/authService';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  error: string | null;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  login: async () => {},
  logout: () => {},
  error: null
});

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const isMockAuth = process.env.REACT_APP_MOCK_AUTH === 'true';

  useEffect(() => {
    const initAuth = async () => {
      try {
        if (isMockAuth) {
          // Check if we have a mock user in localStorage
          const mockUserJson = localStorage.getItem('brisa-mock-user');
          if (mockUserJson) {
            const mockUser = JSON.parse(mockUserJson);
            setUser(mockUser);
          }
          setIsLoading(false);
          return;
        }

        const currentUser = await authService.getCurrentUser();
        setUser(currentUser);
      } catch (err) {
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    initAuth();
  }, [isMockAuth]);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);

    try {
      if (isMockAuth) {
        // Implement mock login for development
        if (email === 'admin' && password === 'admin') {
          const mockUser: User = {
            id: '1',
            name: 'Admin User',
            email: 'admin@brisa.com',
            status: 'available',
            roles: [
              {
                id: '1',
                name: 'Administrator',
                companyId: '1',
                permissions: ['*'] // All permissions
              }
            ],
            preferences: {
              language: 'en',
              theme: 'light',
              notifications: true
            },
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          };

          localStorage.setItem('brisa-mock-user', JSON.stringify(mockUser));
          localStorage.setItem('brisa-mock-token', 'mock-jwt-token');
          setUser(mockUser);
          setIsLoading(false);
          return;
        } else {
          throw new Error('Invalid credentials');
        }
      }

      const user = await authService.login(email, password);
      setUser(user);
    } catch (err) {
      setError((err as Error).message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    if (isMockAuth) {
      localStorage.removeItem('brisa-mock-user');
      localStorage.removeItem('brisa-mock-token');
    } else {
      authService.logout();
    }
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        logout,
        error
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};