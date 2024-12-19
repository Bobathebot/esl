import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post("http://127.0.0.1:5001/api/login", { email, password });
      if (response.data.success && response.data.role === "teacher") {
        navigate("/teacher");
      } else {
        setError("Invalid credentials");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("Login failed.");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-500">
      <div className="bg-white p-8 rounded shadow-lg w-80">
        <h1 className="text-2xl font-bold mb-4 text-center text-yellow-600">Teacher Login</h1>
        {error && <p className="text-red-500 mb-2 text-center">{error}</p>}
        <input
          type="text"
          placeholder="Email"
          className="w-full border rounded p-2 mb-4 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full border rounded p-2 mb-4 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          onClick={handleLogin}
          className="w-full bg-yellow-500 text-white py-2 rounded-full hover:bg-yellow-600 transition-colors duration-200 font-semibold"
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
