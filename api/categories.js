const mongoose = require('mongoose');
const Category = require('../api/models/Category.js');

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
      const categories = await Category.find();
      return res.status(200).json(categories);
    }

    if (req.method === 'POST') {
      const newCategory = new Category(req.body);
      await newCategory.save();
      return res.status(200).json({ message: "Category created successfully!" });
    }

    if (req.method === 'PUT') {
      const { id } = req.query;
      await Category.findByIdAndUpdate(id, req.body);
      return res.status(200).json({ message: "Category updated successfully!" });
    }

    if (req.method === 'DELETE') {
      const { id } = req.query;
      await Category.findByIdAndDelete(id);
      return res.status(200).json({ message: "Category deleted successfully!" });
    }
  } catch (error) {
    console.error("Categories error:", error);
    return res.status(400).json({ error: error.message });
  }

  return res.status(405).json({ error: "Method not allowed" });
}
