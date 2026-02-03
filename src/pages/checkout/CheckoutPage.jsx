import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { createPaymentIntent } from "../../api/payment.api";
import { getCart, removeFromCart, updateCartItem } from "../../api/cart.api";
import { createHostingRequest } from "../../api/hosting.api";
import StripeWrapper from "../../components/checkout/StripeWrapper";
import PaymentForm from "../../components/checkout/PaymentForm";
import Loading from "../../components/ui/Loading";
import { toast } from "react-toastify";
import {
  FiCheck,
  FiMapPin,
  FiCreditCard,
  FiShoppingBag,
  FiAlertTriangle,
  FiTrash2,
  FiMinus,
  FiPlus,
  FiServer,
  FiClock
} from "react-icons/fi";
import { getImageUrl } from "../../utils/imageUtils";

const steps = [
  { id: 1, label: "Summary", icon: FiShoppingBag },
  { id: 2, label: "Details", icon: FiMapPin }, // Changed from Address to Details (generic)
  { id: 3, label: "Payment", icon: FiCreditCard },
];

export default function CheckoutPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const location = useLocation();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [clientSecret, setClientSecret] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [cartLoading, setCartLoading] = useState(true);

  // State from Navigation (Direct Buy)
  const navState = location.state || {};
  const { item, purchaseType: navPurchaseType, itemType } = navState;
  
  // Determine Purchase Type (Default to 'buy')
  const purchaseType = navPurchaseType || "buy";

  // Form State - Address (Buy)
  const [address, setAddress] = useState({
    name: "",
    line1: "",
    city: "",
    state: "",
    postal_code: "",
    country: "US",
  });

  // Form State - Hosting
  const [hostingDetails, setHostingDetails] = useState({
    phone: "",
    hosting_location: "US", 
    message: ""
  });
  const [hostingRequestData, setHostingRequestData] = useState(null); // Stores created request ID

  // Form State - Rent
  const [rentDuration, setRentDuration] = useState(30);

  // Fetch cart items on mount
  useEffect(() => {
    const fetchCart = async () => {
      try {
        setCartLoading(true);
        const response = await getCart();
        setCartItems(response);
      } catch (err) {
        console.error("Error fetching cart:", err);
      } finally {
        setCartLoading(false);
      }
    };

    fetchCart();
  }, []);

  /* --- CALCULATE TOTALS --- */
  const getSubtotal = () => {
    // If direct item from nav
    if (item) {
        if (purchaseType === "rent" && item.monthly_price) return Number(item.monthly_price);
        return Number(item.price);
    }
    // Cart Items
    return cartItems.reduce((sum, cartItem) => {
      if (purchaseType === "rent") {
         // Rent items use monthly price logic if available, else standard
         const price = cartItem.product?.monthly_price || cartItem.bundle?.price; // Fallback to price if no monthly
         return sum + (Number(price) * cartItem.quantity);
      }
      const price = cartItem.product?.price || cartItem.bundle?.price || 0;
      return sum + (Number(price) * cartItem.quantity);
    }, 0);
  };

  const subtotal = getSubtotal();
  
  // Additional Fees
  const setupFee = (purchaseType === "hosting" && hostingRequestData) ? hostingRequestData.setup_fee : 0;
  
  // If hosting request is created, use its total. Otherwise estimate.
  // For estimation: Setup Fee is $1150 * Quantity (approx)
  // Backend code says: SETUP_FEE_PER_DEVICE = 1150
  const estimatedSetupFee = purchaseType === "hosting" && !hostingRequestData ? (
     (item ? 1 : cartItems.reduce((acc, i) => acc + i.quantity, 0)) * 1150
  ) : 0;

  const total = hostingRequestData ? hostingRequestData.total_amount : (subtotal + (hostingRequestData ? 0 : estimatedSetupFee));


  // Handle cart actions
  const handleRemoveItem = async (itemId) => {
    try {
      await removeFromCart(itemId);
      setCartItems(cartItems.filter((item) => item.id !== itemId));
      toast.success("Item removed");
    } catch (err) { toast.error("Failed to remove item"); }
  };

  const handleQuantityChange = async (itemId, newQuantity) => {
    if (newQuantity < 1) return;
    try {
      await updateCartItem(itemId, newQuantity);
      setCartItems(cartItems.map((item) => (item.id === itemId ? { ...item, quantity: newQuantity } : item)));
      toast.success("Quantity updated");
    } catch (err) { toast.error("Failed Update"); }
  };


  /* --- SUBMISSION HANDLERS --- */
  
  const handleProceedToDetails = () => setCurrentStep(2);

  const handleProceedToPayment = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      let paymentPayload = { purchase_type: purchaseType };

      // 1. HOSTING FLOW
      if (purchaseType === "hosting") {
         // If request not created yet, create it
         if (!hostingRequestData) {
             const reqPayload = { ...hostingDetails };
             console.log("Creating Hosting Request...", reqPayload);
             const reqResponse = await createHostingRequest(reqPayload);
             
             setHostingRequestData(reqResponse); // Save ID and Totals
             
             // Now prepare payment with this ID
             paymentPayload.hosting_request_id = reqResponse.hosting_request_id;
             // Update total to match backend exact calculation
         } else {
             // Already created, just retry payment
             paymentPayload.hosting_request_id = hostingRequestData.hosting_request_id;
         }
      }

      // 2. RENT FLOW
      if (purchaseType === "rent") {
          paymentPayload.duration_days = rentDuration;
      }

      // 3. BUY FLOW (Address)
      if (purchaseType === "buy") {
          paymentPayload.address = address;
          paymentPayload.save_address = true;
      }

      console.log("Creating Payment Intent:", paymentPayload);
      const data = await createPaymentIntent(paymentPayload);
      
      setClientSecret(data.client_secret);
      setCurrentStep(3);
      toast.success("Proceeding to payment...");

    } catch (err) {
      console.error(err);
      setError(err.response?.data?.error || "Could not initiate payment.");
      toast.error(err.response?.data?.error || "Payment initialization failed");
    } finally {
      setLoading(false);
    }
  };

  const handleSuccess = async (paymentIntent) => {
    navigate("/payment-success", {
      state: { paymentIntent, purchaseType, amount: total },
    });
  };
  
  if (cartLoading) return <Loading />;
  if (!item && cartItems.length === 0 && !clientSecret) return <EmptyCart />;

  return (
    <div className="min-h-screen bg-gray-50 pt-32 pb-20">
      <div className="container-x mx-auto px-6">
        
        {/* STEPS */}
        <StepsIndicator currentStep={currentStep} />

        <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
            
          {/* LEFT: MAIN CONTENT */}
          <div className="lg:col-span-2 space-y-6">
            {error && <ErrorBox message={error} />}

            {/* STEP 1: SUMMARY */}
            {currentStep === 1 && (
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 animate-in fade-in slide-in-from-bottom-4">
                <h2 className="text-2xl font-bold mb-6 font-josefin">
                    {purchaseType === "hosting" ? "Hosting Request Summary" : 
                     purchaseType === "rent" ? "Rental Summary" : "Order Summary"}
                </h2>

                <ItemsList 
                    item={item} 
                    cartItems={cartItems} 
                    purchaseType={purchaseType}
                    onUpdate={handleQuantityChange}
                    onRemove={handleRemoveItem}
                    itemType={itemType}
                />
                
                {/* Cost Breakdown */}
                <div className="space-y-3 mb-8 pt-4 border-t border-gray-100">
                   <div className="flex justify-between text-gray-600">
                     <span>Item Subtotal</span>
                     <span>${subtotal.toLocaleString()}</span>
                   </div>
                   
                   {purchaseType === "hosting" && (
                       <div className="flex justify-between text-gray-600">
                         <span>Setup Fee (Est. $1150/unit)</span>
                         <span>${estimatedSetupFee.toLocaleString()}</span>
                       </div>
                   )}
                   
                   <div className="flex justify-between text-xl font-bold pt-4 border-t border-gray-100">
                     <span>Total</span>
                     <span>${total.toLocaleString()}</span>
                   </div>
                </div>

                <button onClick={handleProceedToDetails} className="w-full bg-black text-white py-4 rounded-xl font-bold hover:bg-green-600 transition-colors">
                  Proceed to {purchaseType === "buy" ? "Address" : "Details"}
                </button>
              </div>
            )}

            {/* STEP 2: DETAILS FORM */}
            {currentStep === 2 && (
              <form onSubmit={handleProceedToPayment} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 animate-in fade-in slide-in-from-bottom-4">
                <h2 className="text-2xl font-bold mb-6 font-josefin">
                    {purchaseType === "buy" ? "Shipping Address" : 
                     purchaseType === "hosting" ? "Hosting Details" : "Rental Duration"}
                </h2>

                {/* BUY FLOW - ADDRESS */}
                {purchaseType === "buy" && (
                    <AddressForm address={address} setAddress={setAddress} />
                )}

                {/* HOSTING FLOW - DETAILS */}
                {purchaseType === "hosting" && (
                    <div className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number (Required)</label>
                            <input 
                                required 
                                type="tel"
                                value={hostingDetails.phone}
                                onChange={e => setHostingDetails({...hostingDetails, phone: e.target.value})}
                                className="w-full px-4 py-3 rounded-lg border border-gray-200 outline-none focus:border-green-500"
                                placeholder="+1 234 567 890" 
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Hosting Location</label>
                            <select 
                                value={hostingDetails.hosting_location}
                                onChange={e => setHostingDetails({...hostingDetails, hosting_location: e.target.value})}
                                className="w-full px-4 py-3 rounded-lg border border-gray-200 outline-none focus:border-green-500"
                            >
                                <option value="US">United States (US)</option>
                                <option value="ET">Ethiopia (ET)</option>
                                <option value="UAE">United Arab Emirates (UAE)</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Message (Optional)</label>
                            <textarea 
                                value={hostingDetails.message}
                                onChange={e => setHostingDetails({...hostingDetails, message: e.target.value})}
                                className="w-full px-4 py-3 rounded-lg border border-gray-200 outline-none focus:border-green-500 h-24"
                                placeholder="Any specific requirements?" 
                            />
                        </div>
                        <div className="bg-blue-50 text-blue-800 p-4 rounded-lg text-sm">
                            <p className="font-bold mb-1">Note on Hosting:</p>
                            A setup fee of $1,150 per device applies. This logic is handled by our backend based on your cart.
                        </div>
                    </div>
                )}

                {/* RENT FLOW - DURATION */}
                {purchaseType === "rent" && (
                     <div className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Duration (Days)</label>
                            <select 
                                value={rentDuration}
                                onChange={e => setRentDuration(Number(e.target.value))}
                                className="w-full px-4 py-3 rounded-lg border border-gray-200 outline-none focus:border-green-500"
                            >
                                <option value={30}>30 Days</option>
                                <option value={60}>60 Days</option>
                                <option value={90}>90 Days</option>
                                <option value={180}>180 Days (6 Months)</option>
                                <option value={365}>365 Days (1 Year)</option>
                            </select>
                        </div>
                     </div>
                )}

                <div className="flex gap-4 mt-8">
                  <button type="button" onClick={() => setCurrentStep(1)} className="px-6 py-4 rounded-xl font-bold text-gray-500 hover:bg-gray-100 transition-colors">Back</button>
                  <button type="submit" disabled={loading} className="flex-1 bg-black text-white py-4 rounded-xl font-bold hover:bg-green-600 transition-colors disabled:opacity-50">
                    {loading ? "Processing..." : "Continue to Payment"}
                  </button>
                </div>
              </form>
            )}

            {/* STEP 3: PAYMENT */}
            {currentStep === 3 && clientSecret && (
              <div className="animate-in fade-in slide-in-from-bottom-4">
                <StripeWrapper clientSecret={clientSecret}>
                  <PaymentForm amount={total} onSuccess={handleSuccess} />
                </StripeWrapper>
                <button onClick={() => setCurrentStep(2)} className="mt-4 text-gray-500 hover:text-gray-700 text-sm font-medium w-full text-center">← Back to Details</button>
              </div>
            )}
          </div>

          {/* RIGHT: SUMMARY CARD */}
          {currentStep > 1 && (
            <div className="hidden lg:block">
               <SummarySidebar 
                 item={item} 
                 cartItems={cartItems} 
                 total={total} 
                 purchaseType={purchaseType} 
               />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* --- SUBCOMPONENTS --- */

const StepsIndicator = ({ currentStep }) => (
    <div className="max-w-3xl mx-auto mb-10">
      <div className="relative flex justify-between items-center">
        <div className="absolute top-6 left-0 w-full h-2 bg-gray-200 rounded-full -z-10" />
        <div className="absolute top-6 left-0 h-2 rounded-full -z-10 transition-all duration-700 bg-green-500" style={{ width: `${((currentStep - 1) / 2) * 100}%` }} />
        {steps.map((step) => (
          <div key={step.id} className="flex flex-col items-center gap-3 bg-gray-50 px-4 z-10">
            <div className={`w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold transition-all border-4 ${currentStep >= step.id ? "bg-green-500 text-white border-transparent" : "bg-white text-gray-400 border-gray-300"}`}>
               {currentStep > step.id ? <FiCheck /> : <step.icon className="text-xl" />}
            </div>
            <span className={`text-sm font-bold ${currentStep >= step.id ? "text-green-600" : "text-gray-400"}`}>{step.label}</span>
          </div>
        ))}
      </div>
    </div>
);

// Reusable items list
const ItemsList = ({ item, cartItems, purchaseType, onUpdate, onRemove, itemType }) => {
    if (item) {
        return (
            <div className="flex items-center gap-6">
                <div className="w-24 h-24 bg-gray-50 rounded-lg p-2 flex items-center justify-center border border-gray-100">
                  <img src={getImageUrl(item?.image)} alt={item?.name} className="max-w-full max-h-full object-contain" />
                </div>
                <div>
                  <h3 className="font-bold text-xl">{item?.name || item?.model_name || "Product"}</h3>
                  <p className="text-sm text-gray-500 capitalize">{itemType} • {purchaseType}</p>
                  <p className="text-lg font-bold text-green-600">
                      ${Number(purchaseType === "rent" && item.monthly_price ? item.monthly_price : item.price).toLocaleString()}
                      {purchaseType === "rent" && <span className="text-xs text-gray-500"> /month</span>}
                  </p>
                </div>
            </div>
        );
    }
    return (
        <div className="space-y-4 mb-4">
            {cartItems.map((cartItem) => {
                const isBundle = !!cartItem.bundle;
                const data = isBundle ? cartItem.bundle : cartItem.product;
                const price = purchaseType === "rent" && data.monthly_price ? data.monthly_price : data.price;
                
                return (
                    <div key={cartItem.id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                        <img src={getImageUrl(data?.image) || "/placeholder.png"} className="w-16 h-16 object-contain bg-white rounded p-1" alt="" />
                        <div className="flex-1">
                            <h4 className="font-bold">{data.model_name || data.name}</h4>
                            <p className="text-sm text-gray-600">${Number(price).toLocaleString()} x {cartItem.quantity}</p>
                            
                            <div className="flex items-center gap-3 mt-2">
                                <button onClick={() => onUpdate(cartItem.id, cartItem.quantity - 1)} className="p-1 bg-white rounded border" disabled={cartItem.quantity<=1}><FiMinus/></button>
                                <span className="text-sm font-bold">{cartItem.quantity}</span>
                                <button onClick={() => onUpdate(cartItem.id, cartItem.quantity + 1)} className="p-1 bg-white rounded border"><FiPlus/></button>
                                <button onClick={() => onRemove(cartItem.id)} className="ml-2 text-red-500"><FiTrash2/></button>
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

const AddressForm = ({ address, setAddress }) => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
      <div className="md:col-span-2">
        <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
        <input required value={address.name} onChange={e => setAddress({...address, name: e.target.value})} className="w-full px-4 py-3 rounded-lg border border-gray-200 outline-none focus:border-green-500" placeholder="John Doe" />
      </div>
      <div className="md:col-span-2">
        <label className="block text-sm font-medium text-gray-700 mb-2">Address Line 1</label>
        <input required value={address.line1} onChange={e => setAddress({...address, line1: e.target.value})} className="w-full px-4 py-3 rounded-lg border border-gray-200 outline-none focus:border-green-500" placeholder="123 Mining St" />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
        <input required value={address.city} onChange={e => setAddress({...address, city: e.target.value})} className="w-full px-4 py-3 rounded-lg border border-gray-200 outline-none focus:border-green-500" />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">State</label>
        <input required value={address.state} onChange={e => setAddress({...address, state: e.target.value})} className="w-full px-4 py-3 rounded-lg border border-gray-200 outline-none focus:border-green-500" />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Postal Code</label>
        <input required value={address.postal_code} onChange={e => setAddress({...address, postal_code: e.target.value})} className="w-full px-4 py-3 rounded-lg border border-gray-200 outline-none focus:border-green-500" />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Country</label>
        <select required value={address.country} onChange={e => setAddress({...address, country: e.target.value})} className="w-full px-4 py-3 rounded-lg border border-gray-200 outline-none focus:border-green-500">
          <option value="US">United States</option>
          <option value="UK">United Kingdom</option>
          <option value="CA">Canada</option>
          <option value="AE">United Arab Emirates</option>
        </select>
      </div>
    </div>
);

const SummarySidebar = ({ item, cartItems, total, purchaseType }) => (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 sticky top-32">
        <h3 className="font-bold text-lg mb-4">Summary</h3>
        <div className="mb-4">
             {item ? (
                 <div className="flex items-center gap-3">
                     <img src={getImageUrl(item.image)} className="w-12 h-12 object-contain" alt=""/>
                     <div>
                         <p className="font-bold text-sm truncate w-32">{item.name || item.model_name}</p>
                         <p className="text-xs text-gray-500 capitalize">{purchaseType}</p>
                     </div>
                 </div>
             ) : (
                <p className="text-sm">{cartItems.length} Items in Cart</p>
             )}
        </div>
        <div className="flex justify-between font-bold text-lg border-t border-gray-100 pt-4 mt-2">
          <span>Total</span>
          <span>${total.toLocaleString()}</span>
        </div>
    </div>
);

const EmptyCart = () => (
    <div className="pt-32 pb-20 text-center min-h-screen flex flex-col justify-center items-center bg-gray-50">
        <FiAlertTriangle className="text-4xl text-yellow-500 mb-4" />
        <h1 className="text-2xl font-bold mb-2">No Items in Checkout</h1>
        <Link to="/shop" className="bg-black text-white px-8 py-3 rounded-full font-bold hover:bg-green-600 transition-colors">Go to Shop</Link>
    </div>
);

const ErrorBox = ({ message }) => (
    <div className="bg-red-50 border border-red-200 text-red-600 p-4 rounded-xl flex items-center gap-3">
        <FiAlertTriangle className="text-xl" />
        {message}
    </div>
);

