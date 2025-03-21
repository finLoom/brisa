// src/shared/components/loaders/LoadingSpinner.tsx
import React from 'react';
import { Spinner, SpinnerSize } from '@fluentui/react/lib/Spinner';
import { Stack } from '@fluentui/react/lib/Stack';

interface LoadingSpinnerProps {
  label?: string;
  size?: SpinnerSize;
  fullPage?: boolean;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  label = 'Loading...',
  size = SpinnerSize.large,
  fullPage = false
}) => {
  if (fullPage) {
    return (
      <Stack
        horizontalAlign="center"
        verticalAlign="center"
        styles={{ root: { height: '100vh' } }}
      >
        <Spinner size={size} label={label} />
      </Stack>
    );
  }

  return <Spinner size={size} label={label} />;
};