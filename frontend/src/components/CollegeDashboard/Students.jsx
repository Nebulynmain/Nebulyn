import React, { useState, useRef, useEffect } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { Search, Filter, Star, ChevronLeft, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Students = () => {
  const navigate = useNavigate();
  const [view, setView] = useState("table");
  const students = [
    {
      id: 1,
      name: "Jake Gyll",
      gpa: 3.8,
      status: "Not Hired",
      graduationDate: "May 2023",
      course: "BTech",
      major: "Computer Science",
      image: "https://randomuser.me/api/portraits/men/1.jpg",
      previousApplications: ["Google", "Microsoft"],
    },
    {
      id: 2,
      name: "Guy Hawkins",
      gpa: 3.5,
      status: "Not Hired",
      graduationDate: "June 2023",
      course: "BTech",
      major: "Software Engineering",
      image: "https://randomuser.me/api/portraits/men/2.jpg",
      previousApplications: ["Amazon", "Facebook"],
    },
    {
      id: 3,
      name: "Cyndy Lillibridge",
      gpa: 4.0,
      status: "Not Hired",
      graduationDate: "December 2022",
      course: "MSc",
      major: "Data Science",
      image: "https://randomuser.me/api/portraits/women/3.jpg",
      previousApplications: ["IBM", "Oracle"],
    },
    {
      id: 4,
      name: "Rodolfo Goode",
      gpa: 3.2,
      status: "Not Hired",
      graduationDate: "May 2023",
      course: "BTech",
      major: "Computer Engineering",
      image: "https://randomuser.me/api/portraits/men/4.jpg",
      previousApplications: ["Apple", "Intel"],
    },
    {
      id: 5,
      name: "Leif Floyd",
      gpa: 3.9,
      status: "Hired",
      graduationDate: "December 2022",
      course: "BFA",
      major: "Graphic Design",
      image: "https://randomuser.me/api/portraits/men/5.jpg",
      previousApplications: ["Adobe", "Canva"],
    },
    {
      id: 6,
      name: "Jenny Wilson",
      gpa: 3.7,
      status: "Hired",
      graduationDate: "May 2023",
      course: "BDes",
      major: "UI/UX Design",
      image: "https://randomuser.me/api/portraits/women/6.jpg",
      previousApplications: ["Spotify", "Netflix"],
    },
    {
      id: 7,
      name: "Jerome Bell",
      gpa: 3.5,
      status: "Not Hired",
      graduationDate: "June 2023",
      course: "BFA",
      major: "Visual Design",
      image: "https://randomuser.me/api/portraits/men/7.jpg",
      previousApplications: ["Twitter", "Slack"],
    },
    {
      id: 8,
      name: "Eleanor Pena",
      gpa: 3.3,
      status: "Not Hired",
      graduationDate: "December 2022",
      course: "BBA",
      major: "Information Systems",
      image: "https://randomuser.me/api/portraits/women/8.jpg",
      previousApplications: ["Salesforce", "Airbnb"],
    },
    {
      id: 9,
      name: "Darrell Steward",
      gpa: 3.6,
      status: "Not Hired",
      graduationDate: "May 2023",
      course: "BTech",
      major: "Web Development",
      image: "https://randomuser.me/api/portraits/men/9.jpg",
      previousApplications: ["Dropbox", "Uber"],
    },
    {
      id: 10,
      name: "Floyd Miles",
      gpa: 3.4,
      status: "Not Hired",
      graduationDate: "June 2023",
      course: "BTech",
      major: "Computer Graphics",
      image: "https://randomuser.me/api/portraits/men/10.jpg",
      previousApplications: ["EA", "Epic Games"],
    },
  ];

  const [selectedStudents, setSelectedStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectAll, setSelectAll] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [studentsPerPage, setStudentsPerPage] = useState(10);

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedStudents([]);
    } else {
      setSelectedStudents(students.map((student) => student.id));
    }
    setSelectAll(!selectAll);
  };

  const handleSelect = (id) => {
    if (selectedStudents.includes(id)) {
      setSelectedStudents(selectedStudents.filter((sid) => sid !== id));
    } else {
      setSelectedStudents([...selectedStudents, id]);
    }
  };

  const filteredStudents = students.filter((student) =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastStudent = currentPage * studentsPerPage;
  const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
  const currentStudents = filteredStudents.slice(
    indexOfFirstStudent,
    indexOfLastStudent
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const totalPages = Math.ceil(filteredStudents.length / studentsPerPage);

  const statusGroups = {
    Hired: filteredStudents.filter((s) => s.status === "Hired"),
    "Not Hired": filteredStudents.filter((s) => s.status === "Not Hired"),
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Hired":
        return "bg-green-50";
      case "Not Hired":
        return "bg-gray-50";
      default:
        return "bg-gray-50";
    }
  };

  const getStatusTextColor = (status) => {
    switch (status) {
      case "Hired":
        return "text-green-600";
      case "Not Hired":
        return "text-gray-600";
      default:
        return "text-gray-600";
    }
  };

  const getGpaColor = (gpa) => {
    if (gpa >= 3.7) return "text-green-500";
    if (gpa >= 3.3) return "text-blue-500";
    return "text-yellow-500";
  };

  const getCourseColor = (course) => {
    switch (course) {
      case "BTech":
        return "text-blue-600";
      case "BBA":
        return "text-purple-600";
      case "MSc":
        return "text-green-600";
      case "BFA":
        return "text-orange-600";
      case "BDes":
        return "text-pink-600";
      default:
        return "text-gray-600";
    }
  };

  const StudentCard = ({ student }) => (
    <div
      className="bg-white p-2 rounded-md shadow-sm border border-gray-200 mb-2 cursor-pointer hover:shadow-md transition-shadow"
      onClick={() => navigate("/student-detail")}
    >
      <div className="flex items-center mb-1">
        <div className="w-7 h-7 flex-shrink-0">
          <img
            src={student.image}
            alt={student.name}
            className="w-full h-full rounded-full border object-cover"
          />
        </div>
        <div className="ml-2 min-w-0">
          <h3 className="text-xs font-medium text-gray-900 truncate">
            {student.name}
          </h3>
          <p className="text-[0.65rem] text-gray-500 truncate">
            <span className={`${getCourseColor(student.course)} font-medium`}>
              {student.course}
            </span>{" "}
            - {student.major}
          </p>
        </div>
      </div>
      <div className="flex justify-between items-center text-[0.65rem]">
        <div className={`flex items-center ${getGpaColor(student.gpa)}`}>
          <span>GPA: {student.gpa}</span>
        </div>
        <span className="text-gray-500">{student.graduationDate}</span>
      </div>
      <div className="mt-1 text-[0.65rem] text-gray-600">
        <p className="truncate">
          Applied: {student.previousApplications.join(", ")}
        </p>
      </div>
      <div className="mt-1">
        <button
          className="w-full px-1 py-0.5 text-[0.65rem] border border-blue-500 bg-[#E9EBFD] text-blue-500 rounded hover:bg-blue-100 transition-colors cursor-pointer"
          onClick={(e) => {
            e.stopPropagation();
            navigate("/student-detail");
          }}
        >
          View Profile
        </button>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex flex-row flex-grow">
        <div className="h-screen sticky top-0">
          <Sidebar />
        </div>
        <div className="flex-grow transition-all w-full">
          <Header />
          <div className="container mx-auto">
            <div className="flex flex-col md:flex-row md:justify-between md:items-center p-2 md:p-3">
              <h2 className="text-lg md:text-xl font-semibold text-gray-800 mb-2 md:mb-0">
                Students:{" "}
                <span className="font-bold">{filteredStudents.length}</span>
              </h2>
              <div className="flex flex-col md:flex-row items-start md:items-center gap-2">
                <div className="relative w-full md:w-40">
                  <Search className="absolute left-2 top-2 h-3.5 w-3.5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search"
                    className="w-full pl-7 pr-2 py-1.5 text-xs border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 cursor-text"
                    value={searchTerm}
                    onChange={(e) => {
                      setSearchTerm(e.target.value);
                      setCurrentPage(1);
                    }}
                  />
                </div>

                <button className="flex items-center gap-1 px-2 py-1.5 border rounded-md hover:bg-gray-100 text-xs cursor-pointer">
                  <Filter className="h-3.5 w-3.5" /> Filter
                </button>

                <div className="hidden md:block border-l h-5 mx-1"></div>

                <div className="flex bg-blue-100 p-0.5 rounded-md">
                  <button
                    className={`w-28 h-7 px-2 py-0.5 rounded-sm text-blue-600 text-xs cursor-pointer ${
                      view === "pipeline"
                        ? "bg-white shadow-sm"
                        : "hover:bg-blue-200"
                    }`}
                    onClick={() => setView("pipeline")}
                  >
                    Status View
                  </button>
                  <button
                    className={`w-28 h-7 px-2 py-0.5 rounded-sm text-blue-600 text-xs cursor-pointer ${
                      view === "table"
                        ? "bg-white shadow-sm"
                        : "hover:bg-blue-200"
                    }`}
                    onClick={() => setView("table")}
                  >
                    Table
                  </button>
                </div>
              </div>
            </div>

            {view === "table" && (
              <div className="overflow-x-auto px-3 md:px-4">
                <table className="min-w-full border-collapse border border-gray-200 rounded-md overflow-hidden text-sm">
                  <thead className="bg-white text-gray-600 uppercase border-b border-gray-200">
                    <tr>
                      <th className="p-2 text-left">
                        <input
                          type="checkbox"
                          className="form-checkbox text-blue-500 border-gray-300 rounded cursor-pointer h-4 w-4"
                          checked={selectAll}
                          onChange={handleSelectAll}
                        />
                      </th>
                      {[
                        "Name",
                        "GPA",
                        "Status",
                        "Graduation",
                        "Course",
                        "Major",
                        "Previous Applications",
                        "Action",
                      ].map((header) => (
                        <th
                          key={header}
                          className="p-2 text-left font-medium cursor-pointer hover:bg-gray-50"
                        >
                          <div className="flex items-center space-x-1">
                            <span>{header}</span>
                            <span className="text-xs opacity-50">▲▼</span>
                          </div>
                        </th>
                      ))}
                    </tr>
                  </thead>

                  <tbody>
                    {currentStudents.length > 0 ? (
                      currentStudents.map((student) => (
                        <tr
                          key={student.id}
                          className="border-t hover:bg-gray-50 cursor-pointer"
                          onClick={() => navigate("/student-detail")}
                        >
                          <td
                            className="p-2"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <input
                              type="checkbox"
                              className="form-checkbox text-blue-500 cursor-pointer h-4 w-4"
                              checked={selectedStudents.includes(student.id)}
                              onChange={() => handleSelect(student.id)}
                            />
                          </td>
                          <td className="p-2">
                            <div className="flex items-center space-x-2">
                              <img
                                src={student.image}
                                alt={student.name}
                                className="w-6 h-6 rounded-full border object-cover"
                              />
                              <span className="font-medium text-gray-900">
                                {student.name}
                              </span>
                            </div>
                          </td>
                          <td className="p-2">
                            <div
                              className={`flex items-center ${getGpaColor(
                                student.gpa
                              )}`}
                            >
                              <span>{student.gpa}</span>
                            </div>
                          </td>
                          <td className="p-2">
                            <span
                              className={`px-2 py-1 rounded-full text-xs font-medium 
                                ${getStatusTextColor(student.status)} 
                                ${getStatusColor(student.status)}`}
                            >
                              {student.status}
                            </span>
                          </td>
                          <td className="p-2 text-gray-600">
                            {student.graduationDate}
                          </td>
                          <td className="p-2">
                            <span
                              className={`font-medium ${getCourseColor(
                                student.course
                              )}`}
                            >
                              {student.course}
                            </span>
                          </td>
                          <td className="p-2 text-gray-600">{student.major}</td>
                          <td className="p-2 text-gray-600">
                            {student.previousApplications.join(", ")}
                          </td>
                          <td className="p-2">
                            <button
                              className="px-2 py-1 text-xs border border-blue-500 bg-[#E9EBFD] text-blue-500 rounded cursor-pointer hover:bg-blue-100"
                              onClick={(e) => {
                                e.stopPropagation();
                                navigate("/student-detail");
                              }}
                            >
                              View Profile
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td
                          colSpan="9"
                          className="p-3 text-center text-gray-500 text-sm"
                        >
                          No matching students found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}

            {view === "pipeline" && (
              <div className="p-2">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {Object.keys(statusGroups).map((status) => (
                    <div key={status} className="bg-white rounded-md shadow-sm">
                      <div
                        className={`p-1.5 rounded-t-md ${getStatusColor(
                          status
                        )}`}
                      >
                        <div className="flex justify-between items-center">
                          <h3
                            className={`text-xs font-medium ${getStatusTextColor(
                              status
                            )}`}
                          >
                            {status}
                          </h3>
                          <span className="bg-white px-1 py-0.5 rounded-full text-[0.65rem] font-medium text-gray-700">
                            {statusGroups[status].length}
                          </span>
                        </div>
                      </div>
                      <div className="p-1.5 max-h-[calc(100vh-250px)] overflow-y-auto">
                        {statusGroups[status].length > 0 ? (
                          statusGroups[status].map((student) => (
                            <StudentCard key={student.id} student={student} />
                          ))
                        ) : (
                          <div className="text-center py-3 text-gray-500 text-[0.65rem]">
                            No students
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {view === "table" && (
              <div className="flex flex-col md:flex-row justify-between items-center p-2 md:p-3 text-xs">
                <div className="flex items-center space-x-1.5 mb-2 md:mb-0">
                  <span>Show</span>
                  <select
                    value={studentsPerPage}
                    onChange={(e) => {
                      setStudentsPerPage(Number(e.target.value));
                      setCurrentPage(1);
                    }}
                    className="border rounded px-1 py-0.5 cursor-pointer"
                  >
                    <option value={10}>10</option>
                    <option value={20}>20</option>
                    <option value={50}>50</option>
                  </select>
                  <span>per page</span>
                </div>
                <div className="flex items-center space-x-1">
                  <button
                    onClick={() =>
                      setCurrentPage((prev) => Math.max(prev - 1, 1))
                    }
                    disabled={currentPage === 1}
                    className={`p-1 border rounded ${
                      currentPage === 1
                        ? "text-gray-300 cursor-not-allowed"
                        : "hover:bg-gray-100 cursor-pointer"
                    }`}
                  >
                    <ChevronLeft size={12} />
                  </button>
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    let pageNum;
                    if (totalPages <= 5) {
                      pageNum = i + 1;
                    } else if (currentPage <= 3) {
                      pageNum = i + 1;
                    } else if (currentPage >= totalPages - 2) {
                      pageNum = totalPages - 4 + i;
                    } else {
                      pageNum = currentPage - 2 + i;
                    }
                    return (
                      <button
                        key={pageNum}
                        onClick={() => paginate(pageNum)}
                        className={`px-2 py-0.5 border rounded ${
                          currentPage === pageNum
                            ? "bg-blue-500 text-white"
                            : "hover:bg-gray-100 cursor-pointer"
                        }`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}
                  <button
                    onClick={() =>
                      setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                    }
                    disabled={currentPage === totalPages}
                    className={`p-1 border rounded ${
                      currentPage === totalPages
                        ? "text-gray-300 cursor-not-allowed"
                        : "hover:bg-gray-100 cursor-pointer"
                    }`}
                  >
                    <ChevronRight size={12} />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Students;
