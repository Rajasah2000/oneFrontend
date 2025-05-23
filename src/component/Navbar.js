import { Link, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import {
  FaSearch,
  FaUserAlt,
  FaShoppingCart,
  FaBars,
  FaTimes,
  FaChevronDown,
  FaSignInAlt,
  FaClipboardList,
} from "react-icons/fa";
import { useCart } from "../context/CartContext";
import Helpers from "../Helper/Helpers";

const Navbar = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [profileDropdown, setProfileDropdown] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(true); // State for login

  const {
    cartData,
    setCartData,
    getAllCartData,
    allOrder,
    setAllOrder,
    getAllOrder,
  } = useCart();
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [CategoryValue, setCategoryDataValue] = useState("Category");

  useEffect(() => {
    window.scrollTo(0, 0);
    // getAllOrders();
    getAllCategory();
  }, []);

  const getAllCategory = async () => {
    try {
      const res = await Helpers("/admin/category/get", "GET", null, {});
      if (res && res?.status) {
        setCategories(res?.data);
      } else {
        console.log("Failed to fetch categories");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDropdownClick = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("isUserAuthenticated");
    localStorage.removeItem("id");
    localStorage.removeItem("usertoken");

    navigate("/");
  };

  const handleProfileDropdown = () => {
    setProfileDropdown(!profileDropdown);
  };

  return (
    <nav className="bg-white text-black shadow-md py-4 fixed w-full top-0 z-50 px-8">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="flex-shrink-0 flex items-center">
          <Link to="/" className="flex flex-col items-center">
            <div
              className="text-3xl font-bold tracking-tight"
              style={{ fontFamily: "Arial, sans-serif" }}
            >
              <span style={{ color: "#4CAF50" }}>O</span>
              <span style={{ color: "#E91E63" }}>N</span>
              <span style={{ color: "#2196F3" }}>E</span>
              <span style={{ color: "#9C27B0" }}>F</span>
              <span style={{ color: "#00BCD4" }}>I</span>
              <span style={{ color: "#FF4081" }}>T</span>
            </div>
            <div className="text-sm font-bold text-gray-600 -mt-1">SPORTS</div>
          </Link>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-8 items-center">
          {/* Categories Dropdown */}
          <div
            className="relative py-3"
            onMouseEnter={() => setDropdownOpen(true)}
            onMouseLeave={() => setDropdownOpen(false)}
          >
            <button className="text-lg flex items-center focus:outline-none">
              {CategoryValue}
              <FaChevronDown
                className="ml-2"
                onClick={() => handleDropdownClick(isDropdownOpen)}
              />
            </button>
            {isDropdownOpen && (
              <div className="absolute bg-black text-white mt-2 rounded shadow-md w-32 z-20">
                {categories.map((category) => (
                  <Link
                    onClick={() => setCategoryDataValue(category?.name)}
                    key={category.id}
                    to={`/category/${category.name.toLowerCase()}`}
                    className="block px-4 py-2 hover:bg-white hover:text-black transition duration-300"
                  >
                    {category.name}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Icons */}
          <div className="flex space-x-4 text-lg relative">
            <FaSearch className="cursor-pointer hover:text-gray-400" />

            {/* User/Sign-In Icon with Logout and Profile */}
            <div className="relative">
              {localStorage?.getItem("isUserAuthenticated") ? (
                <div className="relative group">
                  <FaUserAlt
                    className="cursor-pointer hover:text-gray-400"
                    onClick={() => handleProfileDropdown(!profileDropdown)}
                  />
                  {profileDropdown && (
                    <div className="absolute right-0 mt-2 bg-white text-black rounded shadow-md w-32 z-20">
                      <button
                        onClick={() => {
                          // navigate("/profile");
                          setProfileDropdown(false);
                        }}
                        className="block w-full px-4 py-2 text-left hover:bg-gray-200"
                      >
                        My Profile
                      </button>

                      {/* Orders Icon */}
                      <Link
                        to={`/order`}
                        className="relative px-3"
                        onClick={() => setProfileDropdown(false)}
                      >
                        <span className=" bg-blue-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                          {allOrder?.length} My Orders
                        </span>
                      </Link>

                      <button
                        onClick={handleLogout}
                        className="block w-full px-4 py-2 text-left text-red-600 hover:bg-gray-200"
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <FaSignInAlt
                  onClick={() => navigate("/signup")}
                  className="cursor-pointer hover:text-gray-400"
                />
              )}
            </div>

            {/* Cart Icon */}
            <Link to={`/cart`} className="relative">
              <FaShoppingCart className="cursor-pointer hover:text-gray-400" />
              {cartData?.length > 0 && (
                <span className="absolute -top-2 -right-5 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                  {cartData?.length}
                </span>
              )}
            </Link>
          </div>
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
        <div className="md:hidden bg-black text-white p-4 space-y-4">
          {/* Categories Dropdown */}
          <div>
            <button
              onClick={handleDropdownClick}
              className="w-full flex justify-between items-center px-4 py-2 text-lg focus:outline-none"
            >
              Categories <FaChevronDown className="ml-2" />
            </button>
            {isDropdownOpen && (
              <div className="bg-gray-800 text-white mt-2 rounded shadow-md w-full">
                {categories.map((category) => (
                  <Link
                    key={category.id}
                    to={`/category/${category.name.toLowerCase()}`}
                    className="block px-4 py-2 hover:bg-gray-600 transition duration-300"
                    onClick={() => setMobileMenuOpen(false)} // Close after click
                  >
                    {category.name}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* User Sign-In / Profile */}
          <div className="relative">
            {localStorage?.getItem("isUserAuthenticated") ? (
              <div>
                <button
                  onClick={() => handleProfileDropdown(!profileDropdown)}
                  className="flex items-center px-4 py-2 text-lg focus:outline-none"
                >
                  <FaUserAlt className="mr-2" /> My Account
                </button>
                {profileDropdown && (
                  <div className="absolute right-0 bg-white text-black rounded shadow-md w-full z-20">
                    <button
                      onClick={() => navigate("/profile")}
                      className="block w-full px-4 py-2 hover:bg-gray-200"
                    >
                      My Profile
                    </button>
                    <button className="block w-full px-4 py-2 hover:bg-gray-200">
                      <Link
                        to={`/order`}
                        className="block w-full px-4 py-2 hover:bg-gray-200"
                      >
                        My Orders{" "}
                        <span className="ml-2 text-blue-500">
                          {allOrder?.length}
                        </span>
                      </Link>
                    </button>
                    <button
                      onClick={handleLogout}
                      className="block w-full px-4 py-2 text-red-600 hover:bg-gray-200"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={() => navigate("/signup")}
                className="flex items-center px-4 py-2 text-lg focus:outline-none"
              >
                <FaSignInAlt className="mr-2" /> Sign In
              </button>
            )}
          </div>

          {/* Cart */}
          <Link
            to={`/cart`}
            className="relative flex items-center px-4 py-2 text-lg"
          >
            <FaShoppingCart className="mr-2" />
            Cart
            {cartData?.length > 0 && (
              <span className="ml-2 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                {cartData?.length}
              </span>
            )}
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
