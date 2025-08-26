
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");
const imageRoutes = require("./routes/imageRoutes");

const app = express();
app.use(cors());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(express.json());

// MongoDB connect
mongoose.connect("mongodb://127.0.0.1:27017/imageDB")
  .then(() => console.log("✅ MongoDB connected"))
  .catch(err => console.error("❌ MongoDB error:", err));

// Routes
app.use("/api", imageRoutes);

app.listen(5000, () => console.log("🚀 Server running on port 5000"));

