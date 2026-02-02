import { FaWhatsapp } from "react-icons/fa";
import { sendEnquiryMessage } from "../../utils/whatsApp";

const WhatsAppFloat = () => {
  return (
    <button
      onClick={sendEnquiryMessage}
      className="fixed bottom-6 right-6 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300 flex items-center justify-center cursor-pointer"
      aria-label="Chat on WhatsApp"
    >
      <FaWhatsapp className="text-3xl" />
    </button>
  );
};

export default WhatsAppFloat;
