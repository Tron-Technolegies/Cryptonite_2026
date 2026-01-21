import { useState } from "react";
import { faqData } from "../../utils/productDetails";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8">
      <h3 className="text-2xl font-bold mb-6">Frequently Asked Questions</h3>

      <div className="space-y-3">
        {faqData.map((faq, index) => (
          <div 
            key={index}
            className="border border-gray-200 rounded-lg overflow-hidden hover:border-green-500 transition-colors"
          >
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full flex items-center justify-between p-4 text-left bg-white hover:bg-gray-50 transition-colors"
            >
              <span className="font-semibold text-gray-900 pr-4">{faq.question}</span>
              {openIndex === index ? (
                <FaChevronUp className="text-gray-600 flex-shrink-0" />
              ) : (
                <FaChevronDown className="text-gray-600 flex-shrink-0" />
              )}
            </button>
            
            <div 
              className={`overflow-hidden transition-all duration-300 ${
                openIndex === index ? 'max-h-96' : 'max-h-0'
              }`}
            >
              <div className="p-4 pt-0 bg-gray-50">
                <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Contact Support */}
      <div className="mt-8 p-6 bg-gradient-to-br from-green-50 to-blue-50 rounded-lg border border-gray-200 text-center">
        <h4 className="font-bold text-lg mb-2">Still Have Questions?</h4>
        <p className="text-gray-700 mb-4">
          Our support team is available 24/7 to help you with any inquiries.
        </p>
        <button 
          className="px-6 py-2 rounded-lg font-medium text-white transition-all"
          style={{ backgroundColor: 'var(--primary-color)' }}
          onMouseEnter={(e) => e.target.style.opacity = '0.9'}
          onMouseLeave={(e) => e.target.style.opacity = '1'}
        >
          Contact Support
        </button>
      </div>
    </div>
  );
}
