import React from "react";
import HomeHero from "./homeHero";
import HomeClubTrigger from "./homeClubTrigger";
import HomeAnchors from "./homeAnchors";
import HomePerformanceMetric from "./homePerformanceMetric";
import Carousel from "./homeCarousel";
import Cards from "./homeCards";
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
      <HomeClubTrigger />
      <Carousel />
      <HomeAnchors />
      <HomePerformanceMetric />
      <Cards />
    </div>
  );
};

export default Home;
