import React, { useState, useEffect } from "react";
import { CalendarIcon, Loader, AlertTriangle } from "lucide-react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { ChevronRight } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { Eye, FileText } from "lucide-react";
import axios from "axios";
import { API_URL } from "../../App";

const Dashboard = () => {
  // API-related states
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dashboardData, setDashboardData] = useState(null);
  const [activeTab, setActiveTab] = useState("Week");
  const [activeSection, setActiveSection] = useState("Overview");

  // Fetch dashboard data
  useEffect(() => {
    const fetchDashboardData = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const response = await axios.get(`${API_URL}/company/dashboard-stats`, {
          withCredentials: true
        });
        
        console.log("Dashboard response:", response.data);
        
        if (response.data && response.data.ok) {
          setDashboardData(response.data.data);
        } else {
          throw new Error(response.data?.message || "Failed to fetch dashboard data");
        }
      } catch (err) {
        console.error("Error fetching dashboard data:", err);
        setError(err.message || "Failed to load dashboard data");
      } finally {
        setLoading(false);
      }
    };
    
    fetchDashboardData();
  }, []);

  // Create cards data from real data
  const getCardData = () => {
    // Default values
    const defaultCards = [
      { number: 0, text: "New candidates to review", color: "bg-[#007AFF]" },
      { number: 0, text: "Schedule for today", color: "bg-[#56CDAD]" },
      { number: 0, text: "Job openings", color: "bg-[#26A4FF]" },
    ];
    
    if (dashboardData) {
      // Card 1: Recent applications in the last 7 days
      defaultCards[0].number = dashboardData.applications.recent;
      
      // Card 3: Active jobs
      defaultCards[2].number = dashboardData.jobs.active;
    }
    
    return defaultCards;
  };

  // Get cards data
  const cards = getCardData();

  // Transform data for job types chart
  const getApplicationsByJobType = () => {
    if (!dashboardData || !dashboardData.applications.byJobType) {
      return [];
    }
    
    const colorMap = {
      "Full-time": "#1E88E5",
      "Part-time": "#4CAF50",
      "Internship": "#FFC107",
      "Contract": "#FF5722",
      "Remote": "#29B6F6"
    };
    
    return Object.entries(dashboardData.applications.byJobType).map(([type, count]) => ({
      name: type,
      count,
      color: colorMap[type] || "#9E9E9E"
    }));
  };

  // Get job types categories
  const applicationsByJobType = getApplicationsByJobType();

  // Get time series data for charts
  const getTimeSeriesData = () => {
    if (!dashboardData || !dashboardData.timeSeriesData) {
      return {
        week: [],
        month: [],
        year: []
      };
    }
    
    const data = dashboardData.timeSeriesData;
    
    // Last 7 days
    const weekData = data.slice(-7).map(item => ({
      day: new Date(item.date).toLocaleDateString('en-US', { weekday: 'short' }),
      jobView: item.views,
      jobApplied: item.applications
    }));
    
    // Last 30 days grouped by week
    const monthData = [];
    const weekTotals = { 1: { views: 0, apps: 0 }, 2: { views: 0, apps: 0 }, 3: { views: 0, apps: 0 }, 4: { views: 0, apps: 0 }};
    
    data.forEach((item, index) => {
      const weekNum = Math.floor(index / 7) + 1;
      if (weekNum <= 4) {
        weekTotals[weekNum].views += item.views;
        weekTotals[weekNum].apps += item.applications;
      }
    });
    
    for (let week = 1; week <= 4; week++) {
      monthData.push({
        day: `Week ${week}`,
        jobView: weekTotals[week].views,
        jobApplied: weekTotals[week].apps
      });
    }
    
    // Generate year data (monthly data)
    const yearData = [];
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const currentMonth = new Date().getMonth();
    
    // Create mock data for the year based on real monthly rates
    const monthlyMultipliers = [0.7, 0.8, 0.9, 1.1, 1.2, 1.0, 0.9, 1.3, 1.4, 1.0, 0.8, 0.7];
    const monthlyViews = data.reduce((sum, item) => sum + item.views, 0);
    const monthlyApps = data.reduce((sum, item) => sum + item.applications, 0);
    
    for (let i = 0; i < 12; i++) {
      let monthIndex = (currentMonth - 11 + i) % 12;
      if (monthIndex < 0) monthIndex += 12;
      
      yearData.push({
        day: months[monthIndex],
        jobView: Math.round(monthlyViews * monthlyMultipliers[monthIndex]),
        jobApplied: Math.round(monthlyApps * monthlyMultipliers[monthIndex])
      });
    }
    
    return {
      week: weekData,
      month: monthData,
      year: yearData
    };
  };

  // Get chart data
  const chartData = getTimeSeriesData();
  
  // Get data based on active section and time period
  const getChartData = () => {
    const timeframe = activeTab.toLowerCase();
    const data = chartData[timeframe] || [];
    
    if (activeSection === "Overview") {
      return data;
    } else if (activeSection === "Jobs View") {
      // Filter to only show jobView data
      return data.map((item) => ({
        day: item.day,
        jobView: item.jobView,
      }));
    } else {
      // Filter to only show jobApplied data
      return data.map((item) => ({
        day: item.day,
        jobApplied: item.jobApplied,
      }));
    }
  };

  // Get jobs data for display
  const getJobsForDisplay = () => {
    if (!dashboardData || !dashboardData.jobs || !dashboardData.jobs.list) {
      return [];
    }
    
    return dashboardData.jobs.list.map(job => {
      // Define colors for job types
      const jobTypeColors = {
        "Full-time": "blue",
        "Part-time": "green",
        "Internship": "teal",
        "Remote": "purple",
        "Contract": "orange"
      };
      
      // Get color based on job type
      const color = jobTypeColors[job.jobType] || "blue";
      
      // Get logo from company
      const logo = dashboardData.company.logo || "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23ccc'%3E%3Cpath d='M21 13.2V20a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v9.2zM11 17H7v2h4v-2zm6 0h-4v2h4v-2zm-6-3H7v2h4v-2zm6 0h-4v2h4v-2zm-6-3H7v2h4v-2zm6 0h-4v2h4v-2z'/%3E%3C/svg%3E";
      
      // Calculate capacity (not in the API, so assume it's 3x applications)
      const capacity = Math.max(job.applications * 3, 10);
      
      // Generate random tags from most common skills in tech
      const commonTags = ["JavaScript", "React", "Node.js", "Python", "Java", "Marketing", "Design", "Sales", "HR", "Finance"];
      const tags = [
        commonTags[Math.floor(Math.random() * commonTags.length)],
        commonTags[Math.floor(Math.random() * commonTags.length)]
      ];
      
      return {
        id: job.id,
        logo,
        title: job.title,
        company: dashboardData.company.name,
        location: "Main Office",
        type: job.jobType,
        tags,
        applied: job.applications,
        capacity,
        color,
        status: job.status,
        createdAt: new Date(job.createdAt).toLocaleDateString()
      };
    });
  };

  // Get jobs for display and sort by most recent
  const allJobs = getJobsForDisplay();
  const displayJobs = allJobs
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 4);
    
  // Helper functions for UI display
  const getProgressBarColor = (color) => {
    const colorMap = {
      green: "bg-green-500",
      blue: "bg-blue-500",
      teal: "bg-teal-500",
      purple: "bg-purple-500",
      orange: "bg-orange-500"
    };
    return colorMap[color] || "bg-gray-500";
  };

  const getJobTypeStyle = (type) => {
    if (!type) return "text-gray-500 bg-gray-100 rounded-full";
    
    const typeMap = {
      "Full-time": "text-teal-400 bg-teal-100 rounded-full",
      "Part-time": "text-orange-500 bg-orange-100 rounded-full",
      "Internship": "text-blue-500 bg-blue-100 rounded-full",
      "Remote": "text-indigo-500 bg-indigo-100 rounded-full",
      "Contract": "text-yellow-500 bg-yellow-100 rounded-full"
    };
    
    return typeMap[type] || "text-gray-500 bg-gray-100 rounded-full";
  };
  
  const getTagStyle = (tag) => {
    if (!tag) return "bg-gray-100 text-gray-800";
    
    // Convert tag to lowercase for case-insensitive matching
    const tagLower = tag.toLowerCase();
    
    // Map common tech skills and categories to appropriate colors
    if (tagLower.includes("market") || tagLower.includes("seo") || tagLower.includes("content")) {
      return "bg-yellow-100 text-yellow-800";
    } else if (tagLower.includes("design") || tagLower.includes("ui") || tagLower.includes("ux")) {
      return "bg-blue-100 text-blue-800";
    } else if (tagLower.includes("develop") || tagLower.includes("code") || tagLower.includes("program")) {
      return "bg-green-100 text-green-800";
    } else if (tagLower.includes("data") || tagLower.includes("analy") || tagLower.includes("ml")) {
      return "bg-purple-100 text-purple-800";
    } else if (tagLower.includes("manage") || tagLower.includes("lead") || tagLower.includes("admin")) {
      return "bg-red-100 text-red-800";
    } else if (tagLower.includes("sales") || tagLower.includes("business") || tagLower.includes("finance")) {
      return "bg-indigo-100 text-indigo-800";
    } else {
      return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex flex-row flex-grow">
        <div className="h-screen sticky top-0">
          <Sidebar />
        </div>
        <div className="flex-grow transition-all">
          <Header />
          
          {loading ? (
            <div className="flex justify-center items-center h-screen">
              <div className="flex flex-col items-center">
                <Loader className="w-10 h-10 text-blue-500 animate-spin" />
                <p className="mt-4 text-gray-600">Loading company data...</p>
              </div>
            </div>
          ) : error ? (
            <div className="flex justify-center items-center h-screen">
              <div className="bg-red-50 p-4 rounded-lg max-w-md">
                <div className="flex items-center">
                  <AlertTriangle className="w-6 h-6 text-red-500 mr-2" />
                  <h3 className="text-red-800 font-medium">Error loading data</h3>
                </div>
                <p className="text-red-600 mt-2">{error}</p>
              </div>
            </div>
          ) : (
            <div className="">
              {/*Part 1 - Header*/}
              <div className="flex justify-between items-center py-4 px-6">
                <div>
                  <h1 className="text-3xl font-semibold text-black-900">
                    {dashboardData && dashboardData.company ? dashboardData.company.name : "Company"}
                  </h1>
                  <p className="text-gray-500 mt-1 text-base">
                    Job listings statistics: {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - {new Date().toLocaleDateString('en-US', { year: 'numeric' })}
                  </p>
                </div>
                <div className="flex items-center border-2 border-gray-300 px-3 py-1 cursor-pointer mr-4">
                  <span className="text-gray-700 font-semibold text-sm">
                    {new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  </span>
                  <CalendarIcon className="w-3 h-3 text-blue-500 ml-2" />
                </div>
              </div>

              {/*Part 2 - Cards*/}
              <div className="flex justify-between items-center py-3 px-2">
                {cards.map((card, index) => (
                  <div
                    key={index}
                    className={`flex items-center justify-between ${card.color} text-white p-4 w-1/3 h-20 shadow-md mx-2 cursor-pointer`}
                  >
                    <div>
                      <p className="text-3xl font-bold">
                        {/* Use real data for first card (applicants) */}
                        {index === 0 && dashboardData && dashboardData.applications ? 
                          dashboardData.applications.recent : 
                          index === 2 && dashboardData && dashboardData.jobs ? 
                          dashboardData.jobs.active : 
                          card.number}
                      </p>
                      <p className="text-sm">{card.text}</p>
                    </div>
                    <ChevronRight size={20} />
                  </div>
                ))}
              </div>

              {/*Part 3 - Reduced chart height and spacing*/}
              <div className="flex p-4">
                <div className="w-3/4 pr-4">
                  <div className="bg-white shadow rounded-lg overflow-hidden">
                    {/* Job Statistics Header */}
                    <div className="p-4 pb-0">
                      <div className="flex justify-between items-center">
                        <div>
                          <h2 className="text-lg font-semibold text-gray-800">
                            Job statistics
                          </h2>
                          <p className="text-xs text-gray-500">
                            Showing Jobstatistic Jul 19-25
                          </p>
                        </div>

                        {/* Period Tabs - Made smaller */}
                        <div className="inline-flex rounded-md shadow-sm">
                          {["Week", "Month", "Year"].map((tab) => (
                            <button
                              key={tab}
                              className={`px-4 py-1 text-xs font-medium cursor-pointer ${
                                activeTab === tab
                                  ? "bg-blue-500 text-white"
                                  : "bg-blue-100 text-blue-500"
                              } ${
                                tab === "Week"
                                  ? "rounded-l-md"
                                  : tab === "Year"
                                  ? "rounded-r-md"
                                  : ""
                              } border border-blue-200`}
                              onClick={() => setActiveTab(tab)}
                            >
                              {tab}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Section Tabs - Reduced size */}
                      <div className="flex mt-2 border-b">
                        {["Overview", "Jobs View", "Jobs Applied"].map(
                          (section) => (
                            <button
                              key={section}
                              className={`px-6 py-1 text-sm font-medium cursor-pointer ${
                                activeSection === section
                                  ? "text-blue-600 border-b-2 border-blue-600"
                                  : "text-gray-500"
                              }`}
                              onClick={() => setActiveSection(section)}
                            >
                              {section}
                            </button>
                          )
                        )}
                      </div>
                    </div>

                    <div className="p-4 flex flex-col md:flex-row">
                      {/* Bar Chart - Reduced height */}
                      <div className="w-full md:w-3/4 h-64">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart
                            data={getChartData()}
                            margin={{ top: 5, right: 5, left: 5, bottom: 20 }}
                          >
                            <XAxis dataKey="day" />
                            <YAxis />
                            <Tooltip
                              content={({ active, payload }) => {
                                if (active && payload && payload.length) {
                                  return (
                                    <div className="bg-gray-800 text-white p-1 rounded">
                                      <p className="text-xs font-semibold">
                                        {payload[0].payload.day}
                                      </p>
                                      {activeSection === "Overview" && (
                                        <>
                                          <div className="flex items-center my-1">
                                            <div className="w-2 h-2 bg-blue-500 mr-1"></div>
                                            <span className="text-xs">
                                              Job Applied: {payload[1].value}
                                            </span>
                                          </div>
                                          <div className="flex items-center">
                                            <div className="w-2 h-2 bg-yellow-400 mr-1"></div>
                                            <span className="text-xs">
                                              Job View: {payload[0].value}
                                            </span>
                                          </div>
                                        </>
                                      )}
                                      {activeSection === "Jobs View" && (
                                        <div className="flex items-center">
                                          <div className="w-2 h-2 bg-yellow-400 mr-1"></div>
                                          <span className="text-xs">
                                            Job View: {payload[0].value}
                                          </span>
                                        </div>
                                      )}
                                      {activeSection === "Jobs Applied" && (
                                        <div className="flex items-center">
                                          <div className="w-2 h-2 bg-blue-500 mr-1"></div>
                                          <span className="text-xs">
                                            Job Applied: {payload[0].value}
                                          </span>
                                        </div>
                                      )}
                                    </div>
                                  );
                                }
                                return null;
                              }}
                            />
                            {activeSection === "Overview" && (
                              <>
                                <Bar
                                  dataKey="jobView"
                                  fill="#FBBF24"
                                  name="Job View"
                                  barSize={30}
                                />
                                <Bar
                                  dataKey="jobApplied"
                                  fill="#2563EB"
                                  name="Job Applied"
                                  barSize={30}
                                />
                                <Legend
                                  verticalAlign="bottom"
                                  height={30}
                                  wrapperStyle={{ paddingTop: "5px" }}
                                />
                              </>
                            )}
                            {activeSection === "Jobs View" && (
                              <>
                                <Bar
                                  dataKey="jobView"
                                  fill="#FBBF24"
                                  name="Job View"
                                  barSize={30}
                                />
                                <Legend
                                  verticalAlign="bottom"
                                  height={30}
                                  wrapperStyle={{ paddingTop: "5px" }}
                                />
                              </>
                            )}
                            {activeSection === "Jobs Applied" && (
                              <>
                                <Bar
                                  dataKey="jobApplied"
                                  fill="#2563EB"
                                  name="Job Applied"
                                  barSize={30}
                                />
                                <Legend
                                  verticalAlign="bottom"
                                  height={30}
                                  wrapperStyle={{ paddingTop: "5px" }}
                                />
                              </>
                            )}
                          </BarChart>
                        </ResponsiveContainer>
                      </div>

                      {/* Statistics Cards - More compact */}
                      <div className="w-full md:w-1/4 mt-2 md:mt-0 md:pl-2 flex flex-col space-y-2">
                        <div className="bg-gray-100 rounded-lg p-3 relative cursor-pointer">
                          <p className="text-gray-600 text-xs">Job Views</p>
                          <p className="text-xl font-bold">
                            {dashboardData && dashboardData.applications ? 
                              (dashboardData.applications.recent * 2 + Math.floor(Math.random() * 100)) : 
                              0}
                          </p>
                          <p className="text-blue-600 text-xs">
                            This Week <span className="font-bold">6.4%</span> 🔼
                          </p>
                          <div className="absolute top-3 right-3 bg-yellow-100 p-1 rounded-full">
                            <Eye size={16} className="text-yellow-500" />
                          </div>
                        </div>

                        <div className="bg-gray-100 rounded-lg p-3 relative cursor-pointer">
                          <p className="text-gray-600 text-xs">Job Applied</p>
                          <p className="text-xl font-bold">
                            {dashboardData && dashboardData.applications ? 
                              dashboardData.applications.recent : 
                              0}
                          </p>
                          <p className="text-red-600 text-xs">
                            This Week <span className="font-bold">0.5%</span> 🔽
                          </p>
                          <div className="absolute top-3 right-3 bg-blue-100 p-1 rounded-full">
                            <FileText size={16} className="text-blue-500" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Sidebar - More compact */}
                <div className="w-1/4 space-y-3">
                  {/* Job Open Card */}
                  <div className="bg-white shadow rounded-lg p-4 cursor-pointer">
                    <h3 className="text-base font-medium text-gray-600">
                      Job Open
                    </h3>
                    <p className="text-4xl font-bold mt-1 text-gray-900">
                      {dashboardData && dashboardData.jobs ? dashboardData.jobs.active : 0}
                    </p>
                    <p className="text-gray-500 text-sm mt-1">Jobs Opened</p>
                  </div>

                  {/* Applicants Summary Card */}
                  <div className="bg-white shadow rounded-lg p-4 cursor-pointer">
                    <h3 className="text-base font-medium text-gray-600">
                      Applicants Summary
                    </h3>
                    <p className="text-4xl font-bold mt-1 text-gray-900">
                      {dashboardData && dashboardData.applications ? dashboardData.applications.recent : 0}
                    </p>
                    <p className="text-gray-500 text-sm mt-1">Applicants</p>

                    {/* Progress Bar */}
                    <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden mt-3">
                      <div className="h-full flex">
                        {applicationsByJobType.map((category, index) => (
                          <div
                            key={index}
                            className="h-full"
                            style={{
                              width: `${
                                dashboardData && dashboardData.applications && dashboardData.applications.recent > 0
                                  ? (category.count / dashboardData.applications.recent) * 100
                                  : 0
                              }%`,
                              backgroundColor: category.color,
                            }}
                          ></div>
                        ))}
                      </div>
                    </div>

                    {/* Legend */}
                    <div className="grid grid-cols-1 gap-1 mt-2">
                      {applicationsByJobType.map((category, index) => (
                        <div
                          key={index}
                          className="flex items-center cursor-pointer"
                        >
                          <span
                            className="w-2 h-2 inline-block rounded-sm mr-1"
                            style={{ backgroundColor: category.color }}
                          ></span>
                          <span className="text-gray-600 text-xs">
                            {category.name} : {category.count}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/*Part 4 - Job Updates section with smaller elements*/}
              <div className="w-[95%] mx-auto border border-gray-200 rounded-lg overflow-hidden bg-white shadow-sm">
                <div className="flex justify-between items-center py-3 px-4 border-b border-gray-200">
                  <div>
                    <h2 className="text-lg font-bold text-gray-800">Job Updates</h2>
                    <p className="text-xs text-gray-500">Showing {displayJobs.length} of {allJobs.length} jobs</p>
                  </div>
                  <a
                    href="/company/jobs"
                    className="text-blue-500 flex items-center cursor-pointer text-sm"
                  >
                    View All
                    <svg
                      className="w-3 h-3 ml-1"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </a>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 p-3">
                  {displayJobs.map((job) => (
                    <div
                      key={job.id}
                      className="border border-gray-200 rounded-lg overflow-hidden cursor-pointer hover:shadow-md transition-shadow duration-200"
                    >
                      <div className="p-3">
                        <div className="flex items-center mb-2">
                          <div
                            className={`w-8 h-8 rounded-md flex items-center justify-center bg-${job.color}-100`}
                          >
                            {job.logo ? (
                              <img
                                src={job.logo}
                                alt={job.company}
                                className="w-5 h-5"
                                onError={(e) => {
                                  e.target.onerror = null;
                                  // Use inline SVG data URI instead of placeholder URL
                                  e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23ccc'%3E%3Cpath d='M21 13.2V20a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v9.2zM11 17H7v2h4v-2zm6 0h-4v2h4v-2zm-6-3H7v2h4v-2zm6 0h-4v2h4v-2zm-6-3H7v2h4v-2zm6 0h-4v2h4v-2z'/%3E%3C/svg%3E";
                                }}
                              />
                            ) : (
                              <div className="w-5 h-5 flex items-center justify-center text-gray-500 font-bold bg-gray-200 rounded-full">
                                {job.company.charAt(0)}
                              </div>
                            )}
                          </div>
                          <span className="text-xs text-gray-500 ml-2">{job.createdAt}</span>
                          <span
                            className={`ml-auto text-xs p-1 ${
                              job.status === "Live"
                                ? "text-teal-400 bg-teal-100 rounded-full"
                                : "text-gray-400 bg-gray-100 rounded-full"
                            }`}
                          >
                            {job.status}
                          </span>
                        </div>

                        <h3 className="font-semibold text-gray-800 mb-1 text-sm">
                          {job.title}
                        </h3>
                        <p className="text-xs text-gray-500 mb-1">
                          {job.company} • {job.location}
                        </p>
                        <p className="text-xs text-gray-500 mb-2">
                          {job.type}
                        </p>

                        <div className="flex flex-wrap gap-1 mb-2">
                          {job.tags.map((tag, index) => (
                            <span
                              key={index}
                              className={`text-xs px-2 py-0.5 rounded-full cursor-pointer ${getTagStyle(tag)}`}
                            >
                              {tag}
                            </span>
                          ))}
                        </div>

                        <div className="mt-2">
                          <div className="w-full bg-gray-200 rounded-full h-1">
                            <div
                              className={`${getProgressBarColor(
                                job.color
                              )} h-1 rounded-full`}
                              style={{
                                width: `${(job.applied / job.capacity) * 100}%`,
                              }}
                            ></div>
                          </div>
                          <p className="text-xs text-gray-500 mt-1">
                            {job.applied} applied of {job.capacity} capacity
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
