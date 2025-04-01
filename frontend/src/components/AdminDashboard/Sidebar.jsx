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
    <div className="w-60 h-screen bg-[#F8F8FD] border-r border-gray-200 flex flex-col p-3 relative overflow-hidden">
      {/* Logo */}
      <div className="flex justify-center p-2">
        <h1 className="text-2xl font-bold text-black-800 mb-4 relative z-10">
          Nebulyn
        </h1>
      </div>

      {/* Menu */}
      <nav className="flex-1 relative z-10">
        <ul className="space-y-1">
          <li>
            <Link
              to="/dashboard"
              className={`flex items-center px-3 py-2 rounded-md text-sm relative ${
                isActive("/dashboard")
                  ? "bg-[#E8F0FE] text-[#3B8BEB] font-medium before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:h-6 before:w-1.5 before:bg-[#3B8BEB] before:rounded-full"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <Home size={18} className="mr-2" /> Dashboard
            </Link>
          </li>
          <li>
            <Link
              to="/applications"
              className={`flex items-center px-3 py-2 rounded-md text-sm relative ${
                isActive("/applications")
                  ? "bg-[#E8F0FE] text-[#3B8BEB] font-medium before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:h-6 before:w-1.5 before:bg-[#3B8BEB] before:rounded-full"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <FileText size={18} className="mr-2" /> My Applications
            </Link>
          </li>
          <li>
            <Link
              to="/jobs"
              className={`flex items-center px-3 py-2 rounded-md text-sm relative ${
                isActive("/jobs") || isActive("/description")
                  ? "bg-[#E8F0FE] text-[#3B8BEB] font-medium before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:h-6 before:w-1.5 before:bg-[#3B8BEB] before:rounded-full"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <Search size={18} className="mr-2" /> Find Jobs
            </Link>
          </li>
          <li>
            <Link
              to="/companies"
              className={`flex items-center px-3 py-2 rounded-md text-sm relative ${
                isActive("/companies")
                  ? "bg-[#E8F0FE] text-[#3B8BEB] font-medium before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:h-6 before:w-1.5 before:bg-[#3B8BEB] before:rounded-full"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <Briefcase size={18} className="mr-2" /> Browse Companies
            </Link>
          </li>
          <li>
            <Link
              to="/profile"
              className={`flex items-center px-3 py-2 rounded-md text-sm relative ${
                isActive("/profile")
                  ? "bg-[#E8F0FE] text-[#3B8BEB] font-medium before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:h-6 before:w-1.5 before:bg-[#3B8BEB] before:rounded-full"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <User size={18} className="mr-2" /> My Public Profile
            </Link>
          </li>
        </ul>

        {/* Settings */}
        <div className="border-t border-blue-500 pt-3 relative z-10 mt-3">
          <div className="ml-3 p-2">
            <h1 className="text-xs font-bold text-gray-400 mb-1">SETTINGS</h1>
          </div>
          <ul className="space-y-1">
            <li>
              <Link
                to="/settings"
                className={`flex items-center px-3 py-2 rounded-md text-sm relative ${
                  isActive("/settings")
                    ? "bg-[#E8F0FE] text-[#3B8BEB] font-medium before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:h-6 before:w-1.5 before:bg-[#3B8BEB] before:rounded-full"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                <Settings size={18} className="mr-2" /> Settings
              </Link>
            </li>
            <li>
              <Link
                to="/help"
                className={`flex items-center px-3 py-2 rounded-md text-sm relative ${
                  isActive("/help")
                    ? "bg-[#E8F0FE] text-[#3B8BEB] font-medium before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:h-6 before:w-1.5 before:bg-[#3B8BEB] before:rounded-full"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                <HelpCircle size={18} className="mr-2" /> Help Center
              </Link>
            </li>
          </ul>
        </div>
      </nav>

      {/* Profile Section with Logout Dropdown */}
      <div className="absolute bottom-4 left-3 z-10">
        <div
          className="flex items-center space-x-2 cursor-pointer p-2 rounded-md hover:bg-gray-100"
          onClick={toggleLogout}
        >
          <img
            src="https://via.placeholder.com/36"
            alt="Profile"
            className="w-10 h-10 rounded-full border"
          />
          <div>
            <p className="text-sm font-bold text-gray-800">Jake Gyll</p>
            <p className="text-xs text-gray-500">jakegyll@email.com</p>
          </div>
        </div>

        {/* Logout Dropdown */}
        {showLogout && (
          <div className="absolute bottom-16 left-0 w-full bg-white shadow-lg rounded-md p-2 border border-gray-200 transition-all duration-300">
            <button
              onClick={handleLogout}
              className="flex items-center w-full px-3 py-2 text-red-600 hover:bg-gray-100 rounded-md text-sm"
            >
              <LogOut size={18} className="mr-2" /> Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
