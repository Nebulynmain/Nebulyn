import React, { useState, useRef, useEffect } from "react";
import { Instagram, Linkedin, Twitter, Github, Facebook } from "lucide-react";
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

const Profile = () => {
  // State for editable content
  const [companyInfo, setCompanyInfo] = useState({
    name: "Nomad",
    website: "https://nomad.com",
    founded: "July 31, 2011",
    employees: "4000+",
    location: "20 countries",
    industry: "Social & Non-Profit",
    description:
      "Nomad is a software platform for starting and running internet businesses. Millions of businesses rely on Stripe's software tools to accept payments, expand globally, and manage their businesses online. Stripe has been at the forefront of expanding internet commerce, powering new business models, and supporting the latest platforms, from marketplaces to mobile commerce sites.",
  });

  const [socialLinks, setSocialLinks] = useState({
    twitter: "twitter.com/Nomad",
    facebook: "facebook.com/NomadHQ",
    linkedin: "linkedin.com/company/nomad",
    email: "nomad@gmail.com",
  });

  const [techItems, setTechItems] = useState([
    { name: "HTML 5", color: "#E44D26", logo: "H5" },
    { name: "CSS 3", color: "#1572B6", logo: "C3" },
    { name: "JavaScript", color: "#F7DF1E", logo: "JS" },
    { name: "Ruby", color: "#CC342D", logo: "Rb" },
    { name: "Mixpanel", color: "#7B68EE", logo: "..." },
    { name: "Framer", color: "#000000", logo: "F" },
  ]);

  const [locations, setLocations] = useState([
    { name: "United States", logo: "https://flagcdn.com/w40/us.png" },
    { name: "England", logo: "https://flagcdn.com/w40/gb.png" },
    { name: "Japan", logo: "https://flagcdn.com/w40/jp.png" },
    { name: "Australia", logo: "https://flagcdn.com/w40/au.png" },
    { name: "China", logo: "https://flagcdn.com/w40/cn.png" },
  ]);

  const [benefits, setBenefits] = useState([
    {
      icon: <Heart size={28} strokeWidth={1.5} className="text-blue-500" />,
      title: "Full Healthcare",
      description:
        "We believe in thriving communities and that starts with our team being happy and healthy.",
    },
    {
      icon: <Waves size={28} strokeWidth={1.5} className="text-blue-500" />,
      title: "Unlimited Vacation",
      description:
        "We believe you should have a flexible schedule that makes space for family, wellness, and fun.",
    },
    {
      icon: <BookOpen size={28} strokeWidth={1.5} className="text-blue-500" />,
      title: "Skill Development",
      description:
        "We believe in always learning and leveling up our skills. Whether it's a conference or online course.",
    },
    {
      icon: <Users size={28} strokeWidth={1.5} className="text-blue-500" />,
      title: "Team Summits",
      description:
        "Every 6 months we have a full team summit where we have fun, reflect, and plan for the upcoming quarter.",
    },
    {
      icon: <Coffee size={28} strokeWidth={1.5} className="text-blue-500" />,
      title: "Remote Working",
      description:
        "You know how you perform best. Work from home, coffee shop, or anywhere when you feel like it.",
    },
    {
      icon: <Bus size={28} strokeWidth={1.5} className="text-blue-500" />,
      title: "Commuter Benefits",
      description:
        "We're grateful for all the time and energy each team member puts into getting to work every day.",
    },
  ]);

  const [teamMembers, setTeamMembers] = useState([
    {
      name: "Célestin Gardinier",
      role: "CEO & Co-Founder",
      image: "https://source.unsplash.com/100x100/?man",
      socialLinks: [
        { platform: "LinkedIn", url: "https://linkedin.com/in/celestin" },
        { platform: "Twitter", url: "https://twitter.com/celestin" },
      ],
    },
    {
      name: "Reynaud Colbert",
      role: "Co-Founder",
      image: "https://source.unsplash.com/100x100/?businessman",
      socialLinks: [
        { platform: "Instagram", url: "https://instagram.com/reynaud" },
        { platform: "Facebook", url: "https://facebook.com/reynaud" },
      ],
    },
    {
      name: "Arienne Lyon",
      role: "Managing Director",
      image: "https://source.unsplash.com/100x100/?woman",
      socialLinks: [
        { platform: "LinkedIn", url: "https://linkedin.com/in/arienne" },
        { platform: "GitHub", url: "https://github.com/arienne" },
      ],
    },
  ]);

  const [jobs, setJobs] = useState([
    {
      title: "Social Media Assistant",
      company: "Nomad",
      location: "Paris, France",
      jobType: "Full-Time",
      categories: ["Marketing", "Design"],
      logo: "https://via.placeholder.com/40",
    },
    {
      title: "Brand Designer",
      company: "Dropbox",
      location: "San Francisco, USA",
      jobType: "Part-Time",
      categories: ["Design"],
      logo: "https://via.placeholder.com/40",
    },
  ]);

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

  // Save company info
  const saveCompanyInfo = () => {
    setSaveWasClicked(true); // Track Save button click

    setCompanyInfo((prev) => ({
      ...prev,
      name: companyInfo.name,
      website: companyInfo.website,
      founded: companyInfo.founded,
      employees: companyInfo.employees,
      location: companyInfo.location,
      industry: companyInfo.industry,
      description: companyInfo.description,
    }));

    setTimeout(() => {
      setEditModes((prev) => ({
        ...prev,
        companyInfo: false, // Close edit mode
        companyProfile: false,
      }));
    }, 100);
  };

  // Handle image selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setLogoImage(event.target.result);
      };
      reader.readAsDataURL(file);

      // Close edit mode after selecting an image
      setEditModes((prev) => ({
        ...prev,
        logo: false,
      }));
    }
  };

  // Handler for adding new items
  const handleAddItem = (section) => {
    setEditModes((prev) => ({ ...prev, [section]: true })); // Enter edit mode

    switch (section) {
      case "techStack":
        setTechItems((prev) => [
          ...prev,
          { name: `New Tech ${prev.length + 1}`, color: "#000000", logo: "NT" },
        ]);
        break;

      case "locations":
        setLocations((prev) => {
          const newLocationName = `New Location ${prev.length + 1}`;
          return [
            ...prev,
            { name: newLocationName, logo: getFlagURL(newLocationName) },
          ];
        });
        break;

      case "benefits":
        setBenefits((prev) => [
          ...prev,
          {
            icon: getRandomBenefitIcon(),
            title: `New Benefit ${prev.length + 1}`,
            description: "Description of the new benefit",
          },
        ]);
        break;

      case "team":
        setTeamMembers((prev) => [
          ...prev,
          {
            name: `New Team Member ${prev.length + 1}`,
            role: "Role",
            image: "https://via.placeholder.com/100", // Default profile image
            socialLinks: [], // Start with no social links
          },
        ]);
        break;

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
  const saveBenefits = () => {
    setEditModes((prev) => ({
      ...prev,
      benefits: false, // Exit edit mode after saving
    }));
  };

  // Function to get a random benefit icon dynamically
  const getRandomBenefitIcon = () => {
    const iconsArray = Object.values(BenefitIcons); // Get all icons as an array
    return iconsArray[Math.floor(Math.random() * iconsArray.length)]; // Pick a random one
  };

  const handleRemoveBenefit = (index) => {
    setBenefits((prev) => prev.filter((_, i) => i !== index));
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

  const handleImageUpload = (event, index) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setTeamMembers((prev) => {
          const newTeam = [...prev];
          newTeam[index].image = reader.result; // Store base64 image data
          return newTeam;
        });
      };
      reader.readAsDataURL(file); // Convert image to base64
    }
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
  const handleRemoveTeamMember = (index) => {
    const newTeamMembers = [...teamMembers];
    newTeamMembers.splice(index, 1);
    setTeamMembers(newTeamMembers);
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
  const saveTeamMembers = () => {
    // Set the flag to indicate save was clicked
    setSaveWasClicked(true);

    // Create a deep copy to avoid reference issues
    const teamMembersCopy = JSON.parse(JSON.stringify(teamMembers));

    // Update the original team state to the current team members
    setOriginalTeam(teamMembersCopy);

    // Here you would typically save to your backend
    console.log("Saving team members:", teamMembersCopy);

    // Exit edit mode
    toggleEditMode("team");
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
            {/* Company Info Section */}
            <div className="flex justify-between items-center py-4 px-6">
              <div className="flex items-center gap-4 flex-grow">
                <div className="relative flex-shrink-0">
                  <div className="bg-gray-100 p-2 rounded-xl">
                    <img
                      src={logoImage}
                      alt="Company Logo"
                      className="w-16 h-16 rounded-lg object-cover cursor-pointer"
                    />
                  </div>

                  <button
                    onClick={() => {
                      toggleEditMode("logo");
                      fileInputRef.current.click();
                    }}
                    className="absolute top-0 left-0 bg-white p-1 rounded-md shadow-sm border border-gray-300 hover:bg-gray-200 cursor-pointer"
                  >
                    <Edit size={14} className="text-blue-500" />
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
                              handleCompanyInfoUpdate("founded", formattedDate);
                            }}
                            className="font-semibold block w-full focus:outline-none cursor-pointer text-sm"
                          />
                        ) : (
                          <p className="font-semibold text-sm">
                            {companyInfo.founded}
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
                            {companyInfo.employees}
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
                            {companyInfo.location}
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
                            {companyInfo.industry}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex gap-2">
                <button className="flex items-center gap-1 h-8 px-3 py-1 text-gray-700 hover:bg-gray-100 text-sm cursor-pointer">
                  <Eye className="w-4 h-4" /> Public View
                </button>

                {editModes.companyInfo ? (
                  <div className="flex gap-1">
                    <button
                      onClick={() => toggleEditMode("companyInfo")}
                      className="flex items-center justify-center gap-1 h-8 px-3 py-1 text-black border rounded-sm text-sm hover:bg-gray-200 cursor-pointer"
                    >
                      <X className="w-4 h-4" /> Cancel
                    </button>
                    <button
                      onClick={saveCompanyInfo}
                      className="flex items-center justify-center gap-1 h-8 px-3 py-1 text-white bg-blue-500 border rounded-sm text-sm hover:bg-blue-600 cursor-pointer"
                    >
                      <Check className="w-4 h-4" /> Save
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => toggleEditMode("companyInfo")}
                    className="flex items-center gap-1 h-8 px-3 py-1 text-black border rounded-sm text-sm hover:bg-gray-200 cursor-pointer"
                  >
                    <Settings className="w-4 h-4" /> Profile Settings
                  </button>
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
                          handleCompanyInfoUpdate("description", e.target.value)
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
                          onChange={(e) => setNewSocialPlatform(e.target.value)}
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
                    <div className="flex gap-1">
                      <button
                        onClick={() => handleAddItem("benefits")}
                        className="text-blue-600 text-xl font-semibold border border-gray-300 px-1 py-1 rounded-md cursor-pointer"
                      >
                        <Plus size={16} />
                      </button>

                      <button
                        onClick={() => toggleEditMode("benefits")}
                        className="text-blue-500 w-8 h-8 flex items-center justify-center border border-gray-300 rounded-md cursor-pointer"
                      >
                        <Edit size={14} />
                      </button>
                    </div>
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
                                newBenefits[index].description = e.target.value;
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

                  {editModes.benefits && (
                    <div className="flex justify-end mt-2 space-x-1">
                      <button
                        onClick={saveBenefits}
                        className="flex items-center justify-center gap-1 h-8 px-3 py-1 text-white bg-blue-500 border rounded-sm text-sm hover:bg-blue-600 cursor-pointer"
                      >
                        <Check className="w-4 h-4" /> Save
                      </button>
                    </div>
                  )}
                </section>

                {/* Team Section */}
                <section>
                  <div className="flex justify-between items-center">
                    <h1 className="font-bold text-xl cursor-pointer">Team</h1>
                    <div className="flex gap-1">
                      <button
                        onClick={() => handleAddItem("team")}
                        className="text-blue-600 text-xl font-semibold border border-gray-300 px-1 py-1 rounded-md cursor-pointer"
                      >
                        <Plus size={16} />
                      </button>
                      <button
                        onClick={() => toggleEditMode("team")}
                        className="text-blue-500 w-8 h-8 flex items-center justify-center border border-gray-300 rounded-md cursor-pointer"
                      >
                        <Edit size={14} />
                      </button>
                    </div>
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
                                handleEditChange(index, "name", e.target.value)
                              }
                              className="font-semibold text-center border rounded px-1 py-1 w-full mb-1 cursor-pointer text-sm"
                              placeholder="Name"
                            />

                            {/* Role Input */}
                            <input
                              type="text"
                              value={member.role || ""}
                              onChange={(e) =>
                                handleEditChange(index, "role", e.target.value)
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
                                      <option value="LinkedIn">LinkedIn</option>
                                      <option value="Twitter">Twitter</option>
                                      <option value="Facebook">Facebook</option>
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
                    <div className="flex justify-end mt-4">
                      <button
                        onClick={saveTeamMembers}
                        className="flex items-center justify-center gap-1 h-10 px-4 py-1 text-white bg-blue-500 border rounded-md text-sm font-medium hover:bg-blue-600 transition-colors cursor-pointer"
                        type="button"
                      >
                        <Check className="w-4 h-4" /> Save
                      </button>
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
                <section>
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
                </section>

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
                              const newLocations = locations.map((loc, i) => ({
                                ...loc,
                                isHeadquarter: i === index,
                              }));
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
        </div>
      </div>
    </div>
  );
};

export default Profile;
