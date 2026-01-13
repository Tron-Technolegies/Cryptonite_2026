import React from "react";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section
      className="
        relative
        h-[86vh]
        lg:h-screen
        w-full
        overflow-hidden
        flex
        items-end
        justify-center
        bg-[#0b0f0e]
      "
    >
      {/* BACKGROUND IMAGE */}
      <div
        className="
          absolute inset-0
          bg-[url('/hero-bg-vienna.jpg')]
          bg-no-repeat bg-cover bg-center
          opacity-40
        "
      />

      {/* GREEN GLOW */}
      <div
        className="
          absolute inset-0
          bg-[radial-gradient(circle_at_center,rgba(34,197,94,0.15),transparent_70%)]
        "
      />

      {/* CONTENT */}
      <div
        className="
          relative z-10
          w-full max-w-6xl
          px-6 pb-16 lg:pb-0  lg:mt-4 text-center
          drop-shadow-[0_0_15px_rgba(34,197,94,0.35)]
        "
      >
        {/* HEADING */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl josefin-sans font-bold text-white tracking-wide">
          IN MINE WE <span className="text-green-500">TRUST</span>
        </h1>

        {/* DESCRIPTION */}
        <p className="mt-5 text-gray-300 max-w-2xl mx-auto dm-sans text-sm sm:text-base md:text-lg leading-relaxed">
          We design, deploy, and operate professional Bitcoin mining infrastructure for miners who
          care about uptime, power discipline, and long-term execution
        </p>

        {/* CTA */}
        <Link to="/shop">
          <button
            className="
              mt-8
              px-10 py-4
              rounded-full
              bg-transparent
              text-white
              font-semibold
              border border-green-500
              hover:bg-green-700
              transition
              shadow-[0_0_20px_rgba(26,255,133,0.35)]
              cursor-pointer
            "
          >
            Start Mining
          </button>
        </Link>

        {/* LOGO */}
        <div className="mt-8 flex justify-center">
          <img src="/crypto-logo-hero.png" alt="Crypto Logo" className="h-20 sm:h-30 opacity-80" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
