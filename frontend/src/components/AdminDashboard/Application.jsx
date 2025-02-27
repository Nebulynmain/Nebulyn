import React, { useState, useEffect } from "react";
import { CalendarIcon } from "lucide-react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { X } from "lucide-react";
import { Search, Filter } from "lucide-react";

const Application = () => {
  const [visible, setVisible] = useState(true); // State to handle visibility

  if (!visible) return null; // Hide if closed

  const [activeTab, setActiveTab] = useState("all");
  const tabData = [
    { id: "all", name: "All", count: 45 },
    { id: "in_review", name: "In Review", count: 34 },
    { id: "interviewing", name: "Interviewing", count: 18 },
    { id: "assessment", name: "Assessment", count: 5 },
    { id: "offered", name: "Offered", count: 2 },
    { id: "hired", name: "Hired", count: 1 },
  ];

  const totalPages = 33;
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const getPaginationNumbers = () => {
    let pages = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        pages = [1, 2, 3, 4, "...", totalPages];
      } else if (currentPage >= totalPages - 2) {
        pages = [
          1,
          "...",
          totalPages - 3,
          totalPages - 2,
          totalPages - 1,
          totalPages,
        ];
      } else {
        pages = [
          1,
          "...",
          currentPage - 1,
          currentPage,
          currentPage + 1,
          "...",
          totalPages,
        ];
      }
    }
    return pages;
  };

  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("");

  const applications = [
    {
      id: 1,
      company: "Nomad",
      logo: "nomad-logo.png",
      role: "Social Media Assistant",
      date: "24 July 2021",
      status: "In Review",
      color: " text-yellow-600 border border-yellow-300",
    },
    {
      id: 2,
      company: "Udacity",
      logo: "udacity-logo.png",
      role: "Social Media Assistant",
      date: "20 July 2021",
      status: "Shortlisted",
      color: " text-green-600 border border-green-300",
    },
    {
      id: 3,
      company: "Packer",
      logo: "packer-logo.png",
      role: "Social Media Assistant",
      date: "16 July 2021",
      status: "Offered",
      color: " text-blue-600 border border-blue-300",
    },
    {
      id: 4,
      company: "Divvy",
      logo: "divvy-logo.png",
      role: "Social Media Assistant",
      date: "14 July 2021",
      status: "Interviewing",
      color: " text-yellow-700 border border-yellow-400",
    },
    {
      id: 5,
      company: "DigitalOcean",
      logo: "digitalocean-logo.png",
      role: "Social Media Assistant",
      date: "10 July 2021",
      status: "Unsuitable",
      color: " text-red-600 border border-red-300",
    },
  ];

  const filteredApplications = applications.filter((item) => {
    const matchesSearch =
      item.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.role.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterStatus ? item.status === filterStatus : true;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex flex-row flex-grow">
        <div className="h-screen sticky top-0">
          <Sidebar />
        </div>
        <div className="flex-grow transition-all">
          <Header />
          {/*Part 1*/}
          <div className="flex justify-between items-center py-6 px-9">
            <div>
              <h1 className="text-4xl font-semibold text-black-900">
                Keep it up, Jake
              </h1>
              <p className="text-gray-500 mt-2 text-xl">
                Here is job applications status from July 19 - July 25.
              </p>
            </div>
            <div className="flex items-center border-2 border-gray-300  px-4 py-2 cursor-pointer mr-4">
              <span className="text-gray-700 font-semibold">
                Jul 19 - Jul 25
              </span>
              <CalendarIcon className="w-4 h-4 text-blue-500 ml-2" />
            </div>
          </div>
          {/*Part 2*/}
          <div className="px-7">
            <div className="bg-blue-50 flex justify-between items-start p-3  max-w-8xl mx-auto shadow-md min-h-[110px]">
              <div className="flex items-start gap-4">
                <div className="relative w-12 h-12">
                  {/* Topmost SVG */}
                  <svg
                    width="21"
                    height="21"
                    viewBox="0 0 21 21"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="absolute top-0 left-0 w-full h-full"
                  >
                    <g clipPath="url(#clip0_228_8677)">
                      <path
                        d="M11.9053 18.4667C11.9053 17.175 10.8565 16.128 9.56274 16.128C8.26895 16.128 7.22021 17.175 7.22021 18.4667C7.22021 19.7584 8.26895 20.8054 9.56274 20.8054C10.8565 20.8054 11.9053 19.7584 11.9053 18.4667Z"
                        fill="#F7C92B"
                      />
                      <path
                        d="M9.56268 16.128C9.32587 16.128 9.09729 16.1634 8.88184 16.2287C9.84344 16.5198 10.5435 17.4114 10.5435 18.4667C10.5435 19.5219 9.84344 20.4136 8.88184 20.7047C9.09729 20.77 9.32587 20.8054 9.56268 20.8054C10.8565 20.8054 11.9052 19.7584 11.9052 18.4667C11.9052 17.175 10.8565 16.128 9.56268 16.128Z"
                        fill="#F2B51D"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_228_8677">
                        <rect
                          width="19.9609"
                          height="20"
                          fill="white"
                          transform="translate(0.455078 0.844482)"
                        />
                      </clipPath>
                    </defs>
                  </svg>

                  {/* Middle Layer SVG */}
                  <svg
                    width="51"
                    height="40"
                    viewBox="0 0 51 40"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="absolute top-0 left-0 w-full h-full"
                  >
                    <ellipse
                      cx="16.9565"
                      cy="6.74413"
                      rx="1.82608"
                      ry="1.83932"
                      fill="#56CDAD"
                    />
                    <ellipse
                      cx="45.5652"
                      cy="2.45241"
                      rx="2.43478"
                      ry="2.45241"
                      fill="#FFB23F"
                    />
                    <ellipse
                      cx="2.3913"
                      cy="13.8823"
                      rx="2.3913"
                      ry="2.40862"
                      fill="#3F8CFF"
                    />
                    <ellipse
                      cx="49.4786"
                      cy="38.0123"
                      rx="1.21739"
                      ry="1.22623"
                      fill="#F59E00"
                    />
                    <ellipse
                      cx="45.3053"
                      cy="17.4297"
                      rx="1.21739"
                      ry="1.2262"
                      fill="#56CDAD"
                    />
                  </svg>

                  {/* Bottom Layer SVG */}
                  <svg
                    width="50"
                    height="50"
                    viewBox="0 0 56 59"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="absolute top-0 left-0 w-full h-full"
                  >
                    <circle cx="28" cy="30.8445" r="28" fill="#007AFF" />
                    <mask
                      id="mask0"
                      style={{ maskType: "alpha" }}
                      maskUnits="userSpaceOnUse"
                      x="0"
                      y="2"
                      width="56"
                      height="57"
                    >
                      <circle cx="28" cy="30.8445" r="28" fill="#C0FBE8" />
                    </mask>
                    <g mask="url(#mask0)">
                      <path
                        d="M41.1552 34.0475L33.1193 26.0115H10.8419L10.4087 25.3934C9.24839 25.4461 8.32373 26.4033 8.32373 27.5766V66.6586C8.32373 67.8658 9.30229 68.8444 10.5095 68.8444H39.362C40.5354 68.8444 41.4925 67.9198 41.5452 66.7594L41.1552 66.3694C41.1552 65.0705 41.1552 35.5065 41.1552 34.0475Z"
                        fill="#1B1782"
                      />
                      <path
                        d="M10.4076 25.3933C10.4036 25.48 10.405 64.2804 10.405 64.5762C10.405 65.7833 11.3837 66.762 12.5908 66.762C12.7973 66.762 41.4592 66.7634 41.5442 66.7594C41.5481 66.672 41.5467 34.6788 41.5467 34.44L32.4975 25.3908C32.3374 25.3907 10.4951 25.3893 10.4076 25.3933Z"
                        fill="#2B24D1"
                      />
                      <path
                        d="M39.5355 27.4119L37.0431 20.8445H15.0539C13.8467 20.8445 12.8682 21.8231 12.8682 23.0303V62.1123C12.8682 63.3194 13.8468 64.298 15.0539 64.298H40.895C41.7667 64.298 42.5189 63.7877 42.8698 63.0497H44.354V28.7538L39.5355 27.4119Z"
                        fill="#EAF6FF"
                      />
                    </g>
                  </svg>
                </div>

                {/* Text Content */}
                <div>
                  <h2 className="text-blue-600 font-semibold text-lg">
                    New Feature
                  </h2>
                  <p className="text-gray-700 text-base">
                    You can request a follow-up 7 days after applying for a job
                    if the application status is in review.
                    <br /> Only one follow-up is allowed per job.
                  </p>
                </div>
              </div>

              {/* Close Button */}
              <button
                onClick={() => setVisible(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={22} />
              </button>
            </div>
          </div>
          {/*Part 3*/}
          <div>
            {/* Tabs */}
            <div className="flex justify-between items-center py-4 px-6">
              <div className="border-b border-gray-300 flex space-x-6 text-lg w-full">
                {tabData.map((tab) => (
                  <button
                    key={tab.id}
                    className={`pb-3 border-b-4 px-4 ${
                      activeTab === tab.id
                        ? "border-blue-500 font-semibold text-blue-600"
                        : "border-transparent text-gray-500"
                    }`}
                    onClick={() => setActiveTab(tab.id)}
                  >
                    {tab.name}{" "}
                    <span className="text-gray-500">({tab.count})</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="p-4">
              {activeTab === "all" && (
                <div className="p-4 bg-white rounded-lg">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">
                      Applications History
                    </h2>
                    <div className="flex gap-2">
                      {/* Search Input Field with Icon */}
                      <div className="flex items-center gap-2 border rounded-md px-3 py-1.5">
                        <Search className="w-5 h-5 text-gray-500" />
                        <input
                          type="text"
                          placeholder="Search..."
                          className="outline-none bg-transparent"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                        />
                      </div>

                      {/* Filter Dropdown with Icon */}
                      <div className="flex items-center gap-2 border rounded-md px-3 py-1.5">
                        <Filter className="w-5 h-5 text-gray-500" />
                        <select
                          className="outline-none bg-transparent"
                          value={filterStatus}
                          onChange={(e) => setFilterStatus(e.target.value)}
                        >
                          <option value="">All Status</option>
                          <option value="In Review">In Review</option>
                          <option value="Shortlisted">Shortlisted</option>
                          <option value="Offered">Offered</option>
                          <option value="Interviewing">Interviewing</option>
                          <option value="Unsuitable">Unsuitable</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse bg-white shadow-md rounded-lg border-b border-gray-300">
                      <thead className="border-b border-gray-300">
                        <tr className="text-gray-600 text-md">
                          <th className="p-4 text-left">#</th>
                          <th className="p-4 text-left">Company Name</th>
                          <th className="p-4 text-left">Roles</th>
                          <th className="p-4 text-left">Date Applied</th>
                          <th className="p-4 text-left">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredApplications.map((item, index) => (
                          <tr
                            key={item.id}
                            className={`text-black-500 text-md ${
                              index % 2 !== 0 ? "bg-blue-50" : ""
                            }`}
                          >
                            <td className="p-4">{item.id}</td>
                            <td className="p-4 flex items-center gap-2">
                              <img
                                src={item.logo}
                                alt={item.company}
                                className="w-6 h-6 rounded-full"
                              />
                              {item.company}
                            </td>
                            <td className="p-4">{item.role}</td>
                            <td className="p-4">{item.date}</td>
                            <td className="p-4">
                              <span
                                className={`px-3 py-1 rounded-full text-xs font-semibold ${item.color}`}
                              >
                                {item.status}
                              </span>
                            </td>
                            <td className="p-4 text-black-400 text-2xl cursor-pointer">
                              ...
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Pagination */}
                  <div className="flex justify-center items-center mt-6 gap-2">
                    <button
                      className={`px-3 py-2 rounded-lg ${
                        currentPage === 1 ? " cursor-not-allowed" : ""
                      }`}
                      disabled={currentPage === 1}
                      onClick={() => handlePageChange(currentPage - 1)}
                    >
                      &lt;
                    </button>
                    {getPaginationNumbers().map((page, index) => (
                      <button
                        key={index}
                        className={`px-3 py-2 rounded-lg ${
                          currentPage === page ? "bg-blue-600 text-white" : ""
                        }`}
                        onClick={() =>
                          typeof page === "number" && handlePageChange(page)
                        }
                        disabled={page === "..."}
                      >
                        {page}
                      </button>
                    ))}
                    <button
                      className={`px-3 py-2 rounded-lg ${
                        currentPage === totalPages ? " cursor-not-allowed" : ""
                      }`}
                      disabled={currentPage === totalPages}
                      onClick={() => handlePageChange(currentPage + 1)}
                    >
                      &gt;
                    </button>
                  </div>
                </div>
              )}

              {activeTab === "in_review" && (
                <h6>🔍 Your applications are under review.</h6>
              )}
              {activeTab === "interviewing" && (
                <h6>🎤 Get ready for interviews!</h6>
              )}
              {activeTab === "assessment" && (
                <h6>📝 You have assessments pending.</h6>
              )}
              {activeTab === "offered" && (
                <h6>🎉 Congratulations! You got offers.</h6>
              )}
              {activeTab === "hired" && (
                <h6>✅ You're hired! Welcome aboard.</h6>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Application;
