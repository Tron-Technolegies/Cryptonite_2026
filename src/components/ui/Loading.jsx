import React from "react";

const Loading = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      {/* Spinner */}
      <div
        className="h-14 w-14 border-4 border-white/20 rounded-full animate-spin"
        style={{ borderTopColor: "var(--primary-color)" }}
      />

      {/* Text */}
      <p className="mt-4 text-(--primary-color) text-lg tracking-wide">Loading, please wait...</p>
    </div>
  );
};

export default Loading;
