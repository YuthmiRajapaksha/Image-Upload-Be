
const express = require("express");
const multer = require("multer");
const path = require("path");
const { uploadImage, getImages, deleteImage } = require("../controllers/imageController");

const router = express.Router();

// Multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "..", "uploads"));
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage });

// Routes
router.post("/upload", upload.single("image"), uploadImage);
router.get("/images", getImages);
router.delete("/images/:id", deleteImage);

module.exports = router;

