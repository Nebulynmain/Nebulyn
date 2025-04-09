import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { Link, useNavigate } from "react-router-dom";
import { FaGoogle, FaFacebook, FaLinkedin } from "react-icons/fa";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { googleLogout, useGoogleLogin } from "@react-oauth/google";
import FacebookLogin from "react-facebook-login-lite";
import { API_URL } from "../../App";
import ChatBot from "./ChatBot";
// import { LinkedIn } from "react-linkedin-login-oauth2";

const Login = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle login form submission
  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Basic validation
    if (!formData.email || !formData.password) {
      setError("All fields are required");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
        credentials: "include", // Important for cookies
      });

      const data = await response.json();

      if (!data.ok) {
        setError(data.message || "Login failed");
        setLoading(false);
        return;
      }

      // Login successful - the backend already sets the cookie
      console.log("Login successful, redirecting to dashboard");

      // Redirect to dashboard
      navigate("/dashboard");
    } catch (error) {
      console.error("Login error:", error);
      setError("An error occurred during login. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Replace these with your actual OAuth Client IDs
  const googleClientId =
    "69056251506-h4u9nd77t85ovk87ufa44jkudt6d5ske.apps.googleusercontent.com";
  const facebookAppId = "1004620114893019";
  const linkedInClientId = "YOUR_LINKEDIN_CLIENT_ID";

  // Google Sign-In Handler

  // Facebook Sign-In Handler
  useEffect(() => {
    window.fbAsyncInit = function () {
      FB.init({
        appId: facebookAppId,
        cookie: true,
        xfbml: true,
        version: "v16.0",
      });
    };

    (function (d, s, id) {
      let js,
        fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      js = d.createElement(s);
      js.id = id;
      js.src = "https://connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
    })(document, "script", "facebook-jssdk");
  }, []);

  // Facebook Login Handler
  //   const facebookLogin = () => {
  //     FB.login(
  //       (response) => {
  //         if (response.authResponse) {
  //           console.log("Facebook User:", response);
  //           FB.api("/me", { fields: "id,name,email,picture" }, (userInfo) => {
  //             console.log("User Info:", userInfo);
  //           });
  //         } else {
  //           console.log("User cancelled login or did not fully authorize.");
  //         }
  //       },
  //       { scope: "public_profile,email" }
  //     );
  //   };
  useEffect(() => {
    window.fbAsyncInit = function () {
      FB.init({
        appId: facebookAppId,
        cookie: true,
        xfbml: true,
        version: "v16.0",
      });
    };

    (function (d, s, id) {
      let js,
        fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      js = d.createElement(s);
      js.id = id;
      js.src = "https://connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
    })(document, "script", "facebook-jssdk");
  }, []);

  // Facebook Login Handler
  const facebookLogin = () => {
    FB.login(
      (response) => {
        if (response.authResponse) {
          console.log("Facebook User:", response);
          FB.api("/me", { fields: "id,name,email,picture" }, (userInfo) => {
            console.log("User Info:", userInfo);
          });
        } else {
          console.log("User cancelled login or did not fully authorize.");
        }
      },
      { scope: "public_profile,email" }
    );
  };
  // LinkedIn Sign-In Handler
  const handleLinkedInSuccess = (response) => {
    console.log("LinkedIn User:", response);
  };
  const googleLogin = useGoogleLogin({
    onSuccess: (response) => console.log("Google Login Success:", response),
    onError: () => console.log("Google Login Failed"),
  });

  return (
    <div className="h-screen w-screen overflow-hidden">
      <Navbar />
      <div className="p-3 ml-22">
        <h2 className="text-2xl font-bold text-gray-900">
          Login to your Account
        </h2>
        <p className="text-[#3B8BEB] text-md">
          Welcome back! Select the below login methods.
        </p>
      </div>
      <ChatBot />
      <div className="flex items-center justify-center">
        <div
          className="bg-white p-8 rounded-2xl w-full max-w-3xl flex h-[450px] shadow-lg"
          style={{ boxShadow: "0px 8px 16px #C4DBF6" }}
        >
          {/* Left Side (Login Form) */}
          <div className="w-[55%] pr-4 flex flex-col justify-center -ml-2">
            {error && (
              <div className="bg-red-100 text-red-800 p-2 mb-3 rounded text-sm">
                {error}
              </div>
            )}
            <form onSubmit={handleLogin}>
              <label className="block text-base font-medium text-black-700">
                Email ID / Username
              </label>
              <input
                type="text"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Enter email id / username"
                className="w-full px-3 py-2 mt-1 border border-[#8590AA] rounded-md focus:ring-2 focus:ring-blue-400 text-sm"
              />

              <label className="block text-base font-medium text-black-700 mt-3">
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
                  className="absolute inset-y-0 right-3 top-2 text-sm text-black-600"
                >
                  {passwordVisible ? "Hide" : "Show"}
                </button>
              </div>

              <div className="flex items-center justify-between mt-3">
                <label className="flex items-center text-sm text-blue-600">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={() => setRememberMe(!rememberMe)}
                    className="mr-1"
                  />{" "}
                  Remember me
                </label>
                <a href="#" className="text-sm text-black-600 underline">
                  Forgot Password?
                </a>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-green-500 text-white py-2 mt-3 rounded-md text-base font-medium hover:bg-green-600 disabled:bg-green-300"
              >
                {loading ? "Logging in..." : "Login"}
              </button>
            </form>

            <div className="flex items-center my-4">
              <hr className="flex-grow border-t border-gray-300" />
              <span className="px-2 text-blue-500 text-sm">or login with</span>
              <hr className="flex-grow border-t border-gray-300" />
            </div>

            <div className="flex justify-center space-x-3">
              <button className="p-2 rounded-md shadow bg-white cursor-pointer">
                <FaGoogle size={18} color="#DB4437" />
              </button>
              <button className="p-2 rounded-md shadow bg-white cursor-pointer">
                <FaFacebook size={18} color="#1877F2" />
              </button>
            </div>

            <p className="text-center text-sm mt-3">
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="text-black-600 underline font-medium"
              >
                Register
              </Link>
            </p>
          </div>

          {/* Right Side (Image Placeholder) */}
          <div className="w-[45%] bg-gray-200 rounded-lg h-[85%] mt-3"></div>
        </div>
      </div>
    </div>
  );
};

export default Login;
