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
        <h2 className="text-4xl font-bold text-gray-900">Sign Up</h2>
        <p className="text-[#3B8BEB] mt-4 text-xl">
          Welcome! Select the below Sign up methods.
        </p>
        <div className="flex min-h-screen items-center justify-center ">
          <div
            className="bg-white p-10 rounded-3xl w-full max-w-5xl flex h-[890px] shadow-2xl mt-10"
            style={{ boxShadow: "0px 10px 20px #C4DBF6" }}
          >
            {/* Left Side (Login Form) */}
            <div className="w-[70%] pr-8 flex flex-col justify-center -ml-2">
              {/* Full Name */}
              <label className="block text-xl font-medium text-gray-800">
                Full Name
              </label>
              <input
                type="text"
                placeholder="Full Name"
                className="w-full px-6 py-4 mt-3 border border-[#8590AA] rounded-lg focus:ring-2 focus:ring-blue-400 text-lg"
              />

              {/* Email ID / Username */}
              <label className="block text-xl font-medium text-gray-800 mt-6">
                Email ID / Username
              </label>
              <input
                type="text"
                placeholder="Enter email id / username"
                className="w-full px-6 py-4 mt-3 border border-[#8590AA] rounded-lg focus:ring-2 focus:ring-blue-400 text-lg"
              />

              {/* Password */}
              <label className="block text-xl font-medium text-gray-800 mt-6">
                Password
              </label>
              <div className="relative">
                <input
                  type={passwordVisible ? "text" : "password"}
                  placeholder="Enter password"
                  className="w-full px-6 py-4 mt-3 border border-[#8590AA] rounded-lg focus:ring-2 focus:ring-blue-400 text-lg"
                />
                <button
                  type="button"
                  onClick={() => setPasswordVisible(!passwordVisible)}
                  className="absolute inset-y-0 right-5 top-3 text-lg text-gray-600"
                >
                  {passwordVisible ? "Hide" : "Show"}
                </button>
              </div>

              {/* Confirm Password */}
              <label className="block text-xl font-medium text-gray-800 mt-6">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type={confirmPasswordVisible ? "text" : "password"}
                  placeholder="Enter password"
                  className="w-full px-6 py-4 mt-3 border border-[#8590AA] rounded-lg focus:ring-2 focus:ring-blue-400 text-lg"
                />
                <button
                  type="button"
                  onClick={() =>
                    setConfirmPasswordVisible(!confirmPasswordVisible)
                  }
                  className="absolute inset-y-0 right-5 top-3 text-lg text-gray-600"
                >
                  {confirmPasswordVisible ? "Hide" : "Show"}
                </button>
              </div>

              <div className="flex items-center justify-between mt-5">
                <label className="flex items-center text-lg text-blue-600">
                  <input type="checkbox" className="mr-3" /> Remember me
                </label>
                <a href="" className="text-lg text-black-600 underline">
                  Forgot Password?
                </a>
              </div>

              <button className="w-full bg-green-500 text-white py-4 mt-6 rounded-lg text-xl font-medium hover:bg-green-600">
                Sign Up
              </button>

              <div className="flex items-center my-6 mt-10">
                <hr className="flex-grow border-t border-gray-300" />
                <span className="px-4 text-blue-500 text-lg">
                  or sign up with
                </span>
                <hr className="flex-grow border-t border-gray-300" />
              </div>

              <div className="flex justify-center space-x-6">
                <button className="p-4 rounded-lg shadow-lg bg-white">
                  <FaGoogle size={28} />
                </button>
                <button className="p-4 rounded-lg shadow-lg bg-white">
                  <FaFacebook size={28} color="#1877F2" />
                </button>
                <button className="p-4 rounded-lg shadow-lg bg-white">
                  <FaLinkedin size={28} color="#0077B5" />
                </button>
              </div>

              <p className="text-center text-lg mt-6">
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
            <div className="w-[50%] bg-gray-200 rounded-lg h-[90%] mt-10"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
