import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Icon } from "@iconify/react";
import { fadeUp, staggerContainer } from "../../utils/animations";

const HomeClubTrigger = () => {
  return (
    <section className="w-full bg-brand-white py-24 md:py-32 px-4 overflow-hidden">
      <div className="max-w-6xl mx-auto px-2 md:px-12 lg:px-20">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-16 md:mb-24">
          <motion.div
            className="max-w-2xl"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.div
              variants={fadeUp}
              className="inline-flex items-center gap-2 px-3 py-1 mb-6"
            >
              <span className="text-xs font-secondary font-bold text-brand-gold-800 uppercase tracking-widest">
                Entry Point: High-Velocity Liquidity
              </span>
            </motion.div>

            <motion.h2
              variants={fadeUp}
              className="text-xl md:text-2xl lg:text-4xl font-black font-primary text-brand-white-900 leading-[1.1] mb-6"
            >
              The 1K Club <br />
              <span className="text-brand-lilac">Trigger Mechanism.</span>
            </motion.h2>

            <motion.p
              variants={fadeUp}
              className="font-secondary text-lg md:text-xl text-brand-dark-400 leading-relaxed"
            >
              The 1K Club is the primary conduit for capital deployment into
              Uganda's verified industrial network. No ambiguity. Direct
              accountability. Pure economic momentum.
            </motion.p>

            <motion.div variants={fadeUp} className="pt-8">
              <Link
                to="/how-to-help/seed-portals"
                className="inline-flex items-center gap-3 bg-brand-gold text-brand-navy-900 font-primary font-bold text-xs uppercase tracking-[0.2em] px-8 py-4 rounded-full hover:bg-brand-gold/80 transition-all duration-300 group"
              >
                Access the 1k Club Portal
                <Icon
                  icon="heroicons:arrow-right-20-solid"
                  className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                />
              </Link>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="hidden lg:block text-right pb-4"
          >
            <div className="text-5xl font-primary font-bold text-brand-white-200 uppercase tracking-tighter leading-none select-none">
              Reshaping <br />
              The Republic
            </div>
          </motion.div>
        </div>

        {/* Action Zone — Reverted to preferred Lilac theme */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="bg-brand-lilac-700 p-10 md:p-16 shadow-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-8"
        >
          <div>
            <h3 className="text-brand-white text-3xl md:text-4xl font-primary font-bold leading-snug mb-4">
              Deploy Capital Now.
              <br />
              <span className="font-light italic">Join the Bloc.</span>
            </h3>
            <p className="text-brand-lilac-100 font-secondary text-lg leading-relaxed max-w-xl">
              Your entry is not a donation. It is a strategic stake in the
              forces reshaping Uganda's agricultural and tourism economies from
              the ground up.
            </p>
          </div>
          <Link
            to="/how-to-help/seed-portals"
            className="shrink-0 bg-brand-lilac-500 border-2 border-brand-white/50 text-brand-white font-primary font-bold uppercase tracking-wider text-base px-10 py-4 rounded-full hover:bg-brand-lilac-500/50 transition-all duration-300 cursor-pointer whitespace-nowrap shadow-lg hover:shadow-2xl hover:scale-105 active:scale-95"
          >
            Join the Bloc
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default HomeClubTrigger;
