import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const districts = [
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
  "Jashore",
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

export default function NewlyAdded() {
  const [observations, setObservations] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState("");

  useEffect(() => {
    const fetchObservations = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/api/observation/all"
        );
        const latestTwenty = res.data.slice(-20);
        setObservations(latestTwenty);
      } catch (error) {
        console.error("Failed to fetch observations", error);
      }
    };

    fetchObservations();
  }, []);

  const filteredObservations = selectedDistrict
    ? observations.filter((item) => item.state === selectedDistrict)
    : observations;

  return (
    <div className="p-6 bg-gray-100">
      <h1 className="text-3xl font-bold mb-6 text-center text-green-800">
        🆕 Recently Added Observations
      </h1>

      <div className="mb-6 flex justify-center">
        <select
          className="p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
          value={selectedDistrict}
          onChange={(e) => setSelectedDistrict(e.target.value)}
        >
          <option value="">-- Select District --</option>
          {districts.map((district) => (
            <option key={district} value={district}>
              {district}
            </option>
          ))}
        </select>
      </div>

      {filteredObservations.length === 0 ? (
        <p className="text-center text-gray-600">
          No observations found for selected district.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredObservations.map((item) => (
            <Link key={item._id} to={`/details/${item._id}`}>
              <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition duration-300 cursor-pointer">
                <img
                  src={`http://localhost:5000/uploads/${item.image}`}
                  alt={item.name || "Your observation"}
                  className="w-full h-48 object-cover"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "/default-image.jpg";
                  }}
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-800 truncate">
                    {item.category || "Untitled Observation"}
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">📍 {item.state}</p>
                  <p className="text-xs text-gray-500 mt-2">
                    Added on: {new Date(item.createdAt).toLocaleDateString()}
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
