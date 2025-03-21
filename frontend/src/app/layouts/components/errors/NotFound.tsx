// src/shared/components/errors/NotFound.tsx
import React from 'react';
import { Stack } from '@fluentui/react/lib/Stack';
import { Text } from '@fluentui/react/lib/Text';
import { PrimaryButton } from '@fluentui/react/lib/Button';
import { useNavigate } from 'react-router-dom';

const NotFound: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Stack
      horizontalAlign="center"
      verticalAlign="center"
      styles={{ root: { height: '100vh', textAlign: 'center' } }}
      tokens={{ childrenGap: 20 }}
    >
      <Text variant="xxLarge">404</Text>
      <Text variant="xLarge">Page Not Found</Text>
      <Text>The page you are looking for doesn't exist or has been moved.</Text>
      <PrimaryButton onClick={() => navigate('/')}>
        Return to Home
      </PrimaryButton>
    </Stack>
  );
};

export default NotFound;