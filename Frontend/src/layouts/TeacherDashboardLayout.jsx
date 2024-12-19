import React from "react";
import { Outlet, Link } from "react-router-dom";

const TeacherDashboardLayout = () => {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="bg-gray-800 text-white w-64 space-y-6 py-7 px-2">
        <h1 className="text-3xl font-bold text-center text-yellow-500">ESL Teacher</h1>
        <nav>
          <Link to="/teacher" className="block py-2 px-4 hover:bg-gray-700">
            Summary
          </Link>
          <Link to="/teacher/questions" className="block py-2 px-4 hover:bg-gray-700">
            Manage Questions
          </Link>
          <Link to="/teacher/performance" className="block py-2 px-4 hover:bg-gray-700">
            Performance
          </Link>
          <Link to="/teacher/notifications" className="block py-2 px-4 hover:bg-gray-700">
            Notifications
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 bg-gray-100 p-6">
        <Outlet />
      </main>
    </div>
  );
};

export default TeacherDashboardLayout;
