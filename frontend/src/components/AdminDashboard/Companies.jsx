import React from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { useState, useEffect } from "react";
import {
  Search,
  MapPin,
  ChevronDown,
  ChevronUp,
  List,
  Grid,
} from "lucide-react";
import { Link } from "react-router-dom";

// Expanded sample data for better filtering demonstration
const allJobs = [
  {
    id: 1,
    company: "Stripe",
    description:
      "Stripe is a software platform for starting and running internet businesses. Millions of businesses rely on Stripe's software tools...",
    tags: ["Business", "Payment gateway"],
    logo: "https://upload.wikimedia.org/wikipedia/commons/6/6f/Stripe_Logo%2C_revised_2016.svg",
    jobCount: "7",
    industry: "Fintech",
    companySize: "501-1000",
  },
  {
    id: 2,
    company: "Square",
    description:
      "Square builds common business tools in unconventional ways so more people can start, run, and grow their businesses...",
    tags: ["Business", "Blockchain"],
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Square%2C_Inc._logo.svg/512px-Square%2C_Inc._logo.svg.png",
    jobCount: "5",
    industry: "Fintech",
    companySize: "251-500",
  },
  {
    id: 3,
    company: "Coinbase",
    description:
      "Coinbase is a digital currency wallet and platform where merchants and consumers can transact with new digital currencies...",
    tags: ["Business", "Blockchain"],
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/50/Coinbase.svg/512px-Coinbase.svg.png",
    jobCount: "9",
    industry: "Blockchain",
    companySize: "501-1000",
  },
  {
    id: 4,
    company: "Shopify",
    description:
      "Shopify is a commerce platform that allows anyone to set up an online store and sell their products...",
    tags: ["E-commerce", "Business"],
    logo: "",
    jobCount: "12",
    industry: "E-commerce",
    companySize: "1000 - above",
  },
  {
    id: 5,
    company: "Udemy",
    description:
      "Udemy is an online learning platform aimed at professional adults and students...",
    tags: ["Education", "E-Learning"],
    logo: "",
    jobCount: "8",
    industry: "Education",
    companySize: "501-1000",
  },
  {
    id: 6,
    company: "Twitch",
    description:
      "Twitch is an interactive livestreaming service for content spanning gaming, entertainment, sports, music, and more...",
    tags: ["Media", "Entertainment"],
    logo: "",
    jobCount: "15",
    industry: "Media",
    companySize: "1000 - above",
  },
  {
    id: 7,
    company: "Unity",
    description:
      "Unity is a cross-platform game engine developed by Unity Technologies, first announced and released in June 2005...",
    tags: ["Gaming", "Software"],
    logo: "",
    jobCount: "11",
    industry: "Gaming",
    companySize: "1000 - above",
  },
  {
    id: 8,
    company: "Zoom",
    description:
      "Zoom is a communications technology company that provides videotelephony and online chat services...",
    tags: ["Software", "Communication"],
    logo: "",
    jobCount: "6",
    industry: "Cloud",
    companySize: "1000 - above",
  },
  {
    id: 9,
    company: "Coursera",
    description:
      "Coursera is an online learning platform that offers courses, specializations, and degrees...",
    tags: ["Education", "E-Learning"],
    logo: "",
    jobCount: "4",
    industry: "Education",
    companySize: "501-1000",
  },
  {
    id: 10,
    company: "MasterCard",
    description:
      "Mastercard Incorporated is an American multinational financial services corporation...",
    tags: ["Finance", "Payment gateway"],
    logo: "",
    jobCount: "14",
    industry: "Fintech",
    companySize: "1000 - above",
  },
  {
    id: 11,
    company: "Adobe",
    description:
      "Adobe Inc. is an American multinational computer software company focusing on creative software products for content creation and publishing...",
    tags: ["Software", "Design"],
    logo: "",
    jobCount: "23",
    industry: "Consumer Tech",
    companySize: "1000 - above",
  },
  {
    id: 12,
    company: "Figma",
    description:
      "Figma is a cloud-based design tool that is similar to Sketch in functionality and features, but with big differences that make Figma better for team collaboration...",
    tags: ["Design", "Software"],
    logo: "",
    jobCount: "8",
    industry: "Consumer Tech",
    companySize: "251-500",
  },
  {
    id: 13,
    company: "Notion",
    description:
      "Notion is an all-in-one workspace for your notes, tasks, wikis, and databases. It's a new tool that blends your everyday work apps into one...",
    tags: ["Productivity", "Software"],
    logo: "",
    jobCount: "6",
    industry: "Consumer Tech",
    companySize: "151-250",
  },
  {
    id: 14,
    company: "Zendesk",
    description:
      "Zendesk is a service-first CRM company that builds software designed to improve customer relationships...",
    tags: ["CRM", "Support"],
    logo: "",
    jobCount: "17",
    industry: "Business Service",
    companySize: "1000 - above",
  },
  {
    id: 15,
    company: "Slack",
    description:
      "Slack is a messaging app for business that connects people to the information they need. By bringing people together to work as one unified team...",
    tags: ["Communication", "Software"],
    logo: "",
    jobCount: "12",
    industry: "Business Service",
    companySize: "1000 - above",
  },
  {
    id: 16,
    company: "Hubspot",
    description:
      "HubSpot is a developer and marketer of software products for inbound marketing, sales, and customer service...",
    tags: ["Marketing", "CRM"],
    logo: "",
    jobCount: "19",
    industry: "Business Service",
    companySize: "1000 - above",
  },
  {
    id: 17,
    company: "Canva",
    description:
      "Canva is an online design and publishing tool with a mission to empower everyone in the world to design anything and publish anywhere...",
    tags: ["Design", "Software"],
    logo: "",
    jobCount: "10",
    industry: "Consumer Tech",
    companySize: "501-1000",
  },
  {
    id: 18,
    company: "Spotify",
    description:
      "Spotify is a digital music, podcast, and video service that gives you access to millions of songs and other content from creators all over the world...",
    tags: ["Media", "Entertainment"],
    logo: "",
    jobCount: "21",
    industry: "Media",
    companySize: "1000 - above",
  },
  {
    id: 19,
    company: "Netflix",
    description:
      "Netflix is an American content platform and production company that offers a library of films and television series through distribution deals as well as its own productions...",
    tags: ["Media", "Entertainment"],
    logo: "",
    jobCount: "25",
    industry: "Media",
    companySize: "1000 - above",
  },
  {
    id: 20,
    company: "Khan Academy",
    description:
      "Khan Academy is an American non-profit educational organization that creates short lessons in the form of videos to help students learn various subjects...",
    tags: ["Education", "Non-profit"],
    logo: "",
    jobCount: "7",
    industry: "Education",
    companySize: "251-500",
  },
];

