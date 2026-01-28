import React from "react";

import zeroFees from "../../assets/why-choose-us/zero-fees.png";
import warranty from "../../assets/why-choose-us/warranty.png";
import aiMining from "../../assets/why-choose-us/ai-mining.png";
import uptime from "../../assets/why-choose-us/uptime.png";
import SectionHeading from "../ui/SectionHeading";

const features = [
  {
    title: "0% Fees",
    description:
      "No hidden charges or extra management fees. You keep 100% of your mining profits.",
    image: zeroFees,
  },
  {
    title: "7 Year Warranty",
    description: "Industry-leading warranty coverage ensures long-term peace of mind.",
    image: warranty,
  },
  {
    title: "AI Smart Mining",
    description: "AI-driven optimization maximizes efficiency and profitability automatically.",
    image: aiMining,
  },
  {
    title: "99%+ Uptime",
    description: "Highly reliable infrastructure ensures continuous mining performance.",
    image: uptime,
  },
];

export default function WhyChooseUs() {
  return (
    <section className="py-20 bg-white">
      <div className="container-x">
        {/* SECTION HEADING */}
        <div className="text-center mb-16">
          <h2 className="text-4xl josefin-sans font-extrabold mb-3">
            <SectionHeading align="center">
              Why Choose <span className="">Us</span>
            </SectionHeading>
          </h2>
        </div>

        {/* CARDS */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((item, index) => (
            <div
              key={index}
              className="overflow-hidden rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition bg-white"
            >
              {/* TOP BLACK SECTION */}
              <div className="bg-black px-6 py-8 text-white relative">
                <h3 className="text-xl ">{item.title}</h3>

                {/* diagonal cut effect */}
                <div className="absolute bottom-0 left-0 w-full h-6 bg-white transform skew-y-[-6deg] origin-bottom-right"></div>
              </div>

              {/* WHITE CONTENT AREA */}
              <div className=" text-center">
                <img src={item.image} alt={item.title} className=" mx-auto mb-6" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
