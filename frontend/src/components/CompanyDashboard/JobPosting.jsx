import React, { useState, useEffect, useRef } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { useNavigate } from "react-router-dom";
import { Range } from "react-range";

const jobCategories = [
  "Software Engineer",
  "Data Scientist",
  "Product Manager",
  "Designer",
  "Marketing",
  "Sales",
];

const RichTextEditor = () => {
  const [description, setDescription] = useState("");
  const editorRef = useRef(null);
  const [charCount, setCharCount] = useState(0);
  const maxChars = 500;
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showLinkDialog, setShowLinkDialog] = useState(false);
  const [linkUrl, setLinkUrl] = useState("");
  const [linkText, setLinkText] = useState("");

  const emojis = ["😀", "😊", "👍", "🎉", "❤️", "🔥", "✅", "🚀", "💡", "📊"];

  useEffect(() => {
    if (editorRef.current) {
      const textOnly = editorRef.current.textContent || "";
      setCharCount(textOnly.length);
    }
  }, [description]);

  const handleInput = () => {
    if (editorRef.current) {
      const content = editorRef.current.innerHTML;
      setDescription(content);
    }
  };

  const applyBold = () => {
    document.execCommand("bold", false, null);
    editorRef.current.focus();
  };

  const applyItalic = () => {
    document.execCommand("italic", false, null);
    editorRef.current.focus();
  };

  const applyNumberedList = () => {
    const selection = window.getSelection();
    const range = selection.getRangeAt(0);
    let selectedText = range.toString();

    if (selectedText) {
      const listHTML = `<ol style="list-style-type: decimal; margin-left: 20px;"><li>${selectedText}</li></ol><br>`;
      document.execCommand("insertHTML", false, listHTML);
    } else {
      document.execCommand("insertOrderedList", false, null);
      const listElements = editorRef.current.querySelectorAll("ol");
      if (listElements.length > 0) {
        const lastList = listElements[listElements.length - 1];
        lastList.style.listStyleType = "decimal";
        lastList.style.marginLeft = "20px";
      }
    }

    editorRef.current.focus();
  };

  const applyBulletList = () => {
    const selection = window.getSelection();
    const range = selection.getRangeAt(0);
    let selectedText = range.toString();

    if (selectedText) {
      const listHTML = `<ul style="list-style-type: disc; margin-left: 20px;"><li>${selectedText}</li></ul><br>`;
      document.execCommand("insertHTML", false, listHTML);
    } else {
      document.execCommand("insertUnorderedList", false, null);
      const listElements = editorRef.current.querySelectorAll("ul");
      if (listElements.length > 0) {
        const lastList = listElements[listElements.length - 1];
        lastList.style.listStyleType = "disc";
        lastList.style.marginLeft = "20px";
      }
    }

    editorRef.current.focus();
  };

  const insertEmoji = (emoji) => {
    document.execCommand("insertText", false, emoji);
    editorRef.current.focus();
    setShowEmojiPicker(false);
  };

  const insertLink = () => {
    if (linkUrl.trim()) {
      const displayText = linkText.trim() || linkUrl;
      const selection = window.getSelection();

      if (selection.rangeCount > 0 && !selection.getRangeAt(0).collapsed) {
        document.execCommand("createLink", false, linkUrl);
      } else {
        document.execCommand(
          "insertHTML",
          false,
          `<a href="${linkUrl}" target="_blank">${displayText}</a>`
        );
      }

      setLinkUrl("");
      setLinkText("");
      setShowLinkDialog(false);
      editorRef.current.focus();
    }
  };

  return (
    <div className="border border-gray-300 rounded-lg p-2 bg-white">
      <div
        ref={editorRef}
        contentEditable="true"
        onInput={handleInput}
        className="w-full p-2 min-h-24 outline-none text-sm overflow-auto"
        style={{
          minHeight: "6rem",
          listStylePosition: "inside",
        }}
      />
      <div className="border-t border-gray-200 pt-2 px-2 flex items-center justify-between">
        <div className="flex space-x-2 relative">
          <button
            type="button"
            className={`text-gray-500 hover:text-gray-700 text-sm ${
              showEmojiPicker ? "text-blue-500" : ""
            } cursor-pointer`}
            onClick={() => {
              setShowLinkDialog(false);
              setShowEmojiPicker(!showEmojiPicker);
            }}
          >
            😊
          </button>

          {showEmojiPicker && (
            <div className="absolute top-8 left-0 bg-white shadow-md rounded-lg p-2 z-10 border border-gray-200 min-w-40">
              <div className="grid grid-cols-4 gap-1">
                {emojis.map((emoji, index) => (
                  <button
                    key={index}
                    type="button"
                    className="text-lg hover:bg-gray-100 w-6 h-6 flex items-center justify-center rounded cursor-pointer"
                    onClick={() => insertEmoji(emoji)}
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            </div>
          )}

          <button
            type="button"
            className="text-gray-700 font-bold hover:bg-gray-100 px-1 py-0.5 rounded text-sm cursor-pointer"
            onClick={() => {
              setShowEmojiPicker(false);
              setShowLinkDialog(false);
              applyBold();
            }}
          >
            B
          </button>
          <button
            type="button"
            className="text-gray-700 italic hover:bg-gray-100 px-1 py-0.5 rounded text-sm cursor-pointer"
            onClick={() => {
              setShowEmojiPicker(false);
              setShowLinkDialog(false);
              applyItalic();
            }}
          >
            I
          </button>
          <button
            type="button"
            className="text-gray-700 hover:bg-gray-100 px-1 py-0.5 rounded text-sm cursor-pointer"
            onClick={() => {
              setShowEmojiPicker(false);
              setShowLinkDialog(false);
              applyNumberedList();
            }}
          >
            🔢
          </button>
          <button
            type="button"
            className="text-gray-700 hover:bg-gray-100 px-1 py-0.5 rounded text-sm cursor-pointer"
            onClick={() => {
              setShowEmojiPicker(false);
              setShowLinkDialog(false);
              applyBulletList();
            }}
          >
            •
          </button>

          <button
            type="button"
            className={`text-gray-500 hover:text-gray-700 text-sm ${
              showLinkDialog ? "text-blue-500" : ""
            } cursor-pointer`}
            onClick={() => {
              setShowEmojiPicker(false);
              setShowLinkDialog(!showLinkDialog);
            }}
          >
            🔗
          </button>

          {showLinkDialog && (
            <div className="absolute top-8 right-0 bg-white shadow-md rounded-lg p-2 z-10 border border-gray-200 w-56">
              <input
                type="text"
                placeholder="Enter link URL"
                className="border p-1 rounded w-full mb-1 text-sm"
                value={linkUrl}
                onChange={(e) => setLinkUrl(e.target.value)}
              />
              <input
                type="text"
                placeholder="Enter link text (optional)"
                className="border p-1 rounded w-full mb-1 text-sm"
                value={linkText}
                onChange={(e) => setLinkText(e.target.value)}
              />
              <button
                className="bg-blue-500 text-white px-2 py-0.5 rounded text-sm cursor-pointer"
                onClick={insertLink}
              >
                Insert Link
              </button>
            </div>
          )}
        </div>
        <div className="text-xs text-gray-500">
          {charCount} / {maxChars}
        </div>
      </div>
    </div>
  );
};

const JobPosting = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(1);
  const [jobTitle, setJobTitle] = useState("");
  const [selectedEmploymentTypes, setSelectedEmploymentTypes] = useState([]);
  const [highestVisitedTab, setHighestVisitedTab] = useState(1);

  useEffect(() => {
    if (activeTab > highestVisitedTab) {
      setHighestVisitedTab(activeTab);
    }
  }, [activeTab, highestVisitedTab]);

  const [salary, setSalary] = useState([5000, 22000]);
  const handleChange = (values) => {
    setSalary(values);
  };

  const [selectedCategories, setSelectedCategories] = useState([]);
  const handleSelect = (event) => {
    const value = event.target.value;
    if (!selectedCategories.includes(value)) {
      setSelectedCategories([...selectedCategories, value]);
    }
  };

  const handleRemove = (category) => {
    setSelectedCategories(
      selectedCategories.filter((item) => item !== category)
    );
  };

  const [skills, setSkills] = useState([
    "Graphic Design",
    "Communication",
    "Illustrator",
  ]);
  const [inputValue, setInputValue] = useState("");

  const addSkill = () => {
    if (inputValue.trim() && !skills.includes(inputValue.trim())) {
      setSkills([...skills, inputValue.trim()]);
      setInputValue("");
    }
  };

  const removeSkill = (skill) => {
    setSkills(skills.filter((s) => s !== skill));
  };

  const handleEmploymentTypeChange = (type) => {
    if (selectedEmploymentTypes.includes(type)) {
      setSelectedEmploymentTypes(
        selectedEmploymentTypes.filter((item) => item !== type)
      );
    } else {
      setSelectedEmploymentTypes([...selectedEmploymentTypes, type]);
    }
  };

  const [jobDescription, setJobDescription] = useState("");
  const [responsibilities, setResponsibilities] = useState("");
  const [qualifications, setQualifications] = useState("");
  const [niceToHaves, setNiceToHaves] = useState("");

  const [benefits, setBenefits] = useState([
    {
      id: 1,
      icon: "healthcare",
      title: "Full Healthcare",
      description:
        "We believe in thriving communities and that starts with our team being happy and healthy.",
    },
    {
      id: 2,
      icon: "vacation",
      title: "Unlimited Vacation",
      description:
        "We believe you should have a flexible schedule that makes space for family, wellness, and fun.",
    },
    {
      id: 3,
      icon: "development",
      title: "Skill Development",
      description:
        "We believe in always learning and leveling up our skills. Whether it's a conference or online course.",
    },
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [newBenefit, setNewBenefit] = useState({
    title: "",
    description: "",
    icon: "healthcare",
  });

  const removeBenefit = (id) => {
    setBenefits(benefits.filter((benefit) => benefit.id !== id));
  };

  const addBenefit = () => {
    if (newBenefit.title && newBenefit.description) {
      const id =
        benefits.length > 0 ? Math.max(...benefits.map((b) => b.id)) + 1 : 1;
      setBenefits([...benefits, { ...newBenefit, id }]);
      setNewBenefit({ title: "", description: "", icon: "healthcare" });
      setShowAddForm(false);
    }
  };

  const renderIcon = (iconType) => {
    switch (iconType) {
      case "healthcare":
        return (
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M19 8C19.7956 8 20.5587 7.68393 21.1213 7.12132C21.6839 6.55871 22 5.79565 22 5C22 4.20435 21.6839 3.44129 21.1213 2.87868C20.5587 2.31607 19.7956 2 19 2C18.2044 2 17.4413 2.31607 16.8787 2.87868C16.3161 3.44129 16 4.20435 16 5C16 5.79565 16.3161 6.55871 16.8787 7.12132C17.4413 7.68393 18.2044 8 19 8Z"
              fill="#1E88E5"
            />
            <path d="M8 10V7H6V10H3V12H6V15H8V12H11V10H8Z" fill="#1E88E5" />
          </svg>
        );
      case "vacation":
        return (
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M13 4L15.9 2.5V6.5L13 5V4Z" fill="#1E88E5" />
            <path
              d="M12 5V22H5C3.9 22 3 21.1 3 20V7.5C3 6.4 3.9 5.5 5 5.5H7V17L12 14L17 17V5.5H19C20.1 5.5 21 6.4 21 7.5V12H23V7.5C23 5.29 21.21 3.5 19 3.5H12V5Z"
              fill="#1E88E5"
            />
          </svg>
        );
      case "development":
        return (
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M17 10.5V7C17 6.45 16.55 6 16 6H4C3.45 6 3 6.45 3 7V17C3 17.55 3.45 18 4 18H16C16.55 18 17 17.55 17 17V13.5L21 17.5V6.5L17 10.5Z"
              fill="#1E88E5"
            />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex flex-row flex-grow">
        <div className="h-screen sticky top-0">
          <Sidebar />
        </div>
        <div className="flex-grow transition-all">
          <Header />
          <div className="">
            <div className="flex justify-between items-center py-4 px-6">
              <div className="flex items-center space-x-2">
                <button
                  className="text-gray-700 text-3xl font-bold mb-1 cursor-pointer"
                  onClick={() => navigate("/applicants")}
                >
                  ←
                </button>
                <h1
                  className="text-2xl font-bold text-gray-900 cursor-pointer"
                  onClick={() => navigate("/applicants")}
                >
                  Post a Job
                </h1>
              </div>
            </div>

            <div className="px-6 pb-8">
              <div className="flex border border-gray-200 rounded-md mb-4">
                <div
                  className={`flex items-center p-2 flex-1 border-r border-gray-200 cursor-pointer`}
                  onClick={() => setActiveTab(1)}
                >
                  <div
                    className={`${
                      highestVisitedTab >= 1 ? "bg-blue-500" : "bg-gray-300"
                    } text-white rounded-full w-8 h-8 flex items-center justify-center mr-2`}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                  </div>
                  <div className="flex flex-col">
                    <span
                      className={`${
                        highestVisitedTab >= 1
                          ? "text-blue-500"
                          : "text-gray-400"
                      } text-xs font-medium`}
                    >
                      Step 1/3
                    </span>
                    <span
                      className={`text-sm font-medium ${
                        activeTab === 1 ? "text-gray-800" : "text-gray-400"
                      }`}
                    >
                      Job Information
                    </span>
                  </div>
                </div>

                <div
                  className={`flex items-center p-2 flex-1 border-r border-gray-200 cursor-pointer`}
                  onClick={() => setActiveTab(2)}
                >
                  <div
                    className={`${
                      highestVisitedTab >= 2 ? "bg-blue-500" : "bg-gray-300"
                    } text-white rounded-full w-8 h-8 flex items-center justify-center mr-2`}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                  </div>
                  <div className="flex flex-col">
                    <span
                      className={`${
                        highestVisitedTab >= 2
                          ? "text-blue-500"
                          : "text-gray-400"
                      } text-xs font-medium`}
                    >
                      Step 2/3
                    </span>
                    <span
                      className={`text-sm font-medium ${
                        activeTab === 2 ? "text-gray-800" : "text-gray-400"
                      }`}
                    >
                      Job Description
                    </span>
                  </div>
                </div>

                <div
                  className={`flex items-center p-2 flex-1 cursor-pointer`}
                  onClick={() => setActiveTab(3)}
                >
                  <div
                    className={`${
                      highestVisitedTab >= 3 ? "bg-blue-500" : "bg-gray-300"
                    } text-white rounded-full w-8 h-8 flex items-center justify-center mr-2`}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M20 7h-4V4c0-1.103-.897-2-2-2h-4c-1.103 0-2 .897-2 2v3H4c-1.103 0-2 .897-2 2v11c0 1.103.897 2 2 2h16c1.103 0 2-.897 2-2V9c0-1.103-.897-2-2-2zM8 4h8v3H8V4z"
                      />
                    </svg>
                  </div>
                  <div className="flex flex-col">
                    <span
                      className={`${
                        highestVisitedTab >= 3
                          ? "text-blue-500"
                          : "text-gray-400"
                      } text-xs font-medium`}
                    >
                      Step 3/3
                    </span>
                    <span
                      className={`text-sm font-medium ${
                        activeTab === 3 ? "text-gray-800" : "text-gray-400"
                      }`}
                    >
                      Perks & Benefits
                    </span>
                  </div>
                </div>
              </div>

              {activeTab === 1 && (
                <div className="">
                  <div className="mb-4 border-b border-gray-300 pb-2">
                    <h2 className="text-lg font-semibold mb-1">
                      Basic Information
                    </h2>
                    <p className="text-sm text-gray-500">
                      This information will be displayed publicly
                    </p>
                  </div>
                  <div className="flex border-b border-gray-300 pb-3">
                    <div className="w-1/4">
                      <h2 className="text-lg font-semibold">Job Title</h2>
                      <p className="text-sm text-gray-500">
                        Job titles must describe one position
                      </p>
                    </div>
                    <div className="w-3/4">
                      <input
                        type="text"
                        className="w-64 p-1.5 border border-gray-300 rounded text-sm"
                        placeholder="e.g. Software Engineer"
                        value={jobTitle}
                        onChange={(e) => setJobTitle(e.target.value)}
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        At least 30 characters
                      </p>
                    </div>
                  </div>
                  <div className="flex border-b border-gray-300 mt-4 pb-3">
                    <div className="w-1/4">
                      <h2 className="text-lg font-semibold">
                        Types of Employment
                      </h2>
                      <p className="text-sm text-gray-500">
                        You can select multiple types of employment
                      </p>
                    </div>
                    <div className="w-3/4">
                      <div className="space-y-1">
                        {[
                          "Full-Time",
                          "Part-Time",
                          "Remote",
                          "Internship",
                          "Contract",
                        ].map((type) => (
                          <div key={type} className="flex items-center">
                            <input
                              type="checkbox"
                              className="h-4 w-4 text-blue-500 border-gray-300 rounded cursor-pointer"
                              checked={selectedEmploymentTypes.includes(type)}
                              onChange={() => handleEmploymentTypeChange(type)}
                            />
                            <label className="ml-2 text-sm text-gray-700 cursor-pointer">
                              {type}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="flex border-b border-gray-300 mt-4 pb-3">
                    <div className="w-1/4">
                      <h2 className="text-lg font-semibold">Salary</h2>
                      <p className="text-sm text-gray-500">
                        Please specify the estimated salary range for the role.
                      </p>
                    </div>
                    <div className="w-3/4">
                      <div className="flex items-center space-x-2 mb-2">
                        <div className="relative flex items-center">
                          <span className="absolute left-2 text-gray-500 text-sm">
                            $
                          </span>
                          <input
                            type="number"
                            value={salary[0]}
                            readOnly
                            className="w-20 pl-5 pr-1 py-0.5 border rounded-md text-sm text-gray-900"
                          />
                        </div>
                        <span className="text-sm text-gray-700">to</span>
                        <div className="relative flex items-center">
                          <span className="absolute left-2 text-gray-500 text-sm">
                            $
                          </span>
                          <input
                            type="number"
                            value={salary[1]}
                            readOnly
                            className="w-20 pl-5 pr-1 py-0.5 border rounded-md text-sm text-gray-900"
                          />
                        </div>
                      </div>

                      <Range
                        step={100}
                        min={1000}
                        max={50000}
                        values={salary}
                        onChange={handleChange}
                        renderTrack={({ props, children }) => (
                          <div
                            {...props}
                            className="h-1.5 w-full bg-blue-200 rounded-full relative"
                          >
                            <div
                              className="absolute h-1.5 bg-blue-500 rounded-full"
                              style={{
                                left: `${((salary[0] - 1000) / 49000) * 100}%`,
                                right: `${
                                  100 - ((salary[1] - 1000) / 49000) * 100
                                }%`,
                              }}
                            />
                            {children}
                          </div>
                        )}
                        renderThumb={({ props }) => (
                          <div
                            {...props}
                            className="w-4 h-4 bg-blue-500 rounded-full shadow-md border border-white"
                          />
                        )}
                      />
                    </div>
                  </div>
                  <div className="flex border-b border-gray-300 mt-4 pb-3">
                    <div className="w-1/4">
                      <h2 className="text-lg font-semibold">Categories</h2>
                      <p className="text-sm text-gray-500">
                        You can select multiple job categories
                      </p>
                    </div>
                    <div className="w-3/4">
                      <label className="text-sm">Select Job Categories</label>
                      <select
                        onChange={handleSelect}
                        className="border px-2 py-1 rounded w-64 text-sm cursor-pointer mt-1"
                        defaultValue=""
                      >
                        <option value="" disabled>
                          Select Job Categories
                        </option>
                        {jobCategories.map((category) => (
                          <option key={category} value={category}>
                            {category}
                          </option>
                        ))}
                      </select>
                      <div className="mt-2 flex flex-wrap gap-1">
                        {selectedCategories.map((category) => (
                          <div
                            key={category}
                            className="bg-blue-500 text-white px-2 py-0.5 rounded flex items-center text-xs"
                          >
                            {category}
                            <button
                              onClick={() => handleRemove(category)}
                              className="ml-1 bg-red-500 text-white rounded px-1 text-xs cursor-pointer"
                            >
                              x
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="flex border-b border-gray-300 mt-4 pb-3">
                    <div className="w-1/4">
                      <h2 className="text-lg font-semibold">Required Skills</h2>
                      <p className="text-sm text-gray-500">
                        Add required skills for the job
                      </p>
                    </div>
                    <div className="w-3/4">
                      <div className="flex gap-1">
                        <input
                          type="text"
                          value={inputValue}
                          onChange={(e) => setInputValue(e.target.value)}
                          className="border border-gray-300 rounded-md px-2 py-0.5 outline-none text-sm w-48"
                          placeholder="Type skill and press enter"
                          onKeyDown={(e) => e.key === "Enter" && addSkill()}
                        />
                        <button
                          onClick={addSkill}
                          className="border border-blue-500 text-blue-500 px-2 py-0.5 rounded-md hover:bg-blue-100 cursor-pointer text-sm"
                        >
                          + Add Skills
                        </button>
                      </div>
                      <div className="flex flex-wrap gap-1 mt-2">
                        {skills.map((skill, index) => (
                          <span
                            key={index}
                            className="border border-blue-500 text-blue-500 px-2 py-0.5 rounded-md flex items-center text-xs"
                          >
                            {skill}
                            <span
                              className="ml-1 cursor-pointer text-red-500"
                              onClick={() => removeSkill(skill)}
                            >
                              ✕
                            </span>
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 2 && (
                <div>
                  <div className="mb-4 border-b border-gray-300 pb-2">
                    <h2 className="text-lg font-semibold mb-1">Details</h2>
                    <p className="text-sm text-gray-500">
                      Add the description of the job, responsibilities, who you
                      are, and nice-to-haves.
                    </p>
                  </div>
                  <div className="flex border-b border-gray-300 pb-3">
                    <div className="w-1/4">
                      <h2 className="text-lg font-semibold">
                        Job Descriptions
                      </h2>
                      <p className="text-sm text-gray-500">
                        Job titles must describe one position
                      </p>
                    </div>
                    <div className="w-3/4">
                      <RichTextEditor
                        value={jobDescription}
                        onChange={setJobDescription}
                        placeholder="Enter Job Description"
                      />
                      <p className="text-xs text-gray-400 mt-1">
                        Maximum 500 characters
                      </p>
                    </div>
                  </div>
                  <div className="flex border-b border-gray-300 mt-4 pb-3">
                    <div className="w-1/4">
                      <h2 className="text-lg font-semibold">
                        Responsibilities
                      </h2>
                      <p className="text-sm text-gray-500">
                        Outline the core responsibilities of the position
                      </p>
                    </div>
                    <div className="w-3/4">
                      <RichTextEditor
                        value={responsibilities}
                        onChange={setResponsibilities}
                        placeholder="Enter Job Responsibilities"
                      />
                      <p className="text-xs text-gray-400 mt-1">
                        Maximum 500 characters
                      </p>
                    </div>
                  </div>
                  <div className="flex border-b border-gray-300 mt-4 pb-3">
                    <div className="w-1/4">
                      <h2 className="text-lg font-semibold">Who You Are</h2>
                      <p className="text-sm text-gray-500">
                        Add your preferred candidates qualifications
                      </p>
                    </div>
                    <div className="w-3/4">
                      <RichTextEditor
                        value={qualifications}
                        onChange={setQualifications}
                        placeholder="Enter Qualifications"
                      />
                      <p className="text-xs text-gray-400 mt-1">
                        Maximum 500 characters
                      </p>
                    </div>
                  </div>
                  <div className="flex border-b border-gray-300 mt-4 pb-3">
                    <div className="w-1/4">
                      <h2 className="text-lg font-semibold">Nice-To-Haves</h2>
                      <p className="text-sm text-gray-500">
                        Add nice-to-have skills and qualifications for the role
                      </p>
                    </div>
                    <div className="w-3/4">
                      <RichTextEditor
                        value={niceToHaves}
                        onChange={setNiceToHaves}
                        placeholder="Enter Nice-To-Have"
                      />
                      <p className="text-xs text-gray-400 mt-1">
                        Maximum 500 characters
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 3 && (
                <div>
                  <div className="mb-4 border-b border-gray-300 pb-2">
                    <h2 className="text-lg font-semibold mb-1">
                      Basic Information
                    </h2>
                    <p className="text-sm text-gray-500">
                      List out for your top perks and benefit
                    </p>
                  </div>
                  <div className="flex border-b border-gray-300 pb-3">
                    <div className="w-1/4">
                      <h2 className="text-lg font-semibold">
                        Perks and Benefits
                      </h2>
                      <p className="text-sm text-gray-500">
                        Encourage more people to apply by sharing the attractive
                        rewards and benefits
                      </p>
                    </div>
                    <div className="w-3/4">
                      <div className="mb-3">
                        {!showAddForm ? (
                          <button
                            onClick={() => setShowAddForm(true)}
                            className="flex items-center px-3 py-1 border border-blue-500 rounded text-blue-500 hover:bg-blue-50 text-sm cursor-pointer"
                          >
                            <span className="mr-1 text-lg font-light">+</span>
                            Add Benefit
                          </button>
                        ) : (
                          <div className="border border-gray-200 rounded-md p-3 mb-3">
                            <h3 className="font-semibold text-sm mb-1">
                              Add New Benefit
                            </h3>
                            <div className="mb-2">
                              <label className="block text-xs mb-1">
                                Benefit Title
                              </label>
                              <input
                                type="text"
                                value={newBenefit.title}
                                onChange={(e) =>
                                  setNewBenefit({
                                    ...newBenefit,
                                    title: e.target.value,
                                  })
                                }
                                className="w-full p-1 border border-gray-300 rounded text-sm"
                                placeholder="e.g. Full Healthcare"
                              />
                            </div>
                            <div className="mb-2">
                              <label className="block text-xs mb-1">
                                Description
                              </label>
                              <textarea
                                value={newBenefit.description}
                                onChange={(e) =>
                                  setNewBenefit({
                                    ...newBenefit,
                                    description: e.target.value,
                                  })
                                }
                                className="w-full p-1 border border-gray-300 rounded text-sm"
                                rows="2"
                                placeholder="Describe this benefit"
                              />
                            </div>
                            <div className="mb-2">
                              <label className="block text-xs mb-1">Icon</label>
                              <select
                                value={newBenefit.icon}
                                onChange={(e) =>
                                  setNewBenefit({
                                    ...newBenefit,
                                    icon: e.target.value,
                                  })
                                }
                                className="w-full p-1 border border-gray-300 rounded text-sm cursor-pointer"
                              >
                                <option value="healthcare">Healthcare</option>
                                <option value="vacation">Vacation</option>
                                <option value="development">Development</option>
                              </select>
                            </div>
                            <div className="flex justify-end">
                              <button
                                onClick={() => setShowAddForm(false)}
                                className="px-3 py-1 mr-1 text-gray-600 hover:bg-gray-100 rounded text-sm cursor-pointer"
                              >
                                Cancel
                              </button>
                              <button
                                onClick={addBenefit}
                                className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm cursor-pointer"
                              >
                                Add Benefit
                              </button>
                            </div>
                          </div>
                        )}
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        {benefits.map((benefit) => (
                          <div
                            key={benefit.id}
                            className="border border-gray-200 rounded-lg p-4 relative flex flex-col justify-between h-40"
                          >
                            <button
                              onClick={() => removeBenefit(benefit.id)}
                              className="absolute top-1 right-1 text-gray-400 hover:text-gray-600 cursor-pointer text-xs"
                            >
                              ✕
                            </button>

                            <span className="text-blue-500 text-lg">
                              {renderIcon(benefit.icon)}
                            </span>

                            <h3 className="font-semibold text-md text-gray-800">
                              {benefit.title}
                            </h3>

                            <p className="text-gray-600 text-xs">
                              {benefit.description}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div className="flex justify-between mt-6">
                <button
                  className="px-3 py-1 bg-blue-500 text-white rounded-md text-sm cursor-pointer"
                  onClick={() => setActiveTab(Math.min(3, activeTab + 1))}
                  disabled={activeTab === 3}
                >
                  Next Step
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobPosting;
