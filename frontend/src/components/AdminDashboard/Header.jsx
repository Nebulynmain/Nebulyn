import React from "react";
import { FaBell } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";

const Header = () => {
  const location = useLocation();

  // Mapping paths to titles
  const pathToTitle = {
    "/dashboard": "Dashboard",
    "/applications": "My Applications",
    "/jobs": "Find Jobs",
    "/companies": "",
    "/profile": "My Public Profile",
    "/settings": "Settings",
    "/help": "Help Center",
  };

  // Get the current title or fallback to "Dashboard"
  const title = pathToTitle[location.pathname];

  return (
    <header className="bg-white border-b border-gray-200 flex items-center justify-between p-6">
      {/* Dynamic Page Title */}
      <h1 className="text-4xl -mt-2 font-bold text-gray-900">{title}</h1>

      <div className="flex items-center space-x-8 px-4 py-2">
        {/* Back to Homepage Button */}
        <Link
          to="/"
          className="border border-blue-700 text-blue-700 px-4 py-2 font-semibold hover:bg-blue-50 w-full text-center block"
        >
          Back to homepage
        </Link>

        {/* Notification Icon with Badge */}
        <div className="relative">
          <FaBell className="text-gray-600 w-6 h-6" />
          <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-red-500 rounded-full"></span>
        </div>
      </div>
    </header>
  );
};

export default Header;
