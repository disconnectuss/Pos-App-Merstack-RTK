export default function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    if (req.method === 'POST') {
      const { customerName, customerTel, cartItems, paymentMethod, subTotal, tax, totalAmount } = req.body;
      
      // In a real app, this would be saved to a database
      // For demo purposes, just return success
      return res.status(200).json("Successfully added!");
    }

    return res.status(405).json({ error: "Method not allowed" });
    
  } catch (error) {
    console.error('Add invoice error:', error);
    return res.status(500).json({ error: error.message });
  }
}