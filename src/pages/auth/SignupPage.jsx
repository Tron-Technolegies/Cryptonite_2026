import React, { useEffect } from "react";
import Signup from "../../components/auth/Signup";

const SignupPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="min-h-screen pt-20 pb-20 bg-gray-50 flex items-center justify-center px-4">
      <Signup />
    </div>
  );
};

export default SignupPage;
