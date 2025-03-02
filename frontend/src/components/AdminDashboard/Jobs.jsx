import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import SearchBar from "./SearchBar";
import { ChevronDown, Grid, List, MoreHorizontal } from "lucide-react";

const Jobs = () => {
  const [sortBy, setSortBy] = useState("Most Relevant");
  const [showDropdown, setShowDropdown] = useState(false);

  const sortOptions = [
    "Most Relevant",
    "Newest",
    "Oldest",
    "Highest Salary",
    "Lowest Salary",
  ];

  const applications = [
    {
      id: 1,
      company: "Nomad",
      location: "Paris, France",
      position: "Social Media Assistant",
      dateApplied: "24 July 2021",
      status: "In Review",
      statusColor: "border-amber-300 text-amber-500",
      bgColor: "bg-blue-50",
      icon: (
        <svg
          width="48"
          height="48"
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M24 12L12 18V30L24 36L36 30V18L24 12Z"
            fill="#4ADE80"
            stroke="#4ADE80"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M24 36V24"
            stroke="white"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M36 18L24 24L12 18"
            stroke="white"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
    },
    {
      id: 2,
      company: "Udacity",
      location: "New York, USA",
      position: "Social Media Assistant",
      dateApplied: "23 July 2021",
      status: "Shortlisted",
      statusColor: "border-blue-300 text-blue-500",
      bgColor: "",
      icon: (
        <svg
          width="48"
          height="48"
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="24" cy="24" r="20" fill="#06B6D4" />
          <path
            d="M30 19L24 24L30 29"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M18 29V19"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
    },
    {
      id: 3,
      company: "Packer",
      location: "Madrid, Spain",
      position: "Social Media Assistant",
      dateApplied: "22 July 2021",
      status: "Declined",
      statusColor: "border-red-300 text-red-500",
      bgColor: "bg-blue-50",
      icon: (
        <svg
          width="48"
          height="48"
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M32 16H24V32H32V16Z" fill="#FF6B6B" />
          <path d="M16 16H24V24H16V16Z" fill="#FF6B6B" />
          <path d="M16 24H24V32H16V24Z" fill="#FF9F9F" />
        </svg>
      ),
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex flex-row flex-grow">
        {/* Sidebar */}
        <div className="h-screen sticky top-0">
          <Sidebar />
        </div>

        {/* Main Content */}
        <div className="flex flex-col flex-grow transition-all overflow-y-auto">
          <Header />

          {/* Full-width SearchBar below Header */}
          <div className="w-full px-4 mt-4">
            <SearchBar />
          </div>

          {/* All Jobs Section */}
          <div className="w-full flex justify-between items-center px-4 py-3 border-b bg-white mt-4">
            {/* Left Section: Title & Results Count */}
            <div>
              <h2 className="text-lg font-semibold text-gray-900">All Jobs</h2>
              <p className="text-sm text-gray-500">Showing 73 results</p>
            </div>

            {/* Right Section: Sorting & View Toggle */}
            <div className="flex items-center space-x-4 relative">
              {/* Sort By Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="flex items-center font-medium text-gray-900 px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                >
                  {sortBy} <ChevronDown size={16} className="ml-1" />
                </button>

                {/* Dropdown Options */}
                {showDropdown && (
                  <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg">
                    {sortOptions.map((option, index) => (
                      <button
                        key={index}
                        onClick={() => {
                          setSortBy(option);
                          setShowDropdown(false);
                        }}
                        className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* View Toggle Icons */}
              <div className="flex space-x-2">
                <button className="p-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-100">
                  <Grid size={18} />
                </button>
                <button className="p-2 rounded-lg border border-gray-300 text-blue-600 bg-blue-100">
                  <List size={18} />
                </button>
              </div>
            </div>
          </div>

          <div className="w-[94%] border border-gray-200 rounded-md ml-9">
                <div className="px-6">
                  {applications.map((app) => (
                    <div
                      key={app.id}
                      className={`flex items-center justify-between py-4 px-6 ${app.bgColor} mt-4 mb-4`}
                    >
                      {/* Left Section: Icon & Job Details */}
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12">{app.icon}</div>
                        <div>
                          <h3 className="text-lg font-extrabold text-gray-800">
                            {app.position}
                          </h3>
                          <p className="text-gray-500 text-sm">
                            {app.company} • {app.location} • Full-Time
                          </p>
                        </div>
                      </div>

                      {/* Center Section: Date Applied (Aligned Center) */}
                      <div className="flex flex-col items-center">
                        <p className="text-gray-600 text-sm font-bold">
                          Date Applied
                        </p>
                        <p className="text-gray-800 text-sm">
                          {app.dateApplied}
                        </p>
                      </div>

                      {/* Right Section: Status & More Options */}
                      <div className="flex items-center space-x-6">
                        <div
                          className={`px-4 py-1 rounded-full text-sm font-medium border ${app.statusColor}`}
                        >
                          {app.status}
                        </div>

                        <button className="text-gray-400">
                          <MoreHorizontal size={22} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>                
              </div>
        </div>
      </div>
    </div>
  );
};

export default Jobs;
