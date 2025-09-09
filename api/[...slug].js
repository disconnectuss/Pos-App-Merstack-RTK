const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Models
const User = require('./models/User.js');
const Category = require('./models/Category.js');
const Product = require('./models/Product.js');
const Invoice = require('./models/Invoice.js');
const Table = require('./models/Table.js');

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

  const { query } = req;
  const endpoint = query.slug?.[0]; // First part of path

  // Add a simple test endpoint
  if (endpoint === 'test') {
    return res.status(200).json({ 
      message: 'API is working!', 
      timestamp: new Date().toISOString(),
      mongoUri: process.env.MONGO_URI ? 'Present' : 'Missing'
    });
  }

  try {
    // AUTH ROUTES
    if (endpoint === 'auth') {
      const action = query.slug?.[1]; // login or register
      
      if (action === 'login' && req.method === 'POST') {
        const user = await User.findOne({ email: req.body.email });
        
        if (!user) {
          return res.status(404).json({ error: "User not found!" });
        }
        
        const validPassword = await bcrypt.compare(req.body.password, user.password);
        
        if (!validPassword) {
          return res.status(403).json({ error: "Invalid Password!" });
        }
        
        return res.status(200).json({
          username: user.userName,
          email: user.email
        });
      }
      
      if (action === 'register' && req.method === 'POST') {
        const { userName, email, password } = req.body;
        
        const existingUser = await User.findOne({ email });
        if (existingUser) {
          return res.status(400).json({ error: "User already exists!" });
        }
        
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = new User({ userName, email, password: hashedPassword });
        await newUser.save();
        
        return res.status(200).json({ message: "Successfully registered!" });
      }
    }

    // CATEGORIES ROUTES
    if (endpoint === 'categories') {
      if (req.method === 'GET') {
        const categories = await Category.find();
        return res.status(200).json(categories);
      }
      
      if (req.method === 'POST') {
        const newCategory = new Category(req.body);
        await newCategory.save();
        return res.status(200).json({ message: "Category created successfully!" });
      }
    }

    // PRODUCTS ROUTES  
    if (endpoint === 'products') {
      if (req.method === 'GET') {
        const products = await Product.find();
        return res.status(200).json(products);
      }
      
      if (req.method === 'POST') {
        const newProduct = new Product(req.body);
        await newProduct.save();
        return res.status(200).json({ message: "Product created successfully!" });
      }
    }

    return res.status(404).json({ error: "Endpoint not found" });
    
  } catch (error) {
    console.error('API error:', error);
    return res.status(400).json({ error: error.message });
  }
}
