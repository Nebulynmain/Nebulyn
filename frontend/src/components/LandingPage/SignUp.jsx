import React from "react";
import Navbar from "./Navbar";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaGoogle, FaFacebook, FaLinkedin } from "react-icons/fa";
import { API_URL } from "../../App";
import ChatBot from "./ChatBot";

const SignUp = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const navigate = useNavigate();

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle signup form submission
  const handleSignUp = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Basic validation
    if (
      !formData.fullName ||
      !formData.userName ||
      !formData.email ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      setError("All fields are required");
      setLoading(false);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`${API_URL}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!data.ok) {
        setError(data.message || "Registration failed");
        setLoading(false);
        return;
      }

      // Registration successful
      console.log("Registration successful, redirecting to login page");

      // Redirect to login
      navigate("/login");
    } catch (error) {
      console.error("Registration error:", error);
      setError("An error occurred during registration. Please try again.");
    } finally {
      setLoading(false);
    }
  };

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
              {error && (
                <div className="bg-red-100 text-red-800 p-2 mb-3 rounded text-sm">
                  {error}
                </div>
              )}
              <form onSubmit={handleSignUp}>
                {/* Full Name */}
                <label className="block text-md font-medium text-gray-800">
                  Full Name
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  placeholder="Full Name"
                  className="w-full px-3 py-2 mt-1 border border-[#8590AA] rounded-md focus:ring-2 focus:ring-blue-400 text-sm"
                />

                {/* Username */}
                <label className="block text-md font-medium text-gray-800 mt-3">
                  Username
                </label>
                <input
                  type="text"
                  name="userName"
                  value={formData.userName}
                  onChange={handleInputChange}
                  placeholder="Username"
                  className="w-full px-3 py-2 mt-1 border border-[#8590AA] rounded-md focus:ring-2 focus:ring-blue-400 text-sm"
                />

                {/* Email */}
                <label className="block text-md font-medium text-gray-800 mt-3">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Enter email"
                  className="w-full px-3 py-2 mt-1 border border-[#8590AA] rounded-md focus:ring-2 focus:ring-blue-400 text-sm"
                />

                {/* Password */}
                <label className="block text-md font-medium text-gray-800 mt-3">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={passwordVisible ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
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
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    placeholder="Confirm password"
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
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={() => setRememberMe(!rememberMe)}
                      className="mr-2"
                    />{" "}
                    Remember me
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-green-500 text-white py-2 mt-3 rounded-md text-md font-medium hover:bg-green-600 disabled:bg-green-300"
                >
                  {loading ? "Creating Account..." : "Sign Up"}
                </button>
              </form>

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
      <ChatBot />
    </div>
  );
};

export default SignUp;
