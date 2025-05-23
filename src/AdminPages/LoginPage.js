// LoginPage.js
import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContextAdmin";
var mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  // const [error, setError] = useState("");
  const { login } = useAuth();
  // const navigate = useNavigate();

  const validation = useMemo(() => {
    if (
      username !== "" &&
      username.match(mailFormat) &&
      password !== "" &&
      password.length >= 6 &&
      emailError === "" &&
      passwordError === ""
    ) {
      return true;
    } else {
      return false;
    }
  }, [username, password, emailError, passwordError]);

  const EmailChecking = () => {
    if (username === "") {
      setEmailError("Email field cannot be blank.");
    } else if (username && !username.match(mailFormat)) {
      setEmailError("Please enter  valid email.");
    } else {
      setEmailError("");
    }
  };

  const PasswordChecking = () => {
    if (password === "") {
      setPasswordError("Password field cannot be blank.");
    } else if (password && password.length < 6) {
      setPasswordError("Password length must be greater than 5.");
    } else {
      setPasswordError("");
    }
  };
  const handleLogin = (e) => {
    e.preventDefault();

    if (validation) {
      try {
        login({ username, password });
      } catch (error) {
        console.error(error);
      }
    } else {
      EmailChecking();
      PasswordChecking();
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form
        className="w-96 p-6 bg-gray-100 rounded-lg shadow-lg"
        onSubmit={handleLogin}
      >
        <h2 className="text-2xl font-bold mb-6">Admin Login</h2>

        {emailError && <p className="text-red-500 mb-4">{emailError}</p>}

        <div className="mb-4">
          <label className="block mb-2 text-sm">Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>
        {passwordError && <p className="text-red-500 mb-4">{passwordError}</p>}
        <div className="mb-4">
          <label className="block mb-2 text-sm">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-700"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