const JobCardGrid = ({ job }) => {
  return (
    <div className="border border-gray-400 shadow-md p-6 bg-white w-[400px] h-[260px] flex flex-col justify-between relative cursor-pointer hover:shadow-lg transition-shadow">
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

const JobCardList = ({ job }) => {
  return (
    <div className="border border-gray-400 shadow-md p-6 bg-white w-full flex items-start gap-6 relative cursor-pointer hover:shadow-lg transition-shadow">
      {/* Logo */}
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

      {/* Content */}
      <div className="flex-1">
        <div className="flex justify-between items-start">
          <h2 className="text-lg font-bold text-gray-900">{job.company}</h2>
          <div className="text-blue-500 text-sm font-medium bg-[#F8F8FD] px-2 py-1">
            {job.jobCount || "7"} Jobs
          </div>
        </div>

        <p className="text-gray-600 text-sm leading-relaxed mt-2 mb-3">
          {job.description ||
            "This is a software platform for starting and running internet businesses. Millions of businesses rely on this company's software tools."}
        </p>

        {/* Tags directly below description */}
        <div className="flex flex-wrap gap-2">
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
    </div>
  );
};

const Companies = () => {
  // State for search and filters
  const [searchTerm, setSearchTerm] = useState("");
  const [location, setLocation] = useState("Delhi, India");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedIndustries, setSelectedIndustries] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState(allJobs);

  // UI state
  const [isIndustryOpen, setIsIndustryOpen] = useState(true);
  const [isCompanySizeOpen, setIsCompanySizeOpen] = useState(true);
  const [view, setView] = useState("list");
  const [sortBy, setSortBy] = useState("Relevance");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  // Changed from 4 to 15 as requested
  const jobsPerPage = 15;
  const sortOptions = ["Relevance", "Newest", "Most Applied"];

  const locations = [
    "Delhi, India",
    "Mumbai, India",
    "Bangalore, India",
    "Chennai, India",
  ];

  const popularJobs = ["UI Designer", "UX Researcher", "Android", "Admin"];

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
    { name: "E-commerce", count: 20 },
  ];

  const companySizes = [
    { size: "1-50", count: 25 },
    { size: "51-150", count: 57 },
    { size: "151-250", count: 45 },
    { size: "251-500", count: 4 },
    { size: "501-1000", count: 43 },
    { size: "1000 - above", count: 23 },
  ];

  // Apply filters whenever search term, selected industries, or sizes change
  useEffect(() => {
    applyFilters();
    setCurrentPage(1); // Reset to first page whenever filters change
  }, [searchTerm, selectedIndustries, selectedSizes, sortBy]);

  // Filter and sort jobs
  const applyFilters = () => {
    let results = [...allJobs];

    // Apply search term filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      results = results.filter(
        (job) =>
          job.company.toLowerCase().includes(term) ||
          job.description.toLowerCase().includes(term) ||
          job.tags.some((tag) => tag.toLowerCase().includes(term))
      );
    }

    // Apply industry filters
    if (selectedIndustries.length > 0) {
      results = results.filter((job) =>
        selectedIndustries.includes(job.industry)
      );
    }

    // Apply company size filters
    if (selectedSizes.length > 0) {
      results = results.filter((job) =>
        selectedSizes.includes(job.companySize)
      );
    }

    // Apply sorting
    if (sortBy === "Newest") {
      // Sort by ID in descending order (assuming newer jobs have higher IDs)
      results.sort((a, b) => b.id - a.id);
    } else if (sortBy === "Most Applied") {
      // Sort by job count in descending order
      results.sort((a, b) => parseInt(b.jobCount) - parseInt(a.jobCount));
    }

    setFilteredJobs(results);
  };

  // Handle industry checkbox changes
  const handleIndustryChange = (industryName) => {
    setSelectedIndustries((prev) => {
      if (prev.includes(industryName)) {
        return prev.filter((i) => i !== industryName);
      } else {
        return [...prev, industryName];
      }
    });
  };

  // Handle company size checkbox changes
  const handleSizeChange = (size) => {
    setSelectedSizes((prev) => {
      if (prev.includes(size)) {
        return prev.filter((s) => s !== size);
      } else {
        return [...prev, size];
      }
    });
  };

  // Handle search button click
  const handleSearch = () => {
    applyFilters();
  };

  // Get current page of jobs
  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = filteredJobs.slice(indexOfFirstJob, indexOfLastJob);
  const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);

  // Calculate displayed jobs range for showing X-Y of Z results
  const startRange = filteredJobs.length === 0 ? 0 : indexOfFirstJob + 1;
  const endRange = Math.min(indexOfLastJob, filteredJobs.length);

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
              <div className="bg-white shadow-sm p-6 border border-gray-200 flex items-center space-x-4">
                <Search className="text-black w-10 h-10 pr-2" />
                <div className="flex-1 flex items-center border-b border-gray-300 pb-3 w-1/2">
                  <input
                    type="text"
                    placeholder="Job title or keyword"
                    className="w-full outline-none text-lg text-gray-700 py-3"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>

                <div className="border-l border-gray-400 text-transparent">
                  .
                </div>

                <MapPin className="text-black w-10 h-10 pr-2" />
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

                <button
                  className="bg-blue-600 text-white px-10 py-4 font-medium text-lg cursor-pointer hover:bg-blue-700"
                  onClick={handleSearch}
                >
                  Search
                </button>
              </div>

              <p className="text-gray-500 mt-3 text-lg">
                Popular:{" "}
                <span className="text-gray-500 text-lg">
                  {popularJobs.map((job, index) => (
                    <span
                      key={index}
                      className="cursor-pointer hover:text-blue-500"
                      onClick={() => setSearchTerm(job)}
                    >
                      {job}
                      {index < popularJobs.length - 1 ? ", " : ""}
                    </span>
                  ))}
                </span>
              </p>
            </div>
            {/*Part 2*/}
            <div className="flex p-6">
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
                          className="flex items-center space-x-4 text-gray-800 text-lg cursor-pointer"
                        >
                          <input
                            type="checkbox"
                            className="w-6 h-6 text-blue-600 border-gray-500 rounded focus:ring-0 cursor-pointer"
                            checked={selectedIndustries.includes(industry.name)}
                            onChange={() => handleIndustryChange(industry.name)}
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
                          className="flex items-center space-x-4 text-gray-800 text-lg cursor-pointer"
                        >
                          <input
                            type="checkbox"
                            className="w-6 h-6 text-blue-600 border-gray-500 rounded focus:ring-0 cursor-pointer"
                            checked={selectedSizes.includes(size.size)}
                            onChange={() => handleSizeChange(size.size)}
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
                    {/* Dynamic display of results showing start-end of total */}
                    <p className="text-gray-500">
                      {filteredJobs.length > 0
                        ? `Showing ${startRange}-${endRange} of ${filteredJobs.length} results`
                        : "No results found"}
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <button
                        className="text-gray-600 font-semibold flex items-center cursor-pointer"
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                      >
                        Sort by: {sortBy}{" "}
                        <ChevronDown className="ml-1 w-4 h-4" />
                      </button>
                      {isDropdownOpen && (
                        <div className="absolute top-full mt-1 bg-white shadow-md rounded border border-gray-200 w-40 z-10">
                          {sortOptions.map((option, index) => (
                            <button
                              key={index}
                              className="block w-full text-left px-4 py-2 hover:bg-gray-100 cursor-pointer"
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
                        className={`p-2 rounded cursor-pointer ${
                          view === "grid"
                            ? "bg-blue-500 text-white"
                            : "text-gray-600 hover:bg-gray-200"
                        }`}
                        onClick={() => setView("grid")}
                      >
                        <Grid className="w-5 h-5" />
                      </button>
                      <button
                        className={`p-2 rounded cursor-pointer ${
                          view === "list"
                            ? "bg-blue-500 text-white"
                            : "text-gray-600 hover:bg-gray-200"
                        }`}
                        onClick={() => setView("list")}
                      >
                        <List className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>

                {filteredJobs.length === 0 ? (
                  <div className="mt-6 text-center p-10 bg-gray-100 rounded">
                    <p className="text-xl text-gray-600">
                      No companies match your search criteria.
                    </p>
                    <p className="text-gray-500 mt-2">
                      Try adjusting your filters or search terms.
                    </p>
                  </div>
                ) : (
                  <>
                    {/* Grid View */}
                    {view === "grid" && (
                      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6 justify-center">
                        {currentJobs.map((job) => (
                          <JobCardGrid key={job.id} job={job} />
                        ))}
                      </div>
                    )}

                    {/* List View */}
                    {view === "list" && (
                      <div className="mt-6 flex flex-col gap-4">
                        {currentJobs.map((job) => (
                          <JobCardList key={job.id} job={job} />
                        ))}
                      </div>
                    )}

                    {/* Pagination */}
                    {totalPages > 1 && (
                      <div className="flex justify-center items-center mt-8 gap-2">
                        <button
                          className="px-3 py-1 text-gray-600 rounded hover:bg-gray-200 cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
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
                            className={`px-3 py-1 rounded cursor-pointer ${
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
                          className="px-3 py-1 text-gray-600 rounded hover:bg-gray-200 cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
                          onClick={() =>
                            setCurrentPage((prev) =>
                              Math.min(prev + 1, totalPages)
                            )
                          }
                          disabled={currentPage === totalPages}
                        >
                          &gt;
                        </button>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Companies;
