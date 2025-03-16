import React, { useState, useEffect } from "react";
import { CalendarIcon } from "lucide-react";
import Sidebar from "./Sidebar";
import Header from "./Header";

import { ChevronRight, Filter, ChevronLeft } from "lucide-react";

import { useNavigate } from "react-router-dom";

const jobData = [
  {
    role: "Social Media Assistant",
    status: "Live",
    datePosted: "20 May 2020",
    dueDate: "24 May 2020",
    jobType: "Fulltime",
    applicants: 19,
    needs: "4/11",
  },
  {
    role: "Senior Designer",
    status: "Live",
    datePosted: "16 May 2020",
    dueDate: "24 May 2020",
    jobType: "Fulltime",
    applicants: 1234,
    needs: "0/20",
  },
  {
    role: "Visual Designer",
    status: "Live",
    datePosted: "15 May 2020",
    dueDate: "24 May 2020",
    jobType: "Freelance",
    applicants: 2435,
    needs: "1/5",
  },
  {
    role: "Data Science",
    status: "Closed",
    datePosted: "13 May 2020",
    dueDate: "24 May 2020",
    jobType: "Freelance",
    applicants: 6234,
    needs: "10/10",
  },
  {
    role: "Kotlin Developer",
    status: "Closed",
    datePosted: "12 May 2020",
    dueDate: "24 May 2020",
    jobType: "Fulltime",
    applicants: 12,
    needs: "20/20",
  },
  {
    role: "React Developer",
    status: "Closed",
    datePosted: "11 May 2020",
    dueDate: "24 May 2020",
    jobType: "Fulltime",
    applicants: 14,
    needs: "10/10",
  },
  {
    role: "Kotlin Developer",
    status: "Closed",
    datePosted: "12 May 2020",
    dueDate: "24 May 2020",
    jobType: "Fulltime",
    applicants: 12,
    needs: "20/20",
  },
];

const JobListing = () => {
  const navigate = useNavigate();

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
                  Job Listing
                </h1>
                <p className="text-gray-500 mt-2 text-xl">
                  Here is your jobs listing status from July 19 - July 25.
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
            <div className="bg-white border border-gray-400 overflow-hidden py-6 px-8 w-[95%] mx-auto">
              <div className="flex justify-between items-center pb-6 border-b-2 border-gray-400">
                <h2 className="text-2xl font-bold text-gray-800">Job List</h2>
                <button className="flex items-center text-gray-700 hover:text-gray-900 bg-gray-100 px-4 py-2 rounded-md transition-colors">
                  <Filter className="mr-3 h-6 w-6" />
                  <span className="font-medium">Filters</span>
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full mt-4">
                  <thead className=" border-b ">
                    <tr>
                      {[
                        "Roles",
                        "Status",
                        "Date Posted",
                        "Due Date",
                        "Job Type",
                        "Applicants",
                        "Needs",
                      ].map((header) => (
                        <th
                          key={header}
                          className="p-4 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider"
                        >
                          {header}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {jobData.map((job, index) => (
                      <tr
                        key={index}
                        className="hover:bg-gray-50 transition-colors"
                      >
                        <td className="p-4 whitespace-nowrap font-medium text-gray-900 text-base">
                          {job.role}
                        </td>
                        <td className="p-4">
                          <span
                            className={`px-3 py-1 rounded-full text-sm font-medium ${
                              job.status === "Live"
                                ? "bg-green-100 text-green-800"
                                : "bg-red-100 text-red-800"
                            }`}
                          >
                            {job.status}
                          </span>
                        </td>
                        <td className="p-4 text-sm text-gray-600">
                          {job.datePosted}
                        </td>
                        <td className="p-4 text-sm text-gray-600">
                          {job.dueDate}
                        </td>
                        <td className="p-4">
                          <span
                            className={`px-3 py-1 rounded-full text-sm font-medium ${
                              job.jobType === "Fulltime"
                                ? "bg-blue-100 text-blue-800"
                                : "bg-yellow-100 text-yellow-800"
                            }`}
                          >
                            {job.jobType}
                          </span>
                        </td>
                        <td className="p-4 text-sm text-gray-600">
                          {job.applicants}
                        </td>
                        <td className="p-4 text-sm text-gray-600">
                          {job.needs}
                        </td>
                        <td className="p-4">
                          <span
                            className="cursor-pointer"
                            onClick={() => navigate("/job-applicant")}
                          >
                            ...
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="flex justify-between items-center p-6 border-t border-gray-100">
                <div className="text-sm text-gray-600 flex items-center">
                  View
                  <select className="mx-3 border rounded text-sm p-2 bg-white">
                    <option>10</option>
                    <option>25</option>
                    <option>50</option>
                  </select>
                  Applicants per page
                </div>
                <div className="flex items-center space-x-3">
                  <button className="px-3 py-2  text-sm text-gray-700 hover:bg-gray-100 flex items-center">
                    <ChevronLeft className="h-4 w-4 mr-2" />
                  </button>
                  <span className="text-sm text-gray-700 px-3 py-1 bg-blue-400 rounded">
                    1
                  </span>
                  <button className="px-3 py-2  text-sm text-gray-700 hover:bg-gray-100 flex items-center">
                    <ChevronRight className="h-4 w-4 ml-2" />
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

export default JobListing;
