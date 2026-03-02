import React from "react";
import { motion } from "framer-motion";
import { fadeUp, staggerContainer } from "../../utils/animations";

const OurStory = () => {
  return (
    <section
      id="our-story"
      className="w-full bg-brand-lilac-100 py-24 md:py-32 px-6 md:px-12"
    >
      <motion.div
        className="max-w-3xl mx-auto md:ml-[15%] flex flex-col items-start text-left"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={staggerContainer}
      >
        <motion.h2  
          variants={fadeUp}
          className="text-lg md:text-4xl normal-case! font-bold font-primary text-brand-lilac-800 mb-8"
        >
          Investing in the majority
          <br />
          shareholders of the nation’s future
        </motion.h2>

        <motion.p
          variants={fadeUp}
          className="font-secondary text-base md:text-lg text-brand-lilac-700 leading-relaxed mb-8 font-medium"
        >
          In Uganda today, a profound structural shift has identified an
          unparalleled market opportunity. Nearly 1 in 4 households (22.4%) are
          governed by single mothers. These individuals are the Majority
          Shareholders of our future economy—a high-velocity powerhouse of
          latent industrial potential ready for deployment.
        </motion.p>

        <motion.p
          variants={fadeUp}
          className="font-secondary text-base md:text-lg text-brand-lilac-700 leading-relaxed font-medium"
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
