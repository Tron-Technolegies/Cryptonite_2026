import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import api from "../../api/api";
import { FiMail, FiLock, FiAlertCircle, FiEye, FiEyeOff } from "react-icons/fi";
import { toast } from "react-toastify";

const Login = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.state?.fromSignup) {
      toast.info("Please verify your email before logging in.");
    }
  }, [location.state]);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const response = await api.post("/auth/login/", formData);
      localStorage.setItem("access", response.data.access);
      localStorage.setItem("refresh", response.data.refresh);

      // Dispatch auth change event to update Header
      window.dispatchEvent(new Event("auth-change"));

      navigate("/profile");
    } catch (err) {
      setError(err.response?.data?.detail || "Invalid credentials. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl w-full mx-auto bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h2>
        <p className="text-gray-500">Sign in to continue your crypto journey</p>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-100 text-red-600 rounded-xl flex items-center gap-3 text-sm">
          <FiAlertCircle className="shrink-0 text-lg" />
          {error}
        </div>
      )}
      {location.state?.fromSignup && (
        <div className="mb-6 p-4 bg-blue-50 border border-blue-100 text-blue-700 rounded-xl text-sm">
          We’ve sent a verification link to <b>{location.state.email}</b>. Please verify your email
          before logging in.
        </div>
      )}

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
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>

          <div className="relative">
            <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

            <input
              type={showPassword ? "text" : "password"}
              required
              className="w-full pl-11 pr-12 py-3 bg-gray-50 border border-gray-200 rounded-xl
                 focus:ring-2 focus:ring-green-500 focus:border-transparent
                 transition-all outline-none"
              placeholder="••••••••"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            />

            {/* Eye icon */}
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2
                 text-gray-400 hover:text-gray-600
                 transition-transform duration-200
                 active:scale-90"
            >
              {showPassword ? (
                <FiEyeOff size={18} className="transition-all duration-300 scale-110" />
              ) : (
                <FiEye size={18} className="transition-all duration-300 opacity-80" />
              )}
            </button>
          </div>
        </div>

        <div className="mt-2 text-right text-sm text-gray-500">
          <Link to="/forgot-password" className="text-green-600 font-semibold hover:text-green-700">
            Forgot Password
          </Link>
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full py-3.5 bg-black text-white rounded-xl font-semibold hover:bg-green-600 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed shadow-lg hover:shadow-green-500/25"
        >
          {loading ? "Signing in..." : "Sign In"}
        </button>
      </form>
      {location.state?.fromSignup && (
        <button
          onClick={async () => {
            try {
              await api.post("/auth/resend-verification/", {
                email: location.state?.email,
              });
              toast.success("Verification email sent again.");
            } catch {
              toast.error("Failed to resend verification email.");
            }
          }}
          className="text-sm text-green-600 font-semibold hover:text-green-700 mt-4 block text-center w-full"
        >
          Resend verification email
        </button>
      )}

      <div className="mt-8 text-center text-sm text-gray-500">
        Don't have an account?{" "}
        <Link to="/signup" className="text-green-600 font-semibold hover:text-green-700">
          Create Account
        </Link>
      </div>
    </div>
  );
};

export default Login;
