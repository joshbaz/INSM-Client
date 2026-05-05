import React from "react";
import { motion } from "framer-motion";
import { Icon } from "@iconify/react";
import { fadeUp, staggerContainer } from "../../../utils/animations";

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
  const isLast = index === total - 1;

  return (
    <div className="relative w-full h-32 sm:h-40 md:h-52 flex items-center justify-center -translate-x-px">
      <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
        <Icon
          icon="ph:tag-chevron-fill"
          width="256"
          height="256"
          className={`w-[110%] h-[110%] text-brand-white-200 translate-x-[-5%] ${
            isLast ? "scale-x-[1]" : ""
          }`}
        />
      </div>
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
              className="flex flex-col items-center w-full md:w-1/5 mb-8 md:mb-0"
              variants={fadeUp}
            >
              <Chevron index={index} total={STEPS.length}>
                <img
                  src={step.icon}
                  alt={step.label}
                  className="w-14 h-14 md:w-18 md:h-18 object-contain"
                />
              </Chevron>

              <h3 className="text-xl md:text-2xl font-black font-primary text-brand-white-900 mt-10 mb-4">
                {step.label}
              </h3>

              <p className="text-base md:text-normal font-secondary text-brand-dark-400 leading-relaxed max-w-[180px] mx-auto">
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
