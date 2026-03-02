import React from "react";
import { motion } from "framer-motion";
import { fadeUp, staggerContainer } from "../../utils/animations";

const OurStory = () => {
  return (
    <section className="w-full bg-[#ECE2EC] py-24 md:py-32 px-6 md:px-12">
      <motion.div
        className="max-w-3xl mx-auto md:ml-[15%] flex flex-col items-start text-left"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={staggerContainer}
      >
        <motion.h2
          variants={fadeUp}
          className="text-3xl md:text-5xl leading-tight font-bold font-primary text-[#3f2d40] mb-8"
        >
          Investing in the Majority
          <br />
          Shareholders of the Nation’s Future
        </motion.h2>

        <motion.p
          variants={fadeUp}
          className="font-secondary text-base md:text-xl text-[#5f4361] leading-relaxed mb-8 font-medium"
        >
          In Uganda today, a profound structural shift has identified an
          unparalleled market opportunity. Nearly 1 in 4 households (22.4%) are
          governed by single mothers. These individuals are the Majority
          Shareholders of our future economy—a high-velocity powerhouse of
          latent industrial potential ready for deployment.
        </motion.p>

        <motion.p
          variants={fadeUp}
          className="font-secondary text-base md:text-xl text-[#5f4361] leading-relaxed font-medium"
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
