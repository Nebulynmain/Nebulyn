import React, { useState, useEffect } from "react";
import { CalendarIcon } from "lucide-react";
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

const Dashboard = () => {
  const cards = [
    { number: 76, text: "New candidates to review", color: "bg-[#007AFF]" },
    { number: 3, text: "Schedule for today", color: "bg-[#56CDAD]" },
    { number: 24, text: "Messages received", color: "bg-[#26A4FF]" },
  ];

  const jobs = [
    {
      id: 1,
      logo: "https://cdn4.iconfinder.com/data/icons/social-media-logos-6/512/112-gmail_email_mail-512.png",
      title: "Social Media Assistant",
      company: "Nomad",
      location: "Paris, France",
      type: "Full-Time",
      tags: ["Marketing", "Design"],
      applied: 5,
      capacity: 10,
      color: "green",
    },
    {
      id: 2,
      logo: "https://cdn4.iconfinder.com/data/icons/logos-and-brands/512/91_Dropbox_logo_logos-512.png",
      title: "Brand Designer",
      company: "Nomad",
      location: "Paris, France",
      type: "Full-Time",
      tags: ["Business", "Design"],
      applied: 5,
      capacity: 10,
      color: "blue",
    },
    {
      id: 3,
      logo: "https://cdn4.iconfinder.com/data/icons/logos-and-brands/512/141_Terraform_logo_logos-512.png",
      title: "Interactive Developer",
      company: "Terraform",
      location: "Berlin, Germany",
      type: "Part-Time",
      tags: ["Marketing", "Design"],
      applied: 3,
      capacity: 5,
      color: "teal",
    },
    {
      id: 4,
      logo: "https://cdn4.iconfinder.com/data/icons/logos-and-brands/512/97_Docker_logo_logos-512.png",
      title: "Product Designer",
      company: "ClassPass",
      location: "Berlin, Germany",
      type: "Full-Time",
      tags: ["Business", "Design"],
      applied: 5,
      capacity: 10,
      color: "blue",
    },
  ];

  const getProgressBarColor = (color) => {
    const colorMap = {
      green: "bg-green-500",
      blue: "bg-blue-500",
      teal: "bg-teal-500",
    };
    return colorMap[color] || "bg-gray-500";
  };

  const getJobTypeStyle = (type) => {
    return type === "Full-Time"
      ? "text-teal-400 bg-teal-100 rounded-full "
      : "text-orange-500 bg-orange-100 rounded-full";
  };

  const [activeTab, setActiveTab] = useState("Week");
  const [activeSection, setActiveSection] = useState("Overview");

  // Sample data for the chart based on active section and time period
  const overviewWeekData = [
    { day: "Mon", jobView: 122, jobApplied: 65 },
    { day: "Tue", jobView: 90, jobApplied: 75 },
    { day: "Wed", jobView: 145, jobApplied: 85 },
    { day: "Thu", jobView: 158, jobApplied: 120 },
    { day: "Fri", jobView: 134, jobApplied: 65 },
    { day: "Sat", jobView: 60, jobApplied: 40 },
    { day: "Sun", jobView: 70, jobApplied: 65 },
  ];

  const overviewMonthData = [
    { day: "Week 1", jobView: 520, jobApplied: 310 },
    { day: "Week 2", jobView: 580, jobApplied: 350 },
    { day: "Week 3", jobView: 620, jobApplied: 420 },
    { day: "Week 4", jobView: 622, jobApplied: 430 },
  ];

  const overviewYearData = [
    { day: "Jan", jobView: 1520, jobApplied: 810 },
    { day: "Feb", jobView: 1680, jobApplied: 950 },
    { day: "Mar", jobView: 1720, jobApplied: 1020 },
    { day: "Apr", jobView: 1622, jobApplied: 930 },
    { day: "May", jobView: 1820, jobApplied: 1110 },
    { day: "Jun", jobView: 1920, jobApplied: 1210 },
  ];

  // Get data based on active section and time period
  const getChartData = () => {
    if (activeSection === "Overview") {
      if (activeTab === "Month") return overviewMonthData;
      if (activeTab === "Year") return overviewYearData;
      return overviewWeekData;
    } else if (activeSection === "Jobs View") {
      // Filter to only show jobView data
      if (activeTab === "Month") {
        return overviewMonthData.map((item) => ({
          day: item.day,
          jobView: item.jobView,
        }));
      } else if (activeTab === "Year") {
        return overviewYearData.map((item) => ({
          day: item.day,
          jobView: item.jobView,
        }));
      } else {
        return overviewWeekData.map((item) => ({
          day: item.day,
          jobView: item.jobView,
        }));
      }
    } else {
      // Filter to only show jobApplied data
      if (activeTab === "Month") {
        return overviewMonthData.map((item) => ({
          day: item.day,
          jobApplied: item.jobApplied,
        }));
      } else if (activeTab === "Year") {
        return overviewYearData.map((item) => ({
          day: item.day,
          jobApplied: item.jobApplied,
        }));
      } else {
        return overviewWeekData.map((item) => ({
          day: item.day,
          jobApplied: item.jobApplied,
        }));
      }
    }
  };

  // Job openings count
  const jobOpenings = 12;

  // Applicant data
  const applicants = {
    total: 67,
    categories: [
      { name: "Full Time", count: 45, color: "#1E88E5" },
      { name: "Part-Time", count: 24, color: "#4CAF50" },
      { name: "Internship", count: 32, color: "#FFC107" },
      { name: "Contract", count: 30, color: "#FF5722" },
      { name: "Remote", count: 22, color: "#29B6F6" },
    ],
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex flex-row flex-grow">
        <div className="h-screen sticky top-0">
          <Sidebar />
        </div>
        <div className="flex-grow transition-all">
          <Header />
          <div className="">
            {/*Part 1 - Reduced text sizes*/}
            <div className="flex justify-between items-center py-4 px-6">
              <div>
                <h1 className="text-3xl font-semibold text-black-900">
                  Good morning, Maria
                </h1>
                <p className="text-gray-500 mt-1 text-base">
                  Here is your job listings statistic report from July 19 - July
                  25.
                </p>
              </div>
              <div className="flex items-center border-2 border-gray-300 px-3 py-1 cursor-pointer mr-4">
                <span className="text-gray-700 font-semibold text-sm">
                  Jul 19 - Jul 25
                </span>
                <CalendarIcon className="w-3 h-3 text-blue-500 ml-2" />
              </div>
            </div>

            {/*Part 2 - Reduced card height and padding*/}
            <div className="flex justify-between items-center py-3 px-2">
              {cards.map((card, index) => (
                <div
                  key={index}
                  className={`flex items-center justify-between ${card.color} text-white p-4 w-1/3 h-20 shadow-md mx-2 cursor-pointer`}
                >
                  <div>
                    <p className="text-3xl font-bold">{card.number}</p>
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
                        <p className="text-xl font-bold">2,342</p>
                        <p className="text-blue-600 text-xs">
                          This Week <span className="font-bold">6.4%</span> 🔼
                        </p>
                        <div className="absolute top-3 right-3 bg-yellow-100 p-1 rounded-full">
                          <Eye size={16} className="text-yellow-500" />
                        </div>
                      </div>

                      <div className="bg-gray-100 rounded-lg p-3 relative cursor-pointer">
                        <p className="text-gray-600 text-xs">Job Applied</p>
                        <p className="text-xl font-bold">654</p>
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
                    {jobOpenings}
                  </p>
                  <p className="text-gray-500 text-sm mt-1">Jobs Opened</p>
                </div>

                {/* Applicants Summary Card */}
                <div className="bg-white shadow rounded-lg p-4 cursor-pointer">
                  <h3 className="text-base font-medium text-gray-600">
                    Applicants Summary
                  </h3>
                  <p className="text-4xl font-bold mt-1 text-gray-900">
                    {applicants.total}
                  </p>
                  <p className="text-gray-500 text-sm mt-1">Applicants</p>

                  {/* Progress Bar */}
                  <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden mt-3">
                    <div className="h-full flex">
                      {applicants.categories.map((category, index) => (
                        <div
                          key={index}
                          className="h-full"
                          style={{
                            width: `${
                              (category.count / applicants.total) * 100
                            }%`,
                            backgroundColor: category.color,
                          }}
                        ></div>
                      ))}
                    </div>
                  </div>

                  {/* Legend */}
                  <div className="grid grid-cols-1 gap-1 mt-2">
                    {applicants.categories.map((category, index) => (
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
                <h2 className="text-lg font-bold text-gray-800">Job Updates</h2>
                <a
                  href="#"
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
                {jobs.map((job) => (
                  <div
                    key={job.id}
                    className="border border-gray-200 rounded-lg overflow-hidden cursor-pointer"
                  >
                    <div className="p-3">
                      <div className="flex items-center mb-2">
                        <div
                          className={`w-8 h-8 rounded-md flex items-center justify-center bg-${job.color}-100`}
                        >
                          <img
                            src={job.logo}
                            alt={job.company}
                            className="w-5 h-5"
                          />
                        </div>
                        <span
                          className={`ml-auto text-xs p-1 ${getJobTypeStyle(
                            job.type
                          )}`}
                        >
                          {job.type}
                        </span>
                      </div>

                      <h3 className="font-semibold text-gray-800 mb-1 text-sm">
                        {job.title}
                      </h3>
                      <p className="text-xs text-gray-500 mb-2">
                        {job.company} • {job.location}
                      </p>

                      <div className="flex flex-wrap gap-1 mb-2">
                        {job.tags.map((tag, index) => (
                          <span
                            key={index}
                            className={`text-xs px-2 py-0.5 rounded-full cursor-pointer ${
                              tag === "Marketing"
                                ? "bg-yellow-100 text-yellow-800"
                                : tag === "Design"
                                ? "bg-blue-100 text-blue-800"
                                : "bg-green-100 text-green-800"
                            }`}
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
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
