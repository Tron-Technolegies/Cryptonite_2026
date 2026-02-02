import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getProducts } from "../../api/product.api";
import SectionHeading from "../ui/SectionHeading";
import { getImageUrl } from "../../utils/imageUtils";

const tabs = [
  { label: "Most Profitable", filter: "profitable" },
  { label: "Bitcoin Miners", filter: "bitcoin" },
  { label: "ALEO Miners", filter: "aleo" },
];

export default function ProfitableMiners() {
  const [activeTab, setActiveTab] = useState("bitcoin");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      setLoading(true);
      const data = await getProducts();
      setProducts(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Failed to load products:", error);
      setProducts([]); // Set empty array on error
    } finally {
      setLoading(false);
    }
  };

  // Filter products based on active tab
  const getFilteredProducts = () => {
    if (!products || products.length === 0) return [];

    let filtered = [...products];

    switch (activeTab) {
      case "profitable":
        // Sort by daily profit (highest first)
        filtered = filtered
          .filter((p) => p.daily_profit && parseFloat(p.daily_profit) > 0)
          .sort((a, b) => parseFloat(b.daily_profit || 0) - parseFloat(a.daily_profit || 0))
          .slice(0, 8);
        break;

      case "bitcoin":
        // Filter for SHA-256 algorithm (Bitcoin miners)
        filtered = filtered.filter(
          (p) =>
            p.algorithm?.toLowerCase().includes("sha") ||
            p.model_name?.toLowerCase().includes("antminer s") ||
            p.model_name?.toLowerCase().includes("whatsminer m"),
        );
        break;

      case "aleo":
        // Filter for ALEO/other GPU miners
        filtered = filtered.filter(
          (p) =>
            p.algorithm?.toLowerCase().includes("aleo") ||
            p.model_name?.toLowerCase().includes("aleo"),
        );
        break;

      default:
        filtered = filtered.slice(0, 8);
    }

    return filtered.slice(0, 8); // Limit to 8 products
  };

  const filteredProducts = getFilteredProducts();

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
                key={tab.filter}
                onClick={() => setActiveTab(tab.filter)}
                className={`px-6 py-2 rounded-full text-sm font-semibold transition-all ${
                  activeTab === tab.filter
                    ? "text-black shadow-md"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
                style={activeTab === tab.filter ? { backgroundColor: "var(--primary-color)" } : {}}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* LOADING STATE */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="border border-gray-200 rounded-2xl p-6 bg-white animate-pulse"
              >
                <div className="h-8 bg-gray-200 rounded mb-3 w-20"></div>
                <div className="h-44 bg-gray-200 rounded mb-6"></div>
                <div className="h-6 bg-gray-200 rounded mb-3"></div>
                <div className="h-8 bg-gray-200 rounded mb-4 w-32"></div>
                <div className="h-8 bg-gray-200 rounded w-24"></div>
              </div>
            ))}
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-gray-500 text-lg">No products found for this category.</p>
          </div>
        ) : (
          /* PRODUCTS GRID */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {filteredProducts.map((item) => (
              <Link
                key={item.id}
                to={`/products/${item.id}`}
                className="border border-[#DCDCDC] rounded-2xl p-6 bg-white shadow-sm hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer group"
              >
                {/* DISCOUNT BADGE */}
                {item.discount && (
                  <span className="inline-block mb-3 px-3 py-1 text-xs font-bold text-white bg-red-500 rounded-full">
                    Save {item.discount}%
                  </span>
                )}

                {/* IMAGE */}
                <div className="relative overflow-hidden rounded-lg mb-6">
                  <img
                    src={getImageUrl(item.image)}
                    alt={item.model_name}
                    className="w-full h-44 object-contain group-hover:scale-110 transition-transform duration-300"
                  />
                </div>

                {/* TITLE */}
                <h3 className="font-semibold text-lg mb-3 leading-snug line-clamp-2 min-h-[3.5rem]">
                  {item.model_name}
                </h3>

                {/* PRICE */}
                <div className="mb-4">
                  {item.cutoff_price && (
                    <span className="block text-sm text-gray-400 line-through">
                      ${Number(item.cutoff_price).toLocaleString()}
                    </span>
                  )}
                  <span className="text-xl font-bold text-black">
                    ${Number(item.price).toLocaleString()}
                  </span>
                </div>

                {/* DAILY PROFIT */}
                {item.daily_profit && parseFloat(item.daily_profit) > 0 ? (
                  <span
                    className="inline-block px-4 py-1 text-sm font-semibold text-white rounded-full"
                    style={{ backgroundColor: "var(--primary-color)" }}
                  >
                    ${Number(item.daily_profit).toFixed(2)}/day
                  </span>
                ) : (
                  <span className="inline-block px-4 py-1 text-sm font-semibold text-gray-500 bg-gray-100 rounded-full">
                    Calculate Profit
                  </span>
                )}
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
