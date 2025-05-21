//Package imports
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

//Local imports
import { connectDB } from "./lib/db.js";
import observationRoutes from "./routes/observationRoutes.js";

//Configurations
dotenv.config();

// ES Module fix for __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

//Variables
const app = express();
const PORT = process.env.PORT || 3000;

//Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://localhost:5173", // Your frontend URL
    credentials: true, // Allow cookies
  })
);

// Serve uploaded images statically
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

//Routes
app.use("/api/observation", observationRoutes);

//Server start
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  connectDB(); // Connect to MongoDB
});
