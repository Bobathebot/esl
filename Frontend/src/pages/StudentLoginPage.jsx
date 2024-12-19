import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';

const StudentLoginPage = () => {
  const [email, setEmail] = useState('');
  const [studentId, setStudentId] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogin = async () => {
    try {
      const response = await axios.post('https://esl-an62.onrender.com/api/students/validate', { email, studentId });
      if (response.data.success) {
        sessionStorage.setItem('studentEmail', email);
        sessionStorage.setItem('studentId', studentId);

        const params = new URLSearchParams(location.search);
        const examId = params.get('examId');
        if (examId) {
          navigate(`/student/exam/${examId}`);
        } else {
          navigate('/student/exams');
        }
      } else {
        setError('Invalid student details.');
      }
    } catch (err) {
      console.error("Student login error:", err);
      setError('Failed to login.');
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-500">
      <div className="bg-white p-8 rounded shadow-lg w-80">
        <h1 className="text-2xl font-bold mb-4 text-center text-yellow-600">Student Login</h1>
        {error && <p className="text-red-500 mb-2 text-center">{error}</p>}
        <input
          type="text"
          placeholder="Email"
          className="w-full border rounded p-2 mb-4 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="text"
          placeholder="Student ID"
          className="w-full border rounded p-2 mb-4 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          value={studentId}
          onChange={(e) => setStudentId(e.target.value)}
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

export default StudentLoginPage;
