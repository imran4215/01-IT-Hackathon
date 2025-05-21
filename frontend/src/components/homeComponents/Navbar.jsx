import React, { useState } from "react";
import { Leaf, Upload, UserPlus, Compass } from "lucide-react";
import { Link } from "react-router-dom"; // Make sure you're using react-router-dom

export default function Navbar() {
  const [activeTab, setActiveTab] = useState("explore");

  return (
    <nav className="bg-green-700 text-white px-6 py-3 shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Left: Logo */}
        <div className="flex items-center space-x-2">
          <Leaf size={28} className="text-lime-300" />
          <span className="text-xl font-bold">Nature Explorer</span>
        </div>

        {/* Center: Navigation Links */}
        <div className="hidden md:flex space-x-6 text-sm font-medium">
          {/* Explore Link */}
          <Link
            to="/"
            onClick={() => setActiveTab("explore")}
            className={`flex items-center space-x-1 px-2 py-1 rounded ${
              activeTab === "explore"
                ? "text-lime-200 font-semibold"
                : "hover:text-lime-200"
            }`}
          >
            <Compass size={18} />
            <span>Explore</span>
          </Link>

          {/* Your Observations Link */}
          <Link
            to="/your-observations"
            onClick={() => setActiveTab("observations")}
            className={`flex items-center space-x-1 px-2 py-1 rounded ${
              activeTab === "observations"
                ? "text-lime-200 font-semibold"
                : "hover:text-lime-200"
            }`}
          >
            <Leaf size={18} />
            <span>Your Observations</span>
          </Link>

          {/* Search Input Added */}
          <div className="relative group">
            <input
              type="text"
              placeholder="Search..."
              className="bg-transparent border border-lime-300 text-white placeholder-lime-200 rounded px-3 py-1 w-32 focus:w-40 focus:outline-none focus:border-lime-100 transition-all duration-200"
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 h-3 w-3 text-lime-300 pointer-events-none"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>

        {/* Right: Upload & Signup */}
        <div className="flex space-x-4">
          <Link to="/upload">
            <button className="bg-lime-500 hover:bg-lime-600 text-sm px-3 py-1 rounded flex items-center space-x-1">
              <Upload size={16} />
              <span>Upload</span>
            </button>
          </Link>
          <button className="bg-white text-green-700 hover:bg-gray-100 text-sm px-3 py-1 rounded flex items-center space-x-1">
            <UserPlus size={16} />
            <span>Sign Up</span>
          </button>
        </div>
      </div>
    </nav>
  );
}
