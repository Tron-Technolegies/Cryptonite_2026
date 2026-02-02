import { useEffect, useState } from "react";
import { addToCart } from "../../api/cart.api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Loading from "../../components/ui/Loading";
import { getBundles } from "../../api/bundles.api";
import { FiActivity, FiZap } from "react-icons/fi";

export default function BundleProducts() {
  const [bundles, setBundles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAdding, setIsAdding] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBundles = async () => {
      try {
        const data = await getBundles();
        setBundles(data);
      } catch (err) {
        setError("Failed to load bundles.");
      } finally {
        setLoading(false);
      }
    };

    fetchBundles();
  }, []);

  const handleBuyNow = async (e, bundleId) => {
    e.preventDefault();
    e.stopPropagation();
    if (isAdding) return;
    setIsAdding(bundleId);
    try {
      await addToCart(null, bundleId, 1);
      navigate("/checkout");
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.error || "Failed to add to cart.");
    } finally {
      setIsAdding(null);
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <Loading />
      </div>
    );

  if (error)
    return (
      <div className="text-center py-20 text-red-500">
        <p>{error}</p>
      </div>
    );

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <div className="mb-10 text-center">
        <h1 className="text-4xl font-bold mb-4 font-josefin">Mining Bundles</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Get the best value with our curated mining bundles. High-performance hardware packages
          designed to maximize your mining efficiency.
        </p>
      </div>

      {bundles.length === 0 ? (
        <div className="text-center py-20 bg-gray-50 rounded-xl">
          <FiPackage className="text-5xl text-gray-400 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-700">No Bundles Available</h2>
          <p className="text-gray-500">Check back later for new offers.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {bundles.map((bundle) => (
            <div
              key={bundle.id}
              className="bg-white rounded-2xl border border-gray-100 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group flex flex-col cursor-pointer"
              onClick={() => navigate(`/bundles/${bundle.id}`)}
            >
              <div className="relative h-64 overflow-hidden bg-gray-50 p-4 flex items-center justify-center">
                {bundle.image ? (
                  <img
                    src={bundle.image}
                    alt={bundle.name}
                    className="h-full object-contain group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <FiPackage className="text-6xl text-gray-300" />
                )}
                <div className="absolute top-4 right-4 bg-black text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                  Bundle Deal
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col">
                <h3 className="text-xl font-bold mb-2 group-hover:text-green-600 transition-colors line-clamp-2">
                  {bundle.name}
                </h3>

                <div className="grid grid-cols-2 gap-3 mb-6">
                  {bundle.total_hashrate && (
                    <div className="bg-green-50 rounded-lg p-2 text-center">
                      <div className="flex justify-center text-green-600 mb-1 text-sm">
                        <FiActivity />
                      </div>
                      <span className="text-xs text-gray-500 block">Total Hashrate</span>
                      <span className="font-semibold text-gray-900 text-sm">
                        {bundle.total_hashrate}
                      </span>
                    </div>
                  )}
                  {bundle.total_power && (
                    <div className="bg-gray-50 rounded-lg p-2 text-center">
                      <div className="flex justify-center text-gray-600 mb-1 text-sm">
                        <FiZap />
                      </div>
                      <span className="text-xs text-gray-500 block">Power</span>
                      <span className="font-semibold text-gray-900 text-sm">
                        {bundle.total_power}
                      </span>
                    </div>
                  )}
                </div>

                <div className="mt-auto flex items-center justify-between border-t border-gray-100 pt-4 gap-4">
                  <div className="flex-shrink-0">
                    <span className="block text-xs text-gray-500">Price</span>
                    <span className="text-xl font-bold text-gray-900">
                      ${Number(bundle.price).toLocaleString()}
                    </span>
                  </div>
                  <button
                    onClick={(e) => handleBuyNow(e, bundle.id)}
                    disabled={isAdding === bundle.id}
                    className="bg-green-600 text-white px-6 py-2 rounded-lg text-sm font-semibold hover:bg-green-700 transition-colors flex-1 disabled:opacity-50"
                  >
                    {isAdding === bundle.id ? "Processing..." : "Buy Now"}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
