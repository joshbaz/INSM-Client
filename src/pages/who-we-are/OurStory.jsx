import React from "react";
import { motion } from "framer-motion";
import { fadeUp, staggerContainer } from "../../utils/animations";

const OurStory = () => {
  return (
    <section
      id="our-story"
      className="w-full bg-brand-lilac-100 py-24 md:py-32"
    >
      <motion.div
        className="max-w-6xl 2xl:max-w-screen-2xl mx-auto px-6 md:px-12 lg:px-20 xl:px-24 2xl:px-32 flex flex-col items-start text-left"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={staggerContainer}
      >
        <motion.h2
          variants={fadeUp}
          className="text-2xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-black font-primary text-brand-lilac-800 mb-8 leading-[1.1]"
        >
          Investing in the majority shareholders of the nation’s future
        </motion.h2>

        <motion.p
          variants={fadeUp}
          className="font-secondary font-medium text-lg md:text-xl lg:text-2xl leading-relaxed mb-8 text-brand-dark-400"
        >
          In Uganda today, a profound structural shift has identified an
          unparalleled market opportunity. Nearly 1 in 4 households (22.4%) are
          governed by single mothers. These individuals are the Majority
          Shareholders of our future economy—a high-velocity powerhouse of
          latent industrial potential ready for deployment.
        </motion.p>

        <motion.p
          variants={fadeUp}
          className="font-secondary font-medium text-lg md:text-xl lg:text-2xl leading-relaxed text-brand-dark-400"
        >
          At the International Network for Single Mothers (INSM), we recognize
          that economic sovereignty is engineered through infrastructure. We
          have bypassed traditional social models to construct a disciplined
          economic bloc that serves as the primary anchor for national
          stability.
        </motion.p>
      </motion.div>
    </section>
  );
};

export default OurStory;
