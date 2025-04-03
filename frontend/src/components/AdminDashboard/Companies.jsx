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
  Loader,
} from "lucide-react";
import { Link } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../../App";

// Fallback company data for when API fails
const fallbackCompanies = [
  {
    _id: "fallback1",
    companyName: "Stripe",
    description:
      "Stripe is a software platform for starting and running internet businesses. Millions of businesses rely on Stripe's software tools...",
    techStack: ["Business", "Payment gateway"],
    companyLogo: "https://upload.wikimedia.org/wikipedia/commons/6/6f/Stripe_Logo%2C_revised_2016.svg",
    jobOpen: 7,
    industry: "Fintech",
    employees: 750,
  },
  {
    _id: "fallback2",
    companyName: "Square",
    description:
      "Square builds common business tools in unconventional ways so more people can start, run, and grow their businesses...",
    techStack: ["Business", "Blockchain"],
    companyLogo: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Square%2C_Inc._logo.svg/512px-Square%2C_Inc._logo.svg.png",
    jobOpen: 5,
    industry: "Fintech",
    employees: 400,
  },
  {
    _id: "fallback3",
    companyName: "Coinbase",
    description:
      "Coinbase is a digital currency wallet and platform where merchants and consumers can transact with new digital currencies...",
    techStack: ["Business", "Blockchain"],
    companyLogo: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/50/Coinbase.svg/512px-Coinbase.svg.png",
    jobOpen: 9,
    industry: "Blockchain",
    employees: 750,
  },
];

// Default industry options to show if API doesn't return enough data
const defaultIndustries = [
  { name: "Advertising", count: 2 },
  { name: "Business Service", count: 3 },
  { name: "Blockchain", count: 2 },
  { name: "Cloud", count: 2 },
  { name: "Consumer Tech", count: 3 },
  { name: "Education", count: 2 },
  { name: "Fintech", count: 3 },
  { name: "Gaming", count: 2 },
  { name: "Food & Beverage", count: 1 },
  { name: "Healthcare", count: 2 },
  { name: "Hosting", count: 1 },
  { name: "Media", count: 3 },
  { name: "E-commerce", count: 2 },
];

