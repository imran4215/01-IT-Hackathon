// controllers/observationController.js
import Observation from "../models/Observation.js";
import { generateDetailsFromImage } from "../utils/generateDetails.js";
import dotenv from "dotenv";
dotenv.config();

// Upload new observation
export const uploadObservation = async (req, res) => {
  try {
    const { category, state, latitude, longitude, userId } = req.body;
    const image = req.file?.filename;

    if (!category || !state || !image || !latitude || !longitude || !userId) {
      return res.status(400).json({
        message: "All fields are required including userId and location",
      });
    }

    const details = await generateDetailsFromImage(image);

    const newObservation = new Observation({
      userId,
      category,
      state,
      image,
      details,
      location: {
        latitude: parseFloat(latitude),
        longitude: parseFloat(longitude),
      },
    });

    await newObservation.save();
    res
      .status(201)
      .json({ message: "Observation uploaded", data: newObservation });
    console.log("New observation uploaded:", newObservation);
  } catch (error) {
    console.error("Upload Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get all observations
export const getAllObservations = async (req, res) => {
  try {
    const observations = await Observation.find().sort({ createdAt: -1 }); // newest first
    res.status(200).json(observations);
  } catch (error) {
    console.error("Fetch Error:", error);
    res.status(500).json({ message: "Failed to fetch observations" });
  }
};

// Get single observation by ID
export const getObservationById = async (req, res) => {
  try {
    if (!req.params.id) {
      return res.status(400).json({ message: "Observation ID is required" });
    }
    //console.log("Fetching observation with ID:", req.params.id);
    const observation = await Observation.findById(req.params.id);
    if (!observation) {
      return res.status(404).json({ message: "Observation not found" });
    }
    res.status(200).json(observation);
  } catch (error) {
    console.error("Fetch Observation Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get observations by category
export const getObservationsByCategory = async (req, res) => {
  try {
    const categoryName = req.params.categoryName.replace(/-/g, " ");
    //console.log("Formatted category name:", categoryName);
    if (!categoryName) {
      return res.status(400).json({ message: "Category name is required" });
    }

    const observations = await Observation.find({
      category: { $regex: new RegExp(`^${categoryName}$`, "i") },
    });

    if (observations.length === 0) {
      return res.status(404).json({ message: "No observations found" });
    }

    res.status(200).json(observations);
  } catch (error) {
    console.error("Fetch Category Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get observations by user ID
export const getUserObservations = async (req, res) => {
  try {
    const { userId } = req.params;
    //console.log("Fetching observations for user ID:", userId);
    const observations = await Observation.find({ userId });
    res.status(200).json(observations);
  } catch (error) {
    console.error("Error fetching user observations:", error);
    res.status(500).json({ message: "Server error" });
  }
};
