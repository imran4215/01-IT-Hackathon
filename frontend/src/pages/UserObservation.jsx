import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/homeComponents/Navbar";

export default function YourObservations() {
  const [observations, setObservations] = useState([]);
  const [filteredObservations, setFilteredObservations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");

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

  // Fetch observations
  useEffect(() => {
    if (!userId) {
      navigate("/login");
      return;
    }

    const fetchUserObservations = async () => {
      try {
        setIsLoading(true);
        const res = await axios.get(
          `http://localhost:5000/api/observation/user/${userId}`
        );
        setObservations(res.data);
        setFilteredObservations(res.data);
      } catch (error) {
        console.error("Failed to fetch user observations", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserObservations();
  }, [userId, navigate]);

  // Handle dropdown filter
  useEffect(() => {
    let filtered = observations;

    if (selectedDistrict) {
      filtered = filtered.filter((obs) => obs.state === selectedDistrict);
    }

    if (selectedCategory) {
      filtered = filtered.filter((obs) => obs.category === selectedCategory);
    }

    setFilteredObservations(filtered);
  }, [selectedDistrict, selectedCategory, observations]);

  // Get unique categories from observations
  const uniqueCategories = [
    ...new Set(observations.map((obs) => obs.category).filter(Boolean)),
  ];

  return (
    <>
      <Navbar />
      <div className="p-6 bg-gray-100 min-h-screen">
        <h1 className="text-3xl font-bold mb-8 text-center text-green-800 mb-10">
          🌿 Your Observations
        </h1>

        {/* Dropdowns */}
        <div className="flex flex-wrap gap-4 justify-center mb-6">
          {/* District Dropdown */}
          <select
            className="p-2 border border-gray-300 rounded-md"
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

          {/* Category Dropdown */}
          <select
            className="p-2 border border-gray-300 rounded-md"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="">-- Select Category --</option>
            {uniqueCategories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {/* Observation Cards */}
        {isLoading ? (
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-600"></div>
          </div>
        ) : filteredObservations.length === 0 ? (
          <div className="text-center">
            <p className="text-gray-600 mb-4">
              No matching observations found.
            </p>
            <Link
              to="/upload"
              className="inline-block bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg transition duration-200"
            >
              Add Observation
            </Link>
          </div>
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
                    <p className="text-sm text-gray-600 mt-1">
                      📍 {item.state}
                    </p>
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
    </>
  );
}
