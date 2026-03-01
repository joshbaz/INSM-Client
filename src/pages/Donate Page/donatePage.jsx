import React, { useState } from "react";
import Hero from "./donateHero";
import Stats from "./donateStats";
import InvestmentTiers from "./investmentTiers";
import PathToProsperity from "./pathToProsperity";
import EmpowerAMotherToday from "./empowerAMotherToday";
import DonationModal from "./donationModel/DonationModal";
import useSEO from "../../hooks/useSEO";

const donatePage = () => {
  useSEO({
    title: "Donate",
    description:
      "Invest in the economic dignity of single mothers in Uganda. Your contribution directly funds cooperative formation and financial literacy.",
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTier, setSelectedTier] = useState(null);

  const handleDonateClick = (tier = null) => {
    setSelectedTier(tier);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedTier(null);
  };

  return (
    <div className="min-h-screen">
      <Hero />
      <Stats />
      <InvestmentTiers onDonateClick={handleDonateClick} />
      <PathToProsperity />
      <EmpowerAMotherToday onDonateClick={() => handleDonateClick(null)} />

      <DonationModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        tier={selectedTier}
      />
    </div>
  );
};

export default donatePage;
