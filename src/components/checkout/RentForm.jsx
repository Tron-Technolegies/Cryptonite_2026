import React from 'react';
import { FiClock, FiCalendar } from 'react-icons/fi';

const RentForm = ({ formData, onChange }) => {
    const duration = formData.duration_days || 30;

    const handleDurationChange = (e) => {
        onChange({ ...formData, duration_days: parseInt(e.target.value) });
    };

    return (
        <div className="space-y-4 animate-fadeIn">
            <h3 className="text-lg font-medium text-white flex items-center gap-2">
                <FiClock className="text-orange-400" /> Rental Duration
            </h3>
            
            <div className="bg-gray-900 p-6 rounded-xl border border-gray-800">
                <div className="flex justify-between items-end mb-4">
                    <label className="text-gray-400 text-sm">Select Period</label>
                    <span className="text-2xl font-bold text-orange-400 font-mono">
                        {duration} <span className="text-sm text-gray-500 font-sans font-normal">Days</span>
                    </span>
                </div>
                
                <select
                    name="duration_days"
                    value={duration}
                    onChange={handleDurationChange}
                    className="w-full px-4 py-3 bg-gray-900 border border-gray-800 rounded-xl focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none transition-all text-white appearance-none cursor-pointer font-mono"
                    required
                >
                    <option value="30">30 Days (1 Month)</option>
                    <option value="60">60 Days (2 Months)</option>
                    <option value="90">90 Days (3 Months)</option>
                    <option value="180">180 Days (6 Months)</option>
                    <option value="365">365 Days (1 Year)</option>
                </select>
            </div>

            <div className="flex items-start gap-3 p-4 bg-orange-500/10 border border-orange-500/20 rounded-xl text-sm text-orange-200">
                <FiCalendar className="mt-0.5 text-lg flex-shrink-0" />
                <p>
                    Your rental will begin automatically after payment. 
                    You can manage or extend your rental period from your dashboard.
                </p>
            </div>
        </div>
    );
};

export default RentForm;
