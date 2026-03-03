import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { fadeUp, staggerContainer } from "../../utils/animations";

const HomeClubTrigger = () => {
  return (
    <section className="w-full bg-white py-20 md:py-28 px-4">
      <div className="max-w-6xl mx-auto px-2 md:px-12 lg:px-20">
        {/* Section Label */}
        <motion.div
          className="mb-12 md:mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={staggerContainer}
        >
          <motion.h2
            variants={fadeUp}
            className="text-3xl md:text-4xl font-bold font-primary text-brand-white-900 mb-2"
          >
            The 1K Club Trigger
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="text-base md:text-lg font-secondary text-brand-dark-400 mb-10"
          >
            High-Velocity Liquidity Entry Point
          </motion.p>
          <motion.p
            variants={fadeUp}
            className="font-secondary text-base md:text-lg text-brand-dark leading-relaxed max-w-3xl"
          >
            The 1K Club is the most direct way to channel capital into the
            economic engine. Become part of the network of capital deployers
            funding scalable, disciplined production units led by Uganda's
            17,000 single mothers. Real-time impact, zero ambiguity, and direct
            accountability built into every contribution.
          </motion.p>
        </motion.div>

        {/* Callout Box — matches WhoWeAreOutro pattern */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="bg-brand-navy-400 p-10 md:p-16 shadow-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-8"
        >
          <div>
            <h3 className="text-white text-2xl md:text-3xl lg:text-4xl font-primary font-bold leading-snug mb-4">
              Deploy Capital Now.
              <br />
              <span className="font-light italic">Join the Bloc.</span>
            </h3>
            <p className="text-brand-navy-100 font-secondary text-base md:text-lg leading-relaxed max-w-xl">
              Your entry is not a donation. It is a strategic stake in the
              forces reshaping Uganda's agricultural and tourism economies from
              the ground up.
            </p>
          </div>
          <Link
            to="/how-to-help/donate"
            className="shrink-0 bg-brand-lilac-700 text-white font-primary font-bold uppercase tracking-wider text-base px-10 py-4 rounded-full hover:bg-brand-lilac-700/90 transition-colors duration-300 cursor-pointer whitespace-nowrap"
          >
            Access the Terminal
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default HomeClubTrigger;
