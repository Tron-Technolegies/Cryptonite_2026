import { useState } from "react";
import { hostingBenefits } from "../../utils/productDetails";
import { FaCheckCircle, FaBolt, FaShieldAlt, FaExchangeAlt, FaCoins } from "react-icons/fa";
import HostingForm from "./HostingForm";
import miningLocations from "../../utils/miningLocations";

export default function HostingSection() {
  const [showForm, setShowForm] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(miningLocations[0]);

  const benefitIcons = {
    0: FaShieldAlt,
    1: FaBolt,
    2: FaBolt,
    3: FaExchangeAlt,
    4: FaCoins
  };

  return (
    <>
      <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8">
        <h3 className="text-2xl font-bold mb-6">Bitcoin and Cryptocurrency ASIC Miner Hosting Services</h3>

        {/* Location Selector */}
        <div className="mb-8">
          <h4 className="text-xl font-bold mb-4">Select Hosting Location</h4>
          <select
            value={selectedLocation.id}
            onChange={(e) => setSelectedLocation(miningLocations.find(loc => loc.id === e.target.value))}
            className="w-full md:w-1/2 p-3 border-2 border-gray-300 rounded-lg font-semibold focus:outline-none focus:ring-2"
            style={{ focusRingColor: 'var(--primary-color)' }}
          >
            {miningLocations.map((location) => (
              <option key={location.id} value={location.id}>
                {location.name} - {location.price}/kWh
              </option>
            ))}
          </select>
        </div>

        {/* Selected Location Details */}
        <div className="mb-8 p-6 bg-gradient-to-br from-green-50 to-white rounded-xl border-2 border-green-200">
          <div className="flex items-start gap-4 mb-4">
            <img 
              src={selectedLocation.image} 
              alt={selectedLocation.name}
              className="w-24 h-24 rounded-lg object-cover"
            />
            <div className="flex-1">
              <h5 className="text-2xl font-bold mb-2">{selectedLocation.name}</h5>
              <p className="text-gray-700 mb-3">{selectedLocation.description}</p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <div>
                  <p className="text-xs text-gray-500">Price</p>
                  <p className="font-bold text-green-600">{selectedLocation.price}/kWh</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Capacity</p>
                  <p className="font-bold">{selectedLocation.capacity}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Hashrate</p>
                  <p className="font-bold">{selectedLocation.hashRateCapacity}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Energy</p>
                  <p className="font-bold">{selectedLocation.energySource}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* All Available Locations */}
        <div className="mb-8">
          <h4 className="text-xl font-bold mb-4">All Available Locations</h4>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {miningLocations.map((location, index) => (
              <div 
                key={index}
                onClick={() => setSelectedLocation(location)}
                className={`border-2 rounded-lg p-4 transition-all cursor-pointer hover:shadow-lg ${
                  selectedLocation.id === location.id 
                    ? 'border-green-600 bg-green-50' 
                    : 'border-gray-200 hover:border-green-400'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-lg font-bold">{location.country}</span>
                  <span className="text-2xl font-bold" style={{ color: 'var(--primary-color)' }}>
                    {location.price}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-1">{location.energySource}</p>
                <p className="text-xs text-gray-500">{location.capacity} • {location.hashRateCapacity}</p>
                <span className={`inline-block mt-2 text-xs px-2 py-1 rounded-full ${
                  location.status === 'Operational' 
                    ? 'bg-green-100 text-green-700' 
                    : 'bg-yellow-100 text-yellow-700'
                }`}>
                  {location.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Hosting Benefits */}
        <div className="mb-8">
          <h4 className="text-xl font-bold mb-4">Our Hosting Services</h4>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {hostingBenefits.map((benefit, index) => {
              const Icon = benefitIcons[index] || FaCheckCircle;
              return (
                <div 
                  key={index}
                  className="flex items-start gap-4 p-4 bg-gradient-to-br from-green-50 to-white rounded-lg border border-gray-200 hover:shadow-md transition-shadow"
                >
                  <div className="p-3 rounded-full bg-white border-2 border-green-500">
                    <Icon className="text-xl" style={{ color: 'var(--primary-color)' }} />
                  </div>
                  <div className="flex-1">
                    <h5 className="font-semibold mb-1">{benefit.title}</h5>
                    <p className="text-sm text-gray-700">{benefit.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Transparent Pricing */}
        <div className="bg-gradient-to-br from-blue-50 to-green-50 rounded-lg p-6 border border-gray-200">
          <h4 className="text-xl font-bold mb-3">Transparent Pricing</h4>
          <p className="text-gray-700 leading-relaxed mb-4">
            Our hosting fees are fully inclusive, covering electricity, facility maintenance, infrastructure, and technical support with no hidden costs. 
            The hosting fees are automatically deducted from your mining earnings, making it hassle-free.
          </p>
          
          <div className="flex items-center gap-3 p-4 bg-white rounded-lg">
            <FaCheckCircle className="text-2xl flex-shrink-0" style={{ color: 'var(--primary-color)' }} />
            <p className="text-gray-700">
              <span className="font-semibold">All-Inclusive:</span> No setup fees, no maintenance fees, no surprise charges. 
              What you see is what you pay.
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-6 text-center">
          <button 
            onClick={() => setShowForm(true)}
            className="px-8 py-3 rounded-lg font-medium text-white transition-all hover:shadow-lg"
            style={{ backgroundColor: 'var(--primary-color)' }}
            onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
            onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
          >
            Request Hosting Information
          </button>
        </div>
      </div>

      {showForm && <HostingForm onClose={() => setShowForm(false)} selectedLocation={selectedLocation} />}
    </>
  );
}
