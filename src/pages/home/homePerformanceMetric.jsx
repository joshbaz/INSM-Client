import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { fadeUp, staggerContainer } from "../../utils/animations";

const METRICS = [
  { value: "23,400", label: "Active Members" },
  { value: "1,000/-", label: "Weekly Commitment" },
  { value: "51%", label: "National Population" },
  { value: "TIER-1", label: "Credit Liquidity" },
];

const HomePerformanceMetric = () => {
  return (
    <section className="relative w-full min-h-[620px] md:min-h-[680px] flex flex-col justify-center overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url("https://ik.imagekit.io/sbgenu6wj/Internation%20Network%20For%20Single%20Mothers/image%207.png?updatedAt=1772727195309")`,
        }}
      ></div>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-brand-dark/80"></div>

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto w-full px-8 md:px-12 lg:px-20 pt-16 md:pt-20 pb-4 md:pb-6 flex flex-col">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="flex flex-col"
        >
          {/* Label */}
          <motion.span
            variants={fadeUp}
            className="text-[10px] md:text-xs font-primary font-bold text-brand-gold uppercase tracking-[0.3em] mb-8"
          >
            High-Velocity Liquidity
          </motion.span>

          {/* Main Heading */}
          <motion.h2
            variants={fadeUp}
            className="text-3xl md:text-5xl lg:text-display font-primary font-bold text-brand-white leading-tight mb-6 max-w-2xl"
          >
            Ready to fuel the <br className="hidden md:block" />
            <span className="text-brand-gold">National Supply Chain?</span>
          </motion.h2>

          {/* Subtext */}
          <motion.p
            variants={fadeUp}
            className="font-secondary text-sm md:text-base text-brand-white/80 max-w-xl mb-10 leading-relaxed"
          >
            Join An elite cadre of 10,000 individual partners committing
            <br className="hidden md:block" /> UGX 1,000 Weekly.
          </motion.p>

          {/* CTA */}
          <motion.div variants={fadeUp}>
            <Link
              to="/how-to-help/seed-portals"
              className="inline-flex items-center bg-brand-gold text-brand-dark font-primary font-bold text-[11px] md:text-xs uppercase tracking-[0.2em] px-8 py-4 rounded-full hover:bg-brand-gold/90 transition-all duration-300 hover:scale-105 shadow-lg"
            >
              Access the 1K Club Portal
            </Link>
          </motion.div>
        </motion.div>

        {/* Stats Row */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mt-16 md:mt-24 pt-10 border-t border-brand-white/10"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-y-8">
            {METRICS.map((metric, index) => (
              <div
                key={index}
                className={`flex flex-col px-4 md:px-0 ${
                  index > 0
                    ? "md:border-l md:border-brand-white/15 md:pl-8"
                    : ""
                }`}
              >
                <span className="text-2xl md:text-3xl lg:text-4xl font-primary font-black text-brand-white tracking-tight leading-none mb-2">
                  {metric.value}
                </span>
                <span className="text-[9px] md:text-[10px] font-primary font-bold text-brand-white/50 uppercase tracking-[0.2em]">
                  {metric.label}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Footer text */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="pt-14 text-xs md:text-sm text-center font-secondary text-brand-white/40 italic"
        >
          This fund supports the intellectual and legal infrastructure for
          17,000+ mothers.
        </motion.p>
      </div>
    </section>
  );
};

export default HomePerformanceMetric;
