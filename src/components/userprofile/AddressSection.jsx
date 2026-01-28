import React from "react";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";

export default function AddressSection({ addresses }) {
  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-gray-900">Saved Addresses</h3>
        <button className="flex items-center gap-2 px-4 py-2 bg-[#00c336] text-white rounded-lg hover:bg-[#00a02d] transition-colors">
          <FaPlus />
          Add New Address
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {addresses.map((address) => (
          <div
            key={address.id}
            className="border border-gray-200 rounded-lg p-4 hover:border-[#00c336] transition-colors"
          >
            <div className="flex items-start justify-between mb-3">
              <div>
                <h4 className="font-semibold text-gray-900">{address.type}</h4>
                {address.isDefault && (
                  <span className="inline-block mt-1 text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
                    Default
                  </span>
                )}
              </div>
              <div className="flex gap-2">
                <button className="text-gray-400 hover:text-[#00c336]">
                  <FaEdit />
                </button>
                <button className="text-gray-400 hover:text-red-600">
                  <FaTrash />
                </button>
              </div>
            </div>
            <p className="text-sm text-gray-600 leading-relaxed">
              {address.street}
              <br />
              {address.city}, {address.state} {address.zip}
              <br />
              {address.country}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
