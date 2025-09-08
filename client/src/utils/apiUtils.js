// API URL utility for handling different environments
export const getApiUrl = (endpoint) => {
  const baseUrl = import.meta.env.VITE_SERVER_URL;
  
  // Check if we're in production (Netlify)
  const isNetlify = baseUrl.includes('netlify.app');
  
  if (isNetlify) {
    // For Netlify, don't add /api prefix as it's already in the function path
    return `${baseUrl}${endpoint}`;
  } else {
    // For local development, add /api prefix
    return `${baseUrl}/api${endpoint}`;
  }
};

export default getApiUrl;
