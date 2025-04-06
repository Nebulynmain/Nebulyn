import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { Search, Filter, Star, ChevronLeft, ChevronRight, Loader, AlertTriangle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../../App";

const Applicant = () => {
  const navigate = useNavigate();
  const [view, setView] = useState("table");
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [companyId, setCompanyId] = useState(null);

  // Fetch company data and then applicants
  useEffect(() => {
    const fetchCompanyData = async () => {
      setLoading(true);
      setError(null);
      
      try {
        // First get the company info
        const companyResponse = await axios.get(`${API_URL}/company/get-company-by-user`, {
          withCredentials: true
        });
        
        if (companyResponse.data && companyResponse.data.ok && companyResponse.data.data && companyResponse.data.data.length > 0) {
          const company = companyResponse.data.data[0];
          setCompanyId(company._id);
          
          // Fetch jobs for this company
          const jobsResponse = await axios.get(`${API_URL}/company/dashboard-stats`, {
            withCredentials: true
          });
          
          if (jobsResponse.data && jobsResponse.data.ok && jobsResponse.data.data) {
            const jobIds = jobsResponse.data.data.jobs.list.map(job => job.id);
            
            // Fetch all applications
            const applicationsResponse = await axios.get(`${API_URL}/application/get-application`, {
              withCredentials: true
            });
            
            if (applicationsResponse.data && applicationsResponse.data.ok) {
              // Filter applications for company's jobs
              const companyApplications = applicationsResponse.data.data.filter(app => 
                jobIds.includes(app.job._id)
              );
              
              // Format applicant data to match the existing UI
              const formattedCandidates = companyApplications.map(app => {
                // Map backend status to UI hiringStage
                let hiringStage;
                switch(app.status) {
                  case "Shortlisted": hiringStage = "Shortlisted"; break;
                  case "Interview": hiringStage = "Interview"; break;
                  case "Hired": hiringStage = "Hired"; break;
                  case "Rejected": hiringStage = "Declined"; break;
                  case "In Review": hiringStage = "Interviewed"; break;
                  default: hiringStage = "Shortlisted";
                }
                
                // Format date
                const appliedDate = new Date(app.appliedAt || app.createdAt);
                const formattedDate = `${appliedDate.getDate()} ${appliedDate.toLocaleString('default', { month: 'long' })}, ${appliedDate.getFullYear()}`;
                
                return {
                  id: app._id,
                  name: app.applicant.fullName || app.applicant.userName,
                  score: app.score || 0,
                  hiringStage: hiringStage,
                  appliedDate: formattedDate,
                  jobRole: app.job.jobTitle,
                  image: app.applicant.profileImage || `https://ui-avatars.com/api/?name=${encodeURIComponent(app.applicant.fullName || app.applicant.userName)}&background=random`
                };
              });
              
              setCandidates(formattedCandidates);
            }
          }
        }
      } catch (err) {
        console.error("Error fetching applicant data:", err);
        setError("Failed to load applicant data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    
    fetchCompanyData();
  }, []);
  
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
          
          {loading ? (
            <div className="flex items-center justify-center h-[calc(100vh-64px)]">
              <div className="flex flex-col items-center">
                <Loader className="w-8 h-8 text-blue-500 animate-spin" />
                <p className="mt-2 text-gray-600">Loading applicants...</p>
              </div>
            </div>
          ) : error ? (
            <div className="flex items-center justify-center h-[calc(100vh-64px)]">
              <div className="text-center bg-red-50 p-4 rounded-lg max-w-lg">
                <AlertTriangle className="w-8 h-8 text-red-500 mx-auto mb-2" />
                <h3 className="text-red-800 font-medium">Error</h3>
                <p className="text-red-600 mt-1">{error}</p>
                <button 
                  onClick={() => window.location.reload()}
                  className="mt-3 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                >
                  Try Again
                </button>
              </div>
            </div>
          ) : (
            <>
              <div className="px-4 py-5">
                <h1 className="text-2xl font-bold text-gray-900">Applicants</h1>
                <div className="my-4 flex justify-between gap-2 flex-wrap">
                  <div className="relative flex w-full md:w-72">
                    <input
                      type="text"
                      placeholder="Search applicants..."
                      className="focus:outline-none pl-9 pr-4 py-2 border border-gray-300 rounded-md placeholder-gray-500 w-full"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
                  </div>
                </div>

                <div className="flex gap-4 mb-4">
                  <button
                    className={`px-4 py-2 rounded-md ${
                      view === "table" ? "bg-blue-50 text-blue-700" : "bg-white"
                    }`}
                    onClick={() => setView("table")}
                  >
                    Table View
                  </button>
                  <button
                    className={`px-4 py-2 rounded-md ${
                      view === "kanban" ? "bg-blue-50 text-blue-700" : "bg-white"
                    }`}
                    onClick={() => setView("kanban")}
                  >
                    Kanban View
                  </button>
                </div>

                {candidates.length === 0 ? (
                  <div className="text-center py-10">
                    <p className="text-gray-500">No applicants found.</p>
                  </div>
                ) : view === "table" ? (
                  // Table View
                  <div className="overflow-x-auto">
                    <table className="min-w-full bg-white divide-y divide-gray-200 shadow-sm border border-gray-200 rounded-md">
                      <thead>
                        <tr className="bg-gray-50">
                          <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-10">
                            <input
                              type="checkbox"
                              className="rounded text-blue-600 focus:ring-blue-500 h-4 w-4"
                              checked={selectAll}
                              onChange={handleSelectAll}
                            />
                          </th>
                          <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Name
                          </th>
                          <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Score
                          </th>
                          <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Hiring Stage
                          </th>
                          <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Job
                          </th>
                          <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Applied
                          </th>
                          <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Action
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {currentApplicants.map((candidate) => (
                          <tr
                            key={candidate.id}
                            className="hover:bg-gray-50 cursor-pointer"
                            onClick={() => navigate(`/applicant-detail/${candidate.id}`)}
                          >
                            <td className="px-3 py-2">
                              <input
                                type="checkbox"
                                className="rounded text-blue-600 focus:ring-blue-500 h-4 w-4"
                                checked={selectedCandidates.includes(candidate.id)}
                                onChange={(e) => {
                                  e.stopPropagation();
                                  handleSelect(candidate.id);
                                }}
                              />
                            </td>
                            <td className="px-3 py-2">
                              <div className="flex items-center">
                                <div className="flex-shrink-0 h-8 w-8">
                                  <img
                                    className="h-8 w-8 rounded-full object-cover"
                                    src={candidate.image}
                                    alt={candidate.name}
                                    onError={(e) => {
                                      e.target.onerror = null;
                                      e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(candidate.name)}&background=random`;
                                    }}
                                  />
                                </div>
                                <div className="ml-3">
                                  <p className="text-sm font-medium text-gray-900">
                                    {candidate.name}
                                  </p>
                                </div>
                              </div>
                            </td>
                            <td className="px-3 py-2">
                              <div className="flex items-center">
                                <Star
                                  className={`${getStarColor(
                                    candidate.score
                                  )} h-4 w-4`}
                                  fill={candidate.score > 0 ? "#FACC15" : "none"}
                                />
                                <span className="ml-1 text-sm">
                                  {candidate.score}
                                </span>
                              </div>
                            </td>
                            <td className="px-3 py-2">
                              <span
                                className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStageColor(
                                  candidate.hiringStage
                                )} ${getStageTextColor(candidate.hiringStage)}`}
                              >
                                {candidate.hiringStage}
                              </span>
                            </td>
                            <td className="px-3 py-2 text-sm text-gray-900">
                              {candidate.jobRole}
                            </td>
                            <td className="px-3 py-2 text-sm text-gray-500">
                              {candidate.appliedDate}
                            </td>
                            <td className="px-3 py-2 text-sm">
                              <button
                                className="text-blue-600 hover:text-blue-800 text-xs"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  navigate(`/applicant-detail/${candidate.id}`);
                                }}
                              >
                                View
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    
                    {/* Pagination */}
                    {totalPages > 1 && (
                      <div className="flex justify-between items-center mt-4 px-2">
                        <div className="text-sm text-gray-700">
                          Showing {indexOfFirstApplicant + 1} to{" "}
                          {Math.min(indexOfLastApplicant, filteredCandidates.length)} of{" "}
                          {filteredCandidates.length} results
                        </div>
                        <div className="inline-flex gap-1">
                          <button
                            onClick={() => paginate(Math.max(1, currentPage - 1))}
                            className="px-2 py-1 border border-gray-300 rounded-md text-sm"
                            disabled={currentPage === 1}
                          >
                            <ChevronLeft size={16} />
                          </button>
                          {Array.from({ length: totalPages }, (_, i) => i + 1)
                            .filter(
                              (number) =>
                                number === 1 ||
                                number === totalPages ||
                                Math.abs(number - currentPage) <= 1
                            )
                            .map((number, index, array) => (
                              <React.Fragment key={number}>
                                {index > 0 && array[index - 1] !== number - 1 && (
                                  <span className="px-2 py-1 border border-gray-300 rounded-md text-sm">
                                    ...
                                  </span>
                                )}
                                <button
                                  onClick={() => paginate(number)}
                                  className={`px-3 py-1 border rounded-md text-sm ${
                                    currentPage === number
                                      ? "bg-blue-600 text-white border-blue-600"
                                      : "border-gray-300"
                                  }`}
                                >
                                  {number}
                                </button>
                              </React.Fragment>
                            ))}
                          <button
                            onClick={() => paginate(Math.min(totalPages, currentPage + 1))}
                            className="px-2 py-1 border border-gray-300 rounded-md text-sm"
                            disabled={currentPage === totalPages}
                          >
                            <ChevronRight size={16} />
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  // Kanban View
                  <div className="flex flex-col md:flex-row gap-4 overflow-x-auto pb-4">
                    {stageOrder.map((stage) => (
                      <div key={stage} className="flex-1 min-w-[250px]">
                        <h3 className="font-medium mb-2 flex items-center gap-2">
                          <span
                            className={`inline-block w-2 h-2 rounded-full ${getStageColor(
                              stage
                            ).replace("bg-", "bg-")}`}
                          ></span>
                          {stage}{" "}
                          <span className="text-gray-500 text-sm">
                            ({stageGroups[stage]?.length || 0})
                          </span>
                        </h3>
                        <div className="space-y-2">
                          {stageGroups[stage]?.map((candidate) => (
                            <CandidateCard key={candidate.id} candidate={candidate} />
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Applicant;
