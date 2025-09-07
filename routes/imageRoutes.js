
// const express = require("express");
// const multer = require("multer");
// const path = require("path");
// const { uploadImage, getImages, deleteImage } = require("../controllers/imageController");

// const router = express.Router();

// // Multer storage
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, path.join(__dirname, "..", "uploads"));
//   },
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + path.extname(file.originalname));
//   }
// });
// const upload = multer({ storage });

// // Routes
// router.post("/upload", upload.single("image"), uploadImage);
// router.get("/images", getImages);
// router.delete("/images/:id", deleteImage);

// module.exports = router;

import express from "express";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import { uploadImage, getImages, deleteImage } from "../controllers/imageController.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, path.join(__dirname, "..", "uploads")),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname)),
});

const upload = multer({ storage });

router.post("/upload", upload.single("image"), uploadImage);
router.get("/", getImages);
router.delete("/:id", deleteImage);

export default router;


