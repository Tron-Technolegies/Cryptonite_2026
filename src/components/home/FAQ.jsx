import React, { useState } from "react";
import faqs from "../../utils/faq";
import { FaPlus, FaMinus } from "react-icons/fa";

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="bg-black py-24 px-6 md:px-16 text-white">
      {/* TITLE */}
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl josefin-sans font-extrabold tracking-wide uppercase">
          Frequently Asked Questions
        </h2>
        <p className="text-white mt-3 text-sm md:text-base">
          Everything you need to know about our mining services
        </p>
      </div>

      {/* FAQ GRID (2 Columns Like Screenshot) */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
        {faqs.map((faq, index) => {
          const isOpen = openIndex === index;

          return (
            <div
              key={faq.id}
              className="
                bg-[#121212] 
                border border-[#1f1f1f]
                rounded-xl 
                p-6 
                transition-all 
                duration-300
              "
            >
              {/* QUESTION ROW */}
              <button
                className="w-full flex justify-between items-center text-left"
                onClick={() => toggleFAQ(index)}
              >
                <h3 className="text-lg font-semibold text-white">{faq.question}</h3>

                <div
                  className="
                    w-7 h-7 
                    flex items-center justify-center 
                    rounded-full 
                    bg-[#1b1b1b] 
                    border border-gray-700 
                    text-gray-300
                  "
                >
                  {isOpen ? <FaMinus size={12} /> : <FaPlus size={12} />}
                </div>
              </button>

              {/* ANSWER */}
              <div
                className={`
                  overflow-hidden transition-all duration-300
                  ${isOpen ? "max-h-40 mt-4 opacity-100" : "max-h-0 opacity-0"}
                `}
              >
                <p className="text-white leading-relaxed text-sm md:text-base">{faq.answer}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default FAQ;
