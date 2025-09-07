
// const express = require("express");
// const cors = require("cors");
// const mongoose = require("mongoose");
// const path = require("path");
// const imageRoutes = require("./routes/imageRoutes");
// const authRoutes = require("./routes/authRoutes");

// const app = express();
// app.use(cors());
// app.use("/uploads", express.static(path.join(__dirname, "uploads")));
// app.use(express.json());

// // MongoDB connect
// mongoose.connect("mongodb://127.0.0.1:27017/imageDB")
//   .then(() => console.log("✅ MongoDB connected"))
//   .catch(err => console.error("❌ MongoDB error:", err));

// // Routes
// app.use("/api", imageRoutes);

// app.use("/api/auth", authRoutes);  // Register/Login
// app.use("/api", imageRoutes);      // Protected image routes

// app.listen(5000, () => console.log("🚀 Server running on port 5000"));

// import express from "express";
// import cors from "cors";
// import mongoose from "mongoose";
// import path from "path";
// import { fileURLToPath } from "url";

// import imageRoutes from "./routes/imageRoutes.js";
// import authRoutes from "./routes/authRoutes.js";

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// const authRoutes = require("./routes/authRoutes");


// const app = express();
// app.use(cors());
// app.use("/uploads", express.static(path.join(__dirname, "uploads")));
// app.use(express.json());

// // MongoDB connect
// mongoose
//   .connect("mongodb://127.0.0.1:27017/imageDB")
//   .then(() => console.log("✅ MongoDB connected"))
//   .catch((err) => console.error("❌ MongoDB error:", err));

// // Routes
// app.use("/api/auth", authRoutes);
// app.use("/api", imageRoutes);

// app.listen(5000, () => console.log("🚀 Server running on port 5000"));


import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import path from "path";
import { fileURLToPath } from "url";

import authRoutes from "./routes/authRoutes.js";
import imageRoutes from "./routes/imageRoutes.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// MongoDB
mongoose
  .connect("mongodb://127.0.0.1:27017/imageDB")
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB error:", err));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/images", imageRoutes);

app.listen(5000, () => console.log("🚀 Server running on port 5000"));
