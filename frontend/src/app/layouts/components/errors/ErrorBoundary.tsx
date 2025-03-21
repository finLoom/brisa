// src/shared/components/errors/ErrorBoundary.tsx
import React, { Component, ErrorInfo, ReactNode } from 'react';
import { Stack } from '@fluentui/react/lib/Stack';
import { Text } from '@fluentui/react/lib/Text';
import { PrimaryButton } from '@fluentui/react/lib/Button';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Error caught by ErrorBoundary:', error, errorInfo);
    // You can also send this to an error reporting service
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: undefined });
    window.location.href = '/';
  };

  public render() {
    if (this.state.hasError) {
      return (
        <Stack
          horizontalAlign="center"
          verticalAlign="center"
          styles={{ root: { height: '100vh', textAlign: 'center' } }}
          tokens={{ childrenGap: 20 }}
        >
          <Text variant="xxLarge">Something went wrong</Text>
          <Text>We're sorry, but an error occurred while rendering this page.</Text>
          {this.state.error && (
            <Text variant="medium">Error: {this.state.error.message}</Text>
          )}
          <PrimaryButton onClick={this.handleReset}>
            Return to Home
          </PrimaryButton>
        </Stack>
      );
    }

    return this.props.children;
  }
}