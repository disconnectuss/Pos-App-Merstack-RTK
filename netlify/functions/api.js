const express = require("express");
const serverless = require("serverless-http");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

// Import routes
const categoryRoute = require("../../api/routes/categories.js");
const productRoute = require("../../api/routes/products.js");
const invoiceRoute = require("../../api/routes/invoices.js");
const authRoute = require("../../api/routes/auth.js");
const userRoute = require("../../api/routes/users.js");
const tableRoute = require("../../api/routes/table.js");

dotenv.config();

const app = express();

// Database connection
let isConnected = false;

const connectToDatabase = async () => {
  if (isConnected) {
    console.log("Using existing database connection");
    return;
  }

  try {
    console.log("Attempting to connect to:", process.env.MONGO_URI ? "URI provided" : "NO URI PROVIDED");
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
      bufferMaxEntries: 0,
      maxPoolSize: 10,
    });
    isConnected = true;
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    throw error;
  }
};

// Middleware
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? (origin, callback) => {
        // Allow all netlify.app domains and the main domain
        if (!origin || 
            origin.includes('netlify.app') || 
            origin === 'https://posapp-restaurant.netlify.app') {
          callback(null, true);
        } else {
          callback(new Error('Not allowed by CORS'));
        }
      }
    : ["http://localhost:5173", "http://localhost:3000", "http://localhost:4173"],
  credentials: true
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Connect to database middleware
app.use(async (req, res, next) => {
  console.log("Request path:", req.path, "Full URL:", req.url);
  try {
    // Skip database connection for health check
    if (req.path === '/health') {
      return next();
    }
    await connectToDatabase();
    next();
  } catch (error) {
    console.error("Database connection error:", error);
    res.status(500).json({
      status: 500,
      message: "Database connection failed",
      error: error.message
    });
  }
});

// Health check
app.get("/", (req, res) => {
  res.status(200).json({
    status: 200,
    message: "POS API Server is running on Netlify",
    timestamp: new Date().toISOString(),
    database: mongoose.connection.readyState === 1 ? "connected" : "disconnected"
  });
});

// API Routes (without /api prefix since we're already at /.netlify/functions/api)
app.use("/categories", categoryRoute);
app.use("/products", productRoute);
app.use("/invoices", invoiceRoute);
app.use("/auth", authRoute);
app.use("/users", userRoute);
app.use("/tables", tableRoute);

// Health check endpoint
app.get("/health", (req, res) => {
  res.json({
    status: "ok",
    message: "API is working",
    timestamp: new Date().toISOString(),
    database: mongoose.connection.readyState === 1 ? "connected" : "disconnected"
  });
});

// Error handling
app.use((err, req, res, next) => {
  console.error("Error:", err);
  res.status(500).json({
    status: 500,
    message: "Internal server error",
    error: process.env.NODE_ENV === "production" ? "Something went wrong" : err.message
  });
});

// Handle 404
app.use((req, res) => {
  res.status(404).json({
    status: 404,
    message: "API endpoint not found",
    path: req.path
  });
});

module.exports.handler = serverless(app, {
  basePath: "/.netlify/functions/api"
});
