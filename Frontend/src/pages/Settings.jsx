import React, { useState, useEffect } from "react";
import axios from "axios";

const Settings = () => {
  const [teacherData, setTeacherData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Fetch teacher data on component mount
  useEffect(() => {
    const fetchTeacherData = async () => {
      try {
        const response = await axios.get("https://esl-an62.onrender.com/api/teacher/profile");
        if (response.data.success) {
          setTeacherData({
            name: response.data.teacher.name,
            email: response.data.teacher.email,
            password: "",
          });
        } else {
          setError("Failed to load profile data.");
        }
      } catch (error) {
        console.error("Error fetching teacher data:", error);
        setError("Error fetching profile data.");
      }
    };

    fetchTeacherData();
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    setTeacherData({ ...teacherData, [e.target.name]: e.target.value });
  };

  // Handle profile update
  const handleUpdate = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const { name, email, password } = teacherData;

    // Basic validation
    if (!name || !email) {
      setError("Name and Email are required.");
      return;
    }

    try {
      const payload = { name, email };
      if (password) {
        payload.password = password;
      }

      const response = await axios.put("https://esl-an62.onrender.com/api/teacher/profile", payload);

      if (response.data.success) {
        setSuccess("Profile updated successfully.");
        setTeacherData({ ...teacherData, password: "" });
      } else {
        setError(response.data.message || "Failed to update profile.");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      setError(error.response?.data?.message || "Error updating profile.");
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Settings</h1>
      {error && <div className="bg-red-100 text-red-600 p-2 mb-4 rounded">{error}</div>}
      {success && <div className="bg-green-100 text-green-600 p-2 mb-4 rounded">{success}</div>}
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Update Profile</h2>
        <form onSubmit={handleUpdate}>
          <div className="mb-4">
            <label className="block text-gray-700">Name:</label>
            <input
              type="text"
              name="name"
              value={teacherData.name}
              onChange={handleChange}
              className="w-full border rounded p-2 mt-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Email:</label>
            <input
              type="email"
              name="email"
              value={teacherData.email}
              onChange={handleChange}
              className="w-full border rounded p-2 mt-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">New Password:</label>
            <input
              type="password"
              name="password"
              value={teacherData.password}
              onChange={handleChange}
              className="w-full border rounded p-2 mt-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              placeholder="Leave blank to keep current password"
            />
          </div>
          <button
            type="submit"
            className="bg-yellow-500 text-white px-4 py-2 rounded-full hover:bg-yellow-600 transition-colors duration-200"
          >
            Update Profile
          </button>
        </form>
      </div>
    </div>
  );
};

export default Settings;
