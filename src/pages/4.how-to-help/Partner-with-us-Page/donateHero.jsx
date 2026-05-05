import React from "react";
import { motion } from "framer-motion";
import { fadeUp, staggerContainer } from "../../../utils/animations";

const DonateHero = () => {
  return (
    <section
      className="relative w-full h-[500px] md:h-[600px] bg-cover bg-center flex items-end justify-center overflow-hidden group"
      style={{
        backgroundImage: `url("https://ik.imagekit.io/sbgenu6wj/Internation%20Network%20For%20Single%20Mothers/donatebg.png?updatedAt=1770487650885")`,
      }}
    >
      {/* White transparent overlay on the image */}
      <div className="absolute inset-0 bg-brand-white/50 transition-opacity duration-700"></div>

      {/* Content with glass background */}
      <div className="relative z-10 w-full">
        <motion.div
          className="bg-brand-white/60 backdrop-blur-md h-auto md:h-[340px] flex flex-col justify-center items-center p-6 md:p-12 text-center w-full shadow-sm border-t border-brand-white/50"
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          <motion.h1
            variants={fadeUp}
            className="text-3xl md:text-6xl font-bold font-primary text-brand-teal-900 mb-4 md:mb-6 uppercase tracking-tight"
          >
            Partner With <br className="hidden md:block" /> Us
          </motion.h1>
          <motion.p
            variants={fadeUp}
            className="text-base md:text-xl font-secondary text-brand-dark-400 max-w-3xl mx-auto leading-relaxed"
          >
            We are not asking for a donation to sustain poverty; we are inviting
            an investment to dismantle it. Your resources are the 'threads' that
            build the rope of national prosperity.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
};

export default DonateHero;
