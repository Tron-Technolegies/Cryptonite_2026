import React, { useState } from "react";
import { Link } from "react-router-dom";
import api from "../../api/api";
import { FiMail, FiAlertCircle, FiCheckCircle } from "react-icons/fi";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle"); // idle, loading, success, error
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");
    setMessage("");

    try {
      await api.post("/auth/forgot-password/", { email });
      setStatus("success");
      setMessage("If an account exists with this email, you will receive a password reset link shortly.");
    } catch (err) {
      setStatus("error");
      setMessage(err.response?.data?.detail || "Something went wrong. Please try again.");
    }
  };

  return (
    <div className="max-w-md w-full mx-auto bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Forgot Password?</h2>
        <p className="text-gray-500">Enter your email to reset your password</p>
      </div>

      {status === "error" && (
        <div className="mb-6 p-4 bg-red-50 border border-red-100 text-red-600 rounded-xl flex items-center gap-3 text-sm">
          <FiAlertCircle className="shrink-0 text-lg" />
          {message}
        </div>
      )}

      {status === "success" ? (
        <div className="text-center">
          <div className="mb-6 p-4 bg-green-50 border border-green-100 text-green-700 rounded-xl flex flex-col items-center gap-2 text-sm">
            <FiCheckCircle className="text-3xl" />
            {message}
          </div>
          <Link
            to="/login"
            className="inline-block px-6 py-2 bg-black text-white rounded-lg font-semibold hover:bg-green-600 transition"
          >
            Back to Login
          </Link>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
            <div className="relative">
              <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="email"
                required
                className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all outline-none"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={status === "loading"}
            className="w-full py-3.5 bg-black text-white rounded-xl font-semibold hover:bg-green-600 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed shadow-lg hover:shadow-green-500/25"
          >
            {status === "loading" ? "Sending..." : "Send Reset Link"}
          </button>
        </form>
      )}

      {status !== "success" && (
        <div className="mt-8 text-center text-sm text-gray-500">
          Remember your password?{" "}
          <Link to="/login" className="text-green-600 font-semibold hover:text-green-700">
            Sign In
          </Link>
        </div>
      )}
    </div>
  );
};

export default ForgotPassword;
