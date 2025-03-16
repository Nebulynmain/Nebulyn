import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { Search, Filter, Star, ChevronLeft, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Applicant = () => {
  const navigate = useNavigate();
  const [view, setView] = useState("table");
  const candidates = [
    {
      id: 1,
      name: "Jake Gyll",
      score: 0.0,
      hiringStage: "Interview",
      appliedDate: "13 July, 2021",
      jobRole: "Designer",
      image: "https://randomuser.me/api/portraits/men/1.jpg",
    },
    {
      id: 2,
      name: "Guy Hawkins",
      score: 0.0,
      hiringStage: "Interview",
      appliedDate: "13 July, 2021",
      jobRole: "JavaScript Dev",
      image: "https://randomuser.me/api/portraits/men/2.jpg",
    },
    {
      id: 3,
      name: "Cyndy Lillibridge",
      score: 4.5,
      hiringStage: "Shortlisted",
      appliedDate: "12 July, 2021",
      jobRole: "Golang Dev",
      image: "https://randomuser.me/api/portraits/women/3.jpg",
    },
    {
      id: 4,
      name: "Rodolfo Goode",
      score: 3.75,
      hiringStage: "Declined",
      appliedDate: "11 July, 2021",
      jobRole: "NET Dev",
      image: "https://randomuser.me/api/portraits/men/4.jpg",
    },
    {
      id: 5,
      name: "Leif Floyd",
      score: 4.8,
      hiringStage: "Hired",
      appliedDate: "11 July, 2021",
      jobRole: "Graphic Design",
      image: "https://randomuser.me/api/portraits/men/5.jpg",
    },
    {
      id: 6,
      name: "Jenny Wilson",
      score: 4.6,
      hiringStage: "Hired",
      appliedDate: "9 July, 2021",
      jobRole: "Designer",
      image: "https://randomuser.me/api/portraits/women/6.jpg",
    },
    {
      id: 7,
      name: "Jerome Bell",
      score: 4.0,
      hiringStage: "Interviewed",
      appliedDate: "5 July, 2021",
      jobRole: "Designer",
      image: "https://randomuser.me/api/portraits/men/7.jpg",
    },
    {
      id: 8,
      name: "Eleanor Pena",
      score: 3.9,
      hiringStage: "Declined",
      appliedDate: "5 July, 2021",
      jobRole: "Designer",
      image: "https://randomuser.me/api/portraits/women/8.jpg",
    },
    {
      id: 9,
      name: "Darrell Steward",
      score: 4.2,
      hiringStage: "Shortlisted",
      appliedDate: "3 July, 2021",
      jobRole: "Designer",
      image: "https://randomuser.me/api/portraits/men/9.jpg",
    },
    {
      id: 10,
      name: "Floyd Miles",
      score: 4.1,
      hiringStage: "Interviewed",
      appliedDate: "1 July, 2021",
      jobRole: "Designer",
      image: "https://randomuser.me/api/portraits/men/10.jpg",
    },
  ];

  const [selectedCandidates, setSelectedCandidates] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectAll, setSelectAll] = useState(false);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [applicantsPerPage, setApplicantsPerPage] = useState(10);

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedCandidates([]);
    } else {
      setSelectedCandidates(candidates.map((candidate) => candidate.id));
    }
    setSelectAll(!selectAll);
  };

  const handleSelect = (id) => {
    if (selectedCandidates.includes(id)) {
      setSelectedCandidates(selectedCandidates.filter((cid) => cid !== id));
    } else {
      setSelectedCandidates([...selectedCandidates, id]);
    }
  };

  // Filtering applicants based on search input
  const filteredCandidates = candidates.filter((candidate) =>
    candidate.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination logic
  const indexOfLastApplicant = currentPage * applicantsPerPage;
  const indexOfFirstApplicant = indexOfLastApplicant - applicantsPerPage;
  const currentApplicants = filteredCandidates.slice(
    indexOfFirstApplicant,
    indexOfLastApplicant
  );

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Calculate total pages
  const totalPages = Math.ceil(filteredCandidates.length / applicantsPerPage);

  // Define the order of hiring stages for consistent display
  const stageOrder = [
    "Shortlisted",
    "Interview",
    "Interviewed",
    "Hired",
    "Declined",
  ];

  // Group candidates by hiring stage for pipeline view
  const stageGroups = {
    Shortlisted: filteredCandidates.filter(
      (c) => c.hiringStage === "Shortlisted"
    ),
    Interview: filteredCandidates.filter((c) => c.hiringStage === "Interview"),
    Interviewed: filteredCandidates.filter(
      (c) => c.hiringStage === "Interviewed"
    ),
    Hired: filteredCandidates.filter((c) => c.hiringStage === "Hired"),
    Declined: filteredCandidates.filter((c) => c.hiringStage === "Declined"),
  };

  // Get stage background color
  const getStageColor = (stage) => {
    switch (stage) {
      case "Shortlisted":
        return "bg-blue-50";
      case "Interview":
        return "bg-yellow-50";
      case "Interviewed":
        return "bg-blue-50";
      case "Hired":
        return "bg-green-50";
      case "Declined":
        return "bg-red-50";
      default:
        return "bg-gray-50";
    }
  };

  // Get stage text color
  const getStageTextColor = (stage) => {
    switch (stage) {
      case "Shortlisted":
        return "text-blue-600";
      case "Interview":
        return "text-yellow-600";
      case "Interviewed":
        return "text-blue-600";
      case "Hired":
        return "text-green-600";
      case "Declined":
        return "text-red-600";
      default:
        return "text-gray-600";
    }
  };

  // Get star color for ratings
  const getStarColor = (score) => {
    return score > 0 ? "text-yellow-500" : "text-gray-400";
  };

  // Candidate card for pipeline view
  const CandidateCard = ({ candidate }) => (
    <div className="bg-white p-4 rounded-lg shadow mb-3 border border-gray-200">
      <div className="flex items-center mb-3">
        <div className="w-10 h-10 flex-shrink-0">
          <img
            src={candidate.image}
            alt={candidate.name}
            className="w-full h-full rounded-full border object-cover"
          />
        </div>
        <div className="ml-3 min-w-0">
          <h3 className="font-medium text-gray-900 truncate">
            {candidate.name}
          </h3>
          <p className="text-sm text-gray-500 truncate">{candidate.jobRole}</p>
        </div>
      </div>
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <Star
            className={getStarColor(candidate.score)}
            fill={candidate.score > 0 ? "#FACC15" : "none"}
            size={16}
          />
          <span className="ml-1 text-gray-900 font-medium">
            {candidate.score}
          </span>
        </div>
        <span className="text-sm text-gray-500">{candidate.appliedDate}</span>
      </div>
      <div className="mt-3 flex justify-center">
        <button
          className="w-full px-3 py-1 cursor-pointer border border-blue-500 bg-[#E9EBFD] text-blue-500 text-sm rounded hover:bg-blue-100 transition-colors"
          onClick={() => navigate("/applicant-detail")}
        >
          See Application
        </button>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex flex-row flex-grow">
        <div className="h-screen sticky top-0">
          <Sidebar />
        </div>
        <div className="flex-grow transition-all w-full">
          <Header />
          <div className="container mx-auto">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:justify-between md:items-center p-4 md:p-6">
              <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-4 md:mb-0">
                Total Applicants:{" "}
                <span className="font-bold">{filteredCandidates.length}</span>
              </h2>
              <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
                {/* Search Input */}
                <div className="relative w-full md:w-auto">
                  <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search Applicants"
                    className="w-full md:w-64 pl-10 pr-5 py-2 md:py-3 text-base border rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
                    value={searchTerm}
                    onChange={(e) => {
                      setSearchTerm(e.target.value);
                      setCurrentPage(1); // Reset to first page when searching
                    }}
                  />
                </div>

                {/* Filter Button */}
                <button className="flex items-center gap-2 px-5 py-2 md:py-3 border rounded-lg hover:bg-gray-100 text-base w-full md:w-auto justify-center md:justify-start">
                  <Filter className="h-5 w-5" /> Filter
                </button>

                {/* Vertical Divider */}
                <div className="hidden md:block border-l h-8 mx-1"></div>

                {/* View Toggle Buttons */}
                <div className="flex bg-blue-100 p-2 rounded-lg w-full md:w-auto mt-4 md:mt-0">
                  <button
                    className={`w-40 h-12 px-6 py-2 rounded-md text-blue-600 text-base ${
                      view === "pipeline"
                        ? "bg-white shadow"
                        : "hover:bg-blue-200"
                    }`}
                    onClick={() => setView("pipeline")}
                  >
                    Pipeline View
                  </button>
                  <button
                    className={`w-40 h-12 px-6 py-2 rounded-md text-blue-600 text-base ${
                      view === "table" ? "bg-white shadow" : "hover:bg-blue-200"
                    }`}
                    onClick={() => setView("table")}
                  >
                    Table View
                  </button>
                </div>
              </div>
            </div>

            {/* Table View */}
            {view === "table" && (
              <div className="overflow-x-auto px-4 md:px-6">
                <table className="min-w-full border-collapse border border-gray-200 rounded-lg overflow-hidden">
                  <thead className="bg-white text-gray-500 uppercase text-sm border-b border-gray-200">
                    <tr>
                      <th className="p-3 md:p-4 text-left">
                        <input
                          type="checkbox"
                          className="form-checkbox text-blue-500 border-gray-300 rounded-md"
                          checked={selectAll}
                          onChange={handleSelectAll}
                        />
                      </th>
                      {[
                        "Full Name",
                        "Score",
                        "Hiring Stage",
                        "Applied Date",
                        "Job Role",
                        "Action",
                      ].map((header) => (
                        <th
                          key={header}
                          className="p-3 md:p-4 text-left font-medium"
                        >
                          <div className="flex items-center space-x-2 cursor-pointer">
                            <span>{header}</span>
                            <span className="text-xs">▲▼</span>
                          </div>
                        </th>
                      ))}
                    </tr>
                  </thead>

                  <tbody>
                    {currentApplicants.length > 0 ? (
                      currentApplicants.map((candidate) => (
                        <tr
                          key={candidate.id}
                          className="border-t hover:bg-gray-50"
                        >
                          <td className="p-3 md:p-4">
                            <input
                              type="checkbox"
                              className="form-checkbox text-blue-500"
                              checked={selectedCandidates.includes(
                                candidate.id
                              )}
                              onChange={() => handleSelect(candidate.id)}
                            />
                          </td>
                          <td className="p-3 md:p-4">
                            <div className="flex items-center space-x-3">
                              <img
                                src={candidate.image}
                                alt={candidate.name}
                                className="w-8 h-8 rounded-full border object-cover"
                              />
                              <span className="font-medium text-gray-900">
                                {candidate.name}
                              </span>
                            </div>
                          </td>
                          <td className="p-3 md:p-4">
                            <div className="flex items-center space-x-1">
                              <Star
                                className={getStarColor(candidate.score)}
                                fill={candidate.score > 0 ? "#FACC15" : "none"}
                                size={16}
                              />
                              <span className="text-gray-900 font-medium">
                                {candidate.score}
                              </span>
                            </div>
                          </td>
                          <td className="p-3 md:p-4">
                            <span
                              className={`px-3 py-1 rounded-full text-sm font-medium 
                ${
                  candidate.hiringStage === "Interview"
                    ? "text-yellow-600 bg-yellow-100"
                    : ""
                }
                ${
                  candidate.hiringStage === "Shortlisted"
                    ? "text-blue-600 bg-blue-100"
                    : ""
                }
                ${
                  candidate.hiringStage === "Declined"
                    ? "text-red-600 bg-red-100"
                    : ""
                }
                ${
                  candidate.hiringStage === "Hired"
                    ? "text-green-600 bg-green-100"
                    : ""
                }
                ${
                  candidate.hiringStage === "Interviewed"
                    ? "text-blue-600 bg-blue-100"
                    : ""
                }`}
                            >
                              {candidate.hiringStage}
                            </span>
                          </td>
                          <td className="p-3 md:p-4">
                            {candidate.appliedDate}
                          </td>
                          <td className="p-3 md:p-4">{candidate.jobRole}</td>
                          <td className="p-3 md:p-4">
                            <button
                              className="px-3 py-1 md:px-4 md:py-2 border border-blue-500 bg-[#E9EBFD] text-blue-500 rounded text-sm cursor-pointer"
                              onClick={() => navigate("/applicant-detail")}
                            >
                              See Application
                            </button>
                          </td>
                          <td className="p-4 text-gray-600 text-lg cursor-pointer">
                            ...
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td
                          colSpan="7"
                          className="p-4 text-center text-gray-500"
                        >
                          No matching applicants found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}

            {/* Pipeline View */}
            {view === "pipeline" && (
              <div className="p-4">
                {/* Responsive Pipeline Grid Layout */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                  {stageOrder.map((stage) => (
                    <div key={stage} className="bg-white rounded-lg shadow">
                      <div
                        className={`p-3 rounded-t-lg ${getStageColor(stage)}`}
                      >
                        <div className="flex justify-between items-center">
                          <h3
                            className={`font-medium ${getStageTextColor(
                              stage
                            )}`}
                          >
                            {stage}
                          </h3>
                          <span className="bg-white px-2 py-1 rounded-full text-sm font-medium text-gray-700">
                            {stageGroups[stage].length}
                          </span>
                        </div>
                      </div>
                      <div className="p-3 max-h-96 overflow-y-auto">
                        {stageGroups[stage].length > 0 ? (
                          stageGroups[stage].map((candidate) => (
                            <CandidateCard
                              key={candidate.id}
                              candidate={candidate}
                            />
                          ))
                        ) : (
                          <div className="text-center py-8 text-gray-500">
                            No candidates
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Pagination - Only show for table view */}
            {view === "table" && (
              <div className="flex flex-col md:flex-row justify-between items-center p-4 md:p-6">
                <div className="flex items-center space-x-2 mb-4 md:mb-0">
                  <span>View</span>
                  <select
                    value={applicantsPerPage}
                    onChange={(e) => {
                      setApplicantsPerPage(Number(e.target.value));
                      setCurrentPage(1); // Reset to first page
                    }}
                    className="border rounded-md px-2 py-1"
                  >
                    <option value={10}>10</option>
                    <option value={20}>20</option>
                    <option value={50}>50</option>
                  </select>
                  <span>Applicants per page</span>
                </div>
                <div className="flex items-center space-x-1 md:space-x-2 overflow-x-auto w-full md:w-auto justify-center">
                  <button
                    onClick={() =>
                      setCurrentPage((prev) => Math.max(prev - 1, 1))
                    }
                    disabled={currentPage === 1}
                    className={`p-2 border rounded-md ${
                      currentPage === 1
                        ? "text-gray-300 cursor-not-allowed"
                        : "hover:bg-gray-100"
                    }`}
                  >
                    <ChevronLeft size={16} />
                  </button>
                  {totalPages <= 5 ? (
                    [...Array(totalPages)].map((_, index) => (
                      <button
                        key={index + 1}
                        onClick={() => paginate(index + 1)}
                        className={`px-3 py-1 md:px-4 md:py-2 border rounded-md ${
                          currentPage === index + 1
                            ? "bg-blue-500 text-white"
                            : "hover:bg-gray-100"
                        }`}
                      >
                        {index + 1}
                      </button>
                    ))
                  ) : (
                    // Show limited pagination buttons for many pages
                    <>
                      {currentPage > 1 && (
                        <button
                          onClick={() => paginate(1)}
                          className="px-3 py-1 md:px-4 md:py-2 border rounded-md hover:bg-gray-100"
                        >
                          1
                        </button>
                      )}
                      {currentPage > 2 && <span className="px-1">...</span>}
                      {currentPage > 1 && (
                        <button
                          onClick={() => paginate(currentPage - 1)}
                          className="px-3 py-1 md:px-4 md:py-2 border rounded-md hover:bg-gray-100"
                        >
                          {currentPage - 1}
                        </button>
                      )}
                      <button className="px-3 py-1 md:px-4 md:py-2 border rounded-md bg-blue-500 text-white">
                        {currentPage}
                      </button>
                      {currentPage < totalPages && (
                        <button
                          onClick={() => paginate(currentPage + 1)}
                          className="px-3 py-1 md:px-4 md:py-2 border rounded-md hover:bg-gray-100"
                        >
                          {currentPage + 1}
                        </button>
                      )}
                      {currentPage < totalPages - 1 && (
                        <span className="px-1">...</span>
                      )}
                      {currentPage < totalPages && (
                        <button
                          onClick={() => paginate(totalPages)}
                          className="px-3 py-1 md:px-4 md:py-2 border rounded-md hover:bg-gray-100"
                        >
                          {totalPages}
                        </button>
                      )}
                    </>
                  )}
                  <button
                    onClick={() =>
                      setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                    }
                    disabled={currentPage === totalPages}
                    className={`p-2 border rounded-md ${
                      currentPage === totalPages
                        ? "text-gray-300 cursor-not-allowed"
                        : "hover:bg-gray-100"
                    }`}
                  >
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Applicant;
