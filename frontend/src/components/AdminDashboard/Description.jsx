import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../../App";
import {
  Stethoscope,
  Umbrella,
  GraduationCap,
  Users,
  Laptop,
  Bus,
  Heart,
  Loader,
  AlertTriangle,
  CheckCircle,
  XCircle,
  X,
} from "lucide-react";

const perksData = [
  {
    icon: <Stethoscope size={40} className="text-blue-500" />,
    title: "Full Healthcare",
    description:
      "We believe in thriving communities and that starts with our team being happy and healthy.",
  },
  {
    icon: <Umbrella size={40} className="text-blue-500" />,
    title: "Unlimited Vacation",
    description:
      "We believe you should have a flexible schedule that makes space for family, wellness, and fun.",
  },
  {
    icon: <GraduationCap size={40} className="text-blue-500" />,
    title: "Skill Development",
    description:
      "We believe in always learning and leveling up our skills. Whether it's a conference or online course.",
  },
  {
    icon: <Users size={40} className="text-blue-500" />,
    title: "Team Summits",
    description:
      "Every 6 months we have a full team summit where we have fun, reflect, and plan for the upcoming quarter.",
  },
  {
    icon: <Laptop size={40} className="text-blue-500" />,
    title: "Remote Working",
    description:
      "You know how you perform your best. Work from home, coffee shop or anywhere when you feel like it.",
  },
  {
    icon: <Bus size={40} className="text-blue-500" />,
    title: "Commuter Benefits",
    description:
      "We're grateful for all the time and energy each team member puts into getting to work every day.",
  },
  {
    icon: <Heart size={40} className="text-blue-500" />,
    title: "We Give Back",
    description:
      "We anonymously match any donation our employees make (up to $/€ 600) so they can support the organizations they care about mosttimes two.",
  },
];

const InfoCard = ({ title, link, description, images, logo }) => {
  return (
    <div className="flex flex-col md:flex-row bg-white overflow-hidden p-6">
      {/* Left Section */}
      <div className="flex-1">
        <div className="flex items-center space-x-3">
          {/* Logo Box with Gradient */}
          <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-400 flex items-center justify-center rounded-lg text-white font-bold text-4xl">
            {logo ? (
              <img src={logo} alt={title} className="w-full h-full object-cover rounded-lg" />
            ) : (
              title.charAt(0)
            )}
          </div>
          <div>
            <h2 className="text-xl font-bold"> {title} </h2>
            <a
              href={link}
              className="text-blue-500 text-md font-medium mt-1 block"
            >
              Read more about {title} →
            </a>
          </div>
        </div>
        <p className=" text-md text-gray-600 mt-3">{description}</p>
      </div>

      {/* Right Section: Fixed Layout with Bigger Main Image */}
      <div className="flex gap-4 p-4">
        {/* Bigger Main Image */}
        <div className="w-[350px] h-[250px]">
          <img
            src={images && images.length > 0 ? images[0] : "https://via.placeholder.com/350x250"}
            alt="Main Image"
            className="rounded-lg object-cover w-full h-full border border-gray-300"
          />
        </div>
        {/* Small Images Stacked */}
        <div className="flex flex-col gap-3">
          {images && images.slice(1, 3).map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`img-${index}`}
              className="rounded-lg object-cover w-[150px] h-[120px] border border-gray-300"
            />
          ))}
          {(!images || images.length <= 1) && (
            <>
              <img
                src="https://via.placeholder.com/150x120"
                alt="placeholder-1"
                className="rounded-lg object-cover w-[150px] h-[120px] border border-gray-300"
              />
              <img
                src="https://via.placeholder.com/150x120"
                alt="placeholder-2"
                className="rounded-lg object-cover w-[150px] h-[120px] border border-gray-300"
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

// Simple Toast notification component
const Toast = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000); // Auto-close after 3 seconds
    
    return () => clearTimeout(timer);
  }, [onClose]);
  
  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className={`flex items-center rounded-lg shadow-lg p-4 ${
        type === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
      }`}>
        {type === 'success' && <CheckCircle className="mr-2" size={20} />}
        {type === 'error' && <XCircle className="mr-2" size={20} />}
        <p>{message}</p>
      </div>
    </div>
  );
};

