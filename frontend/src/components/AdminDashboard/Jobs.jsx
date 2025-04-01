import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import {
  Search,
  MapPin,
  ChevronDown,
  ChevronUp,
  List,
  Grid,
} from "lucide-react";
import { Link } from "react-router-dom";

// Expanded job data for better demonstration
const initialJobs = [
  {
    title: "Social Media Assistant",
    company: "Nomad",
    location: "Paris, France",
    jobType: "Full-Time",
    categories: ["Marketing", "Design"],
    applied: 5,
    capacity: 10,
    logo: "https://via.placeholder.com/40",
    salary: "$1200 - $1500",
    level: "Entry Level",
  },
  {
    title: "Brand Designer",
    company: "Dropbox",
    location: "San Francisco, USA",
    jobType: "Part-Time",
    categories: ["Design"],
    applied: 2,
    capacity: 10,
    logo: "https://via.placeholder.com/40",
    salary: "$2000 - $2500",
    level: "Mid Level",
  },
  {
    title: "UI Designer",
    company: "Google",
    location: "Delhi, India",
    jobType: "Remote",
    categories: ["Design", "Technology"],
    applied: 8,
    capacity: 15,
    logo: "https://via.placeholder.com/40",
    salary: "$1500 - $2000",
    level: "Mid Level",
  },
  {
    title: "Marketing Manager",
    company: "Amazon",
    location: "Mumbai, India",
    jobType: "Full-Time",
    categories: ["Marketing", "Business"],
    applied: 12,
    capacity: 20,
    logo: "https://via.placeholder.com/40",
    salary: "$3000 or above",
    level: "Senior Level",
  },
  {
    title: "UX Researcher",
    company: "Microsoft",
    location: "Bangalore, India",
    jobType: "Internship",
    categories: ["Design", "Technology"],
    applied: 3,
    capacity: 5,
    logo: "https://via.placeholder.com/40",
    salary: "$700 - $1000",
    level: "Entry Level",
  },
  {
    title: "Android Developer",
    company: "Netflix",
    location: "Chennai, India",
    jobType: "Contract",
    categories: ["Engineering", "Technology"],
    applied: 7,
    capacity: 10,
    logo: "https://via.placeholder.com/40",
    salary: "$1500 - $2000",
    level: "Mid Level",
  },
];

