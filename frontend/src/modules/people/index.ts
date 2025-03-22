// frontend/src/modules/people/index.ts

// Export pages
export { default as PeopleListPage } from './pages/PeopleListPage';
export { default as PersonDetailPage } from './pages/PersonDetailPage';
export { default as PersonFormPage } from './pages/PersonFormPage';

// Export components
export { default as PeopleTable } from './components/PeopleTable';
export { default as PeopleFilters } from './components/PeopleFilters';
export { default as PersonDetail } from './components/PersonDetail';
export { default as PersonForm } from './components/PersonForm';

// Export hooks
export { usePeopleList } from './hooks/usePeopleList';
export { usePersonDetails } from './hooks/usePersonDetails';

// Export services
export { peopleService } from './services/peopleService';

// Export types
export * from './types';