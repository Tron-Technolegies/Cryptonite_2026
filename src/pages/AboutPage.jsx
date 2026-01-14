import React, { useEffect } from "react";
import AboutHeroSection from "../components/about/AboutHeroSection";
import Leaders from "../components/about/Leaders";
import Location from "../components/about/Location";
import TimelineSection from "../components/home/TimelineSection";
import OurStory from "../components/about/OurStory";
import OurValues from "../components/about/OurValues";
import Achievements from "../components/about/Achievements";

export default function AboutPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="container-x">
      <AboutHeroSection />
      <OurStory />
      <Achievements />
      <OurValues />
      <Leaders />
      <TimelineSection />
      <Location />
    </div>
  );
}
