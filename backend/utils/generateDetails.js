import {
  GoogleGenAI,
  createUserContent,
  createPartFromUri,
} from "@google/genai";

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ai = new GoogleGenAI({
  apiKey: "AIzaSyBv5lExlVygiG-B5cVpURwXNIMaYUqJC2c",
});

export const generateDetailsFromImage = async (filename) => {
  try {
    const imagePath = path.join(__dirname, "../uploads", filename);
    const normalizedPath = imagePath.replace(/\\/g, "/");
    console.log("Normalized Image Path:", normalizedPath);

    if (!fs.existsSync(imagePath)) {
      throw new Error("Image file not found: " + imagePath);
    }

    const image = await ai.files.upload({
      file: normalizedPath,
    });
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: [
        createUserContent([
          "Tell me about this in scientific terms.",
          createPartFromUri(image.uri, image.mimeType),
        ]),
      ],
    });
    console.log("Response from Gemini API:", response.text);
    return response.text || "No description generated.";
  } catch (error) {
    console.error("Gemini API Error:", error.response?.data || error.message);
    return "Error generating details.";
  }
};
