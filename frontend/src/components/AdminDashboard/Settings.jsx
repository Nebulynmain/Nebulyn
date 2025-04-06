import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { CheckCircle, AlertTriangle, Loader, Info } from "lucide-react";
import axios from "axios";
import { API_URL } from "../../App";

const Checkbox = ({ checked, onChange }) => (
  <input
    type="checkbox"
    className="w-4 h-4 rounded-sm border-gray-300 checked:bg-[#3B8BEB] checked:border-transparent mt-3 cursor-pointer"
    checked={checked}
    onChange={onChange}
  />
);

const Settings = () => {
  const [activeTab, setActiveTab] = useState("profile");

  // API related states
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [userData, setUserData] = useState(null);

  const [image, setImage] = useState("https://via.placeholder.com/96");

  const [imagePreview, setImagePreview] = useState(null); // For displaying image preview

  const handleImageChange = async (event) => {
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
        setError("Invalid file type! Please upload a JPG, PNG, GIF, or SVG image.");
        return;
      }

      // Validate file size (Max 1MB)
      const maxSize = 1 * 1024 * 1024; // 1MB
      if (file.size > maxSize) {
        setError("File size too large! Please upload an image less than 1MB.");
        return;
      }

      // Set preview for UI
      setImagePreview(URL.createObjectURL(file));

      // Store file in formData for submission
      setFormData((prevFormData) => ({
        ...prevFormData,
        profileImage: file,
      }));

      // Upload image immediately
      await handleImageUpload(file);
    }
  };

  // Function to upload image to server
  const handleImageUpload = async (file) => {
    setLoading(true);
    setError(null);
    setSuccess(null);
    
    try {
      // Create FormData for file upload
      const formData = new FormData();
      formData.append('file', file);
      
      console.log("Uploading image...");
      
      const response = await axios.post(`${API_URL}/auth/image`, formData, {
        withCredentials: true,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      console.log("Image upload response:", response.data);
      
      if (response.data && response.data.ok) {
        setSuccess("Profile image updated successfully!");
        
        // Update image state with the URL from server
        if (response.data.data.profilePic) {
          setImage(response.data.data.profilePic);
        }
        
        // Update user data state with new values
        setUserData(response.data.data);
        
        // Clear success message after 3 seconds
        setTimeout(() => {
          setSuccess(null);
        }, 3000);
      } else {
        throw new Error(response.data?.message || "Failed to upload image");
      }
    } catch (err) {
      console.error("Error uploading image:", err);
      setError(err.message || "Failed to upload image. Please try again.");
    } finally {
      setLoading(false);
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
  
  const [currentEmail, setCurrentEmail] = useState("");

  // Function to handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Function to save profile
  const handleSaveProfile = async () => {
    setLoading(true);
    setError(null);
    setSuccess(null);
    
    try {
      // Validate required fields
      if (!formData.fullName.trim()) {
        throw new Error("Full name is required");
      }
      
      if (!formData.email.trim() || !formData.email.includes('@')) {
        throw new Error("Valid email is required");
      }
      
      // Prepare the data for API
      const profileData = {
        fullName: formData.fullName.trim(),
        phoneNumber: formData.phoneNumber ? String(formData.phoneNumber).trim() : "", // Correct field name to match model
        email: formData.email.trim(),
        dateOfBirth: formData.dob || undefined,
        // If gender is empty, don't send it to avoid validation error
        ...(formData.gender ? { gender: formData.gender } : {}),
        accountType: formData.accountType === "employer" ? "Employer" : "Job-seeker"
      };
      
      console.log("Sending profile data:", profileData);
      
      // Make API call to update profile
      const response = await axios.post(`${API_URL}/auth/update-profile`, profileData, {
        withCredentials: true
      });
      
      console.log("Profile update response:", response.data);
      
      if (response.data && response.data.ok) {
        setSuccess("Profile updated successfully!");
        
        // Update user data state with new values
        setUserData(response.data.data);
        
        // Clear success message after 3 seconds
        setTimeout(() => {
          setSuccess(null);
        }, 3000);
      } else {
        throw new Error(response.data?.message || "Failed to update profile");
      }
    } catch (err) {
      console.error("Error updating profile:", err);
      setError(err.message || "Failed to update profile. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const [email, setEmail] = useState("");

  const handleUpdateEmail = async () => {
    // Validate email
    if (!email || !email.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(null);
    
    try {
      // Make API call to update email
      const response = await axios.post(`${API_URL}/auth/update-email-password`, 
        { email }, 
        { withCredentials: true }
      );
      
      console.log("Email update response:", response.data);
      
      if (response.data && response.data.ok) {
        setSuccess("Email updated successfully!");
        setCurrentEmail(email);
        setEmail("");
        
        // Update user data state with new values
        setUserData(response.data.data);
        
        // Clear success message after 3 seconds
        setTimeout(() => {
          setSuccess(null);
        }, 3000);
      } else {
        throw new Error(response.data?.message || "Failed to update email");
      }
    } catch (err) {
      console.error("Error updating email:", err);
      setError(err.message || "Failed to update email. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handleChangePassword = async () => {
    if (!oldPassword || !newPassword) {
      setError("Please enter both old and new passwords.");
      return;
    }
    
    if (oldPassword.length < 8 || newPassword.length < 8) {
      setError("Password must be at least 8 characters long.");
      return;
    }

    if (oldPassword === newPassword) {
      setError("New password must be different from the old password.");
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(null);
    
    try {
      // Make API call to update password
      const response = await axios.post(`${API_URL}/auth/update-email-password`, 
        { oldPassword, newPassword }, 
        { withCredentials: true }
      );
      
      console.log("Password update response:", response.data);
      
      if (response.data && response.data.ok) {
        setSuccess("Password changed successfully!");
        
        // Reset password fields
        setOldPassword("");
        setNewPassword("");
        
        // Clear success message after 3 seconds
        setTimeout(() => {
          setSuccess(null);
        }, 3000);
      } else {
        throw new Error(response.data?.message || "Failed to change password");
      }
    } catch (err) {
      console.error("Error changing password:", err);
      setError(err.message || "Failed to change password. Please try again.");
    } finally {
      setLoading(false);
    }
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

  // Fetch user profile from API
  useEffect(() => {
    const fetchUserProfile = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(`${API_URL}/auth/profile`, {
          withCredentials: true
        });
        
        console.log('User profile data:', response.data);
        
        if (response.data && response.data.ok) {
          setUserData(response.data.data);
          
          // Update the form with user data
          setFormData({
            fullName: response.data.data.fullName || "",
            phoneNumber: response.data.data.phoneNumber || "", // Use phoneNumber instead of phone
            email: response.data.data.email || "",
            dob: response.data.data.dateOfBirth ? new Date(response.data.data.dateOfBirth).toISOString().split('T')[0] : "",
            gender: response.data.data.gender || "",
            accountType: response.data.data.accountType === "Employer" ? "employer" : "job-seeker",
            profileImage: null,
          });
          
          // Set profile image if available
          if (response.data.data.profilePic) {
            setImage(response.data.data.profilePic);
            setImagePreview(response.data.data.profilePic);
          }
          
          // Set the current email for the email update section
          setEmail(response.data.data.email || "");
          setCurrentEmail(response.data.data.email || "");
        } else {
          throw new Error(response.data?.message || "Failed to fetch user profile");
        }
      } catch (err) {
        console.error("Error fetching profile:", err);
        setError("Failed to load profile data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex flex-row flex-grow">
        <div className="h-screen sticky top-0">
          <Sidebar />
        </div>
        <div className="flex-grow transition-all">
          <Header />
          <div className="p-4">
            {loading && !userData ? (
              <div className="flex items-center justify-center h-64">
                <Loader className="w-8 h-8 text-blue-500 animate-spin" />
                <span className="ml-2 text-gray-600">Loading profile data...</span>
              </div>
            ) : error && !userData ? (
              <div className="flex items-center justify-center h-64 text-red-500 bg-red-50 p-4 rounded-md">
                <AlertTriangle className="w-6 h-6 mr-2" />
                <span>{error}</span>
              </div>
            ) : (
              <>
                <div className="border-b border-gray-300 flex space-x-4 text-sm w-full">
                  <button
                    className={`pb-2 border-b-2 px-3 cursor-pointer ${
                      activeTab === "profile"
                        ? "border-blue-500 font-semibold text-blue-600"
                        : "border-transparent text-gray-500"
                    }`}
                    onClick={() => setActiveTab("profile")}
                  >
                    My Profile
                  </button>
                  <button
                    className={`pb-2 border-b-2 px-3 cursor-pointer ${
                      activeTab === "login"
                        ? "border-blue-500 font-semibold text-blue-600"
                        : "border-transparent text-gray-500"
                    }`}
                    onClick={() => setActiveTab("login")}
                  >
                    Login Details
                  </button>
                  <button
                    className={`pb-2 border-b-2 px-3 cursor-pointer ${
                      activeTab === "notifications"
                        ? "border-blue-500 font-semibold text-blue-600"
                        : "border-transparent text-gray-500"
                    }`}
                    onClick={() => setActiveTab("notifications")}
                  >
                    Notifications
                  </button>
                </div>
                <div className="p-3">
                  {activeTab === "profile" && (
                    <div>
                      <div className="border-b border-gray-300">
                        <h2 className="text-lg font-bold">Basic Information</h2>
                        <p className="text-gray-500 text-sm mt-1 mb-3">
                          This is your personal information that you can update
                          anytime.
                        </p>
                        <p className="text-yellow-600 text-sm mt-1 mb-3 bg-yellow-50 p-2 rounded-md flex items-center">
                          <AlertTriangle className="w-4 h-4 mr-1" />
                          Note: Fields marked with * are required. Gender must be selected from the available options.
                        </p>
                      </div>
                      {/* Profile Photo Section */}
                      <div className="flex space-x-4 border-b border-gray-300 mt-3">
                        <div className="flex flex-col items-start w-2/5">
                          <h2 className="text-lg font-bold">Profile Photo</h2>
                          <p className="text-gray-500 text-sm mt-1">
                            This image will be shown publicly as your profile
                            picture, it will help recruiters recognize you!
                          </p>
                        </div>
                        <div className="flex space-x-4 items-center w-3/5">
                          <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-gray-300 relative">
                            {loading && !imagePreview ? (
                              <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                                <Loader className="w-6 h-6 text-blue-500 animate-spin" />
                              </div>
                            ) : imagePreview ? (
                              <img
                                src={imagePreview}
                                alt="Profile"
                                className="w-full h-full object-cover"
                              />
                            ) : userData?.profilePic ? (
                              <img
                                src={userData.profilePic}
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
                              {loading ? "Uploading..." : "Click to replace"}
                            </span>
                            <p className="text-gray-400 mt-1">or drag and drop</p>
                            <p className="text-gray-400 text-xs">
                              SVG, PNG, JPG or GIF (max. 1MB)
                            </p>
                            <input
                              type="file"
                              className="hidden"
                              accept="image/*"
                              onChange={handleImageChange}
                              disabled={loading}
                            />
                          </label>
                        </div>
                      </div>

                      {/* Personal Details Section */}
                      <div className="flex items-start space-x-4 border-b border-gray-300 mt-3">
                        <div className="w-2/5">
                          <h2 className="text-lg font-bold">Personal Details</h2>
                        </div>
                        <div className="w-3/5 grid grid-cols-2 gap-3 mb-3">
                          <div className="flex flex-col col-span-2">
                            <label className="text-sm font-semibold">
                              Full Name <span className="text-red-500">*</span>
                            </label>
                            <input
                              type="text"
                              name="fullName"
                              value={formData.fullName}
                              onChange={handleChange}
                              className="mt-1 p-2 text-sm border border-gray-300 rounded-lg w-full"
                            />
                          </div>
                          <div className="flex flex-col">
                            <label className="text-sm font-semibold">
                              Phone Number <span className="text-red-500">*</span>
                            </label>
                            <input
                              type="tel"
                              name="phoneNumber"
                              value={formData.phoneNumber}
                              onChange={handleChange}
                              placeholder="e.g. +1 123-456-7890"
                              className="mt-1 p-2 text-sm border border-gray-300 rounded-lg w-full"
                            />
                            <p className="text-gray-500 text-xs mt-1">
                              Include country code for international numbers
                            </p>
                          </div>
                          <div className="flex flex-col">
                            <label className="text-sm font-semibold">
                              Email <span className="text-red-500">*</span>
                            </label>
                            <input
                              type="email"
                              name="email"
                              value={formData.email}
                              onChange={handleChange}
                              className="mt-1 p-2 text-sm border border-gray-300 rounded-lg w-full"
                            />
                          </div>
                          <div className="flex flex-col">
                            <label className="text-sm font-semibold">
                              Date of Birth <span className="text-red-500">*</span>
                            </label>
                            <input
                              type="date"
                              name="dob"
                              value={formData.dob}
                              onChange={handleChange}
                              className="mt-1 p-2 text-sm border border-gray-300 rounded-lg w-full"
                            />
                          </div>
                          <div className="flex flex-col">
                            <label className="text-sm font-semibold">
                              Gender <span className="text-red-500">*</span>
                            </label>
                            <select
                              name="gender"
                              value={formData.gender}
                              onChange={handleChange}
                              className={`mt-1 p-2 text-sm border ${formData.gender ? 'border-gray-300' : 'border-red-300'} rounded-lg w-full cursor-pointer`}
                            >
                              <option value="">Select Gender</option>
                              <option value="Male">Male</option>
                              <option value="Female">Female</option>
                              <option value="Others">Others</option>
                            </select>
                            {!formData.gender && (
                              <p className="text-red-500 text-xs mt-1">
                                Please select a gender option
                              </p>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Account Type Section */}
                      <div className="flex space-x-4 items-start border-b border-gray-300 mt-3">
                        <div className="flex flex-col items-start w-2/5">
                          <h2 className="text-lg font-bold">Account Type</h2>
                          <p className="text-gray-500 text-sm mt-1">
                            You can update your account type
                          </p>
                        </div>
                        <div className="flex flex-col space-y-3 w-3/5 mb-3">
                          <label className="flex items-start space-x-2 cursor-pointer">
                            <input
                              type="radio"
                              name="accountType"
                              value="job-seeker"
                              checked={formData.accountType === "job-seeker"}
                              onChange={handleChange}
                              className="w-4 h-4 text-blue-500 focus:ring-blue-400 mt-1 cursor-pointer"
                            />
                            <div>
                              <span className="text-sm font-semibold">
                                Job Seeker
                              </span>
                              <p className="text-gray-500 text-xs">
                                Looking for a job
                              </p>
                            </div>
                          </label>
                          <label className="flex items-start space-x-2 cursor-pointer">
                            <input
                              type="radio"
                              name="accountType"
                              value="employer"
                              checked={formData.accountType === "employer"}
                              onChange={handleChange}
                              className="w-4 h-4 text-blue-500 focus:ring-blue-400 mt-1 cursor-pointer"
                            />
                            <div>
                              <span className="text-sm font-semibold">
                                Employer
                              </span>
                              <p className="text-gray-500 text-xs">
                                Hiring, sourcing candidates, or posting a job
                              </p>
                            </div>
                          </label>
                        </div>
                      </div>

                      {/* Save Profile Button */}
                      <div className="flex justify-end mt-4">
                        {error && (
                          <div className="flex-grow mr-4 text-red-500 bg-red-50 p-2 rounded-md flex items-center">
                            <AlertTriangle className="w-4 h-4 mr-1" />
                            <span className="text-sm">{error}</span>
                          </div>
                        )}
                        
                        {success && (
                          <div className="flex-grow mr-4 text-green-500 bg-green-50 p-2 rounded-md flex items-center">
                            <CheckCircle className="w-4 h-4 mr-1" />
                            <span className="text-sm">{success}</span>
                          </div>
                        )}
                        
                        <button
                          onClick={handleSaveProfile}
                          disabled={loading}
                          className={`bg-[#3B8BEB] text-white font-semibold px-4 py-2 text-sm rounded-sm shadow-md hover:bg-blue-600 transition cursor-pointer ${loading ? 'opacity-70' : ''}`}
                        >
                          {loading ? (
                            <div className="flex items-center">
                              <Loader className="w-3 h-3 mr-1 animate-spin" />
                              Saving...
                            </div>
                          ) : "Save Profile"}
                        </button>
                      </div>
                    </div>
                  )}
                  {activeTab === "login" && (
                    <div>
                      <div className="border-b border-gray-300">
                        <h2 className="text-lg font-bold">Basic Information</h2>
                        <p className="text-gray-500 text-sm mt-1 mb-3">
                          This is your login information that you can update
                          anytime.
                        </p>
                      </div>

                      {/* Email Section */}
                      <div className="flex items-start space-x-4 border-b border-gray-300 mt-3">
                        <div className="w-2/5">
                          <h2 className="text-lg font-bold">Update Email</h2>
                          <p className="text-gray-500 text-sm mt-1">
                            Update your email address to make sure it is safe
                          </p>
                        </div>
                        <div className="w-3/5 grid grid-cols-2 gap-3 mb-3">
                          <p className="text-gray-900 font-medium text-sm">
                            {currentEmail || "No email set"}
                          </p>
                          <CheckCircle className="text-green-500 mt-1" size={12} />
                          <p className="text-gray-500 text-xs -mt-2">
                            Your email address is verified.
                          </p>
                          <div className="flex flex-col col-span-2">
                            <label className="text-sm font-semibold">
                              Update Email
                            </label>
                            <input
                              type="email"
                              name="email"
                              placeholder="Enter your email"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              className="mt-1 p-2 text-sm border border-gray-300 rounded-lg w-full"
                            />
                          </div>
                          <div>
                            <button
                              onClick={handleUpdateEmail}
                              disabled={loading}
                              className={`bg-[#3B8BEB] text-white font-semibold px-4 py-2 text-sm rounded-sm shadow-md hover:bg-blue-600 transition cursor-pointer ${loading ? 'opacity-70' : ''}`}
                            >
                              {loading ? (
                                <div className="flex items-center">
                                  <Loader className="w-3 h-3 mr-1 animate-spin" />
                                  Updating...
                                </div>
                              ) : "Update Email"}
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Password Section */}
                      <div className="flex items-start space-x-4 border-b border-gray-300 mt-3">
                        <div className="w-2/5">
                          <h2 className="text-lg font-bold">New Password</h2>
                          <p className="text-gray-500 text-sm mt-1">
                            Manage your password to make sure it is safe
                          </p>
                        </div>
                        <div className="w-3/5 grid grid-cols-2 gap-3 mb-3">
                          <div className="flex flex-col col-span-2">
                            <label className="text-sm font-semibold">
                              Old Password
                            </label>
                            <input
                              type="password"
                              name="oldPassword"
                              placeholder="Enter your old password"
                              value={oldPassword}
                              onChange={(e) => setOldPassword(e.target.value)}
                              className="mt-1 p-2 text-sm border border-gray-300 rounded-lg w-full text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500"
                            />
                            <p className="text-gray-500 text-xs">
                              Minimum 8 characters
                            </p>
                          </div>
                          <div className="flex flex-col col-span-2">
                            <label className="text-sm font-semibold">
                              New Password
                            </label>
                            <input
                              type="password"
                              name="newPassword"
                              placeholder="Enter your new password"
                              value={newPassword}
                              onChange={(e) => setNewPassword(e.target.value)}
                              className="mt-1 p-2 text-sm border border-gray-300 rounded-lg w-full text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500"
                            />
                            <p className="text-gray-500 text-xs">
                              Minimum 8 characters
                            </p>
                          </div>
                          <div>
                            <button
                              onClick={handleChangePassword}
                              disabled={loading}
                              className={`bg-[#3B8BEB] text-white font-semibold px-4 py-2 text-sm rounded-sm shadow-md hover:bg-blue-600 transition cursor-pointer ${loading ? 'opacity-70' : ''}`}
                            >
                              {loading ? (
                                <div className="flex items-center">
                                  <Loader className="w-3 h-3 mr-1 animate-spin" />
                                  Updating...
                                </div>
                              ) : "Change Password"}
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="flex justify-end items-center text-red-500 font-semibold cursor-pointer mt-2 text-sm">
                        <span>Close Account</span>
                        <Info className="ml-1 w-3 h-3" />
                      </div>
                    </div>
                  )}
                  {activeTab === "notifications" && (
                    <div>
                      <div className="border-b border-gray-300">
                        <h2 className="text-lg font-bold">Notifications</h2>
                        <p className="text-gray-500 text-sm mt-1 mb-3">
                          This is notifications preferences that you can update
                          anytime.
                        </p>
                      </div>

                      {/* Notifications */}
                      <div className="flex items-start space-x-4 mt-3">
                        <div className="w-2/5">
                          <h2 className="text-lg font-bold">Notifications</h2>
                          <p className="text-gray-500 text-sm mt-1">
                            Customize your preferred notification settings
                          </p>
                        </div>
                        <div className="w-3/5 gap-3 mb-3 space-y-4">
                          {options.map((option) => (
                            <div key={option.id} className="flex items-start gap-2">
                              <Checkbox
                                checked={selected.includes(option.id)}
                                onChange={() => toggleSelection(option.id)}
                                className="cursor-pointer"
                              />
                              <div
                                className="cursor-pointer"
                                onClick={() => toggleSelection(option.id)}
                              >
                                <p className="font-bold text-gray-900 text-sm mt-1">
                                  {option.label}
                                </p>
                                <p className="text-gray-500 text-xs mt-1">
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
                          <div className="mt-3">
                            {isEditingEmail ? (
                              <div className="flex items-center space-x-2">
                                <input
                                  type="email"
                                  value={emailInput}
                                  onChange={(e) => setEmailInput(e.target.value)}
                                  placeholder="Enter new email"
                                  className="border border-gray-300 rounded-md px-3 py-1 text-sm w-60"
                                />
                                <button
                                  onClick={handleSaveEmail}
                                  className="bg-green-600 text-white font-semibold px-3 py-1 text-sm rounded-md shadow-md hover:bg-green-700 transition cursor-pointer"
                                >
                                  Save
                                </button>
                              </div>
                            ) : (
                              <button
                                onClick={handleEditEmail}
                                className="bg-[#3B8BEB] text-white font-semibold px-4 py-2 text-sm rounded-sm shadow-md hover:bg-blue-600 transition cursor-pointer"
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
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
