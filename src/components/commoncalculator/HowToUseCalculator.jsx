import React, { useState } from "react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";

const steps = [
  "Enter your hashrate in TH/s.",
  "Optional: Adjust the current Bitcoin price and factor in future expectations.",
  "Enter your miner’s power consumption in watts.",
  "Optional: Adjust the current hash value.",
  "Enter the pool fee (usually 2% for PPLNS, 4% for PPS/FPPS).",
  "Click “Calculate” to see revenue, electricity costs, and profit.",
  "Enter your electricity costs per kWh.",
  "Optional: Download the results as a PDF file.",
];

export default function HowToUseCalculator() {
  const [open, setOpen] = useState(false);

  return (
    <div className="bg-[#F4F7F5] rounded-xl shadow my-8 dm-sans">
      {/* Header */}
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between
                   px-4 sm:px-6 py-4 text-left"
      >
        <h3 className="text-base sm:text-lg font-semibold">How to use this calculator?</h3>
        {open ? <FiChevronUp size={22} /> : <FiChevronDown size={22} />}
      </button>

      {/* Content */}
      {open && (
        <div className="px-4 sm:px-6 pb-6 border-t border-[#A6BFAF]">
          <ol
            className="
              grid grid-cols-1 md:grid-cols-2
              gap-x-8 gap-y-4 mt-4
              text-sm sm:text-base text-gray-700
            "
          >
            {steps.map((text, index) => (
              <li key={index} className="flex items-start gap-3">
                <span className="text-green-600 font-bold shrink-0">{index + 1}</span>
                <span>{text}</span>
              </li>
            ))}
          </ol>
        </div>
      )}
    </div>
  );
}
