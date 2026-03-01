import React from "react";
import { motion } from "framer-motion";
import { fadeUp, staggerContainer } from "../../utils/animations";

const HERO_BG =
  "https://ik.imagekit.io/sbgenu6wj/Internation%20Network%20For%20Single%20Mothers/image%201.png";

const WhatWeDoHero = () => {
  return (
    <section
      className="relative w-full h-[500px] md:h-[620px] bg-cover bg-center flex items-end justify-center overflow-hidden"
      style={{ backgroundImage: `url("${HERO_BG}")` }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-white/55" />

      {/* Content */}
      <div className="relative z-10 w-full">
        <motion.div
          className="bg-white/60 backdrop-blur-md flex flex-col justify-center items-center p-8 md:p-14 text-center w-full shadow-sm border-t border-white/50"
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          <motion.h1
            variants={fadeUp}
            className="text-3xl md:text-5xl lg:text-6xl font-bold font-primary text-brand-dark uppercase tracking-tight mb-4 md:mb-6 leading-tight"
          >
            From Resilience to
            <br />
            Economic Power
          </motion.h1>
          <motion.p
            variants={fadeUp}
            className="text-base md:text-lg font-secondary text-brand-dark-400 max-w-3xl mx-auto leading-relaxed"
          >
            Our &ldquo;Three Ropes&rdquo; programme is the TPR strategy
            dedicated to giving single mothers the &lsquo;right&rsquo; ropes to
            &lsquo;pull&rsquo; themselves up, ultimately building social and
            progressive Uganda&rsquo;s economy.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
};

export default WhatWeDoHero;
