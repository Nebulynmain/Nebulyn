import React from "react";
import { useNavigate } from "react-router-dom";
import {
  FaPaintBrush,
  FaChartLine,
  FaBullhorn,
  FaWallet,
  FaLaptop,
  FaCode,
  FaBriefcase,
  FaUsers,
} from "react-icons/fa";

const categories = [
  { name: "Design", jobs: 235, icon: <FaPaintBrush /> },
  { name: "Sales", jobs: 756, icon: <FaChartLine /> },
  { name: "Marketing", jobs: 140, icon: <FaBullhorn /> },
  { name: "Finance", jobs: 325, icon: <FaWallet /> },
  { name: "Technology", jobs: 436, icon: <FaLaptop /> },
  { name: "Engineering", jobs: 542, icon: <FaCode /> },
  { name: "Business", jobs: 211, icon: <FaBriefcase /> },
  { name: "Human Resource", jobs: 346, icon: <FaUsers /> },
];

const Category = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-6xl mx-auto py-16 ">
      <div className="flex justify-between items-center mb-12">
        <h2 className="text-5xl font-bold text-gray-900">
          <span className="text-[#3B8BEB]">Explore by</span> category
        </h2>
        <button
          className=" text-lg font-semibold hover:underline cursor-pointer"
          onClick={() => navigate("/login")}
        >
          Show all jobs →
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {categories.map((category, index) => (
          <div
            key={index}
            className="p-10 border-2 border-[#C4DBF6] shadow-lg flex flex-col items-center justify-center text-center bg-white text-gray-900 cursor-pointer transition-transform transform hover:scale-105 hover:bg-[#EAF4FD] hover:shadow-xl rounded-lg"
            onClick={() => navigate(`/category/${category.name.toLowerCase()}`)}
          >
            <div className="text-5xl mb-4 text-black hover:text-[#1E6091] transition-colors">
              {category.icon}
            </div>
            <h3 className="text-2xl font-bold text-[#3B8BEB] hover:text-[#1E6091] transition-colors">
              {category.name}
            </h3>
            <p className="text-lg mt-2 text-gray-500 font-medium">
              {category.jobs} jobs available{" "}
              <span className="text-[#3B8BEB] text-xl mt-1 inline-block">
                →
              </span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Category;
