import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { createPaymentIntent } from "../../api/payment.api";
import StripeWrapper from "../../components/checkout/StripeWrapper";
import PaymentForm from "../../components/checkout/PaymentForm";
import Loading from "../../components/ui/Loading";
import { toast } from "react-toastify";
import { FiCheck, FiMapPin, FiCreditCard, FiShoppingBag, FiAlertTriangle } from "react-icons/fi";

const steps = [
  { id: 1, label: "Summary", icon: FiShoppingBag },
  { id: 2, label: "Address", icon: FiMapPin },
  { id: 3, label: "Payment", icon: FiCreditCard },
];

export default function CheckoutPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [clientSecret, setClientSecret] = useState(null);

  // State from Navigation (Direct Buy)
  const navState = location.state || {};
  const { item, purchaseType, itemType } = navState;

  // Form State
  const [address, setAddress] = useState({
    name: "",
    line1: "",
    city: "",
    state: "",
    postal_code: "",
    country: "US", // Default
  });

  useEffect(() => {
    if (!item && currentStep === 1) {
       // If no item, potentially redirect or check cart
    }
  }, [item, currentStep]);

  const handleAddressChange = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };

  const handleProceedToAddress = () => {
    setCurrentStep(2);
  };

  const handleProceedToPayment = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
        const payload = {
            purchase_type: "buy", // Assuming direct buy uses 'buy' type
            address: address,
            save_address: true,
            // If rent, add duration
            ...(purchaseType === 'rent' && { duration_days: 30 })
        };
        
        const data = await createPaymentIntent(payload);
        setClientSecret(data.client_secret);
        setCurrentStep(3);
        toast.success("Address saved. Proceeding to payment...");
    } catch (err) {
        console.error(err);
        const errorMsg = "Could not initiate payment. ensure you have items in cart or backend support.";
        setError(errorMsg);
        toast.error(errorMsg);
    } finally {
        setLoading(false);
    }
  };
  
  const handleSuccess = () => {
      toast.success("Payment Successful!");
      navigate("/profile"); 
  };

  if (loading && !clientSecret) return <Loading />;

  if (!item && !clientSecret) {
      return (
          <div className="pt-32 pb-20 text-center min-h-screen flex flex-col justify-center items-center bg-gray-50">
              <div className="bg-yellow-50 p-6 rounded-full mb-4"><FiAlertTriangle className="text-4xl text-yellow-500" /></div>
              <h1 className="text-2xl font-bold mb-2">No Items in Checkout</h1>
              <p className="text-gray-500 mb-6 font-josefin">Please select a product or bundle to purchase.</p>
              <Link to="/shop" className="bg-black text-white px-8 py-3 rounded-full font-bold hover:bg-green-600 transition-colors">Go to Shop</Link>
          </div>
      )
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-32 pb-20">
      <div className="container-x mx-auto px-6">
        
        {/* STEPS INDICATOR */}
        <div className="max-w-3xl mx-auto mb-10">
          <div className="flex justify-between relative">
            <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-200 -z-10 -translate-y-1/2" />
            <div className={`absolute top-1/2 left-0 h-1 bg-green-500 -z-10 -translate-y-1/2 transition-all duration-500`} style={{ width: `${((currentStep - 1) / 2) * 100}%` }} />
            
            {steps.map((step) => (
              <div key={step.id} className="flex flex-col items-center gap-2 bg-gray-50 px-2">
                <div 
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold transition-all duration-300 ${
                    currentStep >= step.id 
                      ? "bg-green-500 text-white shadow-lg shadow-green-500/30" 
                      : "bg-gray-200 text-gray-500"
                  }`}
                >
                  {currentStep > step.id ? <FiCheck /> : <step.icon className="text-lg" />}
                </div>
                <span className={`text-xs font-semibold ${currentStep >= step.id ? "text-green-600" : "text-gray-400"}`}>
                  {step.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* LEFT: FORM/CONTENT */}
          <div className="lg:col-span-2 space-y-6">
            
            {error && (
                <div className="bg-red-50 border border-red-200 text-red-600 p-4 rounded-xl flex items-center gap-3">
                    <FiAlertTriangle className="text-xl" />
                    {error}
                </div>
            )}

            {/* STEP 1: SUMMARY */}
            {currentStep === 1 && (
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <h2 className="text-2xl font-bold mb-6 font-josefin">Order Summary</h2>
                
                <div className="flex items-center gap-6 mb-8 pb-8 border-b border-gray-100">
                    <div className="w-24 h-24 bg-gray-50 rounded-lg p-2 flex items-center justify-center border border-gray-100">
                      <img src={item?.image || "/placeholder.png"} alt={item?.name} className="max-w-full max-h-full object-contain" />
                    </div>
                    <div>
                        <h3 className="font-bold text-xl mb-1">{item?.name}</h3>
                        <p className="text-sm text-gray-500 capitalize mb-2">{itemType || 'Product'} · {purchaseType}</p>
                        <p className="text-lg font-bold text-green-600">${Number(item?.price).toLocaleString()}</p>
                    </div>
                </div>

                <div className="space-y-3 mb-8">
                    <div className="flex justify-between text-gray-600">
                        <span>Subtotal</span>
                        <span>${Number(item?.price).toLocaleString()}</span>
                    </div>
                     <div className="flex justify-between text-gray-600">
                        <span>Shipping</span>
                        <span className="text-green-600 font-medium">Free</span>
                    </div>
                    <div className="flex justify-between border-t border-gray-100 pt-4 text-xl font-bold">
                        <span>Total</span>
                        <span>${Number(item?.price).toLocaleString()}</span>
                    </div>
                </div>

                <button 
                  onClick={handleProceedToAddress}
                  className="w-full bg-black text-white py-4 rounded-xl font-bold hover:bg-green-600 transition-colors"
                >
                  Proceed to Address
                </button>
              </div>
            )}

            {/* STEP 2: ADDRESS */}
            {currentStep === 2 && (
              <form onSubmit={handleProceedToPayment} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <h2 className="text-2xl font-bold mb-6 font-josefin">Shipping Address</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                        <input required name="name" value={address.name} onChange={handleAddressChange} className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition-all" placeholder="John Doe" />
                    </div>
                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Address Line 1</label>
                        <input required name="line1" value={address.line1} onChange={handleAddressChange} className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition-all" placeholder="123 Mining St" />
                    </div>
                     <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
                        <input required name="city" value={address.city} onChange={handleAddressChange} className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition-all" placeholder="New York" />
                    </div>
                     <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">State / Province</label>
                        <input required name="state" value={address.state} onChange={handleAddressChange} className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition-all" placeholder="NY" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Postal Code</label>
                        <input required name="postal_code" value={address.postal_code} onChange={handleAddressChange} className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition-all" placeholder="10001" />
                    </div>
                     <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Country</label>
                        <select required name="country" value={address.country} onChange={handleAddressChange} className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition-all">
                            <option value="US">United States</option>
                            <option value="UK">United Kingdom</option>
                            <option value="CA">Canada</option>
                            <option value="AE">United Arab Emirates</option>
                        </select>
                    </div>
                </div>

                <div className="flex gap-4">
                     <button 
                      type="button"
                      onClick={() => setCurrentStep(1)}
                      className="px-6 py-4 rounded-xl font-bold text-gray-500 hover:bg-gray-100 transition-colors"
                    >
                      Back
                    </button>
                    <button 
                      type="submit"
                      disabled={loading}
                      className="flex-1 bg-black text-white py-4 rounded-xl font-bold hover:bg-green-600 transition-colors disabled:opacity-50"
                    >
                      {loading ? "Processing..." : "Continue to Payment"}
                    </button>
                </div>
              </form>
            )}

            {/* STEP 3: PAYMENT */}
            {currentStep === 3 && clientSecret && (
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <StripeWrapper clientSecret={clientSecret}>
                        <PaymentForm amount={Number(item?.price)} onSuccess={handleSuccess} />
                    </StripeWrapper>
                     <div className="mt-4 text-center">
                         <button onClick={() => setCurrentStep(2)} className="text-gray-400 hover:text-gray-600 text-sm">Back to Address</button>
                     </div>
                </div>
            )}
          </div>

          {/* RIGHT: MINI SUMMARY (Visible on steps 2 & 3) */}
          {currentStep > 1 && (
            <div className="hidden lg:block">
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 sticky top-32">
                 <h3 className="font-bold text-lg mb-4">Order Details</h3>
                 <div className="flex items-center gap-4 mb-4">
                    <img src={item?.image || "/placeholder.png"} alt={item?.name} className="w-16 h-16 object-contain bg-gray-50 rounded p-1" />
                    <div>
                        <p className="font-semibold text-sm line-clamp-2">{item?.name}</p>
                        <p className="text-xs text-gray-500 capitalize">{purchaseType}</p>
                    </div>
                 </div>
                 <div className="flex justify-between font-bold text-lg border-t border-gray-100 pt-4 mt-2">
                     <span>Total</span>
                     <span>${Number(item?.price).toLocaleString()}</span>
                 </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
