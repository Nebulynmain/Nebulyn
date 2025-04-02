import React, { useState } from "react";
import { CalendarIcon } from "lucide-react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { ChevronRight, Filter, ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const jobData = [
  {
    role: "Social Media Assistant",
    status: "Live",
    datePosted: "20 May 2020",
    dueDate: "24 May 2020",
    jobType: "Fulltime",
    applicants: 19,
    needs: "4/11",
  },
  {
    role: "Senior Designer",
    status: "Live",
    datePosted: "16 May 2020",
    dueDate: "24 May 2020",
    jobType: "Fulltime",
    applicants: 1234,
    needs: "0/20",
  },
  {
    role: "Visual Designer",
    status: "Live",
    datePosted: "15 May 2020",
    dueDate: "24 May 2020",
    jobType: "Freelance",
    applicants: 2435,
    needs: "1/5",
  },
  {
    role: "Data Science",
    status: "Closed",
    datePosted: "13 May 2020",
    dueDate: "24 May 2020",
    jobType: "Freelance",
    applicants: 6234,
    needs: "10/10",
  },
  {
    role: "Kotlin Developer",
    status: "Closed",
    datePosted: "12 May 2020",
    dueDate: "24 May 2020",
    jobType: "Fulltime",
    applicants: 12,
    needs: "20/20",
  },
  {
    role: "React Developer",
    status: "Closed",
    datePosted: "11 May 2020",
    dueDate: "24 May 2020",
    jobType: "Fulltime",
    applicants: 14,
    needs: "10/10",
  },
  {
    role: "Kotlin Developer",
    status: "Closed",
    datePosted: "12 May 2020",
    dueDate: "24 May 2020",
    jobType: "Fulltime",
    applicants: 12,
    needs: "20/20",
  },
];

