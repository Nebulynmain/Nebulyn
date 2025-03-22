import React from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import {
  Stethoscope,
  Umbrella,
  GraduationCap,
  Users,
  Laptop,
  Bus,
  Heart,
} from "lucide-react";

const jobData = {
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
};

const sampleJobData = {
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
};

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
const InfoCard = ({ title, link, description, images }) => {
  return (
    <div className="flex flex-col md:flex-row bg-white overflow-hidden p-6">
      {/* Left Section */}
      <div className="flex-1">
        <div className="flex items-center space-x-3">
          {/* Logo Box with Gradient */}
          <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-400 flex items-center justify-center rounded-lg text-white font-bold text-4xl">
            S
          </div>
          <div>
            <h2 className="text-2xl font-bold"> {title} </h2>
            <a
              href={link}
              className="text-blue-500 text-lg font-medium mt-1 block"
            >
              Read more about {title} →
            </a>
          </div>
        </div>
        <p className=" text-lg text-gray-600 mt-3">{description}</p>
      </div>

      {/* Right Section: Fixed Layout with Bigger Main Image */}
      <div className="flex gap-4 p-4">
        {/* Bigger Main Image */}
        <div className="w-[350px] h-[250px]">
          <img
            src={images[0]}
            alt="Main Image"
            className="rounded-lg object-cover w-full h-full border border-gray-300"
          />
        </div>
        {/* Small Images Stacked */}
        <div className="flex flex-col gap-3">
          {images.slice(1).map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`img-${index}`}
              className="rounded-lg object-cover w-[150px] h-[120px] border border-gray-300"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

const Companies = () => {
  const categories = Array.isArray(sampleJobData.categories)
    ? sampleJobData.categories
    : [];
  const requiredSkills = Array.isArray(sampleJobData.requiredSkills)
    ? sampleJobData.requiredSkills
    : [];

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
                  <div className="relative py-16 px-10">
                    <div className="bg-white border border-blue-200 rounded-md shadow-md flex justify-between items-center p-8">
                      {/* Left side with logo and text */}
                      <div className="flex items-center">
                        {/* Purple logo */}
                        <div className="bg-indigo-500 w-16 h-16 flex items-center justify-center rounded-lg text-white font-bold text-3xl mr-6 cursor-pointer">
                          S
                        </div>

                        {/* Job details */}
                        <div className="cursor-pointer">
                          <h2 className="text-2xl font-bold text-gray-900">
                            Social Media Assistant
                          </h2>
                          <p className="text-gray-700 text-lg">
                            Stripe • Paris, France • Full-Time
                          </p>
                        </div>
                      </div>

                      {/* Right side with share and apply button */}
                      <div className="flex items-center">
                        {/* Share icon */}
                        <div className="mr-6 border border-gray-300 rounded-full p-3 flex items-center justify-center cursor-pointer hover:bg-gray-100">
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
                        <button className="bg-blue-500 hover:bg-blue-600 text-white text-lg font-semibold py-3 px-8 rounded-lg cursor-pointer">
                          Apply
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/*Part 2*/}
            <div class="flex p-6">
              <div className="w-3/4 p-6 bg-white">
                {/* Description Section */}
                <div className="mb-8">
                  <h2 className="text-xl font-bold text-gray-800 mb-4">
                    Description
                  </h2>
                  <p className="text-lg text-gray-600">{jobData.description}</p>
                </div>

                {/* Responsibilities Section */}
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

                {/* Who You Are Section */}
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

                {/* Nice-To-Haves Section */}
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
                  {/* About this role */}
                  <h2 className="text-xl font-bold text-gray-800 mb-6">
                    About this role
                  </h2>

                  <div className="bg-gray-50 p-5 rounded-lg mb-8">
                    {/* Progress stats */}
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
                            width: `$
                              {((sampleJobData.applied || 0) /
                                (sampleJobData.capacity || 1)) *
                              100}%`,
                          }}
                        ></div>
                      </div>
                    </div>
                  </div>

                  {/* Job details */}
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
                        <span className="text-gray-900">
                          {item.value || "N/A"}
                        </span>
                      </div>
                    ))}
                  </div>
                  <div className="border-b border-gray-300 text-transparent mb-6">
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
                      data: requiredSkills,
                      bgColor: "bg-blue-100",
                      textColor: "text-blue-600",
                    },
                  ].map((section, idx) => (
                    <div key={idx} className="mb-8">
                      <h3 className="text-xl font-semibold text-gray-800 mb-4">
                        {section.title}
                      </h3>
                      <div className="flex flex-wrap gap-3">
                        {section.data.length > 0 ? (
                          section.data.map((item, index) => (
                            <span
                              key={index}
                              className={`${section.bgColor} ${section.textColor} px-4 py-2 rounded-full text-base font-medium cursor-pointer hover:opacity-90`}
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
                        <div className="border-b border-gray-300 mt-10"></div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            {/*Part 3*/}
            <div className="py-8 px-6 bg-white border-t border-gray-300">
              <div className="text-left mb-10 px-9">
                <h2 className="text-3xl font-bold text-gray-900">
                  Perks & Benefits
                </h2>
                <p className="text-gray-600">
                  This job comes with several perks and benefits
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 max-w-6xl mx-auto">
                {perksData.map((perk, index) => (
                  <div
                    key={index}
                    className="flex flex-col items-left text-left p-6 transition duration-300 cursor-pointer hover:bg-gray-50 rounded-lg"
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
            {/*Part 4*/}
            <div className="p-8 border-t border-gray-500">
              <InfoCard
                logo="https://via.placeholder.com/40" // Replace with actual logo
                title="Stripe"
                link="#"
                description="Stripe is a technology company that builds economic infrastructure for the internet..."
                images={[
                  "https://via.placeholder.com/150",
                  "https://via.placeholder.com/150",
                  "https://via.placeholder.com/150",
                ]}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Companies;
