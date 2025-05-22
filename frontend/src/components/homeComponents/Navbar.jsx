import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Leaf,
  Upload,
  UserPlus,
  Compass,
  LogIn,
  LogOut,
  Menu,
  X,
  MapPin,
  User,
} from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";

export default function Navbar() {
  const [activeTab, setActiveTab] = useState("explore");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const status = localStorage.getItem("isLoggedIn");
    setIsLoggedIn(status === "true");

    const path = location.pathname;
    if (path === "/") setActiveTab("explore");
    else if (path === "/your-observations") setActiveTab("observations");
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
    navigate("/");
    setMobileMenuOpen(false);
  };

  const handleProtectedAction = (e, route) => {
    e.preventDefault();
    if (!isLoggedIn) {
      setAlertMessage("Please log in first to continue.");
      window.scrollTo({ top: 0, behavior: "smooth" });
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } else {
      navigate(route);
      setMobileMenuOpen(false);
    }
  };

  const navItems = [
    {
      name: "Explore",
      icon: <Compass size={18} />,
      path: "/",
      tab: "explore",
      protected: false,
    },
    {
      name: "Your Observations",
      icon: <Leaf size={18} />,
      path: "/your-observations",
      tab: "observations",
      protected: true,
    },
  ];

  return (
    <>
      {/* Alert Banner */}
      <AnimatePresence>
        {alertMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-red-500 text-white text-center py-2 px-4"
          >
            {alertMessage}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navbar */}
      <nav className="bg-green-700 text-white shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Left: Logo and Mobile Menu Button */}
            <div className="flex items-center">
              <button
                className="md:hidden mr-2 text-white focus:outline-none"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>

              <Link to="/" className="flex items-center space-x-2">
                <motion.div whileHover={{ rotate: 15 }}>
                  <Leaf size={28} className="text-lime-300" />
                </motion.div>
                <span className="text-xl font-bold">Nature Explorer</span>
              </Link>
            </div>

            {/* Center: Navigation Links (Desktop) */}
            <div className="hidden md:flex items-center space-x-6 justify-center flex-1">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  onClick={(e) => {
                    if (item.protected) {
                      handleProtectedAction(e, item.path);
                    } else {
                      setActiveTab(item.tab);
                    }
                  }}
                  className={`flex items-center space-x-1 px-3 py-2 rounded-lg transition-colors ${
                    activeTab === item.tab
                      ? "bg-green-600 text-lime-200 font-semibold"
                      : "hover:bg-green-600/50"
                  }`}
                >
                  {item.icon}
                  <span>{item.name}</span>
                </Link>
              ))}
            </div>

            {/* Right: Auth Buttons (Desktop) */}
            <div className="hidden md:flex items-center space-x-4">
              {!isLoggedIn ? (
                <>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={(e) => handleProtectedAction(e, "/upload")}
                    className="bg-lime-500 hover:bg-lime-600 px-3 py-1.5 rounded-full flex items-center space-x-1 text-sm font-medium"
                  >
                    <Upload size={16} />
                    <span>Upload</span>
                  </motion.button>

                  <Link to="/signup">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="bg-white text-green-700 hover:bg-gray-100 px-3 py-1.5 rounded-full flex items-center space-x-1 text-sm font-medium"
                    >
                      <UserPlus size={16} />
                      <span>Sign Up</span>
                    </motion.button>
                  </Link>

                  <Link to="/login">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="bg-white text-green-700 hover:bg-gray-100 px-3 py-1.5 rounded-full flex items-center space-x-1 text-sm font-medium"
                    >
                      <LogIn size={16} />
                      <span>Login</span>
                    </motion.button>
                  </Link>
                </>
              ) : (
                <div className="flex items-center space-x-4">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={(e) => handleProtectedAction(e, "/upload")}
                    className="bg-lime-500 hover:bg-lime-600 px-3 py-1.5 rounded-full flex items-center space-x-1 text-sm font-medium"
                  >
                    <Upload size={16} />
                    <span>Upload</span>
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleLogout}
                    className="bg-red-500 hover:bg-red-600 px-3 py-1.5 rounded-full flex items-center space-x-1 text-sm font-medium"
                  >
                    <LogOut size={16} />
                    <span>Logout</span>
                  </motion.button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden bg-green-800 overflow-hidden"
            >
              <div className="px-4 pt-2 pb-4 space-y-2">
                {navItems.map((item) => (
                  <Link
                    key={`mobile-${item.name}`}
                    to={item.path}
                    onClick={(e) => {
                      if (item.protected) {
                        handleProtectedAction(e, item.path);
                      } else {
                        setActiveTab(item.tab);
                        setMobileMenuOpen(false);
                      }
                    }}
                    className={`block px-4 py-2 rounded-md ${
                      activeTab === item.tab
                        ? "bg-green-600 text-lime-200 font-semibold"
                        : "hover:bg-green-600/50"
                    }`}
                  >
                    {item.name}
                  </Link>
                ))}

                {!isLoggedIn ? (
                  <>
                    <Link
                      to="/signup"
                      className="block px-4 py-2 rounded-md hover:bg-green-600/50"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Sign Up
                    </Link>
                    <Link
                      to="/login"
                      className="block px-4 py-2 rounded-md hover:bg-green-600/50"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Login
                    </Link>
                  </>
                ) : (
                  <>
                    <button
                      onClick={(e) => handleProtectedAction(e, "/upload")}
                      className="block w-full text-left px-4 py-2 rounded-md hover:bg-green-600/50"
                    >
                      Upload
                    </button>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 rounded-md hover:bg-red-600/50"
                    >
                      Logout
                    </button>
                  </>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </>
  );
}
