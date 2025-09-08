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
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
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
    ? [process.env.NETLIFY_URL, process.env.URL] 
    : ["http://localhost:5173", "http://localhost:3000"],
  credentials: true
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Connect to database middleware
app.use(async (req, res, next) => {
  try {
    await connectToDatabase();
    next();
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: "Database connection failed",
      error: error.message
    });
  }
});

// Health check
app.get("/api", (req, res) => {
  res.status(200).json({
    status: 200,
    message: "POS API Server is running on Netlify",
    timestamp: new Date().toISOString()
  });
});

// API Routes
app.use("/api/categories", categoryRoute);
app.use("/api/products", productRoute);
app.use("/api/invoices", invoiceRoute);
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/tables", tableRoute);

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

module.exports.handler = serverless(app);