const Jobs = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [location, setLocation] = useState("Delhi, India");
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
  const jobTypes = [
    { type: "Full-Time", count: 2 },
    { type: "Part-Time", count: 1 },
    { type: "Remote", count: 1 },
    { type: "Internship", count: 1 },
    { type: "Contract", count: 1 },
  ];
  const [categoriesOpen, setCategoriesOpen] = useState(true);
  const [jobLevelOpen, setJobLevelOpen] = useState(true);
  const [salaryOpen, setSalaryOpen] = useState(true);

  const categories = [
    { name: "Design", count: 4 },
    { name: "Sales", count: 0 },
    { name: "Marketing", count: 2 },
    { name: "Business", count: 1 },
    { name: "Human Resource", count: 0 },
    { name: "Finance", count: 0 },
    { name: "Engineering", count: 1 },
    { name: "Technology", count: 3 },
  ];

  const jobLevels = [
    { name: "Entry Level", count: 2 },
    { name: "Mid Level", count: 3 },
    { name: "Senior Level", count: 1 },
    { name: "Director", count: 0 },
    { name: "VP or Above", count: 0 },
  ];

  const salaryRanges = [
    { label: "$700 - $1000", count: 1 },
    { label: "$1200 - $1500", count: 1 },
    { label: "$1500 - $2000", count: 2 },
    { label: "$2000 - $2500", count: 1 },
    { label: "$3000 or above", count: 1 },
  ];

  const [view, setView] = useState("list");
  const [sortBy, setSortBy] = useState("Relevance");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 5;
  const sortOptions = ["Relevance", "Newest", "Most Applied"];

  // Filter states
  const [selectedJobTypes, setSelectedJobTypes] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedJobLevels, setSelectedJobLevels] = useState([]);
  const [selectedSalaryRanges, setSelectedSalaryRanges] = useState([]);

  // Filtered jobs state
  const [filteredJobs, setFilteredJobs] = useState(initialJobs);

  // Apply all filters
  useEffect(() => {
    let result = initialJobs;

    // Apply search term filter
    if (searchTerm) {
      result = result.filter(
        (job) =>
          job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
          job.categories.some((cat) =>
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
      result = result.filter((job) => selectedJobTypes.includes(job.jobType));
    }

    // Apply categories filter
    if (selectedCategories.length > 0) {
      result = result.filter((job) =>
        job.categories.some((category) => selectedCategories.includes(category))
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
      // For demo purposes, we'll just reverse the order
      result = [...result].reverse();
    } else if (sortBy === "Most Applied") {
      result = [...result].sort((a, b) => b.applied - a.applied);
    }

    setFilteredJobs(result);
    setCurrentPage(1); // Reset to first page when filters change
  }, [
    searchTerm,
    location,
    selectedJobTypes,
    selectedCategories,
    selectedJobLevels,
    selectedSalaryRanges,
    sortBy,
  ]);

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

  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = filteredJobs.slice(indexOfFirstJob, indexOfLastJob);
  const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);

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
                    className="w-full outline-none text-gray-700 cursor-pointer py-2 text-base"
                  />
                  <ChevronDown
                    className="text-gray-400 w-4 h-4 absolute right-2 cursor-pointer"
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                  />
                  {dropdownOpen && (
                    <ul className="absolute top-full left-0 w-full bg-white border border-gray-200 shadow-md mt-1 rounded-md overflow-hidden z-20">
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
                    {currentJobs.length > 0 ? (
                      currentJobs.map((job, index) => (
                        <div
                          key={index}
                          className="bg-white p-3 shadow-md rounded-sm flex justify-between items-center border border-gray-200"
                        >
                          <div className="flex items-center gap-3">
                            <img
                              src={job.logo}
                              alt={job.company}
                              className="w-8 h-8 rounded-full"
                            />
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
                                    job.jobType === "Full-Time"
                                      ? "bg-green-100 text-green-600 border-green-300"
                                      : job.jobType === "Remote"
                                      ? "bg-indigo-100 text-indigo-600 border-indigo-300"
                                      : job.jobType === "Part-Time"
                                      ? "bg-orange-100 text-orange-600 border-orange-300"
                                      : "bg-gray-200 text-gray-600 border-gray-400"
                                  }`}
                                >
                                  {job.jobType}
                                </span>
                                <div className="border-r border-gray-300 text-transparent">
                                  .
                                </div>
                                {job.categories.map((cat, i) => (
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
                            <Link to="/description">
                              <button className="bg-blue-500 text-white px-3 py-1 rounded-sm w-full cursor-pointer text-sm">
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
                      </div>
                    )}
                  </div>
                )}

                {/* Grid View */}
                {view === "grid" && (
                  <div className="mt-3 grid grid-cols-2 gap-3">
                    {currentJobs.length > 0 ? (
                      currentJobs.map((job, index) => (
                        <div
                          key={index}
                          className="bg-white p-3 shadow-md rounded-sm border border-gray-200 flex flex-col"
                        >
                          <div className="flex items-center gap-2 mb-2">
                            <img
                              src={job.logo}
                              alt={job.company}
                              className="w-7 h-7 rounded-full"
                            />
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
                                job.jobType === "Full-Time"
                                  ? "bg-green-100 text-green-600 border-green-300"
                                  : job.jobType === "Remote"
                                  ? "bg-indigo-100 text-indigo-600 border-indigo-300"
                                  : job.jobType === "Part-Time"
                                  ? "bg-orange-100 text-orange-600 border-orange-300"
                                  : "bg-gray-200 text-gray-600 border-gray-400"
                              }`}
                            >
                              {job.jobType}
                            </span>
                            {job.categories.map((cat, i) => (
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
                              to="/description"
                              style={{
                                display: "block",
                                width: "100px",
                                margin: "0 auto",
                              }}
                            >
                              <button className="bg-blue-500 text-white px-3 py-1 rounded-sm w-full cursor-pointer mb-1 text-xs">
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
