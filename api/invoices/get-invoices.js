export default function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // In a real app, this would be stored in a database
  // For demo purposes, returning empty array since we cleared invoices
  const demoInvoices = [];

  try {
    if (req.method === 'GET') {
      return res.status(200).json(demoInvoices);
    }

    return res.status(405).json({ error: "Method not allowed" });
    
  } catch (error) {
    console.error('Invoices error:', error);
    return res.status(500).json({ error: error.message });
  }
}