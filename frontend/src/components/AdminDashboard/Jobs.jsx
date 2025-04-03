import React, { useState, useEffect, useMemo } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import {
  Search,
  MapPin,
  ChevronDown,
  ChevronUp,
  List,
  Grid,
  Loader,
} from "lucide-react";
import { Link } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../../App";

// Fallback job data for when API fails
const fallbackJobs = [
  {
    id: "fallback1",
    title: "Social Media Assistant",
    company: "Nomad",
    location: "Paris, France",
    type: "Full-Time",
    category: ["Marketing", "Design"],
    applied: 5,
    capacity: 10,
    logo: null,
    salary: "$1200 - $1500",
    level: "Entry Level",
  },
  {
    id: "fallback2",
    title: "Brand Designer",
    company: "Dropbox",
    location: "San Francisco, USA",
    type: "Part-Time",
    category: ["Design"],
    applied: 2,
    capacity: 10,
    logo: null,
    salary: "$2000 - $2500",
    level: "Mid Level",
  },
  {
    id: "fallback3",
    title: "UI Designer",
    company: "Google",
    location: "Delhi, India",
    type: "Remote",
    category: ["Design", "Technology"],
    applied: 8,
    capacity: 15,
    logo: null,
    salary: "$1500 - $2000",
    level: "Mid Level",
  },
  {
    id: "fallback4",
    title: "Marketing Manager",
    company: "Amazon",
    location: "Mumbai, India",
    type: "Full-Time",
    category: ["Marketing", "Business"],
    applied: 12,
    capacity: 20,
    logo: null,
    salary: "$3000 or above",
    level: "Senior Level",
  },
  {
    id: "fallback5",
    title: "UX Researcher",
    company: "Microsoft",
    location: "Bangalore, India",
    type: "Internship",
    category: ["Design", "Technology"],
    applied: 3,
    capacity: 5,
    logo: null,
    salary: "$700 - $1000",
    level: "Entry Level",
  },
  {
    id: "fallback6",
    title: "Android Developer",
    company: "Netflix",
    location: "Chennai, India",
    type: "Contract",
    category: ["Engineering", "Technology"],
    applied: 7,
    capacity: 10,
    logo: null,
    salary: "$1500 - $2000",
    level: "Mid Level",
  },
];

