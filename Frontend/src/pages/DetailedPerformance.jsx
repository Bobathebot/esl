// src/pages/DetailedPerformance.jsx

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const DetailedPerformance = () => {
  const { studentId } = useParams(); // Assuming studentId is passed in URL
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch student performance data
    const fetchPerformance = async () => {
      try {
        const response = await axios.get(`http://localhost:5001/api/performance/${studentId}`);
        if (response.data.success) {
          setSubmissions(response.data.submissions);
        } else {
          alert("No performance data found.");
        }
      } catch (error) {
        console.error("Error fetching performance data:", error);
        alert("Failed to fetch performance data.");
      } finally {
        setLoading(false);
      }
    };

    fetchPerformance();
  }, [studentId]);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Detailed Performance for {studentId}</h1>
      {loading ? (
        <p>Loading performance data...</p>
      ) : submissions.length === 0 ? (
        <p>No submissions found for this student.</p>
      ) : (
        <div className="space-y-6">
          {submissions.map((submission) => (
            <div key={submission._id} className="bg-white shadow-md rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-2">Exam ID: {submission.examId}</h2>
              <p className="mb-2">
                <strong>Submitted At:</strong> {new Date(submission.submittedAt).toLocaleString()}
              </p>
              <p className="mb-4">
                <strong>Grade:</strong> {submission.answers.reduce((acc, curr) => acc + (curr.analysis.score || 0), 0)}%
              </p>
              <div className="space-y-4">
                {submission.answers.map((ans, idx) => (
                  <div key={idx} className="border-t pt-4">
                    <p className="font-semibold">
                      Question {idx + 1}: {ans.questionId.question} {/* Adjusted to show question text */}
                    </p>
                    <p>
                      <strong>Your Answer:</strong>{" "}
                      <span
                        className="whitespace-pre-wrap"
                        dangerouslySetInnerHTML={{
                          __html: ans.answer, // Ensure answer is sanitized
                        }}
                      />
                    </p>
                    <p>
                      <strong>Feedback:</strong>{" "}
                      <span
                        className={`${
                          ans.analysis.score < 70 ? "text-red-600" : "text-green-600"
                        }`}
                      >
                        {ans.analysis.feedback}
                      </span>
                    </p>
                    <p>
                      <strong>Score:</strong> {ans.analysis.score}%
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DetailedPerformance;
