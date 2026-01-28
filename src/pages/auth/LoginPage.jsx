import React, { useEffect } from "react";
import Login from "../../components/auth/Login";

const LoginPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="min-h-screen pt-20 pb-20 bg-gray-50 flex items-center justify-center px-4">
      <Login />
    </div>
  );
};

export default LoginPage;
