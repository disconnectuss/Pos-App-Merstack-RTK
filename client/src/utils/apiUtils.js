// API URL utility for handling different environments
export const getApiUrl = (endpoint) => {
  // Always use same domain in production
  if (typeof window !== 'undefined') {
    // Browser environment - use same origin
    return `${window.location.origin}${endpoint}`;
  }
  
  // Server side rendering fallback
  const baseUrl = import.meta.env.VITE_SERVER_URL || '';
  return `${baseUrl}${endpoint}`;
};

export default getApiUrl;
