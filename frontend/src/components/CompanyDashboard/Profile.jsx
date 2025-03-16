import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { Instagram, Linkedin } from "lucide-react";
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
} from "lucide-react";

const Profile = () => {
  const techItems = [
    { name: "HTML 5", color: "#E44D26", logo: "H5" },
    { name: "CSS 3", color: "#1572B6", logo: "C3" },
    { name: "JavaScript", color: "#F7DF1E", logo: "JS" },
    { name: "Ruby", color: "#CC342D", logo: "Rb" },
    { name: "Mixpanel", color: "#7B68EE", logo: "..." },
    { name: "Framer", color: "#000000", logo: "F" },
  ];

  const locations = [
    { name: "United States", logo: "/flags/us.png", extra: "Head Quarters" },
    { name: "England", logo: "/flags/gb.png" },
    { name: "Japan", logo: "/flags/jp.png" },
    { name: "Australia", logo: "/flags/au.png" },
    { name: "China", logo: "/flags/cn.png" },
  ];

  const benefits = [
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
        "We believe in always learning and leveling up our skills. Whether it’s a conference or online course.",
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
        "We’re grateful for all the time and energy each team member puts into getting to work every day.",
    },
  ];

  const jobs = [
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
  ];
  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex flex-row flex-grow">
        <div className="h-screen sticky top-0 ">
          <Sidebar />
        </div>
        <div className="flex-grow transition-all">
          <Header />
          <div className="">
            {/*Part 1*/}
            <div className="flex justify-between items-center py-6 px-9">
              {/* Left Section: Logo & Info */}
              <div className="flex items-center gap-6 flex-grow">
                {/* Logo with Edit Button */}
                <div className="relative flex-shrink-0">
                  <div className="bg-gray-100 p-3 rounded-2xl">
                    <img
                      src="/logo.png"
                      alt="Nomad Logo"
                      className="w-24 h-24 rounded-lg"
                    />
                  </div>
                  {/* Edit Button */}
                  <button className="absolute top-1 left-1 bg-white p-2 rounded-md shadow-md border border-gray-300 hover:bg-gray-200">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M11 4H4C3.46957 4 2.96086 4.21071 2.58579 4.58579C2.21071 4.96086 2 5.46957 2 6V20C2 20.5304 2.21071 21.0391 2.58579 21.4142C2.96086 21.7893 3.46957 22 4 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V13"
                        stroke="#3B82F6"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M18.5 2.50001C18.8978 2.10219 19.4374 1.87869 20 1.87869C20.5626 1.87869 21.1022 2.10219 21.5 2.50001C21.8978 2.89784 22.1213 3.4374 22.1213 4.00001C22.1213 4.56262 21.8978 5.10219 21.5 5.50001L12 15L8 16L9 12L18.5 2.50001Z"
                        stroke="#3B82F6"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                </div>

                {/* Company Info */}
                <div>
                  <h2 className="text-3xl font-bold text-gray-800">Nomad</h2>
                  <a href="https://nomad.com" className="text-blue-500 text-lg">
                    https://nomad.com
                  </a>
                  <div className="flex flex-wrap gap-8 mt-4 text-base text-gray-600">
                    {/* Founded */}
                    <div className="flex items-center gap-2">
                      <Users className="w-5 h-5 text-blue-500" />
                      <div>
                        <span className="text-gray-500">Founded</span>
                        <p className="font-semibold">July 31, 2011</p>
                      </div>
                    </div>
                    {/* Employees */}
                    <div className="flex items-center gap-2">
                      <Users className="w-5 h-5 text-blue-500" />
                      <div>
                        <span className="text-gray-500">Employees</span>
                        <p className="font-semibold">4000+</p>
                      </div>
                    </div>
                    {/* Location */}
                    <div className="flex items-center gap-2">
                      <MapPin className="w-5 h-5 text-blue-500" />
                      <div>
                        <span className="text-gray-500">Location</span>
                        <p className="font-semibold">20 countries</p>
                      </div>
                    </div>
                    {/* Industry */}
                    <div className="flex items-center gap-2">
                      <Building className="w-5 h-5 text-blue-500" />
                      <div>
                        <span className="text-gray-500">Industry</span>
                        <p className="font-semibold">Social & Non-Profit</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Section: Action Buttons */}
              <div className="flex gap-3 mb-25">
                <button className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 text-base ">
                  <Eye className="w-5 h-5" /> Public View
                </button>
                <button className="flex items-center gap-2 px-4 py-2 text-black border rounded-sm text-base hover:bg-gray-200">
                  <Settings className="w-5 h-5" /> Profile Settings
                </button>
              </div>
            </div>
            {/*Part 2*/}
            <div class="flex p-6">
              <div className="w-3/4 p-4 bg-white">
                {/*Part 1*/}
                <div className="">
                  {/* Heading and Edit Button */}
                  <div className="flex justify-between items-center">
                    <h1 className="font-bold text-2xl">Company Profile</h1>

                    {/* Edit Button */}
                    <button className="text-blue-500 w-10 h-10 flex items-center justify-center border border-gray-300 rounded-md cursor-pointer">
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M11 4H4C3.46957 4 2.96086 4.21071 2.58579 4.58579C2.21071 4.96086 2 5.46957 2 6V20C2 20.5304 2.21071 21.0391 2.58579 21.4142C2.96086 21.7893 3.46957 22 4 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V13"
                          stroke="#3B82F6"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M18.5 2.50001C18.8978 2.10219 19.4374 1.87869 20 1.87869C20.5626 1.87869 21.1022 2.10219 21.5 2.50001C21.8978 2.89784 22.1213 3.4374 22.1213 4.00001C22.1213 4.56262 21.8978 5.10219 21.5 5.50001L12 15L8 16L9 12L18.5 2.50001Z"
                          stroke="#3B82F6"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>
                  </div>

                  {/* Company Description */}
                  <p className="text-gray-600 mt-2">
                    Nomad is a software platform for starting and running
                    internet businesses. Millions of businesses rely on Stripe’s
                    software tools to accept payments, expand globally, and
                    manage their businesses online. Stripe has been at the
                    forefront of expanding internet commerce, powering new
                    business models, and supporting the latest platforms, from
                    marketplaces to mobile commerce sites. We believe that
                    growing the GDP of the internet is a problem rooted in code
                    and design, not finance. Stripe is built for developers,
                    makers, and creators. We work on solving the hard technical
                    problems necessary to build global economic
                    infrastructure—from designing highly reliable systems to
                    developing advanced machine learning algorithms to prevent
                    fraud.
                  </p>
                  <div className="border-b border-gray-400 text-transparent">
                    .
                  </div>
                </div>
                {/*Part 2*/}
                <div className="mt-6">
                  {/* Contact Heading and Edit Buttons */}
                  <div className="flex justify-between items-center">
                    <h1 className="font-bold text-2xl">Contact</h1>

                    {/* Plus & Edit Buttons */}
                    <div className="flex space-x-2">
                      {/* Plus Button */}
                      <button className="text-blue-600 text-2xl font-semibold border border-gray-300 px-2 py-1 rounded-md cursor-pointer transition">
                        <span className="relative -top-0.5">+</span>
                      </button>

                      {/* Edit Button */}
                      <button className="text-blue-500 w-10 h-10 flex items-center justify-center border border-gray-300 rounded-md cursor-pointer">
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M11 4H4C3.46957 4 2.96086 4.21071 2.58579 4.58579C2.21071 4.96086 2 5.46957 2 6V20C2 20.5304 2.21071 21.0391 2.58579 21.4142C2.96086 21.7893 3.46957 22 4 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V13"
                            stroke="#3B82F6"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M18.5 2.50001C18.8978 2.10219 19.4374 1.87869 20 1.87869C20.5626 1.87869 21.1022 2.10219 21.5 2.50001C21.8978 2.89784 22.1213 3.4374 22.1213 4.00001C22.1213 4.56262 21.8978 5.10219 21.5 5.50001L12 15L8 16L9 12L18.5 2.50001Z"
                            stroke="#3B82F6"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>

                  {/* Contact Links */}
                  <div className="flex flex-wrap gap-3 mt-3">
                    {/* Twitter */}
                    <a
                      href="https://twitter.com/Nomad"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center border border-blue-400 rounded-md px-3 py-2 text-blue-500 text-sm"
                    >
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        xmlns="http://www.w3.org/2000/svg"
                        className="mr-2"
                      >
                        <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5A4.5 4.5 0 0023 3z" />
                      </svg>
                      twitter.com/Nomad
                    </a>

                    {/* Facebook */}
                    <a
                      href="https://facebook.com/NomadHQ"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center border border-blue-400 rounded-md px-3 py-2 text-blue-500 text-sm"
                    >
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        xmlns="http://www.w3.org/2000/svg"
                        className="mr-2"
                      >
                        <path d="M17 2H7a5 5 0 00-5 5v10a5 5 0 005 5h5V15h-3v-3h3V9a4 4 0 014-4h3v3h-2c-1 0-1 1-1 1v2h3l-1 3h-2v7h3a5 5 0 005-5V7a5 5 0 00-5-5z" />
                      </svg>
                      facebook.com/NomadHQ
                    </a>

                    {/* LinkedIn */}
                    <a
                      href="https://linkedin.com/company/nomad"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center border border-blue-400 rounded-md px-3 py-2 text-blue-500 text-sm"
                    >
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        xmlns="http://www.w3.org/2000/svg"
                        className="mr-2"
                      >
                        <path d="M22 2H2a2 2 0 00-2 2v16a2 2 0 002 2h20a2 2 0 002-2V4a2 2 0 00-2-2zM8 19H5V9h3zm-1.5-11a1.75 1.75 0 11.001-3.5A1.75 1.75 0 016.5 8zm15 11h-3v-5c0-1.1-.9-2-2-2s-2 .9-2 2v5h-3V9h3v1.3A4.1 4.1 0 0116.5 9c2.2 0 4 1.8 4 4v6z" />
                      </svg>
                      linkedin.com/company/nomad
                    </a>

                    {/* Email */}
                    <a
                      href="mailto:nomad@gmail.com"
                      className="flex items-center border border-blue-400 rounded-md px-3 py-2 text-blue-500 text-sm"
                    >
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        xmlns="http://www.w3.org/2000/svg"
                        className="mr-2"
                      >
                        <path d="M12 13l-8-5V7l8 5 8-5v1zm0 2l-8-5V5a2 2 0 012-2h12a2 2 0 012 2v5z" />
                      </svg>
                      nomad@gmail.com
                    </a>
                  </div>

                  <div className="border-b border-gray-400 text-transparent">
                    .
                  </div>
                </div>
                {/*Part 3*/}
                <div className="mt-6">
                  {/* Heading and Action Buttons */}
                  <div className="flex justify-between items-center">
                    <h1 className="font-bold text-2xl">Working at Nomad</h1>

                    {/* Plus & Edit Buttons */}
                    <div className="flex space-x-2">
                      {/* Plus Button */}
                      <button className="text-blue-600 text-2xl font-semibold border border-gray-300 px-2 py-1 rounded-md cursor-pointer transition">
                        <span className="relative -top-0.5">+</span>
                      </button>

                      {/* Edit Button */}
                      <button className="text-blue-500 w-10 h-10 flex items-center justify-center border border-gray-300 rounded-md cursor-pointer">
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M11 4H4C3.46957 4 2.96086 4.21071 2.58579 4.58579C2.21071 4.96086 2 5.46957 2 6V20C2 20.5304 2.21071 21.0391 2.58579 21.4142C2.96086 21.7893 3.46957 22 4 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V13"
                            stroke="#3B82F6"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M18.5 2.50001C18.8978 2.10219 19.4374 1.87869 20 1.87869C20.5626 1.87869 21.1022 2.10219 21.5 2.50001C21.8978 2.89784 22.1213 3.4374 22.1213 4.00001C22.1213 4.56262 21.8978 5.10219 21.5 5.50001L12 15L8 16L9 12L18.5 2.50001Z"
                            stroke="#3B82F6"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>

                  {/* Image Grid */}
                  <div className="mt-4 grid grid-cols-3 gap-3">
                    {/* Large Main Image */}
                    <div className="col-span-2">
                      <div className="w-full h-[360px] bg-gray-300 flex items-center justify-center rounded-lg">
                        <span className="text-gray-600">Main Image</span>
                      </div>
                    </div>

                    {/* Smaller Images in a Column */}
                    <div className="grid grid-rows-3 gap-3">
                      <div className="w-full h-[115px] bg-gray-300 flex items-center justify-center rounded-lg">
                        <span className="text-gray-600">Image 1</span>
                      </div>
                      <div className="w-full h-[115px] bg-gray-300 flex items-center justify-center rounded-lg">
                        <span className="text-gray-600">Image 2</span>
                      </div>
                      <div className="w-full h-[115px] bg-gray-300 flex items-center justify-center rounded-lg">
                        <span className="text-gray-600">Image 3</span>
                      </div>
                    </div>
                  </div>

                  <div className="border-b border-gray-400 text-transparent">
                    .
                  </div>
                </div>
                {/*Part 4*/}
                <div className="mt-6">
                  {/* Heading and Action Buttons */}
                  <div className="flex justify-between items-center">
                    <h1 className="font-bold text-2xl">Team</h1>

                    {/* Plus & Edit Buttons */}
                    <div className="flex space-x-2">
                      {/* Plus Button */}
                      <button className="text-blue-600 text-2xl font-semibold border border-gray-300 px-2 py-1 rounded-md cursor-pointer transition">
                        <span className="relative -top-0.5">+</span>
                      </button>

                      {/* Edit Button */}
                      <button className="text-blue-500 w-10 h-10 flex items-center justify-center border border-gray-300 rounded-md cursor-pointer">
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M11 4H4C3.46957 4 2.96086 4.21071 2.58579 4.58579C2.21071 4.96086 2 5.46957 2 6V20C2 20.5304 2.21071 21.0391 2.58579 21.4142C2.96086 21.7893 3.46957 22 4 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V13"
                            stroke="#3B82F6"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M18.5 2.50001C18.8978 2.10219 19.4374 1.87869 20 1.87869C20.5626 1.87869 21.1022 2.10219 21.5 2.50001C21.8978 2.89784 22.1213 3.4374 22.1213 4.00001C22.1213 4.56262 21.8978 5.10219 21.5 5.50001L12 15L8 16L9 12L18.5 2.50001Z"
                            stroke="#3B82F6"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>

                  {/* Team Cards */}
                  <div className="mt-4 grid grid-cols-3 gap-4">
                    {[
                      {
                        name: "Célestin Gardinier",
                        role: "CEO & Co-Founder",
                        image: "https://source.unsplash.com/100x100/?man",
                      },
                      {
                        name: "Reynaud Colbert",
                        role: "Co-Founder",
                        image:
                          "https://source.unsplash.com/100x100/?businessman",
                      },
                      {
                        name: "Arienne Lyon",
                        role: "Managing Director",
                        image: "https://source.unsplash.com/100x100/?woman",
                      },
                    ].map((member, index) => (
                      <div
                        key={index}
                        className="flex flex-col items-center p-4 border border-gray-300 rounded-lg"
                      >
                        {/* Profile Image */}
                        <img
                          src={member.image}
                          alt={member.name}
                          className="w-20 h-20 rounded-full mb-3 object-cover"
                        />

                        {/* Name & Role */}
                        <h2 className="font-semibold">{member.name}</h2>
                        <p className="text-gray-500 text-sm">{member.role}</p>

                        {/* Social Icons */}
                        <div className="flex space-x-3 mt-2">
                          <a
                            href="#"
                            className="text-gray-500 hover:text-blue-500"
                          >
                            <Instagram size={20} />
                          </a>
                          <a
                            href="#"
                            className="text-gray-500 hover:text-blue-500"
                          >
                            <Linkedin size={20} />
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* View All Teams Link */}
                  <div className="mt-4 text-blue-600 font-semibold cursor-pointer">
                    View all core teams →
                  </div>

                  <div className="border-b border-gray-400 text-transparent">
                    .
                  </div>
                </div>
                {/*Part 5*/}
                <div className="mt-6">
                  {/* Header Section */}
                  <div className="flex justify-between items-center">
                    <h1 className="font-bold text-2xl">Benefit</h1>

                    {/* Plus & Edit Buttons */}
                    <div className="flex space-x-2">
                      {/* Plus Button */}
                      <button className="text-blue-600 text-2xl font-semibold border border-gray-300 px-2 py-1 rounded-md cursor-pointer transition">
                        <span className="relative -top-0.5">+</span>
                      </button>

                      {/* Edit Button */}
                      <button className="text-blue-500 w-10 h-10 flex items-center justify-center border border-gray-300 rounded-md cursor-pointer">
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M11 4H4C3.46957 4 2.96086 4.21071 2.58579 4.58579C2.21071 4.96086 2 5.46957 2 6V20C2 20.5304 2.21071 21.0391 2.58579 21.4142C2.96086 21.7893 3.46957 22 4 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V13"
                            stroke="#3B82F6"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M18.5 2.50001C18.8978 2.10219 19.4374 1.87869 20 1.87869C20.5626 1.87869 21.1022 2.10219 21.5 2.50001C21.8978 2.89784 22.1213 3.4374 22.1213 4.00001C22.1213 4.56262 21.8978 5.10219 21.5 5.50001L12 15L8 16L9 12L18.5 2.50001Z"
                            stroke="#3B82F6"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>

                  {/* 3-Column Grid Layout */}
                  <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {benefits.map((benefit, index) => (
                      <div key={index} className="flex flex-col space-y-4">
                        <div className="w-16 h-16 flex items-center justify-center bg-blue-100 rounded-xl">
                          {benefit.icon}
                        </div>
                        <h2 className="font-bold text-xl">{benefit.title}</h2>
                        <p className="text-gray-500 text-lg">
                          {benefit.description}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="border-b border-gray-400 text-transparent">
                    .
                  </div>
                </div>
                {/*Part 6*/}
                <div className="mt-6">
                  {/* Header Section */}
                  <div className="flex justify-between items-center">
                    <h1 className="font-bold text-2xl">Open Position</h1>

                    <div className="text-blue-600 font-semibold cursor-pointer">
                      Show all jobs →
                    </div>
                  </div>

                  {/* Job Listings */}
                  <div className="mt-4 space-y-4">
                    {jobs.map((job, index) => (
                      <div
                        key={index}
                        className="flex items-center p-4 border border-gray-200 rounded-lg shadow-sm bg-white hover:shadow-md transition"
                      >
                        {/* Logo */}
                        <img
                          src={job.logo}
                          alt={job.company}
                          className="w-12 h-12 mr-4"
                        />

                        {/* Job Details */}
                        <div className="flex-1">
                          <h2 className="font-semibold text-lg">{job.title}</h2>
                          <p className="text-gray-500 text-sm">
                            {job.company} • {job.location}
                          </p>

                          {/* Job Type & Categories in Row */}
                          <div className="flex items-center gap-3 mt-2">
                            {/* Job Type Badge */}
                            <span
                              className={`px-3 py-1 text-xs font-medium rounded-full ${
                                job.jobType === "Full-Time"
                                  ? "bg-green-100 text-green-700"
                                  : "bg-purple-100 text-purple-700"
                              }`}
                            >
                              {job.jobType}
                            </span>

                            {/* Separator Line */}
                            <span className="w-px h-5 bg-gray-300"></span>

                            {/* Categories */}
                            <div className="flex gap-2">
                              {job.categories.map((category, index) => (
                                <span
                                  key={index}
                                  className={`px-3 py-1 text-xs font-medium rounded-full border ${
                                    category === "Marketing"
                                      ? "text-yellow-300 border-yellow-300"
                                      : "text-blue-400 border-blue-400"
                                  }`}
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
                </div>
              </div>
              <div className="w-1/4 p-4">
                {/*Tech*/}
                <div>
                  {/* Header with buttons */}
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold text-gray-800">
                      Tech Stack
                    </h2>
                    <div className="flex space-x-2">
                      {/* Plus Button */}
                      <button className="text-blue-600 text-3xl font-semibold border border-gray-300 px-2 cursor-pointer transition">
                        <span className="relative -top-1">+</span>
                      </button>

                      {/* Edit Button */}
                      <button className="text-blue-500 w-10 h-10 flex items-center justify-center border border-gray-300 cursor-pointer">
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M11 4H4C3.46957 4 2.96086 4.21071 2.58579 4.58579C2.21071 4.96086 2 5.46957 2 6V20C2 20.5304 2.21071 21.0391 2.58579 21.4142C2.96086 21.7893 3.46957 22 4 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V13"
                            stroke="#3B82F6"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M18.5 2.50001C18.8978 2.10219 19.4374 1.87869 20 1.87869C20.5626 1.87869 21.1022 2.10219 21.5 2.50001C21.8978 2.89784 22.1213 3.4374 22.1213 4.00001C22.1213 4.56262 21.8978 5.10219 21.5 5.50001L12 15L8 16L9 12L18.5 2.50001Z"
                            stroke="#3B82F6"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>

                  {/* Tech icons grid */}
                  <div className="grid grid-cols-3 gap-4 mb-4">
                    {techItems.map((item, index) => (
                      <div key={index} className="flex flex-col items-center">
                        <div
                          className="w-16 h-16 rounded flex items-center justify-center mb-2"
                          style={{ backgroundColor: item.color }}
                        >
                          <span className="text-white font-bold text-xl">
                            {item.logo}
                          </span>
                        </div>
                        <span className="text-sm text-gray-700">
                          {item.name}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* View tech stack link */}
                  <div className="flex justify-start">
                    <a href="#" className="text-blue-500 flex items-center">
                      View tech stack
                      <svg
                        className="w-4 h-4 ml-1"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M5 12H19"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M12 5L19 12L12 19"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </a>
                  </div>

                  <div className="border-b border-gray-400 text-transparent">
                    .
                  </div>
                </div>
                {/*Location*/}
                <div>
                  {/* Header with buttons */}
                  <div className="flex justify-between items-center mb-4 mt-8">
                    <h2 className="text-xl font-bold text-gray-800">
                      Office Locations
                    </h2>
                    <div className="flex space-x-2">
                      {/* Plus Button */}
                      <button className="text-blue-600 text-3xl font-semibold border border-gray-300 px-2 cursor-pointer transition">
                        <span className="relative -top-1">+</span>
                      </button>

                      {/* Edit Button */}
                      <button className="text-blue-500 w-10 h-10 flex items-center justify-center border border-gray-300 cursor-pointer">
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M11 4H4C3.46957 4 2.96086 4.21071 2.58579 4.58579C2.21071 4.96086 2 5.46957 2 6V20C2 20.5304 2.21071 21.0391 2.58579 21.4142C2.96086 21.7893 3.46957 22 4 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V13"
                            stroke="#3B82F6"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M18.5 2.50001C18.8978 2.10219 19.4374 1.87869 20 1.87869C20.5626 1.87869 21.1022 2.10219 21.5 2.50001C21.8978 2.89784 22.1213 3.4374 22.1213 4.00001C22.1213 4.56262 21.8978 5.10219 21.5 5.50001L12 15L8 16L9 12L18.5 2.50001Z"
                            stroke="#3B82F6"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>

                  {/* Office locations grid */}
                  <div className="grid grid-cols-1 gap-4 mb-4">
                    {locations.map((item, index) => (
                      <div key={index} className="flex items-center">
                        <img
                          src={item.logo}
                          alt={item.name}
                          className="w-8 h-8 mr-3"
                        />
                        <span className="text-gray-800 font-medium">
                          {item.name}
                        </span>
                        {item.extra && (
                          <span className="ml-2 px-2 py-1 text-sm bg-blue-100 text-blue-600 rounded-lg">
                            {item.extra}
                          </span>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* View locations link */}
                  <div className="flex justify-start">
                    <a href="#" className="text-blue-500 flex items-center">
                      View locations
                      <svg
                        className="w-4 h-4 ml-1"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M5 12H19"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M12 5L19 12L12 19"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
