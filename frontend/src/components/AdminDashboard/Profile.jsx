import React, { useState, useEffect, useRef } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";

const Profile = () => {
  const [aboutData, setAboutData] = useState(null);
  const [skills, setSkills] = useState([
    "Communication",
    "Analytics",
    "Facebook Ads",
    "Content Planning",
    "Community Manager",
  ]);

  useEffect(() => {
    const fetchData = async () => {
      const data = {
        title: "About Me",
        description:
          "I'm a product designer & filmmaker currently working remotely at Twitter from beautiful Manchester, United Kingdom. I'm passionate about designing digital products that have a positive impact on the world.",
        experience:
          "For 10 years, I've specialized in interface, experience & interaction design as well as working in user research and product strategy for product agencies, big tech companies & startups.",
      };
      setAboutData(data);
    };

    fetchData();
  }, []);

  const ExperienceList = ({ experiences }) => {
    const [visibleCount, setVisibleCount] = useState(2); // Start with 2 experiences

    const handleShowMore = () => {
      setVisibleCount((prev) => Math.min(prev + 3, experiences.length)); // Show 3 more or all
    };

    const handleShowLess = () => {
      setVisibleCount(2); // Collapse back to 2 experiences
    };

    return (
      <div className="bg-white p-8 rounded-2xl shadow-lg">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Experiences</h1>
          <button className="inline-flex items-center justify-center text-blue-600 text-4xl font-semibold border border-gray-300 px-2 hover:bg-blue-100 transition">
            <span className="relative -top-1">+</span>
          </button>
        </div>

        {experiences.slice(0, visibleCount).map((exp, index) => (
          <div key={index} className="pt-6 mt-3">
            <div className="flex justify-between items-start gap-6">
              <div className="flex items-top gap-6">
                <img
                  src={exp.logo}
                  alt={exp.company}
                  className="w-14 h-14 rounded-full shadow-md"
                />
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">
                    {exp.title}
                  </h2>
                  <p className="text-gray-600 text-lg">
                    <span className="font-semibold">{exp.company}</span> •{" "}
                    {exp.type} • {exp.duration}
                  </p>
                  <p className="text-gray-500 text-lg">{exp.location}</p>
                  <p className="text-gray-700 mt-2 leading-relaxed">
                    {exp.description}
                  </p>
                  <div className="border-b border-gray-300 text-transparent">
                    .
                  </div>
                </div>
              </div>
              {/* Edit Button */}
              <button className="text-blue-500 w-8 h-8 flex items-center justify-center border border-gray-300 cursor-pointer">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M11 4H4C3.46957 4 2.96086 4.21071 2.58579 4.58579C2.21071 4.96086 2 5.46957 2 6V20C2 20.5304 2.21071 21.0391 2.58579 21.4142C2.96086 21.7893 3.46957 22 4 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V13"
                    stroke="#3B82F6"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M18.5 2.50001C18.8978 2.10219 19.4374 1.87869 20 1.87869C20.5626 1.87869 21.1022 2.10219 21.5 2.50001C21.8978 2.89784 22.1213 3.4374 22.1213 4.00001C22.1213 4.56262 21.8978 5.10219 21.5 5.50001L12 15L8 16L9 12L18.5 2.50001Z"
                    stroke="#3B82F6"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
          </div>
        ))}

        {/* Show More / Show Less Button */}
        {visibleCount < experiences.length ? (
          <button
            onClick={handleShowMore}
            className="block text-blue-600 text-lg font-medium mt-6 mx-auto px-6 py-2 cursor-pointer transition"
          >
            Show {Math.min(3, experiences.length - visibleCount)} more
            experiences
          </button>
        ) : (
          <button
            onClick={handleShowLess}
            className="block text-blue-600 text-lg font-medium mt-6 mx-auto px-6 py-2 cursor-pointer transition"
          >
            Show less experiences
          </button>
        )}
      </div>
    );
  };

  const experiencesData = [
    {
      title: "Product Designer",
      company: "Twitter",
      type: "Full-Time",
      duration: "Jun 2019 - Present (1y 1m)",
      location: "Manchester, UK",
      description:
        "Created and executed social media plan for 10 brands utilizing multiple features and content types to increase brand outreach, engagement, and leads.",
      logo: "https://logo.clearbit.com/twitter.com",
    },
    {
      title: "Growth Marketing Designer",
      company: "GoDaddy",
      type: "Full-Time",
      duration: "Jun 2011 - May 2019 (8y)",
      location: "Manchester, UK",
      description:
        "Developed digital marketing strategies, activation plans, proposals, contests and promotions for client initiatives.",
      logo: "https://logo.clearbit.com/godaddy.com",
    },
    {
      title: "UI/UX Designer",
      company: "Spotify",
      type: "Full-Time",
      duration: "Aug 2019 - Dec 2022 (3y 4m)",
      location: "London, UK",
      description:
        "Designed intuitive user interfaces for Spotify's mobile and web applications, enhancing user experience and engagement.",
      logo: "https://logo.clearbit.com/spotify.com",
    },
    {
      title: "Front-End Developer",
      company: "Airbnb",
      type: "Contract",
      duration: "Jan 2017 - Jul 2019 (2y 6m)",
      location: "Remote",
      description:
        "Developed and optimized Airbnb’s front-end UI components, ensuring seamless user interactions across all devices.",
      logo: "https://logo.clearbit.com/airbnb.com",
    },
    {
      title: "Creative Director",
      company: "Adobe",
      type: "Full-Time",
      duration: "Mar 2023 - Present",
      location: "San Francisco, CA",
      description:
        "Leading the creative team at Adobe to drive innovative design strategies for the Adobe Creative Suite.",
      logo: "https://logo.clearbit.com/adobe.com",
    },
  ];

  const EducationList = ({ educations }) => {
    const [visibleCount, setVisibleCount] = useState(2); // Initially show 2

    const handleShowMore = () => {
      setVisibleCount((prev) => Math.min(prev + 2, educations.length)); // Show 2 more
    };

    const handleShowLess = () => {
      setVisibleCount(2); // Reset back to 2
    };

    return (
      <div className="bg-white p-6 rounded-xl shadow-lg ">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold text-gray-800">Educations</h1>
          <button className="text-blue-600 text-3xl font-semibold border border-gray-300 px-2 hover:bg-blue-100 transition">
            <span className="relative -top-1">+</span>
          </button>
        </div>

        {/* Education Items */}
        {educations.slice(0, visibleCount).map((edu, index) => (
          <div key={index} className="py-4 last:border-none w-full">
            <div className="flex gap-4 w-full">
              <img
                src={edu.logo}
                alt={edu.school}
                className="w-14 h-14 rounded-md flex-shrink-0"
              />
              <div className="w-full">
                <h2 className="text-xl font-semibold text-gray-900">
                  {edu.school}
                </h2>
                <p className="text-lg text-gray-600 text-md">{edu.degree}</p>
                <p className="text-lg text-gray-500">{edu.duration}</p>
                <p className=" text-lg text-gray-700 mt-2 leading-relaxed">
                  {edu.description}
                </p>
                <div className="border-b border-gray-300 text-transparent">
                  .
                </div>
              </div>
              {/* Edit Button */}
              <button className="text-blue-500 w-8 h-8 flex items-center justify-center border border-gray-300 cursor-pointer">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M11 4H4C3.46957 4 2.96086 4.21071 2.58579 4.58579C2.21071 4.96086 2 5.46957 2 6V20C2 20.5304 2.21071 21.0391 2.58579 21.4142C2.96086 21.7893 3.46957 22 4 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V13"
                    stroke="#3B82F6"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M18.5 2.50001C18.8978 2.10219 19.4374 1.87869 20 1.87869C20.5626 1.87869 21.1022 2.10219 21.5 2.50001C21.8978 2.89784 22.1213 3.4374 22.1213 4.00001C22.1213 4.56262 21.8978 5.10219 21.5 5.50001L12 15L8 16L9 12L18.5 2.50001Z"
                    stroke="#3B82F6"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
          </div>
        ))}

        {/* Show More / Show Less Button */}
        {visibleCount < educations.length ? (
          <button
            onClick={handleShowMore}
            className="block text-blue-600 text-md font-medium mt-4 mx-auto hover:underline"
          >
            Show {Math.min(2, educations.length - visibleCount)} more educations
          </button>
        ) : (
          <button
            onClick={handleShowLess}
            className="block text-blue-600 text-md font-medium mt-4 mx-auto hover:underline"
          >
            Show less educations
          </button>
        )}
      </div>
    );
  };

  const educationsData = [
    {
      school: "Harvard University",
      degree: "Postgraduate degree, Applied Psychology",
      duration: "2010 - 2012",
      description:
        "Specialized in creating business opportunities by observing, analyzing, researching, and changing behavior.",
      logo: "https://upload.wikimedia.org/wikipedia/en/2/29/Harvard_shield_wreath.svg",
      link: "https://www.harvard.edu/",
    },
    {
      school: "University of Toronto",
      degree: "Bachelor of Arts, Visual Communication",
      duration: "2005 - 2009",
      description:
        "Studied visual communication, design principles, and digital media.",
      logo: "https://upload.wikimedia.org/wikipedia/en/thumb/2/2b/University_of_Toronto_CoA.svg/1200px-University_of_Toronto_CoA.svg.png",
      link: "https://www.utoronto.ca/",
    },
    {
      school: "Stanford University",
      degree: "Master of Science, Computer Science",
      duration: "2013 - 2015",
      description:
        "Focused on artificial intelligence and machine learning research.",
      logo: "https://upload.wikimedia.org/wikipedia/commons/4/44/Stanford_University_seal_2003.svg",
      link: "https://www.stanford.edu/",
    },
    {
      school: "MIT",
      degree: "PhD in Robotics",
      duration: "2016 - 2020",
      description:
        "Conducted research in autonomous systems and robotics innovation.",
      logo: "https://upload.wikimedia.org/wikipedia/commons/0/0c/MIT_logo.svg",
      link: "https://www.mit.edu/",
    },
  ];

  const portfolioItems = [
    {
      id: 1,
      title: "Clinically - clinic & health care website",
      image: "/api/placeholder/300/200",
      selected: true,
    },
    {
      id: 2,
      title: "Growthly - SaaS Analytics & Sales Website",
      image: "/api/placeholder/300/200",
    },
    {
      id: 3,
      title: "Planna - Project Management App",
      image: "/api/placeholder/300/200",
    },
    {
      id: 4,
      title: "Funiro - furniture website",
      image: "/api/placeholder/300/200",
    },
  ];

  const [activeIndex, setActiveIndex] = useState(0);
  const [translateX, setTranslateX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [currentTranslate, setCurrentTranslate] = useState(0);
  const containerRef = useRef(null);

  const handleTouchStart = (e) => {
    setIsDragging(true);
    setStartX(e.touches[0].clientX);
    setCurrentTranslate(translateX);
  };

  const handleMouseStart = (e) => {
    e.preventDefault();
    setIsDragging(true);
    setStartX(e.clientX);
    setCurrentTranslate(translateX);
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;
    const currentX = e.touches[0].clientX;
    const diff = ((currentX - startX) / containerRef.current.offsetWidth) * 100;
    const newTranslate = currentTranslate + diff;

    // Add resistance at the edges
    if (
      newTranslate > 0 ||
      newTranslate < -((portfolioItems.length - 1) * 100)
    ) {
      const resistance = 0.3;
      if (newTranslate > 0) {
        setTranslateX(newTranslate * resistance);
      } else {
        const overScroll = newTranslate + (portfolioItems.length - 1) * 100;
        setTranslateX(
          -((portfolioItems.length - 1) * 100) + overScroll * resistance
        );
      }
    } else {
      setTranslateX(newTranslate);
    }
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const currentX = e.clientX;
    const diff = ((currentX - startX) / containerRef.current.offsetWidth) * 100;
    const newTranslate = currentTranslate + diff;

    // Add resistance at the edges
    if (
      newTranslate > 0 ||
      newTranslate < -((portfolioItems.length - 1) * 100)
    ) {
      const resistance = 0.3;
      if (newTranslate > 0) {
        setTranslateX(newTranslate * resistance);
      } else {
        const overScroll = newTranslate + (portfolioItems.length - 1) * 100;
        setTranslateX(
          -((portfolioItems.length - 1) * 100) + overScroll * resistance
        );
      }
    } else {
      setTranslateX(newTranslate);
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    const threshold = 15; // Percentage threshold for slide change

    // Calculate which slide to snap to
    if (Math.abs(translateX - currentTranslate) > threshold) {
      if (translateX < currentTranslate) {
        // Swiped left
        const nextIndex = Math.min(activeIndex + 1, portfolioItems.length - 1);
        setActiveIndex(nextIndex);
        setTranslateX(-(nextIndex * 100));
      } else {
        // Swiped right
        const prevIndex = Math.max(activeIndex - 1, 0);
        setActiveIndex(prevIndex);
        setTranslateX(-(prevIndex * 100));
      }
    } else {
      // Return to current slide if threshold not met
      setTranslateX(-(activeIndex * 100));
    }
  };

  const handleDotClick = (index) => {
    setActiveIndex(index);
    setTranslateX(-index * 100);
  };

  // Add global event listeners
  useEffect(() => {
    const handleGlobalMouseUp = () => {
      if (isDragging) {
        handleTouchEnd();
      }
    };

    const handleGlobalMouseMove = (e) => {
      if (isDragging) {
        handleMouseMove(e);
      }
    };

    window.addEventListener("mouseup", handleGlobalMouseUp);
    window.addEventListener("mousemove", handleGlobalMouseMove);

    return () => {
      window.removeEventListener("mouseup", handleGlobalMouseUp);
      window.removeEventListener("mousemove", handleGlobalMouseMove);
    };
  }, [isDragging, handleTouchEnd]);

  if (!aboutData) return <p>Loading...</p>;

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex flex-row flex-grow">
        <div className="h-screen sticky top-0 ">
          <Sidebar />
        </div>
        <div className="flex-grow transition-all">
          <div className="flex-grow overflow-y-auto">
            <Header />
            <div className="p-4">
              <div class="flex">
                <div className="w-3/4 p-4">
                  {/*Part 1*/}
                  <div className="flex justify-between items-center">
                    <div className="w-full bg-white rounded-lg overflow-hidden shadow-sm">
                      {/* Header with discrete gradient sections instead of a continuous gradient */}
                      <div className="h-24 relative flex">
                        <div className="w-1/4 h-full bg-pink-100"></div>
                        <div className="w-1/4 h-full bg-pink-300"></div>
                        <div className="w-2/4 h-full bg-pink-800"></div>

                        {/* Edit icon in top right of header */}
                        <div className="absolute top-3 right-3 text-white rounded p-1">
                          <button className="text-white w-8 h-8 flex items-center justify-center border border-white rounded-sm cursor-pointer">
                            <svg
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M11 4H4C3.46957 4 2.96086 4.21071 2.58579 4.58579C2.21071 4.96086 2 5.46957 2 6V20C2 20.5304 2.21071 21.0391 2.58579 21.4142C2.96086 21.7893 3.46957 22 4 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V13"
                                stroke="#FFFFFF"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                              <path
                                d="M18.5 2.50001C18.8978 2.10219 19.4374 1.87869 20 1.87869C20.5626 1.87869 21.1022 2.10219 21.5 2.50001C21.8978 2.89784 22.1213 3.4374 22.1213 4.00001C22.1213 4.56262 21.8978 5.10219 21.5 5.50001L12 15L8 16L9 12L18.5 2.50001Z"
                                stroke="#FFFFFF"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </button>
                        </div>
                      </div>

                      <div className="px-6 pt-4 pb-6 relative">
                        {/* Profile image */}
                        <div className="absolute -top-10 left-6">
                          <div className="w-30 h-30 rounded-full bg-blue-500 border-4 border-white overflow-hidden">
                            <img
                              src="/api/placeholder/80/80"
                              alt="Profile"
                              className="object-cover w-full h-full"
                            />
                          </div>
                        </div>

                        {/* Profile content */}
                        <div className=" flex justify-between items-center ml-35">
                          {/* Left side: name, job, location, badge */}
                          <div>
                            <h1 className="text-2xl font-bold text-gray-800">
                              Jake Gyll
                            </h1>
                            <p className="text-xl text-gray-500 mt-1">
                              Product Designer at{" "}
                              <span className="font-semibold text-gray-700">
                                Twitter
                              </span>
                            </p>

                            {/* Location */}
                            <div className="flex items-center mt-2 text-gray-500 text-xl">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4 mr-1"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                                />
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                                />
                              </svg>
                              <span>Manchester, UK</span>
                            </div>

                            {/* Availability badge */}
                            <div className="flex items-center mt-3 px-3 py-1 bg-green-50 text-green-600 text-md  border border-green-200">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4 mr-1"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M3 6a3 3 0 013-3h10a1 1 0 01.8 1.6L14.25 8l2.55 3.4A1 1 0 0116 13H6a1 1 0 00-1 1v3a1 1 0 11-2 0V6z"
                                  clipRule="evenodd"
                                />
                              </svg>
                              <span className="uppercase text-md font-medium tracking-wide">
                                Open for opportunities
                              </span>
                            </div>
                          </div>

                          {/* Right side: Edit Profile button */}
                          <button className="border border-blue-400 text-blue-500 px-4 py-1 text-lg  hover:bg-blue-50 -mt-18 cursor-pointer">
                            Edit Profile
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/*Part 2*/}
                  <div className="flex justify-between items-center mt-6">
                    <div className="bg-white shadow-md rounded-lg p-6 border border-gray-200">
                      <div className="flex justify-between items-center">
                        <h2 className="text-xl font-bold text-gray-900">
                          {aboutData.title}
                        </h2>
                        <button className="text-blue-500 w-8 h-8 flex items-center justify-center border border-gray-300 cursor-pointer">
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M11 4H4C3.46957 4 2.96086 4.21071 2.58579 4.58579C2.21071 4.96086 2 5.46957 2 6V20C2 20.5304 2.21071 21.0391 2.58579 21.4142C2.96086 21.7893 3.46957 22 4 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V13"
                              stroke="#3B82F6"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M18.5 2.50001C18.8978 2.10219 19.4374 1.87869 20 1.87869C20.5626 1.87869 21.1022 2.10219 21.5 2.50001C21.8978 2.89784 22.1213 3.4374 22.1213 4.00001C22.1213 4.56262 21.8978 5.10219 21.5 5.50001L12 15L8 16L9 12L18.5 2.50001Z"
                              stroke="#3B82F6"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </button>
                      </div>
                      <p className=" text-lg text-gray-700 mt-2">
                        {aboutData.description}
                      </p>
                      <p className=" text-lg text-gray-600 mt-2">
                        {aboutData.experience}
                      </p>
                    </div>
                  </div>
                  {/*Part 3*/}
                  <div className="flex justify-between items-center mt-6">
                    <ExperienceList experiences={experiencesData} />
                  </div>
                  {/*Part 4*/}
                  <div className="flex justify-between items-center mt-6">
                    <EducationList educations={educationsData} />
                  </div>
                  {/*Part 5*/}
                  <div className="flex justify-between items-center mt-6 shadow-lg">
                    <div className="border border-gray-200 p-4 rounded-md w-full">
                      {/* Header with Title & Icons */}
                      <div className="flex justify-between items-center mb-2">
                        <h2 className="text-2xl font-semibold text-gray-900">
                          Skills
                        </h2>
                        <div className="flex gap-2">
                          {/* Plus Button */}
                          <button className="text-blue-600 text-3xl font-semibold border border-gray-300 px-2 hover:bg-blue-100 transition">
                            <span className="relative -top-1">+</span>
                          </button>

                          {/* Edit Button */}
                          <button className="text-blue-500 w-10 h-10 flex items-center justify-center border border-gray-300 cursor-pointer">
                            <svg
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M11 4H4C3.46957 4 2.96086 4.21071 2.58579 4.58579C2.21071 4.96086 2 5.46957 2 6V20C2 20.5304 2.21071 21.0391 2.58579 21.4142C2.96086 21.7893 3.46957 22 4 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V13"
                                stroke="#3B82F6"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                              <path
                                d="M18.5 2.50001C18.8978 2.10219 19.4374 1.87869 20 1.87869C20.5626 1.87869 21.1022 2.10219 21.5 2.50001C21.8978 2.89784 22.1213 3.4374 22.1213 4.00001C22.1213 4.56262 21.8978 5.10219 21.5 5.50001L12 15L8 16L9 12L18.5 2.50001Z"
                                stroke="#3B82F6"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </button>
                        </div>
                      </div>

                      {/* Skills List */}
                      <div className="flex flex-wrap gap-2">
                        {skills.map((skill, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 bg-blue-50 text-blue-600 rounded-md text-lg font-medium basis-[calc(25%-8px)] text-center"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  {/*Part 6*/}
                  <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg mt-6 border border-gray-100 p-6 overflow-hidden">
                    <div className="flex justify-between items-center mb-6">
                      <h2 className="text-xl font-semibold text-gray-800">
                        Portfolios
                      </h2>
                      <button className="text-blue-600 text-3xl font-semibold border border-gray-300 px-2 hover:bg-blue-100 transition">
                        <span className="relative -top-1">+</span>
                      </button>
                    </div>

                    <div className="relative overflow-hidden mb-6">
                      {/* Swiper container */}
                      <div
                        ref={containerRef}
                        className="overflow-x-auto scrollbar-hide px-2"
                        onTouchStart={handleTouchStart}
                        onTouchMove={handleTouchMove}
                        onTouchEnd={handleTouchEnd}
                        onMouseDown={handleMouseStart}
                      >
                        <div
                          className={`flex transition-transform ${
                            isDragging
                              ? "duration-0 cursor-grabbing"
                              : "duration-300"
                          } ease-out`}
                          style={{ transform: `translateX(${translateX}px)` }}
                        >
                          {portfolioItems.map((item, idx) => (
                            <div
                              key={item.id}
                              className="w-64 mr-4 flex-shrink-0 select-none"
                            >
                              <div className="bg-white rounded-lg overflow-hidden shadow-md mb-3 border border-gray-100 w-64">
                                <img
                                  src={item.image}
                                  alt={item.title}
                                  className="w-full h-40 object-cover select-none"
                                  draggable="false"
                                />
                              </div>
                              <p className="text-sm text-gray-700 font-medium mb-2 text-center">
                                {item.title}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="w-1/4 p-4">
                  {/* Additional Details Card */}
                  <div className="bg-white  border border-gray-200 mb-4 shadow-sm overflow-hidden">
                    <div className="flex justify-between items-center px-4 py-3">
                      <h2 className="font-medium text-base text-gray-800">
                        Additional Details
                      </h2>
                      <button className="text-blue-500 w-8 h-8 flex items-center justify-center border border-gray-300 cursor-pointer">
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M11 4H4C3.46957 4 2.96086 4.21071 2.58579 4.58579C2.21071 4.96086 2 5.46957 2 6V20C2 20.5304 2.21071 21.0391 2.58579 21.4142C2.96086 21.7893 3.46957 22 4 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V13"
                            stroke="#3B82F6"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M18.5 2.50001C18.8978 2.10219 19.4374 1.87869 20 1.87869C20.5626 1.87869 21.1022 2.10219 21.5 2.50001C21.8978 2.89784 22.1213 3.4374 22.1213 4.00001C22.1213 4.56262 21.8978 5.10219 21.5 5.50001L12 15L8 16L9 12L18.5 2.50001Z"
                            stroke="#3B82F6"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </button>
                    </div>
                    <div className="px-4 py-3">
                      {/* Email */}
                      <div className="flex mb-3">
                        <div className="w-6 mr-3 text-gray-400">
                          <svg
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z"
                              stroke="#9CA3AF"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M22 6L12 13L2 6"
                              stroke="#9CA3AF"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </div>
                        <div>
                          <div className="text-sm text-gray-500 mb-0.5">
                            Email
                          </div>
                          <div className="text-gray-800 text-sm">
                            jakegyll@email.com
                          </div>
                        </div>
                      </div>

                      {/* Phone */}
                      <div className="flex mb-3">
                        <div className="w-6 mr-3 text-gray-400">
                          <svg
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M22 16.92V19.92C22.0011 20.1985 21.9441 20.4742 21.8325 20.7294C21.7209 20.9845 21.5573 21.2136 21.3521 21.4019C21.1468 21.5901 20.9046 21.7335 20.6407 21.8227C20.3769 21.9119 20.0974 21.9451 19.82 21.92C16.7428 21.5856 13.787 20.5341 11.19 18.85C8.77382 17.3147 6.72533 15.2662 5.18999 12.85C3.49997 10.2412 2.44824 7.27099 2.11999 4.18C2.09494 3.90363 2.12781 3.62452 2.2165 3.36136C2.3052 3.09821 2.44763 2.85666 2.63476 2.65162C2.82189 2.44657 3.04974 2.28271 3.30372 2.17052C3.55771 2.05833 3.83227 2.00026 4.10999 2H7.10999C7.5953 1.99522 8.06579 2.16708 8.43376 2.48353C8.80173 2.79999 9.04207 3.23945 9.10999 3.72C9.23662 4.68007 9.47144 5.62273 9.80999 6.53C9.94454 6.88792 9.97366 7.27691 9.8939 7.65088C9.81415 8.02485 9.62886 8.36811 9.35999 8.64L8.08999 9.91C9.51355 12.4135 11.5864 14.4864 14.09 15.91L15.36 14.64C15.6319 14.3711 15.9751 14.1858 16.3491 14.1061C16.7231 14.0263 17.1121 14.0555 17.47 14.19C18.3773 14.5286 19.3199 14.7634 20.28 14.89C20.7658 14.9585 21.2094 15.2032 21.5265 15.5775C21.8437 15.9518 22.0122 16.4296 22 16.92Z"
                              stroke="#9CA3AF"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </div>
                        <div>
                          <div className="text-sm text-gray-500 mb-0.5">
                            Phone
                          </div>
                          <div className="text-gray-800 text-sm">
                            +44 1245 572 135
                          </div>
                        </div>
                      </div>

                      {/* Languages */}
                      <div className="flex">
                        <div className="w-6 mr-3 text-gray-400">
                          <svg
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                              stroke="#9CA3AF"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M2 12H22"
                              stroke="#9CA3AF"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M12 2C14.5013 4.73835 15.9228 8.29203 16 12C15.9228 15.708 14.5013 19.2616 12 22C9.49872 19.2616 8.07725 15.708 8 12C8.07725 8.29203 9.49872 4.73835 12 2Z"
                              stroke="#9CA3AF"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </div>
                        <div>
                          <div className="text-sm text-gray-500 mb-0.5">
                            Languages
                          </div>
                          <div className="text-gray-800 text-sm">
                            English, French
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Social Links Card */}
                  <div className="bg-white  border border-gray-200 mb-4 shadow-sm overflow-hidden">
                    <div className="flex justify-between items-center px-4 py-3 ">
                      <h2 className="font-medium text-base text-gray-800">
                        Social Links
                      </h2>
                      <button className="text-blue-500 w-8 h-8 flex items-center justify-center border border-gray-300 cursor-pointer">
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M11 4H4C3.46957 4 2.96086 4.21071 2.58579 4.58579C2.21071 4.96086 2 5.46957 2 6V20C2 20.5304 2.21071 21.0391 2.58579 21.4142C2.96086 21.7893 3.46957 22 4 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V13"
                            stroke="#3B82F6"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M18.5 2.50001C18.8978 2.10219 19.4374 1.87869 20 1.87869C20.5626 1.87869 21.1022 2.10219 21.5 2.50001C21.8978 2.89784 22.1213 3.4374 22.1213 4.00001C22.1213 4.56262 21.8978 5.10219 21.5 5.50001L12 15L8 16L9 12L18.5 2.50001Z"
                            stroke="#3B82F6"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </button>
                    </div>
                    <div className="px-4 py-3">
                      {/* Instagram */}
                      <div className="flex mb-3">
                        <div className="w-6 mr-3 text-gray-400">
                          <svg
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M17 2H7C4.23858 2 2 4.23858 2 7V17C2 19.7614 4.23858 22 7 22H17C19.7614 22 22 19.7614 22 17V7C22 4.23858 19.7614 2 17 2Z"
                              stroke="#9CA3AF"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M16 11.37C16.1234 12.2022 15.9813 13.0522 15.5938 13.799C15.2063 14.5458 14.5931 15.1514 13.8416 15.5297C13.0901 15.9079 12.2384 16.0396 11.4078 15.9059C10.5771 15.7723 9.80976 15.3801 9.21484 14.7852C8.61992 14.1902 8.22773 13.4229 8.09407 12.5922C7.9604 11.7615 8.09207 10.9099 8.47033 10.1584C8.84859 9.40685 9.45419 8.79374 10.201 8.40624C10.9478 8.01874 11.7978 7.87658 12.63 8C13.4789 8.12588 14.2649 8.52146 14.8717 9.1283C15.4785 9.73515 15.8741 10.5211 16 11.37Z"
                              stroke="#9CA3AF"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M17.5 6.5H17.51"
                              stroke="#9CA3AF"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </div>
                        <div>
                          <div className="text-sm text-gray-500 mb-0.5">
                            Instagram
                          </div>
                          <a
                            href="https://instagram.com/jakegyll"
                            className="text-blue-500 text-sm"
                          >
                            instagram.com/jakegyll
                          </a>
                        </div>
                      </div>

                      {/* Twitter */}
                      <div className="flex mb-3">
                        <div className="w-6 mr-3 text-gray-400">
                          <svg
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M23 3.00005C22.0424 3.67552 20.9821 4.19216 19.86 4.53005C19.2577 3.83756 18.4573 3.34674 17.567 3.12397C16.6767 2.90121 15.7395 2.95724 14.8821 3.2845C14.0247 3.61176 13.2884 4.19445 12.773 4.95376C12.2575 5.71308 11.9877 6.61238 12 7.53005V8.53005C10.2426 8.57561 8.50127 8.18586 6.93101 7.39549C5.36074 6.60513 4.01032 5.43868 3 4.00005C3 4.00005 -1 13 8 17C5.94053 18.398 3.48716 19.099 1 19C10 24 21 19 21 7.50005C20.9991 7.2215 20.9723 6.94364 20.92 6.67005C21.9406 5.66354 22.6608 4.39276 23 3.00005Z"
                              stroke="#9CA3AF"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </div>
                        <div>
                          <div className="text-sm text-gray-500 mb-0.5">
                            Twitter
                          </div>
                          <a
                            href="https://twitter.com/jakegyll"
                            className="text-blue-500 text-sm"
                          >
                            twitter.com/jakegyll
                          </a>
                        </div>
                      </div>

                      {/* Website */}
                      <div className="flex">
                        <div className="w-6 mr-3 text-gray-400">
                          <svg
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                              stroke="#9CA3AF"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M2 12H22"
                              stroke="#9CA3AF"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M12 2C14.5013 4.73835 15.9228 8.29203 16 12C15.9228 15.708 14.5013 19.2616 12 22C9.49872 19.2616 8.07725 15.708 8 12C8.07725 8.29203 9.49872 4.73835 12 2Z"
                              stroke="#9CA3AF"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </div>
                        <div>
                          <div className="text-sm text-gray-500 mb-0.5">
                            Website
                          </div>
                          <a
                            href="https://www.jakegyll.com"
                            className="text-blue-500 text-sm"
                          >
                            www.jakegyll.com
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
