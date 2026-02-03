import { Link, useParams } from "react-router-dom";
import miningLocations from "../utils/miningLocations";
import SectionHeading from "../components/ui/SectionHeading";
import { use, useEffect } from "react";
import { sendEnquiryMessage } from "../utils/whatsApp";

const LocationDetails = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const { id } = useParams();
  const location = miningLocations.find((loc) => loc.id === id);

  if (!location) {
    return (
      <div className="container-x py-20">
        <h2 className="text-2xl font-bold">Location not found</h2>
      </div>
    );
  }

  return (
    <section className="bg-white py-20">
      <div className="container-x">
        <div className="text-center mb-16">
          <div className="text-2xl md:text-3xl font-bold">
            <SectionHeading>{location.name} Hosting </SectionHeading> Location
          </div>

          <p className="mt-6 max-w-3xl mx-auto text-gray-700 dm-sans">{location.description}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div>
            <h3 className="text-2xl font-bold mb-6">
              {location.code} {location.name} Pricing
            </h3>

            <p className="italic text-gray-600 mb-6">
              Price includes all management services, price from <strong>{location.price}</strong>{" "}
              USD per kWh.
            </p>

            {/* STATS */}
            <div className="space-y-3 text-lg mb-8">
              <p>
                <strong>Capacity:</strong> {location.capacity}
              </p>
              <p>
                <strong>Status:</strong> {location.status}
              </p>
              <p>
                <strong>Energy Source:</strong> {location.energySource}
              </p>
            </div>

            {/* PREMIUM BOX */}
            <div className="border-2 border-[var(--primary-color)] rounded-2xl p-6 mb-6">
              <p className="text-sm uppercase tracking-widest text-gray-600 mb-2">
                Premium Hosting Rate
              </p>

              <h4 className="text-4xl font-extrabold">
                {location.price} <span className="text-xl font-medium">per kWh</span>
              </h4>
            </div>

            {/* SUB PRICING */}
            <div className="space-y-4 mb-8">
              <div className="flex justify-between items-center p-4 rounded-lg bg-white border border-gray-400">
                <span className="text-gray-600">Online ordered miners</span>
                <strong>$0.052 / kWh</strong>
              </div>

              <div className="flex justify-between items-center p-4 rounded-lg bg-white border border-gray-400">
                <span className="text-gray-600">External miners</span>
                <strong>$0.058 / kWh</strong>
              </div>
            </div>

            <button className="w-full md:w-auto cursor-pointer px-10 py-4 rounded-full bg-[var(--primary-color)] text-black font-bold hover:opacity-90 transition">
              <Link to="/shop">START MINING</Link>
            </button>
          </div>

          <div className="relative">
            <img
              src={location.image}
              alt={location.name}
              className="w-full h-[520px] object-cover rounded-3xl"
            />
          </div>
        </div>
        {/* EXTRA DETAILS SECTION */}
        <div className="mt-24 space-y-24">
          {/* OVERVIEW */}
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-3xl font-bold mb-6">About {location.name} Mining Facility</h3>
            <p className="text-gray-700 dm-sans leading-relaxed">
              {location.detailSections.overview}
            </p>
          </div>

          {/* INFO GRID */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* INFRASTRUCTURE */}
            <div className="border border-[#DCDCDC] rounded-2xl p-8 bg-white shadow-sm">
              <h4 className="text-xl font-bold mb-4">Infrastructure</h4>
              <p className="text-gray-600 dm-sans">{location.detailSections.infrastructure}</p>
            </div>

            {/* ENERGY */}
            <div className="border border-[#DCDCDC] rounded-2xl p-8 bg-white shadow-sm">
              <h4 className="text-xl font-bold mb-4">Energy & Sustainability</h4>
              <p className="text-gray-600 dm-sans">{location.detailSections.energy}</p>
            </div>

            {/* WHY LOCATION */}
            <div className="border border-[#DCDCDC] rounded-2xl p-8 bg-white shadow-sm">
              <h4 className="text-xl font-bold mb-4">Why {location.name}</h4>
              <p className="text-gray-600 dm-sans">{location.detailSections.whyThisLocation}</p>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center bg-gray-100 rounded-3xl py-16 px-6">
            <h3 className="text-3xl md:text-4xl font-extrabold mb-6">
              Start Mining in {location.name} Today
            </h3>

            <p className="max-w-2xl mx-auto text-black/80 mb-8 dm-sans">
              Secure reliable infrastructure, renewable energy, and competitive pricing with our
              professionally managed mining facilities.
            </p>

            <button
              className="px-12 py-4 rounded-full bg-black text-white cursor-pointer font-bold hover:opacity-90 transition"
              onClick={() => sendEnquiryMessage()}
            >
              CONTACT
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LocationDetails;
