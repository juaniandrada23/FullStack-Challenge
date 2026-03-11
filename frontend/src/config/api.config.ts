export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_URL || 'http://localhost:3000/',
  TIMEOUT: 10000,
  HEADERS: {
    'Content-Type': 'application/json',
  },
};