const Jobs = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [location, setLocation] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const locations = [
    "Delhi, India",
    "Mumbai, India",
    "Bangalore, India",
    "Chennai, India",
    "Paris, France",
    "San Francisco, USA",
  ];
  const popularJobs = ["UI Designer", "UX Researcher", "Android", "Admin"];
  const [isOpen, setIsOpen] = useState(true);
  const [categoriesOpen, setCategoriesOpen] = useState(true);
  const [jobLevelOpen, setJobLevelOpen] = useState(true);
  const [salaryOpen, setSalaryOpen] = useState(true);

  const [view, setView] = useState("list");
  const [sortBy, setSortBy] = useState("Relevance");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 5;
  const sortOptions = ["Relevance", "Newest", "Most Applied"];

  // State for API data
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [jobTypes, setJobTypes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [jobLevels, setJobLevels] = useState([]);
  const [salaryRanges, setSalaryRanges] = useState([]);

  // Filter states
  const [selectedJobTypes, setSelectedJobTypes] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedJobLevels, setSelectedJobLevels] = useState([]);
  const [selectedSalaryRanges, setSelectedSalaryRanges] = useState([]);

  // Filtered jobs state
  const [filteredJobs, setFilteredJobs] = useState([]);

  // Helper function to count occurrences
  const countOccurrences = (array, key = null) => {
    const counts = {};
    array.forEach(item => {
      const value = key ? item[key] : item;
      counts[value] = (counts[value] || 0) + 1;
    });
    return counts;
  };

  // Fetch jobs from backend
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true);
        console.log("API_URL value:", API_URL);
        console.log("Fetching jobs from:", `${API_URL}/job/get-job`);
        
        const response = await axios.get(`${API_URL}/job/get-job`, {
          withCredentials: true
        });
        
        console.log("API Response status:", response.status);
        console.log("Full API Response structure:", {
          status: response.status,
          statusText: response.statusText,
          headers: response.headers,
          config: response.config,
          dataType: typeof response.data,
          hasOk: response.data?.ok !== undefined,
          hasData: response.data?.data !== undefined,
          dataLength: Array.isArray(response.data?.data) ? response.data.data.length : 'not an array'
        });
        
        // Deep examine the first item if it exists
        if (response.data?.data?.[0]) {
          console.log("First job item keys:", Object.keys(response.data.data[0]));
          console.log("First job company field:", response.data.data[0].company);
        }
        
        if (response.data.ok) {
          const jobsData = response.data.data || [];
          console.log("Raw jobs data:", jobsData);
          
          // Transform the job data to match the component's expected structure
          const transformedJobs = jobsData.map(job => {
            // Log the current job being processed for debugging
            console.log("Processing job:", job._id, job.jobTitle);
            console.log("Job company data:", {
              companyType: typeof job.company,
              companyValue: job.company,
              companyFields: job.company && typeof job.company === 'object' ? Object.keys(job.company) : [],
              hasCompanyName: job.company?.companyName !== undefined
            });
            
            // Safely extract company details - the API populates the company object
            const companyName = job.company && typeof job.company === 'object' 
              ? job.company.companyName || 'Unknown Company'
              : 'Unknown Company';
              
            const companyLogo = job.company && typeof job.company === 'object' && job.company.companyLogo
              ? job.company.companyLogo
              : null;

            // Format the salary with dollar sign if it's a number
            const formattedSalary = typeof job.salary === 'number' 
              ? `$${job.salary.toLocaleString()}` 
              : job.salary || 'Competitive';
              
            // Create categories from skillsRequired array
            const categories = Array.isArray(job.skillsRequired) 
              ? job.skillsRequired.map(skill => skill.trim()).filter(Boolean)
              : ['General'];
              
            // Format the job type and ensure it exists
            const jobType = job.jobType || 'Full-time';
              
            return {
              id: job._id || `job-${Math.random().toString(36).substr(2, 9)}`,
              title: job.jobTitle || 'Job Title Not Available',
              company: companyName,
              logo: companyLogo,
              location: job.location || 'Remote',
              type: jobType,
              category: categories,
              level: job.level || 'Entry Level',
              salary: formattedSalary,
              status: job.status || 'Live',
              date: job.createdAt ? new Date(job.createdAt).toLocaleDateString() : 'Recently Posted',
              jobDescription: job.jobDescription || 'No description available',
              companyData: job.company || {},
              applied: Array.isArray(job.applications) ? job.applications.length : 0,
              capacity: 10
            };
          });
          
          console.log("Transformed jobs:", transformedJobs);
          console.log("Sample job object fields:", transformedJobs.length > 0 ? Object.keys(transformedJobs[0]) : []);
          
          setJobs(transformedJobs);
          setFilteredJobs(transformedJobs);
          
          // Create job type categories from the data
          const typesWithCount = countOccurrences(transformedJobs, 'type');
          setJobTypes(Object.keys(typesWithCount).map(type => ({
            type,
            count: typesWithCount[type]
          })));
          
          // Create categories from the data
          const allCategories = transformedJobs.flatMap(job => job.category);
          const categoriesWithCount = countOccurrences(allCategories);
          setCategories(Object.keys(categoriesWithCount).map(name => ({
            name,
            count: categoriesWithCount[name]
          })));
          
          // Create job levels from the data
          const levelsWithCount = countOccurrences(transformedJobs, 'level');
          setJobLevels(Object.keys(levelsWithCount).map(name => ({
            name,
            count: levelsWithCount[name]
          })));
          
          // Create salary ranges from the data
          const salaryWithCount = countOccurrences(transformedJobs, 'salary');
          setSalaryRanges(Object.keys(salaryWithCount).map(label => ({
            label,
            count: salaryWithCount[label]
          })));
        } else {
          console.error("API returned error:", response.data);
          setError(`Failed to fetch jobs: ${response.data.message || "Unknown error"}`);
          
          // Use fallback data
          setJobs(fallbackJobs);
          setFilteredJobs(fallbackJobs);
          createFilterCategories(fallbackJobs);
        }
      } catch (err) {
        console.error("Error fetching jobs:", err);
        console.error("Error details:", {
          message: err.message,
          status: err.response?.status,
          statusText: err.response?.statusText,
          data: err.response?.data
        });
        
        // Set a more descriptive error message
        let errorMessage = `Error fetching job data: ${err.message}`;
        if (err.response?.status === 404) {
          errorMessage = "API endpoint not found (404). Please check if the backend server is running and the endpoint path is correct.";
        } else if (err.response?.status === 401) {
          errorMessage = "Unauthorized (401). Please log in to access the job data.";
        } else if (err.response?.status === 500) {
          errorMessage = "Server error (500). Please try again later or contact support.";
        }
        
        setError(errorMessage);
        
        // Use fallback data
        setJobs(fallbackJobs);
        setFilteredJobs(fallbackJobs);
        createFilterCategories(fallbackJobs);
      } finally {
        setLoading(false);
      }
    };
    
    // Helper function to create filter categories from fallback data
    const createFilterCategories = (data) => {
      // Job types
      const typesWithCount = countOccurrences(data, 'type');
      setJobTypes(Object.keys(typesWithCount).map(type => ({
        type,
        count: typesWithCount[type]
      })));
      
      // Categories
      const allCategories = data.flatMap(job => job.category);
      const categoriesWithCount = countOccurrences(allCategories);
      setCategories(Object.keys(categoriesWithCount).map(name => ({
        name,
        count: categoriesWithCount[name]
      })));
      
      // Job levels
      const levelsWithCount = countOccurrences(data, 'level');
      setJobLevels(Object.keys(levelsWithCount).map(name => ({
        name,
        count: levelsWithCount[name]
      })));
      
      // Salary ranges
      const salaryWithCount = countOccurrences(data, 'salary');
      setSalaryRanges(Object.keys(salaryWithCount).map(label => ({
        label,
        count: salaryWithCount[label]
      })));
    };
    
    fetchJobs();
  }, []);

  // Calculate filtered jobs with useMemo to avoid unnecessary recalculations
  const filteredJobsData = useMemo(() => {
    if (jobs.length === 0) return [];
    
    console.log("Calculating filtered jobs:", jobs.length);
    let result = [...jobs];

    // Apply search term filter
    if (searchTerm) {
      result = result.filter(
        (job) =>
          job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
          job.category.some((cat) =>
            cat.toLowerCase().includes(searchTerm.toLowerCase())
          )
      );
    }

    // Apply location filter
    if (location) {
      result = result.filter((job) => job.location === location);
    }

    // Apply job type filter
    if (selectedJobTypes.length > 0) {
      result = result.filter((job) => selectedJobTypes.includes(job.type));
    }

    // Apply categories filter
    if (selectedCategories.length > 0) {
      result = result.filter((job) =>
        job.category.some((category) => selectedCategories.includes(category))
      );
    }

    // Apply job level filter
    if (selectedJobLevels.length > 0) {
      result = result.filter((job) => selectedJobLevels.includes(job.level));
    }

    // Apply salary range filter
    if (selectedSalaryRanges.length > 0) {
      result = result.filter((job) =>
        selectedSalaryRanges.includes(job.salary)
      );
    }

    // Apply sorting
    if (sortBy === "Newest") {
      // For real data, we would sort by date field
      result = [...result].reverse();
    } else if (sortBy === "Most Applied") {
      result = [...result].sort((a, b) => b.applied - a.applied);
    }

    return result;
  }, [
    jobs,
    searchTerm,
    location,
    selectedJobTypes,
    selectedCategories,
    selectedJobLevels,
    selectedSalaryRanges,
    sortBy,
  ]);

  // Update filteredJobs state whenever filteredJobsData changes
  useEffect(() => {
    setFilteredJobs(filteredJobsData);
    setCurrentPage(1); // Reset to first page when filters change
  }, [filteredJobsData]);

  // Calculate pagination with useMemo 
  const paginationData = useMemo(() => {
    const indexOfLastJob = currentPage * jobsPerPage;
    const indexOfFirstJob = indexOfLastJob - jobsPerPage;
    const currentJobs = filteredJobs.slice(indexOfFirstJob, indexOfLastJob);
    const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);

    return {
      currentJobs,
      totalPages
    };
  }, [filteredJobs, currentPage, jobsPerPage]);

  const { currentJobs, totalPages } = paginationData;

  // Add logging for UI rendering data
  console.log("Rendering - Filtered Jobs Length:", filteredJobs.length);
  console.log("Rendering - Current Jobs:", currentJobs);
  console.log("Rendering - Total Pages:", totalPages);

  // Update current page if it's out of bounds for the current filtered jobs
  useEffect(() => {
    // If we have filtered jobs but current page would be empty
    if (filteredJobs.length > 0 && currentPage > totalPages) {
      console.log("Current page exceeds total pages - resetting to page 1");
      setCurrentPage(1);
    }
  }, [filteredJobs.length, currentPage, totalPages]);

  // Loading state
  if (loading) {
    return (
      <div className="flex flex-col min-h-screen">
        <div className="flex flex-row flex-grow">
          <div className="h-screen sticky top-0">
            <Sidebar />
          </div>
          <div className="flex-grow transition-all">
            <Header />
            <div className="flex justify-center items-center h-64">
              <div className="text-center">
                <Loader className="h-8 w-8 animate-spin text-blue-500 mx-auto" />
                <p className="mt-2 text-gray-600">Loading jobs...</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Error state with fallback data
  if (error && filteredJobs.length === 0) {
    return (
      <div className="flex flex-col min-h-screen">
        <div className="flex flex-row flex-grow">
          <div className="h-screen sticky top-0">
            <Sidebar />
          </div>
          <div className="flex-grow transition-all">
            <Header />
            <div className="flex justify-center items-center h-64">
              <div className="text-center p-6 bg-red-50 rounded-lg max-w-lg">
                <h3 className="text-lg font-semibold text-red-700 mb-2">Error Loading Jobs</h3>
                <p className="text-red-600 mb-4">{error}</p>
                <button 
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                  onClick={() => window.location.reload()}
                >
                  Retry
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Handle job type checkbox changes
  const handleJobTypeChange = (type) => {
    setSelectedJobTypes((prev) => {
      if (prev.includes(type)) {
        return prev.filter((t) => t !== type);
      } else {
        return [...prev, type];
      }
    });
  };

  // Handle category checkbox changes
  const handleCategoryChange = (category) => {
    setSelectedCategories((prev) => {
      if (prev.includes(category)) {
        return prev.filter((c) => c !== category);
      } else {
        return [...prev, category];
      }
    });
  };

  // Handle job level checkbox changes
  const handleJobLevelChange = (level) => {
    setSelectedJobLevels((prev) => {
      if (prev.includes(level)) {
        return prev.filter((l) => l !== level);
      } else {
        return [...prev, level];
      }
    });
  };

  // Handle salary range checkbox changes
  const handleSalaryRangeChange = (range) => {
    setSelectedSalaryRanges((prev) => {
      if (prev.includes(range)) {
        return prev.filter((r) => r !== range);
      } else {
        return [...prev, range];
      }
    });
  };

  // Handle popular job click
  const handlePopularJobClick = (job) => {
    setSearchTerm(job);
  };

  // Handle search
  const handleSearch = () => {
    // The search is applied through the useEffect
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex flex-row flex-grow">
        {/* Sidebar */}
        <div className="h-screen sticky top-0">
          <Sidebar />
        </div>
        <div className="flex-grow transition-all">
          <Header />
          <div className="">
            {/*Part 1 - Search Bar - Reduced padding and input sizes*/}
            <div className="p-3 relative border-b border-gray-300">
              <div className="bg-white shadow-sm p-4 border border-gray-200 flex items-center space-x-3">
                <Search className="text-black w-6 h-6" />
                <div className="flex-1 flex items-center border-b border-gray-300 pb-2 w-1/2">
                  <input
                    type="text"
                    placeholder="Job title or keyword"
                    className="w-full outline-none text-base text-gray-700 py-2"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>

                <div className="border-l border-gray-400 text-transparent">
                  .
                </div>

                <MapPin className="text-black w-6 h-6" />
                <div className="flex-1 flex items-center border-b border-gray-300 pb-2 w-1/2 relative">
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    placeholder="Select a location (optional)"
                    className="w-full outline-none text-gray-700 cursor-pointer py-2 text-base"
                  />
                  <ChevronDown
                    className="text-gray-400 w-4 h-4 absolute right-2 cursor-pointer"
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                  />
                  {dropdownOpen && (
                    <ul className="absolute top-full left-0 w-full bg-white border border-gray-200 shadow-md mt-1 rounded-md overflow-hidden z-20">
                      <li
                        className="p-2 hover:bg-gray-100 cursor-pointer text-sm font-medium text-blue-600"
                        onClick={() => {
                          setLocation("");
                          setDropdownOpen(false);
                        }}
                      >
                        Show All Locations
                      </li>
                      {locations.map((loc, index) => (
                        <li
                          key={index}
                          className="p-2 hover:bg-gray-100 cursor-pointer text-sm"
                          onClick={() => {
                            setLocation(loc);
                            setDropdownOpen(false);
                          }}
                        >
                          {loc}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                <button
                  className="bg-blue-600 text-white px-6 py-2 font-medium text-sm cursor-pointer"
                  onClick={handleSearch}
                >
                  Search
                </button>
              </div>

              <p className="text-gray-500 mt-2 text-sm">
                Popular:{" "}
                {popularJobs.map((job, index) => (
                  <span
                    key={index}
                    className="text-gray-500 text-sm cursor-pointer hover:text-blue-500"
                    onClick={() => handlePopularJobClick(job)}
                  >
                    {job}
                    {index < popularJobs.length - 1 ? ", " : ""}
                  </span>
                ))}
              </p>
            </div>
            {/*Part 2 - Filters and Results - Reduced padding and text sizes*/}
            <div className="flex p-4">
              <div className="w-1/4 p-3 bg-white">
                {/* Type of Employment */}
                <div
                  className="flex justify-between items-center cursor-pointer"
                  onClick={() => setIsOpen(!isOpen)}
                >
                  <h2 className="text-base font-semibold text-gray-900">
                    Type of Employment
                  </h2>
                  {isOpen ? (
                    <ChevronUp className="text-gray-500 w-4 h-4" />
                  ) : (
                    <ChevronDown className="text-gray-500 w-4 h-4" />
                  )}
                </div>
                {isOpen && (
                  <div className="mt-2 space-y-2">
                    {jobTypes.map((job, index) => (
                      <label
                        key={index}
                        className="flex items-center space-x-2 text-gray-800 text-sm cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          className="w-4 h-4 text-blue-600 border-gray-500 rounded focus:ring-0 cursor-pointer"
                          checked={selectedJobTypes.includes(job.type)}
                          onChange={() => handleJobTypeChange(job.type)}
                        />
                        <span>
                          {job.type}{" "}
                          <span className="text-gray-500 text-xs">
                            ({job.count})
                          </span>
                        </span>
                      </label>
                    ))}
                  </div>
                )}
                {/* Categories */}
                <div
                  className="flex justify-between items-center cursor-pointer mt-4"
                  onClick={() => setCategoriesOpen(!categoriesOpen)}
                >
                  <h2 className="text-base font-semibold text-gray-900">
                    Categories
                  </h2>
                  {categoriesOpen ? (
                    <ChevronUp className="text-gray-500 w-4 h-4" />
                  ) : (
                    <ChevronDown className="text-gray-500 w-4 h-4" />
                  )}
                </div>
                {categoriesOpen && (
                  <div className="mt-2 space-y-2">
                    {categories.map((category, index) => (
                      <label
                        key={index}
                        className="flex items-center space-x-2 text-gray-800 text-sm cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          className="w-4 h-4 text-blue-600 border-gray-500 rounded focus:ring-0 cursor-pointer"
                          checked={selectedCategories.includes(category.name)}
                          onChange={() => handleCategoryChange(category.name)}
                        />
                        <span>
                          {category.name}{" "}
                          <span className="text-gray-500 text-xs">
                            ({category.count})
                          </span>
                        </span>
                      </label>
                    ))}
                  </div>
                )}
                {/* Job Level */}
                <div
                  className="flex justify-between items-center cursor-pointer mt-4"
                  onClick={() => setJobLevelOpen(!jobLevelOpen)}
                >
                  <h2 className="text-base font-semibold text-gray-900">
                    Job Level
                  </h2>
                  {jobLevelOpen ? (
                    <ChevronUp className="text-gray-500 w-4 h-4" />
                  ) : (
                    <ChevronDown className="text-gray-500 w-4 h-4" />
                  )}
                </div>
                {jobLevelOpen && (
                  <div className="mt-2 space-y-2">
                    {jobLevels.map((level, index) => (
                      <label
                        key={index}
                        className="flex items-center space-x-2 text-gray-800 text-sm cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          className="w-4 h-4 text-blue-600 border-gray-500 rounded focus:ring-0 cursor-pointer"
                          checked={selectedJobLevels.includes(level.name)}
                          onChange={() => handleJobLevelChange(level.name)}
                        />
                        <span>
                          {level.name}{" "}
                          <span className="text-gray-500 text-xs">
                            ({level.count})
                          </span>
                        </span>
                      </label>
                    ))}
                  </div>
                )}
                {/* Salary Range */}
                <div
                  className="flex justify-between items-center cursor-pointer mt-4"
                  onClick={() => setSalaryOpen(!salaryOpen)}
                >
                  <h2 className="text-base font-semibold text-gray-900">
                    Salary Range
                  </h2>
                  {salaryOpen ? (
                    <ChevronUp className="text-gray-500 w-4 h-4" />
                  ) : (
                    <ChevronDown className="text-gray-500 w-4 h-4" />
                  )}
                </div>
                {salaryOpen && (
                  <div className="mt-2 space-y-2">
                    {salaryRanges.map((range, index) => (
                      <label
                        key={index}
                        className="flex items-center space-x-2 text-gray-800 text-sm cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          className="w-4 h-4 text-blue-600 border-gray-500 rounded focus:ring-0 cursor-pointer"
                          checked={selectedSalaryRanges.includes(range.label)}
                          onChange={() => handleSalaryRangeChange(range.label)}
                        />
                        <span>
                          {range.label}{" "}
                          <span className="text-gray-500 text-xs">
                            ({range.count})
                          </span>
                        </span>
                      </label>
                    ))}
                  </div>
                )}
              </div>
              <div className="w-3/4 p-3">
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="text-lg font-bold">All Jobs</h2>
                    <p className="text-gray-500 text-sm">
                      Showing {filteredJobs.length} results
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      className="text-xs bg-gray-100 px-2 py-1 rounded text-gray-700 hover:bg-gray-200"
                      onClick={() => {
                        console.log("Raw jobs data:", jobs);
                        console.log("Filtered jobs:", filteredJobs);
                        console.log("Current page jobs:", currentJobs);
                      }}
                    >
                      Debug Data
                    </button>
                    <div className="relative">
                      <button
                        className="text-gray-600 font-semibold text-sm flex items-center cursor-pointer"
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                      >
                        Sort by: {sortBy}{" "}
                        <ChevronDown className="ml-1 w-3 h-3" />
                      </button>
                      {isDropdownOpen && (
                        <div className="absolute top-full mt-1 bg-white shadow-md rounded border border-gray-200 w-36">
                          {sortOptions.map((option, index) => (
                            <button
                              key={index}
                              className="block w-full text-left px-3 py-1 text-sm hover:bg-gray-100 cursor-pointer"
                              onClick={() => {
                                setSortBy(option);
                                setIsDropdownOpen(false);
                              }}
                            >
                              {option}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                    <div className="flex gap-1">
                      <button
                        className={`p-1 rounded cursor-pointer ${
                          view === "grid"
                            ? "bg-blue-500 text-white"
                            : "text-gray-600"
                        }`}
                        onClick={() => setView("grid")}
                      >
                        <Grid className="w-4 h-4" />
                      </button>
                      <button
                        className={`p-1 rounded cursor-pointer ${
                          view === "list"
                            ? "bg-blue-500 text-white"
                            : "text-gray-600"
                        }`}
                        onClick={() => setView("list")}
                      >
                        <List className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* List View */}
                {view === "list" && (
                  <div className="mt-3 space-y-3">
                    {currentJobs && currentJobs.length > 0 ? (
                      currentJobs.map((job, index) => (
                        <div
                          key={index}
                          className="bg-white p-3 shadow-md rounded-sm flex justify-between items-center border border-gray-200"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full flex items-center justify-center overflow-hidden bg-gray-100">
                              {job.logo && job.logo !== 'https://via.placeholder.com/40' ? (
                                <img
                                  src={job.logo}
                                  alt={job.company}
                                  className="w-full h-full object-cover"
                                  onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.style.display = 'none';
                                  }}
                                />
                              ) : (
                                <span className="text-blue-600 font-bold text-xs">
                                  {job.company.charAt(0)}
                                </span>
                              )}
                            </div>
                            <div>
                              <h3 className="text-base font-bold">
                                {job.title}
                              </h3>
                              <p className="text-gray-500 text-xs">
                                {job.company} • {job.location}
                              </p>
                              <div className="flex gap-1 mt-1 flex-wrap">
                                <span
                                  className={`text-xs px-2 py-0.5 rounded-full font-semibold border ${
                                    job.type === "Full-Time"
                                      ? "bg-green-100 text-green-600 border-green-300"
                                      : job.type === "Remote"
                                      ? "bg-blue-100 text-blue-600 border-blue-300"
                                      : job.type === "Part-Time"
                                      ? "bg-yellow-100 text-yellow-600 border-yellow-300"
                                      : "bg-gray-100 text-gray-600 border-gray-300"
                                  }`}
                                >
                                  {job.type}
                                </span>
                                <div className="border-r border-gray-300 text-transparent">
                                  .
                                </div>
                                {job.category.map((cat, i) => (
                                  <span
                                    key={i}
                                    className={`text-xs px-2 py-0.5 rounded-full font-semibold border ${
                                      cat === "Marketing"
                                        ? "bg-yellow-100 text-yellow-600 border-yellow-300"
                                        : cat === "Design"
                                        ? "bg-blue-100 text-blue-600 border-blue-300"
                                        : cat === "Technology"
                                        ? "bg-purple-100 text-purple-600 border-purple-300"
                                        : "bg-teal-100 text-teal-600 border-teal-300"
                                    }`}
                                  >
                                    {cat}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>
                          <div
                            className="text-center"
                            style={{ width: "120px" }}
                          >
                            <Link to={`/description?jobId=${job.id}`}>
                              <button className="bg-blue-500 text-white px-3 py-1 rounded-sm w-full cursor-pointer text-sm"
                                data-job-id={job.id}
                              >
                                Apply
                              </button>
                            </Link>
                            <p className="text-xs text-gray-500 mt-1 font-medium">
                              <span className="text-black font-bold">
                                {job.applied}
                              </span>{" "}
                              applied of {job.capacity} capacity
                            </p>
                            <div className="w-full bg-gray-200 h-1.5 mt-1 rounded-full relative">
                              <div
                                className="bg-blue-500 h-1.5 rounded-full"
                                style={{
                                  width: `${
                                    (job.applied / job.capacity) * 100
                                  }%`,
                                }}
                              ></div>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-6 bg-white shadow-md rounded-sm">
                        <p className="text-gray-500 text-sm">
                          No jobs found matching your criteria
                        </p>
                        <p className="text-xs text-gray-400 mt-2">
                          {filteredJobs.length > 0 ? 
                            `There are ${filteredJobs.length} filtered jobs, but none on the current page.` : 
                            "No jobs in the filtered results."
                          }
                        </p>
                      </div>
                    )}
                  </div>
                )}

                {/* Grid View */}
                {view === "grid" && (
                  <div className="mt-3 grid grid-cols-2 gap-3">
                    {currentJobs && currentJobs.length > 0 ? (
                      currentJobs.map((job, index) => (
                        <div
                          key={index}
                          className="bg-white p-3 shadow-md rounded-sm border border-gray-200 flex flex-col"
                        >
                          <div className="flex items-center gap-2 mb-2">
                            <div className="w-7 h-7 rounded-full flex items-center justify-center overflow-hidden bg-gray-100">
                              {job.logo && job.logo !== 'https://via.placeholder.com/40' ? (
                                <img
                                  src={job.logo}
                                  alt={job.company}
                                  className="w-full h-full object-cover"
                                  onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.style.display = 'none';
                                  }}
                                />
                              ) : (
                                <span className="text-blue-600 font-bold text-xs">
                                  {job.company.charAt(0)}
                                </span>
                              )}
                            </div>
                            <div>
                              <h3 className="text-sm font-bold">{job.title}</h3>
                              <p className="text-gray-500 text-xs">
                                {job.company}
                              </p>
                            </div>
                          </div>

                          <p className="text-gray-500 text-xs mb-2">
                            <MapPin className="inline w-3 h-3 mr-1" />
                            {job.location}
                          </p>

                          <div className="flex flex-wrap gap-1 mb-2">
                            <span
                              className={`text-xs px-2 py-0.5 rounded-full font-semibold border ${
                                job.type === "Full-Time"
                                  ? "bg-green-100 text-green-600 border-green-300"
                                  : job.type === "Remote"
                                  ? "bg-blue-100 text-blue-600 border-blue-300"
                                  : job.type === "Part-Time"
                                  ? "bg-yellow-100 text-yellow-600 border-yellow-300"
                                  : "bg-gray-100 text-gray-600 border-gray-300"
                              }`}
                            >
                              {job.type}
                            </span>
                            {job.category.map((cat, i) => (
                              <span
                                key={i}
                                className={`text-xs px-2 py-0.5 rounded-full font-semibold border ${
                                  cat === "Marketing"
                                    ? "bg-yellow-100 text-yellow-600 border-yellow-300"
                                    : cat === "Design"
                                    ? "bg-blue-100 text-blue-600 border-blue-300"
                                    : cat === "Technology"
                                    ? "bg-purple-100 text-purple-600 border-purple-300"
                                    : "bg-teal-100 text-teal-600 border-teal-300"
                                }`}
                              >
                                {cat}
                              </span>
                            ))}
                          </div>

                          <div className="mt-auto">
                            <Link 
                              to={`/description?jobId=${job.id}`}
                              style={{
                                display: "block",
                                width: "100px",
                                margin: "0 auto",
                              }}
                            >
                              <button className="bg-blue-500 text-white px-3 py-1 rounded-sm w-full cursor-pointer mb-1 text-xs"
                                data-job-id={job.id}
                              >
                                Apply
                              </button>
                            </Link>
                            <p className="text-xs text-gray-500 mt-1 font-medium">
                              <span className="text-black font-bold">
                                {job.applied}
                              </span>{" "}
                              applied of {job.capacity} capacity
                            </p>
                            <div className="w-full bg-gray-200 h-1.5 mt-1 rounded-full relative">
                              <div
                                className="bg-blue-500 h-1.5 rounded-full"
                                style={{
                                  width: `${
                                    (job.applied / job.capacity) * 100
                                  }%`,
                                }}
                              ></div>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-6 col-span-2 bg-white shadow-md rounded-sm">
                        <p className="text-gray-500 text-sm">
                          No jobs found matching your criteria
                        </p>
                        <p className="text-xs text-gray-400 mt-2">
                          {filteredJobs.length > 0 ? 
                            `There are ${filteredJobs.length} filtered jobs, but none on the current page.` : 
                            "No jobs in the filtered results."
                          }
                        </p>
                      </div>
                    )}
                  </div>
                )}

                {/* Pagination */}
                <div className="flex justify-center items-center mt-4 gap-1">
                  <button
                    className="px-2 py-1 text-xs text-gray-600 rounded hover:bg-gray-200 cursor-pointer"
                    onClick={() =>
                      setCurrentPage((prev) => Math.max(prev - 1, 1))
                    }
                    disabled={currentPage === 1}
                  >
                    &lt;
                  </button>
                  {[...Array(totalPages)].map((_, index) => (
                    <button
                      key={index}
                      className={`px-2 py-1 rounded cursor-pointer text-xs ${
                        currentPage === index + 1
                          ? "bg-blue-500 text-white"
                          : "text-gray-600 hover:bg-gray-200"
                      }`}
                      onClick={() => setCurrentPage(index + 1)}
                    >
                      {index + 1}
                    </button>
                  ))}
                  <button
                    className="px-2 py-1 text-xs text-gray-600 rounded hover:bg-gray-200 cursor-pointer"
                    onClick={() =>
                      setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                    }
                    disabled={currentPage === totalPages}
                  >
                    &gt;
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

export default Jobs;