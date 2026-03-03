import React from "react";
import WhatWeDoHero from "./whatWeDoHero";
import ThreeRopes from "./threeRopes";
import RopesImpact from "./ropesImpact";
import ImageSlider from "./imageSlider";
import PowerMovement from "./powerMovement";
import useSEO from "../../hooks/useSEO";

const WhatWeDoPage = () => {
  useSEO({
    title: "What We Do",
    description:
      "Learn about our Three Ropes model: The Safety Net, The Cooperative Structure, and Financial Independence for single mothers.",
  });

  return (
    <div className="min-h-screen bg-brand-white">
      <WhatWeDoHero />
      <ThreeRopes />
      <RopesImpact />
      <ImageSlider />
      <PowerMovement />
    </div>
  );
};

export default WhatWeDoPage;
