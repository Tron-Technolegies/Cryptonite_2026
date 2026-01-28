import React from 'react';
import { FiServer, FiPhone, FiMessageSquare, FiMapPin } from 'react-icons/fi';

const HostingForm = ({ formData, onChange }) => {
    const handleChange = (e) => {
        const { name, value } = e.target;
        onChange({ ...formData, [name]: value });
    };

    return (
        <div className="space-y-4 animate-fadeIn">
            <h3 className="text-lg font-medium text-white flex items-center gap-2">
                <FiServer className="text-green-400" /> Hosting Request
            </h3>
            
            <div className="grid grid-cols-1 gap-4">
                <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FiPhone className="text-gray-500 group-focus-within:text-green-400 transition-colors" />
                    </div>
                    <input
                        type="tel"
                        name="phone"
                        value={formData.phone || ''}
                        onChange={handleChange}
                        placeholder="Phone Number (for coordination)"
                        className="w-full pl-10 pr-4 py-3 bg-gray-900 border border-gray-800 rounded-xl focus:border-green-500 focus:ring-1 focus:ring-green-500 outline-none transition-all placeholder-gray-600 text-white"
                        required
                    />
                </div>

                <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FiMapPin className="text-gray-500 group-focus-within:text-green-400 transition-colors" />
                    </div>
                    <select
                        name="hosting_location"
                        value={formData.hosting_location || ''}
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-3 bg-gray-900 border border-gray-800 rounded-xl focus:border-green-500 focus:ring-1 focus:ring-green-500 outline-none transition-all text-white appearance-none cursor-pointer"
                        required
                    >
                        <option value="" disabled>Select Hosting Location</option>
                        <option value="US">USA (Texas)</option>
                        <option value="ET">Ethiopia</option>
                        <option value="UAE">United Arab Emirates</option>
                    </select>
                </div>

                <div className="relative group">
                    <div className="absolute top-3 left-3 flex items-start pointer-events-none">
                        <FiMessageSquare className="text-gray-500 group-focus-within:text-green-400 transition-colors" />
                    </div>
                    <textarea
                        name="message"
                        value={formData.message || ''}
                        onChange={handleChange}
                        placeholder="Additional requirements or questions..."
                        rows="3"
                        className="w-full pl-10 pr-4 py-3 bg-gray-900 border border-gray-800 rounded-xl focus:border-green-500 focus:ring-1 focus:ring-green-500 outline-none transition-all placeholder-gray-600 text-white resize-none"
                    />
                </div>
            </div>

            <div className="p-4 bg-green-900/10 border border-green-500/20 rounded-xl text-sm text-green-200">
                <p>
                    <strong>Note:</strong> This will create a hosting request ticket. 
                    Our team will contact you to finalize setup details after payment.
                </p>
            </div>
        </div>
    );
};

export default HostingForm;
