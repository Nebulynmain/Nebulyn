import React, { useState, useRef, useEffect } from "react";
import { Instagram, Linkedin, Twitter, Github, Facebook } from "lucide-react";
import axios from "axios";
import { API_URL } from "../../App";
import {
  Heart,
  Waves,
  BookOpen,
  Users,
  Coffee,
  Bus,
  Eye,
  Settings,
  Flame,
  MapPin,
  Building,
  Plus,
  Trophy,
  DollarSign,
  GraduationCap,
  Home,
  Dumbbell,
  Utensils,
  Bike,
  Edit,
  Trash,
  X,
  Check,
  Loader,
  AlertTriangle,
  Link,
} from "lucide-react";
import Sidebar from "./Sidebar";
import Header from "./Header";

const getFlagURL = (countryName) => {
  const countryCodes = {
    Afghanistan: "af",
    Albania: "al",
    Algeria: "dz",
    Andorra: "ad",
    Angola: "ao",
    Argentina: "ar",
    Armenia: "am",
    Australia: "au",
    Austria: "at",
    Azerbaijan: "az",
    Bahamas: "bs",
    Bahrain: "bh",
    Bangladesh: "bd",
    Barbados: "bb",
    Belarus: "by",
    Belgium: "be",
    Belize: "bz",
    Benin: "bj",
    Bhutan: "bt",
    Bolivia: "bo",
    "Bosnia and Herzegovina": "ba",
    Botswana: "bw",
    Brazil: "br",
    Brunei: "bn",
    Bulgaria: "bg",
    "Burkina Faso": "bf",
    Burundi: "bi",
    Cambodia: "kh",
    Cameroon: "cm",
    Canada: "ca",
    "Central African Republic": "cf",
    Chad: "td",
    Chile: "cl",
    China: "cn",
    Colombia: "co",
    Comoros: "km",
    Congo: "cg",
    "Costa Rica": "cr",
    Croatia: "hr",
    Cuba: "cu",
    Cyprus: "cy",
    "Czech Republic": "cz",
    Denmark: "dk",
    Djibouti: "dj",
    Dominica: "dm",
    "Dominican Republic": "do",
    Ecuador: "ec",
    Egypt: "eg",
    "El Salvador": "sv",
    England: "gb-eng",
    "Equatorial Guinea": "gq",
    Eritrea: "er",
    Estonia: "ee",
    Eswatini: "sz",
    Ethiopia: "et",
    Fiji: "fj",
    Finland: "fi",
    France: "fr",
    Gabon: "ga",
    Gambia: "gm",
    Georgia: "ge",
    Germany: "de",
    Ghana: "gh",
    Greece: "gr",
    Guatemala: "gt",
    Guinea: "gn",
    Haiti: "ht",
    Honduras: "hn",
    Hungary: "hu",
    Iceland: "is",
    India: "in",
    Indonesia: "id",
    Iran: "ir",
    Iraq: "iq",
    Ireland: "ie",
    Israel: "il",
    Italy: "it",
    Jamaica: "jm",
    Japan: "jp",
    Jordan: "jo",
    Kazakhstan: "kz",
    Kenya: "ke",
    Kuwait: "kw",
    Laos: "la",
    Latvia: "lv",
    Lebanon: "lb",
    Libya: "ly",
    Lithuania: "lt",
    Luxembourg: "lu",
    Madagascar: "mg",
    Malaysia: "my",
    Maldives: "mv",
    Mali: "ml",
    Malta: "mt",
    Mauritius: "mu",
    Mexico: "mx",
    Monaco: "mc",
    Mongolia: "mn",
    Montenegro: "me",
    Morocco: "ma",
    Mozambique: "mz",
    Myanmar: "mm",
    Namibia: "na",
    Nepal: "np",
    Netherlands: "nl",
    "New Zealand": "nz",
    Nicaragua: "ni",
    Niger: "ne",
    Nigeria: "ng",
    "North Korea": "kp",
    "North Macedonia": "mk",
    Norway: "no",
    Oman: "om",
    Pakistan: "pk",
    Palestine: "ps",
    Panama: "pa",
    "Papua New Guinea": "pg",
    Paraguay: "py",
    Peru: "pe",
    Philippines: "ph",
    Poland: "pl",
    Portugal: "pt",
    Qatar: "qa",
    Romania: "ro",
    Russia: "ru",
    Rwanda: "rw",
    "Saudi Arabia": "sa",
    Scotland: "gb-sct",
    Senegal: "sn",
    Serbia: "rs",
    Seychelles: "sc",
    "Sierra Leone": "sl",
    Singapore: "sg",
    Slovakia: "sk",
    Slovenia: "si",
    Somalia: "so",
    "South Africa": "za",
    "South Korea": "kr",
    "South Sudan": "ss",
    Spain: "es",
    "Sri Lanka": "lk",
    Sudan: "sd",
    Sweden: "se",
    Switzerland: "ch",
    Syria: "sy",
    Taiwan: "tw",
    Tajikistan: "tj",
    Tanzania: "tz",
    Thailand: "th",
    Tunisia: "tn",
    Turkey: "tr",
    Uganda: "ug",
    Ukraine: "ua",
    "United Arab Emirates": "ae",
    "United Kingdom": "gb",
    "United States": "us",
    Uruguay: "uy",
    Uzbekistan: "uz",
    "Vatican City": "va",
    Venezuela: "ve",
    Vietnam: "vn",
    Wales: "gb-wls",
    Yemen: "ye",
    Zambia: "zm",
    Zimbabwe: "zw",
  };

  const code = countryCodes[countryName] || "un"; // Default flag (unknown)
  return `https://flagcdn.com/w40/${code}.png`;
};

const BenefitIcons = {
  Heart: <Heart size={28} strokeWidth={1.5} className="text-blue-500" />,
  Waves: <Waves size={28} strokeWidth={1.5} className="text-blue-500" />,
  BookOpen: <BookOpen size={28} strokeWidth={1.5} className="text-blue-500" />,
  Users: <Users size={28} strokeWidth={1.5} className="text-blue-500" />,
  Coffee: <Coffee size={28} strokeWidth={1.5} className="text-blue-500" />,
  Bus: <Bus size={28} strokeWidth={1.5} className="text-blue-500" />,
  Trophy: <Trophy size={28} strokeWidth={1.5} className="text-blue-500" />,
  DollarSign: (
    <DollarSign size={28} strokeWidth={1.5} className="text-blue-500" />
  ),
  GraduationCap: (
    <GraduationCap size={28} strokeWidth={1.5} className="text-blue-500" />
  ),
  Home: <Home size={28} strokeWidth={1.5} className="text-blue-500" />,
  Dumbbell: <Dumbbell size={28} strokeWidth={1.5} className="text-blue-500" />,
  Utensils: <Utensils size={28} strokeWidth={1.5} className="text-blue-500" />,
  Bike: <Bike size={28} strokeWidth={1.5} className="text-blue-500" />,
};

