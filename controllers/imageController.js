
const Image = require("../models/Image");
const fs = require("fs");
const path = require("path");

// Upload Image
exports.uploadImage = async (req, res) => {
  if (!req.file) return res.status(400).json({ message: "No file uploaded" });

  const newImage = new Image({
    filename: req.file.filename,
    url: `http://localhost:5000/uploads/${req.file.filename}`
  });

  await newImage.save();
  res.json(newImage);
};

// Get all Images
exports.getImages = async (req, res) => {
  const images = await Image.find().sort({ createdAt: -1 });
  res.json(images);
};

// Delete Image
exports.deleteImage = async (req, res) => {
  try {
    const image = await Image.findById(req.params.id);
    if (!image) return res.status(404).json({ message: "Image not found" });

    // Remove file from uploads folder
    const filePath = path.join(__dirname, "..", "uploads", image.filename);
    if (fs.existsSync(filePath)) fs.unlinkSync(filePath);

    // Remove from DB
    await image.deleteOne();

    res.json({ message: "Image deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
