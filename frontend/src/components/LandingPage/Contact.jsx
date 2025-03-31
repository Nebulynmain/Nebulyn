import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import contactImage from "../../assets/contact.png";

const Contact = () => {
  return (
    <>
      <Navbar />
      <div className="min-h-screen flex flex-col md:flex-row items-center justify-center p-2 md:p-4 gap-6">
        {/* Left Side - Image from assets */}
        <div className="w-full md:w-1/2 flex justify-center">
          <div className="w-full max-w-2xl">
            <img
              src={contactImage}
              alt="Contact illustration"
              className="w-full h-auto object-contain"
              style={{ height: "700px", width: "100%" }}
            />
          </div>
        </div>

        {/* Right Side - Contact Form */}
        <div className="w-full md:w-1/2 max-w-lg">
          <h2 className="text-4xl font-bold mb-6 text-center md:text-left">
            Get in touch!
          </h2>

          <form className="space-y-5">
            <div className="space-y-2">
              <label htmlFor="name" className="font-medium text-lg">
                Your Name:
              </label>
              <input
                type="text"
                id="name"
                placeholder="Name :"
                className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="email" className="font-medium text-lg">
                Your Email:
              </label>
              <input
                type="email"
                id="email"
                placeholder="Email :"
                className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="subject" className="font-medium text-lg">
                Your Question:
              </label>
              <input
                type="text"
                id="subject"
                placeholder="Subject :"
                className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="message" className="font-medium text-lg">
                Your Comment:
              </label>
              <textarea
                id="message"
                placeholder="Message :"
                rows="5"
                className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
              ></textarea>
            </div>

            <button
              type="submit"
              className="bg-[#007AFF] text-white py-2 px-6 rounded-md hover:bg-blue-700 transition duration-300 text-xl font-medium w-full md:w-auto cursor-pointer"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>

      <div className="w-full py-16 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Phone */}
          <div className="flex flex-col items-center text-center p-8 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="w-24 h-24 bg-blue-50 rounded-2xl flex items-center justify-center mb-6">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="#007AFF"
                strokeWidth="2"
                className="w-12 h-12"
              >
                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold mb-4">Phone</h3>
            <p className="text-gray-500 mb-6 text-lg">
              The phrasal sequence of the is now so that many campaign and
              benefit
            </p>
            <a
              href="tel:+152534468854"
              className="text-blue-500 font-bold text-xl hover:text-blue-600 transition-colors"
            >
              +152 534-468-854
            </a>
          </div>

          {/* Email */}
          <div className="flex flex-col items-center text-center p-8 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="w-24 h-24 bg-blue-50 rounded-2xl flex items-center justify-center mb-6">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="#007AFF"
                strokeWidth="2"
                className="w-12 h-12"
              >
                <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold mb-4">Email</h3>
            <p className="text-gray-500 mb-6 text-lg">
              The phrasal sequence of the is now so that many campaign and
              benefit
            </p>
            <a
              href="mailto:contact@example.com"
              className="text-blue-500 font-bold text-xl hover:text-blue-600 transition-colors"
            >
              contact@example.com
            </a>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Contact;
