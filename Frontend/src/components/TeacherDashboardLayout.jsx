import React, { useState } from "react";
import { Outlet, Link, useNavigate, useLocation } from "react-router-dom";
import {
  HomeIcon,
  ClipboardDocumentListIcon,
  UserGroupIcon,
  ChartBarIcon,
  BellIcon,
  Cog6ToothIcon,
  ArrowLeftOnRectangleIcon,
  CalendarIcon,
  Bars3Icon,
} from "@heroicons/react/24/outline";

const TeacherDashboardLayout = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div
        className={`bg-gray-800 text-white flex flex-col transition-all duration-200 ${
          sidebarCollapsed ? "w-20" : "w-64"
        }`}
      >
        <div className="p-4 flex items-center justify-between">
          {!sidebarCollapsed && (
            <h2 className="text-2xl font-bold text-yellow-400">ESL English</h2>
          )}
          <button
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="text-white hover:text-yellow-400"
            title="Toggle Sidebar"
          >
            <Bars3Icon className="h-6 w-6" />
          </button>
        </div>
        <nav className="mt-4 flex-1 space-y-2">
          <Link
            to="/teacher"
            className={`flex items-center px-6 py-2 ${
              isActive("/teacher") ? "bg-gray-700" : "hover:bg-gray-700"
            } text-white`}
          >
            <HomeIcon className="h-6 w-6 mr-3" />
            {!sidebarCollapsed && "Dashboard"}
          </Link>
          <Link
            to="/teacher/questions"
            className={`flex items-center px-6 py-2 ${
              isActive("/teacher/questions") ? "bg-gray-700" : "hover:bg-gray-700"
            } text-white`}
          >
            <ClipboardDocumentListIcon className="h-6 w-6 mr-3" />
            {!sidebarCollapsed && "Manage Questions"}
          </Link>
          <Link
            to="/teacher/students"
            className={`flex items-center px-6 py-2 ${
              isActive("/teacher/students") ? "bg-gray-700" : "hover:bg-gray-700"
            } text-white`}
          >
            <UserGroupIcon className="h-6 w-6 mr-3" />
            {!sidebarCollapsed && "Manage Students"}
          </Link>
          <Link
            to="/teacher/performance"
            className={`flex items-center px-6 py-2 ${
              isActive("/teacher/performance") ? "bg-gray-700" : "hover:bg-gray-700"
            } text-white`}
          >
            <ChartBarIcon className="h-6 w-6 mr-3" />
            {!sidebarCollapsed && "Performance"}
          </Link>
          <Link
            to="/teacher/notifications"
            className={`flex items-center px-6 py-2 ${
              isActive("/teacher/notifications") ? "bg-gray-700" : "hover:bg-gray-700"
            } text-white`}
          >
            <BellIcon className="h-6 w-6 mr-3" />
            {!sidebarCollapsed && "Notifications"}
          </Link>
          <Link
            to="/teacher/settings"
            className={`flex items-center px-6 py-2 ${
              isActive("/teacher/settings") ? "bg-gray-700" : "hover:bg-gray-700"
            } text-white`}
          >
            <Cog6ToothIcon className="h-6 w-6 mr-3" />
            {!sidebarCollapsed && "Settings"}
          </Link>
        </nav>
        <div className="p-6 border-t border-gray-700">
          <button
            onClick={handleLogout}
            className="flex items-center w-full text-white hover:bg-gray-700 px-4 py-2 rounded-full"
          >
            <ArrowLeftOnRectangleIcon className="h-6 w-6 mr-3" />
            {!sidebarCollapsed && "Logout"}
          </button>
        </div>
      </div>

      <div className="flex-1 flex flex-col">
        {/* Top Navbar */}
        <header className="flex justify-between items-center p-4 bg-white shadow">
          <div className="flex items-center space-x-4">
            <Link to="/teacher/calendar" className="relative" title="Calendar">
              <CalendarIcon className="h-6 w-6 text-gray-700 hover:text-yellow-400 transition duration-200" />
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <Link to="/teacher/notifications" className="relative" title="Notifications">
              <BellIcon className="h-6 w-6 text-gray-700 hover:text-yellow-400 transition duration-200" />
            </Link>
            <div className="relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center focus:outline-none"
              >
                <div className="h-8 w-8 bg-gray-400 text-white rounded-full flex items-center justify-center font-bold">
                  L
                </div>
              </button>
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
                  <Link
                    to="/teacher/settings"
                    className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    Settings
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsDropdownOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        <main className="flex-1 bg-gray-100 p-6 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default TeacherDashboardLayout;
