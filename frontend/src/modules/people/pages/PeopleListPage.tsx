// frontend/src/modules/people/pages/PeopleListPage.tsx
import React, { useState, useEffect, useMemo } from 'react';

// Types
export enum PersonType {
  Employee = 'EMPLOYEE',
  Vendor = 'VENDOR',
  Client = 'CLIENT',
  Partner = 'PARTNER'
}

export enum PersonStatus {
  Active = 'ACTIVE',
  Inactive = 'INACTIVE',
  Pending = 'PENDING'
}

export interface Person {
  id: string;
  fullLegalName: string;
  type: PersonType;
  status: PersonStatus;
  email?: string;
  phone?: string;
  createdAt: Date;
  updatedAt: Date;
}

// Mock data generator
const generateMockPeople = (): Person[] => {
  const statuses = Object.values(PersonStatus);
  const types = Object.values(PersonType);

  return Array.from({ length: 50 }, (_, index) => ({
    id: `person_${index + 1}`,
    fullLegalName: `Person ${index + 1}`,
    type: types[Math.floor(Math.random() * types.length)],
    status: statuses[Math.floor(Math.random() * statuses.length)],
    email: `person${index + 1}@example.com`,
    createdAt: new Date(),
    updatedAt: new Date()
  }));
};

const PeopleListPage: React.FC = () => {
  // State management
  const [people] = useState<Person[]>(generateMockPeople());
  const [selectedItems, setSelectedItems] = useState<Person[]>([]);

  // Filtering and searching states
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<PersonStatus | 'ALL'>('ALL');
  const [typeFilter, setTypeFilter] = useState<PersonType | 'ALL'>('ALL');

  // Advanced filtering and search
  const filteredPeople = useMemo(() => {
    return people.filter(person => {
      // Search filter
      const matchesSearch = searchTerm.toLowerCase() === '' ||
        person.fullLegalName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        person.email?.toLowerCase().includes(searchTerm.toLowerCase());

      // Status filter
      const matchesStatus = statusFilter === 'ALL' || person.status === statusFilter;

      // Type filter
      const matchesType = typeFilter === 'ALL' || person.type === typeFilter;

      return matchesSearch && matchesStatus && matchesType;
    });
  }, [people, searchTerm, statusFilter, typeFilter]);

  // Handle row selection
  const handleRowSelect = (person: Person) => {
    setSelectedItems(current =>
      current.some(item => item.id === person.id)
        ? current.filter(item => item.id !== person.id)
        : [...current, person]
    );
  };

  // Bulk delete handler
  const handleBulkDelete = () => {
    console.log('Deleting', selectedItems.length, 'people');
    setSelectedItems([]);
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      {/* Filter and Search Toolbar */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: '20px',
        gap: '10px'
      }}>
        {/* Global Search Input */}
        <input
          type="text"
          placeholder="Search people..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            flex: 1,
            padding: '10px',
            borderRadius: '4px',
            border: '1px solid #ccc'
          }}
        />

        {/* Status Filter Dropdown */}
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value as PersonStatus | 'ALL')}
          style={{
            padding: '10px',
            borderRadius: '4px',
            border: '1px solid #ccc'
          }}
        >
          <option value="ALL">All Statuses</option>
          {Object.values(PersonStatus).map(status => (
            <option key={status} value={status}>{status}</option>
          ))}
        </select>

        {/* Type Filter Dropdown */}
        <select
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value as PersonType | 'ALL')}
          style={{
            padding: '10px',
            borderRadius: '4px',
            border: '1px solid #ccc'
          }}
        >
          <option value="ALL">All Types</option>
          {Object.values(PersonType).map(type => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>

        {/* Bulk Actions */}
        {selectedItems.length > 0 && (
          <button
            onClick={handleBulkDelete}
            style={{
              padding: '10px 15px',
              backgroundColor: '#d13438',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Delete {selectedItems.length} Selected
          </button>
        )}
      </div>

      {/* People Table */}
      <table style={{
        width: '100%',
        borderCollapse: 'collapse',
        border: '1px solid #ddd'
      }}>
        <thead>
          <tr style={{
            backgroundColor: '#f2f2f2',
            fontWeight: 'bold'
          }}>
            <th style={{
              padding: '12px',
              textAlign: 'left',
              borderBottom: '1px solid #ddd'
            }}>
              <input
                type="checkbox"
                checked={
                  selectedItems.length === filteredPeople.length &&
                  filteredPeople.length > 0
                }
                onChange={() => {
                  setSelectedItems(
                    selectedItems.length === filteredPeople.length
                      ? []
                      : [...filteredPeople]
                  );
                }}
              />
            </th>
            <th style={{
              padding: '12px',
              textAlign: 'left',
              borderBottom: '1px solid #ddd'
            }}>Name</th>
            <th style={{
              padding: '12px',
              textAlign: 'left',
              borderBottom: '1px solid #ddd'
            }}>Email</th>
            <th style={{
              padding: '12px',
              textAlign: 'left',
              borderBottom: '1px solid #ddd'
            }}>Type</th>
            <th style={{
              padding: '12px',
              textAlign: 'left',
              borderBottom: '1px solid #ddd'
            }}>Status</th>
            <th style={{
              padding: '12px',
              textAlign: 'left',
              borderBottom: '1px solid #ddd'
            }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredPeople.map(person => (
            <tr key={person.id} style={{
              borderBottom: '1px solid #ddd',
              backgroundColor: selectedItems.some(item => item.id === person.id)
                ? '#f0f0f0'
                : 'white'
            }}>
              <td style={{ padding: '12px' }}>
                <input
                  type="checkbox"
                  checked={selectedItems.some(item => item.id === person.id)}
                  onChange={() => handleRowSelect(person)}
                />
              </td>
              <td style={{ padding: '12px' }}>{person.fullLegalName}</td>
              <td style={{ padding: '12px' }}>{person.email}</td>
              <td style={{
                padding: '12px',
                fontWeight: 'bold',
                color: '#555'
              }}>
                {person.type}
              </td>
              <td style={{
                padding: '12px',
                fontWeight: 'bold',
                color:
                  person.status === PersonStatus.Active
                    ? 'green'
                    : person.status === PersonStatus.Inactive
                      ? 'red'
                      : 'orange'
              }}>
                {person.status}
              </td>
              <td style={{ padding: '12px' }}>
                <button
                  onClick={() => console.log(`Edit ${person.id}`)}
                  style={{
                    padding: '6px 12px',
                    backgroundColor: '#0078d4',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer'
                  }}
                >
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Results Summary */}
      <div style={{
        marginTop: '10px',
        color: '#666',
        display: 'flex',
        justifyContent: 'space-between'
      }}>
        <span>
          Showing {filteredPeople.length} of {people.length} people
        </span>
        {selectedItems.length > 0 && (
          <span>
            {selectedItems.length} people selected
          </span>
        )}
      </div>
    </div>
  );
};

export default PeopleListPage;