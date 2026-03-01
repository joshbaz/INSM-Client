import React from "react";
import { motion } from "framer-motion";
import { fadeUp, staggerContainer } from "../../utils/animations";

const HomeBanner = () => {
  return (
    <motion.div
      className="w-full bg-white py-20 flex justify-center items-center"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={staggerContainer}
    >
      <div className="max-w-[950px] px-4 text-center flex flex-col gap-4">
        <motion.h2
          variants={fadeUp}
          className="font-secondary font-semibold text-[48px] leading-tight text-brand-dark"
        >
          From Resilience to Economic Power
        </motion.h2>
        <motion.p
          variants={fadeUp}
          className="font-secondary font-medium text-brand-dark-400 text-[28px] leading-normal"
        >
          We are igniting a national transformation by turning single mothers
          into unstoppable economic force.
        </motion.p>
      </div>
    </motion.div>
  );
};

export default HomeBanner;
