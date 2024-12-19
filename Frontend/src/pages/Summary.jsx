import React, { useEffect, useState } from "react";
import axios from "axios";
import { io } from "socket.io-client";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { UserGroupIcon } from "@heroicons/react/24/outline";

const socket = io("http://127.0.0.1:5001");

const Summary = () => {
  const [summary, setSummary] = useState({ enrolledStudents: 0, totalSubmissions: 0, remaining: 0 });
  const [students, setStudents] = useState([]);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedSubmission, setSelectedSubmission] = useState(null);
  const [gradeDistribution, setGradeDistribution] = useState({ Gold: 0, Silver: 0, Bronze: 0 });

  useEffect(() => {
    fetchSummaryData();
    socket.on("newSubmission", (data) => {
      console.log("Summary received newSubmission event:", data);
      fetchSummaryData();
    });
    return () => {
      socket.off("newSubmission");
    };
  }, []);

  const fetchSummaryData = async () => {
    try {
      const [studentsRes, submissionsRes] = await Promise.all([
        axios.get("http://127.0.0.1:5001/api/students"),
        axios.get("http://127.0.0.1:5001/api/submissions"),
      ]);

      const enrolledStudents = studentsRes.data.length;
      const totalSubmissions = submissionsRes.data.length;
      const remaining = Math.max(enrolledStudents - totalSubmissions, 0);

      const emailToSubmission = {};
      let goldCount = 0;
      let silverCount = 0;
      let bronzeCount = 0;

      submissionsRes.data.forEach((sub) => {
        const email = sub.email;
        if (!emailToSubmission[email] || new Date(sub.submittedAt) > new Date(emailToSubmission[email].submittedAt)) {
          emailToSubmission[email] = sub;
        }

        if (sub.answers.length > 0 && sub.answers[0].analysis) {
          const g = sub.answers[0].analysis.grade;
          if (g === "Gold") goldCount++;
          else if (g === "Silver") silverCount++;
          else bronzeCount++;
        } else {
          bronzeCount++;
        }
      });

      setGradeDistribution({ Gold: goldCount, Silver: silverCount, Bronze: bronzeCount });

      const updatedStudents = studentsRes.data.map((student) => {
        const sub = emailToSubmission[student.email];
        let latestGrade = "N/A";
        let latestScore = "N/A";
        if (sub && sub.answers[0] && sub.answers[0].analysis) {
          latestGrade = sub.answers[0].analysis.grade;
          latestScore = sub.answers[0].analysis.score;
        }
        return {
          ...student,
          latestSubmission: sub || null,
          latestGrade,
          latestScore
        };
      });

      setSummary({ enrolledStudents, totalSubmissions, remaining });
      setStudents(updatedStudents);
    } catch (error) {
      console.error("Error fetching summary data:", error);
      setError("Failed to load summary data.");
    }
  };

  const viewDetails = (submission) => {
    console.log("viewDetails called with submission:", submission);
    setSelectedSubmission(submission);
    setShowModal(true);
  };

  const gradeData = [
    { name: 'Gold', value: gradeDistribution.Gold },
    { name: 'Silver', value: gradeDistribution.Silver },
    { name: 'Bronze', value: gradeDistribution.Bronze },
  ];

  return (
    <div className="space-y-6">
      {error && <p className="text-red-500">{error}</p>}

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Enrolled Students Card */}
        <div className="bg-white p-6 rounded-lg shadow-lg flex items-center">
          <div className="bg-yellow-500 text-white p-3 rounded-full mr-4">
            <UserGroupIcon className="h-6 w-6"/>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-700">Enrolled Students</h3>
            <p className="mt-2 text-3xl font-bold text-gray-900">{summary.enrolledStudents}</p>
          </div>
        </div>
        {/* Total Submissions Card */}
        <div className="bg-white p-6 rounded-lg shadow-lg flex items-center">
          <div className="bg-yellow-500 text-white p-3 rounded-full mr-4">
            <svg className="h-6 w-6" fill="none" stroke="white" strokeWidth="2" 
                 viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 11l3 3L22 4"></path>
              <path d="M19 21H5a2 2 0 01-2-2V7a2 2 0 012-2h4l2-2h2l2 2h4a2 2 0 012 2v12a2 2 0 01-2 2z"></path>
            </svg>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-700">Total Submissions</h3>
            <p className="mt-2 text-3xl font-bold text-gray-900">{summary.totalSubmissions}</p>
          </div>
        </div>
        {/* Remaining Submissions Card */}
        <div className="bg-white p-6 rounded-lg shadow-lg flex items-center">
          <div className="bg-yellow-500 text-white p-3 rounded-full mr-4">
            <svg className="h-6 w-6" fill="none" stroke="white" strokeWidth="2" 
                 viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <path d="M12 6v6l4 2"></path>
            </svg>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-700">Remaining Submissions</h3>
            <p className="mt-2 text-3xl font-bold text-gray-900">{summary.remaining}</p>
          </div>
        </div>
      </div>

      {/* Grade Distribution Bar Chart */}
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">Grade Distribution</h3>
        <div className="overflow-auto">
          <BarChart width={500} height={300} data={gradeData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name"/>
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="value" fill="#f59e0b" />
          </BarChart>
        </div>
      </div>
      {/* Students Table */}
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">Students Latest Results</h3>
        {students.length === 0 ? (
          <p className="text-gray-500">No students enrolled.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 bg-gray-50">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Latest Score</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Latest Grade</th>
                  <th className="px-6 py-3"></th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {students.map((student) => (
                  <tr key={student._id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{student.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{student.studentId}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{student.email}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{student.latestScore}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{student.latestGrade}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-right">
                      {student.latestSubmission && (
                        <button
                          onClick={() => viewDetails(student.latestSubmission)}
                          className="bg-yellow-500 text-white px-3 py-1 rounded-full hover:bg-yellow-600"
                        >
                          View Details
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal for Submission Details */}
      {showModal && selectedSubmission && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
          <div className="bg-white rounded-lg shadow-lg max-w-2xl w-full p-6 relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-2 right-2 bg-red-500 text-white px-3 py-1 rounded-full hover:bg-red-600"
            >
              X
            </button>
            <h2 className="text-xl font-bold text-gray-700 mb-4">Latest Submission Details</h2>
            <p className="mb-2"><strong>Exam ID:</strong> {selectedSubmission.examId?._id}</p>
            <p className="mb-4"><strong>Submitted At:</strong> {new Date(selectedSubmission.submittedAt).toLocaleString()}</p>
            <div className="space-y-4 max-h-64 overflow-auto">
              {selectedSubmission.answers.map((ans, idx) => (
                <div key={idx} className="bg-gray-50 p-4 rounded shadow">
                  <h3 className="font-semibold text-gray-800 mb-2">{ans.questionId.question}</h3>
                  <div
                    className="text-gray-700 border-l-4 border-gray-300 pl-4 mb-2"
                    dangerouslySetInnerHTML={{ __html: ans.analysis.highlightedAnswer }}
                  ></div>
                  <div className="mt-2 flex items-center space-x-4">
                    <p className="text-sm">
                      <strong>Grade:</strong>{" "}
                      <span
                        className={
                          ans.analysis.grade === "Gold"
                            ? "text-yellow-600 font-semibold"
                            : ans.analysis.grade === "Silver"
                            ? "text-gray-500 font-semibold"
                            : "text-amber-700 font-semibold"
                        }
                      >
                        {ans.analysis.grade}
                      </span>
                    </p>
                    <p className="text-sm">
                      <strong>Score:</strong> {ans.analysis.score}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Summary;
