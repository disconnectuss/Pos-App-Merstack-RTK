export default function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const demoProducts = [
    {
      _id: '1',
      title: 'Espresso',
      img: 'https://images.unsplash.com/photo-1510707577719-ae7c14805e3a?w=400&h=300&fit=crop',
      price: 4.50,
      category: 'Coffee & Beverages'
    },
    {
      _id: '2', 
      title: 'Classic Burger',
      img: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=300&fit=crop',
      price: 12.99,
      category: 'Fast Food'
    },
    {
      _id: '3',
      title: 'Chocolate Cake', 
      img: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=400&h=300&fit=crop',
      price: 6.99,
      category: 'Desserts'
    },
    {
      _id: '4',
      title: 'Cappuccino',
      img: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=400&h=300&fit=crop',
      price: 5.25,
      category: 'Coffee & Beverages'
    },
    {
      _id: '5',
      title: 'French Fries',
      img: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=400&h=300&fit=crop',
      price: 4.99,
      category: 'Fast Food'
    }
  ];

  try {
    if (req.method === 'GET') {
      return res.status(200).json(demoProducts);
    }

    return res.status(405).json({ error: "Method not allowed" });
    
  } catch (error) {
    console.error('Products error:', error);
    return res.status(500).json({ error: error.message });
  }
}