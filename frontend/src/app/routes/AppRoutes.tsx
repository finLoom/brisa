// frontend/src/app/routes/AppRoutes.tsx
import React, { Suspense } from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from 'react-router-dom';
import { Spinner } from '@fluentui/react-components';
import { MainLayout } from '../layouts/MainLayout';
import PeopleRoutes from '../../routes/peopleRoutes';
import DataGridPage from '../../shared/components/data/agGrid/DataGridPage';

// Simple loading fallback
const LoadingFallback = () => (
  <div style={{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh'
  }}>
    <Spinner label="Loading..." />
  </div>
);

// Placeholder components
const Dashboard = () => <div>Dashboard Page</div>;
const Login = () => <div>Login Page</div>;
const NotFound = () => <div>Page Not Found</div>;
const ModulePlaceholder = () => <div>Module Page Placeholder</div>;

export const AppRoutes: React.FC = () => {
  return (
    <BrowserRouter
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true
      }}
    >
      <Suspense fallback={<LoadingFallback />}>
        <Routes>
          {/* Auth routes */}
          <Route path="/login" element={<Login />} />

          {/* Protected routes with MainLayout */}
          <Route element={<MainLayout />}>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/people/*" element={<PeopleRoutes />} />
            <Route path="/hr/*" element={<ModulePlaceholder />} />
            <Route path="/finance/*" element={<ModulePlaceholder />} />
            <Route path="/data-grid" element={<DataGridPage />} />
          </Route>

          {/* 404 route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};