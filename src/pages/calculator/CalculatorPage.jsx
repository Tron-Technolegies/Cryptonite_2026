import React from "react";
import HowToUseCalculator from "../../components/commoncalculator/HowToUseCalculator";
import PopularMinerExamples from "../../components/commoncalculator/PopularMinerExamples";
import MiningCalculator from "../../components/commoncalculator/MiningCalculator";

export default function CalculatorPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-0 mt-6 sm:mt-8">
      {/* Title */}
      <div className="text-center py-6 sm:py-10">
        <h1 className="font-bold josefin-sans text-3xl sm:text-4xl md:text-5xl">
          CALCULATE MINING PROFITS
        </h1>

        <p className="text-gray-600 mt-4 sm:mt-6 dm-sans text-sm sm:text-base max-w-3xl mx-auto">
          Our Bitcoin mining calculator helps you get an overview of your potential profits. Below
          you will find a short guide on how to use it, as well as sample calculations for selected
          miners.
        </p>
      </div>

      {/* How to use */}
      <HowToUseCalculator />

      {/* Calculator */}
      <div className="mt-6 sm:mt-8">
        <MiningCalculator />
      </div>

      {/* Popular miners */}
      <div className="my-8 sm:mt-10">
        <PopularMinerExamples />
      </div>
    </div>
  );
}
