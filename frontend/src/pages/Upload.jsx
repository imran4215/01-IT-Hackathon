// Upload.jsx
import React, { useState, useCallback } from "react";
import axios from "axios";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";
import Navbar from "../components/homeComponents/Navbar";

const categories = [
  "Environmental Data",
  "Biodiversity Observations",
  "Public Health Information",
  "Astronomical Observations",
];

const bangladeshDistricts = [
  "Bagerhat",
  "Bandarban",
  "Barguna",
  "Barisal",
  "Bhola",
  "Bogra",
  "Brahmanbaria",
  "Chandpur",
  "Chapai Nawabganj",
  "Chattogram",
  "Chuadanga",
  "Comilla",
  "Cox's Bazar",
  "Dhaka",
  "Dinajpur",
  "Faridpur",
  "Feni",
  "Gaibandha",
  "Gazipur",
  "Gopalganj",
  "Habiganj",
  "Jamalpur",
  "Jessore",
  "Jhalokathi",
  "Jhenaidah",
  "Joypurhat",
  "Khagrachari",
  "Khulna",
  "Kishoreganj",
  "Kurigram",
  "Kushtia",
  "Lakshmipur",
  "Lalmonirhat",
  "Madaripur",
  "Magura",
  "Manikganj",
  "Meherpur",
  "Moulvibazar",
  "Munshiganj",
  "Mymensingh",
  "Naogaon",
  "Narail",
  "Narayanganj",
  "Narsingdi",
  "Natore",
  "Netrokona",
  "Nilphamari",
  "Noakhali",
  "Pabna",
  "Panchagarh",
  "Patuakhali",
  "Pirojpur",
  "Rajbari",
  "Rajshahi",
  "Rangamati",
  "Rangpur",
  "Satkhira",
  "Shariatpur",
  "Sherpur",
  "Sirajganj",
  "Sunamganj",
  "Sylhet",
  "Tangail",
  "Thakurgaon",
];

const containerStyle = {
  width: "100%",
  height: "300px",
};

const center = {
  lat: 23.8103,
  lng: 90.4125,
};

export default function Upload() {
  const [category, setCategory] = useState("");
  const [state, setState] = useState("");
  const [location, setLocation] = useState(center);
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyA83C9iOmqcdp7tNR4Jid5U3SgYSCYqvp0", // <-- Put your API key here
  });

  const handleMapClick = useCallback((event) => {
    setLocation({
      lat: event.latLng.lat(),
      lng: event.latLng.lng(),
    });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!category || !state || !image || !location) {
      alert("All fields are required.");
      return;
    }

    const formData = new FormData();
    formData.append("category", category);
    formData.append("state", state);
    formData.append("latitude", location.lat);
    formData.append("longitude", location.lng);
    formData.append("image", image);

    try {
      setLoading(true);
      const res = await axios.post(
        "http://localhost:5000/api/observation/upload",
        formData
      );
      alert("Observation uploaded successfully!");
      console.log(res.data);
    } catch (err) {
      console.error("Upload Error:", err);
      alert("Upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="max-w-xl mx-auto p-4 bg-white shadow-md rounded-lg">
        <h2 className="text-2xl font-bold mb-4 text-center">
          Upload Observation
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Category */}
          <div>
            <label className="block mb-1 font-medium">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full border px-3 py-2 rounded"
              required
            >
              <option value="">Select Category</option>
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          {/* State */}
          <div>
            <label className="block mb-1 font-medium">State</label>
            <select
              value={state}
              onChange={(e) => setState(e.target.value)}
              className="w-full border px-3 py-2 rounded"
              required
            >
              <option value="">Select State</option>
              {bangladeshDistricts.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
          </div>

          {/* Google Map */}
          <div>
            <label className="block mb-1 font-medium">
              Select Location (Click on Map)
            </label>
            {isLoaded ? (
              <GoogleMap
                mapContainerStyle={containerStyle}
                center={location}
                zoom={7}
                onClick={handleMapClick}
              >
                <Marker position={location} />
              </GoogleMap>
            ) : (
              <p>Loading Map...</p>
            )}
            <p className="text-sm mt-2">
              Latitude: {location.lat.toFixed(4)}, Longitude:{" "}
              {location.lng.toFixed(4)}
            </p>
          </div>

          {/* Image Upload */}
          <div>
            <label className="block mb-1 font-medium">Upload Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
              className="w-full"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full"
          >
            {loading ? "Uploading..." : "Submit Observation"}
          </button>
        </form>
      </div>
    </>
  );
}
