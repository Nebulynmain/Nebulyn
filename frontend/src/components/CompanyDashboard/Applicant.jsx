import React, { useState } from "react";
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

  const filteredCandidates = candidates.filter((candidate) =>
    candidate.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastApplicant = currentPage * applicantsPerPage;
  const indexOfFirstApplicant = indexOfLastApplicant - applicantsPerPage;
  const currentApplicants = filteredCandidates.slice(
    indexOfFirstApplicant,
    indexOfLastApplicant
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const totalPages = Math.ceil(filteredCandidates.length / applicantsPerPage);

  const stageOrder = [
    "Shortlisted",
    "Interview",
    "Interviewed",
    "Hired",
    "Declined",
  ];

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

  const getStarColor = (score) => {
    return score > 0 ? "text-yellow-500" : "text-gray-400";
  };

  const CandidateCard = ({ candidate }) => (
    <div
      className="bg-white p-2 rounded-md shadow-sm border border-gray-200 mb-2 cursor-pointer hover:shadow-md transition-shadow"
      onClick={() => navigate("/applicant-detail")}
    >
      <div className="flex items-center mb-1">
        <div className="w-7 h-7 flex-shrink-0">
          <img
            src={candidate.image}
            alt={candidate.name}
            className="w-full h-full rounded-full border object-cover"
          />
        </div>
        <div className="ml-2 min-w-0">
          <h3 className="text-xs font-medium text-gray-900 truncate">
            {candidate.name}
          </h3>
          <p className="text-[0.65rem] text-gray-500 truncate">
            {candidate.jobRole}
          </p>
        </div>
      </div>
      <div className="flex justify-between items-center text-[0.65rem]">
        <div className="flex items-center">
          <Star
            className={`${getStarColor(candidate.score)} h-3 w-3`}
            fill={candidate.score > 0 ? "#FACC15" : "none"}
          />
          <span className="ml-0.5 text-gray-900">{candidate.score}</span>
        </div>
        <span className="text-gray-500">{candidate.appliedDate}</span>
      </div>
      <div className="mt-1">
        <button
          className="w-full px-1 py-0.5 text-[0.65rem] border border-blue-500 bg-[#E9EBFD] text-blue-500 rounded hover:bg-blue-100 transition-colors cursor-pointer"
          onClick={(e) => {
            e.stopPropagation();
            navigate("/applicant-detail");
          }}
        >
          View
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
            <div className="flex flex-col md:flex-row md:justify-between md:items-center p-2 md:p-3">
              <h2 className="text-lg md:text-xl font-semibold text-gray-800 mb-2 md:mb-0">
                Applicants:{" "}
                <span className="font-bold">{filteredCandidates.length}</span>
              </h2>
              <div className="flex flex-col md:flex-row items-start md:items-center gap-2">
                <div className="relative w-full md:w-40">
                  <Search className="absolute left-2 top-2 h-3.5 w-3.5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search"
                    className="w-full pl-7 pr-2 py-1.5 text-xs border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 cursor-text"
                    value={searchTerm}
                    onChange={(e) => {
                      setSearchTerm(e.target.value);
                      setCurrentPage(1);
                    }}
                  />
                </div>

                <button className="flex items-center gap-1 px-2 py-1.5 border rounded-md hover:bg-gray-100 text-xs cursor-pointer">
                  <Filter className="h-3.5 w-3.5" /> Filter
                </button>

                <div className="hidden md:block border-l h-5 mx-1"></div>

                <div className="flex bg-blue-100 p-0.5 rounded-md">
                  <button
                    className={`w-28 h-7 px-2 py-0.5 rounded-sm text-blue-600 text-xs cursor-pointer ${
                      view === "pipeline"
                        ? "bg-white shadow-sm"
                        : "hover:bg-blue-200"
                    }`}
                    onClick={() => setView("pipeline")}
                  >
                    Pipeline
                  </button>
                  <button
                    className={`w-28 h-7 px-2 py-0.5 rounded-sm text-blue-600 text-xs cursor-pointer ${
                      view === "table"
                        ? "bg-white shadow-sm"
                        : "hover:bg-blue-200"
                    }`}
                    onClick={() => setView("table")}
                  >
                    Table
                  </button>
                </div>
              </div>
            </div>

            {view === "table" && (
              <div className="overflow-x-auto px-3 md:px-4">
                <table className="min-w-full border-collapse border border-gray-200 rounded-md overflow-hidden text-sm">
                  <thead className="bg-white text-gray-600 uppercase border-b border-gray-200">
                    <tr>
                      <th className="p-2 text-left">
                        <input
                          type="checkbox"
                          className="form-checkbox text-blue-500 border-gray-300 rounded cursor-pointer h-4 w-4"
                          checked={selectAll}
                          onChange={handleSelectAll}
                        />
                      </th>
                      {[
                        "Name",
                        "Score",
                        "Stage",
                        "Applied",
                        "Role",
                        "Action",
                      ].map((header) => (
                        <th
                          key={header}
                          className="p-2 text-left font-medium cursor-pointer hover:bg-gray-50"
                        >
                          <div className="flex items-center space-x-1">
                            <span>{header}</span>
                            <span className="text-xs opacity-50">▲▼</span>
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
                          className="border-t hover:bg-gray-50 cursor-pointer"
                          onClick={() => navigate("/applicant-detail")}
                        >
                          <td
                            className="p-2"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <input
                              type="checkbox"
                              className="form-checkbox text-blue-500 cursor-pointer h-4 w-4"
                              checked={selectedCandidates.includes(
                                candidate.id
                              )}
                              onChange={() => handleSelect(candidate.id)}
                            />
                          </td>
                          <td className="p-2">
                            <div className="flex items-center space-x-2">
                              <img
                                src={candidate.image}
                                alt={candidate.name}
                                className="w-6 h-6 rounded-full border object-cover"
                              />
                              <span className="font-medium text-gray-900">
                                {candidate.name}
                              </span>
                            </div>
                          </td>
                          <td className="p-2">
                            <div className="flex items-center space-x-1">
                              <Star
                                className={`${getStarColor(
                                  candidate.score
                                )} h-4 w-4`}
                                fill={candidate.score > 0 ? "#FACC15" : "none"}
                              />
                              <span>{candidate.score}</span>
                            </div>
                          </td>
                          <td className="p-2">
                            <span
                              className={`px-2 py-1 rounded-full text-xs font-medium 
                      ${getStageTextColor(candidate.hiringStage)} 
                      ${getStageColor(candidate.hiringStage)}`}
                            >
                              {candidate.hiringStage}
                            </span>
                          </td>
                          <td className="p-2 text-gray-600">
                            {candidate.appliedDate}
                          </td>
                          <td className="p-2 text-gray-600">
                            {candidate.jobRole}
                          </td>
                          <td className="p-2">
                            <button
                              className="px-2 py-1 text-xs border border-blue-500 bg-[#E9EBFD] text-blue-500 rounded cursor-pointer hover:bg-blue-100"
                              onClick={(e) => {
                                e.stopPropagation();
                                navigate("/applicant-detail");
                              }}
                            >
                              View
                            </button>
                          </td>
                          <td className="p-2 text-gray-600 cursor-pointer hover:bg-gray-100 rounded">
                            ...
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td
                          colSpan="7"
                          className="p-3 text-center text-gray-500 text-sm"
                        >
                          No matching applicants found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}

            {view === "pipeline" && (
              <div className="p-2">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-2">
                  {stageOrder.map((stage) => (
                    <div key={stage} className="bg-white rounded-md shadow-sm">
                      <div
                        className={`p-1.5 rounded-t-md ${getStageColor(stage)}`}
                      >
                        <div className="flex justify-between items-center">
                          <h3
                            className={`text-xs font-medium ${getStageTextColor(
                              stage
                            )}`}
                          >
                            {stage}
                          </h3>
                          <span className="bg-white px-1 py-0.5 rounded-full text-[0.65rem] font-medium text-gray-700">
                            {stageGroups[stage].length}
                          </span>
                        </div>
                      </div>
                      <div className="p-1.5 max-h-[calc(100vh-250px)] overflow-y-auto">
                        {stageGroups[stage].length > 0 ? (
                          stageGroups[stage].map((candidate) => (
                            <CandidateCard
                              key={candidate.id}
                              candidate={candidate}
                            />
                          ))
                        ) : (
                          <div className="text-center py-3 text-gray-500 text-[0.65rem]">
                            No candidates
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {view === "table" && (
              <div className="flex flex-col md:flex-row justify-between items-center p-2 md:p-3 text-xs">
                <div className="flex items-center space-x-1.5 mb-2 md:mb-0">
                  <span>Show</span>
                  <select
                    value={applicantsPerPage}
                    onChange={(e) => {
                      setApplicantsPerPage(Number(e.target.value));
                      setCurrentPage(1);
                    }}
                    className="border rounded px-1 py-0.5 cursor-pointer"
                  >
                    <option value={10}>10</option>
                    <option value={20}>20</option>
                    <option value={50}>50</option>
                  </select>
                  <span>per page</span>
                </div>
                <div className="flex items-center space-x-1">
                  <button
                    onClick={() =>
                      setCurrentPage((prev) => Math.max(prev - 1, 1))
                    }
                    disabled={currentPage === 1}
                    className={`p-1 border rounded ${
                      currentPage === 1
                        ? "text-gray-300 cursor-not-allowed"
                        : "hover:bg-gray-100 cursor-pointer"
                    }`}
                  >
                    <ChevronLeft size={12} />
                  </button>
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    let pageNum;
                    if (totalPages <= 5) {
                      pageNum = i + 1;
                    } else if (currentPage <= 3) {
                      pageNum = i + 1;
                    } else if (currentPage >= totalPages - 2) {
                      pageNum = totalPages - 4 + i;
                    } else {
                      pageNum = currentPage - 2 + i;
                    }
                    return (
                      <button
                        key={pageNum}
                        onClick={() => paginate(pageNum)}
                        className={`px-2 py-0.5 border rounded ${
                          currentPage === pageNum
                            ? "bg-blue-500 text-white"
                            : "hover:bg-gray-100 cursor-pointer"
                        }`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}
                  <button
                    onClick={() =>
                      setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                    }
                    disabled={currentPage === totalPages}
                    className={`p-1 border rounded ${
                      currentPage === totalPages
                        ? "text-gray-300 cursor-not-allowed"
                        : "hover:bg-gray-100 cursor-pointer"
                    }`}
                  >
                    <ChevronRight size={12} />
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
