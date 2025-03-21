// C:\Apps\Anto\brisa\frontend\src\shared\components\layout\Topbar.tsx
import React from 'react';
import { Stack, Text } from '@fluentui/react';
import { UserIcon } from './UserIcon';

const Topbar: React.FC = () => {
  return (
    <Stack horizontal horizontalAlign="space-between" padding="10px 20px" styles={{ root: { borderBottom: '1px solid #eee' } }}>
      <Stack horizontal tokens={{ childrenGap: 20 }}>
        {/* Logo placeholder */}
        <Stack
          styles={{
            root: {
              backgroundColor: '#0078d4',
              height: 30,
              padding: '0 10px',
              borderRadius: 4,
              justifyContent: 'center'
            }
          }}
        >
          <Text styles={{ root: { color: 'white', fontWeight: 600 } }}>BRISA</Text>
        </Stack>

        <Stack horizontal verticalAlign="center" tokens={{ childrenGap: 10 }}>
          <Text>People <span style={{ fontSize: 12 }}>▼</span></Text>
          <Text>HR <span style={{ fontSize: 12 }}>▼</span></Text>
          <Text>Finance <span style={{ fontSize: 12 }}>▼</span></Text>
          <Text>Reports <span style={{ fontSize: 12 }}>▼</span></Text>
        </Stack>
      </Stack>
      <Stack horizontal verticalAlign="center" tokens={{ childrenGap: 20 }}>
        <Text>Search</Text>
        <UserIcon />
        <Text styles={{ root: { color: 'blue', textDecoration: 'underline' } }}>Sign in</Text>
      </Stack>
    </Stack>
  );
};

export default Topbar;