import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { fadeUp, staggerContainer } from "../../utils/animations";

const BG_IMAGE =
  "https://images.unsplash.com/photo-1594708767771-a7502209ff51?q=80&w=2070&auto=format&fit=crop";

const HomeHero = () => {
  return (
    <section
      className="relative w-full h-screen bg-cover bg-center flex flex-col justify-end overflow-hidden"
      style={{ backgroundImage: `url("${BG_IMAGE}")` }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-white/55" />

      {/* Glass panel — centered */}
      <div className="relative z-20 w-full">
        <motion.div
          className="bg-white/65 backdrop-blur-md flex flex-col justify-center items-center px-8 pt-16 pb-24 md:px-14 md:pt-20 md:pb-32 text-center w-full shadow-sm border-t border-white/50"
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          <motion.span
            variants={fadeUp}
            className="text-xs md:text-sm font-secondary font-bold uppercase tracking-[0.2em] text-brand-dark-400 mb-4"
          >
            Architecting an Unshakable Uganda
          </motion.span>

          <motion.h1
            variants={fadeUp}
            className="text-lg md:text-xl lg:text-2xl font-bold font-primary text-brand-teal-900 uppercase tracking-tight mb-4 md:mb-6 leading-tight max-w-5xl mx-auto"
          >
            Forget Theories. We've Engineered an Economic Force of 17,000 Lives.
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="text-base md:text-xl font-secondary text-brand-dark-400 max-w-3xl mx-auto leading-relaxed mb-8"
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
              className="inline-flex items-center justify-center bg-brand-lilac-700 text-white font-primary font-bold uppercase tracking-wider text-base px-10 py-4 rounded-full hover:bg-brand-lilac-700/90 transition-colors duration-300 cursor-pointer"
            >
              Access The Terminal
            </Link>
            <Link
              to="/how-to-help/join-the-assignment"
              className="inline-flex items-center justify-center border-2 border-brand-lilac-700 text-brand-lilac-700 font-primary font-bold uppercase tracking-wider text-base px-10 py-4 rounded-full hover:bg-brand-lilac-700/90 hover:text-white transition-colors duration-300 cursor-pointer"
            >
              Invest in the Bloc
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HomeHero;
