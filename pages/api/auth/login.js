export default function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Demo users
  const demoUsers = [
    { email: 'demo@posapp.com', password: 'demo123', userName: 'Demo User' },
    { email: 'test@test.com', password: '123123', userName: 'Test User' }
  ];

  try {
    if (req.method === 'POST') {
      const { email, password } = req.body;
      const user = demoUsers.find(u => u.email === email && u.password === password);
      
      if (!user) {
        return res.status(404).json({ error: "User not found!" });
      }
      
      return res.status(200).json({
        username: user.userName,
        email: user.email
      });
    }

    return res.status(405).json({ error: "Method not allowed" });
    
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ error: error.message });
  }
}