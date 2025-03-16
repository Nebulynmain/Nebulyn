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
} from "recharts";

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

  const jobOpenings = 12;

  const applicants = {
    total: 67,
    categories: [
      { name: "Full Time", count: 45, color: "#3B82F6" },
      { name: "Part-Time", count: 24, color: "#10B981" },
      { name: "Remote", count: 22, color: "#06B6D4" },
      { name: "Internship", count: 32, color: "#F59E0B" },
      { name: "Contract", count: 30, color: "#EF4444" },
    ],
  };

  const [activeTab, setActiveTab] = useState("Week");

  // Dynamic Data
  const data = [
    { day: "Mon", jobView: 150, jobApplied: 50 },
    { day: "Tue", jobView: 180, jobApplied: 80 },
    { day: "Wed", jobView: 122, jobApplied: 34 },
    { day: "Thu", jobView: 200, jobApplied: 90 },
    { day: "Fri", jobView: 170, jobApplied: 60 },
    { day: "Sat", jobView: 80, jobApplied: 40 },
    { day: "Sun", jobView: 60, jobApplied: 20 },
  ];

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
            <div className="flex justify-between items-center py-6 px-9">
              <div>
                <h1 className="text-4xl font-semibold text-black-900">
                  Good morning, Maria
                </h1>
                <p className="text-gray-500 mt-2 text-xl">
                  Here is your job listings statistic report from July 19 - July
                  25.
                </p>
              </div>
              <div className="flex items-center border-2 border-gray-300  px-4 py-2 cursor-pointer mr-4">
                <span className="text-gray-700 font-semibold">
                  Jul 19 - Jul 25
                </span>
                <CalendarIcon className="w-4 h-4 text-blue-500 ml-2" />
              </div>
            </div>
            {/*Part 2*/}
            <div className="flex justify-between items-center py-4 px-6">
              {cards.map((card, index) => (
                <div
                  key={index}
                  className={`flex items-center justify-between ${card.color} text-white p-8  w-1/3 h-28 shadow-md mx-2 cursor-pointer`}
                >
                  <div>
                    <p className="text-4xl font-bold">{card.number}</p>
                    <p className="text-base">{card.text}</p>
                  </div>
                  <ChevronRight size={24} />
                </div>
              ))}
            </div>
            {/*Part 3*/}
            <div class="flex p-6">
              <div className="w-3/4 p-4 bg-white">
                <div className="mt-6">
                  {/* Job Statistics Card */}
                  <div className="bg-white shadow-md rounded-lg p-4">
                    {/* Header */}
                    <div className="flex justify-between items-center border-b pb-2">
                      <h2 className="text-gray-800 font-semibold text-lg">
                        Job statistics
                      </h2>
                      <div className="flex space-x-2">
                        {["Week", "Month", "Year"].map((tab) => (
                          <button
                            key={tab}
                            className={`px-3 py-1 text-sm font-medium rounded ${
                              activeTab === tab
                                ? "bg-blue-500 text-white"
                                : "bg-gray-200 text-gray-600"
                            }`}
                            onClick={() => setActiveTab(tab)}
                          >
                            {tab}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Bar Chart */}
                    <div className="w-full h-48 mt-4">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={data}>
                          <XAxis dataKey="day" />
                          <YAxis />
                          <Tooltip />
                          <Bar
                            dataKey="jobView"
                            fill="#FBBF24"
                            name="Job View"
                          />
                          <Bar
                            dataKey="jobApplied"
                            fill="#2563EB"
                            name="Job Applied"
                          />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>

                    {/* Job Views & Applied Stats */}
                    <div className="grid grid-cols-2 gap-4 mt-4">
                      <div className="bg-gray-100 p-4 rounded-lg shadow">
                        <p className="text-gray-600 text-sm">Job Views</p>
                        <p className="text-2xl font-bold">2,342</p>
                        <p className="text-blue-600 text-sm">
                          This Week <span className="font-bold">6.4%</span> 🔼
                        </p>
                      </div>

                      <div className="bg-gray-100 p-4 rounded-lg shadow">
                        <p className="text-gray-600 text-sm">Job Applied</p>
                        <p className="text-2xl font-bold">654</p>
                        <p className="text-red-600 text-sm">
                          This Week <span className="font-bold">0.5%</span> 🔽
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-1/4 p-4">
                {/* Job Open Section */}
                <div className="bg-white shadow-md rounded-lg p-4">
                  <h2 className="text-gray-600 font-semibold">Job Open</h2>
                  <p className="text-3xl font-bold text-gray-900">
                    {jobOpenings}
                  </p>
                  <p className="text-gray-500">Jobs Opened</p>
                </div>

                {/* Applicants Summary Section */}
                <div className="bg-white shadow-md rounded-lg p-4 mt-4">
                  <h2 className="text-gray-600 font-semibold">
                    Applicants Summary
                  </h2>
                  <p className="text-3xl font-bold text-gray-900">
                    {applicants.total}
                  </p>
                  <p className="text-gray-500">Applicants</p>

                  {/* Progress Bar */}
                  <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden my-2">
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
                  <div className="grid grid-cols-2 gap-2">
                    {applicants.categories.map((category, index) => (
                      <div key={index} className="flex items-center">
                        <span
                          className="w-3 h-3 inline-block rounded-full mr-2"
                          style={{ backgroundColor: category.color }}
                        ></span>
                        <span className="text-gray-600 text-sm">
                          {category.name}: {category.count}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            {/*Part 4*/}
            <div className="w-[95%] mx-auto border border-gray-200 rounded-lg overflow-hidden bg-white shadow-sm">
              <div className="flex justify-between items-center py-4 px-6 border-b border-gray-200">
                <h2 className="text-xl font-bold text-gray-800">Job Updates</h2>
                <a href="#" className="text-blue-500 flex items-center ">
                  View All
                  <svg
                    className="w-4 h-4 ml-1"
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

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
                {jobs.map((job) => (
                  <div
                    key={job.id}
                    className="border border-gray-200 rounded-lg overflow-hidden"
                  >
                    <div className="p-4">
                      <div className="flex items-center mb-4">
                        <div
                          className={`w-10 h-10 rounded-md flex items-center justify-center bg-${job.color}-100`}
                        >
                          <img
                            src={job.logo}
                            alt={job.company}
                            className="w-6 h-6"
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

                      <h3 className="font-semibold text-gray-800 mb-1">
                        {job.title}
                      </h3>
                      <p className="text-sm text-gray-500 mb-4">
                        {job.company} • {job.location}
                      </p>

                      <div className="flex flex-wrap gap-2 mb-4">
                        {job.tags.map((tag, index) => (
                          <span
                            key={index}
                            className={`text-xs px-3 py-1 rounded-full ${
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
                        <div className="w-full bg-gray-200 rounded-full h-1.5">
                          <div
                            className={`${getProgressBarColor(
                              job.color
                            )} h-1.5 rounded-full`}
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
