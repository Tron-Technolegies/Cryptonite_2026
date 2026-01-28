import React from "react";
import { FaUser, FaMapMarkerAlt, FaShieldAlt, FaCog, FaHistory, FaSignOutAlt } from "react-icons/fa";

export default function ProfileSidebar({ activeSection, setActiveSection }) {
  const menuItems = [
    { id: "personal", label: "Personal Info", icon: FaUser },
    { id: "address", label: "Address", icon: FaMapMarkerAlt },
    { id: "security", label: "Security", icon: FaShieldAlt },
    { id: "preferences", label: "Preferences", icon: FaCog },
    { id: "orders", label: "Order History", icon: FaHistory },
  ];

  return (
    <div className="bg-white rounded-lg p-4 shadow-sm h-fit sticky top-4">
      <div className="space-y-1">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all ${
                activeSection === item.id
                  ? "bg-[#e8f5e9] text-[#00c336] font-medium"
                  : "text-gray-700 hover:bg-gray-50"
              }`}
            >
              <Icon className="text-lg" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>
      
      <hr className="my-4 border-gray-200" />
      
      <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left text-red-600 hover:bg-red-50 transition-all">
        <FaSignOutAlt className="text-lg" />
        <span>Sign Out</span>
      </button>
    </div>
  );
}
