import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import Navbar from "../components/homeComponents/Navbar";

export default function CategoryPage() {
  const { categoryName } = useParams(); // get category from URL param
  const [observations, setObservations] = useState([]);
  const [loading, setLoading] = useState(true);

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

  if (loading) return <div className="p-6 text-center">Loading...</div>;

  if (observations.length === 0)
    return (
      <div className="p-6 text-center text-gray-600">
        No observations found for{" "}
        <strong>{categoryName.replace(/-/g, " ")}</strong>.
      </div>
    );

  return (
    <>
      <Navbar />
      <div className="p-6 bg-gray-100 min-h-screen">
        <h1 className="text-2xl font-semibold mb-6 text-center text-green-800 capitalize">
          Observations: {categoryName.replace(/-/g, " ")}
        </h1>
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
        </div>
      </div>
    </>
  );
}
