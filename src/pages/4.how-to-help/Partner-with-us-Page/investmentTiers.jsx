import React, { useState } from "react";
import { Icon } from "@iconify/react";
import { motion, AnimatePresence } from "framer-motion";
import { fadeUp, staggerContainer } from "../../../utils/animations";
import TierDetailModal from "./TierDetailModal";
import TIERS from "../../../data/donationTiers.json";

const InvestmentTiers = ({ onDonateClick }) => {
  const [selectedTier, setSelectedTier] = useState(null);

  return (
    <section className="w-full py-24 bg-brand-white">
      <div className="max-w-7xl mx-auto px-8 md:px-24">
        <motion.div
          className="mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
        >
          <h2 className="text-4xl md:text-5xl font-bold font-primary text-black">
            Our Investment Tiers
          </h2>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={staggerContainer}
        >
          {TIERS.map((tier) => (
            <motion.div
              variants={fadeUp}
              key={tier.id}
              className="bg-brand-white-100 rounded-xl shadow-sm border border-gray-100 overflow-hidden flex flex-col h-full hover:shadow-md transition-shadow p-6 group"
            >
              <div className="mb-6">
                <h3 className="text-2xl font-bold font-primary text-black mb-1">
                  {tier.title}
                </h3>
                <p className="text-xs font-bold text-gray-400 font-secondary uppercase tracking-widest">
                  {tier.subtitle}
                </p>
              </div>

              <div
                className={`w-full h-48 ${tier.colorClass} flex items-center justify-center text-brand-white rounded-lg`}
              >
                <span className="text-6xl font-bold font-primary">
                  {tier.amount}
                </span>
              </div>

              <div className="flex flex-col grow mt-6">
                <p className="text-brand-dark font-secondary leading-relaxed mb-8 grow text-sm">
                  {tier.description}
                </p>

                <div className="flex flex-col xl:flex-row justify-between items-center mt-auto gap-3 w-full">
                  <button
                    onClick={() => setSelectedTier(tier)}
                    className="w-full xl:flex-1 border border-gray-300 text-gray-400 font-bold text-[10px] md:text-xs lg:text-sm py-3 md:py-4 px-2 md:px-4 rounded-full flex justify-center items-center gap-1 hover:bg-gray-50 transition-colors uppercase tracking-wider cursor-pointer whitespace-nowrap min-h-[48px]"
                  >
                    More Info
                    <Icon
                      icon="material-symbols:play-circle-outline"
                      width="16"
                    />
                  </button>
                  <button
                    onClick={() => onDonateClick && onDonateClick(tier)}
                    className="w-full xl:flex-1 bg-brand-lilac-600 text-brand-white font-bold text-[10px] md:text-xs lg:text-sm py-3 md:py-4 px-2 md:px-6 rounded-full flex justify-center items-center hover:bg-brand-lilac-700 transition-colors uppercase tracking-wider cursor-pointer whitespace-nowrap shadow-sm min-h-[48px]"
                  >
                    Give Seed
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {selectedTier && (
        <TierDetailModal
          tier={selectedTier}
          onClose={() => setSelectedTier(null)}
          onDonate={onDonateClick}
        />
      )}
    </section>
  );
};

export default InvestmentTiers;
