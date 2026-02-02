import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getBundles } from "../../api/bundles.api";
import SectionHeading from "../ui/SectionHeading";
import { getImageUrl } from "../../utils/imageUtils";

export default function BundleSection() {
  const [bundles, setBundles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadBundles();
  }, []);

  const loadBundles = async () => {
    try {
      setLoading(true);
      const data = await getBundles();
      setBundles(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Failed to load bundles:", error);
      setBundles([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-20 bg-gray-50">
      <div className="container-x">
        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-12">
          <div>
            <h2 className="text-4xl font-extrabold mb-2">
              Exclusive <SectionHeading>Bundles</SectionHeading>
            </h2>
            <p className="text-gray-600">Get the best value with our curated mining bundles.</p>
          </div>

          <Link
            to="/bundles"
            className="mt-6 md:mt-0 px-4 py-3 bg-(--primary-color) w-full md:w-auto sm:w-fit  text-white font-semibold rounded-lg hover:brightness-110 transition shadow-lg"
          >
            View All Bundles
          </Link>
        </div>

        {/* LOADING STATE */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="border border-gray-200 rounded-2xl p-6 bg-white animate-pulse h-96"
              ></div>
            ))}
          </div>
        ) : bundles.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-gray-500 text-lg">No bundles available at the moment.</p>
          </div>
        ) : (
          /* BUNDLES GRID */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {bundles.slice(0, 3).map((item) => (
              <Link
                key={item.id}
                to={`/bundles/${item.id}`}
                className="border border-[#DCDCDC] rounded-2xl p-6 bg-white shadow-sm hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer group flex flex-col h-full"
              >
                {/* IMAGE */}
                <div className="relative overflow-hidden rounded-lg mb-6">
                  <img
                    src={getImageUrl(item.image)}
                    alt={item.title}
                    className="w-full h-44 object-contain group-hover:scale-110 transition-transform duration-300"
                  />
                </div>

                {/* CONTENT */}
                <div className="flex flex-col flex-grow">
                  <h3 className="font-semibold text-lg mb-2 leading-snug text-gray-900 group-hover:text-(--primary-color) transition-colors">
                    {item.title}
                  </h3>

                  <p className="text-gray-600 text-sm mb-4 line-clamp-3 flex-grow">
                    {item.description}
                  </p>

                  {/* PRICE */}
                  <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between">
                    <div>
                      {item.compare_at_price && (
                        <span className="block text-sm text-gray-400 line-through">
                          ${Number(item.compare_at_price).toLocaleString()}
                        </span>
                      )}
                      <span className="text-xl font-bold text-black">
                        ${Number(item.price).toLocaleString()}
                      </span>
                    </div>
                    <span className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 group-hover:bg-(--primary-color) group-hover:text-white transition-colors">
                      →
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
