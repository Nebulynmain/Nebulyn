import React from "react";
import {
  Home,
  Building,
  Users,
  Clipboard,
  Calendar,
  HelpCircle,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();

  // Function to check active path
  const isActive = (path) => location.pathname === path;
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
              to="/company-dashboard"
              className={`flex items-center px-4 py-3 rounded-lg relative ${
                isActive("/company-dashboard")
                  ? "bg-[#E8F0FE] text-[#3B8BEB] font-medium before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:h-8 before:w-1.5 before:bg-[#3B8BEB] before:rounded-full"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <Home size={20} className="mr-3" /> Dashboard
            </Link>
          </li>
          <li>
            <Link
              to="/company-profile"
              className={`flex items-center px-4 py-3 rounded-lg relative ${
                isActive("/company-profile")
                  ? "bg-[#E8F0FE] text-[#3B8BEB] font-medium before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:h-8 before:w-1.5 before:bg-[#3B8BEB] before:rounded-full"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <Building size={20} className="mr-3" /> Company Profile
            </Link>
          </li>
          <li>
            <Link
              to="/applicants"
              className={`flex items-center px-4 py-3 rounded-lg relative ${
                isActive("/applicants") ||
                isActive("/applicant-detail") ||
                isActive("/job-posting")
                  ? "bg-[#E8F0FE] text-[#3B8BEB] font-medium before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:h-8 before:w-1.5 before:bg-[#3B8BEB] before:rounded-full"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <Users size={20} className="mr-3" /> All Applicants
            </Link>
          </li>
          <li>
            <Link
              to="/job-listing"
              className={`flex items-center px-4 py-3 rounded-lg relative ${
                isActive("/job-listing") || isActive("/job-applicant")
                  ? "bg-[#E8F0FE] text-[#3B8BEB] font-medium before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:h-8 before:w-1.5 before:bg-[#3B8BEB] before:rounded-full"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <Clipboard size={20} className="mr-3" /> Job Listing
            </Link>
          </li>
          <li>
            <Link
              to="/schedule"
              className={`flex items-center px-4 py-3 rounded-lg relative ${
                isActive("/schedule")
                  ? "bg-[#E8F0FE] text-[#3B8BEB] font-medium before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:h-8 before:w-1.5 before:bg-[#3B8BEB] before:rounded-full"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <Calendar size={20} className="mr-3" /> My Schedule
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
                to="/company-settings"
                className={`flex items-center px-4 py-3 rounded-lg relative ${
                  isActive("/company-settings")
                    ? "bg-[#E8F0FE] text-[#3B8BEB] font-medium before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:h-8 before:w-1.5 before:bg-[#3B8BEB] before:rounded-full"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                <HelpCircle size={20} className="mr-3" /> Settings
              </Link>
            </li>
            <li>
              <Link
                to="/company-help"
                className={`flex items-center px-4 py-3 rounded-lg relative ${
                  isActive("/company-help")
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

      {/* Profile Section */}
      <div className="absolute bottom-6 left-4 flex items-center space-x-3 relative z-10">
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
    </div>
  );
};

export default Sidebar;