const JobListing = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [activeFilters, setActiveFilters] = useState({
    status: null,
    jobType: null,
  });

  // Filter jobs based on active filters
  const filteredJobs = jobData.filter((job) => {
    if (activeFilters.status && job.status !== activeFilters.status)
      return false;
    if (activeFilters.jobType && job.jobType !== activeFilters.jobType)
      return false;
    return true;
  });

  // Calculate pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredJobs.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredJobs.length / itemsPerPage);

  // Handle pagination
  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Handle filtering
  const handleStatusFilter = (status) => {
    setActiveFilters({
      ...activeFilters,
      status: activeFilters.status === status ? null : status,
    });
    setCurrentPage(1);
  };

  const handleJobTypeFilter = (jobType) => {
    setActiveFilters({
      ...activeFilters,
      jobType: activeFilters.jobType === jobType ? null : jobType,
    });
    setCurrentPage(1);
  };

  const handleRowClick = (job) => {
    navigate("/job-applicant", { state: { jobData: job } });
  };

  const resetFilters = () => {
    setActiveFilters({ status: null, jobType: null });
    setCurrentPage(1);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex flex-row flex-grow">
        <div className="h-screen sticky top-0">
          <Sidebar />
        </div>
        <div className="flex-grow transition-all">
          <Header />
          <div className="p-4">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
              <div>
                <h1 className="text-2xl font-semibold text-gray-900">
                  Job Listing
                </h1>
                <p className="text-gray-500 mt-1 text-sm">
                  Here is your jobs listing status from July 19 - July 25.
                </p>
              </div>
              <div
                className="flex items-center border border-gray-300 px-3 py-1.5 rounded-md cursor-pointer hover:bg-gray-50 mt-2 md:mt-0"
                onClick={() => console.log("Calendar clicked")}
              >
                <span className="text-gray-700 text-sm">Jul 19 - Jul 25</span>
                <CalendarIcon className="w-4 h-4 text-blue-500 ml-2" />
              </div>
            </div>

            {/* Job List Table */}
            <div className="bg-white border border-gray-300 rounded-lg overflow-hidden">
              <div className="flex justify-between items-center p-4 border-b border-gray-300">
                <h2 className="text-lg font-semibold text-gray-800">
                  Job List
                </h2>
                <div className="flex items-center space-x-2">
                  {(activeFilters.status || activeFilters.jobType) && (
                    <button
                      onClick={resetFilters}
                      className="text-xs text-blue-500 hover:underline cursor-pointer"
                    >
                      Clear filters
                    </button>
                  )}
                  <button
                    className="flex items-center text-gray-700 hover:text-gray-900 bg-gray-100 px-3 py-1.5 rounded-md text-sm cursor-pointer"
                    onClick={() => console.log("Filters clicked")}
                  >
                    <Filter className="mr-2 h-4 w-4" />
                    <span>Filters</span>
                  </button>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      {[
                        "Roles",
                        "Status",
                        "Posted",
                        "Due",
                        "Type",
                        "Applicants",
                        "Needs",
                        "",
                      ].map((header) => (
                        <th
                          key={header}
                          className="p-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-default"
                        >
                          {header}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {currentItems.length > 0 ? (
                      currentItems.map((job, index) => (
                        <tr
                          key={index}
                          className="hover:bg-gray-50 cursor-pointer"
                          onClick={() => handleRowClick(job)}
                        >
                          <td className="p-3 whitespace-nowrap font-medium text-gray-900 text-sm">
                            {job.role}
                          </td>
                          <td className="p-3">
                            <span
                              className={`px-2 py-0.5 rounded-full text-xs font-medium cursor-pointer ${
                                job.status === "Live"
                                  ? "bg-green-100 text-green-800 hover:bg-green-200"
                                  : "bg-red-100 text-red-800 hover:bg-red-200"
                              }`}
                              onClick={(e) => {
                                e.stopPropagation();
                                handleStatusFilter(job.status);
                              }}
                            >
                              {job.status}
                            </span>
                          </td>
                          <td className="p-3 text-xs text-gray-600">
                            {job.datePosted}
                          </td>
                          <td className="p-3 text-xs text-gray-600">
                            {job.dueDate}
                          </td>
                          <td className="p-3">
                            <span
                              className={`px-2 py-0.5 rounded-full text-xs font-medium cursor-pointer ${
                                job.jobType === "Fulltime"
                                  ? "bg-blue-100 text-blue-800 hover:bg-blue-200"
                                  : "bg-yellow-100 text-yellow-800 hover:bg-yellow-200"
                              }`}
                              onClick={(e) => {
                                e.stopPropagation();
                                handleJobTypeFilter(job.jobType);
                              }}
                            >
                              {job.jobType}
                            </span>
                          </td>
                          <td className="p-3 text-xs text-gray-600">
                            {job.applicants.toLocaleString()}
                          </td>
                          <td className="p-3 text-xs text-gray-600">
                            {job.needs}
                          </td>
                          <td className="p-3">
                            <span
                              className="text-gray-400 hover:text-gray-600 cursor-pointer"
                              onClick={(e) => {
                                e.stopPropagation();
                                navigate("/job-applicant", {
                                  state: { jobData: job },
                                });
                              }}
                            >
                              ...
                            </span>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td
                          colSpan="8"
                          className="p-4 text-center text-sm text-gray-500"
                        >
                          No jobs found matching your filters
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              <div className="flex flex-col sm:flex-row justify-between items-center p-3 border-t border-gray-200">
                <div className="flex items-center text-xs text-gray-600 mb-2 sm:mb-0">
                  View
                  <select
                    className="mx-2 border rounded text-xs p-1 bg-white cursor-pointer"
                    value={itemsPerPage}
                    onChange={(e) => {
                      setItemsPerPage(Number(e.target.value));
                      setCurrentPage(1);
                    }}
                  >
                    <option value={5}>5</option>
                    <option value={10}>10</option>
                    <option value={25}>25</option>
                  </select>
                  per page
                </div>
                <div className="flex items-center space-x-1">
                  <button
                    className={`p-1.5 text-gray-700 hover:bg-gray-100 rounded flex items-center cursor-pointer ${
                      currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                    onClick={goToPreviousPage}
                    disabled={currentPage === 1}
                  >
                    <ChevronLeft className="h-3.5 w-3.5" />
                  </button>
                  <span className="text-xs px-2 py-1 bg-blue-100 text-blue-800 rounded cursor-default">
                    {currentPage} of {totalPages}
                  </span>
                  <button
                    className={`p-1.5 text-gray-700 hover:bg-gray-100 rounded flex items-center cursor-pointer ${
                      currentPage === totalPages
                        ? "opacity-50 cursor-not-allowed"
                        : ""
                    }`}
                    onClick={goToNextPage}
                    disabled={currentPage === totalPages}
                  >
                    <ChevronRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobListing;
