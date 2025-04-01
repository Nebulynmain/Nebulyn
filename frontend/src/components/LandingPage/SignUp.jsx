import React from "react";
import Navbar from "./Navbar";
import { useState } from "react";
import { Link } from "react-router-dom";
import { FaGoogle, FaFacebook, FaLinkedin } from "react-icons/fa";

const SignUp = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  return (
    <div>
      <Navbar />
      <div className="p-5 ml-22">
        <h2 className="text-2xl font-bold text-gray-900">Sign Up</h2>
        <p className="text-[#3B8BEB] text-md">
          Welcome! Select the below Sign up methods.
        </p>
        <div className="flex min-h-screen items-center justify-center">
          <div
            className="bg-white p-6 rounded-2xl w-full max-w-3xl flex h-[650px] shadow-lg mt-3"
            style={{ boxShadow: "0px 6px 12px #C4DBF6" }}
          >
            {/* Left Side (Signup Form) */}
            <div className="w-[60%] pr-4 p-3 flex flex-col justify-center -ml-2">
              {/* Full Name */}
              <label className="block text-md font-medium text-gray-800">
                Full Name
              </label>
              <input
                type="text"
                placeholder="Full Name"
                className="w-full px-3 py-2 mt-1 border border-[#8590AA] rounded-md focus:ring-2 focus:ring-blue-400 text-sm"
              />

              {/* Email ID / Username */}
              <label className="block text-md font-medium text-gray-800 mt-3">
                Email ID / Username
              </label>
              <input
                type="text"
                placeholder="Enter email id / username"
                className="w-full px-3 py-2 mt-1 border border-[#8590AA] rounded-md focus:ring-2 focus:ring-blue-400 text-sm"
              />

              {/* Password */}
              <label className="block text-md font-medium text-gray-800 mt-3">
                Password
              </label>
              <div className="relative">
                <input
                  type={passwordVisible ? "text" : "password"}
                  placeholder="Enter password"
                  className="w-full px-3 py-2 mt-1 border border-[#8590AA] rounded-md focus:ring-2 focus:ring-blue-400 text-sm"
                />
                <button
                  type="button"
                  onClick={() => setPasswordVisible(!passwordVisible)}
                  className="absolute inset-y-0 right-3 top-2 text-sm text-gray-600"
                >
                  {passwordVisible ? "Hide" : "Show"}
                </button>
              </div>

              {/* Confirm Password */}
              <label className="block text-md font-medium text-gray-800 mt-3">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type={confirmPasswordVisible ? "text" : "password"}
                  placeholder="Enter password"
                  className="w-full px-3 py-2 mt-1 border border-[#8590AA] rounded-md focus:ring-2 focus:ring-blue-400 text-sm"
                />
                <button
                  type="button"
                  onClick={() =>
                    setConfirmPasswordVisible(!confirmPasswordVisible)
                  }
                  className="absolute inset-y-0 right-3 top-2 text-sm text-gray-600"
                >
                  {confirmPasswordVisible ? "Hide" : "Show"}
                </button>
              </div>

              <div className="flex items-center justify-between mt-3">
                <label className="flex items-center text-sm text-blue-600">
                  <input type="checkbox" className="mr-2" /> Remember me
                </label>
                <a href="" className="text-sm text-black-600 underline">
                  Forgot Password?
                </a>
              </div>

              <button className="w-full bg-green-500 text-white py-2 mt-3 rounded-md text-md font-medium hover:bg-green-600">
                Sign Up
              </button>

              <div className="flex items-center my-3">
                <hr className="flex-grow border-t border-gray-300" />
                <span className="px-2 text-blue-500 text-sm">
                  or sign up with
                </span>
                <hr className="flex-grow border-t border-gray-300" />
              </div>

              <div className="flex justify-center space-x-3">
                <button className="p-2 rounded-md shadow-md bg-white">
                  <FaGoogle size={20} />
                </button>
                <button className="p-2 rounded-md shadow-md bg-white">
                  <FaFacebook size={20} color="#1877F2" />
                </button>
                <button className="p-2 rounded-md shadow-md bg-white">
                  <FaLinkedin size={20} color="#0077B5" />
                </button>
              </div>

              <p className="text-center text-sm mt-3">
                Already Have An Account?{" "}
                <Link
                  to="/login"
                  className="text-black-600 underline font-medium"
                >
                  Login
                </Link>
              </p>
            </div>

            {/* Right Side (Image Placeholder) */}
            <div className="w-[40%] bg-gray-200 rounded-md h-[80%] mt-5"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
