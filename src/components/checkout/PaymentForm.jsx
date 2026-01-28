import React, { useState } from "react";
import { PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { FiLock, FiAlertCircle, FiCreditCard, FiCheckCircle } from "react-icons/fi";

export default function PaymentForm({ amount, onSuccess }) {
  const stripe = useStripe();
  const elements = useElements();

  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);
    setMessage(null);

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/profile`, // Redirect after payment
      },
      redirect: "if_required",
    });

    if (error) {
       console.error(error);
      setMessage(error.message);
      setIsLoading(false);
    } else if (paymentIntent && paymentIntent.status === "succeeded") {
       console.log("Payment Succeeded!");
       onSuccess(paymentIntent);
       setIsLoading(false);
    } else {
       // Requires redirect or processing
       setMessage("Payment processing...");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto">
      <div className="bg-gray-900/50 backdrop-blur-md border border-gray-800 rounded-2xl p-8 shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
            <div>
                <h3 className="text-2xl font-bold text-white mb-2">Payment Details</h3>
                <p className="text-gray-400 text-sm">Complete your purchase securely</p>
            </div>
            <div className="h-12 w-12 bg-gray-800 rounded-full flex items-center justify-center border border-gray-700">
                <FiCreditCard className="text-green-400 text-xl" />
            </div>
        </div>
        
        {/* Payment Element */}
        <div className="mb-8 p-1">
            <PaymentElement 
                id="payment-element" 
                options={{ 
                    layout: "tabs",
                }} 
            />
        </div>
        
        {/* Error Message */}
        {message && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/50 text-red-500 rounded-xl flex items-start gap-3 text-sm animate-fadeIn">
            <FiAlertCircle className="mt-0.5 text-lg flex-shrink-0" /> 
            <span>{message}</span>
          </div>
        )}

        {/* Submit Button */}
        <button
          disabled={isLoading || !stripe || !elements}
          id="submit"
          className="group relative w-full bg-green-500 text-white py-4 rounded-xl font-bold text-lg hover:bg-green-400 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-green-500/20 overflow-hidden"
        >
          <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-shimmer" />
          
          {isLoading ? (
            <span className="flex items-center justify-center gap-3">
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Processing Securely...
            </span>
          ) : (
            <span className="flex items-center justify-center gap-2">
                Pay <span className="font-mono">${amount?.toLocaleString() || "0.00"}</span>
                <FiLock className="text-white/70" />
            </span>
          )}
        </button>

        {/* Footer */}
        <div className="mt-6 flex items-center justify-center gap-2 text-xs text-gray-500">
            <FiCheckCircle className="text-green-500" />
            <span className="font-medium">Encrypted & Secure Payment</span>
        </div>
      </div>
    </form>
  );
}
