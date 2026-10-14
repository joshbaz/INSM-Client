import React, { useState } from "react";
import Hero from "./donateHero";
import Stats from "./donateStats";
import InvestmentTiers from "./investmentTiers";
import PathToProsperity from "./pathToProsperity";
import EmpowerAMotherToday from "./empowerAMotherToday";
import DonationModal from "./donationModel/DonationModal";
import useSEO from "../../../hooks/useSEO";
import { useDefaultTier } from "../../../store/tanstackStore/services/queries";

const DonatePage = () => {
  useSEO({
    title: "Partner With Us",
    description:
      "Invest in the economic dignity of single mothers in Uganda. Your contribution directly funds cooperative formation and financial literacy.",
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTier, setSelectedTier] = useState(null);

  // General "Empower A Mother Today" gifts go to the tier set in the dashboard (The First Threads by default)
  const { data: defaultTierData } = useDefaultTier();
  const defaultTier = defaultTierData?.tier
    ? { ...defaultTierData.tier, amount: `$${defaultTierData.tier.amount}` }
    : null;

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
      <EmpowerAMotherToday onDonateClick={() => handleDonateClick(defaultTier)} />

      <DonationModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        tier={selectedTier}
      />
    </div>
  );
};

export default DonatePage;
