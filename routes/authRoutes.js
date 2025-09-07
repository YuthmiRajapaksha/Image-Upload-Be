// const express = require("express");
// const jwt = require("jsonwebtoken");
// const bcrypt = require("bcryptjs");
// const User = require("../models/User");

// const router = express.Router();

// // Register
// router.post("/register", async (req, res) => {
//   try {
//     const { username, email, password } = req.body;

//     const existing = await User.findOne({ email });
//     if (existing) return res.status(400).json({ message: "Email already in use" });

//     const user = new User({ username, email, password });
//     await user.save();

//     res.json({ message: "User registered successfully" });
//   } catch (err) {
//     res.status(500).json({ message: "Server error" });
//   }
// });

// // Login
// router.post("/login", async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     const user = await User.findOne({ email });
//     if (!user) return res.status(400).json({ message: "Invalid credentials" });

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

//     const token = jwt.sign({ id: user._id }, "SECRET_KEY", { expiresIn: "1h" });

//     res.json({ token, user: { id: user._id, username: user.username, email: user.email } });
//   } catch (err) {
//     res.status(500).json({ message: "Server error" });
//   }
// });

// module.exports = router;
// import express from "express";
// import bcrypt from "bcryptjs";
// import User from "../models/User.js";

// const router = express.Router();

// // Register
// // Register
// router.post("/register", async (req, res) => {
//   try {
//     const { username, password, confirmPassword } = req.body;

//     if (!username || !password || !confirmPassword)
//       return res.status(400).json({ message: "All fields required" });

//     if (password !== confirmPassword)
//       return res.status(400).json({ message: "Passwords do not match" });

//     const existingUser = await User.findOne({ username });
//     if (existingUser)
//       return res.status(400).json({ message: "Username already taken" });

//     const hashedPassword = await bcrypt.hash(password, 10);
//     const newUser = new User({ username, password: hashedPassword });
//     await newUser.save();

//     res.status(201).json({ message: "User registered successfully" });
//   } catch (err) {
//     res.status(500).json({ message: "Server error", error: err.message });
//   }
// });

// // Login
// router.post("/login", async (req, res) => {
//   try {
//     const { username, password } = req.body;

//     const user = await User.findOne({ username });
//     if (!user) return res.status(400).json({ message: "Invalid username" });

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) return res.status(400).json({ message: "Invalid password" });

//     res.json({ message: "Login successful", userId: user._id });
//   } catch (err) {
//     res.status(500).json({ message: "Server error", error: err.message });
//   }
// });

// module.exports = router;


import express from "express";
import bcrypt from "bcryptjs";
import User from "../models/User.js";

const router = express.Router();

// Register
router.post("/register", async (req, res) => {
  try {
    const { username, password, confirmPassword } = req.body;
    if (!username || !password || !confirmPassword)
      return res.status(400).json({ message: "All fields required" });

    if (password !== confirmPassword)
      return res.status(400).json({ message: "Passwords do not match" });

    const existingUser = await User.findOne({ username });
    if (existingUser)
      return res.status(400).json({ message: "Username already taken" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// Login
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password)
      return res.status(400).json({ message: "All fields required" });

    const user = await User.findOne({ username });
    if (!user) return res.status(400).json({ message: "Invalid username" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid password" });

    res.json({ message: "Login successful", userId: user._id });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

export default router;


