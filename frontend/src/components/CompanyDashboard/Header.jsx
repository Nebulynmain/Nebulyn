import React, { useState, useEffect } from "react";
import { FaBell } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import axios from "axios";
import { API_URL } from "../../App";

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [companyName, setCompanyName] = useState("Company");
  const [companyLogo, setCompanyLogo] = useState(null);

  // Fetch company data
  useEffect(() => {
    const fetchCompanyData = async () => {
      try {
        const response = await axios.get(`${API_URL}/company/get-company-by-user`, {
          withCredentials: true
        });
        
        if (response.data && response.data.ok && response.data.data && response.data.data.length > 0) {
          const company = response.data.data[0];
          setCompanyName(company.companyName || "Company");
          setCompanyLogo(company.companyLogo || null);
        }
      } catch (error) {
        console.error("Error fetching company data:", error);
      }
    };
    
    fetchCompanyData();
  }, []);

  // Mapping paths to titles
  const pathToTitle = {
    "/company-dashboard": "Dashboard",
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
      <div className="flex items-center space-x-2">
        {/* Company Icon with fallback background color - reduced size */}
        <div className="w-6 h-6 bg-green-500 rounded-md flex items-center justify-center">
          {companyLogo ? (
            <img
              src={companyLogo}
              alt="Company Logo"
              className="w-full h-full rounded-md"
              onError={(e) => {
                e.target.style.display = "none";
                e.target.parentElement.style.backgroundColor = "#10B981"; // fallback color
              }}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-white font-bold">
              {companyName.charAt(0)}
            </div>
          )}
        </div>

        {/* Company Text - reduced text sizes */}
        <div className="flex flex-col">
          <span className="text-sm text-gray-500">Company</span>
          <div className="flex items-center space-x-1">
            <span className="text-lg font-semibold text-gray-900 cursor-pointer">
              {companyName}
            </span>
            <ChevronDown className="w-3 h-3 text-gray-500 cursor-pointer" />
          </div>
        </div>
      </div>

      <div className="flex items-center space-x-6 px-3 py-1">
        {/* Back to Homepage Button */}
        {/* <Link
      to="/"
      className="border border-blue-700 text-blue-700 px-3 py-1 font-semibold hover:bg-blue-50 w-full text-center block text-sm"
    >
      Back to homepage
    </Link> */}

        {/* Notification Icon with Badge - reduced size */}
        <div className="relative">
          {/* Notification Icon */}
          <div
            className="relative cursor-pointer"
            onClick={() => setOpen(!open)}
          >
            <FaBell className="text-gray-700 w-5 h-5" /> {/* Smaller icon */}
            <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full border border-white"></span>{" "}
            {/* Smaller badge */}
          </div>

          {/* Overlay (Greyish Fade Background) */}
          {open && (
            <div
              className="fixed inset-0 bg-opacity-30 z-40"
              onClick={() => setOpen(false)}
            ></div>
          )}

          {/* Dropdown Panel - reduced width and padding */}
          {open && (
            <div className="absolute right-0 mt-3 w-[28rem] bg-white shadow-2xl border-gray-100 rounded-lg border p-4 z-50">
              {/* Header */}
              <div className="flex justify-between items-center border-gray-300 border-b pb-3 mb-3">
                <h2 className="text-lg font-bold">Notifications</h2>
                <button className="text-blue-600 text-sm hover:underline cursor-pointer">
                  Mark all as read
                </button>
              </div>

              {/* Notification Items - reduced spacing */}
              <div className="space-y-3">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className="flex items-start gap-3 border-b border-gray-300 p-3 -mt-3 cursor-pointer hover:bg-gray-50"
                  >
                    {/* Avatar - smaller */}
                    <img
                      src={notification.avatar}
                      alt="User"
                      className="w-10 h-10 rounded-full cursor-pointer"
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
                          className={`text-xs font-semibold px-2 py-0.5 rounded-full inline-block mt-1 cursor-pointer ${
                            notification.status === "New"
                              ? "bg-yellow-100 text-yellow-600 border border-yellow-400"
                              : "bg-green-100 text-green-600 border border-green-400"
                          }`}
                        >
                          {notification.status}
                        </span>
                      )}

                      {notification.role && (
                        <div className="border-l-3 border-blue-500 pl-3 mt-2 bg-gray-100 p-2 rounded-sm cursor-pointer hover:bg-gray-200">
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
        {/* Post a Job Button - smaller padding */}
        <button
          className="bg-blue-600 text-white px-3 py-1 font-semibold shadow-sm hover:bg-blue-700 w-full cursor-pointer text-sm"
          onClick={() => navigate("/job-posting")}
        >
          + Post a job
        </button>
      </div>
    </header>
  );
};

export default Header;
