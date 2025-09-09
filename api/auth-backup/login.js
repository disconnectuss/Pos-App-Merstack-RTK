export default function handler(req, res) {
  // CORS headers - specific domains
  const allowedOrigins = [
    'https://pos-app-merstack-jcsr58w1y-disconnectuss-projects.vercel.app',
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
    const { email, password } = req.body;
    
    // Demo user check
    if (email === 'demo@example.com' && password === 'demo123') {
      return res.status(200).json({
        username: 'Demo User',
        email: 'demo@example.com'
      });
    }
    
    return res.status(401).json({ error: 'Invalid credentials' });
  }
  
  return res.status(405).json({ error: 'Method not allowed' });
}
