const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../api/models/User.js');

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

  if (req.method === 'POST') {
    const { url } = req;
    
    if (url.includes('/login')) {
      try {
        console.log("Login request body:", req.body);
        console.log("Looking for user with email:", req.body.email);
        
        const user = await User.findOne({ email: req.body.email });
        console.log("User found:", user ? "Yes" : "No");
        
        if (!user) {
          return res.status(404).json({ error: "User not found!" });
        }
        
        const validPassword = await bcrypt.compare(req.body.password, user.password);
        console.log("Password valid:", validPassword);
        
        if (!validPassword) {
          return res.status(403).json({ error: "Invalid Password!" });
        } else {
          return res.status(200).json({
            username: user.userName,
            email: user.email
          });
        }
      } catch (error) {
        console.error("Login error:", error);
        return res.status(400).json({ error: error.message || "Login failed" });
      }
    }

    if (url.includes('/register')) {
      try {
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
      } catch (error) {
        console.error("Registration error:", error);
        return res.status(400).json({ error: error.message || "Registration failed" });
      }
    }
  }

  return res.status(404).json({ error: "Endpoint not found" });
}
