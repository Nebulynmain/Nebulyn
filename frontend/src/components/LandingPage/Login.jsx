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
      <div className="p-6 ml-22">
        <h2 className="text-4xl font-bold text-gray-900">
          Login to your Account
        </h2>
        <p className="text-[#3B8BEB] mt-4 text-xl">
          Welcome back! Select the below login methods.
        </p>
      </div>
      <div className="flex items-center justify-center h-full -mt-32">
        <div
          className="bg-white p-10 rounded-3xl w-full max-w-4xl flex h-[700px] shadow-2xl"
          style={{ boxShadow: "0px 10px 20px #C4DBF6" }}
        >
          {/* Left Side (Login Form) */}
          <div className="w-[70%] pr-8 flex flex-col justify-center -ml-2">
            <label className="block text-xl font-medium text-black-700">
              Email ID / Username
            </label>
            <input
              type="text"
              placeholder="Enter email id / username"
              className="w-full px-6 py-4 mt-3 border border-[#8590AA] rounded-lg focus:ring-2 focus:ring-blue-400 text-lg"
            />

            <label className="block text-xl font-medium text-black-700 mt-6">
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
                className="absolute inset-y-0 right-5 top-3 text-lg text-black-600"
              >
                {passwordVisible ? "Hide" : "Show"}
              </button>
            </div>

            <div className="flex items-center justify-between mt-5">
              <label className="flex items-center text-lg text-blue-600">
                <input type="checkbox" className="mr-3" /> Remember me
              </label>
              <a href="#" className="text-lg text-black-600 underline">
                Forgot Password?
              </a>
            </div>

            <button className="w-full bg-green-500 text-white py-4 mt-6 rounded-lg text-xl font-medium hover:bg-green-600">
              Login
            </button>

            <div className="flex items-center my-6 mt-10">
              <hr className="flex-grow border-t border-gray-300" />
              <span className="px-4 text-blue-500 text-lg">or login with</span>
              <hr className="flex-grow border-t border-gray-300" />
            </div>

            <div className="flex justify-center space-x-6">
              {/* Google Login */}
              <div className="flex justify-center space-x-6">
                {/* Google Login */}
                <button
                  className="p-4 rounded-lg shadow-lg bg-white cursor-pointer"
                  onClick={() => googleLogin()}
                >
                  <FaGoogle size={28} color="#DB4437" />
                </button>
              </div>

              {/* Facebook Login */}
              {/* Facebook Login */}
              <button
                className="p-4 rounded-lg shadow-lg bg-white cursor-pointer"
                onClick={facebookLogin}
              >
                <FaFacebook size={28} color="#1877F2" />
              </button>

              {/* LinkedIn Login */}
              {/* <LinkedIn
                    clientId={linkedInClientId}
                    onFailure={(error) =>
                      console.error("LinkedIn Error", error)
                    }
                    onSuccess={handleLinkedInSuccess}
                    redirectUri="http://localhost:3000/linkedin"
                    renderElement={({ onClick }) => (
                      <button
                        className="p-4 rounded-lg shadow-lg bg-white"
                        onClick={onClick}
                      >
                        <FaLinkedin size={28} color="#0077B5" />
                      </button>
                    )}
                  /> */}
            </div>

            <p className="text-center text-lg mt-6">
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
          <div className="w-[50%] bg-gray-200 rounded-lg h-[90%] mt-6"></div>
        </div>
      </div>
    </div>
  );
};

export default Login;
