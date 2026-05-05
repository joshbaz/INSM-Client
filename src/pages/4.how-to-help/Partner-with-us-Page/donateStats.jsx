import React from "react";
import { motion } from "framer-motion";
import { fadeUp, staggerContainer } from "../../../utils/animations";

const donateStats = () => {
  const stats = [
    { value: "17,482", label: "MOTHERS REGISTERED" },
    { value: "30", label: "PARISHES ACTIVATED" },
    { value: "84", label: "DISTRICTS REACHED" },
    { value: "$2.4M", label: "CAPITAL DEPLOYED" },
  ];

  return (
    <section className="bg-brand-white-100 py-20 overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-8 md:px-24">
        <motion.div
          className="flex flex-col md:flex-row justify-between items-center md:items-start space-y-6 md:space-y-0 text-center md:text-left"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              variants={fadeUp}
              className={`flex flex-col w-full md:w-auto ${index !== stats.length - 1 ? "md:border-r md:border-brand-dark-200 md:pr-16 lg:pr-24" : ""} ${index !== 0 ? "md:pl-16 lg:pl-2" : ""}`}
            >
              <span className="text-4xl md:text-5xl font-bold font-primary text-brand-dark mb-2">
                {stat.value}
              </span>
              <span className="text-sm md:text-base font-semibold text-brand-dark-300 uppercase tracking-wide">
                {stat.label}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default donateStats;
