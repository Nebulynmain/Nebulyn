import React, { useState } from "react";
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
  ChevronLeft,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const StudentProfile = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("profile");
  const [showReplies, setShowReplies] = useState(false);

  const toggleReplies = () => {
    setShowReplies(!showReplies);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "profile":
        return (
          <>
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">
                Personal Info
              </h2>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Full Name</p>
                  <p className="text-base font-medium">Jerome Bell</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Gender</p>
                  <p className="text-base font-medium">Male</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Date of Birth</p>
                  <p className="text-base font-medium">
                    March 23, 1995{" "}
                    <span className="text-gray-500">(26 y.o)</span>
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Language</p>
                  <p className="text-base font-medium">
                    English, French, Bahasa
                  </p>
                </div>
              </div>
              <div className="mt-4">
                <p className="text-sm text-gray-500 mb-1">Address</p>
                <p className="text-base font-medium">4517 Washington Ave.</p>
                <p className="text-base font-medium">
                  Manchester, Kentucky 39495
                </p>
              </div>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-gray-800 mb-4">
                Professional Info
              </h2>
              <div className="mb-4">
                <p className="text-sm text-gray-500 mb-1">About Me</p>
                <p className="text-base mb-2 leading-relaxed">
                  I'm a product designer + filmmaker currently working remotely
                  at Twitter from beautiful Manchester, United Kingdom.
                </p>
                <p className="text-base leading-relaxed">
                  For 10 years, I've specialized in interface, experience &
                  interaction design as well as working in user research and
                  product strategy.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-6 mt-4">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Current Job</p>
                  <p className="text-base font-medium">Product Designer</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Experience</p>
                  <p className="text-base font-medium">4 Years</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">
                    Highest Qualification
                  </p>
                  <p className="text-base font-medium">
                    Bachelors in Engineering
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Skill set</p>
                  <div className="flex gap-2 flex-wrap">
                    <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-md text-xs">
                      Project Management
                    </span>
                    <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-md text-xs">
                      Copywriting
                    </span>
                    <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-md text-xs">
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
          <div className="py-4">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Resume</h2>
            <div className="border p-4 rounded-md text-center">
              <p className="text-base text-gray-600 mb-3">
                Resume content goes here
              </p>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-md text-base cursor-pointer hover:bg-blue-700">
                Download Resume
              </button>
            </div>
          </div>
        );

      case "progress":
        return (
          <div className="py-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-base font-medium text-gray-700">
                Current Stage
              </h2>
              <button className="border border-blue-400 text-blue-500 px-3 py-1 rounded flex items-center cursor-pointer hover:bg-blue-50">
                <span className="text-sm">Give Rating</span>
                <ChevronDown className="ml-1 h-4 w-4" />
              </button>
            </div>

            <div className="flex mb-6 gap-1">
              {["In-Review", "Shortlisted", "Interview", "Hired/Declined"].map(
                (stage, index) => (
                  <div key={stage} className="flex-1 relative">
                    <div
                      className={`py-1 px-2 text-center text-xs skew-x-[-10deg] cursor-pointer ${
                        stage === "Interview"
                          ? "bg-blue-500 text-white font-medium"
                          : index < 2
                          ? "bg-blue-100 text-blue-500"
                          : "bg-gray-100 text-gray-500"
                      } ${index > 0 && "border-l border-white"}`}
                    >
                      <span className="inline-block skew-x-[10deg]">
                        {stage}
                      </span>
                    </div>
                  </div>
                )
              )}
            </div>

            <h3 className="text-base font-medium text-gray-700 mb-3">
              Stage Info
            </h3>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <p className="text-xs text-gray-500 mb-1">Interview Date</p>
                <p className="text-xs">10 - 13 July 2021</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">Interview Status</p>
                <span className="inline-block bg-yellow-100 text-yellow-600 text-xs px-2 py-0.5 rounded-full">
                  On Progress
                </span>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">Interview Location</p>
                <p className="text-xs">Silver Crysta Room, Nomad Office</p>
                <p className="text-xs">3517 W. Gray St. Utica,</p>
                <p className="text-xs">Pennsylvania 57867</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">Assigned to</p>
                <div className="flex -space-x-1">
                  {[1, 2, 3].map((i) => (
                    <img
                      key={i}
                      src={`https://randomuser.me/api/portraits/men/${
                        i + 20
                      }.jpg`}
                      alt="Team member"
                      className="w-6 h-6 rounded-full border-2 border-white cursor-pointer"
                    />
                  ))}
                </div>
              </div>
            </div>

            <button className="bg-gray-50 border-2 border-blue-500 text-blue-500 px-4 py-1 rounded text-sm font-medium mb-6 cursor-pointer hover:bg-blue-50">
              Move To Next Step
            </button>

            <div className="border-t border-gray-300 mb-4"></div>

            <div className="flex justify-between items-center mb-3">
              <h3 className="text-base font-medium text-gray-700">Notes</h3>
              <button className="text-blue-500 flex items-center text-xs cursor-pointer hover:underline">
                <span className="text-lg mr-0.5">+</span> Add Notes
              </button>
            </div>

            <div className="space-y-3">
              <div className="border rounded-md p-3">
                <div className="flex">
                  <img
                    src="https://randomuser.me/api/portraits/women/44.jpg"
                    alt="Maria Kelly"
                    className="w-8 h-8 rounded-full mr-2 cursor-pointer"
                  />
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <h4 className="font-medium text-sm">Maria Kelly</h4>
                      <span className="text-xs text-gray-500">
                        10 July, 2021 • 11:30 AM
                      </span>
                    </div>
                    <p className="my-1 text-xs">
                      Please, do an interview stage immediately. The design
                      division needs more new employees now.
                    </p>
                    <button
                      onClick={toggleReplies}
                      className="text-blue-500 text-xs hover:underline cursor-pointer"
                    >
                      {showReplies ? "Hide" : "2"} Replies
                    </button>

                    {showReplies && (
                      <div className="mt-2 space-y-2 pl-3 border-l-2 border-gray-200">
                        {[
                          {
                            name: "John Doe",
                            date: "10 July, 2021 • 12:15 PM",
                            text: "I'll start scheduling interviews this week. We have 5 promising candidates.",
                          },
                          {
                            name: "Sarah Chen",
                            date: "10 July, 2021 • 2:45 PM",
                            text: "I've prepared the interview questions and evaluation criteria.",
                          },
                        ].map((reply, i) => (
                          <div key={i} className="flex">
                            <img
                              src={`https://randomuser.me/api/portraits/${
                                i % 2 === 0 ? "men" : "women"
                              }/${i + 30}.jpg`}
                              alt={reply.name}
                              className="w-6 h-6 rounded-full mr-1.5 cursor-pointer"
                            />
                            <div>
                              <div className="flex items-center">
                                <h5 className="font-medium text-xs">
                                  {reply.name}
                                </h5>
                                <span className="text-2xs text-gray-500 ml-1.5">
                                  {reply.date}
                                </span>
                              </div>
                              <p className="text-xs">{reply.text}</p>
                            </div>
                          </div>
                        ))}
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
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-lg font-medium text-gray-800">
                Interview List
              </h2>
              <button className="flex items-center text-blue-500 text-sm font-medium cursor-pointer hover:underline">
                <span className="mr-0.5">+</span>
                Add Schedule
              </button>
            </div>

            {[
              {
                date: "Tomorrow - 10 July, 2021",
                name: "Kathryn Murphy",
                type: "Written Test",
                time: "10:00 AM - 11:30 AM",
              },
              {
                date: "11 July, 2021",
                name: "Jenny Wilson",
                type: "Written Test 2",
                time: "10:00 AM - 11:00 AM",
              },
              {
                date: "12 July, 2021",
                name: "Thad Eddings",
                type: "Skill Test",
                time: "10:00 AM - 11:00 AM",
              },
              {
                date: "13 July, 2021",
                name: "Thad Eddings",
                type: "Final Test",
                time: "10:00 AM - 11:00 AM",
              },
            ].map((item, index) => (
              <div key={index} className="mb-3">
                <div className="text-xs text-gray-500 py-1">{item.date}</div>
                <div className="flex items-center border rounded-md p-3">
                  <div className="flex-shrink-0 mr-3">
                    <img
                      src={`https://randomuser.me/api/portraits/${
                        index % 2 === 0 ? "women" : "men"
                      }/${index + 40}.jpg`}
                      alt={item.name}
                      className="w-8 h-8 rounded-full cursor-pointer"
                    />
                  </div>
                  <div className="flex-grow">
                    <div className="flex flex-col sm:flex-row sm:justify-between">
                      <div>
                        <h3 className="text-sm font-medium text-gray-900">
                          {item.name}
                        </h3>
                        <p className="text-xs text-gray-500">{item.type}</p>
                      </div>
                      <div className="mt-1 sm:mt-0 text-xs text-gray-500">
                        <p>{item.time}</p>
                        <p>Silver Crysta Room, Nomad</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center ml-2">
                    <button className="flex items-center border border-blue-400 rounded px-2 py-0.5 mr-1 text-blue-500 text-xs cursor-pointer hover:bg-blue-50">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-3 w-3 mr-0.5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                      </svg>
                      Feedback
                    </button>
                    <button className="text-gray-400 hover:text-gray-600 cursor-pointer">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
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
            ))}
          </div>
        );

      default:
        return (
          <div className="text-base font-medium">Tab content not found</div>
        );
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
          <div className="p-4">
            <div className="flex justify-between items-center pb-4">
              <div className="flex items-center space-x-2">
                <button
                  className="text-gray-700 text-2xl font-bold cursor-pointer hover:text-blue-600"
                  onClick={() => navigate("/browse-students")}
                >
                  <ChevronLeft size={24} />
                </button>
                <h1
                  className="text-xl font-bold text-gray-900 cursor-pointer hover:text-blue-600"
                  onClick={() => navigate("/browse-students")}
                >
                  Student Details
                </h1>
              </div>
              <button className="border border-blue-500 text-blue-500 px-3 py-1 rounded-md flex items-center space-x-1 text-sm cursor-pointer hover:bg-blue-50">
                <ChevronDown size={14} />
                <span>More Action</span>
              </button>
            </div>

            <div className="flex flex-col lg:flex-row gap-4">
              <div className="w-full lg:w-72 bg-white border border-gray-300 rounded-lg p-4">
                <div className="flex flex-col items-center mb-3">
                  <img
                    src="https://randomuser.me/api/portraits/men/7.jpg"
                    alt="Profile"
                    className="w-14 h-14 rounded-full object-cover mb-2 cursor-pointer"
                  />
                  <h2 className="text-lg font-bold text-gray-800 cursor-pointer hover:text-blue-600">
                    Jerome Bell
                  </h2>
                  <p className="text-sm text-gray-500 mb-1">Product Designer</p>
                  <div className="flex items-center">
                    <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                    <span className="ml-0.5 text-sm text-gray-700">4.0</span>
                  </div>
                </div>

                <div className="bg-gray-50 rounded p-2 mb-3">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-medium text-indigo-600">
                      Applied Jobs
                    </span>
                    <span className="text-xs text-gray-500">2 days ago</span>
                  </div>
                  <div className="border-t border-gray-300 mb-2"></div>
                  <h3 className="font-medium text-sm text-gray-800 mb-0.5">
                    Product Development
                  </h3>
                  <div className="flex text-xs text-gray-500">
                    <span>Marketing</span>
                    <span className="mx-1">•</span>
                    <span>Full-Time</span>
                  </div>
                </div>

                <div className="bg-gray-50 p-2 mb-3 rounded-lg">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs font-medium text-gray-700">
                      Stage
                    </span>
                    <div className="flex items-center">
                      <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-1"></span>
                      <span className="text-xs text-blue-500">Interview</span>
                    </div>
                  </div>
                  <div className="flex w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
                    {[1, 2, 3, 4].map((i) => (
                      <div
                        key={i}
                        className={`w-1/4 ${
                          i < 4 ? "bg-blue-500" : "bg-gray-300"
                        } ${i > 1 && "border-l border-white"}`}
                      ></div>
                    ))}
                  </div>
                </div>

                <div className="flex gap-2 mb-4">
                  <button className="flex-1 py-1.5 px-3 bg-white border border-blue-500 text-blue-500 rounded text-sm font-medium hover:bg-blue-50 cursor-pointer">
                    Schedule
                  </button>
                  <button className="p-1.5 border border-blue-500 rounded-md hover:bg-blue-50 cursor-pointer">
                    <MessageSquare className="text-blue-500" size={18} />
                  </button>
                </div>

                <div className="border-t border-gray-300 mb-3"></div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-3 text-sm">
                    Contact
                  </h3>
                  <div className="space-y-3">
                    {[
                      {
                        icon: Mail,
                        label: "Email",
                        value: "jeromeBell45@email.com",
                        href: "mailto:jeromeBell45@email.com",
                      },
                      {
                        icon: Phone,
                        label: "Phone",
                        value: "+44 1245 572 135",
                      },
                      {
                        icon: Instagram,
                        label: "Instagram",
                        value: "instagram.com/jeromebell",
                        href: "https://instagram.com/jeromebell",
                      },
                      {
                        icon: Twitter,
                        label: "Twitter",
                        value: "twitter.com/jeromebell",
                        href: "https://twitter.com/jeromebell",
                      },
                      {
                        icon: Globe,
                        label: "Website",
                        value: "www.jeromebell.com",
                        href: "https://www.jeromebell.com",
                      },
                    ].map((item, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <item.icon className="w-4 h-4 text-gray-500" />
                        <div>
                          <span className="text-xs text-gray-500">
                            {item.label}
                          </span>
                          {item.href ? (
                            <a
                              href={item.href}
                              className="block text-xs font-medium text-blue-500 hover:underline cursor-pointer"
                            >
                              {item.value}
                            </a>
                          ) : (
                            <span className="block text-xs font-medium text-gray-700">
                              {item.value}
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex-1 bg-white border border-gray-300 rounded-lg">
                <div className="flex border-b overflow-x-auto">
                  {[
                    { id: "profile", label: "Student Profile" },
                    { id: "resume", label: "Resume" },
                    { id: "progress", label: "Progress" },
                    { id: "schedule", label: "Schedule" },
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      className={`px-4 py-2 text-sm font-medium cursor-pointer whitespace-nowrap ${
                        activeTab === tab.id
                          ? "text-blue-600 border-b-2 border-blue-600"
                          : "text-gray-600 hover:text-gray-800"
                      }`}
                      onClick={() => setActiveTab(tab.id)}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>

                <div className="p-4 text-sm">{renderTabContent()}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentProfile;
