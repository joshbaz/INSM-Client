import React from "react";
import { motion } from "framer-motion";
import { fadeUp, staggerContainer } from "../../../utils/animations";

const ContactHero = () => {
  return (
    <section
      className="relative w-full h-[500px] md:h-[600px] bg-cover bg-center flex items-end justify-center overflow-hidden group"
      style={{
        backgroundImage: `url("https://ik.imagekit.io/sbgenu6wj/Internation%20Network%20For%20Single%20Mothers/contact.png")`,
      }}
    >
      {/* White transparent overlay on the image */}
      <div className="absolute inset-0 bg-brand-white/50 transition-opacity duration-700"></div>

      {/* Content with glass background */}
      <div className="relative z-10 w-full">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="bg-brand-white/60 backdrop-blur-md h-auto md:h-[340px] flex flex-col justify-center items-center p-6 md:p-12 text-center w-full shadow-sm border-t border-brand-white/50"
        >
          <motion.h1
            variants={fadeUp}
            className="text-3xl md:text-5xl font-bold font-primary text-brand-teal-900 uppercase tracking-tight mb-4 md:mb-6 leading-tight max-w-5xl mx-auto"
          >
            Let’s Architect the <br className="hidden md:block" /> Future of
            Uganda
          </motion.h1>
          <motion.p
            variants={fadeUp}
            className="text-base md:text-xl font-secondary text-brand-dark-400 max-w-3xl mx-auto leading-relaxed"
          >
            Whether you are ready to deploy catalytic capital, offer technical
            mastery, or scale the Makindye Blueprint to a new district, our
            leadership team is ready to coordinate. This is where your resources
            meet our results.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactHero;
