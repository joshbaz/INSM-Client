import React from "react";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import { fadeUp, staggerContainer } from "../../utils/animations";

const PILLARS = [
  {
    id: 1,
    icon: "/icons/Group 64.png",
    title: "Disciplined Capital Arbitrage",
    description:
      "Focused on fiscal literacy and rigorous SACCO oversight to ensure every shilling serves the mission.",
  },
  {
    id: 2,
    icon: "/icons/export-icon-network.png",
    title: "Radical Grassroots Penetration",
    description:
      "Parish-level operative network ensuring bottom-up growth and absolute audit transparency in real-time.",
  },
  {
    id: 3,
    icon: "/icons/export-icon-trust.png",
    title: "Trust as a Financial Lever",
    listItems: [
      "Tier-1 Credit Liquidity",
      "Strategic Policy Alignment",
      "Collective Investment Power",
    ],
  },
];

const HomeGoldStandard = () => {
  return (
    <section className="w-full py-20 md:py-28 px-4 md:px-8 bg-brand-white">
      <div className="max-w-6xl mx-auto px-2 md:px-12 lg:px-20">
        {/* Section Header */}
        <motion.div
          className="mb-12 md:mb-16 max-w-3xl"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={staggerContainer}
        >
          <motion.h2
            variants={fadeUp}
            className="text-3xl md:text-4xl font-bold font-primary text-brand-dark mb-2"
          >
            The Gold Standard
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="text-base md:text-lg font-secondary text-brand-dark-300 mb-6"
          >
            Integrity As Our Structural Anchor
          </motion.p>
          <motion.p
            variants={fadeUp}
            className="text-sm md:text-base font-secondary text-brand-dark-400 leading-relaxed"
          >
            We do not manage resources; we steward a National Economic Legacy.
            High-Velocity Accountability This is not merely bookkeeping; it is a
            commitment to ensuring every unit of capital is deployed as a
            Primary Asset in the construction of a sovereign economic
            powerhouse.
          </motion.p>
        </motion.div>

        {/* 3 Pillar Cards */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-14"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer}
        >
          {PILLARS.map((pillar) => (
            <motion.div
              key={pillar.id}
              variants={fadeUp}
              className="bg-brand-gold-200 rounded-lg flex flex-col items-start gap-4 px-6 py-8"
            >
              {/* Icon */}
              <img
                src={pillar.icon}
                alt={pillar.title}
                className="w-14 h-14 object-contain"
              />{" "}
              {/* Title */}
              <h3 className="text-xl md:text-2xl font-bold font-primary text-brand-gold-900 leading-tight">
                {pillar.title}
              </h3>
              {/* Description or List */}
              {pillar.description ? (
                <p className="text-sm md:text-base font-secondary text-brand-dark-400 leading-relaxed">
                  {pillar.description}
                </p>
              ) : (
                <ul className="flex flex-col gap-3">
                  {pillar.listItems.map((item, i) => (
                    <li
                      key={i}
                      className="flex items-center gap-2 text-sm md:text-base font-secondary text-brand-dark-400"
                    >
                      <Icon
                        icon="lucide:circle-check"
                        width="24"
                        height="24"
                        className="text-brand-gold-800 shrink-0"
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              )}
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Button */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
        >
          <Link
            to="/partner-with-us"
            className="inline-block bg-brand-lilac-700 text-white font-primary font-semibold text-xs md:text-sm uppercase tracking-wider px-8 py-4 rounded-full hover:bg-brand-lilac-800 transition-colors duration-200 cursor-pointer"
          >
            View Our Impact Audit & Capitalize The Bloc
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default HomeGoldStandard;
