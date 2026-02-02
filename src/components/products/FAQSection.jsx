import { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const faqData = [
  {
    question: "What is an ASIC miner?",
    answer: "An ASIC (Application-Specific Integrated Circuit) miner is a specialized computer designed exclusively for cryptocurrency mining. Unlike general-purpose GPUs, ASICs are optimized for specific mining algorithms, delivering significantly higher hashrates and energy efficiency."
  },
  {
    question: "How long does shipping take?",
    answer: "Standard international shipping typically takes 5-7 business days from our Shenzhen facility. Express shipping options are available for faster delivery. All orders include full tracking information and insurance."
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept cryptocurrency payments (BTC, ETH, USDT), bank wire transfers, and credit/debit cards. Payment details will be provided during checkout."
  },
  {
    question: "Do you offer bulk discounts?",
    answer: "Yes! We offer competitive pricing for bulk orders. Contact our sales team with your requirements, and we'll provide a custom quote tailored to your needs."
  },
  {
    question: "Can I host my miners at your facility?",
    answer: "Absolutely! We operate multiple hosting facilities worldwide with competitive electricity rates, 24/7 monitoring, and professional maintenance. View our hosting page for detailed information about locations and pricing."
  },
  {
    question: "What's included in the warranty?",
    answer: "All miners come with a standard 180-day warranty covering manufacturer defects. Hosted miners receive enhanced warranty coverage with instant replacement and zero downtime. Extended warranty plans are available for purchase."
  }
];

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
                openIndex === index ? "max-h-96" : "max-h-0"
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
          style={{ backgroundColor: "var(--primary-color)" }}
          onMouseEnter={(e) => (e.target.style.opacity = "0.9")}
          onMouseLeave={(e) => (e.target.style.opacity = "1")}
        >
          Contact Support
        </button>
      </div>
    </div>
  );
}
