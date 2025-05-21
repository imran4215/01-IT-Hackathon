import {
  GoogleGenAI,
  createUserContent,
  createPartFromUri,
} from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: "AIzaSyBv5lExlVygiG-B5cVpURwXNIMaYUqJC2c",
});

async function main() {
  const image = await ai.files.upload({
    file: "E:/Hackathon/01 IT Hackathon/backend/uploads/1747857984536-73020221-download.jpeg",
  });
  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: [
      createUserContent([
        "TTell me about this in scientific terms.",
        createPartFromUri(image.uri, image.mimeType),
      ]),
    ],
  });
  console.log(response.text);
}

await main();
