import React from "react";
import HomeHero from "./homeHero";
import HomeBanner from "./homeBanner";
import HomeCards from "./homeCards";
import HomeCarousel from "./homeCarousel";
import useSEO from "../../hooks/useSEO";

const Home = () => {
  useSEO({
    title: "Home",
    description:
      "Empowering single mothers to become an economic force in Uganda through cooperative action and financial literacy.",
  });

  return (
    <div className="min-h-screen bg-brand-cream">
      <HomeHero />
      <HomeBanner />
      <HomeCards />
      <HomeCarousel />
    </div>
  );
};

export default Home;
