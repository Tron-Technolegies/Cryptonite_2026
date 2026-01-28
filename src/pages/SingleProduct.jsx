import { Link, useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import products from "../utils/products";
import { getCoinData } from "../api/price.api";
import Spec from "../components/products/Spec";
import OptionCard from "../components/products/OptionCard";
import ProductProfitabilityGraph from "../components/products/ProductProfitabilityGraph";
import ProductSpecifications from "../components/products/ProductSpecifications";
import ProductReviews from "../components/products/ProductReviews";
import WarrantySection from "../components/products/WarrantySection";
import HostingSection from "../components/products/HostingSection";
import ShippingSection from "../components/products/ShippingSection";
import FAQSection from "../components/products/FAQSection";
import { FiBox, FiCpu, FiShield, FiTruck, FiDollarSign } from "react-icons/fi";
import { TfiBolt } from "react-icons/tfi";
import { FaCoins } from "react-icons/fa";
import { LiaTachometerAltSolid } from "react-icons/lia";
import { PiSpeedometerBold } from "react-icons/pi";
import miningLocations from "../utils/miningLocations";
import { addToCart } from "../api/cart.api";

export default function SingleProduct() {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { id } = useParams();
  const product = products.find((p) => p.id === Number(id));
  const [coinData, setCoinData] = useState(null);
  const [activeTab, setActiveTab] = useState("overview");
  const [selectedOption, setSelectedOption] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    // Fetch only the coin that this machine mines
    const coinMap = {
      BTC: "bitcoin",
      LTC: "litecoin",
      KAS: "kaspa",
      DOGE: "dogecoin",
      ETC: "ethereum-classic",
    };

    const coinId = coinMap[product?.coin];
    if (coinId) {
      getCoinData(coinId).then(setCoinData).catch(console.error);
    }
  }, [product]);

  const handleBuyNow = async () => {
    if (isAdding) return;
    setIsAdding(true);
    try {
      // Add to Backend Cart
      await addToCart(product.id, null, quantity);
      
      // Navigate to Checkout (Source of truth is now backend cart)
      navigate("/checkout");
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.error || "Failed to add to cart. Are you logged in?");
    } finally {
      setIsAdding(false);
    }
  };

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };
  
  const handleProceedWithOption = async () => {
    if (!selectedOption) {
      toast.error("Please select a deployment option");
      return;
    }
    
    if (selectedOption === 'Shipment') {
        // Shipment is effectively "Buy Now"
        handleBuyNow();
        return;
    }

    if (isAdding) return;
    setIsAdding(true);
    try {
      // Add to Backend Cart
      await addToCart(product.id, null, quantity);
      
      // Navigate to Checkout
      navigate("/checkout", { 
        state: { 
          purchaseType: selectedOption.toLowerCase() 
        } 
      });
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.error || "Failed to add to cart. Are you logged in?");
    } finally {
      setIsAdding(false);
    }
  };

  if (!product) return <p className="text-center py-20">Product not found</p>;

  const tabs = [
    { id: "overview", label: "Overview" },
    { id: "specifications", label: "Specifications" },
    { id: "reviews", label: "Reviews" },
    { id: "warranty", label: "Warranty" },
    { id: "hosting", label: "Hosting" },
    { id: "shipping", label: "Shipping" },
    { id: "faq", label: "FAQ" },
  ];

  return (
    <div className="container-x mx-auto px-6 py-16">
      <p className="pb-5 flex items-center">
        <Link to="/" className="text-gray-500 hover:text-green-400">
          Home /{" "}
        </Link>
        <Link to="/shop" className="text-gray-500 hover:text-green-400">
          {" "}
          Products /{" "}
        </Link>
        <p className="text-green-500"> {product.name}</p>
      </p>
      {/* TOP SECTION */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
        {/* Image */}
        <img
          src={product.image}
          alt={product.name}
          className="rounded-xl border border-gray-200 shadow-lg"
        />

        {/* Info */}
        <div>
          <div className="flex items-center gap-3 mb-2">
            <span
              className="text-xs px-3 py-1 rounded-full"
              style={{ backgroundColor: "var(--primary-color)", color: "white" }}
            >
              {product.brand}
            </span>
            <span
              className="bg-green-100 text-xs px-3 py-1 rounded-full"
              style={{ color: "var(--primary-color)" }}
            >
              In Stock
            </span>
          </div>

          <h1 className="text-3xl font-bold mb-3">{product.name}</h1>

          <p className="text-3xl font-semibold mb-4" style={{ color: "var(--primary-color)" }}>
            ${product.price?.toLocaleString() || "Contact for Price"}
          </p>

          <p className="text-gray-600 leading-relaxed mb-6">{product.description}</p>

          {/* Specs */}
          <div className="grid grid-cols-2  gap-4 mb-6">
            <Spec
              icon={<PiSpeedometerBold />}
              label="Hashrate"
              value={`${product.hashrate || product.hashRate} ${product.hashrateUnit || ""}`}
            />
            <Spec
              icon={<TfiBolt />}
              label="Power"
              value={`${product.power || product.powerConsumption} W`}
            />
            <Spec icon={<FiCpu />} label="Algorithm" value={product.algorithm} />
            <Spec icon={<FaCoins />} label="Coin" value={product.coin} />
          </div>

          {/* Quantity Selector */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Quantity</label>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-10 h-10 bg-gray-200 hover:bg-gray-300 rounded-lg font-bold text-lg transition-colors"
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
              />
              <button
                onClick={() => setQuantity(Math.min(10, quantity + 1))}
                className="w-10 h-10 bg-gray-200 hover:bg-gray-300 rounded-lg font-bold text-lg transition-colors"
                disabled={quantity >= 10}
              >
                +
              </button>
            </div>
          </div>

          {/* CTA - Only Buy Option */}
          <button
            onClick={handleBuyNow}
            disabled={isAdding}
            className="w-full text-white py-3 rounded-lg font-medium transition-all hover:shadow-lg disabled:opacity-50"
            style={{ backgroundColor: "var(--primary-color)" }}
            onMouseEnter={(e) => (e.target.style.opacity = "0.9")}
            onMouseLeave={(e) => (e.target.style.opacity = "1")}
          >
            {isAdding ? 'Processing...' : 'Buy Now'}
          </button>
          <div className="grid grid-cols-3 gap-6 mt-8 text-center text-xs text-gray-600">
            <Trust icon={<FiShield />} title="12 Months" text="Warranty" />
            <Trust icon={<FiTruck />} title="Secure" text="Global Shipping" />
            <Trust icon={<FiBox />} title="Insured" text="Safe Packaging" />
          </div>
        </div>
      </div>

      {/* PROFITABILITY GRAPH */}
      <ProductProfitabilityGraph product={product} btcPrice={coinData?.price} />

      {/* DEPLOYMENT OPTIONS - Selectable */}
      <div className="mb-16">
        <h2 className="text-2xl font-bold mb-2 text-center">How would you like to deploy?</h2>
        <p className="text-gray-600 text-center mb-6">Select your preferred deployment method</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <OptionCard
            title="Hosting"
            price="$1,399.00"
            items={["Including setup", "Including shipping", "Online in 5 days"]}
            available={true}
            onSelect={handleOptionSelect}
            isSelected={selectedOption === "Hosting"}
            showLocationDropdown={true}
          />

          <OptionCard
            title="Rent"
            price="from €0.056/kWh"
            items={["Cloud mining", "No upfront cost", "Flexible duration"]}
            available={true}
            onSelect={handleOptionSelect}
            isSelected={selectedOption === "Rent"}
          />

          <OptionCard
            title="Shipment"
            price="EUR 1,399.00"
            items={["Including shipping", "Including customs", "2 – 4 weeks delivery"]}
            available={true}
            onSelect={handleOptionSelect}
            isSelected={selectedOption === "Shipment"}
          />
        </div>

        {selectedOption && (
          <div className="mt-6 text-center">
            <button
              className="px-8 py-3 rounded-lg font-medium text-white transition-all hover:shadow-lg"
              style={{ backgroundColor: "var(--primary-color)" }}
              onClick={handleProceedWithOption}
            >
              Proceed to Checkout ({selectedOption})
            </button>
          </div>
        )}
      </div>

      {/* TABBED SECTIONS */}
      <div className="mb-16">
        {/* Tab Navigation */}
        <div className="border-b border-gray-200 mb-8  overflow-x-auto">
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
        <div>
          {activeTab === "overview" && (
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="text-2xl font-bold mb-4">Product Overview</h3>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>{product.description}</p>
                <h4 className="text-xl font-semibold mt-6 mb-3">Key Features and Benefits</h4>
                <ul className="list-disc list-inside space-y-2">
                  <li>
                    High Hashrate and Efficiency: Offers superior performance with lower energy
                    costs
                  </li>
                  <li>Advanced Chip Technology: Uses top-tier chips for strong hash power</li>
                  <li>Compact Design: Space-efficient with durable build quality</li>
                  <li>Enhanced Security: Built-in safeguards protect against threats</li>
                  <li>
                    Easy Monitoring: Track hashrate, power, and temperature with adjustable settings
                  </li>
                  <li>Versatile Algorithm: Supports {product.algorithm} and multi-coin mining</li>
                  <li>Stable Connectivity: Reliable remote management via Ethernet</li>
                </ul>
              </div>
            </div>
          )}
          {activeTab === "specifications" && <ProductSpecifications product={product} />}
          {activeTab === "reviews" && <ProductReviews productName={product.name} />}
          {activeTab === "warranty" && <WarrantySection />}
          {activeTab === "hosting" && <HostingSection />}
          {activeTab === "shipping" && <ShippingSection />}
          {activeTab === "faq" && <FAQSection />}
        </div>
      </div>

      {/* MINEABLE COIN */}
      {coinData && (
        <div className="text-center bg-[#F8FBF9] rounded-xl border border-gray-200 p-8 mb-16">
          <h2 className="text-2xl font-bold mb-4">Mineable Coin</h2>
          <div className="flex justify-center">
            <div className="flex flex-col items-center gap-3 p-6 bg-gray-50 rounded-lg hover:scale-105 transition-transform">
              <img src={coinData.image} alt={coinData.name} className="w-10 h-10" />
              <div className="text-center">
                <div className="text-lg font-bold text-gray-900">{coinData.name}</div>
                <div className="text-sm text-gray-600">{coinData.symbol}</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SIMILAR PRODUCTS */}
      <div className="bg-white rounded-xl border border-gray-200 p-8">
        <h2 className="text-2xl font-bold mb-6">Similar Products</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {products
            .filter((p) => p.id !== product.id && p.coin === product.coin)
            .slice(0, 3)
            .map((similarProduct) => (
              <a
                key={similarProduct.id}
                href={`/products/${similarProduct.id}`}
                className="border border-gray-200 rounded-lg p-4 hover:shadow-lg transition-shadow"
              >
                <img
                  src={similarProduct.image}
                  alt={similarProduct.name}
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
                <h3 className="font-bold text-lg mb-2">{similarProduct.name}</h3>
                <p className="text-sm text-gray-600 mb-2">
                  {similarProduct.hashrate || similarProduct.hashRate}{" "}
                  {similarProduct.hashrateUnit || "TH/s"}
                </p>
                <p className="text-xl font-bold" style={{ color: "var(--primary-color)" }}>
                  ${similarProduct.price?.toLocaleString()}
                </p>
              </a>
            ))}
        </div>
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
