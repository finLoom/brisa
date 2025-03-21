// C:\Apps\Anto\brisa\frontend\src\shared\services\api.ts
import axios from 'axios';

const baseURL = process.env.REACT_APP_API_URL || 'http://localhost:8080/api';

export const api = axios.create({
baseURL,
headers: {
'Content-Type': 'application/json'
}
});

// Add request interceptor to include auth token
api.interceptors.request.use(config => {
  // Check for mock auth first
  if (process.env.REACT_APP_MOCK_AUTH === 'true') {
    const mockToken = localStorage.getItem('brisa-mock-token');
    if (mockToken) {
      config.headers.Authorization = `Bearer ${mockToken}`;
    }
    return config;
  }

  // Regular auth flow
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// Add response interceptor for error handling
api.interceptors.response.use(
  response => response,
  error => {
    // Mock mode: if API endpoints don't exist, return mock data for development
    if (process.env.REACT_APP_MOCK_AUTH === 'true' && error.response?.status === 404) {
      console.warn('API endpoint not found, using mock data');
      // You could implement mock responses here based on the request URL
      // This is a simplified example
      return Promise.reject(error);
    }

    return Promise.reject(error);
  }
);