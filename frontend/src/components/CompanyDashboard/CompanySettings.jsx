import React, { useState, useRef, useEffect } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";

const CompanySettings = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [image, setImage] = useState("https://via.placeholder.com/96");
  const [imagePreview, setImagePreview] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      const allowedTypes = [
        "image/jpeg",
        "image/png",
        "image/gif",
        "image/svg+xml",
      ];
      if (!allowedTypes.includes(file.type)) {
        alert(
          "Invalid file type! Please upload a JPG, PNG, GIF, or SVG image."
        );
        return;
      }

      const maxSize = 1 * 1024 * 1024;
      if (file.size > maxSize) {
        alert("File size too large! Please upload an image less than 1MB.");
        return;
      }

      setImagePreview(URL.createObjectURL(file));
      setFormData((prevFormData) => ({
        ...prevFormData,
        profileImage: file,
      }));
    }
  };

  const [newLocation, setNewLocation] = useState("");
  const [newTech, setNewTech] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleAddLocation = (e) => {
    if (e.key === "Enter" && newLocation.trim() !== "") {
      e.preventDefault();
      setFormData({
        ...formData,
        location: [...formData.location, newLocation.trim()],
      });
      setNewLocation("");
    }
  };

  const handleAddTech = (e) => {
    if (e.key === "Enter" && newTech.trim() !== "") {
      e.preventDefault();
      setFormData({
        ...formData,
        techStack: [...formData.techStack, newTech.trim()],
      });
      setNewTech("");
    }
  };

  const LocationTag = ({ label, onRemove }) => (
    <span className="bg-blue-100 text-blue-700 rounded-full px-2 py-1 text-xs flex items-center m-1 cursor-default">
      {label}
      <button
        onClick={onRemove}
        className="ml-1 text-gray-500 hover:text-gray-700 cursor-pointer"
      >
        <svg
          className="w-3 h-3"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M6 18L18 6M6 6l12 12"
          ></path>
        </svg>
      </button>
    </span>
  );

  const TechTag = ({ label, onRemove }) => (
    <span className="bg-blue-100 text-blue-700 rounded-full px-2 py-1 text-xs flex items-center m-1 cursor-default">
      {label}
      <button
        onClick={onRemove}
        className="ml-1 text-blue-500 hover:text-blue-700 cursor-pointer"
      >
        <svg
          className="w-3 h-3"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M6 18L18 6M6 6l12 12"
          ></path>
        </svg>
      </button>
    </span>
  );

  const textareaRef = useRef(null);

  const [formData, setFormData] = useState({
    companyName: "Nomad",
    website: "Https://www.nomad.com",
    location: ["England", "Japan", "Australia"],
    employee: "1 - 50",
    dateFoundedDay: "31",
    dateFoundedMonth: "July",
    dateFoundedYear: "2021",
    techStack: ["HTML 5", "CSS 3", "Javascript"],
    profileImage: null,
    description:
      "Nomad is part of the Information Technology Industry. We believe travellers want to experience real life and meet local people. Nomad has 30 total employees across all of its locations and generates $1.50 million in sales.",
    accountType: "business",
  });

  const [description, setDescription] = useState("");
  const editorRef = useRef(null);
  const [charCount, setCharCount] = useState(0);
  const maxChars = 500;
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showLinkDialog, setShowLinkDialog] = useState(false);
  const [linkUrl, setLinkUrl] = useState("");
  const [linkText, setLinkText] = useState("");

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
      editorRef.current.focus();
    }
  };

  const handleSaveProfile = () => {
    console.log("Profile Data Saved:", formData);
    alert("Profile saved successfully!");
  };

  const emojis = ["😀", "😊", "👍", "🎉", "❤️", "🔥", "✅", "🚀", "💡", "📊"];

  const [socialLinks, setSocialLinks] = useState({
    instagram: "https://www.instagram.com/nomad/",
    twitter: "https://twitter.com/nomad/",
    facebook: "https://web.facebook.com/nomad/",
    linkedin: "",
    youtube: "",
  });

  const handleUpdate = (e) => {
    const { name, value } = e.target;
    setSocialLinks({
      ...socialLinks,
      [name]: value,
    });
  };

  const handleSaveChanges = () => {
    console.log("Saving social links:", socialLinks);
  };

  const [teamMembers, setTeamMembers] = useState([
    {
      id: 1,
      name: "Célestin Gardinier",
      role: "CEO & Co-Founder",
      image: "/api/placeholder/90/90",
      socials: {
        instagram: "https://www.instagram.com/celestin/",
        linkedin: "https://linkedin.com/in/celestin/",
      },
    },
    {
      id: 2,
      name: "Reynaud Colbert",
      role: "Co-Founder",
      image: "/api/placeholder/90/90",
      socials: {
        instagram: "https://www.instagram.com/reynaud/",
        linkedin: "https://linkedin.com/in/reynaud/",
      },
    },
    {
      id: 3,
      name: "Arienne Lyon",
      role: "Managing Director",
      image: "/api/placeholder/90/90",
      socials: {
        instagram: "https://www.instagram.com/arienne/",
        linkedin: "https://linkedin.com/in/arienne/",
      },
    },
    {
      id: 4,
      name: "Bernard Alexander",
      role: "Managing Director",
      image: "/api/placeholder/90/90",
      socials: {
        instagram: "https://www.instagram.com/bernard/",
        linkedin: "https://linkedin.com/in/bernard/",
      },
    },
    {
      id: 5,
      name: "Christine Jhonson",
      role: "Managing Director",
      image: "/api/placeholder/90/90",
      socials: {
        instagram: "https://www.instagram.com/christine/",
        linkedin: "https://linkedin.com/in/christine/",
      },
    },
    {
      id: 6,
      name: "Aaron Morgan",
      role: "Managing Director",
      image: "/api/placeholder/90/90",
      socials: {
        instagram: "https://www.instagram.com/aaron/",
        linkedin: "https://linkedin.com/in/aaron/",
      },
    },
  ]);

  const [newMember, setNewMember] = useState({
    name: "",
    role: "",
    socials: {
      instagram: "",
      linkedin: "",
    },
  });

  const [selectedMember, setSelectedMember] = useState(null);
  const [viewMode, setViewMode] = useState("grid");
  const [showAddModal, setShowAddModal] = useState(false);

  const handleNewMemberChange = (e) => {
    const { name, value } = e.target;
    if (name === "instagram" || name === "linkedin") {
      setNewMember({
        ...newMember,
        socials: {
          ...newMember.socials,
          [name]: value,
        },
      });
    } else {
      setNewMember({
        ...newMember,
        [name]: value,
      });
    }
  };

  const handleAddMember = () => {
    if (!newMember.name || !newMember.role) {
      alert("Please fill in name and role fields");
      return;
    }

    const newId = Math.max(...teamMembers.map((m) => m.id), 0) + 1;

    setTeamMembers([
      ...teamMembers,
      {
        ...newMember,
        id: newId,
        image: "/api/placeholder/90/90",
      },
    ]);

    setNewMember({
      name: "",
      role: "",
      socials: {
        instagram: "",
        linkedin: "",
      },
    });

    setShowAddModal(false);
  };

  const handleRemoveMember = (id) => {
    if (confirm("Are you sure you want to remove this member?")) {
      setTeamMembers(teamMembers.filter((member) => member.id !== id));
    }
  };

  const handleSelectMember = (member) => {
    setSelectedMember(member);
    setNewMember({
      name: member.name,
      role: member.role,
      socials: { ...member.socials },
    });
    setShowAddModal(true);
  };

  const handleUpdateMember = () => {
    if (!selectedMember) return;

    setTeamMembers(
      teamMembers.map((member) =>
        member.id === selectedMember.id
          ? {
              ...member,
              name: newMember.name,
              role: newMember.role,
              socials: newMember.socials,
            }
          : member
      )
    );

    setSelectedMember(null);
    setNewMember({
      name: "",
      role: "",
      socials: {
        instagram: "",
        linkedin: "",
      },
    });

    setShowAddModal(false);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex flex-row flex-grow">
        <div className="h-screen sticky top-0">
          <Sidebar />
        </div>
        <div className="flex-grow transition-all">
          <Header />
          <div className="p-4">
            <div className="border-b border-gray-300 flex space-x-6 text-base w-full">
              <button
                className={`pb-2 border-b-2 px-4 cursor-pointer ${
                  activeTab === "overview"
                    ? "border-blue-500 font-semibold text-blue-600"
                    : "border-transparent text-gray-500"
                }`}
                onClick={() => setActiveTab("overview")}
              >
                Overview
              </button>
              <button
                className={`pb-2 border-b-2 px-4 cursor-pointer ${
                  activeTab === "sociallinks"
                    ? "border-blue-500 font-semibold text-blue-600"
                    : "border-transparent text-gray-500"
                }`}
                onClick={() => setActiveTab("sociallinks")}
              >
                Social Links
              </button>
              <button
                className={`pb-2 border-b-2 px-4 cursor-pointer ${
                  activeTab === "team"
                    ? "border-blue-500 font-semibold text-blue-600"
                    : "border-transparent text-gray-500"
                }`}
                onClick={() => setActiveTab("team")}
              >
                Team
              </button>
            </div>
            <div className="p-2">
              {activeTab === "overview" && (
                <div>
                  <div className="border-b border-gray-300 pb-4">
                    <h2 className="text-xl font-bold">Basic Information</h2>
                    <p className="text-gray-500 text-sm mt-1">
                      This is your company information that you can update
                      anytime.
                    </p>
                  </div>
                  <div className="flex space-x-6 border-b border-gray-300 py-4">
                    <div className="flex flex-col items-start w-1/3">
                      <h2 className="text-lg font-bold">Profile Photo</h2>
                      <p className="text-gray-500 text-xs mt-1">
                        This image will be shown publicly as your company logo
                      </p>
                    </div>
                    <div className="flex space-x-4 items-center w-3/5">
                      <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-gray-300">
                        {imagePreview ? (
                          <img
                            src={imagePreview}
                            alt="Profile"
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-500 text-xs">
                            No Image
                          </div>
                        )}
                      </div>
                      <label className="w-48 h-20 border-2 border-dashed border-blue-400 flex flex-col justify-center text-center p-2 rounded-lg cursor-pointer text-xs bg-[#F8F8FD] mb-3">
                        <span className="text-blue-500 font-semibold">
                          Click to replace
                        </span>
                        <p className="text-gray-400 mt-1">or drag and drop</p>
                        <p className="text-gray-400 text-xs">
                          SVG, PNG, JPG or GIF (max. 400 x 400px)
                        </p>
                        <input
                          type="file"
                          className="hidden"
                          accept="image/*"
                          onChange={handleImageChange}
                        />
                      </label>
                    </div>
                  </div>

                  <div className="flex items-start space-x-6 border-b border-gray-300 py-4">
                    <div className="w-1/3">
                      <h2 className="text-lg font-bold">Company Details</h2>
                      <p className="text-gray-500 text-xs mt-1">
                        Introduce your company core info quickly to users
                      </p>
                    </div>
                    <div className="w-2/3 space-y-3">
                      <div>
                        <label className="block text-gray-700 text-sm mb-1 cursor-pointer">
                          Company Name
                        </label>
                        <input
                          type="text"
                          name="companyName"
                          value={formData.companyName}
                          onChange={handleChange}
                          className="w-full p-2 text-sm border border-gray-300 rounded cursor-pointer"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-700 text-sm mb-1 cursor-pointer">
                          Website
                        </label>
                        <input
                          type="text"
                          name="website"
                          value={formData.website}
                          onChange={handleChange}
                          className="w-full p-2 text-sm border border-gray-300 rounded cursor-pointer"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-700 text-sm mb-1 cursor-pointer">
                          Location
                        </label>
                        <div className="relative">
                          <div className="p-2 border border-gray-300 rounded flex flex-wrap items-center min-h-10 text-sm">
                            {formData.location.map((loc, index) => (
                              <LocationTag
                                key={index}
                                label={loc}
                                onRemove={() => {
                                  const newLocs = [...formData.location];
                                  newLocs.splice(index, 1);
                                  setFormData({
                                    ...formData,
                                    location: newLocs,
                                  });
                                }}
                              />
                            ))}
                            <input
                              type="text"
                              className="flex-1 outline-none min-w-16 text-sm"
                              placeholder="Add location..."
                              value={newLocation}
                              onChange={(e) => setNewLocation(e.target.value)}
                              onKeyDown={handleAddLocation}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-3">
                        <div className="w-1/2">
                          <label className="block text-gray-700 text-sm mb-1 cursor-pointer">
                            Employee
                          </label>
                          <div className="relative">
                            <select
                              name="employee"
                              value={formData.employee}
                              onChange={handleChange}
                              className="w-full p-2 text-sm border border-gray-300 rounded appearance-none cursor-pointer"
                            >
                              <option value="1 - 50">1 - 50</option>
                              <option value="51 - 200">51 - 200</option>
                              <option value="201 - 500">201 - 500</option>
                              <option value="500+">500+</option>
                            </select>
                          </div>
                        </div>
                        <div className="w-1/2">
                          <label className="block text-gray-700 text-sm mb-1 cursor-pointer">
                            Industry
                          </label>
                          <div className="relative">
                            <select
                              name="industry"
                              value={formData.industry}
                              onChange={handleChange}
                              className="w-full p-2 text-sm border border-gray-300 rounded appearance-none cursor-pointer"
                            >
                              <option value="Technology">Technology</option>
                              <option value="Finance">Finance</option>
                              <option value="Healthcare">Healthcare</option>
                              <option value="Education">Education</option>
                            </select>
                          </div>
                        </div>
                      </div>
                      <div>
                        <label className="block text-gray-700 text-sm mb-1 cursor-pointer">
                          Date Founded
                        </label>
                        <div className="flex gap-2">
                          <div className="w-1/3 relative">
                            <select
                              name="dateFoundedDay"
                              value={formData.dateFoundedDay}
                              onChange={handleChange}
                              className="w-full p-2 text-sm border border-gray-300 rounded appearance-none cursor-pointer"
                            >
                              {Array.from({ length: 31 }, (_, i) => i + 1).map(
                                (day) => (
                                  <option key={day} value={day}>
                                    {day}
                                  </option>
                                )
                              )}
                            </select>
                          </div>
                          <div className="w-1/3 relative">
                            <select
                              name="dateFoundedMonth"
                              value={formData.dateFoundedMonth}
                              onChange={handleChange}
                              className="w-full p-2 text-sm border border-gray-300 rounded appearance-none cursor-pointer"
                            >
                              {[
                                "January",
                                "February",
                                "March",
                                "April",
                                "May",
                                "June",
                                "July",
                                "August",
                                "September",
                                "October",
                                "November",
                                "December",
                              ].map((month) => (
                                <option key={month} value={month}>
                                  {month}
                                </option>
                              ))}
                            </select>
                          </div>
                          <div className="w-1/3 relative">
                            <select
                              name="dateFoundedYear"
                              value={formData.dateFoundedYear}
                              onChange={handleChange}
                              className="w-full p-2 text-sm border border-gray-300 rounded appearance-none cursor-pointer"
                            >
                              {Array.from(
                                { length: 50 },
                                (_, i) => 2025 - i
                              ).map((year) => (
                                <option key={year} value={year}>
                                  {year}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                      </div>
                      <div className="pb-2">
                        <label className="block text-gray-700 text-sm mb-1 cursor-pointer">
                          Tech Stack
                        </label>
                        <div className="relative">
                          <div className="p-2 border border-gray-300 rounded flex flex-wrap items-center min-h-10 text-sm">
                            {formData.techStack.map((tech, index) => (
                              <TechTag
                                key={index}
                                label={tech}
                                onRemove={() => {
                                  const newTechs = [...formData.techStack];
                                  newTechs.splice(index, 1);
                                  setFormData({
                                    ...formData,
                                    techStack: newTechs,
                                  });
                                }}
                              />
                            ))}
                            <input
                              type="text"
                              className="flex-1 outline-none min-w-16 text-sm"
                              placeholder="Add technology..."
                              value={newTech}
                              onChange={(e) => setNewTech(e.target.value)}
                              onKeyDown={handleAddTech}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex space-x-6 items-start border-b border-gray-300 py-4">
                    <div className="flex flex-col items-start w-1/3">
                      <h2 className="text-lg font-bold text-gray-800">
                        About Company
                      </h2>
                      <p className="text-gray-500 text-xs mt-1">
                        Brief description for your company. URLs are
                        hyperlinked.
                      </p>
                    </div>
                    <div className="flex flex-col w-2/3">
                      <h2 className="text-sm font-bold text-gray-800 mb-1">
                        Description
                      </h2>
                      <div className="border border-gray-300 rounded p-1 bg-white">
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
                              className={`text-gray-500 hover:text-gray-700 cursor-pointer text-sm ${
                                showEmojiPicker ? "text-blue-500" : ""
                              }`}
                              onClick={() => {
                                setShowLinkDialog(false);
                                setShowEmojiPicker(!showEmojiPicker);
                              }}
                            >
                              😊
                            </button>

                            {showEmojiPicker && (
                              <div className="absolute top-6 left-0 bg-white shadow-md rounded p-2 z-10 border border-gray-200 min-w-40">
                                <div className="grid grid-cols-4 gap-1">
                                  {emojis.map((emoji, index) => (
                                    <button
                                      key={index}
                                      type="button"
                                      className="text-lg hover:bg-gray-100 w-6 h-6 flex items-center justify-center rounded cursor-pointer"
                                      onClick={() => {
                                        insertEmoji(emoji);
                                        setShowEmojiPicker(false);
                                      }}
                                    >
                                      {emoji}
                                    </button>
                                  ))}
                                </div>
                              </div>
                            )}

                            <button
                              type="button"
                              className="text-gray-700 font-bold cursor-pointer text-sm"
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
                              className="text-gray-700 italic cursor-pointer text-sm"
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
                              className="text-gray-700 cursor-pointer text-sm"
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
                              className="text-gray-700 cursor-pointer text-sm"
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
                              className={`text-gray-500 hover:text-gray-700 cursor-pointer text-sm ${
                                showLinkDialog ? "text-blue-500" : ""
                              }`}
                              onClick={() => {
                                setShowEmojiPicker(false);
                                setShowLinkDialog(!showLinkDialog);
                              }}
                            >
                              🔗
                            </button>

                            {showLinkDialog && (
                              <div className="absolute top-6 right-0 bg-white shadow-md rounded p-2 z-10 border border-gray-200 w-56">
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
                                  className="bg-blue-500 text-white px-2 py-1 rounded cursor-pointer text-sm"
                                  onClick={() => {
                                    insertLink();
                                    setShowLinkDialog(false);
                                  }}
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
                      <p className="text-xs text-gray-400">
                        Maximum 500 character
                      </p>
                    </div>
                  </div>

                  <div className="flex justify-end pt-4">
                    <button
                      onClick={handleSaveProfile}
                      className="bg-[#3B8BEB] text-white font-semibold px-4 py-2 rounded shadow hover:bg-blue-600 transition cursor-pointer text-sm"
                    >
                      Save Changes
                    </button>
                  </div>
                </div>
              )}
              {activeTab === "sociallinks" && (
                <div>
                  <div className="flex items-start space-x-6 border-b border-gray-300 py-4">
                    <div className="w-1/3">
                      <h2 className="text-lg font-bold">Social Links</h2>
                      <p className="text-gray-500 text-xs mt-1">
                        Add links to your company profile.
                      </p>
                    </div>
                    <div className="w-2/3 space-y-3">
                      <div>
                        <label className="block text-gray-700 text-sm mb-1 cursor-pointer">
                          Instagram
                        </label>
                        <input
                          type="text"
                          name="instagram"
                          value={socialLinks.instagram}
                          onChange={handleUpdate}
                          className="w-full p-2 text-sm border border-gray-300 rounded cursor-pointer"
                        />
                      </div>

                      <div>
                        <label className="block text-gray-700 text-sm mb-1 cursor-pointer">
                          Twitter
                        </label>
                        <input
                          type="text"
                          name="twitter"
                          value={socialLinks.twitter}
                          onChange={handleUpdate}
                          className="w-full p-2 text-sm border border-gray-300 rounded cursor-pointer"
                        />
                      </div>

                      <div>
                        <label className="block text-gray-700 text-sm mb-1 cursor-pointer">
                          Facebook
                        </label>
                        <input
                          type="text"
                          name="facebook"
                          value={socialLinks.facebook}
                          onChange={handleUpdate}
                          className="w-full p-2 text-sm border border-gray-300 rounded cursor-pointer"
                        />
                      </div>

                      <div>
                        <label className="block text-gray-700 text-sm mb-1 cursor-pointer">
                          LinkedIn
                        </label>
                        <input
                          type="text"
                          name="linkedin"
                          value={socialLinks.linkedin}
                          onChange={handleUpdate}
                          placeholder="Enter your LinkedIn address"
                          className="w-full p-2 text-sm border border-gray-300 rounded cursor-pointer"
                        />
                      </div>

                      <div>
                        <label className="block text-gray-700 text-sm mb-1 cursor-pointer">
                          Youtube
                        </label>
                        <input
                          type="text"
                          name="youtube"
                          value={socialLinks.youtube}
                          onChange={handleUpdate}
                          placeholder="Enter your youtube address"
                          className="w-full p-2 text-sm border border-gray-300 rounded cursor-pointer"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end pt-4">
                    <button
                      onClick={handleSaveChanges}
                      className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-1 px-4 rounded cursor-pointer text-sm"
                    >
                      Save Changes
                    </button>
                  </div>
                </div>
              )}
              {activeTab === "team" && (
                <div>
                  <div className="flex items-start space-x-6 py-4">
                    <div className="w-1/3">
                      <h2 className="text-lg font-bold">Team Members</h2>
                      <p className="text-gray-500 text-xs mt-1">
                        Add team members of your company
                      </p>
                    </div>
                    <div className="w-2/3 space-y-3">
                      <div className="flex justify-between items-center mb-3">
                        <h1 className="text-sm font-semibold">
                          {teamMembers.length} Members
                        </h1>
                        <div className="flex space-x-2">
                          <button
                            onClick={() => setShowAddModal(true)}
                            className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded flex items-center cursor-pointer text-sm"
                          >
                            <span className="mr-1">+</span>
                            Add Members
                          </button>
                          <div className="flex">
                            <button
                              onClick={() => setViewMode("grid")}
                              className={`p-1 rounded-l border cursor-pointer ${
                                viewMode === "grid"
                                  ? "bg-blue-100 border-blue-200"
                                  : "bg-gray-100 border-gray-200"
                              }`}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              >
                                <rect x="3" y="3" width="7" height="7" />
                                <rect x="14" y="3" width="7" height="7" />
                                <rect x="14" y="14" width="7" height="7" />
                                <rect x="3" y="14" width="7" height="7" />
                              </svg>
                            </button>
                            <button
                              onClick={() => setViewMode("list")}
                              className={`p-1 rounded-r border cursor-pointer ${
                                viewMode === "list"
                                  ? "bg-blue-100 border-blue-200"
                                  : "bg-gray-100 border-gray-200"
                              }`}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              >
                                <line x1="8" y1="6" x2="21" y2="6" />
                                <line x1="8" y1="12" x2="21" y2="12" />
                                <line x1="8" y1="18" x2="21" y2="18" />
                                <line x1="3" y1="6" x2="3.01" y2="6" />
                                <line x1="3" y1="12" x2="3.01" y2="12" />
                                <line x1="3" y1="18" x2="3.01" y2="18" />
                              </svg>
                            </button>
                          </div>
                        </div>
                      </div>

                      {viewMode === "grid" ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                          {teamMembers.map((member) => (
                            <div
                              key={member.id}
                              className="border border-gray-200 rounded p-3 flex flex-col items-center relative group hover:shadow cursor-pointer"
                            >
                              <div className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button
                                  onClick={() => handleSelectMember(member)}
                                  className="p-1 text-gray-500 hover:text-blue-500 mr-1 cursor-pointer"
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="14"
                                    height="14"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  >
                                    <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path>
                                  </svg>
                                </button>
                                <button
                                  onClick={() => handleRemoveMember(member.id)}
                                  className="p-1 text-gray-500 hover:text-red-500 cursor-pointer"
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="14"
                                    height="14"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  >
                                    <polyline points="3 6 5 6 21 6"></polyline>
                                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                                  </svg>
                                </button>
                              </div>
                              <img
                                src={member.image}
                                alt={member.name}
                                className="w-16 h-16 rounded-full object-cover mb-2"
                              />
                              <h3 className="font-semibold text-sm text-center">
                                {member.name}
                              </h3>
                              <p className="text-gray-500 text-xs mb-2 text-center">
                                {member.role}
                              </p>
                              <div className="flex space-x-2">
                                {member.socials.instagram && (
                                  <a
                                    href={member.socials.instagram}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-gray-400 hover:text-gray-600 cursor-pointer"
                                  >
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      width="16"
                                      height="16"
                                      viewBox="0 0 24 24"
                                      fill="none"
                                      stroke="currentColor"
                                      strokeWidth="2"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    >
                                      <rect
                                        x="2"
                                        y="2"
                                        width="20"
                                        height="20"
                                        rx="5"
                                        ry="5"
                                      ></rect>
                                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                                      <line
                                        x1="17.5"
                                        y1="6.5"
                                        x2="17.51"
                                        y2="6.5"
                                      ></line>
                                    </svg>
                                  </a>
                                )}
                                {member.socials.linkedin && (
                                  <a
                                    href={member.socials.linkedin}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-gray-400 hover:text-gray-600 cursor-pointer"
                                  >
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      width="16"
                                      height="16"
                                      viewBox="0 0 24 24"
                                      fill="none"
                                      stroke="currentColor"
                                      strokeWidth="2"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    >
                                      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                                      <rect
                                        x="2"
                                        y="9"
                                        width="4"
                                        height="12"
                                      ></rect>
                                      <circle cx="4" cy="4" r="2"></circle>
                                    </svg>
                                  </a>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="border border-gray-200 rounded">
                          {teamMembers.map((member, index) => (
                            <div
                              key={member.id}
                              className={`p-3 flex items-center justify-between ${
                                index !== teamMembers.length - 1
                                  ? "border-b border-gray-200"
                                  : ""
                              } hover:bg-gray-50 cursor-pointer`}
                            >
                              <div className="flex items-center">
                                <img
                                  src={member.image}
                                  alt={member.name}
                                  className="w-10 h-10 rounded-full object-cover mr-3"
                                />
                                <div>
                                  <h3 className="font-semibold text-sm">
                                    {member.name}
                                  </h3>
                                  <p className="text-gray-500 text-xs">
                                    {member.role}
                                  </p>
                                </div>
                              </div>
                              <div className="flex items-center">
                                <div className="flex space-x-2 mr-3">
                                  {member.socials.instagram && (
                                    <a
                                      href={member.socials.instagram}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="text-gray-400 hover:text-gray-600 cursor-pointer"
                                    >
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="14"
                                        height="14"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                      >
                                        <rect
                                          x="2"
                                          y="2"
                                          width="20"
                                          height="20"
                                          rx="5"
                                          ry="5"
                                        ></rect>
                                        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                                        <line
                                          x1="17.5"
                                          y1="6.5"
                                          x2="17.51"
                                          y2="6.5"
                                        ></line>
                                      </svg>
                                    </a>
                                  )}
                                  {member.socials.linkedin && (
                                    <a
                                      href={member.socials.linkedin}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="text-gray-400 hover:text-gray-600 cursor-pointer"
                                    >
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="14"
                                        height="14"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                      >
                                        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                                        <rect
                                          x="2"
                                          y="9"
                                          width="4"
                                          height="12"
                                        ></rect>
                                        <circle cx="4" cy="4" r="2"></circle>
                                      </svg>
                                    </a>
                                  )}
                                </div>
                                <div className="flex">
                                  <button
                                    onClick={() => handleSelectMember(member)}
                                    className="p-1 text-gray-500 hover:text-blue-500 mr-1 cursor-pointer"
                                  >
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      width="14"
                                      height="14"
                                      viewBox="0 0 24 24"
                                      fill="none"
                                      stroke="currentColor"
                                      strokeWidth="2"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    >
                                      <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path>
                                    </svg>
                                  </button>
                                  <button
                                    onClick={() =>
                                      handleRemoveMember(member.id)
                                    }
                                    className="p-1 text-gray-500 hover:text-red-500 cursor-pointer"
                                  >
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      width="14"
                                      height="14"
                                      viewBox="0 0 24 24"
                                      fill="none"
                                      stroke="currentColor"
                                      strokeWidth="2"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    >
                                      <polyline points="3 6 5 6 21 6"></polyline>
                                      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                                    </svg>
                                  </button>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                      {showAddModal && (
                        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                          <div className="bg-white rounded p-4 w-full max-w-sm">
                            <div className="flex justify-between items-center mb-3">
                              <h3 className="text-sm font-semibold">
                                {selectedMember
                                  ? "Edit Member"
                                  : "Add New Member"}
                              </h3>
                              <button
                                onClick={() => {
                                  setShowAddModal(false);
                                  setSelectedMember(null);
                                  setNewMember({
                                    name: "",
                                    role: "",
                                    socials: {
                                      instagram: "",
                                      linkedin: "",
                                    },
                                  });
                                }}
                                className="text-gray-500 hover:text-gray-700 cursor-pointer"
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="16"
                                  height="16"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                >
                                  <line x1="18" y1="6" x2="6" y2="18"></line>
                                  <line x1="6" y1="6" x2="18" y2="18"></line>
                                </svg>
                              </button>
                            </div>
                            <div className="space-y-3">
                              <div>
                                <label className="block text-gray-700 text-xs mb-1 cursor-pointer">
                                  Name
                                </label>
                                <input
                                  type="text"
                                  name="name"
                                  value={newMember.name}
                                  onChange={handleNewMemberChange}
                                  className="w-full p-2 text-sm border border-gray-300 rounded cursor-pointer"
                                  placeholder="Enter member name"
                                />
                              </div>
                              <div>
                                <label className="block text-gray-700 text-xs mb-1 cursor-pointer">
                                  Role
                                </label>
                                <input
                                  type="text"
                                  name="role"
                                  value={newMember.role}
                                  onChange={handleNewMemberChange}
                                  className="w-full p-2 text-sm border border-gray-300 rounded cursor-pointer"
                                  placeholder="Enter member role"
                                />
                              </div>
                              <div>
                                <label className="block text-gray-700 text-xs mb-1 cursor-pointer">
                                  Instagram
                                </label>
                                <input
                                  type="text"
                                  name="instagram"
                                  value={newMember.socials.instagram}
                                  onChange={handleNewMemberChange}
                                  className="w-full p-2 text-sm border border-gray-300 rounded cursor-pointer"
                                  placeholder="https://instagram.com/username"
                                />
                              </div>
                              <div>
                                <label className="block text-gray-700 text-xs mb-1 cursor-pointer">
                                  LinkedIn
                                </label>
                                <input
                                  type="text"
                                  name="linkedin"
                                  value={newMember.socials.linkedin}
                                  onChange={handleNewMemberChange}
                                  className="w-full p-2 text-sm border border-gray-300 rounded cursor-pointer"
                                  placeholder="https://linkedin.com/in/username"
                                />
                              </div>
                              <div className="flex justify-end pt-3">
                                <button
                                  onClick={() => {
                                    setShowAddModal(false);
                                    setSelectedMember(null);
                                  }}
                                  className="px-3 py-1 border border-gray-300 rounded mr-2 hover:bg-gray-100 cursor-pointer text-sm"
                                >
                                  Cancel
                                </button>
                                <button
                                  onClick={
                                    selectedMember
                                      ? handleUpdateMember
                                      : handleAddMember
                                  }
                                  className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 cursor-pointer text-sm"
                                >
                                  {selectedMember ? "Update" : "Add"}
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex justify-end pt-4">
                    <button
                      onClick={handleSaveChanges}
                      className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-1 px-4 rounded cursor-pointer text-sm"
                    >
                      Save Changes
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanySettings;
