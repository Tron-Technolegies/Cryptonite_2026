import React from "react";
import storyImg from "../../../public/hosting/hostingpageimg.png";

const OurStory = () => {
  return (
    <section className="w-full px-4 sm:px-6 md:px-0">
      <div className="max-w-7xl mx-auto my-16 flex flex-col md:flex-row items-center gap-12">
        
        {/* Left Text Section */}
        <div className="flex-1 max-w-xl md:max-w-none">
          <h2 className="text-2xl sm:text-3xl font-bold mb-5 josefin-sans">
            OUR STORY
          </h2>

          <p className="text-base sm:text-[16px] md:text-[17px] leading-relaxed mb-4 text-gray-800 dm-sans">
            Founded in 2019, Cryptonite Mining emerged from a vision to make
            professional cryptocurrency mining accessible to everyone. What
            started as a single data center in Iceland has grown into a global
            operation spanning three continents.
          </p>

          <p className="text-base sm:text-[16px] md:text-[17px] leading-relaxed mb-4 text-gray-800 dm-sans">
            We recognized that mining success requires more than just equipment—
            it demands optimal infrastructure, competitive energy rates, and
            expert support. That’s why we built our facilities in locations with
            abundant renewable energy and optimal cooling conditions.
          </p>

          <p className="text-base sm:text-[16px] md:text-[17px] leading-relaxed text-gray-800 dm-sans">
            Today, we’re proud to serve hundreds of clients worldwide, from
            individual miners to large-scale operations, all benefiting from our
            enterprise-grade infrastructure and dedicated support.
          </p>
        </div>

        {/* Right Image Section */}
        <div className="flex-1 flex justify-center">
          <img
            src={storyImg}
            alt="Our Story"
            className="w-full max-w-xs sm:max-w-sm md:max-w-[420px] rounded-xl object-cover shadow-md"
          />
        </div>

      </div>
    </section>
  );
};

export default OurStory;
