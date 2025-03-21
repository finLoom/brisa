// frontend/src/modules/people/components/PersonForm.tsx
import React, { useState, useEffect } from 'react';
import {
  Button,
  Input,
  Dropdown,
  Label,
  Option,
  Field,
  Card,
  Divider,
  Title2,
  CardHeader,
  useId,
  mergeClasses
} from '@fluentui/react-components';
import {
  ArrowLeftRegular,
  SaveRegular,
  DeleteRegular,
  Person24Regular,
  Building24Regular
} from '@fluentui/react-icons';

import { Person, PersonFormData, PersonType, PersonEntityType, PersonStatus } from '../types';
import { usePersonFormStyles } from './styles/personFormStyles';

interface PersonFormProps {
  initialData?: PersonFormData;
  onCancel: () => void;
  onSubmit: (data: PersonFormData) => void;
  isEdit?: boolean;
  isLoading?: boolean;
}

const PersonForm: React.FC<PersonFormProps> = ({
  initialData,
  onCancel,
  onSubmit,
  isEdit = false,
  isLoading = false
}) => {
  const styles = usePersonFormStyles();
  const baseId = useId('person-form');

  // Default form data
  const defaultFormData: PersonFormData = {
    type: PersonType.INDIVIDUAL,
    status: PersonStatus.ACTIVE,
    email: '',
    companyId: '1', // Default company ID
  };

  // Form state
  const [formData, setFormData] = useState<PersonFormData>(defaultFormData);

  // Load initial data if provided
  useEffect(() => {
    if (initialData) {
      setFormData(prev => ({
        ...prev,
        ...initialData
      }));
    }
  }, [initialData]);

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  // Handle form field changes
  const handleFieldChange = <K extends keyof PersonFormData>(
    field: K,
    value: PersonFormData[K]
  ) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Handle type selection
  const handleTypeSelect = (type: PersonType) => {
    setFormData(prev => ({
      ...prev,
      type,
      // Clear type-specific fields
      firstName: type === PersonType.INDIVIDUAL ? prev.firstName : undefined,
      lastName: type === PersonType.INDIVIDUAL ? prev.lastName : undefined,
      businessName: type === PersonType.BUSINESS ? prev.businessName : undefined,
      primaryContact: type === PersonType.BUSINESS ? prev.primaryContact : undefined,
    }));
  };

  return (
    <div className={styles.container}>
      <Card className={styles.formCard}>
        <form onSubmit={handleSubmit}>
          <div className={styles.header}>
            <Title2>
              {isEdit ? 'Edit Person' : 'Add New Person'}
            </Title2>
            <div className={styles.actions}>
              <Button
                appearance="subtle"
                icon={<ArrowLeftRegular />}
                onClick={onCancel}
              >
                Cancel
              </Button>
              {isEdit && (
                <Button
                  appearance="subtle"
                  icon={<DeleteRegular />}
                  onClick={onCancel} // This would be onDelete in a real app
                >
                  Delete
                </Button>
              )}
              <Button
                appearance="primary"
                icon={<SaveRegular />}
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? 'Saving...' : 'Save'}
              </Button>
            </div>
          </div>

          {/* Type Selection */}
          <div className={styles.formSection}>
            <Label required>Type</Label>
            <div className={styles.typeSelector}>
              <div
                className={mergeClasses(
                  styles.typeOption,
                  formData.type === PersonType.INDIVIDUAL ? styles.typeOptionSelected : ''
                )}
                onClick={() => handleTypeSelect(PersonType.INDIVIDUAL)}
              >
                <Person24Regular className={styles.typeIcon} />
                <Label>Individual</Label>
              </div>
              <div
                className={mergeClasses(
                  styles.typeOption,
                  formData.type === PersonType.BUSINESS ? styles.typeOptionSelected : ''
                )}
                onClick={() => handleTypeSelect(PersonType.BUSINESS)}
              >
                <Building24Regular className={styles.typeIcon} />
                <Label>Business</Label>
              </div>
            </div>
          </div>

          {/* Basic Information */}
          <Card className={styles.formSection}>
            <CardHeader>
              <Label size="large">Basic Information</Label>
            </CardHeader>
            <Divider />
            <div className={styles.formGrid}>
              {formData.type === PersonType.INDIVIDUAL ? (
                // Individual fields
                <>
                  <Field
                    label="First Name"
                    required
                  >
                    <Input
                      id={`${baseId}-firstName`}
                      value={formData.firstName || ''}
                      onChange={(e) => handleFieldChange('firstName', e.target.value)}
                    />
                  </Field>
                  <Field
                    label="Last Name"
                    required
                  >
                    <Input
                      id={`${baseId}-lastName`}
                      value={formData.lastName || ''}
                      onChange={(e) => handleFieldChange('lastName', e.target.value)}
                    />
                  </Field>
                </>
              ) : (
                // Business fields
                <>
                  <Field
                    label="Business Name"
                    required
                  >
                    <Input
                      id={`${baseId}-businessName`}
                      value={formData.businessName || ''}
                      onChange={(e) => handleFieldChange('businessName', e.target.value)}
                    />
                  </Field>
                  <Field
                    label="Primary Contact"
                  >
                    <Input
                      id={`${baseId}-primaryContact`}
                      value={formData.primaryContact || ''}
                      onChange={(e) => handleFieldChange('primaryContact', e.target.value)}
                    />
                  </Field>
                </>
              )}

              <Field
                label="Email"
                required
              >
                <Input
                  id={`${baseId}-email`}
                  value={formData.email}
                  onChange={(e) => handleFieldChange('email', e.target.value)}
                  type="email"
                />
              </Field>
              <Field
                label="Phone"
              >
                <Input
                  id={`${baseId}-phone`}
                  value={formData.phone || ''}
                  onChange={(e) => handleFieldChange('phone', e.target.value)}
                  type="tel"
                />
              </Field>
            </div>
          </Card>

          {/* Additional Information */}
          <Card className={styles.formSection}>
            <CardHeader>
              <Label size="large">Additional Information</Label>
            </CardHeader>
            <Divider />
            <div className={styles.formGrid}>
              <Field
                label="Entity Type"
              >
                <Dropdown
                  id={`${baseId}-entityType`}
                  value={formData.entityType || ''}
                  onOptionSelect={(e, data) => handleFieldChange('entityType', data.optionValue as PersonEntityType)}
                >
                  <Option value="">Select Entity Type</Option>
                  {formData.type === PersonType.INDIVIDUAL ? (
                    <>
                      <Option value={PersonEntityType.EMPLOYEE}>Employee</Option>
                      <Option value={PersonEntityType.VENDOR}>Vendor</Option>
                      <Option value={PersonEntityType.CLIENT}>Client</Option>
                      <Option value={PersonEntityType.PARTNER}>Partner</Option>
                    </>
                  ) : (
                    <>
                      <Option value={PersonEntityType.CORPORATION}>Corporation</Option>
                      <Option value={PersonEntityType.LLC}>LLC</Option>
                      <Option value={PersonEntityType.PARTNERSHIP}>Partnership</Option>
                      <Option value={PersonEntityType.SOLE_PROPRIETOR}>Sole Proprietor</Option>
                      <Option value={PersonEntityType.OTHER}>Other</Option>
                    </>
                  )}
                </Dropdown>
              </Field>
              <Field
                label="Status"
                required
              >
                <Dropdown
                  id={`${baseId}-status`}
                  value={formData.status}
                  onOptionSelect={(e, data) => handleFieldChange('status', data.optionValue as PersonStatus)}
                >
                  <Option value={PersonStatus.ACTIVE}>Active</Option>
                  <Option value={PersonStatus.INACTIVE}>Inactive</Option>
                </Dropdown>
              </Field>
              <Field
                label="Department"
              >
                <Input
                  id={`${baseId}-department`}
                  value={formData.department || ''}
                  onChange={(e) => handleFieldChange('department', e.target.value)}
                />
              </Field>
              <Field
                label="Job Title"
              >
                <Input
                  id={`${baseId}-jobTitle`}
                  value={formData.jobTitle || ''}
                  onChange={(e) => handleFieldChange('jobTitle', e.target.value)}
                />
              </Field>
              <Field
                label="Onboard Date"
              >
                <Input
                  id={`${baseId}-onboardDate`}
                  value={formData.onboardDate ? new Date(formData.onboardDate).toISOString().split('T')[0] : ''}
                  onChange={(e) => handleFieldChange('onboardDate', e.target.value)}
                  type="date"
                />
              </Field>
              {formData.status === PersonStatus.INACTIVE && (
                <Field
                  label="Termination Date"
                >
                  <Input
                    id={`${baseId}-terminationDate`}
                    value={formData.terminationDate ? new Date(formData.terminationDate).toISOString().split('T')[0] : ''}
                    onChange={(e) => handleFieldChange('terminationDate', e.target.value)}
                    type="date"
                  />
                </Field>
              )}
            </div>
          </Card>

          {/* Form Actions */}
          <div className={styles.footer}>
            <Button appearance="secondary" onClick={onCancel}>
              Cancel
            </Button>
            <Button appearance="primary" type="submit" disabled={isLoading}>
              {isLoading ? 'Saving...' : (isEdit ? 'Update' : 'Create')}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default PersonForm;