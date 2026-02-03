import React, { useEffect } from "react";
import HeroSection from "../components/home/HeroSection";
import MiningLocations from "../components/home/MiningLocations";
import ProfitableMiners from "../components/home/ProfitableMiners";
import BundleSection from "../components/home/BundleSection";
import CoinTicker from "../components/home/CoinTicker";
import WhyChooseUs from "../components/home/WhyChooseUs";
import EventsSection from "../components/home/EventsSection";
import Blogs from "./Blogs";
import FAQ from "../components/home/FAQ";
import TimelineSection from "../components/home/TimelineSection";

export default function Homepage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div>
      <HeroSection />
      <CoinTicker />
      <ProfitableMiners />
      <BundleSection />
      <MiningLocations />
      <WhyChooseUs />
      <EventsSection />
      <Blogs />
      <TimelineSection limit={2} />
      <FAQ />
    </div>
  );
}
