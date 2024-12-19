import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { io } from "socket.io-client";
import LoginPage from "./pages/LoginPage";
import TeacherDashboardLayout from "./components/TeacherDashboardLayout";
import StudentDashboard from "./pages/StudentDashboard"; // If needed
import ManageQuestions from "./pages/ManageQuestions";
import ManageStudents from "./pages/ManageStudents";
import Performance from "./pages/Performance";
import DetailedPerformance from "./pages/DetailedPerformance";
import Notifications from "./pages/Notifications";
import Summary from "./pages/Summary";
import NotFound from "./pages/NotFound";
import ErrorBoundary from "./components/ErrorBoundary";
import StudentLoginPage from "./pages/StudentLoginPage";
import StudentExamPage from "./pages/StudentExamPage";

function App() {
  useEffect(() => {
    const socket = io("https://esl-an62.onrender.com", {
      transports: ["websocket", "polling"],
    });

    socket.on("connect", () => {
      console.log("Connected to Socket.io server", socket.id);
    });

    socket.on("disconnect", () => {
      console.log("Disconnected from Socket.io server");
    });

    socket.on("notification", (data) => {
      console.log("Received notification:", data);
      // You can implement custom handling of notifications here
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <Router>
      <ErrorBoundary>
        <Routes>
          {/* Teacher Login */}
          <Route path="/" element={<LoginPage />} />

          {/* Teacher Dashboard */}
          <Route path="/teacher" element={<TeacherDashboardLayout />}>
            <Route index element={<Summary />} />
            <Route path="questions" element={<ManageQuestions />} />
            <Route path="students" element={<ManageStudents />} />
            <Route path="performance" element={<Performance />} />
            <Route path="performance/:studentId" element={<DetailedPerformance />} />
            <Route path="notifications" element={<Notifications />} />
            <Route path="settings" element={<div>Settings Page (To Be Implemented)</div>} />
          </Route>

          {/* Student Pages */}
          <Route path="/student/login" element={<StudentLoginPage />} />
          <Route path="/student/exam/:examId" element={<StudentExamPage />} />
          {/* Optional: A student's dashboard or exams listing page if needed:
              <Route path="/student/exams" element={<StudentDashboard />} />
          */}

          {/* Not Found */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </ErrorBoundary>
    </Router>
  );
}

export default App;
