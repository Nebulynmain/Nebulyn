import React from "react";
import {
  CheckCircle,
  Briefcase,
  BarChart3,
  Trophy,
  Users,
  ArrowRight,
  BrainCircuit,
  GraduationCap,
  Timer,
  HandHelping,
  Quote,
  Star,
  Sparkles,
} from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import ChatBot from "./ChatBot";

const About = () => {
  return (
    <div className="min-h-screen ">
      <Navbar />

      {/* Hero Section - Enhanced with blue overlay for workspace image */}
      <div className="relative w-full h-[500px] bg-[#007AFF] overflow-hidden">
        {/* Add a gradient on top of blue for depth */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0055B3] to-[#007AFF] opacity-50 z-20"></div>

        {/* Keep the noise texture */}
        <div className="absolute inset-0 bg-[url('https://uploads-ssl.webflow.com/62e3ee10882dc50bcae8d07a/631a5d4631d4c55a475f3e34_noise-50.png')] opacity-30 mix-blend-soft-light z-30"></div>

        {/* Workspace image from your screenshot */}
        <img
          src="https://images.unsplash.com/photo-1499750310107-5fef28a66643"
          alt="Modern workspace with laptops"
          className="w-full h-full object-cover cursor-pointer scale-[1.02] hover:scale-105 transition-all duration-700"
        />

        <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-4 md:p-8 z-40">
          {/* Nebulyn branding */}
          <div className="flex items-center gap-2 mb-6 animate-fade-in opacity-90 cursor-pointer">
            <span className="h-[1px] w-10 bg-white/70"></span>
            <span className="text-sm font-light tracking-wider uppercase">
              NEBULYN
            </span>
            <span className="h-[1px] w-10 bg-white/70"></span>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold mb-4 text-center animate-fade-in drop-shadow-md cursor-pointer">
            About Us
          </h1>
          <div className="w-24 h-1 bg-white mb-8 animate-pulse"></div>
          <p className="text-xl md:text-2xl max-w-3xl text-center font-light leading-relaxed">
            Revolutionizing placement through AI-powered connections
          </p>
          <div className="mt-10 flex gap-4">
            <Link to="/contact">
              <button className="bg-white text-[#007AFF] hover:bg-opacity-90 font-semibold py-3 px-8 transition-all duration-300 rounded-md shadow-lg hover:shadow-xl flex items-center cursor-pointer">
                Get Started
                <ArrowRight className="ml-2" size={18} />
              </button>
            </Link>
          </div>
        </div>
      </div>

      <ChatBot />

      {/* Mission Section - Improved with background accents and better spacing */}
      <div className="container mx-auto px-4 py-24 relative">
        <div className="absolute top-10 right-0 w-48 h-48 bg-blue-100 rounded-full opacity-50 -z-10 animate-pulse"></div>
        <div className="absolute bottom-10 left-0 w-36 h-36 bg-blue-100 rounded-full opacity-50 -z-10 animate-pulse"></div>

        <div className="flex flex-col md:flex-row gap-16 items-center">
          <div className="md:w-1/2">
            <div className="flex items-center gap-2 mb-6">
              <Sparkles className="text-[#007AFF] h-5 w-5 cursor-pointer" />
              <span className="text-sm font-medium tracking-wider uppercase text-[#007AFF] cursor-pointer">
                Our Purpose
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-[#007AFF] mb-8 relative cursor-pointer">
              Our Mission
              <div className="w-16 h-1 bg-[#007AFF] mt-4"></div>
            </h2>
            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              At Nebulyn, we are on a mission to revolutionize the placement
              process by seamlessly connecting students, colleges, and
              companies. Our AI-powered platform transforms hiring by automating
              candidate evaluation, streamlining job applications, and providing
              real-time analytics to employers and institutions.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              By bridging the gap between education and employment, we empower
              students with equitable opportunities while enabling companies to
              discover top talent effortlessly.
            </p>
          </div>
          <div className="md:w-1/2">
            <div className="rounded-2xl overflow-hidden shadow-2xl hover:shadow-[0_20px_50px_rgba(0,122,255,0.3)] transition-all duration-500 transform hover:-translate-y-2 cursor-pointer">
              <img
                src="https://images.unsplash.com/photo-1498050108023-c5249f4df085"
                alt="AI-powered platform"
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Features Section - Upgraded with better card design */}
      <div className="bg-gradient-to-b from-blue-50 to-white py-24">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center justify-center mb-16">
            <div className="flex items-center gap-2 mb-6">
              <Star className="text-[#007AFF] h-5 w-5 cursor-pointer" />
              <span className="text-sm font-medium tracking-wider uppercase text-[#007AFF] cursor-pointer">
                Features
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-[#007AFF] mb-4 text-center cursor-pointer">
              What We Offer
            </h2>
            <div className="w-16 h-1 bg-[#007AFF] mb-6"></div>
            <p className="text-lg text-gray-700 text-center max-w-3xl mx-auto">
              Our comprehensive solution creates a seamless bridge between
              academia and industry
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Feature 1 - Updated with better icon */}
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border-t-4 border-[#007AFF] group hover:-translate-y-2 cursor-pointer">
              <div className="flex justify-center mb-6 bg-blue-50 w-20 h-20 rounded-full mx-auto items-center group-hover:bg-[#007AFF] transition-colors duration-300">
                <BrainCircuit className="h-10 w-10 text-[#007AFF] group-hover:text-white transition-colors duration-300" />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-[#007AFF] text-center">
                AI-driven Profile Scoring
              </h3>
              <p className="text-gray-600 text-center">
                Advanced algorithms that evaluate candidates based on skills and
                potential, eliminating bias and enhancing objective selection.
              </p>
            </div>

            {/* Feature 2 - Updated with better icon */}
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border-t-4 border-[#007AFF] group hover:-translate-y-2 cursor-pointer">
              <div className="flex justify-center mb-6 bg-blue-50 w-20 h-20 rounded-full mx-auto items-center group-hover:bg-[#007AFF] transition-colors duration-300">
                <GraduationCap className="h-10 w-10 text-[#007AFF] group-hover:text-white transition-colors duration-300" />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-[#007AFF] text-center">
                Internship Programs
              </h3>
              <p className="text-gray-600 text-center">
                Connecting students with valuable work experiences that
                accelerate their career readiness and professional growth.
              </p>
            </div>

            {/* Feature 3 - Updated with better icon */}
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border-t-4 border-[#007AFF] group hover:-translate-y-2 cursor-pointer">
              <div className="flex justify-center mb-6 bg-blue-50 w-20 h-20 rounded-full mx-auto items-center group-hover:bg-[#007AFF] transition-colors duration-300">
                <Timer className="h-10 w-10 text-[#007AFF] group-hover:text-white transition-colors duration-300" />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-[#007AFF] text-center">
                Real-time Job Tracking
              </h3>
              <p className="text-gray-600 text-center">
                Monitor application status and receive updates throughout the
                hiring process with our intuitive dashboard interface.
              </p>
            </div>

            {/* Feature 4 - Updated with better icon */}
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border-t-4 border-[#007AFF] group hover:-translate-y-2 cursor-pointer">
              <div className="flex justify-center mb-6 bg-blue-50 w-20 h-20 rounded-full mx-auto items-center group-hover:bg-[#007AFF] transition-colors duration-300">
                <HandHelping className="h-10 w-10 text-[#007AFF] group-hover:text-white transition-colors duration-300" />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-[#007AFF] text-center">
                CSR-driven Training
              </h3>
              <p className="text-gray-600 text-center">
                Special programs for students from low-tier colleges, ensuring
                equal opportunity for all and reducing social inequality.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Vision Section - Enhanced with better layout */}
      <div className="bg-blue-50/50 py-24">
        <div className="container mx-auto px-4 relative">
          <div className="absolute top-20 left-20 w-40 h-40 bg-blue-100 rounded-full opacity-50 -z-10 animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-32 h-32 bg-blue-100 rounded-full opacity-50 -z-10 animate-pulse"></div>

          <div className="flex flex-col md:flex-row gap-16 items-center">
            <div className="md:w-1/2 order-2 md:order-1">
              <div className="rounded-2xl overflow-hidden shadow-2xl hover:shadow-[0_20px_50px_rgba(0,122,255,0.3)] transition-all duration-500 transform hover:-translate-y-2 cursor-pointer">
                <img
                  src="https://images.unsplash.com/photo-1605810230434-7631ac76ec81"
                  alt="The future of hiring"
                  className="w-full h-auto"
                />
              </div>
            </div>
            <div className="md:w-1/2 order-1 md:order-2">
              <div className="flex items-center gap-2 mb-6">
                <Sparkles className="text-[#007AFF] h-5 w-5 cursor-pointer" />
                <span className="text-sm font-medium tracking-wider uppercase text-[#007AFF] cursor-pointer">
                  Looking Forward
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-[#007AFF] mb-8 relative cursor-pointer">
                Our Vision
                <div className="w-16 h-1 bg-[#007AFF] mt-4"></div>
              </h2>
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                Join us in redefining the future of hiring—where every student
                gets the opportunity they deserve, and every company finds the
                right talent effortlessly.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed mb-8">
                We're building a world where the placement process is
                transparent, efficient, and fair for all stakeholders involved.
                By leveraging the power of artificial intelligence and data
                analytics, we're creating a more inclusive hiring ecosystem.
              </p>
              <Link to="/contact">
                <button className="border border-[#007AFF] text-[#007AFF] hover:bg-[#007AFF] hover:text-white px-4 py-2 rounded-md flex items-center transition-all duration-300 cursor-pointer">
                  Learn More <ArrowRight className="ml-2 h-4 w-4" />
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section - Enhanced with better visual appeal */}
      <div className="bg-gradient-to-r from-[#0055B3] to-[#007AFF] text-white py-24">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center justify-center mb-16">
            <div className="flex items-center gap-2 mb-6">
              <BarChart3 className="text-white h-5 w-5 cursor-pointer" />
              <span className="text-sm font-medium tracking-wider uppercase text-white cursor-pointer">
                Our Impact
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center cursor-pointer">
              Our Impact in Numbers
            </h2>
            <div className="w-16 h-1 bg-white/50 mb-6"></div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="group hover:-translate-y-2 transition-all duration-300 cursor-pointer bg-white/10 p-8 rounded-xl backdrop-blur-sm">
              <p className="text-5xl font-bold mb-4 group-hover:text-[#7ad1ff] transition-colors duration-300">
                500+
              </p>
              <p className="text-lg">Partner Companies</p>
            </div>
            <div className="group hover:-translate-y-2 transition-all duration-300 cursor-pointer bg-white/10 p-8 rounded-xl backdrop-blur-sm">
              <p className="text-5xl font-bold mb-4 group-hover:text-[#7ad1ff] transition-colors duration-300">
                50,000+
              </p>
              <p className="text-lg">Students Placed</p>
            </div>
            <div className="group hover:-translate-y-2 transition-all duration-300 cursor-pointer bg-white/10 p-8 rounded-xl backdrop-blur-sm">
              <p className="text-5xl font-bold mb-4 group-hover:text-[#7ad1ff] transition-colors duration-300">
                200+
              </p>
              <p className="text-lg">College Partnerships</p>
            </div>
            <div className="group hover:-translate-y-2 transition-all duration-300 cursor-pointer bg-white/10 p-8 rounded-xl backdrop-blur-sm">
              <p className="text-5xl font-bold mb-4 group-hover:text-[#7ad1ff] transition-colors duration-300">
                95%
              </p>
              <p className="text-lg">Placement Rate</p>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action - Enhanced with better design */}
      <div className="container mx-auto px-4 py-24 text-center">
        <div className="max-w-4xl mx-auto bg-white p-12 rounded-2xl shadow-xl border border-blue-100">
          <h2 className="text-3xl md:text-4xl font-bold text-[#007AFF] mb-6 cursor-pointer">
            Ready to Transform Your Hiring Process?
          </h2>
          <p className="text-lg text-gray-700 mb-10 max-w-2xl mx-auto">
            Whether you're a student looking for opportunities, a college
            seeking placement partnerships, or a company searching for top
            talent, Nebulyn has the solution for you.
          </p>
          <Link to="/contact">
            <button className="bg-[#007AFF] hover:bg-[#0062CC] text-white font-semibold rounded-md shadow-lg hover:shadow-xl transition-all duration-300 px-8 py-6 text-lg flex items-center mx-auto cursor-pointer">
              Get Started Today <ArrowRight className="ml-2" />
            </button>
          </Link>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default About;
