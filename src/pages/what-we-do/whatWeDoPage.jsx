import React from "react";
import WhatWeDoHero from "./whatWeDoHero";
import ThreeRopes from "./threeRopes";
import RopesImpact from "./ropesImpact";
import PowerMovement from "./powerMovement";

const WhatWeDoPage = () => {
  return (
    <div className="min-h-screen bg-brand-cream">
      <WhatWeDoHero />
      <ThreeRopes />
      <RopesImpact />
      <PowerMovement />
    </div>
  );
};

export default WhatWeDoPage;
