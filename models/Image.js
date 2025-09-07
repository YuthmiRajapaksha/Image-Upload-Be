// const mongoose = require('mongoose');

// const ImageSchema = new mongoose.Schema({
//   filename: String,
//   url: String,
//   createdAt: { type: Date, default: Date.now },
//    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" } // 🔹 link to user
// });

// module.exports = mongoose.model('Image', ImageSchema);


import mongoose from "mongoose";

const imageSchema = new mongoose.Schema({
  filename: String,
  url: String,
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Image", imageSchema);
