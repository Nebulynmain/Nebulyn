import React from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { useState } from "react";
import {
  Search,
  MapPin,
  ChevronDown,
  ChevronUp,
  List,
  Grid,
} from "lucide-react";
import { Link } from "react-router-dom";

const jobs = [
  {
    title: "Social Media Assistant",
    company: "Nomad",
    location: "Paris, France",
    jobType: "Full-Time",
    categories: ["Marketing", "Design"],
    applied: 5,
    capacity: 10,
    logo: "https://via.placeholder.com/40",
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
  },
];

const Jobs = () => {
  const [location, setLocation] = useState("Delhi, India");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const locations = [
    "Delhi, India",
    "Mumbai, India",
    "Bangalore, India",
    "Chennai, India",
  ];
  const popularJobs = ["UI Designer", "UX Researcher", "Android", "Admin"];
  const [isOpen, setIsOpen] = useState(true);
  const jobTypes = [
    { type: "Full-time", count: 3 },
    { type: "Part-Time", count: 5 },
    { type: "Remote", count: 2 },
    { type: "Internship", count: 24 },
    { type: "Contract", count: 3 },
  ];
  const [categoriesOpen, setCategoriesOpen] = useState(true);
  const [jobLevelOpen, setJobLevelOpen] = useState(true);
  const [salaryOpen, setSalaryOpen] = useState(true);

  const categories = [
    { name: "Design", count: 24 },
    { name: "Sales", count: 3 },
    { name: "Marketing", count: 3 },
    { name: "Business", count: 3 },
    { name: "Human Resource", count: 6 },
    { name: "Finance", count: 4 },
    { name: "Engineering", count: 4 },
    { name: "Technology", count: 5 },
  ];

  const jobLevels = [
    { name: "Entry Level", count: 57 },
    { name: "Mid Level", count: 3 },
    { name: "Senior Level", count: 5 },
    { name: "Director", count: 12 },
    { name: "VP or Above", count: 8 },
  ];

  const salaryRanges = [
    { label: "$700 - $1000", count: 4 },
    { label: "$100 - $1500", count: 6 },
    { label: "$1500 - $2000", count: 10 },
    { label: "$3000 or above", count: 4 },
  ];

  const [view, setView] = useState("list");
  const [sortBy, setSortBy] = useState("Relevance");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 10;
  const sortOptions = ["Relevance", "Newest", "Most Applied"];

  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = jobs.slice(indexOfFirstJob, indexOfLastJob);
  const totalPages = Math.ceil(jobs.length / jobsPerPage);

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex flex-row flex-grow">
        <div className="h-screen sticky top-0 ">
          <Sidebar />
        </div>
        <div className="flex-grow transition-all">
          <Header />
          <div className="">
            {/*Part 1*/}
            <div className="p-6 relative border-b border-gray-300">
              <div className="bg-white shadow-sm p-6  border border-gray-200 flex items-center space-x-4">
                <Search className="text-black w-10 h-10 pr-2" />
                <div className="flex-1 flex items-center border-b border-gray-300 pb-3 w-1/2">
                  <input
                    type="text"
                    placeholder="Job title or keyword"
                    className="w-full outline-none text-lg text-gray-700 py-3"
                  />
                </div>

                <div className="border-l border-gray-400 text-transparent">
                  .
                </div>

                <MapPin className=" text-black w-10 h-10 pr-2" />
                <div className="flex-1 flex items-center border-b border-gray-300 pb-3 w-1/2 relative">
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="w-full outline-none text-gray-700 cursor-pointer py-3"
                  />
                  <ChevronDown
                    className="text-gray-400 text-lg absolute right-2 cursor-pointer"
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                  />
                  {dropdownOpen && (
                    <ul className="absolute top-full left-0 w-full bg-white border border-gray-200 shadow-md mt-2 rounded-md overflow-hidden z-20">
                      {locations.map((loc, index) => (
                        <li
                          key={index}
                          className="p-3 hover:bg-gray-100 cursor-pointer"
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

                <button className="bg-blue-600 text-white px-10 py-4  font-medium text-lg">
                  Search
                </button>
              </div>

              <p className="text-gray-500 mt-3 text-lg">
                Popular:{" "}
                <span className="text-gray-500 text-lg">
                  {popularJobs.join(", ")}
                </span>
              </p>
            </div>
            {/*Part 2*/}
            <div class="flex p-6">
              <div className="w-1/4 p-4 bg-white">
                {/* Type of Employment */}
                <div
                  className="flex justify-between items-center cursor-pointer "
                  onClick={() => setIsOpen(!isOpen)}
                >
                  <h2 className="text-xl font-semibold text-gray-900">
                    Type of Employment
                  </h2>
                  {isOpen ? (
                    <ChevronUp className="text-gray-500 w-6 h-6" />
                  ) : (
                    <ChevronDown className="text-gray-500 w-6 h-6" />
                  )}
                </div>
                {isOpen && (
                  <div className="mt-4 space-y-4">
                    {jobTypes.map((job, index) => (
                      <label
                        key={index}
                        className="flex items-center space-x-4 text-gray-800 text-lg"
                      >
                        {" "}
                        {/* Bigger text */}
                        <input
                          type="checkbox"
                          className="w-6 h-6 text-blue-600 border-gray-500 rounded focus:ring-0"
                        />{" "}
                        {/* Bigger checkboxes */}
                        <span>
                          {job.type}{" "}
                          <span className="text-gray-500 text-base">
                            ({job.count})
                          </span>{" "}
                          {/* Larger count text */}
                        </span>
                      </label>
                    ))}
                  </div>
                )}
                {/* Categories */}
                <div
                  className="flex justify-between items-center cursor-pointer mt-8 "
                  onClick={() => setCategoriesOpen(!categoriesOpen)}
                >
                  <h2 className="text-xl font-semibold text-gray-900">
                    Categories
                  </h2>
                  {categoriesOpen ? (
                    <ChevronUp className="text-gray-500 w-6 h-6" />
                  ) : (
                    <ChevronDown className="text-gray-500 w-6 h-6" />
                  )}
                </div>
                {categoriesOpen && (
                  <div className="mt-4 space-y-4">
                    {categories.map((category, index) => (
                      <label
                        key={index}
                        className="flex items-center space-x-4 text-gray-800 text-lg"
                      >
                        <input
                          type="checkbox"
                          className="w-6 h-6 text-blue-600 border-gray-500 rounded focus:ring-0"
                        />
                        <span>
                          {category.name}{" "}
                          <span className="text-gray-500 text-base">
                            ({category.count})
                          </span>
                        </span>
                      </label>
                    ))}
                  </div>
                )}
                {/* Job Level */}
                <div
                  className="flex justify-between items-center cursor-pointer mt-8 "
                  onClick={() => setJobLevelOpen(!jobLevelOpen)}
                >
                  <h2 className="text-xl font-semibold text-gray-900">
                    Job Level
                  </h2>
                  {jobLevelOpen ? (
                    <ChevronUp className="text-gray-500 w-6 h-6" />
                  ) : (
                    <ChevronDown className="text-gray-500 w-6 h-6" />
                  )}
                </div>
                {jobLevelOpen && (
                  <div className="mt-4 space-y-4">
                    {jobLevels.map((level, index) => (
                      <label
                        key={index}
                        className="flex items-center space-x-4 text-gray-800 text-lg"
                      >
                        <input
                          type="checkbox"
                          className="w-6 h-6 text-blue-600 border-gray-500 rounded focus:ring-0"
                        />
                        <span>
                          {level.name}{" "}
                          <span className="text-gray-500 text-base">
                            ({level.count})
                          </span>
                        </span>
                      </label>
                    ))}
                  </div>
                )}
                {/* Salary Range */}
                <div
                  className="flex justify-between items-center cursor-pointer mt-8 "
                  onClick={() => setSalaryOpen(!salaryOpen)}
                >
                  <h2 className="text-xl font-semibold text-gray-900">
                    Salary Range
                  </h2>
                  {salaryOpen ? (
                    <ChevronUp className="text-gray-500 w-6 h-6" />
                  ) : (
                    <ChevronDown className="text-gray-500 w-6 h-6" />
                  )}
                </div>
                {salaryOpen && (
                  <div className="mt-4 space-y-4">
                    {salaryRanges.map((range, index) => (
                      <label
                        key={index}
                        className="flex items-center space-x-4 text-gray-800 text-lg"
                      >
                        <input
                          type="checkbox"
                          className="w-6 h-6 text-blue-600 border-gray-500 rounded focus:ring-0"
                        />
                        <span>
                          {range.label}{" "}
                          <span className="text-gray-500 text-base">
                            ({range.count})
                          </span>
                        </span>
                      </label>
                    ))}
                  </div>
                )}
              </div>
              <div className="w-3/4 p-4">
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="text-xl font-bold">All Jobs</h2>
                    <p className="text-gray-500">
                      Showing {jobs.length} results
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <button
                        className="text-gray-600 font-semibold flex items-center"
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                      >
                        Sort by: {sortBy}{" "}
                        <ChevronDown className="ml-1 w-4 h-4" />
                      </button>
                      {isDropdownOpen && (
                        <div className="absolute top-full mt-1 bg-white shadow-md rounded border border-gray-200 w-40">
                          {sortOptions.map((option, index) => (
                            <button
                              key={index}
                              className="block w-full text-left px-4 py-2 hover:bg-gray-100"
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
                    <div className="flex gap-2">
                      <button
                        className={`p-2 rounded ${
                          view === "grid" ? "bg-gray-200" : "text-gray-600"
                        }`}
                        onClick={() => setView("grid")}
                      >
                        <Grid className="w-5 h-5" />
                      </button>
                      <button
                        className={`p-2 rounded ${
                          view === "list"
                            ? "bg-blue-500 text-white"
                            : "text-gray-600"
                        }`}
                        onClick={() => setView("list")}
                      >
                        <List className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>

                <div className="mt-6 space-y-4">
                  {currentJobs.map((job, index) => (
                    <div
                      key={index}
                      className="bg-white p-4 shadow-md border rounded-sm flex justify-between items-center border border-gray-200 "
                    >
                      <div className="flex items-center gap-4">
                        <img
                          src={job.logo}
                          alt={job.company}
                          className="w-10 h-10 rounded-full"
                        />
                        <div>
                          <h3 className="text-lg font-bold">{job.title}</h3>
                          <p className="text-gray-500">
                            {job.company} • {job.location}
                          </p>
                          <div className="flex gap-2 mt-2">
                            <span
                              className={`text-xs px-3 py-1 rounded-full font-semibold border ${
                                job.jobType === "Full-Time"
                                  ? "bg-green-100 text-green-600 border-green-300"
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
                                className={`text-xs px-3 py-1 rounded-full font-semibold border ${
                                  cat === "Marketing"
                                    ? "bg-yellow-100 text-yellow-600 border-yellow-300"
                                    : "bg-blue-100 text-blue-600 border-blue-300"
                                }`}
                              >
                                {cat}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="text-center">
                        <Link to="/description">
                          <button className="bg-blue-500 text-white px-4 py-2 rounded-sm w-full cursor-pointer">
                            Apply
                          </button>
                        </Link>
                        <p className="text-xs text-gray-500 mt-2 font-medium">
                          <span className="text-black font-bold">
                            {job.applied}
                          </span>{" "}
                          applied of {job.capacity} capacity
                        </p>
                        <div className="w-full bg-gray-200 h-2 mt-1 rounded-full relative">
                          <div
                            className="bg-blue-500 h-2 rounded-full"
                            style={{
                              width: `${(job.applied / job.capacity) * 100}%`,
                            }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Pagination */}
                <div className="flex justify-center items-center mt-6 gap-2">
                  <button
                    className="px-3 py-1 text-gray-600 rounded hover:bg-gray-200"
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
                      className={`px-3 py-1 rounded ${
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
                    className="px-3 py-1 text-gray-600 rounded hover:bg-gray-200"
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
