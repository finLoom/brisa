// frontend/src/routes/peopleRoutes.tsx
import React from 'react';
import { Route, Routes } from 'react-router-dom';

import {
  PeopleListPage,
  PersonDetailPage,
  PersonFormPage
} from '../modules/people';

export const PeopleRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<PeopleListPage />} />
      <Route path="/:id" element={<PersonDetailPage />} />
      <Route path="/new" element={<PersonFormPage />} />
      <Route path="/:id/edit" element={<PersonFormPage />} />
    </Routes>
  );
};

export default PeopleRoutes;