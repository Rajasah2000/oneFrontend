import React, { useState } from "react";
import GoogleIcon from "@mui/icons-material/Google";
import { FaYoutube, FaFacebook, FaInstagram } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import swal from "sweetalert";
import Helpers from "../Helper/Helpers";
import { useCart } from "../context/CartContext";

export default function Auth() {
  const { getAllCartData, userDetails, setUserDetails } = useCart();

  const [isLogin, setIsLogin] = useState(false); // State to toggle between login and signup
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
  });

  const HandleChange = (e) => {
    const { name, value } = e.target; // Get the name and value of the input field
    setCredentials({
      ...credentials, // Spread the existing state
      [name]: value, // Update the specific field
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isLogin) {
      await login(credentials);
    } else {
      await register(credentials);
    }
  };

  // Function to handle login
  const login = async (credentials) => {
    const data = {
      email: credentials?.email,
      password: credentials?.password,
    };

    try {
      const res = await Helpers("/user/login", "POST", data);
      if (res && res?.status) {
        localStorage.setItem("usertoken", res?.token);
        localStorage.setItem("isUserAuthenticated", "true");
        localStorage.setItem("id", res?.data?._id);
        setCredentials(credentials);
        setUserDetails(res?.data);
        swal("Login", res?.msg, "success");
        getAllCartData();
        navigate("/");
      } else {
        swal("Login Failed!", "User not found.!", "error");
      }
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  // Function to handle register
  const register = async (credentials) => {
    const data = {
      name: credentials?.name,
      email: credentials?.email,
      password: credentials?.password,
    };

    try {
      const res = await Helpers("/user/register", "POST", data);
      if (res && res?.status) {
        swal("Registration Successful!", res?.msg, "success");
        setIsLogin(true);
        setCredentials({ ...credentials, name: "", password: "" });
      } else {
        swal("Registration Failed!", res?.msg || "Error occurred.", "error");
      }
    } catch (error) {
      console.error("Registration error:", error);
    }
  };

  return (
    <div className="flex h-screen">
      {/* Left Side - Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-8 bg-white">
        <div className="w-full max-w-md">
          <h1 className="text-3xl font-bold mb-2 text-center">
            <span style={{ color: "#4CAF50" }}>O</span>
            <span style={{ color: "#E91E63" }}>N</span>
            <span style={{ color: "#2196F3" }}>E</span>
            <span style={{ color: "#9C27B0" }}>F</span>
            <span style={{ color: "#00BCD4" }}>I</span>
            <span style={{ color: "#FF4081" }}>T</span> SPORTS
          </h1>
          <h2 className="text-xl text-gray-600 text-center mb-6">
            {isLogin ? "Log in" : "Sign up"}
          </h2>

          <button className="flex items-center justify-center w-full border border-gray-800 text-gray-800 rounded-lg py-2 mb-4 transition-transform transform hover:scale-105">
            <GoogleIcon className="mr-2" />
            {isLogin ? "Log in with Google" : "Sign up with Google"}
          </button>

          <form className="space-y-4" onSubmit={handleSubmit}>
            {!isLogin && (
              <input
                type="text"
                placeholder="Name"
                name="name"
                value={credentials?.name}
                onChange={(e) => HandleChange(e)}
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-800"
              />
            )}
            <input
              type="email"
              name="email"
              value={credentials?.email}
              onChange={(e) => HandleChange(e)}
              placeholder="E-mail address"
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-800"
            />
            <input
              type="password"
              name="password"
              value={credentials?.password}
              onChange={(e) => HandleChange(e)}
              placeholder="Password"
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-800"
            />
            <button
              type="submit"
              className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-900 transition-colors"
            >
              {isLogin ? "Log in" : "Create account"}
            </button>
          </form>

          {/* Links for switching between Login and Signup */}
          <div className="mt-4 text-center">
            {isLogin ? (
              <>
                <Link
                  to={"/forgot-password"}
                  className="text-gray-800 hover:underline"
                >
                  Forgot Password?
                </Link>
                <div className="mt-2">
                  <span className="text-gray-600 hover:underline">
                    Don't have an account?{" "}
                  </span>
                  <button
                    onClick={() => setIsLogin(false)}
                    className="text-gray-800 hover:underline"
                  >
                    Sign up
                  </button>
                </div>
              </>
            ) : (
              <div className="mt-2">
                <span className="text-gray-600 hover:underline">
                  Already have an account?{" "}
                </span>
                <button
                  onClick={() => setIsLogin(true)}
                  className="text-gray-950 hover:underline"
                >
                  Log in
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Right Side - Brand Information */}
      <div
        className="hidden md:flex w-1/2 bg-cover bg-center relative"
        style={{ backgroundImage: "url(/path-to-background.jpg)" }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-80 flex flex-col justify-center items-center text-center p-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white uppercase tracking-wider mb-4">
            Welcome to ONEFIT SPORTS Community
          </h1>
          <p className="text-gray-300 text-lg md:text-xl mb-6 max-w-lg">
            Gear up with high-performance sportswear designed for athletes like
            you. Join the movement and discover our latest collection.
          </p>
          <div className="w-24 h-1 bg-white rounded-full my-4"></div>

          {/* Social Media Profiles */}
          <div className="flex space-x-8 mt-6">
            <div className="text-center">
              <FaYoutube className="text-white text-3xl hover:text-gray-500 transition-transform" />
              <p className="text-gray-400 mt-2">15K Followers</p>
            </div>
            <div className="text-center">
              <FaFacebook className="text-white text-3xl hover:text-gray-500 transition-transform" />
              <p className="text-gray-400 mt-2">12K Followers</p>
            </div>
            <div className="text-center">
              <FaInstagram className="text-white text-3xl hover:text-gray-500 transition-transform" />
              <p className="text-gray-400 mt-2">20K Followers</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
