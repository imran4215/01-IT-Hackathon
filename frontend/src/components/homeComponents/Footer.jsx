import React from "react";
import { motion } from "framer-motion";
import {
  FaLeaf,
  FaTwitter,
  FaFacebook,
  FaInstagram,
  FaLinkedin,
} from "react-icons/fa";
import { MdEmail, MdPhone, MdLocationOn } from "react-icons/md";

const Footer = () => {
  const footerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  const socialLinks = [
    { icon: <FaTwitter />, url: "https://twitter.com" },
    { icon: <FaFacebook />, url: "https://facebook.com" },
    { icon: <FaInstagram />, url: "https://instagram.com" },
    { icon: <FaLinkedin />, url: "https://linkedin.com" },
  ];

  const quickLinks = [
    { name: "About Us", url: "/about" },
    { name: "Contact", url: "/contact" },
    { name: "Privacy Policy", url: "/privacy" },
    { name: "Terms of Service", url: "/terms" },
    { name: "Blog", url: "/blog" },
  ];

  const contactInfo = [
    { icon: <MdEmail />, text: "info@natureexplorer.com" },
    { icon: <MdPhone />, text: "+880 1750-249899" },
    {
      icon: <MdLocationOn />,
      text: "MIST, Mirpur Cantonment, Dhaka-1216, Bangladesh",
    },
  ];

  return (
    <footer className="bg-gradient-to-r from-green-700 to-green-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={footerVariants}
        >
          {/* Brand Section */}
          <motion.div className="flex flex-col" variants={itemVariants}>
            <div className="flex items-center mb-4">
              <FaLeaf className="w-6 h-6 mr-2" />
              <h3 className="text-xl font-bold tracking-tight">
                Nature Explorer
              </h3>
            </div>
            <p className="text-sm opacity-80 mb-4">
              Discover and contribute to scientific observations of nature
              worldwide. Join our community of explorers.
            </p>
            <div className="flex space-x-4 mt-2">
              {socialLinks.map((link, index) => (
                <motion.a
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-green-200 transition-colors duration-300 text-lg"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  {link.icon}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div className="flex flex-col" variants={itemVariants}>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link, index) => (
                <motion.li key={index} whileHover={{ x: 5 }}>
                  <a
                    href={link.url}
                    className="text-sm hover:text-green-200 transition-colors duration-300 flex items-center"
                  >
                    <span className="w-1 h-1 bg-white rounded-full mr-2"></span>
                    {link.name}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div className="flex flex-col" variants={itemVariants}>
            <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-3">
              {contactInfo.map((item, index) => (
                <motion.li
                  key={index}
                  className="flex items-start"
                  whileHover={{ x: 5 }}
                >
                  <span className="mr-2 mt-0.5">{item.icon}</span>
                  <span className="text-sm opacity-80">{item.text}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Newsletter */}
          <motion.div className="flex flex-col" variants={itemVariants}>
            <h4 className="text-lg font-semibold mb-4">Newsletter</h4>
            <p className="text-sm opacity-80 mb-4">
              Subscribe to our newsletter for the latest discoveries and
              updates.
            </p>
            <form className="flex flex-col space-y-3">
              <input
                type="email"
                placeholder="Your email address"
                className="px-4 py-2 rounded text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-green-300"
                required
              />
              <motion.button
                type="submit"
                className="bg-green-600 hover:bg-green-500 text-white px-4 py-2 rounded text-sm font-medium transition-colors duration-300"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Subscribe
              </motion.button>
            </form>
          </motion.div>
        </motion.div>

        {/* Divider */}
        <motion.div
          className="mt-10 border-t border-green-500 opacity-30"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        />

        {/* Copyright */}
        <motion.div
          className="mt-6 text-center text-sm opacity-80"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          © {new Date().getFullYear()} Nature Explorer. All rights reserved.
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
