import React from "react";
import { NavLink } from "react-router-dom";
import { FiMail, FiPhone, FiMapPin, FiFacebook, FiInstagram, FiYoutube } from "react-icons/fi";
import { FaXTwitter } from "react-icons/fa6";
import cryptoniteLogo from "../../../public/logos/cryptonitelogoupdated.png";

const Footer = () => {
  return (
    <footer className="bg-black text-white pt-20 pb-10 px-6 md:px-16">
      <div className="max-w-7xl mx-auto">
        {/* GRID */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* LOGO */}
          <div>
            <img src={cryptoniteLogo} alt="Cryptonite Logo" className="h-12 w-auto mb-4" />
            <p className="text-white text-sm leading-relaxed max-w-xs">
              Professional Bitcoin mining infrastructure and hosting operations.
            </p>

            {/* SOCIAL */}
            <div className="flex items-center space-x-4 mt-6 text-xl">
              <FaXTwitter className="cursor-pointer hover:text-(--primary-color)" />
              <FiFacebook className="cursor-pointer hover:text-(--primary-color)" />
              <FiInstagram className="cursor-pointer hover:text-(--primary-color)" />
              <FiYoutube className="cursor-pointer hover:text-(--primary-color)" />
            </div>
          </div>

          {/* QUICK LINKS */}
          <div>
            <h3 className="font-semibold text-lg mb-4">QUICK LINKS</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <NavLink to="/" className="hover:text-(--primary-color)">
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/about" className="hover:text-(--primary-color)">
                  About
                </NavLink>
              </li>
              <li>
                <NavLink to="/hosting" className="hover:text-(--primary-color)">
                  Hosting
                </NavLink>
              </li>
              <li>
                <NavLink to="/contact" className="hover:text-(--primary-color)">
                  Contact
                </NavLink>
              </li>
            </ul>
          </div>

          {/* SERVICES */}
          <div>
            <h3 className="font-semibold text-lg mb-4">SERVICES</h3>
            <ul className="space-y-2 text-sm">
              <li className="hover:text-(--primary-color)">ASIC Mining</li>
              <li className="hover:text-(--primary-color)">Hosting Solutions</li>
              <li className="hover:text-(--primary-color)">Mining</li>
              <li className="hover:text-(--primary-color)">Consultation</li>
              <li className="hover:text-(--primary-color)">Maintenance</li>
            </ul>
          </div>

          {/* CONTACT */}
          <div>
            <h3 className="font-semibold text-lg mb-4">CONTACT</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2">
                <FiPhone className="text-(--primary-color)" /> +436802442479
              </li>
              <li className="flex items-center gap-2">
                <FiMail className="text-(--primary-color)" /> office@cryptonite.at
              </li>
              <li className="flex items-center gap-2">
                <FiMapPin className="text-(--primary-color)" /> Austria
              </li>
            </ul>
          </div>
        </div>

        {/* BOTTOM BAR */}
        <div className="mt-16 border-t border-gray-700 pt-5 flex flex-col md:flex-row justify-between text-sm">
          <p>© 2025 Cryptonite Mining. All rights reserved.</p>
          <div className="flex items-center space-x-6 mt-4 md:mt-0">
            <span className="hover:text-(--primary-color)">Privacy Policy</span>
            <span className="hover:text-(--primary-color)">Terms of Service</span>
            <span className="hover:text-(--primary-color)">Cookie Policy</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
