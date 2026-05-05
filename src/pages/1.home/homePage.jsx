import React from "react";
import HomeHero from "./homeHero";
import HomeAnchors from "./homeAnchors";
import HomePerformanceMetric from "./homePerformanceMetric";
import HomeVision from "./homeVision";
import OurMission from "./homeOurMission";
import Cards from "./homeCards";
import GoldStandard from "./homeGoldStandard";
import useSEO from "../../hooks/useSEO";

const Home = () => {
  useSEO({
    title: "Home",
    description:
      "Empowering single mothers to become an economic force in Uganda through cooperative action and financial literacy.",
  });

  return (
    <div className="min-h-screen bg-brand-white">
      <HomeHero />
      <HomeVision />
      <OurMission />
      <HomeAnchors />
      <Cards />
      <GoldStandard />
      <HomePerformanceMetric />
    </div>
  );
};

export default Home;
