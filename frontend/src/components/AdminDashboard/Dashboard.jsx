import React, { useState, useEffect } from "react";
import { CalendarIcon } from "lucide-react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { MoreHorizontal, ArrowRight } from "lucide-react";
import { PieChart, Pie, Cell } from "recharts";

const data = [
  { name: "Unsuitable", value: 60, color: "#3B82F6" }, // Blue color
  { name: "Interviewed", value: 40, color: "#E2E8F0" }, // Gray color
];

const events = [
  { time: "10:00 AM", name: "", role: "", image: "" },
  {
    time: "10:30 AM",
    name: "Joe Bartmann",
    role: "HR Manager at Divvy",
    image: "https://via.placeholder.com/32",
  },
  { time: "11:00 AM", name: "", role: "", image: "" },
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

const getMinutesFromStart = (time) => {
  const [hour, minute] = time.match(/\d+/g).map(Number);
  const isPM = time.includes("PM");
  return (isPM && hour !== 12 ? hour + 12 : hour) * 60 + minute;
};

const timeSlots = events.map((event, index) => {
  const startTime = "10:00 AM";
  const minutesFromStart =
    getMinutesFromStart(event.time) - getMinutesFromStart(startTime);

  const slotHeight = 60; // Fix height per slot
  const top = minutesFromStart * (slotHeight / 30);

  return (
    <div
      key={index}
      className="absolute left-0 w-full"
      style={{ top: `${top}px`, minHeight: `${slotHeight}px` }}
    >
      <div className="flex items-center gap-4 p-3">
        {" "}
        {/* p-3 instead of p-4 to reduce extra spacing */}
        <span className="text-gray-700 font-semibold w-16 text-sm">
          {event.time}
        </span>
        {event.name ? (
          <div className="flex-1 mx-2 p-3 bg-blue-50 rounded-lg flex items-center shadow-lg border border-blue-200">
            <div className="w-10 h-10 rounded-full overflow-hidden shadow-md border border-gray-300 flex items-center justify-center">
              <img
                src={event.image}
                alt={event.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="ml-4 flex flex-col justify-center">
              {" "}
              {/* Center align text */}
              <p className="font-semibold text-gray-900 text-sm leading-tight">
                {event.name}
              </p>
              <p className="text-xs text-gray-600">{event.role}</p>
            </div>
          </div>
        ) : (
          <div className="flex-1 mx-2 border-b border-gray-300"></div>
        )}
      </div>
    </div>
  );
});

const Dashboard = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex flex-row flex-grow">
        <div className="h-screen sticky top-0 ">
          <Sidebar />
        </div>
        <div className="flex-grow transition-all">
          <div className="flex-grow overflow-y-auto">
            <Header />
            <div className="">
              {/*Part 1*/}
              <div className="flex justify-between items-center py-6 px-9">
                <div>
                  <h1 className="text-4xl font-semibold text-black-900">
                    Good morning, Jake
                  </h1>
                  <p className="text-gray-500 mt-2 text-xl">
                    Here is what’s happening with your job search applications
                    from July 19 - July 25.
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
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 px-9">
                <div className="grid gap-3 max-w-[258px] ">
                  {/* Total Jobs Applied Card */}
                  <div className="bg-white rounded-sm border border-gray-200 shadow-md p-4 flex justify-between items-center w-[300px] h-[150px]">
                    <div>
                      <p className="text-xl font-bold text-black-500 mb-4">
                        Total Jobs Applied
                      </p>
                      <h2 className="text-6xl font-bold text-gray-900 mt-1">
                        45
                      </h2>
                    </div>
                    <div className="text-gray-300 mt-20">
                      <svg
                        width="88"
                        height="68"
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
                  <div className="bg-white rounded-sm border border-gray-200 shadow-md p-4 flex justify-between items-center w-[300px] h-[150px]">
                    <div>
                      <p className="text-xl font-bold text-black-500 mb-4">
                        Interviewed
                      </p>
                      <h2 className="text-6xl font-bold text-gray-900 mt-1">
                        18
                      </h2>
                    </div>
                    <div className="text-gray-300 mt-20">
                      <svg
                        width="88"
                        height="68"
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

                {/* Job Applied */}
                <div
                  className="bg-white rounded-lg shadow-md p-6 flex flex-col border border-gray-200"
                  style={{ width: "380px", height: "310px" }}
                >
                  <h3 className="text-black-900 text-xl font-bold mb-4">
                    Jobs Applied Status
                  </h3>

                  <div className="flex items-center">
                    {/* Pie Chart */}
                    <div className="relative mb-4">
                      <PieChart width={180} height={180}>
                        {" "}
                        {/* Size increased */}
                        <Pie
                          data={data}
                          dataKey="value"
                          nameKey="name"
                          cx="50%"
                          cy="50%"
                          outerRadius={80}
                          innerRadius={50}
                        >
                          {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                      </PieChart>
                    </div>

                    {/* Legend */}
                    <div className="flex flex-col items-start px-6">
                      {" "}
                      {/* Increased padding */}
                      <div className="flex items-center mb-3">
                        {" "}
                        {/* Increased margin */}
                        <span className="w-4 h-4 bg-[#3B8BEB] rounded-sm mr-3"></span>{" "}
                        {/* Bigger size */}
                        <span className="text-base text-gray-900 font-medium">
                          {" "}
                          {/* Bigger text */}
                          60% Unsuitable
                        </span>
                      </div>
                      <div className="flex items-center">
                        <span className="w-4 h-4 bg-gray-300 rounded-sm mr-3"></span>{" "}
                        {/* Bigger size */}
                        <span className="text-base text-gray-500 font-medium">
                          {" "}
                          {/* Bigger text */}
                          40% Interviewed
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="">
                    <button className="text-[#3B8BEB] text-lg font-semibold flex items-center hover:underline">
                      View All Applications <span className="ml-1">→</span>
                    </button>
                  </div>
                </div>

                <div className="bg-white rounded-sm shadow-lg w-96 border border-gray-200 relative h-[310px] p-2 overflow-hidden">
                  {/* Header Section */}
                  <div className="p-4 border-b border-gray-300 rounded-t-2xl">
                    <h3 className="font-bold text-gray-800 text-xl">
                      Upcoming Interviews
                    </h3>
                  </div>

                  {/* Date Section */}
                  <div className="p-4 font-medium text-gray-700 border-b border-gray-300 flex justify-between items-center bg-white">
                    <span className="text-xl font-semibold">
                      Today, 26 November
                    </span>
                    <div className="flex gap-2">
                      <button className="p-2 hover:bg-gray-200 rounded-full transition">
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <polyline points="15 18 9 12 15 6" />
                        </svg>
                      </button>
                      <button className="p-2 hover:bg-gray-200 rounded-full transition">
                        <svg
                          width="20"
                          height="20"
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
                  <div className="relative w-full h-full ">{timeSlots}</div>
                </div>
              </div>

              {/*Part 3*/}
              <div className="w-[94%] border border-gray-200 rounded-md ml-9">
                {/* Header */}
                <div className="p-8 pb-6 border-b border-gray-200">
                  <h2 className="text-2xl font-bold text-gray-800">
                    Recent Applications History
                  </h2>
                </div>

                <div className="px-6">
                  {applications.map((app) => (
                    <div
                      key={app.id}
                      className={`flex items-center justify-between py-4 px-6 ${app.bgColor} mt-4 mb-4`}
                    >
                      {/* Left Section: Icon & Job Details */}
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12">{app.icon}</div>
                        <div>
                          <h3 className="font-medium text-lg font-extrabold text-gray-800">
                            {app.position}
                          </h3>
                          <p className="text-gray-500 text-sm">
                            {app.company} • {app.location} • Full-Time
                          </p>
                        </div>
                      </div>

                      {/* Center Section: Date Applied (Aligned Center) */}
                      <div className="flex flex-col items-center">
                        <p className="text-gray-600 text-sm font-bold">
                          Date Applied
                        </p>
                        <p className="text-gray-800 text-sm">
                          {app.dateApplied}
                        </p>
                      </div>

                      {/* Right Section: Status & More Options */}
                      <div className="flex items-center space-x-6">
                        <div
                          className={`px-4 py-1 rounded-full text-sm font-medium border ${app.statusColor}`}
                        >
                          {app.status}
                        </div>

                        <button className="text-gray-400">
                          <MoreHorizontal size={22} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* View all link */}
                <div className="flex justify-center py-4 mb-3">
                  <a
                    href="/applications"
                    className="flex items-center text-sm text-blue-500 font-medium"
                  >
                    View all applications history
                    <ArrowRight size={16} className="ml-2" />
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
