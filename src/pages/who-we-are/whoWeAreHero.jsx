import React from "react";
import { motion } from "framer-motion";
import { fadeUp, staggerContainer } from "../../utils/animations";

// Fallback background image
const HERO_BG =
  "https://images.unsplash.com/photo-1509099836639-18ba1795216d?q=80&w=2031&auto=format&fit=crop";

const WhoWeAreHero = () => {
  return (
    <section
      className="relative w-full h-[500px] md:h-[600px] bg-cover bg-center flex items-end justify-center overflow-hidden group"
      style={{ backgroundImage: `url("${HERO_BG}")` }}
    >
      {/* Light overlay for readability */}
      <div className="absolute inset-0 bg-brand-white/50 transition-opacity duration-700" />

      {/* Content Container */}
      <div className="relative z-10 w-full">
        <motion.div
          className="bg-brand-white/60 backdrop-blur-md h-auto md:h-[340px] flex flex-col justify-center items-center p-6 md:p-12 text-center w-full shadow-sm border-t border-brand-white/50"
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          <motion.h1
            variants={fadeUp}
            className="text-3xl md:text-6xl font-bold font-primary text-brand-teal-900 uppercase tracking-tight mb-4 md:mb-6 leading-tight max-w-5xl mx-auto"
          >
            The National <br className="hidden md:block" /> Economic Engine
          </motion.h1>
          <motion.p
            variants={fadeUp}
            className="text-base md:text-xl font-secondary text-brand-dark-400 max-w-3xl mx-auto leading-relaxed"
          >
            Architecting the industrial future of Uganda through the power of
            single mothers. We are transforming the kitchen table into a
            sovereign economic powerhouse.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
};

export default WhoWeAreHero;
