import React from "react";
import { FaEnvelope, FaMapMarkerAlt, FaCalendarAlt } from "react-icons/fa";

export default function ProfileHeader({ user }) {
  const getInitials = (name) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <div className="bg-[#f4f5f7] rounded-lg p-6 mb-6">
      <div className="flex items-center gap-6">
        {/* Avatar with initials */}
        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#00c336] to-[#6cc04b] flex items-center justify-center text-white text-3xl font-bold josefin-sans shadow-lg">
          {getInitials(user.name)}
        </div>
        
        {/* User Info */}
        <div className="flex-1">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">{user.name}</h2>
          
          <div className="space-y-1 text-gray-600">
            <div className="flex items-center gap-2">
              <FaEnvelope className="text-sm text-gray-400" />
              <span>{user.email}</span>
            </div>
            
            <div className="flex items-center gap-2">
              <FaMapMarkerAlt className="text-sm text-gray-400" />
              <span>{user.location}</span>
            </div>
            
            <div className="flex items-center gap-2">
              <FaCalendarAlt className="text-sm text-gray-400" />
              <span>Member since {user.memberSince}</span>
            </div>
          </div>
          
          <div className="mt-3">
            <span className="inline-block bg-green-100 text-green-700 text-xs px-3 py-1 rounded-full font-medium">
              Verified Account
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
