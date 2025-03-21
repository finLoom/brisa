// C:\Apps\Anto\brisa\frontend\src\shared\auth\pages\Login.tsx
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Stack,
  TextField,
  PrimaryButton,
  Text,
  Link,
  MessageBar,
  MessageBarType
} from '@fluentui/react';
import { useAuth } from '../../hooks/useAuth';
import { Card } from '@fluentui/react-components';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, isLoading, error } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const from = (location.state as any)?.from?.pathname || '/';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await login(email, password);
      navigate(from, { replace: true });
    } catch (err) {
      // Error is already handled in the auth provider
    }
  };

  return (
    <Stack
      horizontalAlign="center"
      verticalAlign="center"
      styles={{ root: { height: '100vh', backgroundColor: '#f3f2f1' } }}
    >
      <Card>
        <Stack
          horizontalAlign="center"
          tokens={{ childrenGap: 20, padding: 24 }}
          styles={{ root: { width: 400 } }}
        >
          {/* Logo placeholder */}
          <Stack
            styles={{
              root: {
                backgroundColor: '#0078d4',
                color: 'white',
                padding: '10px 20px',
                borderRadius: 4,
                height: 50,
                justifyContent: 'center'
              }
            }}
          >
            <Text variant="xLarge" styles={{ root: { color: 'white', fontWeight: 600 } }}>BRISA</Text>
          </Stack>

          <Text variant="xLarge">Sign in to Brisa</Text>

          {error && (
            <MessageBar
              messageBarType={MessageBarType.error}
              isMultiline={false}
              dismissButtonAriaLabel="Close"
            >
              {error}
            </MessageBar>
          )}

          <form onSubmit={handleSubmit} style={{ width: '100%' }}>
            <Stack tokens={{ childrenGap: 15 }}>
              <TextField
                label="Email"
                type="email"
                value={email}
                onChange={(_, newValue) => setEmail(newValue || '')}
                required
                autoFocus
              />

              <TextField
                label="Password"
                type="password"
                value={password}
                onChange={(_, newValue) => setPassword(newValue || '')}
                required
                canRevealPassword
              />

              <Link href="/forgot-password">Forgot password?</Link>

              <PrimaryButton
                type="submit"
                text="Sign in"
                disabled={isLoading}
              />
            </Stack>
          </form>
        </Stack>
      </Card>
    </Stack>
  );
};

export default Login;