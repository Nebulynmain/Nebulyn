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

  // Update char count whenever description changes
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

  // Format handlers
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

    // Get the selected content or use existing content at cursor position
    let selectedText = range.toString();

    if (selectedText) {
      // If there's selected text, create a list with that text
      const listHTML = `<ol style="list-style-type: decimal; margin-left: 20px;"><li>${selectedText}</li></ol><br>`;
      document.execCommand("insertHTML", false, listHTML);
    } else {
      // If no selection, just insert an empty numbered list
      document.execCommand("insertOrderedList", false, null);
      // Add some styling to make sure it's visible
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

    // Get the selected content or use existing content at cursor position
    let selectedText = range.toString();

    if (selectedText) {
      // If there's selected text, create a list with that text
      const listHTML = `<ul style="list-style-type: disc; margin-left: 20px;"><li>${selectedText}</li></ul><br>`;
      document.execCommand("insertHTML", false, listHTML);
    } else {
      // If no selection, just insert an empty bullet list
      document.execCommand("insertUnorderedList", false, null);
      // Add some styling to make sure it's visible
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
        className="w-full p-3 min-h-36 outline-none text-base overflow-auto"
        style={{
          minHeight: "9rem",
          listStylePosition: "inside", // Ensure list markers appear properly
        }}
      />
      <div className="border-t border-gray-200 pt-3 px-3 flex items-center justify-between">
        <div className="flex space-x-4 relative">
          {/* Emoji Picker Button */}
          <button
            type="button"
            className={`text-gray-500 hover:text-gray-700 ${
              showEmojiPicker ? "text-blue-500" : ""
            }`}
            onClick={() => {
              setShowLinkDialog(false);
              setShowEmojiPicker(!showEmojiPicker);
            }}
          >
            😊
          </button>

          {/* Emoji Picker Modal */}
          {showEmojiPicker && (
            <div className="absolute top-10 left-0 bg-white shadow-md rounded-lg p-3 z-10 border border-gray-200 min-w-48">
              <div className="grid grid-cols-4 gap-2">
                {emojis.map((emoji, index) => (
                  <button
                    key={index}
                    type="button"
                    className="text-xl hover:bg-gray-100 w-8 h-8 flex items-center justify-center rounded"
                    onClick={() => insertEmoji(emoji)}
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Formatting Buttons */}
          <button
            type="button"
            className="text-gray-700 font-bold hover:bg-gray-100 px-2 py-1 rounded"
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
            className="text-gray-700 italic hover:bg-gray-100 px-2 py-1 rounded"
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
            className="text-gray-700 hover:bg-gray-100 px-2 py-1 rounded"
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
            className="text-gray-700 hover:bg-gray-100 px-2 py-1 rounded"
            onClick={() => {
              setShowEmojiPicker(false);
              setShowLinkDialog(false);
              applyBulletList();
            }}
          >
            •
          </button>

          {/* Link Button */}
          <button
            type="button"
            className={`text-gray-500 hover:text-gray-700 ${
              showLinkDialog ? "text-blue-500" : ""
            }`}
            onClick={() => {
              setShowEmojiPicker(false);
              setShowLinkDialog(!showLinkDialog);
            }}
          >
            🔗
          </button>

          {/* Link Dialog */}
          {showLinkDialog && (
            <div className="absolute top-10 right-0 bg-white shadow-md rounded-lg p-3 z-10 border border-gray-200 w-64">
              <input
                type="text"
                placeholder="Enter link URL"
                className="border p-2 rounded w-full mb-2"
                value={linkUrl}
                onChange={(e) => setLinkUrl(e.target.value)}
              />
              <input
                type="text"
                placeholder="Enter link text (optional)"
                className="border p-2 rounded w-full mb-2"
                value={linkText}
                onChange={(e) => setLinkText(e.target.value)}
              />
              <button
                className="bg-blue-500 text-white px-3 py-1 rounded"
                onClick={insertLink}
              >
                Insert Link
              </button>
            </div>
          )}
        </div>
        <div className="text-sm text-gray-500">
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
            width="32"
            height="32"
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
            width="32"
            height="32"
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
            width="32"
            height="32"
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
            {/*Part 1*/}
            <div className="flex justify-between items-center py-6 px-9">
              {/* Back Button and Title */}
              <div className="flex items-center space-x-2">
                <button
                  className="text-gray-700 text-4xl font-bold mb-2 cursor-pointer"
                  onClick={() => navigate("/applicants")}
                >
                  ←
                </button>
                <h1
                  className="text-3xl font-bold text-gray-900 cursor-pointer"
                  onClick={() => navigate("/applicants")}
                >
                  Post a Job
                </h1>
              </div>
            </div>

            {/*Part 2 - Updated Tab Navigation*/}
            <div className="px-9 pb-10">
              {/* Tabs Navigation - Progressive highlighting (completed tabs stay blue) */}
              <div className="flex border border-gray-200 rounded-md mb-6">
                <div
                  className={`flex items-center p-3 flex-1 border-r border-gray-200 cursor-pointer`}
                  onClick={() => setActiveTab(1)}
                >
                  <div
                    className={`${
                      highestVisitedTab >= 1 ? "bg-blue-500" : "bg-gray-300"
                    } text-white rounded-full w-12 h-12 flex items-center justify-center mr-3`}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
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
                      } text-sm font-medium`}
                    >
                      Step 1/3
                    </span>
                    <span
                      className={`font-medium ${
                        activeTab === 1 ? "text-gray-800" : "text-gray-400"
                      }`}
                    >
                      Job Information
                    </span>
                  </div>
                </div>

                <div
                  className={`flex items-center p-3 flex-1 border-r border-gray-200 cursor-pointer`}
                  onClick={() => setActiveTab(2)}
                >
                  <div
                    className={`${
                      highestVisitedTab >= 2 ? "bg-blue-500" : "bg-gray-300"
                    } text-white rounded-full w-12 h-12 flex items-center justify-center mr-3`}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
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
                      } text-sm font-medium`}
                    >
                      Step 2/3
                    </span>
                    <span
                      className={`font-medium ${
                        activeTab === 2 ? "text-gray-800" : "text-gray-400"
                      }`}
                    >
                      Job Description
                    </span>
                  </div>
                </div>

                <div
                  className={`flex items-center p-3 flex-1 cursor-pointer`}
                  onClick={() => setActiveTab(3)}
                >
                  <div
                    className={`${
                      highestVisitedTab >= 3 ? "bg-blue-500" : "bg-gray-300"
                    } text-white rounded-full w-12 h-12 flex items-center justify-center mr-3`}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
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
                      } text-sm font-medium`}
                    >
                      Step 3/3
                    </span>
                    <span
                      className={`font-medium ${
                        activeTab === 3 ? "text-gray-800" : "text-gray-400"
                      }`}
                    >
                      Perks & Benefits
                    </span>
                  </div>
                </div>
              </div>

              {/* Job Information Form - Step 1 */}
              {activeTab === 1 && (
                <div className="">
                  <div className="mb-6 border-b border-gray-300">
                    <h2 className="text-xl font-semibold mb-1">
                      Basic Information
                    </h2>
                    <p className="text-md text-gray-500 mb-4">
                      This information will be displayed publicly
                    </p>
                  </div>
                  <div className=" flex border-b border-gray-300">
                    <div className="w-1/4">
                      <h2 className="text-xl font-semibold ">Job Title</h2>
                      <p className="text-md text-gray-500 mb-4">
                        Job titles must be describe one <br /> position
                      </p>
                    </div>
                    <div className="w-3/4">
                      <input
                        type="text"
                        className="w-80 p-2 border border-gray-300 rounded"
                        placeholder="e.g. Software Engineer"
                        value={jobTitle}
                        onChange={(e) => setJobTitle(e.target.value)}
                      />
                      <p className="text-sm text-gray-500 mt-1">
                        At least 30 characters
                      </p>
                    </div>
                  </div>
                  <div className=" flex border-b border-gray-300 mt-6">
                    <div className="w-1/4">
                      <h2 className="text-xl font-semibold ">
                        Types of Employment
                      </h2>
                      <p className="text-md text-gray-500 mb-4">
                        You can select multiple type of <br /> employment
                      </p>
                    </div>
                    <div className="w-3/4 mb-5">
                      <div className="space-y-2">
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
                              className="h-5 w-5 text-blue-500 border-gray-300 rounded cursor-pointer"
                              checked={selectedEmploymentTypes.includes(type)}
                              onChange={() => handleEmploymentTypeChange(type)}
                            />
                            <label className="ml-2 text-md text-gray-700">
                              {type}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="flex border-b border-gray-300 mt-6 pb-4">
                    <div className="w-1/4">
                      <h2 className="text-xl font-semibold">Salary</h2>
                      <p className="text-md text-gray-500">
                        Please specify the estimated <br /> salary range for the
                        role.
                        <br /> You can leave this blank.
                      </p>
                    </div>
                    <div className="w-3/4">
                      <div className="flex items-center space-x-4 mb-4">
                        <div className="relative flex items-center">
                          <span className="absolute left-2 text-gray-500">
                            $
                          </span>
                          <input
                            type="number"
                            value={salary[0]}
                            readOnly
                            className="w-24 pl-5 pr-2 py-1 border rounded-md text-gray-900"
                          />
                        </div>
                        <span className="text-gray-700">to</span>
                        <div className="relative flex items-center">
                          <span className="absolute left-2 text-gray-500">
                            $
                          </span>
                          <input
                            type="number"
                            value={salary[1]}
                            readOnly
                            className="w-24 pl-5 pr-2 py-1 border rounded-md text-gray-900"
                          />
                        </div>
                      </div>

                      {/* Dual Thumb Range Slider */}
                      <Range
                        step={100}
                        min={1000}
                        max={50000}
                        values={salary}
                        onChange={handleChange}
                        renderTrack={({ props, children }) => (
                          <div
                            {...props}
                            className="h-2 w-full bg-blue-200 rounded-full relative"
                          >
                            <div
                              className="absolute h-2 bg-blue-500 rounded-full"
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
                            className="w-5 h-5 bg-blue-500 rounded-full shadow-md border-2 border-white"
                          />
                        )}
                      />
                    </div>
                  </div>
                  <div className=" flex border-b border-gray-300 mt-5">
                    <div className="w-1/4">
                      <h2 className="text-xl font-semibold">Categories</h2>
                      <p className="text-md text-gray-500 mb-4">
                        You can select multiple job categories
                      </p>
                    </div>
                    <div className="w-3/4 mb-5">
                      <label className="">Select Job Categories</label>
                      <br />
                      <select
                        onChange={handleSelect}
                        className="border px-4 py-2 rounded w-80 cursor-pointer mt-2"
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
                      <div className="mt-3 flex flex-wrap gap-2">
                        {selectedCategories.map((category) => (
                          <div
                            key={category}
                            className="bg-blue-500 text-white px-3 py-1 rounded flex items-center"
                          >
                            {category}
                            <button
                              onClick={() => handleRemove(category)}
                              className="ml-2 bg-red-500 text-white rounded px-2"
                            >
                              x
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="flex border-b border-gray-300 mt-5 pb-4">
                    <div className="w-1/4">
                      <h2 className="text-xl font-semibold">Required Skills</h2>
                      <p className="text-md text-gray-500">
                        Add required skills for the job
                      </p>
                    </div>
                    <div className="w-3/4">
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={inputValue}
                          onChange={(e) => setInputValue(e.target.value)}
                          className="border border-gray-300 rounded-md px-3 py-1 outline-none"
                          placeholder="Type skill and press enter"
                          onKeyDown={(e) => e.key === "Enter" && addSkill()}
                        />
                        <button
                          onClick={addSkill}
                          className="border border-blue-500 text-blue-500 px-3 py-1 rounded-md hover:bg-blue-100 cursor-pointer"
                        >
                          + Add Skills
                        </button>
                      </div>
                      <div className="flex flex-wrap gap-2 mt-3">
                        {skills.map((skill, index) => (
                          <span
                            key={index}
                            className="border border-blue-500 text-blue-500 px-3 py-1 rounded-md flex items-center"
                          >
                            {skill}
                            <span
                              className="ml-2 cursor-pointer text-red-500"
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

              {/* Step 2 content would go here */}
              {activeTab === 2 && (
                <div>
                  <div className="mb-6 border-b border-gray-300">
                    <h2 className="text-xl font-semibold mb-1">Details</h2>
                    <p className="text-md text-gray-500 mb-4">
                      Add the description of the job, responsibilities, who you
                      are, and nice-to-haves.
                    </p>
                  </div>
                  <div className=" flex border-b border-gray-300">
                    <div className="w-1/4">
                      <h2 className="text-xl font-semibold ">
                        Job Descriptions
                      </h2>
                      <p className="text-md text-gray-500 mb-4">
                        Job titles must be describe one <br /> position
                      </p>
                    </div>
                    <div className="w-3/4 pb-6">
                      <RichTextEditor
                        value={jobDescription}
                        onChange={setJobDescription}
                        placeholder="Enter Job Description"
                      />
                      <h2 className="text-md text-gray-400 mb-2">
                        Maximum 500 character
                      </h2>
                    </div>
                  </div>
                  <div className=" flex border-b border-gray-300 mt-6">
                    <div className="w-1/4">
                      <h2 className="text-xl font-semibold ">
                        Responsibilities
                      </h2>
                      <p className="text-md text-gray-500 mb-4">
                        Outline the core responsibilities <br /> of the position
                      </p>
                    </div>
                    <div className="w-3/4 pb-6">
                      <RichTextEditor
                        value={responsibilities}
                        onChange={setResponsibilities}
                        placeholder="Enter Job Responsibilities"
                      />
                      <h2 className="text-md text-gray-400 mb-2">
                        Maximum 500 character
                      </h2>
                    </div>
                  </div>
                  <div className="flex border-b border-gray-300 mt-6">
                    <div className="w-1/4">
                      <h2 className="text-xl font-semibold">Who You Are</h2>
                      <p className="text-md text-gray-500 mb-4">
                        Add your preferred candidates <br /> qualifications
                      </p>
                    </div>
                    <div className="w-3/4 pb-6">
                      <div className="w-90">
                        <RichTextEditor
                          value={qualifications}
                          onChange={setQualifications}
                          placeholder="Enter Qualifications"
                          className="w-40"
                        />
                      </div>
                      <h2 className="text-md text-gray-400 mb-2">
                        Maximum 500 characters
                      </h2>
                    </div>
                  </div>
                  <div className="flex border-b border-gray-300 mt-6">
                    <div className="w-1/4">
                      <h2 className="text-xl font-semibold">Nice-To-Haves</h2>
                      <p className="text-md text-gray-500 mb-4">
                        Add nice-to-have skills and
                        <br /> qualifications for the role to <br />
                        encourage a more diverse set of <br />
                        candidates to apply
                      </p>
                    </div>
                    <div className="w-3/4 pb-6">
                      <div className="w-90">
                        <RichTextEditor
                          value={niceToHaves}
                          onChange={setNiceToHaves}
                          placeholder="Enter Nice-To-Have"
                          className="w-40"
                        />
                      </div>
                      <h2 className="text-md text-gray-400 mb-2">
                        Maximum 500 characters
                      </h2>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3 content would go here */}
              {activeTab === 3 && (
                <div>
                  <div className="mb-6 border-b border-gray-300">
                    <h2 className="text-xl font-semibold mb-1">
                      Basic Information
                    </h2>
                    <p className="text-md text-gray-500 mb-4">
                      List out for your top perks and benefit
                    </p>
                  </div>
                  <div className=" flex border-b border-gray-300">
                    <div className="w-1/4">
                      <h2 className="text-xl font-semibold ">
                        Perks and Benefits
                      </h2>
                      <p className="text-md text-gray-500 mb-4">
                        Encourage more people to apply <br /> by sharing the
                        attractive <br /> rewards and benefits you offer <br />
                        your employees
                      </p>
                    </div>
                    <div className="w-3/4 mb-6">
                      <div className="mb-4">
                        {!showAddForm ? (
                          <button
                            onClick={() => setShowAddForm(true)}
                            className="flex items-center px-4 py-2 border border-blue-500 rounded text-blue-500 hover:bg-blue-50"
                          >
                            <span className="mr-2 text-xl font-light">+</span>
                            Add Benefit
                          </button>
                        ) : (
                          <div className="border border-gray-200 rounded-md p-4 mb-4">
                            <h3 className="font-semibold mb-2">
                              Add New Benefit
                            </h3>
                            <div className="mb-3">
                              <label className="block text-sm mb-1">
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
                                className="w-full p-2 border border-gray-300 rounded"
                                placeholder="e.g. Full Healthcare"
                              />
                            </div>
                            <div className="mb-3">
                              <label className="block text-sm mb-1">
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
                                className="w-full p-2 border border-gray-300 rounded"
                                rows="2"
                                placeholder="Describe this benefit"
                              />
                            </div>
                            <div className="mb-3">
                              <label className="block text-sm mb-1">Icon</label>
                              <select
                                value={newBenefit.icon}
                                onChange={(e) =>
                                  setNewBenefit({
                                    ...newBenefit,
                                    icon: e.target.value,
                                  })
                                }
                                className="w-full p-2 border border-gray-300 rounded"
                              >
                                <option value="healthcare">Healthcare</option>
                                <option value="vacation">Vacation</option>
                                <option value="development">Development</option>
                              </select>
                            </div>
                            <div className="flex justify-end">
                              <button
                                onClick={() => setShowAddForm(false)}
                                className="px-4 py-2 mr-2 text-gray-600 hover:bg-gray-100 rounded"
                              >
                                Cancel
                              </button>
                              <button
                                onClick={addBenefit}
                                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                              >
                                Add Benefit
                              </button>
                            </div>
                          </div>
                        )}
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        {benefits.map((benefit) => (
                          <div
                            key={benefit.id}
                            className="w-67 h-52 border border-gray-200 rounded-xl p-6 relative flex flex-col justify-between"
                          >
                            <button
                              onClick={() => removeBenefit(benefit.id)}
                              className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
                            >
                              ✕
                            </button>

                            <span className="text-blue-500 mr-2 text-xl">
                              {renderIcon(benefit.icon)}
                            </span>

                            <h3 className="font-bold text-xl text-gray-800">
                              {benefit.title}
                            </h3>

                            <p className="text-gray-600 text-sm">
                              {benefit.description}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation buttons */}
              <div className="flex justify-between mt-8">
                <button
                  className="px-4 py-2 bg-blue-500 text-white rounded-md ml-auto"
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
