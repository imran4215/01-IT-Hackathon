import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function NewlyAdded() {
  const [observations, setObservations] = useState([]);

  useEffect(() => {
    const fetchObservations = async () => {
      try {
        const res = await axios.get(
          "https://nature-explorer.onrender.com/api/observation/all"
        );

        // Get up to last 20 observations (newest ones), reverse for newest first
        const latestTwenty = res.data.slice(-20);

        setObservations(latestTwenty);
      } catch (error) {
        console.error("Failed to fetch observations", error);
      }
    };

    fetchObservations();
  }, []);

  return (
    <div className="p-6 bg-gray-100">
      <h1 className="text-3xl font-bold mb-8 text-center text-green-800">
        🆕 Recently Added Observations
      </h1>

      {observations.length === 0 ? (
        <p className="text-center text-gray-600">
          No new observations available.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {observations.map((item) => (
            <Link key={item._id} to={`/details/${item._id}`}>
              <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition duration-300 cursor-pointer">
                <img
                  src={`http://localhost:5000/uploads/${item.image}`}
                  alt={item.name || "Observation"}
                  className="w-full h-48 object-cover"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "/default-image.jpg"; // Optional fallback image
                  }}
                />
                <div className="p-4">
                  <p className="text-sm text-gray-600">📍 {item.state}</p>
                  <p className="text-sm text-gray-800 font-medium capitalize truncate">
                    {item.category}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
