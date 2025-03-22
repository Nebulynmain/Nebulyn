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
import { useNavigate } from "react-router-dom";

const JobApplicant = () => {
  const navigate = useNavigate();
  const [view, setView] = useState("table");
  const candidates = [
    {
      id: 1,
      name: "Jake Gyll",
      score: 0.0,
      hiringStage: "Interview",
      appliedDate: "13 July, 2021",
      jobRole: "Designer",
      image: "https://randomuser.me/api/portraits/men/1.jpg",
    },
    {
      id: 2,
      name: "Guy Hawkins",
      score: 0.0,
      hiringStage: "Interview",
      appliedDate: "13 July, 2021",
      jobRole: "JavaScript Dev",
      image: "https://randomuser.me/api/portraits/men/2.jpg",
    },
    {
      id: 3,
      name: "Cyndy Lillibridge",
      score: 4.5,
      hiringStage: "Shortlisted",
      appliedDate: "12 July, 2021",
      jobRole: "Golang Dev",
      image: "https://randomuser.me/api/portraits/women/3.jpg",
    },
    {
      id: 4,
      name: "Rodolfo Goode",
      score: 3.75,
      hiringStage: "Declined",
      appliedDate: "11 July, 2021",
      jobRole: "NET Dev",
      image: "https://randomuser.me/api/portraits/men/4.jpg",
    },
    {
      id: 5,
      name: "Leif Floyd",
      score: 4.8,
      hiringStage: "Hired",
      appliedDate: "11 July, 2021",
      jobRole: "Graphic Design",
      image: "https://randomuser.me/api/portraits/men/5.jpg",
    },
    {
      id: 6,
      name: "Jenny Wilson",
      score: 4.6,
      hiringStage: "Hired",
      appliedDate: "9 July, 2021",
      jobRole: "Designer",
      image: "https://randomuser.me/api/portraits/women/6.jpg",
    },
    {
      id: 7,
      name: "Jerome Bell",
      score: 4.0,
      hiringStage: "Interviewed",
      appliedDate: "5 July, 2021",
      jobRole: "Designer",
      image: "https://randomuser.me/api/portraits/men/7.jpg",
    },
    {
      id: 8,
      name: "Eleanor Pena",
      score: 3.9,
      hiringStage: "Declined",
      appliedDate: "5 July, 2021",
      jobRole: "Designer",
      image: "https://randomuser.me/api/portraits/women/8.jpg",
    },
    {
      id: 9,
      name: "Darrell Steward",
      score: 4.2,
      hiringStage: "Shortlisted",
      appliedDate: "3 July, 2021",
      jobRole: "Designer",
      image: "https://randomuser.me/api/portraits/men/9.jpg",
    },
    {
      id: 10,
      name: "Floyd Miles",
      score: 4.1,
      hiringStage: "Interviewed",
      appliedDate: "1 July, 2021",
      jobRole: "Designer",
      image: "https://randomuser.me/api/portraits/men/10.jpg",
    },
  ];

  const [jobData, setJobData] = useState({
    company: "Stripe",
    position: "Social Media Marketing Expert",
    description:
      "Stripe is looking for Social Media Marketing expert to help manage our online networks. You will be responsible for monitoring our social media channels, creating content, finding effective ways to engage the community and incentivize others to engage on our channels.",
    responsibilities: [
      "Community engagement to ensure that is supported and actively represented online",
      "Focus on social media content development and publication",
      "Marketing and strategy support",
      "Stay on top of trends on social media platforms, and suggest content ideas to the team",
      "Engage with online communities",
    ],
    whoYouAre: [
      "You get energy from people and building the ideal work environment",
      "You have a sense for beautiful spaces and office experiences",
      "You are a confident office manager, ready for added responsibilities",
      "You're detail-oriented and creative",
      "You're a growth marketer and know how to run campaigns",
    ],
    niceToHaves: [
      "Fluent in English",
      "Project management skills",
      "Copy editing skills",
    ],
  });

  const [sampleJobData, setSampleJobData] = useState({
    applied: 5,
    capacity: 10,
    deadline: "July 31, 2021",
    postedDate: "July 1, 2021",
    jobType: "Full-Time",
    salary: "$75k-$85k USD",
    categories: ["Marketing", "Design"],
    requiredSkills: [
      "Project Management",
      "Copywriting",
      "English",
      "Social Media Marketing",
      "Copy Editing",
    ],
  });

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

  const data = [
    { name: "Direct", value: 48, color: "#FFBA49" },
    { name: "Social", value: 23, color: "#4DA1FF" },
    { name: "Organic", value: 24, color: "#0066FF" },
    { name: "Other", value: 5, color: "#4ECDC4" },
  ];

  const [selectedCandidates, setSelectedCandidates] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectAll, setSelectAll] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [applicantsPerPage, setApplicantsPerPage] = useState(10);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editedJobData, setEditedJobData] = useState(jobData);
  const [editedSampleData, setEditedSampleData] = useState(sampleJobData);
  const [activeTab, setActiveTab] = useState("Applicants");
  const [isHovering, setIsHovering] = useState(false);
  const [hoverSegment, setHoverSegment] = useState(null);
  const [hoveredPoint, setHoveredPoint] = useState(null);

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
    setEditedJobData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSampleDataChange = (field, value) => {
    setEditedSampleData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleArrayFieldChange = (field, index, value) => {
    setEditedJobData((prev) => ({
      ...prev,
      [field]: prev[field].map((item, i) => (i === index ? value : item)),
    }));
  };

  const handleAddArrayItem = (field) => {
    setEditedJobData((prev) => ({
      ...prev,
      [field]: [...prev[field], ""],
    }));
  };

  const handleRemoveArrayItem = (field, index) => {
    setEditedJobData((prev) => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index),
    }));
  };

  const handleSaveChanges = () => {
    setJobData(editedJobData);
    setSampleJobData(editedSampleData);
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

  const getStarColor = (score) => {
    return score > 0 ? "text-yellow-500" : "text-gray-400";
  };

  const CandidateCard = ({ candidate }) => (
    <div className="bg-white p-4 rounded-lg shadow mb-3 border border-gray-200">
      <div className="flex items-center mb-3">
        <div className="w-10 h-10 flex-shrink-0">
          <img
            src={candidate.image}
            alt={candidate.name}
            className="w-full h-full rounded-full border object-cover"
          />
        </div>
        <div className="ml-3 min-w-0">
          <h3 className="font-medium text-gray-900 truncate">
            {candidate.name}
          </h3>
          <p className="text-sm text-gray-500 truncate">{candidate.jobRole}</p>
        </div>
      </div>
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <Star
            className={getStarColor(candidate.score)}
            fill={candidate.score > 0 ? "#FACC15" : "none"}
            size={16}
          />
          <span className="ml-1 text-gray-900 font-medium">
            {candidate.score}
          </span>
        </div>
        <span className="text-sm text-gray-500">{candidate.appliedDate}</span>
      </div>
      <div className="mt-3 flex justify-center">
        <button
          className="w-full px-3 py-1 cursor-pointer border border-blue-500 bg-[#E9EBFD] text-blue-500 text-sm rounded hover:bg-blue-100 transition-colors"
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

      const outerRadius = 80;
      const innerRadius = 60;

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
    { name: "Brazil", visitors: 1498, code: "br" },
    { name: "China", visitors: 1425, code: "cn" },
    { name: "South Korea", visitors: 1387, code: "kr" },
    { name: "India", visitors: 1354, code: "in" },
    { name: "Mexico", visitors: 1298, code: "mx" },
    { name: "Switzerland", visitors: 1165, code: "ch" },
    { name: "Sweden", visitors: 1042, code: "se" },
    { name: "Norway", visitors: 975, code: "no" },
    { name: "Singapore", visitors: 924, code: "sg" },
    { name: "Thailand", visitors: 867, code: "th" },
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
        <div className="bg-gray-800 text-white p-2 text-center">
          <p className="text-sm">Views</p>
          <p className="text-xl font-bold">{payload[0].value}</p>
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
        {/* <circle
          cx={cx}
          cy={cy}
          r={isLast ? 4 : 0}
          fill="#10B981"
          stroke="#10B981"
          strokeWidth={2}
        /> */}
      </g>
    );
  };

  const EditJobModal = () => {
    if (!isEditModalOpen) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg w-3/4 max-h-[90vh] overflow-y-auto">
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Edit Job Details</h2>
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="text-gray-500 hover:text-gray-700 cursor-pointer"
              >
                <X size={24} />
              </button>
            </div>

            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-4">Basic Information</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Position Title
                  </label>
                  <input
                    type="text"
                    value={editedSampleData.position}
                    onChange={(e) =>
                      handleSampleDataChange("position", e.target.value)
                    }
                    className="w-full p-2 border rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <textarea
                    value={editedJobData.description}
                    onChange={(e) =>
                      handleJobDataChange("description", e.target.value)
                    }
                    className="w-full p-2 border rounded-md h-32"
                  />
                </div>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-4">Job Details</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Job Type
                  </label>
                  <input
                    type="text"
                    value={editedSampleData.jobType}
                    onChange={(e) =>
                      handleSampleDataChange("jobType", e.target.value)
                    }
                    className="w-full p-2 border rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Salary Range
                  </label>
                  <input
                    type="text"
                    value={editedSampleData.salary}
                    onChange={(e) =>
                      handleSampleDataChange("salary", e.target.value)
                    }
                    className="w-full p-2 border rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Application Deadline
                  </label>
                  <input
                    type="text"
                    value={editedSampleData.deadline}
                    onChange={(e) =>
                      handleSampleDataChange("deadline", e.target.value)
                    }
                    className="w-full p-2 border rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Capacity
                  </label>
                  <input
                    type="number"
                    value={editedSampleData.capacity}
                    onChange={(e) =>
                      handleSampleDataChange(
                        "capacity",
                        parseInt(e.target.value)
                      )
                    }
                    className="w-full p-2 border rounded-md"
                  />
                </div>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-4">Responsibilities</h3>
              <div className="space-y-3">
                {editedJobData.responsibilities.map((responsibility, index) => (
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
                      className="flex-1 p-2 border rounded-md"
                    />
                    <button
                      onClick={() =>
                        handleRemoveArrayItem("responsibilities", index)
                      }
                      className="text-red-500 hover:text-red-700 cursor-pointer"
                    >
                      <X size={20} />
                    </button>
                  </div>
                ))}
                <button
                  onClick={() => handleAddArrayItem("responsibilities")}
                  className="text-blue-500 hover:text-blue-700 cursor-pointer"
                >
                  + Add Responsibility
                </button>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-4">Who You Are</h3>
              <div className="space-y-3">
                {editedJobData.whoYouAre.map((trait, index) => (
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
                      className="flex-1 p-2 border rounded-md"
                    />
                    <button
                      onClick={() => handleRemoveArrayItem("whoYouAre", index)}
                      className="text-red-500 hover:text-red-700 cursor-pointer"
                    >
                      <X size={20} />
                    </button>
                  </div>
                ))}
                <button
                  onClick={() => handleAddArrayItem("whoYouAre")}
                  className="text-blue-500 hover:text-blue-700 cursor-pointer"
                >
                  + Add Trait
                </button>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-4">Nice-To-Haves</h3>
              <div className="space-y-3">
                {editedJobData.niceToHaves.map((item, index) => (
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
                      className="flex-1 p-2 border rounded-md"
                    />
                    <button
                      onClick={() =>
                        handleRemoveArrayItem("niceToHaves", index)
                      }
                      className="text-red-500 hover:text-red-700 cursor-pointer"
                    >
                      <X size={20} />
                    </button>
                  </div>
                ))}
                <button
                  onClick={() => handleAddArrayItem("niceToHaves")}
                  className="text-blue-500 hover:text-blue-700 cursor-pointer"
                >
                  + Add Nice-To-Have
                </button>
              </div>
            </div>

            <div className="flex justify-end mt-8">
              <button
                onClick={handleSaveChanges}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 cursor-pointer"
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
      <div className="flex items-center justify-between w-full p-6 border-2 border-blue-400 mt-5">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-12 h-12 text-white bg-blue-500 rounded-md">
            <span className="font-bold">S</span>
          </div>
          <span className="text-2xl font-bold text-gray-800">
            Social Media Assistant
          </span>
        </div>
        <button
          onClick={() => setIsEditModalOpen(true)}
          className="flex items-center gap-1 px-3 py-2 text-sm text-blue-500 border border-blue-500 cursor-pointer hover:bg-blue-50"
        >
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
          >
            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
          </svg>
          Edit Job Details
        </button>
      </div>
      {EditJobModal()}
      <div className="flex p-6">
        <div className="w-3/4 p-6 bg-white">
          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              Description
            </h2>
            <p className="text-lg text-gray-600">{jobData.description}</p>
          </div>

          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              Responsibilities
            </h2>
            <ul className="space-y-3">
              {jobData.responsibilities.map((item, index) => (
                <li key={index} className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full flex items-center justify-center mt-1.5 mr-3">
                    <svg
                      width="120"
                      height="120"
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
                  <span className="text-lg text-gray-600">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              Who You Are
            </h2>
            <ul className="space-y-3">
              {jobData.whoYouAre.map((item, index) => (
                <li key={index} className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full flex items-center justify-center mt-1.5 mr-3">
                    <svg
                      width="120"
                      height="120"
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
                  <span className="text-lg text-gray-600">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              Nice-To-Haves
            </h2>
            <ul className="space-y-3">
              {jobData.niceToHaves.map((item, index) => (
                <li key={index} className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full flex items-center justify-center mt-1.5 mr-3">
                    <svg
                      width="120"
                      height="120"
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
                  <span className="text-lg text-gray-600">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="w-1/4 p-6">
          <div className="bg-white p-4">
            <h2 className="text-xl font-bold text-gray-800 mb-6">
              About this role
            </h2>

            <div className="bg-gray-50 p-5 rounded-lg mb-8">
              <div className="mb-5">
                <div className="flex justify-between text-base mb-2">
                  <span className="text-gray-800 font-semibold">
                    {sampleJobData.applied || 0} applied
                  </span>
                  <span className="text-gray-500">
                    of {sampleJobData.capacity || 0} capacity
                  </span>
                </div>
                <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
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

            <div className="space-y-4 py-2">
              {[
                {
                  label: "Apply Before",
                  value: sampleJobData.deadline,
                },
                {
                  label: "Job Posted On",
                  value: sampleJobData.postedDate,
                },
                { label: "Job Type", value: sampleJobData.jobType },
                { label: "Salary", value: sampleJobData.salary },
              ].map((item, index) => (
                <div
                  key={index}
                  className="flex justify-between text-base font-medium"
                >
                  <span className="text-gray-600">{item.label}</span>
                  <span className="text-gray-900">{item.value || "N/A"}</span>
                </div>
              ))}
            </div>
            <div className="border-b border-blue-400 text-transparent mb-6">
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
              <div key={idx} className="mb-8">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">
                  {section.title}
                </h3>
                <div className="flex flex-wrap gap-3">
                  {section.data && section.data.length > 0 ? (
                    section.data.map((item, index) => (
                      <span
                        key={index}
                        className={`${section.bgColor} ${section.textColor} px-4 py-2 rounded-full text-base font-medium`}
                      >
                        {item}
                      </span>
                    ))
                  ) : (
                    <span className="text-gray-500 text-base">
                      No {section.title.toLowerCase()} available
                    </span>
                  )}
                </div>
                {idx === 0 && (
                  <div className="border-b border-blue-400 mt-10"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="py-8 px-6 bg-white border-t border-blue-400">
        <div className="text-left mb-10 px-9">
          <h2 className="text-3xl font-bold text-gray-900">Perks & Benefits</h2>
          <p className="text-gray-600">
            This job comes with several perks and benefits
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {perksData.map((perk, index) => (
            <div
              key={index}
              className="flex flex-col items-left text-left p-6 transition duration-300"
            >
              <div className="mb-4">{perk.icon}</div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900">
                {perk.title}
              </h3>
              <p className="text-gray-600">{perk.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderApplicantsTab = () => (
    <div className="container mx-auto">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center p-4 md:p-6">
        <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-4 md:mb-0">
          Total Applicants:{" "}
          <span className="font-bold">{filteredCandidates.length}</span>
        </h2>
        <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
          <div className="relative w-full md:w-auto">
            <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search Applicants"
              className="w-full md:w-64 pl-10 pr-5 py-2 md:py-3 text-base border rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
            />
          </div>

          <button className="flex items-center gap-2 px-5 py-2 md:py-3 border rounded-lg hover:bg-gray-100 text-base w-full md:w-auto justify-center md:justify-start">
            <Filter className="h-5 w-5" /> Filter
          </button>

          <div className="hidden md:block border-l h-8 mx-1"></div>

          <div className="flex bg-blue-100 p-2 rounded-lg w-full md:w-auto mt-4 md:mt-0">
            <button
              className={`w-40 h-12 px-6 py-2 rounded-md text-blue-600 text-base ${
                view === "pipeline" ? "bg-white shadow" : "hover:bg-blue-200"
              }`}
              onClick={() => setView("pipeline")}
            >
              Pipeline View
            </button>
            <button
              className={`w-40 h-12 px-6 py-2 rounded-md text-blue-600 text-base ${
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
        <div className="overflow-x-auto px-4 md:px-6">
          <table className="min-w-full border-collapse border border-gray-200 rounded-lg overflow-hidden">
            <thead className="bg-white text-gray-500 uppercase text-sm border-b border-gray-200">
              <tr>
                <th className="p-3 md:p-4 text-left">
                  <input
                    type="checkbox"
                    className="form-checkbox text-blue-500 border-gray-300 rounded-md"
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
                  <th key={header} className="p-3 md:p-4 text-left font-medium">
                    <div className="flex items-center space-x-2">
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
                    <td className="p-3 md:p-4">
                      <input
                        type="checkbox"
                        className="form-checkbox text-blue-500"
                        checked={selectedCandidates.includes(candidate.id)}
                        onChange={() => handleSelect(candidate.id)}
                      />
                    </td>
                    <td className="p-3 md:p-4">
                      <div className="flex items-center space-x-3">
                        <img
                          src={candidate.image}
                          alt={candidate.name}
                          className="w-8 h-8 rounded-full border object-cover"
                        />
                        <span className="font-medium text-gray-900">
                          {candidate.name}
                        </span>
                      </div>
                    </td>
                    <td className="p-3 md:p-4">
                      <div className="flex items-center space-x-1">
                        <Star
                          className={getStarColor(candidate.score)}
                          fill={candidate.score > 0 ? "#FACC15" : "none"}
                          size={16}
                        />
                        <span className="text-gray-900 font-medium">
                          {candidate.score}
                        </span>
                      </div>
                    </td>
                    <td className="p-3 md:p-4">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium
                        ${
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
                    <td className="p-3 md:p-4">{candidate.appliedDate}</td>
                    <td className="p-3 md:p-4">{candidate.jobRole}</td>
                    <td className="p-3 md:p-4">
                      <button
                        className="px-3 py-1 md:px-4 md:py-2 border border-blue-500 bg-[#E9EBFD] text-blue-500 rounded text-sm"
                        onClick={() => navigate("/applicant-detail")}
                      >
                        See Application
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="p-4 text-center text-gray-500">
                    No matching applicants found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {view === "pipeline" && (
        <div className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
            {stageOrder.map((stage) => (
              <div key={stage} className="bg-white rounded-lg shadow">
                <div className={`p-3 rounded-t-lg ${getStageColor(stage)}`}>
                  <div className="flex justify-between items-center">
                    <h3 className={`font-medium ${getStageTextColor(stage)}`}>
                      {stage}
                    </h3>
                    <span className="bg-white px-2 py-1 rounded-full text-sm font-medium text-gray-700">
                      {stageGroups[stage].length}
                    </span>
                  </div>
                </div>
                <div className="p-3 max-h-96 overflow-y-auto">
                  {stageGroups[stage].length > 0 ? (
                    stageGroups[stage].map((candidate) => (
                      <CandidateCard key={candidate.id} candidate={candidate} />
                    ))
                  ) : (
                    <div className="text-center py-8 text-gray-500">
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
        <div className="flex flex-col md:flex-row justify-between items-center p-4 md:p-6">
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <span>View</span>
            <select
              value={applicantsPerPage}
              onChange={(e) => {
                setApplicantsPerPage(Number(e.target.value));
                setCurrentPage(1);
              }}
              className="border rounded-md px-2 py-1"
            >
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
            </select>
            <span>Applicants per page</span>
          </div>
          <div className="flex items-center space-x-1 md:space-x-2 overflow-x-auto w-full md:w-auto justify-center">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className={`p-2 border rounded-md ${
                currentPage === 1
                  ? "text-gray-300 cursor-not-allowed"
                  : "hover:bg-gray-100"
              }`}
            >
              <ChevronLeft size={16} />
            </button>
            {totalPages <= 5 ? (
              [...Array(totalPages)].map((_, index) => (
                <button
                  key={index + 1}
                  onClick={() => paginate(index + 1)}
                  className={`px-3 py-1 md:px-4 md:py-2 border rounded-md ${
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
                    className="px-3 py-1 md:px-4 md:py-2 border rounded-md hover:bg-gray-100"
                  >
                    1
                  </button>
                )}
                {currentPage > 2 && <span className="px-1">...</span>}
                {currentPage > 1 && (
                  <button
                    onClick={() => paginate(currentPage - 1)}
                    className="px-3 py-1 md:px-4 md:py-2 border rounded-md hover:bg-gray-100"
                  >
                    {currentPage - 1}
                  </button>
                )}
                <button className="px-3 py-1 md:px-4 md:py-2 border rounded-md bg-blue-500 text-white">
                  {currentPage}
                </button>
                {currentPage < totalPages && (
                  <button
                    onClick={() => paginate(currentPage + 1)}
                    className="px-3 py-1 md:px-4 md:py-2 border rounded-md hover:bg-gray-100"
                  >
                    {currentPage + 1}
                  </button>
                )}
                {currentPage < totalPages - 1 && (
                  <span className="px-1">...</span>
                )}
                {currentPage < totalPages && (
                  <button
                    onClick={() => paginate(totalPages)}
                    className="px-3 py-1 md:px-4 md:py-2 border rounded-md hover:bg-gray-100"
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
              className={`p-2 border rounded-md ${
                currentPage === totalPages
                  ? "text-gray-300 cursor-not-allowed"
                  : "hover:bg-gray-100"
              }`}
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      )}
    </div>
  );

  const renderAnalyticsTab = () => (
    <div className="flex gap-4">
      <div className="w-3/4 py-6 bg-white">
        <div className="flex space-x-4">
          <div className="bg-white rounded-sm p-4 border border-gray-300 w-full">
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-500 text-lg font-semibold">
                Total Views
              </span>
              <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-white"
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
            <div className="mb-1">
              <span className="text-4xl font-bold text-gray-800">23,564</span>
              <span className="text-md text-green-500"> ▲ 6.4%</span>
            </div>
            <div className="flex items-center">
              <span className="text-md text-gray-500 ml-1">vs last day</span>
            </div>
          </div>

          <div className="bg-white rounded-sm p-4 border border-gray-300 w-full">
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-500 text-lg font-semibold">
                Total Applied
              </span>
              <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-white"
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
            <div className="mb-1">
              <span className="text-4xl font-bold text-gray-800">132</span>
              <span className="text-md text-red-500"> ▼ 0.4%</span>
            </div>
            <div className="flex items-center">
              <span className="text-md text-gray-500 ml-1">vs last day</span>
            </div>
          </div>
        </div>

        <div className="mt-6 border border-gray-300 p-4 rounded-sm">
          <div className="flex justify-between items-center mb-4 p-4">
            <h3 className="text-2xl font-bold">Job Listing View stats</h3>
            <div className="flex items-center border border-gray-300 rounded px-2 py-1">
              <span className="text-md">Last 7 days</span>
              <svg
                className="h-6 w-6 ml-1"
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

          <div className="h-102">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={chart}
                margin={{ top: 10, right: 30, left: 0, bottom: 30 }}
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
                  tick={{ fontSize: 12 }}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12 }}
                  domain={[0, 1500]}
                  ticks={[0, 250, 500, 750, 1000, 1250, 1500]}
                />
                <Tooltip content={<CustomTooltip />} cursor={false} />
                <Line
                  type="monotone"
                  dataKey="views"
                  stroke="#10B981"
                  strokeWidth={3}
                  dot={<CustomDot />}
                  activeDot={{ r: 6, fill: "#10B981" }}
                  isAnimationActive={true}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="w-1/4 py-6">
        <div className="border border-gray-300 p-3">
          <div className="text-lg font-bold text-gray-800 mb-4">
            Traffic channel
          </div>

          <div className="flex justify-center relative mb-6">
            <svg width="200" height="200" viewBox="-100 -100 200 200">
              <g>{generatePaths()}</g>
              <circle cx="0" cy="0" r="60" fill="white" />
            </svg>
          </div>

          <div className="grid grid-cols-2 gap-4">
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
                  className="w-3 h-3 mr-2"
                  style={{
                    backgroundColor: item.color,
                    transform:
                      hoverSegment === item.name ? "scale(1.2)" : "scale(1)",
                    transition: "transform 0.2s",
                  }}
                />
                <span className="text-gray-600 text-sm">
                  {item.name} : {item.value}%
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="border border-gray-300 p-3 mt-6">
          <h2 className="text-lg font-semibold mb-4 text-gray-800">
            Visitors by country
          </h2>
          <style>
            {`
            .custom-scrollbar::-webkit-scrollbar {
              width: 8px;
            }
            .custom-scrollbar::-webkit-scrollbar-track {
              background: transparent;
            }
            .custom-scrollbar::-webkit-scrollbar-thumb {
              background-color: #4fd1c5;
              border-radius: 20px;
            }
            .custom-scrollbar {
              scrollbar-width: thin;
              scrollbar-color: #4fd1c5 transparent;
            }
            `}
          </style>
          <div className="h-64 overflow-y-auto pr-2 custom-scrollbar">
            <div className="space-y-3">
              {countries.map((country) => (
                <div
                  key={country.name}
                  className="flex items-center justify-between hover:bg-gray-50 p-2 rounded"
                >
                  <div className="flex items-center">
                    <img
                      src={`https://flagcdn.com/w40/${country.code}.png`}
                      alt={`${country.name} flag`}
                      className="h-6 w-8 mr-3 object-cover rounded-sm"
                    />
                    <span className="text-gray-700">{country.name}</span>
                  </div>
                  <span className="text-gray-800 font-medium">
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
          <div className="">
            <div className="flex justify-between items-center py-6 px-9">
              <div className="flex items-center space-x-2">
                <button
                  className="text-gray-700 text-4xl font-bold mb-2 cursor-pointer"
                  onClick={() => navigate("/job-listing")}
                >
                  ←
                </button>
                <h1
                  className="text-3xl text-gray-900 cursor-pointer"
                  onClick={() => navigate("/job-listing")}
                >
                  <span className="font-bold">Social Media Assistant</span>
                  <p className="text-gray-600 text-lg mt-2">
                    Design • Full-Time •
                    <span className="text-gray-900 font-semibold"> 4</span> /
                    <span className="text-gray-400"> 11 Hired</span>
                  </p>
                </h1>
              </div>

              <button className="border border-blue-500 text-blue-500 px-4 py-2 rounded-md flex items-center space-x-1 cursor-pointer">
                <ChevronDown size={16} />
                <span>More Action</span>
              </button>
            </div>

            <div className="bg-white p-6 font-sans">
              <div className="border-b border-gray-200">
                <div className="flex space-x-8">
                  <div
                    className={`pb-2 cursor-pointer ${
                      activeTab === "Applicants"
                        ? "border-b-2 border-blue-500"
                        : ""
                    }`}
                    onClick={() => setActiveTab("Applicants")}
                  >
                    <span
                      className={
                        activeTab === "Applicants"
                          ? "text-blue-500 font-medium text-lg"
                          : "text-gray-500 text-lg"
                      }
                    >
                      Applicants
                    </span>
                  </div>
                  <div
                    className={`pb-2 cursor-pointer ${
                      activeTab === "Job Details"
                        ? "border-b-2 border-blue-500"
                        : ""
                    }`}
                    onClick={() => setActiveTab("Job Details")}
                  >
                    <span
                      className={
                        activeTab === "Job Details"
                          ? "text-blue-500 font-medium text-lg"
                          : "text-gray-500 text-lg"
                      }
                    >
                      Job Details
                    </span>
                  </div>
                  <div
                    className={`pb-2 cursor-pointer ${
                      activeTab === "Analytics"
                        ? "border-b-2 border-blue-500"
                        : ""
                    }`}
                    onClick={() => setActiveTab("Analytics")}
                  >
                    <span
                      className={
                        activeTab === "Analytics"
                          ? "text-blue-500 font-medium text-lg"
                          : "text-gray-500 text-lg"
                      }
                    >
                      Analytics
                    </span>
                  </div>
                </div>
              </div>

              {activeTab === "Applicants" && renderApplicantsTab()}
              {activeTab === "Job Details" && renderJobDetailsTab()}
              {activeTab === "Analytics" && renderAnalyticsTab()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobApplicant;
