import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const StudentExam = () => {
  const { link } = useParams();
  const [exam, setExam] = useState(null);
  const [answers, setAnswers] = useState({});
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchExam = async () => {
      const token = localStorage.getItem("studentToken");
      if (!token) {
        navigate("/student/login");
        return;
      }

      try {
        const response = await axios.get(`https://esl-an62.onrender.com/api/exams/${link}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.data.success) {
          setExam(response.data.exam);
        } else {
          setError(response.data.message || "Failed to load exam.");
        }
      } catch (error) {
        console.error("Error fetching exam:", error);
        setError("Error fetching exam.");
      }
    };

    fetchExam();
  }, [link, navigate]);

  const handleChange = (e, questionId) => {
    const { value } = e.target;
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
  };

  const handleSubmit = async () => {
    const token = localStorage.getItem("studentToken");
    if (!token) {
      navigate("/student/login");
      return;
    }

    // Validate that all questions have been answered
    for (const q of exam.questionIds) {
      if (!answers[q._id]) {
        setError("Please answer all questions before submitting.");
        return;
      }
    }

    try {
      // Submit answers to the backend
      const response = await axios.post(
        `https://esl-an62.onrender.com/api/exams/${link}/submit`,
        { answers },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data.success) {
        setSuccess("Exam submitted successfully.");
        setError("");
        // Redirect to student dashboard after a short delay
        setTimeout(() => {
          navigate("/student");
        }, 2000);
      } else {
        setError(response.data.message || "Failed to submit exam.");
        setSuccess("");
      }
    } catch (error) {
      console.error("Error submitting exam:", error);
      setError("Error submitting exam.");
      setSuccess("");
    }
  };

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <p className="text-red-500">{error}</p>
          <button
            onClick={() => navigate("/student/login")}
            className="mt-4 bg-yellow-500 text-white px-4 py-2 rounded-full hover:bg-yellow-600 transition-colors duration-200"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  if (!exam) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="text-gray-700">Loading exam...</div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-lg my-10">
      <h2 className="text-2xl font-semibold text-gray-700 mb-6">Exam</h2>
      <p className="text-gray-600 mb-4">
        Deadline: {new Date(exam.deadline).toLocaleString()} | Duration: {exam.duration} minutes
      </p>
      <form>
        {exam.questionIds.map((question, index) => (
          <div key={question._id} className="mb-6">
            <h3 className="text-lg font-medium text-gray-700 mb-2">
              {index + 1}. {question.question}
            </h3>
            <textarea
              value={answers[question._id] || ""}
              onChange={(e) => handleChange(e, question._id)}
              className="w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              rows="4"
              placeholder="Your answer..."
            ></textarea>
          </div>
        ))}
        <button
          type="button"
          onClick={handleSubmit}
          className="bg-yellow-500 text-white px-6 py-2 rounded-full hover:bg-yellow-600 transition-colors duration-200"
        >
          Submit Exam
        </button>
        {success && <p className="text-green-500 mt-4">{success}</p>}
      </form>
    </div>
  );
};

export default StudentExam;
