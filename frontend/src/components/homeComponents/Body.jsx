import React from "react";
import { useNavigate } from "react-router-dom";

const categories = [
  {
    name: "Environmental Data",
    value: "environmental-data",
    icon: "🌱",
  },
  {
    name: "Biodiversity Observations",
    value: "biodiversity-observations",
    icon: "🦋",
  },
  {
    name: "Public Health Information",
    value: "public-health-information",
    icon: "🏥",
  },
  {
    name: "Astronomical Observations",
    value: "astronomical-observations",
    icon: "🔭",
  },
];

export default function Body() {
  const navigate = useNavigate();

  return (
    <div className="p-6 bg-gray-100 ">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold">Explore Scientific Observations</h1>
        <p className="text-gray-600 mt-2">
          Click a category to see real-world data
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {categories.map((cat) => (
          <div
            key={cat.value}
            onClick={() => navigate(`/category/${cat.value}`)}
            className="cursor-pointer border rounded-xl p-4 flex flex-col items-center hover:shadow-lg transition bg-white"
          >
            <span className="text-4xl mb-2">{cat.icon}</span>
            <h3 className="text-sm font-semibold text-center">{cat.name}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}
