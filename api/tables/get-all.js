export default function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const demoTables = [
    { _id: '1', title: 'Table 1', number: '01', people: 2, status: 'available' },
    { _id: '2', title: 'Table 2', number: '02', people: 4, status: 'occupied' },
    { _id: '3', title: 'Table 3', number: '03', people: 6, status: 'available' },
    { _id: '4', title: 'Table 4', number: '04', people: 2, status: 'reserved' },
    { _id: '5', title: 'Table 5', number: '05', people: 8, status: 'available' },
    { _id: '6', title: 'VIP Table', number: 'VIP01', people: 4, status: 'occupied' }
  ];

  try {
    if (req.method === 'GET') {
      return res.status(200).json(demoTables);
    }

    return res.status(405).json({ error: "Method not allowed" });
    
  } catch (error) {
    console.error('Tables error:', error);
    return res.status(500).json({ error: error.message });
  }
}