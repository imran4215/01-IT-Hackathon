import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import Navbar from "../components/homeComponents/Navbar";

export default function CategoryPage() {
  const { categoryName } = useParams(); // get category from URL param
  const [observations, setObservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDistrict, setSelectedDistrict] = useState("");

  // 64 Districts of Bangladesh
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

  useEffect(() => {
    const fetchObservations = async () => {
      try {
        const res = await axios.get(
          `https://nature-explorer.onrender.com/api/observation/category/${categoryName}`
        );
        setObservations(res.data);
      } catch (error) {
        console.error("Failed to fetch observations", error);
      } finally {
        setLoading(false);
      }
    };

    fetchObservations();
  }, [categoryName]);

  const filteredObservations = selectedDistrict
    ? observations.filter((item) => item.state === selectedDistrict)
    : observations;

  return (
    <>
      <Navbar />
      <div className="p-6 bg-gray-100 min-h-screen">
        <h1 className="text-2xl font-semibold mb-6 text-center text-green-800 capitalize">
          Observations: {categoryName.replace(/-/g, " ")}
        </h1>
<<<<<<< HEAD

        {/* District Dropdown */}
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
=======
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {observations.map((item) => (
            <Link key={item._id} to={`/details/${item._id}`}>
              <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-300 cursor-pointer">
                <img
                  src={`https://nature-explorer.onrender.com/uploads/${item.image}`}
                  alt={item.category}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <p className="text-gray-600 text-sm">📍 {item.state}</p>
                  <p className="text-gray-800 font-medium truncate">
                    {item.category}
                  </p>
                </div>
              </div>
            </Link>
          ))}
>>>>>>> 8e4cfadf1652bc689d014091ab85dd5ad2aa4b2f
        </div>

        {/* Observations or No Data Message */}
        {loading ? (
          <div className="text-center text-gray-600">Loading...</div>
        ) : filteredObservations.length === 0 ? (
          <div className="text-center text-gray-600">
            No observations found for{" "}
            <strong>{categoryName.replace(/-/g, " ")}</strong>
            {selectedDistrict && ` in ${selectedDistrict}`}.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredObservations.map((item) => (
              <Link key={item._id} to={`/details/${item._id}`}>
                <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-300 cursor-pointer">
                  <img
                    src={`http://localhost:5000/uploads/${item.image}`}
                    alt={item.category}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <p className="text-gray-600 text-sm">📍 {item.state}</p>
                    <p className="text-gray-800 font-medium truncate">
                      {item.category}
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
