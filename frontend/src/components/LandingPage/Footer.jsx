import React from "react";
import { FaFacebookF, FaYoutube, FaInstagram, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="text-black py-8">
      <div className="container mx-auto px-8 lg:px-20">
        <div className="p-8 grid grid-cols-1 md:grid-cols-4 gap-8 text-base">
          <div className="mt-22">
            <p className="text-lg  text-[#8590AA]">Call now:</p>
            <p className="text-lg  text-[#8590AA]">ADDRESS</p>
          </div>

          <div>
            <p className="text-lg font-bold">Quick Link</p>
            <ul className="mt-3 space-y-2 text-[#8590AA]">
              <li>
                <a
                  href="#"
                  className="text-lg hover:font-bold hover:text-black active:font-bold active:text-black"
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-lg hover:font-bold hover:text-black active:font-bold active:text-black"
                >
                  Contact
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-lg hover:font-bold hover:text-black active:font-bold active:text-black"
                >
                  Admin
                </a>
              </li>
            </ul>
          </div>

          <div>
            <p className="text-lg font-bold">Candidate</p>
            <ul className="mt-3 space-y-2 text-[#8590AA]">
              <li>
                <a
                  href="#"
                  className="text-lg hover:font-bold hover:text-black active:font-bold active:text-black"
                >
                  Browse Jobs
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-lg hover:font-bold hover:text-black active:font-bold active:text-black"
                >
                  Browse Employers
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-lg hover:font-bold hover:text-black active:font-bold active:text-black"
                >
                  Candidate Dashboard
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-lg hover:font-bold hover:text-black active:font-bold active:text-black"
                >
                  Saved Jobs
                </a>
              </li>
            </ul>
          </div>

          <div>
            <p className="text-lg font-bold">Employers</p>
            <ul className="mt-3 space-y-2 text-[#8590AA]">
              <li>
                <a
                  href="#"
                  className="text-lg hover:font-bold hover:text-black active:font-bold active:text-black"
                >
                  Post a Job
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-lg hover:font-bold hover:text-black active:font-bold active:text-black"
                >
                  Browse Candidates
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-lg hover:font-bold hover:text-black active:font-bold active:text-black"
                >
                  Employers Dashboard
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-lg hover:font-bold hover:text-black active:font-bold active:text-black"
                >
                  Applications
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t mt-8 pt-6 flex flex-col md:flex-row items-center justify-between text-sm text-black">
          <p className="text-lg">&copy; 2024 NEBULYN. All rights Reserved</p>
          <div className="flex space-x-6 mt-3 md:mt-0 text-2xl">
            <a href="#" className="hover:font-bold">
              <FaFacebookF />
            </a>
            <a href="#" className="hover:font-bold">
              <FaYoutube />
            </a>
            <a href="#" className="hover:font-bold">
              <FaInstagram />
            </a>
            <a href="#" className="hover:font-bold">
              <FaTwitter />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
