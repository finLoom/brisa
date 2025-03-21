// C:\Apps\Anto\brisa\frontend\src\shared\services\authService.ts
import { User } from '../types/user.types';
import { api } from './api';

export const authService = {
async login(email: string, password: string): Promise<User> {
    const response = await api.post('/auth/login', { email, password });
    localStorage.setItem('token', response.data.token);
    return response.data.user;
  },

  async getCurrentUser(): Promise<User> {
    const response = await api.get('/auth/me');
    return response.data;
  },

  logout(): void {
    localStorage.removeItem('token');
  }
};