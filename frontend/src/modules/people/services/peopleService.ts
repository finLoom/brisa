// frontend/src/modules/people/services/peopleService.ts
import { Person, PersonType, PersonStatus, PersonEntityType, PersonFormData } from '../types';

// Helper to generate random dates
const randomDate = (start: Date, end: Date): string => {
const date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
return date.toISOString();
};

// Helper to calculate derived fields
const calculateDerivedFields = (person: Partial<Person>): Partial<Person> => {
  if (person.type === PersonType.INDIVIDUAL && person.firstName && person.lastName) {
    person.fullLegalName = `${person.lastName.toUpperCase()}, ${person.firstName}`;
    person.fullPayrollName = `${person.firstName} ${person.lastName}`;
  } else if (person.type === PersonType.BUSINESS && person.businessName) {
    person.fullLegalName = person.businessName;
    person.fullPayrollName = person.businessName;
  }
  return person;
};

// Mock data generation
const generateMockPeople = (count: number = 100): Person[] => {
  const people: Person[] = [];

  // Sample data
  const firstNames = ['John', 'Jane', 'Michael', 'Emily', 'Robert', 'Sarah', 'David', 'Lisa'];
  const lastNames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Miller', 'Davis', 'Garcia'];
  const businessNames = [
    'Acme Corporation', 'Globex Industries', 'Initech LLC', 'Stark Enterprises',
    'Wayne Enterprises', 'Umbrella Corp', 'Oscorp Industries', 'Cyberdyne Systems'
  ];

  for (let i = 1; i <= count; i++) {
    // Determine if this is an individual or business
    const isIndividual = Math.random() > 0.3;
    const type = isIndividual ? PersonType.INDIVIDUAL : PersonType.BUSINESS;

    // Generate random entity type
    const entityTypes: PersonEntityType[] = [
      PersonEntityType.EMPLOYEE,
      PersonEntityType.CLIENT,
      PersonEntityType.VENDOR,
      PersonEntityType.PARTNER
    ];
    const entityType = entityTypes[Math.floor(Math.random() * entityTypes.length)];

    // Generate random status
    const status: PersonStatus = Math.random() > 0.2 ? PersonStatus.ACTIVE : PersonStatus.INACTIVE;

    // Generate random dates
    const createdAt = randomDate(new Date(2022, 0, 1), new Date(2025, 2, 1));
    const updatedAt = randomDate(new Date(createdAt), new Date(2025, 2, 1));
    const onboardDate = randomDate(new Date(2020, 0, 1), new Date(createdAt));

    // Base person object
    const person: Partial<Person> = {
      id: String(i),
      type: type,
      entityType: entityType,
      status: status,
      companyId: String(Math.floor(Math.random() * 3) + 1),
      onboardDate,
      createdAt,
      updatedAt,
      email: Math.random().toString(36).substring(2, 15) + '@example.com',
      phone: Math.random() > 0.7 ? `555-${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 9000) + 1000}` : undefined,
      department: Math.random() > 0.5 ? ['Engineering', 'Sales', 'Marketing', 'Finance', 'HR'][Math.floor(Math.random() * 5)] : undefined,
      jobTitle: Math.random() > 0.5 ? ['Manager', 'Director', 'Specialist', 'Analyst', 'Associate'][Math.floor(Math.random() * 5)] : undefined,
    };

    // Add type-specific fields
    if (type === PersonType.INDIVIDUAL) {
      person.firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
      person.lastName = lastNames[Math.floor(Math.random() * lastNames.length)];

      // Add termination date for some inactive individuals
      if (status === PersonStatus.INACTIVE) {
        person.terminationDate = randomDate(new Date(onboardDate), new Date(2025, 2, 1));
      }
    } else { // BUSINESS
      person.businessName = businessNames[Math.floor(Math.random() * businessNames.length)];
      person.primaryContact = `${firstNames[Math.floor(Math.random() * firstNames.length)]} ${
        lastNames[Math.floor(Math.random() * lastNames.length)]}`;

      // Add termination date for some inactive businesses
      if (status === PersonStatus.INACTIVE) {
        person.terminationDate = randomDate(new Date(onboardDate), new Date(2025, 2, 1));
      }
    }

    // Calculate derived fields
    const calculatedPerson = calculateDerivedFields(person);

    // Add to people array
    people.push(calculatedPerson as Person);
  }

  return people;
};

// Mock person data for API simulation
const mockPeople = generateMockPeople(50);

// PeopleService class
class PeopleService {
  // Get all people
  async getPeople(): Promise<Person[]> {
    await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API delay
    return mockPeople;
  }

  // Get person by ID
  async getPersonById(id: string): Promise<Person> {
    await new Promise(resolve => setTimeout(resolve, 300)); // Simulate API delay

    const person = mockPeople.find(p => p.id === id);
    if (!person) {
      throw new Error(`Person with ID ${id} not found`);
    }

    return person;
  }

  // Create a new person
  async createPerson(data: PersonFormData): Promise<Person> {
    await new Promise(resolve => setTimeout(resolve, 800)); // Simulate API delay

    // Generate a new ID
    const newId = String(Math.max(...mockPeople.map(p => parseInt(p.id))) + 1);

    // Set timestamps
    const now = new Date().toISOString();

    // Prepare person object
    const personData: Partial<Person> = {
      ...data,
      id: newId,
      createdAt: now,
      updatedAt: now
    };

    // Calculate derived fields
    const newPerson = calculateDerivedFields(personData);

    // Add to mock data
    mockPeople.push(newPerson as Person);

    return newPerson as Person;
  }

  // Update an existing person
  async updatePerson(id: string, data: Partial<PersonFormData>): Promise<Person> {
    await new Promise(resolve => setTimeout(resolve, 600)); // Simulate API delay

    // Find existing person
    const personIndex = mockPeople.findIndex(p => p.id === id);
    if (personIndex === -1) {
      throw new Error(`Person with ID ${id} not found`);
    }

    // Update timestamp
    const now = new Date().toISOString();

    // Prepare updated person object
    const updatedPersonData: Partial<Person> = {
      ...mockPeople[personIndex],
      ...data,
      updatedAt: now
    };

    // Calculate derived fields
    const updatedPerson = calculateDerivedFields(updatedPersonData);

    // Update in mock data
    mockPeople[personIndex] = updatedPerson as Person;

    return updatedPerson as Person;
  }

  // Delete a person
  async deletePerson(id: string): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, 400)); // Simulate API delay

    // Find person index
    const personIndex = mockPeople.findIndex(p => p.id === id);
    if (personIndex === -1) {
      throw new Error(`Person with ID ${id} not found`);
    }

    // Remove from mock data
    mockPeople.splice(personIndex, 1);
  }
}

export const peopleService = new PeopleService();