const Description = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [jobData, setJobData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Application states
  const [submitting, setSubmitting] = useState(false);
  const [applicationSuccess, setApplicationSuccess] = useState(false);
  const [applicationError, setApplicationError] = useState(null);
  const [alreadyApplied, setAlreadyApplied] = useState(false);
  
  // Toast state
  const [toast, setToast] = useState({ visible: false, message: "", type: "success" });

  useEffect(() => {
    const fetchJobData = async () => {
      setLoading(true);
      setError(null);
      
      // Get the jobId from URL query parameters
      const searchParams = new URLSearchParams(location.search);
      const jobId = searchParams.get('jobId');
      
      if (!jobId) {
        setError("No job ID provided");
        setLoading(false);
        return;
      }
      
      try {
        const response = await axios.get(`${API_URL}/job/get-job/${jobId}`, {
          withCredentials: true
        });
        
        if (response.data && response.data.ok) {
          setJobData(response.data.data);
          console.log("Job data fetched:", response.data.data);
        } else {
          setError(response.data?.message || "Failed to fetch job details");
        }
      } catch (err) {
        console.error("Error fetching job:", err);
        setError("Failed to load job details. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    
    fetchJobData();
  }, [location.search]);

  // Check if user has already applied for this job
  useEffect(() => {
    const checkApplicationStatus = async () => {
      if (!jobData || !jobData._id) return;
      
      try {
        const response = await axios.get(`${API_URL}/application/user`, {
          withCredentials: true
        });
        
        if (response.data && response.data.ok && response.data.data) {
          // Check if the user has already applied for this job
          const hasApplied = response.data.data.some(
            application => application.job._id === jobData._id
          );
          
          setAlreadyApplied(hasApplied);
        }
      } catch (err) {
        console.error("Error checking application status:", err);
      }
    };
    
    checkApplicationStatus();
  }, [jobData]);

  // Handle job application
  const handleApply = async () => {
    if (!jobData || !jobData._id) return;
    
    setSubmitting(true);
    setApplicationSuccess(false);
    setApplicationError(null);
    
    try {
      const response = await axios.post(
        `${API_URL}/application/apply`,
        { job: jobData._id },
        { withCredentials: true }
      );
      
      if (response.data && response.data.ok) {
        setApplicationSuccess(true);
        setAlreadyApplied(true);
        // Show toast notification
        setToast({
          visible: true,
          message: "Your application has been submitted successfully!",
          type: "success"
        });
        console.log("Application submitted successfully:", response.data);
      } else {
        setApplicationError(response.data?.message || "Failed to submit application");
        setToast({
          visible: true,
          message: response.data?.message || "Failed to submit application",
          type: "error"
        });
      }
    } catch (err) {
      console.error("Error submitting application:", err);
      if (err.response?.data?.message === "You have already applied for this job") {
        setAlreadyApplied(true);
        setApplicationError("You have already applied for this job");
        setToast({
          visible: true,
          message: "You have already applied for this job",
          type: "error"
        });
      } else {
        setApplicationError(err.response?.data?.message || "Failed to submit application");
        setToast({
          visible: true,
          message: err.response?.data?.message || "Failed to submit application",
          type: "error"
        });
      }
    } finally {
      setSubmitting(false);
    }
  };

  const closeToast = () => {
    setToast({ ...toast, visible: false });
  };

  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return "Not specified";
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen">
        <div className="flex flex-row flex-grow">
          <div className="h-screen sticky top-0">
            <Sidebar />
          </div>
          <div className="flex-grow transition-all">
            <Header />
            <div className="flex items-center justify-center h-[calc(100vh-64px)]">
              <div className="text-center">
                <Loader size={40} className="animate-spin mx-auto mb-4 text-blue-500" />
                <p className="text-gray-600">Loading job details...</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col min-h-screen">
        <div className="flex flex-row flex-grow">
          <div className="h-screen sticky top-0">
            <Sidebar />
          </div>
          <div className="flex-grow transition-all">
            <Header />
            <div className="flex items-center justify-center h-[calc(100vh-64px)]">
              <div className="text-center bg-red-50 p-6 rounded-lg max-w-md">
                <AlertTriangle size={40} className="mx-auto mb-4 text-red-500" />
                <p className="text-red-600 font-medium mb-2">Error Loading Job</p>
                <p className="text-gray-600 mb-4">{error}</p>
                <button 
                  onClick={() => navigate('/jobs')}
                  className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                >
                  Back to Jobs
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!jobData) {
    return (
      <div className="flex flex-col min-h-screen">
        <div className="flex flex-row flex-grow">
          <div className="h-screen sticky top-0">
            <Sidebar />
          </div>
          <div className="flex-grow transition-all">
            <Header />
            <div className="flex items-center justify-center h-[calc(100vh-64px)]">
              <div className="text-center bg-yellow-50 p-6 rounded-lg max-w-md">
                <AlertTriangle size={40} className="mx-auto mb-4 text-yellow-500" />
                <p className="text-yellow-600 font-medium mb-2">Job Not Found</p>
                <p className="text-gray-600 mb-4">The job you're looking for doesn't exist or has been removed.</p>
                <button 
                  onClick={() => navigate('/jobs')}
                  className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                >
                  Back to Jobs
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Extract required data from job
  const companyName = jobData.company?.companyName || "Company";
  const position = jobData.jobTitle || "Position";
  const description = jobData.jobDescription || "No description available";
  const responsibilities = jobData.responsibilities || [];
  const whoYouAre = jobData.whoYouAre || [];
  const niceToHave = jobData.niceToHave || [];
  const jobType = jobData.jobType || "Full-Time";
  const jobLocation = jobData.location || "Remote";
  const salary = jobData.salary ? `$${jobData.salary}` : "Not specified";
  const createdAt = formatDate(jobData.createdAt);
  const companyLogo = jobData.company?.companyLogo;
  const companyDescription = jobData.company?.description || `${companyName} is a company focused on innovation and excellence.`;
  const perksAndBenefits = jobData.perksAndBenefits || [];
  
  // Calculate application statistics
  const applied = jobData.applications?.length || 0;
  const capacity = 10; // Default capacity if not specified

  // Skills and categories
  const skillsRequired = jobData.skillsRequired || [];
  const categories = ['Job']; // Default category if none available

  return (
    <div className="flex flex-col min-h-screen">
      {/* Toast notification */}
      {toast.visible && (
        <Toast 
          message={toast.message} 
          type={toast.type} 
          onClose={closeToast} 
        />
      )}
      
      <div className="flex flex-row flex-grow">
        <div className="h-screen sticky top-0 ">
          <Sidebar />
        </div>
        <div className="flex-grow transition-all">
          <Header />
          <div className="">
            {/* Display application status messages */}
            {applicationSuccess && (
              <div className="bg-green-50 border border-green-200 text-green-700 p-3 m-4 rounded-lg flex items-center">
                <CheckCircle className="mr-2 text-green-500" size={20} />
                <span>Your application has been submitted successfully!</span>
              </div>
            )}
            
            {applicationError && (
              <div className="bg-red-50 border border-red-200 text-red-700 p-3 m-4 rounded-lg flex items-center">
                <XCircle className="mr-2 text-red-500" size={20} />
                <span>{applicationError}</span>
              </div>
            )}
            
            {/*Part 1*/}
            <div className="flex justify-between items-center py-3 px-4">
              <div className="w-full max-w-8xl mx-auto">
                {/* Container with angled background lines */}
                <div className="relative">
                  {/* Light blue background */}
                  <div className="absolute inset-0 bg-blue-50/60"></div>

                  {/* Top-left to right diagonal line */}
                  <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1 bg-blue-100 transform -rotate-6 origin-top-left translate-y-4"></div>
                  </div>

                  {/* Bottom-left to right diagonal line */}
                  <div className="absolute bottom-0 left-0 w-full h-full overflow-hidden">
                    <div className="absolute bottom-0 left-0 w-full h-1 bg-blue-100 transform -rotate-6 origin-bottom-left -translate-y-4"></div>
                  </div>

                  {/* Main card container with proper spacing */}
                  <div className="relative py-8 px-5">
                    <div className="bg-white border border-blue-200 rounded-md shadow-md flex justify-between items-center p-4">
                      {/* Left side with logo and text */}
                      <div className="flex items-center">
                        {/* Logo */}
                        <div className="w-10 h-10 flex items-center justify-center rounded-lg text-white font-bold text-xl mr-4 cursor-pointer bg-indigo-500">
                          {companyLogo ? (
                            <img src={companyLogo} alt={companyName} className="w-full h-full object-cover rounded-lg" />
                          ) : (
                            companyName.charAt(0).toUpperCase()
                          )}
                        </div>

                        {/* Job details */}
                        <div className="cursor-pointer">
                          <h2 className="text-lg font-bold text-gray-900">
                            {position}
                          </h2>
                          <p className="text-gray-700 text-base">
                            {companyName} • {jobLocation} • {jobType}
                          </p>
                        </div>
                      </div>

                      {/* Right side with share and apply button */}
                      <div className="flex items-center">
                        {/* Share icon */}
                        <div className="mr-4 border border-gray-300 rounded-full p-2 flex items-center justify-center cursor-pointer hover:bg-gray-100">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="text-gray-500"
                          >
                            <circle cx="18" cy="5" r="3"></circle>
                            <circle cx="6" cy="12" r="3"></circle>
                            <circle cx="18" cy="19" r="3"></circle>
                            <line
                              x1="8.59"
                              y1="13.51"
                              x2="15.42"
                              y2="17.49"
                            ></line>
                            <line
                              x1="15.41"
                              y1="6.51"
                              x2="8.59"
                              y2="10.49"
                            ></line>
                          </svg>
                        </div>

                        {/* Apply button */}
                        <button 
                          className={`flex items-center ${
                            alreadyApplied
                              ? "bg-gray-400 cursor-not-allowed"
                              : submitting
                              ? "bg-blue-400 cursor-wait"
                              : "bg-blue-500 hover:bg-blue-600 cursor-pointer"
                          } text-white text-base font-semibold py-2 px-6 rounded-lg transition-colors`}
                          onClick={handleApply}
                          disabled={submitting || alreadyApplied}
                        >
                          {submitting && (
                            <Loader size={18} className="animate-spin mr-2" />
                          )}
                          {alreadyApplied 
                            ? "Already Applied" 
                            : submitting 
                            ? "Applying..." 
                            : "Apply"}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/*Part 2*/}
            <div className="flex p-4">
              <div className="w-3/4 p-4 bg-white">
                {/* Description Section */}
                <div className="mb-4">
                  <h2 className="text-lg font-bold text-gray-800 mb-2">
                    Description
                  </h2>
                  <p className="text-base text-gray-600">
                    {description}
                  </p>
                </div>

                {/* Responsibilities Section */}
                <div className="mb-4">
                  <h2 className="text-lg font-bold text-gray-800 mb-2">
                    Responsibilities
                  </h2>
                  {responsibilities.length > 0 ? (
                    <ul className="space-y-2">
                      {responsibilities.map((item, index) => (
                        <li key={index} className="flex items-start">
                          <div className="flex-shrink-0 h-5 w-5 rounded-full flex items-center justify-center mt-1 mr-2">
                            <svg
                              width="80"
                              height="80"
                              viewBox="0 0 100 100"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <circle
                                cx="50"
                                cy="50"
                                r="45"
                                stroke="#4EC3A5"
                                strokeWidth="10"
                                fill="none"
                              />
                              <path
                                d="M30 50L45 65L70 35"
                                stroke="#4EC3A5"
                                strokeWidth="10"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </div>
                          <span className="text-base text-gray-600">{item}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-gray-500">No responsibilities specified</p>
                  )}
                </div>

                {/* Who You Are Section */}
                <div className="mb-4">
                  <h2 className="text-lg font-bold text-gray-800 mb-2">
                    Who You Are
                  </h2>
                  {whoYouAre.length > 0 ? (
                    <ul className="space-y-2">
                      {whoYouAre.map((item, index) => (
                        <li key={index} className="flex items-start">
                          <div className="flex-shrink-0 h-5 w-5 rounded-full flex items-center justify-center mt-1 mr-2">
                            <svg
                              width="80"
                              height="80"
                              viewBox="0 0 100 100"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <circle
                                cx="50"
                                cy="50"
                                r="45"
                                stroke="#4EC3A5"
                                strokeWidth="10"
                                fill="none"
                              />
                              <path
                                d="M30 50L45 65L70 35"
                                stroke="#4EC3A5"
                                strokeWidth="10"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </div>
                          <span className="text-base text-gray-600">{item}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-gray-500">No qualifications specified</p>
                  )}
                </div>

                {/* Nice-To-Haves Section */}
                <div>
                  <h2 className="text-lg font-bold text-gray-800 mb-2">
                    Nice-To-Haves
                  </h2>
                  {niceToHave.length > 0 ? (
                    <ul className="space-y-2">
                      {niceToHave.map((item, index) => (
                        <li key={index} className="flex items-start">
                          <div className="flex-shrink-0 h-5 w-5 rounded-full flex items-center justify-center mt-1 mr-2">
                            <svg
                              width="80"
                              height="80"
                              viewBox="0 0 100 100"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <circle
                                cx="50"
                                cy="50"
                                r="45"
                                stroke="#4EC3A5"
                                strokeWidth="10"
                                fill="none"
                              />
                              <path
                                d="M30 50L45 65L70 35"
                                stroke="#4EC3A5"
                                strokeWidth="10"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </div>
                          <span className="text-base text-gray-600">{item}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-gray-500">No additional requirements specified</p>
                  )}
                </div>
              </div>

              <div className="w-1/4 p-4">
                <div className="bg-white p-3">
                  {/* About this role */}
                  <h2 className="text-lg font-bold text-gray-800 mb-4">
                    About this role
                  </h2>

                  <div className="bg-gray-50 p-3 rounded-lg mb-4">
                    {/* Progress stats */}
                    <div className="mb-3">
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-gray-800 font-semibold">
                          {applied} applied
                        </span>
                        <span className="text-gray-500">
                          of {capacity} capacity
                        </span>
                      </div>
                      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-green-500 rounded-full"
                          style={{
                            width: `${(applied / capacity) * 100}%`,
                          }}
                        ></div>
                      </div>
                    </div>
                  </div>

                  {/* Job details */}
                  <div className="space-y-2 py-1">
                    {[
                      {
                        label: "Job Posted On",
                        value: createdAt,
                      },
                      { label: "Job Type", value: jobType },
                      { label: "Salary", value: salary },
                    ].map((item, index) => (
                      <div
                        key={index}
                        className="flex justify-between text-sm font-medium"
                      >
                        <span className="text-gray-600">{item.label}</span>
                        <span className="text-gray-900">
                          {item.value || "N/A"}
                        </span>
                      </div>
                    ))}
                  </div>
                  <div className="border-b border-gray-300 text-transparent mb-3">
                    .
                  </div>
                  {/* Categories & Required Skills */}
                  {[
                    {
                      title: "Categories",
                      data: categories,
                      bgColor: "bg-orange-100",
                      textColor: "text-orange-600",
                    },
                    {
                      title: "Required Skills",
                      data: skillsRequired,
                      bgColor: "bg-blue-100",
                      textColor: "text-blue-600",
                    },
                  ].map((section, idx) => (
                    <div key={idx} className="mb-4">
                      <h3 className="text-base font-semibold text-gray-800 mb-2">
                        {section.title}
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {section.data.length > 0 ? (
                          section.data.map((item, index) => (
                            <span
                              key={index}
                              className={`${section.bgColor} ${section.textColor} px-3 py-1 rounded-full text-sm font-medium cursor-pointer hover:opacity-90`}
                            >
                              {item}
                            </span>
                          ))
                        ) : (
                          <span className="text-gray-500 text-sm">
                            No {section.title.toLowerCase()} available
                          </span>
                        )}
                      </div>
                      {idx === 0 && (
                        <div className="border-b border-gray-300 mt-5"></div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            {/*Part 3*/}
            <div className="py-4 px-4 bg-white border-t border-gray-300">
              <div className="text-left mb-5 px-4">
                <h2 className="text-xl font-bold text-gray-900">
                  Perks & Benefits
                </h2>
                <p className="text-gray-600 text-sm">
                  This job comes with several perks and benefits
                </p>
              </div>
              
              {perksAndBenefits.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 max-w-6xl mx-auto">
                  {perksAndBenefits.map((perk, index) => {
                    // Determine which icon to use based on keywords in the perk text
                    let icon;
                    const perkLower = perk.toLowerCase();
                    if (perkLower.includes('health') || perkLower.includes('medical') || perkLower.includes('insurance')) {
                      icon = <Stethoscope size={40} className="text-blue-500" />;
                    } else if (perkLower.includes('vacation') || perkLower.includes('time off') || perkLower.includes('leave')) {
                      icon = <Umbrella size={40} className="text-blue-500" />;
                    } else if (perkLower.includes('education') || perkLower.includes('training') || perkLower.includes('development')) {
                      icon = <GraduationCap size={40} className="text-blue-500" />;
                    } else if (perkLower.includes('team') || perkLower.includes('collaboration')) {
                      icon = <Users size={40} className="text-blue-500" />;
                    } else if (perkLower.includes('remote') || perkLower.includes('work from home') || perkLower.includes('flexible')) {
                      icon = <Laptop size={40} className="text-blue-500" />;
                    } else if (perkLower.includes('commute') || perkLower.includes('transport')) {
                      icon = <Bus size={40} className="text-blue-500" />;
                    } else {
                      icon = <Heart size={40} className="text-blue-500" />;
                    }
                    
                    return (
                      <div
                        key={index}
                        className="flex flex-col items-left text-left p-3 transition duration-300 cursor-pointer hover:bg-gray-50 rounded-lg"
                      >
                        <div className="mb-2">{icon}</div>
                        <h3 className="text-base font-semibold mb-1 text-gray-900">
                          {perk}
                        </h3>
                        <p className="text-gray-600 text-sm">
                          A great benefit for employees
                        </p>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-500">No perks or benefits have been specified for this job.</p>
                </div>
              )}
            </div>
            {/*Part 4*/}
            <div className="border-t border-gray-500">
              <InfoCard
                logo={companyLogo}
                title={companyName}
                link="#"
                description={companyDescription}
                images={[
                  "https://via.placeholder.com/350x250",
                  "https://via.placeholder.com/150x120",
                  "https://via.placeholder.com/150x120",
                ]}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Description;
