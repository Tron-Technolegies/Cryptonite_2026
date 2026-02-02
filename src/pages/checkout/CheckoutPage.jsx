import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { createPaymentIntent } from "../../api/payment.api";
import { getCart, removeFromCart, updateCartItem } from "../../api/cart.api";
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
} from "react-icons/fi";
import { getImageUrl } from "../../utils/imageUtils";

const steps = [
  { id: 1, label: "Summary", icon: FiShoppingBag },
  { id: 2, label: "Address", icon: FiMapPin },
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

  // Fetch cart items on mount
  useEffect(() => {
    const fetchCart = async () => {
      try {
        setCartLoading(true);
        const response = await getCart();
        setCartItems(response);
      } catch (err) {
        console.error("Error fetching cart:", err);
        // Cart might be empty or user not logged in
      } finally {
        setCartLoading(false);
      }
    };

    fetchCart();
  }, []);

  // Calculate total from cart items or item from navigation
  // Also handles rent pricing (monthly price for rentals)
  const getTotal = () => {
    if (item) {
      // For rental items, use monthly price if available, otherwise use regular price
      const price =
        purchaseType === "rent" && item.monthly_price
          ? Number(item.monthly_price)
          : Number(item.price);
      return price || 0;
    }
    return cartItems.reduce((sum, cartItem) => {
      // Check if this cart item is a rental
      const isRental = cartItem.purchase_type === "rent";
      const price =
        isRental && cartItem.product?.monthly_price
          ? Number(cartItem.product.monthly_price)
          : Number(cartItem.product?.price || 0);
      const qty = Number(cartItem.quantity || 1);
      return sum + price * qty;
    }, 0);
  };

  const total = getTotal();

  // Handle cart item removal
  const handleRemoveItem = async (itemId) => {
    try {
      await removeFromCart(itemId);
      setCartItems(cartItems.filter((item) => item.id !== itemId));
      toast.success("Item removed from cart");
    } catch (err) {
      toast.error("Failed to remove item");
    }
  };

  // Handle quantity update
  const handleQuantityChange = async (itemId, newQuantity) => {
    if (newQuantity < 1) return;

    try {
      await updateCartItem(itemId, newQuantity);
      setCartItems(
        cartItems.map((item) => (item.id === itemId ? { ...item, quantity: newQuantity } : item)),
      );
      toast.success("Quantity updated");
    } catch (err) {
      toast.error("Failed to update quantity");
    }
  };

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
        ...(purchaseType === "rent" && { duration_days: 30 }),
      };

      const data = await createPaymentIntent(payload);
      setClientSecret(data.client_secret);
      setCurrentStep(3);
      toast.success("Address saved. Proceeding to payment...");
    } catch (err) {
      console.error(err);
      const errorMsg =
        "Could not initiate payment. ensure you have items in cart or backend support.";
      setError(errorMsg);
      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  const handleSuccess = async (paymentIntent) => {
    try {
      // Navigate to payment success page with payment details
      // Backend webhook automatically creates order/rental via Stripe
      toast.success("Payment Successful!");

      navigate("/payment-success", {
        state: {
          paymentIntent: paymentIntent,
          purchaseType: purchaseType || "buy",
          amount: total,
        },
      });
    } catch (err) {
      console.error("Error during success handling:", err);
      toast.success("Payment Successful!");
      navigate("/payment-success");
    }
  };

  if (cartLoading) return <Loading />;

  // Check if we have any items to checkout (either from nav state or cart)
  if (!item && cartItems.length === 0 && !clientSecret) {
    return (
      <div className="pt-32 pb-20 text-center min-h-screen flex flex-col justify-center items-center bg-gray-50">
        <div className="bg-yellow-50 p-6 rounded-full mb-4">
          <FiAlertTriangle className="text-4xl text-yellow-500" />
        </div>
        <h1 className="text-2xl font-bold mb-2">No Items in Checkout</h1>
        <p className="text-gray-500 mb-6 font-josefin">
          Please select a product or bundle to purchase.
        </p>
        <Link
          to="/shop"
          className="bg-black text-white px-8 py-3 rounded-full font-bold hover:bg-green-600 transition-colors"
        >
          Go to Shop
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-32 pb-20">
      <div className="container-x mx-auto px-6">
        {/* STEPS INDICATOR */}
        <div className="max-w-3xl mx-auto mb-10">
          <div className="relative flex justify-between items-center">
            {/* Background Progress Bar Container */}
            <div className="absolute top-6 left-0 w-full h-2 bg-gray-200 rounded-full -z-10" />

            {/* Active Progress Bar with Animation */}
            <div
              className="absolute top-6 left-0 h-2 rounded-full -z-10 transition-all duration-700 ease-in-out shadow-md"
              style={{
                width: `${((currentStep - 1) / 2) * 100}%`,
                backgroundColor: "var(--primary-color)",
                boxShadow: `0 0 10px var(--primary-color, #28a745)`,
              }}
            />

            {steps.map((step, index) => (
              <div key={step.id} className="flex flex-col items-center gap-3 bg-gray-50 px-4 z-10">
                {/* Step Circle */}
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold transition-all duration-500 border-4 ${
                    currentStep >= step.id
                      ? "text-white shadow-xl border-transparent scale-110"
                      : "bg-white text-gray-400 border-gray-300 shadow-sm"
                  }`}
                  style={
                    currentStep >= step.id
                      ? {
                          backgroundColor: "var(--primary-color)",
                          boxShadow: `0 4px 15px var(--primary-color, #28a745)40`,
                        }
                      : {}
                  }
                >
                  {currentStep > step.id ? (
                    <FiCheck className="text-2xl animate-in zoom-in duration-300" />
                  ) : (
                    <step.icon className="text-xl" />
                  )}
                </div>

                {/* Step Label */}
                <div className="text-center">
                  <span
                    className={`text-sm font-bold block transition-colors duration-300 ${
                      currentStep >= step.id ? "" : "text-gray-400"
                    }`}
                    style={currentStep >= step.id ? { color: "var(--primary-color)" } : {}}
                  >
                    {step.label}
                  </span>

                  {/* Completion Badge */}
                  {currentStep > step.id && (
                    <span className="inline-block mt-1 px-2 py-0.5 bg-green-100 text-green-700 text-xs font-semibold rounded-full animate-in fade-in slide-in-from-bottom-2 duration-300">
                      ✓ Done
                    </span>
                  )}

                  {/* Active Badge */}
                  {currentStep === step.id && (
                    <span
                      className="inline-block mt-1 px-2 py-0.5 text-white text-xs font-semibold rounded-full animate-pulse"
                      style={{ backgroundColor: "var(--primary-color)" }}
                    >
                      Active
                    </span>
                  )}
                </div>
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

                {/* Display items */}
                <div className="space-y-4 mb-8 pb-8 border-b border-gray-100">
                  {item ? (
                    // Direct buy from product page
                    <div className="flex items-center gap-6">
                      <div className="w-24 h-24 bg-gray-50 rounded-lg p-2 flex items-center justify-center border border-gray-100">
                        <img
                          src={getImageUrl(item?.image)}
                          alt={item?.name}
                          className="max-w-full max-h-full object-contain"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-xl mb-1">{item?.name || item?.model_name}</h3>
                        <p className="text-sm text-gray-500 capitalize mb-2">
                          {itemType || "Product"} {purchaseType && `• ${purchaseType}`}
                        </p>
                        <p className="text-lg font-bold text-green-600">
                          ${Number(item?.price).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  ) : (
                    // Cart items with quantity controls
                    cartItems.map((cartItem) => (
                      <div
                        key={cartItem.id}
                        className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg"
                      >
                        <div className="w-20 h-20 bg-white rounded-lg p-2 flex items-center justify-center border border-gray-200">
                          <img
                            src={getImageUrl(cartItem.product?.image || cartItem.bundle?.image) || "/placeholder.png"}
                            alt={cartItem.product?.model_name || cartItem.bundle?.name}
                            className="max-w-full max-h-full object-contain"
                          />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-bold text-lg mb-1">{cartItem.product?.model_name || cartItem.bundle?.name}</h3>
                          <p className="text-sm text-gray-600 mb-2">
                            ${Number(cartItem.product?.price || cartItem.bundle?.price).toLocaleString()} each
                          </p>

                          {/* Quantity Controls */}
                          <div className="flex items-center gap-3">
                            <div className="flex items-center border border-gray-300 rounded-lg">
                              <button
                                onClick={() =>
                                  handleQuantityChange(cartItem.id, cartItem.quantity - 1)
                                }
                                className="p-2 hover:bg-gray-100 transition-colors"
                                disabled={cartItem.quantity <= 1}
                              >
                                <FiMinus className="text-sm" />
                              </button>
                              <span className="px-4 font-semibold">{cartItem.quantity}</span>
                              <button
                                onClick={() =>
                                  handleQuantityChange(cartItem.id, cartItem.quantity + 1)
                                }
                                className="p-2 hover:bg-gray-100 transition-colors"
                              >
                                <FiPlus className="text-sm" />
                              </button>
                            </div>

                            {/* Remove Button */}
                            <button
                              onClick={() => handleRemoveItem(cartItem.id)}
                              className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                              title="Remove item"
                            >
                              <FiTrash2 className="text-base" />
                            </button>
                          </div>
                        </div>
                        <div className="text-right">
                          <p
                            className="text-base font-bold"
                            style={{ color: "var(--primary-color)" }}
                          >
                            $
                            {(Number(cartItem.product?.price || cartItem.bundle?.price) * cartItem.quantity).toLocaleString()}
                          </p>
                        </div>
                      </div>
                    ))
                  )}
                </div>

                <div className="space-y-3 mb-8">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span>${total.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Shipping</span>
                    <span className="text-green-600 font-medium">Free</span>
                  </div>
                  <div className="flex justify-between border-t border-gray-100 pt-4 text-xl font-bold">
                    <span>Total</span>
                    <span>${total.toLocaleString()}</span>
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
              <form
                onSubmit={handleProceedToPayment}
                className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 animate-in fade-in slide-in-from-bottom-4 duration-500"
              >
                <h2 className="text-2xl font-bold mb-6 font-josefin">Shipping Address</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name
                    </label>
                    <input
                      required
                      name="name"
                      value={address.name}
                      onChange={handleAddressChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition-all"
                      placeholder="John Doe"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Address Line 1
                    </label>
                    <input
                      required
                      name="line1"
                      value={address.line1}
                      onChange={handleAddressChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition-all"
                      placeholder="123 Mining St"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
                    <input
                      required
                      name="city"
                      value={address.city}
                      onChange={handleAddressChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition-all"
                      placeholder="New York"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      State / Province
                    </label>
                    <input
                      required
                      name="state"
                      value={address.state}
                      onChange={handleAddressChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition-all"
                      placeholder="NY"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Postal Code
                    </label>
                    <input
                      required
                      name="postal_code"
                      value={address.postal_code}
                      onChange={handleAddressChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition-all"
                      placeholder="10001"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Country</label>
                    <select
                      required
                      name="country"
                      value={address.country}
                      onChange={handleAddressChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition-all"
                    >
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
                  <PaymentForm amount={total} onSuccess={handleSuccess} />
                </StripeWrapper>
                <div className="mt-4 text-center">
                  <button
                    onClick={() => setCurrentStep(2)}
                    className="text-gray-500 hover:text-gray-700 text-sm font-medium"
                  >
                    ← Back to Address
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* RIGHT: MINI SUMMARY (Visible on steps 2 & 3) */}
          {currentStep > 1 && (
            <div className="hidden lg:block">
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 sticky top-32">
                <h3 className="font-bold text-lg mb-4">Order Details</h3>
                
                {item ? (
                  /* Single Item Checkput */
                  <div className="flex items-center gap-4 mb-4">
                    <img
                      src={getImageUrl(item?.image) || "/placeholder.png"}
                      alt={item?.name}
                      className="w-16 h-16 object-contain bg-gray-50 rounded p-1"
                    />
                    <div>
                      <p className="font-semibold text-sm line-clamp-2">{item?.name}</p>
                      <p className="text-xs text-gray-500 capitalize">{purchaseType}</p>
                    </div>
                  </div>
                ) : (
                  /* Cart Checkout Summary */
                  <div className="mb-4">
                     <p className="text-gray-600 mb-2">Cart Checkout</p>
                     <div className="flex -space-x-2 overflow-hidden mb-2">
                        {cartItems.slice(0, 4).map((i, idx) => (
                           <img 
                             key={idx}
                             className="inline-block h-8 w-8 rounded-full ring-2 ring-white bg-gray-100 object-contain"
                             src={getImageUrl(i.product?.image || i.bundle?.image)}
                             alt=""
                           />
                        ))}
                        {cartItems.length > 4 && (
                           <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center text-xs font-bold text-gray-500 ring-2 ring-white">
                             +{cartItems.length - 4}
                           </div>
                        )}
                     </div>
                     <p className="text-sm font-medium">{cartItems.length} Items</p>
                  </div>
                )}
                
                <div className="flex justify-between font-bold text-lg border-t border-gray-100 pt-4 mt-2">
                  <span>Total</span>
                  <span>${total.toLocaleString()}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
