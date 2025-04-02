import React from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { FiSearch } from "react-icons/fi";
import { ThumbsUp, ThumbsDown } from "lucide-react";

const CompanyHelp = () => {
  const articlesData = [
    {
      title: "What is My Applications?",
      content:
        "My Applications is a way for you to track jobs as you move through the application process. Depending on the job you applied to, you may also receive notifications indicating that an application has been actioned by an employer.",
    },
    {
      title: "How to Apply for Jobs?",
      content:
        "You can apply for jobs by searching for open positions, reading the job descriptions carefully, and submitting your application through the platform. Make sure your resume is updated before applying.",
    },
    {
      title: "What Happens After Applying?",
      content:
        "Once you apply for a job, the employer reviews your application. You may receive interview requests or updates on your application status through email or notifications.",
    },
  ];
  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex flex-row flex-grow">
        <div className="h-screen sticky top-0">
          <Sidebar />
        </div>
        <div className="flex-grow transition-all">
          <div className="flex-grow overflow-y-auto">
            <Header />
            <div className="p-2 flex min-h-screen">
              {/* Sidebar */}
              <div className="w-1/4 p-2 bg-white border-r border-gray-200">
                {/* Search Box */}
                <div className="mb-2">
                  <p className="font-semibold text-sm text-gray-500 mb-4">
                    Type your question or search keyword
                  </p>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search"
                      className="w-full px-3 py-1 border border-gray-300 rounded-sm text-gray-700 text-xs pl-8"
                    />
                    <FiSearch className="absolute left-2 top-2 text-gray-400 cursor-pointer w-3 h-3" />
                  </div>
                </div>
                {/* Menu Items */}
                <ul className="space-y-3 mt-3">
                  <li className="font-semibold text-blue-600 mt-4 cursor-pointer text-xs">
                    Getting Started
                  </li>
                  <li className="border-b border-gray-400 pb-2 cursor-pointer text-xs">
                    My Profile
                  </li>
                  <li className="border-b border-gray-400 pb-2 cursor-pointer text-xs">
                    Applying for a job
                  </li>
                  <li className="border-b border-gray-400 pb-2 cursor-pointer text-xs">
                    Job Search Tips
                  </li>
                  <li className="cursor-pointer text-xs">Job Alerts</li>
                </ul>
                {/* Contact Section */}
                <div className="absolute bottom-3 flex items-center z-10 w-[17.5%]">
                  <div className="p-3 bg-[#3B8BEB] text-white rounded-lg w-full shadow-md relative h-[30%] flex flex-col justify-between">
                    <div>
                      <p className="font-semibold text-xs leading-tight">
                        Didn't find what you were looking for?
                      </p>
                      <p className="text-xs mt-1">
                        Contact our customer service
                      </p>
                    </div>
                    <button className="w-[50%] mt-2 bg-white text-[#3B8BEB] py-1 px-2 rounded-md cursor-pointer font-semibold text-xs shadow">
                      Contact Us
                    </button>
                  </div>
                </div>
              </div>

              {/* Main Content */}
              <div className="w-3/4 p-3">
                {/* Sorting Section */}
                <div className="flex items-center justify-start mb-3">
                  <span className="font-medium text-gray-700 mr-2 text-xs">
                    Sort by:
                  </span>
                  <select className="border p-1 rounded-md text-gray-700 border-gray-400 cursor-pointer text-xs">
                    <option>Most relevant</option>
                  </select>
                </div>

                {/* Articles */}
                <div className="space-y-3">
                  {articlesData.map((article, index) => (
                    <div
                      key={index}
                      className="bg-white border border-gray-300 p-3 rounded-sm shadow-sm relative"
                    >
                      {/* Title and Three-Dot Menu */}
                      <div className="flex justify-between items-center">
                        <h3 className="font-bold text-base text-gray-900">
                          {article.title}
                        </h3>
                        <button className="text-black-500 hover:text-gray-700 -mt-1 cursor-pointer">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="w-4 h-4"
                          >
                            <path
                              fillRule="evenodd"
                              d="M6 12a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm7.5 0a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0ZM21 12a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </button>
                      </div>

                      {/* Content */}
                      <p className="text-gray-600 text-xs mt-1">
                        {article.content}
                      </p>
                      <div className="border-b border-gray-400 mt-2"></div>

                      {/* Feedback Buttons */}
                      <div className="mt-2 flex items-center space-x-2">
                        <span className="text-gray-700 text-xs">
                          Was this article helpful?
                        </span>
                        <button className="border px-2 py-0.5 rounded-sm bg-white border-blue-400 text-gray-700 hover:bg-gray-100 flex items-center space-x-1 cursor-pointer">
                          <ThumbsUp
                            size={12}
                            className="text-blue-400 font-bold"
                          />
                          <span className="text-blue-400 font-bold text-xs">
                            Yes
                          </span>
                        </button>
                        <button className="border px-2 py-0.5 rounded-sm bg-white border-blue-400 text-gray-700 hover:bg-gray-100 flex items-center space-x-1 cursor-pointer">
                          <ThumbsDown
                            size={12}
                            className="text-blue-400 font-bold"
                          />
                          <span className="text-blue-400 font-bold text-xs">
                            No
                          </span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyHelp;
