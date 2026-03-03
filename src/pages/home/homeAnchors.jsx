import React from "react";
import { motion } from "framer-motion";
import { fadeUp, staggerContainer } from "../../utils/animations";

const anchors = [
  {
    id: "01",
    title: "Capital Formation",
    description:
      "Aggregating micro-contributions into macro-economic forces. Disciplined saving and unified investment vehicles create immediate liquidity and long-term stability.",
  },
  {
    id: "02",
    title: "Value Chain Dominance",
    description:
      "Moving beyond subsistence. We engineer end-to-end control in Agriculture and Tourism, ensuring our members dictate terms rather than accept them.",
  },
  {
    id: "03",
    title: "Cooperative Execution",
    description:
      "A militant approach to collaborative effort. 17,000 strong moving as a single, coordinated economic unit with unmatched scale and precision.",
  },
];

const HomeAnchors = () => {
  return (
    <section className="w-full bg-white py-20 md:py-28 px-4 md:px-8">
      <div className="max-w-6xl mx-auto px-2 md:px-12 lg:px-20">
        {/* Section header */}
        <motion.div
          className="mb-12 md:mb-20 max-w-3xl"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={staggerContainer}
        >
          <motion.h2
            variants={fadeUp}
            className="text-3xl md:text-4xl font-bold font-primary text-brand-white-900 mb-2"
          >
            The Three Strategic Anchors
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="text-base md:text-lg font-secondary text-brand-dark-400 mb-8"
          >
            Visualizing the Pathway to Market Dominance
          </motion.p>
          <motion.p
            variants={fadeUp}
            className="font-secondary text-base md:text-lg text-brand-dark leading-relaxed"
          >
            Three architectural pillars that transform 17,000 individual
            production units into a unified, market-dominant economic force.
            This is not ambition — it is a proven blueprint already reshaping
            communities across Uganda.
          </motion.p>
        </motion.div>

        {/* Divider line — matches brand pattern */}
        <div className="w-full h-1 bg-brand-lilac mb-14 md:mb-20" />

        {/* Cards — matches RopesImpact pattern */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-5"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer}
        >
          {anchors.map((anchor) => (
            <motion.div
              key={anchor.id}
              variants={fadeUp}
              className="bg-brand-lilac-100 flex flex-col items-start gap-4 px-6 py-8"
            >
              {/* Number */}
              <span className="text-4xl md:text-5xl font-bold font-primary text-brand-pink-800 leading-none opacity-40">
                {anchor.id}.
              </span>

              {/* Title */}
              <h3 className="text-xl md:text-2xl font-bold font-primary text-brand-pink-800 leading-tight">
                {anchor.title}
              </h3>

              {/* Description */}
              <p className="text-base font-secondary text-brand-pink-900 leading-relaxed">
                {anchor.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default HomeAnchors;
