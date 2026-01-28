import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import api from "../../api/api";
import { FiLock, FiAlertCircle, FiCheckCircle } from "react-icons/fi";

const ResetPassword = () => {
  const { uidb64, token } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    password: "",
    confirm_password: "",
  });
  const [status, setStatus] = useState("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");
    setMessage("");

    if (formData.password !== formData.confirm_password) {
      setStatus("error");
      setMessage("Passwords do not match");
      return;
    }

    try {
      await api.patch(`/auth/reset-password/${uidb64}/${token}/`, {
        password: formData.password,
        token: token,
        uidb64: uidb64,
      });
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setMessage(err.response?.data?.detail || "Failed to reset password. Link may be expired.");
    }
  };

  if (status === "success") {
    return (
      <div className="max-w-md w-full mx-auto bg-white p-8 rounded-2xl shadow-xl border border-gray-100 text-center">
        <FiCheckCircle className="text-5xl text-green-500 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Password Reset!</h2>
        <p className="text-gray-500 mb-6">Your password has been successfully updated.</p>
        <Link
          to="/login"
          className="inline-block w-full py-3.5 bg-black text-white rounded-xl font-semibold hover:bg-green-600 transition shadow-lg"
        >
          Sign In Now
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-md w-full mx-auto bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Set New Password</h2>
        <p className="text-gray-500">Please enter your new password below</p>
      </div>

      {status === "error" && (
        <div className="mb-6 p-4 bg-red-50 border border-red-100 text-red-600 rounded-xl flex items-center gap-3 text-sm">
          <FiAlertCircle className="shrink-0 text-lg" />
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
          <div className="relative">
            <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="password"
              required
              className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all outline-none"
              placeholder="••••••••"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Confirm Password</label>
          <div className="relative">
            <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="password"
              required
              className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all outline-none"
              placeholder="••••••••"
              value={formData.confirm_password}
              onChange={(e) => setFormData({ ...formData, confirm_password: e.target.value })}
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={status === "loading"}
          className="w-full py-3.5 bg-black text-white rounded-xl font-semibold hover:bg-green-600 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed shadow-lg hover:shadow-green-500/25"
        >
          {status === "loading" ? "Resetting..." : "Reset Password"}
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;
