import React from "react";
import { motion } from "framer-motion";
import { fadeUp, staggerContainer } from "../../utils/animations";

const anchors = [
  {
    id: 1,
    icon: "/icons/theSeed.png",
    title: "Strategic Capital Aggregation",
    description:
      "Aggregation of resources and producers creates the Sovereign Ledger required for wholesale market arbitrage and Tier-1 institutional lending.",
  },
  {
    id: 2,
    icon: "/icons/Equipping.png",
    title: "Precision Operational Mastery",
    description:
      "Precision Mastery increases the Capital Value of every production hour, moving the network from cheap labor to a high-yield technical asset.",
  },
  {
    id: 3,
    icon: "/icons/productivity.png",
    title: "End-to-End Market Arbitrage",
    description:
      "Commanding the value chain ensures that Wealth Velocity remains within the network, securing the next generation of economic architects.",
  },
];

const HomeAnchors = () => {
  return (
    <section className="w-full bg-brand-white py-20 md:py-28 px-4 md:px-8">
      <div className="max-w-6xl mx-auto px-2 md:px-12 lg:px-20">
        {/* Section header */}
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
            The Three Strategic Anchors
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="text-base md:text-lg font-secondary text-brand-dark-300 mb-6"
          >
            Visualizing the Pathway to Market Dominance
          </motion.p>
          <motion.p
            variants={fadeUp}
            className="font-secondary text-base md:text-lg text-brand-dark-400 leading-relaxed"
          >
            Our model succeeds because it recognizes that inefficiency is the
            only barrier to wealth. We provide the three "Strategic Anchors"
            that convert individual potential into institutional market power.
          </motion.p>
        </motion.div>

        {/* Cards */}
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
              className="bg-brand-teal-100 rounded-lg flex flex-col items-start gap-4 px-6 py-8"
            >
              {/* Icon */}
              <img
                src={anchor.icon}
                alt={anchor.title}
                className="w-14 h-14 object-contain mb-2"
              />

              {/* Title */}
              <h3 className="text-xl md:text-2xl font-bold font-primary text-brand-dark leading-tight">
                {anchor.title}
              </h3>

              {/* Description */}
              <p className="text-base font-secondary text-brand-dark-400 leading-relaxed">
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
