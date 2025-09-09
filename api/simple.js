export default function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const { query } = req;
  const endpoint = query.slug?.[0];
  const action = query.slug?.[1];

  // Demo users
  const demoUsers = [
    { email: 'demo@example.com', password: 'demo123', userName: 'Demo User' },
    { email: 'test@test.com', password: '123123', userName: 'Test User' }
  ];

  // Demo categories
  const demoCategories = [
    { _id: '1', title: 'Beverages' },
    { _id: '2', title: 'Food' },
    { _id: '3', title: 'Desserts' }
  ];

  try {
    // AUTH ROUTES
    if (endpoint === 'auth') {
      if (action === 'login' && req.method === 'POST') {
        const { email, password } = req.body;
        const user = demoUsers.find(u => u.email === email && u.password === password);
        
        if (!user) {
          return res.status(401).json({ error: "Invalid credentials" });
        }
        
        return res.status(200).json({
          username: user.userName,
          email: user.email
        });
      }
      
      if (action === 'register' && req.method === 'POST') {
        const { userName, email, password } = req.body;
        
        if (!userName || !email || !password) {
          return res.status(400).json({ error: 'All fields are required' });
        }
        
        return res.status(200).json({ 
          message: "Successfully registered!",
          user: { userName, email }
        });
      }
    }

    // CATEGORIES ROUTES
    if (endpoint === 'categories') {
      if (req.method === 'GET') {
        return res.status(200).json(demoCategories);
      }
      
      if (req.method === 'POST') {
        const { title } = req.body;
        return res.status(200).json({ 
          message: "Category created successfully!",
          category: { _id: Date.now().toString(), title }
        });
      }
    }

    // TEST ROUTE
    if (endpoint === 'test') {
      return res.status(200).json({ 
        message: 'API working in demo mode!',
        timestamp: new Date().toISOString()
      });
    }

    return res.status(404).json({ error: "Endpoint not found" });
    
  } catch (error) {
    console.error('API error:', error);
    return res.status(500).json({ error: error.message });
  }
}
