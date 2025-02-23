import React, { useState } from "react";
import { MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { FaRegBookmark, FaBookmark } from "react-icons/fa";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const jobs = [
  {
    title: "Technical Support Specialist",
    type: "PART-TIME",
    salary: "20,000 INR - 25,000 INR",
    company: "Google Inc.",
    location: "New Delhi, India",
    applicants: "10+ applicants",
    logo: "/google-logo.png",
    bookmarked: false,
  },
  {
    title: "Senior UI/UX Designer",
    type: "FULL-TIME",
    salary: "$30,000 - $55,000",
    company: "Apple",
    location: "Boston, USA",
    applicants: "9+ applicants",
    logo: "/apple-logo.png",
    bookmarked: false,
  },
  {
    title: "Marketing Officer",
    type: "PART-TIME",
    salary: "15,000 INR - 35,000 INR",
    company: "Intel Corp",
    location: "Bangalore, India",
    applicants: "30+ applicants",
    logo: "/intel-logo.png",
    bookmarked: false,
  },
  {
    title: "Software Engineer",
    type: "FULL-TIME",
    salary: "$70,000 - $90,000",
    company: "Microsoft",
    location: "Seattle, USA",
    applicants: "20+ applicants",
    logo: "/microsoft-logo.png",
    bookmarked: false,
  },
  {
    title: "Data Scientist",
    type: "FULL-TIME",
    salary: "$80,000 - $120,000",
    company: "Amazon",
    location: "San Francisco, USA",
    applicants: "15+ applicants",
    logo: "/amazon-logo.png",
    bookmarked: false,
  },
  {
    title: "Business Analyst",
    type: "FULL-TIME",
    salary: "50,000 INR - 70,000 INR",
    company: "Deloitte",
    location: "Mumbai, India",
    applicants: "12+ applicants",
    logo: "/deloitte-logo.png",
    bookmarked: false,
  },
  {
    title: "Cloud Engineer",
    type: "FULL-TIME",
    salary: "$85,000 - $110,000",
    company: "IBM",
    location: "Austin, USA",
    applicants: "18+ applicants",
    logo: "/ibm-logo.png",
    bookmarked: false,
  },
  {
    title: "Product Manager",
    type: "FULL-TIME",
    salary: "$90,000 - $130,000",
    company: "Meta",
    location: "New York, USA",
    applicants: "25+ applicants",
    logo: "/meta-logo.png",
    bookmarked: false,
  },
  {
    title: "Graphic Designer",
    type: "PART-TIME",
    salary: "30,000 INR - 50,000 INR",
    company: "Adobe",
    location: "Pune, India",
    applicants: "8+ applicants",
    logo: "/adobe-logo.png",
    bookmarked: false,
  },
  {
    title: "Cybersecurity Analyst",
    type: "FULL-TIME",
    salary: "$75,000 - $100,000",
    company: "Cisco",
    location: "San Diego, USA",
    applicants: "14+ applicants",
    logo: "/cisco-logo.png",
    bookmarked: false,
  },
  {
    title: "Digital Marketing Manager",
    type: "FULL-TIME",
    salary: "40,000 INR - 60,000 INR",
    company: "Zomato",
    location: "Hyderabad, India",
    applicants: "22+ applicants",
    logo: "/zomato-logo.png",
    bookmarked: false,
  },
  {
    title: "HR Executive",
    type: "PART-TIME",
    salary: "25,000 INR - 35,000 INR",
    company: "TCS",
    location: "Chennai, India",
    applicants: "11+ applicants",
    logo: "/tcs-logo.png",
    bookmarked: false,
  },
  {
    title: "DevOps Engineer",
    type: "FULL-TIME",
    salary: "$85,000 - $115,000",
    company: "Netflix",
    location: "Los Angeles, USA",
    applicants: "17+ applicants",
    logo: "/netflix-logo.png",
    bookmarked: false,
  },
  {
    title: "Frontend Developer",
    type: "FULL-TIME",
    salary: "$60,000 - $80,000",
    company: "Spotify",
    location: "Toronto, Canada",
    applicants: "19+ applicants",
    logo: "/spotify-logo.png",
    bookmarked: false,
  },
];

const Job = () => {
  const navigate = useNavigate();
  const [visibleJobs, setVisibleJobs] = useState(jobs);

  const toggleBookmark = (index) => {
    setVisibleJobs((prevJobs) =>
      prevJobs.map((job, i) =>
        i === index ? { ...job, bookmarked: !job.bookmarked } : job
      )
    );
  };

  // Slick slider settings
  const settings = {
    // dots: true, // Neeche indicators dikhayega
    infinite: true, // Infinite scrolling enable karega
    speed: 500, // Slide transition speed
    slidesToShow: 3, // Ek baar me 3 slides dikhenge
    slidesToScroll: 1, // Ek baar me ek slide scroll hoga
    autoplay: true, // Auto slide enable karega
    autoplaySpeed: 3000, // 3 second ke baad slide change hoga
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div className="p-30">
      <h2 className="text-5xl font-bold text-center text-black">
        Featured Jobs
      </h2>
      <p className="text-gray-500 text-center mb-12 text-xl mt-4">
        Choose jobs from the top employers and apply for the same.
      </p>

      {/* Slider */}
      <Slider {...settings} className="px-4">
        {visibleJobs.map((job, index) => (
          <div key={index} className="p-7">
            <div className="relative p-6 border-2 border-black rounded-lg bg-white shadow-lg min-h-[290px] flex flex-col justify-between hover:shadow-2xl hover:scale-105 transition-all duration-300">
              {/* Bookmark Icon */}
              <div className="absolute top-4 right-4">
                {job.bookmarked ? (
                  <FaBookmark
                    className="text-[#3B8BEB] text-2xl cursor-pointer"
                    onClick={() => toggleBookmark(index)}
                  />
                ) : (
                  <FaRegBookmark
                    className="text-gray-400 text-2xl cursor-pointer"
                    onClick={() => toggleBookmark(index)}
                  />
                )}
              </div>

              {/* Job Title */}
              <h3 className="text-lg font-semibold text-gray-900">
                {job.title}
              </h3>

              {/* Job Type & Salary */}
              <div className="flex items-center gap-3">
                <span
                  className={`text-xs font-bold px-3 py-1 rounded-md ${
                    job.type === "FULL-TIME"
                      ? "bg-gray-200 text-gray-800"
                      : "bg-green-200 text-green-800"
                  }`}
                >
                  {job.type}
                </span>
                <p className="text-gray-600 text-sm">Salary: {job.salary}</p>
              </div>

              {/* Company & Location */}
              <div className="flex items-center gap-4 mt-4">
                <img
                  src={job.logo}
                  alt={job.company}
                  className="w-10 h-10 rounded-full"
                />
                <div>
                  <p className="text-gray-900 font-semibold">{job.company}</p>
                  <div className="flex items-center gap-2 text-gray-500 text-sm">
                    <MapPin size={16} className="text-gray-400" />
                    {job.location}
                  </div>
                </div>
              </div>

              {/* Applicants */}
              <div className="flex items-center gap-3 mt-4">
                <div className="flex -space-x-2">
                  <img
                    src="/images/user1.jpg"
                    className="w-7 h-7 rounded-full border border-white"
                  />
                  <img
                    src="/images/user2.jpg"
                    className="w-7 h-7 rounded-full border border-white"
                  />
                  <img
                    src="/images/user3.jpg"
                    className="w-7 h-7 rounded-full border border-white"
                  />
                </div>
                <p className="text-gray-500 text-sm">{job.applicants}</p>
              </div>

              {/* Buttons */}
              <div className="flex justify-between mt-6 gap-4 p-2">
                <button className="border-2 border-black font-semibold px-5 py-2 rounded-md text-black text-sm w-full hover:shadow-2xl hover:scale-105 transition-all duration-300">
                  View details
                </button>
                <button className="border-2 border-black font-semibold bg-green-600 text-white px-5 py-2 rounded-md text-sm w-full hover:shadow-2xl hover:scale-105 transition-all duration-300">
                  Apply now
                </button>
              </div>
            </div>
          </div>
        ))}
      </Slider>

      <p
        className="text-center mt-8 font-semibold cursor-pointer text-2xl hover:underline "
        onClick={() => navigate("/login")}
      >
        View all
      </p>
    </div>
  );
};

export default Job;
