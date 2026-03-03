import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { fadeUp, staggerContainer } from "../../utils/animations";

const BG_IMAGE =
  "https://ik.imagekit.io/sbgenu6wj/Internation%20Network%20For%20Single%20Mothers/hero%20image";

const HomeHero = () => {
  return (
    <section className="relative w-full h-screen -mt-20 pt-20 overflow-hidden bg-brand-dark-800">
      {/* Background image — right side */}
      <div className="absolute inset-0 z-0">
        <img
          src={BG_IMAGE}
          alt="Single mothers economic empowerment"
          className="w-full h-full object-cover"
        />
        {/* Dark gradient overlay — stronger on left for text readability */}
        <div className="absolute inset-0 bg-linear-to-r from-[#090a0c] via-[#090a0c]/85 to-transparent" />
      </div>

      {/* Content — left aligned */}
      <div className="relative z-10 h-full flex items-center">
        <motion.div
          className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 w-full"
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          <div className="max-w-2xl">
            <motion.span
              variants={fadeUp}
              className="inline-block text-xs md:text-sm font-secondary font-bold uppercase tracking-[0.2em] text-brand-white-600 mb-6"
            >
              Architecting an Unshakable Uganda
            </motion.span>

            <motion.h1
              variants={fadeUp}
              className="text-lg md:text-xl lg:text-3xl font-bold font-primary text-brand-white uppercase tracking-tight mb-6 leading-tight"
            >
              Forget Theories.<br/> We've Engineered an <br/> Economic Force of 17,000 Lives.
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="text-base md:text-xl font-secondary text-brand-dark-200 leading-relaxed mb-10 max-w-xl"
            >
              Uganda's 17,000 single mothers are no longer a demographic of
              survivors; they are a disciplined economic bloc dominating
              Agriculture and Tourism value chains.
            </motion.p>

            <motion.div
              variants={fadeUp}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link
                to="/how-to-help/donate"
                className="inline-flex items-center justify-center bg-brand-lilac-700 text-brand-white font-primary font-bold uppercase tracking-wider text-sm px-10 py-4 rounded-full hover:bg-brand-white/90 transition-colors duration-300 cursor-pointer"
              >
                Access The Terminal
              </Link>
              <Link
                to="/how-to-help/join-the-assignment"
                className="inline-flex items-center justify-center border-2 border-brand-white/30 text-brand-white font-primary font-bold uppercase tracking-wider text-sm px-10 py-4 rounded-full hover:bg-brand-white/10 transition-colors duration-300 cursor-pointer"
              >
                Invest in the Bloc
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HomeHero;
