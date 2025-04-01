import React, { useState, useEffect } from "react";
import { CalendarIcon } from "lucide-react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { X } from "lucide-react";
import { Search, Filter } from "lucide-react";

const Application = () => {
  const [notificationVisible, setNotificationVisible] = useState(true);
  const [activeTab, setActiveTab] = useState("all");

  const allApplications = [
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
    {
      id: 6,
      company: "Google",
      logo: "google-logo.png",
      role: "Marketing Coordinator",
      date: "8 July 2021",
      status: "Assessment",
      color: " text-purple-600 border border-purple-300",
    },
    {
      id: 7,
      company: "Amazon",
      logo: "amazon-logo.png",
      role: "Content Writer",
      date: "5 July 2021",
      status: "Hired",
      color: " text-green-700 border border-green-400",
    },
    {
      id: 8,
      company: "Microsoft",
      logo: "microsoft-logo.png",
      role: "UI Designer",
      date: "3 July 2021",
      status: "In Review",
      color: " text-yellow-600 border border-yellow-300",
    },
    {
      id: 9,
      company: "Apple",
      logo: "apple-logo.png",
      role: "Product Manager",
      date: "1 July 2021",
      status: "Interviewing",
      color: " text-yellow-700 border border-yellow-400",
    },
    {
      id: 10,
      company: "Netflix",
      logo: "netflix-logo.png",
      role: "Content Creator",
      date: "28 June 2021",
      status: "Assessment",
      color: " text-purple-600 border border-purple-300",
    },
  ];

  // Filter applications based on tab selection
  const getTabApplications = () => {
    switch (activeTab) {
      case "in_review":
        return allApplications.filter((app) => app.status === "In Review");
      case "interviewing":
        return allApplications.filter((app) => app.status === "Interviewing");
      case "assessment":
        return allApplications.filter((app) => app.status === "Assessment");
      case "offered":
        return allApplications.filter((app) => app.status === "Offered");
      case "hired":
        return allApplications.filter((app) => app.status === "Hired");
      default:
        return allApplications;
    }
  };

  // Calculate tab counts dynamically based on statuses
  const getTabCounts = () => {
    const counts = {
      all: allApplications.length,
      in_review: allApplications.filter((app) => app.status === "In Review")
        .length,
      interviewing: allApplications.filter(
        (app) => app.status === "Interviewing"
      ).length,
      assessment: allApplications.filter((app) => app.status === "Assessment")
        .length,
      offered: allApplications.filter((app) => app.status === "Offered").length,
      hired: allApplications.filter((app) => app.status === "Hired").length,
    };
    return counts;
  };

  const tabCounts = getTabCounts();

  const tabData = [
    { id: "all", name: "All", count: tabCounts.all },
    { id: "in_review", name: "In Review", count: tabCounts.in_review },
    { id: "interviewing", name: "Interviewing", count: tabCounts.interviewing },
    { id: "assessment", name: "Assessment", count: tabCounts.assessment },
    { id: "offered", name: "Offered", count: tabCounts.offered },
    { id: "hired", name: "Hired", count: tabCounts.hired },
  ];

  // Items per page
  const ITEMS_PER_PAGE = 10;

  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("");

  // Reset page to 1 when changing tabs
  useEffect(() => {
    setCurrentPage(1);
  }, [activeTab]);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= getTotalPages()) {
      setCurrentPage(page);
    }
  };

  const applications = getTabApplications();

  const filteredApplications = applications.filter((item) => {
    const matchesSearch =
      item.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.role.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterStatus ? item.status === filterStatus : true;
    return matchesSearch && matchesFilter;
  });

  // Calculate total pages based on filtered applications
  const getTotalPages = () => {
    return Math.ceil(filteredApplications.length / ITEMS_PER_PAGE);
  };

  // Get paginated applications
  const getPaginatedApplications = () => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredApplications.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  };

  // Improved pagination function to show more consistent numbers
  const getPaginationNumbers = () => {
    const totalPages = getTotalPages();
    const maxVisiblePages = 5;
    let pages = [];

    if (totalPages <= maxVisiblePages) {
      // If total pages are less than max visible, show all pages
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Always show first page
      pages.push(1);

      // Calculate the start and end of the middle section
      let startPage = Math.max(2, currentPage - 1);
      let endPage = Math.min(totalPages - 1, currentPage + 1);

      // Adjust to always show 3 pages in the middle when possible
      if (currentPage <= 3) {
        endPage = Math.min(totalPages - 1, 4);
      } else if (currentPage >= totalPages - 2) {
        startPage = Math.max(2, totalPages - 3);
      }

      // Add ellipsis if needed before middle section
      if (startPage > 2) {
        pages.push("...");
      }

      // Add middle section
      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }

      // Add ellipsis if needed after middle section
      if (endPage < totalPages - 1) {
        pages.push("...");
      }

      // Always show last page if there is more than one page
      if (totalPages > 1) {
        pages.push(totalPages);
      }
    }

    return pages;
  };

  // Content for each tab state
  const renderTabContent = () => {
    const tabContent = {
      all: {
        title: "Applications History",
        emptyMessage: "No applications found in your history.",
      },
      in_review: {
        title: "Applications In Review",
        emptyMessage: "No applications are currently under review.",
        description:
          "These applications are being reviewed by employers. You can send one follow-up per application after 7 days.",
      },
      interviewing: {
        title: "Upcoming Interviews",
        emptyMessage: "You don't have any upcoming interviews.",
        description:
          "Prepare for these interviews by researching the company and practicing common interview questions.",
      },
      assessment: {
        title: "Pending Assessments",
        emptyMessage: "You don't have any pending assessments.",
        description:
          "Complete these assessments to advance in the hiring process. Make sure to meet all deadlines.",
      },
      offered: {
        title: "Job Offers",
        emptyMessage: "You don't have any job offers yet.",
        description:
          "Congratulations on your offers! Review the details carefully before accepting.",
      },
      hired: {
        title: "Hired Positions",
        emptyMessage: "You haven't been hired for any positions yet.",
        description:
          "Congratulations on your new position! Here are the details of your employment.",
      },
    };

    const paginatedApplications = getPaginatedApplications();
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;

    return (
      <div className="p-3 bg-white rounded-lg">
        <div className="flex justify-between items-center mb-3">
          <div>
            <h2 className="text-lg font-semibold">
              {tabContent[activeTab].title}
            </h2>
            {tabContent[activeTab].description && (
              <p className="text-gray-600 text-xs mt-0.5">
                {tabContent[activeTab].description}
              </p>
            )}
          </div>
          <div className="flex gap-1.5">
            {/* Search Input Field with Icon */}
            <div className="flex items-center gap-1 border rounded-md px-2 py-1">
              <Search className="w-4 h-4 text-gray-500" />
              <input
                type="text"
                placeholder="Search..."
                className="outline-none bg-transparent text-sm w-24"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Filter Dropdown with Icon */}
            <div className="flex items-center gap-1 border rounded-md px-2 py-1 cursor-pointer">
              <Filter className="w-4 h-4 text-gray-500" />
              <select
                className="outline-none bg-transparent cursor-pointer text-sm"
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
              >
                <option value="">All Status</option>
                <option value="In Review">In Review</option>
                <option value="Shortlisted">Shortlisted</option>
                <option value="Offered">Offered</option>
                <option value="Interviewing">Interviewing</option>
                <option value="Unsuitable">Unsuitable</option>
                <option value="Assessment">Assessment</option>
                <option value="Hired">Hired</option>
              </select>
            </div>
          </div>
        </div>

        {filteredApplications.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse bg-white shadow-sm rounded-lg border-b border-gray-300">
              <thead className="border-b border-gray-300">
                <tr className="text-gray-600 text-xs">
                  <th className="p-2 text-left">#</th>
                  <th className="p-2 text-left">Company Name</th>
                  <th className="p-2 text-left">Roles</th>
                  <th className="p-2 text-left">Date Applied</th>
                  <th className="p-2 text-left">Status</th>
                </tr>
              </thead>
              <tbody>
                {paginatedApplications.map((item, index) => (
                  <tr
                    key={item.id}
                    className={`text-black-500 text-xs ${
                      index % 2 !== 0 ? "bg-blue-50" : ""
                    }`}
                  >
                    <td className="p-2">{startIndex + index + 1}</td>
                    <td className="p-2 flex items-center gap-1.5 cursor-pointer">
                      <img
                        src={item.logo}
                        alt={item.company}
                        className="w-5 h-5 rounded-full"
                      />
                      {item.company}
                    </td>
                    <td className="p-2 cursor-pointer">{item.role}</td>
                    <td className="p-2">{item.date}</td>
                    <td className="p-2">
                      <span
                        className={`px-2 py-0.5 rounded-full text-xs font-semibold ${item.color} cursor-pointer`}
                      >
                        {item.status}
                      </span>
                    </td>
                    <td className="p-2 text-black-400 text-lg cursor-pointer">
                      ...
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-6 bg-gray-50 rounded-lg">
            <p className="text-gray-500 text-sm">
              {tabContent[activeTab].emptyMessage}
            </p>
          </div>
        )}

        {/* Pagination - Only show if we have applications and more than one page */}
        {filteredApplications.length > 0 && getTotalPages() > 0 && (
          <div className="flex justify-between items-center mt-4">
            <div className="text-gray-500 text-xs">
              Showing {startIndex + 1} to{" "}
              {Math.min(
                startIndex + ITEMS_PER_PAGE,
                filteredApplications.length
              )}{" "}
              of {filteredApplications.length} entries
            </div>

            <div className="flex items-center gap-1">
              <button
                className={`px-2 py-1 rounded-md border cursor-pointer text-xs ${
                  currentPage === 1
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                    : "hover:bg-gray-100 text-gray-700"
                }`}
                disabled={currentPage === 1}
                onClick={() => handlePageChange(currentPage - 1)}
              >
                &lt;
              </button>
              {getPaginationNumbers().map((page, index) => (
                <button
                  key={index}
                  className={`px-2 py-1 rounded-md text-xs ${
                    page === "..."
                      ? "cursor-default"
                      : page === currentPage
                      ? "bg-blue-600 text-white cursor-pointer"
                      : "hover:bg-gray-100 cursor-pointer"
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
                className={`px-2 py-1 rounded-md border cursor-pointer text-xs ${
                  currentPage === getTotalPages()
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                    : "hover:bg-gray-100 text-gray-700"
                }`}
                disabled={currentPage === getTotalPages()}
                onClick={() => handlePageChange(currentPage + 1)}
              >
                &gt;
              </button>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex flex-row flex-grow">
        <div className="h-screen sticky top-0">
          <Sidebar />
        </div>
        <div className="flex-grow transition-all">
          <Header />
          {/*Part 1 - Header section*/}
          <div className="flex justify-between items-center py-4 px-6">
            <div>
              <h1 className="text-2xl font-semibold text-black-900">
                Keep it up, Jake
              </h1>
              <p className="text-gray-500 text-sm">
                Here is job applications status from July 19 - July 25.
              </p>
            </div>
            <div className="flex items-center border border-gray-300 px-3 py-1 cursor-pointer mr-2">
              <span className="text-gray-700 text-sm font-semibold">
                Jul 19 - Jul 25
              </span>
              <CalendarIcon className="w-3 h-3 text-blue-500 ml-2" />
            </div>
          </div>

          {/*Part 2 - Notification that can be closed*/}
          <div className={`px-5 ${notificationVisible ? "mb-4" : "mb-0"}`}>
            {notificationVisible && (
              <div className="bg-blue-50 flex justify-between items-start p-2 max-w-8xl mx-auto shadow-sm min-h-[80px]">
                <div className="flex items-start gap-3">
                  <div className="relative w-10 h-10">
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
                    <h2 className="text-blue-600 font-semibold text-sm">
                      New Feature
                    </h2>
                    <p className="text-gray-700 text-xs">
                      You can request a follow-up 7 days after applying for a
                      job if the application status is in review.
                      <br /> Only one follow-up is allowed per job.
                    </p>
                  </div>
                </div>

                {/* Close Button */}
                <button
                  onClick={() => setNotificationVisible(false)}
                  className="text-gray-500 hover:text-gray-700 cursor-pointer"
                >
                  <X size={18} />
                </button>
              </div>
            )}
          </div>

          {/*Part 3 - Tabs section*/}
          <div>
            {/* Tabs */}
            <div className="flex justify-between items-center py-2 px-4">
              <div className="border-b border-gray-300 flex space-x-4 text-base w-full">
                {tabData.map((tab) => (
                  <button
                    key={tab.id}
                    className={`pb-2 border-b-2 px-3 cursor-pointer ${
                      activeTab === tab.id
                        ? "border-blue-500 font-semibold text-blue-600"
                        : "border-transparent text-gray-500"
                    }`}
                    onClick={() => setActiveTab(tab.id)}
                  >
                    {tab.name}{" "}
                    <span className="text-gray-500 text-sm">({tab.count})</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="p-3">{renderTabContent()}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Application;
