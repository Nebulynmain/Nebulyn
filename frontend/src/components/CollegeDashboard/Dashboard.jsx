import React, { useState } from "react";
import { CalendarIcon, ChevronRight, Eye, FileText } from "lucide-react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const Dashboard = () => {
  const cards = [
    {
      number: 76,
      text: "Total Number of Company",
      color: "bg-[#007AFF]",
    },
    { number: 3, text: "Schedule for today", color: "bg-[#56CDAD]" },
    { number: 24, text: "Company Applied", color: "bg-[#26A4FF]" },
  ];

  const [activeTab, setActiveTab] = useState("Week");
  const [activeSection, setActiveSection] = useState("Overview");

  const overviewWeekData = [
    { day: "Mon", companyView: 122, companyApplied: 65 },
    { day: "Tue", companyView: 90, companyApplied: 75 },
    { day: "Wed", companyView: 145, companyApplied: 85 },
    { day: "Thu", companyView: 158, companyApplied: 120 },
    { day: "Fri", companyView: 134, companyApplied: 65 },
    { day: "Sat", companyView: 60, companyApplied: 40 },
    { day: "Sun", companyView: 70, companyApplied: 65 },
  ];

  const overviewMonthData = [
    { day: "Week 1", companyView: 520, companyApplied: 310 },
    { day: "Week 2", companyView: 580, companyApplied: 350 },
    { day: "Week 3", companyView: 620, companyApplied: 420 },
    { day: "Week 4", companyView: 622, companyApplied: 430 },
  ];

  const overviewYearData = [
    { day: "Jan", companyView: 1520, companyApplied: 810 },
    { day: "Feb", companyView: 1680, companyApplied: 950 },
    { day: "Mar", companyView: 1720, companyApplied: 1020 },
    { day: "Apr", companyView: 1622, companyApplied: 930 },
    { day: "May", companyView: 1820, companyApplied: 1110 },
    { day: "Jun", companyView: 1920, companyApplied: 1210 },
  ];

  const getChartData = () => {
    const base =
      activeTab === "Month"
        ? overviewMonthData
        : activeTab === "Year"
        ? overviewYearData
        : overviewWeekData;

    if (activeSection === "Overview") return base;
    if (activeSection === "Company View")
      return base.map(({ day, companyView }) => ({ day, companyView }));
    return base.map(({ day, companyApplied }) => ({ day, companyApplied }));
  };

  const companyOpenings = 12;

  const company = {
    total: 153,
    categories: [
      { name: "Startup", count: 50, color: "#1E88E5" },
      { name: "MNC", count: 40, color: "#4CAF50" },
      { name: "Government", count: 25, color: "#FFC107" },
      { name: "NGO", count: 20, color: "#FF5722" },
      { name: "Freelance", count: 18, color: "#29B6F6" },
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
          <div>
            <div className="flex justify-between items-center py-4 px-6">
              <div>
                <h1 className="text-3xl font-semibold text-black-900">
                  Good morning, Maria
                </h1>
                <p className="text-gray-500 mt-1 text-base">
                  Here is your company listings statistic report from July 19 -
                  July 25.
                </p>
              </div>
              <div className="flex items-center border-2 border-gray-300 px-3 py-1 cursor-pointer mr-4">
                <span className="text-gray-700 font-semibold text-sm">
                  Jul 19 - Jul 25
                </span>
                <CalendarIcon className="w-3 h-3 text-blue-500 ml-2" />
              </div>
            </div>

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

            <div className="flex p-4">
              <div className="w-3/4 pr-4">
                <div className="bg-white shadow rounded-lg overflow-hidden">
                  <div className="p-4 pb-0">
                    <div className="flex justify-between items-center">
                      <div>
                        <h2 className="text-lg font-semibold text-gray-800">
                          Company statistics
                        </h2>
                        <p className="text-xs text-gray-500">
                          Showing Company Statistic Jul 19-25
                        </p>
                      </div>

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

                    <div className="flex mt-2 border-b">
                      {["Overview", "Company View", "Company Applied"].map(
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
                    <div className="w-full md:w-3/4 h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          data={getChartData()}
                          margin={{ top: 5, right: 5, left: 5, bottom: 20 }}
                        >
                          <XAxis dataKey="day" />
                          <YAxis />
                          <Tooltip />
                          {activeSection === "Overview" && (
                            <>
                              <Bar
                                dataKey="companyView"
                                fill="#FBBF24"
                                name="Company View"
                                barSize={30}
                              />
                              <Bar
                                dataKey="companyApplied"
                                fill="#2563EB"
                                name="Company Applied"
                                barSize={30}
                              />
                              <Legend verticalAlign="bottom" height={30} />
                            </>
                          )}
                          {activeSection === "Company View" && (
                            <>
                              <Bar
                                dataKey="companyView"
                                fill="#FBBF24"
                                name="Company View"
                                barSize={30}
                              />
                              <Legend verticalAlign="bottom" height={30} />
                            </>
                          )}
                          {activeSection === "Company Applied" && (
                            <>
                              <Bar
                                dataKey="companyApplied"
                                fill="#2563EB"
                                name="Company Applied"
                                barSize={30}
                              />
                              <Legend verticalAlign="bottom" height={30} />
                            </>
                          )}
                        </BarChart>
                      </ResponsiveContainer>
                    </div>

                    <div className="w-full md:w-1/4 mt-2 md:mt-0 md:pl-2 flex flex-col space-y-2">
                      <div className="bg-gray-100 rounded-lg p-3 relative cursor-pointer">
                        <p className="text-gray-600 text-xs">Company Views</p>
                        <p className="text-xl font-bold">2,342</p>
                        <p className="text-blue-600 text-xs">
                          This Week <span className="font-bold">6.4%</span> 🔼
                        </p>
                        <div className="absolute top-3 right-3 bg-yellow-100 p-1 rounded-full">
                          <Eye size={16} className="text-yellow-500" />
                        </div>
                      </div>

                      <div className="bg-gray-100 rounded-lg p-3 relative cursor-pointer">
                        <p className="text-gray-600 text-xs">Company Applied</p>
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

              {/* Right Sidebar */}
              <div className="w-1/4 space-y-3">
                <div className="bg-white shadow rounded-lg p-4">
                  <h3 className="text-base font-medium text-gray-600">
                    Company Open
                  </h3>
                  <p className="text-4xl font-bold mt-1 text-gray-900">
                    {companyOpenings}
                  </p>
                  <p className="text-gray-500 text-sm mt-1">Companies Opened</p>
                </div>

                <div className="bg-white shadow rounded-lg p-4">
                  <h3 className="text-base font-medium text-gray-600">
                    Company Summary
                  </h3>
                  <p className="text-4xl font-bold mt-1 text-gray-900">
                    {company.total}
                  </p>
                  <p className="text-gray-500 text-sm mt-1">Company</p>
                  <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden mt-3">
                    <div className="h-full flex">
                      {company.categories.map((category, index) => (
                        <div
                          key={index}
                          className="h-full"
                          style={{
                            width: `${(category.count / company.total) * 100}%`,
                            backgroundColor: category.color,
                          }}
                        />
                      ))}
                    </div>
                  </div>
                  <div className="grid grid-cols-1 gap-1 mt-2">
                    {company.categories.map((category, index) => (
                      <div
                        key={index}
                        className="flex items-center cursor-pointer"
                      >
                        <span
                          className="w-2 h-2 inline-block rounded-sm mr-1"
                          style={{ backgroundColor: category.color }}
                        />
                        <span className="text-gray-600 text-xs">
                          {category.name}: {category.count}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
