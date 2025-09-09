// API URL utility for handling different environments
export const getApiUrl = (endpoint) => {
  const baseUrl = import.meta.env.VITE_SERVER_URL;
  
  // Check if we're in production (Vercel)
  const isVercel = baseUrl.includes('vercel.app');
  
  if (isVercel) {
    // For Vercel serverless functions - endpoint already includes /api
    return `${baseUrl}${endpoint}`;
  } else {
    // For local development, add /api prefix
    return `${baseUrl}/api${endpoint}`;
  }
};

export default getApiUrl;
