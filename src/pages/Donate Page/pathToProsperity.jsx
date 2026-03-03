import React from "react";
import { motion } from "framer-motion";
import { fadeUp, staggerContainer } from "../../utils/animations";

const STEPS = [
  {
    label: "The Seed",
    description: "Your investment arrives as working capital.",
    icon: "/icons/theSeed.png",
  },
  {
    label: "Equipping",
    description:
      "A mother receives her Passbook, joins a SACCO, and undergoes induction.",
    icon: "/icons/Equipping.png",
  },
  {
    label: "Productivity",
    description: "She launches a business in a specialized value chain",
    icon: "/icons/productivity.png",
  },
  {
    label: "Stability",
    description: "Her children stay in school; her home is secure",
    icon: "/icons/stability.png",
  },
  {
    label: "National Impact",
    description:
      "She contributes to the National GDP and the building of the Republic.",
    icon: "/icons/nationalImpact.png",
  },
];

const Chevron = ({ children, index, total }) => {
  const isFirst = index === 0;
  const isLast = index === total - 1;

  const getClipPath = () => {
    if (isFirst) return "polygon(0% 0%, 92% 0%, 100% 50%, 92% 100%, 0% 100%)";
    if (isLast) return "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%, 8% 50%)";
    return "polygon(0% 0%, 92% 0%, 100% 50%, 92% 100%, 0% 100%, 8% 50%)";
  };

  return (
    <div className="relative w-full h-24 sm:h-28 md:h-32 flex items-center justify-center translate-x-[-1px]">
      <div
        className="absolute inset-0 bg-brand-white-200"
        style={{ clipPath: getClipPath() }}
      />
      <div className="relative z-10 flex items-center justify-center w-full">
        {children}
      </div>
    </div>
  );
};

const PathToProsperity = () => {
  return (
    <section className="w-full py-24 md:py-32 bg-brand-white px-4">
      <div className="max-w-7xl mx-auto px-2 md:px-12 lg:px-20 text-center">
        <motion.h2
          className="text-3xl md:text-5xl font-black font-primary text-brand-white-900 mb-16 md:mb-24"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
        >
          Path to Prosperity
        </motion.h2>

        <motion.div
          className="flex flex-col md:flex-row items-start md:gap-0"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer}
        >
          {STEPS.map((step, index) => (
            <motion.div
              key={index}
              className="flex flex-col items-center w-full md:w-1/5 mb-12 md:mb-0"
              variants={fadeUp}
            >
              <Chevron index={index} total={STEPS.length}>
                <img
                  src={step.icon}
                  alt={step.label}
                  className="w-16 h-16 md:w-20 md:h-20 object-contain"
                />
              </Chevron>

              <h3 className="text-lg md:text-xl font-black font-primary text-brand-white-900 mt-8 mb-3">
                {step.label}
              </h3>

              <p className="text-sm md:text-base font-secondary text-brand-dark-400 leading-relaxed max-w-[180px] mx-auto">
                {step.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default PathToProsperity;
