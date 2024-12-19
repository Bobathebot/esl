import React, { useEffect, useState } from "react";
import axios from "axios";

const ManageQuestions = () => {
  const [questions, setQuestions] = useState([]);
  const [archivedQuestions, setArchivedQuestions] = useState([]);

  // States for Add Question card
  const [addQuestionForm, setAddQuestionForm] = useState({ type: "essay", question: "", category: "" });
  const [addQuestionError, setAddQuestionError] = useState("");
  const [addQuestionSuccess, setAddQuestionSuccess] = useState("");

  // States for Generate Exam Link card
  const [selectedQuestions, setSelectedQuestions] = useState([]);
  const [deadline, setDeadline] = useState("");
  const [duration, setDuration] = useState(60);
  const [generateLinkError, setGenerateLinkError] = useState("");
  const [generateLinkSuccess, setGenerateLinkSuccess] = useState("");
  const [generatedLink, setGeneratedLink] = useState("");

  const [showArchived, setShowArchived] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get("https://esl-an62.onrender.com/api/questions");
        const allQ = response.data;
        setQuestions(allQ.filter((q) => !q.archived));
        setArchivedQuestions(allQ.filter((q) => q.archived));
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    };
    fetchQuestions();
  }, []);

  const handleAddQuestionInputChange = (e) => {
    const { name, value } = e.target;
    setAddQuestionForm((prev) => ({ ...prev, [name]: value }));
  };

  const addQuestion = async () => {
    if (!addQuestionForm.question || !addQuestionForm.category) {
      setAddQuestionError("Please fill in all fields.");
      setAddQuestionSuccess("");
      return;
    }

    try {
      const response = await axios.post("https://esl-an62.onrender.com/api/questions", {
        question: addQuestionForm.question,
        category: addQuestionForm.category
      });
      if (response.data.success) {
        setQuestions((prev) => [...prev, response.data.question]);
        setAddQuestionForm({ type: "essay", question: "", category: "" });
        setAddQuestionSuccess("Question added successfully.");
        setAddQuestionError("");
      } else {
        setAddQuestionError("Failed to add question.");
        setAddQuestionSuccess("");
      }
    } catch (error) {
      console.error("Error adding question:", error);
      setAddQuestionError("Error adding question.");
      setAddQuestionSuccess("");
    }
  };

  const archiveQuestion = async (id) => {
    try {
      const response = await axios.patch(`https://esl-an62.onrender.com/api/questions/${id}/archive`);
      if (response.data.success) {
        const updatedQuestion = response.data.question;
        if (updatedQuestion.archived) {
          setQuestions((prev) => prev.filter((q) => q._id !== id));
          setArchivedQuestions((prev) => [...prev, updatedQuestion]);
        } else {
          setArchivedQuestions((prev) => prev.filter((q) => q._id !== id));
          setQuestions((prev) => [...prev, updatedQuestion]);
        }
      } else {
        alert("Failed to update question status.");
      }
    } catch (error) {
      console.error("Error archiving/unarchiving question:", error);
      alert("Error updating question status.");
    }
  };

  const deleteQuestion = async (id) => {
    if (!window.confirm("Are you sure you want to delete this question?")) return;
    try {
      const response = await axios.delete(`https://esl-an62.onrender.com/api/questions/${id}`);
      if (response.data.success) {
        setQuestions((prev) => prev.filter((q) => q._id !== id));
        setArchivedQuestions((prev) => prev.filter((q) => q._id !== id));
      } else {
        alert("Failed to delete question.");
      }
    } catch (error) {
      console.error("Error deleting question:", error);
      alert("Error deleting question.");
    }
  };

  const handleSelectQuestion = (id) => {
    if (selectedQuestions.includes(id)) {
      setSelectedQuestions(selectedQuestions.filter((qid) => qid !== id));
    } else {
      setSelectedQuestions([...selectedQuestions, id]);
    }
  };

  const generateExamLink = async () => {
    setGenerateLinkError("");
    setGenerateLinkSuccess("");
    setGeneratedLink("");

    if (selectedQuestions.length === 0) {
      setGenerateLinkError("Please select at least one question.");
      return;
    }
    if (!deadline) {
      setGenerateLinkError("Please set a deadline for the exam.");
      return;
    }
    if (duration <= 0) {
      setGenerateLinkError("Duration must be a positive number.");
      return;
    }

    try {
      const response = await axios.post("https://esl-an62.onrender.com/api/exams", {
        questionIds: selectedQuestions,
        deadline,
        duration,
      });

      if (response.data.success) {
        setGeneratedLink(response.data.exam.link);
        setGenerateLinkSuccess("Exam link generated successfully.");
        setGenerateLinkError("");
        setSelectedQuestions([]);
      } else {
        setGenerateLinkError("Failed to generate exam link.");
      }
    } catch (error) {
      console.error("Error generating exam link:", error);
      setGenerateLinkError("Error generating exam link.");
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredArchivedQuestions = archivedQuestions.filter((q) =>
    q.question.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 p-4">
      {/* Add New Question Card */}
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">Add New Question</h3>
        {addQuestionError && <p className="text-red-500 mb-2">{addQuestionError}</p>}
        {addQuestionSuccess && <p className="text-green-500 mb-2">{addQuestionSuccess}</p>}
        <div className="space-y-4">
          <div>
            <label className="block text-gray-700">Type:</label>
            <select
              name="type"
              value={addQuestionForm.type}
              onChange={handleAddQuestionInputChange}
              className="w-full border rounded p-2 mt-2"
            >
              <option value="essay">Essay</option>
            </select>
          </div>
          <div>
            <label className="block text-gray-700">Question:</label>
            <textarea
              name="question"
              value={addQuestionForm.question}
              onChange={handleAddQuestionInputChange}
              className="w-full border rounded p-2 mt-2"
              rows="3"
              placeholder="Enter the question here..."
            ></textarea>
          </div>
          <div>
            <label className="block text-gray-700">Category:</label>
            <input
              type="text"
              name="category"
              value={addQuestionForm.category}
              onChange={handleAddQuestionInputChange}
              className="w-full border rounded p-2 mt-2"
              placeholder="e.g., Mathematics"
            />
          </div>
          <button
            onClick={addQuestion}
            className="bg-yellow-500 text-white px-4 py-2 rounded-full hover:bg-yellow-600 transition-colors duration-200"
          >
            Add Question
          </button>
        </div>
      </div>

      {/* Generate Exam Link Card */}
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">Generate Exam Link</h3>
        {generateLinkError && <p className="text-red-500 mb-2">{generateLinkError}</p>}
        {generateLinkSuccess && <p className="text-green-500 mb-2">{generateLinkSuccess}</p>}
        <div className="space-y-4">
          <div>
            <label className="block text-gray-700">Select Questions:</label>
            <div className="max-h-40 overflow-y-auto border rounded p-2 mt-2">
              {questions.map((question) => (
                <div key={question._id} className="flex items-center mb-2">
                  <input
                    type="checkbox"
                    checked={selectedQuestions.includes(question._id)}
                    onChange={() => handleSelectQuestion(question._id)}
                    className="form-checkbox h-4 w-4 text-yellow-600"
                  />
                  <label className="ml-2 text-gray-700">{question.question}</label>
                </div>
              ))}
              {questions.length === 0 && <p className="text-gray-500">No active questions available.</p>}
            </div>
          </div>
          <div>
            <label className="block text-gray-700">Deadline:</label>
            <input
              type="datetime-local"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
              className="w-full border rounded p-2 mt-2"
            />
          </div>
          <div>
            <label className="block text-gray-700">Duration (minutes):</label>
            <input
              type="number"
              value={duration}
              onChange={(e) => setDuration(parseInt(e.target.value))}
              className="w-full border rounded p-2 mt-2"
              min="1"
            />
          </div>
          <button
            onClick={generateExamLink}
            className="bg-yellow-500 text-white px-4 py-2 rounded-full hover:bg-yellow-600 transition-colors duration-200"
          >
            Generate Exam Link
          </button>

          {generatedLink && (
            <div className="mt-4 p-4 bg-green-100 rounded-lg shadow">
              <h4 className="text-md font-semibold text-green-800">Generated Exam Link:</h4>
              <a
                href={generatedLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline break-all"
              >
                {generatedLink}
              </a>
            </div>
          )}
        </div>
      </div>

      {/* Manage Questions List */}
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-700">Manage Questions</h3>
          <button
            onClick={() => setShowArchived(!showArchived)}
            className="bg-gray-500 text-white px-3 py-1 rounded-full hover:bg-gray-600 transition-colors duration-200"
          >
            {showArchived ? "Show Active" : "Show Archived"}
          </button>
        </div>
        {showArchived ? (
          <>
            <h4 className="text-md font-semibold text-gray-600 mb-2">Archived Questions</h4>
            <div className="mb-4">
              <input
                type="text"
                value={searchTerm}
                onChange={handleSearch}
                placeholder="Search archived questions..."
                className="w-full border rounded p-2"
              />
            </div>
            {filteredArchivedQuestions.length === 0 ? (
              <p className="text-gray-500">No archived questions match your search.</p>
            ) : (
              <div className="space-y-4">
                {filteredArchivedQuestions.map((question) => (
                  <div key={question._id} className="p-4 bg-gray-50 rounded-lg shadow flex justify-between items-center">
                    <div>
                      <p className="text-gray-800 font-medium">{question.question}</p>
                      <p className="text-gray-500 text-sm">{question.category}</p>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => archiveQuestion(question._id)}
                        className="bg-yellow-500 text-white px-3 py-1 rounded-full hover:bg-yellow-600"
                        title="Unarchive"
                      >
                        Unarchive
                      </button>
                      <button
                        onClick={() => deleteQuestion(question._id)}
                        className="bg-red-500 text-white px-3 py-1 rounded-full hover:bg-red-600"
                        title="Delete"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        ) : (
          <>
            <h4 className="text-md font-semibold text-gray-600 mb-2">Active Questions</h4>
            {questions.length === 0 ? (
              <p className="text-gray-500">No active questions available.</p>
            ) : (
              <div className="space-y-4">
                {questions.map((question) => (
                  <div key={question._id} className="p-4 bg-gray-50 rounded-lg shadow flex justify-between items-center">
                    <div>
                      <p className="text-gray-800 font-medium">{question.question}</p>
                      <p className="text-gray-500 text-sm">{question.category}</p>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => archiveQuestion(question._id)}
                        className="bg-yellow-500 text-white px-3 py-1 rounded-full hover:bg-yellow-600"
                        title="Archive"
                      >
                        Archive
                      </button>
                      <button
                        onClick={() => deleteQuestion(question._id)}
                        className="bg-red-500 text-white px-3 py-1 rounded-full hover:bg-red-600"
                        title="Delete"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ManageQuestions;
