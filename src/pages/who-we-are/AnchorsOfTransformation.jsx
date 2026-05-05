import React from "react";
import { motion } from "framer-motion";
import { fadeUp, staggerContainer, slideInRight } from "../../utils/animations";

const ANCHORS = [
  {
    id: 2,
    title: "National Strategic Endorsement",
    text: "Our architecture has garnered the explicit support of the Government of Uganda and senior leadership, recognizing us as the most Efficient Vehicle for Parish-Level Economic Development.",
    image:
      "https://ik.imagekit.io/sbgenu6wj/Internation%20Network%20For%20Single%20Mothers/National-Strategic-Endorsement.png?updatedAt=1777970458275",
    alt: "Government partnership and strategic endorsement",
  },
  {
    id: 3,
    title: "Scalable National Dominance",
    text: 'We are scaling this architecture across every district. Our mission is categorical: ensure that "female-led" becomes synonymous with "Economically Dominant."',
    image:
      "https://ik.imagekit.io/sbgenu6wj/Internation%20Network%20For%20Single%20Mothers/Rectangle%206.png?updatedAt=1772569690283",
    alt: "Women-led economic expansion across Uganda",
  },
];

const AnchorsOfTransformation = () => {
  return (
    <section className="w-full bg-brand-white py-24 md:py-32">
      <div className="max-w-6xl mx-auto px-6 md:px-12 lg:px-20">
        {/* Header Section */}
        <motion.div
          className="mb-16 md:mb-24 max-w-3xl"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={staggerContainer}
        >
          <motion.h2
            variants={fadeUp}
            className="text-3xl md:text-4xl font-bold font-primary text-brand-white-900 mb-2"
          >
            The Anchors of Transformation
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="text-base md:text-lg font-secondary text-brand-dark-400 mb-8"
          >
            A Proven Architecture, Not a Pilot Project
          </motion.p>
          <motion.p
            variants={fadeUp}
            className="font-secondary text-base md:text-lg text-brand-dark leading-relaxed"
          >
            INSM is a registered industrial cooperative movement that has
            engineered a definitive pathway to Economic Sovereignty. We refine
            high-tenacity capability into an unstoppable economic force. While
            traditional aid offers temporary relief, we provide the "Anchors of
            Transformation": robust institutional systems, catalytic capital,
            and the professional mastery required to move entire communities
            into Market-Competitive Industrial Surplus.
          </motion.p>
        </motion.div>

        {/* The Makindye Blueprint Section (Text Only) */}
        <motion.div
          className="mb-20 md:mb-28"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          <motion.div variants={fadeUp} className="max-w-4xl">
            <h3 className="text-2xl md:text-3xl font-bold font-primary text-brand-white-900 mb-6">
              The Makindye Blueprint
            </h3>
            <p className="font-secondary text-lg md:text-xl text-brand-dark leading-relaxed">
              We have successfully consolidated over 17,000 production units
              into a disciplined, wealth-generating bloc. This is the National
              Gold Standard for economic mobilization.
            </p>
          </motion.div>
        </motion.div>

        {/* Content Grid */}
        <div className="flex flex-col gap-20 md:gap-28">
          {ANCHORS.map((anchor, index) => {
            const isReversed = index % 2 !== 0;
            return (
              <motion.div
                key={anchor.id}
                className={`flex flex-col ${
                  isReversed ? "md:flex-row-reverse" : "md:flex-row"
                } gap-8 md:gap-14 items-start md:items-center`}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={staggerContainer}
              >
                {/* Text */}
                <motion.div className="w-full md:w-1/2" variants={fadeUp}>
                  <h3 className="text-xl md:text-2xl font-bold font-primary text-brand-white-900 mb-4">
                    {anchor.title}
                  </h3>
                  <p className="font-secondary text-base md:text-lg text-brand-dark leading-relaxed">
                    {anchor.text}
                  </p>
                </motion.div>

                {/* Image */}
                <motion.div
                  className="w-full md:w-1/2 h-64 md:h-72 overflow-hidden shrink-0"
                  variants={slideInRight}
                >
                  <img
                    src={anchor.image}
                    alt={anchor.alt}
                    className="w-full h-full object-cover"
                  />
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default AnchorsOfTransformation;
