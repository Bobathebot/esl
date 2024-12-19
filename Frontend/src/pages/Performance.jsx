import React, { useState } from "react";
import axios from "axios";

const Performance = () => {
  const [studentIdInput, setStudentIdInput] = useState("");
  const [submissions, setSubmissions] = useState([]);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedSubmission, setSelectedSubmission] = useState(null);

  const fetchPerformance = async () => {
    setError("");
    setSubmissions([]);
    setSelectedSubmission(null);

    if (!studentIdInput) {
      setError("Please enter a student ID.");
      return;
    }

    try {
      const response = await axios.get(`http://localhost:5001/api/performance/${studentIdInput}`);
      if (response.data.success) {
        setSubmissions(response.data.submissions);
      } else {
        setError("No performance data found.");
      }
    } catch (err) {
      console.error("Error fetching performance data:", err);
      setError("Failed to fetch performance data.");
    }
  };

  const exportToCSV = () => {
    if (submissions.length === 0) {
      alert("No data to export.");
      return;
    }

    const headers = ["Exam ID", "Submitted At", "Score (Approx)", "Grade"];
    const rows = submissions.map((sub) => {
      // Approx score from first answer analysis if available
      const firstAnswer = sub.answers[0];
      const score = firstAnswer && firstAnswer.analysis ? firstAnswer.analysis.score : "N/A";
      const grade = firstAnswer && firstAnswer.analysis ? firstAnswer.analysis.grade : "N/A";
      return [sub.examId._id, new Date(sub.submittedAt).toLocaleString(), score, grade];
    });

    let csvContent = "data:text/csv;charset=utf-8," 
      + headers.join(",") + "\n"
      + rows.map(r => r.join(",")).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `performance_${studentIdInput}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const viewDetails = (submission) => {
    setSelectedSubmission(submission);
    setShowModal(true);
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow space-y-6 min-h-screen">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-700">Performance</h1>
        <button
          onClick={exportToCSV}
          className="bg-yellow-500 text-white px-4 py-2 rounded-full hover:bg-yellow-600 font-semibold"
        >
          Export to CSV
        </button>
      </div>
      <div className="flex items-center space-x-4">
        <input
          type="text"
          placeholder="Enter Student ID"
          value={studentIdInput}
          onChange={(e) => setStudentIdInput(e.target.value)}
          className="border rounded p-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
        />
        <button
          onClick={fetchPerformance}
          className="bg-yellow-500 text-white px-4 py-2 rounded-full hover:bg-yellow-600 font-semibold"
        >
          Fetch Performance
        </button>
      </div>
      {error && <p className="text-red-500">{error}</p>}
      {submissions.length > 0 && (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 bg-gray-50">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Exam ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Submitted At
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Score
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Grade
                </th>
                <th className="px-6 py-3"></th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {submissions.map((sub) => {
                const firstAns = sub.answers[0];
                const score = firstAns?.analysis?.score ?? "N/A";
                const grade = firstAns?.analysis?.grade ?? "N/A";
                return (
                  <tr key={sub._id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {sub.examId._id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {new Date(sub.submittedAt).toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {score}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {grade}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-right">
                      <button
                        onClick={() => viewDetails(sub)}
                        className="bg-yellow-500 text-white px-3 py-1 rounded-full hover:bg-yellow-600"
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal for viewing details */}
      {showModal && selectedSubmission && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
          <div className="bg-white rounded-lg shadow-lg max-w-2xl w-full p-6 relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-2 right-2 bg-red-500 text-white px-3 py-1 rounded-full hover:bg-red-600"
            >
              X
            </button>
            <h2 className="text-xl font-bold text-gray-700 mb-4">Submission Details</h2>
            <p className="mb-2"><strong>Exam ID:</strong> {selectedSubmission.examId._id}</p>
            <p className="mb-4"><strong>Submitted At:</strong> {new Date(selectedSubmission.submittedAt).toLocaleString()}</p>

            <div className="space-y-4 max-h-64 overflow-auto">
              {selectedSubmission.answers.map((ans, idx) => (
                <div key={idx} className="bg-gray-50 p-4 rounded shadow">
                  <h3 className="font-semibold text-gray-800 mb-2">{ans.questionId.question}</h3>
                  <div
                    className="text-gray-700"
                    dangerouslySetInnerHTML={{ __html: ans.analysis.highlightedAnswer }}
                  ></div>
                  <p className="mt-2"><strong>Grade:</strong> {ans.analysis.grade} | <strong>Score:</strong> {ans.analysis.score}</p>
                </div>
              ))}
            </div>

            {/* Past performance could be shown here if you have multiple submissions.
                Currently, we show the entire list on the main table. You can also show older submissions inside this modal if desired.
            */}
          </div>
        </div>
      )}
    </div>
  );
};

export default Performance;
