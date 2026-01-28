import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import miningLocations from "../utils/miningLocations";
import { FiArrowRight, FiZap, FiLayout } from "react-icons/fi";

export default function HostingPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="pt-28 pb-20 bg-gray-50 min-h-screen">
      <div className="container-x mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl font-bold mb-4 font-josefin">Global Mining Hosting</h1>
          <p className="text-gray-600">
            Secure, low-cost, and sustainable Bitcoin mining hosting in strategic locations worldwide. 
            Choose the facility that best fits your mining needs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {miningLocations.map((loc) => (
            <div 
              key={loc.id} 
              className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group"
            >
              <div className="relative h-64 overflow-hidden">
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors z-10" />
                <img 
                  src={loc.image} 
                  alt={loc.name} 
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute top-4 right-4 z-20 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-green-700 shadow-sm">
                  {loc.code}
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-2xl font-bold mb-2 font-josefin group-hover:text-green-600 transition-colors">
                  {loc.name}
                </h3>
                <p className="text-gray-500 mb-6 line-clamp-2 text-sm">
                  {loc.description}
                </p>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-gray-50 p-3 rounded-lg text-center">
                    <div className="text-green-600 mb-1 flex justify-center text-lg">
                      <FiZap />
                    </div>
                    <div className="text-xs text-gray-500 uppercase tracking-wide">Energy</div>
                    <div className="font-semibold text-gray-900 text-sm">{loc.energySource}</div>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg text-center">
                    <div className="text-green-600 mb-1 flex justify-center text-lg">
                      <FiLayout />
                    </div>
                    <div className="text-xs text-gray-500 uppercase tracking-wide">Capacity</div>
                    <div className="font-semibold text-gray-900 text-sm">{loc.capacity}</div>
                  </div>
                </div>

                <div className="flex items-center justify-between mt-auto">
                  <div>
                    <span className="text-xs text-gray-400 block">Hosting Rate</span>
                    <span className="text-lg font-bold text-gray-900">{loc.price} <span className="text-xs font-normal text-gray-400">/ kWh</span></span>
                  </div>
                  <Link 
                    to={`/locations/${loc.id}`}
                    className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center group-hover:bg-green-600 transition-colors shadow-lg"
                  >
                    <FiArrowRight className="text-lg" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
