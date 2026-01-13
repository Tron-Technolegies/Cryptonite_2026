import React from "react";
import miningLocations from "../../utils/miningLocations";
import SectionHeading from "../ui/SectionHeading";
import { Link } from "react-router-dom";

const MiningLocations = () => {
  const topLocations = miningLocations.slice(0, 6);

  return (
    <section className="bg-white container-x py-20 px-6 md:px-16">
      {/* HEADING */}
      <div className="text-center mb-14">
        <h2 className="text-3xl md:text-4xl font-extrabold text-black uppercase tracking-wide josefin-sans">
          GLOBAL MINING{" "}
          <SectionHeading align="center" className="mt-2">
            LOCATIONS
          </SectionHeading>
        </h2>
        <p className="text-black mt-2 text-lg dm-sans">
          Strategic data centers worldwide powered by 100% renewable energy
        </p>
      </div>

      {/* LOCATION CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {topLocations.map((location) => (
          <Link
            key={location.id}
            to={`/locations/${location.id}`}
            className="relative h-[420px] rounded-3xl overflow-hidden group block"
          >
            {/* IMAGE */}
            <img
              src={location.image}
              alt={location.name}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />

            {/* OVERLAY */}
            <div className="absolute inset-0 bg-black/55" />

            {/* CONTENT */}
            <div className="relative z-10 h-full flex flex-col items-center justify-center text-white px-6 text-center">
              {/* TOP TEXT */}
              <p className="text-xs uppercase tracking-widest opacity-80 max-w-xs">
                Hosting center located in {location.country} with capacity of {location.capacity}
              </p>

              {/* MAIN TITLE */}
              <h3 className="mt-4 text-2xl md:text-3xl font-bold">
                {location.code} {location.name}
              </h3>

              {/* PRICE */}
              <div className="mt-6">
                <span className="inline-block bg-white text-black px-6 py-2 rounded-full font-semibold text-sm shadow-md">
                  {location.price}/kWh
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default MiningLocations;
