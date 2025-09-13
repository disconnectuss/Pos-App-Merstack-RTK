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

  // Debug logging
  console.log('Full URL:', req.url);
  console.log('Query object:', query);
  console.log('Slug array:', query.slug);
  console.log('Endpoint:', endpoint);
  console.log('Action:', action);
  console.log('Method:', req.method);

  // Demo data
  const demoUsers = [
    { email: 'demo@posapp.com', password: 'demo123', userName: 'Demo User' },
    { email: 'test@test.com', password: '123123', userName: 'Test User' }
  ];

  const demoCategories = [
    { _id: '1', title: 'Coffee & Beverages', value: 'Coffee & Beverages' },
    { _id: '2', title: 'Fast Food', value: 'Fast Food' },
    { _id: '3', title: 'Desserts', value: 'Desserts' },
    { _id: '4', title: 'Salads & Healthy', value: 'Salads & Healthy' },
    { _id: '5', title: 'Snacks', value: 'Snacks' }
  ];

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
    }
  ];

  const demoTables = [
    { _id: '1', title: 'Table 1', number: '01', people: 2, status: 'available' },
    { _id: '2', title: 'Table 2', number: '02', people: 4, status: 'occupied' },
    { _id: '3', title: 'Table 3', number: '03', people: 6, status: 'available' }
  ];

  let demoInvoices = [];

  try {
    // AUTH ROUTES
    if (endpoint === 'auth') {
      if (action === 'login' && req.method === 'POST') {
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
      if (action === 'get-all' && req.method === 'GET') {
        return res.status(200).json(demoCategories);
      }
      
      if (req.method === 'POST') {
        const { title } = req.body;
        return res.status(200).json({ 
          message: "Category created successfully!",
          category: { _id: Date.now().toString(), title, value: title }
        });
      }
    }

    // PRODUCTS ROUTES  
    if (endpoint === 'products') {
      if (action === 'get-all' && req.method === 'GET') {
        return res.status(200).json(demoProducts);
      }
      
      if (action === 'add-product' && req.method === 'POST') {
        const { title, img, price, category } = req.body;
        return res.status(200).json({
          message: "Product added successfully!",
          product: { _id: Date.now().toString(), title, img, price, category }
        });
      }
    }

    // TABLES ROUTES
    if (endpoint === 'tables') {
      if (action === 'get-all' && req.method === 'GET') {
        return res.status(200).json(demoTables);
      }
      
      if (action === 'add-table' && req.method === 'POST') {
        const { title, number, people, status } = req.body;
        return res.status(200).json({
          message: "Table added successfully!",
          table: { _id: Date.now().toString(), title, number, people, status: status || 'available' }
        });
      }
    }

    // INVOICES ROUTES
    if (endpoint === 'invoices') {
      if (action === 'get-invoices' && req.method === 'GET') {
        return res.status(200).json(demoInvoices);
      }
      
      if (action === 'add-invoice' && req.method === 'POST') {
        const { customerName, customerTel, cartItems, paymentMethod, subTotal, tax, totalAmount } = req.body;
        const newInvoice = {
          _id: Date.now().toString(),
          customerName,
          customerTel, 
          cartItems,
          paymentMethod,
          subTotal,
          tax,
          totalAmount,
          createdAt: new Date().toISOString()
        };
        demoInvoices.push(newInvoice);
        return res.status(200).json("Successfully added!");
      }
    }

    // USERS ROUTES
    if (endpoint === 'users') {
      if (action === 'get-all' && req.method === 'GET') {
        return res.status(200).json(demoUsers.map(u => ({ 
          _id: u.email, 
          userName: u.userName, 
          email: u.email 
        })));
      }
    }

    // TEST ROUTE
    if (endpoint === 'test') {
      return res.status(200).json({ 
        message: 'API working in demo mode!',
        timestamp: new Date().toISOString(),
        availableEndpoints: [
          '/api/auth/login',
          '/api/auth/register', 
          '/api/categories/get-all',
          '/api/products/get-all',
          '/api/tables/get-all',
          '/api/invoices/get-invoices',
          '/api/invoices/add-invoice',
          '/api/users/get-all'
        ]
      });
    }

    return res.status(404).json({ error: "Endpoint not found" });
    
  } catch (error) {
    console.error('API error:', error);
    return res.status(500).json({ error: error.message });
  }
}
