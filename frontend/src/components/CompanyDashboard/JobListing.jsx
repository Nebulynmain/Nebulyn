import React, { useState, useEffect } from "react";
import { CalendarIcon } from "lucide-react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { ChevronRight, Filter, ChevronLeft, Loader, AlertTriangle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../../App";

const JobListing = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [activeFilters, setActiveFilters] = useState({
    status: null,
    jobType: null,
  });
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dateRange, setDateRange] = useState({
    start: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    end: new Date()
  });

  // Fetch company data and then jobs
  useEffect(() => {
    const fetchJobData = async () => {
      setLoading(true);
      setError(null);
      
      try {
        // First get the company info
        const companyResponse = await axios.get(`${API_URL}/company/get-company-by-user`, {
          withCredentials: true
        });
        
        if (companyResponse.data && companyResponse.data.ok && companyResponse.data.data && companyResponse.data.data.length > 0) {
          const company = companyResponse.data.data[0];
          
          // Fetch jobs for this company
          const jobsResponse = await axios.get(`${API_URL}/job/get-job-by-company/${company._id}`, {
            withCredentials: true
          });
          
          if (jobsResponse.data && jobsResponse.data.ok && jobsResponse.data.data) {
            // Format job data to match the existing UI structure
            const formattedJobs = jobsResponse.data.data.map(job => {
              // Format dates
              const postedDate = new Date(job.createdAt);
              const formattedPostedDate = `${postedDate.getDate()} ${postedDate.toLocaleString('default', { month: 'short' })} ${postedDate.getFullYear()}`;
              
              // Calculate due date (30 days after posting for demo purposes)
              const dueDate = new Date(postedDate);
              dueDate.setDate(dueDate.getDate() + 30);
              const formattedDueDate = `${dueDate.getDate()} ${dueDate.toLocaleString('default', { month: 'short' })} ${dueDate.getFullYear()}`;
              
              // Calculate number of positions filled vs total
              const applicationCount = job.applications ? job.applications.length : 0;
              
              return {
                id: job._id,
                role: job.jobTitle,
                status: job.status,
                datePosted: formattedPostedDate,
                dueDate: formattedDueDate,
                jobType: job.jobType,
                applicants: applicationCount,
                needs: `0/1`, // Placeholder - could be expanded with actual hiring needs data
                description: job.jobDescription,
                salary: job.salary
              };
            });
            
            setJobs(formattedJobs);
            
            // Set date range based on jobs data
            if (formattedJobs.length > 0) {
              const dates = formattedJobs.map(job => new Date(job.datePosted));
              const minDate = new Date(Math.min(...dates));
              const maxDate = new Date(Math.max(...dates));
              setDateRange({
                start: minDate,
                end: maxDate
              });
            }
          }
        }
      } catch (err) {
        console.error("Error fetching job data:", err);
        setError("Failed to load job listings. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    
    fetchJobData();
  }, []);

  // Filter jobs based on active filters
  const filteredJobs = jobs.filter((job) => {
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

  // Format date range for display
  const formatDateRange = () => {
    if (!dateRange.start || !dateRange.end) return "All time";
    
    const startMonth = dateRange.start.toLocaleString('default', { month: 'short' });
    const endMonth = dateRange.end.toLocaleString('default', { month: 'short' });
    
    return `${startMonth} ${dateRange.start.getDate()} - ${endMonth} ${dateRange.end.getDate()}`;
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
                  Here is your jobs listing status from {formatDateRange()}.
                </p>
              </div>
              <div
                className="flex items-center border border-gray-300 px-3 py-1.5 rounded-md cursor-pointer hover:bg-gray-50 mt-2 md:mt-0"
                onClick={() => console.log("Calendar clicked")}
              >
                <span className="text-gray-700 text-sm">{formatDateRange()}</span>
                <CalendarIcon className="w-4 h-4 text-blue-500 ml-2" />
              </div>
            </div>

            {loading ? (
              <div className="flex items-center justify-center h-64">
                <div className="text-center">
                  <Loader className="w-8 h-8 text-blue-500 animate-spin mx-auto" />
                  <p className="mt-2 text-gray-600">Loading job listings...</p>
                </div>
              </div>
            ) : error ? (
              <div className="flex items-center justify-center h-64">
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

                {jobs.length === 0 ? (
                  <div className="py-8 text-center">
                    <p className="text-gray-500">No job listings found.</p>
                    <button 
                      onClick={() => navigate("/job-posting")}
                      className="mt-3 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                    >
                      Create New Job
                    </button>
                  </div>
                ) : (
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
                                    job.jobType === "Full-time" || job.jobType === "Fulltime"
                                      ? "bg-blue-100 text-blue-800 hover:bg-blue-200"
                                      : job.jobType === "Part-time" 
                                        ? "bg-purple-100 text-purple-800 hover:bg-purple-200"
                                        : job.jobType === "Remote"
                                          ? "bg-indigo-100 text-indigo-800 hover:bg-indigo-200"
                                          : job.jobType === "Internship"
                                            ? "bg-teal-100 text-teal-800 hover:bg-teal-200"
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
                                {job.applicants}
                              </td>
                              <td className="p-3 text-xs text-gray-600">
                                {job.needs}
                              </td>
                              <td className="p-3 text-right pr-6">
                                <ChevronRight className="w-4 h-4 text-gray-500 inline-block" />
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan="8" className="p-3 text-center text-gray-500">
                              No jobs match your filters
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                )}

                {jobs.length > 0 && filteredJobs.length > itemsPerPage && (
                  <div className="flex justify-between items-center p-4 border-t border-gray-200">
                    <div className="text-sm text-gray-500">
                      Showing {indexOfFirstItem + 1} to{" "}
                      {Math.min(indexOfLastItem, filteredJobs.length)} of{" "}
                      {filteredJobs.length} entries
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={goToPreviousPage}
                        disabled={currentPage === 1}
                        className={`p-2 rounded-full ${
                          currentPage === 1
                            ? "text-gray-300 cursor-not-allowed"
                            : "text-gray-600 hover:bg-gray-100"
                        }`}
                      >
                        <ChevronLeft className="w-5 h-5" />
                      </button>
                      <button
                        onClick={goToNextPage}
                        disabled={currentPage === totalPages}
                        className={`p-2 rounded-full ${
                          currentPage === totalPages
                            ? "text-gray-300 cursor-not-allowed"
                            : "text-gray-600 hover:bg-gray-100"
                        }`}
                      >
                        <ChevronRight className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobListing;
