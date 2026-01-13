import React from "react";
import { Link } from "react-router-dom";

const Errorpage = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-[100px] font-extrabold" style={{ color: "var(--primary-color)" }}>
        404
      </h1>

      <p className="text-black text-xl mt-2">Page Not Found</p>

      <p className="text-gray-400 mt-1">The page you’re looking for doesn’t exist.</p>
      <button className="border border-green-300 rounded-xl p-4 m-4 hover:bg-[var(--primary-color)] hover:text-white">
        <Link to="/">Go back to Home</Link>
      </button>
    </div>
  );
};

export default Errorpage;
