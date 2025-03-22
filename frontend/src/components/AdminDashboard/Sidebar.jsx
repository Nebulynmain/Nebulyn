import React, { useState } from "react";
import {
  Home,
  FileText,
  Search,
  Briefcase,
  User,
  Settings,
  HelpCircle,
  LogOut,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();
  const [showLogout, setShowLogout] = useState(false);

  // Function to check active path
  const isActive = (path) => location.pathname === path;

  // Toggle logout dropdown
  const toggleLogout = () => {
    setShowLogout(!showLogout);
  };

  // Handle logout functionality
  const handleLogout = () => {
    // Add your logout logic here
    console.log("Logging out...");
    // You might want to redirect to login page or call a logout API
  };

  return (
    <div className="w-80 h-screen bg-[#F8F8FD] border-r border-gray-200 flex flex-col p-4 relative overflow-hidden">
      {/* Logo */}
      <div className="flex justify-center p-3">
        <h1 className="text-3xl font-bold text-black-800 mb-6 relative z-10">
          Nebulyn
        </h1>
      </div>

      {/* Menu */}
      <nav className="flex-1 relative z-10">
        <ul className="space-y-1">
          <li>
            <Link
              to="/dashboard"
              className={`flex items-center px-4 py-3 rounded-lg relative ${
                isActive("/dashboard")
                  ? "bg-[#E8F0FE] text-[#3B8BEB] font-medium before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:h-8 before:w-1.5 before:bg-[#3B8BEB] before:rounded-full"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <Home size={20} className="mr-3" /> Dashboard
            </Link>
          </li>
          <li>
            <Link
              to="/applications"
              className={`flex items-center px-4 py-3 rounded-lg relative ${
                isActive("/applications")
                  ? "bg-[#E8F0FE] text-[#3B8BEB] font-medium before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:h-8 before:w-1.5 before:bg-[#3B8BEB] before:rounded-full"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <FileText size={20} className="mr-3" /> My Applications
            </Link>
          </li>
          <li>
            <Link
              to="/jobs"
              className={`flex items-center px-4 py-3 rounded-lg relative ${
                isActive("/jobs") || isActive("/description")
                  ? "bg-[#E8F0FE] text-[#3B8BEB] font-medium before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:h-8 before:w-1.5 before:bg-[#3B8BEB] before:rounded-full"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <Search size={20} className="mr-3" /> Find Jobs
            </Link>
          </li>

          <li>
            <Link
              to="/companies"
              className={`flex items-center px-4 py-3 rounded-lg relative ${
                isActive("/companies")
                  ? "bg-[#E8F0FE] text-[#3B8BEB] font-medium before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:h-8 before:w-1.5 before:bg-[#3B8BEB] before:rounded-full"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <Briefcase size={20} className="mr-3" /> Browse Companies
            </Link>
          </li>
          <li>
            <Link
              to="/profile"
              className={`flex items-center px-4 py-3 rounded-lg relative ${
                isActive("/profile")
                  ? "bg-[#E8F0FE] text-[#3B8BEB] font-medium before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:h-8 before:w-1.5 before:bg-[#3B8BEB] before:rounded-full"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <User size={20} className="mr-3" /> My Public Profile
            </Link>
          </li>
        </ul>

        {/* Settings */}
        <div className="border-t border-blue-500 pt-4 relative z-10 mt-4">
          <div className=" ml-4 p-3">
            <h1 className="text-md font-bold text-gray-400 mb-1 relative z-10">
              SETTINGS
            </h1>
          </div>
          <ul className="space-y-1">
            <li>
              <Link
                to="/settings"
                className={`flex items-center px-4 py-3 rounded-lg relative ${
                  isActive("/settings")
                    ? "bg-[#E8F0FE] text-[#3B8BEB] font-medium before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:h-8 before:w-1.5 before:bg-[#3B8BEB] before:rounded-full"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                <Settings size={20} className="mr-3" /> Settings
              </Link>
            </li>
            <li>
              <Link
                to="/help"
                className={`flex items-center px-4 py-3 rounded-lg relative ${
                  isActive("/help")
                    ? "bg-[#E8F0FE] text-[#3B8BEB] font-medium before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:h-8 before:w-1.5 before:bg-[#3B8BEB] before:rounded-full"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                <HelpCircle size={20} className="mr-3" /> Help Center
              </Link>
            </li>
          </ul>
        </div>
      </nav>

      {/* Profile Section with Logout Dropdown */}
      <div className="absolute bottom-6 left-4 z-10">
        <div
          className="flex items-center space-x-3 cursor-pointer p-2 rounded-lg hover:bg-gray-100"
          onClick={toggleLogout}
        >
          <img
            src="https://via.placeholder.com/40"
            alt="Profile"
            className="w-12 h-12 rounded-full border"
          />
          <div>
            <p className="text-lg font-bold text-gray-800">Jake Gyll</p>
            <p className="text-sm text-gray-500">jakegyll@email.com</p>
          </div>
        </div>

        {/* Logout Dropdown */}
        {showLogout && (
          <div className="absolute bottom-20 left-0 w-full bg-white shadow-lg rounded-lg p-2 border border-gray-200 transition-all duration-300">
            <button
              onClick={handleLogout}
              className="flex items-center w-full px-4 py-3 text-red-600 hover:bg-gray-100 rounded-lg cursor-pointer"
            >
              <LogOut size={20} className="mr-3" /> Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
