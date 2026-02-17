import React from "react";
import { assets } from "../assets/assets_frontend/assets";

const Footer = () => {
  return (
    <>
      <footer className="bg-gray-50 border-t mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 py-14">
          <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-[3fr_1fr_1fr]">
            {/* ----- Brand Section ----- */}
            <div>
              <img src={assets.logo} className="w-44 mb-5" />
              <p className="text-gray-600 leading-6 max-w-md text-sm">
                Prescripto is a modern doctor appointment booking platform
                designed to connect patients with trusted healthcare
                professionals. Book appointments seamlessly, manage schedules,
                and access quality medical care anytime, anywhere.
              </p>
            </div>

            {/* ----- Company Links ----- */}
            <div>
              <p className="text-lg font-semibold mb-4 text-gray-800">
                Company
              </p>
              <ul className="flex flex-col gap-2 text-gray-600 text-sm">
                <li className="hover:text-gray-900 cursor-pointer">Home</li>
                <li className="hover:text-gray-900 cursor-pointer">About Us</li>
                <li className="hover:text-gray-900 cursor-pointer">
                  Contact Us
                </li>
                <li className="hover:text-gray-900 cursor-pointer">
                  Privacy Policy
                </li>
              </ul>
            </div>

            {/* ----- Contact Info ----- */}
            <div>
              <p className="text-lg font-semibold mb-4 text-gray-800">
                Get In Touch
              </p>
              <ul className="flex flex-col gap-2 text-gray-600 text-sm">
                <li>📞 +1 (212) 456-7890</li>
                <li>✉️ support@prescripto.com</li>
              </ul>
            </div>
          </div>

          {/* ----- Bottom Bar ----- */}
          <div className="mt-12 pt-6 border-t">
            <p className="text-center text-xs text-gray-500">
              © 2025 Prescripto. All rights reserved. Built with care for better
              healthcare experiences.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
