import React from "react";
import { FaLock, FaKey } from "react-icons/fa";

export default function SecuritySection() {
  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <h3 className="text-xl font-semibold text-gray-900 mb-6">Security Settings</h3>

      <div className="space-y-6">
        <div className="border border-gray-200 rounded-lg p-5">
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <FaLock className="text-[#00c336]" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">Password</h4>
                <p className="text-sm text-gray-600">
                  Last changed 3 months ago
                </p>
              </div>
            </div>
            <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors">
              Change Password
            </button>
          </div>
        </div>

        <div className="border border-gray-200 rounded-lg p-5">
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <FaKey className="text-blue-600" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">
                  Two-Factor Authentication
                </h4>
                <p className="text-sm text-gray-600">
                  Add an extra layer of security to your account
                </p>
              </div>
            </div>
            <button className="px-4 py-2 bg-[#00c336] text-white rounded-lg text-sm font-medium hover:bg-[#00a02d] transition-colors">
              Enable
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
