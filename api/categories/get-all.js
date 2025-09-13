export default function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const demoCategories = [
    { _id: '1', title: 'Coffee & Beverages', value: 'Coffee & Beverages' },
    { _id: '2', title: 'Fast Food', value: 'Fast Food' },
    { _id: '3', title: 'Desserts', value: 'Desserts' },
    { _id: '4', title: 'Salads & Healthy', value: 'Salads & Healthy' },
    { _id: '5', title: 'Snacks', value: 'Snacks' }
  ];

  try {
    if (req.method === 'GET') {
      return res.status(200).json(demoCategories);
    }

    return res.status(405).json({ error: "Method not allowed" });
    
  } catch (error) {
    console.error('Categories error:', error);
    return res.status(500).json({ error: error.message });
  }
}