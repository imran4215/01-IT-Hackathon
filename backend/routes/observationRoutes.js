// routes/observationRoutes.js
import express from "express";
import {
  getAllObservations,
  getObservationById,
  getObservationsByCategory,
  getUserObservations,
  uploadObservation,
} from "../controllers/observationController.js";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";

// Set up __dirname in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Multer config
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../uploads"));
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});
const upload = multer({ storage });

const router = express.Router();

// Route with Multer middleware
router.post("/upload", upload.single("image"), uploadObservation);
router.get("/all", getAllObservations);
router.get("/one/:id", getObservationById);
router.get("/category/:categoryName", getObservationsByCategory);
router.get("/user/:userId", getUserObservations);

export default router;
