const mongoose = require('mongoose');
const Product = require('../api/models/Product.js');

// Database connection
let isConnected = false;

const connectToDatabase = async () => {
  if (isConnected) {
    return;
  }

  try {
    await mongoose.connect(process.env.MONGO_URI, {
      bufferCommands: false,
      bufferMaxEntries: 0,
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 30000,
      socketTimeoutMS: 30000,
      connectTimeoutMS: 30000,
    });
    isConnected = true;
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    throw error;
  }
};

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  await connectToDatabase();

  try {
    if (req.method === 'GET') {
      const products = await Product.find();
      return res.status(200).json(products);
    }

    if (req.method === 'POST') {
      const newProduct = new Product(req.body);
      await newProduct.save();
      return res.status(200).json({ message: "Product created successfully!" });
    }

    if (req.method === 'PUT') {
      const { id } = req.query;
      await Product.findByIdAndUpdate(id, req.body);
      return res.status(200).json({ message: "Product updated successfully!" });
    }

    if (req.method === 'DELETE') {
      const { id } = req.query;
      await Product.findByIdAndDelete(id);
      return res.status(200).json({ message: "Product deleted successfully!" });
    }
  } catch (error) {
    console.error("Products error:", error);
    return res.status(400).json({ error: error.message });
  }

  return res.status(405).json({ error: "Method not allowed" });
}
