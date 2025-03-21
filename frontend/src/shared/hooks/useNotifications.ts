// C:\Apps\Anto\brisa\frontend\src\shared\hooks\useNotifications.ts
import { useState } from 'react';

// Define the notification interface
export interface Notification {
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

export const useNotifications = () => {
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

const addNotification = (notification: Omit<Notification, 'id' | 'read' | 'createdAt'>) => {
const newNotification: Notification = {
...notification,
id: Date.now().toString(),
      read: false,
      createdAt: new Date().toISOString()
    };

    setNotifications(prev => [newNotification, ...prev]);
  };

  const clearNotifications = () => {
    setNotifications([]);
  };

  return {
    notifications,
    markAsRead,
    addNotification,
    clearNotifications
  };
};