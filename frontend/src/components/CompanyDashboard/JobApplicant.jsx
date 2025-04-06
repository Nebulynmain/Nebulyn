import React, { useState, useEffect } from "react";
import {
  ChevronDown,
  Search,
  Filter,
  Star,
  ChevronLeft,
  ChevronRight,
  Stethoscope,
  Umbrella,
  GraduationCap,
  Users,
  Laptop,
  Bus,
  Heart,
  X,
  Loader,
  AlertTriangle,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../../App";

const JobApplicant = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [view, setView] = useState("table");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("details");
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [candidates, setCandidates] = useState([]);
  const [selectedCandidates, setSelectedCandidates] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectAll, setSelectAll] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [applicantsPerPage, setApplicantsPerPage] = useState(10);
  const [jobData, setJobData] = useState({
    company: "",
    position: "",
    description: "",
    responsibilities: [],
    whoYouAre: [],
    niceToHaves: [],
  });

  const [sampleJobData, setSampleJobData] = useState({
    applied: 0,
    capacity: 1,
    deadline: "",
    postedDate: "",
    jobType: "",
    salary: "",
    categories: [],
    requiredSkills: [],
  });

  const perksData = [
    {
      icon: <Stethoscope size={32} className="text-blue-500" />,
      title: "Full Healthcare",
      description: "Happy and healthy team members.",
    },
    {
      icon: <Umbrella size={32} className="text-blue-500" />,
      title: "Unlimited Vacation",
      description: "Flexible schedule for family and fun.",
    },
    {
      icon: <GraduationCap size={32} className="text-blue-500" />,
      title: "Skill Development",
      description: "Always learning and leveling up skills.",
    },
    {
      icon: <Users size={32} className="text-blue-500" />,
      title: "Team Summits",
      description: "Regular team summits for planning.",
    },
    {
      icon: <Laptop size={32} className="text-blue-500" />,
      title: "Remote Working",
      description: "Work from anywhere you choose.",
    },
    {
      icon: <Bus size={32} className="text-blue-500" />,
      title: "Commuter Benefits",
      description: "Benefits for your daily commute.",
    },
    {
      icon: <Heart size={32} className="text-blue-500" />,
      title: "We Give Back",
      description: "Matching donations to causes you care about.",
    },
  ];

  const data = [
    { name: "Direct", value: 48, color: "#FFBA49" },
    { name: "Social", value: 23, color: "#4DA1FF" },
    { name: "Organic", value: 24, color: "#0066FF" },
    { name: "Other", value: 5, color: "#4ECDC4" },
  ];

  const [isHovering, setIsHovering] = useState(false);
  const [hoverSegment, setHoverSegment] = useState(null);
  const [hoveredPoint, setHoveredPoint] = useState(null);

  useEffect(() => {
    const fetchJobAndApplicants = async () => {
      setLoading(true);
      setError(null);
      
      try {
        // Get job ID either from location state or from URL params
        let jobId;
        if (location.state && location.state.jobData && location.state.jobData.id) {
          jobId = location.state.jobData.id;
        } else {
          // If not available in state, try to extract from URL
          const pathParts = location.pathname.split('/');
          jobId = pathParts[pathParts.length - 1];
        }
        
        if (!jobId) {
          throw new Error("Job ID not found");
        }
        
        // Fetch job details
        const jobResponse = await axios.get(`${API_URL}/job/get-job/${jobId}`, {
          withCredentials: true
        });
        
        if (jobResponse.data && jobResponse.data.ok && jobResponse.data.data) {
          const job = jobResponse.data.data;
          
          // Format job data for the UI
          setJobData({
            company: job.company ? job.company.companyName : "",
            position: job.jobTitle,
            description: job.jobDescription,
            responsibilities: job.responsibilities || [],
            whoYouAre: job.whoYouAre || [],
            niceToHaves: job.niceToHave || [],
          });
          
          // Format sample job data
          const postedDate = new Date(job.createdAt);
          const formattedPostedDate = `${postedDate.toLocaleString('default', { month: 'short' })} ${postedDate.getDate()}, ${postedDate.getFullYear()}`;
          
          // Calculate due date (30 days after posting for demo purposes)
          const dueDate = new Date(postedDate);
          dueDate.setDate(dueDate.getDate() + 30);
          const formattedDueDate = `${dueDate.toLocaleString('default', { month: 'short' })} ${dueDate.getDate()}, ${dueDate.getFullYear()}`;
          
          setSampleJobData({
            applied: job.applications ? job.applications.length : 0,
            capacity: 1, // Default to 1, could be updated with actual data
            deadline: formattedDueDate,
            postedDate: formattedPostedDate,
            jobType: job.jobType,
            salary: job.salary ? `$${job.salary.toLocaleString()} USD` : "",
            categories: job.categories || [],
            requiredSkills: job.skillsRequired || [],
          });
          
          // If job has populated applications, extract and format them
          if (job.applications && job.applications.length > 0) {
            // Format candidate data from applications
            const formattedCandidates = job.applications.map(app => {
              // Map application status to UI hiringStage
              let hiringStage;
              switch(app.status) {
                case "Shortlisted": hiringStage = "Shortlisted"; break;
                case "Interview": hiringStage = "Interview"; break;
                case "Hired": hiringStage = "Hired"; break;
                case "Rejected": hiringStage = "Declined"; break;
                case "In Review": hiringStage = "Interviewed"; break;
                default: hiringStage = "Shortlisted";
              }
              
              // Format date
              const appliedDate = new Date(app.appliedAt || app.createdAt);
              const formattedDate = `${appliedDate.getDate()} ${appliedDate.toLocaleString('default', { month: 'short' })}, ${appliedDate.getFullYear()}`;
              
              // If the applicant data is nested and populated
              if (app.applicant) {
                return {
                  id: app._id,
                  name: app.applicant.fullName || app.applicant.userName,
                  score: app.score || 0,
                  hiringStage: hiringStage,
                  appliedDate: formattedDate,
                  jobRole: job.jobTitle,
                  image: app.applicant.profileImage || `https://ui-avatars.com/api/?name=${encodeURIComponent(app.applicant.fullName || app.applicant.userName)}&background=random`
                };
              }
              
              // If applicant data isn't nested/populated, try to fetch it separately
              return {
                id: app._id,
                name: "Applicant",
                score: app.score || 0,
                hiringStage: hiringStage,
                appliedDate: formattedDate,
                jobRole: job.jobTitle,
                image: `https://ui-avatars.com/api/?name=Applicant&background=random`
              };
            });
            
            setCandidates(formattedCandidates);
          } else {
            // If no applications yet, set empty array
            setCandidates([]);
          }
        }
      } catch (err) {
        console.error("Error fetching job and applicants:", err);
        setError(err.message || "Failed to load job data. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    
    fetchJobAndApplicants();
  }, [location]);

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedCandidates([]);
    } else {
      setSelectedCandidates(candidates.map((candidate) => candidate.id));
    }
    setSelectAll(!selectAll);
  };

  const handleSelect = (id) => {
    if (selectedCandidates.includes(id)) {
      setSelectedCandidates(selectedCandidates.filter((cid) => cid !== id));
    } else {
      setSelectedCandidates([...selectedCandidates, id]);
    }
  };

  const handleJobDataChange = (field, value) => {
    setJobData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSampleDataChange = (field, value) => {
    setSampleJobData((prev) => ({ ...prev, [field]: value }));
  };

  const handleArrayFieldChange = (field, index, value) => {
    setJobData((prev) => ({
      ...prev,
      [field]: prev[field].map((item, i) => (i === index ? value : item)),
    }));
  };

  const handleAddArrayItem = (field) => {
    setJobData((prev) => ({ ...prev, [field]: [...prev[field], ""] }));
  };

  const handleRemoveArrayItem = (field, index) => {
    setJobData((prev) => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index),
    }));
  };

  const handleSaveChanges = () => {
    setJobData(jobData);
    setSampleJobData(sampleJobData);
    setIsEditModalOpen(false);
  };

  const filteredCandidates = candidates.filter((candidate) =>
    candidate.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastApplicant = currentPage * applicantsPerPage;
  const indexOfFirstApplicant = indexOfLastApplicant - applicantsPerPage;
  const currentApplicants = filteredCandidates.slice(
    indexOfFirstApplicant,
    indexOfLastApplicant
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const totalPages = Math.ceil(filteredCandidates.length / applicantsPerPage);

  const stageOrder = [
    "Shortlisted",
    "Interview",
    "Interviewed",
    "Hired",
    "Declined",
  ];

  const stageGroups = {
    Shortlisted: filteredCandidates.filter(
      (c) => c.hiringStage === "Shortlisted"
    ),
    Interview: filteredCandidates.filter((c) => c.hiringStage === "Interview"),
    Interviewed: filteredCandidates.filter(
      (c) => c.hiringStage === "Interviewed"
    ),
    Hired: filteredCandidates.filter((c) => c.hiringStage === "Hired"),
    Declined: filteredCandidates.filter((c) => c.hiringStage === "Declined"),
  };

  const getStageColor = (stage) => {
    switch (stage) {
      case "Shortlisted":
        return "bg-blue-50";
      case "Interview":
        return "bg-yellow-50";
      case "Interviewed":
        return "bg-blue-50";
      case "Hired":
        return "bg-green-50";
      case "Declined":
        return "bg-red-50";
      default:
        return "bg-gray-50";
    }
  };

  const getStageTextColor = (stage) => {
    switch (stage) {
      case "Shortlisted":
        return "text-blue-600";
      case "Interview":
        return "text-yellow-600";
      case "Interviewed":
        return "text-blue-600";
      case "Hired":
        return "text-green-600";
      case "Declined":
        return "text-red-600";
      default:
        return "text-gray-600";
    }
  };

  const getStarColor = (score) =>
    score > 0 ? "text-yellow-500" : "text-gray-400";

  const CandidateCard = ({ candidate }) => (
    <div className="bg-white p-3 rounded shadow mb-2 border border-gray-200">
      <div className="flex items-center mb-2">
        <img
          src={candidate.image}
          alt={candidate.name}
          className="w-8 h-8 rounded-full border object-cover"
        />
        <div className="ml-2 min-w-0">
          <h3 className="font-medium text-gray-900 truncate">
            {candidate.name}
          </h3>
          <p className="text-xs text-gray-500 truncate">{candidate.jobRole}</p>
        </div>
      </div>
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <Star
            className={getStarColor(candidate.score)}
            fill={candidate.score > 0 ? "#FACC15" : "none"}
            size={14}
          />
          <span className="ml-1 text-sm text-gray-900">{candidate.score}</span>
        </div>
        <span className="text-xs text-gray-500">{candidate.appliedDate}</span>
      </div>
      <div className="mt-2">
        <button
          className="w-full px-2 py-1 text-xs border border-blue-500 bg-[#E9EBFD] text-blue-500 rounded hover:bg-blue-100 cursor-pointer"
          onClick={() => navigate("/applicant-detail")}
        >
          See Application
        </button>
      </div>
    </div>
  );

  const total = data.reduce((sum, item) => sum + item.value, 0);

  const generatePaths = () => {
    let cumulativePercent = 0;
    return data.map((item, index) => {
      const startPercent = cumulativePercent;
      const endPercent = startPercent + (item.value / total) * 100;
      cumulativePercent = endPercent;

      const startAngle = (startPercent / 100) * 2 * Math.PI - Math.PI / 2;
      const endAngle = (endPercent / 100) * 2 * Math.PI - Math.PI / 2;

      const outerRadius = 70;
      const innerRadius = 50;

      const startOuterX = Math.cos(startAngle) * outerRadius;
      const startOuterY = Math.sin(startAngle) * outerRadius;
      const endOuterX = Math.cos(endAngle) * outerRadius;
      const endOuterY = Math.sin(endAngle) * outerRadius;

      const startInnerX = Math.cos(startAngle) * innerRadius;
      const startInnerY = Math.sin(startAngle) * innerRadius;
      const endInnerX = Math.cos(endAngle) * innerRadius;
      const endInnerY = Math.sin(endAngle) * innerRadius;

      const largeArcFlag = endPercent - startPercent > 50 ? 1 : 0;

      const pathData = [
        `M ${startOuterX} ${startOuterY}`,
        `A ${outerRadius} ${outerRadius} 0 ${largeArcFlag} 1 ${endOuterX} ${endOuterY}`,
        `L ${endInnerX} ${endInnerY}`,
        `A ${innerRadius} ${innerRadius} 0 ${largeArcFlag} 0 ${startInnerX} ${startInnerY}`,
        "Z",
      ].join(" ");

      const isActive = hoverSegment === item.name;
      const segmentScale = isActive ? 1.05 : 1;

      return (
        <path
          key={item.name}
          d={pathData}
          fill={item.color}
          transform={isActive ? `scale(${segmentScale})` : ""}
          onMouseEnter={() => {
            setIsHovering(true);
            setHoverSegment(item.name);
          }}
          onMouseLeave={() => {
            setIsHovering(false);
            setHoverSegment(null);
          }}
          style={{
            transition: "transform 0.2s",
            cursor: "pointer",
          }}
        />
      );
    });
  };

  const countries = [
    { name: "USA", visitors: 3240, code: "us" },
    { name: "France", visitors: 3188, code: "fr" },
    { name: "Italy", visitors: 2938, code: "it" },
    { name: "Germany", visitors: 2624, code: "de" },
    { name: "Japan", visitors: 2414, code: "jp" },
    { name: "Netherlands", visitors: 1916, code: "nl" },
    { name: "Canada", visitors: 1845, code: "ca" },
    { name: "UK", visitors: 1790, code: "gb" },
    { name: "Spain", visitors: 1684, code: "es" },
    { name: "Australia", visitors: 1523, code: "au" },
  ];

  const chart = [
    { name: "19 Jul", views: 400 },
    { name: "20 Jul", views: 30 },
    { name: "20 Jul", views: 450 },
    { name: "21 Jul", views: 200 },
    { name: "21 Jul", views: 600 },
    { name: "22 Jul", views: 350 },
    { name: "23 Jul", views: 243 },
  ];

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-gray-800 text-white p-2 text-center text-xs">
          <p>Views</p>
          <p className="font-bold">{payload[0].value}</p>
        </div>
      );
    }
    return null;
  };

  const CustomDot = (props) => {
    const { cx, cy, index } = props;
    const isLast = index === data.length - 1;
    return (
      <g>
        {isLast && (
          <circle
            cx={cx}
            cy={cy}
            r={4}
            fill="#10B981"
            stroke="#10B981"
            strokeWidth={2}
          />
        )}
      </g>
    );
  };

  const EditJobModal = () => {
    if (!isEditModalOpen) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg w-3/4 max-h-[90vh] overflow-y-auto">
          <div className="p-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Edit Job Details</h2>
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={20} />
              </button>
            </div>

            <div className="mb-4">
              <h3 className="text-lg font-semibold mb-2">Basic Information</h3>
              <div className="space-y-2">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Position Title
                  </label>
                  <input
                    type="text"
                    value={sampleJobData.position}
                    onChange={(e) =>
                      handleSampleDataChange("position", e.target.value)
                    }
                    className="w-full p-2 border rounded text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <textarea
                    value={jobData.description}
                    onChange={(e) =>
                      handleJobDataChange("description", e.target.value)
                    }
                    className="w-full p-2 border rounded text-sm h-24"
                  />
                </div>
              </div>
            </div>

            <div className="mb-4">
              <h3 className="text-lg font-semibold mb-2">Job Details</h3>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Job Type
                  </label>
                  <input
                    type="text"
                    value={sampleJobData.jobType}
                    onChange={(e) =>
                      handleSampleDataChange("jobType", e.target.value)
                    }
                    className="w-full p-2 border rounded text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Salary Range
                  </label>
                  <input
                    type="text"
                    value={sampleJobData.salary}
                    onChange={(e) =>
                      handleSampleDataChange("salary", e.target.value)
                    }
                    className="w-full p-2 border rounded text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Application Deadline
                  </label>
                  <input
                    type="text"
                    value={sampleJobData.deadline}
                    onChange={(e) =>
                      handleSampleDataChange("deadline", e.target.value)
                    }
                    className="w-full p-2 border rounded text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Capacity
                  </label>
                  <input
                    type="number"
                    value={sampleJobData.capacity}
                    onChange={(e) =>
                      handleSampleDataChange(
                        "capacity",
                        parseInt(e.target.value)
                      )
                    }
                    className="w-full p-2 border rounded text-sm"
                  />
                </div>
              </div>
            </div>

            <div className="mb-4">
              <h3 className="text-lg font-semibold mb-2">Responsibilities</h3>
              <div className="space-y-2">
                {jobData.responsibilities.map((responsibility, index) => (
                  <div key={index} className="flex gap-2">
                    <input
                      type="text"
                      value={responsibility}
                      onChange={(e) =>
                        handleArrayFieldChange(
                          "responsibilities",
                          index,
                          e.target.value
                        )
                      }
                      className="flex-1 p-2 border rounded text-sm"
                    />
                    <button
                      onClick={() =>
                        handleRemoveArrayItem("responsibilities", index)
                      }
                      className="text-red-500 hover:text-red-700"
                    >
                      <X size={16} />
                    </button>
                  </div>
                ))}
                <button
                  onClick={() => handleAddArrayItem("responsibilities")}
                  className="text-blue-500 hover:text-blue-700 text-sm"
                >
                  + Add Responsibility
                </button>
              </div>
            </div>

            <div className="mb-4">
              <h3 className="text-lg font-semibold mb-2">Who You Are</h3>
              <div className="space-y-2">
                {jobData.whoYouAre.map((trait, index) => (
                  <div key={index} className="flex gap-2">
                    <input
                      type="text"
                      value={trait}
                      onChange={(e) =>
                        handleArrayFieldChange(
                          "whoYouAre",
                          index,
                          e.target.value
                        )
                      }
                      className="flex-1 p-2 border rounded text-sm"
                    />
                    <button
                      onClick={() => handleRemoveArrayItem("whoYouAre", index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <X size={16} />
                    </button>
                  </div>
                ))}
                <button
                  onClick={() => handleAddArrayItem("whoYouAre")}
                  className="text-blue-500 hover:text-blue-700 text-sm"
                >
                  + Add Trait
                </button>
              </div>
            </div>

            <div className="mb-4">
              <h3 className="text-lg font-semibold mb-2">Nice-To-Haves</h3>
              <div className="space-y-2">
                {jobData.niceToHaves.map((item, index) => (
                  <div key={index} className="flex gap-2">
                    <input
                      type="text"
                      value={item}
                      onChange={(e) =>
                        handleArrayFieldChange(
                          "niceToHaves",
                          index,
                          e.target.value
                        )
                      }
                      className="flex-1 p-2 border rounded text-sm"
                    />
                    <button
                      onClick={() =>
                        handleRemoveArrayItem("niceToHaves", index)
                      }
                      className="text-red-500 hover:text-red-700"
                    >
                      <X size={16} />
                    </button>
                  </div>
                ))}
                <button
                  onClick={() => handleAddArrayItem("niceToHaves")}
                  className="text-blue-500 hover:text-blue-700 text-sm"
                >
                  + Add Nice-To-Have
                </button>
              </div>
            </div>

            <div className="flex justify-end mt-4">
              <button
                onClick={handleSaveChanges}
                className="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderJobDetailsTab = () => (
    <div>
      <div className="flex items-center justify-between p-4 border-2 border-blue-400 mt-3">
        <div className="flex items-center gap-2">
          <div className="flex items-center justify-center w-10 h-10 text-white bg-blue-500 rounded-md">
            <span className="font-bold">S</span>
          </div>
          <span className="text-xl font-bold">Social Media Assistant</span>
        </div>
        <button
          onClick={() => setIsEditModalOpen(true)}
          className="flex items-center gap-1 px-2 py-1 text-xs text-blue-500 border border-blue-500 hover:bg-blue-50 cursor-pointer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
          </svg>
          Edit Job
        </button>
      </div>
      {EditJobModal()}
      <div className="flex p-4">
        <div className="w-3/4 p-4 bg-white">
          <div className="mb-6">
            <h2 className="text-lg font-bold mb-2">Description</h2>
            <p className="text-sm text-gray-600">{jobData.description}</p>
          </div>

          <div className="mb-6">
            <h2 className="text-lg font-bold mb-2">Responsibilities</h2>
            <ul className="space-y-2">
              {jobData.responsibilities.map((item, index) => (
                <li key={index} className="flex items-start">
                  <div className="flex-shrink-0 h-5 w-5 rounded-full flex items-center justify-center mt-0.5 mr-2">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 100 100"
                      fill="none"
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
                  <span className="text-sm text-gray-600">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mb-6">
            <h2 className="text-lg font-bold mb-2">Who You Are</h2>
            <ul className="space-y-2">
              {jobData.whoYouAre.map((item, index) => (
                <li key={index} className="flex items-start">
                  <div className="flex-shrink-0 h-5 w-5 rounded-full flex items-center justify-center mt-0.5 mr-2">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 100 100"
                      fill="none"
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
                  <span className="text-sm text-gray-600">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-lg font-bold mb-2">Nice-To-Haves</h2>
            <ul className="space-y-2">
              {jobData.niceToHaves.map((item, index) => (
                <li key={index} className="flex items-start">
                  <div className="flex-shrink-0 h-5 w-5 rounded-full flex items-center justify-center mt-0.5 mr-2">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 100 100"
                      fill="none"
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
                  <span className="text-sm text-gray-600">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="w-1/4 p-4">
          <div className="bg-white p-3">
            <h2 className="text-lg font-bold mb-4">About this role</h2>

            <div className="bg-gray-50 p-3 rounded mb-6">
              <div className="mb-3">
                <div className="flex justify-between text-sm mb-1">
                  <span className="font-semibold">
                    {sampleJobData.applied || 0} applied
                  </span>
                  <span className="text-gray-500">
                    of {sampleJobData.capacity || 0} capacity
                  </span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-green-500 rounded-full"
                    style={{
                      width: `${
                        ((sampleJobData.applied || 0) /
                          (sampleJobData.capacity || 1)) *
                        100
                      }%`,
                    }}
                  ></div>
                </div>
              </div>
            </div>

            <div className="space-y-2 py-1">
              {[
                { label: "Apply Before", value: sampleJobData.deadline },
                { label: "Job Posted On", value: sampleJobData.postedDate },
                { label: "Job Type", value: sampleJobData.jobType },
                { label: "Salary", value: sampleJobData.salary },
              ].map((item, index) => (
                <div key={index} className="flex justify-between text-sm">
                  <span className="text-gray-600">{item.label}</span>
                  <span className="text-gray-900">{item.value || "N/A"}</span>
                </div>
              ))}
            </div>
            <div className="border-b border-blue-400 text-transparent mb-4">
              .
            </div>

            {[
              {
                title: "Categories",
                data: sampleJobData.categories,
                bgColor: "bg-orange-100",
                textColor: "text-orange-600",
              },
              {
                title: "Required Skills",
                data: sampleJobData.requiredSkills,
                bgColor: "bg-blue-100",
                textColor: "text-blue-600",
              },
            ].map((section, idx) => (
              <div key={idx} className="mb-4">
                <h3 className="text-lg font-semibold mb-2">{section.title}</h3>
                <div className="flex flex-wrap gap-2">
                  {section.data && section.data.length > 0 ? (
                    section.data.map((item, index) => (
                      <span
                        key={index}
                        className={`${section.bgColor} ${section.textColor} px-2 py-1 rounded-full text-xs`}
                      >
                        {item}
                      </span>
                    ))
                  ) : (
                    <span className="text-gray-500 text-xs">
                      No {section.title.toLowerCase()} available
                    </span>
                  )}
                </div>
                {idx === 0 && (
                  <div className="border-b border-blue-400 mt-6"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="py-4 px-4 bg-white border-t border-blue-400">
        <div className="text-left mb-6 px-4">
          <h2 className="text-xl font-bold">Perks & Benefits</h2>
          <p className="text-sm text-gray-600">
            This job comes with several perks and benefits
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 max-w-6xl mx-auto">
          {perksData.map((perk, index) => (
            <div key={index} className="flex flex-col items-left text-left p-3">
              <div className="mb-2">{perk.icon}</div>
              <h3 className="font-semibold mb-1">{perk.title}</h3>
              <p className="text-xs text-gray-600">{perk.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderApplicantsTab = () => (
    <div className="container mx-auto">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center p-3">
        <h2 className="text-xl font-semibold mb-2 md:mb-0">
          Total Applicants:{" "}
          <span className="font-bold">{filteredCandidates.length}</span>
        </h2>
        <div className="flex flex-col md:flex-row items-start md:items-center gap-2">
          <div className="relative w-full md:w-48">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search Applicants"
              className="w-full pl-8 pr-3 py-1.5 text-sm border rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
            />
          </div>

          <button className="flex items-center gap-1 px-3 py-1.5 border rounded text-sm hover:bg-gray-100 w-full md:w-auto justify-center md:justify-start">
            <Filter className="h-4 w-4" /> Filter
          </button>

          <div className="hidden md:block border-l h-6 mx-1"></div>

          <div className="flex bg-blue-100 p-1 rounded w-full md:w-auto mt-2 md:mt-0">
            <button
              className={`w-32 h-8 px-3 py-1 rounded text-sm ${
                view === "pipeline" ? "bg-white shadow" : "hover:bg-blue-200"
              }`}
              onClick={() => setView("pipeline")}
            >
              Pipeline View
            </button>
            <button
              className={`w-32 h-8 px-3 py-1 rounded text-sm ${
                view === "table" ? "bg-white shadow" : "hover:bg-blue-200"
              }`}
              onClick={() => setView("table")}
            >
              Table View
            </button>
          </div>
        </div>
      </div>

      {view === "table" && (
        <div className="overflow-x-auto px-3">
          <table className="min-w-full border-collapse border border-gray-200 rounded overflow-hidden">
            <thead className="bg-white text-gray-500 uppercase text-xs border-b border-gray-200">
              <tr>
                <th className="p-2 text-left">
                  <input
                    type="checkbox"
                    className="form-checkbox text-blue-500 border-gray-300 rounded"
                    checked={selectAll}
                    onChange={handleSelectAll}
                  />
                </th>
                {[
                  "Full Name",
                  "Score",
                  "Hiring Stage",
                  "Applied Date",
                  "Job Role",
                  "Action",
                ].map((header) => (
                  <th key={header} className="p-2 text-left font-medium">
                    <div className="flex items-center space-x-1">
                      <span>{header}</span>
                      <span className="text-xs">▲▼</span>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {currentApplicants.length > 0 ? (
                currentApplicants.map((candidate) => (
                  <tr key={candidate.id} className="border-t hover:bg-gray-50">
                    <td className="p-2">
                      <input
                        type="checkbox"
                        className="form-checkbox text-blue-500"
                        checked={selectedCandidates.includes(candidate.id)}
                        onChange={() => handleSelect(candidate.id)}
                      />
                    </td>
                    <td className="p-2">
                      <div className="flex items-center space-x-2">
                        <img
                          src={candidate.image}
                          alt={candidate.name}
                          className="w-6 h-6 rounded-full border object-cover"
                        />
                        <span className="font-medium">{candidate.name}</span>
                      </div>
                    </td>
                    <td className="p-2">
                      <div className="flex items-center space-x-1">
                        <Star
                          className={getStarColor(candidate.score)}
                          fill={candidate.score > 0 ? "#FACC15" : "none"}
                          size={14}
                        />
                        <span>{candidate.score}</span>
                      </div>
                    </td>
                    <td className="p-2">
                      <span
                        className={`px-2 py-0.5 rounded-full text-xs ${
                          candidate.hiringStage === "Interview"
                            ? "text-yellow-600 bg-yellow-100"
                            : ""
                        }
                        ${
                          candidate.hiringStage === "Shortlisted"
                            ? "text-blue-600 bg-blue-100"
                            : ""
                        }
                        ${
                          candidate.hiringStage === "Declined"
                            ? "text-red-600 bg-red-100"
                            : ""
                        }
                        ${
                          candidate.hiringStage === "Hired"
                            ? "text-green-600 bg-green-100"
                            : ""
                        }
                        ${
                          candidate.hiringStage === "Interviewed"
                            ? "text-blue-600 bg-blue-100"
                            : ""
                        }`}
                      >
                        {candidate.hiringStage}
                      </span>
                    </td>
                    <td className="p-2 text-sm">{candidate.appliedDate}</td>
                    <td className="p-2 text-sm">{candidate.jobRole}</td>
                    <td className="p-2">
                      <button
                        className="px-2 py-1 border border-blue-500 bg-[#E9EBFD] text-blue-500 rounded text-xs cursor-pointer"
                        onClick={() => navigate("/applicant-detail")}
                      >
                        See Application
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="7"
                    className="p-3 text-center text-sm text-gray-500"
                  >
                    No matching applicants found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {view === "pipeline" && (
        <div className="p-2">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3">
            {stageOrder.map((stage) => (
              <div key={stage} className="bg-white rounded shadow">
                <div className={`p-2 rounded-t ${getStageColor(stage)}`}>
                  <div className="flex justify-between items-center">
                    <h3 className={`text-sm ${getStageTextColor(stage)}`}>
                      {stage}
                    </h3>
                    <span className="bg-white px-1.5 py-0.5 rounded-full text-xs font-medium">
                      {stageGroups[stage].length}
                    </span>
                  </div>
                </div>
                <div className="p-2 max-h-80 overflow-y-auto">
                  {stageGroups[stage].length > 0 ? (
                    stageGroups[stage].map((candidate) => (
                      <CandidateCard key={candidate.id} candidate={candidate} />
                    ))
                  ) : (
                    <div className="text-center py-6 text-xs text-gray-500">
                      No candidates
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {view === "table" && (
        <div className="flex flex-col md:flex-row justify-between items-center p-3">
          <div className="flex items-center space-x-1 mb-2 md:mb-0">
            <span className="text-xs">View</span>
            <select
              value={applicantsPerPage}
              onChange={(e) => {
                setApplicantsPerPage(Number(e.target.value));
                setCurrentPage(1);
              }}
              className="border rounded px-1 py-0.5 text-xs"
            >
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
            </select>
            <span className="text-xs">Applicants per page</span>
          </div>
          <div className="flex items-center space-x-1 overflow-x-auto w-full md:w-auto justify-center">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className={`p-1 border rounded ${
                currentPage === 1
                  ? "text-gray-300 cursor-not-allowed"
                  : "hover:bg-gray-100"
              }`}
            >
              <ChevronLeft size={14} />
            </button>
            {totalPages <= 5 ? (
              [...Array(totalPages)].map((_, index) => (
                <button
                  key={index + 1}
                  onClick={() => paginate(index + 1)}
                  className={`px-2 py-1 border rounded text-xs ${
                    currentPage === index + 1
                      ? "bg-blue-500 text-white"
                      : "hover:bg-gray-100"
                  }`}
                >
                  {index + 1}
                </button>
              ))
            ) : (
              <>
                {currentPage > 1 && (
                  <button
                    onClick={() => paginate(1)}
                    className="px-2 py-1 border rounded text-xs hover:bg-gray-100"
                  >
                    1
                  </button>
                )}
                {currentPage > 2 && <span className="px-0.5 text-xs">...</span>}
                {currentPage > 1 && (
                  <button
                    onClick={() => paginate(currentPage - 1)}
                    className="px-2 py-1 border rounded text-xs hover:bg-gray-100"
                  >
                    {currentPage - 1}
                  </button>
                )}
                <button className="px-2 py-1 border rounded text-xs bg-blue-500 text-white">
                  {currentPage}
                </button>
                {currentPage < totalPages && (
                  <button
                    onClick={() => paginate(currentPage + 1)}
                    className="px-2 py-1 border rounded text-xs hover:bg-gray-100"
                  >
                    {currentPage + 1}
                  </button>
                )}
                {currentPage < totalPages - 1 && (
                  <span className="px-0.5 text-xs">...</span>
                )}
                {currentPage < totalPages && (
                  <button
                    onClick={() => paginate(totalPages)}
                    className="px-2 py-1 border rounded text-xs hover:bg-gray-100"
                  >
                    {totalPages}
                  </button>
                )}
              </>
            )}
            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              className={`p-1 border rounded ${
                currentPage === totalPages
                  ? "text-gray-300 cursor-not-allowed"
                  : "hover:bg-gray-100"
              }`}
            >
              <ChevronRight size={14} />
            </button>
          </div>
        </div>
      )}
    </div>
  );

  const renderAnalyticsTab = () => (
    <div className="flex gap-3">
      <div className="w-3/4 py-3 bg-white">
        <div className="flex space-x-2">
          <div className="bg-white rounded p-2 border border-gray-300 w-full">
            <div className="flex justify-between items-center mb-1">
              <span className="text-gray-500 text-sm font-semibold">
                Total Views
              </span>
              <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-white"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              </div>
            </div>
            <div className="mb-0.5">
              <span className="text-2xl font-bold">23,564</span>
              <span className="text-xs text-green-500"> ▲ 6.4%</span>
            </div>
            <div className="flex items-center">
              <span className="text-xs text-gray-500">vs last day</span>
            </div>
          </div>

          <div className="bg-white rounded p-2 border border-gray-300 w-full">
            <div className="flex justify-between items-center mb-1">
              <span className="text-gray-500 text-sm font-semibold">
                Total Applied
              </span>
              <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-white"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                  <path d="M16 2v4" />
                  <path d="M8 2v4" />
                  <path d="M2 10h20" />
                </svg>
              </div>
            </div>
            <div className="mb-0.5">
              <span className="text-2xl font-bold">132</span>
              <span className="text-xs text-red-500"> ▼ 0.4%</span>
            </div>
            <div className="flex items-center">
              <span className="text-xs text-gray-500">vs last day</span>
            </div>
          </div>
        </div>

        <div className="mt-3 border border-gray-300 p-2 rounded">
          <div className="flex justify-between items-center mb-2 p-2">
            <h3 className="text-lg font-bold">Job Listing View stats</h3>
            <div className="flex items-center border border-gray-300 rounded px-1 py-0.5">
              <span className="text-xs">Last 7 days</span>
              <svg
                className="h-4 w-4 ml-0.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                ></path>
              </svg>
            </div>
          </div>

          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={chart}
                margin={{ top: 5, right: 20, left: 0, bottom: 20 }}
                onMouseMove={(e) => {
                  if (e && e.activeTooltipIndex !== undefined) {
                    setHoveredPoint(e.activeTooltipIndex);
                  }
                }}
                onMouseLeave={() => setHoveredPoint(null)}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 10 }}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 10 }}
                  domain={[0, 1500]}
                  ticks={[0, 250, 500, 750, 1000, 1250, 1500]}
                />
                <Tooltip content={<CustomTooltip />} cursor={false} />
                <Line
                  type="monotone"
                  dataKey="views"
                  stroke="#10B981"
                  strokeWidth={2}
                  dot={<CustomDot />}
                  activeDot={{ r: 4, fill: "#10B981" }}
                  isAnimationActive={true}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="w-1/4 py-3">
        <div className="border border-gray-300 p-2">
          <div className="text-sm font-bold mb-2">Traffic channel</div>

          <div className="flex justify-center relative mb-4">
            <svg width="160" height="160" viewBox="-80 -80 160 160">
              <g>{generatePaths()}</g>
              <circle cx="0" cy="0" r="40" fill="white" />
            </svg>
          </div>

          <div className="grid grid-cols-2 gap-2">
            {data.map((item) => (
              <div
                key={item.name}
                className="flex items-center"
                onMouseEnter={() => {
                  setIsHovering(true);
                  setHoverSegment(item.name);
                }}
                onMouseLeave={() => {
                  setIsHovering(false);
                  setHoverSegment(null);
                }}
              >
                <div
                  className="w-2 h-2 mr-1"
                  style={{
                    backgroundColor: item.color,
                    transform:
                      hoverSegment === item.name ? "scale(1.2)" : "scale(1)",
                    transition: "transform 0.2s",
                  }}
                />
                <span className="text-xs">
                  {item.name} : {item.value}%
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="border border-gray-300 p-2 mt-3">
          <h2 className="text-sm font-semibold mb-2">Visitors by country</h2>
          <style>
            {`
            .custom-scrollbar::-webkit-scrollbar {
              width: 6px;
            }
            .custom-scrollbar::-webkit-scrollbar-track {
              background: transparent;
            }
            .custom-scrollbar::-webkit-scrollbar-thumb {
              background-color: #4fd1c5;
              border-radius: 10px;
            }
            .custom-scrollbar {
              scrollbar-width: thin;
              scrollbar-color: #4fd1c5 transparent;
            }
            `}
          </style>
          <div className="h-48 overflow-y-auto pr-1 custom-scrollbar">
            <div className="space-y-2">
              {countries.map((country) => (
                <div
                  key={country.name}
                  className="flex items-center justify-between hover:bg-gray-50 p-1 rounded text-xs"
                >
                  <div className="flex items-center">
                    <img
                      src={`https://flagcdn.com/w40/${country.code}.png`}
                      alt={`${country.name} flag`}
                      className="h-4 w-6 mr-1 object-cover rounded-sm"
                    />
                    <span>{country.name}</span>
                  </div>
                  <span className="font-medium">
                    {country.visitors.toLocaleString()}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex flex-row flex-grow">
        <div className="h-screen sticky top-0">
          <Sidebar />
        </div>
        <div className="flex-grow transition-all">
          <Header />

          {loading ? (
            <div className="flex items-center justify-center h-[calc(100vh-64px)]">
              <div className="flex flex-col items-center">
                <Loader className="w-8 h-8 text-blue-500 animate-spin" />
                <p className="mt-2 text-gray-600">Loading job data...</p>
              </div>
            </div>
          ) : error ? (
            <div className="flex items-center justify-center h-[calc(100vh-64px)]">
              <div className="text-center bg-red-50 p-4 rounded-lg max-w-lg">
                <AlertTriangle className="w-8 h-8 text-red-500 mx-auto mb-2" />
                <h3 className="text-red-800 font-medium">Error</h3>
                <p className="text-red-600 mt-1">{error}</p>
                <button 
                  onClick={() => navigate("/job-listing")}
                  className="mt-3 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Back to Job Listings
                </button>
              </div>
            </div>
          ) : (
            <div className="p-4">
              <div className="flex flex-col">
                <div className="flex justify-between items-center mb-4">
                  <h1 className="text-2xl font-semibold">{jobData.position}</h1>
                  <button
                    onClick={() => setIsEditModalOpen(true)}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm"
                  >
                    Edit Job
                  </button>
                </div>

                <div className="flex flex-col space-y-4 mb-6">
                  <div className="flex flex-wrap gap-4">
                    <div className="flex items-center gap-2">
                      <div className="w-2.5 h-2.5 rounded-full bg-blue-500"></div>
                      <span className="text-sm text-gray-600">Company:</span>
                      <span className="text-sm font-medium">{jobData.company}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2.5 h-2.5 rounded-full bg-green-500"></div>
                      <span className="text-sm text-gray-600">Type:</span>
                      <span className="text-sm font-medium">{sampleJobData.jobType}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2.5 h-2.5 rounded-full bg-yellow-500"></div>
                      <span className="text-sm text-gray-600">Salary:</span>
                      <span className="text-sm font-medium">{sampleJobData.salary}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2.5 h-2.5 rounded-full bg-purple-500"></div>
                      <span className="text-sm text-gray-600">Posted:</span>
                      <span className="text-sm font-medium">{sampleJobData.postedDate}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2.5 h-2.5 rounded-full bg-red-500"></div>
                      <span className="text-sm text-gray-600">Deadline:</span>
                      <span className="text-sm font-medium">{sampleJobData.deadline}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2.5 h-2.5 rounded-full bg-indigo-500"></div>
                      <span className="text-sm text-gray-600">Applicants:</span>
                      <span className="text-sm font-medium">
                        {sampleJobData.applied} / {sampleJobData.capacity}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="bg-white border border-gray-200 rounded-lg mb-6">
                  <div className="border-b border-gray-200">
                    <nav className="flex flex-wrap">
                      <button
                        onClick={() => setActiveTab("Job Details")}
                        className={`px-4 py-3 text-sm font-medium ${
                          activeTab === "Job Details"
                            ? "text-blue-600 border-b-2 border-blue-600"
                            : "text-gray-500 hover:text-gray-700"
                        }`}
                      >
                        Job Details
                      </button>
                      <button
                        onClick={() => setActiveTab("Applicants")}
                        className={`px-4 py-3 text-sm font-medium ${
                          activeTab === "Applicants"
                            ? "text-blue-600 border-b-2 border-blue-600"
                            : "text-gray-500 hover:text-gray-700"
                        }`}
                      >
                        Applicants
                      </button>
                      <button
                        onClick={() => setActiveTab("Analytics")}
                        className={`px-4 py-3 text-sm font-medium ${
                          activeTab === "Analytics"
                            ? "text-blue-600 border-b-2 border-blue-600"
                            : "text-gray-500 hover:text-gray-700"
                        }`}
                      >
                        Analytics
                      </button>
                    </nav>
                  </div>

                  <div className="p-4">
                    {activeTab === "Job Details" && renderJobDetailsTab()}
                    {activeTab === "Applicants" && renderApplicantsTab()}
                    {activeTab === "Analytics" && renderAnalyticsTab()}
                  </div>
                </div>
              </div>

              {isEditModalOpen && <EditJobModal />}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default JobApplicant;
