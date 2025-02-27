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
    id: 1,
    company: "Stripe",
    description:
      "Stripe is a software platform for starting and running internet businesses. Millions of businesses rely on Stripe's software tools...",
    tags: ["Business", "Payment gateway"],
    logo: "https://upload.wikimedia.org/wikipedia/commons/6/6f/Stripe_Logo%2C_revised_2016.svg",
  },
  {
    id: 2,
    company: "Square",
    description:
      "Square builds common business tools in unconventional ways so more people can start, run, and grow their businesses...",
    tags: ["Business", "Blockchain"],
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Square%2C_Inc._logo.svg/512px-Square%2C_Inc._logo.svg.png",
  },
  {
    id: 3,
    company: "Coinbase",
    description:
      "Coinbase is a digital currency wallet and platform where merchants and consumers can transact with new digital currencies...",
    tags: ["Business", "Blockchain"],
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/50/Coinbase.svg/512px-Coinbase.svg.png",
  },
];

const JobCard = ({ job }) => {
  return (
    <div className="border border-gray-400 shadow-md p-6 bg-white w-[400px] h-[260px] flex flex-col justify-between relative">
      <div className="absolute top-4 right-4 text-blue-500 text-sm font-medium bg-[#F8F8FD]">
        {job.jobCount || "7"} Jobs
      </div>

      <div className="flex flex-col space-y-2">
        {/* Logo and company name */}
        <div className="flex flex-col space-y-3">
          <div className="bg-gradient-to-r from-purple-500 to-blue-500 w-12 h-12 rounded-lg flex items-center justify-center text-white text-xl font-bold">
            {job.logo ? (
              <img
                src={job.logo}
                alt={job.company}
                className="w-full h-full rounded-lg object-cover"
              />
            ) : (
              job.company.charAt(0)
            )}
          </div>
          <h2 className="text-lg font-bold text-gray-900">{job.company}</h2>
        </div>

        {/* Description text */}
        <p className="mt-2 text-gray-600 text-sm leading-relaxed">
          {job.description ||
            "This is a software platform for starting and running internet businesses. Millions of businesses rely on this company's software tools."}
        </p>
      </div>

      {/* Tags at the bottom */}
      <div className="mt-4 flex flex-wrap gap-2">
        {(job.tags || ["Business", "Payment gateway"]).map((tag, index) => (
          <span
            key={index}
            className={`text-xs px-4 py-1.5 rounded-full ${
              index === 0
                ? " text-teal-700 border border-teal-300"
                : " text-blue-500 border border-blue-500"
            }`}
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
};

const Companies = () => {
  const [location, setLocation] = useState("Delhi, India");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const locations = [
    "Delhi, India",
    "Mumbai, India",
    "Bangalore, India",
    "Chennai, India",
  ];
  const popularJobs = ["UI Designer", "UX Researcher", "Android", "Admin"];

  const [isIndustryOpen, setIsIndustryOpen] = useState(true);
  const [isCompanySizeOpen, setIsCompanySizeOpen] = useState(true);

  const industries = [
    { name: "Advertising", count: 43 },
    { name: "Business Service", count: 4 },
    { name: "Blockchain", count: 5 },
    { name: "Cloud", count: 15 },
    { name: "Consumer Tech", count: 5 },
    { name: "Education", count: 34 },
    { name: "Fintech", count: 45 },
    { name: "Gaming", count: 33 },
    { name: "Food & Beverage", count: 5 },
    { name: "Healthcare", count: 3 },
    { name: "Hosting", count: 5 },
    { name: "Media", count: 4 },
  ];

  const companySizes = [
    { size: "1-50", count: 25 },
    { size: "51-150", count: 57 },
    { size: "151-250", count: 45 },
    { size: "251-500", count: 4 },
    { size: "501-1000", count: 43 },
    { size: "1000 - above", count: 23 },
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
              <div className="w-1/3 p-4 bg-white">
                {/* Industry Filter */}
                <div>
                  <div
                    className="flex justify-between items-center cursor-pointer"
                    onClick={() => setIsIndustryOpen(!isIndustryOpen)}
                  >
                    <h2 className="text-xl font-semibold text-gray-900">
                      Industry
                    </h2>
                    {isIndustryOpen ? (
                      <ChevronUp className="text-gray-500 w-6 h-6" />
                    ) : (
                      <ChevronDown className="text-gray-500 w-6 h-6" />
                    )}
                  </div>

                  {isIndustryOpen && (
                    <div className="mt-4 space-y-4">
                      {industries.map((industry, index) => (
                        <label
                          key={index}
                          className="flex items-center space-x-4 text-gray-800 text-lg"
                        >
                          <input
                            type="checkbox"
                            className="w-6 h-6 text-blue-600 border-gray-500 rounded focus:ring-0"
                          />
                          <span>
                            {industry.name}{" "}
                            <span className="text-gray-500 text-base">
                              ({industry.count})
                            </span>
                          </span>
                        </label>
                      ))}
                    </div>
                  )}
                </div>

                {/* Company Size Filter */}
                <div>
                  <div
                    className="flex justify-between items-center cursor-pointer mt-8"
                    onClick={() => setIsCompanySizeOpen(!isCompanySizeOpen)}
                  >
                    <h2 className="text-xl font-semibold text-gray-900">
                      Company Size
                    </h2>
                    {isCompanySizeOpen ? (
                      <ChevronUp className="text-gray-500 w-6 h-6" />
                    ) : (
                      <ChevronDown className="text-gray-500 w-6 h-6" />
                    )}
                  </div>

                  {isCompanySizeOpen && (
                    <div className="mt-4 space-y-4">
                      {companySizes.map((size, index) => (
                        <label
                          key={index}
                          className="flex items-center space-x-4 text-gray-800 text-lg"
                        >
                          <input
                            type="checkbox"
                            className="w-6 h-6 text-blue-600 border-gray-500 rounded focus:ring-0"
                          />
                          <span>
                            {size.size}{" "}
                            <span className="text-gray-500 text-base">
                              ({size.count})
                            </span>
                          </span>
                        </label>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              <div className="w-3/4 p-4">
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="text-xl font-bold">All Companies</h2>
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

                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6 justify-center">
                  {jobs.map((job) => (
                    <JobCard key={job.id} job={job} />
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

export default Companies;
