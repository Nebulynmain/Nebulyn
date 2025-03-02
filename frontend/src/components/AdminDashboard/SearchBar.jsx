import React from "react";

export default function SearchBar() {
    return (
      <div className="w-full max-w-2xl mx-auto p-4">
        <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden shadow-sm">
          {/* Job Title Input */}
          <div className="flex items-center px-3 border-r border-gray-300 w-1/2">
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M16.65 10.83a5.83 5.83 0 11-11.66 0 5.83 5.83 0 0111.66 0z" />
            </svg>
            <input
              type="text"
              placeholder="Job title or keyword"
              className="w-full p-2 outline-none bg-transparent"
            />
          </div>
  
          {/* Location Input */}
          <div className="flex items-center px-3 border-r border-gray-300 w-1/2">
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 11 7 11s7-5.75 7-11c0-3.87-3.13-7-7-7zm0 10.5a3.5 3.5 0 110-7 3.5 3.5 0 010 7z" />
            </svg>
            <input
              type="text"
              placeholder="Delhi, India"
              className="w-full p-2 outline-none bg-transparent"
            />
          </div>
  
          {/* Search Button */}
          <button className="bg-blue-600 text-white px-6 py-2 hover:bg-blue-700">
            Search
          </button>
        </div>
  
        {/* Popular Jobs */}
        <div className="mt-2 text-gray-500 text-sm">
          Popular: <span className="text-blue-600 cursor-pointer">UI Designer</span>, 
          <span className="text-blue-600 cursor-pointer"> UX Researcher</span>, 
          <span className="text-blue-600 cursor-pointer"> Android</span>, 
          <span className="text-blue-600 cursor-pointer"> Admin</span>
        </div>
      </div>
    );
  }
  