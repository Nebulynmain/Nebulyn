import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { CheckCircle } from "lucide-react";
import { Info } from "lucide-react";

const Checkbox = ({ checked, onChange }) => (
  <input
    type="checkbox"
    className="w-6 h-6 rounded-sm border-gray-300 checked:bg-[#3B8BEB] checked:border-transparent mt-3"
    checked={checked}
    onChange={onChange}
  />
);

const Settings = () => {
  const [activeTab, setActiveTab] = useState("profile");

  const [image, setImage] = useState("https://via.placeholder.com/96");

  const [imagePreview, setImagePreview] = useState(null); // For displaying image preview

  const handleImageChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      // Validate file type (Only allow images)
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

      // Validate file size (Max 1MB)
      const maxSize = 1 * 1024 * 1024; // 1MB
      if (file.size > maxSize) {
        alert("File size too large! Please upload an image less than 1MB.");
        return;
      }

      // Set preview for UI
      setImagePreview(URL.createObjectURL(file));

      // Store file in formData for submission
      setFormData((prevFormData) => ({
        ...prevFormData,
        profileImage: file,
      }));
    }
  };

  const [formData, setFormData] = useState({
    fullName: "",
    phoneNumber: "",
    email: "",
    dob: "",
    gender: "",
    accountType: "",
    profileImage: null,
  });

  // Function to handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Function to save profile
  const handleSaveProfile = () => {
    console.log("Profile Data Saved:", formData);
    alert("Profile saved successfully!");
  };

  const [email, setEmail] = useState("");

  const handleUpdateEmail = () => {
    // Validate email
    if (!email || !email.includes("@")) {
      alert("Please enter a valid email address.");
      return;
    }

    // Call API or update state
    console.log("Updating email:", email);

    // You can add API call logic here
  };

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handleChangePassword = () => {
    if (oldPassword.length < 8 || newPassword.length < 8) {
      alert("Password must be at least 8 characters long.");
      return;
    }

    if (oldPassword === newPassword) {
      alert("New password must be different from the old password.");
      return;
    }

    // Call API or perform password change logic here
    console.log("Password successfully changed!");

    // Reset input fields after change
    setOldPassword("");
    setNewPassword("");
  };

  const [selected, setSelected] = useState(["Applications"]);

  const toggleSelection = (option) => {
    setSelected((prev) =>
      prev.includes(option)
        ? prev.filter((item) => item !== option)
        : [...prev, option]
    );
  };

  const options = [
    {
      id: "Applications",
      label: "Applications",
      description:
        "These are notifications for jobs that you <br/> have applied to",
    },
    {
      id: "Jobs",
      label: "Jobs",
      description:
        "These are notifications for job openings <br/> that suit your profile",
    },
    {
      id: "Recommendations",
      label: "Recommendations",
      description:
        "These are notifications for personalized <br/> recommendations from our recruiters",
    },
  ];

  const [isEditingEmail, setEditingEmail] = useState(false); // Toggle input field
  const [emailInput, setEmailInput] = useState(""); // Store email input

  const handleEditEmail = () => {
    setEditingEmail(true); // Enable edit mode
  };

  const handleSaveEmail = () => {
    console.log("Updated Email:", emailInput); // Log email (or call API)
    setEditingEmail(false); // Disable edit mode
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex flex-row flex-grow">
        <div className="h-screen sticky top-0">
          <Sidebar />
        </div>
        <div className="flex-grow transition-all">
          <Header />
          <div className="p-6">
            <div className="border-b border-gray-300 flex space-x-8 text-lg w-full">
              <button
                className={`pb-3 border-b-4 px-6 ${
                  activeTab === "profile"
                    ? "border-blue-500 font-semibold text-blue-600"
                    : "border-transparent text-gray-500"
                }`}
                onClick={() => setActiveTab("profile")}
              >
                My Profile
              </button>
              <button
                className={`pb-3 border-b-4 px-6 ${
                  activeTab === "login"
                    ? "border-blue-500 font-semibold text-blue-600"
                    : "border-transparent text-gray-500"
                }`}
                onClick={() => setActiveTab("login")}
              >
                Login Details
              </button>
              <button
                className={`pb-3 border-b-4 px-6 ${
                  activeTab === "notifications"
                    ? "border-blue-500 font-semibold text-blue-600"
                    : "border-transparent text-gray-500"
                }`}
                onClick={() => setActiveTab("notifications")}
              >
                Notifications
              </button>
            </div>
            <div className=" p-4">
              {activeTab === "profile" && (
                <div>
                  <div className="border-b border-gray-300">
                    <h2 className="text-2xl font-bold">Basic Information</h2>
                    <p className="text-gray-500 text-xl mt-2 mb-5">
                      This is your personal information that you can update
                      anytime.
                    </p>
                  </div>
                  {/* Profile Photo Section */}
                  <div className="flex space-x-10 border-b border-gray-300 mt-5">
                    <div className="flex flex-col items-start text-3xl w-2/4">
                      <h2 className="text-2xl font-bold">Profile Photo</h2>
                      <p className="text-gray-500 text-xl mt-2">
                        This image will be shown publicly <br /> as your profile
                        picture, it will <br />
                        help recruiters recognize you!
                      </p>
                    </div>
                    <div className="flex space-x-10 items-center w-2/4 -ml-50">
                      <div className="w-45 h-28 rounded-full overflow-hidden border-4 border-gray-300">
                        {imagePreview ? (
                          <img
                            src={imagePreview}
                            alt="Profile"
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-500">
                            No Image
                          </div>
                        )}
                      </div>
                      <label className="w-140 h-40 border-4 border-dashed border-blue-400 flex flex-col justify-center text-center p-12 rounded-lg cursor-pointer text-xl bg-[#F8F8FD] mb-5 ml-20">
                        <span className="text-blue-500 font-semibold">
                          Click to replace
                        </span>
                        <p className="text-gray-400 mt-2">or drag and drop</p>
                        <p className="text-gray-400">
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

                  {/* Personal Details Section */}
                  <div className="flex items-start space-x-10 border-b border-gray-300 mt-5">
                    <div className="w-2/4">
                      <h2 className="text-2xl font-bold">Personal Details</h2>
                    </div>
                    <div className="w-2/4 grid grid-cols-2 gap-6 mb-5 -ml-50">
                      <div className="flex flex-col col-span-2">
                        <label className="text-lg font-semibold">
                          Full Name <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="fullName"
                          value={formData.fullName}
                          onChange={handleChange}
                          className="mt-1 p-3 border border-gray-300 rounded-lg w-full"
                        />
                      </div>
                      <div className="flex flex-col">
                        <label className="text-lg font-semibold">
                          Phone Number <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="phoneNumber"
                          value={formData.phoneNumber}
                          onChange={handleChange}
                          className="mt-1 p-3 border border-gray-300 rounded-lg w-full"
                        />
                      </div>
                      <div className="flex flex-col">
                        <label className="text-lg font-semibold">
                          Email <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          className="mt-1 p-3 border border-gray-300 rounded-lg w-full"
                        />
                      </div>
                      <div className="flex flex-col">
                        <label className="text-lg font-semibold">
                          Date of Birth <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="date"
                          name="dob"
                          value={formData.dob}
                          onChange={handleChange}
                          className="mt-1 p-3 border border-gray-300 rounded-lg w-full"
                        />
                      </div>
                      <div className="flex flex-col">
                        <label className="text-lg font-semibold">
                          Gender <span className="text-red-500">*</span>
                        </label>
                        <select
                          name="gender"
                          value={formData.gender}
                          onChange={handleChange}
                          className="mt-1 p-3 border border-gray-300 rounded-lg w-full"
                        >
                          <option value="">Select Gender</option>
                          <option>Male</option>
                          <option>Female</option>
                          <option>Other</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Account Type Section */}
                  <div className="flex space-x-10 items-start border-b border-gray-300 mt-5">
                    <div className="flex flex-col items-start w-2/4">
                      <h2 className="text-2xl font-bold">Account Type</h2>
                      <p className="text-gray-500 text-xl mt-1">
                        You can update your account type
                      </p>
                    </div>
                    <div className="flex flex-col space-y-4 w-2/4 mb-5 -ml-50">
                      <label className="flex items-start space-x-3 cursor-pointer">
                        <input
                          type="radio"
                          name="accountType"
                          value="job-seeker"
                          checked={formData.accountType === "job-seeker"}
                          onChange={handleChange}
                          className="w-5 h-5 text-blue-500 focus:ring-blue-400 mt-2"
                        />
                        <div>
                          <span className="text-xl font-semibold">
                            Job Seeker
                          </span>
                          <p className="text-gray-500 text-sm">
                            Looking for a job
                          </p>
                        </div>
                      </label>
                      <label className="flex items-start space-x-3 cursor-pointer">
                        <input
                          type="radio"
                          name="accountType"
                          value="employer"
                          checked={formData.accountType === "employer"}
                          onChange={handleChange}
                          className="w-5 h-5 text-blue-500 focus:ring-blue-400 mt-2"
                        />
                        <div>
                          <span className="text-xl font-semibold">
                            Employer
                          </span>
                          <p className="text-gray-500 text-sm">
                            Hiring, sourcing candidates, or posting a job
                          </p>
                        </div>
                      </label>
                    </div>
                  </div>

                  {/* Save Profile Button */}
                  <div className="flex justify-end mt-6">
                    <button
                      onClick={handleSaveProfile}
                      className="bg-[#3B8BEB] text-white font-semibold px-6 py-3 rounded-sm shadow-md hover:bg-blue-600 transition"
                    >
                      Save Profile
                    </button>
                  </div>
                </div>
              )}
              {activeTab === "login" && (
                <div>
                  <div className="border-b border-gray-300">
                    <h2 className="text-2xl font-bold">Basic Information</h2>
                    <p className="text-gray-500 text-xl mt-2 mb-5">
                      This is your login information that you can update
                      anytime.
                    </p>
                  </div>

                  {/* Email Section */}
                  <div className="flex items-start space-x-10 border-b border-gray-300 mt-5">
                    <div className="w-2/4">
                      <h2 className="text-2xl font-bold">Update Email</h2>
                      <p className="text-gray-500 text-xl mt-1">
                        Update your email address to <br /> make sure it is safe
                      </p>
                    </div>
                    <div className="w-2/4 grid grid-cols-2 gap-6 mb-5 -ml-50">
                      <p className="text-gray-900 font-medium text-xl">
                        jakegyll@email.com
                      </p>
                      <CheckCircle
                        className="text-green-500 mt-2 -ml-35"
                        size={16}
                      />
                      <p className="text-gray-500 text-xl -mt-5">
                        Your email address is verified .
                      </p>
                      <div className="flex flex-col col-span-2">
                        <label className="text-lg font-semibold">
                          Update Email
                        </label>
                        <input
                          type="email"
                          name="email"
                          placeholder="Enter your email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="mt-1 p-3 border border-gray-300 rounded-lg w-full"
                        />
                      </div>
                      <div>
                        <button
                          onClick={handleUpdateEmail}
                          className="bg-[#3B8BEB] text-white font-semibold px-6 py-3 rounded-sm shadow-md hover:bg-blue-600 transition"
                        >
                          Update Email
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Password Section */}
                  <div className="flex items-start space-x-10 border-b border-gray-300 mt-5">
                    <div className="w-2/4">
                      <h2 className="text-2xl font-bold">New Password</h2>
                      <p className="text-gray-500 text-xl mt-1">
                        Manage your password to make <br /> sure it is safe
                      </p>
                    </div>
                    <div className="w-2/4 grid grid-cols-2 gap-6 mb-5 -ml-50">
                      <div className="flex flex-col col-span-2">
                        <label className="text-gray-700 font-semibold">
                          Old Password
                        </label>
                        <input
                          type="password"
                          name="oldPassword"
                          placeholder="Enter your old password"
                          className="mt-1 p-3 border border-gray-300 rounded-lg w-full text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <p className="text-gray-500 text-sm">
                          Minimum 8 characters
                        </p>
                      </div>
                      <div className="flex flex-col col-span-2">
                        <label className="text-gray-700 font-semibold">
                          New Password
                        </label>
                        <input
                          type="password"
                          name="newPassword"
                          placeholder="Enter your new password"
                          className="mt-1 p-3 border border-gray-300 rounded-lg w-full text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <p className="text-gray-500 text-sm">
                          Minimum 8 characters
                        </p>
                      </div>
                      <div>
                        <button
                          onClick={handleChangePassword}
                          className="bg-[#3B8BEB] text-white font-semibold px-6 py-3 rounded-sm shadow-md hover:bg-blue-600 transition"
                        >
                          Change Password
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-end items-center text-red-500 font-semibold cursor-pointer mt-3 text-lg">
                    <span>Close Account</span>
                    <Info className="ml-1 w-4 h-4" />
                  </div>
                </div>
              )}
              {activeTab === "notifications" && (
                <div>
                  <div className="border-b border-gray-300">
                    <h2 className="text-2xl font-bold">Notifications</h2>
                    <p className="text-gray-500 text-xl mt-2 mb-5">
                      This is notifications preferences that you can update
                      anytime.
                    </p>
                  </div>

                  {/* Notifications */}
                  <div className="flex items-start space-x-10 mt-5">
                    <div className="w-2/4">
                      <h2 className="text-2xl font-bold">Notifications</h2>
                      <p className="text-gray-500 text-xl mt-1">
                        Customize your preferred <br /> notification settings
                      </p>
                    </div>
                    <div className="w-2/4 gap-6 mb-5 -ml-50 space-y-8">
                      {options.map((option) => (
                        <div key={option.id} className="flex items-start gap-3">
                          <Checkbox
                            checked={selected.includes(option.id)}
                            onChange={() => toggleSelection(option.id)}
                          />
                          <div>
                            <p className="font-bold text-gray-900 text-2xl mt-1.5">
                              {option.label}
                            </p>
                            <p className="text-gray-500 text-xl mt-2">
                              {option.description
                                .split("<br/>")
                                .map((line, index) => (
                                  <React.Fragment key={index}>
                                    {line}
                                    <br />
                                  </React.Fragment>
                                ))}
                            </p>
                          </div>
                        </div>
                      ))}

                      {/* Email Update Section */}
                      <div className="mt-5">
                        {isEditingEmail ? (
                          <div className="flex items-center space-x-3">
                            <input
                              type="email"
                              value={emailInput}
                              onChange={(e) => setEmailInput(e.target.value)}
                              placeholder="Enter new email"
                              className="border border-gray-300 rounded-md px-4 py-2 text-xl w-80"
                            />
                            <button
                              onClick={handleSaveEmail}
                              className="bg-green-600 text-white font-semibold px-5 py-2 rounded-md shadow-md hover:bg-green-700 transition"
                            >
                              Save
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={handleEditEmail}
                            className="bg-[#3B8BEB] text-white font-semibold px-6 py-3 rounded-sm shadow-md hover:bg-blue-600 transition"
                          >
                            Update Email
                          </button>
                        )}
                      </div>
                    </div>
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

export default Settings;
