import React, { useState } from "react";
import {
  Home,
  Building,
  Users,
  Clipboard,
  Calendar,
  HelpCircle,
  Settings,
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
      <div className="flex justify-center py-2">
        <h1 className="text-2xl font-bold text-black-800 mb-4 relative z-10">
          Nebulyn
        </h1>
      </div>

      {/* Menu */}
      <nav className="flex-1 relative z-10">
        <ul className="space-y-0.5">
          <li>
            <Link
              to="/company-dashboard"
              className={`flex items-center px-3 py-2 rounded-lg relative text-sm ${
                isActive("/company-dashboard")
                  ? "bg-[#E8F0FE] text-[#3B8BEB] font-medium before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:h-6 before:w-1 before:bg-[#3B8BEB] before:rounded-full"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <Home size={16} className="mr-2" /> Dashboard
            </Link>
          </li>
          <li>
            <Link
              to="/company-profile"
              className={`flex items-center px-3 py-2 rounded-lg relative text-sm  ${
                isActive("/company-profile")
                  ? "bg-[#E8F0FE] text-[#3B8BEB] font-medium before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:h-6 before:w-1 before:bg-[#3B8BEB] before:rounded-full"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <Building size={16} className="mr-2" /> Company Profile
            </Link>
          </li>
          <li>
            <Link
              to="/applicants"
              className={`flex items-center px-3 py-2 rounded-lg relative text-sm ${
                isActive("/applicants") ||
                isActive("/applicant-detail") ||
                isActive("/job-posting")
                  ? "bg-[#E8F0FE] text-[#3B8BEB] font-medium before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:h-6 before:w-1 before:bg-[#3B8BEB] before:rounded-full"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <Users size={16} className="mr-2" /> All Applicants
            </Link>
          </li>
          <li>
            <Link
              to="/job-listing"
              className={`flex items-center px-3 py-2 rounded-lg relative text-sm ${
                isActive("/job-listing") || isActive("/job-applicant")
                  ? "bg-[#E8F0FE] text-[#3B8BEB] font-medium before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:h-6 before:w-1 before:bg-[#3B8BEB] before:rounded-full"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <Clipboard size={16} className="mr-2" /> Job Listing
            </Link>
          </li>
          <li>
            <Link
              to="/schedule"
              className={`flex items-center px-3 py-2 rounded-lg relative text-sm ${
                isActive("/schedule")
                  ? "bg-[#E8F0FE] text-[#3B8BEB] font-medium before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:h-6 before:w-1 before:bg-[#3B8BEB] before:rounded-full"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <Calendar size={16} className="mr-2" /> My Schedule
            </Link>
          </li>
        </ul>

        {/* Settings */}
        <div className="border-t border-blue-500 pt-3 relative z-10 mt-3">
          <div className="ml-3 py-1">
            <h1 className="text-xs font-bold text-gray-400 mb-1 relative z-10">
              SETTINGS
            </h1>
          </div>
          <ul className="space-y-0.5">
            <li>
              <Link
                to="/company-settings"
                className={`flex items-center px-3 py-2 rounded-lg relative text-sm ${
                  isActive("/company-settings")
                    ? "bg-[#E8F0FE] text-[#3B8BEB] font-medium before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:h-6 before:w-1 before:bg-[#3B8BEB] before:rounded-full"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                <Settings size={16} className="mr-2" /> Settings
              </Link>
            </li>
            <li>
              <Link
                to="/company-help"
                className={`flex items-center px-3 py-2 rounded-lg relative text-sm ${
                  isActive("/company-help")
                    ? "bg-[#E8F0FE] text-[#3B8BEB] font-medium before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:h-6 before:w-1 before:bg-[#3B8BEB] before:rounded-full"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                <HelpCircle size={16} className="mr-2" /> Help Center
              </Link>
            </li>
          </ul>
        </div>
      </nav>

      {/* Profile Section with Logout Dropdown */}
      <div className="absolute bottom-4 left-3 z-10">
        <div
          className="flex items-center space-x-2 cursor-pointer p-2 rounded-lg hover:bg-gray-100"
          onClick={toggleLogout}
        >
          <img
            src="https://via.placeholder.com/40"
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
          <div className="absolute bottom-16 left-0 w-full bg-white shadow-lg rounded-lg p-2 border border-gray-200 transition-all duration-300">
            <button
              onClick={handleLogout}
              className="flex items-center w-full px-3 py-2 text-red-600 hover:bg-gray-100 rounded-lg cursor-pointer"
            >
              <LogOut size={16} className="mr-2" /> Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
