import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import Navbar from "./homeComponents/Navbar";

export default function ObservationDetails() {
  const { id } = useParams();
  const [observation, setObservation] = useState(null);

  useEffect(() => {
    const fetchObservation = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/observation/one/${id}`
        );
        setObservation(res.data);
      } catch (err) {
        console.error("Error fetching observation details", err);
      }
    };

    fetchObservation();
  }, [id]);

  if (!observation) return <div className="p-6">Loading...</div>;

  const { category, state, image, details, location } = observation;

  return (
    <>
      <Navbar />
      <div className="flex flex-col md:flex-row gap-6 p-6 bg-gray-50 min-h-screen">
        {/* Left Side */}
        <div className="md:w-1/2 bg-white shadow-md rounded-xl p-4">
          <img
            src={`http://localhost:5000/uploads/${image}`}
            alt={category}
            className="w-full h-64 object-cover rounded-lg"
          />
          <div className="mt-4">
            <h2 className="text-2xl font-bold text-green-700 mb-2">
              {category}
            </h2>
            <p className="text-gray-600 mb-4 font-medium">📍 State: {state}</p>
            <div className="prose max-w-full text-gray-800">
              <ReactMarkdown>{details}</ReactMarkdown>
            </div>
          </div>
        </div>

        {/* Right Side - Map */}
        <div className="md:w-1/2 bg-white shadow-md rounded-xl p-4">
          <h3 className="text-xl font-semibold mb-4 text-blue-700">
            Location on Map
          </h3>
          <iframe
            title="Map"
            width="100%"
            height="350"
            className="rounded-lg"
            loading="lazy"
            src={`https://www.openstreetmap.org/export/embed.html?bbox=${
              location.longitude - 0.01
            }%2C${location.latitude - 0.01}%2C${location.longitude + 0.01}%2C${
              location.latitude + 0.01
            }&layer=mapnik&marker=${location.latitude}%2C${location.longitude}`}
          ></iframe>
          <p className="mt-2 text-sm text-gray-500">
            (Using OpenStreetMap – no API key required)
          </p>
        </div>
      </div>
    </>
  );
}
