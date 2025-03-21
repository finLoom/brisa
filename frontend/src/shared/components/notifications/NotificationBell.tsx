// C:\Apps\Anto\brisa\frontend\src\shared\components\notifications\NotificationBell.tsx
import React, { useState } from 'react';
import { IconButton } from '@fluentui/react/lib/Button';
import { Panel } from '@fluentui/react/lib/Panel';
import { Text } from '@fluentui/react/lib/Text';
import { Stack } from '@fluentui/react/lib/Stack';

// Define the notification interface locally
interface Notification {
  id: string;
  title: string;
  message: string;
  read: boolean;
  createdAt: string;
}

// Mock data for notifications
const mockNotifications: Notification[] = [
  {
    id: '1',
    title: 'New invoice',
    message: 'Invoice #1234 has been created',
    read: false,
    createdAt: new Date().toISOString()
  },
  {
    id: '2',
    title: 'Payment received',
    message: 'Payment for invoice #1001 has been received',
    read: true,
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString()
  }
];

export const NotificationBell: React.FC = () => {
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);

  const markAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(notification =>
        notification.id === id
          ? { ...notification, read: true }
          : notification
      )
    );
  };

  const unreadCount = notifications.filter((notif: Notification) => !notif.read).length;

  const openPanel = () => setIsPanelOpen(true);
  const closePanel = () => setIsPanelOpen(false);

  return (
    <>
      <IconButton
        iconProps={{
          iconName: 'Ringer',
          style: { position: 'relative' }
        }}
        onClick={openPanel}
        styles={{
          root: {
            position: 'relative'
          }
        }}
      >
        {unreadCount > 0 && (
          <span className="notification-badge">{unreadCount}</span>
        )}
      </IconButton>

      <Panel
        isOpen={isPanelOpen}
        onDismiss={closePanel}
        headerText="Notifications"
        closeButtonAriaLabel="Close"
      >
        <Stack tokens={{ childrenGap: 10 }}>
          {notifications.length === 0 ? (
            <Text>No notifications</Text>
          ) : (
            notifications.map((notification: Notification) => (
              <Stack
                key={notification.id}
                className={`notification-item ${!notification.read ? 'unread' : ''}`}
                onClick={() => markAsRead(notification.id)}
              >
                <Text variant="medium">{notification.title}</Text>
                <Text variant="small">{notification.message}</Text>
                <Text variant="small" className="notification-time">
                  {new Date(notification.createdAt).toLocaleString()}
                </Text>
              </Stack>
            ))
          )}
        </Stack>
      </Panel>
    </>
  );
};