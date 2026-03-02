import React from "react";
import { motion } from "framer-motion";
import { fadeUp, staggerContainer } from "../../utils/animations";
import { Link } from "react-router-dom";

const WhoWeAreCTA = () => {
  return (
    <section className="w-full bg-brand-navy py-24 md:py-32 px-6 md:px-12 text-center">
      <motion.div
        className="max-w-4xl mx-auto flex flex-col items-center"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={staggerContainer}
      >
        <motion.h2
          variants={fadeUp}
          className="text-3xl md:text-5xl font-bold font-primary text-white mb-8 leading-tight"
        >
          This is no longer an appeal for charity.{" "}
          <br className="hidden md:block" />
          It is an invitation to{" "}
          <span className="text-brand-gold">capitalize.</span>
        </motion.h2>

        <motion.p
          variants={fadeUp}
          className="text-lg md:text-xl font-secondary text-brand-navy-100 mb-10 max-w-3xl font-medium leading-relaxed"
        >
          Become a stakeholder in the structural integrity of Uganda. Join the
          national economic engine and help us transform the "Invisible
          Majority" into an unstoppable production workforce.
        </motion.p>

        <motion.div variants={fadeUp}>
          <Link
            to="/how-to-help/donate"
            className="inline-flex items-center justify-center bg-brand-gold hover:bg-transparent text-brand-navy-900 hover:text-brand-gold font-primary font-bold px-10 py-4 border-2 border-brand-gold uppercase tracking-widest transition-all duration-300 shadow-lg hover:shadow-brand-gold/20"
          >
            Deploy Capital
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default WhoWeAreCTA;
