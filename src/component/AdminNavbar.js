// src/component/AdminNavbar.js
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContextAdmin";
import { FaBars, FaTimes, FaChevronDown } from "react-icons/fa";

const AdminNavbar = () => {
  const { logout } = useAuth();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isProductsDropdownOpen, setProductsDropdownOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/admin/login");
  };

  return (
    <nav className="bg-black text-white py-4 fixed w-full top-0 z-50 px-2">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="text-2xl font-bold">
          <Link to="/admin/dashboard">OneFit Admin</Link>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-8 items-center">
          <Link to="/admin/dashboard" className="hover:text-gray-400">
            Dashboard
          </Link>

          {/* Products Dropdown */}
          <div className="relative">
            <button
              onClick={() => setProductsDropdownOpen(!isProductsDropdownOpen)}
              className="flex items-center space-x-2 hover:text-gray-400 focus:outline-none"
            >
              <span>Products</span>
              <FaChevronDown />
            </button>

            {/* Dropdown Links */}
            {isProductsDropdownOpen && (
              <div className="absolute top-full left-0 mt-2 bg-white text-black shadow-lg rounded w-48">
                <Link
                  to="/admin/products"
                  className="block px-4 py-2 hover:bg-gray-200"
                  onClick={() => setProductsDropdownOpen(false)} // Close dropdown
                >
                  All Products
                </Link>

                <Link
                  to="/admin/addProduct"
                  className="block px-4 py-2 hover:bg-gray-200"
                  onClick={() => setProductsDropdownOpen(false)} // Close dropdown
                >
                  Add Product
                </Link>
              </div>
            )}
          </div>

          <Link to="/admin/categories" className="hover:text-gray-400">
            Categories
          </Link>
          <Link to="/admin/color" className="hover:text-gray-400">
            Color
          </Link>
          <Link to="/admin/orders" className="hover:text-gray-400">
            Orders
          </Link>
          <Link to="/admin/users" className="hover:text-gray-400">
            Users
          </Link>

          {isAuthenticated && (
            <button
              onClick={handleLogout}
              className="bg-white text-black p-2 rounded hover:bg-blue-700"
            >
              Logout
            </button>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
            className="text-2xl focus:outline-none"
          >
            {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-black text-white p-4">
          <Link
            to="/admin/dashboard"
            className="block px-4 py-2 hover:bg-white hover:text-black transition duration-300"
            onClick={() => setMobileMenuOpen(false)}
          >
            Dashboard
          </Link>

          {/* Mobile Products Dropdown */}
          <div className="block">
            <button
              onClick={() => setProductsDropdownOpen(!isProductsDropdownOpen)}
              className="block px-4 py-2 hover:bg-white hover:text-black transition duration-300 w-full text-left"
            >
              Products <FaChevronDown className="inline" />
            </button>

            {/* Dropdown Links */}
            {isProductsDropdownOpen && (
              <div className="bg-gray-800">
                <Link
                  to="/admin/products"
                  className="block px-6 py-2 hover:bg-white hover:text-black transition duration-300"
                  onClick={() => {
                    setProductsDropdownOpen(false); // Close dropdown
                    setMobileMenuOpen(false); // Close mobile menu
                  }}
                >
                  All Products
                </Link>
                <Link
                  to="/admin/products/details"
                  className="block px-6 py-2 hover:bg-white hover:text-black transition duration-300"
                  onClick={() => {
                    setProductsDropdownOpen(false); // Close dropdown
                    setMobileMenuOpen(false); // Close mobile menu
                  }}
                >
                  Product Details
                </Link>
                <Link
                  to="/admin/products/add"
                  className="block px-6 py-2 hover:bg-white hover:text-black transition duration-300"
                  onClick={() => {
                    setProductsDropdownOpen(false); // Close dropdown
                    setMobileMenuOpen(false); // Close mobile menu
                  }}
                >
                  Add Product
                </Link>
              </div>
            )}
          </div>

          <Link
            to="/admin/categories"
            className="block px-4 py-2 hover:bg-white hover:text-black transition duration-300"
            onClick={() => setMobileMenuOpen(false)}
          >
            Categories
          </Link>
          <Link
            to="/admin/orders"
            className="block px-4 py-2 hover:bg-white hover:text-black transition duration-300"
            onClick={() => setMobileMenuOpen(false)}
          >
            Orders
          </Link>
          <Link
            to="/admin/users"
            className="block px-4 py-2 hover:bg-white hover:text-black transition duration-300"
            onClick={() => setMobileMenuOpen(false)}
          >
            Users
          </Link>

          {isAuthenticated && (
            <button
              onClick={() => {
                handleLogout();
                setMobileMenuOpen(false); // Close the menu after logout
              }}
              className="bg-white text-black p-2 rounded hover:bg-blue-700 w-full mt-2"
            >
              Logout
            </button>
          )}
        </div>
      )}
    </nav>
  );
};

export default AdminNavbar;
