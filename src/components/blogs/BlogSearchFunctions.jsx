import React, { useState } from "react";
import { FiSearch } from "react-icons/fi";

const BlogSearchFunctions = () => {
  const [active, setActive] = useState("All Posts");

  const categories = [
    "All Posts",
    "Events",
    "Industry Insights",
    "Market Analysis",
    "Technical Guides",
    "Case Studies",
    
  ];

  return (
    <div className="w-full flex flex-col items-center mt-4">
      
      {/* Centered Container */}
      <div className="w-[90%] max-w-3xl mx-auto">
        
        {/* Search Bar */}
        <div className="bg-[#f6f9f6] rounded-full flex items-center gap-3 px-5 py-3 shadow-sm">
          <FiSearch className="text-gray-500 text-lg" />
          <input
            type="text"
            placeholder="Search articles..."
            className="bg-transparent outline-none w-full text-sm"
          />
        </div>

        {/* Categories */}
        <div className="flex flex-wrap justify-center gap-3 mt-6">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`px-4 py-1.5 text-sm rounded-md border transition 
                ${
                  active === cat
                    ? "bg-green-500 text-white border-green-500"
                    : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
                }`}
            >
              {cat}
            </button>
          ))}
        </div>

      </div>

    </div>
  );
};

export default BlogSearchFunctions;
