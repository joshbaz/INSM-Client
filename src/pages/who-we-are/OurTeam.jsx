import React from "react";
import { motion } from "framer-motion";
import { fadeUp, staggerContainer, slideInLeft } from "../../utils/animations";

const OurTeam = () => {
  return (
    <section
      id="our-team"
      className="w-full bg-white py-24 md:py-32 px-4 md:px-8"
    >
      <div className="max-w-6xl mx-auto px-2 md:px-12 lg:px-20 flex flex-col md:flex-row items-center gap-12 lg:gap-20">
        {/* Left Side: Image */}
        <motion.div
          className="w-full md:w-[45%] lg:w-[40%] shrink-0"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={slideInLeft}
        >
          <div className="w-full aspect-4/5 overflow-hidden bg-brand-dark-100 border border-brand-dark-200 flex items-center justify-center relative">
            <img
              src="https://ik.imagekit.io/sbgenu6wj/Internation%20Network%20For%20Single%20Mothers/3b5f7e7f7b2c9a1d8e1f0e4d7a8c6b2e1f4d9c7a.png?updatedAt=1708878000000"
              alt="Winifred Nassanga - Lead Architect"
              className="w-full h-full object-cover object-top absolute inset-0"
              onError={(e) => {
                e.target.onerror = null;
                e.target.style.display = "none";
                e.target.parentElement.innerHTML =
                  '<span class="text-brand-dark-300 font-secondary text-sm">Image Placeholder</span>';
              }}
            />
          </div>
        </motion.div>

        {/* Right Side: Content */}
        <motion.div
          className="w-full md:w-[55%] lg:w-[60%] flex flex-col"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={staggerContainer}
        >
          <motion.span
            variants={fadeUp}
            className="text-brand-lilac-700 font-secondary font-semibold text-xs tracking-[0.15em] mb-2 uppercase"
          >
            The Visionary
          </motion.span>

          <motion.h2
            variants={fadeUp}
            className="text-3xl md:text-4xl font-bold font-primary text-brand-navy-900 mb-3"
          >
            Winifred Nassanga
          </motion.h2>

          <motion.p
            variants={fadeUp}
            className="text-base md:text-lg text-brand-dark-300 font-secondary mb-8"
          >
            Lead Architect & Visionary Strategist
          </motion.p>

          <motion.div variants={fadeUp} className="space-y-6">
            <p className="font-secondary text-base md:text-lg text-brand-navy-900 leading-relaxed font-medium">
              Winifred's leadership is defined by the high-precision synthesis
              of operational experience and industrial foresight. Having
              pioneered the optimization of the Primary Production Unit (the
              household), she identified a structural failure in the
              microeconomic architecture: the systemic exclusion of the
              "Invisible Majority."
            </p>

            <p className="font-secondary text-base md:text-lg text-brand-navy-900 leading-relaxed font-medium">
              Driven by the empirical fact that Household Fiscal Sovereignty is
              the foundational pillar of National Security, she engineered INSM.
              Her governing philosophy, "The Sovereignty of the Kitchen Table,"
              is an industrial mandate to transition 17,000+ households from
              subsistence-level output to Market-Competitive Industrial Surplus.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default OurTeam;
