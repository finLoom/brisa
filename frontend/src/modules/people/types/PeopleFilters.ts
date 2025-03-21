// frontend/src/modules/people/types/PeopleFilters.ts
import { PersonType, PersonStatus, PersonEntityType } from './Person';

export interface PeopleFilters {
search?: string;
type?: Array<PersonType | string>;
status?: Array<PersonStatus | string>;
entityType?: PersonEntityType | string;
department?: string;
managerIdFilter?: string;
createdAfter?: string;
createdBefore?: string;
onboardDateAfter?: string;
onboardDateBefore?: string;
}