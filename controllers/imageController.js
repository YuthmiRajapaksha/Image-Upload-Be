
// const Image = require("../models/Image");
// const fs = require("fs");
// const path = require("path");

// // Upload Image
// exports.uploadImage = async (req, res) => {
//   if (!req.file) return res.status(400).json({ message: "No file uploaded" });

//   const newImage = new Image({
//     filename: req.file.filename,
//     url: `http://localhost:5000/uploads/${req.file.filename}`
//   });

//   await newImage.save();
//   res.json(newImage);
// };

// // Get all Images
// exports.getImages = async (req, res) => {
//   const images = await Image.find().sort({ createdAt: -1 });
//   res.json(images);
// };

// // Delete Image
// exports.deleteImage = async (req, res) => {
//   try {
//     const image = await Image.findById(req.params.id);
//     if (!image) return res.status(404).json({ message: "Image not found" });

//     // Remove file from uploads folder
//     const filePath = path.join(__dirname, "..", "uploads", image.filename);
//     if (fs.existsSync(filePath)) fs.unlinkSync(filePath);

//     // Remove from DB
//     await image.deleteOne();

//     res.json({ message: "Image deleted successfully" });
//   } catch (err) {
//     res.status(500).json({ message: "Server error" });
//   }
// };


import Image from "../models/Image.js";
import fs from "fs";
import path from "path";

// Upload Image
export const uploadImage = async (req, res) => {
  if (!req.file) return res.status(400).json({ message: "No file uploaded" });

  const { userId } = req.body;
  if (!userId) return res.status(400).json({ message: "User ID required" });

  const newImage = new Image({
    filename: req.file.filename,
    url: `http://localhost:5000/uploads/${req.file.filename}`,
    userId,
  });

  await newImage.save();
  res.json(newImage);
};

// Get Images by User
export const getImages = async (req, res) => {
  const { userId } = req.query;
  if (!userId) return res.status(400).json({ message: "User ID required" });

  const images = await Image.find({ userId }).sort({ createdAt: -1 });
  res.json(images);
};

// Delete Image
export const deleteImage = async (req, res) => {
  try {
    const image = await Image.findById(req.params.id);
    if (!image) return res.status(404).json({ message: "Image not found" });

    const filePath = path.join("uploads", image.filename);
    if (fs.existsSync(filePath)) fs.unlinkSync(filePath);

    await image.deleteOne();
    res.json({ message: "Image deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
