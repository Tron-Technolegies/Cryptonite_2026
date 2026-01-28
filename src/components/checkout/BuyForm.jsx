import React from 'react';
import { FiMapPin, FiUser } from 'react-icons/fi';

const BuyForm = ({ formData, onChange }) => {
    const handleChange = (e) => {
        const { name, value } = e.target;
        onChange({ ...formData, [name]: value });
    };

    return (
        <div className="space-y-4 animate-fadeIn">
            <h3 className="text-lg font-medium text-white flex items-center gap-2">
                <FiMapPin className="text-blue-400" /> Shipping Details
            </h3>
            
            <div className="grid grid-cols-1 gap-4">
                <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FiUser className="text-gray-500 group-focus-within:text-blue-400 transition-colors" />
                    </div>
                    <input
                        type="text"
                        name="fullName"
                        value={formData.fullName || ''}
                        onChange={handleChange}
                        placeholder="Full Name"
                        className="w-full pl-10 pr-4 py-3 bg-gray-900 border border-gray-800 rounded-xl focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all placeholder-gray-600 text-white"
                        required
                    />
                </div>

                <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FiMapPin className="text-gray-500 group-focus-within:text-blue-400 transition-colors" />
                    </div>
                    <input
                        type="text"
                        name="addressLine1"
                        value={formData.addressLine1 || ''}
                        onChange={handleChange}
                        placeholder="Street Address"
                        className="w-full pl-10 pr-4 py-3 bg-gray-900 border border-gray-800 rounded-xl focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all placeholder-gray-600 text-white"
                        required
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <input
                        type="text"
                        name="city"
                        value={formData.city || ''}
                        onChange={handleChange}
                        placeholder="City"
                        className="w-full px-4 py-3 bg-gray-900 border border-gray-800 rounded-xl focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all placeholder-gray-600 text-white"
                        required
                    />
                    <input
                        type="text"
                        name="state"
                        value={formData.state || ''}
                        onChange={handleChange}
                        placeholder="State / Province"
                        className="w-full px-4 py-3 bg-gray-900 border border-gray-800 rounded-xl focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all placeholder-gray-600 text-white"
                        required
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <input
                        type="text"
                        name="postalCode"
                        value={formData.postalCode || ''}
                        onChange={handleChange}
                        placeholder="Postal / Zip Code"
                        className="w-full px-4 py-3 bg-gray-900 border border-gray-800 rounded-xl focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all placeholder-gray-600 text-white"
                        required
                    />
                    <input
                        type="text"
                        name="country"
                        value={formData.country || ''}
                        onChange={handleChange}
                        placeholder="Country"
                        className="w-full px-4 py-3 bg-gray-900 border border-gray-800 rounded-xl focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all placeholder-gray-600 text-white"
                        required
                    />
                </div>
            </div>
        </div>
    );
};

export default BuyForm;
