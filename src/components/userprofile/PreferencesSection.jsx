import React from "react";
import { FaBell, FaEnvelope, FaMoon } from "react-icons/fa";

export default function PreferencesSection() {
  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <h3 className="text-xl font-semibold text-gray-900 mb-6">Preferences</h3>

      <div className="space-y-6">
        <div className="flex items-center justify-between py-4 border-b border-gray-200">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
              <FaBell className="text-purple-600" />
            </div>
            <div>
              <h4 className="font-semibold text-gray-900">Push Notifications</h4>
              <p className="text-sm text-gray-600">
                Receive notifications about your orders
              </p>
            </div>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" className="sr-only peer" defaultChecked />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#00c336]"></div>
          </label>
        </div>

        <div className="flex items-center justify-between py-4 border-b border-gray-200">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
              <FaEnvelope className="text-blue-600" />
            </div>
            <div>
              <h4 className="font-semibold text-gray-900">Email Notifications</h4>
              <p className="text-sm text-gray-600">
                Receive promotional emails and updates
              </p>
            </div>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" className="sr-only peer" defaultChecked />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#00c336]"></div>
          </label>
        </div>

        <div className="flex items-center justify-between py-4">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center">
              <FaMoon className="text-white" />
            </div>
            <div>
              <h4 className="font-semibold text-gray-900">Dark Mode</h4>
              <p className="text-sm text-gray-600">
                Switch to dark theme
              </p>
            </div>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" className="sr-only peer" />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#00c336]"></div>
          </label>
        </div>
      </div>
    </div>
  );
}
