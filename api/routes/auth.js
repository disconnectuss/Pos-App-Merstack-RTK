const User = require("../models/User.js");
const router = require("express").Router();
const bcrypt = require("bcryptjs"); // hashedPassword &security credentials
const mongoose = require("mongoose");

//create : add new users/ register
router.post("/register", async (req, res) => {
  try {
    const { userName, email, password } = req.body;
    
    // Check if user already exists
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
});
//  login
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    
    if (!user) {
      return res.status(404).json({ error: "User not found!" });
    }
    
    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    
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
});

module.exports = router;
