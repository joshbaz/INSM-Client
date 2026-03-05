import React from "react";
import useSEO from "../../../hooks/useSEO";
import SeedPortalsHero from "./components/SeedPortalsHero";
import TheEngines from "./components/TheEngines";
import StrategicConclusionCTA from "./components/StrategicConclusionCTA";

const SeedPortals = () => {
  useSEO({
    title: "Seed Portals & 1k Club | INSM Uganda",
    description:
      "The dual engine of national transformation. Join the 1k Club or capitalize a Parish Seed Portal to secure Uganda's industrial future.",
  });

  return (
    <div className="min-h-screen ">
      {/* 1. Hero Section matches DonateHero */}
      <SeedPortalsHero />

      {/* 2. Engines grid matches InvestmentTiers */}
      <TheEngines />

      {/* 3. CTA matches EmpowerAMotherToday */}
      <StrategicConclusionCTA />
    </div>
  );
};

export default SeedPortals;
