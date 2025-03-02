import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { Link } from "react-router-dom";
import { FaGoogle, FaFacebook, FaLinkedin } from "react-icons/fa";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { googleLogout, useGoogleLogin } from "@react-oauth/google";
import FacebookLogin from "react-facebook-login-lite";
// import { LinkedIn } from "react-linkedin-login-oauth2";

const Login = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);

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
        <h2 className="text-4xl font-bold text-gray-900">
          Login to your Account
        </h2>
        <p className="text-[#3B8BEB] mt-2 text-xl">
          Welcome back! Select the below login methods.
        </p>
      </div>
      <div className="flex items-center justify-center">
        <div
          className="bg-white p-10 rounded-3xl w-full max-w-4xl flex h-[550px] shadow-2xl mt-3"
          style={{ boxShadow: "0px 10px 20px #C4DBF6" }}
        >
          {/* Left Side (Login Form) */}
          <div className="w-[60%] pr-6 flex flex-col justify-center -ml-2">
            <label className="block text-lg font-medium text-black-700">
              Email ID / Username
            </label>
            <input
              type="text"
              placeholder="Enter email id / username"
              className="w-full px-4 py-3 mt-2 border border-[#8590AA] rounded-md focus:ring-2 focus:ring-blue-400 text-base"
            />

            <label className="block text-lg font-medium text-black-700 mt-4">
              Password
            </label>
            <div className="relative">
              <input
                type={passwordVisible ? "text" : "password"}
                placeholder="Enter password"
                className="w-full px-4 py-3 mt-2 border border-[#8590AA] rounded-md focus:ring-2 focus:ring-blue-400 text-base"
              />
              <button
                type="button"
                onClick={() => setPasswordVisible(!passwordVisible)}
                className="absolute inset-y-0 right-4 top-2 text-base text-black-600"
              >
                {passwordVisible ? "Hide" : "Show"}
              </button>
            </div>

            <div className="flex items-center justify-between mt-4">
              <label className="flex items-center text-base text-blue-600">
                <input type="checkbox" className="mr-2" /> Remember me
              </label>
              <a href="#" className="text-base text-black-600 underline">
                Forgot Password?
              </a>
            </div>

            <button className="w-full bg-green-500 text-white py-3 mt-4 rounded-md text-lg font-medium hover:bg-green-600">
              Login
            </button>

            <div className="flex items-center my-5">
              <hr className="flex-grow border-t border-gray-300" />
              <span className="px-3 text-blue-500 text-base">
                or login with
              </span>
              <hr className="flex-grow border-t border-gray-300" />
            </div>

            <div className="flex justify-center space-x-4">
              <button className="p-3 rounded-md shadow-md bg-white cursor-pointer">
                <FaGoogle size={22} color="#DB4437" />
              </button>
              <button className="p-3 rounded-md shadow-md bg-white cursor-pointer">
                <FaFacebook size={22} color="#1877F2" />
              </button>
            </div>

            <p className="text-center text-base mt-4">
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
          <div className="w-[40%] bg-gray-200 rounded-lg h-[90%] mt-4"></div>
        </div>
      </div>
    </div>
  );
};

export default Login;
