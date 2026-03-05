import React from "react";
import { motion } from "framer-motion";
import { fadeUp, staggerContainer } from "../../../../utils/animations";

const SeedPortalsHero = () => {
  return (
    <section
      className="relative w-full h-[500px] md:h-[600px] xl:h-[700px] 2xl:h-[800px] bg-cover bg-center flex items-end justify-center overflow-hidden group"
      style={{
        backgroundImage: `url("https://ik.imagekit.io/sbgenu6wj/Internation%20Network%20For%20Single%20Mothers/24d67f7bedf75fdebe204784ab41ceb9f7e96699.png")`, // Using a reliable image, we can update later if a specific one is provided
      }}
    >
      {/* White transparent overlay on the image */}
      <div className="absolute inset-0 bg-brand-white/50 transition-opacity duration-700"></div>

      {/* Content with glass background */}
      <div className="relative z-10 w-full">
        <motion.div
          className="bg-brand-white/60 backdrop-blur-md h-auto md:h-[340px] xl:h-[380px] flex flex-col justify-center items-center p-6 md:p-12 xl:p-16 text-center w-full shadow-sm border-t border-brand-white/50"
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          <motion.div
            variants={fadeUp}
            className="flex items-center gap-3 text-brand-lilac-700 mb-6"
          >
            <span className="w-12 h-px bg-brand-lilac-600"></span>
            <span className="text-[10px] font-primary font-bold uppercase tracking-[0.4em]">
              Institutional Grade Deployment
            </span>
          </motion.div>

          <motion.h1
            variants={fadeUp}
            className="text-3xl md:text-6xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-bold font-primary text-brand-teal-900 mb-4 md:mb-6 uppercase tracking-tight"
          >
            The Seed Portals
          </motion.h1>
          <motion.p
            variants={fadeUp}
            className="text-base md:text-xl font-secondary text-brand-dark-400 max-w-3xl mx-auto leading-relaxed border-l-2 border-brand-lilac-300 pl-6 italic"
          >
            "This is the dual engine of our structural mandate. Whether you are
            an elite individual partner or a cooperative architect, these
            portals are where transition becomes momentum."
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
};

export default SeedPortalsHero;
