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

  if (req.method === 'GET') {
    // Return sample categories
    return res.status(200).json([
      { _id: '1', title: 'Beverages' },
      { _id: '2', title: 'Food' },
      { _id: '3', title: 'Desserts' }
    ]);
  }
  
  if (req.method === 'POST') {
    const { title } = req.body;
    return res.status(200).json({ 
      message: 'Category created successfully!',
      category: { _id: Date.now().toString(), title }
    });
  }
  
  return res.status(405).json({ error: 'Method not allowed' });
}