// C:\Apps\Anto\brisa\frontend\src\app\routes\AppRoutes.tsx
import React, { Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { MainLayout } from '../layouts/MainLayout';
import { Spinner, SpinnerSize } from '@fluentui/react/lib/Spinner';
import { Stack } from '@fluentui/react/lib/Stack';
import PeopleRoutes from '../../routes/peopleRoutes';

// Simple loading fallback
const LoadingFallback = () => (
  <Stack horizontalAlign="center" verticalAlign="center" styles={{ root: { height: '100vh' } }}>
    <Spinner size={SpinnerSize.large} label="Loading..." />
  </Stack>
);

// Placeholder component for dashboard
const Dashboard = () => <div>Dashboard Page</div>;

// Placeholder component for login
const Login = () => <div>Login Page</div>;

// Placeholder component for 404
const NotFound = () => <div>Page Not Found</div>;

// Placeholder for module pages
const ModulePlaceholder = () => <div>Module Page Placeholder</div>;

export const AppRoutes: React.FC = () => {
  return (
    <BrowserRouter>
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
          </Route>

          {/* 404 route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};