const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("./models/User.js");
require("dotenv").config();

const createDemoUser = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB");

    // Check if demo user already exists
    const existingUser = await User.findOne({ email: "demo@posapp.com" });
    if (existingUser) {
      console.log("Demo user already exists!");
      return;
    }

    // Create demo user
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash("demo123", salt);
    
    const demoUser = new User({
      userName: "Demo User",
      email: "demo@posapp.com",
      password: hashedPassword
    });

    await demoUser.save();
    console.log("Demo user created successfully!");
    console.log("Email: demo@posapp.com");
    console.log("Password: demo123");
    
  } catch (error) {
    console.error("Error creating demo user:", error);
  } finally {
    mongoose.connection.close();
  }
};

createDemoUser();
