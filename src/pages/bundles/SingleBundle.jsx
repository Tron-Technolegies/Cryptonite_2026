import { addToCart } from "../../api/cart.api";

export default function SingleBundle() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [bundle, setBundle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchBundle = async () => {
      try {
        const data = await getBundle(id);
        setBundle(data);
      } catch (err) {
        setError("Failed to load bundle details.");
      } finally {
        setLoading(false);
      }
    };
    fetchBundle();
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
                purchaseType: selectedOption.toLowerCase()
            } 
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
        <Link to="/bundles" className="text-black underline mt-4 inline-block">Back to Bundles</Link>
      </div>
    );

  return (
    <div className="container-x mx-auto px-6 py-16">
       <p className="pb-5 flex items-center text-sm">
        <Link to="/" className="text-gray-500 hover:text-green-400">Home / </Link>
        <Link to="/bundles" className="text-gray-500 hover:text-green-400"> Bundles / </Link>
        <span className="text-green-500 ml-1"> {bundle.name}</span>
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
        {/* IMAGE */}
        <div className="bg-gray-50 rounded-2xl p-8 flex items-center justify-center border border-gray-100">
           {bundle.image ? (
            <img src={bundle.image} alt={bundle.name} className="w-full h-auto object-contain max-h-[500px] rounded-lg" />
           ) : (
             <FiPackage className="text-9xl text-gray-200" />
           )}
        </div>

        {/* INFO */}
        <div>
          <div className="mb-6">
            <span className="bg-black text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
              Bundle Deal
            </span>
          </div>

          <h1 className="text-4xl font-bold mb-4 font-josefin">{bundle.name}</h1>
          <p className="text-3xl font-bold text-green-600 mb-6">
            ${Number(bundle.price).toLocaleString()}
          </p>

          <div className="prose text-gray-600 mb-8" dangerouslySetInnerHTML={{ __html: bundle.description }} />

          {/* SPECS GRID */}
          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="bg-gray-50 p-4 rounded-xl flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600 text-xl">
                <FiActivity />
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase font-semibold">Total Hashrate</p>
                <p className="font-bold text-gray-900">{bundle.total_hashrate || "N/A"}</p>
              </div>
            </div>
            <div className="bg-gray-50 p-4 rounded-xl flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center text-yellow-600 text-xl">
                <FiZap />
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase font-semibold">Total Power</p>
                <p className="font-bold text-gray-900">{bundle.total_power || "N/A"}</p>
              </div>
            </div>
          </div>

          {/* Quantity Selector */}
          <div className="mb-8 p-4 bg-gray-50 rounded-xl border border-gray-100 flex items-center justify-between">
            <span className="font-bold text-gray-700">Quantity Selection</span>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-10 h-10 bg-white border border-gray-200 rounded-lg flex items-center justify-center hover:border-green-500 transition-colors"
              >
                −
              </button>
              <span className="font-bold text-xl w-6 text-center">{quantity}</span>
              <button
                onClick={() => setQuantity(Math.min(10, quantity + 1))}
                className="w-10 h-10 bg-white border border-gray-200 rounded-lg flex items-center justify-center hover:border-green-500 transition-colors"
                disabled={quantity >= 10}
              >
                +
              </button>
            </div>
          </div>
          
          <div className="border-t border-gray-100 pt-8">
             <h3 className="font-bold text-lg mb-4">Why choose this bundle?</h3>
             <ul className="space-y-2">
               <li className="flex items-center gap-2 text-gray-700">
                 <FiCheck className="text-green-500" /> High-efficiency mining hardware
               </li>
               <li className="flex items-center gap-2 text-gray-700">
                 <FiCheck className="text-green-500" /> Optimized for maximum profitability
               </li>
               <li className="flex items-center gap-2 text-gray-700">
                 <FiCheck className="text-green-500" /> Includes all cables and accessories
               </li>
             </ul>
          </div>
        </div>
      </div>

      {/* OPTIONS - Reusing Logic */}
      <div className="mb-16">
        <h2 className="text-2xl font-bold mb-2 text-center font-josefin">How would you like to deploy?</h2>
        <p className="text-gray-600 text-center mb-10">Select your preferred deployment method</p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          <OptionCard
            title="Hosting"
            price={`$${bundle.hosting_fee_per_kw || "0.00"}/kWh`} // Assuming logic
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
            isSelected={selectedOption === "Buy"} // Changed 'Shipment' to 'Buy' to match backend 'buy' type logic usually
          />
        </div>

        {selectedOption && (
          <div className="mt-10 text-center">
             <button
              onClick={handleProceed}
              disabled={isAdding}
              className="px-10 py-4 bg-black text-white rounded-full font-bold text-lg hover:bg-green-600 transition-all shadow-xl hover:shadow-green-500/30 transform hover:-translate-y-1 disabled:opacity-50"
            >
              {isAdding ? "Processing..." : `Proceed to Checkout (${selectedOption})`}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
