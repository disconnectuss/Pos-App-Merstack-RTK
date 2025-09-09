export default function handler(req, res) {
  // CORS headers - specific domains
  const allowedOrigins = [
    'https://pos-app-merstack-rhg7xf1oh-disconnectuss-projects.vercel.app',
    'http://localhost:5173',
    'http://localhost:3000'
  ];
  
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  } else {
    res.setHeader('Access-Control-Allow-Origin', '*');
  }
  
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method === 'POST') {
    const { userName, email, password } = req.body;
    
    // Basic validation
    if (!userName || !email || !password) {
      return res.status(400).json({ error: 'All fields are required' });
    }
    
    // For demo purposes, just return success
    return res.status(200).json({
      message: 'Successfully registered!',
      user: { userName, email }
    });
  }
  
  return res.status(405).json({ error: 'Method not allowed' });
}
