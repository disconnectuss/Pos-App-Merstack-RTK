// API URL utility for handling different environments
export const getApiUrl = (endpoint) => {
  // Development environment - point to API server
  if (typeof window !== 'undefined') {
    // Check if we're in development (frontend on 5173, API on 3000)
    if (window.location.port === '5173') {
      return `http://localhost:3000/api${endpoint}`;
    }
    // Production - use same origin with /api prefix
    return `${window.location.origin}/api${endpoint}`;
  }
  
  // Server side rendering fallback
  const baseUrl = import.meta.env.VITE_SERVER_URL || window.location.origin;
  return `${baseUrl}/api${endpoint}`;
};

export default getApiUrl;
