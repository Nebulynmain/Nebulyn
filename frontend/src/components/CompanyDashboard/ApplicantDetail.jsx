import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import {
  ChevronDown,
  Mail,
  Phone,
  Instagram,
  Twitter,
  Globe,
  Star,
  MessageSquare,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const ApplicantDetail = () => {
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("profile");

  const [showReplies, setShowReplies] = useState(false);

  const toggleReplies = () => {
    setShowReplies(!showReplies);
  };

  // Render tab content based on active tab
  const renderTabContent = () => {
    switch (activeTab) {
      case "profile":
        return (
          <>
            {/* Personal Info Section */}
            <div className="mb-10">
              <h2 className="text-xl font-semibold text-gray-800 mb-6">
                Personal Info
              </h2>

              <div className="grid grid-cols-2 gap-8">
                <div>
                  <p className="text-base text-gray-500 mb-2">Full Name</p>
                  <p className="text-lg font-medium">Jerome Bell</p>
                </div>
                <div>
                  <p className="text-base text-gray-500 mb-2">Gender</p>
                  <p className="text-lg font-medium">Male</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-8 mt-6">
                <div>
                  <p className="text-base text-gray-500 mb-2">Date of Birth</p>
                  <p className="text-lg font-medium">
                    March 23, 1995{" "}
                    <span className="text-gray-500">(26 y.o)</span>
                  </p>
                </div>
                <div>
                  <p className="text-base text-gray-500 mb-2">Language</p>
                  <p className="text-lg font-medium">English, French, Bahasa</p>
                </div>
              </div>

              <div className="mt-6">
                <p className="text-base text-gray-500 mb-2">Address</p>
                <p className="text-lg font-medium">4517 Washington Ave.</p>
                <p className="text-lg font-medium">
                  Manchester, Kentucky 39495
                </p>
              </div>
            </div>

            {/* Professional Info Section */}
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-6">
                Professional Info
              </h2>

              <div className="mb-6">
                <p className="text-base text-gray-500 mb-2">About Me</p>
                <p className="text-lg mb-3 leading-relaxed">
                  I'm a product designer + filmmaker currently working remotely
                  at Twitter from beautiful Manchester, United Kingdom. I'm
                  passionate about designing digital products that have a
                  positive impact on the world.
                </p>
                <p className="text-lg leading-relaxed">
                  For 10 years, I've specialized in interface, experience &
                  interaction design as well as working in user research and
                  product strategy for product agencies, big tech companies &
                  start-ups.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-8 mt-6">
                <div>
                  <p className="text-base text-gray-500 mb-2">Current Job</p>
                  <p className="text-lg font-medium">Product Designer</p>
                </div>
                <div>
                  <p className="text-base text-gray-500 mb-2">
                    Experience in Years
                  </p>
                  <p className="text-lg font-medium">4 Years</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-8 mt-6">
                <div>
                  <p className="text-base text-gray-500 mb-2">
                    Highest Qualification Held
                  </p>
                  <p className="text-lg font-medium">
                    Bachelors in Engineering
                  </p>
                </div>
                <div>
                  <p className="text-base text-gray-500 mb-2">Skill set</p>
                  <div className="flex gap-3 flex-wrap">
                    <span className="bg-blue-100 text-blue-600 px-4 py-2 rounded-lg text-sm">
                      Project Management
                    </span>
                    <span className="bg-blue-100 text-blue-600 px-4 py-2 rounded-lg text-sm">
                      Copywriting
                    </span>
                    <span className="bg-blue-100 text-blue-600 px-4 py-2 rounded-lg text-sm">
                      English
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </>
        );

      case "resume":
        return (
          <div className="py-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">Resume</h2>
            <div className="border p-6 rounded-lg text-center">
              <p className="text-lg text-gray-600 mb-4">
                Resume content goes here
              </p>
              <button className="bg-blue-600 text-white px-6 py-3 rounded-lg text-lg cursor-pointer">
                Download Resume
              </button>
            </div>
          </div>
        );

      case "progress":
        return (
          <div className="py-6">
            {/* Header and Rating Button */}
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-medium text-gray-700">
                Current Stage
              </h2>
              <button className="border border-blue-400 text-blue-500 px-4 py-2 rounded flex items-center cursor-pointer">
                <span>Give Rating</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="ml-1"
                >
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </button>
            </div>

            {/* Progress Stages */}
            <div className="flex mb-8 gap-2">
              <div className="flex-1 relative">
                <div className="py-2 px-4 text-center bg-blue-100 text-blue-500 skew-x-[-10deg] cursor-pointer">
                  <span className="inline-block skew-x-[10deg]">In-Review</span>
                </div>
              </div>
              <div className="flex-1 relative">
                <div className="py-2 px-4 text-center bg-blue-100 text-blue-500 skew-x-[-10deg] border-l border-white cursor-pointer">
                  <span className="inline-block skew-x-[10deg]">
                    Shortlisted
                  </span>
                </div>
              </div>
              <div className="flex-1 relative">
                <div className="py-2 px-4 text-center bg-blue-500 text-white font-semibold skew-x-[-10deg] border-l border-white cursor-pointer">
                  <span className="inline-block skew-x-[10deg]">Interview</span>
                </div>
              </div>
              <div className="flex-1 relative">
                <div className="py-2 px-4 text-center bg-[#F8F8FD] text-gray-500 skew-x-[-10deg] border-l border-white cursor-pointer">
                  <span className="inline-block skew-x-[10deg]">
                    Hired / Declined
                  </span>
                </div>
              </div>
            </div>

            {/* Stage Info */}
            <h3 className="text-base font-medium text-gray-700 mb-4">
              Stage Info
            </h3>
            <div className="grid grid-cols-2 gap-6 mb-6">
              <div>
                <p className="text-sm text-gray-500 mb-1">Interview Date</p>
                <p className="text-sm">10 - 13 July 2021</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Interview Status</p>
                <span className="inline-block bg-yellow-100 text-yellow-600 text-xs px-3 py-1 rounded-full">
                  On Progress
                </span>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Interview Location</p>
                <p className="text-sm">Silver Crysta Room, Nomad Office</p>
                <p className="text-sm">3517 W. Gray St. Utica,</p>
                <p className="text-sm">Pennsylvania 57867</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Assigned to</p>
                <div className="flex -space-x-2">
                  <img
                    src="/api/placeholder/32/32"
                    alt="Team member"
                    className="rounded-full border-2 border-white cursor-pointer"
                  />
                  <img
                    src="/api/placeholder/32/32"
                    alt="Team member"
                    className="rounded-full border-2 border-white cursor-pointer"
                  />
                  <img
                    src="/api/placeholder/32/32"
                    alt="Team member"
                    className="rounded-full border-2 border-white cursor-pointer"
                  />
                </div>
              </div>
            </div>

            {/* Move to Next Step Button */}
            <div className="mb-8">
              <button className="bg-[#F8F8FD] border-2 border-blue-500 text-blue-500 px-6 py-2 rounded text-lg font-semibold cursor-pointer">
                Move To Next Step
              </button>
            </div>

            <div className="border-t border-gray-400 text-transparent">.</div>

            {/* Notes Section */}
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-base font-medium text-gray-700">Notes</h3>
              <button className="text-blue-500 flex items-center text-sm cursor-pointer">
                <span className="text-xl mr-1">+</span> Add Notes
              </button>
            </div>

            {/* Notes List with integrated replies */}
            <div className="space-y-4">
              <div className="border rounded-lg p-4">
                <div className="flex">
                  <img
                    src="/api/placeholder/40/40"
                    alt="Maria Kelly"
                    className="w-10 h-10 rounded-full mr-3 cursor-pointer"
                  />
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <h4 className="font-medium">Maria Kelly</h4>
                      <span className="text-xs text-gray-500">
                        10 July, 2021 • 11:30 AM
                      </span>
                    </div>
                    <p className="my-2 text-sm">
                      Please, do an interview stage immediately. The design
                      division needs more new employees now.
                    </p>
                    <button
                      onClick={toggleReplies}
                      className="text-blue-500 text-sm hover:underline focus:outline-none cursor-pointer"
                    >
                      2 Replies
                    </button>

                    {showReplies && (
                      <div className="mt-3 space-y-3 pl-4 border-l-2 border-gray-200">
                        {/* First reply */}
                        <div className="flex">
                          <img
                            src="/api/placeholder/32/32"
                            alt="John Doe"
                            className="w-8 h-8 rounded-full mr-2 cursor-pointer"
                          />
                          <div>
                            <div className="flex items-center">
                              <h5 className="font-medium text-sm">John Doe</h5>
                              <span className="text-xs text-gray-500 ml-2">
                                10 July, 2021 • 12:15 PM
                              </span>
                            </div>
                            <p className="text-sm">
                              I'll start scheduling interviews this week. We
                              have 5 promising candidates.
                            </p>
                          </div>
                        </div>

                        {/* Second reply */}
                        <div className="flex">
                          <img
                            src="/api/placeholder/32/32"
                            alt="Sarah Chen"
                            className="w-8 h-8 rounded-full mr-2 cursor-pointer"
                          />
                          <div>
                            <div className="flex items-center">
                              <h5 className="font-medium text-sm">
                                Sarah Chen
                              </h5>
                              <span className="text-xs text-gray-500 ml-2">
                                10 July, 2021 • 2:45 PM
                              </span>
                            </div>
                            <p className="text-sm">
                              I've prepared the interview questions and
                              evaluation criteria. Let me know if you need
                              anything else.
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case "schedule":
        return (
          <div className="">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-medium text-gray-800">
                Interview List
              </h2>
              <button className="flex items-center text-blue-500 font-medium cursor-pointer">
                <span className="mr-1">+</span>
                Add Schedule Interview
              </button>
            </div>

            <div className="mb-4">
              <div className="text-sm text-gray-500 py-2">
                Tomorrow - 10 July, 2021
              </div>

              <div className="flex items-center border rounded-md p-4">
                <div className="flex-shrink-0 mr-4">
                  <img
                    src="/api/placeholder/40/40"
                    alt="Kathryn Murphy"
                    className="w-10 h-10 rounded-full bg-gray-200 cursor-pointer"
                  />
                </div>

                <div className="flex-grow">
                  <div className="flex flex-col sm:flex-row sm:justify-between">
                    <div>
                      <h3 className="font-medium text-gray-900">
                        Kathryn Murphy
                      </h3>
                      <p className="text-sm text-gray-500">Written Test</p>
                    </div>

                    <div className="mt-2 sm:mt-0 text-sm text-gray-500">
                      <p>10:00 AM - 11:30 AM</p>
                      <p>Silver Crysta Room, Nomad</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center ml-4">
                  <button className="flex items-center border-2 border-blue-400 rounded px-3 py-1 mr-2 text-blue-500 cursor-pointer">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 mr-1"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                    </svg>
                    Add Feedback
                  </button>

                  <button className="text-black-400 cursor-pointer">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            <div className="mb-4">
              <div className="text-sm text-gray-500 py-2">11 July, 2021</div>

              <div className="flex items-center border rounded-md p-4">
                <div className="flex-shrink-0 mr-4">
                  <img
                    src="/api/placeholder/40/40"
                    alt="Jenny Wilson"
                    className="w-10 h-10 rounded-full bg-gray-200 cursor-pointer"
                  />
                </div>

                <div className="flex-grow">
                  <div className="flex flex-col sm:flex-row sm:justify-between">
                    <div>
                      <h3 className="font-medium text-gray-900">
                        Jenny Wilson
                      </h3>
                      <p className="text-sm text-gray-500">Written Test 2</p>
                    </div>

                    <div className="mt-2 sm:mt-0 text-sm text-gray-500">
                      <p>10:00 AM - 11:00 AM</p>
                      <p>Silver Crysta Room, Nomad</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center ml-4">
                  <button className="flex items-center border-2 border-blue-400 rounded px-3 py-1 mr-2 text-blue-500 cursor-pointer">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 mr-1"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                    </svg>
                    Add Feedback
                  </button>

                  <button className="text-black-400 cursor-pointer">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            <div className="mb-4">
              <div className="text-sm text-gray-500 py-2">12 July, 2021</div>

              <div className="flex items-center border rounded-md p-4">
                <div className="flex-shrink-0 mr-4">
                  <img
                    src="/api/placeholder/40/40"
                    alt="Thad Eddings"
                    className="w-10 h-10 rounded-full bg-gray-200 cursor-pointer"
                  />
                </div>

                <div className="flex-grow">
                  <div className="flex flex-col sm:flex-row sm:justify-between">
                    <div>
                      <h3 className="font-medium text-gray-900">
                        Thad Eddings
                      </h3>
                      <p className="text-sm text-gray-500">Skill Test</p>
                    </div>

                    <div className="mt-2 sm:mt-0 text-sm text-gray-500">
                      <p>10:00 AM - 11:00 AM</p>
                      <p>Silver Crysta Room, Nomad</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center ml-4">
                  <button className="flex items-center border-2 border-blue-400 rounded px-3 py-1 mr-2 text-blue-500 cursor-pointer">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 mr-1"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                    </svg>
                    Add Feedback
                  </button>

                  <button className="text-black-400 cursor-pointer">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            <div className="mb-4">
              <div className="text-sm text-gray-500 py-2">13 July, 2021</div>

              <div className="flex items-center border rounded-md p-4">
                <div className="flex-shrink-0 mr-4">
                  <img
                    src="/api/placeholder/40/40"
                    alt="Thad Eddings"
                    className="w-10 h-10 rounded-full bg-gray-200 cursor-pointer"
                  />
                </div>

                <div className="flex-grow">
                  <div className="flex flex-col sm:flex-row sm:justify-between">
                    <div>
                      <h3 className="font-medium text-gray-900">
                        Thad Eddings
                      </h3>
                      <p className="text-sm text-gray-500">Final Test</p>
                    </div>

                    <div className="mt-2 sm:mt-0 text-sm text-gray-500">
                      <p>10:00 AM - 11:00 AM</p>
                      <p>Silver Crysta Room, Nomad</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center ml-4">
                  <button className="flex items-center border-2 border-blue-400 rounded px-3 py-1 mr-2 text-blue-500 cursor-pointer">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 mr-1"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                    </svg>
                    Add Feedback
                  </button>

                  <button className="text-black-400 cursor-pointer">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return <div className="text-lg font-medium">Tab content not found</div>;
    }
  };

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
              {/* Back Button and Title */}
              <div className="flex items-center space-x-2">
                <button
                  className="text-gray-700 text-4xl font-bold mb-2 cursor-pointer"
                  onClick={() => navigate("/applicants")}
                >
                  ←
                </button>
                <h1
                  className="text-3xl font-bold text-gray-900 cursor-pointer"
                  onClick={() => navigate("/applicants")}
                >
                  Applicant Details
                </h1>
              </div>

              {/* More Action Button */}
              <button className="border border-blue-500 text-blue-500 px-4 py-2 rounded-md flex items-center space-x-1 cursor-pointer">
                <ChevronDown size={16} />
                <span>More Action</span>
              </button>
            </div>
            {/*Part 2*/}
            <div class="flex p-6">
              <div className="w-full max-w-xs bg-white border border-gray-400 p-4">
                {/* Profile Header */}
                <div className="flex flex-col items-center mb-4">
                  <img
                    src="/api/placeholder/80/80"
                    alt="Profile"
                    className="w-16 h-16 rounded-full object-cover mb-2"
                  />
                  <h2 className="text-xl font-bold text-gray-800">
                    Jerome Bell
                  </h2>
                  <p className="text-gray-500 mb-1">Product Designer</p>
                  <div className="flex items-center">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="ml-1 text-gray-700">4.0</span>
                  </div>
                </div>

                {/* Job Details */}
                <div className="bg-[#F8F8FD] rounded p-3 mb-4">
                  {/* Applied Info */}
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-sm font-medium text-indigo-600">
                      Applied Jobs
                    </span>
                    <span className="text-sm text-gray-500">2 days ago</span>
                  </div>
                  <div className="border-t border-gray-300"></div>
                  <h3 className="font-medium text-gray-800 mb-1">
                    Product Development
                  </h3>
                  <div className="flex text-sm text-gray-500">
                    <span>Marketing</span>
                    <span className="mx-2">•</span>
                    <span>Full-Time</span>
                  </div>
                </div>

                {/* Stage */}
                <div className="bg-[#F8F8FD] p-3 mb-4 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-700">
                      Stage
                    </span>
                    <div className="flex items-center">
                      <span className="w-2 h-2 bg-blue-500 rounded-full mr-1"></span>
                      <span className="text-sm text-blue-500">Interview</span>
                    </div>
                  </div>
                  <div className="flex w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div className="w-1/4 bg-blue-500"></div>
                    <div className="w-1/4 bg-blue-500 border-l border-white"></div>
                    <div className="w-1/4 bg-blue-500 border-l border-white"></div>
                    <div className="w-1/4 bg-gray-300 border-l border-white"></div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2 mb-4">
                  <button className="flex-1 py-2 px-4 bg-white border-2 border-blue-500 text-blue-500 rounded font-medium hover:bg-blue-50 cursor-pointer">
                    Schedule Interview
                  </button>
                  <button className="p-2 border-2 border-blue-500 rounded-lg hover:bg-blue-50 cursor-pointer">
                    <MessageSquare className="text-blue-500" size={20} />
                  </button>
                </div>

                <div className="border-b border-gray-300 text-transparent mb-5">
                  .
                </div>

                {/* Contact */}
                <div>
                  <h3 className="font-semibold text-gray-900 mb-4 text-lg">
                    Contact
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <Mail className="w-5 h-5 text-gray-500" />
                      <div>
                        <span className="text-sm text-gray-500">Email</span>
                        <a
                          href="mailto:jeromeBell45@email.com"
                          className="block text-sm font-medium text-gray-700 hover:text-blue-500 cursor-pointer"
                        >
                          jeromeBell45@email.com
                        </a>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      <Phone className="w-5 h-5 text-gray-500" />
                      <div>
                        <span className="text-sm text-gray-500">Phone</span>
                        <span className="block text-sm font-medium text-gray-700">
                          +44 1245 572 135
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      <Instagram className="w-5 h-5 text-gray-500" />
                      <div>
                        <span className="text-sm text-gray-500">Instagram</span>
                        <a
                          href="https://instagram.com/jeromebell"
                          className="block text-sm font-medium text-blue-500 hover:underline cursor-pointer"
                        >
                          instagram.com/jeromebell
                        </a>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      <Twitter className="w-5 h-5 text-gray-500" />
                      <div>
                        <span className="text-sm text-gray-500">Twitter</span>
                        <a
                          href="https://twitter.com/jeromebell"
                          className="block text-sm font-medium text-blue-500 hover:underline cursor-pointer"
                        >
                          twitter.com/jeromebell
                        </a>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      <Globe className="w-5 h-5 text-gray-500" />
                      <div>
                        <span className="text-sm text-gray-500">Website</span>
                        <a
                          href="https://www.jeromebell.com"
                          className="block text-sm font-medium text-blue-500 hover:underline cursor-pointer"
                        >
                          www.jeromebell.com
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-4/5 p-4 border border-gray-400 ml-6">
                {/* Tabs */}
                <div className="flex border-b">
                  <button
                    className={`px-6 py-3 text-lg font-semibold cursor-pointer ${
                      activeTab === "profile"
                        ? "text-blue-600 border-b-4 border-blue-600"
                        : "text-gray-600"
                    }`}
                    onClick={() => setActiveTab("profile")}
                  >
                    Applicant Profile
                  </button>
                  <button
                    className={`px-6 py-3 text-lg font-semibold cursor-pointer ${
                      activeTab === "resume"
                        ? "text-blue-600 border-b-4 border-blue-600"
                        : "text-gray-600"
                    }`}
                    onClick={() => setActiveTab("resume")}
                  >
                    Resume
                  </button>
                  <button
                    className={`px-6 py-3 text-lg font-semibold cursor-pointer ${
                      activeTab === "progress"
                        ? "text-blue-600 border-b-4 border-blue-600"
                        : "text-gray-600"
                    }`}
                    onClick={() => setActiveTab("progress")}
                  >
                    Hiring Progress
                  </button>
                  <button
                    className={`px-6 py-3 text-lg font-semibold cursor-pointer ${
                      activeTab === "schedule"
                        ? "text-blue-600 border-b-4 border-blue-600"
                        : "text-gray-600"
                    }`}
                    onClick={() => setActiveTab("schedule")}
                  >
                    Interview Schedule
                  </button>
                </div>

                {/* Content */}
                <div className="p-8 text-lg">{renderTabContent()}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplicantDetail;
