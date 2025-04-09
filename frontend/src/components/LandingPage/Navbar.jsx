import React from "react";
import { useLocation, Link } from "react-router-dom";
import logo from "../../assets/logo.svg";

const Navbar = () => {
  const location = useLocation();

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Find Jobs", path: "/jobs" },
    { name: "Employers", path: "/employers" },
    { name: "Contact Us", path: "/contact" },
    { name: "About Us", path: "/about" },
  ];

  return (
    <nav className="flex justify-between items-center px-32 py-4 shadow-md">
      <div className="flex items-center">
        <img src={logo} alt="Logo" className="h-10 mr-12" />
      </div>
      <div className="flex-grow flex justify-center">
        <ul className="flex space-x-10 text-md font-medium">
          {navItems.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                className={`${
                  location.pathname === item.path
                    ? "font-bold text-black"
                    : "text-gray-700"
                } hover:font-bold `}
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex space-x-6">
        <Link
          to="/signup"
          className="w-[130px] h-[48px] flex items-center justify-center border-2 border-[#007AFF] text-[#007AFF] font-semibold rounded-md"
        >
          Sign Up
        </Link>
        <Link
          to="/login"
          className="w-[130px] h-[48px] flex items-center justify-center border-2 border-[#007AFF] bg-[#007AFF] text-white font-semibold rounded-md"
        >
          Login
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
