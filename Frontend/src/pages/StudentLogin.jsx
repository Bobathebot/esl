import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const StudentLogin = () => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = async () => {
    if (!credentials.email || !credentials.password) {
      setError("Please enter both email and password.");
      return;
    }

    try {
      const response = await axios.post("https://esl-an62.onrender.com:/api/students/login", credentials);
      if (response.data.success) {
        // Save the token (e.g., in localStorage)
        localStorage.setItem("studentToken", response.data.token);
        // Redirect to student dashboard or exam page
        navigate("/student");
      } else {
        setError(response.data.message || "Login failed.");
      }
    } catch (error) {
      console.error("Error during student login:", error);
      setError("An error occurred during login.");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-semibold text-gray-700 mb-6">Student Login</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <div className="space-y-4">
          <div>
            <label className="block text-gray-700">Email:</label>
            <input
              type="email"
              name="email"
              value={credentials.email}
              onChange={handleChange}
              className="w-full border rounded p-2 mt-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              placeholder="Enter your email"
            />
          </div>
          <div>
            <label className="block text-gray-700">Password:</label>
            <input
              type="password"
              name="password"
              value={credentials.password}
              onChange={handleChange}
              className="w-full border rounded p-2 mt-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              placeholder="Enter your password"
            />
          </div>
          <button
            onClick={handleLogin}
            className="w-full bg-yellow-500 text-white px-4 py-2 rounded-full hover:bg-yellow-600 transition-colors duration-200"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default StudentLogin;
