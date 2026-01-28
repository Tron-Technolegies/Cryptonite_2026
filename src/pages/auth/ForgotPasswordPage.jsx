import React, { useEffect } from "react";
import ForgotPassword from "../../components/auth/ForgotPassword";

const ForgotPasswordPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen pt-32 pb-20 bg-gray-50 flex items-center justify-center px-4">
      <ForgotPassword />
    </div>
  );
};

export default ForgotPasswordPage;
