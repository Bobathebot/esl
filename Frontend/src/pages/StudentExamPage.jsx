import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const StudentExamPage = () => {
  const { examId } = useParams();
  const navigate = useNavigate();
  const [exam, setExam] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(null);
  const [hasStarted, setHasStarted] = useState(false);

  const studentEmail = sessionStorage.getItem("studentEmail");
  const studentStudentId = sessionStorage.getItem("studentId");

  useEffect(() => {
    if (!studentEmail || !studentStudentId) {
      navigate(`/student/login?examId=${examId}`);
      return;
    }

    const fetchExam = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL || "https://esl-an62.onrender.com"}/api/exams/${examId}`);
        if (response.data.success) {
          setExam(response.data.exam);
          setTimeLeft(response.data.exam.duration * 60); // Duration in seconds
        } else {
          setError("Exam not found.");
        }
      } catch (err) {
        console.error("Error fetching exam:", err);
        setError("Failed to load exam.");
      } finally {
        setLoading(false);
      }
    };

    fetchExam();
  }, [examId, navigate, studentEmail, studentStudentId]);

  useEffect(() => {
    let timer;
    if (hasStarted && timeLeft > 0) {
      timer = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    } else if (timeLeft === 0) {
      submitExam();
    }
    return () => clearInterval(timer);
  }, [hasStarted, timeLeft]);

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  const handleAnswerChange = (questionId, value) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
  };

  const startExam = () => {
    setHasStarted(true);
  };

  const submitExam = async () => {
    if (!exam) return;

    const submissionAnswers = exam.questions.map((q) => ({
      questionId: q.id,
      answer: answers[q.id] || "",
    }));

    try {
      const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL || "https://esl-an62.onrender.com"}/api/submissions`, {
        email: studentEmail,
        examId: exam._id,
        answers: submissionAnswers,
      });
      if (response.data.success) {
        alert("Exam submitted successfully.");
        navigate("/student/exams");
      } else {
        alert("Failed to submit exam.");
      }
    } catch (err) {
      console.error("Error submitting exam:", err);
      alert("Error submitting exam.");
    }
  };

  if (loading) return <div className="p-6 text-center">Loading exam...</div>;
  if (error) return <div className="p-6 text-red-500 text-center">{error}</div>;
  if (!exam) return null;

  return (
    <div className="p-6 bg-yellow-50 min-h-screen flex items-center justify-center">
      <div className="max-w-4xl w-full bg-white rounded-3xl shadow-xl overflow-hidden">
        {!hasStarted ? (
          <>
            <div className="p-8 text-center bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 text-white rounded-t-3xl">
              <h1 className="text-3xl font-bold mb-4">Exam Information</h1>
              <p className="text-lg mb-2">
                <strong>Deadline:</strong> {new Date(exam.deadline).toLocaleString()}
              </p>
              <p className="text-lg mb-4">
                <strong>Duration:</strong> {exam.duration} minutes
              </p>
              <button
                onClick={startExam}
                className="bg-white text-yellow-600 px-6 py-3 rounded-full font-semibold shadow-md hover:bg-yellow-100 transition"
              >
                Start Exam
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 text-white py-4 px-6 rounded-t-3xl">
              <div className="flex justify-between items-center">
                <h1 className="text-xl font-bold">Exam</h1>
                <p className="text-lg font-bold">
                  Time Left: <span className="text-red-600">{formatTime(timeLeft)}</span>
                </p>
              </div>
            </div>
            <div className="p-6">
              <div className="space-y-6">
                {exam.questions.map((q, index) => (
                  <div key={q.id} className="bg-gray-50 p-6 rounded-xl shadow-md">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">
                      Q{index + 1}. {q.question}
                    </h3>
                    <textarea
                      className="w-full border rounded-md p-4 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                      rows="4"
                      placeholder="Type your answer here..."
                      value={answers[q.id] || ""}
                      onChange={(e) => handleAnswerChange(q.id, e.target.value)}
                    ></textarea>
                  </div>
                ))}
              </div>
              <button
                onClick={submitExam}
                className={`mt-6 w-full py-3 rounded-full text-white font-semibold ${
                  timeLeft === 0 ? "bg-gray-400 cursor-not-allowed" : "bg-yellow-500 hover:bg-yellow-600"
                } transition duration-200 shadow-md`}
                disabled={timeLeft === 0}
              >
                {timeLeft === 0 ? "Time's Up" : "Submit Exam"}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default StudentExamPage;
