import React, { useState } from "react";
import {
  Instagram,
  Linkedin,
  Twitter,
  Github,
  Facebook,
  Phone,
} from "lucide-react";
import {
  Heart,
  Waves,
  BookOpen,
  Users,
  Coffee,
  Bus,
  Eye,
  Trophy,
  DollarSign,
  GraduationCap,
  Home,
  Dumbbell,
  Utensils,
  Bike,
  MapPin,
  Building,
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

const CompanyProfile = () => {
  // State for content
  const [companyInfo] = useState({
    name: "Nomad",
    website: "https://nomad.com",
    founded: "July 31, 2011",
    employees: "4000+",
    location: "20 countries",
    industry: "Social & Non-Profit",
    description:
      "Nomad is a software platform for starting and running internet businesses. Millions of businesses rely on Stripe's software tools to accept payments, expand globally, and manage their businesses online. Stripe has been at the forefront of expanding internet commerce, powering new business models, and supporting the latest platforms, from marketplaces to mobile commerce sites.",
  });

  const [socialLinks] = useState({
    twitter: "twitter.com/Nomad",
    facebook: "facebook.com/NomadHQ",
    linkedin: "linkedin.com/company/nomad",
    email: "nomad@gmail.com",
    phone: "+1 (555) 123-4567",
  });

  const [locations] = useState([
    {
      name: "United States",
      logo: "https://flagcdn.com/w40/us.png",
      isMain: true,
    },
    { name: "England", logo: "https://flagcdn.com/w40/gb.png", isMain: false },
    { name: "Japan", logo: "https://flagcdn.com/w40/jp.png", isMain: false },
    {
      name: "Australia",
      logo: "https://flagcdn.com/w40/au.png",
      isMain: false,
    },
    { name: "China", logo: "https://flagcdn.com/w40/cn.png", isMain: false },
  ]);

  const [benefits] = useState([
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

  const [teamMembers] = useState([
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

  const [jobs] = useState([
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

  const [logoImage] = useState("/logo.png"); // Default logo path

  // Function to render social icons based on platform name
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
            {/* Company Info Section */}
            <div className="flex justify-between items-center py-4 px-6">
              <div className="flex items-center gap-4 flex-grow">
                <div className="relative flex-shrink-0">
                  <div className="bg-gray-100 p-2 rounded-xl">
                    <img
                      src={logoImage}
                      alt="Company Logo"
                      className="w-16 h-16 rounded-lg object-cover"
                    />
                  </div>
                </div>

                <div>
                  <>
                    <h2 className="text-2xl font-bold text-gray-800">
                      {companyInfo.name}
                    </h2>
                    <a
                      href={companyInfo.website}
                      className="text-blue-500 text-sm"
                    >
                      {companyInfo.website}
                    </a>
                  </>

                  <div className="flex flex-wrap gap-4 mt-2 text-sm text-gray-600">
                    {/* Founded */}
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4 text-blue-500" />
                      <div>
                        <span className="text-gray-500">Founded</span>
                        <p className="font-semibold text-sm">
                          {companyInfo.founded}
                        </p>
                      </div>
                    </div>

                    {/* Employees */}
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4 text-blue-500" />
                      <div>
                        <span className="text-gray-500">Employees</span>
                        <p className="font-semibold text-sm">
                          {companyInfo.employees}
                        </p>
                      </div>
                    </div>

                    {/* Location */}
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4 text-blue-500" />
                      <div>
                        <span className="text-gray-500">Location</span>
                        <p className="font-semibold text-sm">
                          {companyInfo.location}
                        </p>
                      </div>
                    </div>

                    {/* Industry */}
                    <div className="flex items-center gap-1">
                      <Building className="w-4 h-4 text-blue-500" />
                      <div>
                        <span className="text-gray-500">Industry</span>
                        <p className="font-semibold text-sm">
                          {companyInfo.industry}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Main Content Area */}
            <div className="flex p-4">
              {/* Left Column */}
              <div className="w-3/4 p-3 bg-white space-y-4">
                {/* Company Profile Section */}
                <section>
                  <h1 className="font-bold text-xl">Company Profile</h1>
                  <p className="text-gray-600 mt-1 text-sm">
                    {companyInfo.description}
                  </p>
                </section>

                {/* Benefits Section */}
                <section>
                  <h1 className="font-bold text-xl">Benefits</h1>
                  <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {benefits.map((benefit, index) => (
                      <div key={index} className="flex flex-col space-y-2">
                        <div className="w-12 h-12 flex items-center justify-center bg-blue-100 rounded-lg">
                          {benefit.icon}
                        </div>
                        <h2 className="font-bold text-sm">{benefit.title}</h2>
                        <p className="text-gray-500 text-xs">
                          {benefit.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </section>

                {/* Team Section */}
                <section>
                  <h1 className="font-bold text-xl">Team</h1>
                  <div className="mt-2 grid grid-cols-1 md:grid-cols-3 gap-2">
                    {teamMembers.map((member, index) => (
                      <div
                        key={index}
                        className="flex flex-col items-center p-2 border border-gray-300 rounded-lg"
                      >
                        <div className="w-16 h-16 rounded-full border-2 border-gray-300 flex items-center justify-center overflow-hidden mb-2">
                          {member.image ? (
                            <img
                              src={member.image}
                              alt={member.name}
                              className="w-full h-full object-cover"
                            />
                          ) : null}
                        </div>

                        <h2 className="font-semibold text-sm">{member.name}</h2>
                        <p className="text-gray-500 text-xs mb-1">
                          {member.role}
                        </p>

                        {/* Social Links Display as Icons */}
                        <div className="flex flex-wrap justify-center gap-2 mt-1">
                          {(member.socialLinks || []).map((link, linkIndex) => (
                            <a
                              key={linkIndex}
                              href={link.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-gray-600 hover:text-blue-500"
                              title={link.platform}
                            >
                              {renderSocialIcon(link.platform)}
                            </a>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              </div>

              {/* Right Column */}
              <div className="w-1/4 p-3">
                {/* Contact Section */}
                <section>
                  <h2 className="text-xl font-bold text-gray-800 mb-2">
                    Contact
                  </h2>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Phone className="w-5 h-5 text-blue-500" />
                      <span className="text-sm">{socialLinks.phone}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Linkedin className="w-5 h-5 text-blue-500" />
                      <a
                        href={`https://${socialLinks.linkedin}`}
                        className="text-sm hover:underline"
                      >
                        {socialLinks.linkedin}
                      </a>
                    </div>
                    <div className="flex items-center gap-2">
                      <Twitter className="w-5 h-5 text-blue-500" />
                      <a
                        href={`https://${socialLinks.twitter}`}
                        className="text-sm hover:underline"
                      >
                        {socialLinks.twitter}
                      </a>
                    </div>
                    <div className="flex items-center gap-2">
                      <Facebook className="w-5 h-5 text-blue-500" />
                      <a
                        href={`https://${socialLinks.facebook}`}
                        className="text-sm hover:underline"
                      >
                        {socialLinks.facebook}
                      </a>
                    </div>
                    <div className="flex items-center gap-2">
                      <svg
                        className="w-5 h-5 text-blue-500"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                      </svg>
                      <a
                        href={`mailto:${socialLinks.email}`}
                        className="text-sm hover:underline"
                      >
                        {socialLinks.email}
                      </a>
                    </div>
                  </div>
                </section>

                {/* Locations Section */}
                <section className="mt-4">
                  <h2 className="text-lg font-bold text-gray-800 mb-2">
                    Office Locations
                  </h2>
                  <div className="grid grid-cols-1 gap-2 mb-2">
                    {locations.map((item, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <img
                          src={getFlagURL(item.name)}
                          alt={item.name}
                          className="w-6 h-6"
                        />
                        <div className="flex flex-col">
                          <div className="flex items-center gap-1">
                            <span className="text-gray-800 font-medium text-sm">
                              {item.name}
                            </span>
                            {item.isMain && (
                              <span className="bg-blue-100 text-blue-800 text-xs px-2 py-0.5 rounded-full">
                                Main Office
                              </span>
                            )}
                          </div>
                          {item.isMain && (
                            <span className="text-gray-500 text-xs">
                              Headquarters
                            </span>
                          )}
                        </div>
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

export default CompanyProfile;