// Toast Notification Component
const Toast = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onClose]);

  const bgColor = type === "success" ? "bg-green-500" : "bg-red-500";

  return (
    <div
      className={`fixed top-4 right-4 flex items-center ${bgColor} text-white px-4 py-2 rounded-md shadow-lg z-50`}
    >
      {type === "success" ? (
        <Check className="w-5 h-5 mr-2" />
      ) : (
        <AlertTriangle className="w-5 h-5 mr-2" />
      )}
      <p>{message}</p>
      <button onClick={onClose} className="ml-3 text-white hover:text-gray-200">
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};

const Profile = () => {
  // API-related states
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [company, setCompany] = useState(null);
  const [companyId, setCompanyId] = useState(null);

  // Toast notification state
  const [toast, setToast] = useState({
    visible: false,
    message: "",
    type: "success",
  });

  // Show toast function
  const showToast = (message, type = "success") => {
    setToast({ visible: true, message, type });
  };

  // Hide toast function
  const hideToast = () => {
    setToast({ ...toast, visible: false });
  };

  // State for editable content
  const [companyInfo, setCompanyInfo] = useState({
    name: "",
    website: "",
    founded: "",
    employees: "",
    location: "",
    industry: "",
    description: "",
  });

  const [socialLinks, setSocialLinks] = useState({
    twitter: "",
    facebook: "",
    linkedin: "",
    email: "",
  });

  const [techItems, setTechItems] = useState([]);
  const [locations, setLocations] = useState([]);
  const [benefits, setBenefits] = useState([]);
  const [teamMembers, setTeamMembers] = useState([]);
  const [jobs, setJobs] = useState([]);

  // Fetch company data
  useEffect(() => {
    const fetchCompanyData = async () => {
      setLoading(true);
      setError(null);

      try {
        // Get company data
        const response = await axios.get(
          `${API_URL}/company/get-company-by-user`,
          {
            withCredentials: true,
          }
        );

        if (
          response.data &&
          response.data.ok &&
          response.data.data &&
          response.data.data.length > 0
        ) {
          const companyData = response.data.data[0];
          setCompany(companyData);
          setCompanyId(companyData._id);

          // Set logo if available
          if (companyData.companyLogo) {
            setLogoImage(companyData.companyLogo);
          }

          // Update company info
          setCompanyInfo({
            name: companyData.companyName || "",
            website: companyData.websiteLink || "",
            founded: companyData.foundedOn
              ? new Date(companyData.foundedOn).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })
              : "",
            employees: companyData.employees
              ? companyData.employees.toString()
              : "",
            location:
              companyData.locations && companyData.locations.length > 0
                ? companyData.locations.join(", ")
                : "",
            industry: companyData.industry || "",
            description: companyData.description || "",
          });

          // Update tech stack
          if (companyData.techStack && companyData.techStack.length > 0) {
            const tech = companyData.techStack.map((item, index) => {
              // Generate a random color for the tech
              const randomColor =
                "#" + Math.floor(Math.random() * 16777215).toString(16);
              return {
                name: item,
                color: randomColor,
                logo: item.substring(0, 2).toUpperCase(),
              };
            });
            setTechItems(tech);
          }

          // Update locations
          if (companyData.locations && companyData.locations.length > 0) {
            const locs = companyData.locations.map((loc) => ({
              name: loc,
              logo: getFlagURL(loc),
            }));
            setLocations(locs);
          }

          // Update benefits
          if (companyData.benefits && companyData.benefits.length > 0) {
            const benefitsData = companyData.benefits.map((benefit, index) => {
              // Get a random icon from BenefitIcons
              const iconKeys = Object.keys(BenefitIcons);
              const randomIcon =
                BenefitIcons[iconKeys[index % iconKeys.length]];

              return {
                icon: randomIcon,
                title: benefit.title || "",
                description: benefit.description || "",
              };
            });
            setBenefits(benefitsData);
          }

          // Update team members
          if (companyData.teamMembers && companyData.teamMembers.length > 0) {
            const team = companyData.teamMembers.map((member) => {
              const socialLinks = [];

              if (member.linkedInLink) {
                socialLinks.push({
                  platform: "LinkedIn",
                  url: member.linkedInLink,
                });
              }

              if (member.instagramLink) {
                socialLinks.push({
                  platform: "Instagram",
                  url: member.instagramLink,
                });
              }

              return {
                name: member.name || "",
                role: member.role || "",
                image:
                  member.pic || "https://source.unsplash.com/100x100/?person",
                socialLinks: socialLinks,
              };
            });
            setTeamMembers(team);
          }

          // Get jobs from dashboard stats API
          try {
            const statsResponse = await axios.get(
              `${API_URL}/company/dashboard-stats`,
              {
                withCredentials: true,
              }
            );

            if (
              statsResponse.data &&
              statsResponse.data.ok &&
              statsResponse.data.data
            ) {
              const jobsData = statsResponse.data.data.jobs.list || [];

              // Format jobs data for display
              const formattedJobs = jobsData.map((job) => ({
                title: job.title,
                company: companyData.companyName,
                location:
                  companyData.locations && companyData.locations.length > 0
                    ? companyData.locations[0]
                    : "Main Office",
                jobType: job.jobType,
                categories: [job.jobType],
                logo:
                  companyData.companyLogo || "https://via.placeholder.com/40",
              }));

              setJobs(formattedJobs);
            }
          } catch (jobsError) {
            console.error("Error fetching jobs data:", jobsError);
          }
        } else {
          throw new Error(response.data?.message || "No company data found");
        }
      } catch (err) {
        console.error("Error fetching company data:", err);
        setError(err.message || "Failed to load company data");
      } finally {
        setLoading(false);
      }
    };

    fetchCompanyData();
  }, []);

  // State for edit modes
  const fileInputRef = useRef(null);
  const [logoImage, setLogoImage] = useState("/logo.png"); // Default logo path
  // State for storing original data when editing (for cancel functionality)
  const [originalInfo, setOriginalInfo] = useState({});

  const [editModes, setEditModes] = useState({
    logo: false,
    companyInfo: false,
    contact: false,
    workingAt: false,
    team: false,
    benefits: false,
    techStack: false,
    locations: false,
  });

  // Toggle edit mode for different sections
  const toggleEditMode = (section) => {
    setEditModes((prev) => {
      const isEnteringEditMode = !prev[section];

      if (isEnteringEditMode) {
        // Save original data before entering edit mode
        if (section === "companyInfo") {
          setOriginalInfo({ ...companyInfo });
        } else if (section === "benefits") {
          setOriginalBenefits([...benefits]); // Store original benefits before editing
        } else if (section === "team") {
          setOriginalTeam([...teamMembers]); // Store original team before editing
        }
      } else {
        // Restore original data if canceling edit mode
        if (section === "companyInfo" && !saveWasClicked) {
          setCompanyInfo({ ...originalInfo });
        } else if (section === "benefits" && !saveWasClicked) {
          setBenefits([...originalBenefits]); // Restore original benefits if canceling
        } else if (section === "team" && !saveWasClicked) {
          setTeamMembers([...originalTeam]); // Restore original team if canceling
        }
      }

      // Reset save click tracker
      setSaveWasClicked(false);

      return {
        ...prev,
        [section]: isEnteringEditMode, // Toggle edit mode
      };
    });

    // If toggling logo edit mode to true, open file selector
    if (section === "logo" && !editModes.logo && fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  // Add this state to track if Save was clicked
  const [saveWasClicked, setSaveWasClicked] = useState(false);
  const [saving, setSaving] = useState(false);

  // Handle image selection
  const handleImageChange = async (e) => {
    if (!companyId) {
      showToast(
        "Company ID not found. Please refresh the page and try again.",
        "error"
      );
      return;
    }

    const file = e.target.files[0];
    if (!file) return;

    // Show local preview first
    const reader = new FileReader();
    reader.onload = (event) => {
      setLogoImage(event.target.result);
    };
    reader.readAsDataURL(file);

    // Set loading state
    setSaving(true);

    // Upload to backend
    try {
      const formData = new FormData();
      formData.append("file", file);

      console.log("Uploading image for company ID:", companyId);

      const response = await axios.post(
        `${API_URL}/company/image/${companyId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );

      if (response.data && response.data.ok) {
        // Update state with new logo URL
        setLogoImage(response.data.data.companyLogo);
        showToast("Company logo updated successfully!", "success");
      } else {
        throw new Error(response.data?.message || "Failed to upload image");
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      showToast("Failed to upload image. Please try again.", "error");
    } finally {
      // Close edit mode after handling image
      setSaving(false);
      setEditModes((prev) => ({
        ...prev,
        logo: false,
      }));
    }
  };

  // Save company info
  const saveCompanyInfo = async () => {
    if (!companyId) return;

    setSaveWasClicked(true);
    setSaving(true);

    try {
      // Format the data according to the backend model
      const updatedData = {
        companyName: companyInfo.name,
        websiteLink: companyInfo.website,
        employees: parseInt(companyInfo.employees) || 1,
        industry: companyInfo.industry,
        description: companyInfo.description,
        // Format foundedOn as a date if it exists
        ...(companyInfo.founded && {
          foundedOn: new Date(companyInfo.founded),
        }),
      };

      // Update locations from the location string
      if (companyInfo.location) {
        updatedData.locations = companyInfo.location
          .split(",")
          .map((loc) => loc.trim());
      }

      const response = await axios.post(
        `${API_URL}/company/update-company/${companyId}`,
        updatedData,
        {
          withCredentials: true,
        }
      );

      if (response.data && response.data.ok) {
        // Update local state with the response data
        setCompany(response.data.data);
        showToast("Company information saved successfully!", "success");
      } else {
        throw new Error(
          response.data?.message || "Failed to update company info"
        );
      }
    } catch (error) {
      console.error("Error saving company info:", error);
      showToast(
        "Failed to save company information. Please try again.",
        "error"
      );
    } finally {
      setSaving(false);
      setEditModes((prev) => ({
        ...prev,
        companyInfo: false,
        companyProfile: false,
      }));
    }
  };

  // Handler for adding new items
  const handleAddItem = async (section) => {
    if (!companyId) return;

    setEditModes((prev) => ({ ...prev, [section]: true }));

    switch (section) {
      case "techStack": {
        const newTech = {
          name: `New Tech ${techItems.length + 1}`,
          color: "#000000",
          logo: "NT",
        };
        setTechItems((prev) => [...prev, newTech]);

        // Update backend
        try {
          const updatedTechStack = [
            ...(company?.techStack || []),
            newTech.name,
          ];

          const response = await axios.post(
            `${API_URL}/company/update-company/${companyId}`,
            { techStack: updatedTechStack },
            { withCredentials: true }
          );

          if (response.data && response.data.ok) {
            setCompany(response.data.data);
            showToast("New technology added successfully!", "success");
          }
        } catch (error) {
          console.error("Error updating tech stack:", error);
          showToast("Failed to add new technology.", "error");
        }
        break;
      }

      case "locations": {
        const newLocationName = `New Location ${locations.length + 1}`;
        const newLocation = {
          name: newLocationName,
          logo: getFlagURL(newLocationName),
        };
        setLocations((prev) => [...prev, newLocation]);

        // Update backend
        try {
          const updatedLocations = [
            ...(company?.locations || []),
            newLocationName,
          ];

          const response = await axios.post(
            `${API_URL}/company/update-company/${companyId}`,
            { locations: updatedLocations },
            { withCredentials: true }
          );

          if (response.data && response.data.ok) {
            setCompany(response.data.data);
            showToast("New location added successfully!", "success");
          }
        } catch (error) {
          console.error("Error updating locations:", error);
          showToast("Failed to add new location.", "error");
        }
        break;
      }

      case "benefits": {
        const newBenefit = {
          icon: getRandomBenefitIcon(),
          title: `New Benefit ${benefits.length + 1}`,
          description: "Description of the new benefit",
        };
        setBenefits((prev) => [...prev, newBenefit]);

        // Update backend
        try {
          const updatedBenefits = [
            ...(company?.benefits || []),
            { title: newBenefit.title, description: newBenefit.description },
          ];

          const response = await axios.post(
            `${API_URL}/company/update-company/${companyId}`,
            { benefits: updatedBenefits },
            { withCredentials: true }
          );

          if (response.data && response.data.ok) {
            setCompany(response.data.data);
            showToast("New benefit added successfully!", "success");
          }
        } catch (error) {
          console.error("Error updating benefits:", error);
          showToast("Failed to add new benefit.", "error");
        }
        break;
      }

      case "team": {
        const newTeamMember = {
          name: `New Team Member ${teamMembers.length + 1}`,
          role: "Role",
          image: "https://via.placeholder.com/100",
          socialLinks: [],
        };
        setTeamMembers((prev) => [...prev, newTeamMember]);

        // Update backend
        try {
          const updatedTeamMembers = [
            ...(company?.teamMembers || []),
            {
              name: newTeamMember.name,
              role: newTeamMember.role,
              pic: newTeamMember.image,
            },
          ];

          const response = await axios.post(
            `${API_URL}/company/update-company/${companyId}`,
            { teamMembers: updatedTeamMembers },
            { withCredentials: true }
          );

          if (response.data && response.data.ok) {
            setCompany(response.data.data);
            showToast("New team member added successfully!", "success");
          }
        } catch (error) {
          console.error("Error updating team members:", error);
          showToast("Failed to add new team member.", "error");
        }
        break;
      }

      default:
        console.warn(`Unhandled section: ${section}`);
        break;
    }
  };

  // Handler for updating company info
  const handleCompanyInfoUpdate = (field, value) => {
    setCompanyInfo((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Handler for updating social links
  const handleSocialLinkUpdate = (platform, value) => {
    setSocialLinks((prev) => ({
      ...prev,
      [platform]: value,
    }));
  };

  // State variables
  const [showAddSocialForm, setShowAddSocialForm] = useState(false);
  const [newSocialPlatform, setNewSocialPlatform] = useState("");
  const [newSocialLink, setNewSocialLink] = useState("");

  // Function to add new social link
  const handleAddSocialLink = () => {
    if (newSocialPlatform && newSocialLink) {
      setSocialLinks((prev) => ({
        ...prev,
        [newSocialPlatform]: newSocialLink,
      }));
      // Reset form
      setNewSocialPlatform("");
      setNewSocialLink("");
      setShowAddSocialForm(false);
    }
  };

  useEffect(() => {
    if (!editModes.companyInfo) {
      console.log("Updated company info:", companyInfo);
    }
  }, [editModes.companyInfo]); // Runs when edit mode changes

  const [originalBenefits, setOriginalBenefits] = useState([]);

  // Function to save benefits
  const saveBenefits = async () => {
    if (!companyId) return;

    setSaveWasClicked(true);
    setSaving(true);

    try {
      // Format the benefits data for the backend
      const formattedBenefits = benefits.map((benefit) => ({
        title: benefit.title,
        description: benefit.description,
      }));

      const response = await axios.post(
        `${API_URL}/company/update-company/${companyId}`,
        { benefits: formattedBenefits },
        { withCredentials: true }
      );

      if (response.data && response.data.ok) {
        setCompany(response.data.data);
        showToast("Benefits updated successfully!", "success");
      } else {
        throw new Error(response.data?.message || "Failed to update benefits");
      }
    } catch (error) {
      console.error("Error saving benefits:", error);
      showToast("Failed to save benefits. Please try again.", "error");
    } finally {
      setSaving(false);
      setEditModes((prev) => ({
        ...prev,
        benefits: false,
      }));
    }
  };

  // Function to get a random benefit icon dynamically
  const getRandomBenefitIcon = () => {
    const iconsArray = Object.values(BenefitIcons); // Get all icons as an array
    return iconsArray[Math.floor(Math.random() * iconsArray.length)]; // Pick a random one
  };

  const handleRemoveBenefit = async (index) => {
    if (!companyId) return;

    try {
      // Update local state
      setBenefits((prev) => prev.filter((_, i) => i !== index));

      // Update backend
      const updatedBenefits = [...benefits];
      updatedBenefits.splice(index, 1);

      const formattedBenefits = updatedBenefits.map((benefit) => ({
        title: benefit.title,
        description: benefit.description,
      }));

      const response = await axios.post(
        `${API_URL}/company/update-company/${companyId}`,
        { benefits: formattedBenefits },
        { withCredentials: true }
      );

      if (response.data && response.data.ok) {
        setCompany(response.data.data);
        showToast("Benefit removed successfully", "success");
      } else {
        throw new Error(response.data?.message || "Failed to update benefits");
      }
    } catch (error) {
      console.error("Error removing benefit:", error);
      showToast("Failed to remove benefit", "error");
    }
  };

  const [originalTeam, setOriginalTeam] = useState([]);

  const handleEditChange = (index, field, value) => {
    setTeamMembers((prev) => {
      const newTeam = [...prev];
      newTeam[index][field] = value;
      return newTeam;
    });
  };

  const removeSocialLink = (index, linkIndex) => {
    setTeamMembers((prev) => {
      const newTeam = [...prev];
      newTeam[index].socialLinks.splice(linkIndex, 1);
      return newTeam;
    });
  };

  const handleSocialLinkChange = (index, linkIndex, field, value) => {
    setTeamMembers((prev) => {
      const newTeam = [...prev];
      newTeam[index].socialLinks[linkIndex][field] = value;
      return newTeam;
    });
  };

  const handleImageUpload = async (event, index) => {
    if (!companyId) return;

    const file = event.target.files[0];
    if (!file) return;

    // Show local preview first
    const reader = new FileReader();
    reader.onloadend = () => {
      setTeamMembers((prev) => {
        const newTeam = [...prev];
        newTeam[index].image = reader.result; // Store base64 image data
        return newTeam;
      });
    };
    reader.readAsDataURL(file);

    // Upload to backend would go here, but for team members we'll save all at once
  };

  // Add this function to render social icons based on platform name
  const renderSocialIcon = (platform) => {
    switch (platform) {
      case "LinkedIn":
        return <Linkedin size={20} />;
      case "Twitter":
        return <Twitter size={20} />;
      case "Facebook":
        return <Facebook size={20} />;
      case "Instagram":
        return <Instagram size={20} />;
      case "GitHub":
        return <Github size={20} />;
      default:
        return <Link size={20} />;
    }
  };

  // Function to handle removing a team member
  const handleRemoveTeamMember = async (index) => {
    if (!companyId) return;

    try {
      // Update local state
      const newTeamMembers = [...teamMembers];
      newTeamMembers.splice(index, 1);
      setTeamMembers(newTeamMembers);

      // Format for backend
      const formattedTeamMembers = newTeamMembers.map((member) => ({
        name: member.name,
        role: member.role,
        pic: member.image,
        linkedInLink:
          member.socialLinks.find((link) => link.platform === "LinkedIn")
            ?.url || "",
        instagramLink:
          member.socialLinks.find((link) => link.platform === "Instagram")
            ?.url || "",
      }));

      // Update backend
      const response = await axios.post(
        `${API_URL}/company/update-company/${companyId}`,
        { teamMembers: formattedTeamMembers },
        { withCredentials: true }
      );

      if (response.data && response.data.ok) {
        setCompany(response.data.data);
        showToast("Team member removed successfully", "success");
      } else {
        throw new Error(
          response.data?.message || "Failed to update team members"
        );
      }
    } catch (error) {
      console.error("Error removing team member:", error);
      showToast("Failed to remove team member", "error");
    }
  };

  // Function to add a new social link
  const addSocialLink = (memberIndex) => {
    const newTeamMembers = [...teamMembers];

    // Initialize socialLinks array if it doesn't exist
    if (!newTeamMembers[memberIndex].socialLinks) {
      newTeamMembers[memberIndex].socialLinks = [];
    }

    newTeamMembers[memberIndex].socialLinks.push({
      platform: "",
      url: "",
    });

    setTeamMembers(newTeamMembers);
  };

  // Function to save team members with proper state update
  const saveTeamMembers = async () => {
    if (!companyId) return;

    setSaveWasClicked(true);
    setSaving(true);

    try {
      // Format team members for the backend
      const formattedTeamMembers = teamMembers.map((member) => ({
        name: member.name,
        role: member.role,
        pic: member.image,
        linkedInLink:
          member.socialLinks.find((link) => link.platform === "LinkedIn")
            ?.url || "",
        instagramLink:
          member.socialLinks.find((link) => link.platform === "Instagram")
            ?.url || "",
      }));

      const response = await axios.post(
        `${API_URL}/company/update-company/${companyId}`,
        { teamMembers: formattedTeamMembers },
        { withCredentials: true }
      );

      if (response.data && response.data.ok) {
        setCompany(response.data.data);
        setOriginalTeam(JSON.parse(JSON.stringify(teamMembers)));
        showToast("Team members updated successfully!", "success");
      } else {
        throw new Error(
          response.data?.message || "Failed to update team members"
        );
      }
    } catch (error) {
      console.error("Error saving team members:", error);
      showToast("Failed to save team members. Please try again.", "error");
    } finally {
      setSaving(false);
      toggleEditMode("team");
    }
  };

  // Add this for save buttons to show loading state
  const SaveButton = ({ onClick, isLoading, text = "Save" }) => (
    <button
      onClick={onClick}
      disabled={isLoading}
      className={`flex items-center px-3 py-1 rounded-md text-sm ${
        isLoading
          ? "bg-gray-300 text-gray-500"
          : "bg-blue-500 text-white hover:bg-blue-600"
      } transition-colors`}
    >
      {isLoading ? (
        <>
          <Loader size={14} className="animate-spin mr-1" />
          Saving...
        </>
      ) : (
        text
      )}
    </button>
  );

  // Cancel button component for consistency
  const CancelButton = ({ onClick }) => (
    <button
      onClick={onClick}
      className="border border-gray-300 px-3 py-1 rounded-md text-sm text-gray-700 hover:bg-gray-100 transition-colors"
    >
      Cancel
    </button>
  );

  // Edit button component for consistency
  const EditButton = ({ onClick, text = "Edit" }) => (
    <button
      onClick={onClick}
      className="border border-blue-500 px-3 py-1 rounded-md text-sm text-blue-500 hover:bg-blue-50 transition-colors"
    >
      {text}
    </button>
  );

  return (
    <div className="flex flex-col min-h-screen">
      {/* Toast notification */}
      {toast.visible && (
        <Toast message={toast.message} type={toast.type} onClose={hideToast} />
      )}

      <div className="flex flex-row flex-grow">
        <div className="h-screen sticky top-0">
          <Sidebar />
        </div>
        <div className="flex-grow transition-all">
          <Header />

          {loading ? (
            <div className="flex justify-center items-center h-screen">
              <div className="flex flex-col items-center">
                <Loader className="w-10 h-10 text-blue-500 animate-spin" />
                <p className="mt-4 text-gray-600">Loading company profile...</p>
              </div>
            </div>
          ) : error ? (
            <div className="flex justify-center items-center h-screen">
              <div className="bg-red-50 p-4 rounded-lg max-w-md">
                <div className="flex items-center">
                  <AlertTriangle className="w-6 h-6 text-red-500 mr-2" />
                  <h3 className="text-red-800 font-medium">
                    Error loading profile
                  </h3>
                </div>
                <p className="text-red-600 mt-2">{error}</p>
                <button
                  onClick={() => window.location.reload()}
                  className="mt-3 bg-white border border-red-500 text-red-500 px-3 py-1 rounded-md hover:bg-red-50"
                >
                  Try Again
                </button>
              </div>
            </div>
          ) : (
            <div className="">
              {/* Company Info Section */}
              <div className="flex justify-between items-center py-4 px-6">
                <div className="flex items-center gap-4 flex-grow">
                  <div className="relative flex-shrink-0">
                    <div className="bg-gray-100 p-2 rounded-xl">
                      {logoImage ? (
                        <img
                          src={logoImage}
                          alt="Company Logo"
                          className="w-16 h-16 rounded-lg object-cover cursor-pointer"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src =
                              "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23ccc'%3E%3Cpath d='M21 13.2V20a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v9.2zM11 17H7v2h4v-2zm6 0h-4v2h4v-2zm-6-3H7v2h4v-2zm6 0h-4v2h4v-2zm-6-3H7v2h4v-2zm6 0h-4v2h4v-2z'/%3E%3C/svg%3E";
                          }}
                        />
                      ) : (
                        <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center">
                          <span className="text-blue-500 text-2xl font-bold">
                            {companyInfo.name.charAt(0)}
                          </span>
                        </div>
                      )}
                    </div>

                    <button
                      onClick={() => {
                        if (!saving) {
                          toggleEditMode("logo");
                          fileInputRef.current.click();
                        }
                      }}
                      className={`absolute top-0 left-0 bg-white p-1 rounded-md shadow-sm border border-gray-300 hover:bg-gray-200 cursor-pointer ${
                        saving ? "opacity-50" : ""
                      }`}
                      disabled={saving}
                    >
                      {saving ? (
                        <Loader
                          size={14}
                          className="text-blue-500 animate-spin"
                        />
                      ) : (
                        <Edit size={14} className="text-blue-500" />
                      )}
                    </button>

                    {/* Hidden file input for image selection */}
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleImageChange}
                      accept="image/*"
                      className="hidden cursor-pointer"
                    />
                  </div>

                  <div>
                    {editModes.companyInfo ? (
                      <div className="space-y-1">
                        <input
                          type="text"
                          value={companyInfo.name}
                          onChange={(e) =>
                            handleCompanyInfoUpdate("name", e.target.value)
                          }
                          className="text-2xl font-bold text-gray-800 focus:outline-none cursor-pointer"
                        />
                        <input
                          type="text"
                          value={companyInfo.website}
                          onChange={(e) =>
                            handleCompanyInfoUpdate("website", e.target.value)
                          }
                          className="text-blue-500 text-sm focus:outline-none w-full cursor-pointer"
                        />
                      </div>
                    ) : (
                      <>
                        <h2 className="text-2xl font-bold text-gray-800 cursor-pointer">
                          {companyInfo.name}
                        </h2>
                        <a
                          href={companyInfo.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-500 text-sm cursor-pointer"
                        >
                          {companyInfo.website}
                        </a>
                      </>
                    )}

                    <div className="flex flex-wrap gap-4 mt-2 text-sm text-gray-600">
                      {/* Founded */}
                      <div className="flex items-center gap-1 cursor-pointer">
                        <Users className="w-4 h-4 text-blue-500" />
                        <div>
                          <span className="text-gray-500">Founded</span>
                          {editModes.companyInfo ? (
                            <input
                              type="date"
                              defaultValue="2011-07-31"
                              onChange={(e) => {
                                const date = new Date(e.target.value);
                                const formattedDate = date.toLocaleDateString(
                                  "en-US",
                                  {
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                  }
                                );
                                handleCompanyInfoUpdate(
                                  "founded",
                                  formattedDate
                                );
                              }}
                              className="font-semibold block w-full focus:outline-none cursor-pointer text-sm"
                            />
                          ) : (
                            <p className="font-semibold text-sm">
                              {companyInfo.founded || "Not specified"}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Employees */}
                      <div className="flex items-center gap-1 cursor-pointer">
                        <Users className="w-4 h-4 text-blue-500" />
                        <div>
                          <span className="text-gray-500">Employees</span>
                          {editModes.companyInfo ? (
                            <input
                              type="text"
                              value={companyInfo.employees}
                              onChange={(e) =>
                                handleCompanyInfoUpdate(
                                  "employees",
                                  e.target.value
                                )
                              }
                              className="font-semibold block w-full focus:outline-none cursor-pointer text-sm"
                            />
                          ) : (
                            <p className="font-semibold text-sm">
                              {companyInfo.employees || "Not specified"}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Location */}
                      <div className="flex items-center gap-1 cursor-pointer">
                        <MapPin className="w-4 h-4 text-blue-500" />
                        <div>
                          <span className="text-gray-500">Location</span>
                          {editModes.companyInfo ? (
                            <input
                              type="text"
                              value={companyInfo.location}
                              onChange={(e) =>
                                handleCompanyInfoUpdate(
                                  "location",
                                  e.target.value
                                )
                              }
                              className="font-semibold block w-full focus:outline-none cursor-pointer text-sm"
                            />
                          ) : (
                            <p className="font-semibold text-sm">
                              {companyInfo.location || "Not specified"}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Industry */}
                      <div className="flex items-center gap-1 cursor-pointer">
                        <Building className="w-4 h-4 text-blue-500" />
                        <div>
                          <span className="text-gray-500">Industry</span>
                          {editModes.companyInfo ? (
                            <input
                              type="text"
                              value={companyInfo.industry}
                              onChange={(e) =>
                                handleCompanyInfoUpdate(
                                  "industry",
                                  e.target.value
                                )
                              }
                              className="font-semibold block w-full focus:outline-none cursor-pointer text-sm"
                            />
                          ) : (
                            <p className="font-semibold text-sm">
                              {companyInfo.industry || "Not specified"}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  {editModes.companyInfo ? (
                    <div className="flex space-x-2">
                      <SaveButton
                        onClick={saveCompanyInfo}
                        isLoading={saving}
                      />
                      <CancelButton
                        onClick={() => toggleEditMode("companyInfo")}
                      />
                    </div>
                  ) : (
                    <EditButton onClick={() => toggleEditMode("companyInfo")} />
                  )}
                </div>
              </div>

              {/* About Section */}
              <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-5 m-5">
                <div className="flex justify-between items-center mb-3">
                  <h2 className="text-xl font-bold text-gray-900">About</h2>
                  {editModes.companyInfo ? (
                    <div className="flex space-x-2">
                      <SaveButton
                        onClick={saveCompanyInfo}
                        isLoading={saving}
                      />
                      <CancelButton
                        onClick={() => toggleEditMode("companyInfo")}
                      />
                    </div>
                  ) : (
                    <EditButton onClick={() => toggleEditMode("companyInfo")} />
                  )}
                </div>

                <div className="text-gray-600">
                  {editModes.companyInfo ? (
                    <textarea
                      value={companyInfo.description}
                      onChange={(e) =>
                        handleCompanyInfoUpdate("description", e.target.value)
                      }
                      className="w-full min-h-[120px] p-2 text-gray-700 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 cursor-pointer"
                    />
                  ) : (
                    <p className="cursor-pointer">
                      {companyInfo.description ||
                        "No company description provided. Click Edit to add a description."}
                    </p>
                  )}
                </div>
              </div>

              {/* Main Content Area */}
              <div className="flex p-4">
                {/* Left Column */}
                <div className="w-3/4 p-3 bg-white space-y-4">
                  {/* Company Profile Section */}
                  <section>
                    <div className="flex justify-between items-center">
                      <h1 className="font-bold text-xl cursor-pointer">
                        Company Profile
                      </h1>
                      {!editModes.companyProfile && (
                        <button
                          onClick={() => toggleEditMode("companyProfile")}
                          className="text-blue-500 w-8 h-8 flex items-center justify-center border border-gray-300 rounded-md cursor-pointer"
                        >
                          <Edit size={14} />
                        </button>
                      )}
                    </div>

                    {editModes.companyProfile ? (
                      <div>
                        <textarea
                          value={companyInfo.description}
                          onChange={(e) =>
                            handleCompanyInfoUpdate(
                              "description",
                              e.target.value
                            )
                          }
                          className="w-full mt-1 p-2 border rounded cursor-pointer text-sm"
                          rows={4}
                        />
                        <div className="flex justify-end mt-1 space-x-1">
                          <button
                            onClick={() => toggleEditMode("companyProfile")}
                            className="px-3 py-1 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 cursor-pointer text-sm"
                          >
                            Cancel
                          </button>
                          <button
                            onClick={saveCompanyInfo}
                            className="flex items-center justify-center gap-1 h-8 px-3 py-1 text-white bg-blue-500 border rounded-sm text-sm hover:bg-blue-600 cursor-pointer"
                          >
                            <Check className="w-4 h-4" /> Save
                          </button>
                        </div>
                      </div>
                    ) : (
                      <p className="text-gray-600 mt-1 text-sm cursor-pointer">
                        {companyInfo.description}
                      </p>
                    )}
                  </section>

                  {/* Contact Section */}
                  <section>
                    <div className="flex justify-between items-center">
                      <h1 className="font-bold text-xl cursor-pointer">
                        Contact
                      </h1>
                      <div className="flex gap-1">
                        <button
                          onClick={() => setShowAddSocialForm(true)}
                          className="text-blue-600 text-xl font-semibold border border-gray-300 px-1 py-1 rounded-md cursor-pointer"
                        >
                          <Plus size={16} />
                        </button>
                        <button
                          onClick={() => toggleEditMode("contact")}
                          className="text-blue-500 w-8 h-8 flex items-center justify-center border border-gray-300 rounded-md cursor-pointer"
                        >
                          <Edit size={14} />
                        </button>
                      </div>
                    </div>

                    {/* Form to add new social link */}
                    {showAddSocialForm && (
                      <div className="mt-2 p-2 border border-gray-200 rounded-md">
                        <div className="flex flex-col gap-1 mb-2">
                          <label className="text-xs text-gray-600 cursor-pointer">
                            Platform
                          </label>
                          <select
                            value={newSocialPlatform}
                            onChange={(e) =>
                              setNewSocialPlatform(e.target.value)
                            }
                            className="border rounded px-2 py-1 cursor-pointer text-sm"
                          >
                            <option value="">Select Platform</option>
                            <option value="linkedin">LinkedIn</option>
                            <option value="instagram">Instagram</option>
                            <option value="twitter">Twitter</option>
                            <option value="github">GitHub</option>
                            <option value="facebook">Facebook</option>
                          </select>
                        </div>
                        <div className="flex flex-col gap-1 mb-2">
                          <label className="text-xs text-gray-600 cursor-pointer">
                            URL
                          </label>
                          <input
                            type="text"
                            value={newSocialLink}
                            onChange={(e) => setNewSocialLink(e.target.value)}
                            placeholder="e.g. linkedin.com/in/username"
                            className="border rounded px-2 py-1 cursor-pointer text-sm"
                          />
                        </div>
                        <div className="flex gap-1 justify-end">
                          <button
                            onClick={() => setShowAddSocialForm(false)}
                            className="border border-gray-300 px-2 py-1 rounded-md cursor-pointer text-sm"
                          >
                            Cancel
                          </button>
                          <button
                            onClick={handleAddSocialLink}
                            className="bg-blue-500 text-white px-2 py-1 rounded-md cursor-pointer text-sm"
                            disabled={!newSocialPlatform || !newSocialLink}
                          >
                            Add
                          </button>
                        </div>
                      </div>
                    )}

                    <div className="flex flex-wrap gap-2 mt-2">
                      {Object.entries(socialLinks).map(([platform, link]) =>
                        editModes.contact ? (
                          <input
                            key={platform}
                            type="text"
                            value={link}
                            onChange={(e) =>
                              handleSocialLinkUpdate(platform, e.target.value)
                            }
                            className="border rounded px-2 py-1 cursor-pointer text-sm"
                          />
                        ) : (
                          <a
                            key={platform}
                            href={`https://${link}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center border border-blue-400 rounded-md px-2 py-1 text-blue-500 text-xs cursor-pointer"
                          >
                            {platform === "linkedin" && (
                              <Linkedin size={14} className="mr-1" />
                            )}
                            {platform === "instagram" && (
                              <Instagram size={14} className="mr-1" />
                            )}
                            {platform === "twitter" && (
                              <Twitter size={14} className="mr-1" />
                            )}
                            {platform === "github" && (
                              <Github size={14} className="mr-1" />
                            )}
                            {platform === "facebook" && (
                              <Facebook size={14} className="mr-1" />
                            )}
                            {link}
                          </a>
                        )
                      )}
                    </div>
                  </section>

                  {/* Benefits Section */}
                  <section>
                    <div className="flex justify-between items-center">
                      <h1 className="font-bold text-xl cursor-pointer">
                        Benefits
                      </h1>
                      {editModes.benefits ? (
                        <div className="flex justify-end mt-2 space-x-2">
                          <SaveButton
                            onClick={saveBenefits}
                            isLoading={saving}
                          />
                          <CancelButton
                            onClick={() => toggleEditMode("benefits")}
                          />
                        </div>
                      ) : (
                        <div className="flex gap-1">
                          <button
                            onClick={() => handleAddItem("benefits")}
                            className="text-blue-600 text-xl font-semibold border border-gray-300 px-1 py-1 rounded-md cursor-pointer"
                          >
                            <Plus size={16} />
                          </button>
                          <EditButton
                            onClick={() => toggleEditMode("benefits")}
                            text=""
                          />
                        </div>
                      )}
                    </div>

                    <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {benefits.map((benefit, index) => (
                        <div
                          key={index}
                          className="flex flex-col space-y-2 relative cursor-pointer"
                        >
                          <div className="w-12 h-12 flex items-center justify-center bg-blue-100 rounded-lg">
                            {benefit.icon}
                          </div>
                          {editModes.benefits ? (
                            <>
                              <input
                                type="text"
                                value={benefit.title}
                                onChange={(e) => {
                                  const newBenefits = [...benefits];
                                  newBenefits[index].title = e.target.value;
                                  setBenefits(newBenefits);
                                }}
                                className="font-bold text-sm border rounded px-1 cursor-pointer"
                              />
                              <textarea
                                value={benefit.description}
                                onChange={(e) => {
                                  const newBenefits = [...benefits];
                                  newBenefits[index].description =
                                    e.target.value;
                                  setBenefits(newBenefits);
                                }}
                                className="text-gray-500 text-xs border rounded p-1 cursor-pointer"
                                rows={2}
                              />
                            </>
                          ) : (
                            <>
                              <h2 className="font-bold text-sm cursor-pointer">
                                {benefit.title}
                              </h2>
                              <p className="text-gray-500 text-xs cursor-pointer">
                                {benefit.description}
                              </p>
                            </>
                          )}

                          {/* Delete Button (Only visible in edit mode) */}
                          {editModes.benefits && (
                            <button
                              onClick={() => handleRemoveBenefit(index)}
                              className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center hover:bg-red-600 cursor-pointer"
                            >
                              <Trash size={12} />
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                  </section>

                  {/* Team Section */}
                  <section>
                    <div className="flex justify-between items-center">
                      <h1 className="font-bold text-xl cursor-pointer">Team</h1>
                      {!editModes.team ? (
                        <div className="flex gap-1">
                          <button
                            onClick={() => handleAddItem("team")}
                            className="text-blue-600 text-xl font-semibold border border-gray-300 px-1 py-1 rounded-md cursor-pointer"
                          >
                            <Plus size={16} />
                          </button>
                          <EditButton
                            onClick={() => toggleEditMode("team")}
                            text=""
                          />
                        </div>
                      ) : null}
                    </div>

                    <div className="mt-2 grid grid-cols-1 md:grid-cols-3 gap-2">
                      {teamMembers.map((member, index) => (
                        <div
                          key={index}
                          className="flex flex-col items-center p-2 border border-gray-300 rounded-lg relative cursor-pointer"
                        >
                          {/* Delete Button (Only visible in edit mode) */}
                          {editModes.team && (
                            <button
                              onClick={() => handleRemoveTeamMember(index)}
                              className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600 z-10 cursor-pointer"
                              type="button"
                            >
                              <Trash size={12} />
                            </button>
                          )}

                          {/* Profile Image Upload */}
                          <label className="relative cursor-pointer mb-2">
                            <div className="w-16 h-16 rounded-full border-2 border-gray-300 flex items-center justify-center overflow-hidden">
                              {member.image ? (
                                <img
                                  src={member.image}
                                  alt={member.name}
                                  className="w-full h-full object-cover"
                                />
                              ) : (
                                <User size={32} className="text-gray-400" />
                              )}
                            </div>
                            {editModes.team && (
                              <input
                                type="file"
                                accept="image/*"
                                className="absolute inset-0 opacity-0 cursor-pointer"
                                onChange={(e) => handleImageUpload(e, index)}
                              />
                            )}
                          </label>

                          {editModes.team ? (
                            <>
                              {/* Name Input */}
                              <input
                                type="text"
                                value={member.name || ""}
                                onChange={(e) =>
                                  handleEditChange(
                                    index,
                                    "name",
                                    e.target.value
                                  )
                                }
                                className="font-semibold text-center border rounded px-1 py-1 w-full mb-1 cursor-pointer text-sm"
                                placeholder="Name"
                              />

                              {/* Role Input */}
                              <input
                                type="text"
                                value={member.role || ""}
                                onChange={(e) =>
                                  handleEditChange(
                                    index,
                                    "role",
                                    e.target.value
                                  )
                                }
                                className="text-gray-500 text-xs text-center border rounded px-1 py-1 w-full mb-2 cursor-pointer"
                                placeholder="Role"
                              />

                              {/* Dynamic Social Links */}
                              <div className="w-full space-y-1">
                                {(member.socialLinks || []).map(
                                  (link, linkIndex) => (
                                    <div
                                      key={linkIndex}
                                      className="flex items-center gap-1 w-full"
                                    >
                                      {/* Platform dropdown instead of text input */}
                                      <select
                                        value={link.platform || ""}
                                        onChange={(e) =>
                                          handleSocialLinkChange(
                                            index,
                                            linkIndex,
                                            "platform",
                                            e.target.value
                                          )
                                        }
                                        className="border rounded px-1 py-1 w-1/3 cursor-pointer text-xs"
                                      >
                                        <option value="">Select</option>
                                        <option value="LinkedIn">
                                          LinkedIn
                                        </option>
                                        <option value="Twitter">Twitter</option>
                                        <option value="Facebook">
                                          Facebook
                                        </option>
                                        <option value="Instagram">
                                          Instagram
                                        </option>
                                        <option value="GitHub">GitHub</option>
                                      </select>
                                      <input
                                        type="text"
                                        value={link.url || ""}
                                        onChange={(e) =>
                                          handleSocialLinkChange(
                                            index,
                                            linkIndex,
                                            "url",
                                            e.target.value
                                          )
                                        }
                                        className="border rounded px-1 py-1 flex-1 cursor-pointer text-xs"
                                        placeholder="URL"
                                      />
                                      <button
                                        onClick={() =>
                                          removeSocialLink(index, linkIndex)
                                        }
                                        className="bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center hover:bg-red-600 cursor-pointer"
                                        type="button"
                                      >
                                        <X size={12} />
                                      </button>
                                    </div>
                                  )
                                )}
                              </div>

                              {/* Add More Social Links Button */}
                              <button
                                onClick={() => addSocialLink(index)}
                                className="flex items-center justify-center gap-1 text-blue-600 mt-2 border border-blue-300 rounded-md px-2 py-1 hover:bg-blue-50 w-full cursor-pointer text-xs"
                                type="button"
                              >
                                <Plus size={12} /> Add Social Link
                              </button>
                            </>
                          ) : (
                            <>
                              <h2 className="font-semibold text-sm cursor-pointer">
                                {member.name}
                              </h2>
                              <p className="text-gray-500 text-xs mb-1 cursor-pointer">
                                {member.role}
                              </p>

                              {/* Social Links Display as Icons */}
                              <div className="flex flex-wrap justify-center gap-2 mt-1">
                                {(member.socialLinks || []).map(
                                  (link, linkIndex) => (
                                    <a
                                      key={linkIndex}
                                      href={link.url}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="text-gray-600 hover:text-blue-500 cursor-pointer"
                                      title={link.platform}
                                    >
                                      {renderSocialIcon(link.platform)}
                                    </a>
                                  )
                                )}
                              </div>
                            </>
                          )}
                        </div>
                      ))}
                    </div>

                    {/* Save Button (Only visible in edit mode) */}
                    {editModes.team && (
                      <div className="flex justify-end mt-4 space-x-2">
                        <SaveButton
                          onClick={saveTeamMembers}
                          isLoading={saving}
                        />
                        <CancelButton onClick={() => toggleEditMode("team")} />
                      </div>
                    )}
                  </section>

                  {/* Jobs Section */}
                  <section>
                    <div className="flex justify-between items-center">
                      <h1 className="font-bold text-xl cursor-pointer">
                        Open Positions
                      </h1>
                      <div className="text-blue-600 font-semibold text-sm cursor-pointer">
                        Show all jobs →
                      </div>
                    </div>

                    <div className="mt-2 space-y-2">
                      {jobs.map((job, index) => (
                        <div
                          key={index}
                          className="flex items-center p-2 border border-gray-200 rounded-lg shadow-sm bg-white hover:shadow-md transition cursor-pointer"
                        >
                          <img
                            src={job.logo}
                            alt={job.company}
                            className="w-10 h-10 mr-3"
                          />
                          <div className="flex-1">
                            <h2 className="font-semibold text-sm cursor-pointer">
                              {job.title}
                            </h2>
                            <p className="text-gray-500 text-xs cursor-pointer">
                              {job.company} • {job.location}
                            </p>
                            <div className="flex items-center gap-2 mt-1">
                              <span
                                className={`px-2 py-0.5 text-xs font-medium rounded-full ${
                                  job.jobType === "Full-Time"
                                    ? "bg-green-100 text-green-700"
                                    : "bg-purple-100 text-purple-700"
                                } cursor-pointer`}
                              >
                                {job.jobType}
                              </span>
                              <span className="w-px h-4 bg-gray-300"></span>
                              <div className="flex gap-1">
                                {job.categories.map((category, idx) => (
                                  <span
                                    key={idx}
                                    className={`px-2 py-0.5 text-xs font-medium rounded-full border ${
                                      category === "Marketing"
                                        ? "text-yellow-300 border-yellow-300"
                                        : "text-blue-400 border-blue-400"
                                    } cursor-pointer`}
                                  >
                                    {category}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </section>
                </div>

                {/* Right Column */}
                <div className="w-1/4 p-3">
                  {/* Tech Stack Section */}
                  {/* <section>
                  <div className="flex justify-between items-center mb-2">
                    <h2 className="text-xl font-bold text-gray-800 cursor-pointer">
                      Tech Stack
                    </h2>
                    <div className="flex gap-1">
                      <button
                        onClick={() => handleAddItem("techStack")}
                        className="text-blue-600 text-xl font-semibold border border-gray-300 px-1 py-1 rounded-md cursor-pointer"
                      >
                        <Plus size={16} />
                      </button>
                      <button
                        onClick={() => toggleEditMode("techStack")}
                        className="text-blue-500 w-8 h-8 flex items-center justify-center border border-gray-300 rounded-md cursor-pointer"
                      >
                        <Edit size={14} />
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-2 mb-2">
                    {techItems.map((item, index) => (
                      <div
                        key={index}
                        className="flex flex-col items-center cursor-pointer"
                      >
                        <div
                          className="w-12 h-12 rounded flex items-center justify-center mb-1"
                          style={{ backgroundColor: item.color }}
                        >
                          <span className="text-white font-bold text-sm">
                            {item.logo}
                          </span>
                        </div>
                        {editModes.techStack ? (
                          <input
                            type="text"
                            value={item.name}
                            onChange={(e) => {
                              const newTech = [...techItems];
                              newTech[index].name = e.target.value;
                              setTechItems(newTech);
                            }}
                            className="text-xs text-gray-700 border rounded px-1 text-center cursor-pointer"
                          />
                        ) : (
                          <span className="text-xs text-gray-700 cursor-pointer">
                            {item.name}
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </section> */}

                  {/* Locations Section */}
                  <section className="mt-4">
                    <div className="flex justify-between items-center mb-2">
                      <h2 className="text-lg font-bold text-gray-800 cursor-pointer">
                        Office Locations
                      </h2>
                      <div className="flex gap-1">
                        <button
                          onClick={() => handleAddItem("locations")}
                          className="text-blue-600 text-xl font-semibold border border-gray-300 px-1 py-1 rounded-md cursor-pointer"
                        >
                          <Plus size={16} />
                        </button>
                        <button
                          onClick={() => toggleEditMode("locations")}
                          className="text-blue-500 w-8 h-8 flex items-center justify-center border border-gray-300 rounded-md cursor-pointer"
                        >
                          <Edit size={14} />
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 gap-2 mb-2">
                      {locations.map((item, index) => (
                        <div
                          key={index}
                          className="flex items-center gap-2 cursor-pointer"
                        >
                          <img
                            src={getFlagURL(item.name)}
                            alt={item.name}
                            className="w-6 h-6"
                          />

                          {editModes.locations ? (
                            <input
                              type="text"
                              value={item.name}
                              onChange={(e) => {
                                const newLocations = [...locations];
                                newLocations[index].name = e.target.value;
                                newLocations[index].logo = getFlagURL(
                                  e.target.value
                                );
                                setLocations(newLocations);
                              }}
                              className="text-gray-800 font-medium border rounded px-1 text-sm cursor-pointer"
                            />
                          ) : (
                            <span className="text-gray-800 font-medium text-sm cursor-pointer">
                              {item.name}
                            </span>
                          )}

                          {/* Headquarter Selection */}
                          {editModes.locations && (
                            <input
                              type="radio"
                              name="headquarter"
                              checked={item.isHeadquarter}
                              onChange={() => {
                                const newLocations = locations.map(
                                  (loc, i) => ({
                                    ...loc,
                                    isHeadquarter: i === index,
                                  })
                                );
                                setLocations(newLocations);
                              }}
                              className="ml-1 cursor-pointer"
                            />
                          )}
                          {!editModes.locations && item.isHeadquarter && (
                            <span className="ml-1 px-1 py-0.5 text-xs bg-blue-100 text-blue-600 rounded-lg cursor-pointer">
                              Headquarter
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  </section>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
