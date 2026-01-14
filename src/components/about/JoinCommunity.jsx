import React from "react";
import {sendEnquiryMessage} from "../../utils/whatsApp"

const JoinCommunity = () => {
  return (
    <div className="w-full py-20 bg-[#E9FFEE] text-center">
      <h2 className="text-3xl font-bold tracking-wide josefin-sans">
        JOIN OUR MINING COMMUNITY
      </h2>

      <p className="text-black mt-3 max-w-xl mx-auto dm-sans">
        Experience the Cryptonite difference with professional hosting and
        dedicated support.
      </p>

      <button onClick={sendEnquiryMessage} className="mt-8 px-6 py-3 bg-green-500 hover:bg-green-600 text-white font-medium rounded-md transition flex items-center gap-2 mx-auto dm-sans">
        Get Started Today
        <span className="text-xl">→</span>
      </button>
    </div>
  );
};

export default JoinCommunity;
