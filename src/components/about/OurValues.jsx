import React from "react";
import { FaUserShield } from "react-icons/fa";
import { BsLightningChargeFill } from "react-icons/bs";
import { MdSupportAgent } from "react-icons/md";
import { GiDiamondHard } from "react-icons/gi";

const OurValues = () => {
  const values = [
    {
      icon: <FaUserShield className="text-green-600 text-2xl" />,
      title: "Mission-Driven",
      desc: "Democratize cryptocurrency mining with accessible, professional grade infrastructure for everyone.",
    },
    {
      icon: <BsLightningChargeFill className="text-green-600 text-2xl" />,
      title: "Innovation First",
      desc: "Constantly improving our technology and processes to deliver the best mining experience.",
    },
    {
      icon: <MdSupportAgent className="text-green-600 text-2xl" />,
      title: "Customer Focused",
      desc: "Your success is our success. We're committed to providing exceptional support and service.",
    },
    {
      icon: <GiDiamondHard className="text-green-600 text-2xl" />,
      title: "Quality Assured",
      desc: "Enterprise-grade infrastructure with industry-leading uptime and security standards.",
    },
  ];

  return (
    <section className="my-20">
      <div className="container-x mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold josefin-sans">OUR VALUES</h2>
        <p className="text-black mt-2 dm-sans">The principles that guide everything we do</p>

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 place-items-center">
          {values.map((item, index) => (
            <div
              key={index}
              className="w-full h-full border border-gray-300 rounded-xl p-6 text-left bg-white shadow-sm hover:shadow-md transition"
            >
              <div className="mb-4">{item.icon}</div>

              <h3 className="font-semibold text-lg dm-sans">{item.title}</h3>
              <p className="text-gray-600 text-sm mt-2 dm-sans">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurValues;
