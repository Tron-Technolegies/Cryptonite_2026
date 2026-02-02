import { useNavigate, useParams, Link } from "react-router-dom";
import { getBundle, getBundles } from "../../api/bundles.api";
import { addToCart } from "../../api/cart.api";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import Loading from "../../components/ui/Loading";
import {
  FiActivity,
  FiZap,
  FiCheck,
  FiPackage,
  FiBox,
  FiTruck,
  FiShield,
  FiCpu,
} from "react-icons/fi";
import { FaCoins } from "react-icons/fa";
import { PiSpeedometerBold } from "react-icons/pi";
import { TfiBolt } from "react-icons/tfi";
import OptionCard from "../../components/products/OptionCard";
import { getImageUrl } from "../../utils/imageUtils";
import Spec from "../../components/products/Spec";

export default function SingleBundle() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [bundle, setBundle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);
  const [similarBundles, setSimilarBundles] = useState([]);
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchData = async () => {
      try {
        setLoading(true);
        const [bundleData, allBundles] = await Promise.all([
          getBundle(id),
          getBundles(),
        ]);
        setBundle(bundleData);
        
        // Filter for similar bundles (exclude current)
        const similar = allBundles.filter(b => b.id !== bundleData.id).slice(0, 3);
        setSimilarBundles(similar);
      } catch (err) {
        console.error(err);
        setError("Failed to load bundle details.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };

  const handleProceed = async () => {
    if (!selectedOption) {
      toast.error("Please select an option");
      return;
    }

    if (isAdding) return;
    setIsAdding(true);

    try {
      // Add to Backend Cart
      await addToCart(null, bundle.id, quantity);

      // Navigate to Checkout
      navigate("/checkout", {
        state: {
          purchaseType: selectedOption.toLowerCase(),
        },
      });
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.error || "Failed to add to cart.");
    } finally {
      setIsAdding(false);
    }
  };

  if (loading) return <Loading />;

  if (error || !bundle)
    return (
      <div className="text-center py-20 text-red-500 max-w-7xl mx-auto">
        <p>{error || "Bundle not found"}</p>
        <Link to="/bundles" className="text-black underline mt-4 inline-block">
          Back to Bundles
        </Link>
      </div>
    );

  const tabs = [
    { id: "overview", label: "Overview" },
    { id: "items", label: "Items in Bundle" },
    { id: "specs", label: "Specifications" },
    { id: "shipping", label: "Shipping" },
  ];

  return (
    <div className="container-x mx-auto px-6 py-16">
      {/* BREADCRUMBS */}
      <p className="pb-5 flex items-center text-sm">
        <Link to="/" className="text-gray-500 hover:text-green-400">
          Home /{" "}
        </Link>
        <Link to="/bundles" className="text-gray-500 hover:text-green-400">
          Bundles /{" "}
        </Link>
        <span className="text-green-500 ml-1"> {bundle.name}</span>
      </p>

      {/* TOP SECTION */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
        {/* IMAGE */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden flex items-center justify-center p-8">
          {bundle.image ? (
            <img
              src={getImageUrl(bundle.image)}
              alt={bundle.name}
              className="max-h-[500px] w-auto object-contain hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <FiPackage className="text-9xl text-gray-200" />
          )}
        </div>

        {/* INFO */}
        <div>
          <div className="flex items-center gap-3 mb-2">
            <span className="bg-black text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
              Bundle Deal
            </span>
          </div>

          <h1 className="text-4xl font-bold mb-4 font-josefin">{bundle.name}</h1>
          <p className="text-3xl font-bold mb-6" style={{ color: "var(--primary-color)" }}>
            ${Number(bundle.price).toLocaleString()}
          </p>

          <p className="text-gray-600 leading-relaxed mb-6">{bundle.description}</p>
          
          {/* INCLUDED MINERS */}
          <div className="mb-8">
            <h4 className="text-sm font-bold text-gray-900 mb-2 uppercase tracking-wide">Included Miners:</h4>
            <div className="flex flex-wrap gap-2">
              {bundle.items?.map((item, i) => (
                <div key={i} className="flex items-center gap-2 bg-gray-100 px-3 py-1.5 rounded-lg border border-gray-200">
                   <span className="font-bold text-green-600">{item.quantity}x</span>
                   <span className="text-sm font-medium text-gray-800">{item.product_name || `Miner #${item.product_id}`}</span>
                </div>
              ))}
            </div>
          </div>

          {/* QUICK SPECS */}
          <div className="grid grid-cols-2 gap-4 mb-8">
            <Spec icon={<PiSpeedometerBold />} label="Total Hashrate" value={`${bundle.total_hashrate} TH/s`} />
            <Spec icon={<TfiBolt />} label="Total Power" value={`${bundle.total_power} W`} />
            <Spec icon={<FiPackage />} label="Items Count" value={bundle.items?.length || 0} />
            <Spec icon={<FaCoins />} label="Hosting Fee" value={`$${bundle.hosting_fee_per_kw}/kWh`} />
          </div>

          {/* QUANTITY */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Quantity</label>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-10 h-10 bg-gray-200 hover:bg-gray-300 rounded-lg font-bold text-lg transition-colors"
                disabled={isAdding}
              >
                −
              </button>
              <input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                className="w-20 h-10 text-center border border-gray-300 rounded-lg font-semibold focus:outline-none focus:ring-2"
                style={{ focusRingColor: "var(--primary-color)" }}
                min="1"
                disabled={isAdding}
              />
              <button
                onClick={() => setQuantity(Math.min(10, quantity + 1))}
                className="w-10 h-10 bg-gray-200 hover:bg-gray-300 rounded-lg font-bold text-lg transition-colors"
                disabled={quantity >= 10 || isAdding}
              >
                +
              </button>
            </div>
          </div>

          {/* TRUST BADGES */}
          <div className="grid grid-cols-3 gap-6 mt-8 text-center text-xs text-gray-600 border-t border-gray-100 pt-6">
            <Trust icon={<FiShield />} title="Warranty" text="Manufacturer" />
            <Trust icon={<FiTruck />} title="Secure" text="Global Shipping" />
            <Trust icon={<FiBox />} title="Insured" text="Safe Packaging" />
          </div>
        </div>
      </div>

      {/* DEPLOYMENT OPTIONS */}
      <div className="mb-16">
        <h2 className="text-2xl font-bold mb-2 text-center font-josefin">
          How would you like to deploy?
        </h2>
        <p className="text-gray-600 text-center mb-10">Select your preferred deployment method</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          <OptionCard
            title="Hosting"
            price={`$${bundle.hosting_fee_per_kw || "0.00"}/kWh`}
            items={["Including setup", "Including shipping", "Online in 5 days"]}
            available={true}
            onSelect={handleOptionSelect}
            isSelected={selectedOption === "Hosting"}
            showLocationDropdown={true}
          />

          <OptionCard
            title="Rent"
            price="Contact for Rates"
            items={["Cloud mining", "No upfront cost", "Flexible duration"]}
            available={true}
            onSelect={handleOptionSelect}
            isSelected={selectedOption === "Rent"}
          />

          <OptionCard
            title="Buy"
            price={`$${Number(bundle.price).toLocaleString()}`}
            items={["Including shipping", "Including customs", "2 – 4 weeks delivery"]}
            available={true}
            onSelect={handleOptionSelect}
            isSelected={selectedOption === "Buy"}
          />
        </div>

        {selectedOption && (
          <div className="mt-10 text-center">
            <button
              onClick={handleProceed}
              disabled={isAdding}
              className="px-10 py-4 text-white rounded-lg font-bold text-lg hover:shadow-lg transition-all transform hover:-translate-y-1 disabled:opacity-50"
              style={{ backgroundColor: "var(--primary-color)" }}
            >
              {isAdding ? "Processing..." : `Proceed to Checkout (${selectedOption})`}
            </button>
          </div>
        )}
      </div>

      {/* TABS SECTION */}
      <div className="mb-16">
        {/* Tab Navigation */}
        <div className="border-b border-gray-200 mb-8 overflow-x-auto">
          <div className="flex gap-2 min-w-max">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-3 font-medium transition-all border-b-2 ${
                  activeTab === tab.id
                    ? "border-green-600 text-green-600"
                    : "border-transparent text-gray-600 hover:text-gray-900"
                }`}
                style={
                  activeTab === tab.id
                    ? { borderColor: "var(--primary-color)", color: "var(--primary-color)" }
                    : {}
                }
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="bg-white rounded-xl border border-gray-200 p-8">
          {activeTab === "overview" && (
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <h3 className="text-2xl font-bold mb-4">Bundle Overview</h3>
              <p>{bundle.description}</p>
              <h4 className="text-xl font-semibold mt-6 mb-3">Key Benefits</h4>
              <ul className="list-disc list-inside space-y-2">
                <li>Complete mining solution in one package</li>
                <li>Best value for money with bundled pricing</li>
                <li>Perfect for starting or expanding your mining farm</li>
                <li>Fully compatible components guaranteed</li>
              </ul>
            </div>
          )}

          {activeTab === "items" && (
            <div>
              <h3 className="text-2xl font-bold mb-6">Items Included</h3>
              <div className="grid grid-cols-1 gap-4">
                {bundle.items && bundle.items.map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-100">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center border border-gray-200 text-green-600 font-bold">
                        {item.quantity}x
                      </div>
                      <div>
                        <Link to={`/products/${item.product_id}`} className="font-bold text-lg hover:text-green-600 transition-colors">
                          {item.product_name}
                        </Link>
                        <p className="text-gray-500 text-sm">Individual Price: ${Number(item.product_price).toLocaleString()}</p>
                      </div>
                    </div>
                    <div className="text-right">
                       <span className="font-semibold text-gray-900">${(Number(item.product_price) * item.quantity).toLocaleString()}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "specs" && (
            <div>
              <h3 className="text-2xl font-bold mb-6">Aggregate Specifications</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 <SpecRow label="Total Hashrate" value={`${bundle.total_hashrate} TH/s`} />
                 <SpecRow label="Total Power Consumption" value={`${bundle.total_power} W`} />
                 <SpecRow label="Hosting Fee" value={`$${bundle.hosting_fee_per_kw}/kWh`} />
                 <SpecRow label="Number of Devices" value={bundle.items?.reduce((acc, i) => acc + i.quantity, 0) || 0} />
              </div>
            </div>
          )}

          {activeTab === "shipping" && (
             <div>
               <h3 className="text-2xl font-bold mb-4">Shipping Information</h3>
               <p className="mb-4">All bundles are shipped with care to ensure the safety of your mining equipment.</p>
               <ul className="list-disc list-inside space-y-2 text-gray-700">
                 <li>Global shipping available</li>
                 <li>Includes insurance for all items</li>
                 <li>Customs handling included in shipping cost for selected regions</li>
                 <li>Tracking number provided upon dispatch</li>
               </ul>
             </div>
          )}
        </div>
      </div>

      {/* SIMILAR BUNDLES */}
      <div className="bg-white rounded-xl border border-gray-200 p-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Similar Bundles</h2>
          <Link
            to="/bundles"
            className="text-sm font-medium hover:underline"
            style={{ color: "var(--primary-color)" }}
          >
            View All →
          </Link>
        </div>

        {similarBundles.length === 0 ? (
          <p className="text-gray-500 italic">No other bundles found.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {similarBundles.map((b) => (
              <Link
                key={b.id}
                to={`/bundles/${b.id}`}
                className="border border-gray-200 rounded-lg p-4 hover:shadow-lg transition-shadow bg-white"
              >
                <div className="h-48 flex items-center justify-center mb-4 bg-gray-50 rounded-lg">
                  {b.image ? (
                    <img
                      src={getImageUrl(b.image)}
                      alt={b.name}
                      className="max-h-full max-w-full object-contain"
                    />
                  ) : (
                     <FiPackage className="text-5xl text-gray-300" />
                  )}
                </div>
                <h3 className="font-bold text-lg mb-2 line-clamp-1">{b.name}</h3>
                <p className="text-sm text-gray-600 mb-2">
                  {b.total_hashrate} TH/s • {b.total_power}W
                </p>
                <p className="text-xl font-bold" style={{ color: "var(--primary-color)" }}>
                  ${Number(b.price).toLocaleString()}
                </p>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

const Trust = ({ icon, title, text }) => (
  <div className="flex flex-col items-center gap-1">
    <div className="text-green-500 text-lg">{icon}</div>
    <p className="font-semibold">{title}</p>
    <p className="text-gray-500">{text}</p>
  </div>
);

const SpecRow = ({ label, value }) => (
  <div className="flex justify-between items-center py-3 px-4 bg-gray-50 rounded-lg">
    <span className="text-gray-600 font-medium">{label}</span>
    <span className="font-semibold text-gray-900">{value}</span>
  </div>
);