const JobCardGrid = ({ company }) => {
  return (
    <div className="border border-gray-200 shadow-sm p-4 bg-white w-[260px] h-[180px] flex flex-col justify-between relative cursor-pointer hover:shadow-md transition-shadow">
      <div className="absolute top-4 right-4 text-blue-500 text-xs font-medium bg-[#F8F8FD] px-1 py-0.5 rounded">
        {company.jobOpen || 0} Jobs
      </div>

      <div className="flex flex-col space-y-0.5">
        {/* Logo and company name */}
        <div className="flex flex-col space-y-1">
          <div className="bg-gradient-to-r from-purple-500 to-blue-500 w-6 h-6 rounded flex items-center justify-center text-white text-xs font-bold">
            {company.companyLogo ? (
              <img
                src={company.companyLogo}
                alt={company.companyName}
                className="w-full h-full rounded object-cover"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.style.display = 'none';
                }}
              />
            ) : (
              company.companyName.charAt(0)
            )}
          </div>
          <h2 className="text-xs font-semibold text-gray-900">{company.companyName}</h2>
        </div>

        {/* Description text */}
        <p className="text-gray-600 text-xs leading-tight line-clamp-2">
          {company.description || "A software platform for businesses worldwide."}
        </p>
      </div>

      {/* Tags at the bottom */}
      <div className="mt-1 flex flex-wrap gap-0.5">
        {(company.techStack || ["Business"]).map((tag, index) => (
          <span
            key={index}
            className={`text-[10px] px-1.5 py-0.5 rounded-full ${
              index === 0
                ? "text-teal-700 border border-teal-300"
                : "text-blue-500 border border-blue-500"
            }`}
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
};

const JobCardList = ({ company }) => {
  return (
    <div className="border border-gray-200 shadow-sm p-2 bg-white w-full flex items-start gap-2 relative cursor-pointer hover:shadow-md transition-shadow">
      {/* Logo */}
      <div className="bg-gradient-to-r from-purple-500 to-blue-500 w-8 h-8 rounded flex items-center justify-center text-white text-xs font-bold">
        {company.companyLogo ? (
          <img
            src={company.companyLogo}
            alt={company.companyName}
            className="w-full h-full rounded object-cover"
            onError={(e) => {
              e.target.onerror = null;
              e.target.style.display = 'none';
            }}
          />
        ) : (
          company.companyName.charAt(0)
        )}
      </div>

      {/* Content */}
      <div className="flex-1">
        <div className="flex justify-between items-center">
          <h2 className="text-xs font-semibold text-gray-900">{company.companyName}</h2>
          <div className="text-blue-500 text-xs font-medium bg-[#F8F8FD] px-1.5 py-0.5 rounded">
            {company.jobOpen || 0} Jobs
          </div>
        </div>

        <p className="text-gray-600 text-xs leading-tight mt-0.5 mb-1 line-clamp-2">
          {company.description ||
            "A software platform for starting and running businesses."}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-0.5">
          {(company.techStack || ["Business"]).map((tag, index) => (
            <span
              key={index}
              className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                index === 0
                  ? "text-teal-700 border border-teal-300"
                  : "text-blue-500 border border-blue-500"
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
  const [location, setLocation] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedIndustries, setSelectedIndustries] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState([]);
  
  // State for API data
  const [companies, setCompanies] = useState([]);
  const [filteredCompanies, setFilteredCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [industries, setIndustries] = useState([]);
  const [companySizes, setCompanySizes] = useState([]);

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

  // Helper function to count occurrences
  const countOccurrences = (array, key = null) => {
    const counts = {};
    array.forEach(item => {
      const value = key ? item[key] : item;
      if (value) { // Skip null or undefined values
        counts[value] = (counts[value] || 0) + 1;
      }
    });
    return counts;
  };

  // Fetch companies from backend
  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        setLoading(true);
        console.log("Fetching companies from:", `${API_URL}/company/get-company`);
        
        const response = await axios.get(`${API_URL}/company/get-company`, {
          withCredentials: true
        });
        
        console.log("API Response:", response.data);
        
        if (response.data.ok) {
          const companiesData = response.data.data || [];
          
          // Transform company data if needed
          const transformedCompanies = companiesData.map(company => {
            return {
              ...company,
              // Add any transformations if needed
            };
          });
          
          console.log("Transformed companies:", transformedCompanies);
          
          setCompanies(transformedCompanies);
          setFilteredCompanies(transformedCompanies);
          
          // Create industry categories from the data
          const industriesWithCount = countOccurrences(transformedCompanies, 'industry');
          const industriesFromData = Object.keys(industriesWithCount).map(name => ({
            name,
            count: industriesWithCount[name]
          }));
          
          // Merge with defaults to get better categories
          const mergedIndustries = [...industriesFromData];
          defaultIndustries.forEach(defaultIndustry => {
            if (!mergedIndustries.some(ind => ind.name === defaultIndustry.name)) {
              mergedIndustries.push(defaultIndustry);
            }
          });
          setIndustries(mergedIndustries);
          
          // Create company size categories
          const sizeRanges = {
            "1-50": { min: 1, max: 50 },
            "51-150": { min: 51, max: 150 },
            "151-250": { min: 151, max: 250 },
            "251-500": { min: 251, max: 500 },
            "501-1000": { min: 501, max: 1000 },
            "1000 - above": { min: 1001, max: Infinity }
          };
          
          // Count companies in each size range
          const sizeCounts = {};
          Object.keys(sizeRanges).forEach(range => {
            sizeCounts[range] = transformedCompanies.filter(
              company => 
                company.employees >= sizeRanges[range].min && 
                company.employees <= sizeRanges[range].max
            ).length;
          });
          
          setCompanySizes(Object.keys(sizeCounts).map(size => ({
            size,
            count: sizeCounts[size]
          })));
          
        } else {
          console.error("API returned error:", response.data);
          setError(`Failed to fetch companies: ${response.data.message || "Unknown error"}`);
          
          // Use fallback data
          setCompanies(fallbackCompanies);
          setFilteredCompanies(fallbackCompanies);
          createFilterCategories(fallbackCompanies);
        }
      } catch (err) {
        console.error("Error fetching companies:", err);
        setError(`Error fetching companies: ${err.message}`);
        
        // Use fallback data
        setCompanies(fallbackCompanies);
        setFilteredCompanies(fallbackCompanies);
        createFilterCategories(fallbackCompanies);
      } finally {
        setLoading(false);
      }
    };
    
    // Helper function to create filter categories from fallback data
    const createFilterCategories = (data) => {
      // Industries
      const industriesWithCount = countOccurrences(data, 'industry');
      const industriesFromData = Object.keys(industriesWithCount).map(name => ({
        name,
        count: industriesWithCount[name]
      }));
      
      // Merge with defaults to get better categories
      const mergedIndustries = [...industriesFromData];
      defaultIndustries.forEach(defaultIndustry => {
        if (!mergedIndustries.some(ind => ind.name === defaultIndustry.name)) {
          mergedIndustries.push(defaultIndustry);
        }
      });
      setIndustries(mergedIndustries);
      
      // Company sizes
      const sizeRanges = {
        "1-50": { min: 1, max: 50 },
        "51-150": { min: 51, max: 150 },
        "151-250": { min: 151, max: 250 },
        "251-500": { min: 251, max: 500 },
        "501-1000": { min: 501, max: 1000 },
        "1000 - above": { min: 1001, max: Infinity }
      };
      
      // Count companies in each size range
      const sizeCounts = {};
      Object.keys(sizeRanges).forEach(range => {
        sizeCounts[range] = data.filter(
          company => 
            company.employees >= sizeRanges[range].min && 
            company.employees <= sizeRanges[range].max
        ).length;
      });
      
      setCompanySizes(Object.keys(sizeCounts).map(size => ({
        size,
        count: sizeCounts[size]
      })));
    };
    
    fetchCompanies();
  }, []);

  // Apply filters whenever search term, selected industries, or sizes change
  useEffect(() => {
    applyFilters();
    setCurrentPage(1); // Reset to first page whenever filters change
  }, [searchTerm, selectedIndustries, selectedSizes, sortBy, companies]);

  // Filter and sort companies
  const applyFilters = () => {
    if (companies.length === 0) return;
    
    let results = [...companies];

    // Apply search term filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      results = results.filter(
        (company) =>
          company.companyName?.toLowerCase().includes(term) ||
          company.description?.toLowerCase().includes(term) ||
          (Array.isArray(company.techStack) && company.techStack.some(tag => tag.toLowerCase().includes(term)))
      );
    }

    // Apply industry filters
    if (selectedIndustries.length > 0) {
      results = results.filter((company) =>
        company.industry && selectedIndustries.includes(company.industry)
      );
    }

    // Apply company size filters
    if (selectedSizes.length > 0) {
      results = results.filter((company) => {
        // Map employee count to size range
        let companySize = '';
        const employeeCount = company.employees || 0;
        
        if (employeeCount <= 50) companySize = "1-50";
        else if (employeeCount <= 150) companySize = "51-150";
        else if (employeeCount <= 250) companySize = "151-250";
        else if (employeeCount <= 500) companySize = "251-500";
        else if (employeeCount <= 1000) companySize = "501-1000";
        else companySize = "1000 - above";
        
        return selectedSizes.includes(companySize);
      });
    }

    // Apply sorting
    if (sortBy === "Newest") {
      // Sort by createdAt in descending order
      results.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
    } else if (sortBy === "Most Applied") {
      // Sort by job count in descending order
      results.sort((a, b) => (b.jobOpen || 0) - (a.jobOpen || 0));
    }

    setFilteredCompanies(results);
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

  // Handle popular job click
  const handlePopularJobClick = (job) => {
    setSearchTerm(job);
  };

  // Handle search button click
  const handleSearch = () => {
    applyFilters();
  };

  // Get current page of companies
  const indexOfLastCompany = currentPage * jobsPerPage;
  const indexOfFirstCompany = indexOfLastCompany - jobsPerPage;
  const currentCompanies = filteredCompanies.slice(indexOfFirstCompany, indexOfLastCompany);
  const totalPages = Math.ceil(filteredCompanies.length / jobsPerPage);

  // Calculate displayed companies range for showing X-Y of Z results
  const startRange = filteredCompanies.length === 0 ? 0 : indexOfFirstCompany + 1;
  const endRange = Math.min(indexOfLastCompany, filteredCompanies.length);

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
                <p className="mt-2 text-gray-600">Loading companies...</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Error state with fallback data
  if (error && filteredCompanies.length === 0) {
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
                <h3 className="text-lg font-semibold text-red-700 mb-2">Error Loading Companies</h3>
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

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex flex-row flex-grow">
        <div className="h-screen sticky top-0">
          <Sidebar />
        </div>
        <div className="flex-grow transition-all">
          <Header />
          <div>
            {/*Part 1*/}
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

            {/*Part 2*/}
            <div className="flex p-3">
              <div className="w-1/3 p-2 bg-white">
                {/* Industry Filter */}
                <div>
                  <div
                    className="flex justify-between items-center cursor-pointer"
                    onClick={() => setIsIndustryOpen(!isIndustryOpen)}
                  >
                    <h2 className="text-base font-semibold text-gray-900">
                      Industry
                    </h2>
                    {isIndustryOpen ? (
                      <ChevronUp className="text-gray-500 w-4 h-4" />
                    ) : (
                      <ChevronDown className="text-gray-500 w-4 h-4" />
                    )}
                  </div>

                  {isIndustryOpen && (
                    <div className="mt-2 space-y-2">
                      {industries.map((industry, index) => (
                        <label
                          key={index}
                          className="flex items-center space-x-2 text-gray-800 text-sm cursor-pointer"
                        >
                          <input
                            type="checkbox"
                            className="w-4 h-4 text-blue-600 border-gray-500 rounded focus:ring-0 cursor-pointer"
                            checked={selectedIndustries.includes(industry.name)}
                            onChange={() => handleIndustryChange(industry.name)}
                          />
                          <span>
                            {industry.name}{" "}
                            <span className="text-gray-500 text-xs">
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
                    className="flex justify-between items-center cursor-pointer mt-4"
                    onClick={() => setIsCompanySizeOpen(!isCompanySizeOpen)}
                  >
                    <h2 className="text-base font-semibold text-gray-900">
                      Company Size
                    </h2>
                    {isCompanySizeOpen ? (
                      <ChevronUp className="text-gray-500 w-4 h-4" />
                    ) : (
                      <ChevronDown className="text-gray-500 w-4 h-4" />
                    )}
                  </div>

                  {isCompanySizeOpen && (
                    <div className="mt-2 space-y-2">
                      {companySizes.map((size, index) => (
                        <label
                          key={index}
                          className="flex items-center space-x-2 text-gray-800 text-sm cursor-pointer"
                        >
                          <input
                            type="checkbox"
                            className="w-4 h-4 text-blue-600 border-gray-500 rounded focus:ring-0 cursor-pointer"
                            checked={selectedSizes.includes(size.size)}
                            onChange={() => handleSizeChange(size.size)}
                          />
                          <span>
                            {size.size}{" "}
                            <span className="text-gray-500 text-xs">
                              ({size.count})
                            </span>
                          </span>
                        </label>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="w-3/4 p-2">
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="text-base font-bold">All Companies</h2>
                    <p className="text-gray-500 text-xs">
                      {filteredCompanies.length > 0
                        ? `Showing ${startRange}-${endRange} of ${filteredCompanies.length} results`
                        : "No results found"}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="relative">
                      <button
                        className="text-gray-600 text-sm font-semibold flex items-center cursor-pointer"
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                      >
                        Sort by: {sortBy}{" "}
                        <ChevronDown className="ml-1 w-3 h-3" />
                      </button>
                      {isDropdownOpen && (
                        <div className="absolute top-full mt-1 bg-white shadow-md rounded border border-gray-200 w-32 z-10">
                          {sortOptions.map((option, index) => (
                            <button
                              key={index}
                              className="block w-full text-left px-2 py-1 text-sm hover:bg-gray-100 cursor-pointer"
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
                            : "text-gray-600 hover:bg-gray-200"
                        }`}
                        onClick={() => setView("grid")}
                      >
                        <Grid className="w-4 h-4" />
                      </button>
                      <button
                        className={`p-1 rounded cursor-pointer ${
                          view === "list"
                            ? "bg-blue-500 text-white"
                            : "text-gray-600 hover:bg-gray-200"
                        }`}
                        onClick={() => setView("list")}
                      >
                        <List className="w-4 h-4" />
                      </button>
                    </div>
                    <button
                      className="text-xs bg-gray-100 px-2 py-1 rounded text-gray-700 hover:bg-gray-200"
                      onClick={() => {
                        console.log("Available Industries:", industries);
                        console.log("Selected Industries:", selectedIndustries);
                        console.log("Company Industry Data:", companies.map(c => ({ 
                          name: c.companyName, 
                          industry: c.industry 
                        })));
                      }}
                    >
                      Debug Filters
                    </button>
                  </div>
                </div>

                {filteredCompanies.length === 0 ? (
                  <div className="mt-3 text-center p-4 bg-gray-100 rounded">
                    <p className="text-base text-gray-600">
                      No companies match your search criteria.
                    </p>
                    <p className="text-gray-500 text-sm mt-1">
                      Try adjusting your filters or search terms.
                    </p>
                  </div>
                ) : (
                  <>
                    {/* Grid View */}
                    {view === "grid" && (
                      <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-3 justify-center">
                        {currentCompanies.map((company) => (
                          <JobCardGrid key={company._id} company={company} />
                        ))}
                      </div>
                    )}

                    {/* List View */}
                    {view === "list" && (
                      <div className="mt-3 flex flex-col gap-2">
                        {currentCompanies.map((company) => (
                          <JobCardList key={company._id} company={company} />
                        ))}
                      </div>
                    )}

                    {/* Pagination */}
                    {totalPages > 1 && (
                      <div className="flex justify-center items-center mt-4 gap-1">
                        <button
                          className="px-2 py-1 text-xs text-gray-600 rounded hover:bg-gray-200 cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
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
                            className={`px-2 py-1 text-xs rounded cursor-pointer ${
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
                          className="px-2 py-1 text-xs text-gray-600 rounded hover:bg-gray-200 cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
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
