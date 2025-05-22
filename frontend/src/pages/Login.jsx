import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/homeComponents/Navbar";

export default function Login() {
  const [formData, setFormData] = useState({
    identifier: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        formData
      );

      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("userId", res.data.user._id);

      alert("Login successful! Redirecting to home...");
      navigate("/");
    } catch (error) {
      alert("Login failed! " + (error.response?.data?.message || ""));
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex justify-center bg-green-50 mt-20">
        <form
          onSubmit={handleSubmit}
          className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md border border-green-100"
        >
          <h2 className="text-2xl font-bold mb-6 text-center text-green-800">
            Welcome Back
          </h2>

          <div className="mb-4">
            <label
              className="block text-green-700 text-sm font-bold mb-2"
              htmlFor="identifier"
            >
              Username or Email
            </label>
            <input
              type="text"
              name="identifier"
              placeholder="Enter your username or email"
              onChange={handleChange}
              className="w-full px-4 py-2 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>

          <div className="mb-6">
            <label
              className="block text-green-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              onChange={handleChange}
              className="w-full px-4 py-2 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>

          <button
            type="submit"
            className="cursor-pointer w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg transition duration-200"
          >
            Login
          </button>

          <div className="mt-4 text-center">
            <p className="text-green-700">
              Don't have an account?{" "}
              <a
                href="/signup"
                className="text-green-600 hover:text-green-800 font-semibold underline"
                onClick={(e) => {
                  e.preventDefault();
                  navigate("/signup");
                }}
              >
                Sign up here
              </a>
            </p>
          </div>
        </form>
      </div>
    </>
  );
}
