import React from "react";
import HomeHero from "./homeHero";
import HomeClubTrigger from "./homeClubTrigger";
import HomeAnchors from "./homeAnchors";
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
      <HomeAnchors />
    </div>
  );
};

export default Home;
