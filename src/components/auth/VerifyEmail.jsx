import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import api from "../../api/api";
import { FiCheckCircle, FiXCircle, FiLoader } from "react-icons/fi";

const VerifyEmail = () => {
  const { uidb64, token } = useParams();
  const [status, setStatus] = useState("verifying"); // verifying, success, error
  const [message, setMessage] = useState("");

  useEffect(() => {
    const verify = async () => {
      try {
        await api.get(`/auth/verify-email/${uidb64}/${token}/`);
        setStatus("success");
      } catch (err) {
        setStatus("error");
        setMessage(err.response?.data?.detail || "Link invalid or expired.");
      }
    };

    if (uidb64 && token) {
      verify();
    } else {
      setStatus("error");
      setMessage("Invalid verification link.");
    }
  }, [uidb64, token]);

  return (
    <div className="max-w-md w-full mx-auto bg-white p-8 rounded-2xl shadow-xl border border-gray-100 text-center">
      {status === "verifying" && (
        <div className="flex flex-col items-center gap-4">
          <FiLoader className="text-4xl text-green-500 animate-spin" />
          <h2 className="text-2xl font-bold text-gray-900">Verifying Email...</h2>
          <p className="text-gray-500">Please wait while we verify your email address.</p>
        </div>
      )}

      {status === "success" && (
        <div className="flex flex-col items-center gap-4">
          <FiCheckCircle className="text-5xl text-green-500" />
          <h2 className="text-2xl font-bold text-gray-900">Email Verified!</h2>
          <p className="text-gray-500 mb-4">Your email has been successfully verified.</p>
          <Link
            to="/login"
            className="px-8 py-3 bg-black text-white rounded-xl font-semibold hover:bg-green-600 transition shadow-lg"
          >
            Continue to Login
          </Link>
        </div>
      )}

      {status === "error" && (
        <div className="flex flex-col items-center gap-4">
          <FiXCircle className="text-5xl text-red-500" />
          <h2 className="text-2xl font-bold text-gray-900">Verification Failed</h2>
          <p className="text-gray-500 mb-4">{message}</p>
          <Link
            to="/login"
            className="text-green-600 font-semibold hover:text-green-700"
          >
            Back to Login
          </Link>
        </div>
      )}
    </div>
  );
};

export default VerifyEmail;
