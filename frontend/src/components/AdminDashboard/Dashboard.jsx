import React, { useState, useEffect } from "react";
import { CalendarIcon } from "lucide-react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { MoreHorizontal, ArrowRight } from "lucide-react";
import { PieChart, Pie, Cell } from "recharts";
import { API_URL } from "../../App";
import axios from "axios";
import { format, parseISO, startOfMonth, endOfMonth } from "date-fns";

// Dummy data for fallback
const dummyData = [
  { name: "Unsuitable", value: 60, color: "#3B82F6" }, // Blue color
  { name: "Interviewed", value: 40, color: "#E2E8F0" }, // Gray color
];

const applications = [
  {
    id: 1,
    company: "Nomad",
    location: "Paris, France",
    position: "Social Media Assistant",
    dateApplied: "24 July 2021",
    status: "In Review",
    statusColor: "border-amber-300 text-amber-500",
    bgColor: "bg-blue-50",
    icon: (
      <svg
        width="48"
        height="48"
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M24 12L12 18V30L24 36L36 30V18L24 12Z"
          fill="#4ADE80"
          stroke="#4ADE80"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M24 36V24"
          stroke="white"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M36 18L24 24L12 18"
          stroke="white"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    id: 2,
    company: "Udacity",
    location: "New York, USA",
    position: "Social Media Assistant",
    dateApplied: "23 July 2021",
    status: "Shortlisted",
    statusColor: "border-blue-300 text-blue-500",
    bgColor: "",
    icon: (
      <svg
        width="48"
        height="48"
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="24" cy="24" r="20" fill="#06B6D4" />
        <path
          d="M30 19L24 24L30 29"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M18 29V19"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    id: 3,
    company: "Packer",
    location: "Madrid, Spain",
    position: "Social Media Assistant",
    dateApplied: "22 July 2021",
    status: "Declined",
    statusColor: "border-red-300 text-red-500",
    bgColor: "bg-blue-50",
    icon: (
      <svg
        width="48"
        height="48"
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M32 16H24V32H32V16Z" fill="#FF6B6B" />
        <path d="M16 16H24V24H16V16Z" fill="#FF6B6B" />
        <path d="M16 24H24V32H16V24Z" fill="#FF9F9F" />
      </svg>
    ),
  },
];

const Dashboard = () => {
  // State for data from API
  const [user, setUser] = useState(null);
  const [applications, setApplications] = useState([]);
  const [totalJobs, setTotalJobs] = useState(0);
  const [interviewCount, setInterviewCount] = useState(0);
  const [dateRange, setDateRange] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [chartData, setChartData] = useState(dummyData);
  
  // State for current date in the interviews calendar
  const [currentDate, setCurrentDate] = useState("26 November");
  const [interviewsByDate, setInterviewsByDate] = useState({});

  // Fetch user data on component mount
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`${API_URL}/auth/profile`, {
          withCredentials: true
        });
        
        if (response.data.ok) {
          setUser(response.data.data);
        } else {
          setError("Failed to fetch user data");
        }
      } catch (err) {
        console.error("Error fetching user:", err);
        setError("Error fetching user data");
      }
    };

    fetchUserData();
  }, []);

  // Fetch applications data
  useEffect(() => {
    const fetchApplications = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${API_URL}/application/user`, {
          withCredentials: true
        });
        
        if (response.data.ok) {
          const appData = response.data.data;
          setApplications(appData);
          
          // Calculate stats
          setTotalJobs(appData.length);
          
          // Count interviews
          const interviewCount = appData.filter(app => 
            app.status === "Interview" || app.status === "Shortlisted"
          ).length;
          setInterviewCount(interviewCount);
          
          // Set date range
          if (appData.length > 0) {
            const now = new Date();
            const start = startOfMonth(now);
            const end = endOfMonth(now);
            setDateRange(`${format(start, 'MMM dd')} - ${format(end, 'MMM dd')}`);
          }
          
          // Prepare chart data
          const interviewed = appData.filter(app => 
            app.status === "Interview" || app.status === "Shortlisted" || app.status === "Hired"
          ).length;
          
          const unsuitable = appData.filter(app => 
            app.status === "Rejected" || app.status === "In Review"
          ).length;
          
          if (appData.length > 0) {
            const interviewedPercentage = Math.round((interviewed / appData.length) * 100);
            const unsuitablePercentage = 100 - interviewedPercentage;
            
            setChartData([
              { name: "Unsuitable", value: unsuitablePercentage, color: "#3B82F6" },
              { name: "Interviewed", value: interviewedPercentage, color: "#E2E8F0" },
            ]);
          }
          
          // Process interview dates
          processInterviewDates(appData);
        } else {
          setError("Failed to fetch applications");
        }
      } catch (err) {
        console.error("Error fetching applications:", err);
        setError("Error fetching application data");
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);
  
  // Process interview dates from applications
  const processInterviewDates = (applications) => {
    const interviews = {};
    
    // Get applications with interview status
    const interviewApps = applications.filter(app => 
      app.status === "Interview" || app.status === "Shortlisted"
    );
    
    // Group by date
    interviewApps.forEach(app => {
      // This is a placeholder as we don't have actual interview dates in the model
      // In a real implementation, you'd use the actual interview date field
      const interviewDate = format(parseISO(app.createdAt || app.appliedAt), 'dd MMMM');
      
      if (!interviews[interviewDate]) {
        interviews[interviewDate] = [];
      }
      
      // Create a time slot (this is a placeholder)
      const hours = Math.floor(Math.random() * 8) + 9; // 9 AM to 5 PM
      const minutes = Math.random() > 0.5 ? '00' : '30';
      const time = `${hours}:${minutes} ${hours >= 12 ? 'PM' : 'AM'}`;
      
      interviews[interviewDate].push({
        time,
        name: app.job ? app.job.jobTitle : 'Unknown Position',
        role: app.job ? `at ${app.job.company?.companyName || 'Unknown Company'}` : '',
        image: "/api/placeholder/32/32",
      });
    });
    
    // If no interviews, use dummy data
    if (Object.keys(interviews).length === 0) {
      interviews["26 November"] = [
        { time: "10:00 AM", name: "", role: "", image: "" },
        { time: "10:30 AM", name: "Joe Bartmann", role: "HR Manager at Divvy", image: "https://via.placeholder.com/32" },
        { time: "11:00 AM", name: "", role: "", image: "" },
      ];
      interviews["25 November"] = [
        { time: "10:00 AM", name: "", role: "", image: "" },
        { time: "10:30 AM", name: "", role: "", image: "" },
        { time: "11:00 AM", name: "Lisa Garcia", role: "Senior Developer", image: "/api/placeholder/32/32" },
      ];
      interviews["27 November"] = [
        { time: "10:00 AM", name: "Michael Chen", role: "Product Manager", image: "/api/placeholder/32/32" },
        { time: "10:30 AM", name: "", role: "", image: "" },
        { time: "11:00 AM", name: "", role: "", image: "" },
      ];
    }
    
    setInterviewsByDate(interviews);
    
    // Set current date to first date with interviews
    if (Object.keys(interviews).length > 0) {
      setCurrentDate(Object.keys(interviews)[0]);
    }
  };

  // Get available dates in array format
  const availableDates = Object.keys(interviewsByDate);

  // Get current date index
  const currentDateIndex = availableDates.indexOf(currentDate);

  // Navigate to previous date
  const goToPrevDate = () => {
    if (currentDateIndex > 0) {
      setCurrentDate(availableDates[currentDateIndex - 1]);
    }
  };

  // Navigate to next date
  const goToNextDate = () => {
    if (currentDateIndex < availableDates.length - 1) {
      setCurrentDate(availableDates[currentDateIndex + 1]);
    }
  };

  // Get events for current date
  const events = interviewsByDate[currentDate] || [];

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex flex-row flex-grow">
        <div className="h-screen sticky top-0">
          <Sidebar />
        </div>
        <div className="flex-grow transition-all">
          <div className="flex-grow overflow-y-auto">
            <Header />
            <div className="">
              {/*Part 1 - Header section with reduced text sizes and padding*/}
              <div className="flex justify-between items-center py-4 px-6">
                <div>
                  <h1 className="text-2xl font-semibold text-black-900">
                    Good morning, {user ? user.fullName.split(" ")[0] : "User"}
                  </h1>
                  <p className="text-gray-500 mt-1 text-base">
                    Here is what's happening with your job search applications
                    from {dateRange || "this month"}.
                  </p>
                </div>
                <div className="flex items-center border-2 border-gray-300 px-3 py-1 cursor-pointer mr-3">
                  <span className="text-gray-700 font-semibold text-sm">
                    {dateRange || "This Month"}
                  </span>
                  <CalendarIcon className="w-3 h-3 text-blue-500 ml-2" />
                </div>
              </div>

              {/*Part 2 - Stats cards with fixed layout*/}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-6 py-3">
                {/* First column - Total Jobs and Interviewed Cards */}
                <div className="flex flex-col space-y-4">
                  {/* Total Jobs Applied Card */}
                  <div className="bg-white rounded-sm border border-gray-200 shadow-md p-4 flex justify-between items-center h-[120px] w-full cursor-pointer">
                    <div>
                      <p className="text-base font-bold text-black-500 mb-2">
                        Total Jobs Applied
                      </p>
                      <h2 className="text-5xl font-bold text-gray-900">
                        {loading ? "..." : totalJobs}
                      </h2>
                    </div>
                    <div className="text-gray-300">
                      <svg
                        width="70"
                        height="54"
                        viewBox="0 0 88 68"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g opacity="0.3">
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M25.667 14.6667C24.6945 14.6667 23.7619 15.053 23.0743 15.7406C22.3866 16.4283 22.0003 17.3609 22.0003 18.3333V69.6667C22.0003 70.6391 22.3866 71.5718 23.0743 72.2594C23.7619 72.947 24.6945 73.3333 25.667 73.3333H62.3337C63.3061 73.3333 64.2388 72.947 64.9264 72.2594C65.614 71.5718 66.0003 70.6391 66.0003 69.6667L66.0003 34.5188L46.1486 14.6671L25.667 14.6667ZM17.8888 10.5552C19.9517 8.49227 22.7496 7.33334 25.667 7.33334H46.149C48.0936 7.33376 49.9591 8.1065 51.3341 9.48162M51.3341 9.48162L71.185 29.3326C71.1849 29.3324 71.1851 29.3327 71.185 29.3326C72.5601 30.7075 73.3332 32.5727 73.3337 34.5172V69.6667C73.3337 72.5841 72.1747 75.382 70.1118 77.4449C68.0489 79.5078 65.251 80.6667 62.3337 80.6667H25.667C22.7496 80.6667 19.9517 79.5078 17.8888 77.4449C15.8259 75.382 14.667 72.5841 14.667 69.6667V18.3333C14.667 15.416 15.8259 12.6181 17.8888 10.5552M29.3337 44C29.3337 41.975 30.9753 40.3333 33.0003 40.3333H55.0003C57.0254 40.3333 58.667 41.975 58.667 44C58.667 46.0251 57.0254 47.6667 55.0003 47.6667H33.0003C30.9753 47.6667 29.3337 46.0251 29.3337 44ZM29.3337 58.6667C29.3337 56.6416 30.9753 55 33.0003 55H55.0003C57.0254 55 58.667 56.6416 58.667 58.6667C58.667 60.6917 57.0254 62.3333 55.0003 62.3333H33.0003C30.9753 62.3333 29.3337 60.6917 29.3337 58.6667Z"
                            fill="#515B6F"
                          />
                          <rect
                            x="29.333"
                            y="40.3333"
                            width="29.3333"
                            height="7.33333"
                            rx="3.66667"
                            fill="#26A4FF"
                          />
                          <rect
                            x="29.333"
                            y="55"
                            width="29.3333"
                            height="7.33333"
                            rx="3.66667"
                            fill="#26A4FF"
                          />
                        </g>
                      </svg>
                    </div>
                  </div>

                  {/* Interviewed Card */}
                  <div className="bg-white rounded-sm border border-gray-200 shadow-md p-4 flex justify-between items-center h-[120px] w-full cursor-pointer">
                    <div>
                      <p className="text-base font-bold text-black-500 mb-2">
                        Interviewed
                      </p>
                      <h2 className="text-5xl font-bold text-gray-900">
                        {loading ? "..." : interviewCount}
                      </h2>
                    </div>
                    <div className="text-gray-300">
                      <svg
                        width="70"
                        height="54"
                        viewBox="0 0 88 68"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g opacity="0.3">
                          <path
                            d="M80.1414 51.0427L75.5096 45.7033C78.848 41.527 80.6669 36.3636 80.6669 30.9661C80.6669 17.935 70.0653 7.33331 57.0341 7.33331C44.0028 7.33331 33.4012 17.935 33.4012 30.9661C33.4012 31.8371 33.4501 32.6968 33.5423 33.5435C32.6881 33.4506 31.828 33.401 30.9663 33.401C17.9352 33.401 7.33353 44.0027 7.33353 57.0338C7.33353 62.4313 9.1524 67.5946 12.4908 71.771L7.85904 77.1104C7.30775 77.7461 7.17813 78.6448 7.52747 79.4102C7.8768 80.1755 8.64064 80.6666 9.48197 80.6666H30.9663C43.9975 80.6666 54.5992 70.065 54.5992 57.0338C54.5992 56.1722 54.5496 55.3121 54.4566 54.4579C55.3034 54.5501 56.1631 54.5989 57.0341 54.5989H78.5184C79.3598 54.5989 80.1237 54.1078 80.4729 53.3425C80.8223 52.5771 80.6926 51.6784 80.1414 51.0427ZM30.9663 76.3698H14.1898L16.9577 73.1791C17.6807 72.3456 17.6548 71.0998 16.8977 70.2971C13.5011 66.6956 11.6304 61.9853 11.6304 57.0338C11.6304 46.372 20.3045 37.6979 30.9663 37.6979C32.1457 37.6979 33.3213 37.8053 34.4756 38.017C36.7842 45.3874 42.6127 51.216 49.9832 53.5246C50.1949 54.6789 50.3023 55.8545 50.3023 57.0338C50.3023 67.6958 41.6283 76.3698 30.9663 76.3698ZM57.0341 50.3021C46.3722 50.3021 37.6981 41.628 37.6981 30.9661C37.6981 20.3043 46.3722 11.6302 57.0341 11.6302C67.6959 11.6302 76.37 20.3043 76.37 30.9661C76.37 35.9176 74.4993 40.6279 71.1027 44.2294C70.3456 45.0321 70.3197 46.2779 71.0427 47.1113L73.8106 50.3021H57.0341Z"
                            fill="#515B6F"
                            stroke="#515B6F"
                            stroke-width="2"
                          />
                          <path
                            d="M57.0342 45.5755C58.2207 45.5755 59.1826 44.6136 59.1826 43.4271C59.1826 42.2405 58.2207 41.2786 57.0342 41.2786C55.8476 41.2786 54.8857 42.2405 54.8857 43.4271C54.8857 44.6136 55.8476 45.5755 57.0342 45.5755Z"
                            fill="#26A4FF"
                            stroke="#26A4FF"
                            stroke-width="0.668098"
                          />
                          <path
                            d="M57.2034 16.2153C53.0342 16.1298 49.4476 19.181 48.8713 23.3093C48.8186 23.6869 48.792 24.0726 48.792 24.4561C48.792 25.6427 49.7539 26.6046 50.9404 26.6046C52.1269 26.6046 53.0889 25.6427 53.0889 24.4561C53.0889 24.2705 53.1016 24.0843 53.127 23.9031C53.3987 21.9558 55.0717 20.5105 57.0361 20.5105C57.0631 20.5105 57.0898 20.5108 57.1169 20.5113C59.1735 20.5527 60.8681 22.192 60.9745 24.2433C61.0314 25.3389 60.6482 26.3787 59.8957 27.1713C59.1425 27.9647 58.1262 28.4017 57.0344 28.4017C55.8479 28.4017 54.886 29.3636 54.886 30.5501V36.9225C54.886 38.109 55.8479 39.071 57.0344 39.071C58.2209 39.071 59.1829 38.109 59.1829 36.9225V32.4108C60.6312 32.0175 61.9649 31.2325 63.0117 30.1299C64.5837 28.4742 65.3841 26.3045 65.2655 24.0206C65.0429 19.7304 61.5016 16.302 57.2034 16.2153Z"
                            fill="#26A4FF"
                            stroke="#26A4FF"
                            stroke-width="0.668098"
                          />
                          <path
                            d="M38.1286 50.5886H23.8057C22.6192 50.5886 21.6572 51.5505 21.6572 52.737C21.6572 53.9235 22.6192 54.8854 23.8057 54.8854H38.1286C39.3151 54.8854 40.277 53.9235 40.277 52.737C40.277 51.5505 39.3151 50.5886 38.1286 50.5886Z"
                            fill="#26A4FF"
                            stroke="#26A4FF"
                            stroke-width="0.668098"
                          />
                          <path
                            d="M38.1286 59.1823H23.8057C22.6192 59.1823 21.6572 60.1442 21.6572 61.3308C21.6572 62.5173 22.6192 63.4792 23.8057 63.4792H38.1286C39.3151 63.4792 40.277 62.5173 40.277 61.3308C40.277 60.1442 39.3151 59.1823 38.1286 59.1823Z"
                            fill="#26A4FF"
                            stroke="#26A4FF"
                            stroke-width="0.668098"
                          />
                        </g>
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Job Applied Status Card */}
                <div className="bg-white rounded-lg shadow-md p-4 flex flex-col border border-gray-200 h-[260px] w-full cursor-pointer">
                  <h3 className="text-lg font-bold text-gray-800 mb-3">
                    Jobs Applied Status
                  </h3>

                  <div className="flex items-center">
                    {/* Pie Chart */}
                    <div className="relative mb-3">
                      <PieChart width={150} height={150}>
                        <Pie
                          data={chartData}
                          dataKey="value"
                          nameKey="name"
                          cx="50%"
                          cy="50%"
                          outerRadius={65}
                          innerRadius={40}
                        >
                          {chartData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                      </PieChart>
                    </div>

                    {/* Legend */}
                    <div className="flex flex-col items-start px-4">
                      <div className="flex items-center mb-2">
                        <span className="w-3 h-3 bg-[#3B8BEB] rounded-sm mr-2"></span>
                        <span className="text-sm text-gray-900 font-medium">
                          {chartData[0].value}% Unsuitable
                        </span>
                      </div>
                      <div className="flex items-center">
                        <span className="w-3 h-3 bg-gray-300 rounded-sm mr-2"></span>
                        <span className="text-sm text-gray-500 font-medium">
                          {chartData[1].value}% Interviewed
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-auto">
                    <button className="text-[#3B8BEB] text-base font-semibold flex items-center hover:underline cursor-pointer">
                      View All Applications <span className="ml-1">→</span>
                    </button>
                  </div>
                </div>

                {/* Upcoming Interviews Card */}
                <div className="bg-white rounded-lg shadow-lg w-full overflow-hidden cursor-pointer">
                  {/* Header Section */}
                  <div className="p-3 border-b border-gray-200">
                    <h3 className="font-bold text-gray-800 text-lg">
                      Upcoming Interviews
                    </h3>
                  </div>

                  {/* Date Section */}
                  <div className="p-3 font-medium text-gray-700 border-b border-gray-200 flex justify-between items-center">
                    <span className="text-base font-semibold">
                      {currentDateIndex === 1 ? "Today, " : ""}
                      {currentDate}
                    </span>
                    <div className="flex gap-1">
                      <button
                        className="p-1 text-gray-500 hover:text-gray-700 cursor-pointer"
                        onClick={goToPrevDate}
                        disabled={currentDateIndex === 0}
                      >
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <polyline points="15 18 9 12 15 6" />
                        </svg>
                      </button>
                      <button
                        className="p-1 text-gray-500 hover:text-gray-700 cursor-pointer"
                        onClick={goToNextDate}
                        disabled={
                          currentDateIndex === availableDates.length - 1
                        }
                      >
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <polyline points="9 18 15 12 9 6" />
                        </svg>
                      </button>
                    </div>
                  </div>

                  {/* Time Slots */}
                  <div className="p-3 space-y-2">
                    {events.map((event, index) => (
                      <div
                        key={index}
                        className="border-b border-gray-200 flex items-start gap-2 mt-2"
                      >
                        {/* Time label */}
                        <div className="text-gray-600 font-medium w-20 self-center text-sm">
                          {event.time}
                        </div>

                        {/* Interview details if available */}
                        {event.name ? (
                          <div className="flex-1 p-2 bg-blue-50 rounded-lg border border-blue-100 flex items-center mb-2 cursor-pointer">
                            <img
                              src={event.image}
                              alt="Profile"
                              className="w-6 h-6 rounded-full bg-blue-200 mr-2"
                            />
                            <div>
                              <div className="font-semibold text-gray-800 text-sm">
                                {event.name}
                              </div>
                              {event.role && (
                                <div className="text-xs text-gray-500">
                                  {event.role}
                                </div>
                              )}
                            </div>
                          </div>
                        ) : (
                          <div className="flex-1 border-t border-gray-200 my-1"></div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Show error message if there's an error */}
              {error && (
                <div className="bg-red-100 text-red-800 p-3 mx-6 my-2 rounded-md">
                  {error}
                </div>
              )}

              {/*Part 3 - Recent Applications with reduced spacing*/}
              <div className="w-[95%] border border-gray-200 rounded-md ml-6 mt-6 mb-6">
                {/* Header - reduced padding */}
                <div className="p-5 pb-4 border-b border-gray-200">
                  <h2 className="text-xl font-bold text-gray-800">
                    Recent Applications History
                  </h2>
                </div>

                {loading ? (
                  <div className="p-6 text-center text-gray-500">Loading applications...</div>
                ) : applications.length === 0 ? (
                  <div className="p-6 text-center text-gray-500">No applications found</div>
                ) : (
                  <div className="px-4">
                    {applications.slice(0, 3).map((app) => (
                      <div
                        key={app._id}
                        className={`flex items-center justify-between py-3 px-4 ${
                          app.status === "Shortlisted" || app.status === "Hired" ? "bg-blue-50" : ""
                        } mt-3 mb-3 cursor-pointer`}
                      >
                        {/* Left Section: Icon & Job Details */}
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10">
                            {app.status === "Hired" ? (
                              <svg
                                width="48"
                                height="48"
                                viewBox="0 0 48 48"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M24 12L12 18V30L24 36L36 30V18L24 12Z"
                                  fill="#4ADE80"
                                  stroke="#4ADE80"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                                <path
                                  d="M24 36V24"
                                  stroke="white"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                                <path
                                  d="M36 18L24 24L12 18"
                                  stroke="white"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            ) : app.status === "Rejected" ? (
                              <svg
                                width="48"
                                height="48"
                                viewBox="0 0 48 48"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path d="M32 16H24V32H32V16Z" fill="#FF6B6B" />
                                <path d="M16 16H24V24H16V16Z" fill="#FF6B6B" />
                                <path d="M16 24H24V32H16V24Z" fill="#FF9F9F" />
                              </svg>
                            ) : (
                              <svg
                                width="48"
                                height="48"
                                viewBox="0 0 48 48"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <circle cx="24" cy="24" r="20" fill="#06B6D4" />
                                <path
                                  d="M30 19L24 24L30 29"
                                  stroke="white"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                                <path
                                  d="M18 29V19"
                                  stroke="white"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            )}
                          </div>
                          <div>
                            <h3 className="text-base font-extrabold text-gray-800">
                              {app.job?.jobTitle || "Unknown Position"}
                            </h3>
                            <p className="text-gray-500 text-xs">
                              {app.job?.company?.companyName || "Unknown Company"} • {app.job?.location || "Unknown Location"} • {app.job?.jobType || "Unknown Type"}
                            </p>
                          </div>
                        </div>

                        {/* Center Section: Date Applied */}
                        <div className="flex flex-col items-center">
                          <p className="text-gray-600 text-xs font-bold">
                            Date Applied
                          </p>
                          <p className="text-gray-800 text-xs">
                            {app.appliedAt ? format(new Date(app.appliedAt), 'dd MMM yyyy') : format(new Date(app.createdAt), 'dd MMM yyyy')}
                          </p>
                        </div>

                        {/* Right Section: Status & More Options */}
                        <div className="flex items-center space-x-4">
                          <div
                            className={`px-3 py-1 rounded-full text-xs font-medium border ${
                              app.status === "Hired" || app.status === "Shortlisted"
                                ? "border-blue-300 text-blue-500"
                                : app.status === "Rejected"
                                ? "border-red-300 text-red-500"
                                : app.status === "In Review"
                                ? "border-amber-300 text-amber-500"
                                : "border-gray-300 text-gray-500"
                            }`}
                          >
                            {app.status}
                          </div>

                          <button className="text-gray-400 cursor-pointer">
                            <MoreHorizontal size={18} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* View all link - reduced spacing */}
                <div className="flex justify-center py-3 mb-2">
                  <a
                    href="/applications"
                    className="flex items-center text-xs text-blue-500 font-medium cursor-pointer"
                  >
                    View all applications history
                    <ArrowRight size={14} className="ml-1" />
                  </a>
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
