import React, { useState } from "react";
import SectionHeading from "../ui/SectionHeading";

const tabs = ["Most Profitable", "Bitcoin Miners", "ALEO Miners"];

export default function ProfitableMiners() {
  const [activeTab, setActiveTab] = useState("Most Profitable");
  const miners = [
    {
      id: 1,
      model_name: "Antminer X9 - 1 MH/s",
      price: 5699,
      cutoff_price: null,
      discount: null,
      daily_profit: "0.00",
      category: "home",
      image: "/products/p1.png",
    },
    {
      id: 2,
      model_name: "Antminer Z15 PRO - 840 KH/s",
      price: 4299,
      cutoff_price: null,
      discount: null,
      daily_profit: "33.31",
      category: "air",
      image: "/products/p3.png",
    },
    {
      id: 3,
      model_name: "Antminer S23 Hyd 3U - 1.16 PH/s",
      price: 23655,
      cutoff_price: 28899,
      discount: 18,
      daily_profit: "44.71",
      category: "hydro",
      image: "/products/p1.png",
    },
    {
      id: 4,
      model_name: "Antminer S21e XP Hyd 3U - 860 TH/s",
      price: 14199,
      cutoff_price: 23230,
      discount: 39,
      daily_profit: "33.16",
      category: "hydro",
      image: "/products/p2.png",
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container-x">
        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-12">
          <div>
            <h2 className="text-4xl font-extrabold mb-2">
              The Most <SectionHeading>Profitable Miners</SectionHeading>{" "}
            </h2>
            <p className="text-gray-600">
              Choose your miner and hosting starting with 4 cents per KW.
            </p>
          </div>

          {/* FILTER TABS */}
          <div className="flex gap-3 mt-6 md:mt-0">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-2 rounded-full text-sm font-semibold transition
                  ${activeTab === tab ? "bg-green-500 text-black" : "bg-gray-100 text-gray-700"}`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* PRODUCTS GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {miners.map((item) => (
            <div
              key={item.id}
              className="border border-[#DCDCDC] rounded-2xl p-6 bg-white shadow-sm hover:shadow-md transition"
            >
              {/* DISCOUNT BADGE */}
              {item.discount && (
                <span className="inline-block mb-3 px-3 py-1 text-xs font-bold text-white bg-red-500 rounded-full">
                  Save {item.discount}%
                </span>
              )}

              {/* IMAGE */}
              <img
                src={item.image}
                alt={item.model_name}
                className="w-full h-44 object-contain mb-6"
              />

              {/* TITLE */}
              <h3 className="font-semibold text-lg mb-3 leading-snug">{item.model_name}</h3>

              {/* PRICE */}
              <div className="mb-4">
                {item.cutoff_price && (
                  <span className="block text-sm text-gray-400 line-through">
                    ${item.cutoff_price.toLocaleString()}
                  </span>
                )}
                <span className="text-xl font-bold text-black">${item.price.toLocaleString()}</span>
              </div>

              {/* DAILY PROFIT */}
              <span className="inline-block px-4 py-1 text-sm font-semibold text-white bg-green-500 rounded-full">
                ${item.daily_profit}/day
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
