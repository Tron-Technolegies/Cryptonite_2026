import { Link, useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getProduct, getProducts } from "../api/product.api";
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
import { FiBox, FiCpu, FiShield, FiTruck } from "react-icons/fi";
import { TfiBolt } from "react-icons/tfi";
import { FaCoins } from "react-icons/fa";
import { PiSpeedometerBold } from "react-icons/pi";
import { addToCart } from "../api/cart.api";
import { getImageUrl } from "../utils/imageUtils";

export default function SingleProduct() {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [coinData, setCoinData] = useState(null);
  const [activeTab, setActiveTab] = useState("overview");
  const [selectedOption, setSelectedOption] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);
  const [similarProducts, setSimilarProducts] = useState([]);
  const isMobile = window.innerWidth < 768;

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await getProduct(id);
        setProduct(response.data);
      } catch (err) {
        console.error("Error fetching product:", err);
        toast.error("Failed to load product details.");
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  // Fetch coin data for profitability calculator
  useEffect(() => {
    if (!product) return;

    const coinCode = product.minable_coins?.split(",")[0]?.trim();
    const coinMap = {
      BTC: "bitcoin",
      LTC: "litecoin",
      KAS: "kaspa",
      DOGE: "dogecoin",
      ETC: "ethereum-classic",
    };

    const coinId = coinMap[coinCode];
    if (coinId) {
      getCoinData(coinId).then(setCoinData).catch(console.error);
    }
  }, [product]);

  // Fetch similar products
  useEffect(() => {
    if (!product) return;

    const fetchSimilar = async () => {
      try {
        const response = await getProducts();
        const items = response.data.results || response.data || [];
        // Filter products by same category or algorithm, exclude current product
        const similar = items
          .filter(
            (p) =>
              p.id !== product.id &&
              (p.algorithm === product.algorithm || p.category === product.category),
          )
          .slice(0, 3);
        setSimilarProducts(similar);
      } catch (err) {
        console.error("Error fetching similar products:", err);
      }
    };

    fetchSimilar();
  }, [product]);

  const coinCode = product?.minable_coins?.split(",")[0];

  const coinMap = {
    BTC: "bitcoin",
    LTC: "litecoin",
    KAS: "kaspa",
    DOGE: "dogecoin",
    ETC: "ethereum-classic",
  };

  const coinId = coinMap[coinCode];

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
  const handleOptionSelect = async (option) => {
    setSelectedOption(option);

    if (isMobile) {
      setTimeout(() => {
        handleProceedWithOption(option);
      }, 150);
    }
  };

  const handleProceedWithOption = async (optionOverride) => {
    const option = optionOverride || selectedOption;

    if (!option) {
      toast.error("Please select a deployment option");
      return;
    }

    if (option === "Shipment") {
      handleBuyNow();
      return;
    }

    if (isAdding) return;
    setIsAdding(true);

    try {
      await addToCart(product.id, null, quantity);

      navigate("/checkout", {
        state: {
          purchaseType: option.toLowerCase(),
        },
      });
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.error || "Failed to add to cart");
    } finally {
      setIsAdding(false);
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center py-40">
        <div
          className="animate-spin rounded-full h-12 w-12 border-b-2"
          style={{ borderColor: "var(--primary-color)" }}
        ></div>
      </div>
    );

  if (!product) return <p className="text-center py-20 text-xl font-medium">Product not found</p>;

  // Map backend field names to match local names or use them directly
  const productName = product.model_name;
  const productPrice = product.price;
  const productBasePrice = product.price;
  const productCoin = product.minable_coins?.split(",")[0] || "BTC"; // Default to BTC if not specified

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
      <div className="pb-5 flex items-center">
        <Link to="/" className="text-gray-500 hover:text-green-400">
          Home /{" "}
        </Link>
        <Link to="/shop" className="text-gray-500 hover:text-green-400">
          {" "}
          Products /{" "}
        </Link>
        <span className="text-green-500 ml-1"> {productName}</span>
      </div>
      {/* TOP SECTION */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
        {/* Image */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden flex items-center justify-center p-8">
          <img
            src={getImageUrl(product.image)}
            alt={productName}
            className="max-h-[500px] w-auto object-contain hover:scale-105 transition-transform duration-500"
          />
        </div>

        {/* Info */}
        <div>
          <div className="flex items-center gap-3 mb-2">
            <span
              className="text-xs px-3 py-1 rounded-full font-medium"
              style={{ backgroundColor: "var(--primary-color)", color: "white" }}
            >
              {product.brand}
            </span>
            {product.is_available && (
              <span
                className="bg-green-100 text-xs px-3 py-1 rounded-full font-medium"
                style={{ color: "var(--primary-color)" }}
              >
                In Stock
              </span>
            )}
            <span className="text-xs px-3 py-1 rounded-full bg-blue-100 text-blue-600 font-medium lowercase">
              {product.category}
            </span>
          </div>

          <h1 className="text-4xl font-bold mb-3">{productName}</h1>

          <div className="flex items-baseline gap-3 mb-4">
            <p className="text-3xl font-bold" style={{ color: "var(--primary-color)" }}>
              ${productPrice?.toLocaleString() || "Contact for Price"}
            </p>
            {product.discount_percentage > 0 && (
              <p className="text-xl text-gray-400 line-through">
                ${parseFloat(productBasePrice)?.toLocaleString()}
              </p>
            )}
            {product.discount_percentage > 0 && (
              <span className="bg-red-100 text-red-600 text-xs px-2 py-1 rounded-md font-bold">
                -{product.discount_percentage}%
              </span>
            )}
          </div>

          <p className="text-gray-600 leading-relaxed mb-8">{product.description}</p>

          {/* Specs */}
          <div className="grid grid-cols-2 gap-4 mb-8">
            <Spec icon={<PiSpeedometerBold />} label="Hashrate" value={product.hashrate} />
            <Spec icon={<TfiBolt />} label="Power" value={`${product.power} W`} />
            <Spec icon={<FiCpu />} label="Algorithm" value={product.algorithm} />
            <Spec icon={<FaCoins />} label="Coins" value={product.minable_coins} />
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
            className="w-full text-white py-3 rounded-lg font-medium transition-all hover:shadow-lg disabled:opacity-50 cursor-pointer"
            style={{ backgroundColor: "var(--primary-color)" }}
            onMouseEnter={(e) => (e.target.style.opacity = "0.9")}
            onMouseLeave={(e) => (e.target.style.opacity = "1")}
          >
            {isAdding ? "Processing..." : "Buy Now"}
          </button>
          <div className="grid grid-cols-3 gap-6 mt-8 text-center text-xs text-gray-600">
            <Trust icon={<FiShield />} title={product.warranty || "12 Months"} text="Warranty" />
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

        {selectedOption && !isMobile && (
          <div className="mt-6 text-center">
            <button
              className="px-8 py-3 rounded-lg font-medium text-white transition-all hover:shadow-lg cursor-pointer"
              style={{ backgroundColor: "var(--primary-color)" }}
              onClick={() => handleProceedWithOption()}
            >
              Proceed to Checkout ({selectedOption})
            </button>
          </div>
        )}
      </div>

      {/* TABBED SECTIONS */}
      <div className="mb-16">
        {/* Tab Navigation */}
        <div className="border-b border-gray-200 mb-8 overflow-x-auto">
          <div className="flex gap-2 min-w-max">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-3 font-medium transition-all border-b-2 cursor-pointer ${
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
          {activeTab === "reviews" && (
            <ProductReviews productId={product.id} productName={productName} />
          )}
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
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Similar Products</h2>
          <Link
            to="/shop"
            className="text-sm font-medium hover:underline"
            style={{ color: "var(--primary-color)" }}
          >
            View All →
          </Link>
        </div>

        {similarProducts.length === 0 ? (
          <p className="text-gray-500 italic">Loading similar products...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {similarProducts.map((p) => (
              <Link
                key={p.id}
                to={`/products/${p.id}`}
                className="border border-gray-200 rounded-lg p-4 hover:shadow-lg transition-shadow"
              >
                <img
                  src={p.image}
                  alt={p.model_name}
                  className="w-full h-48 object-contain rounded-lg mb-4"
                />
                <h3 className="font-bold text-lg mb-2">{p.model_name}</h3>
                <p className="text-sm text-gray-600 mb-2">
                  {p.hashrate} • {p.power}W
                </p>
                <p className="text-xl font-bold" style={{ color: "var(--primary-color)" }}>
                  ${Number(p.price).toLocaleString()}
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
