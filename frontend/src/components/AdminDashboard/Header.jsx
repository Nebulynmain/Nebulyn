import React, { useState } from "react";
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
    "/description": "Job Description",
  };
  const notifications = [
    {
      id: 1,
      name: "Jan Mayer",
      message: "invited you to interview with Nomad",
      avatar: "/avatar1.png",
      status: "New",
      statusColor: "text-yellow-500",
      time: "12 mins ago",
    },
    {
      id: 2,
      name: "Jana Alicia",
      message: "from Udacity updated your job applications status",
      avatar: "/avatar2.png",
      status: "Shortlisted",
      statusColor: "bg-green-100 text-green-600 px-2 py-0.5 rounded-md",
      time: "3 days ago",
    },
    {
      id: 3,
      name: "Ally Wales",
      message: "from Digital Ocean sent you an interview invitation",
      avatar: "/avatar3.png",
      status: "Interview - Jake Gyll",
      role: "Social Media Manager Role",
      date: "Mon, 20 July 2021",
      timeSlot: "12 PM - 12:30 PM",
      email: "jakegyll@email.com",
      time: "14 July 2021 - 3:26 PM",
    },
  ];

  const [open, setOpen] = useState(false);

  // Get the current title or fallback to "Dashboard"
  const title = pathToTitle[location.pathname];

  return (
    <header className="bg-white border-b border-gray-200 flex items-center justify-between p-4">
      {/* Dynamic Page Title - Smaller */}
      <h1 className="text-2xl font-bold text-gray-900">
        {title === "Job Description" ? (
          <a
            href="/jobs"
            className="font-bold cursor-pointer flex items-center"
          >
            <span className="text-3xl font-extrabold -mt-1">←</span> {title}
          </a>
        ) : (
          title
        )}
      </h1>

      <div className="flex items-center space-x-4 px-2 py-1">
        {/* Back to Homepage Button - Smaller */}
        <Link
          to="/"
          className="border border-blue-700 text-blue-700 px-3 py-1 text-sm font-semibold hover:bg-blue-50 w-full text-center block"
        >
          Back to homepage
        </Link>

        {/* Notification Icon with Badge - Smaller */}
        <div className="relative">
          {/* Notification Icon */}
          <div
            className="relative cursor-pointer"
            onClick={() => setOpen(!open)}
          >
            <FaBell className="text-gray-700 w-5 h-5" /> {/* Smaller icon */}
            <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>{" "}
            {/* Smaller badge */}
          </div>

          {/* Overlay (Greyish Fade Background) */}
          {open && (
            <div
              className="fixed inset-0 bg-opacity-30 z-40"
              onClick={() => setOpen(false)}
            ></div>
          )}

          {/* Dropdown Panel - Smaller */}
          {open && (
            <div className="absolute right-0 mt-2 w-80 bg-white shadow-2xl border-gray-100 rounded-lg border p-4 z-50">
              {/* Header */}
              <div className="flex justify-between items-center border-gray-300 border-b pb-2 mb-2">
                <h2 className="text-base font-bold">Notifications</h2>
                <button className="text-blue-600 text-xs hover:underline cursor-pointer">
                  Mark all as read
                </button>
              </div>

              {/* Notification Items */}
              <div className="space-y-3">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className="flex items-start gap-3 border-b border-gray-300 p-3 -mt-2 cursor-pointer hover:bg-gray-50"
                  >
                    {/* Avatar */}
                    <img
                      src={notification.avatar}
                      alt="User"
                      className="w-8 h-8 rounded-full cursor-pointer" // Smaller avatar
                    />
                    {/* Content */}
                    <div className="flex-1">
                      <p className="text-sm">
                        <strong className="cursor-pointer hover:underline">
                          {notification.name}
                        </strong>{" "}
                        {notification.message}
                      </p>

                      {/* Status Badge (New / Shortlisted) */}
                      {notification.status && (
                        <span
                          className={`text-xs font-semibold px-1.5 py-0.5 rounded-full inline-block mt-1 cursor-pointer ${
                            notification.status === "New"
                              ? "bg-yellow-100 text-yellow-600 border border-yellow-400"
                              : "bg-green-100 text-green-600 border border-green-400"
                          }`}
                        >
                          {notification.status}
                        </span>
                      )}

                      {notification.role && (
                        <div className="border-l-3 border-blue-500 pl-2 mt-2 bg-gray-100 p-2 rounded-sm cursor-pointer hover:bg-gray-200">
                          <p className="text-sm font-semibold">
                            {notification.status}
                          </p>
                          <p className="text-xs text-gray-500">
                            {notification.role}
                          </p>
                          <p className="text-xs font-medium">
                            {notification.date}{" "}
                            <span className="text-gray-400">|</span>{" "}
                            {notification.timeSlot}
                          </p>
                          <p className="text-xs text-gray-500">
                            {notification.email}
                          </p>
                        </div>
                      )}
                      <p className="text-xs text-gray-400 mt-1">
                        {notification.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
