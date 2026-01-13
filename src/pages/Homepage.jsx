import React from "react";
import HeroSection from "../components/home/HeroSection";
import MiningLocations from "../components/home/MiningLocations";
import ProfitableMiners from "../components/home/ProfitableMiners";
import CoinTicker from "../components/home/CoinTicker";
import WhyChooseUs from "../components/home/WhyChooseUs";
import MiningNews from "../components/home/MiningNews";
import Blogs from "./Blogs";
import FAQ from "../components/home/FAQ";

export default function Homepage() {
  return (
    <div>
      <HeroSection />
      <CoinTicker />
      <ProfitableMiners />
      <MiningLocations />
      <WhyChooseUs />
      <MiningNews />
      <Blogs />
      <FAQ />
    </div>
  );
}
