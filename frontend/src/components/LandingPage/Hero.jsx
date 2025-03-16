import React from "react";
import { FaSearch, FaMapMarkerAlt } from "react-icons/fa";
import { Briefcase, Building, Users } from "lucide-react";

const Hero = () => {
  return (
    <div className="bg-blue-100 py-10 px-4 md:px-16 text-left ">
      <div className="max-w-4xl pl-4 pr-4 md:pl-16 md:pr-16 mt-10">
        <h1 className="text-4xl md:text-6xl font-semibold text-gray-900 mb-6">
          Find a job that aligns with your interests and skills
        </h1>
        <p className="text-gray-500 mb-8 text-lg">DISCRIPTION</p>

        <div className="bg-white p-3 rounded-lg shadow-md flex items-center max-w-[95%]">
          <div className="flex items-center flex-grow border-r px-6 py-2">
            <FaSearch className="text-gray-400 mr-2" />
            <input
              type="text"
              placeholder="Job title, Keyword..."
              className="w-full outline-none text-lg"
            />
          </div>
          <div className="flex items-center flex-grow px-6 py-2">
            <FaMapMarkerAlt className="text-gray-400 mr-2" />
            <input
              type="text"
              placeholder="Location"
              className="w-full outline-none text-lg"
            />
          </div>
          <button className="bg-[#007AFF] text-white px-10 py-3 rounded-lg font-medium text-lg cursor-pointer">
            Find Job
          </button>
        </div>
      </div>

      <div className="mt-60 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-14 max-w-10xl">
        <div className="bg-white p-6 rounded-xl shadow-lg flex items-center w-full max-w-80">
          <div className="bg-blue-50 p-3 rounded-lg mr-4">
            <Briefcase className="text-blue-500" size={36} />
          </div>
          <div>
            <p className="text-3xl font-semibold text-gray-900">1,75,324</p>
            <p className="text-gray-500 text-base">Live Jobs</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg flex items-center w-full max-w-80">
          <div className="bg-blue-50 p-3 rounded-lg mr-4">
            <Building className="text-blue-500" size={36} />
          </div>
          <div>
            <p className="text-3xl font-semibold text-gray-900">97,354</p>
            <p className="text-gray-500 text-base">Companies</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg flex items-center w-full max-w-80">
          <div className="bg-blue-50 p-3 rounded-lg mr-4">
            <Users className="text-blue-500" size={36} />
          </div>
          <div>
            <p className="text-3xl font-semibold text-gray-900">38,47,154</p>
            <p className="text-gray-500 text-base">Candidates</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg flex items-center w-full max-w-80">
          <div className="bg-blue-50 p-3 rounded-lg mr-4">
            <Briefcase className="text-blue-500" size={36} />
          </div>
          <div>
            <p className="text-3xl font-semibold text-gray-900">7,532</p>
            <p className="text-gray-500 text-base">New Jobs</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
