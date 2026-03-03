import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { fadeUp, staggerContainer } from "../../utils/animations";

const BG_IMAGE =
  "https://ik.imagekit.io/sbgenu6wj/Internation%20Network%20For%20Single%20Mothers/heroimagelady.png?tr=fl-h";

const HomeHero = () => {
  return (
    <section className="relative w-full min-h-screen -mt-20 pt-20 overflow-hidden bg-brand-dark-900">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <img
          src={BG_IMAGE}
          alt="Single mothers economic empowerment"
          className="w-full h-full object-cover scale-105"
        />

        {/* Cinematic multi-layer overlay */}
        <div className="absolute inset-0 bg-linear-to-r from-black via-black/40 to-black/10" />
        <div className="absolute inset-0 bg-black/20 backdrop-blur-[1px]" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex items-center min-h-screen">
        <motion.div
          className="max-w-3xl px-6 md:px-12 lg:px-20 w-full"
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          {/* Glass content panel */}
          <div className="max-w-3xl bg-white/5 backdrop-blur-lg border border-brand-white/10 rounded-3xl p-8 md:p-12 shadow-2xl">

            {/* Tagline */}
            <motion.span
              variants={fadeUp}
              className="inline-block text-xs md:text-sm lg:text-xs font-secondary font-bold uppercase tracking-[0.35em] text-brand-white-100 mb-6"
            >
              Architecting an Unshakable Uganda
            </motion.span>

            {/* Headline */}
            <motion.h1
              variants={fadeUp}
              className="font-primary font-extrabold text-brand-white uppercase leading-[1.1] tracking-tight mb-6"
            >
              <span className="text-lg sm:text-xl md:text-2xl lg:text-3xl">
              Forget Theories.
              </span>
              <br />
              <span className="text-brand-lilac-600 text-lg sm:text-xl md:text-2xl lg:text-3xl">
                We've Engineered
              </span>{" "} <br/>
              <span className="text-brand-white text-lg sm:text-xl md:text-2xl lg:text-2xl">
                an Economic Force of 17,000 Lives.
              </span>
            </motion.h1>

            {/* Description */}
            <motion.p
              variants={fadeUp}
              className="text-base md:text-lg font-secondary text-brand-white/80 leading-relaxed mb-10 max-w-2xl"
            >
              Uganda's 17,000 single mothers are no longer a demographic of
              survivors — they are a disciplined economic bloc dominating
              Agriculture and Tourism value chains.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              variants={fadeUp}
              className="flex flex-col sm:flex-row gap-5"
            >
              <Link
                to="/how-to-help/donate"
                className="group relative inline-flex items-center justify-center bg-brand-lilac-700 text-brand-white font-primary font-bold uppercase tracking-wider text-xs px-10 py-4 rounded-full overflow-hidden transition-all duration-300 hover:scale-[1.03]"
              >
                <span className="relative z-10">Access The Terminal</span>
                <div className="absolute inset-0 bg-brand-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </Link>

              <Link
                to="/how-to-help/join-the-assignment"
                className="inline-flex items-center justify-center border border-brand-white/30 text-brand-white font-primary font-bold uppercase tracking-wider text-xs px-10 py-4 rounded-full backdrop-blur-md hover:bg-brand-white/10 transition-all duration-300 hover:scale-[1.03]"
              >
                Invest in the Bloc
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Subtle bottom fade for smooth transition */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-brand-dark-900 to-transparent z-10" />
    </section>
  );
};

export default HomeHero;