import React, { useState, useEffect, useRef } from "react";
import { Edit, Calendar, Upload, Loader, AlertTriangle } from "lucide-react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import axios from "axios";
import { API_URL } from "../../App";

function Profile() {
  const [isEditingHeader, setIsEditingHeader] = useState(false);
  const [isEditingAbout, setIsEditingAbout] = useState(false);
  const [isEditingSkills, setIsEditingSkills] = useState(false);
  const [isEditingDetails, setIsEditingDetails] = useState(false);
  const [isEditingSocial, setIsEditingSocial] = useState(false);
  const [editingExperience, setEditingExperience] = useState(null);
  const [editingEducation, setEditingEducation] = useState(null);
  const [isAddingExperience, setIsAddingExperience] = useState(false);
  const [isAddingEducation, setIsAddingEducation] = useState(false);
  
  // API related states
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [saveLoading, setSaveLoading] = useState(false);
  const [saveError, setSaveError] = useState(null);
  const [userUpdated, setUserUpdated] = useState(false);

  // Fallback profile data
  const fallbackProfile = {
    name: "User",
    title: "Job Title",
    location: "Location",
    availability: "Not specified",
    about: {
      title: "About Me",
      description: "No description available.",
      experience: "No experience details available.",
    },
    skills: [],
    details: {
      email: "example@email.com",
      phone: "Not provided",
      languages: "Not specified",
    },
    social: {
      instagram: "",
      twitter: "",
      website: "",
    },
  };

  const [profileData, setProfileData] = useState(fallbackProfile);

  const [experiencesData, setExperiencesData] = useState([
    {
      id: 1,
      title: "Product Designer",
      company: "Twitter",
      type: "Full-Time",
      duration: "Jun 2019 - Present (1y 1m)",
      location: "Manchester, UK",
      description:
        "Created and executed social media plan for 10 brands utilizing multiple features and content types to increase brand outreach, engagement, and leads.",
      logo: "https://logo.clearbit.com/twitter.com",
    },
    {
      id: 2,
      title: "Growth Marketing Designer",
      company: "GoDaddy",
      type: "Full-Time",
      duration: "Jun 2011 - May 2019 (8y)",
      location: "Manchester, UK",
      description:
        "Developed digital marketing strategies, activation plans, proposals, contests and promotions for client initiatives.",
      logo: "https://logo.clearbit.com/godaddy.com",
    },
    {
      id: 3,
      title: "UI/UX Designer",
      company: "Spotify",
      type: "Full-Time",
      duration: "Aug 2019 - Dec 2022 (3y 4m)",
      location: "London, UK",
      description:
        "Designed intuitive user interfaces for Spotify's mobile and web applications, enhancing user experience and engagement.",
      logo: "https://logo.clearbit.com/spotify.com",
    },
    {
      id: 4,
      title: "Front-End Developer",
      company: "Airbnb",
      type: "Contract",
      duration: "Jan 2017 - Jul 2019 (2y 6m)",
      location: "Remote",
      description:
        "Developed and optimized Airbnb's front-end UI components, ensuring seamless user interactions across all devices.",
      logo: "https://logo.clearbit.com/airbnb.com",
    },
    {
      id: 5,
      title: "Creative Director",
      company: "Adobe",
      type: "Full-Time",
      duration: "Mar 2023 - Present",
      location: "San Francisco, CA",
      description:
        "Leading the creative team at Adobe to drive innovative design strategies for the Adobe Creative Suite.",
      logo: "https://logo.clearbit.com/adobe.com",
    },
  ]);

  const [educationsData, setEducationsData] = useState([
    {
      id: 1,
      school: "Harvard University",
      degree: "Postgraduate degree, Applied Psychology",
      duration: "2010 - 2012",
      description:
        "Specialized in creating business opportunities by observing, analyzing, researching, and changing behavior.",
      logo: "https://upload.wikimedia.org/wikipedia/en/2/29/Harvard_shield_wreath.svg",
      link: "https://www.harvard.edu/",
    },
    {
      id: 2,
      school: "University of Toronto",
      degree: "Bachelor of Arts, Visual Communication",
      duration: "2005 - 2009",
      description:
        "Studied visual communication, design principles, and digital media.",
      logo: "https://upload.wikimedia.org/wikipedia/en/thumb/2/2b/University_of_Toronto_CoA.svg/1200px-University_of_Toronto_CoA.svg.png",
      link: "https://www.utoronto.ca/",
    },
    {
      id: 3,
      school: "Stanford University",
      degree: "Master of Science, Computer Science",
      duration: "2013 - 2015",
      description:
        "Focused on artificial intelligence and machine learning research.",
      logo: "https://upload.wikimedia.org/wikipedia/commons/4/44/Stanford_University_seal_2003.svg",
      link: "https://www.stanford.edu/",
    },
    {
      id: 4,
      school: "MIT",
      degree: "PhD in Robotics",
      duration: "2016 - 2020",
      description:
        "Conducted research in autonomous systems and robotics innovation.",
      logo: "https://upload.wikimedia.org/wikipedia/commons/0/0c/MIT_logo.svg",
      link: "https://www.mit.edu/",
    },
  ]);

  // Fetch user profile data
  useEffect(() => {
    const fetchUserProfile = async () => {
      setLoading(true);
      try {
        console.log("Fetching user profile from:", `${API_URL}/auth/profile`);
        
        const response = await axios.get(`${API_URL}/auth/profile`, {
          withCredentials: true
        });
        
        console.log("User data response:", response.data);
        
        if (response.data && response.data.ok) {
          // Transform backend data to match our frontend structure
          const userData = response.data.data;
          
          setProfileData({
            name: userData.fullName || fallbackProfile.name,
            title: userData.title || fallbackProfile.title,
            location: userData.location || fallbackProfile.location,
            availability: userData.availability || fallbackProfile.availability,
            about: {
              title: "About Me",
              description: userData.bio || fallbackProfile.about.description,
              experience: userData.experience || fallbackProfile.about.experience,
            },
            skills: Array.isArray(userData.skills) ? userData.skills : fallbackProfile.skills,
            details: {
              email: userData.email || fallbackProfile.details.email,
              phone: userData.phone || fallbackProfile.details.phone,
              languages: Array.isArray(userData.languages) ? 
                userData.languages.join(", ") : 
                (userData.languages || fallbackProfile.details.languages),
            },
            social: {
              instagram: userData.instagramLink || fallbackProfile.social.instagram, 
              twitter: userData.twitterLink || fallbackProfile.social.twitter,
              website: userData.websiteLink || fallbackProfile.social.website,
            }
          });
          
          // Also fetch experiences if available
          if (userData.experience && Array.isArray(userData.experience) && userData.experience.length > 0) {
            try {
              // Transform experiences data to match our schema
              const formattedExperiences = userData.experience.map((exp, index) => ({
                id: exp._id || index + 1,
                title: exp.role || "Job Title",
                company: exp.companyName || "Company",
                type: exp.roleType || "Full-Time",
                duration: formatDateRange(
                  exp.duration?.startDate, 
                  exp.duration?.endDate
                ) || "",
                location: exp.location || "Location",
                description: exp.description || "",
                logo: exp.logo || `https://logo.clearbit.com/${exp.companyName?.toLowerCase()?.replace(/\s/g, '')}.com` || "https://via.placeholder.com/40",
                startDate: exp.duration?.startDate,
                endDate: exp.duration?.endDate
              }));
              
              setExperiencesData(formattedExperiences);
            } catch (expErr) {
              console.error("Error processing experiences data:", expErr);
              // Keep default experiences data
            }
          }
          
          // Also fetch education if available
          if (userData.education && Array.isArray(userData.education) && userData.education.length > 0) {
            try {
              // Transform education data to match our schema
              const formattedEducation = userData.education.map((edu, index) => ({
                id: edu._id || index + 1,
                school: edu.instituteName || "School Name",
                degree: edu.degree || "Degree",
                duration: formatDateRange(
                  edu.duration?.startDate, 
                  edu.duration?.endDate
                ) || "",
                description: edu.description || "",
                logo: edu.logo || "https://via.placeholder.com/40",
                link: edu.link || "#",
                startDate: edu.duration?.startDate,
                endDate: edu.duration?.endDate
              }));
              
              setEducationsData(formattedEducation);
            } catch (eduErr) {
              console.error("Error processing education data:", eduErr);
              // Keep default education data
            }
          }
        } else {
          throw new Error("Invalid response format or user data not available");
        }
      } catch (err) {
        console.error("Error fetching user profile:", err);
        setError("Failed to fetch user profile. Using default data.");
        // Keep using the default profile data
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  // Save user profile changes
  const saveUserProfile = async (updatedData) => {
    setSaveLoading(true);
    setSaveError(null);
    
    try {
      // Prepare data for API
      const apiData = {
        fullName: updatedData.name,
        title: updatedData.title,
        location: updatedData.location,
        availability: updatedData.availability,
        bio: updatedData.about.description,
        skills: Array.isArray(updatedData.skills) ? updatedData.skills : [],
        email: updatedData.details.email,
        phone: updatedData.details.phone,
        languages: updatedData.details.languages ? 
                  (typeof updatedData.details.languages === 'string' ? 
                   [updatedData.details.languages] : updatedData.details.languages) : 
                  [],
        instagramLink: updatedData.social.instagram,
        twitterLink: updatedData.social.twitter,
        websiteLink: updatedData.social.website
      };
      
      console.log("Sending data to backend:", apiData);
      
      const response = await axios.post(`${API_URL}/auth/update-profile`, apiData, {
        withCredentials: true
      });
      
      console.log("Update response:", response.data);
      
      if (response.data && response.data.ok) {
        setUserUpdated(true);
        console.log("Profile updated successfully:", response.data.data);
        
        // Reset notification after 3 seconds
        setTimeout(() => {
          setUserUpdated(false);
        }, 3000);
      } else {
        throw new Error(response.data?.message || "Failed to update profile");
      }
    } catch (err) {
      console.error("Error updating user profile:", err);
      setSaveError(err.message || "Failed to save profile changes.");
    } finally {
      setSaveLoading(false);
    }
  };

  const handleHeaderSubmit = (e) => {
    e.preventDefault();
    saveUserProfile(profileData);
    setIsEditingHeader(false);
  };

  const handleAboutSubmit = (e) => {
    e.preventDefault();
    saveUserProfile(profileData);
    setIsEditingAbout(false);
  };

  const handleSkillsSubmit = (e) => {
    e.preventDefault();
    saveUserProfile(profileData);
    setIsEditingSkills(false);
  };

  const handleDetailsSubmit = (e) => {
    e.preventDefault();
    saveUserProfile(profileData);
    setIsEditingDetails(false);
  };

  const handleSocialSubmit = (e) => {
    e.preventDefault();
    saveUserProfile(profileData);
    setIsEditingSocial(false);
  };

  // Save experience to API
  const saveExperience = async (experience) => {
    try {
      // Format experience for API
      const apiExperience = {
        role: experience.title,
        companyName: experience.company,
        roleType: experience.type,
        duration: {
          startDate: experience.startDate,
          endDate: experience.endDate === "Present" ? null : experience.endDate
        },
        location: experience.location,
        description: experience.description,
        logo: experience.logo
      };
      
      console.log("Saving experience:", apiExperience);
      
      let response;
      if (experience.id && !isAddingExperience && typeof experience.id !== 'number') {
        // Update existing experience
        response = await axios.post(`${API_URL}/auth/update-experience/${experience.id}`, apiExperience, {
          withCredentials: true
        });
      } else {
        // Create new experience
        response = await axios.post(`${API_URL}/auth/add-experience`, apiExperience, {
          withCredentials: true
        });
      }
      
      console.log("Experience saved:", response.data);
      return response.data && response.data.data ? response.data.data : null;
    } catch (err) {
      console.error("Error saving experience:", err);
      throw err;
    }
  };
  
  // Save education to API
  const saveEducation = async (education) => {
    try {
      // Format education for API
      const apiEducation = {
        instituteName: education.school,
        degree: education.degree,
        duration: {
          startDate: education.startDate,
          endDate: education.endDate === "Present" ? null : education.endDate
        },
        description: education.description,
        logo: education.logo,
        link: education.link
      };
      
      console.log("Saving education:", apiEducation);
      
      let response;
      if (education.id && !isAddingEducation && typeof education.id !== 'number') {
        // Update existing education
        response = await axios.post(`${API_URL}/auth/update-education/${education.id}`, apiEducation, {
          withCredentials: true
        });
      } else {
        // Create new education
        response = await axios.post(`${API_URL}/auth/add-education`, apiEducation, {
          withCredentials: true
        });
      }
      
      console.log("Education saved:", response.data);
      return response.data && response.data.data ? response.data.data : null;
    } catch (err) {
      console.error("Error saving education:", err);
      throw err;
    }
  };

  const handleExperienceSubmit = async (e, experience) => {
    e.preventDefault();
    
    try {
      setSaveLoading(true);
      const savedExperience = await saveExperience(experience);
      
      if (editingExperience) {
        setExperiencesData(
          experiencesData.map((exp) =>
            exp.id === editingExperience.id
              ? { ...experience, id: editingExperience.id }
              : exp
          )
        );
        setEditingExperience(null);
      } else if (isAddingExperience) {
        setExperiencesData([
          ...experiencesData,
          { ...experience, id: savedExperience.id || Date.now() },
        ]);
        setIsAddingExperience(false);
      }
      
      setUserUpdated(true);
      setTimeout(() => {
        setUserUpdated(false);
      }, 3000);
    } catch (err) {
      setSaveError("Failed to save experience.");
      console.error("Error in handleExperienceSubmit:", err);
    } finally {
      setSaveLoading(false);
    }
  };

  const handleEducationSubmit = async (e, education) => {
    e.preventDefault();
    
    try {
      setSaveLoading(true);
      const savedEducation = await saveEducation(education);
      
      if (editingEducation) {
        setEducationsData(
          educationsData.map((edu) =>
            edu.id === editingEducation.id
              ? { ...education, id: editingEducation.id }
              : edu
          )
        );
        setEditingEducation(null);
      } else if (isAddingEducation) {
        setEducationsData([
          ...educationsData,
          { ...education, id: savedEducation.id || Date.now() },
        ]);
        setIsAddingEducation(false);
      }
      
      setUserUpdated(true);
      setTimeout(() => {
        setUserUpdated(false);
      }, 3000);
    } catch (err) {
      setSaveError("Failed to save education.");
      console.error("Error in handleEducationSubmit:", err);
    } finally {
      setSaveLoading(false);
    }
  };

  const EditButton = ({ onClick }) => (
    <button
      onClick={onClick}
      className="p-1.5 text-blue-600 border border-gray-300 rounded-md hover:bg-blue-100 transition-colors cursor-pointer"
    >
      <Edit className="w-4 h-4" />
    </button>
  );

  const EditableInput = ({ value, onChange, label }) => (
    <div className="mb-3">
      <label className="block text-xs font-medium text-gray-700 mb-1">
        {label}
      </label>
      <input
        type="text"
        value={value}
        onChange={onChange}
        className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
      />
    </div>
  );

  const ImageUploader = ({ label, imagePreview, onImageChange }) => {
    const fileInputRef = React.useRef(null);

    const handleClick = () => {
      fileInputRef.current.click();
    };

    const handleFileChange = (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          onImageChange(event.target.result);
        };
        reader.readAsDataURL(file);
      }
    };

    return (
      <div className="mb-3">
        <label className="block text-xs font-medium text-gray-700 mb-1">
          {label}
        </label>
        <input
          type="file"
          accept="image/*"
          className="hidden"
          ref={fileInputRef}
          onChange={handleFileChange}
        />
        <div
          onClick={handleClick}
          className="cursor-pointer border-2 border-dashed border-gray-300 rounded-lg p-2 flex flex-col items-center justify-center hover:border-blue-500 transition-colors"
        >
          {imagePreview ? (
            <div className="w-full flex flex-col items-center">
              <img
                src={imagePreview}
                alt="Preview"
                className="w-24 h-24 object-cover rounded-full mb-1 shadow-md"
              />
              <span className="text-xs text-blue-500">
                Click to change image
              </span>
            </div>
          ) : (
            <div className="flex flex-col items-center py-2">
              <Upload className="w-6 h-6 text-gray-400 mb-1" />
              <p className="text-xs text-gray-500">Click to upload image</p>
            </div>
          )}
        </div>
      </div>
    );
  };

  const DateRangePicker = ({
    startDate,
    endDate,
    onStartDateChange,
    onEndDateChange,
    isCurrentPosition,
  }) => {
    const [current, setCurrent] = useState(isCurrentPosition || false);

    const handleCurrentChange = (e) => {
      setCurrent(e.target.checked);
      if (e.target.checked) {
        onEndDateChange("Present");
      } else {
        onEndDateChange("");
      }
    };

    return (
      <div className="space-y-2">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Start Date
            </label>
            <div className="relative">
              <input
                type="date"
                value={startDate}
                onChange={(e) => onStartDateChange(e.target.value)}
                className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 pr-8"
              />
              <Calendar className="w-4 h-4 text-gray-400 absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              End Date
            </label>
            <div className="relative">
              <input
                type="date"
                value={current ? "" : endDate}
                onChange={(e) => onEndDateChange(e.target.value)}
                className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 pr-8"
                disabled={current}
              />
              <Calendar className="w-4 h-4 text-gray-400 absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none" />
            </div>
          </div>
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            id="current-position"
            checked={current}
            onChange={handleCurrentChange}
            className="h-3 w-3 text-blue-500 focus:ring-blue-500 border-gray-300 rounded cursor-pointer"
          />
          <label
            htmlFor="current-position"
            className="ml-2 text-xs text-gray-700 cursor-pointer"
          >
            I currently work here
          </label>
        </div>
      </div>
    );
  };

  const formatDateRange = (startDate, endDate) => {
    if (!startDate) return "";

    try {
      const formatDate = (dateString) => {
        if (!dateString) return "";
        if (dateString === "Present") return "Present";

        try {
          const date = new Date(dateString);
          if (isNaN(date.getTime())) return dateString; // If date is invalid, return the original string
          
          return date.toLocaleDateString("en-US", {
            month: "short",
            year: "numeric",
          });
        } catch (err) {
          console.error("Error formatting date:", err);
          return dateString; // Return original string if formatting fails
        }
      };

      return `${formatDate(startDate)} - ${formatDate(endDate || "Present")}`;
    } catch (err) {
      console.error("Error in formatDateRange:", err);
      return startDate && endDate ? `${startDate} - ${endDate}` : startDate || "";
    }
  };

  const ExperienceForm = ({ experience, onSubmit, onCancel }) => {
    const [formData, setFormData] = useState(
      experience || {
        title: "",
        company: "",
        type: "",
        startDate: "",
        endDate: "",
        location: "",
        description: "",
        logo: "",
      }
    );

    return (
      <form
        onSubmit={(e) => onSubmit(e, formData)}
        className="space-y-4 p-4 w-full bg-white rounded-lg shadow-sm"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <ImageUploader
              label="Company Logo"
              imagePreview={formData.logo}
              onImageChange={(imageData) =>
                setFormData({ ...formData, logo: imageData })
              }
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Job Title
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="e.g. Software Engineer"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Company
            </label>
            <input
              type="text"
              value={formData.company}
              onChange={(e) =>
                setFormData({ ...formData, company: e.target.value })
              }
              className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="e.g. Google"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Type
            </label>
            <select
              value={formData.type}
              onChange={(e) =>
                setFormData({ ...formData, type: e.target.value })
              }
              className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 cursor-pointer"
            >
              <option value="">Select Job Type</option>
              <option>Full-Time</option>
              <option>Part-Time</option>
              <option>Contract</option>
              <option>Freelance</option>
              <option>Internship</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Location
            </label>
            <input
              type="text"
              value={formData.location}
              onChange={(e) =>
                setFormData({ ...formData, location: e.target.value })
              }
              className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="e.g. San Francisco, CA (Remote)"
              required
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Duration
            </label>
            <DateRangePicker
              startDate={formData.startDate}
              endDate={formData.endDate}
              onStartDateChange={(date) =>
                setFormData({ ...formData, startDate: date })
              }
              onEndDateChange={(date) =>
                setFormData({ ...formData, endDate: date })
              }
              isCurrentPosition={formData.endDate === "Present"}
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              rows={3}
              placeholder="Describe your responsibilities and achievements"
              required
            />
          </div>
        </div>

        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={onCancel}
            className="px-3 py-1.5 text-xs text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-3 py-1.5 text-xs bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors cursor-pointer"
          >
            Save
          </button>
        </div>
      </form>
    );
  };

  const EducationForm = ({ education, onSubmit, onCancel }) => {
    const [formData, setFormData] = useState(
      education || {
        school: "",
        degree: "",
        startDate: "",
        endDate: "",
        description: "",
        logo: "",
        link: "",
      }
    );

    return (
      <form
        onSubmit={(e) => onSubmit(e, formData)}
        className="space-y-4 p-4 w-full bg-white rounded-lg shadow-sm"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <ImageUploader
              label="School Logo"
              imagePreview={formData.logo}
              onImageChange={(imageData) =>
                setFormData({ ...formData, logo: imageData })
              }
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              School
            </label>
            <input
              type="text"
              value={formData.school}
              onChange={(e) =>
                setFormData({ ...formData, school: e.target.value })
              }
              className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="e.g. Stanford University"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Degree
            </label>
            <input
              type="text"
              value={formData.degree}
              onChange={(e) =>
                setFormData({ ...formData, degree: e.target.value })
              }
              className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="e.g. Bachelor of Science in Computer Science"
              required
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Duration
            </label>
            <DateRangePicker
              startDate={formData.startDate}
              endDate={formData.endDate}
              onStartDateChange={(date) =>
                setFormData({ ...formData, startDate: date })
              }
              onEndDateChange={(date) =>
                setFormData({ ...formData, endDate: date })
              }
              isCurrentPosition={formData.endDate === "Present"}
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              rows={3}
              placeholder="Describe your course of study and achievements"
              required
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-xs font-medium text-gray-700 mb-1">
              School Website
            </label>
            <input
              type="url"
              value={formData.link}
              onChange={(e) =>
                setFormData({ ...formData, link: e.target.value })
              }
              className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="e.g. https://www.stanford.edu"
              required
            />
          </div>
        </div>

        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={onCancel}
            className="px-3 py-1.5 text-xs text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-3 py-1.5 text-xs bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors cursor-pointer"
          >
            Save
          </button>
        </div>
      </form>
    );
  };

  const ExperienceList = ({ experiences }) => {
    const [visibleCount, setVisibleCount] = useState(2);

    const handleShowMore = () => {
      setVisibleCount((prev) => Math.min(prev + 3, experiences.length));
    };

    const handleShowLess = () => {
      setVisibleCount(2);
    };

    if (isAddingExperience) {
      return (
        <div className="bg-white p-4 rounded-lg shadow-md w-full max-w-4xl mx-auto">
          <h1 className="text-xl font-bold text-gray-800 mb-4">
            Add Experience
          </h1>
          <ExperienceForm
            onSubmit={handleExperienceSubmit}
            onCancel={() => setIsAddingExperience(false)}
          />
        </div>
      );
    }

    if (editingExperience) {
      return (
        <div className="bg-white p-4 rounded-lg shadow-md w-full max-w-4xl mx-auto">
          <h1 className="text-xl font-bold text-gray-800 mb-4">
            Edit Experience
          </h1>
          <ExperienceForm
            experience={editingExperience}
            onSubmit={handleExperienceSubmit}
            onCancel={() => setEditingExperience(null)}
          />
        </div>
      );
    }

    return (
      <div className="bg-white p-4 rounded-lg shadow-md w-full">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-xl font-bold text-gray-800">Experiences</h1>
          <button
            onClick={() => setIsAddingExperience(true)}
            className="text-blue-600 text-xl font-semibold border border-gray-300 px-1.5 hover:bg-blue-100 transition cursor-pointer"
          >
            <span className="relative -top-0.5">+</span>
          </button>
        </div>

        {experiences.length === 0 ? (
          <div className="text-center py-6 bg-gray-50 rounded-lg border border-dashed border-gray-300">
            <p className="text-sm text-gray-500">
              No experiences added yet. Click the Add button to get started.
            </p>
          </div>
        ) : (
          <>
            {experiences.slice(0, visibleCount).map((exp) => (
              <div
                key={exp.id}
                className="py-4 first:pt-0 border-b border-gray-200 last:border-0"
              >
                <div className="flex justify-between items-start gap-4">
                  <div className="flex items-start gap-4">
                    <img
                      src={exp.logo}
                      alt={exp.company}
                      className="w-12 h-12 rounded-full shadow-md object-cover"
                    />
                    <div>
                      <h2 className="text-lg font-semibold text-gray-900">
                        {exp.title}
                      </h2>
                      <p className="text-gray-600 text-sm">
                        <span className="font-semibold">{exp.company}</span> •{" "}
                        {exp.type}
                      </p>
                      <p className="text-gray-500 text-xs">
                        {formatDateRange(exp.startDate, exp.endDate)} •{" "}
                        {exp.location}
                      </p>
                      <p className="text-gray-700 mt-2 text-sm leading-relaxed">
                        {exp.description}
                      </p>
                    </div>
                  </div>
                  <EditButton onClick={() => setEditingExperience(exp)} />
                </div>
              </div>
            ))}

            {visibleCount < experiences.length ? (
              <button
                onClick={handleShowMore}
                className="block text-blue-600 text-sm font-medium mt-4 mx-auto px-4 py-1 rounded-md hover:bg-blue-50 transition-colors cursor-pointer"
              >
                Show {Math.min(3, experiences.length - visibleCount)} more
                experiences
              </button>
            ) : (
              experiences.length > 2 && (
                <button
                  onClick={handleShowLess}
                  className="block text-blue-600 text-sm font-medium mt-4 mx-auto px-4 py-1 rounded-md hover:bg-blue-50 transition-colors cursor-pointer"
                >
                  Show less experiences
                </button>
              )
            )}
          </>
        )}
      </div>
    );
  };

  const EducationList = ({ educations }) => {
    const [visibleCount, setVisibleCount] = useState(2);

    const handleShowMore = () => {
      setVisibleCount((prev) => Math.min(prev + 2, educations.length));
    };

    const handleShowLess = () => {
      setVisibleCount(2);
    };

    if (isAddingEducation) {
      return (
        <div className="bg-white p-4 rounded-lg shadow-md w-full max-w-4xl mx-auto">
          <h1 className="text-xl font-bold text-gray-800 mb-4">
            Add Education
          </h1>
          <EducationForm
            onSubmit={handleEducationSubmit}
            onCancel={() => setIsAddingEducation(false)}
          />
        </div>
      );
    }

    if (editingEducation) {
      return (
        <div className="bg-white p-4 rounded-lg shadow-md w-full max-w-4xl mx-auto">
          <h1 className="text-xl font-bold text-gray-800 mb-4">
            Edit Education
          </h1>
          <EducationForm
            education={editingEducation}
            onSubmit={handleEducationSubmit}
            onCancel={() => setEditingEducation(null)}
          />
        </div>
      );
    }

    return (
      <div className="bg-white p-4 rounded-lg shadow-md w-full">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-xl font-bold text-gray-800">Education</h1>
          <button
            onClick={() => setIsAddingEducation(true)}
            className="text-blue-600 text-xl font-semibold border border-gray-300 px-1.5 hover:bg-blue-100 transition cursor-pointer"
          >
            <span className="relative -top-0.5">+</span>
          </button>
        </div>

        {educations.length === 0 ? (
          <div className="text-center py-6 bg-gray-50 rounded-lg border border-dashed border-gray-300">
            <p className="text-sm text-gray-500">
              No education entries added yet. Click the Add button to get
              started.
            </p>
          </div>
        ) : (
          <>
            {educations.slice(0, visibleCount).map((edu) => (
              <div
                key={edu.id}
                className="py-4 first:pt-0 border-b border-gray-200 last:border-0"
              >
                <div className="flex justify-between items-start gap-4">
                  <div className="flex items-start gap-4">
                    <img
                      src={edu.logo}
                      alt={edu.school}
                      className="w-12 h-12 rounded-full shadow-md object-cover"
                    />
                    <div>
                      <h2 className="text-lg font-semibold text-gray-900">
                        {edu.school}
                      </h2>
                      <p className="text-gray-600 text-sm">
                        <span className="font-semibold">{edu.degree}</span>
                      </p>
                      <p className="text-gray-500 text-xs">
                        {formatDateRange(edu.startDate, edu.endDate)}
                      </p>
                      <p className="text-gray-700 mt-2 text-sm leading-relaxed">
                        {edu.description}
                      </p>
                    </div>
                  </div>
                  <EditButton onClick={() => setEditingEducation(edu)} />
                </div>
              </div>
            ))}

            {visibleCount < educations.length ? (
              <button
                onClick={handleShowMore}
                className="block text-blue-600 text-sm font-medium mt-4 mx-auto px-4 py-1 rounded-md hover:bg-blue-50 transition-colors cursor-pointer"
              >
                Show {Math.min(2, educations.length - visibleCount)} more
                education entries
              </button>
            ) : (
              educations.length > 2 && (
                <button
                  onClick={handleShowLess}
                  className="block text-blue-600 text-sm font-medium mt-4 mx-auto px-4 py-1 rounded-md hover:bg-blue-50 transition-colors cursor-pointer"
                >
                  Show less education entries
                </button>
              )
            )}
          </>
        )}
      </div>
    );
  };

  const [portfolioItems, setPortfolioItems] = useState([
    {
      id: 1,
      title: "Clinically - clinic & health care website",
      image: "/api/placeholder/300/200",
    },
    {
      id: 2,
      title: "Growthly - SaaS Analytics & Sales Website",
      image: "/api/placeholder/300/200",
    },
    {
      id: 3,
      title: "Planna - Project Management App",
      image: "/api/placeholder/300/200",
    },
    {
      id: 4,
      title: "Funiro - furniture website",
      image: "/api/placeholder/300/200",
    },
  ]);

  const [activeIndex, setActiveIndex] = useState(0);
  const [translateX, setTranslateX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [currentTranslate, setCurrentTranslate] = useState(0);
  const containerRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const currentX = e.clientX;
    const diff = ((currentX - startX) / containerRef.current.offsetWidth) * 100;
    const newTranslate = currentTranslate + diff;

    if (
      newTranslate > 0 ||
      newTranslate < -((portfolioItems.length - 1) * 100)
    ) {
      const resistance = 0.3;
      if (newTranslate > 0) {
        setTranslateX(newTranslate * resistance);
      } else {
        const overScroll = newTranslate + (portfolioItems.length - 1) * 100;
        setTranslateX(
          -((portfolioItems.length - 1) * 100) + overScroll * resistance
        );
      }
    } else {
      setTranslateX(newTranslate);
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    const threshold = 15;

    if (Math.abs(translateX - currentTranslate) > threshold) {
      if (translateX < currentTranslate) {
        const nextIndex = Math.min(activeIndex + 1, portfolioItems.length - 1);
        setActiveIndex(nextIndex);
        setTranslateX(-(nextIndex * 100));
      } else {
        const prevIndex = Math.max(activeIndex - 1, 0);
        setActiveIndex(prevIndex);
        setTranslateX(-(prevIndex * 100));
      }
    } else {
      setTranslateX(-(activeIndex * 100));
    }
  };

  useEffect(() => {
    const handleGlobalMouseUp = () => {
      if (isDragging) {
        handleTouchEnd();
      }
    };

    const handleGlobalMouseMove = (e) => {
      if (isDragging) {
        handleMouseMove(e);
      }
    };

    window.addEventListener("mouseup", handleGlobalMouseUp);
    window.addEventListener("mousemove", handleGlobalMouseMove);

    return () => {
      window.removeEventListener("mouseup", handleGlobalMouseUp);
      window.removeEventListener("mousemove", handleGlobalMouseMove);
    };
  }, [isDragging, handleTouchEnd]);

  const [imageUrl, setImageUrl] = useState("/api/placeholder/800/200");
  const fileInputRef = useRef(null);

  const handleEditClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const newImageUrl = URL.createObjectURL(file);
      setImageUrl(newImageUrl);
    }
  };

  const [showAddModal, setShowAddModal] = useState(false);
  const [newPortfolio, setNewPortfolio] = useState({
    title: "",
    image: "/api/placeholder/300/200",
  });
  const [previewImage, setPreviewImage] = useState(null);
  const imageInputRef = useRef(null);

  const handleAddClick = () => {
    setShowAddModal(true);
    setPreviewImage(null);
  };

  const handleCloseModal = () => {
    setShowAddModal(false);
    setNewPortfolio({
      title: "",
      image: "/api/placeholder/300/200",
    });
    setPreviewImage(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPortfolio({
      ...newPortfolio,
      [name]: value,
    });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please upload an image file");
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      setPreviewImage(event.target.result);
      setNewPortfolio({
        ...newPortfolio,
        image: event.target.result,
      });
    };
    reader.readAsDataURL(file);
  };

  const handleImageClick = () => {
    imageInputRef.current.click();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newPortfolio.title.trim()) return;

    const newItem = {
      id: portfolioItems.length + 1,
      title: newPortfolio.title,
      image: previewImage || newPortfolio.image,
    };

    setPortfolioItems([...portfolioItems, newItem]);
    handleCloseModal();
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex flex-row flex-grow ">
        <div className="h-screen sticky top-0">
          <Sidebar />
        </div>
        <div className="flex-grow transition-all overflow-x-hidden">
          <div className="flex-grow overflow-y-auto">
            <Header />
            <div className="p-2">
              {loading ? (
                <div className="flex items-center justify-center h-64">
                  <Loader className="w-8 h-8 text-blue-500 animate-spin" />
                  <span className="ml-2 text-gray-600">Loading profile data...</span>
                </div>
              ) : error ? (
                <div className="flex items-center justify-center h-64 text-red-500 bg-red-50 p-4 rounded-md">
                  <AlertTriangle className="w-6 h-6 mr-2" />
                  <span>{error}</span>
                </div>
              ) : (
                <div className="flex">
                  <div className="w-3/4 p-2">
                    {/* Header Section */}
                    <div className="flex justify-between items-center">
                      <div className="w-full bg-white rounded-md overflow-hidden shadow-sm">
                        <div className="relative h-36 w-full">
                          <img
                            src={imageUrl}
                            alt="Banner"
                            className="w-full h-full object-cover"
                          />
                          <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleFileChange}
                            accept="image/*"
                            className="hidden"
                          />
                          <div
                            className="absolute top-2 right-2 text-white rounded p-1 cursor-pointer"
                            onClick={handleEditClick}
                          >
                            <EditButton />
                          </div>
                        </div>

                        <div className="px-4 pt-2 pb-4 relative">
                          <div className="absolute -top-8 left-4">
                            <div className="w-20 h-20 rounded-full bg-blue-500 border-4 border-white overflow-hidden">
                              <img
                                src="/api/placeholder/80/80"
                                alt="Profile"
                                className="object-cover w-full h-full"
                              />
                            </div>
                          </div>

                          {isEditingHeader ? (
                            <form onSubmit={handleHeaderSubmit} className="mt-14">
                              <EditableInput
                                label="Name"
                                value={profileData.name}
                                onChange={(e) =>
                                  setProfileData({
                                    ...profileData,
                                    name: e.target.value,
                                  })
                                }
                              />
                              <EditableInput
                                label="Title"
                                value={profileData.title}
                                onChange={(e) =>
                                  setProfileData({
                                    ...profileData,
                                    title: e.target.value,
                                  })
                                }
                              />
                              <EditableInput
                                label="Location"
                                value={profileData.location}
                                onChange={(e) =>
                                  setProfileData({
                                    ...profileData,
                                    location: e.target.value,
                                  })
                                }
                              />
                              <div className="flex justify-end gap-2">
                                <button
                                  type="button"
                                  onClick={() => setIsEditingHeader(false)}
                                  className="px-3 py-1.5 text-xs text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50 cursor-pointer"
                                >
                                  Cancel
                                </button>
                                <button
                                  type="submit"
                                  disabled={saveLoading}
                                  className={`px-3 py-1.5 text-xs bg-blue-500 text-white rounded-md hover:bg-blue-600 cursor-pointer ${saveLoading ? 'opacity-70' : ''}`}
                                >
                                  {saveLoading ? (
                                    <div className="flex items-center">
                                      <Loader className="w-3 h-3 mr-1 animate-spin" />
                                      Saving...
                                    </div>
                                  ) : "Save"}
                                </button>
                              </div>
                              {saveError && (
                                <div className="mt-2 text-xs text-red-500 bg-red-50 p-2 rounded">
                                  {saveError}
                                </div>
                              )}
                              {userUpdated && (
                                <div className="mt-2 text-xs text-green-500 bg-green-50 p-2 rounded">
                                  Profile updated successfully
                                </div>
                              )}
                            </form>
                          ) : (
                            <div className="flex justify-between items-center ml-20">
                              <div>
                                <h1 className="text-xl font-bold text-gray-800">
                                  {profileData.name}
                                </h1>
                                <p className="text-sm text-gray-500 mt-1">
                                  {profileData.title}
                                </p>
                                <div className="flex items-center mt-1 text-gray-500 text-sm">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-3 w-3 mr-1"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth="2"
                                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                                    />
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth="2"
                                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                                    />
                                  </svg>
                                  <span>{profileData.location}</span>
                                </div>
                                <div className="flex items-center mt-2 px-2 py-0.5 bg-green-50 text-green-600 text-xs border border-green-200">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-3 w-3 mr-1"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                  >
                                    <path
                                      fillRule="evenodd"
                                      d="M3 6a3 3 0 013-3h10a1 1 0 01.8 1.6L14.25 8l2.55 3.4A1 1 0 0116 13H6a1 1 0 00-1 1v3a1 1 0 11-2 0V6z"
                                      clipRule="evenodd"
                                    />
                                  </svg>
                                  <span className="uppercase text-xs font-medium tracking-wide">
                                    {profileData.availability}
                                  </span>
                                </div>
                              </div>
                              <button
                                className="border border-blue-400 text-blue-500 px-3 py-0.5 text-sm hover:bg-blue-50 -mt-14 cursor-pointer"
                                onClick={() => setIsEditingHeader(true)}
                              >
                                Edit Profile
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* About Section */}
                    <div className="flex justify-between items-center mt-4">
                      <div className="bg-white shadow-sm rounded-md p-4 border border-gray-200 w-full">
                        {isEditingAbout ? (
                          <form onSubmit={handleAboutSubmit}>
                            <h2 className="text-lg font-bold text-gray-900 mb-3">
                              {profileData.about.title}
                            </h2>
                            <div className="mb-3">
                              <textarea
                                value={profileData.about.description}
                                onChange={(e) =>
                                  setProfileData({
                                    ...profileData,
                                    about: {
                                      ...profileData.about,
                                      description: e.target.value,
                                    },
                                  })
                                }
                                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 text-gray-700"
                                rows={4}
                                placeholder="Write something about yourself..."
                              />
                            </div>
                            <div className="flex justify-end gap-2">
                              <button
                                type="button"
                                onClick={() => setIsEditingAbout(false)}
                                className="px-3 py-1.5 text-xs text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50 cursor-pointer"
                              >
                                Cancel
                              </button>
                              <button
                                type="submit"
                                className="px-3 py-1.5 text-xs bg-blue-500 text-white rounded-md hover:bg-blue-600 cursor-pointer"
                              >
                                Save
                              </button>
                            </div>
                          </form>
                        ) : (
                          <>
                            <div className="flex justify-between items-center">
                              <h2 className="text-lg font-bold text-gray-900">
                                {profileData.about.title}
                              </h2>
                              <EditButton
                                onClick={() => setIsEditingAbout(true)}
                              />
                            </div>
                            <p className="text-sm text-gray-700 mt-3 leading-relaxed">
                              {profileData.about.description}
                            </p>
                            <p className="text-sm text-gray-600 mt-3 leading-relaxed">
                              {profileData.about.experience}
                            </p>
                          </>
                        )}
                      </div>
                    </div>

                    {/* Experience Section */}
                    <div className="flex justify-between items-center mt-4">
                      <ExperienceList experiences={experiencesData} />
                    </div>

                    {/* Education Section */}
                    <div className="flex justify-between items-center mt-4">
                      <EducationList educations={educationsData} />
                    </div>

                    {/* Skills Section */}
                    <div className="flex justify-between items-center mt-4 shadow-sm">
                      <div className="border border-gray-200 p-3 rounded-md w-full">
                        {isEditingSkills ? (
                          <form onSubmit={handleSkillsSubmit}>
                            <div className="mb-3">
                              <label className="block text-xs font-medium text-gray-700 mb-1">
                                Skills (comma-separated)
                              </label>
                              <input
                                type="text"
                                value={profileData.skills.join(", ")}
                                onChange={(e) =>
                                  setProfileData({
                                    ...profileData,
                                    skills: e.target.value
                                      .split(",")
                                      .map((skill) => skill.trim()),
                                  })
                                }
                                className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                              />
                            </div>
                            <div className="flex justify-end gap-2">
                              <button
                                type="button"
                                onClick={() => setIsEditingSkills(false)}
                                className="px-3 py-1.5 text-xs text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50 cursor-pointer"
                              >
                                Cancel
                              </button>
                              <button
                                type="submit"
                                className="px-3 py-1.5 text-xs bg-blue-500 text-white rounded-md hover:bg-blue-600 cursor-pointer"
                              >
                                Save
                              </button>
                            </div>
                          </form>
                        ) : (
                          <>
                            <div className="flex justify-between items-center mb-2">
                              <h2 className="text-lg font-semibold text-gray-900">
                                Skills
                              </h2>
                              <div className="flex gap-2">
                                <EditButton
                                  onClick={() => setIsEditingSkills(true)}
                                />
                              </div>
                            </div>
                            <div className="flex flex-wrap gap-2">
                              {profileData.skills.map((skill, index) => (
                                <span
                                  key={index}
                                  className="px-2 py-0.5 bg-blue-50 text-blue-600 rounded-md text-xs font-medium basis-[calc(25%-8px)] text-center"
                                >
                                  {skill}
                                </span>
                              ))}
                            </div>
                          </>
                        )}
                      </div>
                    </div>

                    {/* Portfolio Section */}
                    <div className="w-full max-w-4xl bg-white rounded-md shadow-sm mt-4 border border-gray-100 p-4 overflow-hidden">
                      <div className="flex justify-between items-center mb-4">
                        <h2 className="text-lg font-semibold text-gray-800">
                          Portfolios
                        </h2>
                        <button
                          onClick={handleAddClick}
                          className="text-blue-600 text-xl font-semibold border border-gray-300 px-1.5 hover:bg-blue-100 transition cursor-pointer"
                        >
                          <span className="relative -top-0.5">+</span>
                        </button>
                      </div>

                      <div className="relative overflow-hidden mb-4">
                        <div className="overflow-x-auto scrollbar-hide px-1">
                          <div className="flex transition-transform ease-out">
                            {portfolioItems.map((item) => (
                              <div
                                key={item.id}
                                className="w-48 mr-3 flex-shrink-0 select-none cursor-pointer"
                              >
                                <div className="bg-white rounded-md overflow-hidden shadow-sm mb-2 border border-gray-100 w-48">
                                  <img
                                    src={item.image}
                                    alt={item.title}
                                    className="w-full h-32 object-cover select-none"
                                    draggable="false"
                                  />
                                </div>
                                <p className="text-xs text-gray-700 font-medium mb-1 text-center">
                                  {item.title}
                                </p>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Add Portfolio Modal */}
                    {showAddModal && (
                      <div className="fixed inset-0 bg-white/30 backdrop-blur-md flex items-center justify-center z-50">
                        <div className="bg-white rounded-md p-4 w-full max-w-sm">
                          <div className="flex justify-between items-center mb-3">
                            <h3 className="text-md font-semibold">
                              Add New Portfolio
                            </h3>
                            <button
                              onClick={handleCloseModal}
                              className="text-gray-500 hover:text-gray-700 cursor-pointer"
                            >
                              ✕
                            </button>
                          </div>

                          <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                              <label className="block text-gray-700 text-xs font-medium mb-1">
                                Portfolio Title
                              </label>
                              <input
                                type="text"
                                name="title"
                                value={newPortfolio.title}
                                onChange={handleInputChange}
                                className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                                placeholder="Enter portfolio title"
                                required
                              />
                            </div>

                            <div className="mb-4">
                              <label className="block text-gray-700 text-xs font-medium mb-1">
                                Portfolio Image
                              </label>
                              <div
                                onClick={handleImageClick}
                                className="border-2 border-dashed border-gray-300 rounded-md p-3 text-center cursor-pointer hover:border-blue-500 transition"
                              >
                                {previewImage ? (
                                  <div className="relative">
                                    <img
                                      src={previewImage}
                                      alt="Preview"
                                      className="max-h-40 mx-auto rounded"
                                    />
                                    <p className="text-xs text-gray-500 mt-1">
                                      Click to change image
                                    </p>
                                  </div>
                                ) : (
                                  <div className="py-6">
                                    <svg
                                      className="mx-auto h-8 w-8 text-gray-400"
                                      stroke="currentColor"
                                      fill="none"
                                      viewBox="0 0 48 48"
                                    >
                                      <path
                                        d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                      />
                                    </svg>
                                    <p className="mt-1 text-xs text-gray-600">
                                      Click to upload an image
                                    </p>
                                    <p className="mt-1 text-2xs text-gray-500">
                                      PNG, JPG, GIF up to 10MB
                                    </p>
                                  </div>
                                )}
                                <input
                                  ref={imageInputRef}
                                  type="file"
                                  accept="image/*"
                                  className="hidden"
                                  onChange={handleImageUpload}
                                />
                              </div>
                            </div>

                            <div className="flex justify-end space-x-2">
                              <button
                                type="button"
                                onClick={handleCloseModal}
                                className="px-3 py-1.5 text-xs text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 cursor-pointer"
                              >
                                Cancel
                              </button>
                              <button
                                type="submit"
                                className="px-3 py-1.5 text-xs text-white bg-blue-600 rounded-md hover:bg-blue-700 cursor-pointer"
                              >
                                Add Portfolio
                              </button>
                            </div>
                          </form>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Right Sidebar */}
                  <div className="w-1/4 p-2">
                    {/* Additional Details Card */}
                    <div className="bg-white border border-gray-200 mb-3 shadow-sm overflow-hidden">
                      {isEditingDetails ? (
                        <div className="p-3">
                          <form onSubmit={handleDetailsSubmit}>
                            <EditableInput
                              label="Email"
                              value={profileData.details.email}
                              onChange={(e) =>
                                setProfileData({
                                  ...profileData,
                                  details: {
                                    ...profileData.details,
                                    email: e.target.value,
                                  },
                                })
                              }
                            />
                            <EditableInput
                              label="Phone"
                              value={profileData.details.phone}
                              onChange={(e) =>
                                setProfileData({
                                  ...profileData,
                                  details: {
                                    ...profileData.details,
                                    phone: e.target.value,
                                  },
                                })
                              }
                            />
                            <EditableInput
                              label="Languages"
                              value={profileData.details.languages}
                              onChange={(e) =>
                                setProfileData({
                                  ...profileData,
                                  details: {
                                    ...profileData.details,
                                    languages: e.target.value,
                                  },
                                })
                              }
                            />
                            <div className="flex justify-end gap-2">
                              <button
                                type="button"
                                onClick={() => setIsEditingDetails(false)}
                                className="px-3 py-1.5 text-xs text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50 cursor-pointer"
                              >
                                Cancel
                              </button>
                              <button
                                type="submit"
                                className="px-3 py-1.5 text-xs bg-blue-500 text-white rounded-md hover:bg-blue-600 cursor-pointer"
                              >
                                Save
                              </button>
                            </div>
                          </form>
                        </div>
                      ) : (
                        <>
                          <div className="flex justify-between items-center px-3 py-2">
                            <h2 className="font-medium text-sm text-gray-800">
                              Additional Details
                            </h2>
                            <EditButton
                              onClick={() => setIsEditingDetails(true)}
                            />
                          </div>
                          <div className="px-3 py-2">
                            <div className="flex mb-2">
                              <div className="w-5 mr-2 text-gray-400">
                                <svg
                                  width="16"
                                  height="16"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z"
                                    stroke="#9CA3AF"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                  <path
                                    d="M22 6L12 13L2 6"
                                    stroke="#9CA3AF"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                </svg>
                              </div>
                              <div>
                                <div className="text-xs text-gray-500 mb-0.5">
                                  Email
                                </div>
                                <div className="text-gray-800 text-xs">
                                  {profileData.details.email}
                                </div>
                              </div>
                            </div>

                            <div className="flex mb-2">
                              <div className="w-5 mr-2 text-gray-400">
                                <svg
                                  width="16"
                                  height="16"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M22 16.92V19.92C22.0011 20.1985 21.9441 20.4742 21.8325 20.7294C21.7209 20.9845 21.5573 21.2136 21.3521 21.4019C21.1468 21.5901 20.9046 21.7335 20.6407 21.8227C20.3769 21.9119 20.0974 21.9451 19.82 21.92C16.7428 21.5856 13.787 20.5341 11.19 18.85C8.77382 17.3147 6.72533 15.2662 5.18999 12.85C3.49997 10.2412 2.44824 7.27099 2.11999 4.18C2.09494 3.90363 2.12781 3.62452 2.2165 3.36136C2.3052 3.09821 2.44763 2.85666 2.63476 2.65162C2.82189 2.44657 3.04974 2.28271 3.30372 2.17052C3.55771 2.05833 3.83227 2.00026 4.10999 2H7.10999C7.5953 1.99522 8.06579 2.16708 8.43376 2.48353C8.80173 2.79999 9.04207 3.23945 9.10999 3.72C9.23662 4.68007 9.47144 5.62273 9.80999 6.53C9.94454 6.88792 9.97366 7.27691 9.8939 7.65088C9.81415 8.02485 9.62886 8.36811 9.35999 8.64L8.08999 9.91C9.51355 12.4135 11.5864 14.4864 14.09 15.91L15.36 14.64C15.6319 14.3711 15.9751 14.1858 16.3491 14.1061C16.7231 14.0263 17.1121 14.0555 17.47 14.19C18.3773 14.5286 19.3199 14.7634 20.28 14.89C20.7658 14.9585 21.2094 15.2032 21.5265 15.5775C21.8437 15.9518 22.0122 16.4296 22 16.92Z"
                                    stroke="#9CA3AF"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                </svg>
                              </div>
                              <div>
                                <div className="text-xs text-gray-500 mb-0.5">
                                  Phone
                                </div>
                                <div className="text-gray-800 text-xs">
                                  {profileData.details.phone}
                                </div>
                              </div>
                            </div>

                            <div className="flex">
                              <div className="w-5 mr-2 text-gray-400">
                                <svg
                                  width="16"
                                  height="16"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                                    stroke="#9CA3AF"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                  <path
                                    d="M2 12H22"
                                    stroke="#9CA3AF"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                  <path
                                    d="M12 2C14.5013 4.73835 15.9228 8.29203 16 12C15.9228 15.708 14.5013 19.2616 12 22C9.49872 19.2616 8.07725 15.708 8 12C8.07725 8.29203 9.49872 4.73835 12 2Z"
                                    stroke="#9CA3AF"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                </svg>
                              </div>
                              <div>
                                <div className="text-xs text-gray-500 mb-0.5">
                                  Languages
                                </div>
                                <div className="text-gray-800 text-xs">
                                  {profileData.details.languages}
                                </div>
                              </div>
                            </div>
                          </div>
                        </>
                      )}
                    </div>

                    {/* Social Links Card */}
                    <div className="bg-white border border-gray-200 mb-3 shadow-sm overflow-hidden">
                      {isEditingSocial ? (
                        <div className="p-3">
                          <form onSubmit={handleSocialSubmit}>
                            <EditableInput
                              label="Instagram"
                              value={profileData.social.instagram}
                              onChange={(e) =>
                                setProfileData({
                                  ...profileData,
                                  social: {
                                    ...profileData.social,
                                    instagram: e.target.value,
                                  },
                                })
                              }
                            />
                            <EditableInput
                              label="Twitter"
                              value={profileData.social.twitter}
                              onChange={(e) =>
                                setProfileData({
                                  ...profileData,
                                  social: {
                                    ...profileData.social,
                                    twitter: e.target.value,
                                  },
                                })
                              }
                            />
                            <EditableInput
                              label="Website"
                              value={profileData.social.website}
                              onChange={(e) =>
                                setProfileData({
                                  ...profileData,
                                  social: {
                                    ...profileData.social,
                                    website: e.target.value,
                                  },
                                })
                              }
                            />
                            <div className="flex justify-end gap-2">
                              <button
                                type="button"
                                onClick={() => setIsEditingSocial(false)}
                                className="px-3 py-1.5 text-xs text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50 cursor-pointer"
                              >
                                Cancel
                              </button>
                              <button
                                type="submit"
                                className="px-3 py-1.5 text-xs bg-blue-500 text-white rounded-md hover:bg-blue-600 cursor-pointer"
                              >
                                Save
                              </button>
                            </div>
                          </form>
                        </div>
                      ) : (
                        <>
                          <div className="flex justify-between items-center px-3 py-2">
                            <h2 className="font-medium text-sm text-gray-800">
                              Social Links
                            </h2>
                            <EditButton
                              onClick={() => setIsEditingSocial(true)}
                            />
                          </div>
                          <div className="px-3 py-2">
                            <div className="flex mb-2">
                              <div className="w-5 mr-2 text-gray-400">
                                <svg
                                  width="16"
                                  height="16"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M17 2H7C4.23858 2 2 4.23858 2 7V17C2 19.7614 4.23858 22 7 22H17C19.7614 22 22 19.7614 22 17V7C22 4.23858 19.7614 2 17 2Z"
                                    stroke="#9CA3AF"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                  <path
                                    d="M16 11.37C16.1234 12.2022 15.9813 13.0522 15.5938 13.799C15.2063 14.5458 14.5931 15.1514 13.8416 15.5297C13.0901 15.9079 12.2384 16.0396 11.4078 15.9059C10.5771 15.7723 9.80976 15.3801 9.21484 14.7852C8.61992 14.1902 8.22773 13.4229 8.09407 12.5922C7.9604 11.7615 8.09207 10.9099 8.47033 10.1584C8.84859 9.40685 9.45419 8.79374 10.201 8.40624C10.9478 8.01874 11.7978 7.87658 12.63 8C13.4789 8.12588 14.2649 8.52146 14.8717 9.1283C15.4785 9.73515 15.8741 10.5211 16 11.37Z"
                                    stroke="#9CA3AF"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                  <path
                                    d="M17.5 6.5H17.51"
                                    stroke="#9CA3AF"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                </svg>
                              </div>
                              <div>
                                <div className="text-xs text-gray-500 mb-0.5">
                                  Instagram
                                </div>
                                <a
                                  href={`https://${profileData.social.instagram}`}
                                  className="text-blue-500 text-xs cursor-pointer"
                                >
                                  {profileData.social.instagram}
                                </a>
                              </div>
                            </div>

                            <div className="flex mb-2">
                              <div className="w-5 mr-2 text-gray-400">
                                <svg
                                  width="16"
                                  height="16"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M23 3.00005C22.0424 3.67552 20.9821 4.19216 19.86 4.53005C19.2577 3.83756 18.4573 3.34674 17.567 3.12397C16.6767 2.90121 15.7395 2.95724 14.8821 3.2845C14.0247 3.61176 13.2884 4.19445 12.773 4.95376C12.2575 5.71308 11.9877 6.61238 12 7.53005V8.53005C10.2426 8.57561 8.50127 8.18586 6.93101 7.39549C5.36074 6.60513 4.01032 5.43868 3 4.00005C3 4.00005 -1 13 8 17C5.94053 18.398 3.48716 19.099 1 19C10 24 21 19 21 7.50005C20.9991 7.2215 20.9723 6.94364 20.92 6.67005C21.9406 5.66354 22.6608 4.39276 23 3.00005Z"
                                    stroke="#9CA3AF"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                </svg>
                              </div>
                              <div>
                                <div className="text-xs text-gray-500 mb-0.5">
                                  Twitter
                                </div>
                                <a
                                  href={`https://${profileData.social.twitter}`}
                                  className="text-blue-500 text-xs cursor-pointer"
                                >
                                  {profileData.social.twitter}
                                </a>
                              </div>
                            </div>

                            <div className="flex">
                              <div className="w-5 mr-2 text-gray-400">
                                <svg
                                  width="16"
                                  height="16"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                                    stroke="#9CA3AF"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                  <path
                                    d="M2 12H22"
                                    stroke="#9CA3AF"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                  <path
                                    d="M12 2C14.5013 4.73835 15.9228 8.29203 16 12C15.9228 15.708 14.5013 19.2616 12 22C9.49872 19.2616 8.07725 15.708 8 12C8.07725 8.29203 9.49872 4.73835 12 2Z"
                                    stroke="#9CA3AF"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                </svg>
                              </div>
                              <div>
                                <div className="text-xs text-gray-500 mb-0.5">
                                  Website
                                </div>
                                <a
                                  href={`https://${profileData.social.website}`}
                                  className="text-blue-500 text-xs cursor-pointer"
                                >
                                  {profileData.social.website}
                                </a>
                              </div>
                            </div>
                          </div>
                        </>
                      )}
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
}

export default Profile;
