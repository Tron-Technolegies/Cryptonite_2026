import React, { useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { FiCheckCircle, FiHome, FiPackage, FiShoppingBag, FiUser } from "react-icons/fi";

const PaymentSuccessPage = () => {
  const location = useLocation();
  const { paymentIntent, purchaseType, amount } = location.state || {};

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 pt-32">
      <div className="max-w-2xl w-full bg-white border border-gray-200 p-8 md:p-12 rounded-3xl shadow-xl">
        {/* Success Icon */}
        <div className="flex justify-center mb-6">
          <div
            className="w-14 h-14 rounded-full flex items-center justify-center shadow-lg"
            style={{ backgroundColor: "var(--primary-color-light, #d4edda)" }}
          >
            <FiCheckCircle
              className="text-6xl"
              style={{ color: "var(--primary-color, #28a745)" }}
            />
          </div>
        </div>

        {/* Success Message */}
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-3 font-josefin">
          Payment Successful!
        </h1>
        <p className="text-gray-600 text-center mb-2 text-lg">
          Your transaction has been completed securely.
        </p>

        {/* Payment Details */}
        <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 mb-8 mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            {paymentIntent?.id && (
              <div>
                <span className="text-gray-500 block mb-1">Transaction ID</span>
                <span className="font-mono text-xs text-gray-700 break-all">
                  {paymentIntent.id}
                </span>
              </div>
            )}
            {amount && (
              <div>
                <span className="text-gray-500 block mb-1">Amount Paid</span>
                <span className="font-bold text-xl" style={{ color: "var(--primary-color)" }}>
                  ${Number(amount).toLocaleString()}
                </span>
              </div>
            )}
            {purchaseType && (
              <div>
                <span className="text-gray-500 block mb-1">Purchase Type</span>
                <span className="font-semibold text-gray-700 capitalize">{purchaseType}</span>
              </div>
            )}
            <div>
              <span className="text-gray-500 block mb-1">Status</span>
              <span className="inline-block px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">
                Completed
              </span>
            </div>
          </div>
        </div>

        {/* Order Processing Note */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-8">
          <p className="text-blue-800 text-sm text-center">
            <strong>Your order is being processed.</strong> You'll receive a confirmation email
            shortly.
          </p>
        </div>

        {/* Navigation Options */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* <Link
            to="/profile"
            className="flex items-center justify-center gap-2 w-full text-white py-4 rounded-xl font-bold transition-all shadow-md hover:shadow-lg hover:scale-105"
            style={{ backgroundColor: "var(--primary-color)" }}
          >
            <FiPackage className="text-xl" />
            <span>View My Orders</span>
          </Link> */}

          <Link
            to="/shop"
            className="flex items-center justify-center gap-2 w-full bg-white border-2 text-gray-700 py-4 rounded-xl font-bold transition-all hover:bg-gray-50 hover:scale-105"
            style={{ borderColor: "var(--primary-color)" }}
          >
            <FiShoppingBag className="text-xl" />
            <span>Continue Shopping</span>
          </Link>

          {/* <Link
            to="/profile"
            className="flex items-center justify-center gap-2 w-full bg-gray-100 text-gray-700 py-4 rounded-xl font-medium transition-all hover:bg-gray-200"
          >
            <FiUser className="text-xl" />
            <span>My Profile</span>
          </Link> */}

          <Link
            to="/"
            className="flex items-center justify-center gap-2 w-full bg-gray-100 text-gray-700 py-4 rounded-xl font-medium transition-all hover:bg-gray-200"
          >
            <FiHome className="text-xl" />
            <span>Return Home</span>
          </Link>
        </div>

        {/* Thank You */}
        <p className="text-center text-gray-500 text-sm mt-8">
          Thank you for your purchase! We appreciate your business.
        </p>
      </div>
    </div>
  );
};

export default PaymentSuccessPage;
