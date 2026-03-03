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

const Chevron = ({ children, isLast }) => (
  <div className="relative w-full h-28 md:h-32 flex items-center justify-center">
    {/* Chevron shape via CSS clip-path */}
    <div
      className="absolute inset-0 bg-brand-white-300"
      style={{
        clipPath: isLast
          ? "polygon(8% 0%, 100% 0%, 100% 100%, 8% 100%, 0% 50%)"
          : "polygon(8% 0%, 90% 0%, 100% 50%, 90% 100%, 8% 100%, 0% 50%)",
      }}
    />
    <div className="relative z-10">{children}</div>
  </div>
);

const PathToProsperity = () => {
  return (
    <section className="w-full py-24 md:py-32 bg-white px-4 md:px-8">
      <div className="max-w-6xl mx-auto px-2 md:px-12 lg:px-20 text-center">
        <motion.h2
          className="text-3xl md:text-4xl font-bold font-primary text-brand-white-900 mb-16 md:mb-20"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
        >
          Path to Prosperity
        </motion.h2>

        <motion.div
          className="flex flex-col md:flex-row items-start gap-2 md:gap-1"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer}
        >
          {STEPS.map((step, index) => (
            <motion.div
              key={index}
              className="flex flex-col items-center w-full md:w-1/5"
              variants={fadeUp}
            >
              {/* Chevron with Icon */}
              <Chevron isLast={index === STEPS.length - 1}>
                <img
                  src={step.icon}
                  alt={step.label}
                  className="w-14 h-14 md:w-16 md:h-16 object-contain"
                />
              </Chevron>

              {/* Label */}
              <h3 className="text-base md:text-lg font-bold font-primary text-brand-dark mt-6 mb-2">
                {step.label}
              </h3>

              {/* Description */}
              <p className="text-sm md:text-[15px] font-secondary text-brand-dark-400 leading-relaxed max-w-[200px]">
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
