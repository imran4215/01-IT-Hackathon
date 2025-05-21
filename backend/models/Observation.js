import mongoose from "mongoose";

const observationSchema = new mongoose.Schema({
  category: { type: String, required: true },
  state: { type: String, required: true },
  image: { type: String, required: true },
  details: { type: String, default: "" },
  createdAt: { type: Date, default: Date.now },
  location: {
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true },
  },
});

const Observation = mongoose.model("Observation", observationSchema);
export default Observation;
