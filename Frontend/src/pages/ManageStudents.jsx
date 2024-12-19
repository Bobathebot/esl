// frontend/src/pages/ManageStudents.jsx

import React, { useState, useEffect } from "react";
import axios from "axios";

const ManageStudents = () => {
  const [students, setStudents] = useState([]);
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    studentId: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Fetch all students
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get("https://esl-an62.onrender.com/api/students");
        setStudents(response.data);
      } catch (error) {
        console.error("Error fetching students:", error);
      }
    };

    fetchStudents();
  }, []);

  // Handle form input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle adding a new student
  const handleAddStudent = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const { email, name, studentId } = formData;

    // Basic validation
    if (!email || !name || !studentId) {
      setError("All fields are required.");
      return;
    }

    try {
      const response = await axios.post("https://esl-an62.onrender.com/api/students", {
        email,
        name,
        studentId,
      });

      if (response.data.success) {
        setStudents([...students, response.data.student]);
        setFormData({ email: "", name: "", studentId: "" });
        setSuccess("Student added successfully.");
      } else {
        setError("Failed to add student.");
      }
    } catch (error) {
      console.error("Error adding student:", error);
      setError(error.response?.data?.error || "Failed to add student.");
    }
  };

  // Handle deleting a student
  const handleDeleteStudent = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this student?");
    if (!confirmDelete) return;

    try {
      const response = await axios.delete(`http://localhost:5001/api/students/${id}`);
      if (response.data.success) {
        setStudents(students.filter((student) => student._id !== id));
      } else {
        alert("Failed to delete student.");
      }
    } catch (error) {
      console.error("Error deleting student:", error);
      alert(error.response?.data?.error || "Failed to delete student.");
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-semibold text-gray-800 mb-6">Manage Students</h1>

      {/* Add Student Form */}
      <div className="bg-white shadow-md rounded-lg p-6 mb-8">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Add New Student</h2>
        {error && <div className="bg-red-100 text-red-600 p-2 mb-4 rounded">{error}</div>}
        {success && <div className="bg-green-100 text-green-600 p-2 mb-4 rounded">{success}</div>}
        <form onSubmit={handleAddStudent}>
          <div className="flex flex-wrap items-center space-x-4 mb-4">
            <input
              type="email"
              name="email"
              className="flex-grow border rounded-md p-2"
              placeholder="Student Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="name"
              className="flex-grow border rounded-md p-2"
              placeholder="Student Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="studentId"
              className="flex-grow border rounded-md p-2"
              placeholder="Student ID"
              value={formData.studentId}
              onChange={handleChange}
              required
            />
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-md"
            >
              Add Student
            </button>
          </div>
        </form>
      </div>

      {/* Students List */}
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Student List</h2>
        {students.length === 0 ? (
          <p className="text-gray-600">No students added yet.</p>
        ) : (
          <table className="table-auto w-full">
            <thead>
              <tr className="text-left bg-gray-200">
                <th className="p-2">Email</th>
                <th className="p-2">Name</th>
                <th className="p-2">Student ID</th>
                <th className="p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => (
                <tr key={student._id} className="border-t">
                  <td className="p-2">{student.email}</td>
                  <td className="p-2">{student.name}</td>
                  <td className="p-2">{student.studentId}</td>
                  <td className="p-2">
                    <button
                      onClick={() => handleDeleteStudent(student._id)}
                      className="bg-red-500 text-white px-2 py-1 rounded-md text-sm"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default ManageStudents;
