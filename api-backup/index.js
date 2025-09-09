const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const logger = require("morgan");

// Import routes
const categoryRoute = require("../routes/categories.js");
const productRoute = require("../routes/products.js");
const invoiceRoute = require("../routes/invoices.js");
const authRoute = require("../routes/auth.js");
const userRoute = require("../routes/users.js");
const tableRoute = require("../routes/table.js");

dotenv.config();

const app = express();

// Database connection
const connect = async () => {
  try {
    if (mongoose.connections[0].readyState) {
      console.log("Already connected to MongoDB");
      return;
    }
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB server");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    throw error;
  }
};

// Middleware
app.use(express.json());
app.use(cors());
app.use(logger("dev"));

// Routes
app.get("/", (req, res) => {
  res.status(200).send({
    status: 200,
    message: "POS API Server is running on Vercel"
  });
});

app.use("/api/categories", categoryRoute);
app.use("/api/products", productRoute);
app.use("/api/invoices", invoiceRoute);
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/tables", tableRoute);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({
    status: 500,
    message: "Something went wrong!",
    error: process.env.NODE_ENV === "production" ? {} : err.message
  });
});

// Connect to database before handling requests
app.use(async (req, res, next) => {
  try {
    await connect();
    next();
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: "Database connection failed",
      error: error.message
    });
  }
});

module.exports = app;
